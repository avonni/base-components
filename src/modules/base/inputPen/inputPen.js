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
    prevX = 0;
    currX = 0;
    prevY = 0;
    currY = 0;
    prevSize = 0;
    prevDist = 0;
    prevVelocity = 2;

    _constraintApi;
    _constraintApiProxyInputUpdater;

    canvasElement;
    ctx;
    cursor;

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
        if (this._signature) {
            this.prevSize = this._size / 2;
        }
    }

    disconnectedCallback() {
        window.removeEventListener('mouseup', this.onMouseUp);
        window.removeEventListener('mousemove', this.onMouseMove);
    }

    renderedCallback() {
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
                this.canvasElement.parentElement.offsetWidth / 2;

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

        return this._hideControls || this._signature;
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
            'avonni-input-pen__text-area_cursor': this._signature
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
            img.onload = function () {
                this.ctx.drawImage(img, 0, 0);
            }.bind(this);
            img.src = this._value;
            this.clear();
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
        this.cursor.style.opacity = 1;
    }

    /**
     * Mouse leave handler. Set opacity to 0.
     */
    handleMouseLeave() {
        this.hideDrawCursor();
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
                this.drawDot();
                if (this._signature) {
                    this.setupCoordinate(event);
                    this.prevSize = this._size / 4;
                    this.prevVelocity = 2;
                }
                break;
            case 'up':
                if (this.isDownFlag) {
                    this.handleChangeEvent();
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
        this.prevX = this.currX;
        this.prevY = this.currY;
        this.currX = eventParam.clientX - clientRect.left;
        this.currY = eventParam.clientY - clientRect.top;
    }

    useTool(event, isDot = false) {
        if (!isDot) {
            switch (this._mode) {
                case 'erase':
                    this.setupCoordinate(event);
                    this.erase();
                    break;
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

    erase() {
        this.ctx.beginPath();
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.moveTo(this.prevX, this.prevY);
        this.ctx.lineTo(this.currX, this.currY);
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = this._size;
        this.ctx.closePath();
        this.ctx.stroke();
    }

    /**
     * Redraw Canvas context based on calculated cursor event cycle from previous to current coordinates.
     */
    draw() {
        this.ctx.beginPath();
        this.ctx.globalCompositeOperation = 'source-over';
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.moveTo(this.prevX, this.prevY);
        this.ctx.lineTo(this.currX, this.currY);
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this._size;
        this.ctx.closePath();
        this.ctx.stroke();
    }

    /**
     * Get object if velocity and distance traveled by cursor.
     */
    getDistanceTraveled(event) {
        const clientRect = this.canvasElement.getBoundingClientRect();
        const deltaX = this.currX - (event.clientX - clientRect.left);
        const deltaY = this.currY - (event.clientY - clientRect.top);
        this.currX = event.clientX - clientRect.left;
        this.currY = event.clientY - clientRect.top;
        let velocity = Math.sqrt(
            Math.sqrt(Math.sqrt(deltaX * deltaX + deltaY * deltaY))
        );
        this.prevVelocity = Math.min(
            Math.max(velocity, this.prevVelocity - 0.2),
            this.prevVelocity + 0.2
        );
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY) + this.prevDist;
    }

    /**
     * Draw on canvas context based on cursor speed.
     */
    sign(event) {
        const distance = this.getDistanceTraveled(event);
        const velocity = this.prevVelocity;
        const calculatedSize = Math.min(
            Math.max(this._size / velocity, this.prevSize - velocity),
            this.prevSize + velocity
        );

        // draw
        if (distance > 10) {
            this.ctx.beginPath();
            this.ctx.lineCap = 'round';
            this.ctx.lineJoin = 'round';
            this.ctx.moveTo(this.prevX, this.prevY);
            this.ctx.lineTo(this.currX, this.currY);
            this.ctx.strokeStyle = '#000000';
            this.ctx.lineWidth = calculatedSize;
            this.ctx.closePath();
            this.ctx.stroke();
            this.prevSize = calculatedSize;
            this.prevDist = 0;
            this.prevX = this.currX;
            this.prevY = this.currY;
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
            this.currX,
            this.currY,
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
            this._value = '';
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
