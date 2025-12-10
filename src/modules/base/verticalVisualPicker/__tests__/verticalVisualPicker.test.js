import VerticalVisualPicker from 'c/verticalVisualPicker';
import { createElement } from 'lwc';
import {
    baseItems,
    itemsWithIcons,
    itemsWithSubItems
} from '../__docs__/data.js';

const longItems = [];
for (let i = 0; i < 100; i++) {
    const id = longItems.length + i;
    longItems.push({
        avatar: { iconName: `custom:custom${id}` },
        value: `item-${id}`,
        title: `Item ${id}`
    });
}

let element;
describe('Vertical Visual Picker', () => {
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

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.collapsedShowMoreButton).toBe('Show more');
            expect(element.disabled).toBeFalsy();
            expect(element.enableInfiniteLoading).toBeFalsy();
            expect(element.expandedShowMoreButton).toBe('Show less');
            expect(element.hideCheckMark).toBeFalsy();
            expect(element.isLoading).toBeFalsy();
            expect(element.items).toMatchObject([]);
            expect(element.label).toBeUndefined();
            expect(element.loadMoreOffset).toBe(20);
            expect(element.max).toBeUndefined();
            expect(element.maxCount).toBeUndefined();
            expect(element.messageWhenRangeOverflow).toBeUndefined();
            expect(element.messageWhenRangeUnderflow).toBeUndefined();
            expect(element.messageWhenValueMissing).toBeUndefined();
            expect(element.min).toBe(0);
            expect(element.name).not.toBeUndefined();
            expect(element.required).toBeFalsy();
            expect(element.requiredAlternativeText).toBe('Required');
            expect(element.size).toBe('medium');
            expect(element.type).toBe('radio');
            expect(element.validity).toMatchObject({});
            expect(element.value).toMatchObject([]);
            expect(element.variant).toBe('non-coverable');
        });

        describe('disabled', () => {
            it('Passed to the component as false', () => {
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

            it('Passed to the component as true', () => {
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
        });

        describe('hideCheckMark', () => {
            it('Passed to the component as false', () => {
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
                    expect(type.classList).not.toContain(
                        'avonni-hide-check-mark'
                    );
                });
            });

            it('Passed to the component as true', () => {
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
        });

        describe('isLoading', () => {
            it('Passed to the component as false', () => {
                element.isLoading = false;

                return Promise.resolve().then(() => {
                    const spinner = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-spinner"]'
                    );
                    expect(spinner).toBeFalsy();
                });
            });

            it('Passed to the component as true', () => {
                element.isLoading = true;
                element.loadingStateAlternativeText = 'Loading... Text';

                return Promise.resolve().then(() => {
                    const spinner = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-spinner"]'
                    );
                    expect(spinner).toBeTruthy();
                    expect(spinner.alternativeText).toBe('Loading... Text');
                });
            });

            it('Loading disables the max count button', () => {
                element.isLoading = false;
                element.maxCount = 3;
                element.items = longItems;

                return Promise.resolve()
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="show-more-button"]'
                        );
                        expect(button.disabled).toBeFalsy();

                        element.isLoading = true;
                    })
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="show-more-button"]'
                        );
                        expect(button.disabled).toBeTruthy();
                    });
            });
        });

        describe('items', () => {
            it('Passed to the component', () => {
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
                    const figureDescriptions =
                        element.shadowRoot.querySelectorAll(
                            '.avonni-vertical-visual-picker__item-description'
                        );

                    itemsWithIcons.forEach((item, index) => {
                        expect(inputs[index].value).toBe(item.value);
                        expect(inputs[index].disabled).toBe(
                            item.disabled || false
                        );
                        expect(figureAvatar[index].iconName).toBe(
                            item.iconName
                        );
                        expect(figureAvatar[index].size).toBe(
                            item.iconSize || 'medium'
                        );
                        expect(figureTitles[index].textContent).toBe(
                            item.title
                        );
                        expect(figureDescriptions[index].textContent).toBe(
                            item.description
                        );
                    });
                });
            });
        });

        describe('label', () => {
            it('Passed to the component', () => {
                element.label = 'A string label';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '.slds-form-element__label'
                    );
                    expect(label.textContent).toBe('A string label');
                });
            });
        });

        describe('Max', () => {
            it('Message when range overflow and Max', () => {
                element.items = baseItems;
                element.max = 2;
                element.messageWhenRangeOverflow = 'Maximum Capacity!';
                element.type = 'checkbox';
                element.value = ['item-1', 'item-2', 'item-3'];

                return Promise.resolve()
                    .then(() => {
                        element.focus();
                        element.blur();
                    })
                    .then(() => {
                        const message = element.shadowRoot.querySelector(
                            '[data-help-message]'
                        );
                        expect(message).toBeTruthy();
                        expect(message.textContent).toBe('Maximum Capacity!');
                    });
            });
        });

        describe('Min', () => {
            it('Message when range underflow and Min', () => {
                element.items = baseItems;
                element.min = 2;
                element.messageWhenRangeUnderflow = 'Minimum Capacity!';
                element.type = 'checkbox';
                element.value = ['item-1'];

                return Promise.resolve()
                    .then(() => {
                        element.focus();
                        element.blur();
                    })
                    .then(() => {
                        const message = element.shadowRoot.querySelector(
                            '[data-help-message]'
                        );
                        expect(message).toBeTruthy();
                        expect(message.textContent).toBe('Minimum Capacity!');
                    });
            });
        });

        describe('Name', () => {
            it('Passed to the component', () => {
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
        });

        describe('required', () => {
            it('Passed to the component as false', () => {
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

            it('Passed to the component as true', () => {
                element.required = true;
                element.requiredAlternativeText = 'Required Text';

                return Promise.resolve().then(() => {
                    const abbr = element.shadowRoot.querySelector(
                        '[data-element-id="abbr"]'
                    );
                    const fieldset = element.shadowRoot.querySelector(
                        '[data-element-id="fieldset"]'
                    );

                    expect(abbr).toBeTruthy();
                    expect(fieldset.ariaRequired).toBe('true');
                    expect(abbr.title).toBe('Required Text');
                });
            });

            it('Message when value missing and Required', () => {
                element.items = baseItems;
                element.required = true;
                element.messageWhenValueMissing = 'Value Missing!';
                element.type = 'checkbox';

                return Promise.resolve()
                    .then(() => {
                        element.focus();
                        element.blur();
                    })
                    .then(() => {
                        const message = element.shadowRoot.querySelector(
                            '[data-help-message]'
                        );
                        expect(message).toBeTruthy();
                        expect(message.textContent).toBe('Value Missing!');
                    });
            });
        });

        describe('Show more button', () => {
            it('Passed to the component', () => {
                element.collapsedShowMoreButton = 'Show more button';
                element.expandedShowMoreButton = 'Show less button';
                element.maxCount = 99;
                element.items = longItems;

                return Promise.resolve()
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="show-more-button"]'
                        );
                        expect(button.label).toBe('Show more button');
                        button.click();
                    })
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="show-more-button"]'
                        );
                        expect(button.label).toBe('Show less button');
                    });
            });
        });

        describe('size', () => {
            it('small', () => {
                element.size = 'small';
                element.items = itemsWithIcons;

                return Promise.resolve().then(() => {
                    const visualPickers = element.shadowRoot.querySelectorAll(
                        '.slds-visual-picker'
                    );
                    const visualPickerFigures =
                        element.shadowRoot.querySelectorAll(
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

            it('medium', () => {
                element.size = 'medium';
                element.items = itemsWithIcons;

                return Promise.resolve().then(() => {
                    const visualPickers = element.shadowRoot.querySelectorAll(
                        '.slds-visual-picker'
                    );
                    const visualPickerFigures =
                        element.shadowRoot.querySelectorAll(
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

            it('large', () => {
                element.size = 'large';
                element.items = itemsWithIcons;

                return Promise.resolve().then(() => {
                    const visualPickers = element.shadowRoot.querySelectorAll(
                        '.slds-visual-picker'
                    );
                    const visualPickerFigures =
                        element.shadowRoot.querySelectorAll(
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

            it('responsive', () => {
                element.size = 'responsive';
                element.items = itemsWithIcons;

                return Promise.resolve().then(() => {
                    const visualPickers = element.shadowRoot.querySelectorAll(
                        '.slds-visual-picker'
                    );
                    const visualPickerFigures =
                        element.shadowRoot.querySelectorAll(
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
        });

        describe('type', () => {
            it('radio', () => {
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

            it('checkbox', () => {
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
        });

        describe('value', () => {
            it('radio type', () => {
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

            it('checkbox type', () => {
                element.value = [
                    'lightning-professional',
                    'lightning-unlimited'
                ];
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
        });

        // Depends on items
        describe('variant', () => {
            it('non-coverable', () => {
                element.variant = 'non-coverable';
                element.items = itemsWithIcons;
                element.value = 'lightning-professional';

                return Promise.resolve().then(() => {
                    const selected =
                        element.shadowRoot.querySelector('.slds-is-selected');
                    expect(selected).toBeFalsy();
                    const nonCoverableClass =
                        element.shadowRoot.querySelectorAll(
                            '.slds-visual-picker__text'
                        );
                    expect(nonCoverableClass).toHaveLength(4);
                    const coverableClass = element.shadowRoot.querySelectorAll(
                        '.slds-visual-picker__icon'
                    );
                    expect(coverableClass).toHaveLength(0);
                });
            });

            it('coverable', () => {
                element.variant = 'coverable';
                element.items = itemsWithIcons;
                element.value = 'lightning-professional';

                return Promise.resolve().then(() => {
                    const selected =
                        element.shadowRoot.querySelector('.slds-is-selected');
                    expect(selected).toBeTruthy();
                    const nonCoverableClass =
                        element.shadowRoot.querySelectorAll(
                            '.slds-visual-picker__text'
                        );
                    expect(nonCoverableClass).toHaveLength(0);
                    const coverableClass = element.shadowRoot.querySelectorAll(
                        '.slds-visual-picker__icon'
                    );
                    expect(coverableClass).toHaveLength(4);
                });
            });
        });
    });

    /*
     * -------------------------------------------------------------
     *  METHODS
     * -------------------------------------------------------------
     */
    describe('Methods', () => {
        it('Transfer focus and blur', () => {
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

        // Depends on required
        it('reportValidity', () => {
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
        it('showHelpMessageIfInvalid', () => {
            element.required = true;
            element.showHelpMessageIfInvalid();

            return Promise.resolve().then(() => {
                const help = element.shadowRoot.querySelector(
                    '.slds-form-element__help'
                );
                expect(help).toBeTruthy();
            });
        });

        it('checkValidity', () => {
            const spy = jest.spyOn(element, 'checkValidity');

            element.checkValidity();
            expect(spy).toHaveBeenCalled();
        });

        it('setCustomValidity', () => {
            const spy = jest.spyOn(element, 'setCustomValidity');

            element.setCustomValidity('Something');
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('Events', () => {
        describe('blur', () => {
            it('Fired when the focus is removed from the input', () => {
                element.items = itemsWithIcons;

                const handler = jest.fn();
                element.addEventListener('blur', handler);

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="input"]'
                    );
                    input.dispatchEvent(new CustomEvent('blur'));
                    expect(handler).toHaveBeenCalled();
                    const call = handler.mock.calls[0][0];
                    expect(call.bubbles).toBeFalsy();
                    expect(call.composed).toBeFalsy();
                    expect(call.cancelable).toBeFalsy();
                });
            });
        });

        describe('change', () => {
            it('radio type', () => {
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
                    expect(handler.mock.calls[0][0].detail.value).toBe(
                        'lightning-professional'
                    );
                    expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                });
            });

            it('checkbox type', () => {
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
                    expect(handler.mock.calls[1][0].detail.value).toMatchObject(
                        ['lightning-professional', 'lightning-enterprise']
                    );
                    expect(handler.mock.calls[1][0].bubbles).toBeFalsy();
                    expect(handler.mock.calls[1][0].cancelable).toBeFalsy();
                    expect(handler.mock.calls[1][0].composed).toBeFalsy();
                });
            });

            it('radio type and sub items, when selecting item', () => {
                const handler = jest.fn();
                element.addEventListener('change', handler);

                const initialSelectedValues = ['item-1', 'sub-item-1-1'];
                element.value = initialSelectedValues;
                element.items = itemsWithSubItems;
                element.type = 'radio';

                return Promise.resolve().then(() => {
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id="input"]'
                    );
                    inputs[1].click();

                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.value).toMatchObject(
                        ['item-2']
                    );
                    expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                });
            });

            it('radio type and sub items, when selecting sub item', () => {
                const handler = jest.fn();
                element.addEventListener('change', handler);

                const initialSelectedValues = ['item-1'];
                element.value = initialSelectedValues;
                element.items = itemsWithSubItems;
                element.type = 'radio';

                return Promise.resolve().then(() => {
                    const inputChoiceSets = element.shadowRoot.querySelectorAll(
                        '[data-element-id="input-choice-set"]'
                    );
                    inputChoiceSets[0].dispatchEvent(
                        new CustomEvent('change', {
                            detail: {
                                value: 'sub-item-1-1'
                            }
                        })
                    );

                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.value).toMatchObject(
                        [...initialSelectedValues, 'sub-item-1-1']
                    );
                    expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                });
            });

            it('checkbox type and sub items, when selecting item', () => {
                const handler = jest.fn();
                element.addEventListener('change', handler);

                const initialSelectedValues = ['item-1', 'sub-item-1-1'];
                element.value = initialSelectedValues;
                element.items = itemsWithSubItems;
                element.type = 'checkbox';

                return Promise.resolve().then(() => {
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id="input"]'
                    );
                    inputs[1].click();

                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.value).toMatchObject(
                        [...initialSelectedValues, 'item-2']
                    );
                    expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                });
            });

            it('checkbox type and sub items, when selecting sub item', () => {
                const handler = jest.fn();
                element.addEventListener('change', handler);

                const initialSelectedValues = ['item-1', 'sub-item-1-1'];
                element.value = initialSelectedValues;
                element.items = itemsWithSubItems;
                element.type = 'checkbox';

                return Promise.resolve().then(() => {
                    const inputChoiceSets = element.shadowRoot.querySelectorAll(
                        '[data-element-id="input-choice-set"]'
                    );
                    inputChoiceSets[0].dispatchEvent(
                        new CustomEvent('change', {
                            detail: {
                                value: ['sub-item-1-1', 'sub-item-1-2']
                            }
                        })
                    );

                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.value).toMatchObject(
                        [...initialSelectedValues, 'sub-item-1-2']
                    );
                    expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                });
            });
        });

        describe('focus', () => {
            it('Fired when the focus is set on the input', () => {
                element.items = itemsWithIcons;

                const handler = jest.fn();
                element.addEventListener('focus', handler);

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="input"]'
                    );
                    input.focus();
                    expect(handler).toHaveBeenCalled();
                    const call = handler.mock.calls[0][0];
                    expect(call.bubbles).toBeFalsy();
                    expect(call.composed).toBeFalsy();
                    expect(call.cancelable).toBeFalsy();
                });
            });
        });

        describe('itemclick', () => {
            it('radio type', () => {
                const handler = jest.fn();
                element.addEventListener('itemclick', handler);

                element.items = itemsWithIcons;
                element.type = 'radio';

                return Promise.resolve().then(() => {
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id="input"]'
                    );
                    inputs[0].click();

                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.value).toBe(
                        'lightning-professional'
                    );
                    expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                });
            });

            it('checkbox type', () => {
                const handler = jest.fn();
                element.addEventListener('itemclick', handler);

                element.items = itemsWithIcons;
                element.type = 'checkbox';

                return Promise.resolve().then(() => {
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id="input"]'
                    );
                    inputs[0].click();

                    expect(handler).toHaveBeenCalledTimes(1);
                    expect(handler.mock.calls[0][0].detail.value).toBe(
                        'lightning-professional'
                    );
                    expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                });
            });
        });

        describe('itemsvisibilitytoggle', () => {
            it('itemsvisibilitytoggle', () => {
                element.items = longItems;
                element.maxCount = 3;

                const handler = jest.fn();
                element.addEventListener('itemsvisibilitytoggle', handler);

                return Promise.resolve()
                    .then(() => {
                        const inputs = element.shadowRoot.querySelectorAll(
                            '[data-element-id="input"]'
                        );
                        expect(inputs).toHaveLength(3);
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="show-more-button"]'
                        );
                        button.click();
                        expect(handler).toHaveBeenCalled();
                        const call = handler.mock.calls[0][0];
                        expect(call.bubbles).toBeFalsy();
                        expect(call.cancelable).toBeTruthy();
                        expect(call.composed).toBeFalsy();
                        expect(call.detail.show).toBeTruthy();
                    })
                    .then(() => {
                        const inputs = element.shadowRoot.querySelectorAll(
                            '[data-element-id="input"]'
                        );
                        expect(inputs).toHaveLength(longItems.length);
                    });
            });

            it('itemsvisibilitytoggle, cancelled', () => {
                element.items = longItems;
                element.maxCount = 3;

                const handler = jest.fn((event) => {
                    event.preventDefault();
                });
                element.addEventListener('itemsvisibilitytoggle', handler);

                return Promise.resolve()
                    .then(() => {
                        const inputs = element.shadowRoot.querySelectorAll(
                            '[data-element-id="input"]'
                        );
                        expect(inputs).toHaveLength(3);
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="show-more-button"]'
                        );
                        button.click();
                        expect(handler).toHaveBeenCalled();
                    })
                    .then(() => {
                        const inputs = element.shadowRoot.querySelectorAll(
                            '[data-element-id="input"]'
                        );
                        expect(inputs).toHaveLength(3);
                    });
            });
        });

        describe('loadmore', () => {
            it('Load more on first load if there are no items', () => {
                const handler = jest.fn();
                element.addEventListener('loadmore', handler);

                element.enableInfiniteLoading = true;
                expect(handler).toHaveBeenCalled();
                const call = handler.mock.calls[0][0];
                expect(call.bubbles).toBeFalsy();
                expect(call.cancelable).toBeFalsy();
                expect(call.composed).toBeFalsy();
            });

            it('Load more on scroll', () => {
                element.enableInfiniteLoading = true;
                element.loadMoreOffset = 40;
                element.items = longItems;

                const handler = jest.fn();
                element.addEventListener('loadmore', handler);

                return Promise.resolve().then(() => {
                    const itemsWrapper = element.shadowRoot.querySelector(
                        '[data-element-id="div-items-wrapper"]'
                    );
                    jest.spyOn(
                        itemsWrapper,
                        'scrollTop',
                        'get'
                    ).mockReturnValue(20);
                    jest.spyOn(
                        itemsWrapper,
                        'scrollHeight',
                        'get'
                    ).mockReturnValue(150);
                    jest.spyOn(
                        itemsWrapper,
                        'clientHeight',
                        'get'
                    ).mockReturnValue(100);

                    itemsWrapper.dispatchEvent(new CustomEvent('scroll'));
                    expect(handler).toHaveBeenCalled();
                });
            });

            it('Scroll is ignored if enableInfiniteLoading is not true', () => {
                element.loadMoreOffset = 40;
                element.items = longItems;

                const handler = jest.fn();
                element.addEventListener('loadmore', handler);

                return Promise.resolve().then(() => {
                    const itemsWrapper = element.shadowRoot.querySelector(
                        '[data-element-id="div-items-wrapper"]'
                    );
                    jest.spyOn(
                        itemsWrapper,
                        'scrollTop',
                        'get'
                    ).mockReturnValue(20);
                    jest.spyOn(
                        itemsWrapper,
                        'scrollHeight',
                        'get'
                    ).mockReturnValue(150);
                    jest.spyOn(
                        itemsWrapper,
                        'clientHeight',
                        'get'
                    ).mockReturnValue(100);

                    itemsWrapper.dispatchEvent(new CustomEvent('scroll'));
                    expect(handler).not.toHaveBeenCalled();
                });
            });
        });
    });
});
