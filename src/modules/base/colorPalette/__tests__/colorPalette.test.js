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

const COLORS = [
    {
        label: 'fake token one',
        color: 'rgb(10, 35, 153)',
        value: '--fake-token-one',
        groups: ['firstGroup', 'secondGroup']
    },
    {
        label: 'fake token two',
        color: 'rgb(9, 106, 80)',
        value: '--fake-token-two',
        groups: ['firstGroup']
    },
    {
        color: 'rgb(56, 10, 80)'
    },
    'rgb(0, 0, 0)'
];

let element;
describe('Color Palette', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-color-palette', {
            is: ColorPalette
        });
        document.body.appendChild(element);
    });

    it('Color Palette: Default attributes', () => {
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
        expect(element.groups).toMatchObject([]);
        expect(element.tileWidth).toBe(20);
        expect(element.tileHeight).toBe(20);
        expect(element.variant).toBe('grid');
    });

    /* ----- ATTRIBUTES ----- */

    // disabled
    it('Color Palette: disabled', () => {
        element.disabled = true;

        return Promise.resolve().then(() => {
            const a = element.shadowRoot.querySelectorAll(
                '[data-element-id^="a-"]'
            );
            a.forEach((color) => {
                expect(color.getAttribute('aria-disabled')).toBe('true');
            });
            const colors = element.shadowRoot.querySelectorAll(
                '[data-element-id^="span-"]'
            );
            colors.forEach((color) => {
                expect(color.style.backgroundColor).toBe('rgb(221, 219, 218)');
            });
        });
    });

    // read-only
    it('Color Palette: read-only', () => {
        element.readOnly = true;

        return Promise.resolve().then(() => {
            const a = element.shadowRoot.querySelectorAll(
                '[data-element-id^="a-"]'
            );
            a.forEach((color) => {
                expect(color.getAttribute('aria-readonly')).toBe('true');
            });
        });
    });

    // is loading
    it('Color Palette: is loading', () => {
        element.isLoading = true;

        return Promise.resolve().then(() => {
            const spinner = element.shadowRoot.querySelector(
                '[data-element-id="lightning-spinner"]'
            );
            expect(spinner).toBeTruthy();
        });
    });

    // colors
    it('Color Palette: color', () => {
        element.colors = COLORS;

        return Promise.resolve().then(() => {
            const colorElements = element.shadowRoot.querySelectorAll(
                '[data-element-id="span-swatch"]'
            );
            expect(colorElements).toHaveLength(COLORS.length);
            colorElements.forEach((color, index) => {
                const bgColor =
                    COLORS[index] instanceof Object
                        ? COLORS[index].color
                        : COLORS[index];
                expect(color.style.backgroundColor).toBe(bgColor);
            });
        });
    });

    // columns
    it('Color Palette: columns', () => {
        element.columns = 4;

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '[data-element-id="div-palette-container"]'
            );
            expect(container.style.width).toBe('112px');
        });
    });

    // groups
    // Depends on colors
    it('Color Palette: groups', () => {
        const groupsName = [
            {
                name: 'firstGroup',
                label: 'First Group'
            },
            {
                name: 'secondGroup',
                label: 'Second Group'
            }
        ];
        element.groups = groupsName;
        element.colors = COLORS;

        return Promise.resolve().then(() => {
            const groups = element.shadowRoot.querySelectorAll(
                '[data-element-id="div-group"]'
            );
            expect(groups).toHaveLength(3);

            // Undefined group
            const firstGroupLabel = groups[0].querySelector(
                '[data-element-id="div-group-label"]'
            );
            expect(firstGroupLabel).toBeFalsy();
            const firstGroupSwatches = groups[0].querySelectorAll(
                '[data-element-id="span-swatch"]'
            );
            expect(firstGroupSwatches).toHaveLength(2);

            // First group
            const secondGroupLabel = groups[1].querySelector(
                '[data-element-id="div-group-label"]'
            );
            expect(secondGroupLabel.textContent).toBe(groupsName[0].label);
            const secondGroupSwatches = groups[1].querySelectorAll(
                '[data-element-id="span-swatch"]'
            );
            expect(secondGroupSwatches).toHaveLength(2);

            // Second group
            const thirdGroupLabel = groups[2].querySelector(
                '[data-element-id="div-group-label"]'
            );
            expect(thirdGroupLabel.textContent).toBe(groupsName[1].label);
            const ThirdGroupSwatches = groups[2].querySelectorAll(
                '[data-element-id="span-swatch"]'
            );
            expect(ThirdGroupSwatches).toHaveLength(1);
        });
    });

    // tile width
    it('Color Palette: tile width', () => {
        element.tileWidth = 4;

        return Promise.resolve().then(() => {
            const colors = element.shadowRoot.querySelectorAll(
                '[data-element-id^="span"]'
            );
            colors.forEach((color) => {
                expect(color.style.width).toBe('4px');
            });
        });
    });

    // tile height
    it('Color Palette: tile height', () => {
        element.tileHeight = 10;

        return Promise.resolve().then(() => {
            const colors = element.shadowRoot.querySelectorAll(
                '[data-element-id^="span"]'
            );
            colors.forEach((color) => {
                expect(color.style.height).toBe('10px');
            });
        });
    });

    // variant
    // Depends on colors
    it('Color Palette: grid variant', () => {
        element.variant = 'grid';
        element.colors = COLORS;

        return Promise.resolve().then(() => {
            const links = element.shadowRoot.querySelectorAll(
                '[data-element-id="a-grid"]'
            );
            expect(links).toHaveLength(COLORS.length);
            links.forEach((link, index) => {
                expect(link.title).toBe(COLORS[index].label || '');
                expect(link.getAttribute('aria-label')).toBe(
                    COLORS[index].label || null
                );
            });
        });
    });

    it('Color Palette: list variant', () => {
        element.variant = 'list';
        element.colors = COLORS;

        return Promise.resolve().then(() => {
            const labels = element.shadowRoot.querySelectorAll(
                '[data-element-id="span-list-icon-wrapper"]'
            );
            expect(labels).toHaveLength(COLORS.length);
            labels.forEach((label, index) => {
                expect(label.textContent).toBe(COLORS[index].label || '');
            });
        });
    });

    /* ----- JS ----- */

    // click when disabled
    it('Color Palette: click when disabled', () => {
        element.disabled = true;

        const color = element.shadowRoot.querySelector(
            '[data-element-id^="a-"]'
        );
        color.click();

        return Promise.resolve().then(() => {
            expect(element.value).toBeFalsy();
        });
    });

    /* ----- METHODS ----- */

    // reset method
    it('Color Palette: reset method', () => {
        element.value = '#ffffff';
        element.reset();

        return Promise.resolve().then(() => {
            expect(element.value).toBe('');
        });
    });

    /* ----- EVENTS ----- */

    // color palette change
    it('Color Palette: change event', () => {
        const handler = jest.fn();
        element.addEventListener('change', handler);

        return Promise.resolve().then(() => {
            const a = element.shadowRoot.querySelectorAll(
                '[data-element-id="span-swatch"]'
            );
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

    it('Color Palette: change event in a list', () => {
        const handler = jest.fn();
        element.addEventListener('change', handler);
        element.colors = COLORS;

        return Promise.resolve().then(() => {
            const a = element.shadowRoot.querySelectorAll(
                '[data-element-id="span-swatch"]'
            );
            a[0].click();
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.hex).toBe('#0a2399');
            expect(handler.mock.calls[0][0].detail.hexa).toBe('#0a2399ff');
            expect(handler.mock.calls[0][0].detail.rgb).toBe(
                'rgb(10, 35, 153)'
            );
            expect(handler.mock.calls[0][0].detail.rgba).toBe(
                'rgba(10, 35, 153,1)'
            );
            expect(handler.mock.calls[0][0].detail.alpha).toBe('1');
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
        });
    });

    // color palette change
    // Depends on variant and colors
    it('Color Palette: double click event', () => {
        const handler = jest.fn();
        element.addEventListener('colordblclick', handler);
        element.colors = COLORS;

        return Promise.resolve().then(() => {
            const a = element.shadowRoot.querySelector(
                '[data-element-id="a-grid"]'
            );
            a.dispatchEvent(new CustomEvent('dblclick'));

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].composed).toBeTruthy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });

    it('Color Palette: double click event in a list', () => {
        const handler = jest.fn();
        element.addEventListener('colordblclick', handler);
        element.colors = COLORS;
        element.variant = 'list';

        return Promise.resolve().then(() => {
            const a = element.shadowRoot.querySelector(
                '[data-element-id="a-list"]'
            );
            a.dispatchEvent(new CustomEvent('dblclick'));

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].composed).toBeTruthy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });

    it('Color Palette: focus event', () => {
        const handler = jest.fn();
        element.addEventListener('privatefocus', handler);
        element.colors = COLORS;

        return Promise.resolve().then(() => {
            const color = element.shadowRoot.querySelector(
                '[data-element-id="a-grid"]'
            );
            color.dispatchEvent(new CustomEvent('focus'));
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
        });
    });

    it('Color Palette: focus event in a list', () => {
        const handler = jest.fn();
        element.addEventListener('privatefocus', handler);
        element.colors = COLORS;
        element.variant = 'list';

        return Promise.resolve().then(() => {
            const color = element.shadowRoot.querySelector(
                '[data-element-id="a-list"]'
            );
            color.dispatchEvent(new CustomEvent('focus'));
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
        });
    });

    it('Color Palette: blur event', () => {
        const handler = jest.fn();
        element.addEventListener('blur', handler);
        element.colors = COLORS;

        return Promise.resolve()
            .then(() => {
                const color = element.shadowRoot.querySelector(
                    '[data-element-id="a-grid"]'
                );
                color.dispatchEvent(new CustomEvent('blur'));
            })
            .then(() => {
                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            });
    });

    it('Color Palette: blur event in a list', () => {
        const handler = jest.fn();
        element.addEventListener('blur', handler);
        element.colors = COLORS;
        element.variant = 'list';

        return Promise.resolve()
            .then(() => {
                const color = element.shadowRoot.querySelector(
                    '[data-element-id="a-list"]'
                );
                color.dispatchEvent(new CustomEvent('blur'));
            })
            .then(() => {
                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            });
    });
});
