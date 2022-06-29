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
import { StraightToolManager } from './straightToolManager';
import { SmoothToolManager } from './smoothToolManager';

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

/**
 * @class
 * @descriptor avonni-input-pen
 * @storyId example-input-pen--base
 * @public
 */
export default class InputPen extends LightningElement {
    /**
     * Array of buttons to remove from the toolbar. Values include pen, paintbrush, eraser, ink, size, color, background, download, undo, redo, clear.
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

    _rendered = false;
    _updatedDOM = false;

    toolManager;
    canvasInfo = {
        xPositions: [],
        yPositions: [],
        velocities: [],
        color: DEFAULT_COLOR,
        mode: PEN_MODES.default,
        size: DEFAULT_SIZE,
        ctx: undefined,
        canvasElement: undefined
    };

    foregroundValue = undefined;
    backgroundCanvasElement;
    backgroundCtx;
    cursor;

    undoStack = [];
    redoStack = [];

    helpMessage;
    _invalidField = false;
    _constraintApi;
    _constraintApiProxyInputUpdater;

    _resizeObserver;
    _resizeTimeout;

    sizeList;
    _size = DEFAULT_SIZE;

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
            this.canvasInfo.canvasElement = this.template.querySelector(
                '[data-element-id="canvas"]'
            );
            this.backgroundCanvasElement = this.template.querySelector(
                '[data-element-id="background-canvas"]'
            );
            this.canvasInfo.ctx =
                this.canvasInfo.canvasElement.getContext('2d');
            this.backgroundCtx = this.backgroundCanvasElement.getContext('2d');

            this.canvasInfo.canvasElement.width =
                this.canvasInfo.canvasElement.parentElement.clientWidth;
            this.canvasInfo.canvasElement.height =
                this.canvasInfo.canvasElement.parentElement.clientHeight;
            this.backgroundCanvasElement.width =
                this.canvasInfo.canvasElement.parentElement.clientWidth;
            this.backgroundCanvasElement.height =
                this.canvasInfo.canvasElement.parentElement.clientHeight;

            this.setToolManager();
            this.initResizeObserver();
            this.fillBackground();
            this.initCursorStyles();
            if (this.foregroundValue) {
                this.initSrc();
            }
            if (this.showSignaturePad) {
                this.setInk();
            }
            // I cant find any other way to affect the combobox width since there are not styling hooks for it.
            if (!this.hideControls && this.showSize) {
                let combobox = this.template.querySelector(
                    '[data-element-id="size-picker"]'
                );
                const style = document.createElement('style');
                style.innerText =
                    '.avonni-input-pen__combobox .slds-dropdown_fluid {min-width: 100px; justify-content: flex-start}';
                combobox.appendChild(style);
            }

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
        return this.canvasInfo.color;
    }

    set color(value) {
        const hexColorRegex = /^#([0-9a-f]{3}){1,2}$/i;
        if (hexColorRegex.test(normalizeString(value))) {
            this.canvasInfo.color = value;
        } else {
            this.canvasInfo.color = DEFAULT_COLOR;
        }
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
            !this.showPaint &&
            !this.showInk &&
            !this.showErase &&
            !this.showSize &&
            !this.showColor &&
            !this.showBackground &&
            !this.showDownload &&
            !this.showUndo &&
            !this.showRedo &&
            !this.showClear
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
        return this.canvasInfo.mode;
    }

    set mode(value) {
        this.canvasInfo.mode = normalizeString(value, {
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
            if (this._rendered) {
                this.setInk();
            }
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
        return this._size;
    }

    set size(value) {
        const intValue = parseInt(value, 10);
        if (!isNaN(intValue)) {
            this.canvasInfo.size = intValue;
            this._size = intValue;
            this.initCursorStyles();
        } else {
            this.canvasInfo.size = DEFAULT_SIZE;
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
        this.foregroundValue = value;

        if (this.canvasInfo.ctx) {
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
     * Computed class of the rich text editor.
     */
    get computedRichTextEditorClasses() {
        return classSet(
            'slds-rich-text-editor slds-grid slds-grid_vertical slds-nowrap avonni-input-pen__rich-text_border-radius'
        ).add({
            'avonni-input-pen__rich-text_flex-direction':
                this.variant === 'bottom-toolbar'
        });
    }

    /**
     * Computed class of the text area.
     */
    get computedTextAreaClasses() {
        return classSet(
            'slds-rich-text-editor__textarea slds-grid avonni-input-pen__text-area'
        ).add({
            'avonni-input-pen__rich-text_border-radius-top':
                this.variant === 'bottom-toolbar',
            'avonni-input-pen__text-area_cursor':
                this.disabled || this.readOnly,
            'avonni-input-pen__rich-text_border-radius-bottom':
                this.variant === 'top-toolbar'
        });
    }

