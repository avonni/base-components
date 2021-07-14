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
import { keyCodes } from 'c/utilsPrivate';
import { generateUniqueId, getErrorMessage } from 'c/inputUtils';
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
    _hueValue = null;
    _rgb = {
        red: '86',
        green: '121',
        blue: '192'
    };
    _hex = '#5679C0';
    _errorMessage = null;
    _currentColor = null;

    constructor() {
        super();

        this.uniqueId = generateUniqueId();
    }

    _initialized = false;
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

    /**
     * Current color value
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
        this._hex = fullHex;
        this._rgb = hexToRgb(fullHex);
    }

    /**
     * Focus anchor element
     * @public
     */
    @api
    focus() {
        this.anchorElement.focus();
    }

    /**
     * Localization
     * @returns object i18n
     */
    get i18n() {
        return i18n;
    }

    /**
     * Compute thumbnail styling
     * @returns string
     */
    get thumbnailStyle() {
        return `background: ${this._hex || 'hsl(220, 46%, 55%)'};`;
    }

    /**
     * Compute gradient styling
     * @returns string
     */
    get gradientStyle() {
        return `background: ${
            this._hex || 'rgb(0, 85, 255)'
        }; position: relative;`;
    }

    /**
     * Get Canvas object dimensions
     * @returns CANVAS x, y coordinates
     */
    get canvasRect() {
        return CANVAS;
    }

    /**
     * Get DOM anchor element
     * @returns object HTMLElement
     */
    get anchorElement() {
        return this.template.querySelector('*[data-id="color-anchor"]');
    }

    /**
     * Get DOM thumbnail element
     * @returns object HTMLElement
     */
    get thumbnailElement() {
        return this.template.querySelector('*[data-id="color-preview"]');
    }

    /**
     * Get DOM gradient element
     * @returns object HTMLElement
     */
    get gradientElement() {
        return this.template.querySelector('*[data-id="color-gradient"]');
    }

    /**
     * Computed Saturation and Brightness styling
     * @returns string
     */
    get computedSaturationAndBrightness() {
        const rgb = this._rgb;
        const saturation = rgbToHsv(rgb).saturation || 0;
        const brightness = rgbToHsv(rgb).brightness || 0;

        return `Saturation: ${saturation.toFixed()}%. Brightness: ${brightness.toFixed()}%.`;
    }

    /**
     * Prevent event default handler
     * @param {object} event
     */
    handlePreventDefault(event) {
        event.preventDefault();
    }

    /**
     * Color select event handler
     * @param {object} event
     */
    selectColor(event) {
        this.dispatchEvent(
            /**
             * @event
             * @name updatecolor
             * @params {string} color
             * @bubbles
             * @composed
             * @cancelable
             */
            // eslint-disable-next-line lightning-global/no-custom-event-bubbling
            new CustomEvent('updatecolor', {
                bubbles: true,
                composed: true,
                cancelable: true,
                detail: { color: event.target.innerText }
            })
        );
    }

    /**
     * Mouse down event handler
     * @param {object} event
     */
    handleMouseDown(event) {
        event.preventDefault();
        this.onMouseDrag(event, true);
    }

    /**
     * Mouse Drag event handler
     * @param {object} event
     */
    handleDrag(event) {
        this.onMouseDrag(event, false);
    }

    /**
     * On Change handler assign rainbow cursor
     */
    onChange() {
        this.rainbowCursor();
    }

    /**
     * Parse and limit color numerical values
     * @param {number} value
     * @returns number out
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
     * RGB Change handler
     * @param {object} event
     */
    handleRgbChange(event) {
        const target = event.currentTarget;
        const value = this.parseAndLimit(target.value);
        // Fix for no rerender on second bad value attempt
        target.value = value;

        const color = target.getAttribute('data-color-name');
        if (color === 'red') {
            this._rgb.red = value;
        } else if (color === 'green') {
            this._rgb.green = value;
        } else if (color === 'blue') {
            this._rgb.blue = value;
        }

        const rgb = this._rgb;

        const hue = rgbToHsl(rgb).hue;
        const position = this.rgbToPosition(rgb);
        const selectedColor = `#${rgbToHex(rgb)}`;

        this.updateRainbow(hue);
        this.setCanvasColor(hue);
        this.setCanvasCursor(position.x, position.y);
        this.updateSelectedColor(selectedColor);
    }

    /**
     * Hex Change handler
     * @param {object} event 
     */
    handleHexChange(event) {
        const isInputValid = event.srcElement.validity.valid;

        if (isInputValid) {
            const selectedColor = fullHexValue(event.target.value);
            this.classList.remove('slds-has-error');
            this._errorMessage = null;

            const rgb = hexToRgb(selectedColor);
            this._rgb = rgb;

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
     * Update Selected Color
     * @param {string} selectedColor 
     */
    updateSelectedColor(selectedColor) {
        this.template
            .querySelector(`[data-primary-input]`)
            .classList.remove('slds-has-error');
        this._errorMessage = null;

        this._hex = selectedColor;

        /**
         * @event
         * @name updateselectedcolor
         * @params {string} color
         * @bubbles
         * @composed
         * @cancelable
         */
        this.dispatchEvent(
            // eslint-disable-next-line lightning-global/no-custom-event-bubbling
            new CustomEvent('updateselectedcolor', {
                bubbles: true,
                composed: true,
                cancelable: true,
                detail: { color: selectedColor }
            })
        );
    }

    /**
     * Mouse Drag handler
     * @param {object} event 
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
     * Compute hue gradient and update canvas
     */
    gradient() {
        const hue = rgbToHsl(this._rgb).hue;
        this.canvasContext();
        this.setCanvasColor(hue);
        this.updateRainbow(hue);
    }

    /**
     * Compute color from gradient from x,y coordinates of cursor position
     * @param {object} event 
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
        this.setCanvasColor(this._hueValue);

        // set color from gradient
        this.setRGBValues(x, y);
    }

    /**
     * Compute color with cursor position on hue slider
     */
    rainbowCursor() {
        const rainbow = this.template.querySelector('*[data-id="hue-slider"]');
        const position = this._cachePosition || this.rgbToPosition(this._rgb);

        this.setCanvasColor(rainbow.value);
        this.setRGBValues(position.x, position.y);
        this.updateRainbow(rainbow.value);
    }

    /**
     * Update hue color
     * @param {string} hue 
     */
    updateRainbow(hue) {
        this._hueValue = hue;
    }

    /**
     * Update anchor element position handler
     */
    handleUpdateAnchor() {
        const position = this._cachePosition || this.rgbToPosition(this._rgb);

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
     * Get Cursor position on canvas gradient
     * @param {object} event 
     * @returns object{} x,y number coordinates
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
     * Get Cursor position from keydown event on canvas gradient
     * @param {object} event 
     * @returns object{} x,y number coordinates
     */
    gradientCursorPositionFromKeydown(event) {
        event.preventDefault();
        const canvas = this._canvas;
        const gradientCanvas = canvas.getBoundingClientRect();
        const keyCode = event.keyCode;
        let x, y;

        if (!this._cachePosition) {
            this._cachePosition = this.rgbToPosition(this._rgb);
        }

        const positionMap = {};
        positionMap[keyCodes.left] = { x: -1, y: 0 };
        positionMap[keyCodes.up] = { x: 0, y: -1 };
        positionMap[keyCodes.right] = { x: +1, y: 0 };
        positionMap[keyCodes.down] = { x: 0, y: +1 };

        const transform = positionMap[keyCode]
            ? positionMap[keyCode]
            : { x: 0, y: 0 };
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
     * RGB values compute
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
        this._rgb = rgb;
        this.updateSelectedColor(color);
        this.handleUpdateAnchor();
    }

    /**
     * Set Canvas color
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
     * Set Cursor position on canvas
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
     * Set Canvas context on canvas DOM element
     */
    canvasContext() {
        this._canvas = this.template.querySelector('canvas');
        this._canvasCtx = this._canvas.getContext('2d');
        this._cursorActive = false;
    }

    /**
     * Keydown handler
     * @param {object} event 
     */
    handleKeydown(event) {
        this.getColorFromGradient(event);
    }

    /**
     * Use RGB to set position on canvas
     * @param {string} rgb 
     * @returns object x,y number
     */
    rgbToPosition(rgb) {
        return rgbToPosition(rgb, this.canvasRect);
    }
}
