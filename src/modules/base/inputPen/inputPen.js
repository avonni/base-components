import { FieldConstraintApiWithProxyInput } from 'c/inputUtils';
import { AvonniResizeObserver } from 'c/resizeObserver';
import {
    classSet,
    deepCopy,
    normalizeArray,
    normalizeBoolean,
    normalizeString
} from 'c/utils';
import { LightningElement, api } from 'lwc';
import { SmoothToolManager } from './smoothToolManager';
import { StraightToolManager } from './straightToolManager';

const PEN_MODES = { valid: ['draw', 'paint', 'ink', 'erase'], default: 'draw' };

const TOOLBAR_VARIANTS = {
    valid: ['bottom-toolbar', 'top-toolbar'],
    default: 'bottom-toolbar'
};

const DEFAULT_BACKGROUND_COLORS = [
    '#e3abec',
    '#c2dbf7',
    '#9fd6ff',
    '#9de7da',
    '#9df0bf',
    '#fff099',
    '#fed49a',
    '#d073df',
    '#86b9f3',
    '#5ebbff',
    '#44d8be',
    '#3be281',
    '#ffe654',
    '#ffb758',
    '#bd35bd',
    '#5778c1',
    '#1b96ff',
    '#00aea9',
    '#3bba4c',
    '#f4bc25',
    '#f99120',
    '#580d8c',
    '#001870',
    '#0a2399',
    '#097476',
    '#096a50',
    '#b67d11',
    '#b85d0d',
    '#ffffff00',
    '#D3D3D3',
    '#A9A9A9',
    '#808080',
    '#696969',
    '#3a3a3a',
    '#000000'
];
const DEFAULT_BACKGROUND_BUTTON_ALTERNATIVE_TEXT = 'Background color';
const DEFAULT_BACKGROUND_COLOR = '#ffffff00';
const DEFAULT_CLEAR_BUTTON_ALTERNATIVE_TEXT = 'Clear';
const DEFAULT_COLOR = '#000';
const DEFAULT_COLOR_BUTTON_ALTERNATIVE_TEXT = 'Pen color';
const DEFAULT_DOWNLOAD_BUTTON_ALTERNATIVE_TEXT = 'Download PNG';
const DEFAULT_DRAW_BUTTON_ALTERNATIVE_TEXT = 'Draw';
const DEFAULT_ERASE_BUTTON_ALTERNATIVE_TEXT = 'Erase';
const DEFAULT_INK_BUTTON_ALTERNATIVE_TEXT = 'Ink';
const DEFAULT_PAINT_BUTTON_ALTERNATIVE_TEXT = 'Paint';
const DEFAULT_REDO_BUTTON_ALTERNATIVE_TEXT = 'Redo';
const DEFAULT_REQUIRED_ALTERNATIVE_TEXT = 'Required';
const DEFAULT_SIZE = 3;
const DEFAULT_SIZE_BUTTON_ALTERNATIVE_TEXT = 'Size';
const DEFAULT_UNDO_BUTTON_ALTERNATIVE_TEXT = 'Undo';

/**
 * @class
 * @descriptor avonni-input-pen
 * @storyId example-input-pen--base
 * @public
 */
