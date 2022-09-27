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

import { createElement } from 'lwc';
import Barcode from 'c/barcode';
import bwipjs from 'bwip-js';

const handler = jest.fn();
bwipjs.toCanvas = handler;
const baseParameters = {
    backgroundcolor: 'ffffff',
    barcolor: '000000',
    includecheck: false,
    includecheckintext: false,
    includetext: true,
    scale: 10,
    textcolor: '000000',
    textxalign: 'center',
    textyalign: 'below'
};

let element;
describe('Barcode', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        jest.clearAllMocks();
    });

    beforeEach(() => {
        element = createElement('avonni-barcode', {
            is: Barcode
        });
        document.body.appendChild(element);
    });

    it('Barcode: Default attributes', () => {
        expect(element.background).toBe('#ffffff');
        expect(element.checksum).toBe(false);
        expect(element.color).toBe('#000000');
        expect(element.height).toBeUndefined();
        expect(element.hideValue).toBe(false);
        expect(element.textAlignment).toBe('bottom-center');
        expect(element.textColor).toBe('#000000');
        expect(element.type).toBeUndefined();
        expect(element.value).toBeUndefined();
        expect(element.width).toBe('100%');
    });

    /* ----- ATTRIBUTES ----- */

    // VALUES
    it('Barcode: type', () => {
        element.type = 'code128';

        return Promise.resolve().then(() => {
            const canvas = element.shadowRoot.querySelector(
                '[data-element-id="avonni-barcode-canvas"]'
            );
            const barcodeParams = { ...baseParameters };
            barcodeParams.bcid = 'code128';

            expect(handler).toHaveBeenCalledWith(canvas, barcodeParams);
        });
    });

    it('Barcode: invalid type', () => {
        element.type = 'not-a-valid-type';

        return Promise.resolve().then(() => {
            const canvas = element.shadowRoot.querySelector(
                '[data-element-id="avonni-barcode-canvas"]'
            );
            const barcodeParams = { ...baseParameters };
            barcodeParams.bcid = '';

            expect(handler).toHaveBeenCalledWith(canvas, barcodeParams);
        });
    });

    it('Barcode: value', () => {
        element.value = '1234';

        return Promise.resolve().then(() => {
            const canvas = element.shadowRoot.querySelector(
                '[data-element-id="avonni-barcode-canvas"]'
            );
            const barcodeParams = { ...baseParameters };
            barcodeParams.text = '1234';

            expect(handler).toHaveBeenCalledWith(canvas, barcodeParams);
        });
    });

    it('Barcode: checksum', () => {
        element.value = '12345';
        element.type = 'code128';
        element.checksum = false;

        return Promise.resolve().then(() => {
            const canvas = element.shadowRoot.querySelector(
                '[data-element-id="avonni-barcode-canvas"]'
            );
            const barcodeParams = { ...baseParameters };
            barcodeParams.text = '12345';
            barcodeParams.bcid = 'code128';
            barcodeParams.includecheck = false;
            barcodeParams.includecheckintext = false;

            expect(handler).toHaveBeenCalledWith(canvas, barcodeParams);
        });
    });

    it('Barcode: hideValue', () => {
        element.value = '12345';
        element.type = 'code128';
        element.hideValue = true;

        return Promise.resolve().then(() => {
            const canvas = element.shadowRoot.querySelector(
                '[data-element-id="avonni-barcode-canvas"]'
            );
            const barcodeParams = { ...baseParameters };
            barcodeParams.text = '12345';
            barcodeParams.bcid = 'code128';
            barcodeParams.includetext = false;

            expect(handler).toHaveBeenCalledWith(canvas, barcodeParams);
        });
    });

    // COLORS
    it('Barcode: background, color and text-color', () => {
        element.background = '#eeeeee';
        element.color = '#333333';
        element.textColor = '#444444';

        return Promise.resolve().then(() => {
            const canvas = element.shadowRoot.querySelector(
                '[data-element-id="avonni-barcode-canvas"]'
            );
            const barcodeParams = { ...baseParameters };
            barcodeParams.text = undefined;
            barcodeParams.bcid = undefined;
            barcodeParams.backgroundcolor = 'eeeeee';
            barcodeParams.barcolor = '333333';
            barcodeParams.textcolor = '444444';

            expect(handler).toHaveBeenCalledWith(canvas, barcodeParams);
        });
    });

    // LAYOUT
    it('Barcode: text-alignment, height and width as numbers', () => {
        element.value = '1234';
        element.type = 'code11';
        element.height = 200;
        element.width = '200';
        element.textAlignment = 'top-justify';

        return Promise.resolve().then(() => {
            const canvas = element.shadowRoot.querySelector(
                '[data-element-id="avonni-barcode-canvas"]'
            );
            const barcodeParams = { ...baseParameters };
            barcodeParams.text = '1234';
            barcodeParams.bcid = 'code11';
            barcodeParams.textxalign = 'justify';
            barcodeParams.textyalign = 'above';

            expect(handler).toHaveBeenCalledWith(canvas, barcodeParams);
            expect(canvas.style.maxHeight).toEqual('200px');
            expect(canvas.style.width).toEqual('200px');
        });
    });

    it('Barcode: height and width with units', () => {
        element.height = '30rem';
        element.width = '80%';

        return Promise.resolve().then(() => {
            const canvas = element.shadowRoot.querySelector(
                '[data-element-id="avonni-barcode-canvas"]'
            );

            expect(canvas.style.maxHeight).toEqual('30rem');
            expect(canvas.style.width).toEqual('80%');
        });
    });
});
