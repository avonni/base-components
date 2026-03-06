import { deepCopy } from 'c/utils';
import { createElement } from 'lwc';
import Action from '../action';
import Option from '../option';
import PrimitiveCombobox from '../primitiveCombobox';
import * as SCROLL_UTILS from '../scrollUtils';
import {
    actions,
    bottomActions,
    groups,
    options,
    searchActions,
    topActions
} from './data';

// Not tested:
// auto positionning
// setCustomValidity()
// dropdownHeight, because depends on DOM measurements (offsetHeight)
// Event handler triggered by the keyboard
// Automatic load more based on scroll position
// Anything that depends on getting the <li> elements from the primitive groups via optionElements():
//   * backAction
//   * isMultiSelect
//   * option click
//   * option mouse enter
//   * removeSelectedOptions
//   * change event
//   * resetLevel method

let element;
describe('Primitive Combobox', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        jest.restoreAllMocks();
        jest.runAllTimers();
    });

    beforeEach(() => {
        element = createElement('base-primitive-combobox', {
            is: PrimitiveCombobox
        });
        document.body.appendChild(element);
        jest.useFakeTimers();
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
            expect(element.groups).toMatchObject([{ name: 'ungrouped' }]);
            expect(element.hideOptionsUntilSearch).toBeFalsy();
            expect(element.isLoading).toBeFalsy();
            expect(element.isMultiSelect).toBeFalsy();
            expect(element.keepOpenOnSelect).toBeFalsy();
            expect(element.label).toBeUndefined();
            expect(element.loadMoreOffset).toBe(20);
            expect(element.loadingStateAlternativeText).toBe('Loading...');
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
            expect(element.search).toBeInstanceOf(Function);
            expect(element.hideClearIcon).toBeFalsy();
            expect(element.validity).toMatchObject({});
            expect(element.value).toMatchObject([]);
            expect(element.variant).toBe('standard');
        });

        describe('Actions', () => {
            it('Default', () => {
                element.actions = actions;

                return Promise.resolve()
                    .then(() => {
                        element.open();
                    })
                    .then(() => {
                        element.actions.forEach((action) => {
                            expect(action).toBeInstanceOf(Action);
                        });

                        // Top actions
                        const topActionElements =
                            element.shadowRoot.querySelectorAll(
                                '[data-element-id="li-top-action"]'
                            );
                        expect(topActionElements).toHaveLength(
                            topActions.length
                        );
                        topActionElements.forEach((actionElement, index) => {
                            expect(actionElement.dataset.name).toBe(
                                topActions[index].name
                            );
                            const label = actionElement.querySelector(
                                '[data-element-id="span-top-action-label"]'
                            );
                            expect(label.textContent).toBe(
                                topActions[index].label
                            );
                        });

                        // Bottom actions
                        const bottomActionElements =
                            element.shadowRoot.querySelectorAll(
                                '[data-element-id="li-bottom-action"]'
                            );
                        expect(bottomActionElements).toHaveLength(
                            bottomActions.length
                        );
                        bottomActionElements.forEach((actionElement, index) => {
                            expect(actionElement.dataset.name).toBe(
                                bottomActions[index].name
                            );
                            const label = actionElement.querySelector(
                                '.slds-listbox__option-text'
                            );
                            expect(label.textContent).toBe(
                                bottomActions[index].label
                            );
                        });
                    });
            });

            it('Disabled', () => {
                element.actions = actions;

                return Promise.resolve()
                    .then(() => {
                        element.open();
                    })
                    .then(() => {
                        // Top actions
                        const topActionElements =
                            element.shadowRoot.querySelectorAll(
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
                        const bottomActionElements =
                            element.shadowRoot.querySelectorAll(
                                '[data-element-id="li-bottom-action"]'
                            );
                        expect(bottomActionElements[0].classList).toContain(
                            'avonni-primitive-combobox__action_disabled'
                        );
                        expect(bottomActionElements[0].ariaDisabled).toBe(
                            'true'
                        );
                        [1, 2].forEach((index) => {
                            const action = bottomActionElements[index];
                            expect(action.classList).not.toContain(
                                'avonni-primitive-combobox__action_disabled'
                            );
                            expect(action.ariaDisabled).toBe('false');
                        });
                    });
            });

            it('Icons', () => {
                element.actions = actions;

                return Promise.resolve()
                    .then(() => {
                        element.open();
                    })
                    .then(() => {
                        // Top actions
                        const topActionElements =
                            element.shadowRoot.querySelectorAll(
                                '[data-element-id="li-top-action"]'
                            );
                        [1, 2].forEach((index) => {
                            const action = topActionElements[index];
                            const icon = action.querySelector(
                                '[data-element-id="lightning-icon-top-action"]'
                            );
                            expect(icon).toBeTruthy();
                            expect(icon.iconName).toBe(
                                topActions[index].iconName
                            );
                        });

                        // Bottom actions
                        const bottomActionElements =
                            element.shadowRoot.querySelectorAll(
                                '[data-element-id="li-bottom-action"]'
                            );
                        const icon = bottomActionElements[1].querySelector(
                            '[data-element-id="lightning-icon-bottom-action"]'
                        );
                        expect(icon).toBeTruthy();
                        expect(icon.iconName).toBe(bottomActions[1].iconName);
                    });
            });

            it('Display On Search', () => {
                element.allowSearch = true;
                element.actions = searchActions;
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="input"]'
                );

                return Promise.resolve()
                    .then(() => {
                        element.open();
                    })
                    .then(() => {
                        const topActionElements =
                            element.shadowRoot.querySelectorAll(
                                '[data-element-id="li-top-action"]'
                            );
                        expect(topActionElements[0].classList).toContain(
                            'avonni-primitive-combobox__action_fixed'
                        );
                        expect(topActionElements[0].classList).toContain(
                            'slds-hide'
                        );
                        expect(topActionElements[1].classList).toContain(
                            'avonni-primitive-combobox__action_fixed'
                        );
                        expect(topActionElements[1].classList).toContain(
                            'slds-hide'
                        );
                    })
                    .then(() => {
                        input.value = 'test';
                        input.dispatchEvent(new CustomEvent('input'));
                        jest.runAllTimers();
                        const topActionElements =
                            element.shadowRoot.querySelectorAll(
                                '[data-element-id="li-top-action"]'
                            );
                        expect(topActionElements[0].classList).toContain(
                            'avonni-primitive-combobox__action_fixed'
                        );
                        expect(topActionElements[0].classList).toContain(
                            'slds-hide'
                        );
                        expect(topActionElements[1].classList).toContain(
                            'avonni-primitive-combobox__action_fixed'
                        );
                        expect(topActionElements[1].classList).toContain(
                            'slds-hide'
                        );
                    });
            });

            it('Display When No Results', () => {
                const handler = jest.fn();
                element.addEventListener('search', handler);
                element.options = options;
                element.allowSearch = true;
                element.actions = searchActions;
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="input"]'
                );

                return Promise.resolve()
                    .then(() => {
                        input.value = 'Some search term';
                        input.dispatchEvent(new CustomEvent('input'));
                        jest.runAllTimers();
                    })
                    .then(() => {
                        element.open();
                    })
                    .then(() => {
                        const topActionElements =
                            element.shadowRoot.querySelectorAll(
                                '[data-element-id="li-top-action"]'
                            );
                        expect(topActionElements[0].classList).not.toContain(
                            'slds-hide'
                        );
                        expect(topActionElements[0].textContent).toBe(
                            'Action 1'
                        );
                        expect(topActionElements[1].classList).not.toContain(
                            'slds-hide'
                        );
                        expect(topActionElements[1].textContent).toBe(
                            'Action 2 "Some search term"'
                        );
                    });
            });

            it('Fixed', () => {
                const fixedActions = deepCopy(actions);
                fixedActions[1].fixed = true;
                fixedActions[2].fixed = true;
                element.actions = fixedActions;

                return Promise.resolve()
                    .then(() => {
                        element.open();
                    })
                    .then(() => {
                        // Top actions
                        const topActionElements =
                            element.shadowRoot.querySelectorAll(
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
                        const bottomActionElements =
                            element.shadowRoot.querySelectorAll(
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
        });

        describe('Allow Search', () => {
            it('False', () => {
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

            it('True', () => {
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

            it('default placeholder', () => {
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
        });

        describe('Disabled', () => {
            // Depends on open() and options
            it('False', () => {
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
                        const dropdownTrigger =
                            element.shadowRoot.querySelector(
                                '.combobox__dropdown-trigger'
                            );
                        expect(dropdownTrigger.classList).toContain(
                            'slds-is-open'
                        );
                    });
            });

            it('True', () => {
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
                        const dropdownTrigger =
                            element.shadowRoot.querySelector(
                                '.combobox__dropdown-trigger'
                            );
                        expect(dropdownTrigger.classList).not.toContain(
                            'slds-is-open'
                        );
                    });
            });
        });

        describe('Dropdown Alignment', () => {
            it('Left', () => {
                element.dropdownAlignment = 'left';
                element.options = options;

                return Promise.resolve()
                    .then(() => {
                        element.open();
                    })
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="div-dropdown"]'
                        );
                        expect(dropdown.classList).toContain(
                            'slds-dropdown_left'
                        );
                        expect(dropdown.classList).not.toContain(
                            'slds-dropdown_center'
                        );
                        expect(dropdown.classList).not.toContain(
                            'slds-dropdown_right'
                        );
                        expect(dropdown.classList).not.toContain(
                            'slds-dropdown_bottom'
                        );
                        expect(dropdown.classList).not.toContain(
                            'slds-dropdown_bottom-right'
                        );
                        expect(dropdown.classList).not.toContain(
                            'slds-dropdown_bottom-left'
                        );
                    });
            });

            it('Auto', () => {
                element.dropdownAlignment = 'auto';
                element.options = options;

                return Promise.resolve()
                    .then(() => {
                        element.open();
                    })
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="div-dropdown"]'
                        );
                        expect(dropdown.classList).toContain(
                            'slds-dropdown_left'
                        );
                        expect(dropdown.classList).not.toContain(
                            'slds-dropdown_center'
                        );
                        expect(dropdown.classList).not.toContain(
                            'slds-dropdown_right'
                        );
                        expect(dropdown.classList).not.toContain(
                            'slds-dropdown_bottom'
                        );
                        expect(dropdown.classList).not.toContain(
                            'slds-dropdown_bottom-right'
                        );
                        expect(dropdown.classList).not.toContain(
                            'slds-dropdown_bottom-left'
                        );
                    });
            });

            it('Center', () => {
                element.dropdownAlignment = 'center';
                element.options = options;

                return Promise.resolve()
                    .then(() => {
                        element.open();
                    })
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="div-dropdown"]'
                        );
                        expect(dropdown.classList).not.toContain(
                            'slds-dropdown_left'
                        );
                        expect(dropdown.classList).toContain(
                            'slds-dropdown_center'
                        );
                        expect(dropdown.classList).not.toContain(
                            'slds-dropdown_right'
                        );
                        expect(dropdown.classList).not.toContain(
                            'slds-dropdown_bottom'
                        );
                        expect(dropdown.classList).not.toContain(
                            'slds-dropdown_bottom-right'
                        );
                        expect(dropdown.classList).not.toContain(
                            'slds-dropdown_bottom-left'
                        );
                    });
            });

            it('Right', () => {
                element.dropdownAlignment = 'right';
                element.options = options;

                return Promise.resolve()
                    .then(() => {
                        element.open();
                    })
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="div-dropdown"]'
                        );
                        expect(dropdown.classList).not.toContain(
                            'slds-dropdown_left'
                        );
                        expect(dropdown.classList).not.toContain(
                            'slds-dropdown_center'
                        );
                        expect(dropdown.classList).toContain(
                            'slds-dropdown_right'
                        );
                        expect(dropdown.classList).not.toContain(
                            'slds-dropdown_bottom'
                        );
                        expect(dropdown.classList).not.toContain(
                            'slds-dropdown_bottom-right'
                        );
                        expect(dropdown.classList).not.toContain(
                            'slds-dropdown_bottom-left'
                        );
                    });
            });

            it('Bottom-center', () => {
                element.dropdownAlignment = 'bottom-center';
                element.options = options;

                return Promise.resolve()
                    .then(() => {
                        element.open();
                    })
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="div-dropdown"]'
                        );
                        expect(dropdown.classList).not.toContain(
                            'slds-dropdown_left'
                        );
                        expect(dropdown.classList).not.toContain(
                            'slds-dropdown_center'
                        );
                        expect(dropdown.classList).not.toContain(
                            'slds-dropdown_right'
                        );
                        expect(dropdown.classList).toContain(
                            'slds-dropdown_bottom'
                        );
                        expect(dropdown.classList).not.toContain(
                            'slds-dropdown_bottom-right'
                        );
                        expect(dropdown.classList).not.toContain(
                            'slds-dropdown_bottom-left'
                        );
                    });
            });

            it('Bottom-right', () => {
                element.dropdownAlignment = 'bottom-right';
                element.options = options;

                return Promise.resolve()
                    .then(() => {
                        element.open();
                    })
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="div-dropdown"]'
                        );
                        expect(dropdown.classList).not.toContain(
                            'slds-dropdown_left'
                        );
                        expect(dropdown.classList).not.toContain(
                            'slds-dropdown_center'
                        );
                        expect(dropdown.classList).toContain(
                            'slds-dropdown_right'
                        );
                        expect(dropdown.classList).toContain(
                            'slds-dropdown_bottom'
                        );
                        expect(dropdown.classList).toContain(
                            'slds-dropdown_bottom-right'
                        );
                        expect(dropdown.classList).not.toContain(
                            'slds-dropdown_bottom-left'
                        );
                    });
            });

            it('Bottom-left', () => {
                element.dropdownAlignment = 'bottom-left';
                element.options = options;

                return Promise.resolve()
                    .then(() => {
                        element.open();
                    })
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="div-dropdown"]'
                        );
                        expect(dropdown.classList).toContain(
                            'slds-dropdown_left'
                        );
                        expect(dropdown.classList).not.toContain(
                            'slds-dropdown_center'
                        );
                        expect(dropdown.classList).not.toContain(
                            'slds-dropdown_right'
                        );
                        expect(dropdown.classList).toContain(
                            'slds-dropdown_bottom'
                        );
                        expect(dropdown.classList).not.toContain(
                            'slds-dropdown_bottom-right'
                        );
                        expect(dropdown.classList).toContain(
                            'slds-dropdown_bottom-left'
                        );
                    });
            });
        });

        describe('Enable Infinite Loading', () => {
            it('True', () => {
                element.enableInfiniteLoading = true;
                element.options = options;

                const handler = jest.fn();
                element.addEventListener('loadmore', handler);

                return Promise.resolve()
                    .then(() => {
                        expect(handler).not.toHaveBeenCalled();
                        element.open();
                    })
                    .then(() => {
                        expect(handler).toHaveBeenCalled();
                    });
            });

            it('False', () => {
                element.enableInfiniteLoading = false;
                element.options = options;

                const handler = jest.fn();
                element.addEventListener('loadmore', handler);

                return Promise.resolve()
                    .then(() => {
                        element.open();
                    })
                    .then(() => {
                        expect(handler).not.toHaveBeenCalled();
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
            // Depends on options
            it('Passed to the component', () => {
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
                            return (
                                option.groups &&
                                option.groups.includes(groupName)
                            );
                        });
                        expect(group.options).toHaveLength(groupOptions.length);
                        expect(group.groups).toHaveLength(0);
                    });
                });
            });

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
        });

        describe('Hide Options Until Search', () => {
            // Depends on allow-search
            it('True', () => {
                element.allowSearch = true;
                element.hideOptionsUntilSearch = true;
                element.options = options;

                const dropdownTrigger = element.shadowRoot.querySelector(
                    '[data-element-id="div-dropdown-trigger"]'
                );
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="input"]'
                );

                dropdownTrigger.click();

                return Promise.resolve()
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="div-dropdown"]'
                        );
                        expect(dropdown).toBeNull();
                        input.value = 'test';
                        input.dispatchEvent(new CustomEvent('input'));
                    })
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="div-dropdown"]'
                        );
                        expect(dropdown).toBeTruthy();
                        input.value = '';
                        input.dispatchEvent(new CustomEvent('input'));
                    })
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="div-dropdown"]'
                        );
                        expect(dropdown).toBeNull();
                    });
            });
        });

        describe('Is Loading', () => {
            // Depends on options
            it('False', () => {
                element.options = options;
                element.isLoading = false;

                return Promise.resolve()
                    .then(() => {
                        element.open();
                    })
                    .then(() => {
                        const spinner = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-spinner"]'
                        );
                        expect(spinner).toBeFalsy();
                    });
            });

            it('True', () => {
                element.options = options;
                element.isLoading = true;

                return Promise.resolve()
                    .then(() => {
                        element.open();
                    })
                    .then(() => {
                        const spinner = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-spinner"]'
                        );
                        expect(spinner).toBeTruthy();
                    });
            });

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
        });

        describe('keepOpenOnSelect', () => {
            it('false', () => {
                element.keepOpenOnSelect = false;
                element.options = options;

                return Promise.resolve()
                    .then(() => {
                        element.open();
                    })
                    .then(() => {
                        const comboboxGroup = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-combobox-group"]'
                        );
                        jest.spyOn(
                            comboboxGroup,
                            'optionElements',
                            'get'
                        ).mockReturnValue([
                            {
                                dataset: {
                                    ariaDisabled: 'false',
                                    value: options[0].value
                                }
                            }
                        ]);
                        comboboxGroup.dispatchEvent(
                            new CustomEvent('privateoptionclick', {
                                detail: { value: options[0].value }
                            })
                        );
                    })
                    .then(() => {
                        const comboboxGroup = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-combobox-group"]'
                        );
                        expect(comboboxGroup).toBeFalsy();
                    });
            });

            it('true', () => {
                element.keepOpenOnSelect = true;
                element.options = options;

                return Promise.resolve()
                    .then(() => {
                        element.open();
                    })
                    .then(() => {
                        const comboboxGroup = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-combobox-group"]'
                        );
                        jest.spyOn(
                            comboboxGroup,
                            'optionElements',
                            'get'
                        ).mockReturnValue([
                            {
                                dataset: {
                                    ariaDisabled: 'false',
                                    value: options[0].value
                                }
                            }
                        ]);
                        comboboxGroup.dispatchEvent(
                            new CustomEvent('privateoptionclick', {
                                detail: { value: options[0].value }
                            })
                        );
                    })
                    .then(() => {
                        const comboboxGroup = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-combobox-group"]'
                        );
                        expect(comboboxGroup).toBeTruthy();
                    });
            });
        });

        describe('Label', () => {
            it('Passed to the component', () => {
                element.label = 'A string label';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '[data-element-id="label"]'
                    );
                    expect(label.textContent).toBe('A string label');
                });
            });
        });

        it('loadMoreOffset', () => {
            element.loadMoreOffset = 100;
            element.enableInfiniteLoading = true;
            element.options = options.slice(0, 2);

            const handler = jest.fn();

            return Promise.resolve()
                .then(() => {
                    element.open();
                })
                .then(() => {
                    const list = element.shadowRoot.querySelector(
                        '[data-element-id="ul-listbox"]'
                    );
                    jest.spyOn(list, 'scrollHeight', 'get').mockImplementation(
                        () => 600
                    );
                    jest.spyOn(list, 'clientHeight', 'get').mockImplementation(
                        () => 100
                    );
                    jest.spyOn(list, 'scrollTop', 'get').mockImplementation(
                        () => 399
                    );
                    jest.runAllTimers();
                    element.options = options;
                })
                .then(() => {
                    jest.runAllTimers();
                    const list = element.shadowRoot.querySelector(
                        '[data-element-id="ul-listbox"]'
                    );
                    element.addEventListener('loadmore', handler);
                    list.dispatchEvent(new CustomEvent('scroll'));
                    jest.runAllTimers();
                    expect(handler).not.toHaveBeenCalled();

                    jest.spyOn(list, 'scrollTop', 'get').mockImplementation(
                        () => 400
                    );
                    list.dispatchEvent(new CustomEvent('scroll'));
                    jest.runAllTimers();
                    expect(handler).toHaveBeenCalled();
                });
        });

        describe('Name', () => {
            it('Passed to the component', () => {
                element.name = 'a-string-name';

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="input"]'
                    );
                    expect(input.name).toBe('a-string-name');
                });
            });
        });

        describe('Options', () => {
            it('Passed to the component', () => {
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
        });

        describe('Read Only', () => {
            it('False', () => {
                element.readOnly = false;

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-read-only"]'
                    );
                    expect(input).toBeFalsy();
                });
            });

            it('True', () => {
                element.readOnly = true;

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-read-only"]'
                    );
                    expect(input).toBeTruthy();
                });
            });

            it('True and good value', () => {
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

            it('True and bad value', () => {
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

            it('True and multiselect', () => {
                element.readOnly = true;
                element.isMultiSelect = true;

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-read-only"]'
                    );
                    expect(input).toBeFalsy();
                });
            });
        });

        describe('Required', () => {
            // Depends on label
            it('False', () => {
                element.required = false;
                element.label = 'A string label';

                return Promise.resolve().then(() => {
                    const abbr = element.shadowRoot.querySelector(
                        '[data-element-id="abbr"]'
                    );
                    expect(abbr).toBeFalsy();
                });
            });

            it('True', () => {
                element.required = true;
                element.requiredAlternativeText = 'A string text';
                element.label = 'A string label';

                return Promise.resolve().then(() => {
                    const abbr = element.shadowRoot.querySelector(
                        '[data-element-id="abbr"]'
                    );
                    expect(abbr).toBeTruthy();
                    expect(abbr.title).toBe('A string text');
                });
            });
        });

        describe('Hide Clear Icon', () => {
            it('True', () => {
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

            it('False', () => {
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
        });

        describe('Value', () => {
            // Depends on options and isMultiSelect
            it('Without multiselect', () => {
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

            it('With multiselect', () => {
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
        });

        describe('Validations', () => {
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

            // Depends on isMultiSelect, max and showHelpMessageIfInvalid()
            it('messageWhenRangeOverflow', () => {
                element.messageWhenRangeOverflow = 'Something is wrong';
                element.max = 1;
                element.isMultiSelect = true;
                element.options = options;
                element.value = ['no-avatar-oil-sla', 'no-avatar-united-oil'];

                element.showHelpMessageIfInvalid();

                return Promise.resolve().then(() => {
                    const help = element.shadowRoot.querySelector(
                        '.slds-form-element__help'
                    );
                    expect(help.textContent).toBe('Something is wrong');
                });
            });

            // Depends on isMultiSelect, min and showHelpMessageIfInvalid()
            it('messageWhenRangeUnderflow', () => {
                element.messageWhenRangeUnderflow = 'Something is wrong';
                element.min = 1;
                element.isMultiSelect = true;
                element.options = options;

                element.showHelpMessageIfInvalid();

                return Promise.resolve().then(() => {
                    const help = element.shadowRoot.querySelector(
                        '.slds-form-element__help'
                    );
                    expect(help.textContent).toBe('Something is wrong');
                });
            });

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

            it('Validity', () => {
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
        });

        describe('Variant', () => {
            // Depends on label
            it('Standard', () => {
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
                    expect(label.classList).not.toContain(
                        'slds-assistive-text'
                    );
                });
            });

            it('Label-hidden', () => {
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

            it('Label-inline', () => {
                element.label = 'Some label';
                element.variant = 'label-inline';

                return Promise.resolve().then(() => {
                    expect(element.classList).not.toContain(
                        'slds-form-element_stacked'
                    );
                    expect(element.classList).toContain(
                        'slds-form-element_horizontal'
                    );

                    const label = element.shadowRoot.querySelector(
                        '.slds-form-element__label'
                    );
                    expect(label.classList).not.toContain(
                        'slds-assistive-text'
                    );
                });
            });

            it('Label-stacked', () => {
                element.label = 'Some label';
                element.variant = 'label-stacked';

                return Promise.resolve().then(() => {
                    expect(element.classList).toContain(
                        'slds-form-element_stacked'
                    );
                    expect(element.classList).not.toContain(
                        'slds-form-element_horizontal'
                    );

                    const label = element.shadowRoot.querySelector(
                        '.slds-form-element__label'
                    );
                    expect(label.classList).not.toContain(
                        'slds-assistive-text'
                    );
                });
            });
        });
    });

    describe('Methods', () => {
        it('Blur', () => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="input"]'
            );
            const spy = jest.spyOn(input, 'blur');

            element.blur();
            expect(spy).toHaveBeenCalled();
        });

        // Depends on required
        it('CheckValidity, valid', () => {
            element.required = false;

            return Promise.resolve().then(() => {
                expect(element.checkValidity()).toBeTruthy();
            });
        });

        it('CheckValidity, invalid', () => {
            element.required = true;

            return Promise.resolve().then(() => {
                expect(element.checkValidity()).toBeFalsy();
            });
        });

        // Depends on options
        it('close', () => {
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
                    expect(dropdownTrigger.classList).not.toContain(
                        'slds-is-open'
                    );
                });
        });

        it('Focus', () => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="input"]'
            );
            const spy = jest.spyOn(input, 'focus');

            element.focus();
            expect(spy).toHaveBeenCalled();
        });

        // Depends on options
        it('Open', () => {
            element.options = options;
            element.open();

            return Promise.resolve().then(() => {
                const dropdownTrigger = element.shadowRoot.querySelector(
                    '.combobox__dropdown-trigger'
                );
                expect(dropdownTrigger.classList).toContain('slds-is-open');
            });
        });

        // Depends on value, isMultiSelect and options
        it('RemoveSelectedOption and change event', () => {
            element.value = ['no-avatar-oil-sla', 152];
            element.options = options;
            element.isMultiSelect = true;

            const changeHandler = jest.fn();
            const privateSelectHandler = jest.fn();
            element.addEventListener('change', changeHandler);
            element.addEventListener('privateselect', privateSelectHandler);

            return Promise.resolve().then(() => {
                element.removeSelectedOption('no-avatar-oil-sla');

                expect(changeHandler).toHaveBeenCalled();
                const changeDetail = changeHandler.mock.calls[0][0].detail;
                expect(changeDetail.value).toEqual([152]);
                expect(changeDetail.action).toBe('unselect');
                expect(changeDetail.levelPath).toEqual([3, 1]);
                expect(element.value).toMatchObject([152]);

                expect(privateSelectHandler).toHaveBeenCalled();
                const privateSelectDetail =
                    privateSelectHandler.mock.calls[0][0].detail;
                expect(privateSelectDetail.selectedOptions).toHaveLength(1);
                expect(privateSelectDetail.selectedOptions[0].value).toBe(152);
            });
        });

        // Depends on required
        it('ReportValidity', () => {
            element.required = true;
            element.reportValidity();

            return Promise.resolve().then(() => {
                const help = element.shadowRoot.querySelector(
                    '.slds-form-element__help'
                );
                expect(help).toBeTruthy();
            });
        });

        it('SetCustomValidity', () => {
            const spy = jest.spyOn(element, 'setCustomValidity');

            element.setCustomValidity('Something');
            expect(spy).toHaveBeenCalled();
        });

        // Depends on required
        it('ShowHelpMessageIfInvalid', () => {
            element.required = true;
            element.showHelpMessageIfInvalid();

            return Promise.resolve().then(() => {
                const help = element.shadowRoot.querySelector(
                    '.slds-form-element__help'
                );
                expect(help).toBeTruthy();
            });
        });
    });

    describe('Events', () => {
        it('Actionclick', () => {
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
                expect(handler.mock.calls[0][0].detail.name).toBe(
                    actions[0].name
                );
                expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
            });
        });

        it('Blur, input without value', () => {
            const handler = jest.fn();
            element.addEventListener('blur', handler);
            element.options = options;

            return Promise.resolve().then(() => {
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="input"]'
                );
                input.focus();
                input.blur();

                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
            });
        });

        it('Blur, input with value', () => {
            const handler = jest.fn();
            element.addEventListener('blur', handler);
            element.options = options;
            element.value = [options[0].value];

            return Promise.resolve().then(() => {
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="input"]'
                );
                input.focus();
                input.blur();

                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
                expect(input.value).toBe(options[0].label);
            });
        });

        it('Blur, input with search', () => {
            const handler = jest.fn();
            element.addEventListener('search', handler);
            element.options = options;
            element.allowSearch = true;
            const input = element.shadowRoot.querySelector(
                '[data-element-id="input"]'
            );

            return Promise.resolve().then(() => {
                input.value = 'Test';
                input.dispatchEvent(new CustomEvent('input'));
                jest.runAllTimers();
                input.focus();
                input.blur();
                jest.runAllTimers();
                expect(handler).toHaveBeenCalledTimes(2);
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
                expect(handler.mock.calls[1][0].detail.value).toBe('');
            });
        });

        // Depends on options, showClearInput and value
        it('Change, triggered by clear button', () => {
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

        // Depends on options
        it('Open', () => {
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

        describe('Loadmore', () => {
            it('Triggered on first opening', () => {
                const handler = jest.fn();
                element.addEventListener('loadmore', handler);
                element.options = options;
                element.enableInfiniteLoading = true;

                return Promise.resolve()
                    .then(() => {
                        element.open();
                    })
                    .then(() => {
                        expect(handler).toHaveBeenCalled();
                        const call = handler.mock.calls[0][0];
                        expect(call.detail.optionValue).toBeNull();
                        expect(call.detail.searchTerm).toBe('');
                        expect(call.bubbles).toBeFalsy();
                        expect(call.cancelable).toBeFalsy();
                        expect(call.composed).toBeFalsy();
                    });
            });

            it('Triggered on scroll', () => {
                element.options = options;
                element.enableInfiniteLoading = true;

                return Promise.resolve()
                    .then(() => {
                        element.open();
                        jest.runAllTimers();
                    })
                    .then(() => {
                        const handler = jest.fn();
                        element.addEventListener('loadmore', handler);

                        const list = element.shadowRoot.querySelector(
                            '[data-element-id="ul-listbox"]'
                        );
                        list.dispatchEvent(new CustomEvent('scroll'));
                        expect(handler).toHaveBeenCalledTimes(1);

                        jest.spyOn(
                            SCROLL_UTILS,
                            'computeScroll'
                        ).mockReturnValueOnce({
                            endIndex: options.length + 1
                        });

                        element.options = options.concat([
                            { value: 'newOption' }
                        ]);
                    })
                    .then(() => {
                        const group = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-combobox-group"]'
                        );
                        expect(group.options).toHaveLength(options.length + 1);
                        expect(group.options[options.length].value).toBe(
                            'newOption'
                        );
                    });
            });

            it('Triggered on scroll, with a search term', () => {
                const handler = jest.fn();
                element.addEventListener('loadmore', handler);
                element.options = options;
                element.enableInfiniteLoading = true;

                return Promise.resolve()
                    .then(() => {
                        const input = element.shadowRoot.querySelector(
                            '[data-element-id="input"]'
                        );
                        input.click();
                    })
                    .then(() => {
                        expect(handler).toHaveBeenCalledTimes(1);
                        const input = element.shadowRoot.querySelector(
                            '[data-element-id="input"]'
                        );
                        input.value = 'Bur';
                        input.dispatchEvent(new CustomEvent('input'));
                        jest.runAllTimers();

                        const list = element.shadowRoot.querySelector(
                            '[data-element-id="ul-listbox"]'
                        );
                        list.dispatchEvent(new CustomEvent('scroll'));

                        expect(handler).toHaveBeenCalledTimes(2);
                        const call = handler.mock.calls[1][0];
                        expect(call.detail.optionValue).toBeNull();
                        expect(call.detail.searchTerm).toBe('Bur');
                    });
            });
        });

        it('Privateselect', () => {
            const handler = jest.fn();
            element.addEventListener('privateselect', handler);

            element.isMultiSelect = true;
            element.options = options;
            element.value = [options[0].value];

            expect(handler).toHaveBeenCalledTimes(3);
            const detail = handler.mock.calls[2][0].detail;
            expect(detail.selectedOptions).toHaveLength(1);
            expect(detail.selectedOptions[0]).toBeInstanceOf(Option);
            expect(detail.selectedOptions[0].value).toBe(options[0].value);
        });

        // Depends on options and allowSearch
        it('Search', () => {
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
                jest.runAllTimers();
                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.optionValue).toBeNull();
                expect(handler.mock.calls[0][0].detail.value).toBe(
                    'Some search term'
                );
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
            });
        });

        describe('Private option click', () => {
            it('Has a search term and option clicked has children', () => {
                element.groups = groups;
                element.options = options;
                element.allowSearch = true;
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="input"]'
                );

                input.click();
                const handler = jest.fn();
                element.addEventListener('search', handler);

                return Promise.resolve()
                    .then(() => {
                        input.value = 'Tyr';
                        input.dispatchEvent(new CustomEvent('input'));
                        jest.runAllTimers();
                    })
                    .then(() => {
                        const comboboxGroup = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-combobox-group"]'
                        );
                        jest.spyOn(
                            comboboxGroup,
                            'optionElements',
                            'get'
                        ).mockReturnValue([
                            {
                                dataset: {
                                    ariaDisabled: 'false',
                                    value: options[3].value
                                }
                            }
                        ]);
                        comboboxGroup.dispatchEvent(
                            new CustomEvent('privateoptionclick', {
                                detail: { value: options[3].value }
                            })
                        );
                        jest.runAllTimers();
                    })
                    .then(() => {
                        expect(handler).toHaveBeenCalledTimes(2);
                        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                        expect(handler.mock.calls[0][0].composed).toBeFalsy();
                        expect(handler.mock.calls[1][0].detail.value).toBe('');
                    });
            });

            it('Has a search term and option clicked does not have children', () => {
                element.groups = groups;
                element.options = options;
                element.allowSearch = true;
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="input"]'
                );

                input.click();
                const handler = jest.fn();
                element.addEventListener('search', handler);

                return Promise.resolve()
                    .then(() => {
                        input.value = 'Bur';
                        input.dispatchEvent(new CustomEvent('input'));
                        jest.runAllTimers();
                    })
                    .then(() => {
                        const comboboxGroup = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-combobox-group"]'
                        );
                        jest.spyOn(
                            comboboxGroup,
                            'optionElements',
                            'get'
                        ).mockReturnValue([
                            {
                                dataset: {
                                    ariaDisabled: 'false',
                                    value: options[0].value
                                }
                            }
                        ]);
                        comboboxGroup.dispatchEvent(
                            new CustomEvent('privateoptionclick', {
                                detail: { value: options[0].value }
                            })
                        );
                        jest.runAllTimers();
                    })
                    .then(() => {
                        expect(handler).toHaveBeenCalledTimes(1);
                        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                        expect(handler.mock.calls[0][0].composed).toBeFalsy();
                        expect(handler.mock.calls[0][0].detail.value).toBe(
                            'Bur'
                        );
                    });
            });
        });
    });
});