    /**
     * Computed class of the toolbar.
     */
    get computedToolbarClasses() {
        return classSet(
            'slds-rich-text-editor__toolbar slds-shrink-none slds-grid avonni-input-pen__toolbar_border-bottom'
        ).add({
            'avonni-input-pen__toolbar_border-top-reverse':
                this.variant === 'top-toolbar'
        });
    }

    /**
     * Base64 value of the background and foreground.
     */
    get dataURL() {
        let mergedCanvas = document.createElement('canvas');
        mergedCanvas.width = this.canvasInfo.canvasElement.width;
        mergedCanvas.height = this.canvasInfo.canvasElement.height;
        if (mergedCanvas.width > 0 || mergedCanvas.width > 0) {
            const mergedCtx = mergedCanvas.getContext('2d');
            mergedCtx.drawImage(this.backgroundCanvasElement, 0, 0);
            mergedCtx.drawImage(this.canvasInfo.canvasElement, 0, 0);
            return mergedCanvas.toDataURL();
        }
        return undefined;
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
        return this.canvasInfo.mode !== 'ink';
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
            this.canvasInfo.ctx.clearRect(
                0,
                0,
                this.canvasInfo.canvasElement.width,
                this.canvasInfo.canvasElement.height
            );
            this.fillBackground();
            this.handleChangeEvent();
        }
        if (!automatedClear) {
            this.saveAction({ type: 'state' });
            this.saveAction({ type: 'clear' });
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
        this.saveAction({ type: 'state', currentState: true });
        const currentState = deepCopy(this.undoStack.pop());
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
        this.executeAction(currentState);
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
     * Set the drawing mode. Valid modes include draw, paint, ink and erase.
     *
     * @param {string} modeName
     * @public
     */
    @api
    setMode(modeName) {
        this.canvasInfo.mode = normalizeString(modeName, {
            fallbackValue: this.canvasInfo.mode,
            validValues: PEN_MODES.valid
        });
        const drawArea = this.template.querySelector(
            '[data-element-id="draw-area"]'
        );
        if (drawArea) {
            if (this.canvasInfo.mode === 'ink') {
                drawArea.classList.add(
                    'avonni-input-pen__text-area_visible-cursor'
                );
            } else {
                drawArea.classList.remove(
                    'avonni-input-pen__text-area_visible-cursor'
                );
            }
        }
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
        this.saveAction({ type: 'state', currentState: true });
        const currentState = deepCopy(this.undoStack.pop());
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
        this.executeAction(currentState);
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
            this.foregroundValue &&
            this.foregroundValue.indexOf('data:image/') === 0
        ) {
            let img = new Image();
            img.onload = () => {
                this.canvasInfo.ctx.drawImage(img, 0, 0);
                this.handleChangeEvent();
            };
            img.src = this.foregroundValue;
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
            this.canvasInfo.canvasElement.width,
            this.canvasInfo.canvasElement.height
        );
        this.backgroundCtx.globalAlpha =
            parseInt(this._backgroundColor.slice(7), 16) / 255;
        this.backgroundCtx.fillStyle = this._backgroundColor;
        this.backgroundCtx.rect(
            0,
            0,
            this.canvasInfo.canvasElement.width,
            this.canvasInfo.canvasElement.height
        );
        this.backgroundCtx.fill();
    }

