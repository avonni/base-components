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
import { normalizeBoolean, normalizeString, deepCopy } from 'c/utilsPrivate';
import { FieldConstraintApiWithProxyInput } from 'c/inputUtils';
import { classSet } from '../utils/classSet';
import { StraightToolManager, SmoothToolManager } from './toolManager';

const TOOLBAR_VARIANTS = {
    valid: ['bottom-toolbar', 'top-toolbar'],
    default: 'bottom-toolbar'
};
const PEN_MODES = { valid: ['draw', 'paint', 'erase', 'ink'], default: 'draw' };

const DEFAULT_BACKGROUND_COLORS = [
    '#ffffff00',
    '#000000',
    '#9fd6ff',
    '#9de7da',
    '#9df0bf',
    '#fff099',
    '#ffca7f'
];

const DEFAULT_COLOR = '#000';
const DEFAULT_BACKGROUND_COLOR = '#ffffff00';
const DEFAULT_SIZE = 10;
const INITIAL_VELOCITY = 10;

/**
 * @class
 * @descriptor avonni-input-pen
 * @storyId example-input-pen--base
 * @public
 */
export default class InputPen extends LightningElement {
    /**
     * Array of buttons to remove from the toolbar. Values include pen, paintbrush, eraser, ink, clear, size, color, background, download, undo, redo.
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

    _disabled = false;
    _hideControls = false;
    _readOnly = false;
    _required = false;
    _showSignaturePad = false;
    _value;
    _variant = TOOLBAR_VARIANTS.default;
    _backgroundColor = DEFAULT_BACKGROUND_COLOR;

    sizeList;
    _rendered = false;
    _updatedDOM = false;

    toolManager;
    isDownFlag;
    xPositions = [];
    yPositions = [];
    velocities = [];
    prevDist = 0;
    moveCoordinatesAdded = 0;
    _foregroundValue = undefined;

    undoStack = [];
    redoStack = [];

    helpMessage;
    _invalidField = false;
    _constraintApi;
    _constraintApiProxyInputUpdater;

    _resizeObserver;
    _resizeTimeout;

    canvas = {
        xPositions: [],
        yPositions: [],
        velocities: [],
        color: DEFAULT_COLOR,
        mode: PEN_MODES.default,
        size: DEFAULT_SIZE,
        ctx: undefined,
        canvasElement: undefined
    };

    canvasElement;
    ctx;
    backgroundCanvasElement;
    backgroundCtx;
    cursor;

    showExtraButtons = false;

    constructor() {
        super();
        this.onMouseUp = this.handleMouseUp.bind(this);
        this.onMouseMove = this.handleMouseMove.bind(this);
        this.onKeyDown = this.handleKeyDown.bind(this);
        window.addEventListener('mouseup', this.onMouseUp);
        window.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('keydown', this.onKeyDown);
    }

    connectedCallback() {
        this.sizeList = [...Array(100).keys()].slice(1).map((x) => {
            return { label: `${x}px`, value: x };
        });
    }

    disconnectedCallback() {
        window.removeEventListener('mouseup', this.onMouseUp);
        window.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('keydown', this.onKeyDown);
    }

    renderedCallback() {
        if (this.buttonSlot) {
            this.showExtraButton =
                this.buttonSlot.assignedElements().length !== 0;
        }
        if (!this._rendered || this._updatedDOM) {
            this.canvas.canvasElement = this.template.querySelector(
                '[data-element-id="canvas"]'
            );
            this.backgroundCanvasElement = this.template.querySelector(
                '[data-element-id="background-canvas"]'
            );
            this.canvas.ctx = this.canvas.canvasElement.getContext('2d');
            this.backgroundCtx = this.backgroundCanvasElement.getContext('2d');
            if (this._foregroundValue) {
                this.initSrc();
            }

            this.canvas.canvasElement.width =
                this.canvas.canvasElement.parentElement.clientWidth;
            this.canvas.canvasElement.height =
                this.canvas.canvasElement.parentElement.clientHeight;
            this.backgroundCanvasElement.width =
                this.canvas.canvasElement.parentElement.clientWidth;
            this.backgroundCanvasElement.height =
                this.canvas.canvasElement.parentElement.clientHeight;

            this.setToolManager();
            this.initResizeObserver();
            this.fillBackground();
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
            this._updatedDOM = false;
        }
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Color of the pen and the paintbrush
     *
     * @type {string}
     * @public
     * @default #000
     */
    @api
    get color() {
        return this.canvas.color;
    }

