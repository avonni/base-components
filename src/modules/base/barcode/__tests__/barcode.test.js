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
jest.mock('bwip-js', () => {
    const a = require('');
    a.toCanvas = () => {};
    return a;
});

let element;
describe('Barcode', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('avonni-barcode', {
            is: Barcode
        });
        document.body.appendChild(element);
    });

    it('Barcode: Default attributes', () => {
        expect(element.background).toBe('#ffffff');
        expect(element.color).toBe('#000000');
        expect(element.renderAs).toBe('svg');
        expect(element.size).toBe(300);
        expect(element.hideValue).toBe(false);
        expect(element.checksum).toBe(false);
        expect(element.textColor).toBe('#000000');
        expect(element.type).toBe('CODE39');
    });

    /* ----- ATTRIBUTES ----- */

    // alternative type
    it('Barcode: alternative type', () => {
        element.type = 'CODE128';
        element.renderBarcode();
        expect(element.type).toBe('CODE128');
    });

    // non valid alternative type
    it('Barcode: non valid alternative type', () => {
        element.type = 'NON VALID';
        element.renderBarcode();
        expect(element.type).toBe('NON VALID');
    });

    // alternative checksum with bwipjs
    it('Barcode: alternative checksum with jsbarcode', () => {
        element.checksum = true;
        element.renderBarcode();
        expect(element.checksum).toBe(true);
    });

    // alternative checksum with jsbarcode
    it('Barcode: alternative checksum with bwipjs', () => {
        element.checksum = true;
        element.type = 'CODE128';
        element.renderBarcode();
        expect(element.type).toBe('CODE128');
    });
});