export default class InputPen extends LightningElement {
    /**
     * Alternative text for the background button.
     *
     * @type {string}
     * @public
     * @default 'Background color'
     */
    @api backgroundButtonAlternativeText =
        DEFAULT_BACKGROUND_BUTTON_ALTERNATIVE_TEXT;
    /**
     * Alternative text for the clear button.
     *
     * @type {string}
     * @public
     * @default 'Clear'
     */
    @api clearButtonAlternativeText = DEFAULT_CLEAR_BUTTON_ALTERNATIVE_TEXT;
    /**
     * Alternative text for the color button.
     *
     * @type {string}
     * @public
     * @default 'Pen color'
     */
    @api colorButtonAlternativeText = DEFAULT_COLOR_BUTTON_ALTERNATIVE_TEXT;
    /**
     * Alternative text for the download button.
     *
     * @type {string}
     * @public
     * @default 'Download PNG'
     */
    @api downloadButtonAlternativeText =
        DEFAULT_DOWNLOAD_BUTTON_ALTERNATIVE_TEXT;
    /**
     * Alternative text for the draw button.
     *
     * @type {string}
     * @public
     * @default 'Draw'
     */
    @api drawButtonAlternativeText = DEFAULT_DRAW_BUTTON_ALTERNATIVE_TEXT;
    /**
     * Alternative text for the erase button.
     *
     * @type {string}
     * @public
     * @default 'Erase'
     */
    @api eraseButtonAlternativeText = DEFAULT_ERASE_BUTTON_ALTERNATIVE_TEXT;
    /**
     * Help text detailing the purpose and function of the input.
     *
     * @type {string}
     * @public
     */
    @api fieldLevelHelp;
    /**
     * Alternative text for the ink button.
     *
     * @type {string}
     * @public
     * @default 'Ink'
     */
    @api inkButtonAlternativeText = DEFAULT_INK_BUTTON_ALTERNATIVE_TEXT;
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
    /**
     * Alternative text for the paint button.
     *
     * @type {string}
     * @public
     * @default 'Paint'
     */
    @api paintButtonAlternativeText = DEFAULT_PAINT_BUTTON_ALTERNATIVE_TEXT;
    /**
     * Alternative text for the redo button.
     *
     * @type {string}
     * @public
     * @default 'Redo'
     */
    @api redoButtonAlternativeText = DEFAULT_REDO_BUTTON_ALTERNATIVE_TEXT;
    /**
     * The assistive text when the required attribute is set to true.
     *
     * @type {string}
     * @public
     */
    @api requiredAlternativeText = DEFAULT_REQUIRED_ALTERNATIVE_TEXT;
    /**
     * Alternative text for the size button.
     *
     * @type {string}
     * @public
     * @default 'Size'
     */
    @api sizeButtonAlternativeText = DEFAULT_SIZE_BUTTON_ALTERNATIVE_TEXT;
    /**
     * Alternative text for the undo button.
     *
     * @type {string}
     * @public
     * @default 'Undo'
     */
    @api undoButtonAlternativeText = DEFAULT_UNDO_BUTTON_ALTERNATIVE_TEXT;

    _color = DEFAULT_COLOR;
    _disabled = false;
    _disabledButtons = [];
    _hideControls = false;
    _mode = PEN_MODES.default;
    _readOnly = false;
    _required = false;
    _showSignaturePad = false;
    _size = DEFAULT_SIZE;
    _value;
    _variant = TOOLBAR_VARIANTS.default;

    _constraintApi;
    _constraintApiProxyInputUpdater;
    _cursor;
    _backgroundCanvasElement;
    _backgroundColor = DEFAULT_BACKGROUND_COLOR;
    _backgroundCtx;
    _foregroundValue;
    _invalidField = false;
    _rendered = false;
    _resizeObserver;
    _resizeTimeout;
    _toolManager;
    _updatedDOM = false;

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
    defaultBackgroundColors = DEFAULT_BACKGROUND_COLORS;
    drawingArea;
    helpMessage;
    redoStack = [];
    showExtraActions = true;
    sizeList;
    undoStack = [];

