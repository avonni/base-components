import { LightningElement, api } from 'lwc';
import { keyValues } from 'c/utilsPrivate';
import { generateUUID } from 'c/utils';
import { getErrorMessage } from 'c/inputUtils';
import {
    fullHexValue,
    hexToRgb,
    rgbToHex,
    rgbToHsl,
    rgbToPosition,
    rgbToHsv
} from './colorUtil';

const i18n = {
    bInput: 'B',
    blueAbbr: 'Blue',
    colorPickerInstructions:
        'Use arrow keys to select a saturation and brightness, on an x and y axis.',
    errorMessage: 'Enter a valid hexadecimal value.',
    gInput: 'G',
    greenAbbr: 'Green',
    hexLabel: 'Hex',
    hueInput: 'Select Hue',
    rInput: 'R',
    redAbbr: 'Red'
};

const CANVAS = { x: 198, y: 80 };

/**
 * @class
 * @descriptor avonni-color-picker-custom
 */
export default class ColorPickerCustom extends LightningElement {
    _currentColor = null;

    errorMessage = null;
    hex = '#5679C0';
    hueValue = null;
    rgb = {
        red: '86',
        green: '121',
        blue: '192'
    };
    _initialized = false;

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    constructor() {
        super();

        this.uniqueId = generateUUID();
    }

