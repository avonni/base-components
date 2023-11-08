import { createElement } from 'lwc';
import Combobox from '../combobox';
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

    describe('Attributes', () => {
        it('Default attributes', () => {
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
            expect(element.enableInfiniteLoading).toBeFalsy();
            expect(element.fieldLevelHelp).toBeUndefined();
            expect(element.groups).toMatchObject([]);
            expect(element.hideClearIcon).toBeFalsy();
            expect(element.hideOptionsUntilSearch).toBeFalsy();
            expect(element.hideSelectedOptions).toBeFalsy();
            expect(element.isLoading).toBeFalsy();
            expect(element.isMultiSelect).toBeFalsy();
            expect(element.label).toBeUndefined();
            expect(element.loadMoreOffset).toBe(20);
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

        describe('Actions', () => {
            it('actions', () => {
                element.actions = actions;

                return Promise.resolve().then(() => {
                    const combobox = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-combobox-main"]'
                    );
                    expect(combobox.actions).toMatchObject(actions);
                });
            });
        });

        describe('Allow Search', () => {
            it('allowSearch', () => {
                element.allowSearch = true;

                return Promise.resolve().then(() => {
                    const combobox = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-combobox-main"]'
                    );
                    expect(combobox.allowSearch).toBeTruthy();
                });
            });
        });

        describe('Back Action', () => {
            it('backAction', () => {
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
        });

        describe('Disabled', () => {
            // Depends on scopes
            it('disabled', () => {
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
        });

        describe('Dropdown Alignment', () => {
            // Depends on scopes
            it('dropdownAlignment', () => {
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
        });

        describe('Dropdown Length', () => {
            // Depends on scopes
            it('dropdownLength', () => {
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
        });

        describe('Enable Infinite Loading', () => {
            it('enableInfiniteLoading', () => {
                element.enableInfiniteLoading = true;

                return Promise.resolve().then(() => {
                    const combobox = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-combobox-main"]'
                    );
                    expect(combobox.enableInfiniteLoading).toBeTruthy();
                });
            });
        });

        describe('Field Level Help', () => {
            it('fieldLevelHelp', () => {
                element.fieldLevelHelp = 'A string help';

                return Promise.resolve().then(() => {
                    const helptext = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-helptext"]'
                    );
                    expect(helptext.content).toBe('A string help');
                });
            });
        });

        describe('Groups', () => {
            it('groups', () => {
                element.groups = groups;

                return Promise.resolve().then(() => {
                    const combobox = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-combobox-main"]'
                    );
                    // A default group will be added to the beginning of the list by the primitive combobox
                    expect(combobox.groups).toMatchObject(groups);
                });
            });
        });

        describe('Hide Clear Icon', () => {
            it('hideClearIcon', () => {
                element.hideClearIcon = true;

                return Promise.resolve().then(() => {
                    const combobox = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-combobox-main"]'
                    );
                    // A default group will be added to the beginning of the list by the primitive combobox
                    expect(combobox.hideClearIcon).toBeTruthy();
                });
            });
        });

        describe('Hide options Until Search', () => {
            it('hideOptionsUntilSearch', () => {
                element.hideOptionsUntilSearch = true;

                return Promise.resolve().then(() => {
                    const combobox = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-combobox-main"]'
                    );
                    expect(combobox.hideOptionsUntilSearch).toBeTruthy();
                });
            });
        });

        describe('Hide Selected Options', () => {
            // Depends on isMultiSelect
            it('false', () => {
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
                        expect(pillContainer).toBeTruthy();
                        const items = options.map((option) => {
                            return { ...option, name: option.value };
                        });
                        expect(pillContainer.items).toEqual(items);
                    });
            });

            it('true', () => {
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
        });

        describe('Is Loading', () => {
            it('isLoading', () => {
                element.isLoading = true;

                return Promise.resolve().then(() => {
                    const combobox = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-combobox-main"]'
                    );
                    expect(combobox.isLoading).toBeTruthy();
                });
            });
        });

        describe('Is Multi Select', () => {
            it('isMultiSelect', () => {
                element.isMultiSelect = true;

                return Promise.resolve().then(() => {
                    const combobox = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-combobox-main"]'
                    );
                    expect(combobox.isMultiSelect).toBeTruthy();
                });
            });
        });

        describe('Label', () => {
            it('label', () => {
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
        });

        describe('Load More Offset', () => {
            it('loadMoreOffset', () => {
                element.loadMoreOffset = true;

                return Promise.resolve().then(() => {
                    const combobox = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-combobox-main"]'
                    );
                    expect(combobox.loadMoreOffset).toBeTruthy();
                });
            });
        });

        describe('Loading State Alternative Text', () => {
            it('loadingStateAlternativeText', () => {
                element.loadingStateAlternativeText = 'A string text';

                return Promise.resolve().then(() => {
                    const combobox = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-combobox-main"]'
                    );
                    expect(combobox.loadingStateAlternativeText).toBe(
                        'A string text'
                    );
                });
            });
        });

        describe('Validity Messages', () => {
            it('messageWhenBadInput', () => {
                element.messageWhenBadInput = 'A string message';

                return Promise.resolve().then(() => {
                    const combobox = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-combobox-main"]'
                    );
                    expect(combobox.messageWhenBadInput).toBe(
                        'A string message'
                    );
                });
            });

            it('messageWhenValueMissing', () => {
                element.messageWhenValueMissing = 'A string message';

                return Promise.resolve().then(() => {
                    const combobox = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-combobox-main"]'
                    );
                    expect(combobox.messageWhenValueMissing).toBe(
                        'A string message'
                    );
                });
            });
        });

        describe('Multi Level Groups', () => {
            // Depends on scopes
            it('multiLevelGroups', () => {
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
        });

        describe('Name', () => {
            it('name', () => {
                element.name = 'a-string-name';

                return Promise.resolve().then(() => {
                    const combobox = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-combobox-main"]'
                    );
                    expect(combobox.name).toBe('a-string-name');
                });
            });
        });

        describe('Options', () => {
            it('options', () => {
                element.options = options;

                return Promise.resolve().then(() => {
                    const combobox = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-combobox-main"]'
                    );
                    expect(combobox.options).toMatchObject(options);
                });
            });
        });

        describe('Placeholder', () => {
            it('placeholder', () => {
                element.placeholder = 'A string placeholder';

                return Promise.resolve().then(() => {
                    const combobox = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-combobox-main"]'
                    );
                    expect(combobox.placeholder).toBe('A string placeholder');
                });
            });
        });

        describe('Read Only', () => {
            // Depends on scopes
            it('readOnly', () => {
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
        });

        describe('Remove Selected Options', () => {
            it('removeSelectedOptions', () => {
                element.removeSelectedOptions = true;

                return Promise.resolve().then(() => {
                    const combobox = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-combobox-main"]'
                    );
                    expect(combobox.removeSelectedOptions).toBeTruthy();
                });
            });
        });

        describe('Required', () => {
            it('required', () => {
                element.required = true;

                return Promise.resolve().then(() => {
                    const combobox = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-combobox-main"]'
                    );
                    expect(combobox.required).toBeTruthy();
                });
            });
        });

        describe('Scopes', () => {
            it('scopes', () => {
                element.scopes = scopes;

                return Promise.resolve().then(() => {
                    const scopesCombobox = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-combobox-scopes"]'
                    );
                    expect(scopesCombobox.options).toMatchObject(scopes);
                });
            });

            // Depends on scopes
            it('scopesGroups', () => {
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
        });

        describe('Search', () => {
            it('search', () => {
                const search = jest.fn();
                element.search = search;

                return Promise.resolve().then(() => {
                    const combobox = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-combobox-main"]'
                    );
                    expect(combobox.search).toBe(search);
                });
            });
        });

        describe('Selected Options', () => {
            // Depends on isMultiSelect and options
            it('selectedOptionsAriaLabel', () => {
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
                        expect(pillContainer.alternativeText).toBe(
                            'A string label'
                        );
                    });
            });

            // Depends on isMultiSelect and options
            it('selectedOptionsDirection = horizontal', () => {
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

            it('selectedOptionsDirection = vertical', () => {
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

            // Depends on isMultiSelect and options
            it('sortableSelectedOptions', () => {
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

            // Depends on selectedOptionsDirection, isMultiSelect and options
            it('sortableSelectedOptionsIconName', () => {
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
        });

        describe('Validity', () => {
            // Depends on required
            it('validity', () => {
                element.required = true;

                return Promise.resolve().then(() => {
                    const combobox = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-combobox-main"]'
                    );
                    combobox.validity = { valueMissing: true };
                    expect(element.validity.valueMissing).toBeTruthy();
                });
            });
        });

        describe('Value', () => {
            it('string with delimiters', () => {
                element.value = 'value1;value2;value3';

                return Promise.resolve().then(() => {
                    const combobox = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-combobox-main"]'
                    );
                    expect(combobox.value).toMatchObject([
                        'value1',
                        'value2',
                        'value3'
                    ]);
                });
            });

            it('number', () => {
                element.value = 2;

                return Promise.resolve().then(() => {
                    const combobox = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-combobox-main"]'
                    );
                    expect(combobox.value).toMatchObject([2]);
                });
            });

            it('array', () => {
                element.value = [options[0].value];

                return Promise.resolve().then(() => {
                    const combobox = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-combobox-main"]'
                    );
                    expect(combobox.value).toMatchObject([options[0].value]);
                });
            });
        });

        describe('Variant', () => {
            // Depends on label
            it('standard', () => {
                element.variant = 'standard';
                element.label = 'A string label';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '[data-element-id="span-label"]'
                    );
                    expect(label.classList).not.toContain(
                        'slds-assistive-text'
                    );
                    expect(element.classList).not.toContain(
                        'slds-form-element_stacked'
                    );
                    expect(element.classList).not.toContain(
                        'slds-form-element_horizontal'
                    );
                });
            });

            it('label-stacked', () => {
                element.variant = 'label-stacked';
                element.label = 'A string label';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '[data-element-id="span-label"]'
                    );
                    expect(label.classList).not.toContain(
                        'slds-assistive-text'
                    );
                    expect(element.classList).toContain(
                        'slds-form-element_stacked'
                    );
                    expect(element.classList).not.toContain(
                        'slds-form-element_horizontal'
                    );
                });
            });

            it('label-hidden', () => {
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

            it('label-inline', () => {
                element.variant = 'label-inline';
                element.label = 'A string label';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '[data-element-id="span-label"]'
                    );
                    expect(label.classList).not.toContain(
                        'slds-assistive-text'
                    );
                    expect(element.classList).not.toContain(
                        'slds-form-element_stacked'
                    );
                    expect(element.classList).toContain(
                        'slds-form-element_horizontal'
                    );
                });
            });
        });
    });

    describe('Methods', () => {
        // blur
        it('blur method', () => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            const spy = jest.spyOn(combobox, 'blur');

            element.blur();
            expect(spy).toHaveBeenCalled();
        });

        // checkValidity
        it('checkValidity method', () => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            const spy = jest.spyOn(combobox, 'checkValidity');

            element.checkValidity();
            expect(spy).toHaveBeenCalled();
        });

        // close
        it('close method', () => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            const spy = jest.spyOn(combobox, 'close');

            element.close();
            expect(spy).toHaveBeenCalled();
        });

        // focus
        it('focus method', () => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            const spy = jest.spyOn(combobox, 'focus');

            element.focus();
            expect(spy).toHaveBeenCalled();
        });

        // open
        it('open method', () => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            const spy = jest.spyOn(combobox, 'open');

            element.open();
            expect(spy).toHaveBeenCalled();
        });

        // reportValidity
        it('reportValidity method', () => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            const spy = jest.spyOn(combobox, 'reportValidity');

            element.reportValidity();
            expect(spy).toHaveBeenCalled();
        });

        // resetLevel
        it('resetLevel method', () => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            const spy = jest.spyOn(combobox, 'resetLevel');

            element.resetLevel();
            expect(spy).toHaveBeenCalled();
        });

        // setCustomValidity
        it('setCustomValidity method', () => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            const spy = jest.spyOn(combobox, 'setCustomValidity');

            element.setCustomValidity('Something');
            expect(spy).toHaveBeenCalled();
        });

        // showHelpMessageIfInvalid
        it('showHelpMessageIfInvalid method', () => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            const spy = jest.spyOn(combobox, 'reportValidity');

            element.showHelpMessageIfInvalid();
            expect(spy).toHaveBeenCalled();
        });

        // updateScope
        // Depends on scopes
        it('updateScope method', () => {
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
    });

    describe('Events', () => {
        // actionclick
        it('actionclick event', () => {
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
        it('backactionclick event', () => {
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
        it('blur event', () => {
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
        it('focus event', () => {
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
        it('levelchange event', () => {
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

        // loadmore
        it('loadmore event', () => {
            element.options = options;
            const handler = jest.fn();
            element.addEventListener('loadmore', handler);

            return Promise.resolve().then(() => {
                const combobox = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-combobox-main"]'
                );
                combobox.dispatchEvent(
                    new CustomEvent('loadmore', {
                        detail: {
                            optionValue: options[3].options[0].value,
                            searchTerm: 'some research'
                        }
                    })
                );

                expect(handler).toHaveBeenCalled();
                const event = handler.mock.calls[0][0];
                expect(event.detail.option).toEqual(options[3].options[0]);
                expect(event.detail.searchTerm).toBe('some research');
                expect(event.bubbles).toBeFalsy();
                expect(event.composed).toBeFalsy();
                expect(event.cancelable).toBeFalsy();
            });
        });

        // open
        it('open event', () => {
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
        it('scopechange event', () => {
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
                expect(handler.mock.calls[0][0].detail.value).toBe(
                    'scope-value'
                );
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
        it('change event multiselect = true', () => {
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

        it('change event multiselect = false', () => {
            const handler = jest.fn();
            element.addEventListener('change', handler);

            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            combobox.dispatchEvent(
                new CustomEvent('change', {
                    detail: {
                        value: ['value-1']
                    }
                })
            );

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.value).toBe('value-1');
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });

        it('change event, reorder horizontal selection', () => {
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
                    const items = options.map((opt) => {
                        return { ...opt, name: opt.value };
                    });
                    pillContainer.dispatchEvent(
                        new CustomEvent('reorder', {
                            detail: {
                                items: [items[0], items[4], items[1], items[3]]
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

        // close
        it('close event', () => {
            const handler = jest.fn();
            element.addEventListener('close', handler);

            return Promise.resolve().then(() => {
                const combobox = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-combobox-main"]'
                );
                combobox.dispatchEvent(new CustomEvent('close'));
                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            });
        });

        // Remove a selected option
        // Depends on isMultiSelect
        it('Remove a selected option', () => {
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

        it('Remove a selected option with vertical options', () => {
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
                                targetName: options[2].value
                            }
                        })
                    );
                    expect(spy).toHaveBeenCalled();
                    expect(spy.mock.calls[0][0]).toBe(options[2].value);
                });
        });
    });
});
