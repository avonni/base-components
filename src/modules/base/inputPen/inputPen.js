/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2021, Avonni Labs, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * - Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { LightningElement, api } from 'lwc';
import { AvonniResizeObserver } from 'c/resizeObserver';
import { normalizeBoolean, normalizeString } from 'c/utilsPrivate';
import { FieldConstraintApiWithProxyInput } from 'c/inputUtils';
import { classSet } from '../utils/classSet';

const TOOLBAR_VARIANTS = {
    valid: ['bottom-toolbar', 'top-toolbar'],
    default: 'bottom-toolbar'
};
const PEN_MODES = { valid: ['draw', 'erase', 'sign'], default: 'draw' };

const DEFAULT_COLOR = '#000';
const DEFAULT_SIZE = 10;

/**
 * @class
 * @descriptor avonni-input-pen
 * @storyId example-input-pen--base
 * @public
 */
export default class InputPen extends LightningElement {
    /**
     * Array of buttons to remove from the toolbar. Values include pen, eraser, clear, size, color
     *
     * @type {string[]}
     * @public
     */
    @api disabledButtons = [];
    /**
     * Help text detailing the purpose and function of the input.
     *
     * @type {string}
     * @public
     */
    @api fieldLevelHelp;
    /**
     * Text label for the input.
     *
     * @type {string}
     * @public
     */
    @api label;
    /**
     * Error message to be displayed when the value is missing.
     *
     * @type {string}
     * @public
     */
    @api messageWhenValueMissing;

    _color = DEFAULT_COLOR;
    _disabled = false;
    _hideControls = false;
    _invalid = false;
    _mode = PEN_MODES.default;
    _readOnly = false;
    _required = false;
    _signature = false;
    _size = DEFAULT_SIZE;
    _value;
    _variant = TOOLBAR_VARIANTS.default;

    sizeList;
    _rendered = false;
    _updatedDOM = false;

    isDownFlag;
    isDotFlag = false;
    xPositions = [];
    yPositions = [];
    velocities = [];
    prevX = 0;
    currX = 0;
    prevY = 0;
    currY = 0;
    prevDist = 0;
    moveCoordinatesAdded = 0;

    _resizeTimeout;
    _constraintApi;
    _constraintApiProxyInputUpdater;

    canvasElement;
    ctx;
    cursor;

    showExtraButtons = true;
    showExtraTools = true;

    constructor() {
        super();
        this.onMouseUp = this.handleMouseUp.bind(this);
        this.onMouseMove = this.handleMouseMove.bind(this);
        window.addEventListener('mouseup', this.onMouseUp);
        window.addEventListener('mousemove', this.onMouseMove);
    }

    connectedCallback() {
        this.sizeList = [...Array(100).keys()].slice(1).map((x) => {
            return { label: `${x}px`, value: x };
        });
    }

    disconnectedCallback() {
        window.removeEventListener('mouseup', this.onMouseUp);
        window.removeEventListener('mousemove', this.onMouseMove);
    }

