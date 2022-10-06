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
import Combobox from 'c/combobox';
import { options, actions, scopes, scopesGroups, groups } from './data';

let element;
describe('Combobox', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-combobox', {
            is: Combobox
        });
        document.body.appendChild(element);
    });

    it('Combobox: Default attributes', () => {
        element = createElement('base-combobox', {
            is: Combobox
        });
        expect(element.actions).toMatchObject([]);
        expect(element.allowSearch).toBeFalsy();
        expect(element.backAction).toEqual({
            iconName: 'utility:chevronleft'
        });
        expect(element.disabled).toBeFalsy();
        expect(element.dropdownAlignment).toBe('left');
        expect(element.dropdownLength).toBe('7-items');
        expect(element.fieldLevelLevel).toBeUndefined();
        expect(element.groups).toMatchObject([]);
        expect(element.hideClearIcon).toBeFalsy();
        expect(element.hideSelectedOptions).toBeFalsy();
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
        expect(element.selectedOptionsAriaLabel).toBe('Selected Options');
        expect(element.selectedOptionsDirection).toBe('horizontal');
        expect(element.sortableSelectedOptions).toBeFalsy();
        expect(element.sortableSelectedOptionsIconName).toBeUndefined();
        expect(element.scopes).toMatchObject([]);
        expect(element.scopesGroups).toMatchObject([]);
        expect(element.search).toBeUndefined();
        expect(element.validity).toBeFalsy();
        expect(element.value).toMatchObject([]);
        expect(element.variant).toBe('standard');
    });

    /* ----- ATTRIBUTES ----- */

    // actions
    it('Combobox: actions', () => {
        element.actions = actions;

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            expect(combobox.actions).toMatchObject(actions);
        });
    });

    // allow-search
    it('Combobox: allowSearch', () => {
        element.allowSearch = true;

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            expect(combobox.allowSearch).toBeTruthy();
        });
    });

    // back-action
    it('Combobox: backAction', () => {
        const action = {
            label: 'Back',
            iconName: 'utility:add',
            fixed: true
        };
        element.backAction = action;

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            expect(combobox.backAction).toEqual(action);
        });
    });

    // disabled
    // Depends on scopes
    it('Combobox: disabled', () => {
        element.disabled = true;
        element.scopes = scopes;

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            expect(combobox.disabled).toBeTruthy();

            const scopesCombobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-scopes"]'
            );
            expect(scopesCombobox.disabled).toBeTruthy();
        });
    });

    // dropdown-alignment
    // Depends on scopes
    it('Combobox: dropdownAlignment', () => {
        element.dropdownAlignment = 'right';
        element.scopes = scopes;

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            expect(combobox.dropdownAlignment).toBe('right');

            const scopesCombobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-scopes"]'
            );
            expect(scopesCombobox.dropdownAlignment).toBe('right');
        });
    });

    // dropdown-length
    // Depends on scopes
    it('Combobox: dropdownLength', () => {
        element.dropdownLength = '5-items';
        element.scopes = scopes;

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            expect(combobox.dropdownLength).toBe('5-items');

            const scopesCombobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-scopes"]'
            );
            expect(scopesCombobox.dropdownLength).toBe('5-items');
        });
    });

    // field-level-help
    it('Combobox: fieldLevelHelp', () => {
        element.fieldLevelHelp = 'A string help';

        return Promise.resolve().then(() => {
            const helptext = element.shadowRoot.querySelector(
                '[data-element-id="lightning-helptext"]'
            );
            expect(helptext.content).toBe('A string help');
        });
    });

    // groups
    it('Combobox: groups', () => {
        element.groups = groups;

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            // A default group will be added to the beginning of the list by the primitive combobox
            expect(combobox.groups).toMatchObject(groups);
        });
    });

    // hide-clear-icon
    it('Combobox: hideClearIcon', () => {
        element.hideClearIcon = true;

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            // A default group will be added to the beginning of the list by the primitive combobox
            expect(combobox.hideClearIcon).toBeTruthy();
        });
    });

    // hide-selected-options
    // Depends on isMultiSelect
    it('Combobox: hideSelectedOptions = false', () => {
        element.hideSelectedOptions = false;
        element.isMultiSelect = true;

        return Promise.resolve()
            .then(() => {
                const combobox = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-combobox-main"]'
                );
                combobox.dispatchEvent(
                    new CustomEvent('privateselect', {
                        detail: {
                            selectedOptions: options
                        }
                    })
                );
            })
            .then(() => {
                const pillContainer = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-pill-container"]'
                );
                const modifiedOptions = JSON.parse(JSON.stringify(options));
                modifiedOptions.forEach((option) => {
                    option.name = option.value;
                });
                expect(pillContainer).toBeTruthy();
                expect(pillContainer.items).toEqual(modifiedOptions);
            });
    });

    it('Combobox: hideSelectedOptions = true', () => {
        element.hideSelectedOptions = true;
        element.isMultiSelect = true;

        return Promise.resolve()
            .then(() => {
                const combobox = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-combobox-main"]'
                );
                combobox.dispatchEvent(
                    new CustomEvent('privateselect', {
                        detail: {
                            selectedOptions: options
                        }
                    })
                );
            })
            .then(() => {
                const pillContainer = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-pill-container"]'
                );
                expect(pillContainer).toBeFalsy();
            });
    });

    // is-loading
    it('Combobox: isLoading', () => {
        element.isLoading = true;

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            expect(combobox.isLoading).toBeTruthy();
        });
    });

    // is-multi-select
    it('Combobox: isMultiSelect', () => {
        element.isMultiSelect = true;

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            expect(combobox.isMultiSelect).toBeTruthy();
        });
    });

    // label
    it('Combobox: label', () => {
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            expect(combobox.label).toBe('A string label');

            const label = element.shadowRoot.querySelector(
                '[data-element-id="span-label"]'
            );
            expect(label.textContent).toBe('A string label');
        });
    });

    // loading-state-alternative-text
    it('Combobox: loadingStateAlternativeText', () => {
        element.loadingStateAlternativeText = 'A string text';

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            expect(combobox.loadingStateAlternativeText).toBe('A string text');
        });
    });

    // message-when-bad-input
    it('Combobox: messageWhenBadInput', () => {
        element.messageWhenBadInput = 'A string message';

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            expect(combobox.messageWhenBadInput).toBe('A string message');
        });
    });

    // message-when-value-missing
    it('Combobox: messageWhenValueMissing', () => {
        element.messageWhenValueMissing = 'A string message';

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            expect(combobox.messageWhenValueMissing).toBe('A string message');
        });
    });

    // multi-level-groups
    // Depends on scopes
    it('Combobox: multiLevelGroups', () => {
        element.multiLevelGroups = true;
        element.scopes = scopes;

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            expect(combobox.multiLevelGroups).toBeTruthy();

            const scopesCombobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-scopes"]'
            );
            expect(scopesCombobox.multiLevelGroups).toBeTruthy();
        });
    });

    // name
    it('Combobox: name', () => {
        element.name = 'a-string-name';

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            expect(combobox.name).toBe('a-string-name');
        });
    });

    // options
    it('Combobox: options', () => {
        element.options = options;

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            expect(combobox.options).toMatchObject(options);
        });
    });

    // placeholder
    it('Combobox: placeholder', () => {
        element.placeholder = 'A string placeholder';

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            expect(combobox.placeholder).toBe('A string placeholder');
        });
    });

    // read-only
    // Depends on scopes
    it('Combobox: readOnly', () => {
        element.readOnly = true;
        element.scopes = scopes;

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            expect(combobox.readOnly).toBeTruthy();

            const scopesCombobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-scopes"]'
            );
            expect(scopesCombobox.readOnly).toBeTruthy();
        });
    });

    // remove-selected-options
    it('Combobox: removeSelectedOptions', () => {
        element.removeSelectedOptions = true;

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            expect(combobox.removeSelectedOptions).toBeTruthy();
        });
    });

    // required
    it('Combobox: required', () => {
        element.required = true;

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            expect(combobox.required).toBeTruthy();
        });
    });

    // scopes
    it('Combobox: scopes', () => {
        element.scopes = scopes;

        return Promise.resolve().then(() => {
            const scopesCombobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-scopes"]'
            );
            expect(scopesCombobox.options).toMatchObject(scopes);
        });
    });

    // scopes-groups
    // Depends on scopes
    it('Combobox: scopesGroups', () => {
        element.scopes = scopes;
        element.scopesGroups = scopesGroups;

        return Promise.resolve().then(() => {
            const scopesCombobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-scopes"]'
            );
            // A default group will be added to the beginning of the list by the primitive combobox
            expect(scopesCombobox.groups).toMatchObject(scopesGroups);
        });
    });

    // search
    it('Combobox: search', () => {
        const search = jest.fn();
        element.search = search;

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            expect(combobox.search).toBe(search);
        });
    });

    // selected-options-aria-label
    // Depends on isMultiSelect and options
    it('Combobox: selectedOptionsAriaLabel', () => {
        element.options = options;
        element.isMultiSelect = true;
        element.selectedOptionsAriaLabel = 'A string label';

        return Promise.resolve()
            .then(() => {
                const combobox = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-combobox-main"]'
                );
                combobox.dispatchEvent(
                    new CustomEvent('privateselect', {
                        detail: {
                            selectedOptions: options
                        }
                    })
                );
            })
            .then(() => {
                const pillContainer = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-pill-container"]'
                );
                expect(pillContainer.alternativeText).toBe('A string label');
            });
    });

    // selected-options-direction
    // Depends on isMultiSelect and options
    it('Combobox: selectedOptionsDirection = horizontal', () => {
        element.options = options;
        element.isMultiSelect = true;
        element.selectedOptionsDirection = 'horizontal';

        return Promise.resolve()
            .then(() => {
                const combobox = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-combobox-main"]'
                );
                combobox.dispatchEvent(
                    new CustomEvent('privateselect', {
                        detail: {
                            selectedOptions: options
                        }
                    })
                );
            })
            .then(() => {
                const pillContainer = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-pill-container"]'
                );
                const list = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-list"]'
                );
                expect(pillContainer).toBeTruthy();
                expect(list).toBeFalsy();
            });
    });

    it('Combobox: selectedOptionsDirection = vertical', () => {
        element.options = options;
        element.isMultiSelect = true;
        element.selectedOptionsDirection = 'vertical';

        return Promise.resolve()
            .then(() => {
                const combobox = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-combobox-main"]'
                );
                combobox.dispatchEvent(
                    new CustomEvent('privateselect', {
                        detail: {
                            selectedOptions: options
                        }
                    })
                );
            })
            .then(() => {
                const pillContainer = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-pill-container"]'
                );
                const list = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-list"]'
                );
                expect(pillContainer).toBeFalsy();
                expect(list).toBeTruthy();
            });
    });

    // sortable-selected-options
    // Depends on isMultiSelect and options
    it('Combobox: sortableSelectedOptions', () => {
        element.options = options;
        element.isMultiSelect = true;
        element.sortableSelectedOptions = true;

        return Promise.resolve()
            .then(() => {
                const combobox = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-combobox-main"]'
                );
                combobox.dispatchEvent(
                    new CustomEvent('privateselect', {
                        detail: {
                            selectedOptions: options
                        }
                    })
                );
            })
            .then(() => {
                const pillContainer = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-pill-container"]'
                );
                expect(pillContainer.sortable).toBeTruthy();
            });
    });

    // sortable-selected-options-icon-name
    // Depends on selectedOptionsDirection, isMultiSelect and options
    it('Combobox: sortableSelectedOptionsIconName', () => {
        element.options = options;
        element.isMultiSelect = true;
        element.sortableSelectedOptionsIconName = 'utility:user';
        element.selectedOptionsDirection = 'vertical';

        return Promise.resolve()
            .then(() => {
                const combobox = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-combobox-main"]'
                );
                combobox.dispatchEvent(
                    new CustomEvent('privateselect', {
                        detail: {
                            selectedOptions: options
                        }
                    })
                );
            })
            .then(() => {
                const list = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-list"]'
                );
                expect(list.sortableIconName).toBe('utility:user');
            });
    });

    // validity
    // Depends on required
    it('Combobox: validity', () => {
        element.required = true;

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            combobox.validity = { valueMissing: true };
            expect(element.validity.valueMissing).toBeTruthy();
        });
    });

    // value
    it('Combobox: value', () => {
        element.value = [options[0].value];

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            expect(combobox.value).toMatchObject([options[0].value]);
        });
    });

    // variant
    // Depends on label
    it('Combobox: variant = standard', () => {
        element.variant = 'standard';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '[data-element-id="span-label"]'
            );
            expect(label.classList).not.toContain('slds-assistive-text');
            expect(element.classList).not.toContain(
                'slds-form-element_stacked'
            );
            expect(element.classList).not.toContain(
                'slds-form-element_horizontal'
            );
        });
    });

    it('Combobox: variant = label-stacked', () => {
        element.variant = 'label-stacked';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '[data-element-id="span-label"]'
            );
            expect(label.classList).not.toContain('slds-assistive-text');
            expect(element.classList).toContain('slds-form-element_stacked');
            expect(element.classList).not.toContain(
                'slds-form-element_horizontal'
            );
        });
    });

    it('Combobox: variant = label-hidden', () => {
        element.variant = 'label-hidden';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '[data-element-id="span-label"]'
            );
            expect(label.classList).toContain('slds-assistive-text');
            expect(element.classList).not.toContain(
                'slds-form-element_stacked'
            );
            expect(element.classList).not.toContain(
                'slds-form-element_horizontal'
            );
        });
    });

    it('Combobox: variant = label-inline', () => {
        element.variant = 'label-inline';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '[data-element-id="span-label"]'
            );
            expect(label.classList).not.toContain('slds-assistive-text');
            expect(element.classList).not.toContain(
                'slds-form-element_stacked'
            );
            expect(element.classList).toContain('slds-form-element_horizontal');
        });
    });

    /* ----- METHODS ----- */

    // blur
    it('Combobox: blur method', () => {
        const combobox = element.shadowRoot.querySelector(
            '[data-element-id="avonni-primitive-combobox-main"]'
        );
        const spy = jest.spyOn(combobox, 'blur');

        element.blur();
        expect(spy).toHaveBeenCalled();
    });

    // checkValidity
    it('Combobox: checkValidity method', () => {
        const combobox = element.shadowRoot.querySelector(
            '[data-element-id="avonni-primitive-combobox-main"]'
        );
        const spy = jest.spyOn(combobox, 'checkValidity');

        element.checkValidity();
        expect(spy).toHaveBeenCalled();
    });

    // close
    it('Combobox: close method', () => {
        const combobox = element.shadowRoot.querySelector(
            '[data-element-id="avonni-primitive-combobox-main"]'
        );
        const spy = jest.spyOn(combobox, 'close');

        element.close();
        expect(spy).toHaveBeenCalled();
    });

    // focus
    it('Combobox: focus method', () => {
        const combobox = element.shadowRoot.querySelector(
            '[data-element-id="avonni-primitive-combobox-main"]'
        );
        const spy = jest.spyOn(combobox, 'focus');

        element.focus();
        expect(spy).toHaveBeenCalled();
    });

    // open
    it('Combobox: open method', () => {
        const combobox = element.shadowRoot.querySelector(
            '[data-element-id="avonni-primitive-combobox-main"]'
        );
        const spy = jest.spyOn(combobox, 'open');

        element.open();
        expect(spy).toHaveBeenCalled();
    });

    // reportValidity
    it('Combobox: reportValidity method', () => {
        const combobox = element.shadowRoot.querySelector(
            '[data-element-id="avonni-primitive-combobox-main"]'
        );
        const spy = jest.spyOn(combobox, 'reportValidity');

        element.reportValidity();
        expect(spy).toHaveBeenCalled();
    });

    // resetLevel
    it('Combobox: resetLevel method', () => {
        const combobox = element.shadowRoot.querySelector(
            '[data-element-id="avonni-primitive-combobox-main"]'
        );
        const spy = jest.spyOn(combobox, 'resetLevel');

        element.resetLevel();
        expect(spy).toHaveBeenCalled();
    });

    // setCustomValidity
    it('Combobox: setCustomValidity method', () => {
        const combobox = element.shadowRoot.querySelector(
            '[data-element-id="avonni-primitive-combobox-main"]'
        );
        const spy = jest.spyOn(combobox, 'setCustomValidity');

        element.setCustomValidity('Something');
        expect(spy).toHaveBeenCalled();
    });

    // showHelpMessageIfInvalid
    it('Combobox: showHelpMessageIfInvalid method', () => {
        const combobox = element.shadowRoot.querySelector(
            '[data-element-id="avonni-primitive-combobox-main"]'
        );
        const spy = jest.spyOn(combobox, 'reportValidity');

        element.showHelpMessageIfInvalid();
        expect(spy).toHaveBeenCalled();
    });

    // updateScope
    // Depends on scopes
    it('Combobox: updateScope method', () => {
        element.scopes = scopes;

        return Promise.resolve()
            .then(() => {
                const scopeCombobox = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-combobox-scopes"]'
                );
                expect(scopeCombobox.value).toMatchObject(['all']);

                element.updateScope('accounts');
            })
            .then(() => {
                const scopeCombobox = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-combobox-scopes"]'
                );
                expect(scopeCombobox.value).toBe('accounts');
            });
    });

    /* ----- EVENTS ----- */

    // actionclick
    it('Combobox: actionclick event', () => {
        const handler = jest.fn();
        element.addEventListener('actionclick', handler);

        const combobox = element.shadowRoot.querySelector(
            '[data-element-id="avonni-primitive-combobox-main"]'
        );
        combobox.dispatchEvent(
            new CustomEvent('actionclick', {
                detail: {
                    name: 'action-name'
                }
            })
        );

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.name).toBe('action-name');
        expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
    });

    // backactionclick
    it('Combobox: backactionclick event', () => {
        const handler = jest.fn();
        element.addEventListener('backactionclick', handler);

        const combobox = element.shadowRoot.querySelector(
            '[data-element-id="avonni-primitive-combobox-main"]'
        );
        combobox.dispatchEvent(new CustomEvent('backactionclick'));

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
    });

    // blur
    it('Combobox: blur event', () => {
        const handler = jest.fn();
        element.addEventListener('blur', handler);

        const combobox = element.shadowRoot.querySelector(
            '[data-element-id="avonni-primitive-combobox-main"]'
        );
        combobox.dispatchEvent(new CustomEvent('blur'));

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
    });

    // focus
    it('Combobox: focus event', () => {
        const handler = jest.fn();
        element.addEventListener('focus', handler);

        const combobox = element.shadowRoot.querySelector(
            '[data-element-id="avonni-primitive-combobox-main"]'
        );
        combobox.dispatchEvent(new CustomEvent('focus'));

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
    });

    // levelchange
    it('Combobox: levelchange event', () => {
        element.options = options;
        const handler = jest.fn();
        element.addEventListener('levelchange', handler);

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            combobox.dispatchEvent(
                new CustomEvent('levelchange', {
                    detail: {
                        optionValue: options[3].options[0].options[0].value
                    }
                })
            );

            expect(handler).toHaveBeenCalled();
            const event = handler.mock.calls[0][0];
            expect(event.detail.option).toEqual(
                options[3].options[0].options[0]
            );
            expect(event.bubbles).toBeTruthy();
            expect(event.composed).toBeFalsy();
            expect(event.cancelable).toBeFalsy();
        });
    });

    // open
    it('Combobox: open event', () => {
        const handler = jest.fn();
        element.addEventListener('open', handler);

        const combobox = element.shadowRoot.querySelector(
            '[data-element-id="avonni-primitive-combobox-main"]'
        );
        combobox.dispatchEvent(new CustomEvent('open'));

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
    });

    // scopechange
    // Depends on scopes
    it('Combobox: scopechange event', () => {
        const handler = jest.fn();
        element.addEventListener('scopechange', handler);
        element.scopes = scopes;

        return Promise.resolve().then(() => {
            const scopesCombobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-scopes"]'
            );
            scopesCombobox.dispatchEvent(
                new CustomEvent('change', {
                    detail: {
                        value: ['scope-value']
                    }
                })
            );

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.value).toBe('scope-value');
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });

    // search
    it('Combobox: search event', () => {
        const handler = jest.fn();
        element.addEventListener('search', handler);

        const combobox = element.shadowRoot.querySelector(
            '[data-element-id="avonni-primitive-combobox-main"]'
        );
        combobox.dispatchEvent(
            new CustomEvent('search', {
                detail: {
                    value: 'Search term'
                }
            })
        );

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.value).toBe('Search term');
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
    });

    // change
    it('Combobox: change event multiselect = true', () => {
        element.isMultiSelect = true;
        const handler = jest.fn();
        element.addEventListener('change', handler);

        const combobox = element.shadowRoot.querySelector(
            '[data-element-id="avonni-primitive-combobox-main"]'
        );
        combobox.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    value: ['burlington', 'nakatomi'],
                    levelPath: [3, 0, 0],
                    action: 'select'
                }
            })
        );

        expect(handler).toHaveBeenCalled();
        const detail = handler.mock.calls[0][0].detail;
        expect(detail.value).toEqual(['burlington', 'nakatomi']);
        expect(detail.levelPath).toEqual([3, 0, 0]);
        expect(detail.action).toBe('select');
        expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
    });

    it('Combobox: change event multiselect = false', () => {
        const handler = jest.fn();
        element.addEventListener('change', handler);

        const combobox = element.shadowRoot.querySelector(
            '[data-element-id="avonni-primitive-combobox-main"]'
        );
        combobox.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    value: 'value-1'
                }
            })
        );

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.value).toBe('value-1');
        expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
    });

    it('Combobox: change event, reorder horizontal selection', () => {
        const handler = jest.fn();
        element.addEventListener('change', handler);
        element.isMultiSelect = true;
        element.options = options;

        return Promise.resolve()
            .then(() => {
                const combobox = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-combobox-main"]'
                );
                combobox.dispatchEvent(
                    new CustomEvent('privateselect', {
                        detail: {
                            selectedOptions: [
                                options[0],
                                options[1],
                                options[3],
                                options[4]
                            ]
                        }
                    })
                );
            })
            .then(() => {
                const pillContainer = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-pill-container"]'
                );
                pillContainer.dispatchEvent(
                    new CustomEvent('reorder', {
                        detail: {
                            items: [
                                options[0],
                                options[4],
                                options[1],
                                options[3]
                            ]
                        }
                    })
                );
                expect(handler).toHaveBeenCalled();
                const detail = handler.mock.calls[0][0].detail;
                expect(detail.value).toEqual([
                    options[0].value,
                    options[4].value,
                    options[1].value,
                    options[3].value
                ]);
                expect(detail.action).toBe('reorder');
            });
    });

    // Remove a selected option
    // Depends on isMultiSelect
    it('Combobox: Remove a selected option', () => {
        const combobox = element.shadowRoot.querySelector(
            '[data-element-id="avonni-primitive-combobox-main"]'
        );
        const spy = jest.spyOn(combobox, 'removeSelectedOption');
        element.isMultiSelect = true;

        return Promise.resolve()
            .then(() => {
                combobox.dispatchEvent(
                    new CustomEvent('privateselect', {
                        detail: {
                            selectedOptions: options
                        }
                    })
                );
            })
            .then(() => {
                const pillContainer = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-pill-container"]'
                );
                pillContainer.dispatchEvent(
                    new CustomEvent('actionclick', {
                        detail: {
                            index: 2
                        }
                    })
                );
                expect(spy).toHaveBeenCalled();
                expect(spy.mock.calls[0][0]).toBe(options[2].value);
            });
    });

    it('Combobox: Remove a selected option with vertical options', () => {
        const combobox = element.shadowRoot.querySelector(
            '[data-element-id="avonni-primitive-combobox-main"]'
        );
        const spy = jest.spyOn(combobox, 'removeSelectedOption');
        element.isMultiSelect = true;
        element.selectedOptionsDirection = 'vertical';

        return Promise.resolve()
            .then(() => {
                combobox.dispatchEvent(
                    new CustomEvent('privateselect', {
                        detail: {
                            selectedOptions: options
                        }
                    })
                );
            })
            .then(() => {
                const list = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-list"]'
                );
                list.dispatchEvent(
                    new CustomEvent('actionclick', {
                        detail: {
                            name: 'remove',
                            item: options[2],
                            targetName: 'edge'
                        }
                    })
                );
                expect(spy).toHaveBeenCalled();
                expect(spy.mock.calls[0][0]).toBe(options[2].value);
            });
    });
});
