import IconPicker from 'c/iconPicker';
import { AutoPosition } from 'c/positionLibrary';
import { createElement } from 'lwc';

let element;
describe('IconPicker', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        window.requestAnimationFrame.mockRestore();
    });

    beforeEach(() => {
        element = createElement('avonni-builder-icon-picker', {
            is: IconPicker
        });
        document.body.appendChild(element);
        jest.useFakeTimers();
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
            setTimeout(() => cb(), 0);
        });
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.accessKey).toBeUndefined();
            expect(element.cancelButtonLabel).toBe('Cancel');
            expect(element.clearButtonAlternativeText).toBe('Clear');
            expect(element.disabled).toBeFalsy();
            expect(element.doneButtonLabel).toBe('Done');
            expect(element.fieldLevelHelp).toBeUndefined();
            expect(element.hiddenCategories).toEqual([]);
            expect(element.hideClearIcon).toBeFalsy();
            expect(element.hideInputText).toBeFalsy();
            expect(element.label).toBeUndefined();
            expect(element.menuIconSize).toBe('medium');
            expect(element.menuLabel).toBeUndefined();
            expect(element.menuVariant).toBe('border');
            expect(element.messageWhenBadInput).toBe(
                'Please ensure the value is correct.'
            );
            expect(element.name).toBeUndefined();
            expect(element.readOnly).toBeFalsy();
            expect(element.required).toBeFalsy();
            expect(element.requiredAlternativeText).toBe('Required');
            expect(element.searchInputPlaceholder).toBe(
                'Type icon name to search'
            );
            expect(element.value).toBeUndefined();
            expect(element.variant).toBe('standard');
        });

        describe('Access key', () => {
            it('Passed to the component', () => {
                element.accessKey = 'y';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-toggle-menu"]'
                    );
                    expect(button.accessKey).toBe('y');
                });
            });
        });

        describe('Cancel button label', () => {
            it('Passed to the component', () => {
                element.cancelButtonLabel = 'Cancel label';

                return Promise.resolve()
                    .then(() => {
                        element.shadowRoot
                            .querySelector(
                                '[data-element-id="button-toggle-menu"]'
                            )
                            .click();
                    })
                    .then(() => {
                        const cancelButton = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button-cancel"]'
                        );
                        expect(cancelButton.label).toBe('Cancel label');
                    });
            });
        });

        describe('Disabled', () => {
            it('Passed to the component', () => {
                element.disabled = true;

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-toggle-menu"]'
                    );
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="input"]'
                    );
                    expect(button.disabled).toBeTruthy();
                    expect(input.disabled).toBeTruthy();
                });
            });
        });

        describe('Done button label', () => {
            it('Passed to the component', () => {
                element.doneButtonLabel = 'Done label';

                return Promise.resolve()
                    .then(() => {
                        element.shadowRoot
                            .querySelector(
                                '[data-element-id="button-toggle-menu"]'
                            )
                            .click();
                    })
                    .then(() => {
                        const doneButton = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button-done"]'
                        );
                        expect(doneButton.label).toBe('Done label');
                    });
            });
        });

        describe('Field-level-help', () => {
            it('Passed to the component', () => {
                element.fieldLevelHelp = 'Help text';

                return Promise.resolve().then(() => {
                    const helptext = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-helptext"]'
                    );
                    expect(helptext).not.toBeNull();
                });
            });
        });

        describe('Hide clear icon', () => {
            it('Passed to the component when false', () => {
                element.hideClearIcon = false;
                element.clearButtonAlternativeText = 'Cleared';
                element.value = 'standard:apps';

                return Promise.resolve().then(() => {
                    const clearButton = element.shadowRoot.querySelector(
                        '[data-element-id="button-clear"]'
                    );
                    expect(clearButton).toBeTruthy();
                    expect(clearButton.title).toBe('Cleared');
                });
            });
            it('Passed to the component when true', () => {
                element.hideClearIcon = true;
                element.value = 'standard:apps';

                return Promise.resolve().then(() => {
                    const clearButton = element.shadowRoot.querySelector(
                        '[data-element-id="button-clear"]'
                    );
                    expect(clearButton).toBeFalsy();
                });
            });
        });

        describe('Hide input text', () => {
            it('Passed to the component', () => {
                element.hideInputText = true;

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="input"]'
                    );
                    expect(input).toBeNull();
                });
            });
        });

        describe('Label', () => {
            it('Passed to the component', () => {
                element.label = 'Icon label';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '[data-element-id="label-main"]'
                    );
                    expect(label.textContent).toBe('Icon label');
                });
            });
        });

        describe('Menu icon size', () => {
            it('Xx-small', () => {
                element.menuIconSize = 'xx-small';

                return Promise.resolve()
                    .then(() => {
                        // Allow passing through invalid icon first.
                        element.value = 'standard:all';
                    })
                    .then(() => {
                        const icon = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-icon-menu"]'
                        );
                        expect(icon.size).toBe('xx-small');
                    });
            });

            it('X-small', () => {
                element.menuIconSize = 'x-small';

                return Promise.resolve()
                    .then(() => {
                        // Allow passing through invalid icon first.
                        element.value = 'standard:all';
                    })
                    .then(() => {
                        const icon = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-icon-menu"]'
                        );
                        expect(icon.size).toBe('xx-small');
                    });
            });

            it('Small', () => {
                element.menuIconSize = 'small';

                return Promise.resolve()
                    .then(() => {
                        // Allow passing through invalid icon first.
                        element.value = 'standard:all';
                    })
                    .then(() => {
                        const icon = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-icon-menu"]'
                        );
                        expect(icon.size).toBe('x-small');
                    });
            });

            it('Large', () => {
                element.menuIconSize = 'large';

                return Promise.resolve()
                    .then(() => {
                        // Allow passing through invalid icon first.
                        element.value = 'standard:all';
                    })
                    .then(() => {
                        const icon = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-icon-menu"]'
                        );
                        expect(icon.size).toBe('small');
                    });
            });

            it('Small action icon scaling class', () => {
                element.value = 'action:add_file';
                element.menuIconSize = 'xx-small';

                return Promise.resolve().then(() => {
                    const container = element.shadowRoot.querySelector(
                        '[data-element-id="button-icon-menu-container"]'
                    );
                    expect(container.classList).toContain(
                        'avonni-icon-picker__action-icon_small-scaling'
                    );
                });
            });

            it('Medium action icon scaling class', () => {
                element.value = 'action:add_file';
                element.menuIconSize = 'medium';

                return Promise.resolve().then(() => {
                    const container = element.shadowRoot.querySelector(
                        '[data-element-id="button-icon-menu-container"]'
                    );
                    expect(container.classList).toContain(
                        'avonni-icon-picker__action-icon_medium-scaling'
                    );
                });
            });

            it('Large action icon large scaling class', () => {
                element.value = 'action:add_file';
                element.menuIconSize = 'large';

                return Promise.resolve().then(() => {
                    const container = element.shadowRoot.querySelector(
                        '[data-element-id="button-icon-menu-container"]'
                    );
                    expect(container.classList).toContain(
                        'avonni-icon-picker__action-icon_large-scaling'
                    );
                });
            });
        });

        describe('Menu label', () => {
            it('Passed to the component', () => {
                element.menuLabel = 'Button label';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '[data-element-id="label-menu"]'
                    );
                    expect(label.textContent).toBe('Button label');
                });
            });
        });

        describe('Menu variant', () => {
            it('Bare', () => {
                element.menuVariant = 'bare';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-toggle-menu"]'
                    );
                    expect(button.className).toContain('slds-button_icon-bare');
                });
            });

            it('Bare inverse', () => {
                element.menuVariant = 'bare-inverse';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-toggle-menu"]'
                    );
                    expect(button.className).toContain('slds-button_icon-bare');
                    expect(button.className).toContain(
                        'slds-button_icon-inverse'
                    );
                });
            });

            it('Border', () => {
                element.menuVariant = 'border';
                element.menuLabel = 'Label';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-toggle-menu"]'
                    );
                    expect(button.className).toContain('slds-button_neutral');
                });
            });

            it('Border inverse', () => {
                element.menuVariant = 'border-inverse';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-toggle-menu"]'
                    );
                    expect(button.className).toContain(
                        'slds-button_icon-border-inverse'
                    );
                });
            });

            it('Border filled', () => {
                element.menuVariant = 'border-filled';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-toggle-menu"]'
                    );
                    expect(button.className).toContain(
                        'slds-button_icon-border-filled'
                    );
                });
            });

            it('Container', () => {
                element.menuVariant = 'container';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-toggle-menu"]'
                    );
                    expect(button.className).toContain(
                        'slds-button_icon-container-more'
                    );
                });
            });
        });

        describe('Message when bad input', () => {
            it('Passed to the component', () => {
                element.messageWhenBadInput = 'Error message';
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="input"]'
                );

                return Promise.resolve()
                    .then(() => {
                        input.value = 'standard:accou';
                        input.dispatchEvent(new CustomEvent('input'));
                        input.dispatchEvent(new CustomEvent('blur'));
                    })
                    .then(() => {
                        const errorElement = element.shadowRoot.querySelector(
                            '.avonni-builder-icon-picker-form-error'
                        );
                        expect(errorElement.textContent).toBe('Error message');
                    });
            });
        });

        describe('Name', () => {
            it('Passed to the component', () => {
                element.name = 'Input name';

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="input"]'
                    );
                    expect(input.name).toBe('Input name');
                });
            });
        });

        describe('Placeholder', () => {
            it('Passed to the component', () => {
                element.placeholder = 'Placeholder text';

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="input"]'
                    );
                    expect(input.placeholder).toBe('Placeholder text');
                });
            });
        });

        describe('Read-only', () => {
            it('Passed to the component', () => {
                element.readOnly = true;

                return Promise.resolve().then(() => {
                    const readOnlyElement = element.shadowRoot.querySelector(
                        '.avonni-builder-icon-picker-read-only-input'
                    );
                    expect(readOnlyElement).not.toBeNull();
                });
            });
        });

        describe('Required', () => {
            it('Passed to the component', () => {
                element.required = true;
                element.requiredAlternativeText = 'Required text';

                return Promise.resolve().then(() => {
                    const abbr = element.shadowRoot.querySelector(
                        '[data-element-id="abbr"]'
                    );
                    expect(abbr.textContent).toBe('*');
                    expect(abbr.title).toBe('Required text');
                });
            });
        });

        describe('Search input placeholder', () => {
            it('Passed to the component', () => {
                element.searchInputPlaceholder = 'Search placeholder';

                return Promise.resolve()
                    .then(() => {
                        element.shadowRoot
                            .querySelector(
                                '[data-element-id="button-toggle-menu"]'
                            )
                            .click();
                    })
                    .then(() => {
                        const searchInput = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-input"]'
                        );
                        expect(searchInput.placeholder).toBe(
                            'Search placeholder'
                        );
                    });
            });
        });

        describe('Variant', () => {
            it('Label-inline', () => {
                element.variant = 'label-inline';

                return Promise.resolve().then(() => {
                    const container = element.shadowRoot.querySelector(
                        '[data-element-id="div-wrapper"]'
                    );
                    expect(container.className).toBe(
                        'avonni-builder-icon-picker-label-inline'
                    );
                });
            });

            it('Label-hidden', () => {
                element.variant = 'label-hidden';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '[data-element-id="label-main"]'
                    );
                    expect(label.classList).toContain('slds-assistive-text');
                });
            });

            it('Label-stacked', () => {
                element.variant = 'label-stacked';

                return Promise.resolve().then(() => {
                    const container = element.shadowRoot.querySelector(
                        '[data-element-id="div-wrapper"]'
                    );
                    expect(container.className).toContain(
                        'slds-form-element_stacked'
                    );
                });
            });
        });
    });

    describe('Tabs', () => {
        it('Initial tabs on no hidden categories', () => {
            return Promise.resolve()
                .then(() => {
                    element.shadowRoot
                        .querySelector('[data-element-id="button-toggle-menu"]')
                        .click();
                })
                .then(() => {
                    const tabs = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-builder-tab-bar"]'
                    );
                    expect(tabs.labels).toEqual([
                        'Standard',
                        'Custom',
                        'Utility',
                        'Doctype',
                        'Action'
                    ]);
                    expect(tabs.tabsHidden).toBe(3);
                });
        });

        it('Initial tabs on 1 hidden category', () => {
            element.hiddenCategories = ['Doctype'];

            return Promise.resolve()
                .then(() => {
                    element.shadowRoot
                        .querySelector('[data-element-id="button-toggle-menu"]')
                        .click();
                })
                .then(() => {
                    const tabs = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-builder-tab-bar"]'
                    );
                    expect(tabs.labels).toEqual([
                        'Standard',
                        'Custom',
                        'Utility',
                        'Action'
                    ]);
                    expect(tabs.tabsHidden).toBe(2);
                });
        });

        it('Initial tabs on 2 hidden categories', () => {
            element.hiddenCategories = ['Standard', 'Custom'];

            return Promise.resolve()
                .then(() => {
                    element.shadowRoot
                        .querySelector('[data-element-id="button-toggle-menu"]')
                        .click();
                })
                .then(() => {
                    const tabs = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-builder-tab-bar"]'
                    );
                    expect(tabs.labels).toEqual([
                        'Utility',
                        'Doctype',
                        'Action'
                    ]);
                    expect(tabs.tabsHidden).toBe(1);
                });
        });

        it('Initial tabs on 3 hidden categories', () => {
            element.hiddenCategories = ['Utility', 'Custom', 'Standard'];

            return Promise.resolve()
                .then(() => {
                    element.shadowRoot
                        .querySelector('[data-element-id="button-toggle-menu"]')
                        .click();
                })
                .then(() => {
                    const tabs = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-builder-tab-bar"]'
                    );
                    expect(tabs.labels).toEqual(['Doctype', 'Action']);
                    expect(tabs.tabsHidden).toBe(0);
                });
        });

        it('Initial tabs on 4 hidden categories', () => {
            element.hiddenCategories = [
                'Standard',
                'Custom',
                'Doctype',
                'Action'
            ];

            return Promise.resolve()
                .then(() => {
                    element.shadowRoot
                        .querySelector('[data-element-id="button-toggle-menu"]')
                        .click();
                })
                .then(() => {
                    const tabs = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-builder-tab-bar"]'
                    );
                    expect(tabs.labels).toEqual(['Utility']);
                    expect(tabs.tabsHidden).toBe(0);
                });
        });

        it('Initial tabs on 5 hidden categories', () => {
            element.hiddenCategories = [
                'Standard',
                'Custom',
                'Utility',
                'Doctype',
                'Action'
            ];

            return Promise.resolve()
                .then(() => {
                    element.shadowRoot
                        .querySelector('[data-element-id="button-toggle-menu"]')
                        .click();
                })
                .then(() => {
                    const tabs = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-builder-tab-bar"]'
                    );
                    expect(tabs.labels).toEqual(['Standard']);
                    expect(tabs.tabsHidden).toBe(0);
                });
        });

        it('Initial tabs on incorrect hidden categories', () => {
            element.hiddenCategories = [
                'Standard',
                'Custom',
                'UtilityError',
                'DoctypeError',
                'Action'
            ];

            return Promise.resolve()
                .then(() => {
                    element.shadowRoot
                        .querySelector('[data-element-id="button-toggle-menu"]')
                        .click();
                })
                .then(() => {
                    const tabs = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-builder-tab-bar"]'
                    );
                    expect(tabs.labels).toEqual(['Utility', 'Doctype']);
                    expect(tabs.tabsHidden).toBe(0);
                });
        });

        it('Recovered tab when input has category and value', () => {
            element.value = 'utility:add';

            return Promise.resolve()
                .then(() => {
                    element.shadowRoot
                        .querySelector('[data-element-id="button-toggle-menu"]')
                        .click();
                })
                .then(() => {
                    const tabs = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-builder-tab-bar"]'
                    );
                    expect(tabs.defaultTab).toBe('Utility');
                });
        });

        it('Recovered tab when input only has category', () => {
            element.value = 'utility';

            return Promise.resolve()
                .then(() => {
                    element.shadowRoot
                        .querySelector('[data-element-id="button-toggle-menu"]')
                        .click();
                })
                .then(() => {
                    const tabs = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-builder-tab-bar"]'
                    );
                    expect(tabs.defaultTab).toBe('Utility');
                });
        });

        it('Recovered tab when input category does not exist', () => {
            element.value = 'util';

            return Promise.resolve()
                .then(() => {
                    element.shadowRoot
                        .querySelector('[data-element-id="button-toggle-menu"]')
                        .click();
                })
                .then(() => {
                    const tabs = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-builder-tab-bar"]'
                    );
                    expect(tabs.defaultTab).toBe('Standard');
                });
        });

        it('Standard tab contains standard icons', () => {
            element.value = 'standard:all';

            return Promise.resolve()
                .then(() => {
                    element.shadowRoot
                        .querySelector('[data-element-id="button-toggle-menu"]')
                        .click();
                })
                .then(() => {
                    const firstStandardIcon =
                        element.shadowRoot.querySelectorAll(
                            '.slds-icon_container'
                        )[1].lastChild.title;
                    expect(firstStandardIcon).toBe('standard:account_info');
                });
        });

        it('Custom tab contains custom icons', () => {
            element.value = 'custom:custom54';

            return Promise.resolve()
                .then(() => {
                    element.shadowRoot
                        .querySelector('[data-element-id="button-toggle-menu"]')
                        .click();
                })
                .then(() => {
                    const firstCustomIcon = element.shadowRoot.querySelectorAll(
                        '.slds-icon_container'
                    )[1].lastChild.title;
                    expect(firstCustomIcon).toBe('custom:custom1');
                });
        });

        it('Utility tab contains utility icons', () => {
            element.value = 'utility:add';

            return Promise.resolve()
                .then(() => {
                    element.shadowRoot
                        .querySelector('[data-element-id="button-toggle-menu"]')
                        .click();
                })
                .then(() => {
                    const firstUtilityIcon =
                        element.shadowRoot.querySelectorAll(
                            '.slds-icon_container'
                        )[1].lastChild.title;
                    expect(firstUtilityIcon).toBe('utility:activity');
                });
        });

        it('Doctype tab contains doctype icons', () => {
            element.value = 'doctype:html';

            return Promise.resolve()
                .then(() => {
                    element.shadowRoot
                        .querySelector('[data-element-id="button-toggle-menu"]')
                        .click();
                })
                .then(() => {
                    const firstDoctypeIcon =
                        element.shadowRoot.querySelectorAll(
                            '.slds-icon_container'
                        )[1].lastChild.title;
                    expect(firstDoctypeIcon).toBe('doctype:ai');
                });
        });

        it('Action tab contains action icons', () => {
            element.value = 'action:add_photo_video';

            return Promise.resolve()
                .then(() => {
                    element.shadowRoot
                        .querySelector('[data-element-id="button-toggle-menu"]')
                        .click();
                })
                .then(() => {
                    const firstActionIcon = element.shadowRoot.querySelectorAll(
                        '.slds-icon_container'
                    )[1].lastChild.title;
                    expect(firstActionIcon).toBe('action:add_contact');
                });
        });

        it('Tab change', () => {
            return Promise.resolve()
                .then(() => {
                    element.shadowRoot
                        .querySelector('[data-element-id="button-toggle-menu"]')
                        .click();
                })
                .then(() => {
                    const tabBar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-builder-tab-bar"]'
                    );
                    tabBar.dispatchEvent(
                        new CustomEvent('select', {
                            detail: { value: 'Custom' }
                        })
                    );
                })
                .then(() => {
                    jest.runAllTimers();
                    const icons = element.shadowRoot.querySelectorAll(
                        '[data-element-id="lightning-icon-color"]'
                    );
                    expect(icons[5].iconName.startsWith('custom')).toBeTruthy();
                });
        });
    });

    describe('Error message', () => {
        it('Error message when input icon is invalid', () => {
            element.messageWhenBadInput = 'error';
            const input = element.shadowRoot.querySelector(
                '[data-element-id="input"]'
            );

            return Promise.resolve()
                .then(() => {
                    input.value = 'standard:acc';
                    input.dispatchEvent(new CustomEvent('input'));
                    input.dispatchEvent(new CustomEvent('blur'));
                })
                .then(() => {
                    const errorElement = element.shadowRoot.querySelector(
                        '.avonni-builder-icon-picker-form-error'
                    );
                    expect(errorElement).not.toBeNull();
                });
        });

        it('No error message when input icon is valid', () => {
            element.messageWhenBadInput = 'error';
            const input = element.shadowRoot.querySelector(
                '[data-element-id="input"]'
            );

            return Promise.resolve()
                .then(() => {
                    input.value = 'standard:account';
                    input.dispatchEvent(new CustomEvent('input'));
                    input.dispatchEvent(new CustomEvent('blur'));
                })
                .then(() => {
                    const errorElement = element.shadowRoot.querySelector(
                        '.avonni-builder-icon-picker-form-error'
                    );
                    expect(errorElement).toBeNull();
                });
        });

        it('Error message when input icon is empty and required', () => {
            element.value = 'standard:account';
            element.messageWhenBadInput = 'error';
            element.required = true;

            return Promise.resolve()
                .then(() => {
                    element.shadowRoot
                        .querySelector('.avonni-builder-icon-picker-clear-icon')
                        .click();
                })
                .then(() => {
                    const errorElement = element.shadowRoot.querySelector(
                        '.avonni-builder-icon-picker-form-error'
                    );
                    expect(errorElement).not.toBeNull();
                });
        });

        it('No error message when input icon is empty and not required', () => {
            element.value = 'standard:account';
            element.messageWhenBadInput = 'error';

            return Promise.resolve()
                .then(() => {
                    element.shadowRoot
                        .querySelector('.avonni-builder-icon-picker-clear-icon')
                        .click();
                })
                .then(() => {
                    const errorElement = element.shadowRoot.querySelector(
                        '.avonni-builder-icon-picker-form-error'
                    );
                    expect(errorElement).toBeNull();
                });
        });

        it('Change to invalid icon using input', () => {
            const handler = jest.fn();
            element.addEventListener('change', handler);

            return Promise.resolve()
                .then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="input"]'
                    );
                    input.value = 'utility:invalid_icon';
                    input.dispatchEvent(new CustomEvent('input'));
                    input.dispatchEvent(new CustomEvent('blur'));
                })
                .then(() => {
                    expect(handler).not.toHaveBeenCalled();

                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="input"]'
                    );
                    input.value = 'utility:delete';
                    input.dispatchEvent(new CustomEvent('input'));
                    input.dispatchEvent(new CustomEvent('blur'));
                })
                .then(() => {
                    expect(handler).toHaveBeenCalledTimes(1);
                    expect(handler.mock.calls[0][0].detail.value).toBe(
                        'utility:delete'
                    );
                });
        });
    });

    describe('Public methods', () => {
        it('Input element focused when component focused', () => {
            return Promise.resolve()
                .then(() => {
                    // exterior call of focus() method
                    element.focus();
                })
                .then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="input"]'
                    );
                    expect(element.shadowRoot.activeElement).toEqual(input);
                });
        });

        it('Input element not focused when input does not exist', () => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="input"]'
            );
            return Promise.resolve()
                .then(() => {
                    // input is no longer present in DOM
                    input.remove();
                })
                .then(() => {
                    // exterior call of focus() method
                    element.focus();
                })
                .then(() => {
                    expect(element.shadowRoot.activeElement).not.toEqual(input);
                });
        });
    });

    describe('Icon selection', () => {
        it('Value changes after icon selection and done button click', () => {
            element.value = 'standard:account';

            return Promise.resolve()
                .then(() => {
                    element.shadowRoot
                        .querySelector('[data-element-id="button-toggle-menu"]')
                        .click();
                })
                .then(() => {
                    // Click on second icon
                    element.shadowRoot
                        .querySelectorAll(
                            '[data-element-id="lightning-icon-color"]'
                        )[1]
                        .click();
                })
                .then(() => {
                    // Click on "Done" button
                    element.shadowRoot
                        .querySelector(
                            '[data-element-id="lightning-button-done"]'
                        )
                        .click();
                })
                .then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon-menu"]'
                    );
                    expect(icon.iconName).toBe('standard:account_score');
                    expect(element.value).toBe('standard:account_score');
                });
        });

        it('Value does not change after icon selection and cancel button click', () => {
            element.value = 'standard:account';

            return Promise.resolve()
                .then(() => {
                    element.shadowRoot
                        .querySelector('[data-element-id="button-toggle-menu"]')
                        .click();
                })
                .then(() => {
                    // Click on second icon
                    element.shadowRoot
                        .querySelectorAll(
                            '[data-element-id="lightning-icon-color"]'
                        )[1]
                        .click();
                })
                .then(() => {
                    // Click on "Cancel" button
                    element.shadowRoot
                        .querySelector(
                            '[data-element-id="lightning-button-cancel"]'
                        )
                        .click();
                })
                .then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon-menu"]'
                    );
                    expect(icon.iconName).toBe('standard:account');
                    expect(element.value).toBe('standard:account');
                });
        });

        it('Value does not change after icon selection and menu button click', () => {
            element.value = 'standard:account';

            return Promise.resolve()
                .then(() => {
                    element.shadowRoot
                        .querySelector('[data-element-id="button-toggle-menu"]')
                        .click();
                })
                .then(() => {
                    // Click on second icon
                    element.shadowRoot
                        .querySelectorAll(
                            '[data-element-id="lightning-icon-color"]'
                        )[1]
                        .click();
                })
                .then(() => {
                    element.shadowRoot
                        .querySelector('[data-element-id="button-toggle-menu"]')
                        .click();
                })
                .then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon-menu"]'
                    );
                    expect(icon.iconName).toBe('standard:account');
                    expect(element.value).toBe('standard:account');
                });
        });

        it('Change icon using input', () => {
            const handler = jest.fn();
            element.addEventListener('change', handler);

            return Promise.resolve()
                .then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="input"]'
                    );
                    input.value = 'standard:user';
                    input.dispatchEvent(new CustomEvent('input'));
                    input.dispatchEvent(new CustomEvent('blur'));
                })
                .then(() => {
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.value).toBe(
                        'standard:user'
                    );
                });
        });

        it('Change icon using keyboard in popover', () => {
            const handler = jest.fn();
            element.addEventListener('change', handler);

            return Promise.resolve()
                .then(() => {
                    element.shadowRoot
                        .querySelector('[data-element-id="button-toggle-menu"]')
                        .click();
                })
                .then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="a-color"]'
                    );
                    icon.dispatchEvent(
                        new KeyboardEvent('keydown', { key: 'Enter' })
                    );
                })
                .then(() => {
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.value).toBe(
                        'standard:account_info'
                    );
                });
        });

        it('Invalid keyboard key for icon change in popover', () => {
            const handler = jest.fn();
            element.addEventListener('change', handler);

            return Promise.resolve()
                .then(() => {
                    element.shadowRoot
                        .querySelector('[data-element-id="button-toggle-menu"]')
                        .click();
                })
                .then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="a-color"]'
                    );
                    icon.dispatchEvent(
                        new KeyboardEvent('keydown', { key: 'abc' })
                    );
                })
                .then(() => {
                    expect(handler).not.toHaveBeenCalled();
                });
        });
    });

    describe('Search input', () => {
        it('Narrow search', () => {
            return Promise.resolve()
                .then(() => {
                    element.shadowRoot
                        .querySelector('[data-element-id="button-toggle-menu"]')
                        .click();
                })
                .then(() => {
                    const searchInput = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input"]'
                    );
                    searchInput.dispatchEvent(
                        new CustomEvent('change', {
                            detail: { value: 'quip_' }
                        })
                    );
                })
                .then(() => {
                    const icons = element.shadowRoot.querySelectorAll(
                        '[data-element-id="lightning-icon-color"]'
                    );
                    expect(icons).toHaveLength(4);
                });
        });

        it('Retrieve icons after search', () => {
            return Promise.resolve()
                .then(() => {
                    element.shadowRoot
                        .querySelector('[data-element-id="button-toggle-menu"]')
                        .click();
                })
                .then(() => {
                    const searchInput = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input"]'
                    );
                    searchInput.dispatchEvent(
                        new CustomEvent('change', {
                            detail: { value: 'quip_' }
                        })
                    );
                })
                .then(() => {
                    const searchInput = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input"]'
                    );
                    searchInput.dispatchEvent(
                        new CustomEvent('change', { detail: { value: '' } })
                    );
                })
                .then(() => {
                    const icons = element.shadowRoot.querySelectorAll(
                        '[data-element-id="lightning-icon-color"]'
                    );
                    expect(icons).toHaveLength(78);
                });
        });
    });

    describe('Popover behavior', () => {
        it('Popover is positioned automatically', () => {
            element.shadowRoot
                .querySelector('[data-element-id="button-toggle-menu"]')
                .click();
            jest.runAllTimers();

            expect(AutoPosition.prototype.start).toHaveBeenCalled();
            return Promise.resolve().then(() => {
                element.shadowRoot
                    .querySelector('[data-element-id="button-toggle-menu"]')
                    .click();

                jest.runAllTimers();
                expect(AutoPosition.prototype.stop).toHaveBeenCalled();
            });
        });

        it('Close popover on outside click', () => {
            return Promise.resolve()
                .then(() => {
                    element.shadowRoot
                        .querySelector('[data-element-id="button-toggle-menu"]')
                        .click();
                    jest.runAllTimers();
                })
                .then(() => {
                    const searchInput = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input"]'
                    );
                    expect(searchInput).toBeTruthy();
                    searchInput.dispatchEvent(
                        new CustomEvent('focusout', { bubbles: true })
                    );
                    jest.runAllTimers();
                })
                .then(() => {
                    const searchInput = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input"]'
                    );
                    expect(searchInput).toBeFalsy();
                });
        });

        it('Do not close popover on inside click', () => {
            return Promise.resolve()
                .then(() => {
                    element.shadowRoot
                        .querySelector('[data-element-id="button-toggle-menu"]')
                        .click();
                    jest.runAllTimers();
                })
                .then(() => {
                    const searchInput = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input"]'
                    );
                    const tabBar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-builder-tab-bar"]'
                    );
                    searchInput.dispatchEvent(
                        new CustomEvent('focusout', { bubbles: true })
                    );
                    tabBar.dispatchEvent(
                        new CustomEvent('focusin', { bubbles: true })
                    );

                    jest.runAllTimers();
                })
                .then(() => {
                    const searchInput = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input"]'
                    );
                    expect(searchInput).toBeTruthy();
                });
        });

        it('Close popover using menu button', () => {
            return Promise.resolve()
                .then(() => {
                    element.dispatchEvent(new CustomEvent('mousedown'));
                    element.shadowRoot
                        .querySelector('[data-element-id="button-toggle-menu"]')
                        .click();
                    element.dispatchEvent(new CustomEvent('click'));
                })
                .then(() => {
                    element.dispatchEvent(new CustomEvent('mousedown'));
                    element.shadowRoot
                        .querySelector('[data-element-id="button-toggle-menu"]')
                        .click();
                    element.dispatchEvent(new CustomEvent('click'));
                })
                .then(() => {
                    const popoverElement = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input"]'
                    );
                    expect(popoverElement).toBeNull();
                });
        });

        it('Trap focus when pressing Tab from Done button', () => {
            return Promise.resolve()
                .then(() => {
                    element.shadowRoot
                        .querySelector('[data-element-id="button-toggle-menu"]')
                        .click();
                })
                .then(() => {
                    const popover = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input"]'
                    ).parentElement;
                    popover.dispatchEvent(
                        new KeyboardEvent('keydown', { key: 'Tab' })
                    );
                })
                .then(() => {
                    const doneButton = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-done"]'
                    );
                    doneButton.dispatchEvent(new CustomEvent('blur'));
                })
                .then(() => {
                    const popover = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input"]'
                    ).parentElement;
                    popover.dispatchEvent(
                        new KeyboardEvent('keyup', { key: 'Tab' })
                    );
                })
                .then(() => {
                    const popoverElement = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input"]'
                    );
                    expect(popoverElement).not.toBeNull();
                });
        });

        it('Trap focus when pressing Shift+Tab from first input', () => {
            return Promise.resolve()
                .then(() => {
                    element.shadowRoot
                        .querySelector('[data-element-id="button-toggle-menu"]')
                        .click();
                })
                .then(() => {
                    const popover = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input"]'
                    ).parentElement;
                    popover.dispatchEvent(
                        new KeyboardEvent('keydown', { key: 'Shift' })
                    );
                    popover.dispatchEvent(
                        new KeyboardEvent('keydown', { key: 'Tab' })
                    );
                })
                .then(() => {
                    const searchInput = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input"]'
                    );
                    searchInput.dispatchEvent(new CustomEvent('blur'));
                })
                .then(() => {
                    const popover = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input"]'
                    ).parentElement;
                    popover.dispatchEvent(
                        new KeyboardEvent('keyup', { key: 'Tab' })
                    );
                    popover.dispatchEvent(
                        new KeyboardEvent('keyup', { key: 'Shift' })
                    );
                })
                .then(() => {
                    const popoverElement = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input"]'
                    );
                    expect(popoverElement).not.toBeNull();
                });
        });

        it('Close popover when pressing ESC key', () => {
            return Promise.resolve()
                .then(() => {
                    element.shadowRoot
                        .querySelector('[data-element-id="button-toggle-menu"]')
                        .click();
                })
                .then(() => {
                    const popover = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input"]'
                    ).parentElement;
                    popover.dispatchEvent(
                        new KeyboardEvent('keydown', { key: 'Escape' })
                    );
                })
                .then(() => {
                    const popoverElement = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input"]'
                    );
                    expect(popoverElement).toBeNull();
                });
        });
    });
});
