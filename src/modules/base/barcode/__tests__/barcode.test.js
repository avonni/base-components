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
        expect(element.height).toBeUndefined();
        expect(element.hideValue).toBe(false);
        expect(element.checksum).toBe(true);
        expect(element.textAlignment).toBe('bottom-center');
        expect(element.textColor).toBe('#000000');
        expect(element.type).toBeUndefined();
        expect(element.value).toBeUndefined();
        expect(element.width).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // VALUES
    it('Barcode: alternative type', () => {
        element.type = 'code128';

        return Promise.resolve().then(() => {
            expect(element.type).toBe('code128');
        });
    });

    it('Barcode: non valid type', () => {
        element.type = 'non-valid';

        return Promise.resolve().then(() => {
            expect(element.type).toBeFalsy();
        });
    });

    it('Barcode: value', () => {
        element.value = '1234';

        return Promise.resolve().then(() => {
            expect(element.value).toBe('1234');
        });
    });

    it('Barcode: checksum', () => {
        element.checksum = false;

        return Promise.resolve().then(() => {
            expect(element.checksum).toBeFalsy();
        });
    });

    it('Barcode: hideValue', () => {
        element.hideValue = true;

        return Promise.resolve().then(() => {
            expect(element.hideValue).toBeTruthy();
        });
    });

    // COLORS
    it('Barcode: background', () => {
        element.background = '#eeeeee';

        return Promise.resolve().then(() => {
            expect(element.background).toBe('#eeeeee');
        });
    });

    it('Barcode: color', () => {
        element.color = '#eeeeee';

        return Promise.resolve().then(() => {
            expect(element.color).toBe('#eeeeee');
        });
    });

    it('Barcode: text-color', () => {
        element.textColor = '#eeeeee';

        return Promise.resolve().then(() => {
            expect(element.textColor).toBe('#eeeeee');
        });
    });

    // LAYOUT
    it('Barcode: height', () => {
        element.height = '200';

        return Promise.resolve().then(() => {
            expect(element.height).toBe('200');
        });
    });

    it('Barcode: text-alignment', () => {
        element.textAlignment = 'top-justify';

        return Promise.resolve().then(() => {
            expect(element.textAlignment).toBe('top-justify');
        });
    });

    it('Barcode: width', () => {
        element.width = '200';

        return Promise.resolve().then(() => {
            expect(element.width).toBe('200');
        });
    });
});
