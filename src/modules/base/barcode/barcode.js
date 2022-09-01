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
import { normalizeBoolean } from 'c/utilsPrivate';
import bwipjs from 'bwip-js';
import { normalizeString } from '../utilsPrivate/normalize';

const DEFAULT_BACKGROUND = '#ffffff';
const DEFAULT_COLOR = '#000000';
const DEFAULT_TEXT_COLOR = '#000000';
const TEXT_ALIGNMENT = {
    valid: [
        'top-left',
        'top-center',
        'top-right',
        'top-justify',
        'center-left',
        'center-center',
        'center-right',
        'center-justify',
        'bottom-left',
        'bottom-center',
        'bottom-right',
        'bottom-justify'
    ],
    default: 'bottom-center'
}
const TEXT_X_ALIGN = ['left', 'center', 'right', 'justify']
const TEXT_Y_ALIGN = ['below', 'center', 'above']
const BWIPP_ENCODERS = [
    'auspost',
    'azteccode',
    'azteccodecompact',
    'aztecrune',
    'bc412',
    'channelcode',
    'codablockf',
    'code11',
    'code128',
    'code16k',
    'code2of5',
    'code32',
    'code39',
    'code39ext',
    'code49',
    'code93',
    'code93ext',
    'codeone',
    'coop2of5',
    'daft',
    'databarexpanded',
    'databarexpandedcomposite',
    'databarexpandedstacked',
    'databarexpandedstackedcomposite',
    'databarlimited',
    'databarlimitedcomposite',
    'databaromni',
    'databaromnicomposite',
    'databarstacked',
    'databarstackedcomposite',
    'databarstackedomni',
    'databarstackedomnicomposite',
    'databartruncated',
    'databartruncatedcomposite',
    'datalogic2of5',
    'datamatrix',
    'datamatrixrectangular',
    'datamatrixrectangularextension',
    'dotcode',
    'ean13',
    'ean13composite',
    'ean14',
    'ean2',
    'ean5',
    'ean8',
    'ean8composite',
    'flattermarken',
    'gs1-128',
    'gs1-128composite',
    'gs1-cc',
    'gs1datamatrix',
    'gs1datamatrixrectangular',
    'gs1dotcode',
    'gs1northamericancoupon',
    'gs1qrcode',
    'hanxin',
    'hibcazteccode',
    'hibccodablockf',
    'hibccode128',
    'hibccode39',
    'hibcdatamatrix',
    'hibcdatamatrixrectangular',
    'hibcmicropdf417',
    'hibcpdf417',
    'hibcqrcode',
    'iata2of5',
    'identcode',
    'industrial2of5',
    'interleaved2of5',
    'isbn',
    'ismn',
    'issn',
    'itf14',
    'japanpost',
    'kix',
    'leitcode',
    'mailmark',
    'matrix2of5',
    'maxicode',
    'micropdf417',
    'microqrcode',
    'msi',
    'onecode',
    'pdf417',
    'pdf417compact',
    'pharmacode',
    'pharmacode2',
    'planet',
    'plessey',
    'posicode',
    'postnet',
    'pzn',
    'qrcode',
    'rationalizedCodabar',
    'raw',
    'rectangularmicroqrcode',
    'royalmail',
    'sscc18',
    'symbol',
    'telepen',
    'telepennumeric',
    'ultracode',
    'upca',
    'upcacomposite',
    'upce',
    'upcecomposite'
];

