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
import ColorPalette from 'c/colorPalette';

// Not tested because not used:
// value

describe('Color Palette', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Color Palette Default attributes', () => {
        const element = createElement('base-color-palette', {
            is: ColorPalette
        });

        expect(element.disabled).toBeFalsy();
        expect(element.value).toBeUndefined();
        expect(element.readOnly).toBeFalsy();
        expect(element.isLoading).toBeFalsy();
        expect(element.colors).toMatchObject([
            '#e3abec',
            '#c2dbf7',
            '#9fd6ff',
            '#9de7da',
            '#9df0bf',
            '#fff099',
            '#fed49a',
            '#d073df',
            '#86b9f3',
            '#5ebbff',
            '#44d8be',
            '#3be281',
            '#ffe654',
            '#ffb758',
            '#bd35bd',
            '#5778c1',
            '#5ebbff',
            '#00aea9',
            '#3bba4c',
            '#f4bc25',
            '#f99120',
            '#580d8c',
            '#001870',
            '#0a2399',
            '#097476',
            '#096a50',
            '#b67d11',
            '#b85d0d'
        ]);
        expect(element.columns).toBe(7);
        expect(element.tileWidth).toBe(20);
        expect(element.tileHeight).toBe(20);
    });

    /* ----- ATTRIBUTES ----- */

    // disabled
    it('Color Palette disabled', () => {
        const element = createElement('base-color-palette', {
            is: ColorPalette
        });
        document.body.appendChild(element);

        element.disabled = true;

        return Promise.resolve().then(() => {
            const a = element.shadowRoot.querySelectorAll('a');
            a.forEach((color) => {
                expect(color.getAttribute('is-disabled')).toBe('true');
            });
            const colors = element.shadowRoot.querySelectorAll('a > span');
            colors.forEach((color) => {
                expect(color.style.backgroundColor).toBe('rgb(221, 219, 218)');
            });
        });
    });

    // read-only
    it('Color Palette read-only', () => {
        const element = createElement('base-color-palette', {
            is: ColorPalette
        });
        document.body.appendChild(element);

        element.readOnly = true;

        return Promise.resolve().then(() => {
            const a = element.shadowRoot.querySelectorAll('a');
            a.forEach((color) => {
                expect(color.getAttribute('read-only')).toBe('true');
            });
        });
    });

    // is loading
    it('Color Palette is loading', () => {
        const element = createElement('base-color-palette', {
            is: ColorPalette
        });
        document.body.appendChild(element);

        element.isLoading = true;

        return Promise.resolve().then(() => {
            const spinner = element.shadowRoot.querySelector(
                'lightning-spinner'
            );
            expect(spinner).toBeTruthy();
        });
    });

    // colors
    it('Color Palette colors', () => {
        const element = createElement('base-color-palette', {
            is: ColorPalette
        });
        document.body.appendChild(element);

        element.colors = [
            'rgb(10, 35, 153)',
            'rgb(9, 116, 118)',
            'rgb(9, 106, 80)',
            'rgb(182, 125, 17)',
            'rgb(184, 93, 13)'
        ];

        return Promise.resolve().then(() => {
            let colorsArray = [];
            const colors = element.shadowRoot.querySelectorAll('a > span');
            expect(colors).toHaveLength(5);
            colors.forEach((color) => {
                colorsArray.push(color.style.backgroundColor);
            });
            expect(colorsArray.includes('rgb(10, 35, 153)')).toBeTruthy();
            expect(colorsArray.includes('rgb(9, 116, 118)')).toBeTruthy();
            expect(colorsArray.includes('rgb(9, 106, 80)')).toBeTruthy();
            expect(colorsArray.includes('rgb(182, 125, 17)')).toBeTruthy();
            expect(colorsArray.includes('rgb(184, 93, 13)')).toBeTruthy();
        });
    });

    // columns
    it('Color Palette columns', () => {
        const element = createElement('base-color-palette', {
            is: ColorPalette
        });
        document.body.appendChild(element);

        element.columns = 4;

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '.avonni-pallet-container'
            );
            expect(container.style.width).toBe('112px');
        });
    });

    // tile width
    it('Color Palette tile width', () => {
        const element = createElement('base-color-palette', {
            is: ColorPalette
        });
        document.body.appendChild(element);

        element.tileWidth = 4;

        return Promise.resolve().then(() => {
            const colors = element.shadowRoot.querySelectorAll('a > span');
            colors.forEach((color) => {
                expect(color.style.width).toBe('4px');
            });
        });
    });

    // tile height
    it('Color Palette tile height', () => {
        const element = createElement('base-color-palette', {
            is: ColorPalette
        });
        document.body.appendChild(element);

        element.tileHeight = 10;

        return Promise.resolve().then(() => {
            const colors = element.shadowRoot.querySelectorAll('a > span');
            colors.forEach((color) => {
                expect(color.style.height).toBe('10px');
            });
        });
    });

    /* ----- JS ----- */

    // click when disabled
    it('Color Palette click when disabled', () => {
        const element = createElement('base-color-palette', {
            is: ColorPalette
        });
        document.body.appendChild(element);

        element.disabled = true;

        const color = element.shadowRoot.querySelector('a');
        color.click();

        return Promise.resolve().then(() => {
            expect(element.value).toBeFalsy();
        });
    });

    /* ----- METHODS ----- */

    // reset method
    it('Color Palette reset method', () => {
        const element = createElement('base-color-palette', {
            is: ColorPalette
        });
        document.body.appendChild(element);

        element.value = '#ffffff';
        element.reset();

        return Promise.resolve().then(() => {
            expect(element.value).toBe('');
        });
    });

    /* ----- EVENTS ----- */

    // color palette change
    it('Color Palette change event', () => {
        const element = createElement('base-color-palette', {
            is: ColorPalette
        });
        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('change', handler);

        return Promise.resolve().then(() => {
            const a = element.shadowRoot.querySelectorAll('a > span');
            a[0].click();
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.hex).toBe('#e3abec');
            expect(handler.mock.calls[0][0].detail.hexa).toBe('#e3abecff');
            expect(handler.mock.calls[0][0].detail.rgb).toBe(
                'rgb(227,171,236)'
            );
            expect(handler.mock.calls[0][0].detail.rgba).toBe(
                'rgba(227,171,236,1)'
            );
            expect(handler.mock.calls[0][0].detail.alpha).toBe('1');
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
        });
    });

    it('Color Palette focus event', () => {
        const element = createElement('base-color-palette', {
            is: ColorPalette
        });
        document.body.appendChild(element);

        const color = element.shadowRoot.querySelector(
            '.slds-color-picker__swatch-trigger'
        );
        element.addEventListener('focus', (event) => {
            expect(event.bubbles).toBeFalsy();
            expect(event.cancelable).toBeFalsy();
            expect(event.composed).toBeFalsy();
        });

        color.focus();
    });

    it('Color Palette blur event', () => {
        const element = createElement('base-color-palette', {
            is: ColorPalette
        });
        document.body.appendChild(element);

        const color = element.shadowRoot.querySelector(
            '.slds-color-picker__swatch-trigger'
        );
        element.addEventListener('blur', (event) => {
            expect(event.bubbles).toBeFalsy();
            expect(event.cancelable).toBeFalsy();
            expect(event.composed).toBeFalsy();
        });

        color.focus();
        color.blur();
    });
});
