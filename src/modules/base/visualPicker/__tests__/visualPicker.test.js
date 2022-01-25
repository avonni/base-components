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
import VisualPicker from 'c/visualPicker';
import { testItems } from '../__docs__/data';

let element;
describe('VisualPicker', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-visual-picker', {
            is: VisualPicker
        });
        document.body.appendChild(element);
    });

    it('Visual Picker: Default attributes', () => {
        expect(element.disabled).toBeFalsy();
        expect(element.hideCheckMark).toBeFalsy();
        expect(element.items).toMatchObject([]);
        expect(element.label).toBeUndefined();
        expect(element.messageWhenValueMissing).toBeUndefined();
        expect(element.name).not.toBeUndefined();
        expect(element.ratio).toBe('1-by-1');
        expect(element.required).toBeFalsy();
        expect(element.size).toBe('medium');
        expect(element.type).toBe('radio');
        expect(element.validity).toMatchObject({});
        expect(element.value).toMatchObject([]);
        expect(element.variant).toBe('non-coverable');
    });

    /* ----- ATTRIBUTES ----- */

    // disabled
    // Depends on items
    it('Visual Picker: disabled = false', () => {
        element.disabled = false;
        element.items = testItems;

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll(
                '[data-element-id="input"]'
            );
            inputs.forEach((input, index) => {
                expect(input.disabled).toBe(testItems[index].disabled || false);
            });
        });
    });

    it('Visual Picker: disabled = true', () => {
        element.disabled = true;
        element.items = testItems;

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll(
                '[data-element-id="input"]'
            );
            inputs.forEach((input) => {
                expect(input.disabled).toBeTruthy();
            });
        });
    });

    // hide-check-mark
    // Depends on variant, value and items
    it('Visual Picker: hideCheckMark = false', () => {
        element.hideCheckMark = false;
        element.items = testItems;
        element.variant = 'coverable';

        return Promise.resolve().then(() => {
            const type = element.shadowRoot.querySelector(
                '.slds-visual-picker__figure'
            );
            const notSelected = element.shadowRoot.querySelector(
                '.slds-is-not-selected'
            );

            expect(notSelected).toBeTruthy();
            expect(type.classList).not.toContain('avonni-hide-check-mark');
        });
    });

    it('Visual Picker: hideCheckMark = true', () => {
        element.hideCheckMark = true;
        element.items = testItems;
        element.variant = 'coverable';

        return Promise.resolve().then(() => {
            const type = element.shadowRoot.querySelector(
                '.slds-visual-picker__figure'
            );
            const notSelected = element.shadowRoot.querySelector(
                '.slds-is-not-selected'
            );

            expect(notSelected).toBeFalsy();
            expect(type.classList).toContain('avonni-hide-check-mark');
        });
    });

    // label
    it('Visual Picker: label', () => {
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.slds-form-element__label'
            );
            expect(label.textContent).toBe('A string label');
        });
    });

    // name
    it('Visual Picker: name', () => {
        element.name = 'a-string-name';

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll(
                '[data-element-id="input"]'
            );
            inputs.forEach((input) => {
                expect(input.name).toBe('a-string-name');
            });
        });
    });

    // ratio
    // Depends on items
    it('Visual Picker: ratio = 1-by-1', () => {
        const ratios = ['1-by-1', '4-by-3', '16-by-9', '3-by-4', '9-by-16'];
        const pickedRatio = '1-by-1';

        element.ratio = pickedRatio;
        element.items = testItems;

        return Promise.resolve().then(() => {
            const wrappers = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker'
            );

            wrappers.forEach((wrapper) => {
                ratios.forEach((ratio) => {
                    if (ratio === pickedRatio) {
                        expect(wrapper.classList).toContain(`ratio-${ratio}`);
                    } else {
                        expect(wrapper.classList).not.toContain(
                            `ratio-${ratio}`
                        );
                    }
                });
            });
        });
    });

    it('Visual Picker: ratio = 4-by-3', () => {
        const ratios = ['1-by-1', '4-by-3', '16-by-9', '3-by-4', '9-by-16'];
        const pickedRatio = '4-by-3';

        element.ratio = pickedRatio;
        element.items = testItems;

        return Promise.resolve().then(() => {
            const wrappers = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker'
            );

            wrappers.forEach((wrapper) => {
                ratios.forEach((ratio) => {
                    if (ratio === pickedRatio) {
                        expect(wrapper.classList).toContain(`ratio-${ratio}`);
                    } else {
                        expect(wrapper.classList).not.toContain(
                            `ratio-${ratio}`
                        );
                    }
                });
            });
        });
    });

    it('Visual Picker: ratio = 16-by-9', () => {
        const ratios = ['1-by-1', '4-by-3', '16-by-9', '3-by-4', '9-by-16'];
        const pickedRatio = '16-by-9';

        element.ratio = pickedRatio;
        element.items = testItems;

        return Promise.resolve().then(() => {
            const wrappers = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker'
            );

            wrappers.forEach((wrapper) => {
                ratios.forEach((ratio) => {
                    if (ratio === pickedRatio) {
                        expect(wrapper.classList).toContain(`ratio-${ratio}`);
                    } else {
                        expect(wrapper.classList).not.toContain(
                            `ratio-${ratio}`
                        );
                    }
                });
            });
        });
    });

    it('Visual Picker: ratio = 3-by-4', () => {
        const ratios = ['1-by-1', '4-by-3', '16-by-9', '3-by-4', '9-by-16'];
        const pickedRatio = '3-by-4';

        element.ratio = pickedRatio;
        element.items = testItems;

        return Promise.resolve().then(() => {
            const wrappers = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker'
            );

            wrappers.forEach((wrapper) => {
                ratios.forEach((ratio) => {
                    if (ratio === pickedRatio) {
                        expect(wrapper.classList).toContain(`ratio-${ratio}`);
                    } else {
                        expect(wrapper.classList).not.toContain(
                            `ratio-${ratio}`
                        );
                    }
                });
            });
        });
    });

    it('Visual Picker: ratio = 9-by-16', () => {
        const ratios = ['1-by-1', '4-by-3', '16-by-9', '3-by-4', '9-by-16'];
        const pickedRatio = '9-by-16';

        element.ratio = pickedRatio;
        element.items = testItems;

        return Promise.resolve().then(() => {
            const wrappers = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker'
            );

            wrappers.forEach((wrapper) => {
                ratios.forEach((ratio) => {
                    if (ratio === pickedRatio) {
                        expect(wrapper.classList).toContain(`ratio-${ratio}`);
                    } else {
                        expect(wrapper.classList).not.toContain(
                            `ratio-${ratio}`
                        );
                    }
                });
            });
        });
    });

    // required
    it('Visual Picker: required = false', () => {
        element.required = false;

        return Promise.resolve().then(() => {
            const abbr = element.shadowRoot.querySelector(
                '[data-element-id="abbr"]'
            );
            const fieldset = element.shadowRoot.querySelector(
                '[data-element-id="fieldset"]'
            );

            expect(abbr).toBeFalsy();
            expect(fieldset.ariaRequired).toBe('false');
        });
    });

    it('Visual Picker: required = true', () => {
        element.required = true;

        return Promise.resolve().then(() => {
            const abbr = element.shadowRoot.querySelector(
                '[data-element-id="abbr"]'
            );
            const fieldset = element.shadowRoot.querySelector(
                '[data-element-id="fieldset"]'
            );

            expect(abbr).toBeTruthy();
            expect(fieldset.ariaRequired).toBe('true');
        });
    });

    // size
    // Depends on items
    it('Visual Picker: size = xx-small', () => {
        element.size = 'xx-small';
        element.items = testItems;

        return Promise.resolve().then(() => {
            const visualPickers = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker'
            );
            visualPickers.forEach((visualPicker) => {
                expect(visualPicker.classList).toContain(
                    'avonni-visual-picker_xx-small'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_x-small'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_small'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_medium'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_large'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_x-large'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_xx-large'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_responsive'
                );
            });
        });
    });

    it('Visual Picker: size = x-small', () => {
        element.size = 'x-small';
        element.items = testItems;

        return Promise.resolve().then(() => {
            const visualPickers = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker'
            );
            visualPickers.forEach((visualPicker) => {
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_xx-small'
                );
                expect(visualPicker.classList).toContain(
                    'avonni-visual-picker_x-small'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_small'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_medium'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_large'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_x-large'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_xx-large'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_responsive'
                );
            });
        });
    });

    it('Visual Picker: size = small', () => {
        element.size = 'small';
        element.items = testItems;

        return Promise.resolve().then(() => {
            const visualPickers = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker'
            );
            visualPickers.forEach((visualPicker) => {
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_xx-small'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_x-small'
                );
                expect(visualPicker.classList).toContain(
                    'avonni-visual-picker_small'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_medium'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_large'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_x-large'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_xx-large'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_responsive'
                );
            });
        });
    });

    it('Visual Picker: size = medium', () => {
        element.size = 'medium';
        element.items = testItems;

        return Promise.resolve().then(() => {
            const visualPickers = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker'
            );
            visualPickers.forEach((visualPicker) => {
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_xx-small'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_x-small'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_small'
                );
                expect(visualPicker.classList).toContain(
                    'avonni-visual-picker_medium'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_large'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_x-large'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_xx-large'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_responsive'
                );
            });
        });
    });

    it('Visual Picker: size = large', () => {
        element.size = 'large';
        element.items = testItems;

        return Promise.resolve().then(() => {
            const visualPickers = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker'
            );
            visualPickers.forEach((visualPicker) => {
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_xx-small'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_x-small'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_small'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_medium'
                );
                expect(visualPicker.classList).toContain(
                    'avonni-visual-picker_large'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_x-large'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_xx-large'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_responsive'
                );
            });
        });
    });

    it('Visual Picker: size = x-large', () => {
        element.size = 'x-large';
        element.items = testItems;

        return Promise.resolve().then(() => {
            const visualPickers = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker'
            );
            visualPickers.forEach((visualPicker) => {
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_xx-small'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_x-small'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_small'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_medium'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_large'
                );
                expect(visualPicker.classList).toContain(
                    'avonni-visual-picker_x-large'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_xx-large'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_responsive'
                );
            });
        });
    });

    it('Visual Picker: size = xx-large', () => {
        element.size = 'xx-large';
        element.items = testItems;

        return Promise.resolve().then(() => {
            const visualPickers = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker'
            );
            visualPickers.forEach((visualPicker) => {
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_xx-small'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_x-small'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_small'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_medium'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_large'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_x-large'
                );
                expect(visualPicker.classList).toContain(
                    'avonni-visual-picker_xx-large'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_responsive'
                );
            });
        });
    });

    // type
    // Depends on items
    it('Visual Picker: type = radio', () => {
        element.type = 'radio';
        element.items = testItems;

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll(
                '[data-element-id="input"]'
            );
            inputs.forEach((input) => {
                expect(input.type).toBe('radio');
            });
        });
    });

    it('Visual Picker: type = checkbox', () => {
        element.type = 'checkbox';
        element.items = testItems;

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll(
                '[data-element-id="input"]'
            );
            inputs.forEach((input) => {
                expect(input.type).toBe('checkbox');
            });
        });
    });

    // value
    // Depends on items and type
    it('Visual Picker: value, with radio type', () => {
        element.value = 'lightning-professional';
        element.items = testItems;
        element.type = 'radio';

        return Promise.resolve().then(() => {
            const checkedItem = element.shadowRoot.querySelector(
                'input[value="lightning-professional"]'
            );
            expect(checkedItem.checked).toBeTruthy();
        });
    });

    it('Visual Picker: value, with checkbox type', () => {
        element.value = ['lightning-professional', 'lightning-enterprise-plus'];
        element.items = testItems;
        element.type = 'checkbox';

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll(
                '[data-element-id="input"]'
            );
            expect(inputs[0].checked).toBeTruthy();
            expect(inputs[1].checked).toBeFalsy();
            expect(inputs[2].checked).toBeTruthy();
        });
    });

    // variant
    // Depends on items
    it('Visual picker: variant = non-coverable', () => {
        element.variant = 'non-coverable';
        element.items = testItems;
        element.value = 'lightning-professional';

        return Promise.resolve().then(() => {
            const selected =
                element.shadowRoot.querySelector('.slds-is-selected');
            expect(selected).toBeFalsy();
            const nonCoverableClass = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker__text'
            );
            expect(nonCoverableClass).toHaveLength(4);
            const coverableClass = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker__icon'
            );
            expect(coverableClass).toHaveLength(0);
        });
    });

    it('Visual picker: variant = coverable', () => {
        element.variant = 'coverable';
        element.items = testItems;
        element.value = 'lightning-professional';

        return Promise.resolve().then(() => {
            const selected =
                element.shadowRoot.querySelector('.slds-is-selected');
            expect(selected).toBeTruthy();
            const nonCoverableClass = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker__text'
            );
            expect(nonCoverableClass).toHaveLength(0);
            const coverableClass = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker__icon'
            );
            expect(coverableClass).toHaveLength(4);
        });
    });

    /* ----- METHODS ----- */

    it('Visual Picker: Transfer focus and blur', () => {
        element.items = testItems;

        return Promise.resolve()
            .then(() => {
                element.focus();
                element.blur();
            })
            .then(() => {
                expect(element.shadowRoot.activeElement).toBeNull();
            });
    });

    // reportValidity
    // Depends on required
    it('Visual picker: reportValidity method', () => {
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
    it('Visual picker: showHelpMessageIfInvalid method', () => {
        element.required = true;
        element.showHelpMessageIfInvalid();

        return Promise.resolve().then(() => {
            const help = element.shadowRoot.querySelector(
                '.slds-form-element__help'
            );
            expect(help).toBeTruthy();
        });
    });

    // checkValidity
    it('Visual picker: checkValidity method', () => {
        const spy = jest.spyOn(element, 'checkValidity');

        element.checkValidity();
        expect(spy).toHaveBeenCalled();
    });

    // setCustomValidity
    it('Visual picker: setCustomValidity method', () => {
        const spy = jest.spyOn(element, 'setCustomValidity');

        element.setCustomValidity('Something');
        expect(spy).toHaveBeenCalled();
    });

    /* ----- EVENTS ----- */

    // change
    // Depends on items and type
    it('Visual picker: change event, with radio type', () => {
        const handler = jest.fn();
        element.addEventListener('change', handler);

        element.items = testItems;
        element.type = 'radio';

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll(
                '[data-element-id="input"]'
            );
            inputs[0].click();

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.value).toMatchObject([
                'lightning-professional'
            ]);
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });

    it('Visual picker: change event, with checkbox type', () => {
        const handler = jest.fn();
        element.addEventListener('change', handler);

        element.items = testItems;
        element.type = 'checkbox';

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll(
                '[data-element-id="input"]'
            );
            inputs[0].click();
            inputs[1].click();

            expect(handler).toHaveBeenCalledTimes(2);
            expect(handler.mock.calls[1][0].detail.value).toMatchObject([
                'lightning-professional',
                'lightning-enterprise'
            ]);
            expect(handler.mock.calls[1][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[1][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[1][0].composed).toBeFalsy();
        });
    });
});
