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
import { Options, OptionsWithGroups } from '../__docs__/data';
import DualListbox from 'c/dualListbox';

// Not tested
// maxVisibleOptions, because depends on DOM measurements (offsetHeight)

let element = null;
describe('DualListbox', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);
    });

    it('Dual Listbox: Default attributes', () => {
        expect(element.addButtonIconName).toBe('utility:right');
        expect(element.addButtonLabel).toBeUndefined();
        expect(element.hideBottomDivider).toBeFalsy();
        expect(element.buttonSize).toBe('medium');
        expect(element.buttonVariant).toBe('border');
        expect(element.disableReordering).toBeFalsy();
        expect(element.disabled).toBeFalsy();
        expect(element.downButtonIconName).toBe('utility:down');
        expect(element.downButtonLabel).toBeUndefined();
        expect(element.draggable).toBeFalsy();
        expect(element.fieldLevelHelp).toBeUndefined();
        expect(element.isLoading).toBeFalsy();
        expect(element.label).toBeUndefined();
        expect(element.max).toBeUndefined();
        expect(element.min).toBe(0);
        expect(element.messageWhenRangerOverflow).toBeUndefined();
        expect(element.messageWhenRangerUnderflow).toBeUndefined();
        expect(element.messageWhenValueIsMissing).toBeUndefined();
        expect(element.name).toBeUndefined();
        expect(element.options).toMatchObject([]);
        expect(element.required).toBeFalsy();
        expect(element.requiredOptions).toMatchObject([]);
        expect(element.allowSearch).toBeFalsy();
        expect(element.selectedLabel).toBeUndefined();
        expect(element.selectedPlaceholder).toBeUndefined();
        expect(element.maxVisibleOptions).toBe(5);
        expect(element.sourceLabel).toBeUndefined();
        expect(element.upButtonIconName).toBe('utility:up');
        expect(element.upButtonLabel).toBeUndefined();
        expect(element.validity).toBeUndefined();
        expect(element.value).toMatchObject([]);
        expect(element.variant).toBe('standard');
        expect(element.size).toBe('medium');
    });

    /* ----- ATTRIBUTES ----- */

    // add-button-icon-name & add-button-label
    it('Dual Listbox: add button icon name and label', () => {
        element.addButtonIconName = 'utility:add';
        element.addButtonLabel = 'add';

        return Promise.resolve().then(() => {
            const lightningButtonIcon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon-add"]'
            );
            expect(lightningButtonIcon.iconName).toBe('utility:add');
            expect(lightningButtonIcon.title).toBe('add');
        });
    });

    // hide bottom divider
    it('Dual Listbox: hide bottom divider', () => {
        element.options = Options;

        element.hideBottomDivider = true;

        return Promise.resolve().then(() => {
            const li = element.shadowRoot.querySelectorAll(
                '.slds-listbox__item'
            );
            li.forEach((item) => {
                expect(item.className).not.toContain(
                    'avonni-dual-listbox__option_border-bottom'
                );
            });
        });
    });

    // button-size
    it('Dual Listbox: button size xx-small', () => {
        element.buttonSize = 'xx-small';

        return Promise.resolve().then(() => {
            expect(element.buttonSize).toBe('xx-small');
            const lightningButtonIcon = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-button-icon"]'
            );

            lightningButtonIcon.forEach((button) => {
                expect(button.size).toBe('xx-small');
            });
        });
    });

    it('Dual Listbox: button size x-small', () => {
        element.buttonSize = 'x-small';

        return Promise.resolve().then(() => {
            const lightningButtonIcon = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-button-icon"]'
            );

            lightningButtonIcon.forEach((button) => {
                expect(button.size).toBe('x-small');
            });
        });
    });

    it('Dual Listbox: button size small', () => {
        element.buttonSize = 'small';

        return Promise.resolve().then(() => {
            const lightningButtonIcon = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-button-icon"]'
            );

            lightningButtonIcon.forEach((button) => {
                expect(button.size).toBe('small');
            });
        });
    });

    it('Dual Listbox: button size medium', () => {
        element.buttonSize = 'medium';

        return Promise.resolve().then(() => {
            const lightningButtonIcon = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-button-icon"]'
            );

            lightningButtonIcon.forEach((button) => {
                expect(button.size).toBe('medium');
            });
        });
    });

    it('Dual Listbox: button size large', () => {
        element.buttonSize = 'large';

        return Promise.resolve().then(() => {
            const lightningButtonIcon = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-button-icon"]'
            );

            lightningButtonIcon.forEach((button) => {
                expect(button.size).toBe('large');
            });
        });
    });

    // button-variant
    it('Dual Listbox: button variant bare', () => {
        element.buttonVariant = 'bare';

        return Promise.resolve().then(() => {
            const lightningButtonIcon = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-button-icon"]'
            );

            lightningButtonIcon.forEach((button) => {
                expect(button.variant).toBe('bare');
            });
        });
    });

    it('Dual Listbox: button variant container', () => {
        element.buttonVariant = 'container';

        return Promise.resolve().then(() => {
            const lightningButtonIcon = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-button-icon"]'
            );

            lightningButtonIcon.forEach((button) => {
                expect(button.variant).toBe('container');
            });
        });
    });

    it('Dual Listbox: button variant brand', () => {
        element.buttonVariant = 'brand';

        return Promise.resolve().then(() => {
            const lightningButtonIcon = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-button-icon"]'
            );

            lightningButtonIcon.forEach((button) => {
                expect(button.variant).toBe('brand');
            });
        });
    });

    it('Dual Listbox: button variant border-filled', () => {
        element.buttonVariant = 'border-filled';

        return Promise.resolve().then(() => {
            const lightningButtonIcon = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-button-icon"]'
            );

            lightningButtonIcon.forEach((button) => {
                expect(button.variant).toBe('border-filled');
            });
        });
    });

    it('Dual Listbox: button variant bare-inverse', () => {
        element.buttonVariant = 'bare-inverse';

        return Promise.resolve().then(() => {
            const lightningButtonIcon = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-button-icon"]'
            );

            lightningButtonIcon.forEach((button) => {
                expect(button.variant).toBe('bare-inverse');
            });
        });
    });

    it('Dual Listbox: button variant border-inverse', () => {
        element.buttonVariant = 'border-inverse';

        return Promise.resolve().then(() => {
            const lightningButtonIcon = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-button-icon"]'
            );

            lightningButtonIcon.forEach((button) => {
                expect(button.variant).toBe('border-inverse');
            });
        });
    });

    // disable-reordering
    it('Dual Listbox: disable reordering', () => {
        element.disableReordering = true;
        element.addButtonLabel = 'add';
        element.removeButtonLabel = 'remove';

        return Promise.resolve().then(() => {
            const lightningButtonIcon = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-button-icon"]'
            );

            expect(lightningButtonIcon.length).toBe(2);
            expect(lightningButtonIcon[0].title).toBe('add');
            expect(lightningButtonIcon[1].title).toBe('remove');
        });
    });

    // disabled
    it('Dual Listbox: disabled', () => {
        element.disabled = true;
        element.addButtonLabel = 'add';
        element.downButtonLabel = 'down';
        element.removeButtonLabel = 'remove';
        element.upButtonLabel = 'up';

        return Promise.resolve()
            .then(() => {
                const columns = element.shadowRoot.querySelectorAll(
                    '.slds-dueling-list__options'
                );

                columns.forEach((column) => {
                    expect(column.classList).toContain('slds-is-disabled');
                });
            })
            .then(() => {
                const buttons = element.shadowRoot.querySelectorAll(
                    '[data-element-id^="lightning-button-icon"]'
                );

                buttons.forEach((button) => {
                    expect(button.disabled).toBeTruthy();
                });
            });
    });

    // down-button-icon-name & down-button-label
    it('Dual Listbox: down button icon name and label', () => {
        element.downButtonIconName = 'utility:apex';
        element.downButtonLabel = 'down';

        return Promise.resolve().then(() => {
            const lightningButtonIcon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon-down"]'
            );
            expect(lightningButtonIcon.iconName).toBe('utility:apex');
            expect(lightningButtonIcon.title).toBe('down');
        });
    });

    // draggagble
    it('Dual Listbox: draggable without disabled', () => {
        element.options = Options;
        element.draggable = true;

        return Promise.resolve().then(() => {
            const optionsDraggable = element.shadowRoot.querySelectorAll(
                '.slds-listbox__option'
            );
            optionsDraggable.forEach((option) => {
                expect(option.draggable).toBeTruthy();
            });
        });
    });

    it('Dual Listbox: draggable with disabled', () => {
        element.options = Options;
        element.draggable = true;
        element.disabled = true;

        return Promise.resolve().then(() => {
            const optionsDraggable = element.shadowRoot.querySelectorAll(
                '.slds-listbox__option'
            );
            optionsDraggable.forEach((option) => {
                expect(option.draggable).toBeFalsy();
            });
        });
    });

    // field-level-help
    it('Dual Listbox: field level help', () => {
        element.fieldLevelHelp = 'A string help';

        return Promise.resolve().then(() => {
            const help = element.shadowRoot.querySelector(
                '[data-element-id="lightning-helptext"]'
            );
            expect(help).toBeTruthy();
        });
    });

    // isLoading
    it('Dual Listbox: is loading', () => {
        element.isLoading = true;

        return Promise.resolve().then(() => {
            const spinner = element.shadowRoot.querySelector(
                '[data-element-id="lightning-spinner"]'
            );
            expect(spinner).toBeTruthy();
        });
    });

    // label
    it('Dual Listbox: label', () => {
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.slds-form-element__label'
            );
            expect(label.textContent).toBe('A string label');
        });
    });

    // message-when-range-overflow and max
    it('Dual Listbox: message when range overflow', () => {
        element.max = 2;
        element.messageWhenRangeOverflow = 'Maximum Capacity!';
        element.options = Options;
        element.value = ['1', '2', '3'];
        element.addButtonLabel = 'add';

        return Promise.resolve()
            .then(() => {
                const lightningButtonIcon = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-add"]'
                );
                element.focus();
                lightningButtonIcon.click();
                element.blur();
            })
            .then(() => {
                const div = element.shadowRoot.querySelector(
                    '[data-element-id="div-alert"]'
                );
                const message = element.shadowRoot.querySelector(
                    '.slds-has-error.slds-form-element__help'
                );
                expect(message.textContent).toBe('Maximum Capacity!');
                expect(div).toBeTruthy();
            });
    });

    // message-when-range-underflow and min
    it('Dual Listbox: message when range underflow', () => {
        element.messageWhenRangeUnderflow = 'Minimum Capacity!';
        element.min = 5;
        element.options = Options;
        element.value = ['1', '2', '3', '4', '5'];
        element.removeButtonLabel = 'remove';

        return Promise.resolve()
            .then(() => {
                const opt = element.shadowRoot.querySelector(
                    "div[data-value='1']"
                );
                opt.click();
                const lightningButtonIcon = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-remove"]'
                );
                lightningButtonIcon.click();
                element.blur();
            })
            .then(() => {
                element.value = [];
                const message = element.shadowRoot.querySelector(
                    '.slds-has-error.slds-form-element__help'
                );
                expect(message.textContent).toBe('Minimum Capacity!');
            });
    });

    // message-when-value-missing
    it('Dual Listbox: message when value is missing', () => {
        element.required = true;
        element.options = Options;
        element.messageWhenValueMissing = 'Missing value!';
        element.value = ['1'];
        element.removeButtonLabel = 'remove';

        return Promise.resolve()
            .then(() => {
                const opt = element.shadowRoot.querySelector(
                    "div[data-value='1']"
                );
                opt.click();
                const lightningButtonIcon = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-remove"]'
                );
                lightningButtonIcon.click();
                element.blur();
            })
            .then(() => {
                element.value = [];
                const message = element.shadowRoot.querySelector(
                    '.slds-has-error.slds-form-element__help'
                );
                expect(message.textContent).toBe('Missing value!');
            });
    });

    // options
    it('Dual Listbox: options with avatar', () => {
        const optionWithAvatar = [
            {
                value: '1',
                label: 'Option 1',
                iconName: 'standard:address'
            }
        ];

        element.options = optionWithAvatar;

        return Promise.resolve()
            .then(() => {
                const optionValue = element.shadowRoot.querySelector(
                    "div[data-value='1']"
                );
                expect(optionValue).toBeTruthy();
            })
            .then(() => {
                const label =
                    element.shadowRoot.querySelector('.slds-media__body');
                expect(label.textContent).toBe('Option 1');
            });
    });

    it('Dual Listbox: options without avatar', () => {
        const optionWithoutAvatar = [
            {
                value: '1',
                label: 'Option 1'
            },
            {
                value: '2',
                label: 'Option 2'
            }
        ];

        element.options = optionWithoutAvatar;

        return Promise.resolve()
            .then(() => {
                const optionValue = element.shadowRoot.querySelector(
                    "div[data-value='1']"
                );
                expect(optionValue).toBeTruthy();
            })
            .then(() => {
                const label =
                    element.shadowRoot.querySelector('.slds-media__body');
                expect(label.textContent).toBe('Option 1');
            });
    });

    it('Dual Listbox: options with groupName', () => {
        const optionWithGroupName = [
            {
                value: '1',
                label: 'Option 1',
                groupName: 'Odd'
            },
            {
                value: '2',
                label: 'Option 2',
                groupName: 'Even'
            }
        ];

        element.options = optionWithGroupName;

        return Promise.resolve().then(() => {
            const optionValue = element.shadowRoot.querySelectorAll(
                '.slds-listbox__option-header'
            );
            expect(optionValue[0].textContent).toBe('Odd');
            expect(optionValue[1].textContent).toBe('Even');
        });
    });

    // remove-button-icon-name & remove-button-label
    it('Dual Listbox: remove button icon name and label', () => {
        element.removeButtonIconName = 'utility:apex';
        element.removeButtonLabel = 'remove';

        return Promise.resolve().then(() => {
            const lightningButtonIcon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon-remove"]'
            );
            expect(lightningButtonIcon.iconName).toBe('utility:apex');
            expect(lightningButtonIcon.title).toBe('remove');
        });
    });

    // required
    it('Dual Listbox: required', () => {
        element.required = true;
        element.options = Options;

        return Promise.resolve().then(() => {
            const asterisk = element.shadowRoot.querySelector('.slds-required');
            expect(asterisk).toBeTruthy();
        });
    });

    // required options
    it('Dual Listbox: required options', () => {
        element.options = Options;

        return Promise.resolve()
            .then(() => {
                element.requiredOptions = ['1'];
            })
            .then(() => {
                const selected = element.shadowRoot.querySelector(
                    '[data-element-id="ul-selected-list"]'
                );
                expect(selected.querySelectorAll('li')).toHaveLength(1);
            });
    });

    // allow search
    it('Dual Listbox: allow search', () => {
        element.allowSearch = true;
        element.options = Options;

        return Promise.resolve().then(() => {
            const searchBox = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input"]'
            );
            expect(searchBox).toBeTruthy();
            expect(searchBox.type).toBe('search');
        });
    });

    // selected label and source label
    it('Dual Listbox: selected label & source label', () => {
        element.sourceLabel = 'A string source label';
        element.selectedLabel = 'A string selected label';

        return Promise.resolve().then(() => {
            const Labels = element.shadowRoot.querySelectorAll(
                'span.slds-form-element__label'
            );
            expect(Labels[0].textContent).toBe('A string source label');
            expect(Labels[1].textContent).toBe('A string selected label');
        });
    });

    // selected placeholder
    it('Dual Listbox: selected placeholder', () => {
        element.value = [];
        element.selectedPlaceholder = 'A string selected placeholder';

        return Promise.resolve().then(() => {
            const placeHolder = element.shadowRoot.querySelector(
                '[data-element-id="span-selected-placeholder"]'
            );
            expect(placeHolder.textContent).toBe(
                'A string selected placeholder'
            );
        });
    });

    // up-button-icon-name & up-button-label
    it('Dual Listbox: up button icon name and label', () => {
        element.upButtonIconName = 'utility:apex';
        element.upButtonLabel = 'up';

        return Promise.resolve().then(() => {
            const lightningButtonIcon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon-up"]'
            );
            expect(lightningButtonIcon.iconName).toBe('utility:apex');
            expect(lightningButtonIcon.title).toBe('up');
        });
    });

    // value
    it('Dual Listbox: value', () => {
        element.options = Options;
        element.value = ['1', '2', '3'];

        return Promise.resolve().then(() => {
            const source = element.shadowRoot.querySelector(
                '[data-element-id="ul-source-list"]'
            );
            const selected = element.shadowRoot.querySelector(
                '[data-element-id="ul-selected-list"]'
            );
            expect(
                source.querySelectorAll('[data-element-id="li-source"]')
            ).toHaveLength(7);
            expect(
                selected.querySelectorAll('[data-element-id="li-selected"]')
            ).toHaveLength(3);
        });
    });

    // variants
    it('Dual Listbox: variant label hidden', () => {
        element.label = 'This is a label-hidden';
        element.variant = 'label-hidden';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.slds-assistive-text'
            );
            expect(label.textContent).toBe('This is a label-hidden');
        });
    });

    it('Dual Listbox: variant label stacked', () => {
        element.variant = 'label-stacked';

        return Promise.resolve().then(() => {
            const div = element.shadowRoot.querySelector(
                '.slds-form-element_stacked'
            );
            expect(div).toBeTruthy();
        });
    });

    // size
    it('Dual Listbox: size small', () => {
        element.size = 'small';

        return Promise.resolve().then(() => {
            const columns = element.shadowRoot.querySelectorAll(
                '.avonni-dual-listbox__list-column'
            );
            const boxes = element.shadowRoot.querySelectorAll(
                '.slds-dueling-list__options'
            );

            const sourceListColumn = columns[0];
            const selectedListColumn = columns[2];
            expect(sourceListColumn.className).toBe(
                'avonni-dual-listbox__list-column avonni-dual-listbox__list-column_responsive_small'
            );
            expect(selectedListColumn.className).toBe(
                'avonni-dual-listbox__list-column avonni-dual-listbox__list-column_responsive_small'
            );
            boxes.forEach((box) => {
                expect(box.className).toContain(
                    'avonni-dual-listbox__box_size-small'
                );
                expect(box.className).not.toContain(
                    'avonni-dual-listbox__box_size-medium'
                );
                expect(box.className).not.toContain(
                    'avonni-dual-listbox__box_size-large'
                );
            });
        });
    });

    it('Dual Listbox: size medium', () => {
        element.size = 'medium';

        return Promise.resolve().then(() => {
            const columns = element.shadowRoot.querySelectorAll(
                '.avonni-dual-listbox__list-column'
            );
            const boxes = element.shadowRoot.querySelectorAll(
                '.slds-dueling-list__options'
            );

            const sourceListColumn = columns[0];
            const selectedListColumn = columns[2];
            expect(sourceListColumn.className).toBe(
                'avonni-dual-listbox__list-column avonni-dual-listbox__list-column_responsive_medium'
            );
            expect(selectedListColumn.className).toBe(
                'avonni-dual-listbox__list-column avonni-dual-listbox__list-column_responsive_medium'
            );
            boxes.forEach((box) => {
                expect(box.className).not.toContain(
                    'avonni-dual-listbox__box_size-small'
                );
                expect(box.className).toContain(
                    'avonni-dual-listbox__box_size-medium'
                );
                expect(box.className).not.toContain(
                    'avonni-dual-listbox__box_size-large'
                );
            });
        });
    });

    it('Dual Listbox: size large', () => {
        element.size = 'large';

        return Promise.resolve().then(() => {
            const columns = element.shadowRoot.querySelectorAll(
                '.avonni-dual-listbox__list-column'
            );
            const boxes = element.shadowRoot.querySelectorAll(
                '.slds-dueling-list__options'
            );

            const sourceListColumn = columns[0];
            const selectedListColumn = columns[2];
            expect(sourceListColumn.className).toBe(
                'avonni-dual-listbox__list-column avonni-dual-listbox__list-column_responsive_large'
            );
            expect(selectedListColumn.className).toBe(
                'avonni-dual-listbox__list-column avonni-dual-listbox__list-column_responsive_large'
            );
            boxes.forEach((box) => {
                expect(box.className).not.toContain(
                    'avonni-dual-listbox__box_size-small'
                );
                expect(box.className).not.toContain(
                    'avonni-dual-listbox__box_size-medium'
                );
                expect(box.className).toContain(
                    'avonni-dual-listbox__box_size-large'
                );
            });
        });
    });

    /* ----- JS ----- */

    // testing selection
    it('Dual Listbox: selection', () => {
        element.options = Options;

        return Promise.resolve().then(() => {
            const option = element.shadowRoot.querySelectorAll(
                '.slds-listbox__option'
            );
            const firstOption = option[0];
            firstOption.click();
            const secondOption = option[1];
            expect(firstOption.tabIndex).toBe(0);
            expect(firstOption.getAttribute('data-type')).toContain('source');
            expect(secondOption.tabIndex).toBe(-1);
        });
    });

    // data-index
    it('Dual Listbox: data-index sourceBox', () => {
        element.options = OptionsWithGroups;

        return Promise.resolve().then(() => {
            const sourceBox = element.shadowRoot.querySelector(
                '[data-element-id="ul-source-list"]'
            );
            const option = sourceBox.querySelectorAll('.slds-listbox__option');
            const firstOption = option[0];
            expect(firstOption.getAttribute('data-index')).toBe('0');
            const secondOption = option[1];
            expect(secondOption.getAttribute('data-index')).toBe('1');
        });
    });

    it('Dual Listbox: data-index selectedBox', () => {
        element.options = OptionsWithGroups;
        element.value = ['1', '2'];

        return Promise.resolve().then(() => {
            const selectedBox = element.shadowRoot.querySelector(
                '[data-element-id="ul-selected-list"]'
            );
            const option = selectedBox.querySelectorAll(
                '.slds-listbox__option'
            );
            const firstOption = option[0];
            expect(firstOption.getAttribute('data-index')).toBe('0');
            const secondOption = option[1];
            expect(secondOption.getAttribute('data-index')).toBe('1');
        });
    });

    /* ----- EVENTS ----- */

    // change
    it('change event add', () => {
        element.options = Options;
        element.value = ['1', '2'];
        element.addButtonLabel = 'add';

        const handler = jest.fn();
        element.addEventListener('change', handler);

        return Promise.resolve().then(() => {
            const option = element.shadowRoot.querySelector(
                '.slds-listbox__option'
            );
            option.click();
            const lightningButtonIcon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon-add"]'
            );
            lightningButtonIcon.click();
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.value).toMatchObject([
                '1',
                '2',
                '3'
            ]);
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].composed).toBeTruthy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });

    it('change event remove', () => {
        element.options = Options;
        element.value = ['1', '2'];
        element.removeButtonLabel = 'remove';

        const handler = jest.fn();
        element.addEventListener('change', handler);

        return Promise.resolve().then(() => {
            const selectedBox = element.shadowRoot.querySelector(
                '[data-element-id="ul-selected-list"]'
            );
            const options = selectedBox.querySelectorAll(
                '.slds-listbox__option'
            );
            const lightningButtonIcon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon-remove"]'
            );
            options[1].click();
            lightningButtonIcon.click();
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.value).toMatchObject(['1']);
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].composed).toBeTruthy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });

    it('change event down', () => {
        element.options = Options;
        element.value = ['1', '2', '3'];
        element.downButtonLabel = 'down';

        const handler = jest.fn();
        element.addEventListener('change', handler);

        return Promise.resolve().then(() => {
            const selectedBox = element.shadowRoot.querySelector(
                '[data-element-id="ul-selected-list"]'
            );
            const options = selectedBox.querySelectorAll(
                '.slds-listbox__option'
            );
            const lightningButtonIcon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon-down"]'
            );
            options[1].click();
            lightningButtonIcon.click();
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.value).toMatchObject([
                '1',
                '3',
                '2'
            ]);
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].composed).toBeTruthy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });

    it('change event up', () => {
        element.options = Options;
        element.value = ['1', '2', '3'];
        element.upButtonLabel = 'up';

        const handler = jest.fn();
        element.addEventListener('change', handler);

        return Promise.resolve().then(() => {
            const selectedBox = element.shadowRoot.querySelector(
                '[data-element-id="ul-selected-list"]'
            );
            const options = selectedBox.querySelectorAll(
                '.slds-listbox__option'
            );
            const lightningButtonIcon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon-up"]'
            );
            options[1].click();
            lightningButtonIcon.click();
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.value).toMatchObject([
                '2',
                '1',
                '3'
            ]);
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].composed).toBeTruthy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });

    // blur
    it('blur event', () => {
        const handler = jest.fn();
        element.addEventListener('blur', handler);

        element.dispatchEvent(new CustomEvent('blur'));

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
    });

    // focus
    it('focus event', () => {
        const handler = jest.fn();
        element.addEventListener('focus', handler);
        element.dispatchEvent(new CustomEvent('focus'));

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
    });

    // optionclick
    it('optionclick event', () => {
        const handler = jest.fn();
        element.addEventListener('optionclick', handler);
        element.options = Options;
        element.value = [Options[0].value, Options[1].value];

        return Promise.resolve().then(() => {
            const options = element.shadowRoot.querySelectorAll(
                '[data-element-id="div-source"]'
            );
            const selectedOptions = element.shadowRoot.querySelectorAll(
                '[data-element-id="div-selected"]'
            );
            options[2].dispatchEvent(new CustomEvent('mouseup'));
            selectedOptions[1].dispatchEvent(new CustomEvent('mouseup'));

            expect(handler).toHaveBeenCalledTimes(2);
            expect(handler.mock.calls[0][0].detail.value).toBe('5');
            expect(handler.mock.calls[1][0].detail.value).toBe('2');
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });

    it('optionclick event using the keyboard', () => {
        const handler = jest.fn();
        element.addEventListener('optionclick', handler);
        element.options = Options;

        return Promise.resolve().then(() => {
            const options = element.shadowRoot.querySelectorAll(
                '[data-element-id="div-source"]'
            );

            const event = new CustomEvent('keydown');
            event.key = ' ';
            event.keyCode = 32;
            options[1].dispatchEvent(event);

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.value).toBe('2');
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });
});
