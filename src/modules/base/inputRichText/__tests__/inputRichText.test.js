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
import InputRichText from '../inputRichText';

let element;
describe('InputRichText', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-input-rich-text', {
            is: InputRichText
        });
        document.body.appendChild(element);
    });

    it('Input rich text: Default attributes', () => {
        expect(element.customButtons).toBeUndefined();
        expect(element.disabled).toBeFalsy();
        expect(element.disabledCategories).toHaveLength(0);
        expect(element.formats).toHaveLength(0);
        expect(element.isPublisher).toBeFalsy();
        expect(element.label).toBeUndefined();
        expect(element.labelVisible).toBeFalsy();
        expect(element.messageWhenBadInput).toBeUndefined();
        expect(element.placeholder).toBeUndefined();
        expect(element.readOnly).toBeFalsy();
        expect(element.shareWithEntityId).toBeUndefined();
        expect(element.valid).toBeTruthy();
        expect(element.value).toBeUndefined();
        expect(element.variant).toBe('top-toolbar');
    });

    // disabled
    it('Input rich text: disabled = true', () => {
        element.disabled = true;

        return Promise.resolve().then(() => {
            const comboboxes = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-combobox"]'
            );
            comboboxes.forEach((combobox) => {
                expect(combobox.disabled).toBeTruthy();
            });

            const colorPicker = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-colorpicker-button"]'
            );
            if (colorPicker) {
                expect(colorPicker.disabled).toBeTruthy();
            }

            const buttons = element.shadowRoot.querySelectorAll(
                '.slds-rich-text-editor__toolbar > ul li .slds-button, .overflow-menu > ul > li .slds-button'
            );
            buttons.forEach((button) => {
                expect(button.disabled).toBeTruthy();
            });
        });
    });

    it('Input rich text: disabled = false', () => {
        element.disabled = false;

        return Promise.resolve().then(() => {
            const comboboxes = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-combobox"]'
            );
            comboboxes.forEach((combobox) => {
                expect(combobox.disabled).toBeFalsy();
            });

            const colorPicker = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-colorpicker-button"]'
            );
            if (colorPicker) expect(colorPicker.disabled).toBeFalsy();

            const buttons = element.shadowRoot.querySelectorAll(
                '.slds-rich-text-editor__toolbar > ul li .slds-button, .overflow-menu > ul > li .slds-button'
            );
            buttons.forEach((button) => {
                if (button.classList.contains('ql-link')) {
                    expect(button.disabled).toBeTruthy();
                } else {
                    expect(button.disabled).toBeFalsy();
                }
            });
        });
    });

    // disabled-categories
    it('Input rich text: disabledCategories', () => {
        element.disabledCategories = ['FORMAT_TEXT', 'ALIGN_TEXT'];

        return Promise.resolve().then(() => {
            const formatText = element.shadowRoot.querySelector(
                '[aria-label="Format text"]'
            );
            expect(formatText).toBeFalsy();

            const alignText = element.shadowRoot.querySelector(
                '[aria-label="Align text"]'
            );
            expect(alignText).toBeFalsy();

            const formatBody = element.shadowRoot.querySelector(
                '[aria-label="Format body"]'
            );
            expect(formatBody).toBeTruthy();
        });
    });

    // formats
    it('Input rich text: formats', () => {
        element.formats = ['align', 'bold'];

        return Promise.resolve().then(() => {
            const bold = element.shadowRoot.querySelector('.ql-bold');
            expect(bold).toBeTruthy();

            const italic = element.shadowRoot.querySelector('.ql-italic');
            expect(italic).toBeFalsy();

            const align = element.shadowRoot.querySelectorAll('.ql-align');
            expect(align.length).toBe(3);
        });
    });

    // is-publisher
    it('Input rich text: isPublisher', () => {
        element.isPublisher = true;

        return Promise.resolve().then(() => {
            const emoji = element.shadowRoot.querySelector('.ql-emoji');
            expect(emoji).toBeTruthy();

            const adduser = element.shadowRoot.querySelector('.ql-adduser');
            expect(adduser).toBeTruthy();
        });
    });

    // label
    it('Input rich text: label', () => {
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.slds-form-element__label'
            );
            expect(label.textContent).toBe('A string label');
        });
    });

    // label-visible
    it('Input rich text: labelVisible = true', () => {
        element.labelVisible = true;

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.slds-form-element__label'
            );
            const assistiveText = element.shadowRoot.querySelector(
                '.slds-form-element__label.slds-assistive-text'
            );
            expect(label).toBeTruthy();
            expect(assistiveText).toBeFalsy();
        });
    });

    it('Input rich text: labelVisible = false', () => {
        element.label = 'A string label';
        element.labelVisible = false;

        return Promise.resolve().then(() => {
            const assistiveText = element.shadowRoot.querySelector(
                '.slds-form-element__label.slds-assistive-text'
            );
            expect(assistiveText.textContent).toBe('A string label');
        });
    });

    // message-when-bad-input
    it('Input rich text: messageWhenBadInput', () => {
        element.messageWhenBadInput = 'A string error message';

        return Promise.resolve().then(() => {
            const message = element.shadowRoot.querySelector(
                '.slds-form-element__help'
            );
            expect(message.textContent).toBe('A string error message');
        });
    });

    // placeholder
    it('Input rich text: placeholder', () => {
        element.placeholder = 'A string placeholder';

        return Promise.resolve().then(() => {
            const placeholder = element.shadowRoot.querySelector(
                '.input-rich-text-placeholder'
            );
            expect(placeholder.textContent).toBe('A string placeholder');
        });
    });

    // readOnly
    it('Input rich text: readOnly', () => {
        element.readOnly = true;
        element.value = 'Some value';

        return Promise.resolve().then(() => {
            const quillEditor = element.shadowRoot.querySelector('.editor');
            expect(quillEditor).toBeFalsy();

            const fakeEditor = element.shadowRoot.querySelector(
                '[data-element-id="lightning-formatted-rich-text-top-toolbar"]'
            );
            expect(fakeEditor).toBeTruthy();
            expect(fakeEditor.value).toBe('Some value');
        });
    });

    // value
    it('Input rich text: value', () => {
        element.value = 'A string value';
        const textArea = element.shadowRoot.querySelector(
            '[data-element-id="lightning-formatted-rich-text-top-toolbar"]'
        );

        return Promise.resolve().then(() => {
            expect(textArea.value).toBe('A string value');
        });
    });

    // variant
    it('Input rich text: variant = top-toolbar', () => {
        element.variant = 'top-toolbar';

        return Promise.resolve().then(() => {
            const toolbar = element.shadowRoot.querySelector(
                '.slds-rich-text-editor__toolbar + .slds-rich-text-editor__textarea'
            );
            expect(toolbar).toBeTruthy();
        });
    });

    it('Input rich text: variant = bottom-toolbar', () => {
        element.variant = 'bottom-toolbar';

        return Promise.resolve().then(() => {
            const toolbar = element.shadowRoot.querySelector(
                '.slds-rich-text-editor__textarea + .slds-rich-text-editor__toolbar'
            );
            expect(toolbar).toBeTruthy();
        });
    });
});
