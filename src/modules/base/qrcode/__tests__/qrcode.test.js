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
import Qrcode from 'c/qrcode';

// Not tested due to impossibility of targetting svg:
// background
// color

// Not tested because depends on an external library:
// encoding
// errorCorrection
// value

// Mock function to avoid error in canvas logic
HTMLCanvasElement.prototype.getContext = () => {
    return true;
};

let element;
describe('Qrcode', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-qrcode', {
            is: Qrcode
        });
        document.body.appendChild(element);
    });

    it('Default attributes', () => {
        expect(element.background).toBe('#fff');
        expect(element.borderColor).toBeUndefined();
        expect(element.borderWidth).toBe(0);
        expect(element.color).toBe('#000');
        expect(element.encoding).toBe('ISO_8859_1');
        expect(element.errorCorrection).toBe('L');
        expect(element.padding).toBe(0);
        expect(element.renderAs).toBe('svg');
        expect(element.size).toBe(200);
        expect(element.value).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // border-color and border-width
    // Depends on renderAs and value
    it('borderColor and borderWidth', () => {
        element.borderColor = 'tomato';
        element.borderWidth = 25;
        element.renderAs = 'canvas';
        element.value = 'A string value';

        return Promise.resolve().then(() => {
            const canvas = element.shadowRoot.querySelector('canvas');
            expect(canvas.style.border).toBe('25px solid tomato');
        });
    });

    // padding
    // Depends on renderAs and value
    it('padding', () => {
        element.padding = 34;
        element.renderAs = 'canvas';
        element.value = 'A string value';

        return Promise.resolve().then(() => {
            const canvas = element.shadowRoot.querySelector('canvas');
            expect(canvas.style.padding).toBe('34px');
        });
    });

    // render-as
    it('renderAs = svg', () => {
        element.renderAs = 'svg';

        return Promise.resolve().then(() => {
            const canvas = element.shadowRoot.querySelector('canvas');
            const svg = element.shadowRoot.querySelector('span');

            expect(canvas).toBeFalsy();
            expect(svg).toBeTruthy();
        });
    });

    it('renderAs = canvas', () => {
        element.renderAs = 'canvas';

        return Promise.resolve().then(() => {
            const canvas = element.shadowRoot.querySelector('canvas');
            const svg = element.shadowRoot.querySelector('span');

            expect(canvas).toBeTruthy();
            expect(svg).toBeFalsy();
        });
    });

    // size
    // Depends on value and renderAs
    it('size', () => {
        element.renderAs = 'canvas';
        element.value = 'A string value';
        element.size = 45;

        return Promise.resolve().then(() => {
            const canvas = element.shadowRoot.querySelector('canvas');
            expect(canvas.width).toBe(45);
            expect(canvas.height).toBe(45);
            expect(canvas.style.maxWidth).toBe('45px');
        });
    });
});