    /**
     * Initialize Cursor styling.
     */
    initCursorStyles() {
        if (this.showCursor) {
            this.cursor = this.template.querySelector(
                '[data-element-id="cursor"]'
            );
        } else {
            this.cursor = undefined;
        }
        if (this.cursor) {
            this.cursor.style.setProperty('--size', this.canvasInfo.size);
            this.cursor.style.setProperty(
                '--color',
                this.canvasInfo.mode === 'erase'
                    ? '#ffffff'
                    : this.canvasInfo.color
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
        this.canvasInfo.color = event.detail.hex;
        if (this.cursor) {
            this.cursor.style.setProperty('--color', this.canvasInfo.color);
        }
        if (this.canvasInfo.mode === 'erase') {
            this.setDraw();
        }
    }

    /**
     * Background color change handler.
     *
     * @param {Event} event
     */
    handleBackgroundColorChange(event) {
        this.saveAction({ type: 'state' });
        this._backgroundColor = event.detail.hexa;
        this.fillBackground();
        this.saveAction({ type: 'fill' });
        this.handleChangeEvent();
    }

    /**
     * Size change handler. Change cursor size.
     *
     * @param {Event} event
     */
    handleSizeChange(event) {
        this.canvasInfo.size = Number(event.detail.value);
        this._size = Number(event.detail.value);
        if (this.cursor) {
            this.cursor.style.setProperty('--size', this.canvasInfo.size);
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
    handleMouseEnter() {
        if (!this.disabled && !this.readOnly) {
            this.showDrawCursor();
        }
    }

    /**
     * Mouse leave handler. Set opacity to 0.
     */
    handleMouseLeave() {
        if (!this.disabled && !this.readOnly) {
            this.hideDrawCursor();
        }
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

        let action = {};
        action.isAction = true;
        action.isDownFlag = this.isDownFlag;
        action.xPositions = deepCopy(this.canvasInfo.xPositions);
        action.yPositions = deepCopy(this.canvasInfo.yPositions);
        action.velocities = deepCopy(this.canvasInfo.velocities);
        action.mode = this.canvasInfo.mode;
        action.color = this.canvasInfo.color;
        action.size = this.canvasInfo.size;

        if (!event.currentState) {
            this.redoStack = [];
            action.backgroundColor = this._backgroundColor;
        }
        action.requestedEvent = event.type.split('mouse')[1];
        if (!action.requestedEvent) {
            action.requestedEvent = event.type;
        }
        if (!isNaN(event.clientX)) {
            action.clientX = event.clientX;
        }
        if (!isNaN(event.clientY)) {
            action.clientY = event.clientY;
        }
        if (action.requestedEvent === 'down') {
            this.saveAction({ type: 'state' });
        }
        this.undoStack.push(action);
    }

    /**
     * loads an action state onto component
     * @param {object} action action to load
     */
    loadAction(action) {
        this.isDownFlag = action.isDownFlag;
        this.canvasInfo.mode = action.mode;
        this.setToolManager();
        this.canvasInfo.xPositions = action.xPositions;
        this.canvasInfo.yPositions = action.yPositions;
        this.canvasInfo.velocities = action.velocities;
        this.canvasInfo.color = action.color;
        this.canvasInfo.size = action.size;
        if (action.backgroundColor) {
            this._backgroundColor = action.backgroundColor;
        }
    }

    /**
     * Execute an action
     * @param {object} action
     */
    executeAction(action) {
        this.loadAction(action);
        if (action.requestedEvent === 'clear') {
            this.clear(true);
        } else if (
            action.requestedEvent === 'state' ||
            action.requestedEvent === 'fill'
        ) {
            this.fillBackground();
        } else {
            this.manageMouseEvent(action.requestedEvent, action);
        }
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
                if (!event.isAction) {
                    this.moveCursor(event);
                }
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
        const clientRect =
            this.canvasInfo.canvasElement.getBoundingClientRect();
        let left = event.clientX - clientRect.left - this.canvasInfo.size / 2;
        let top = event.clientY - clientRect.top - this.canvasInfo.size / 2;

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
     * Test for empty canvas, if its empty, value is set to undefined
     */
    testEmptyCanvas() {
        let transparentCanvas = document.createElement('canvas');
        transparentCanvas.width = this.canvasInfo.canvasElement.width;
        transparentCanvas.height = this.canvasInfo.canvasElement.height;
        if (this._value === transparentCanvas.toDataURL()) {
            this._value = undefined;
            this.foregroundValue = undefined;
        }
    }

    /**
     * Change event handler.
     */
    handleChangeEvent() {
        this._value = this.dataURL;
        this.foregroundValue = this.canvasInfo.canvasElement.toDataURL();
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
     * Get the button slot DOM element.
     *
     * @type {Element}
     */
    get buttonSlot() {
        return this.template.querySelector('slot[name=button]');
    }

    setToolManager() {
        if (!this.smoothToolManager) {
            this.smoothToolManager = new SmoothToolManager(this.canvasInfo);
        }
        if (!this.straightToolManager) {
            this.straightToolManager = new StraightToolManager(this.canvasInfo);
        }
        if (
            this.canvasInfo.mode === 'ink' ||
            this.canvasInfo.mode === 'paint'
        ) {
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
        if (!this.canvasInfo.canvasElement) return;
        this._resizeObserver = new AvonniResizeObserver(() => {
            const savedValue = this.foregroundValue;
            clearTimeout(this._resizeTimeout);
            this._resizeTimeout = setTimeout(() => {
                this.canvasInfo.canvasElement.width =
                    this.canvasInfo.canvasElement.parentElement.offsetWidth;
                this.canvasInfo.canvasElement.height =
                    this.canvasInfo.canvasElement.parentElement.offsetHeight;
                this._value = savedValue;
                this.initSrc();
                this.fillBackground();
            }, 100);
        });
        this._resizeObserver.observe(this.canvasInfo.canvasElement);
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
