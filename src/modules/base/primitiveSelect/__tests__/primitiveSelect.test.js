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
import PrimitiveSelect from 'c/primitiveSelect';

const OPTIONS = [
    {
        label: 'Option 1',
        value: 'option-1'
    },
    {
        label: 'Option 2',
        value: 'option-2'
    },
    {
        label: 'Option 3',
        value: 'option-3'
    }
];

let element;
describe('PrimitiveSelect', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-primitive-select', {
            is: PrimitiveSelect
        });
        document.body.appendChild(element);
    });

    it('Primitive select: Default attributes', () => {
        expect(element.accessKey).toBeUndefined();
        expect(element.disabled).toBeFalsy();
        expect(element.fieldLevelHelp).toBeUndefined();
        expect(element.label).toBeUndefined();
        expect(element.messageWhenValueMissing).toBeUndefined();
        expect(element.multiple).toBeFalsy();
        expect(element.name).toBeUndefined();
        expect(element.options).toMatchObject([]);
        expect(element.required).toBeFalsy();
        expect(element.size).toBeNull();
        expect(element.tabIndex).toBeUndefined();
        expect(element.validity.valid).toBeTruthy();
        expect(element.value).toBeUndefined();
        expect(element.variant).toBe('standard');
    });

    /* ----- ATTRIBUTES ----- */

    // accessKey
    it('Primitive select: accessKey', () => {
        element.accessKey = 'K';

        return Promise.resolve().then(() => {
            const select = element.shadowRoot.querySelector(
                '[data-element-id="select"]'
            );
            expect(select.accessKey).toBe('K');
        });
    });

    // disabled
    it('Primitive select: disabled = true', () => {
        element.disabled = true;

        return Promise.resolve().then(() => {
            const select = element.shadowRoot.querySelector(
                '[data-element-id="select"]'
            );
            expect(select.disabled).toBeTruthy();
        });
    });

    it('Primitive select: disabled = false', () => {
        element.disabled = false;

        return Promise.resolve().then(() => {
            const select = element.shadowRoot.querySelector(
                '[data-element-id="select"]'
            );
            expect(select.disabled).toBeFalsy();
        });
    });

    // field-level-help
    it('Primitive select: fieldLevelHelp', () => {
        element.fieldLevelHelp = 'A string help';

        return Promise.resolve().then(() => {
            const help = element.shadowRoot.querySelector(
                '[data-element-id="lightning-helptext"]'
            );
            expect(help).toBeTruthy();
            expect(help.content).toBe('A string help');
        });
    });

    // label
    it('Primitive select: label', () => {
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '[data-element-id="label"]'
            );
            expect(label.textContent).toBe('A string label');
        });
    });

    // message-when-value-missing
    // Depends on required and reportValidity method
    it('Primitive select: messageWhenValueMissing', () => {
        element.messageWhenValueMissing = 'A string message';
        element.required = true;
        element.reportValidity();

        return Promise.resolve().then(() => {
            const message = element.shadowRoot.querySelector(
                '[data-help-message]'
            );
            expect(message.textContent).toBe('A string message');
        });
    });

    // multiple
    it('Primitive select: multiple = true', () => {
        element.multiple = true;

        return Promise.resolve().then(() => {
            const select = element.shadowRoot.querySelector(
                '[data-element-id="select"]'
            );
            expect(select.multiple).toBeTruthy();
        });
    });

    it('Primitive select: multiple = false', () => {
        element.multiple = false;

        return Promise.resolve().then(() => {
            const select = element.shadowRoot.querySelector(
                '[data-element-id="select"]'
            );
            expect(select.multiple).toBeFalsy();
        });
    });

    // name
    it('Primitive select: name', () => {
        element.name = 'a-string-name';

        return Promise.resolve().then(() => {
            const select = element.shadowRoot.querySelector(
                '[data-element-id="select"]'
            );
            expect(select.name).toBe('a-string-name');
        });
    });

    // options
    it('Primitive select: options', () => {
        element.options = OPTIONS;

        return Promise.resolve().then(() => {
            const options = element.shadowRoot.querySelectorAll(
                '[data-element-id="option"]'
            );

            expect(options).toHaveLength(3);
            options.forEach((option, index) => {
                expect(option.value).toBe(OPTIONS[index].value);
                expect(option.textContent).toBe(OPTIONS[index].label);
            });
        });
    });

    // required
    it('Primitive select: required = true', () => {
        element.required = true;

        return Promise.resolve().then(() => {
            const abbr = element.shadowRoot.querySelector(
                '[data-element-id="abbr"]'
            );

            expect(abbr).toBeTruthy();
        });
    });

    it('Primitive select: required = false', () => {
        element.required = false;

        return Promise.resolve().then(() => {
            const abbr = element.shadowRoot.querySelector(
                '[data-element-id="abbr"]'
            );

            expect(abbr).toBeFalsy();
        });
    });

    // size
    // Depends on multiple
    it('Primitive select: size, unset with multiple', () => {
        element.multiple = true;

        return Promise.resolve().then(() => {
            const select = element.shadowRoot.querySelector(
                '[data-element-id="select"]'
            );

            expect(element.size).toBe('4');
            expect(select.size).toBe(4);
        });
    });

    it('Primitive select: size, set with multiple', () => {
        element.multiple = true;
        element.size = '6';

        return Promise.resolve().then(() => {
            const select = element.shadowRoot.querySelector(
                '[data-element-id="select"]'
            );

            expect(element.size).toBe('6');
            expect(select.size).toBe(6);
        });
    });

    // tab-index
    it('Primitive select: tabIndex', () => {
        element.tabIndex = -1;

        return Promise.resolve().then(() => {
            const select = element.shadowRoot.querySelector(
                '[data-element-id="select"]'
            );

            expect(select.tabIndex).toBe(-1);
        });
    });

    // validity
    // Depends on disabled, required and value
    it('Primitive select: validity, with required = true and disabled = true', () => {
        element.disabled = true;
        element.required = true;

        return Promise.resolve().then(() => {
            expect(element.validity.valid).toBeTruthy();
        });
    });

    it('Primitive select: validity, with required = true and disabled = false', () => {
        element.disabled = false;
        element.required = true;

        return Promise.resolve().then(() => {
            expect(element.validity.valid).toBeFalsy();
        });
    });

    it('Primitive select: validity, with required = true, disabled = true, and a value', () => {
        element.disabled = false;
        element.required = true;
        element.options = OPTIONS;
        element.value = 'option-1';

        return Promise.resolve().then(() => {
            expect(element.validity.valid).toBeTruthy();
        });
    });

    // value
    it('Primitive select: value', () => {
        element.options = OPTIONS;
        element.value = 'option-1';

        return Promise.resolve().then(() => {
            const select = element.shadowRoot.querySelector(
                '[data-element-id="select"]'
            );
            expect(select.value).toBe('option-1');
        });
    });

    // variant
    it('Primitive select: variant = standard', () => {
        element.variant = 'standard';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '[data-element-id="label"]'
            );

            expect(element.classList).not.toContain(
                'slds-form-element_stacked'
            );
            expect(element.classList).not.toContain(
                'slds-form-element_horizontal'
            );
            expect(label.classList).not.toContain('slds-assistive-text');
        });
    });

    it('Primitive select: variant = label-hidden', () => {
        element.variant = 'label-hidden';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '[data-element-id="label"]'
            );

            expect(element.classList).not.toContain(
                'slds-form-element_stacked'
            );
            expect(element.classList).not.toContain(
                'slds-form-element_horizontal'
            );
            expect(label.classList).toContain('slds-assistive-text');
        });
    });

    it('Primitive select: variant = label-stacked', () => {
        element.variant = 'label-stacked';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '[data-element-id="label"]'
            );

            expect(element.classList).toContain('slds-form-element_stacked');
            expect(element.classList).not.toContain(
                'slds-form-element_horizontal'
            );
            expect(label.classList).not.toContain('slds-assistive-text');
        });
    });

    it('Primitive select: variant = label-inline', () => {
        element.variant = 'label-inline';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '[data-element-id="label"]'
            );

            expect(element.classList).not.toContain(
                'slds-form-element_stacked'
            );
            expect(element.classList).toContain('slds-form-element_horizontal');
            expect(label.classList).not.toContain('slds-assistive-text');
        });
    });

    /* ----- EVENTS ----- */
    it('Primitive select: focus', () => {
        const handler = jest.fn();
        element.addEventListener('focus', handler);

        return Promise.resolve().then(() => {
            const select = element.shadowRoot.querySelector('select');
            select.dispatchEvent(new CustomEvent('focus'));

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });

    it('Primitive select: blur', () => {
        const handler = jest.fn();
        element.addEventListener('blur', handler);

        return Promise.resolve().then(() => {
            const select = element.shadowRoot.querySelector('select');
            select.dispatchEvent(new CustomEvent('blur'));

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });

    it('Primitive select: change', () => {
        const handler = jest.fn();
        element.addEventListener('change', handler);

        return Promise.resolve().then(() => {
            const select = element.shadowRoot.querySelector('select');
            select.dispatchEvent(new CustomEvent('change'));

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail).toMatchObject({
                value: ''
            });
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].composed).toBeTruthy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });
});
