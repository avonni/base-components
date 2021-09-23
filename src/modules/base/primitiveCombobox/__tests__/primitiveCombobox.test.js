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
import PrimitiveCombobox from 'c/primitiveCombobox';
import Option from '../option';
import Action from '../action';
import { options, actions, topActions, bottomActions, groups } from './data';

// Not tested:
// auto positionning
// setCustomValidity()
// dropdownHeight, because depends on DOM measurements (offsetHeight)
// Event handler triggered by the keyboard
// Anything that depends on getting the <li> elements from the primitive groups via optionElements():
//   * isMultiSelect
//   * option click
//   * option mouse enter
//   * removeSelectedOptions
//   * change event

describe('PrimitiveCombobox', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });

        expect(element.actions).toMatchObject([]);
        expect(element.allowSearch).toBeFalsy();
        expect(element.disabled).toBeFalsy();
        expect(element.dropdownAlignment).toBe('left');
        expect(element.dropdownLength).toBe('7-items');
        expect(element.fieldLevelHelp).toBeUndefined();
        expect(element.groups).toMatchObject([{ name: 'ungrouped' }]);
        expect(element.hideSelectedOptions).toBeFalsy();
        expect(element.isLoading).toBeFalsy();
        expect(element.isMultiSelect).toBeFalsy();
        expect(element.label).toBeUndefined();
        expect(element.loadingStateAlternativeText).toBe('Loading');
        expect(element.messageWhenValueMissing).toBeUndefined();
        expect(element.multiLevelGroups).toBeFalsy();
        expect(element.name).toBeUndefined();
        expect(element.options).toMatchObject([]);
        expect(element.placeholder).toBe('Select an Option');
        expect(element.readOnly).toBeFalsy();
        expect(element.removeSelectedOptions).toBeFalsy();
        expect(element.required).toBeFalsy();
        expect(element.search).toBeInstanceOf(Function);
        expect(element.selectedOptionsAriaLabel).toBe('Selected Options');
        expect(element.showClearInput).toBeFalsy();
        expect(element.validity).toMatchObject({});
        expect(element.value).toMatchObject([]);
        expect(element.variant).toBe('standard');
    });

    /* ----- ATTRIBUTES ----- */

    // actions
    it('actions', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.actions = actions;

        return Promise.resolve().then(() => {
            element.actions.forEach((action) => {
                expect(action).toBeInstanceOf(Action);
            });

            // Top actions
            const topActionElements = element.shadowRoot.querySelectorAll(
                '.combobox__action_top'
            );
            expect(topActionElements).toHaveLength(topActions.length);
            topActionElements.forEach((actionElement, index) => {
                expect(actionElement.dataset.name).toBe(topActions[index].name);
                const label = actionElement.querySelector(
                    '.slds-listbox__option-text'
                );
                expect(label.textContent).toBe(topActions[index].label);

                if (topActions[index].disabled) {
                    expect(actionElement.classList).toContain(
                        'combobox__action_disabled'
                    );
                    expect(actionElement.ariaDisabled).toBe('true');
                } else {
                    expect(actionElement.classList).not.toContain(
                        'combobox__action_disabled'
                    );
                    expect(actionElement.ariaDisabled).toBe('false');
                }

                if (topActions[index].iconName) {
                    const icon = actionElement.querySelector('lightning-icon');
                    expect(icon).toBeTruthy();
                    expect(icon.iconName).toBe(topActions[index].iconName);
                }
            });

            // Bottom actions
            const bottomActionElements = element.shadowRoot.querySelectorAll(
                '.combobox__action_bottom'
            );
            expect(bottomActionElements).toHaveLength(bottomActions.length);
            bottomActionElements.forEach((actionElement, index) => {
                expect(actionElement.dataset.name).toBe(
                    bottomActions[index].name
                );
                const label = actionElement.querySelector(
                    '.slds-listbox__option-text'
                );
                expect(label.textContent).toBe(bottomActions[index].label);

                if (bottomActions[index].disabled) {
                    expect(actionElement.classList).toContain(
                        'combobox__action_disabled'
                    );
                    expect(actionElement.ariaDisabled).toBe('true');
                } else {
                    expect(actionElement.classList).not.toContain(
                        'combobox__action_disabled'
                    );
                    expect(actionElement.ariaDisabled).toBe('false');
                }

                if (bottomActions[index].iconName) {
                    const icon = actionElement.querySelector('[data-element-id="lightning-icon-bottom-action"]');
                    expect(icon).toBeTruthy();
                    expect(icon.iconName).toBe(bottomActions[index].iconName);
                }
            });
        });
    });

    // allow-search
    it('allowSearch = false', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.allowSearch = false;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('[data-element-id="input"]');
            expect(input.readOnly).toBeTruthy();
            const inputIcon = element.shadowRoot.querySelector(
                '.slds-input__icon_right:last-of-type'
            );
            expect(inputIcon.iconName).toBe('utility:down');
        });
    });

    it('allowSearch = true', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.allowSearch = true;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('[data-element-id="input"]');
            expect(input.readOnly).toBeFalsy();
            const inputIcon = element.shadowRoot.querySelector(
                '.slds-input__icon_right:last-of-type'
            );
            expect(inputIcon.iconName).toBe('utility:search');
        });
    });

    // disabled
    // Depends on open() and options
    it('disabled = false', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.disabled = false;
        element.options = options;

        return Promise.resolve()
            .then(() => {
                const input = element.shadowRoot.querySelector('[data-element-id="input"]');
                expect(input.disabled).toBeFalsy();

                element.open();
            })
            .then(() => {
                const dropdownTrigger = element.shadowRoot.querySelector(
                    '.combobox__dropdown-trigger'
                );
                expect(dropdownTrigger.classList).toContain('slds-is-open');
            });
    });

    it('disabled = true', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.disabled = true;
        element.options = options;

        return Promise.resolve()
            .then(() => {
                const input = element.shadowRoot.querySelector('[data-element-id="input"]');
                expect(input.disabled).toBeTruthy();

                element.open();
            })
            .then(() => {
                const dropdownTrigger = element.shadowRoot.querySelector(
                    '.combobox__dropdown-trigger'
                );
                expect(dropdownTrigger.classList).not.toContain('slds-is-open');
            });
    });

    // dropdown-alignment
    it('dropdown-alignment = left', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.dropdownAlignment = 'left';

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector(
                '.combobox__dropdown'
            );
            expect(dropdown.classList).toContain('slds-dropdown_left');
            expect(dropdown.classList).not.toContain('slds-dropdown_center');
            expect(dropdown.classList).not.toContain('slds-dropdown_right');
            expect(dropdown.classList).not.toContain('slds-dropdown_bottom');
            expect(dropdown.classList).not.toContain(
                'slds-dropdown_bottom-right'
            );
            expect(dropdown.classList).not.toContain(
                'slds-dropdown_bottom-left'
            );
        });
    });

    it('dropdown-alignment = auto', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.dropdownAlignment = 'auto';

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector(
                '.combobox__dropdown'
            );
            expect(dropdown.classList).toContain('slds-dropdown_left');
            expect(dropdown.classList).not.toContain('slds-dropdown_center');
            expect(dropdown.classList).not.toContain('slds-dropdown_right');
            expect(dropdown.classList).not.toContain('slds-dropdown_bottom');
            expect(dropdown.classList).not.toContain(
                'slds-dropdown_bottom-right'
            );
            expect(dropdown.classList).not.toContain(
                'slds-dropdown_bottom-left'
            );
        });
    });

    it('dropdown-alignment = center', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.dropdownAlignment = 'center';

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector(
                '.combobox__dropdown'
            );
            expect(dropdown.classList).not.toContain('slds-dropdown_left');
            expect(dropdown.classList).toContain('slds-dropdown_center');
            expect(dropdown.classList).not.toContain('slds-dropdown_right');
            expect(dropdown.classList).not.toContain('slds-dropdown_bottom');
            expect(dropdown.classList).not.toContain(
                'slds-dropdown_bottom-right'
            );
            expect(dropdown.classList).not.toContain(
                'slds-dropdown_bottom-left'
            );
        });
    });

    it('dropdown-alignment = right', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.dropdownAlignment = 'right';

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector(
                '.combobox__dropdown'
            );
            expect(dropdown.classList).not.toContain('slds-dropdown_left');
            expect(dropdown.classList).not.toContain('slds-dropdown_center');
            expect(dropdown.classList).toContain('slds-dropdown_right');
            expect(dropdown.classList).not.toContain('slds-dropdown_bottom');
            expect(dropdown.classList).not.toContain(
                'slds-dropdown_bottom-right'
            );
            expect(dropdown.classList).not.toContain(
                'slds-dropdown_bottom-left'
            );
        });
    });

    it('dropdown-alignment = bottom-center', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.dropdownAlignment = 'bottom-center';

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector(
                '.combobox__dropdown'
            );
            expect(dropdown.classList).not.toContain('slds-dropdown_left');
            expect(dropdown.classList).not.toContain('slds-dropdown_center');
            expect(dropdown.classList).not.toContain('slds-dropdown_right');
            expect(dropdown.classList).toContain('slds-dropdown_bottom');
            expect(dropdown.classList).not.toContain(
                'slds-dropdown_bottom-right'
            );
            expect(dropdown.classList).not.toContain(
                'slds-dropdown_bottom-left'
            );
        });
    });

    it('dropdown-alignment = bottom-right', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.dropdownAlignment = 'bottom-right';

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector(
                '.combobox__dropdown'
            );
            expect(dropdown.classList).not.toContain('slds-dropdown_left');
            expect(dropdown.classList).not.toContain('slds-dropdown_center');
            expect(dropdown.classList).toContain('slds-dropdown_right');
            expect(dropdown.classList).toContain('slds-dropdown_bottom');
            expect(dropdown.classList).toContain('slds-dropdown_bottom-right');
            expect(dropdown.classList).not.toContain(
                'slds-dropdown_bottom-left'
            );
        });
    });

    it('dropdown-alignment = bottom-left', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.dropdownAlignment = 'bottom-left';

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector(
                '.combobox__dropdown'
            );
            expect(dropdown.classList).toContain('slds-dropdown_left');
            expect(dropdown.classList).not.toContain('slds-dropdown_center');
            expect(dropdown.classList).not.toContain('slds-dropdown_right');
            expect(dropdown.classList).toContain('slds-dropdown_bottom');
            expect(dropdown.classList).not.toContain(
                'slds-dropdown_bottom-right'
            );
            expect(dropdown.classList).toContain('slds-dropdown_bottom-left');
        });
    });

    // field-level-help
    it('fieldLevelHelp', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.fieldLevelHelp = 'A string help';

        return Promise.resolve().then(() => {
            const helptext = element.shadowRoot.querySelector(
                '[data-element-id="lightning-helptext"]'
            );
            expect(helptext.content).toBe('A string help');
        });
    });

    // groups
    // Depends on options
    it('groups', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.groups = groups;
        element.options = options;
        const input = element.shadowRoot.querySelector('[data-element-id="input"]');
        input.click();

        return Promise.resolve().then(() => {
            const groupElements = element.shadowRoot.querySelectorAll(
                '[data-element-id^="avonni-primitive-combobox-group"]'
            );
            expect(groupElements).toHaveLength(5);
            groupElements.forEach((group, index) => {
                // Default group
                if (index === 0) {
                    expect(group.name).toBe('ungrouped');
                    expect(group.label).toBeUndefined();
                    expect(group.options).toHaveLength(1);
                    expect(group.groups).toHaveLength(0);
                } else {
                    const groupName = groups[index - 1].name;
                    expect(group.name).toBe(groupName);
                    expect(group.label).toBe(groups[index - 1].label);

                    const groupOptions = options.filter((option) => {
                        return (
                            option.groups && option.groups.includes(groupName)
                        );
                    });
                    expect(group.options).toHaveLength(groupOptions.length);
                    expect(group.groups).toHaveLength(0);
                }
            });
        });
    });

    // hide-selected-options
    // Depends on options, isMultiSelect and value
    it('hideSelectedOptions = false', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        const values = ['oil-sla', 'dickenson'];
        element.options = options;
        element.value = values;
        element.hideSelectedOptions = false;
        element.isMultiSelect = true;

        return Promise.resolve().then(() => {
            const pills = element.shadowRoot.querySelectorAll('[data-element-id="lightning-pill"]');
            expect(pills).toHaveLength(2);

            pills.forEach((pill, index) => {
                const option = options.find(
                    (opt) => opt.value === values[values.length - (1 + index)]
                );
                expect(pill.name).toBe(option.value);
                expect(pill.label).toBe(option.label);
            });
        });
    });

    it('hideSelectedOptions = true', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.options = options;
        element.value = ['oil-sla', 'dickenson'];
        element.hideSelectedOptions = true;
        element.isMultiSelect = true;

        return Promise.resolve().then(() => {
            const pills = element.shadowRoot.querySelectorAll('[data-element-id="lightning-pill"]');
            expect(pills).toHaveLength(0);
        });
    });

    // is-loading
    // Depends on options
    it('isLoading = false', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.options = options;
        element.isLoading = false;

        return Promise.resolve().then(() => {
            const spinner = element.shadowRoot.querySelector(
                '[data-element-id="lightning-spinner"]'
            );
            expect(spinner).toBeFalsy();
        });
    });

    it('isLoading = true', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.options = options;
        element.isLoading = true;

        return Promise.resolve().then(() => {
            const spinner = element.shadowRoot.querySelector(
                '[data-element-id="lightning-spinner"]'
            );
            expect(spinner).toBeTruthy();
        });
    });

    // label
    it('label', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector('[data-element-id="label"]');
            expect(label.textContent).toBe('A string label');
        });
    });

    // loading-state-altermative-text
    // Depends on isLoading
    it('loadingStateAlternativeText', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.loadingStateAlternativeText = 'An alternative help';
        element.isLoading = true;
        const input = element.shadowRoot.querySelector('[data-element-id="input"]');
        input.click();

        return Promise.resolve().then(() => {
            const spinner = element.shadowRoot.querySelector(
                '[data-element-id="lightning-spinner"]'
            );
            expect(spinner.alternativeText).toBe('An alternative help');
        });
    });

    // message-when-value-missing
    // Depends on required and showHelpMessageIfInvalid()
    it('messageWhenValueMissing', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.messageWhenValueMissing = 'Something is wrong';
        element.required = true;
        element.showHelpMessageIfInvalid();

        return Promise.resolve().then(() => {
            const help = element.shadowRoot.querySelector(
                '.slds-form-element__help'
            );
            expect(help.textContent).toBe('Something is wrong');
        });
    });

    // multi-level-groups
    // Depends on options and groups
    it('multiLevelGroups = false', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.groups = groups;
        element.options = options;
        element.multiLevelGroups = false;
        const input = element.shadowRoot.querySelector('[data-element-id="input"]');
        input.click();

        return Promise.resolve().then(() => {
            const groupElements = element.shadowRoot.querySelectorAll(
                '[data-element-id^="avonni-primitive-combobox-group"]'
            );
            expect(groupElements).toHaveLength(5);
        });
    });

    it('multiLevelGroups = true', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.groups = groups;
        element.options = options;
        element.multiLevelGroups = true;
        const input = element.shadowRoot.querySelector('[data-element-id="input"]');
        input.click();

        return Promise.resolve().then(() => {
            const groupElements = element.shadowRoot.querySelectorAll(
                '[data-element-id^="avonni-primitive-combobox-group"]'
            );
            expect(groupElements).toHaveLength(3);
        });
    });

    // name
    it('name', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.name = 'a-string-name';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('[data-element-id="input"]');
            expect(input.name).toBe('a-string-name');
        });
    });

    // options
    it('options', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.options = options;
        const input = element.shadowRoot.querySelector('[data-element-id="input"]');
        input.click();

        return Promise.resolve().then(() => {
            element.options.forEach((option) => {
                expect(option).toBeInstanceOf(Option);
            });
            const group = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-group"]'
            );
            expect(group.options).toMatchObject(options);
        });
    });

    // placeholder
    // Depends on allowSearch
    it('default placeholder, with allowSearch = true', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.allowSearch = true;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('[data-element-id="input"]');
            expect(input.placeholder).toBe('Search...');
        });
    });

    it('placeholder', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.placeholder = 'A custom placeholder';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('[data-element-id="input"]');
            expect(input.placeholder).toBe('A custom placeholder');
        });
    });

    // read-only
    it('readOnly = false', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.readOnly = false;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('[data-element-id="input"]');
            expect(input.disabled).toBeFalsy();
        });
    });

    it('readOnly = true', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.readOnly = true;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('[data-element-id="input"]');
            expect(input.disabled).toBeTruthy();
        });
    });

    // required
    // Depends on label
    it('required = false', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.required = false;
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const abbr = element.shadowRoot.querySelector('[data-element-id="abbr"]');
            expect(abbr).toBeFalsy();
        });
    });

    it('required = true', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.required = true;
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const abbr = element.shadowRoot.querySelector('[data-element-id="abbr"]');
            expect(abbr).toBeTruthy();
        });
    });

    // search
    // Depends on allowSearch
    it('search', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        const mockSearch = jest.fn().mockReturnValue([]);
        element.search = mockSearch;
        element.allowSearch = true;
        const input = element.shadowRoot.querySelector('[data-element-id="input"]');

        return Promise.resolve().then(() => {
            input.value = 'Some search term';
            input.dispatchEvent(new CustomEvent('input'));
            expect(mockSearch).toHaveBeenCalled();
        });
    });

    // selected-options-aria-label
    // Depends on isMultiSelect, value and options
    it('selectedOptionsAriaLabel', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.options = options;
        element.value = [options[1].value, options[0].value];
        element.isMultiSelect = true;
        element.selectedOptionsAriaLabel = 'A string label';

        return Promise.resolve().then(() => {
            const selectedOptions = element.shadowRoot.querySelector(
                '.primitive-combobox__selected-options'
            );
            expect(selectedOptions.ariaLabel).toBe('A string label');
        });
    });

    // showClearInput
    // Depends on allowSearch
    it('showClearInput = false', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.showClearInput = false;
        const input = element.shadowRoot.querySelector('[data-element-id="input"]');

        return Promise.resolve()
            .then(() => {
                input.value = 'Some value';
                input.dispatchEvent(new CustomEvent('[data-element-id="input"]'));
            })
            .then(() => {
                const clearButton = element.shadowRoot.querySelector(
                    'button.slds-input__icon_right'
                );
                expect(clearButton).toBeFalsy();
            });
    });

    it('showClearInput = true', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.showClearInput = true;
        const input = element.shadowRoot.querySelector('[data-element-id="input"]');

        return Promise.resolve()
            .then(() => {
                input.value = 'Some value';
                input.dispatchEvent(new CustomEvent('input'));
            })
            .then(() => {
                const clearButton = element.shadowRoot.querySelector(
                    'button.slds-input__icon_right'
                );
                expect(clearButton).toBeTruthy();
            });
    });

    // validity
    // Depends on required
    it('validity', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.required = true;
        const input = element.shadowRoot.querySelector('[data-element-id="input"]');

        return Promise.resolve().then(() => {
            input.click();
            input.blur();
            input.dispatchEvent(new CustomEvent('input'));
            expect(element.validity.valueMissing).toBeTruthy();
        });
    });

    // value
    // Depends on options and isMultiSelect
    it('value without multiselect', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.options = options;
        element.value = [options[1].value, options[0].value];
        element.isMultiSelect = false;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('[data-element-id="input"]');
            expect(input.value).toBe(options[1].label);

            const pills = element.shadowRoot.querySelectorAll('[data-element-id="lightning-pill"]');
            expect(pills).toHaveLength(0);
        });
    });

    it('value with multiselect', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.options = options;
        element.value = [options[1].value, options[0].value];
        element.isMultiSelect = true;

        return Promise.resolve().then(() => {
            const pills = element.shadowRoot.querySelectorAll('[data-element-id="lightning-pill"]');
            expect(pills).toHaveLength(2);
        });
    });

    // variant
    // Depends on label
    it('variant = standard', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.label = 'Some label';
        element.variant = 'standard';

        return Promise.resolve().then(() => {
            expect(element.classList).not.toContain(
                'slds-form-element_stacked'
            );
            expect(element.classList).not.toContain(
                'slds-form-element_horizontal'
            );

            const label = element.shadowRoot.querySelector(
                '.slds-form-element__label'
            );
            expect(label.classList).not.toContain('slds-assistive-text');
        });
    });

    it('variant = label-hidden', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.label = 'Some label';
        element.variant = 'label-hidden';

        return Promise.resolve().then(() => {
            expect(element.classList).not.toContain(
                'slds-form-element_stacked'
            );
            expect(element.classList).not.toContain(
                'slds-form-element_horizontal'
            );

            const label = element.shadowRoot.querySelector(
                '.slds-form-element__label'
            );
            expect(label.classList).toContain('slds-assistive-text');
        });
    });

    it('variant = label-inline', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.label = 'Some label';
        element.variant = 'label-inline';

        return Promise.resolve().then(() => {
            expect(element.classList).not.toContain(
                'slds-form-element_stacked'
            );
            expect(element.classList).toContain('slds-form-element_horizontal');

            const label = element.shadowRoot.querySelector(
                '.slds-form-element__label'
            );
            expect(label.classList).not.toContain('slds-assistive-text');
        });
    });

    it('variant = label-stacked', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.label = 'Some label';
        element.variant = 'label-stacked';

        return Promise.resolve().then(() => {
            expect(element.classList).toContain('slds-form-element_stacked');
            expect(element.classList).not.toContain(
                'slds-form-element_horizontal'
            );

            const label = element.shadowRoot.querySelector(
                '.slds-form-element__label'
            );
            expect(label.classList).not.toContain('slds-assistive-text');
        });
    });

    /* ----- METHODS ----- */

    // blur
    it('blur method', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        const input = element.shadowRoot.querySelector('[data-element-id="input"]');
        const spy = jest.spyOn(input, 'blur');

        element.blur();
        expect(spy).toHaveBeenCalled();
    });

    // checkValidity
    // Depends on required
    it('checkValidity method, valid', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.required = false;

        return Promise.resolve().then(() => {
            expect(element.checkValidity()).toBeTruthy();
        });
    });

    it('checkValidity method, invalid', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.required = true;

        return Promise.resolve().then(() => {
            expect(element.checkValidity()).toBeFalsy();
        });
    });

    // close
    // Depends on options
    it('close method', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.options = options;
        const input = element.shadowRoot.querySelector('[data-element-id="input"]');
        input.click();

        return Promise.resolve()
            .then(() => {
                const dropdownTrigger = element.shadowRoot.querySelector(
                    '.combobox__dropdown-trigger'
                );
                expect(dropdownTrigger.classList).toContain('slds-is-open');

                element.close();
            })
            .then(() => {
                const dropdownTrigger = element.shadowRoot.querySelector(
                    '.combobox__dropdown-trigger'
                );
                expect(dropdownTrigger.classList).not.toContain('slds-is-open');
            });
    });

    // focus
    it('focus method', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        const input = element.shadowRoot.querySelector('[data-element-id="input"]');
        const spy = jest.spyOn(input, 'focus');

        element.focus();
        expect(spy).toHaveBeenCalled();
    });

    // handleRemoveSelectedOption and change event
    // Depends on value, isMultiSelect and options
    it('handleRemoveSelectedOption method and change event', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.value = [options[0].value, options[1].value];
        element.options = options;
        element.isMultiSelect = true;

        const handler = jest.fn();
        element.addEventListener('change', handler);

        return Promise.resolve()
            .then(() => {
                const pills = element.shadowRoot.querySelectorAll(
                    '[data-element-id="lightning-pill"]'
                );
                expect(pills).toHaveLength(2);

                const event = new CustomEvent('click', {
                    detail: {
                        name: options[0].value
                    }
                });

                element.handleRemoveSelectedOption(event);
                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.value).toMatchObject([
                    options[1].value
                ]);
                expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
                expect(element.value).toMatchObject([options[1].value]);
            })
            .then(() => {
                const pills = element.shadowRoot.querySelectorAll(
                    '[data-element-id="lightning-pill"]'
                );
                expect(pills).toHaveLength(1);
            });
    });

    // open
    // Depends on options
    it('open method', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        element.options = options;
        element.open();

        return Promise.resolve().then(() => {
            const dropdownTrigger = element.shadowRoot.querySelector(
                '.combobox__dropdown-trigger'
            );
            expect(dropdownTrigger.classList).toContain('slds-is-open');
        });
    });

    // reportValidity
    // Depends on required
    it('reportValidity method', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

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
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

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

    // actionclick
    // Depends on actions
    it('actionclick event', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('actionclick', handler);
        element.actions = actions;
        const input = element.shadowRoot.querySelector('[data-element-id="input"]');
        input.click();

        return Promise.resolve().then(() => {
            const action = element.shadowRoot.querySelector(
                `[data-name="${actions[0].name}"]`
            );
            action.click();

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.name).toBe(actions[0].name);
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
        });
    });

    // change
    // Depends on options, showClearInput and value
    it('change event', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('change', handler);
        element.options = options;
        element.value = [options[0].value];
        element.showClearInput = true;

        return Promise.resolve().then(() => {
            const clearButton = element.shadowRoot.querySelector(
                'button.slds-input__icon_right'
            );
            clearButton.click();

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.value).toMatchObject([]);
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
        });
    });

    // open
    // Depends on options
    it('open event', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('open', handler);
        element.options = options;
        const input = element.shadowRoot.querySelector('[data-element-id="input"]');
        input.click();

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
    });

    // search
    // Depends on options and allowSearch
    it('search event', () => {
        const element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('search', handler);
        element.options = options;
        element.allowSearch = true;
        const input = element.shadowRoot.querySelector('[data-element-id="input"]');

        return Promise.resolve().then(() => {
            input.value = 'Some search term';
            input.dispatchEvent(new CustomEvent('input'));
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.value).toBe(
                'Some search term'
            );
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
        });
    });
});
