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
import VerticalVisualPicker from 'c/verticalVisualPicker';
import { itemsWithIcons } from '../__docs__/data.js';

let element;
describe('VerticalVisualPicker', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-vertical-visual-picker', {
            is: VerticalVisualPicker
        });
        document.body.appendChild(element);
    });

    it('Vertical visual picker: Default attributes', () => {
        expect(element.disabled).toBeFalsy();
        expect(element.hideCheckMark).toBeFalsy();
        expect(element.items).toMatchObject([]);
        expect(element.label).toBeUndefined();
        expect(element.messageWhenValueMissing).toBeUndefined();
        expect(element.name).not.toBeUndefined();
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
    it('Vertical visual picker: disabled = false', () => {
        element.disabled = false;
        element.items = itemsWithIcons;

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll(
                '[data-element-id="input"]'
            );
            inputs.forEach((input, index) => {
                expect(input.disabled).toBe(
                    itemsWithIcons[index].disabled || false
                );
            });
        });
    });

    it('Vertical visual picker: disabled = true', () => {
        element.disabled = true;
        element.items = itemsWithIcons;

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
    it('Vertical visual picker: hideCheckMark = false', () => {
        element.hideCheckMark = false;
        element.items = itemsWithIcons;
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

    it('Vertical visual picker: hideCheckMark = true', () => {
        element.hideCheckMark = true;
        element.items = itemsWithIcons;
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

    // items
    it('Vertical visual picker: items', () => {
        element.items = itemsWithIcons;

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll(
                '[data-element-id="input"]'
            );
            const figureAvatar = element.shadowRoot.querySelectorAll(
                '.avonni-vertical-visual-picker__figure c-primitive-avatar'
            );
            const figureTitles = element.shadowRoot.querySelectorAll(
                '.avonni-vertical-visual-picker__item-title'
            );
            const figureDescriptions = element.shadowRoot.querySelectorAll(
                '.avonni-vertical-visual-picker__item-description'
            );

            itemsWithIcons.forEach((item, index) => {
                expect(inputs[index].value).toBe(item.value);
                expect(inputs[index].disabled).toBe(item.disabled || false);
                expect(figureAvatar[index].iconName).toBe(item.iconName);
                expect(figureAvatar[index].size).toBe(
                    item.iconSize || 'medium'
                );
                expect(figureTitles[index].textContent).toBe(item.title);
                expect(figureDescriptions[index].textContent).toBe(
                    item.description
                );
            });
        });
    });

    // label
    it('Vertical visual picker: label', () => {
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.slds-form-element__label'
            );
            expect(label.textContent).toBe('A string label');
        });
    });

    // message-when-value-missing
    // Depends on required, focus(), blur() and showHelpMessageIfInvalid()
    it('Vertical visual picker: messageWhenValueMissing', () => {
        element.required = true;
        element.items = itemsWithIcons;
        element.messageWhenValueMissing = 'Missing value!';

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
                expect(message.textContent).toBe('Missing value!');
            });
    });

    // name
    it('Vertical visual picker: name', () => {
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

    // required
    it('Vertical visual picker: required = false', () => {
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

    it('Vertical visual picker: required = true', () => {
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
    it('Vertical visual picker: size = small', () => {
        element.size = 'small';
        element.items = itemsWithIcons;

        return Promise.resolve().then(() => {
            const visualPickers = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker'
            );
            const visualPickerFigures = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker__figure'
            );
            visualPickers.forEach((visualPicker) => {
                expect(visualPicker.classList).toContain(
                    'avonni-vertical-visual-picker__item_size-small'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-vertical-visual-picker__item_size-medium'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-vertical-visual-picker__item_size-large'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-vertical-visual-picker__item_size-responsive'
                );
            });
            visualPickerFigures.forEach((visualPickerFigure) => {
                expect(visualPickerFigure.classList).toContain(
                    'avonni-vertical-visual-picker__item_size-small'
                );
                expect(visualPickerFigure.classList).not.toContain(
                    'avonni-vertical-visual-picker__item_size-medium'
                );
                expect(visualPickerFigure.classList).not.toContain(
                    'avonni-vertical-visual-picker__item_size-large'
                );
                expect(visualPickerFigure.classList).not.toContain(
                    'avonni-vertical-visual-picker__item_size-responsive'
                );
            });
        });
    });

    it('Vertical visual picker: size = medium', () => {
        element.size = 'medium';
        element.items = itemsWithIcons;

        return Promise.resolve().then(() => {
            const visualPickers = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker'
            );
            const visualPickerFigures = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker__figure'
            );
            visualPickers.forEach((visualPicker) => {
                expect(visualPicker.classList).toContain(
                    'avonni-vertical-visual-picker__item_size-medium'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-vertical-visual-picker__item_size-large'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-vertical-visual-picker__item_size-small'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-vertical-visual-picker__item_size-responsive'
                );
            });
            visualPickerFigures.forEach((visualPickerFigure) => {
                expect(visualPickerFigure.classList).toContain(
                    'avonni-vertical-visual-picker__item_size-medium'
                );
                expect(visualPickerFigure.classList).not.toContain(
                    'avonni-vertical-visual-picker__item_size-large'
                );
                expect(visualPickerFigure.classList).not.toContain(
                    'avonni-vertical-visual-picker__item_size-small'
                );
                expect(visualPickerFigure.classList).not.toContain(
                    'avonni-vertical-visual-picker__item_size-responsive'
                );
            });
        });
    });

    it('Vertical visual picker: size = large', () => {
        element.size = 'large';
        element.items = itemsWithIcons;

        return Promise.resolve().then(() => {
            const visualPickers = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker'
            );
            const visualPickerFigures = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker__figure'
            );
            visualPickers.forEach((visualPicker) => {
                expect(visualPicker.classList).not.toContain(
                    'avonni-vertical-visual-picker__item_size-small'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-vertical-visual-picker__item_size-medium'
                );
                expect(visualPicker.classList).toContain(
                    'avonni-vertical-visual-picker__item_size-large'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-vertical-visual-picker__item_size-responsive'
                );
            });
            visualPickerFigures.forEach((visualPickerFigure) => {
                expect(visualPickerFigure.classList).not.toContain(
                    'avonni-vertical-visual-picker__item_size-small'
                );
                expect(visualPickerFigure.classList).not.toContain(
                    'avonni-vertical-visual-picker__item_size-medium'
                );
                expect(visualPickerFigure.classList).toContain(
                    'avonni-vertical-visual-picker__item_size-large'
                );
                expect(visualPickerFigure.classList).not.toContain(
                    'avonni-vertical-visual-picker__item_size-responsive'
                );
            });
        });
    });

    it('Vertical visual picker: size = responsive', () => {
        element.size = 'responsive';
        element.items = itemsWithIcons;

        return Promise.resolve().then(() => {
            const visualPickers = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker'
            );
            const visualPickerFigures = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker__figure'
            );
            visualPickers.forEach((visualPicker) => {
                expect(visualPicker.classList).not.toContain(
                    'avonni-vertical-visual-picker__item_size-small'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-vertical-visual-picker__item_size-medium'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-vertical-visual-picker__item_size-large'
                );
                expect(visualPicker.classList).toContain(
                    'avonni-vertical-visual-picker__item_size-responsive'
                );
            });
            visualPickerFigures.forEach((visualPickerFigure) => {
                expect(visualPickerFigure.classList).not.toContain(
                    'avonni-vertical-visual-picker__item_size-small'
                );
                expect(visualPickerFigure.classList).not.toContain(
                    'avonni-vertical-visual-picker__item_size-medium'
                );
                expect(visualPickerFigure.classList).not.toContain(
                    'avonni-vertical-visual-picker__item_size-large'
                );
                expect(visualPickerFigure.classList).toContain(
                    'avonni-vertical-visual-picker__item_size-responsive'
                );
            });
        });
    });

    // type
    // Depends on items
    it('Vertical visual picker: type = radio', () => {
        element.type = 'radio';
        element.items = itemsWithIcons;

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll(
                '[data-element-id="input"]'
            );
            inputs.forEach((input) => {
                expect(input.type).toBe('radio');
            });
        });
    });

    it('Vertical visual picker: type = checkbox', () => {
        element.type = 'checkbox';
        element.items = itemsWithIcons;

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
    it('Vertical visual picker: value, with radio type', () => {
        element.value = 'lightning-professional';
        element.items = itemsWithIcons;
        element.type = 'radio';

        return Promise.resolve().then(() => {
            const checkedItem = element.shadowRoot.querySelector(
                'input[value="lightning-professional"]'
            );
            expect(checkedItem.checked).toBeTruthy();
        });
    });

    it('Vertical visual picker: value, with checkbox type', () => {
        element.value = ['lightning-professional', 'lightning-unlimited'];
        element.items = itemsWithIcons;
        element.type = 'checkbox';

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll(
                '[data-element-id="input"]'
            );
            expect(inputs[0].checked).toBeTruthy();
            expect(inputs[1].checked).toBeFalsy();
            expect(inputs[2].checked).toBeFalsy();
            expect(inputs[3].checked).toBeTruthy();
        });
    });

    // variant
    // Depends on items
    it('Vertical visual picker: variant = non-coverable', () => {
        element.variant = 'non-coverable';
        element.items = itemsWithIcons;
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

    it('Vertical visual picker: variant = coverable', () => {
        element.variant = 'coverable';
        element.items = itemsWithIcons;
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
    // Blur and focus methods
    it('Vertical visual picker: Transfer focus and blur', () => {
        element.items = itemsWithIcons;

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
    it('Vertical visual picker: reportValidity method', () => {
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
    it('Vertical visual picker: showHelpMessageIfInvalid method', () => {
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
    it('Vertical visual picker: checkValidity method', () => {
        const spy = jest.spyOn(element, 'checkValidity');

        element.checkValidity();
        expect(spy).toHaveBeenCalled();
    });

    // setCustomValidity
    it('Vertical visual picker: setCustomValidity method', () => {
        const spy = jest.spyOn(element, 'setCustomValidity');

        element.setCustomValidity('Something');
        expect(spy).toHaveBeenCalled();
    });

    /* ----- EVENTS ----- */

    // change
    // Depends on items and type
    it('Vertical visual picker: change event, with radio type', () => {
        const handler = jest.fn();
        element.addEventListener('change', handler);

        element.items = itemsWithIcons;
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

    it('Vertical visual picker: change event, with checkbox type', () => {
        const handler = jest.fn();
        element.addEventListener('change', handler);

        element.items = itemsWithIcons;
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