    renderedCallback() {
        if (!this._initialized) {
            // eslint-disable-next-line @lwc/lwc/no-async-operation
            requestAnimationFrame(() => {
                this.focus();
            });
            this.gradient();
            this.handleUpdateAnchor();
            this._initialized = true;
        }
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Current color value.
     *
     * @public
     * @type {string}
     */
    @api
    get currentColor() {
        return this._currentColor;
    }
    set currentColor(value) {
        const fullHex = fullHexValue(value);
        this._currentColor = value;
        this.hex = fullHex;
        this.rgb = hexToRgb(fullHex);
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Get DOM anchor element.
     *
     * @type {Element}
     */
    get anchorElement() {
        return this.template.querySelector('*[data-id="color-anchor"]');
    }

    /**
     * Get Canvas object dimensions.
     *
     * @type {object}
     */
    get canvasRect() {
        return CANVAS;
    }

    /**
     * Computed Saturation and Brightness styling.
     *
     * @type {string}
     */
    get computedSaturationAndBrightness() {
        const rgb = this.rgb;
        const saturation = rgbToHsv(rgb).saturation || 0;
        const brightness = rgbToHsv(rgb).brightness || 0;

        return `Saturation: ${saturation.toFixed()}%. Brightness: ${brightness.toFixed()}%.`;
    }

    /**
     * Get DOM gradient element.
     *
     * @type {Element}
     */
    get gradientElement() {
        return this.template.querySelector('*[data-id="color-gradient"]');
    }

    /**
     * Compute gradient styling.
     *
     * @type {string}
     */
    get gradientStyle() {
        return `background: ${
            this.hex || 'rgb(0, 85, 255)'
        }; position: relative;`;
    }

    /**
     * Localization.
     *
     * @type {object}
     */
    get i18n() {
        return i18n;
    }

    /**
     * Get DOM thumbnail element.
     *
     * @type {Element}
     */
    get thumbnailElement() {
        return this.template.querySelector('*[data-id="color-preview"]');
    }

    /**
     * Compute thumbnail styling.
     *
     * @type {string}
     */
    get thumbnailStyle() {
        return `background: ${this.hex || 'hsl(220, 46%, 55%)'};`;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Focus anchor element.
     *
     * @public
     */
    @api
    focus() {
        this.anchorElement.focus();
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Set Canvas context on canvas DOM element.
     */
    canvasContext() {
        this._canvas = this.template.querySelector('canvas');
        this._canvasCtx = this._canvas.getContext('2d');
        this._cursorActive = false;
    }

    /**
     * Compute color from gradient from x,y coordinates of cursor position.
     *
     * @param {Event} event
     */
    getColorFromGradient(event) {
        let cursorPosition;

        if (event.type === 'keydown' && event.key !== 'Tab') {
            cursorPosition = this.gradientCursorPositionFromKeydown(event);
        } else if (event.type === 'mousedown' || event.type === 'mousemove') {
            cursorPosition = this.gradientCursorPosition(event);
        } else {
            return;
        }

        const x = cursorPosition.x;
        const y = cursorPosition.y;

        // Get the current HUE value and update the canvas & cursor
        this.setCanvasColor(this.hueValue);

        // set color from gradient
        this.setRGBValues(x, y);
    }

    /**
     * Compute hue gradient and update canvas.
     */
    gradient() {
        const hue = rgbToHsl(this.rgb).hue;
        this.canvasContext();
        this.setCanvasColor(hue);
        this.updateRainbow(hue);
    }

    /**
     * Get Cursor position on canvas gradient.
     *
     * @param {Event} event
     * @returns {object} x,y number coordinates
     */
    gradientCursorPosition(event) {
        const canvas = this._canvas;
        const gradientCanvas = canvas.getBoundingClientRect();

        let x = event.clientX - gradientCanvas.left;
        let y = event.clientY - gradientCanvas.top;

        if (x > gradientCanvas.width) {
            x = gradientCanvas.width - 1;
        }
        if (x < 0) {
            x = 0;
        }
        if (y > gradientCanvas.height) {
            y = gradientCanvas.height;
        }
        if (y < 0) {
            y = 0;
        }

        /*
         * Caching the position x & y in the component so that we can use it when moving the rainbow slider
         * instead of calculating the position of x & y each time.
         */
        this._cachePosition = { x, y };
        return { x, y };
    }

    /**
     * Get Cursor position from keydown event on canvas gradient.
     *
     * @param {Event} event
     * @return {object} x,y number coordinates
     */
    gradientCursorPositionFromKeydown(event) {
        event.preventDefault();
        const canvas = this._canvas;
        const gradientCanvas = canvas.getBoundingClientRect();
        const key = event.key;
        let x, y;

        if (!this._cachePosition) {
            this._cachePosition = this.rgbToPosition(this.rgb);
        }

        const positionMap = {};
        positionMap[keyValues.left] = { x: -1, y: 0 };
        positionMap[keyValues.up] = { x: 0, y: -1 };
        positionMap[keyValues.right] = { x: +1, y: 0 };
        positionMap[keyValues.down] = { x: 0, y: +1 };

        const transform = positionMap[key] ? positionMap[key] : { x: 0, y: 0 };
        x = this._cachePosition.x + transform.x;
        y = this._cachePosition.y + transform.y;

        if (x > gradientCanvas.width) {
            x = gradientCanvas.width - 1;
        }
        if (x < 0) {
            x = 0;
        }
        if (y > gradientCanvas.height) {
            y = gradientCanvas.height;
        }
        if (y < 0) {
            y = 0;
        }

        /*
         * Caching the position x & y in the component so that we can use it when moving the rainbow slider
         * instead of calculating the position of x & y each time.
         */
        this._cachePosition = { x, y };
        return { x, y };
    }

    /**
     * Mouse Drag handler.
     *
     * @param {Event} event
     * @param {boolean} isGradientCursor
     */
    onMouseDrag(event, isGradientCursor) {
        const that = this;
        let drag = false;

        if (isGradientCursor) {
            this.getColorFromGradient(event);
        } else {
            this.rainbowCursor();
        }

        if (this._mousedown && this._mousemove && this._mouseup) {
            return;
        }

        that._mousedown = function () {
            drag = true;
            this._cursorActive = true;
        };

        that._mouseup = function () {
            drag = false;
            this._cursorActive = false;

            window.removeEventListener('mousedown', that._mousedown);
            window.removeEventListener('mouseup', that._mouseup);
            window.removeEventListener('mousemove', that._mousemove);

            that._mousedown = null;
            that._mouseup = null;
            that._mousemove = null;
        };

        that._mousemove = function (evt) {
            if (drag && isGradientCursor) {
                that.getColorFromGradient(evt);
            } else if (drag) {
                that.rainbowCursor();
            }
        };

        window.addEventListener('mousedown', that._mousedown);
        window.addEventListener('mouseup', that._mouseup);
        window.addEventListener('mousemove', that._mousemove);
    }

    /**
     * Parse and limit color numerical values.
     *
     * @param {number} value
     * @return {number} out
     */
    parseAndLimit(value) {
        let out = value;
        if (!value || parseInt(value, 10) < 0 || isNaN(value)) {
            out = 0;
        } else if (parseInt(value, 10) > 255) {
            out = 255;
        }
        return out;
    }

    /**
     * Compute color with cursor position on hue slider.
     */
    rainbowCursor() {
        const rainbow = this.template.querySelector('*[data-id="hue-slider"]');
        const position = this._cachePosition || this.rgbToPosition(this.rgb);

        this.setCanvasColor(rainbow.value);
        this.setRGBValues(position.x, position.y);
        this.updateRainbow(rainbow.value);
    }

    /**
     * Color select event handler.
     *
     * @param {Event} event
     */
    selectColor(event) {
        this.dispatchEvent(
            /**
             * Event that fires when updating the color value.
             *
             * @event
             * @name updatecolor
             * @params {string} color
             * @bubbles
             * @composed
             * @cancelable
             */
            new CustomEvent('updatecolor', {
                bubbles: true,
                composed: true,
                cancelable: true,
                detail: { color: event.target.innerText }
            })
        );
    }

    /**
     * Set Canvas color.
     *
     * @param {string} hue
     */
    setCanvasColor(hue) {
        const ctx = this._canvasCtx;
        // don't map the gradient onto extreme left and right to make extremes have their max values
        const white = ctx.createLinearGradient(1, 0, this.canvasRect.x - 1, 0);
        white.addColorStop(0, 'rgb(255,255,255)');
        white.addColorStop(1, 'hsl(' + hue + ', 100%, 50%)');
        ctx.fillStyle = white;
        ctx.fillRect(0, 0, this.canvasRect.x, this.canvasRect.y);

        // starting y is the first line to avoid blending the black into the hue, thus
        // making extreme values unselectable
        const black = ctx.createLinearGradient(0, 1, 0, this.canvasRect.y);
        black.addColorStop(0, 'rgba(0,0,0,0)');
        black.addColorStop(1, 'rgb(0,0,0)');
        ctx.fillStyle = black;
        ctx.fillRect(0, 0, this.canvasRect.x, this.canvasRect.y);
    }

    /**
     * Set Cursor position on canvas.
     *
     * @param {number} x
     * @param {number} y
     */
    setCanvasCursor(x, y) {
        const position = { x, y };

        const anchor = this.anchorElement;
        const offset = anchor.offsetWidth / 2;
        x = position.x - offset + 5;
        y = position.y - offset - 5;
        const xPercent = (x / this._canvas.width) * 100;
        const yPercent = (y / this._canvas.height) * 100;

        anchor.style.left = `${xPercent}%`;
        anchor.style.top = `${yPercent}%`;
    }

    /**
     * RGB values compute.
     *
     * @param {number} x
     * @param {number} y
     */
    setRGBValues(x, y) {
        const ctx = this._canvasCtx;
        const imageData = ctx.getImageData(x, y, 1, 1).data;
        const rgb = {
            red: imageData[0],
            green: imageData[1],
            blue: imageData[2]
        };
        const color = `#${rgbToHex(rgb)}`;
        this.rgb = rgb;
        this.updateSelectedColor(color);
        this.handleUpdateAnchor();
    }

    /**
     * Update hue color.
     *
     * @param {string} hue
     */
    updateRainbow(hue) {
        this.hueValue = hue;
    }

    /**
     * Update Selected Color.
     *
     * @param {string} selectedColor
     */
    updateSelectedColor(selectedColor) {
        this.template
            .querySelector(`[data-primary-input]`)
            .classList.remove('slds-has-error');
        this._errorMessage = null;

        this.hex = selectedColor;

        /**
         * The event that fires when the selected color is updated.
         *
         * @event
         * @name updateselectedcolor
         * @params {string} color
         * @bubbles
         * @composed
         * @cancelable
         */
        this.dispatchEvent(
            new CustomEvent('updateselectedcolor', {
                bubbles: true,
                composed: true,
                cancelable: true,
                detail: { color: selectedColor }
            })
        );
    }

    /**
     * Use RGB to set position on canvas.
     *
     * @param {string} rgb
     * @returns object x,y number
     */
    rgbToPosition(rgb) {
        return rgbToPosition(rgb, this.canvasRect);
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS & DISPATCHERS
     * -------------------------------------------------------------
     */

    /**
     * Update anchor element position handler.
     */
    handleUpdateAnchor() {
        const position = this._cachePosition || this.rgbToPosition(this.rgb);

        const anchor = this.anchorElement;
        const offset = anchor.offsetWidth / 2;
        const x = position.x - offset + 5;
        const y = position.y - offset - 5;
        const xPercent = (x / this._canvas.width) * 100;
        const yPercent = (y / this._canvas.height) * 100;

        anchor.style.left = `${xPercent}%`;
        anchor.style.top = `${yPercent}%`;
    }

    /**
     * On Change handler assign rainbow cursor.
     */
    handleChange() {
        this.rainbowCursor();
    }

    /**
     * Mouse Drag event handler.
     *
     * @param {Event} event
     */
    handleDrag(event) {
        this.onMouseDrag(event, false);
    }

    /**
     * Hex Change handler.
     *
     * @param {Event} event
     */
    handleHexChange(event) {
        const isInputValid = event.srcElement.validity.valid;

        if (isInputValid) {
            const selectedColor = fullHexValue(event.target.value);
            this.classList.remove('slds-has-error');
            this._errorMessage = null;

            const rgb = hexToRgb(selectedColor);
            this.rgb = rgb;

            const hue = rgbToHsl(rgb).hue;
            const position = this.rgbToPosition(rgb);

            this.updateRainbow(hue);
            this.setCanvasColor(hue);
            this.setCanvasCursor(position.x, position.y);
            this.updateSelectedColor(selectedColor);
        } else {
            event.srcElement.classList.add('slds-has-error');
            this._errorMessage = getErrorMessage(event.srcElement.validity, {
                patternMismatch: this.i18n.errorMessage
            });
        }
    }

    /**
     * Keydown handler.
     *
     * @param {Event} event
     */
    handleKeydown(event) {
        this.getColorFromGradient(event);
    }

    /**
     * Mouse down event handler.
     *
     * @param {Event} event
     */
    handleMouseDown(event) {
        event.preventDefault();
        this.onMouseDrag(event, true);
    }

    /**
     * Prevent event default handler.
     *
     * @param {Event} event
     */
    handlePreventDefault(event) {
        event.preventDefault();
    }

    /**
     * RGB Change handler.
     *
     * @param {Event} event
     */
    handleRgbChange(event) {
        const target = event.currentTarget;
        const value = this.parseAndLimit(target.value);
        // Fix for no rerender on second bad value attempt
        target.value = value;

        const color = target.getAttribute('data-color-name');
        if (color === 'red') {
            this.rgb.red = value;
        } else if (color === 'green') {
            this.rgb.green = value;
        } else if (color === 'blue') {
            this.rgb.blue = value;
        }

        const rgb = this.rgb;

        const hue = rgbToHsl(rgb).hue;
        const position = this.rgbToPosition(rgb);
        const selectedColor = `#${rgbToHex(rgb)}`;

        this.updateRainbow(hue);
        this.setCanvasColor(hue);
        this.setCanvasCursor(position.x, position.y);
        this.updateSelectedColor(selectedColor);
    }
}
