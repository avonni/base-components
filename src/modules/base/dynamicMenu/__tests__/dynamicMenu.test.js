import DynamicMenu from 'c/dynamicMenu';
import { createElement } from 'lwc';
import { baseItems, listViewItems } from '../__docs__/data';

// not tested menuLength because of offsetHeight in the DOM

let element;
describe('Dynamic Menu', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        jest.clearAllTimers();
        window.requestAnimationFrame.mockRestore();
    });

    beforeEach(() => {
        element = createElement('base-dynamic-menu', {
            is: DynamicMenu
        });
        jest.useFakeTimers();
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
            setTimeout(() => cb(), 0);
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.accessKey).toBeUndefined();
            expect(element.allowSearch).toBeFalsy();
            expect(element.alternativeText).toBeUndefined();
            expect(element.buttonSize).toBe('auto');
            expect(element.disabled).toBeFalsy();
            expect(element.groupOrder).toBe('');
            expect(element.hideCheckMark).toBeFalsy();
            expect(element.iconName).toBeUndefined();
            expect(element.iconSize).toBe('medium');
            expect(element.iconPosition).toBe('left');
            expect(element.isLoading).toBeFalsy();
            expect(element.items).toMatchObject([]);
            expect(element.label).toBeUndefined();
            expect(element.loadingStateAlternativeText).toBe('Loading...');
            expect(element.menuAlignment).toBe('left');
            expect(element.menuLength).toBe('7-items');
            expect(element.menuWidth).toBe('small');
            expect(element.nubbin).toBeFalsy();
            expect(element.searchInputPlaceholder).toBe('Search…');
            expect(element.title).toBeUndefined();
            expect(element.tooltip).toBeUndefined();
            expect(element.value).toBeUndefined();
            expect(element.variant).toBe('border');
        });

        describe('Access Key', () => {
            it('Without label', () => {
                element.accessKey = 'K';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-icon"]'
                    );
                    expect(button.accessKey).toBe('K');
                });
            });

            it('With label', () => {
                element.label = 'label';
                element.accessKey = 'K';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.accessKey).toBe('K');
                });
            });
        });

        describe('Allow Search', () => {
            it('Passed to the component', () => {
                element.allowSearch = true;
                element.label = 'label';

                return Promise.resolve()
                    .then(() => {
                        element.click();
                    })
                    .then(() => {
                        const searchInput = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-input"]'
                        );
                        expect(searchInput).toBeTruthy();
                        expect(searchInput.type).toBe('search');
                    });
            });
        });

        describe('Alternative Text', () => {
            it('without label', () => {
                element.alternativeText = 'This is an alternative text';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-icon"]'
                    );
                    expect(button.alternativeText).toBe(
                        'This is an alternative text'
                    );
                });
            });
        });

        // Depends on label
        describe('Button Size', () => {
            it('Auto', () => {
                element.label = 'Some label';
                element.buttonSize = 'auto';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList).not.toContain(
                        'slds-button_stretch'
                    );
                    expect(element.classList).not.toContain(
                        'slds-button_stretch'
                    );
                });
            });

            it('Stretch', () => {
                element.label = 'Some label';
                element.buttonSize = 'stretch';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.stretch).toBeTruthy();
                    expect(element.classList).toContain('slds-button_stretch');
                });
            });
        });

        describe('Disabled', () => {
            it('Without label', () => {
                element.disabled = true;

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-icon"]'
                    );
                    expect(button.disabled).toBeTruthy();
                });
            });

            it('With label', () => {
                element.label = 'label';
                element.disabled = true;

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.disabled).toBeTruthy();
                });
            });
        });

        describe('Group Order', () => {
            it('Without label', () => {
                element.groupOrder = 'first';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-icon"]'
                    );
                    expect(button.groupOrder).toBe('first');
                });
            });

            it('With label', () => {
                element.label = 'label';
                element.groupOrder = 'first';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.groupOrder).toBe('first');
                });
            });
        });

        describe('Hide Check Mark', () => {
            it('hide check mark false', () => {
                element.items = baseItems;
                element.value = 'acme';
                element.label = 'hide check mark false';

                return Promise.resolve()
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="button"]'
                        );
                        button.click();
                    })
                    .then(() => {
                        const checkMark = element.shadowRoot.querySelector(
                            '[data-element-id="check-mark"]'
                        );
                        expect(checkMark).toBeTruthy();
                    });
            });

            it('hide check mark true', () => {
                element.items = baseItems;
                element.value = 'acme';
                element.hideCheckMark = true;
                element.click();

                return Promise.resolve().then(() => {
                    const checkMark = element.shadowRoot.querySelector(
                        '[data-element-id="check-mark"]'
                    );
                    expect(checkMark).toBeFalsy();
                });
            });
        });

        describe('Icon Name', () => {
            it('Without label', () => {
                element.iconName = 'utility:close';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-icon"]'
                    );
                    expect(button.iconName).toBe('utility:close');
                });
            });

            it('With label', () => {
                element.label = 'Label';
                element.iconName = 'utility:close';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.iconName).toBe('utility:close');
                });
            });
        });

        // depends on label
        describe('Icon Position', () => {
            it('Left', () => {
                element.iconName = 'utility:add';
                element.label = 'label';
                element.iconPosition = 'left';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.iconPosition).toBe('left');
                });
            });

            it('Right', () => {
                element.iconName = 'utility:add';
                element.label = 'label';
                element.iconPosition = 'right';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.iconPosition).toBe('right');
                });
            });
        });

        describe('Icon Size', () => {
            it('Without label', () => {
                element.iconName = 'utility:add';
                element.iconSize = 'small';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-icon"]'
                    );
                    expect(button.iconName).toBe('utility:add');
                    expect(button.size).toBe('small');
                });
            });

            it('With label', () => {
                element.label = 'label';
                element.iconName = 'utility:add';
                element.iconSize = 'small';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.iconName).toBe('utility:add');
                    expect(button.iconSize).toBe('small');
                });
            });
        });

        describe('Is Loading', () => {
            it('Passed to the component', () => {
                element.isLoading = true;
                element.label = 'label';

                return Promise.resolve()
                    .then(() => {
                        element.click();
                    })
                    .then(() => {
                        const spinner = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-spinner"]'
                        );
                        expect(spinner).toBeTruthy();
                    });
            });
        });

        describe('Items', () => {
            it('Passed to the component', () => {
                element.items = listViewItems;

                return Promise.resolve().then(() => {
                    listViewItems.forEach((item, index) => {
                        const correspondingItem = listViewItems[index];
                        expect(correspondingItem).toBeTruthy();
                        expect(item.avatar).toBe(correspondingItem.avatar);
                        expect(item.actions).toBe(correspondingItem.actions);
                        expect(item.id).toBe(correspondingItem.id);
                        expect(item.label).toBe(correspondingItem.label);
                        expect(item.meta).toBe(correspondingItem.meta);
                        expect(item.value).toBe(correspondingItem.value);
                        expect(item.disabled).toBe(correspondingItem.disabled);
                    });
                });
            });
        });

        describe('Disabled Item', () => {
            it('Renders disabled item', () => {
                element.label = 'label';
                element.items = listViewItems;

                return Promise.resolve()
                    .then(() => {
                        element.click();
                    })
                    .then(() => {
                        const items = element.shadowRoot.querySelectorAll(
                            '[data-element-id="item"]'
                        );
                        items.forEach((item) => {
                            let expectedClass =
                                'avonni-dynamic-menu__item_min-height avonni-dynamic-menu__item_color-background';
                            if (item.getAttribute('aria-disabled') === 'true') {
                                expectedClass +=
                                    ' avonni-dynamic-menu__option_disabled';
                            }
                            expect(item.className).toEqual(expectedClass);
                        });
                    });
            });
        });

        describe('Label', () => {
            it('Passed to the component', () => {
                element.label = 'This is a label';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.label).toBe('This is a label');
                });
            });
        });

        describe('Loading State Alternative Text', () => {
            it('Passed to the component', () => {
                element.isLoading = true;
                element.loadingStateAlternativeText = 'This is a loading text';
                element.label = 'label';

                return Promise.resolve()
                    .then(() => {
                        element.click();
                    })
                    .then(() => {
                        const spinner = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-spinner"]'
                        );
                        expect(spinner.alternativeText).toBe(
                            'This is a loading text'
                        );
                    });
            });
        });

        // depends on nubbin
        describe('Menu Alignment', () => {
            it('Left', () => {
                element.nubbin = true;
                element.label = 'label';

                return Promise.resolve()
                    .then(() => {
                        element.click();
                    })
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="dropdown"]'
                        );
                        expect(dropdown.className).toContain(
                            'slds-dropdown_left slds-nubbin_top-left'
                        );
                    });
            });

            it('Right', () => {
                element.menuAlignment = 'right';
                element.nubbin = true;
                element.label = 'label';

                return Promise.resolve()
                    .then(() => {
                        element.click();
                    })
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="dropdown"]'
                        );
                        expect(dropdown.className).toContain(
                            'slds-dropdown_right slds-nubbin_top-right'
                        );
                    });
            });

            it('Center', () => {
                element.menuAlignment = 'center';
                element.nubbin = true;
                element.label = 'label';

                return Promise.resolve()
                    .then(() => {
                        element.click();
                    })
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="dropdown"]'
                        );
                        expect(dropdown.className).toContain(
                            'slds-dropdown_center slds-nubbin_top'
                        );
                    });
            });

            it('Bottom-left', () => {
                element.menuAlignment = 'bottom-left';
                element.nubbin = true;
                element.label = 'label';

                return Promise.resolve()
                    .then(() => {
                        element.click();
                    })
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="dropdown"]'
                        );
                        expect(dropdown.className).toContain(
                            'slds-dropdown_bottom slds-dropdown_left slds-dropdown_bottom-left slds-nubbin_bottom-left'
                        );
                    });
            });

            it('Bottom-right', () => {
                element.menuAlignment = 'bottom-right';
                element.nubbin = true;
                element.label = 'label';

                return Promise.resolve()
                    .then(() => {
                        element.click();
                    })
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="dropdown"]'
                        );
                        expect(dropdown.className).toContain(
                            'slds-dropdown_bottom slds-dropdown_right slds-dropdown_bottom-right slds-nubbin_bottom-right'
                        );
                    });
            });

            it('Bottom-center', () => {
                element.menuAlignment = 'bottom-center';
                element.nubbin = true;
                element.label = 'label';

                return Promise.resolve()
                    .then(() => {
                        element.click();
                    })
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="dropdown"]'
                        );
                        expect(dropdown.className).toContain(
                            'slds-dropdown_bottom slds-nubbin_bottom'
                        );
                    });
            });

            it('Without nubbin left', () => {
                element.label = 'label';

                return Promise.resolve()
                    .then(() => {
                        element.click();
                    })
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="dropdown"]'
                        );
                        expect(dropdown.className).toContain(
                            'slds-dropdown_left'
                        );
                    });
            });

            it('Without nubbin right', () => {
                element.menuAlignment = 'right';
                element.label = 'label';

                return Promise.resolve()
                    .then(() => {
                        element.click();
                    })
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="dropdown"]'
                        );
                        expect(dropdown.className).toContain(
                            'slds-dropdown_right'
                        );
                    });
            });

            it('Without nubbin center', () => {
                element.menuAlignment = 'center';
                element.label = 'label';

                return Promise.resolve()
                    .then(() => {
                        element.click();
                    })
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="dropdown"]'
                        );
                        expect(dropdown.className).toContain(
                            'slds-dropdown_center'
                        );
                    });
            });

            it('Without nubbin bottom-left', () => {
                element.menuAlignment = 'bottom-left';
                element.label = 'label';

                return Promise.resolve()
                    .then(() => {
                        element.click();
                    })
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="dropdown"]'
                        );
                        expect(dropdown.className).toContain(
                            'slds-dropdown_bottom slds-dropdown_left slds-dropdown_bottom-left'
                        );
                    });
            });

            it('Without nubbin bottom-right', () => {
                element.menuAlignment = 'bottom-right';
                element.label = 'label';

                return Promise.resolve()
                    .then(() => {
                        element.click();
                    })
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="dropdown"]'
                        );
                        expect(dropdown.className).toContain(
                            'slds-dropdown_bottom slds-dropdown_right slds-dropdown_bottom-right'
                        );
                    });
            });

            it('Without nubbin bottom-center', () => {
                element.menuAlignment = 'bottom-center';
                element.label = 'label';

                return Promise.resolve()
                    .then(() => {
                        element.click();
                    })
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="dropdown"]'
                        );
                        expect(dropdown.className).toContain(
                            'slds-dropdown_bottom'
                        );
                    });
            });
        });

        describe('Menu Length', () => {
            it('5 items', () => {
                element.items = baseItems;
                element.menuLength = '5-items';
                element.label = 'label';

                return Promise.resolve()
                    .then(() => {
                        element.click();
                    })
                    .then(() => {
                        const items = element.shadowRoot.querySelectorAll(
                            '[data-element-id="item"]'
                        );
                        expect(items.length).toBe(3);
                    });
            });

            it('10 items', () => {
                element.items = baseItems;
                element.menuLength = '10-items';
                element.label = 'label';

                return Promise.resolve()
                    .then(() => {
                        element.click();
                    })
                    .then(() => {
                        const items = element.shadowRoot.querySelectorAll(
                            '[data-element-id="item"]'
                        );
                        expect(items.length).toBe(3);
                    });
            });
        });

        describe('Menu Width', () => {
            it('Xx-small', () => {
                element.menuWidth = 'xx-small';
                element.label = 'label';

                return Promise.resolve()
                    .then(() => {
                        element.click();
                    })
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="dropdown"]'
                        );
                        expect(dropdown.className).toContain(
                            'slds-dropdown_xx-small'
                        );
                    });
            });

            it('X-small', () => {
                element.menuWidth = 'x-small';
                element.label = 'label';

                return Promise.resolve()
                    .then(() => {
                        element.click();
                    })
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="dropdown"]'
                        );
                        expect(dropdown.className).toContain(
                            'slds-dropdown_x-small'
                        );
                    });
            });

            it('Small', () => {
                element.menuWidth = 'small';
                element.label = 'label';

                return Promise.resolve()
                    .then(() => {
                        element.click();
                    })
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="dropdown"]'
                        );
                        expect(dropdown.className).toContain(
                            'slds-dropdown_small'
                        );
                    });
            });

            it('Medium', () => {
                element.menuWidth = 'medium';
                element.label = 'label';

                return Promise.resolve()
                    .then(() => {
                        element.click();
                    })
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="dropdown"]'
                        );
                        expect(dropdown.className).toContain(
                            'slds-dropdown_medium'
                        );
                    });
            });

            it('Large', () => {
                element.menuWidth = 'large';
                element.label = 'label';

                return Promise.resolve()
                    .then(() => {
                        element.click();
                    })
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="dropdown"]'
                        );
                        expect(dropdown.className).toContain(
                            'slds-dropdown_large'
                        );
                    });
            });
        });

        describe('Search Input Placeholder', () => {
            it('Passed to the component', () => {
                element.allowSearch = true;
                element.searchInputPlaceholder =
                    'This is a search input placeholder';
                element.label = 'label';

                return Promise.resolve()
                    .then(() => {
                        element.click();
                    })
                    .then(() => {
                        const searchInput = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-input"]'
                        );
                        expect(searchInput).toBeTruthy();
                        expect(searchInput.placeholder).toBe(
                            'This is a search input placeholder'
                        );
                    });
            });
        });

        describe('Title', () => {
            it('Without label', () => {
                element.title = 'This is a title text';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-icon"]'
                    );
                    expect(button.title).toBe('This is a title text');
                });
            });

            it('With label', () => {
                element.label = 'label';
                element.title = 'This is a title text';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.title).toBe('This is a title text');
                });
            });
        });

        describe('Tooltip', () => {
            it('tooltip without label', () => {
                element.tooltip = 'This is a tooltip text';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-icon"]'
                    );
                    expect(button.tooltip).toBe('This is a tooltip text');
                });
            });
        });

        describe('Value', () => {
            it('Passed to the component', () => {
                element.items = baseItems;
                element.value = 'acme';
                element.label = 'label';

                return Promise.resolve()
                    .then(() => {
                        element.click();
                    })
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="dropdown"]'
                        );
                        expect(dropdown).toBeTruthy();
                        const checkMark = element.shadowRoot.querySelector(
                            '[data-element-id="check-mark"]'
                        );
                        expect(checkMark).toBeTruthy();
                        const items = element.shadowRoot.querySelectorAll(
                            '[data-element-id="item"]'
                        );
                        expect(items[0].ariaChecked).toBeTruthy();
                    });
            });
        });

        describe('Variant', () => {
            it('bare without label', () => {
                element.variant = 'bare';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-icon"]'
                    );
                    expect(button.variant).toBe('bare');
                });
            });

            it('bare with label', () => {
                element.variant = 'bare';
                element.label = 'Some label';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.variant).toBe('bare');
                });
            });

            it('reset with label', () => {
                element.variant = 'reset';
                element.label = 'Some label';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.variant).toBe('bare');
                });
            });
        });
    });

    describe('Methods', () => {
        describe('Blur', () => {
            it('blur with label', () => {
                element.items = baseItems;
                element.label = 'label';

                return Promise.resolve()
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="button"]'
                        );
                        button.click();
                        jest.runAllTimers();
                        expect(element.classList).toContain('slds-is-open');
                    })
                    .then(() => {
                        // Focus is now on the dropdown
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="dropdown"]'
                        );
                        dropdown.dispatchEvent(new CustomEvent('focusout'));
                        jest.runAllTimers();
                        expect(element.classList).not.toContain('slds-is-open');
                    });
            });
        });

        describe('Click', () => {
            it('click with label', () => {
                let clickEvent = false;
                element.label = 'label';
                element.addEventListener('click', () => {
                    clickEvent = true;
                });
                return Promise.resolve().then(() => {
                    element.click();
                    expect(clickEvent).toBeTruthy();
                    expect(element.classList).toContain('slds-is-open');
                });
            });
        });

        describe('Focus', () => {
            it('focus without label', () => {
                let focusEvent = false;

                element.addEventListener('focus', () => {
                    focusEvent = true;
                });

                element.focus();

                return Promise.resolve().then(() => {
                    expect(focusEvent).toBeTruthy();
                });
            });

            it('focus with label', () => {
                let focusEvent = false;
                element.label = 'label';

                element.addEventListener('focus', () => {
                    focusEvent = true;
                });

                return Promise.resolve().then(() => {
                    element.focus();
                    expect(focusEvent).toBeTruthy();
                });
            });
        });
    });

    describe('Events', () => {
        describe('Action Click', () => {
            it('action click', () => {
                const handler = jest.fn();
                element.addEventListener('actionclick', handler);

                return Promise.resolve().then(() => {
                    element.dispatchEvent(
                        new CustomEvent('actionclick', {
                            detail: {
                                name: 'action-name'
                            }
                        })
                    );
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.name).toBe(
                        'action-name'
                    );
                    expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                });
            });
        });

        describe('Item Selection', () => {
            it('select item', () => {
                element.items = baseItems;
                element.label = 'label';

                const handler = jest.fn();
                element.addEventListener('select', handler);

                return Promise.resolve()
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="button"]'
                        );
                        button.click();
                    })
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="dropdown"]'
                        );
                        expect(dropdown).toBeTruthy();
                        const item = element.shadowRoot.querySelector(
                            '[data-element-id="item"]'
                        );
                        item.click();
                        expect(handler).toHaveBeenCalled();
                        expect(handler.mock.calls[0][0].detail.value).toBe(
                            'acme'
                        );
                        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                        expect(handler.mock.calls[0][0].composed).toBeFalsy();
                        expect(
                            handler.mock.calls[0][0].cancelable
                        ).toBeTruthy();
                    });
            });
        });

        describe('Open', () => {
            it('open', () => {
                element.label = 'label';
                const handler = jest.fn();
                element.addEventListener('open', handler);

                return Promise.resolve().then(() => {
                    element.click();

                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                });
            });
        });

        describe('Close', () => {
            it('close after close', () => {
                element.items = baseItems;
                element.label = 'label';

                const handler = jest.fn();
                element.addEventListener('close', handler);

                return Promise.resolve()
                    .then(() => {
                        element.click();
                    })
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="dropdown"]'
                        );
                        expect(dropdown).toBeTruthy();
                        const item = element.shadowRoot.querySelector(
                            '[data-element-id="item"]'
                        );
                        item.click();

                        expect(handler).toHaveBeenCalled();
                        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                        expect(handler.mock.calls[0][0].composed).toBeFalsy();
                    });
            });
        });
    });

    describe('Keyboard Accessibility', () => {
        describe('Focused menu item changes using arrow keys', () => {
            it('Arrow Down', () => {
                element.items = baseItems;
                element.label = 'label';

                return Promise.resolve()
                    .then(() => {
                        element.click();
                    })
                    .then(() => {
                        const items = element.shadowRoot.querySelectorAll(
                            '[data-element-id="item"]'
                        );
                        expect(items.length).toBe(3);
                        const activeItem = items[0];
                        activeItem.focus();
                        const nextItem = items[1];
                        const spy = jest.spyOn(nextItem, 'focus');
                        activeItem.dispatchEvent(
                            new KeyboardEvent('keydown', {
                                key: 'ArrowDown'
                            })
                        );
                        expect(spy).toHaveBeenCalled();
                    });
            });

            it('Arrow Left', () => {
                element.items = baseItems;
                element.label = 'label';

                return Promise.resolve()
                    .then(() => {
                        element.click();
                    })
                    .then(() => {
                        const items = element.shadowRoot.querySelectorAll(
                            '[data-element-id="item"]'
                        );
                        expect(items.length).toBe(3);
                        const activeItem = items[1];
                        activeItem.focus();
                        const previousItem = items[0];
                        const spy = jest.spyOn(previousItem, 'focus');
                        activeItem.dispatchEvent(
                            new KeyboardEvent('keydown', {
                                key: 'ArrowLeft'
                            })
                        );
                        expect(spy).toHaveBeenCalled();
                    });
            });

            it('Arrow Right', () => {
                element.items = baseItems;
                element.label = 'label';

                return Promise.resolve()
                    .then(() => {
                        element.click();
                    })
                    .then(() => {
                        const items = element.shadowRoot.querySelectorAll(
                            '[data-element-id="item"]'
                        );
                        expect(items.length).toBe(3);
                        const activeItem = items[0];
                        activeItem.focus();
                        const nextItem = items[1];
                        const spy = jest.spyOn(nextItem, 'focus');
                        activeItem.dispatchEvent(
                            new KeyboardEvent('keydown', {
                                key: 'ArrowRight'
                            })
                        );
                        expect(spy).toHaveBeenCalled();
                    });
            });

            it('Arrow Up', () => {
                element.items = baseItems;
                element.label = 'label';

                return Promise.resolve()
                    .then(() => {
                        element.click();
                    })
                    .then(() => {
                        const items = element.shadowRoot.querySelectorAll(
                            '[data-element-id="item"]'
                        );
                        expect(items.length).toBe(3);
                        const activeItem = items[1];
                        activeItem.focus();
                        const previousItem = items[0];
                        const spy = jest.spyOn(previousItem, 'focus');
                        activeItem.dispatchEvent(
                            new KeyboardEvent('keydown', {
                                key: 'ArrowUp'
                            })
                        );
                        expect(spy).toHaveBeenCalled();
                    });
            });
        });
        describe('Select menu item', () => {
            it('Enter', () => {
                element.items = baseItems;
                element.label = 'label';

                const handler = jest.fn();
                element.addEventListener('select', handler);

                return Promise.resolve()
                    .then(() => {
                        element.click();
                    })
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="dropdown"]'
                        );
                        expect(dropdown).toBeTruthy();
                        const items = element.shadowRoot.querySelectorAll(
                            '[data-element-id="item"]'
                        );
                        expect(items.length).toBe(3);
                        const activeItem = items[1];
                        activeItem.focus();
                        activeItem.dispatchEvent(
                            new KeyboardEvent('keydown', {
                                key: 'Enter'
                            })
                        );

                        expect(handler).toHaveBeenCalled();
                        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                        expect(
                            handler.mock.calls[0][0].cancelable
                        ).toBeTruthy();
                        expect(handler.mock.calls[0][0].composed).toBeFalsy();
                    });
            });

            it('Space', () => {
                element.items = baseItems;
                element.label = 'label';

                const handler = jest.fn();
                element.addEventListener('select', handler);

                return Promise.resolve()
                    .then(() => {
                        element.click();
                    })
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="dropdown"]'
                        );
                        expect(dropdown).toBeTruthy();
                        const items = element.shadowRoot.querySelectorAll(
                            '[data-element-id="item"]'
                        );
                        expect(items.length).toBe(3);
                        const activeItem = items[1];
                        activeItem.focus();
                        activeItem.dispatchEvent(
                            new KeyboardEvent('keydown', {
                                key: ' '
                            })
                        );

                        expect(handler).toHaveBeenCalled();
                        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                        expect(
                            handler.mock.calls[0][0].cancelable
                        ).toBeTruthy();
                        expect(handler.mock.calls[0][0].composed).toBeFalsy();
                    });
            });
        });
    });
});
