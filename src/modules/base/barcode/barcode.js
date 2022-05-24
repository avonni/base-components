// /**
//  * BSD 3-Clause License
//  *
//  * Copyright (c) 2021, Avonni Labs, Inc.
//  * All rights reserved.
//  *
//  * Redistribution and use in source and binary forms, with or without
//  * modification, are permitted provided that the following conditions are met:
//  *
//  * - Redistributions of source code must retain the above copyright notice, this
//  *   list of conditions and the following disclaimer.
//  *
//  * - Redistributions in binary form must reproduce the above copyright notice,
//  *   this list of conditions and the following disclaimer in the documentation
//  *   and/or other materials provided with the distribution.
//  *
//  * - Neither the name of the copyright holder nor the names of its
//  *   contributors may be used to endorse or promote products derived from
//  *   this software without specific prior written permission.
//  *
//  * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
//  * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//  * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
//  * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
//  * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
//  * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
//  * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
//  * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
//  * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
//  * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//  */

import { LightningElement, api } from 'lwc';
import { normalizeBoolean, normalizeString } from 'c/utilsPrivate';
import { LIBRARY_ENCODING_VALUE, BARCODE_LIBRARY } from 'c/utilsPrivate';
import bwipjs from 'bwip-js';
import JsBarcode from 'jsbarcode';

const SYMBOLOGY = {
    valid: [
        'EAN8',
        'EAN13',
        'UPCE',
        'UPCA',
        'Code11',
        'CODE39',
        'Code39Extended',
        'Code93',
        'Code93Extended',
        'CODE128',
        'CODE128A',
        'CODE128B',
        'CODE128C',
        'GS1-128',
        'MSImod10',
        'MSImod11',
        'MSImod1010',
        'MSImod1110',
        'POSTNET'
    ],
    default: 'CODE39'
};

const RENDERING_ENGINE = {
    valid: ['canvas', 'svg'],
    default: 'svg'
};

const DEFAULT_BACKGROUND = '#ffffff';
const DEFAULT_COLOR = '#000000';
const DEFAULT_SIZE = 300;
const DEFAULT_HIDE_VALUE = false;
const DEFAULT_CHECKSUM = false;
const DEFAULT_TEXT_COLOR = '#000000';
const DEFAULT_INITIAL_VALUE = false;

/**
 * @class
 * @name Barcode
 * @descriptor avonni-barcode
 * @storyId example-barcode--base
 * @public
 */
export default class Barcode extends LightningElement {
    /**
     * The value of the barcode.
     *
     * @public
     * @type {number}
     */
    @api value;

    _background = DEFAULT_BACKGROUND;
    _color = DEFAULT_COLOR;
    _renderAs = RENDERING_ENGINE.default;
    _size = DEFAULT_SIZE;
    _hideValue = DEFAULT_HIDE_VALUE;
    _checksum = DEFAULT_CHECKSUM;
    _textColor = DEFAULT_TEXT_COLOR;
    _type = SYMBOLOGY.default;

    _initialRender = DEFAULT_INITIAL_VALUE;

    renderedCallback() {
        console.log('RERENDERED');
        if (!this._initialRender) this.initBarcode();
        this._initialRender = true;
        this.renderBarcode();
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    @api
    get renderAsSVG() {
        return (
            this.renderAs === 'svg' && this.getBarcodeLibrary() === 'jsbarcode'
        );
    }

    /**
     * The color of the background. Valid formats include color name, HEX and RGB.
     *
     * @public
     * @type {string}
     * @default #fff
     */
    @api
    get background() {
        return this._background;
    }

    set background(value) {
        this._background = value;
    }

    /**
     * Hide the value of the barcode checksum. If true, the barcode will display the checksum digit next to the value in the text area.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get checksum() {
        return this._checksum;
    }
    set checksum(value) {
        this._checksum = normalizeBoolean(value);
    }

    /**
     * The color of the barcode. Valid formats include color name, HEX and RGB.
     *
     * @public
     * @type {string}
     */
    @api
    get color() {
        return this._color;
    }
    set color(value) {
        this._color = value;
    }

    /**
     * Hide the value of the barcode.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get hideValue() {
        return this._hideValue;
    }
    set hideValue(value) {
        this._hideValue = normalizeBoolean(value);
    }

    /**
     * The rendering engine of the barcode. Valid values include svg and canvas.
     *
     * @public
     * @type {string}
     * @default svg
     */
    @api
    get renderAs() {
        return this._renderAs;
    }
    set renderAs(value) {
        this._renderAs = normalizeString(value, {
            fallbackValue: RENDERING_ENGINE.actionDefault,
            validValues: RENDERING_ENGINE.valid
        });
    }

    /**
     * The width of the barcode in pixels.
     *
     * @public
     * @type {number}
     * @default 300
     */
    @api
    get size() {
        return this._size;
    }
    set size(value) {
        this._size = value;
    }

    /**
     * The color of the text.
     *
     * @public
     * @type {string}
     * @default #000000
     */
    @api
    get textColor() {
        return this._textColor;
    }
    set textColor(value) {
        this._textColor = value;
    }

    /**
     * The type of the symbology (barcode encoding). Valid values include EAN8, EAN13, UPCE, UPCA, Code11, Code39, Code39Extended, Code93, Code93Extended, Code128, Code128A, Code128B, Code128C, GS1-128, MSImod10, MSImod11, MSImod1010, MSImod1110 and POSTNET.
     *
     * @public
     * @type {string}
     * @default CODE39
     */
    @api
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }

