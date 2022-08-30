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
} from 'c/utilsPrivate';
import {
    BARCODE_VALUE_FORMAT,
    BWIPP_ENCODERS
} from './barcodeUtils';
import bwipjs from 'bwip-js';

const SYMBOLOGY = {
    valid: BWIPP_ENCODERS,
    default: 'code39'
};

const DEFAULT_BACKGROUND = '#ffffff';
const DEFAULT_COLOR = '#000000';
const DEFAULT_TEXT_COLOR = '#000000';

/**
 * @class
 * @name Barcode
 * @description The barcode provides a builder to create a plethora of different types of barcodes.
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
     * The color of the text.
     *
     * @public
     * @type {string}
     * @default #000000
     */
    @api textColor = DEFAULT_TEXT_COLOR;

    /**
     * The barcode type. The supported barcode types are auspost, azteccode, azteccodecompact, aztecrune, bc412, channelcode, codablockf, code11, code128, code16k, code2of5, code32, code39, code39ext, code49, code93, code93ext, codeone, coop2of5, daft, databarexpanded, databarexpandedcomposite, databarexpandedstacked, databarexpandedstackedcomposite, databarlimited, databarlimitedcomposite, databaromni,  databaromnicomposite, databarstacked, databarstackedcomposite, databarstackedomni, databarstackedomnicomposite, databartruncated, databartruncatedcomposite, datalogic2of5, datamatrix, datamatrixrectangular, datamatrixrectangularextension, dotcode, ean13, ean13composite, ean14, ean2, ean5, ean8, ean8composite, flattermarken, gs1-128, gs1-128composite, gs1-cc, gs1datamatrix, gs1datamatrixrectangular, gs1dotcode, gs1northamericancoupon, gs1qrcode, hanxin, hibcazteccode, hibccodablockf, hibccode128, hibccode39, hibcdatamatrix, hibcdatamatrixrectangular, hibcmicropdf417, hibcpdf417, hibcqrcode, iata2of5, identcode, industrial2of5, interleaved2of5, isbn, ismn, issn, itf14, japanpost, kix, leitcode, mailmark, matrix2of5, maxicode, micropdf417, microqrcode, msi, onecode, pdf417, pdf417compact, pharmacode, pharmacode2, planet, plessey, posicode, postnet, pzn, qrcode, rationalizedCodabar, raw, rectangularmicroqrcode, royalmail, sscc18, symbol, telepen, telepennumeric, ultracode, upca, upcacomposite, upce and upcecomposite.
     *
     * @public
     * @type {string}
     * @default code39
     */
    @api type = SYMBOLOGY.default;

    /**
     * The value of the barcode.
     *
     * @public
     * @type {string}
     */
    @api value;

    _checksum = false;
    _hideValue = false;
    _type = SYMBOLOGY.default;

    invalidValue = false;

    renderedCallback() {
        try {
            this.renderBarcode();
            this.invalidValue = false;
        } catch (e) {
            console.log(e, this.type);
            this.invalidValue = true;
        }
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * The format that the barcode value should follow.
     */
    @api
    get formatRules() {
        return BARCODE_VALUE_FORMAT.get(this.type);
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
     * The width of the code.
     *
     * @public
     * @type {boolean}
     */
    @api
    get width() {
        return this._width;
    }
    set width(value) {
        this._width = value;
    }

    /**
     * The max-height of the code.
     *
     * @public
     * @type {boolean}
     */
    @api
    get height() {
        return this._height;
    }
    set height(value) {
        this._height = value;
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
    colorHexCode(color) {
        return color.substring(1);
    }

    /**
     * Returns the canvas DOM element.
     *
     * @returns {object} canvas
     */
    get canvas() {
        return this.template.querySelector('[data-element-id="barcode"]');
    }

    get widthStyle() {
        return this.width != null ? `width: ${this.width}px;`: 'width: 100%;';
    }
    get heightStyle() {
        return this.height != null ? `height: ${this.height}px;`: '';
    }

    /**
     * Sets the width for the canvas.
     */
    get barcodeStyle() {
        return `${this.widthStyle} ${this.heightStyle} object-fit: contain;`;
    }

    /**
     * Renders barcode with Bwipjs library.
     */
    // renderWithBwipJs() {
    renderBarcode() {
        const canvas = this.canvas;
        bwipjs.toCanvas(canvas, {
            bcid: this.type,
            text: this.value,
            includetext: !this.hideValue,
            includecheck: this.checksum,
            includecheckintext: this.checksum,
            textxalign: 'center',
            barcolor: this.colorHexCode(this.color),
            backgroundcolor: this.colorHexCode(this.background),
            textcolor: this.colorHexCode(this.textColor)
        });
    }
}
