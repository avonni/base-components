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
import InputPen from 'c/inputPen';

let element;

// Mock for HTMLCanvasElement in tests.
HTMLCanvasElement.prototype.getContext = () => {
    return {};
};

describe('Input pen', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-input-pen', {
            is: InputPen
        });
        document.body.appendChild(element);
        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 100;
    });

    it('Input pen Default attributes', () => {
        expect(element.disabled).toBeFalsy();
        expect(element.label).toBeUndefined();
        expect(element.fieldLevelHelp).toBeUndefined();
        expect(element.readOnly).toBeFalsy();
        expect(element.required).toBeFalsy();
        expect(element.showSignaturePad).toBeFalsy();
        expect(element.variant).toBe('bottom-toolbar');
        expect(element.hideControls).toBeFalsy();
        expect(element.value).toBeUndefined();
        expect(element.disabledButtons).toMatchObject([]);
        expect(element.invalid).toBeFalsy();
        expect(element.color).toBe('#000');
        expect(element.size).toBe(10);
        expect(element.mode).toBe('draw');
    });

    /* ----- ATTRIBUTES ----- */

    // disabled
    it('Input pen disabled', () => {
        element.disabled = true;

        return Promise.resolve().then(() => {
            const buttonIcons = element.shadowRoot.querySelectorAll(
                'lightning-button-icon'
            );
            buttonIcons.forEach((button) => {
                expect(button.disabled).toBeTruthy();
            });
            const combobox =
                element.shadowRoot.querySelector('lightning-combobox');
            expect(combobox.disabled).toBeTruthy();
            const colorPicker =
                element.shadowRoot.querySelector('c-color-picker');
            expect(colorPicker.disabled).toBeTruthy();
            expect(element.classList).toContain('avonni-disabled');
        });
    });

    // label
    it('Input pen label', () => {
        element.label = 'This is a label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.slds-form-element__label'
            );
            expect(label.textContent).toBe('This is a label');
        });
    });

    // field level help
    it('Input pen field level help', () => {
        element.fieldLevelHelp = 'This is a fieldLevelHelp text';

        return Promise.resolve().then(() => {
            const helpText =
                element.shadowRoot.querySelector('lightning-helptext');
            expect(helpText.content).toBe('This is a fieldLevelHelp text');
        });
    });

    // read only
    it('Input pen read only', () => {
        element.readOnly = true;

        return Promise.resolve().then(() => {
            expect(element.classList).toContain('avonni-disabled');
        });
    });

    // required needs label
    it('Input pen required', () => {
        element.label = 'label';
        element.required = true;

        return Promise.resolve().then(() => {
            const required = element.shadowRoot.querySelector('.slds-required');
            expect(required).toBeTruthy();
            expect(required.textContent).toBe('*');
        });
    });

    // variant
    it('Input pen variant bottom-toolbar', () => {
        element.variant = 'bottom-toolbar';

        return Promise.resolve().then(() => {
            expect(element.classList).toContain('avonni-reverse');
        });
    });

    it('Input pen variant top-toolbar', () => {
        element.variant = 'top-toolbar';

        return Promise.resolve().then(() => {
            expect(element.classList).not.toContain('avonni-reverse');
        });
    });

    // hide controls
    it('Input pen hide controls', () => {
        element.hideControls = true;

        return Promise.resolve().then(() => {
            const toolbar = element.shadowRoot.querySelector(
                '.slds-rich-text-editor__toolbar'
            );
            expect(toolbar).toBeFalsy();
        });
    });

    // disabled buttons
    it('Input pen disabled buttons pen', () => {
        element.disabledButtons = 'pen';

        return Promise.resolve().then(() => {
            const draw = element.shadowRoot.querySelector(
                "lightning-button-icon[title='Draw']"
            );
            expect(draw).toBeFalsy();
        });
    });

    it('Input pen disabled buttons eraser', () => {
        element.disabledButtons = 'eraser';

        return Promise.resolve().then(() => {
            const erase = element.shadowRoot.querySelector(
                "lightning-button-icon[title='Erase']"
            );
            expect(erase).toBeFalsy();
        });
    });

    it('Input pen disabled buttons ink', () => {
        element.disabledButtons = 'ink';

        return Promise.resolve().then(() => {
            const ink = element.shadowRoot.querySelector(
                "lightning-button-icon[title='ink']"
            );
            expect(ink).toBeFalsy();
        });
    });

    it('Input pen disabled buttons paint', () => {
        element.disabledButtons = 'paint';

        return Promise.resolve().then(() => {
            const paint = element.shadowRoot.querySelector(
                "lightning-button-icon[title='paint']"
            );
            expect(paint).toBeFalsy();
        });
    });

    it('Input pen disabled buttons clear', () => {
        element.disabledButtons = 'clear';

        return Promise.resolve().then(() => {
            const erase = element.shadowRoot.querySelector(
                "lightning-button-icon[title='Clear']"
            );
            expect(erase).toBeFalsy();
        });
    });

    it('Input pen disabled buttons size', () => {
        element.disabledButtons = 'size';

        return Promise.resolve().then(() => {
            const size = element.shadowRoot.querySelector('lightning-combobox');
            expect(size).toBeFalsy();
        });
    });

    it('Input pen disabled buttons color', () => {
        element.disabledButtons = 'color';

        return Promise.resolve().then(() => {
            const color = element.shadowRoot.querySelector('c-color-picker');
            expect(color).toBeFalsy();
        });
    });

    // invalid
    it('invalid = false', () => {
        element.invalid = false;

        return Promise.resolve().then(() => {
            const form = element.shadowRoot.querySelector(
                '[data-element-id="form-element"]'
            );
            expect(form.classList).not.toContain('slds-has-error');
        });
    });

    it('invalid = true', () => {
        element.invalid = true;

        return Promise.resolve().then(() => {
            const form = element.shadowRoot.querySelector(
                '[data-element-id="form-element"]'
            );
            expect(form.classList).not.toContain('slds-has-error');
        });
    });

    // invalid
    it('showSignaturePad = false', () => {
        element.invalid = false;

        return Promise.resolve().then(() => {
            expect(element.mode).toEqual('draw');
            expect(
                element.shadowRoot.querySelector('[data-element-id="x-field"]')
            ).toBeFalsy();
            expect(
                element.shadowRoot.querySelector(
                    '[data-element-id="signature-underline"]'
                )
            ).toBeFalsy();
        });
    });

    it('showSignaturePad = true', () => {
        element.showSignaturePad = true;

        return Promise.resolve().then(() => {
            expect(element.mode).toEqual('ink');
            expect(
                element.shadowRoot.querySelector('[data-element-id="x-field"]')
            ).toBeTruthy();
            expect(
                element.shadowRoot.querySelector(
                    '[data-element-id="signature-underline"]'
                )
            ).toBeTruthy();
        });
    });
});