    constructor() {
        super();
        window.addEventListener('mouseup', this.handleMouseUp);
        window.addEventListener('touchend', this.handleMouseUp);
        window.addEventListener('touchmove', this.handleMouseMove);
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('keydown', this.handleKeyDown);
    }

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        this.sizeList = [...Array(100).keys()].slice(1).map((x) => {
            return { label: `${x}px`, value: x };
        });
    }

    renderedCallback() {
        if (this.actionsSlot) {
            this.showExtraActions =
                this.actionsSlot.assignedElements().length !== 0;
        }
        if (!this._rendered || this._updatedDOM) {
            this.canvasInfo.canvasElement = this.template.querySelector(
                '[data-element-id="canvas"]'
            );
            this._backgroundCanvasElement = this.template.querySelector(
                '[data-element-id="background-canvas"]'
            );
            this.canvasInfo.ctx =
                this.canvasInfo.canvasElement.getContext('2d');
            this._backgroundCtx =
                this._backgroundCanvasElement.getContext('2d');

            this.drawingArea = this.template.querySelector(
                '[data-element-id="drawing-area"]'
            );
            this.canvasInfo.canvasElement.width = this.drawingArea.clientWidth;
            this.canvasInfo.canvasElement.height =
                this.drawingArea.clientHeight;
            this._backgroundCanvasElement.width = this.drawingArea.clientWidth;
            this._backgroundCanvasElement.height =
                this.drawingArea.clientHeight;

            this.initResizeObserver();
            this.setToolManager();
            this.fillBackground();
            this.initCursorStyles();
            this.computeCursorClass();
            this.computeSelectedToolClass();
            if (this._foregroundValue) {
                this.initSrc();
            }
            if (this.showSignaturePad) {
                this.setInk();
            }

            this._rendered = true;
            this._updatedDOM = false;
        }
    }

    disconnectedCallback() {
        window.removeEventListener('mouseup', this.handleMouseUp);
        window.removeEventListener('touchend', this.handleMouseUp);
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('touchmove', this.handleMouseMove);
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Defines the color of the background
     *
     * @type {string}
     * @public
     * @default #ffffff00
     */
    @api
    get backgroundColor() {
        return this._backgroundColor;
    }
    set backgroundColor(value) {
        const colorValue =
            typeof value === 'string' || value instanceof String
                ? value
                : DEFAULT_BACKGROUND_COLOR;
        let style = new Option().style;
        style.backgroundColor = colorValue;
        if (
            ['inherit', 'initial', 'unset'].includes(colorValue) ||
            style.backgroundColor === ''
        ) {
            return;
        }
        this._backgroundColor = colorValue;
        this.fillBackground();
        this.handleChange();
    }

    /**
     * Color of the pen.
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
        const colorValue =
            typeof value === 'string' || value instanceof String
                ? value
                : DEFAULT_COLOR;
        const style = new Option().style;
        style.color = colorValue;
        if (
            ['inherit', 'initial', 'unset'].includes(colorValue) ||
            style.color === ''
        ) {
            return;
        }
        this._color = colorValue;
        this.canvasInfo.color = this._color;
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
    }

    /**
     * Array of buttons to remove from the toolbar. Values include pen, paintbrush, eraser, ink, size, color, background, download, undo, redo, clear.
     *
     * @type {string[]}
     * @public
     */
    @api
    get disabledButtons() {
        return this._disabledButtons;
    }
    set disabledButtons(value) {
        let arrayValue = value;
        if (typeof arrayValue === 'string') {
            arrayValue = [value];
        }
        this._disabledButtons = normalizeArray(arrayValue, 'string');
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
        return this.controlsHidden || this._hideControls;
    }
    set hideControls(value) {
        this._hideControls = normalizeBoolean(value);
        this._updatedDOM = true;
    }

    /**
     * If true, the field is considered invalid (The "invalid" attribute is deprecated. Use "validity" instead).
     *
     * @type {boolean}
     * @default false
     */
    @api
    get invalid() {
        return !this.validity;
    }
    set invalid(value) {
        console.warn(
            'The "invalid" attribute is deprecated. Use "validity" instead.'
        );
        this._invalidField = normalizeBoolean(value);
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
        return this._mode;
    }
    set mode(value) {
        this.setMode(value);
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
    }

    /**
     * If present, adds signature pad at the bottom of input. Also sets default drawing mode to ink.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get showSignaturePad() {
        return this._showSignaturePad;
    }
    set showSignaturePad(value) {
        this._showSignaturePad = normalizeBoolean(value);
        if (this._showSignaturePad && this._rendered) {
            this.setInk();
        }
        this._updatedDOM = true;
    }

    /**
     * Size of the pen.
     *
     * @type {string}
     * @public
     * @default 3
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
        if (value && this.value !== value) {
            this._value = value;
            this._foregroundValue = value;
            if (this._rendered) {
                this.initSrc();
            }
        }
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
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Get the button slot DOM element.
     *
     * @type {Element}
     */
    get actionsSlot() {
        return this.template.querySelector('slot[name=actions]');
    }

    /**
     * Computed class of the canvas.
     */
    get computedCanvasClass() {
        return classSet('avonni-input-pen__canvas slds-is-absolute').add({
            'avonni-input-pen__canvas_disabled': this._disabled
        });
    }

    /**
     * Computed class of the rich text editor.
     */
    get computedRichTextEditorClasses() {
        return classSet(
            'slds-rich-text-editor slds-grid slds-grid_vertical slds-nowrap avonni-input-pen__rich-text_border-radius'
        ).add({
            'slds-grid_vertical-reverse': this.variant === 'bottom-toolbar',
            'slds-has-error': this._invalidField
        });
    }

    /**
     * Computed class of the text area.
     */
    get computedTextAreaClasses() {
        return classSet(
            'slds-rich-text-editor__textarea slds-grid avonni-input-pen__text-area avonni-input-pen__text-area_no-touch-scroll'
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
            'slds-rich-text-editor__toolbar avonni-input-pen__toolbar_border-bottom'
        ).add({
            'avonni-input-pen__toolbar_border-top-reverse':
                this.variant === 'top-toolbar'
        });
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
                        return !this.value && this.required;
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

    /**
     * Returns true if all controls are hidden.
     *
     * @type {boolean}
     */
    get controlsHidden() {
        return (
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
        );
    }

    /**
     * Base64 value of the background and foreground.
     */
    get dataURL() {
        let mergedCanvas = document.createElement('canvas');
        mergedCanvas.width = this.canvasInfo.canvasElement.width;
        mergedCanvas.height = this.canvasInfo.canvasElement.height;
        if (
            mergedCanvas.width > 0 &&
            mergedCanvas.height > 0 &&
            this._backgroundCanvasElement.width > 0 &&
            this._backgroundCanvasElement.height > 0
        ) {
            const mergedCtx = mergedCanvas.getContext('2d');
            mergedCtx.drawImage(this._backgroundCanvasElement, 0, 0);
            mergedCtx.drawImage(this.canvasInfo.canvasElement, 0, 0);
            return mergedCanvas.toDataURL();
        }
        return undefined;
    }

    /**
     * If the redo button should be disabled.
     */
    get disabledRedoButton() {
        return this.disabled || !this.redoStack.length;
    }

    /**
     * If the undo button should be disabled.
     */
    get disabledUndoButton() {
        return this.disabled || !this.undoStack.length;
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
     * True if the selected tool is the drawing pencil.
     *
     * @type {boolean}
     */
    get selectedDraw() {
        return this.mode === 'draw';
    }

    /**
     * True if the selected tool is the paint brush.
     *
     * @type {boolean}
     */
    get selectedPaint() {
        return this.mode === 'paint';
    }

    /**
     * Check if background fill tool is shown.
     * @type {boolean}
     */
    get showBackground() {
        return !this.disabledButtons.includes('background');
    }

    /**
     * Check if Clear is shown.
     *
     * @type {boolean}
     */
    get showClear() {
        return !this.disabledButtons.includes('clear');
    }

    /**
     * Check if Color is shown.
     *
     * @type {boolean}
     */
    get showColor() {
        return !this.disabledButtons.includes('color');
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
     * Check if download button is shown.
     * @type {boolean}
     *
     */
    get showDownload() {
        return !this.disabledButtons.includes('download');
    }

    /**
     * Check if eraser tool is shown.
     * @type {boolean}
     *
     */
    get showErase() {
        return !this.disabledButtons.includes('eraser');
    }

    /**
     * Check if showInk is shown.
     *
     * @type {boolean}
     */
    get showInk() {
        return !this.disabledButtons.includes('ink');
    }

    /**
     * Check if showPaint is shown.
     *
     * @type {boolean}
     */
    get showPaint() {
        return !this.disabledButtons.includes('paintbrush');
    }

    /**
     * Check if pen tool is shown.
     * @type {boolean}
     */
    get showPen() {
        return !this.disabledButtons.includes('pen');
    }

    /**
     * Check if redo button is shown.
     * @type {boolean}
     *
     */
    get showRedo() {
        return !this.disabledButtons.includes('redo');
    }

    /**
     * Check if Size is shown.
     *
     * @type {boolean}
     */
    get showSize() {
        return !this.disabledButtons.includes('size');
    }

    /**
     * Check if undo button is shown.
     *
     * @type {boolean}
     */
    get showUndo() {
        return !this.disabledButtons.includes('undo');
    }

    /**
     * Check if undo and redo buttons are shown.
     * @type {boolean}
     *
     */
    get showUndoRedo() {
        return this.showUndo || this.showRedo;
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
            this.handleChange();
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
        if (!this.redoStack.length) return;

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
        this.redoStack =
            actionsRecreated === -1
                ? []
                : this.redoStack.slice(actionsRecreated);

        this.executeAction(currentState);
        this.handleChange();
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
        this._mode = normalizeString(modeName, {
            fallbackValue: PEN_MODES.default,
            validValues: PEN_MODES.valid
        });
        this.canvasInfo.mode = this.mode;
        this.computeSelectedToolClass();
        this.setToolManager();
        this.computeCursorClass();
        this.initCursorStyles();
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
        if (!this.undoStack.length) return;

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
        this.handleChange();
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Set the visibility class on cursor depending on mode.
     */
    computeCursorClass() {
        const drawArea = this.template.querySelector(
            '[data-element-id="drawing-area"]'
        );
        if (!drawArea) return;

        const cursorClass = 'avonni-input-pen__text-area_visible-cursor';
        drawArea.classList.toggle(cursorClass, this.canvasInfo.mode === 'ink');
    }

    /**
     * Set the selected tool class on the toolbar.
     */
    computeSelectedToolClass() {
        const tools = this.template.querySelectorAll(
            '[data-element-id$="-tool"]'
        );
        tools.forEach((tool) => {
            const isSelected = tool.matches(
                `[data-element-id^="${this.mode}-"]`
            );
            tool.classList.toggle('slds-is-selected', isSelected);
        });
    }

    /**
     * Execute an action
     * @param {object} action
     */
    executeAction(action) {
        this.loadAction(action);

        switch (action.requestedEvent) {
            case 'clear':
                this.clear(true);
                break;
            case 'state':
            case 'fill':
                this.fillBackground();
                break;
            default:
                this.manageMouseEvent(action.requestedEvent, action);
                break;
        }
    }

    /**
     * Fill background color to backgroundColor value.
     */
    fillBackground() {
        if (!this._backgroundCtx) return;

        this._backgroundCtx.clearRect(
            0,
            0,
            this.canvasInfo.canvasElement.width,
            this.canvasInfo.canvasElement.height
        );
        this._backgroundCtx.globalAlpha = this.parseAlpha(
            this._backgroundColor
        );
        this._backgroundCtx.fillStyle = this._backgroundColor;
        this._backgroundCtx.rect(
            0,
            0,
            this.canvasInfo.canvasElement.width,
            this.canvasInfo.canvasElement.height
        );
        this._backgroundCtx.fill();
    }

    /**
     * Hides draw cursor
     */
    hideDrawCursor() {
        if (this._cursor) {
            this._cursor.style.opacity = 0;
        }
    }

    /**
     * Initialize Cursor styling.
     */
    initCursorStyles() {
        this._cursor = this.showCursor
            ? this.template.querySelector('[data-element-id="cursor"]')
            : undefined;

        if (this._cursor) {
            this._cursor.style.setProperty('--size', this.size);
            this._cursor.style.setProperty(
                '--color',
                this.mode === 'erase' ? '#ffffff' : this.color
            );
        }
    }

    /**
     * Initialize the Image canvas and dom elements.
     */
    initSrc() {
        if (this._foregroundValue?.startsWith('data:image/')) {
            let img = new Image();
            img.onload = () => {
                this.canvasInfo.ctx.drawImage(img, 0, 0);
                this.handleChange();
            };
            img.src = this._foregroundValue;
        } else {
            this.clear(true);
        }
    }

    /**
     * Initialize the screen resize observer.
     *
     */
    initResizeObserver() {
        const { canvasElement } = this.canvasInfo;
        if (!canvasElement) return;

        const handleResize = () => {
            const savedValue = this._foregroundValue;
            clearTimeout(this._resizeTimeout);
            this._resizeTimeout = setTimeout(() => {
                const { offsetWidth, offsetHeight } =
                    canvasElement.parentElement;
                canvasElement.width = offsetWidth;
                canvasElement.height = offsetHeight;
                this._value = savedValue;
                this.initSrc();
                this.fillBackground();
            }, 100);
        };

        this._resizeObserver = new AvonniResizeObserver(
            canvasElement,
            handleResize
        );
    }

    /**
     * loads an action state onto component
     * @param {object} action action to load
     */
    loadAction(action) {
        this.isDownFlag = action.isDownFlag;
        this.canvasInfo.mode = action.mode;
        this._mode = action.mode;
        this.setToolManager();
        this.canvasInfo.xPositions = action.xPositions;
        this.canvasInfo.yPositions = action.yPositions;
        this.canvasInfo.velocities = action.velocities;
        this.canvasInfo.color = action.color;
        this._color = action.color;
        this.canvasInfo.size = action.size;
        this._size = action.size;
        if (action.backgroundColor) {
            this._backgroundColor = action.backgroundColor;
        }
    }

    /**
     * Search the canvas element for coordinates on Event trigger.
     *
     * @param {string} requestedEvent
     * @param {Event} event
     */
    manageMouseEvent(requestedEvent, event) {
        if (this.disabled || this.readOnly) return;

        switch (requestedEvent) {
            case 'down':
                this.saveAction(event, true);
                this._toolManager.setupLine(event);
                this.isDownFlag = true;
                break;
            case 'up':
                if (this.isDownFlag) {
                    this.saveAction(event, true);
                    this._toolManager.closeLine(event);
                    this.handleChange();
                }
                this.isDownFlag = false;
                break;
            case 'move':
                if (this.isDownFlag) {
                    this.saveAction(event, true);
                    this._toolManager.draw(event);
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
        if (!this._cursor) return;

        const clientRect =
            this.canvasInfo.canvasElement.getBoundingClientRect();
        let left = event.clientX - clientRect.left - this.canvasInfo.size / 2;
        let top = event.clientY - clientRect.top - this.canvasInfo.size / 2;

        this._cursor.style.left = `${left}px`;
        this._cursor.style.top = `${top}px`;
    }

    /**
     * Parse the alpha value from the color.
     */
    parseAlpha(color) {
        let alpha = 1;

        if (/^(?:#(?:[0-9a-fA-F]{8}))$/gm.test(color)) {
            // Hexadecimal with alpha (Example: #fff00f80)
            alpha = parseInt(color.slice(7), 16) / 255;
        } else if (/^rgba\(.+\)$/.test(color) || /^hsla\(.+\)$/.test(color)) {
            // rgba or hsla (Examples: rgba(255, 0, 15, 0.5), hsla(10, 40%, 13%, 0.6))
            alpha = parseFloat(color.split(',').pop().split(')')[0].trim(), 10);
        }
        return alpha;
    }

    /**
     * Saves action to undo buffer.
     * @param {object | Event} event event to save as action
     * @param {boolean} checkForAction check if event is an action. If it is, don't save it.
     *
     */
    saveAction(event, checkForAction = false) {
        if (checkForAction && event.isAction) return;

        let action = {
            isAction: true,
            isDownFlag: this.isDownFlag,
            xPositions: deepCopy(this.canvasInfo.xPositions),
            yPositions: deepCopy(this.canvasInfo.yPositions),
            velocities: deepCopy(this.canvasInfo.velocities),
            mode: this.canvasInfo.mode,
            color: this.canvasInfo.color,
            size: this.canvasInfo.size,
            requestedEvent: event.type.includes('mouse')
                ? event.type.split('mouse')[1]
                : event.type
        };

        if (!event.currentState) {
            this.redoStack = [];
            action.backgroundColor = this.backgroundColor;
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
     * Set the Mode to Draw.
     */
    setDraw() {
        this.setMode('draw');
    }

    /**
     * Set the Mode to Erase.
     */
    setErase() {
        this.setMode('erase');
    }

    /**
     * Set the Mode to Draw.
     */
    setInk() {
        this.setMode('ink');
    }

    /**
     * Set the Mode to Draw.
     */
    setPaint() {
        this.setMode('paint');
    }

    /**
     * Set the Tool Manager based on the mode.
     */
    setToolManager() {
        if (!this.smoothToolManager) {
            this.smoothToolManager = new SmoothToolManager(this.canvasInfo);
        }
        if (!this.straightToolManager) {
            this.straightToolManager = new StraightToolManager(this.canvasInfo);
        }

        this._toolManager =
            this.mode === 'ink' || this.mode === 'paint'
                ? this.smoothToolManager
                : this.straightToolManager;
    }

    /**
     * shows draw cursor
     */
    showDrawCursor() {
        if (!this.disabled && this._cursor) {
            this._cursor.style.opacity = 1;
        }
    }

    /**
     * Test for empty canvas, if its empty, value is set to undefined
     */
    testEmptyCanvas() {
        const transparentCanvas = document.createElement('canvas');
        transparentCanvas.width = this.canvasInfo.canvasElement.width;
        transparentCanvas.height = this.canvasInfo.canvasElement.height;

        if (this._value === transparentCanvas.toDataURL()) {
            this._value = undefined;
            this._foregroundValue = undefined;
        }
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

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLER
     * -------------------------------------------------------------
     */

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
        this.handleChange();
    }

    /**
     * Change event handler.
     */
    handleChange() {
        if (!this.canvasInfo.canvasElement) return;

        this._value = this.dataURL;
        this._foregroundValue = this.canvasInfo.canvasElement.toDataURL();
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
                detail: { dataURL: this.value }
            })
        );
    }

    /**
     * Color change handler.
     *
     * @param {Event} event
     */
    handleColorChange(event) {
        this._color = event.detail.hex;
        this.canvasInfo.color = this._color;
        if (this._cursor) {
            this._cursor.style.setProperty('--color', this._color);
        }
        if (this.mode === 'erase') {
            this.setDraw();
        }
    }

    /**
     * handle download event
     */
    handleDownload() {
        this.download();
    }

    /**
     * Handle a key pressed on the clear button.
     *
     * @param {Event} event
     */
    handleClearButtonKeyDown(event) {
        if (
            event.key === 'Enter' ||
            event.key === ' ' ||
            event.key === 'Spacebar'
        ) {
            event.preventDefault();
            this.clear();
        }
    }

    /**
     * handle key down event
     *
     * @param {Event} event
     */
    handleKeyDown = (event) => {
        if (
            (event.key === 'y' && event.ctrlKey) ||
            (event.key === 'z' && event.metaKey && event.shiftKey)
        ) {
            // ctrl-y
            this.redo();
        } else if (
            (event.key === 'z' && event.ctrlKey) ||
            (event.key === 'z' && event.metaKey)
        ) {
            // ctrl-z
            this.undo();
        }
    };

    /**
     * Mouse down handler. Search canvas coordinates on event trigger.
     *
     * @param {Event} event
     */
    handleMouseDown = (event) => {
        if (event.touches && event.touches.length >= 1) {
            event.clientX = event.touches[0].clientX;
            event.clientY = event.touches[0].clientY;
        }
        this.manageMouseEvent('down', event);
    };

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
     * Mouse move handler. Search canvas coordinates on event trigger.
     *
     * @param {Event} event
     */
    handleMouseMove = (event) => {
        if (event.touches && event.touches.length >= 1) {
            event.clientX = event.touches[0].clientX;
            event.clientY = event.touches[0].clientY;
        }
        this.manageMouseEvent('move', event);
    };

    /**
     * Mouse up handler. Search canvas coordinates on event trigger.
     *
     * @param {Event} event
     */
    handleMouseUp = (event) => {
        if (event.touches && event.touches.length >= 1) {
            event.clientX = event.touches[0].clientX;
            event.clientY = event.touches[0].clientY;
        }
        this.manageMouseEvent('up', event);
    };

    /**
     * handle redo event
     */
    handleRedo() {
        this.redo();
    }

    /**
     * handle reset event
     *
     * @param {Event} event
     */
    handleReset(event) {
        this.clear();
        event.stopPropagation();
    }

    /**
     * Size change handler. Change cursor size.
     *
     * @param {Event} event
     */
    handleSizeChange(event) {
        const newSize = Number(event.detail.value);
        this.canvasInfo.size = newSize;
        this._size = newSize;

        if (this._cursor) {
            this._cursor.style.setProperty('--size', newSize);
        }
    }

    /**
     * handle undo event
     */
    handleUndo() {
        this.undo();
    }
}