    /*
     * ------------------------------------------------------------
     * PRIVATE PROPERTIES
     * ------------------------------------------------------------
     */
    /**
     * Returns the numeric value from a HEX value, ex: #000000 returns 000000.
     *
     * @returns {string} color value
     */
    extractColorFromHEX(color) {
        return color.substring(1);
    }

    /**
     * Returns the library used to render the barcode.
     *
     * @returns {string} canvas
     */
    getBarcodeLibrary() {
        return BARCODE_LIBRARY.get(this.type);
    }

    /**
     * Returns the canvas DOM element.
     *
     * @returns {object} canvas
     */
    getCanvas() {
        return this.template.querySelector('[data-element-id="barcode"]');
    }

    /**
     * Returns the value for the encoding.
     *
     * @returns {string} canvas
     */
    getLibraryEncodingValue() {
        return LIBRARY_ENCODING_VALUE.get(this.type);
    }

    /**
     * Calls the methods necessary to initials the barcode attributes.
     */
    initBarcode() {
        this.setCanvasWidth();
    }

    /*
     * ------------------------------------------------------------
     * PRIVATE METHODS
     * ------------------------------------------------------------
     */
    /**
     * Sets the width for the canvas.
     */
    setCanvasWidth() {
        let element = this.template.querySelector(
            '[data-element-id="canvas-wrapper"]'
        );
        element.style.width = `${this.size}px`;
    }

    /**
     * Switch case switches based on the library used to render the barcode. The libraries are BwipJs and JsBarCode.Each case calls the corresponding render method.
     */
    @api
    renderBarcode() {
        switch (this.getBarcodeLibrary()) {
            case 'bwipjs':
                this.renderWithBwipJs();
                break;
            case 'jsbarcode':
                this.renderWithJsBarCode();
                break;
            default:
                break;
        }
    }

    /**
     * Renders barcode with Bwipjs library.
     */

    renderWithBwipJs() {
        const canvas = this.getCanvas();
        if (this.checksum) {
            console.log('with checksum');
            bwipjs.toCanvas(canvas, {
                bcid: this.getLibraryEncodingValue(),
                text: this.value,
                includetext: !this.hideValue,
                includecheck: true,
                includecheckintext: true,
                textxalign: 'center',
                barcolor: this.extractColorFromHEX(this.color),
                backgroundcolor: this.extractColorFromHEX(this.background),
                textcolor: this.extractColorFromHEX(this.textColor)
            });
            return;
        }
        console.log('without checksum');
        bwipjs.toCanvas(canvas, {
            bcid: this.getLibraryEncodingValue(),
            text: this.value,
            includetext: !this.hideValue,
            includecheck: false,
            includecheckintext: false,
            textxalign: 'center',
            barcolor: this.extractColorFromHEX(this.color),
            backgroundcolor: this.extractColorFromHEX(this.background),
            textcolor: this.extractColorFromHEX(this.textColor)
        });
    }

    /**
     * Renders barcode with JsBarCode library.
     */
    renderWithJsBarCode() {
        if (this.checksum) {
            JsBarcode(this.getCanvas(), this.value, {
                format: this.getLibraryEncodingValue(),
                lineColor: this.color,
                background: this.background,
                displayValue: !this.hideValue,
                margin: 0,
                fontSize: 15
            });
            JsBarcode('.barcode').init();
            return;
        }
        JsBarcode(this.getCanvas(), this.value, {
            format: this.getLibraryEncodingValue(),
            lineColor: this.color,
            background: this.background,
            text: this.value,
            displayValue: !this.hideValue,
            margin: 0,
            fontSize: 15
        });
        JsBarcode('.barcode').init();
    }
}