    renderedCallback() {
        if (this.toolSlot) {
            this.showExtraTool = this.toolSlot.assignedElements().length !== 0;
        }
        if (this.buttonSlot) {
            this.showExtraButton =
                this.buttonSlot.assignedElements().length !== 0;
        }
        if (!this._rendered || this._updatedDOM) {
            this.canvasElement = this.template.querySelector(
                '[data-element-id="canvas"]'
            );
            this.ctx = this.canvasElement.getContext('2d');
            if (this.value) {
                this.initSrc();
            }

            this.canvasElement.width =
                this.canvasElement.parentElement.offsetWidth;
            this.canvasElement.height =
                this.canvasElement.parentElement.offsetHeight;
            this.initResizeObserver();

            this.initCursorStyles();

            if (!this.hideControls && this.showSize) {
                let srcElement = this.template.querySelector(
                    '.avonni-input-pen__combobox'
                );
                const style = document.createElement('style');
                style.innerText =
                    '.avonni-input-pen__combobox .slds-dropdown_fluid {min-width: 100px;}';
                srcElement.appendChild(style);
            }

            if (this.variant === 'bottom-toolbar') {
                this.classList.add('avonni-reverse');
            } else {
                this.classList.remove('avonni-reverse');
            }
            this.checkValidity();
            this._rendered = true;
        }
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Color of the pen.
     *
     * @type {string}
     * @public
     * @default #000
     */
    @api
    get color() {
        return this._color;
    }

    set color(value) {
        this._color = value;
        this.initCursorStyles();
    }

    /**
     * If present, the input field is disabled and users cannot interact with it.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get disabled() {
        return this._disabled;
    }

    set disabled(value) {
        this._disabled = normalizeBoolean(value);
        if (this._disabled) {
            this.classList.add('avonni-disabled');
        }
        this._updatedDOM = true;
    }

    /**
     * If present, hide the control bar.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get hideControls() {
        if (
            !this.showPen &&
            !this.showErase &&
            !this.showClear &&
            !this.showSize &&
            !this.showColor
        ) {
            return true;
        }

        return this._hideControls;
    }

    set hideControls(value) {
        this._hideControls = normalizeBoolean(value);
        this._updatedDOM = true;
    }

    /**
     * Valid modes include draw and erase.
     *
     * @type {string}
     * @public
     * @default draw
     */
    @api
    get mode() {
        return this._mode;
    }

    set mode(value) {
        this._mode = normalizeString(value, {
            fallbackValue: PEN_MODES.default,
            validValues: PEN_MODES.valid
        });
        this.initCursorStyles();
        this._updatedDOM = true;
    }

    /**
     * If present, the input field is read-only and cannot be edited by users.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get readOnly() {
        return this._readOnly;
    }

    set readOnly(value) {
        this._readOnly = normalizeBoolean(value);
        if (this._readOnly) {
            this.classList.add('avonni-disabled');
        }
        this._updatedDOM = true;
    }

    /**
     * If present, the input field must be filled out before the form is submitted.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get required() {
        return this._required;
    }

    set required(value) {
        this._required = normalizeBoolean(value);
        this._updatedDOM = true;
    }

    /**
     * Size of the pen.
     *
     * @type {string}
     * @public
     * @default false
     */
    @api
    get signature() {
        return this._signature;
    }
    set signature(value) {
        this._signature = normalizeBoolean(value);
        if (this._signature) {
            this._mode = 'sign';
            this._size = 20;
        }
        this._updatedDOM = true;
    }

    /**
     * Size of the pen.
     *
     * @type {string}
     * @public
     * @default 2
     */
    @api
    get size() {
        return this._size;
    }

    set size(value) {
        const intValue = parseInt(value, 10);
        if (!isNaN(intValue)) {
            this._size = intValue;
            this.initCursorStyles();
        }
    }

    /**
     * Represents the validity states that an element can be in, with respect to constraint validation.
     *
     * @type {string}
     * @public
     */
    @api
    get validity() {
        return this._constraint.validity;
    }

    /**
     * dataUrl like 'data:image/png;base64, …'
     *
     * @type {string}
     * @public
     */
    @api
    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;

        if (this.ctx) {
            this.initSrc();
        }
        this._updatedDOM = true;
    }

    /**
     * The variant changes the appearance of the toolbar. Accepted variant is bottom-toolbar and top-toolbar which causes the toolbar to be displayed below the box.
     *
     * @type {string}
     * @public
     * @default bottom-toolbar
     */
    @api
    get variant() {
        return this._variant;
    }