/**
 * @class
 * @name Barcode
 * @description The barcode component provides a builder to create a plethora of different types of barcodes.
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
     * @default #ffffff
     */
    @api background = DEFAULT_BACKGROUND;

    /**
     * The color of the barcode. Valid formats include color name, HEX and RGB.
     *
     * @public
     * @type {string}
     * @default #000000
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
     * The value of the barcode.
     *
     * @public
     * @type {string}
     */
    @api value;

    _checksum = true;
    _errorMessage;
    _hideValue = false;
    _textAlignment = TEXT_ALIGNMENT.default
    textXAlign = 'center'
    textYAlign = 'below'
    _type;
    validCode = true;

    renderedCallback() {
        this.renderBarcode();
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Hide the value of the barcode checksum. If true, the barcode will display the checksum digit next to the value in the text area.
     *
     * @public
     * @type {boolean}
     * @default true
     */
    @api
    get checksum() {
        return this._checksum;
    }
    set checksum(value) {
        this._checksum = normalizeBoolean(value);
    }

    /**
     * The max-height of the barcode.
     *
     * @public
     * @type {boolean}
     */
    @api
    get height() {
        return this._height;
    }
    set height(value) {
        const numValue = parseInt(value, 10);
        if (numValue != null) {
            this._height = value;
        }
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
     * The position of the displayed value. Accepted values are top-left, top-center, top-right, top-justify, center-left, center-center, center-right, center-justify, bottom-left, bottom-center, bottom-right, bottom-justify. Defaults to bottom-center.
     *
     * @public
     * @type {boolean}
     * @default bottom-center
     */
    @api
    get textAlignment() { 
        return this._textAlignment;
    }
    set textAlignment(value) {
        this._textAlignment = normalizeString(value, {
            fallbackValue: TEXT_ALIGNMENT.default,
            valid: TEXT_ALIGNMENT.valid
        });
        if (this._textAlignment) {
            const replace1 = this._textAlignment.replace('bottom', 'below');
            const replace2 = replace1.replace('top', 'above')
            const outputAlignment = replace2.split('-')
            this.textXAlign = normalizeString(outputAlignment[1], TEXT_X_ALIGN);
            this.textYAlign = normalizeString(outputAlignment[0], TEXT_Y_ALIGN);
        }
    }

    /**
     * The type of barcode, identified by the barcode encoder id. 
    The supported encoders are: auspost, azteccode, azteccodecompact, aztecrune, bc412, channelcode, codablockf, code11, code128, code16k, code2of5, code32, code39, code39ext, code49, code93, code93ext, codeone, coop2of5, daft, databarexpanded, databarexpandedcomposite, databarexpandedstacked, databarexpandedstackedcomposite, databarlimited, databarlimitedcomposite, databaromni,  databaromnicomposite, databarstacked, databarstackedcomposite, databarstackedomni, databarstackedomnicomposite, databartruncated, databartruncatedcomposite, datalogic2of5, datamatrix, datamatrixrectangular, datamatrixrectangularextension, dotcode, ean13, ean13composite, ean14, ean2, ean5, ean8, ean8composite, flattermarken, gs1-128, gs1-128composite, gs1-cc, gs1datamatrix, gs1datamatrixrectangular, gs1dotcode, gs1northamericancoupon, gs1qrcode, hanxin, hibcazteccode, hibccodablockf, hibccode128, hibccode39, hibcdatamatrix, hibcdatamatrixrectangular, hibcmicropdf417, hibcpdf417, hibcqrcode, iata2of5, identcode, industrial2of5, interleaved2of5, isbn, ismn, issn, itf14, japanpost, kix, leitcode, mailmark, matrix2of5, maxicode, micropdf417, microqrcode, msi, onecode, pdf417, pdf417compact, pharmacode, pharmacode2, planet, plessey, posicode, postnet, pzn, qrcode, rationalizedCodabar, raw, rectangularmicroqrcode, royalmail, sscc18, symbol, telepen, telepennumeric, ultracode, upca, upcacomposite, upce and upcecomposite.
     *
     * @public
     * @type {string}
     */
    @api
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = normalizeString(value, {
            validValues: BWIPP_ENCODERS
        });
    }

    /**
     * The width of the barcode.
     *
     * @public
     * @type {boolean}
     */
    @api
    get width() {
        return this._width;
    }
    set width(value) {
        const numValue = parseInt(value, 10);
        if (numValue != null) {
            this._width = value;
        }
    }

    /*
     * ------------------------------------------------------------
     * PRIVATE METHODS
     * ------------------------------------------------------------
     */

    /**
     * Sets the width for the canvas.
     */
    get barcodeStyle() {
        return `${
            this.width != null ? `max-width: ${this.width}px;` : 'width: 100%;'
        } ${this.height != null ? `max-height: ${this.height}px;` : ''}`;
    }
    
    /**
     * Returns the numeric value from a HEX value, ex: #000000 returns 000000.
     *
     * @returns {string} color value
     */
    colorHexCode(color) {
        if (color.includes("#")) {
            return color.substring(1);
        }
        return color
    }

    get errorMessage() {
        return this._errorMessage;
    }

    parseErrorMessage(message) {
        let errorMessage = message;
        if (message.indexOf('bwipp.') !== -1) {
            errorMessage = message.substring(message.indexOf('bwipp.') + 6);
        }
        if (message.indexOf('bwip-js: ') !== -1) {
            errorMessage = message.substring(message.indexOf('bwip-js: ') + 9);
        }
        errorMessage = errorMessage.replace(' bcid ', ' type ');
        return errorMessage;
    }

    /**
     * Renders barcode with Bwipjs library.
     */
    renderBarcode() {
        const canvas = this.template.querySelector(
            '[data-element-id="avonni-barcode-canvas"]'
        );
        try {
            bwipjs.toCanvas(canvas, {
                bcid: this.type,
                text: this.value,
                includetext: !this.hideValue,
                includecheck: this.checksum,
                includecheckintext: this.checksum,
                textxalign: this.textXAlign,
                textyalign: this.textYAlign,
                segments: 8,
                barcolor: this.colorHexCode(this.color),
                backgroundcolor: this.colorHexCode(this.background),
                textcolor: this.colorHexCode(this.textColor),
                scale: 10
            });
            this._errorMessage = null;
            this.validCode = true;
        } catch (e) {
            if (e.message) {
                this._errorMessage = this.parseErrorMessage(e.message);
            } else {
                this._errorMessage = 'This barcode type does not support this value'
            }
            this.validCode = false;
        }
    }
}