    set color(value) {
        this.canvas.color = value;
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
     * If present, hide the tool bar.
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
            !this.showPaint &&
            !this.showInk &&
            !this.showClear &&
            !this.showSize &&
            !this.showColor &&
            !this.showBackground &&
            !this.showDownload &&
            !this.showUndo &&
            !this.showRedo
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
     * Current mode of input. Valid modes include draw, paint, ink and erase.
     *
     * @type {string}
     * @public
     * @default draw
     */
    @api
    get mode() {
        return this.canvas.mode;
    }

    set mode(value) {
        this.canvas.mode = normalizeString(value, {
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
     * If present, adds signature pad at the bottom of input. Also sets default drawing mode to ink.
     *
     * @type {string}
     * @public
     * @default false
     */
    @api
    get showSignaturePad() {
        return this._showSignaturePad;
    }
    set showSignaturePad(value) {
        this._showSignaturePad = normalizeBoolean(value);
        if (this._showSignaturePad) {
            this.canvas.mode = 'ink';
        }
        this._updatedDOM = true;
    }

    /**
     * Size of the pen.
     *
     * @type {string}
     * @public
     * @default 10
     */
    @api
    get size() {
        return this.canvas.size;
    }

    set size(value) {
        const intValue = parseInt(value, 10);
        if (!isNaN(intValue)) {
            this.canvas.size = intValue;
            this.initCursorStyles();
        } else {
            this.canvas.size = DEFAULT_SIZE;
        }
    }

    /**
     * Represents the validity state of the input field, with respect to constraint validation.
     *
     * @type {string}
     * @public
     */
    @api
    get validity() {
        return this._constraint.validity.valid;
    }

    /**
     * Input value encoded as Base64. Ex: 'data:image/png;base64, …'
     *
     * @type {string}
     * @public
     */
    @api
    get value() {
        return this._value;
    }

    set value(value) {
        this._foregroundValue = value;

        if (this.canvas.ctx) {
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
     * Computed class of the text area.
     */
    get computedTextAreaClasses() {
        return classSet(
            'slds-rich-text-editor__textarea slds-grid avonni-input-pen__text-area'
        ).add({
            'avonni-input-pen__rich-text_border-radius-top':
                this.variant === 'bottom-toolbar',
            'avonni-input-pen__rich-text_border-radius-bottom':
                this.variant === 'top-toolbar',
            'avonni-input-pen__text-area_cursor': this.canvas.mode === 'ink'
        });
    }

    /**
     * Base64 value of the background and foreground.
     */
    get dataURL() {
        let mergedCanvas = document.createElement('canvas');
        mergedCanvas.width = this.canvas.canvasElement.width;
        mergedCanvas.height = this.canvas.canvasElement.height;
        const mergedCtx = mergedCanvas.getContext('2d');
        mergedCtx.drawImage(this.backgroundCanvasElement, 0, 0);
        mergedCtx.drawImage(this.canvas.canvasElement, 0, 0);
        return mergedCanvas.toDataURL();
    }

    /**
     * Computed class of the canvas.
     */
    get computedCanvasClass() {
        return classSet('avonni-input-pen__canvas').add({
            'avonni-input-pen__canvas_disabled': this._disabled
        });
    }

    /**
     * The default tab color shown in background fill tool.
     */
    get defaultBackgroundColors() {
        return DEFAULT_BACKGROUND_COLORS;
    }

    /**
     * If the redo button should be disabled.
     */
    get disabledRedoButton() {
        return this.disabled || this.redoStack.length === 0;
    }

    /**
     * If the undo button should be disabled.
     */
    get disabledUndoButton() {
        return this.disabled || this.undoStack.length === 0;
    }

    /**
     * Check if the canvas has value.
     *
     * @type {boolean}
     */
    get hasValue() {
        return !this.validity || this.disabled;
    }

    /**
     * Check if background fill tool is shown.
     * @type {boolean}
     *
     */
    get showBackground() {
        return (
            !this.disabledButtons ||
            this.disabledButtons.indexOf('background') === -1
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

    /**
     * Check if cursor is shown.
     *
     * @type {boolean}
     */
    get showCursor() {
        return this.canvas.mode !== 'ink';
    }

    /**
     * Check if eraser tool is shown.
     * @type {boolean}
     *
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
     * Check if download button is shown.
     * @type {boolean}
     *
     */
    get showDownload() {
        return (
            !this.disabledButtons ||
            this.disabledButtons.indexOf('download') === -1
        );
    }

    /**
     * Check if showInk is shown.
     *
     * @type {boolean}
     */
    get showInk() {
        return (
            !this.disabledButtons || this.disabledButtons.indexOf('ink') === -1
        );
    }

    /**
     * Check if showPaint is shown.
     *
     * @type {boolean}
     */
    get showPaint() {
        return (
            !this.disabledButtons ||
            this.disabledButtons.indexOf('paintbrush') === -1
        );
    }

    /**
     * Check if pen tool is shown.
     * @type {boolean}
     */
    get showPen() {
        return (
            !this.disabledButtons || this.disabledButtons.indexOf('pen') === -1
        );
    }

    /**
     * Check if redo button is shown.
     * @type {boolean}
     *
     */
    get showRedo() {
        return (
            !this.disabledButtons || this.disabledButtons.indexOf('redo') === -1
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
     * Check if undo button is shown.
     *
     * @type {boolean}
     */
    get showUndo() {
        return (
            !this.disabledButtons || this.disabledButtons.indexOf('undo') === -1
        );
    }

    /**
     * Check if undo and redo buttons are shown.
     * @type {boolean}
     *
     */
    get showUndoRedo() {
        return this.showUndo || this.showRedo;
    }

    /**
     * Compute the constraintApi with fieldConstraintApiWithProxyInput.
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
     * Clears the canvas. If clear is considered automated, it will not be saved as an undo-able action.
     *
     * @public
     */
    @api
    clear(automatedClear = false) {
        if (!this.readOnly) {
            this.canvas.ctx.clearRect(
                0,
                0,
                this.canvas.canvasElement.width,
                this.canvas.canvasElement.height
            );
            if (this.canvas.mode === 'erase') {
                this.setDraw();
            }
            this.fillBackground();
            this.handleChangeEvent();
        }
        if (!automatedClear) {
            this.saveAction({ type: 'state', clientX: 0, clientY: 0 });
            this.saveAction({ type: 'clear', clientX: 0, clientY: 0 });
        }
    }

    /**
     * Downloads the input field content as PNG.
     *
     * @public
     */
    @api
    download() {
        const a = document.createElement('a');
        a.download = 'Signature.png';
        a.href = this.value
            ? this.value
            : 'data:image/png;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; // empty image
        a.click();
    }

    /**
     * Redo the last stroke that was undid.
     *
     * @public
     */
    @api
    redo() {
        if (this.redoStack.length === 0) {
            return;
        }
        let actionsRecreated = -1;
        for (const [index, action] of deepCopy(this.redoStack).entries()) {
            if (action.requestedEvent === 'state' && index !== 0) {
                actionsRecreated = index;
                break;
            }
            this.undoStack.push(deepCopy(action));
            this.executeAction(action);
        }
        if (actionsRecreated === -1) {
            this.redoStack = [];
        } else {
            this.redoStack = this.redoStack.slice(actionsRecreated);
        }
        this.handleChangeEvent();
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
            this._invalidField = !isValid;
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
        this.canvas.mode = normalizeString(modeName, {
            fallbackValue: this.canvas.mode,
            validValues: PEN_MODES.valid
        });
        this.setToolManager();
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

    /**
     * Undo the last stroke.
     *
     * @public
     */
    @api
    undo() {
        if (this.undoStack.length === 0) {
            return;
        }
        while (
            this.undoStack[this.undoStack.length - 1].requestedEvent !== 'state'
        ) {
            this.redoStack.unshift(deepCopy(this.undoStack.pop()));
        }
        this.clear(true);
        for (const action of deepCopy(this.undoStack)) {
            this.executeAction(action);
        }
        this.redoStack.unshift(deepCopy(this.undoStack.pop()));
        this.handleChangeEvent();
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
        if (
            this._foregroundValue &&
            this._foregroundValue.indexOf('data:image/') === 0
        ) {
            let img = new Image();
            img.onload = () => {
                this.canvas.ctx.drawImage(img, 0, 0);
                this.handleChangeEvent();
            };
            img.src = this._foregroundValue;
        } else {
            this.clear(true);
        }
    }

    /**
     * Fill background color to backgroundColor value.
     */
    fillBackground() {
        this.backgroundCtx.clearRect(
            0,
            0,
            this.canvas.canvasElement.width,
            this.canvas.canvasElement.height
        );
        this.backgroundCtx.globalAlpha =
            parseInt(this._backgroundColor.slice(7), 16) / 255;
        this.backgroundCtx.fillStyle = this._backgroundColor;
        this.backgroundCtx.rect(
            0,
            0,
            this.canvas.canvasElement.width,
            this.canvas.canvasElement.height
        );
        this.backgroundCtx.fill();
    }

    /**
     * Initialize Cursor styling.
     */
    initCursorStyles() {
        if (this.showCursor) {
            this.cursor = this.template.querySelector(
                '[data-element-id="input-pen-cursor"]'
            );
        } else {
            this.cursor = undefined;
        }
        if (this.cursor) {
            this.cursor.style.setProperty('--size', this.canvas.size);
            this.cursor.style.setProperty(
                '--color',
                this.canvas.mode === 'erase' ? '#ffffff' : this.canvas.color
            );
        }
    }

    /**
     * Set the Mode to Draw.
     */
    setDraw() {
        this.setMode('draw');
        this.initCursorStyles();
    }

    /**
     * Set the Mode to Erase.
     */
    setErase() {
        this.setMode('erase');
        this.initCursorStyles();
    }

    /**
     * Set the Mode to Draw.
     */
    setInk() {
        this.setMode('ink');
        this.initCursorStyles();
    }

    /**
     * Set the Mode to Draw.
     */
    setPaint() {
        this.setMode('paint');
        this.initCursorStyles();
    }

    /**
     * Color change handler.
     *
     * @param {Event} event
     */
    handleColorChange(event) {
        this.canvas.color = event.detail.hex;
        if (this.cursor) {
            this.cursor.style.setProperty('--color', this.canvas.color);
        }
        if (this.canvas.mode === 'erase') {
            this.setDraw();
        }
    }

    /**
     * Background color change handler.
     *
     * @param {Event} event
     */
    handleBackgroundColorChange(event) {
        this.saveAction({ type: 'state', clientX: 0, clientY: 0 });
        this._backgroundColor = event.detail.hexa;
        this.saveAction({
            type: 'fill',
            clientX: 0,
            clientY: 0
        });
        this.fillBackground();
        this.handleChangeEvent();
    }

    /**
     * Size change handler. Change cursor size.
     *
     * @param {Event} event
     */
    handleSizeChange(event) {
        this.canvas.size = Number(event.detail.value);
        if (this.cursor) {
            this.cursor.style.setProperty('--size', this.canvas.size);
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

    /**
     * Mouse leave handler. Set opacity to 0.
     */
    handleMouseLeave() {
        this.hideDrawCursor();
        this.handleChangeEvent();
    }

    /**
     * handle download event
     *
     */
    handleDownload() {
        this.download();
    }

    /**
     * handle key down event
     * @param {Event} event
     *
     */
    handleKeyDown(event) {
        switch (event.keyCode) {
            case 89: // ctrl-y
                this.redo();
                break;
            case 90: // ctrl-z
                this.undo();
                break;
            default:
                break;
        }
    }

    /**
     * handle undo event
     *
     */
    handleUndo() {
        this.undo();
    }

    /**
     * handle redo event
     */
    handleRedo() {
        this.redo();
    }

    /**
     * Saves action to undo buffer.
     * @param {object | Event} event event to save as action
     * @param {boolean} checkForAction check if event is an action. If it is, don't save it.
     *
     */
    saveAction(event, checkForAction = false) {
        if (checkForAction) {
            if (event.isAction) {
                return;
            }
        }
        this.redoStack = [];

        let action = {};
        action.isAction = true;
        action.isDownFlag = this.isDownFlag;
        action.xPositions = deepCopy(this.canvas.xPositions);
        action.yPositions = deepCopy(this.canvas.yPositions);
        action.velocities = deepCopy(this.canvas.velocities);
        action.mode = this.canvas.mode;
        action.color = this.canvas.color;
        action.size = this.canvas.size;
        action.backgroundColor = this._backgroundColor;

        action.requestedEvent = event.type.split('mouse')[1];
        if (!action.requestedEvent) {
            action.requestedEvent = event.type;
        }
        if (event.clientX) {
            action.clientX = event.clientX;
        }
        if (event.clientY) {
            action.clientY = event.clientY;
        }
        if (action.requestedEvent === 'down') {
            this.saveAction({ type: 'state', clientX: 0, clientY: 0 });
        }
        this.undoStack.push(action);
    }

    /**
     * loads an action state onto component
     * @param {object} action action to load
     */
    loadAction(action) {
        this.isDownFlag = action.isDownFlag;
        this.canvas.mode = action.mode;
        this.setToolManager();
        this.toolManager = action.toolManager;
        this.canvas.xPositions = action.xPositions;
        this.canvas.yPositions = action.yPositions;
        this.canvas.velocities = action.velocities;
        this.canvas.color = action.color;
        this.canvas.size = action.size;
        this._backgroundColor = action.backgroundColor;
    }

    /**
     * Execute an action
     * @param {object} action
     */
    executeAction(action) {
        this.loadAction(action);
        if (action.requestedEvent === 'clear') {
            this.clear(true);
        }
        if (
            action.requestedEvent === 'state' ||
            action.requestedEvent === 'fill'
        ) {
            this.fillBackground();
        }
        this.manageMouseEvent(action.requestedEvent, action);
    }

    /**
     * handle reset event
     * @param {Event} event
     */
    handleReset(event) {
        this.clear();
        event.preventDefault();
        event.stopImmediatePropagation();
        event.stopPropagation();
    }

    /**
     * Hides draw cursor
     */
    hideDrawCursor() {
        if (this.cursor) {
            this.cursor.style.opacity = 0;
        }
    }

    /**
     * shows draw cursor
     */
    showDrawCursor() {
        if (!this._disabled && this.cursor) {
            this.cursor.style.opacity = 1;
        }
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
                this.saveAction(event, true);
                this.toolManager.setupLine(event);
                this.isDownFlag = true;
                break;
            case 'up':
                if (this.isDownFlag) {
                    this.saveAction(event, true);
                    this.toolManager.closeLine(event);
                    this.handleChangeEvent();
                }
                this.isDownFlag = false;
                break;
            case 'move':
                if (this.isDownFlag) {
                    this.saveAction(event, true);
                    this.toolManager.draw(event);
                }
                this.moveCursor(event);
                break;
            default:
                break;
        }
    }

    /**
     * Get cursor coordinates from Canvas Element on cursor move.
     *
     * @param {Event} event
     */
    moveCursor(event) {
        if (!this.cursor) {
            return;
        }
        const clientRect = this.canvas.canvasElement.getBoundingClientRect();
        let left = event.clientX - clientRect.left - this.canvas.size / 2;
        let top = event.clientY - clientRect.top - this.canvas.size / 2;

        this.cursor.style.left = `${left}px`;
        this.cursor.style.top = `${top}px`;
    }

    /**
     * Sets validity classes when invalid and removes them when valid.
     */
    setValidity(isValid) {
        if (isValid) {
            this.template
                .querySelector('.slds-rich-text-editor')
                .classList.remove('slds-has-error');
        } else {
            this.template
                .querySelector('.slds-rich-text-editor')
                .classList.add('slds-has-error');
        }
    }

    /**
     * Setup the initial buffer for chain style coordinate actions.
     *
     * @param {Event} event
     */
    setupChainCoordinates(event) {
        const clientRect = this.canvas.canvasElement.getBoundingClientRect();
        this.canvas.xPositions = [];
        this.canvas.yPositions = [];
        this.canvas.velocities = Array(4).fill(INITIAL_VELOCITY);
        for (let i = 0; i < 4; i++) {
            this.canvas.xPositions.unshift(event.clientX - clientRect.left);
            this.canvas.yPositions.unshift(event.clientY - clientRect.top);
        }
    }

    /**
     * Setup the initial buffer for normal coordinate action.
     *
     * @param {Event} event
     */
    setupCoordinates(event) {
        const clientRect = this.canvas.canvasElement.getBoundingClientRect();
        this.canvas.xPositions.unshift(event.clientX - clientRect.left);
        this.canvas.yPositions.unshift(event.clientY - clientRect.top);
    }

    /**
     * Draw on canvas as hard edge linear stroke.
     */
    hardEdgeDraw() {
        this.setupStroke(this.canvas.size);
        this.canvas.ctx.moveTo(
            this.canvas.xPositions[1],
            this.canvas.yPositions[1]
        );
        this.canvas.ctx.lineTo(
            this.canvas.xPositions[0],
            this.canvas.yPositions[0]
        );
        this.canvas.ctx.stroke();
        this.canvas.xPositions.pop();
        this.canvas.yPositions.pop();
    }

    /**
     * Setup stroke for drawing
     */
    setupStroke(strokeSize) {
        const colored = false;
        this.canvas.ctx.beginPath();
        this.canvas.ctx.globalCompositeOperation =
            this.canvas.mode === 'erase' ? 'destination-out' : 'source-over';
        this.canvas.ctx.lineCap = 'round';
        this.canvas.ctx.lineJoin = 'round';
        this.canvas.ctx.strokeStyle = colored
            ? `hsl(${Math.random() * 355},75%,50%)`
            : this.canvas.color;
        this.canvas.ctx.lineWidth = strokeSize;
    }

    /**
     * Setup depending on tool
     */
    setupTool(event) {
        if (this.canvas.mode === 'ink' || this.canvas.mode === 'paint') {
            this.setupChainCoordinates(event);
        } else {
            this.setupCoordinates(event);
        }
    }

    /**
     * Choses the method to call depending on the current usedTool for move action.
     */
    useTool(event, isDot = false) {
        if (!isDot) {
            if (this.canvas.mode === 'draw' || this.canvas.mode === 'erase') {
                this.setupCoordinates(event);
                this.hardEdgeDraw(event);
            } else {
                this.smoothDraw(event);
            }
        } else {
            this.drawDot(event);
        }
    }

    /**
     * Draws the last couple positions left in the positions buffer.
     */
    clearPositionBuffer() {
        // remove any extra points we saved since last draw
        for (let i = 0; i < this.moveCoordinatesAdded; i++) {
            this.canvas.xPositions.shift();
            this.canvas.yPositions.shift();
            this.canvas.velocities.shift();
        }
        this.smoothVelocities();
        for (let i = 0; i < 2; i++) {
            // add two "phantom" points for calculations
            for (let j = 0; j < 2; j++) {
                this.canvas.xPositions.unshift(this.canvas.xPositions[0]);
                this.canvas.yPositions.unshift(this.canvas.yPositions[0]);
                this.canvas.velocities.unshift(this.canvas.velocities[0] + 2);
            }
            this.drawSpline();
        }
        // clear buffer for next action
        this.canvas.xPositions = [];
        this.canvas.yPositions = [];
        this.canvas.velocities = [];
    }

    /**
     * Smooth the current velocity buffer
     */
    smoothVelocities() {
        for (let i = this.canvas.velocities.length - 1; i >= 2; i = i - 1) {
            this.canvas.velocities[i - 1] =
                (this.canvas.velocities[i] + this.canvas.velocities[i - 2]) / 2;
        }
    }

    /**
     * Computes spline points and control points following catmull-rom method.
     * @returns {number[]} 8 coords: start coords [0,1] && end coords [6,7] and set of control points [2,3] && [4,5]
     */
    getSplinePoints() {
        if (this.canvas.xPositions.length < 8) {
            return [];
        }
        let data = [
            this.canvas.xPositions[7],
            this.canvas.yPositions[7],
            this.canvas.xPositions[5],
            this.canvas.yPositions[5],
            this.canvas.xPositions[3],
            this.canvas.yPositions[3],
            this.canvas.xPositions[1],
            this.canvas.yPositions[1]
        ];
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

        const size = data.length;
        const last = size - 4;

        const spline = [data[0], data[1]];

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
            spline.push(cp1x, cp1y, cp2x, cp2y, x2, y2);
        }
        return spline.slice(6, 14);
    }

    /**
     * Finds the coordinates for the two splines needed to draw a tapering spline.
     * @param {number[]} pts coordinates for the spline in this order [x1, y1, cpx1, cpy1, cpx2, cpy2, x2, y2].
     * @param {number} bigRadius Size of first radius (beginning of spline)
     * @param {number} smallRadius Size of second radius (end of spline)
     *
     */
    findAdjustedPoints(splinePoints, smallRadius, bigRadius) {
        if (smallRadius > bigRadius) {
            // swap radius values and line direction
            let temp = bigRadius;
            bigRadius = smallRadius;
            smallRadius = temp;
            for (let i = 0; i < 4; i += 2) {
                temp = splinePoints[i];
                splinePoints[i] = splinePoints[6 - i];
                splinePoints[6 - i] = temp;
                temp = splinePoints[i + 1];
                splinePoints[i + 1] = splinePoints[7 - i];
                splinePoints[7 - i] = temp;
            }
        }

        // get vector tangent to spline
        const tangentVector = Array(2);
        tangentVector[0] = splinePoints[2] - splinePoints[0];
        tangentVector[1] = splinePoints[3] - splinePoints[1];

        // find perpendicular unit vector of tangent vector
        const perpendicularVector = [-tangentVector[1], tangentVector[0]];
        const vectorNorm = Math.sqrt(
            perpendicularVector[0] * perpendicularVector[0] +
                perpendicularVector[1] * perpendicularVector[1]
        );
        const unitPerpendicularVector = [
            perpendicularVector[0] / vectorNorm,
            perpendicularVector[1] / vectorNorm
        ];

        // multiply vector by inner radius displacement
        let innerRadius = (bigRadius - smallRadius) / 2;
        const newTopPoints = [...splinePoints];
        const newBottomPoints = [...splinePoints];
        for (const pointSet of [newTopPoints, newBottomPoints]) {
            pointSet[0] =
                splinePoints[0] + unitPerpendicularVector[0] * innerRadius;
            pointSet[1] =
                splinePoints[1] + unitPerpendicularVector[1] * innerRadius;
            innerRadius = -innerRadius;
        }

        return [newBottomPoints, newTopPoints];
    }

    /**
     * Draws a spline depending on the mode
     */
    drawSpline() {
        switch (this.canvas.mode) {
            case 'ink':
                this.drawTaperSpline(
                    this.getSplinePoints(),
                    (this.canvas.size * 2) /
                        Math.sqrt(this.canvas.velocities[3]),
                    (this.canvas.size * 2) /
                        Math.sqrt(this.canvas.velocities[5])
                );
                break;
            case 'paint':
                this.drawBasicSpline(this.getSplinePoints());
                break;
            default:
                break;
        }
    }

    /**
     * Draws a tapering spline using the initial and final radius.
     * @param {number[]} pts coordinates for the spline in this order [x1, y1, cpx1, cpy1, cpx2, cpy2, x2, y2].
     * @param {number} firstRadius Size of first radius (beginning of spline)
     * @param {number} secondRadius Size of second radius (end of spline)
     *
     */
    drawTaperSpline(pts, firstRadius, secondRadius) {
        const adjustedPoints = this.findAdjustedPoints(
            pts,
            firstRadius,
            secondRadius
        );

        this.drawBasicSpline(
            adjustedPoints[0],
            Math.min(firstRadius, secondRadius)
        );
        this.drawBasicSpline(
            adjustedPoints[1],
            Math.min(firstRadius, secondRadius)
        );
    }

    /**
     * Draws a basic spline using 4 coordinates.
     * @param {number[]} pts coordinates for the spline in this order [x1, y1, cpx1, cpy1, cpx2, cpy2, x2, y2].
     * @param {string} penSize Size of the pen to draw the spline. Default to current size.
     */
    drawBasicSpline(pts, penSize = this.canvas.size) {
        this.setupStroke(penSize);
        if (this.canvas.mode === 'paint') {
            this.canvas.ctx.lineWidth = this.canvas.size;
            this.canvas.ctx.shadowColor = this.canvas.color;
            this.canvas.ctx.shadowBlur = 2;
        }
        this.canvas.ctx.moveTo(pts[0], pts[1]);
        this.canvas.ctx.bezierCurveTo(
            pts[2],
            pts[3],
            pts[4],
            pts[5],
            pts[6],
            pts[7]
        );
        this.canvas.ctx.stroke();
        this.canvas.ctx.shadowColor = 'none';
        this.canvas.ctx.shadowBlur = 0;
    }

    /**
     * Distance traveled since last point
     * @param {Event} event
     * @returns {number} distance
     */
    getDistanceTraveled(event) {
        // get positions
        const clientRect = this.canvas.canvasElement.getBoundingClientRect();
        const deltaX =
            this.canvas.xPositions[0] - (event.clientX - clientRect.left);
        const deltaY =
            this.canvas.yPositions[0] - (event.clientY - clientRect.top);
        this.canvas.xPositions[0] = event.clientX - clientRect.left;
        this.canvas.yPositions[0] = event.clientY - clientRect.top;

        // get velocity an distance
        let velocity = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
        const deltaV = Math.abs(this.canvas.velocities[0] - velocity);
        const distance = velocity + this.prevDist;

        // prevent velocity change from being too drastic
        velocity = Math.min(
            Math.max(velocity, this.canvas.velocities[0] - 0.3 * deltaV),
            this.canvas.velocities[0] + 0.3 * deltaV
        );

        // adds coordinate to buffer if we have moved 2 pixels at least since last time
        if (distance > 2) {
            this.moveCoordinatesAdded++;
            this.canvas.xPositions.unshift(event.clientX - clientRect.left);
            this.canvas.yPositions.unshift(event.clientY - clientRect.top);
            this.canvas.velocities.unshift(velocity);
        }
        return distance;
    }

    /**
     * Draw on canvas context based on cursor speed.
     */
    smoothDraw(event) {
        const distance = this.getDistanceTraveled(event);
        if (distance > 2) {
            this.prevDist = 0;
            if (this.moveCoordinatesAdded >= 2) {
                this.moveCoordinatesAdded = 0;
                this.smoothVelocities();
                this.drawSpline();
            }
            if (this.canvas.xPositions.length > 10) {
                this.canvas.xPositions.pop();
                this.canvas.yPositions.pop();
                this.canvas.velocities.pop();
            }
        } else {
            this.prevDist = distance;
        }
    }

    /**
     * Canvas draw dot method.
     */
    drawDot() {
        this.canvas.ctx.beginPath();
        this.canvas.ctx.globalCompositeOperation =
            this.canvas.mode === 'erase' ? 'destination-out' : 'source-over';
        this.canvas.ctx.arc(
            this.canvas.xPositions[0],
            this.canvas.yPositions[0],
            (this.canvas.mode === 'ink'
                ? this.canvas.size / 1.5
                : this.canvas.size) / 2,
            0,
            2 * Math.PI,
            false
        );
        this.canvas.ctx.fillStyle = this.canvas.color;
        this.canvas.ctx.fill();
    }

    /**
     * Test for empty canvas, if its empty, value is set to undefined
     */
    testEmptyCanvas() {
        let transparentCanvas = document.createElement('canvas');
        transparentCanvas.width = this.canvas.canvasElement.width;
        transparentCanvas.height = this.canvas.canvasElement.height;
        if (this.dataURL === transparentCanvas.toDataURL()) {
            this._value = undefined;
            this._foregroundValue = undefined;
        }
    }

    /**
     * Change event handler.
     */
    handleChangeEvent() {
        this._value = this.dataURL;
        this._foregroundValue = this.canvas.canvasElement.toDataURL();
        this.testEmptyCanvas();
        this._updateProxyInputAttributes('value');
        if (this._invalidField) {
            this.reportValidity();
        }

        /**
         * The event fired when the value changed.
         *
         * @event
         * @name change
         * @param {string} dataURL Base64 value of the input.
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

    setToolManager() {
        if (!this.smoothToolManager) {
            this.smoothToolManager = new SmoothToolManager(this.canvas);
        }
        if (!this.straightToolManager) {
            this.straightToolManager = new StraightToolManager(this.canvas);
        }
        if (this.canvas.mode === 'ink' || this.canvas.mode === 'paint') {
            this.toolManager = this.smoothToolManager;
        } else {
            this.toolManager = this.straightToolManager;
        }
    }

    /**
     * Initialize the screen resize observer.
     *
     */
    initResizeObserver() {
        if (!this.canvas.canvasElement) return;
        this._resizeObserver = new AvonniResizeObserver(() => {
            const savedValue = this._foregroundValue;
            clearTimeout(this._resizeTimeout);
            this._resizeTimeout = setTimeout(() => {
                this.canvas.canvasElement.width =
                    this.canvas.canvasElement.parentElement.offsetWidth;
                this.canvas.canvasElement.height =
                    this.canvas.canvasElement.parentElement.offsetHeight;
                this._value = savedValue;
                this.initSrc();
                this.fillBackground();
            }, 100);
        });
        this._resizeObserver.observe(this.canvas.canvasElement);
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
