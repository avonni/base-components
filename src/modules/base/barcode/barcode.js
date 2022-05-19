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
        'MSI10',
        'MSI11',
        'MSI1010',
        'MSI1110',
        'POSTNET'
    ],
    default: 'CODE39'
};

const RENDERING_ENGINE = {
    valid: ['canvas', 'svg'],
    default: 'svg'
};

const DEFAULT_BACKGROUND = '#ffffff';
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
    _color;
    _renderAs = RENDERING_ENGINE.default;
    _size = DEFAULT_SIZE;
    _hideValue = DEFAULT_HIDE_VALUE;
    _checksum = DEFAULT_CHECKSUM;
    _textColor = DEFAULT_TEXT_COLOR;
    _type = SYMBOLOGY.default;
    _initialRender = DEFAULT_INITIAL_VALUE;

    checksumValue;

    renderedCallback() {
        console.log('RERENDERED');
        if (!this._initialRender) this.initBarcode();
        this._initialRender = true;
        // if (this.checksum && !this.hideValue) this.computeContainerClass();
        const canvas = this.template.querySelector(
            '[data-element-id="barcode"]'
        );
        JsBarcode(canvas, this.value, {
            format: this.type,
            lineColor: this.color,
            background: this.background,
            text: this.value,
            displayValue: false,
            width: this.size
        });
        JsBarcode('.barcode').init();
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

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
     * Hide the value of the barcode checksum. If true, the barcode will display the checksum digit next to the value in the text area.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get checksum() {
        return this._checksum && !this._hideValue;
    }
    set checksum(value) {
        this._checksum = normalizeBoolean(value);
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
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /*
     * ------------------------------------------------------------
     * PRIVATE METHODS
     * ------------------------------------------------------------
     */
    initBarcode() {
        this.calculateChecksum();
    }

    // computeContainerClass() {
    //     let element = this.template.querySelector(
    //         '[data-element-id="barcode"]'
    //     );
    //     console.log(`${element.width}px`);
    //     // if (!element) {
    //     this.template.querySelector(
    //         '[data-element-id="value"]'
    //     ).style.width = `${element.width}px`;
    //     console.log(`${this.template.querySelector('[data-element-id="value"]').style.width}`);
    //     console.log('hello');
    //     // }
    // }

    calculateChecksum() {
        let valueCopy = this.value;
        let barcodeSum = 0;
        let barcodeImpairIndexSum = 0;

        let barcodeNumArray = Array.from(String(valueCopy), (num) =>
            Number(num)
        );

        barcodeNumArray.forEach((num) => {
            barcodeSum += num;
        });

        barcodeNumArray = barcodeNumArray.filter(
            (num, index) => index % 2 !== 0
        );

        barcodeNumArray.forEach((num) => {
            barcodeImpairIndexSum += num;
        });
        barcodeImpairIndexSum *= 2;

        this.checksumValue = 10 - ((barcodeSum + barcodeImpairIndexSum) % 10);
        console.log(this.checksumValue);
    }
}

// import { LightningElement } from 'lwc';
// import JsBarcode from 'jsbarcode';
// // import { JsBarcode } from '@babel/jsbarcode';

// export default class BarcodeGenerator extends LightningElement {
//     generateBarcode(){
//         const canvas = this.template.querySelector('[data-id="barcode"]');
//         console.log(canvas.nodeName);
//         JsBarcode(canvas, "CODE39 Barcode", {
//             format: "CODE39"
//         });
//         console.log('hello');
//         JsBarcode(".barcode").init();
//     }
// }
