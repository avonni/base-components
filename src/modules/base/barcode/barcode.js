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
import {
    normalizeBoolean,
    normalizeString,
    LIBRARY_ENCODING_VALUE,
    BARCODE_LIBRARY
} from 'c/utilsPrivate';
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
const DEFAULT_TEXT_COLOR = '#000000';

/**
 * @class
 * @name Barcode
 * @descriptor avonni-barcode
 * @storyId example-barcode--base
 * @public
 */
export default class Barcode extends LightningElement {
    /**
     * The color of the background. Valid formats include color name, HEX and RGB.
     *
     * @public
     * @type {string}
     * @default #fff
     */
    @api background = DEFAULT_BACKGROUND;

    /**
     * The color of the barcode. Valid formats include color name, HEX and RGB.
     *
     * @public
     * @type {string}
     */
    @api color = DEFAULT_COLOR;

    /**
     * The width of the barcode in pixels.
     *
     * @public
     * @type {number}
     * @default 300
     */
    @api size = DEFAULT_SIZE;

    /**
     * The color of the text.
     *
     * @public
     * @type {string}
     * @default #000000
     */
    @api textColor = DEFAULT_TEXT_COLOR;

    /**
     * The type of the symbology (barcode encoding). Valid values include EAN8, EAN13, UPCE, UPCA, Code11, Code39, Code39Extended, Code93, Code93Extended, Code128, Code128A, Code128B, Code128C, GS1-128, MSImod10, MSImod11, MSImod1010, MSImod1110 and POSTNET.
     *
     * @public
     * @type {string}
     * @default CODE39
     */
    @api type = SYMBOLOGY.default;

    /**
     * The value of the barcode.
     *
     * @public
     * @type {string}
     */
    @api value;

    _renderAs = RENDERING_ENGINE.default;
    _hideValue = false;
    _checksum = false;
    _type = SYMBOLOGY.default;

    _initialRender = false;

    renderedCallback() {
        if (!this._initialRender) this.setCanvasWidth();
        this._initialRender = true;
        this.renderBarcode();
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */
    /**
     * Returns wether the barcode can be rendered as an svg element.
     *
     * @returns {boolean}
     */
    get renderAsSVG() {
        return this.renderAs === 'svg' && this.barcodeLibrary === 'jsbarcode';
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

    /*
     * ------------------------------------------------------------
     * PRIVATE METHODS
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
    get barcodeLibrary() {
        return BARCODE_LIBRARY.get(this.type);
    }

    /**
     * Returns the canvas DOM element.
     *
     * @returns {object} canvas
     */
    get canvas() {
        return this.template.querySelector('[data-element-id="barcode"]');
    }

    /**
     * Returns the value for the encoding.
     *
     * @returns {string} canvas
     */
    get libraryEncodingValue() {
        return LIBRARY_ENCODING_VALUE.get(this.type);
    }

    /**
     * Sets the width for the canvas.
     */
    setCanvasWidth() {
        const element = this.template.querySelector(
            '[data-element-id="canvas-wrapper"]'
        );
        element.style.width = `${this.size}px`;
    }

    /**
     * Switch case switches based on the library used to render the barcode. The libraries are BwipJs and JsBarCode.Each case calls the corresponding render method.
     */
    @api
    renderBarcode() {
        switch (this.barcodeLibrary) {
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
        const canvas = this.canvas;
        bwipjs.toCanvas(canvas, {
            bcid: this.libraryEncodingValue,
            text: this.value,
            includetext: !this.hideValue,
            includecheck: this.checksum,
            includecheckintext: this.checksum,
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
            JsBarcode(this.canvas, this.value, {
                format: this.libraryEncodingValue,
                lineColor: this.color,
                background: this.background,
                displayValue: !this.hideValue,
                margin: 0,
                fontSize: 15
            });
            JsBarcode('.barcode').init();
            return;
        }
        JsBarcode(this.canvas, this.value, {
            format: this.libraryEncodingValue,
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
