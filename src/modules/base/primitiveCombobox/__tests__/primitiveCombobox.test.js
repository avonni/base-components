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
import PrimitiveCombobox from '../primitiveCombobox';
import Option from '../option';
import Action from '../action';
import { options, actions, topActions, bottomActions, groups } from './data';
import { deepCopy } from 'c/utilsPrivate';

// Not tested:
// auto positionning
// setCustomValidity()
// dropdownHeight, because depends on DOM measurements (offsetHeight)
// Event handler triggered by the keyboard
// Anything that depends on getting the <li> elements from the primitive groups via optionElements():
//   * backAction
//   * isMultiSelect
//   * option click
//   * option mouse enter
//   * removeSelectedOptions
//   * change event

let element;
describe('PrimitiveCombobox', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);
    });

    it('Default attributes', () => {
        expect(element.actions).toMatchObject([]);
        expect(element.allowSearch).toBeFalsy();
        expect(element.backAction).toEqual({
            iconName: 'utility:chevronleft'
        });
        expect(element.disabled).toBeFalsy();
        expect(element.dropdownAlignment).toBe('left');
        expect(element.dropdownLength).toBe('7-items');
        expect(element.fieldLevelHelp).toBeUndefined();
        expect(element.groups).toMatchObject([{ name: 'ungrouped' }]);
        expect(element.isLoading).toBeFalsy();
        expect(element.isMultiSelect).toBeFalsy();
        expect(element.label).toBeUndefined();
        expect(element.loadingStateAlternativeText).toBe('Loading');
        expect(element.messageWhenBadInput).toBeUndefined();
        expect(element.messageWhenValueMissing).toBeUndefined();
        expect(element.multiLevelGroups).toBeFalsy();
        expect(element.name).toBeUndefined();
        expect(element.options).toMatchObject([]);
        expect(element.placeholder).toBe('Select an Option');
        expect(element.readOnly).toBeFalsy();
        expect(element.removeSelectedOptions).toBeFalsy();
        expect(element.required).toBeFalsy();
        expect(element.search).toBeInstanceOf(Function);
        expect(element.hideClearIcon).toBeFalsy();
        expect(element.validity).toMatchObject({});
        expect(element.value).toMatchObject([]);
        expect(element.variant).toBe('standard');
    });

    /* ----- ATTRIBUTES ----- */

    // actions
    it('actions', () => {
        element.actions = actions;

        return Promise.resolve().then(() => {
            element.actions.forEach((action) => {
                expect(action).toBeInstanceOf(Action);
            });

            // Top actions
            const topActionElements = element.shadowRoot.querySelectorAll(
                '[data-element-id="li-top-action"]'
            );
            expect(topActionElements).toHaveLength(topActions.length);
            topActionElements.forEach((actionElement, index) => {
                expect(actionElement.dataset.name).toBe(topActions[index].name);
                const label = actionElement.querySelector(
                    '[data-element-id="span-top-action-label"]'
                );
                expect(label.textContent).toBe(topActions[index].label);
            });

            // Bottom actions
            const bottomActionElements = element.shadowRoot.querySelectorAll(
                '[data-element-id="li-bottom-action"]'
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
            });
        });
    });

    it('actions, disabled', () => {
        element.actions = actions;

        return Promise.resolve().then(() => {
            // Top actions
            const topActionElements = element.shadowRoot.querySelectorAll(
                '[data-element-id="li-top-action"]'
            );
            expect(topActionElements[2].classList).toContain(
                'avonni-primitive-combobox__action_disabled'
            );
            expect(topActionElements[2].ariaDisabled).toBe('true');
            [0, 1].forEach((index) => {
                const action = topActionElements[index];
                expect(action.classList).not.toContain(
                    'avonni-primitive-combobox__action_disabled'
                );
                expect(action.ariaDisabled).toBe('false');
            });

            // Bottom actions
            const bottomActionElements = element.shadowRoot.querySelectorAll(
                '[data-element-id="li-bottom-action"]'
            );
            expect(bottomActionElements[0].classList).toContain(
                'avonni-primitive-combobox__action_disabled'
            );
            expect(bottomActionElements[0].ariaDisabled).toBe('true');
            [1, 2].forEach((index) => {
                const action = bottomActionElements[index];
                expect(action.classList).not.toContain(
                    'avonni-primitive-combobox__action_disabled'
                );
                expect(action.ariaDisabled).toBe('false');
            });
        });
    });

    it('actions, icons', () => {
        element.actions = actions;

        return Promise.resolve().then(() => {
            // Top actions
            const topActionElements = element.shadowRoot.querySelectorAll(
                '[data-element-id="li-top-action"]'
            );
            [1, 2].forEach((index) => {
                const action = topActionElements[index];
                const icon = action.querySelector(
                    '[data-element-id="lightning-icon-top-action"]'
                );
                expect(icon).toBeTruthy();
                expect(icon.iconName).toBe(topActions[index].iconName);
            });

            // Bottom actions
            const bottomActionElements = element.shadowRoot.querySelectorAll(
                '[data-element-id="li-bottom-action"]'
            );
            const icon = bottomActionElements[1].querySelector(
                '[data-element-id="lightning-icon-bottom-action"]'
            );
            expect(icon).toBeTruthy();
            expect(icon.iconName).toBe(bottomActions[1].iconName);
        });
    });

    it('actions, fixed', () => {
        const fixedActions = deepCopy(actions);
        fixedActions[1].fixed = true;
        fixedActions[2].fixed = true;
        element.actions = fixedActions;

        return Promise.resolve().then(() => {
            // Top actions
            const topActionElements = element.shadowRoot.querySelectorAll(
                '[data-element-id="li-top-action"]'
            );
            // Fixed actions are always first on top
            expect(topActionElements[0].classList).toContain(
                'avonni-primitive-combobox__action_fixed'
            );
            [1, 2].forEach((index) => {
                const action = topActionElements[index];
                expect(action.classList).not.toContain(
                    'avonni-primitive-combobox__action_fixed'
                );
            });

            // Bottom actions
            const bottomActionElements = element.shadowRoot.querySelectorAll(
                '[data-element-id="li-bottom-action"]'
            );
            // Bottom actions are always last on bottom
            expect(bottomActionElements[2].classList).toContain(
                'avonni-primitive-combobox__action_fixed'
            );
            [0, 1].forEach((index) => {
                const action = bottomActionElements[index];
                expect(action.classList).not.toContain(
                    'avonni-primitive-combobox__action_fixed'
                );
            });
        });
    });

    // allow-search
    it('allowSearch = false', () => {
        element.allowSearch = false;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="input"]'
            );
            expect(input.readOnly).toBeTruthy();
            const inputIcon = element.shadowRoot.querySelector(
                '.slds-input__icon_right:last-of-type'
            );
            expect(inputIcon.iconName).toBe('utility:down');
        });
    });

    it('allowSearch = true', () => {
        element.allowSearch = true;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="input"]'
            );
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
        element.disabled = false;
        element.options = options;

        return Promise.resolve()
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="input"]'
                );
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
        element.disabled = true;
        element.options = options;

        return Promise.resolve()
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="input"]'
                );
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
        element.dropdownAlignment = 'left';

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector(
                '[data-element-id="div-dropdown"]'
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
        element.dropdownAlignment = 'auto';

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector(
                '[data-element-id="div-dropdown"]'
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
        element.dropdownAlignment = 'center';

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector(
                '[data-element-id="div-dropdown"]'
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
        element.dropdownAlignment = 'right';

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector(
                '[data-element-id="div-dropdown"]'
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
        element.dropdownAlignment = 'bottom-center';

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector(
                '[data-element-id="div-dropdown"]'
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
        element.dropdownAlignment = 'bottom-right';

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector(
                '[data-element-id="div-dropdown"]'
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
        element.dropdownAlignment = 'bottom-left';

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector(
                '[data-element-id="div-dropdown"]'
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
        element.groups = groups;
        element.options = options;
        const input = element.shadowRoot.querySelector(
            '[data-element-id="input"]'
        );
        input.click();

        return Promise.resolve().then(() => {
            const groupElements = element.shadowRoot.querySelectorAll(
                '[data-element-id^="avonni-primitive-combobox-group"]'
            );
            expect(groupElements).toHaveLength(5);
            expect(groupElements[0].name).toBe('ungrouped');
            expect(groupElements[0].label).toBeUndefined();
            expect(groupElements[0].options).toHaveLength(1);
            expect(groupElements[0].groups).toHaveLength(0);
            const groupArray = Array.from(groupElements);
            // Remove the default group
            groupArray.shift();
            groupArray.forEach((group, index) => {
                const groupName = groups[index].name;
                expect(group.name).toBe(groupName);
                expect(group.label).toBe(groups[index].label);

                const groupOptions = options.filter((option) => {
                    return option.groups && option.groups.includes(groupName);
                });
                expect(group.options).toHaveLength(groupOptions.length);
                expect(group.groups).toHaveLength(0);
            });
        });
    });

    // is-loading
    // Depends on options
    it('isLoading = false', () => {
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
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '[data-element-id="label"]'
            );
            expect(label.textContent).toBe('A string label');
        });
    });

    // loading-state-altermative-text
    // Depends on isLoading
    it('loadingStateAlternativeText', () => {
        element.loadingStateAlternativeText = 'An alternative help';
        element.isLoading = true;
        const input = element.shadowRoot.querySelector(
            '[data-element-id="input"]'
        );
        input.click();

        return Promise.resolve().then(() => {
            const spinner = element.shadowRoot.querySelector(
                '[data-element-id="lightning-spinner"]'
            );
            expect(spinner.alternativeText).toBe('An alternative help');
        });
    });

    // message-when-bad-input
    // Depends on required and showHelpMessageIfInvalid()
    it('messageWhenBadInput', () => {
        element.messageWhenBadInput = 'Something is wrong';
        element.options = options;
        element.value = ['hello'];
        element.showHelpMessageIfInvalid();

        return Promise.resolve().then(() => {
            const help = element.shadowRoot.querySelector(
                '.slds-form-element__help'
            );
            expect(help.textContent).toBe('Something is wrong');
        });
    });

    // message-when-value-missing
    // Depends on required and showHelpMessageIfInvalid()
    it('messageWhenValueMissing', () => {
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
        element.groups = groups;
        element.options = options;
        element.multiLevelGroups = false;
        const input = element.shadowRoot.querySelector(
            '[data-element-id="input"]'
        );
        input.click();

        return Promise.resolve().then(() => {
            const groupElements = element.shadowRoot.querySelectorAll(
                '[data-element-id^="avonni-primitive-combobox-group"]'
            );
            expect(groupElements).toHaveLength(5);
        });
    });

    it('multiLevelGroups = true', () => {
        element.groups = groups;
        element.options = options;
        element.multiLevelGroups = true;
        const input = element.shadowRoot.querySelector(
            '[data-element-id="input"]'
        );
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
        element.name = 'a-string-name';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="input"]'
            );
            expect(input.name).toBe('a-string-name');
        });
    });

    // options
    it('options', () => {
        element.options = options;
        const input = element.shadowRoot.querySelector(
            '[data-element-id="input"]'
        );
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
        element.allowSearch = true;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="input"]'
            );
            expect(input.placeholder).toBe('Search...');
        });
    });

    it('placeholder', () => {
        element.placeholder = 'A custom placeholder';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="input"]'
            );
            expect(input.placeholder).toBe('A custom placeholder');
        });
    });

    // read-only
    it('readOnly = false', () => {
        element.readOnly = false;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input-read-only"]'
            );
            expect(input).toBeFalsy();
        });
    });

    it('readOnly = true', () => {
        element.readOnly = true;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input-read-only"]'
            );
            expect(input).toBeTruthy();
        });
    });

    it('readOnly = true and good value', () => {
        element.readOnly = true;
        element.options = options;
        element.value = 'no-avatar-oil-sla';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input-read-only"]'
            );
            expect(input.value).toBe('United Oil SLA');
        });
    });

    it('readOnly = true and bad value', () => {
        element.readOnly = true;
        element.options = options;
        element.value = 'no-avatarsss-oil-sla';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input-read-only"]'
            );
            expect(input.value).toBe('');
        });
    });

    it('readOnly = true and multiselect', () => {
        element.readOnly = true;
        element.isMultiSelect = true;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input-read-only"]'
            );
            expect(input).toBeFalsy();
        });
    });

    // required
    // Depends on label
    it('required = false', () => {
        element.required = false;
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const abbr = element.shadowRoot.querySelector(
                '[data-element-id="abbr"]'
            );
            expect(abbr).toBeFalsy();
        });
    });

    it('required = true', () => {
        element.required = true;
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const abbr = element.shadowRoot.querySelector(
                '[data-element-id="abbr"]'
            );
            expect(abbr).toBeTruthy();
        });
    });

    // search
    // Depends on allowSearch
    it('search', () => {
        const mockSearch = jest.fn().mockReturnValue([]);
        element.search = mockSearch;
        element.allowSearch = true;
        const input = element.shadowRoot.querySelector(
            '[data-element-id="input"]'
        );

        return Promise.resolve().then(() => {
            input.value = 'Some search term';
            input.dispatchEvent(new CustomEvent('input'));
            expect(mockSearch).toHaveBeenCalled();
        });
    });

    // hideClearIcon
    it('hideClearIcon = true', () => {
        element.hideClearIcon = true;
        const input = element.shadowRoot.querySelector(
            '[data-element-id="input"]'
        );

        return Promise.resolve()
            .then(() => {
                input.value = 'Some value';
                input.dispatchEvent(new CustomEvent('input'));
            })
            .then(() => {
                const clearButton = element.shadowRoot.querySelector(
                    'button.slds-input__icon_right'
                );
                expect(clearButton).toBeFalsy();
            });
    });

    it('hideClearIcon = false', () => {
        element.hideClearIcon = false;
        const input = element.shadowRoot.querySelector(
            '[data-element-id="input"]'
        );

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
        element.required = true;
        const input = element.shadowRoot.querySelector(
            '[data-element-id="input"]'
        );

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
        element.options = options;
        element.value = [options[1].value, options[0].value];
        element.isMultiSelect = false;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="input"]'
            );
            expect(input.value).toBe(options[1].label);
        });
    });

    it('value with multiselect', () => {
        element.options = options;
        element.value = [options[1].value, options[0].value];
        element.isMultiSelect = true;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="input"]'
            );
            expect(input.value).toBe('');
        });
    });

    // variant
    // Depends on label
    it('variant = standard', () => {
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
        const input = element.shadowRoot.querySelector(
            '[data-element-id="input"]'
        );
        const spy = jest.spyOn(input, 'blur');

        element.blur();
        expect(spy).toHaveBeenCalled();
    });

    // checkValidity
    // Depends on required
    it('checkValidity method, valid', () => {
        element.required = false;

        return Promise.resolve().then(() => {
            expect(element.checkValidity()).toBeTruthy();
        });
    });

    it('checkValidity method, invalid', () => {
        element.required = true;

        return Promise.resolve().then(() => {
            expect(element.checkValidity()).toBeFalsy();
        });
    });

    // close
    // Depends on options
    it('close method', () => {
        element.options = options;
        const input = element.shadowRoot.querySelector(
            '[data-element-id="input"]'
        );
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
        const input = element.shadowRoot.querySelector(
            '[data-element-id="input"]'
        );
        const spy = jest.spyOn(input, 'focus');

        element.focus();
        expect(spy).toHaveBeenCalled();
    });

    // removeSelectedOption and change event
    // Depends on value, isMultiSelect and options
    it('removeSelectedOption method and change event', () => {
        element.value = ['no-avatar-oil-sla', 'dickenson'];
        element.options = options;
        element.isMultiSelect = true;

        const handler = jest.fn();
        element.addEventListener('change', handler);

        return Promise.resolve().then(() => {
            element.removeSelectedOption('no-avatar-oil-sla');
            expect(handler).toHaveBeenCalled();
            const detail = handler.mock.calls[0][0].detail;
            expect(detail.value).toEqual(['dickenson']);
            expect(detail.action).toBe('unselect');
            expect(detail.levelPath).toEqual([3, 1]);
            expect(element.value).toMatchObject(['dickenson']);
        });
    });

    // open
    // Depends on options
    it('open method', () => {
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

    // actionclick
    // Depends on actions
    it('actionclick event', () => {
        const handler = jest.fn();
        element.addEventListener('actionclick', handler);
        element.actions = actions;
        const input = element.shadowRoot.querySelector(
            '[data-element-id="input"]'
        );
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
    it('change event, triggered by clear button', () => {
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
            expect(handler.mock.calls[0][0].detail.action).toBe('unselect');
            expect(handler.mock.calls[0][0].detail.levelPath).toEqual([0]);
            expect(handler.mock.calls[0][0].detail.value).toEqual([]);
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
        });
    });

    // open
    // Depends on options
    it('open event', () => {
        const handler = jest.fn();
        element.addEventListener('open', handler);
        element.options = options;
        const input = element.shadowRoot.querySelector(
            '[data-element-id="input"]'
        );
        input.click();

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
    });

    // search
    // Depends on options and allowSearch
    it('search event', () => {
        const handler = jest.fn();
        element.addEventListener('search', handler);
        element.options = options;
        element.allowSearch = true;
        const input = element.shadowRoot.querySelector(
            '[data-element-id="input"]'
        );

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
