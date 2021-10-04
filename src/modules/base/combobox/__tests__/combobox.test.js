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

    it('Default attributes', () => {
        element = createElement('base-combobox', {
            is: Combobox
        });
        expect(element.actions).toMatchObject([]);
        expect(element.allowSearch).toBeFalsy();
        expect(element.disabled).toBeFalsy();
        expect(element.dropdownAlignment).toBe('left');
        expect(element.dropdownLength).toBe('7-items');
        expect(element.fieldLevelLevel).toBeUndefined();
        expect(element.groups).toMatchObject([]);
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
        expect(element.selectedOptionsAriaLabel).toBe('Selected Options');
        expect(element.scopes).toMatchObject([]);
        expect(element.scopesGroups).toMatchObject([]);
        expect(element.search).toBeUndefined();
        expect(element.validity).toBeFalsy();
        expect(element.value).toMatchObject([]);
        expect(element.variant).toBe('standard');
    });

    /* ----- ATTRIBUTES ----- */

    // actions
    it('actions', () => {
        element.actions = actions;

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '.combobox__main-combobox'
            );
            expect(combobox.actions).toMatchObject(actions);
        });
    });

    // allow-search
    it('allowSearch', () => {
        element.allowSearch = true;

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '.combobox__main-combobox'
            );
            expect(combobox.allowSearch).toBeTruthy();
        });
    });

    // disabled
    // Depends on scopes
    it('disabled', () => {
        element.disabled = true;
        element.scopes = scopes;

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '.combobox__main-combobox'
            );
            expect(combobox.disabled).toBeTruthy();

            const scopesCombobox = element.shadowRoot.querySelector(
                '.slds-combobox_object-switcher'
            );
            expect(scopesCombobox.disabled).toBeTruthy();
        });
    });

    // dropdown-alignment
    // Depends on scopes
    it('dropdownAlignment', () => {
        element.dropdownAlignment = 'right';
        element.scopes = scopes;

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '.combobox__main-combobox'
            );
            expect(combobox.dropdownAlignment).toBe('right');

            const scopesCombobox = element.shadowRoot.querySelector(
                '.slds-combobox_object-switcher'
            );
            expect(scopesCombobox.dropdownAlignment).toBe('right');
        });
    });

    // dropdown-length
    // Depends on scopes
    it('dropdownLength', () => {
        element.dropdownLength = '5-items';
        element.scopes = scopes;

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '.combobox__main-combobox'
            );
            expect(combobox.dropdownLength).toBe('5-items');

            const scopesCombobox = element.shadowRoot.querySelector(
                '.slds-combobox_object-switcher'
            );
            expect(scopesCombobox.dropdownLength).toBe('5-items');
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
    it('groups', () => {
        element.groups = groups;

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '.combobox__main-combobox'
            );
            // A default group will be added to the beginning of the list by the primitive combobox
            expect(combobox.groups.slice(1)).toMatchObject(groups);
        });
    });

    // hide-selected-options
    // Depends on isMultiSelect
    it('hideSelectedOptions = false', () => {
        element.hideSelectedOptions = false;
        element.isMultiSelect = true;

        return Promise.resolve()
            .then(() => {
                const combobox = element.shadowRoot.querySelector(
                    '.combobox__main-combobox'
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
                const pills = element.shadowRoot.querySelectorAll(
                    '[data-element-id^="lightning-pill"]'
                );
                expect(pills).toHaveLength(6);
                pills.forEach((pill, index) => {
                    expect(pill.name).toBe(options[index].value);
                    expect(pill.label).toBe(options[index].label);
                });
            });
    });

    it('hideSelectedOptions = true', () => {
        element.hideSelectedOptions = true;
        element.isMultiSelect = true;

        return Promise.resolve()
            .then(() => {
                const combobox = element.shadowRoot.querySelector(
                    '.combobox__main-combobox'
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
                const pills = element.shadowRoot.querySelectorAll(
                    '[data-element-id^="lightning-pill"]'
                );
                expect(pills).toHaveLength(0);
            });
    });

    // is-loading
    it('isLoading', () => {
        element.isLoading = true;

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '.combobox__main-combobox'
            );
            expect(combobox.isLoading).toBeTruthy();
        });
    });

    // is-multi-select
    it('isMultiSelect', () => {
        element.isMultiSelect = true;

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '.combobox__main-combobox'
            );
            expect(combobox.isMultiSelect).toBeTruthy();
        });
    });

    // label
    it('label', () => {
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '.combobox__main-combobox'
            );
            expect(combobox.label).toBe('A string label');

            const label = element.shadowRoot.querySelector(
                '.slds-form-element__label'
            );
            expect(label.textContent).toBe('A string label');
        });
    });

    // loading-state-alternative-text
    it('loadingStateAlternativeText', () => {
        element.loadingStateAlternativeText = 'A string text';

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '.combobox__main-combobox'
            );
            expect(combobox.loadingStateAlternativeText).toBe('A string text');
        });
    });

    // message-when-value-missing
    it('messageWhenValueMissing', () => {
        element.messageWhenValueMissing = 'A string message';

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '.combobox__main-combobox'
            );
            expect(combobox.messageWhenValueMissing).toBe('A string message');
        });
    });

    // multi-level-groups
    // Depends on scopes
    it('multiLevelGroups', () => {
        element.multiLevelGroups = true;
        element.scopes = scopes;

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '.combobox__main-combobox'
            );
            expect(combobox.multiLevelGroups).toBeTruthy();

            const scopesCombobox = element.shadowRoot.querySelector(
                '.slds-combobox_object-switcher'
            );
            expect(scopesCombobox.multiLevelGroups).toBeTruthy();
        });
    });

    // name
    it('name', () => {
        element.name = 'a-string-name';

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '.combobox__main-combobox'
            );
            expect(combobox.name).toBe('a-string-name');
        });
    });

    // options
    it('options', () => {
        element.options = options;

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '.combobox__main-combobox'
            );
            expect(combobox.options).toMatchObject(options);
        });
    });

    // placeholder
    it('placeholder', () => {
        element.placeholder = 'A string placeholder';

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '.combobox__main-combobox'
            );
            expect(combobox.placeholder).toBe('A string placeholder');
        });
    });

    // read-only
    // Depends on scopes
    it('readOnly', () => {
        element.readOnly = true;
        element.scopes = scopes;

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '.combobox__main-combobox'
            );
            expect(combobox.readOnly).toBeTruthy();

            const scopesCombobox = element.shadowRoot.querySelector(
                '.slds-combobox_object-switcher'
            );
            expect(scopesCombobox.readOnly).toBeTruthy();
        });
    });

    // remove-selected-options
    it('removeSelectedOptions', () => {
        element.removeSelectedOptions = true;

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '.combobox__main-combobox'
            );
            expect(combobox.removeSelectedOptions).toBeTruthy();
        });
    });

    // required
    it('required', () => {
        element.required = true;

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '.combobox__main-combobox'
            );
            expect(combobox.required).toBeTruthy();
        });
    });

    // scopes
    it('scopes', () => {
        element.scopes = scopes;

        return Promise.resolve().then(() => {
            const scopesCombobox = element.shadowRoot.querySelector(
                '.slds-combobox_object-switcher'
            );
            expect(scopesCombobox.options).toMatchObject(scopes);
        });
    });

    // scopes-groups
    // Depends on scopes
    it('scopesGroups', () => {
        element.scopes = scopes;
        element.scopesGroups = scopesGroups;

        return Promise.resolve().then(() => {
            const scopesCombobox = element.shadowRoot.querySelector(
                '.slds-combobox_object-switcher'
            );
            // A default group will be added to the beginning of the list by the primitive combobox
            expect(scopesCombobox.groups.splice(1)).toMatchObject(scopesGroups);
        });
    });

    // search
    it('search', () => {
        const search = jest.fn();
        element.search = search;

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '.combobox__main-combobox'
            );
            expect(combobox.search).toBe(search);
        });
    });

    // selected-options-aria-label
    // Depends on isMultiSelect and options
    it('selectedOptionsAriaLabel', () => {
        element.options = options;
        element.isMultiSelect = true;
        element.selectedOptionsAriaLabel = 'A string label';

        return Promise.resolve()
            .then(() => {
                const combobox = element.shadowRoot.querySelector(
                    '.combobox__main-combobox'
                );
                expect(combobox.selectedOptionsAriaLabel).toBe(
                    'A string label'
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
                const selectedOptions = element.shadowRoot.querySelector(
                    '.combobox__selected-options'
                );
                expect(selectedOptions.ariaLabel).toBe('A string label');
            });
    });

    // validity
    // Depends on required
    it('validity', () => {
        element.required = true;

        return Promise.resolve().then(() => {
            expect(element.validity.valueMissing).toBeTruthy();
        });
    });

    // value
    it('value', () => {
        element.value = [options[0].value];

        return Promise.resolve().then(() => {
            const combobox = element.shadowRoot.querySelector(
                '.combobox__main-combobox'
            );
            expect(combobox.value).toMatchObject([options[0].value]);
        });
    });

    // variant
    // Depends on label
    it('variant = standard', () => {
        element.variant = 'standard';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.slds-form-element__label'
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

    it('variant = label-stacked', () => {
        element.variant = 'label-stacked';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.slds-form-element__label'
            );
            expect(label.classList).not.toContain('slds-assistive-text');
            expect(element.classList).toContain('slds-form-element_stacked');
            expect(element.classList).not.toContain(
                'slds-form-element_horizontal'
            );
        });
    });

    it('variant = label-hidden', () => {
        element.variant = 'label-hidden';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.slds-form-element__label'
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

    it('variant = label-inline', () => {
        element.variant = 'label-inline';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.slds-form-element__label'
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
    it('blur method', () => {
        const combobox = element.shadowRoot.querySelector(
            '.combobox__main-combobox'
        );
        const spy = jest.spyOn(combobox, 'blur');

        element.blur();
        expect(spy).toHaveBeenCalled();
    });

    // checkValidity
    it('checkValidity method', () => {
        const combobox = element.shadowRoot.querySelector(
            '.combobox__main-combobox'
        );
        const spy = jest.spyOn(combobox, 'checkValidity');

        element.checkValidity();
        expect(spy).toHaveBeenCalled();
    });

    // close
    it('close method', () => {
        const combobox = element.shadowRoot.querySelector(
            '.combobox__main-combobox'
        );
        const spy = jest.spyOn(combobox, 'close');

        element.close();
        expect(spy).toHaveBeenCalled();
    });

    // focus
    it('focus method', () => {
        const combobox = element.shadowRoot.querySelector(
            '.combobox__main-combobox'
        );
        const spy = jest.spyOn(combobox, 'focus');

        element.focus();
        expect(spy).toHaveBeenCalled();
    });

    // open
    it('open method', () => {
        const combobox = element.shadowRoot.querySelector(
            '.combobox__main-combobox'
        );
        const spy = jest.spyOn(combobox, 'open');

        element.open();
        expect(spy).toHaveBeenCalled();
    });

    // reportValidity
    it('reportValidity method', () => {
        const combobox = element.shadowRoot.querySelector(
            '.combobox__main-combobox'
        );
        const spy = jest.spyOn(combobox, 'reportValidity');

        element.reportValidity();
        expect(spy).toHaveBeenCalled();
    });

    // setCustomValidity
    it('setCustomValidity method', () => {
        const combobox = element.shadowRoot.querySelector(
            '.combobox__main-combobox'
        );
        const spy = jest.spyOn(combobox, 'setCustomValidity');

        element.setCustomValidity('Something');
        expect(spy).toHaveBeenCalled();
    });

    // showHelpMessageIfInvalid
    it('showHelpMessageIfInvalid method', () => {
        const combobox = element.shadowRoot.querySelector(
            '.combobox__main-combobox'
        );
        const spy = jest.spyOn(combobox, 'reportValidity');

        element.showHelpMessageIfInvalid();
        expect(spy).toHaveBeenCalled();
    });

    /* ----- EVENTS ----- */

    // actionclick
    it('actionclick event', () => {
        const handler = jest.fn();
        element.addEventListener('actionclick', handler);

        const combobox = element.shadowRoot.querySelector(
            '.combobox__main-combobox'
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

    // blur
    it('blur event', () => {
        const handler = jest.fn();
        element.addEventListener('blur', handler);

        const combobox = element.shadowRoot.querySelector(
            '.combobox__main-combobox'
        );
        combobox.dispatchEvent(new CustomEvent('blur'));

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
    });

    // focus
    it('focus event', () => {
        const handler = jest.fn();
        element.addEventListener('focus', handler);

        const combobox = element.shadowRoot.querySelector(
            '.combobox__main-combobox'
        );
        combobox.dispatchEvent(new CustomEvent('focus'));

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
    });

    // open
    it('open event', () => {
        const handler = jest.fn();
        element.addEventListener('open', handler);

        const combobox = element.shadowRoot.querySelector(
            '.combobox__main-combobox'
        );
        combobox.dispatchEvent(new CustomEvent('open'));

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
    });

    // scopechange
    // Depends on scopes
    it('scopechange event', () => {
        const handler = jest.fn();
        element.addEventListener('scopechange', handler);
        element.scopes = scopes;

        return Promise.resolve().then(() => {
            const scopesCombobox = element.shadowRoot.querySelector(
                '.slds-combobox_object-switcher'
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
    it('search event', () => {
        const handler = jest.fn();
        element.addEventListener('search', handler);

        const combobox = element.shadowRoot.querySelector(
            '.combobox__main-combobox'
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
    it('change event multiselect = true', () => {
        element.isMultiSelect = true;
        const handler = jest.fn();
        element.addEventListener('change', handler);

        const combobox = element.shadowRoot.querySelector(
            '.combobox__main-combobox'
        );
        combobox.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    value: ['value-1', 'value-2']
                }
            })
        );

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.value).toMatchObject([
            'value-1',
            'value-2'
        ]);
        expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
    });

    it('change event multiselect = false', () => {
        const handler = jest.fn();
        element.addEventListener('change', handler);

        const combobox = element.shadowRoot.querySelector(
            '.combobox__main-combobox'
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

    // Remove a selected option
    // Depends on isMultiSelect
    it('Remove a selected option', () => {
        const handler = jest.fn();
        const combobox = element.shadowRoot.querySelector(
            '.combobox__main-combobox'
        );
        combobox.handleRemoveSelectedOption = handler;

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
                const pill = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-pill"]'
                );
                pill.dispatchEvent(
                    new CustomEvent('remove', {
                        detail: {
                            name: 'value-of-removed-option'
                        }
                    })
                );
                expect(handler).toHaveBeenCalled();
            });
    });
});
