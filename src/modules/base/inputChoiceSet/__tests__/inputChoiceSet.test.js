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
import InputChoiceSet from '../inputChoiceSet';

const options = [
    { label: 'Mon', value: 'mon' },
    { label: 'Tue', value: 'tue' },
    { label: 'Wed', value: 'wed' },
    { label: 'Thu', value: 'thu' },
    { label: 'Fri', value: 'fri' }
];

const optionsWithIcon = [
    {
        label: 'Left',
        value: 'left',
        iconName: 'utility:left_align_text',
        iconPosition: 'right'
    },
    {
        label: 'Center',
        value: 'center',
        iconName: 'utility:center_align_text',
        iconPosition: 'right'
    },
    {
        label: 'Right',
        value: 'right',
        iconName: 'utility:right_align_text',
        iconPosition: 'right'
    }
];

let element;
describe('Input choice set', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-input-choice-set', {
            is: InputChoiceSet
        });
        document.body.appendChild(element);
    });

    it('Input choice set Default attributes', () => {
        expect(element.disabled).toBeFalsy();
        expect(element.label).toBeUndefined();
        expect(element.type).toBe('default');
        expect(element.isMultiSelect).toBe(false);
        expect(element.messageWhenValueMissing).toBeUndefined();
        expect(element.name).toBeUndefined();
        expect(element.options).toBeUndefined();
        expect(element.orientation).toBe('vertical');
        expect(element.readOnly).toBeFalsy();
        expect(element.required).toBeFalsy();
        expect(element.validity).toMatchObject({});
        expect(element.value).toMatchObject([]);
        expect(element.variant).toBe('standard');
    });

    /* ----- ATTRIBUTES ----- */

    // disabled
    it('Input choice set disabled', () => {
        element.options = options;
        element.disabled = true;

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll('[data-element-id^="input"]');
            inputs.forEach((input) => {
                expect(input.disabled).toBeTruthy();
            });
        });
    });

    // label
    it('Input choice set label', () => {
        element.options = options;
        element.label = 'This is a label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.slds-form-element__label'
            );
            expect(label.textContent).toBe('This is a label');
        });
    });

    // type
    it('Input choice set type checkbox', () => {
        element.options = options;
        element.orientation = 'vertical';
        element.isMultiSelect = true;

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll('[data-element-id^="span-checkbox-container"]');
            inputs.forEach((input) => {
                expect(input.className).toContain('slds-checkbox vertical');
                expect(input.className).not.toContain(
                    'slds-button slds-checkbox_button'
                );
            });
        });
    });

    it('Input choice set type button', () => {
        element.options = options;
        element.type = 'button';
        element.orientation = 'vertical';

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll('[data-element-id^="span-checkbox-container"]');
            inputs.forEach((input) => {
                const expected =
                    input.className ===
                        'slds-button slds-checkbox_button vertical' ||
                    input.className === 'slds-checkbox_faux';
                expect(expected).toBe(true);
                expect(input.className).not.toBe('slds-checkbox');
            });
        });
    });

    // Message when value is missing
    // Depends on required, focus(), blur() and showHelpMessageIfInvalid()
    it('Input choice set message when value is missing', () => {
        element.options = options;
        element.required = true;
        element.messageWhenValueMissing = 'Value is Missing';

        return Promise.resolve()
            .then(() => {
                element.focus();
                element.blur();
                element.showHelpMessageIfInvalid();
            })
            .then(() => {
                const message = element.shadowRoot.querySelector(
                    '.slds-form-element__help'
                );
                expect(message.textContent).toBe('Value is Missing');
            });
    });

    // name
    it('Input choice set name', () => {
        element.options = options;
        element.name = 'Checkbox group name';

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll('[data-element-id^="input"]');
            inputs.forEach((input) => {
                expect(input.name).toBe('Checkbox group name');
            });
        });
    });

    // options
    it('Input choice set options', () => {
        element.options = options;

        return Promise.resolve().then(() => {
            const labels = element.shadowRoot.querySelectorAll('[data-element-id="label"]');
            let index = 0;
            labels.forEach((label) => {
                expect(label.control.value).toBe(
                    element.options[index++].value
                );
            });
        });
    });

    // options with icons
    it('Input choice set options with icons', () => {
        element.options = optionsWithIcon;

        return Promise.resolve().then(() => {
            const icons = element.shadowRoot.querySelectorAll('[data-element-id="lightning-icon-checkbox"]');
            let index = 0;
            icons.forEach((icon) => {
                expect(icon.iconName).toBe(element.options[index++].iconName);
            });

            const labels = element.shadowRoot.querySelectorAll('[data-element-id="label"]');
            index = 0;
            labels.forEach((label) => {
                expect(label.control.value).toBe(
                    element.options[index++].value
                );
            });
        });
    });

    // readOnly
    it('Input choice set readOnly', () => {
        element.options = options;
        element.readOnly = true;
        element.value = options[0].value;

        const handler = jest.fn();
        element.addEventListener('change', handler);

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('[data-element-id^="input"]');
            input.click();
            expect(handler).not.toHaveBeenCalled();
            expect(element.value).toBe(options[0].value);
        });
    });

    // required
    it('Input choice set required', () => {
        element.options = options;
        element.required = true;

        return Promise.resolve().then(() => {
            const abbr = element.shadowRoot.querySelector('[data-element-id="abbr"]');
            expect(abbr).toBeTruthy();
        });
    });

    // value
    it('Input choice set value', () => {
        element.options = options;
        element.value = ['mon', 'wed'];

        return Promise.resolve().then(() => {
            const values = [];
            const inputs = element.shadowRoot.querySelectorAll('[data-element-id^="input"]');
            inputs.forEach((input) => {
                if (input.checked) {
                    values.push(input.value);
                }
            });
            expect(values).toHaveLength(2);
        });
    });

    // orientation
    it('Input choice set vertical orientation', () => {
        element.options = options;
        element.orientation = 'vertical';

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll('[data-element-id="span-checkbox-container"]');
            inputs.forEach((input) => {
                expect(input.className).not.toContain('horizontal');
                expect(input.className).toContain('vertical');
            });
        });
    });

    it('Input choice set horizontal orientation', () => {
        element.options = options;
        element.orientation = 'horizontal';

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll('[data-element-id="span-checkbox-container"]');
            inputs.forEach((input) => {
                expect(input.className).not.toContain('vertical');
                expect(input.className).toContain('horizontal');
            });
        });
    });

    // variant
    it('Input choice set variant standard', () => {
        element.options = options;

        return Promise.resolve().then(() => {
            expect(element.className).not.toContain(
                'slds-form-element_stacked'
            );
            expect(element.className).not.toContain(
                'slds-form-element_horizontal'
            );
            const label = element.shadowRoot.querySelector(
                '.slds-form-element__label'
            );
            expect(label.className).not.toContain('slds-assistive-text');
        });
    });

    it('Input choice set variant label hidden', () => {
        element.options = options;
        element.variant = 'label-hidden';

        return Promise.resolve().then(() => {
            expect(element.className).not.toContain(
                'slds-form-element_stacked'
            );
            expect(element.className).not.toContain(
                'slds-form-element_horizontal'
            );
            const label = element.shadowRoot.querySelector(
                '.slds-form-element__label'
            );
            expect(label.className).toContain('slds-assistive-text');
        });
    });

    it('Input choice set variant label inline', () => {
        element.options = options;
        element.variant = 'label-inline';

        return Promise.resolve().then(() => {
            expect(element.className).not.toContain(
                'slds-form-element_stacked'
            );
            expect(element.className).toContain('slds-form-element_horizontal');
            const label = element.shadowRoot.querySelector(
                '.slds-form-element__label'
            );
            expect(label.className).not.toContain('slds-assistive-text');
        });
    });

    it('Input choice set variant label stacked', () => {
        element.options = options;
        element.variant = 'label-stacked';

        return Promise.resolve().then(() => {
            expect(element.className).toContain('slds-form-element_stacked');
            expect(element.className).not.toContain(
                'slds-form-element_horizontal'
            );
            const label = element.shadowRoot.querySelector(
                '.slds-form-element__label'
            );
            expect(label.className).not.toContain('slds-assistive-text');
        });
    });

    /* ----- METHODS ----- */
    // checkValidity
    it('checkValidity method', () => {
        const spy = jest.spyOn(element, 'checkValidity');

        element.checkValidity();
        expect(spy).toHaveBeenCalled();
    });

    // setCustomValidity
    it('setCustomValidity method', () => {
        const spy = jest.spyOn(element, 'setCustomValidity');

        element.setCustomValidity('Something');
        expect(spy).toHaveBeenCalled();
    });

    // reportValidity
    // Depends on required
    it('reportValidity method', () => {
        element.required = true;
        element.reportValidity();

        return Promise.resolve().then(() => {
            const help = element.shadowRoot.querySelector(
                '.slds-form-element__help'
            );
            expect(help).toBeTruthy();
        });
    });

    // showHelpMessageIfInvalid
    // Depends on required
    it('showHelpMessageIfInvalid method', () => {
        element.required = true;
        element.showHelpMessageIfInvalid();

        return Promise.resolve().then(() => {
            const help = element.shadowRoot.querySelector(
                '.slds-form-element__help'
            );
            expect(help).toBeTruthy();
        });
    });

    /* ----- EVENTS ----- */

    // change event
    it('Input choice set change event single', () => {
        const handler = jest.fn();
        element.addEventListener('change', handler);
        element.options = options;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('[data-element-id^="input"]');
            input.click();
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.value).toBe('mon');
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
            expect(handler.mock.calls[0][0].composed).toBeTruthy();
        });
    });

    it('Input choice set change event multiple', () => {
        const handler = jest.fn();
        element.addEventListener('change', handler);
        element.options = options;
        element.value = 'mon';
        element.isMultiSelect = true;

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll('[data-element-id^="input"]');
            inputs[1].click();
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.value).toMatchObject([
                'mon',
                'tue'
            ]);
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
            expect(handler.mock.calls[0][0].composed).toBeTruthy();
        });
    });

    // blur event
    it('Input choice set blur event', () => {
        element.options = options;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('[data-element-id^="input"]');
            const handleBlur = (event) => {
                expect(event.bubbles).toBeFalsy();
                expect(event.cancelable).toBeFalsy();
                expect(event.composed).toBeFalsy();
            };
            element.addEventListener('blur', handleBlur);
            input.blur();
        });
    });

    // focus event
    it('Input choice set focus event', () => {
        element.options = options;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('[data-element-id^="input"]');
            const handleFocus = (event) => {
                expect(event.bubbles).toBeFalsy();
                expect(event.cancelable).toBeFalsy();
                expect(event.composed).toBeFalsy();
            };
            element.addEventListener('focus', handleFocus);
            input.focus();
        });
    });
});