    set variant(value) {
        this._variant = normalizeString(value, {
            fallbackValue: TOOLBAR_VARIANTS.default,
            validValues: TOOLBAR_VARIANTS.valid
        });

        if (this._variant === 'bottom-toolbar') {
            this.classList.add('avonni-reverse');
        } else {
            this.classList.remove('avonni-reverse');
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Check if Pen is shown.
     *
     * @type {boolean}
     */
    get showPen() {
        return (
            !this.disabledButtons || this.disabledButtons.indexOf('pen') === -1
        );
    }

    /**
     * Check if Eraser is shown.
     */
    get showErase() {
        return (
            !this.disabledButtons ||
            this.disabledButtons.indexOf('eraser') === -1
        );
    }

    /**
     * Check if Clear is shown.
     *
     * @type {boolean}
     */
    get showClear() {
        return (
            !this.disabledButtons ||
            this.disabledButtons.indexOf('clear') === -1
        );
    }

    /**
     * Check if Size is shown.
     *
     * @type {boolean}
     */
    get showSize() {
        return (
            !this.disabledButtons || this.disabledButtons.indexOf('size') === -1
        );
    }

    /**
     * Check if Color is shown.
     *
     * @type {boolean}
     */
    get showColor() {
        return (
            !this.disabledButtons ||
            this.disabledButtons.indexOf('color') === -1
        );
    }

    get computedTextAreaClasses() {
        return classSet('slds-rich-text-editor__textarea').add({
            'slds-grid': true,
            'avonni-input-pen__text-area': true,
            'avonni-input-pen__text-area_cursor': this._signature
        });
    }

    get computedCanvasClass() {
        return classSet('avonni-input-pen__canvas').add({
            'avonni-input-pen__canvas_disabled': this._disabled
        });
    }

    /**
     * Compute constraintApi with fieldConstraintApiWithProxyInput.
     */
    get _constraint() {
        if (!this._constraintApi) {
            this._constraintApi = new FieldConstraintApiWithProxyInput(
                () => this,
                {
                    valueMissing: () => {
                        return !this.value;
                    }
                }
            );

            this._constraintApiProxyInputUpdater =
                this._constraintApi.setInputAttributes({
                    type: () => 'url',
                    value: () => this.value,
                    disabled: () => this.disabled
                });
        }
        return this._constraintApi;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Checks if the input is valid.
     *
     * @returns {boolean} True if the element meets all constraint validations.
     * @public
     */
    @api
    checkValidity() {
        return this._constraint.checkValidity();
    }

    /**
     * Clear the canvas.
     *
     * @public
     */
    @api
    clear() {
        if (!this.readOnly) {
            this.ctx.clearRect(
                0,
                0,
                this.canvasElement.width,
                this.canvasElement.height
            );
            if (this._mode !== 'sign') {
                this.setDraw();
            }
            this.handleChangeEvent();
        }
    }

    /**
     * Displays the error messages. If the input is valid, <code>reportValidity()</code> clears displayed error messages.
     *
     * @returns {boolean} False if invalid, true if valid.
     * @public
     */
    @api
    reportValidity() {
        const isValid = this._constraint.reportValidity((message) => {
            this.helpMessage = message;
        });
        if (this._required) {
            this.setValidity(isValid);
        }
        return isValid;
    }

    /**
     * Sets a custom error message to be displayed when a form is submitted.
     *
     * @param {string} message The string that describes the error. If message is an empty string, the error message is reset.
     * @public
     */
    @api
    setCustomValidity(message) {
        this._constraint.setCustomValidity(message);
    }

    /**
     * Set the drawing mode. Valid modes include draw and erase.
     *
     * @param {string} modeName
     * @public
     */
    @api
    setMode(modeName) {
        this._mode = normalizeString(modeName, {
            fallbackValue: this._mode,
            validValues: PEN_MODES.valid
        });
    }

    /**
     * Displays error messages on invalid fields.
     * An invalid field fails at least one constraint validation and returns false when <code>checkValidity()</code> is called.
     *
     * @public
     */
    @api
    showHelpMessageIfInvalid() {
        this.reportValidity();
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Initialize the Image canvas and dom elements.
     */
    initSrc() {
        if (this._value && this._value.indexOf('data:image/') === 0) {
            let img = new Image();
            img.onload = () => {
                this.ctx.drawImage(img, 0, 0);
            };
            img.src = this._value;
        } else {
            this.clear();
        }
    }

    /**
     * Initialize Cursor styling.
     */
    initCursorStyles() {
        if (this._signature) {
            this.cursor = { style: { setProperty: () => {} } }; // mock cursor to not throw errors
        } else {
            this.cursor = this.template.querySelector(
                '[data-element-id="input-pen-cursor"]'
            );
        }

        if (this.cursor) {
            this.cursor.style.setProperty('--size', this._size);
            this.cursor.style.setProperty(
                '--color',
                this.mode === 'erase' ? '#ffffff' : this.color
            );
        }
    }

    /**
     * Set the Mode to Draw.
     */
    setDraw() {
        this.setMode('draw');
        if (this.cursor) {
            this.cursor.style.setProperty('--color', this.color);
        }
    }

    /**
     * Set the Mode to Erase.
     */
    setErase() {
        this.setMode('erase');
        if (this.cursor) {
            this.cursor.style.setProperty('--color', '#ffffff');
        }
    }

    /**
     * Color change handler.
     *
     * @param {Event} event
     */
    handleColorChange(event) {
        this._color = event.detail.hex;
        if (this.cursor) {
            this.cursor.style.setProperty('--color', this.color);
        }
        this.setDraw();
    }

    /**
     * Size change handler. Change cursor size.
     *
     * @param {Event} event
     */
    handleSizeChange(event) {
        this._size = Number(event.detail.value);
        if (this.cursor) {
            this.cursor.style.setProperty('--size', this._size);
        }
    }

    /**
     * Mouse move handler. Search canvas coordinates on event trigger.
     *
     * @param {Event} event
     */
    handleMouseMove(event) {
        this.manageMouseEvent('move', event);
    }

    /**
     * Mouse down handler. Search canvas coordinates on event trigger.
     *
     * @param {Event} event
     */
    handleMouseDown(event) {
        this.manageMouseEvent('down', event);
    }

    /**
     * Mouse up handler. Search canvas coordinates on event trigger.
     *
     * @param {Event} event
     */
    handleMouseUp(event) {
        this.manageMouseEvent('up', event);
    }

    /**
     * Mouse Enter handler. Set opacity to 1. Search canvas coordinates on event trigger.
     *
     * @param {Event} event
     */
    handleMouseEnter(event) {
        if (!this.disabled && !this.readOnly) {
            this.showDrawCursor();
            this.manageMouseEvent('enter', event);
        }
    }

    hideDrawCursor() {
        this.cursor.style.opacity = 0;
    }

    showDrawCursor() {
        if (!this._disabled) {
            this.cursor.style.opacity = 1;
        }
    }

    /**
     * Mouse leave handler. Set opacity to 0.
     */
    handleMouseLeave() {
        this.hideDrawCursor();
        this.handleChangeEvent();
    }

    /**
     * Search the canvas element for coordinates on Event trigger.
     *
     * @param {string} requestedEvent
     * @param {Event} event
     */
    manageMouseEvent(requestedEvent, event) {
        if (this.disabled || this.readOnly) {
            return;
        }
        switch (requestedEvent) {
            case 'down':
                this.setupCoordinate(event);
                this.isDownFlag = true;
                if (this._signature) {
                    this.xPositions = [];
                    this.yPositions = [];
                    this.velocities = Array(6, 10);
                    this.setupCoordinate(event);
                }
                this.drawDot();
                break;
            case 'up':
                if (this.isDownFlag) {
                    this.handleChangeEvent();
                }
                if (this._mode === 'sign') {
                    this.clearPositionBuffer(event);
                }
                this.isDownFlag = false;
                break;
            case 'enter':
                if (this.isDownFlag) {
                    this.drawDot();
                }
                break;
            default:
                // default aka 'move'
                if (this.isDownFlag) {
                    this.useTool(event);
                }
                this.moveCursor(event);
                break;
        }
    }

    /**
     * Get cursor coordinates from Canvas Element on cursor move.
     *
     * @param {Event} event
     */
    moveCursor(event) {
        const clientRect = this.canvasElement.getBoundingClientRect();
        let left = event.clientX - clientRect.left - this._size / 2;
        let top = event.clientY - clientRect.top - this._size / 2;

        this.cursor.style.left = `${left}px`;
        this.cursor.style.top = `${top}px`;
    }

    setValidity(isValid) {
        if (isValid) {
            this.template
                .querySelector('.slds-form-element')
                .classList.remove('slds-has-error');
            this.template
                .querySelector('.slds-rich-text-editor')
                .classList.remove('slds-has-error');
            this._invalid = false;
        } else {
            this.template
                .querySelector('.slds-form-element')
                .classList.add('slds-has-error');
            this.template
                .querySelector('.slds-rich-text-editor')
                .classList.add('slds-has-error');
            this._invalid = true;
        }
    }

    /**
     * Calculate coordinates for previous X, Y and current X, Y of cursor.
     *
     * @param {Event} eventParam
     */
    setupCoordinate(eventParam) {
        const clientRect = this.canvasElement.getBoundingClientRect();
        this.xPositions.pop();
        this.yPositions.pop();
        while (this.xPositions.length < 10) {
            this.xPositions.unshift(eventParam.clientX - clientRect.left);
            this.yPositions.unshift(eventParam.clientY - clientRect.top);
        }
    }

    useTool(event, isDot = false) {
        if (!isDot) {
            switch (this._mode) {
                case 'sign':
                    this.sign(event);
                    break;
                default:
                    this.setupCoordinate(event);
                    this.draw();
                    break;
            }
        } else {
            this.drawDot(event);
        }
    }

    /**
     * Redraw Canvas context based on calculated cursor event cycle from previous to current coordinates.
     */
    draw() {
        this.ctx.beginPath();
        this.ctx.globalCompositeOperation =
            this._mode === 'erase' ? 'destination-out' : 'source-over';
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.moveTo(this.xPositions[1], this.yPositions[1]);
        this.ctx.lineTo(this.xPositions[0], this.yPositions[0]);
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this._size;
        this.ctx.closePath();
        this.ctx.stroke();
    }

    clearPositionBuffer() {
        let averageVelocityOnSpline =
            this.velocities.slice(3, 5).reduce((a, b) => a + b, 0) / 3;
        let velocity = Math.sqrt(averageVelocityOnSpline);
        for (let i = 0; i < this.moveCoordinatesAdded; i++) {
            this.xPositions.push(this.xPositions[8]);
            this.xPositions.shift();
            this.yPositions.push(this.xPositions[8]);
            this.yPositions.shift();
            this.velocities.push(this.velocities[8]);
            this.velocities.shift();
        }
        this.smoothVelocities();
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                this.xPositions.unshift(this.xPositions[0]);
                this.yPositions.unshift(this.yPositions[0]);

                this.velocities.unshift(this.velocities[0]);
            }
            velocity += 0.3;
            this.drawSpline(this.getSplinePoints(), this.size / velocity);
        }
    }

    smoothVelocities() {
        console.log(this.velocities.length);
        for (let i = this.velocities.length - 1; i >= 2; i = i - 1) {
            this.velocities[i - 1] =
                (this.velocities[i] + this.velocities[i - 2]) / 2;
        }
    }

    getSplinePoints() {
        const tension = 1;

        let x0;
        let y0;
        let x1;
        let y1;
        let x2;
        let y2;
        let x3;
        let y3;
        let cp1x;
        let cp1y;
        let cp2x;
        let cp2y;

        const data = [
            this.xPositions[1],
            this.yPositions[1],
            this.xPositions[3],
            this.yPositions[3],
            this.xPositions[5],
            this.yPositions[5],
            this.xPositions[7],
            this.yPositions[7]
        ];

        const size = data.length;
        const last = size - 4;

        const path = [data[0], data[1]];

        for (let i = 0; i < size - 2; i += 2) {
            x0 = i ? data[i - 2] : data[0];
            y0 = i ? data[i - 1] : data[1];

            x1 = data[i + 0];
            y1 = data[i + 1];

            x2 = data[i + 2];
            y2 = data[i + 3];

            x3 = i !== last ? data[i + 4] : x2;
            y3 = i !== last ? data[i + 5] : y2;

            cp1x = x1 + ((x2 - x0) / 6) * tension;
            cp1y = y1 + ((y2 - y0) / 6) * tension;

            cp2x = x2 - ((x3 - x1) / 6) * tension;
            cp2y = y2 - ((y3 - y1) / 6) * tension;
            path.push(cp1x, cp1y, cp2x, cp2y, x2, y2);
        }
        return path.slice(6, 14);
    }

    drawSpline(pts, penSize) {
        const colored = false;
        for (let i = 0; i < pts.length; i += 2) {
            this.ctx.beginPath();
            this.ctx.lineCap = 'round';
            this.ctx.lineJoin = 'round';
            this.ctx.strokeStyle = colored
                ? `hsl(${Math.random() * 355},75%,50%)`
                : 'black';
            this.ctx.lineWidth = penSize;
            this.ctx.moveTo(pts[i], pts[i + 1]);
            this.ctx.bezierCurveTo(
                pts[i + 2],
                pts[i + 3],
                pts[i + 4],
                pts[i + 5],
                pts[i + 6],
                pts[i + 7]
            );
            this.ctx.stroke();
        }
    }

    /**
     * Get object if velocity and distance traveled by cursor.
     */
    getDistanceTraveled(event) {
        const clientRect = this.canvasElement.getBoundingClientRect();
        const deltaX = this.xPositions[0] - (event.clientX - clientRect.left);
        const deltaY = this.yPositions[0] - (event.clientY - clientRect.top);
        let velocity = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
        const distance = velocity + this.prevDist;
        const deltaV = Math.abs(this.velocities[0] - velocity);
        velocity = Math.min(
            Math.max(velocity, this.velocities[0] - 0.2 * deltaV),
            this.velocities[0] + 0.2 * deltaV
        );
        this.xPositions[0] = event.clientX - clientRect.left;
        this.yPositions[0] = event.clientY - clientRect.top;
        if (distance > 4) {
            this.moveCoordinatesAdded++;
            this.xPositions.unshift(event.clientX - clientRect.left);
            this.yPositions.unshift(event.clientY - clientRect.top);
            this.velocities.unshift(velocity);
        }

        return distance;
    }

    /**
     * Draw on canvas context based on cursor speed.
     */
    sign(event) {
        const distance = this.getDistanceTraveled(event);

        // draw
        if (distance > 4) {
            this.prevDist = 0;
            if (this.moveCoordinatesAdded >= 2) {
                this.smoothVelocities();
                this.moveCoordinatesAdded = 0;
                const averageVelocityOnSpline =
                    this.velocities.slice(2, 4).reduce((a, b) => a + b, 0) / 3;
                const velocity = Math.sqrt(averageVelocityOnSpline);
                const calculatedSize = this.size / velocity;
                this.drawSpline(this.getSplinePoints(), calculatedSize);
            }
            this.xPositions.pop();
            this.yPositions.pop();
            if (this.velocities.length > 10) {
                this.velocities.pop();
            }
        } else {
            this.prevDist = distance;
        }
    }

    /**
     * Canvas draw dot method.
     */
    drawDot() {
        this.ctx.beginPath();
        this.ctx.globalCompositeOperation =
            this._mode === 'erase' ? 'destination-out' : 'source-over';
        this.ctx.arc(
            this.xPositions[0],
            this.yPositions[0],
            (this._mode === 'sign' ? this._size / 4 : this._size) / 2,
            0,
            2 * Math.PI,
            false
        );
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    testEmptyCanvas() {
        let transparentCanvas = document.createElement('canvas');
        transparentCanvas.width = this.canvasElement.width;
        transparentCanvas.height = this.canvasElement.height;
        if (this.canvasElement.toDataURL() === transparentCanvas.toDataURL()) {
            this._value = undefined;
        }
    }

    /**
     * Change event handler.
     */
    handleChangeEvent() {
        this._value = this.canvasElement.toDataURL();
        this.testEmptyCanvas();
        this._updateProxyInputAttributes('value');

        /**
         * The event fired when the value changed.
         *
         * @event
         * @name change
         * @param {string} dataURL Base64 of the drawing.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('change', {
                detail: this.value
            })
        );
    }

    /**
     * Get the tool slot DOM element.
     *
     * @type {Element}
     */
    get toolSlot() {
        return this.template.querySelector('slot[name=tool]');
    }

    /**
     * Get the button slot DOM element.
     *
     * @type {Element}
     */
    get buttonSlot() {
        return this.template.querySelector('slot[name=button]');
    }

    /**
     * Initialize the screen resize observer.
     *
     * @returns {AvonniResizeObserver} Resize observer.
     */
    initResizeObserver() {
        if (!this.canvasElement) return null;
        const resizeObserver = new AvonniResizeObserver(() => {
            const savedValue = this.value;
            clearTimeout(this._resizeTimeout);
            this._resizeTimeout = setTimeout(() => {
                this.canvasElement.width =
                    this.canvasElement.parentElement.offsetWidth;
                this.canvasElement.height =
                    this.canvasElement.parentElement.offsetHeight;
                this._value = savedValue;
                this.initSrc();
            }, 10);
        });
        resizeObserver.observe(this.canvasElement);
        return resizeObserver;
    }

    /**
     * Proxy Input Attributes updater.
     *
     * @param {object} attributes
     */
    _updateProxyInputAttributes(attributes) {
        if (this._constraintApiProxyInputUpdater) {
            this._constraintApiProxyInputUpdater(attributes);
        }
    }
}
