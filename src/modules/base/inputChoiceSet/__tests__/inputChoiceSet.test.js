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
    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.disabled).toBeFalsy();
            expect(element.label).toBeUndefined();
            expect(element.fieldLevelHelp).toBeUndefined();
            expect(element.isLoading).toBe(false);
            expect(element.isMultiSelect).toBe(false);
            expect(element.messageWhenValueMissing).toBeUndefined();
            expect(element.name).toBeUndefined();
            expect(element.options).toBeUndefined();
            expect(element.orientation).toBe('vertical');
            expect(element.readOnly).toBeFalsy();
            expect(element.required).toBeFalsy();
            expect(element.stretch).toBe(false);
            expect(element.type).toBe('default');
            expect(element.validity).toMatchObject({});
            expect(element.value).toMatchObject([]);
            expect(element.variant).toBe('standard');
        });

        /* ----- ATTRIBUTES ----- */

        describe('Disabled', () => {
            it('disabled = false', () => {
                element.options = options;
                element.disabled = false;

                return Promise.resolve().then(() => {
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id="input"]'
                    );
                    inputs.forEach((input) => {
                        expect(input.disabled).toBeFalsy();
                    });

                    const labels = element.shadowRoot.querySelectorAll(
                        '[data-element-id="label"]'
                    );
                    labels.forEach((label) => {
                        expect(label.classList).toContain(
                            'avonni-input-choice-set__option-label'
                        );
                    });
                });
            });

            it('disabled = true', () => {
                element.options = options;
                element.disabled = true;

                return Promise.resolve().then(() => {
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id="input"]'
                    );
                    inputs.forEach((input) => {
                        expect(input.disabled).toBeTruthy();
                    });

                    const labels = element.shadowRoot.querySelectorAll(
                        '[data-element-id="label"]'
                    );
                    labels.forEach((label) => {
                        expect(label.classList).not.toContain(
                            'avonni-input-choice-set__option-label'
                        );
                    });
                });
            });
        });

        describe('Field Level Help', () => {
            it('fieldLevelHelp', () => {
                element.options = options;
                element.fieldLevelHelp = 'This is a field level help';

                return Promise.resolve().then(() => {
                    const fieldLevelHelp =
                        element.shadowRoot.querySelector('lightning-helptext');
                    expect(fieldLevelHelp.content).toBe(
                        'This is a field level help'
                    );
                });
            });
        });

        describe('Is Loading', () => {
            it('isLoading = false', () => {
                element.options = options;
                element.isLoading = false;

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="input"]'
                    );
                    const loader = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-spinner-loading"]'
                    );
                    expect(input).toBeTruthy();
                    expect(loader).toBeFalsy();
                });
            });

            it('isLoading = true', () => {
                element.options = options;
                element.isLoading = true;

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="input"]'
                    );
                    const loader = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-spinner-loading"]'
                    );
                    expect(input).toBeFalsy();
                    expect(loader).toBeTruthy();
                });
            });
        });

        describe('Label', () => {
            it('label', () => {
                element.options = options;
                element.label = 'This is a label';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '.slds-form-element__label'
                    );
                    expect(label.textContent).toBe('This is a label');
                });
            });
        });

        describe('Message when value is missing', () => {
            // Depends on required, focus(), blur() and showHelpMessageIfInvalid()
            it('message when value is missing', () => {
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
        });

        describe('Name', () => {
            it('name', () => {
                element.options = options;
                element.name = 'Checkbox group name';

                return Promise.resolve().then(() => {
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id="input"]'
                    );
                    inputs.forEach((input) => {
                        expect(input.name).toBe('Checkbox group name');
                    });
                });
            });
        });

        describe('Options', () => {
            it('options', () => {
                element.options = options;

                return Promise.resolve().then(() => {
                    const labels = element.shadowRoot.querySelectorAll(
                        '[data-element-id="label"]'
                    );
                    let index = 0;
                    labels.forEach((label) => {
                        expect(label.control.value).toBe(
                            element.options[index++].value
                        );
                    });
                });
            });

            it('options with icons', () => {
                element.options = optionsWithIcon;

                return Promise.resolve().then(() => {
                    const icons = element.shadowRoot.querySelectorAll(
                        '[data-element-id="lightning-icon-checkbox"]'
                    );
                    let index = 0;
                    icons.forEach((icon) => {
                        expect(icon.iconName).toBe(
                            element.options[index++].iconName
                        );
                    });

                    const labels = element.shadowRoot.querySelectorAll(
                        '[data-element-id="label"]'
                    );
                    index = 0;
                    labels.forEach((label) => {
                        expect(label.control.value).toBe(
                            element.options[index++].value
                        );
                    });
                });
            });
        });

        describe('Orientation', () => {
            it('vertical', () => {
                element.options = options;
                element.orientation = 'vertical';

                return Promise.resolve().then(() => {
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id="span-checkbox-container"]'
                    );
                    inputs.forEach((input) => {
                        expect(input.className).not.toContain(
                            'avonni-input-choice-set__horizontal'
                        );
                        expect(input.className).toContain(
                            'avonni-input-choice-set__vertical'
                        );
                    });
                });
            });

            it('horizontal', () => {
                element.options = options;
                element.orientation = 'horizontal';

                return Promise.resolve().then(() => {
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id="span-checkbox-container"]'
                    );
                    inputs.forEach((input) => {
                        expect(input.className).not.toContain(
                            'avonni-input-choice-set__vertical'
                        );
                        expect(input.className).toContain(
                            'avonni-input-choice-set__horizontal'
                        );
                    });
                });
            });
        });

        describe('Read Only', () => {
            it('readOnly', () => {
                element.options = options;
                element.readOnly = true;
                element.value = options[0].value;

                const handler = jest.fn();
                element.addEventListener('change', handler);

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="input"]'
                    );
                    input.click();
                    expect(handler).not.toHaveBeenCalled();
                    expect(element.value).toBe(options[0].value);
                });
            });
        });

        describe('Required', () => {
            it('required', () => {
                element.options = options;
                element.required = true;

                return Promise.resolve().then(() => {
                    const abbr = element.shadowRoot.querySelector(
                        '[data-element-id="abbr"]'
                    );
                    expect(abbr).toBeTruthy();
                });
            });
        });

        describe('Stretch', () => {
            it('stretch and not toggle', () => {
                element.options = options;
                element.stretch = true;

                return Promise.resolve().then(() => {
                    const inputGroup = element.shadowRoot.querySelector(
                        '[data-element-id="input-group"]'
                    );
                    expect(inputGroup.className).toContain(
                        'avonni-input-choice-set__stretch'
                    );
                });
            });

            it('stretch and toggle', () => {
                element.options = options;
                element.stretch = true;
                element.type = 'toggle';

                return Promise.resolve().then(() => {
                    const inputGroup = element.shadowRoot.querySelector(
                        '[data-element-id="input-group"]'
                    );
                    expect(inputGroup.className).not.toContain(
                        'avonni-input-choice-set__stretch'
                    );
                    expect(inputGroup.className).toContain('slds-size_full');
                });
            });
        });

        describe('Type', () => {
            it('type checkbox', () => {
                element.options = options;
                element.orientation = 'vertical';
                element.isMultiSelect = true;

                return Promise.resolve().then(() => {
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id="span-checkbox-container"]'
                    );
                    inputs.forEach((input) => {
                        expect(input.className).toContain(
                            'slds-checkbox avonni-input-choice-set__vertical'
                        );
                        expect(input.className).not.toContain(
                            'slds-button slds-checkbox_button'
                        );
                    });
                });
            });

            it('type button', () => {
                element.options = options;
                element.type = 'button';
                element.orientation = 'vertical';

                return Promise.resolve().then(() => {
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id="span-checkbox-container"]'
                    );
                    inputs.forEach((input) => {
                        const expected =
                            input.className ===
                                'slds-button slds-checkbox_button avonni-input-choice-set__vertical' ||
                            input.className === 'slds-checkbox_faux';
                        expect(expected).toBe(true);
                        expect(input.className).not.toBe('slds-checkbox');
                    });
                });
            });

            it('type toggle', () => {
                element.options = options;
                element.type = 'toggle';
                element.orientation = 'vertical';

                return Promise.resolve().then(() => {
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id="span-checkbox-container"]'
                    );
                    inputs.forEach((input) => {
                        const expected =
                            input.className ===
                                'slds-checkbox_toggle slds-grid slds-grid_vertical slds-grid_align-spread avonni-input-choice-set__vertical' ||
                            input.className === 'slds-checkbox_faux';
                        expect(expected).toBe(true);
                        expect(input.className).not.toBe('slds-checkbox');
                    });
                });
            });
        });

        describe('Value', () => {
            it('value', () => {
                element.options = options;
                element.value = ['mon', 'wed'];

                return Promise.resolve().then(() => {
                    const values = [];
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id="input"]'
                    );
                    inputs.forEach((input) => {
                        if (input.checked) {
                            values.push(input.value);
                        }
                    });
                    expect(values).toHaveLength(2);
                });
            });
        });

        describe('Variant', () => {
            it('standard', () => {
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
                    expect(label.className).not.toContain(
                        'slds-assistive-text'
                    );
                });
            });

            it('label hidden', () => {
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
                        '.slds-assistive-text'
                    );
                    expect(label.className).toBeTruthy();
                });
            });

            it('label inline', () => {
                element.options = options;
                element.variant = 'label-inline';

                return Promise.resolve().then(() => {
                    expect(element.className).not.toContain(
                        'slds-form-element_stacked'
                    );
                    expect(element.className).toContain(
                        'slds-form-element_horizontal'
                    );
                    const label = element.shadowRoot.querySelector(
                        '.slds-form-element__label'
                    );
                    expect(label.className).not.toContain(
                        'slds-assistive-text'
                    );
                });
            });

            it('label stacked', () => {
                element.options = options;
                element.variant = 'label-stacked';

                return Promise.resolve().then(() => {
                    expect(element.className).toContain(
                        'slds-form-element_stacked'
                    );
                    expect(element.className).not.toContain(
                        'slds-form-element_horizontal'
                    );
                    const label = element.shadowRoot.querySelector(
                        '.slds-form-element__label'
                    );
                    expect(label.className).not.toContain(
                        'slds-assistive-text'
                    );
                });
            });
        });
    });

    describe('Methods', () => {
        describe('Validity Methods', () => {
            it('checkValidity method', () => {
                const spy = jest.spyOn(element, 'checkValidity');

                element.checkValidity();
                expect(spy).toHaveBeenCalled();
            });

            it('setCustomValidity method', () => {
                const spy = jest.spyOn(element, 'setCustomValidity');

                element.setCustomValidity('Something');
                expect(spy).toHaveBeenCalled();
            });

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
        });
    });

    describe('Events', () => {
        describe('Blur Events', () => {
            it('blur event', () => {
                element.options = options;

                const handler = jest.fn();
                element.addEventListener('blur', handler);

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="input"]'
                    );

                    input.addEventListener('blur', handler);
                    input.dispatchEvent(new CustomEvent('blur', {}));
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                });
            });
        });

        describe('Change Events', () => {
            it('single', () => {
                const handler = jest.fn();
                element.addEventListener('change', handler);
                element.options = options;

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="input"]'
                    );
                    input.click();
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.value).toBe('mon');
                    expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
                    expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
                    expect(handler.mock.calls[0][0].composed).toBeTruthy();
                });
            });

            it('change event is prevented with type button not multi select', () => {
                const handler = jest.fn();
                element.addEventListener('change', handler);
                element.options = options;
                element.type = 'button';
                element.isMultiSelect = false;
                element.value = options[0].value;

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="input"]'
                    );
                    input.click();
                    expect(handler).not.toHaveBeenCalled();
                });
            });

            it('multiple', () => {
                const handler = jest.fn();
                element.addEventListener('change', handler);
                element.options = options;
                element.value = 'mon';
                element.isMultiSelect = true;

                return Promise.resolve().then(() => {
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id="input"]'
                    );
                    inputs[1].click();
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.value).toMatchObject(
                        ['mon', 'tue']
                    );
                    expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
                    expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
                    expect(handler.mock.calls[0][0].composed).toBeTruthy();
                });
            });
        });

        describe('Focus Event', () => {
            it('focus event', () => {
                element.options = options;

                const handler = jest.fn();
                element.addEventListener('focus', handler);

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="input"]'
                    );

                    input.addEventListener('focus', handler);
                    input.dispatchEvent(new CustomEvent('focus', {}));
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                });
            });
        });
    });
});
