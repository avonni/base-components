import { createElement } from 'lwc';
import Combobox from '../combobox';
import { actions, groups, options, scopes, scopesGroups } from './data';

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
            expect(element.hideAvatarInSelectedOptions).toBeFalsy();
            expect(element.hideClearIcon).toBeFalsy();
            expect(element.hideOptionsUntilSearch).toBeFalsy();
            expect(element.hideSelectedOptions).toBeFalsy();
            expect(element.isLoading).toBeFalsy();
            expect(element.isMultiSelect).toBeFalsy();
            expect(element.keepOpenOnSelect).toBeFalsy();
            expect(element.label).toBeUndefined();
            expect(element.loadMoreOffset).toBe(20);
            expect(element.loadingStateAlternativeText).toBe('Loading');
            expect(element.max).toBeUndefined();
            expect(element.messageWhenBadInput).toBeUndefined();
            expect(element.messageWhenRangeOverflow).toBeUndefined();
            expect(element.messageWhenRangeUnderflow).toBeUndefined();
            expect(element.messageWhenValueMissing).toBeUndefined();
            expect(element.min).toBe(0);
            expect(element.multiLevelGroups).toBeFalsy();
            expect(element.name).toBeUndefined();
            expect(element.noResultsMessage).toBe('No matches found');
            expect(element.options).toMatchObject([]);
            expect(element.placeholder).toBe('Select an Option');
            expect(element.readOnly).toBeFalsy();
            expect(element.removeSelectedOptions).toBeFalsy();
            expect(element.required).toBeFalsy();
            expect(element.requiredAlternativeText).toBe('Required');
            expect(element.selectedOptionsAriaLabel).toBe('Selected Options');
            expect(element.selectedOptionsDirection).toBe('horizontal');
            expect(element.showSelectedOptionsSecondaryText).toBeFalsy();
            expect(element.sortableSelectedOptions).toBeFalsy();
            expect(element.sortableSelectedOptionsIconName).toBeUndefined();
            expect(element.scopes).toMatchObject([]);
            expect(element.scopesGroups).toMatchObject([]);
            expect(element.search).toBeUndefined();
            expect(element.validity).toBeFalsy();
            expect(element.value).toMatchObject([]);
            expect(element.variant).toBe('standard');
        });

        describe('Actions', () => {
            it('Passed to the component', () => {
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
            it('Passed to the component', () => {
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
            it('Passed to the component', () => {
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
            it('Passed to the component', () => {
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
            it('Passed to the component', () => {
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
            it('Passed to the component', () => {
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
            it('Passed to the component', () => {
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
            it('Passed to the component', () => {
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
            it('Passed to the component', () => {
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

        describe('Hide Avatar In Selected Options', () => {
            it('Hides avatar in vertical selected options', () => {
                element.hideAvatarInSelectedOptions = true;
                element.isMultiSelect = true;
                element.selectedOptionsDirection = 'vertical';
                element.options = options;

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
                        const listOfSelectedOptions =
                            element.shadowRoot.querySelector(
                                '[data-element-id="avonni-list"]'
                            );
                        listOfSelectedOptions.items.forEach((item) => {
                            expect(item.avatar).toBeUndefined();
                        });
                    });
            });

            it('Hides avatar in horizontal selected options', () => {
                element.hideAvatarInSelectedOptions = true;
                element.isMultiSelect = true;
                element.selectedOptionsDirection = 'horizontal';
                element.options = options;

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
                        const listOfSelectedOptions =
                            element.shadowRoot.querySelector(
                                '[data-element-id="avonni-pill-container"]'
                            );
                        listOfSelectedOptions.items.forEach((item) => {
                            expect(item.avatar).toBeUndefined();
                        });
                    });
            });
        });

        describe('Hide Clear Icon', () => {
            it('Passed to the component', () => {
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
            it('Passed to the component', () => {
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
            it('False', () => {
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

            it('True', () => {
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
            it('Passed to the component', () => {
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
            it('Passed to the component', () => {
                element.isMultiSelect = true;

                return Promise.resolve().then(() => {
                    const combobox = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-combobox-main"]'
                    );
                    expect(combobox.isMultiSelect).toBeTruthy();
                });
            });
        });

        describe('Keep Open On Select', () => {
            it('Passed to the component', () => {
                element.keepOpenOnSelect = true;

                return Promise.resolve().then(() => {
                    const combobox = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-combobox-main"]'
                    );
                    expect(combobox.keepOpenOnSelect).toBeTruthy();
                });
            });
        });

        describe('Label', () => {
            it('Passed to the component', () => {
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
            it('Passed to the component', () => {
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
            it('Passed to the component', () => {
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

        describe('Max', () => {
            it('Passed to the component', () => {
                element.max = 2;

                return Promise.resolve().then(() => {
                    const combobox = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-combobox-main"]'
                    );
                    expect(combobox.max).toBe(2);
                });
            });
        });

        describe('Min', () => {
            it('Passed to the component', () => {
                element.min = 2;

                return Promise.resolve().then(() => {
                    const combobox = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-combobox-main"]'
                    );
                    expect(combobox.min).toBe(2);
                });
            });
        });

        describe('Multi Level Groups', () => {
            // Depends on scopes
            it('Passed to the component', () => {
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
            it('Passed to the component', () => {
                element.name = 'a-string-name';

                return Promise.resolve().then(() => {
                    const combobox = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-combobox-main"]'
                    );
                    expect(combobox.name).toBe('a-string-name');
                });
            });
        });

        describe('No Results Message', () => {
            it('Passed to the component', () => {
                element.noResultsMessage = 'A string message';

                return Promise.resolve().then(() => {
                    const combobox = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-combobox-main"]'
                    );
                    expect(combobox.noResultsMessage).toBe('A string message');
                });
            });
        });

        describe('Options', () => {
            it('Passed to the component', () => {
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
            it('Passed to the component', () => {
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
            it('Passed to the component', () => {
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
            it('Passed to the component', () => {
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
            it('Passed to the component', () => {
                element.required = true;
                element.requiredAlternativeText = 'A string text';

                return Promise.resolve().then(() => {
                    const combobox = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-combobox-main"]'
                    );
                    expect(combobox.required).toBeTruthy();
                    const required = element.shadowRoot.querySelector(
                        '[data-element-id="abbr-required"]'
                    );
                    expect(required.title).toBe('A string text');
                });
            });
        });

        describe('Scopes', () => {
            it('Passed to the component', () => {
                element.scopes = scopes;

                return Promise.resolve().then(() => {
                    const scopesCombobox = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-combobox-scopes"]'
                    );
                    expect(scopesCombobox.options).toMatchObject(scopes);
                });
            });

            // Depends on scopes
            it('ScopesGroups', () => {
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
            it('Passed to the component', () => {
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
            it('SelectedOptionsAriaLabel', () => {
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
            it('SelectedOptionsDirection = horizontal', () => {
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

            it('SelectedOptionsDirection = vertical', () => {
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

            // Depends on selectedOptionsDirection and isMultiSelect
            it('ShowSelectedOptionsSecondaryText', () => {
                element.options = options;
                element.isMultiSelect = true;
                element.showSelectedOptionsSecondaryText = true;
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
                        list.items.forEach((item, index) => {
                            expect(item.description).toBe(
                                options[index].secondaryText
                            );
                        });
                    });
            });

            // Depends on isMultiSelect and options
            it('SortableSelectedOptions', () => {
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
            it('SortableSelectedOptionsIconName', () => {
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
            it('Passed to the component', () => {
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
            it('String with delimiters', () => {
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

            it('Number', () => {
                element.value = 2;

                return Promise.resolve().then(() => {
                    const combobox = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-combobox-main"]'
                    );
                    expect(combobox.value).toMatchObject([2]);
                });
            });

            it('Array', () => {
                element.value = [options[0].value];

                return Promise.resolve().then(() => {
                    const combobox = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-combobox-main"]'
                    );
                    expect(combobox.value).toMatchObject([options[0].value]);
                });
            });
        });

        describe('Validity Messages', () => {
            it('MessageWhenBadInput', () => {
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

            it('MessageWhenRangeOverflow', () => {
                element.messageWhenRangeOverflow = 'A string message';

                return Promise.resolve().then(() => {
                    const combobox = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-combobox-main"]'
                    );
                    expect(combobox.messageWhenRangeOverflow).toBe(
                        'A string message'
                    );
                });
            });

            it('MessageWhenRangeUnderflow', () => {
                element.messageWhenRangeUnderflow = 'A string message';

                return Promise.resolve().then(() => {
                    const combobox = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-combobox-main"]'
                    );
                    expect(combobox.messageWhenRangeUnderflow).toBe(
                        'A string message'
                    );
                });
            });

            it('MessageWhenValueMissing', () => {
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

        describe('Variant', () => {
            // Depends on label
            it('Standard', () => {
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

            it('Label-stacked', () => {
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

            it('Label-hidden', () => {
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

            it('Label-inline', () => {
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
        it('Blur', () => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            const spy = jest.spyOn(combobox, 'blur');

            element.blur();
            expect(spy).toHaveBeenCalled();
        });

        it('CheckValidity', () => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            const spy = jest.spyOn(combobox, 'checkValidity');

            element.checkValidity();
            expect(spy).toHaveBeenCalled();
        });

        it('Close', () => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            const spy = jest.spyOn(combobox, 'close');

            element.close();
            expect(spy).toHaveBeenCalled();
        });

        it('Focus', () => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            const spy = jest.spyOn(combobox, 'focus');

            element.focus();
            expect(spy).toHaveBeenCalled();
        });

        it('Open', () => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            const spy = jest.spyOn(combobox, 'open');

            element.open();
            expect(spy).toHaveBeenCalled();
        });

        it('ReportValidity', () => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            const spy = jest.spyOn(combobox, 'reportValidity');

            element.reportValidity();
            expect(spy).toHaveBeenCalled();
        });

        it('ResetLevel', () => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            const spy = jest.spyOn(combobox, 'resetLevel');

            element.resetLevel();
            expect(spy).toHaveBeenCalled();
        });

        it('SetCustomValidity', () => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            const spy = jest.spyOn(combobox, 'setCustomValidity');

            element.setCustomValidity('Something');
            expect(spy).toHaveBeenCalled();
        });

        it('ShowHelpMessageIfInvalid', () => {
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-combobox-main"]'
            );
            const spy = jest.spyOn(combobox, 'reportValidity');

            element.showHelpMessageIfInvalid();
            expect(spy).toHaveBeenCalled();
        });

        // Depends on scopes
        it('UpdateScope', () => {
            element.scopes = scopes;

            return Promise.resolve()
                .then(() => {
                    const scopeCombobox = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-combobox-scopes"]'
                    );
                    expect(scopeCombobox.value).toBe('all');

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
        it('Actionclick', () => {
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

        it('Backactionclick', () => {
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

        it('Blur', () => {
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

        it('Focus', () => {
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

        it('Levelchange', () => {
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

        it('Loadmore', () => {
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

        it('Loadmore with wrong value', () => {
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
                            optionValue: 'hey',
                            searchTerm: 'some research'
                        }
                    })
                );

                expect(handler).toHaveBeenCalled();
                const event = handler.mock.calls[0][0];
                expect(event.detail.option).toEqual(null);
                expect(event.detail.searchTerm).toBe('some research');
                expect(event.bubbles).toBeFalsy();
                expect(event.composed).toBeFalsy();
                expect(event.cancelable).toBeFalsy();
            });
        });

        it('Open', () => {
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

        // Depends on scopes
        it('Scopechange', () => {
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

        it('Search', () => {
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

        it('Change multiselect = true', () => {
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

        it('Change multiselect = false', () => {
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

        it('Change reorder horizontal selection', () => {
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

        it('Close', () => {
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
