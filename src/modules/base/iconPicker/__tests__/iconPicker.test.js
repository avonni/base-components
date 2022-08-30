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
import IconPicker from 'c/iconPicker';

let element;
describe('IconPicker', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('avonni-builder-icon-picker', {
            is: IconPicker
        });
        document.body.appendChild(element);
    });

    /* ----- ATTRIBUTES ----- */

    it('Default attributes', () => {
        expect(element.value).toBeUndefined();
        expect(element.accessKey).toBeUndefined();
        expect(element.fieldLevelHelp).toBeUndefined();
        expect(element.label).toBeUndefined();
        expect(element.name).toBeUndefined();
        expect(element.variant).toBe('standard');
        expect(element.hiddenCategories).toEqual([]);
        expect(element.menuVariant).toBe('border');
        expect(element.menuIconSize).toBe('medium');
        expect(element.menuLabel).toBeUndefined();
        expect(element.messageWhenBadInput).toBe(
            'Please ensure the value is correct.'
        );
        expect(element.disabled).toBeFalsy();
        expect(element.readOnly).toBeFalsy();
        expect(element.required).toBeFalsy();
        expect(element.hideInputText).toBeFalsy();
    });

    it('Label attribute', () => {
        element.label = 'Icon label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '[data-element-id="label-main"]'
            );
            expect(label.textContent).toBe('Icon label');
        });
    });

    it('Field-level-help attribute', () => {
        element.fieldLevelHelp = 'Help text';

        return Promise.resolve().then(() => {
            const helptext = element.shadowRoot.querySelector(
                '[data-element-id="lightning-helptext"]'
            );
            expect(helptext).not.toBeNull();
        });
    });

    it('Name attribute', () => {
        element.name = 'Input name';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="input"]'
            );
            expect(input.name).toBe('Input name');
        });
    });

    it('Access key attribute', () => {
        element.accessKey = 'y';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button-toggle-menu"]'
            );
            expect(button.accessKey).toBe('y');
        });
    });

    it('Menu label attribute', () => {
        element.menuLabel = 'Button label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '[data-element-id="label-menu"]'
            );
            expect(label.textContent).toBe('Button label');
        });
    });

    it('Required attribute', () => {
        element.required = true;

        return Promise.resolve().then(() => {
            const abbr = element.shadowRoot.querySelector(
                '[data-element-id="abbr"]'
            );
            expect(abbr.textContent).toBe('*');
        });
    });

    it('Read-only attribute', () => {
        element.readOnly = true;

        return Promise.resolve().then(() => {
            const readOnlyElement = element.shadowRoot.querySelector(
                '.avonni-builder-icon-picker-read-only-input'
            );
            expect(readOnlyElement).not.toBeNull();
        });
    });

    it('Disabled attribute', () => {
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

    it('Hide input text attribute', () => {
        element.hideInputText = true;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="input"]'
            );
            expect(input).toBeNull();
        });
    });

    it('Placeholder attribute', () => {
        element.placeholder = 'Placeholder text';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="input"]'
            );
            expect(input.placeholder).toBe('Placeholder text');
        });
    });

    it('Message when bad input attribute', () => {
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

    it('Label-inline variant attribute', () => {
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

    it('Label-hidden variant attribute', () => {
        element.variant = 'label-hidden';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '[data-element-id="label-main"]'
            );
            expect(label.classList).toContain('slds-assistive-text');
        });
    });

    it('Label-stacked variant attribute', () => {
        element.variant = 'label-stacked';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            expect(container.className).toContain('slds-form-element_stacked');
        });
    });

    it('Bare menu variant attribute', () => {
        element.menuVariant = 'bare';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button-toggle-menu"]'
            );
            expect(button.className).toContain('slds-button_icon-bare');
        });
    });

    it('Bare inverse menu variant attribute', () => {
        element.menuVariant = 'bare-inverse';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button-toggle-menu"]'
            );
            expect(button.className).toContain('slds-button_icon-bare');
            expect(button.className).toContain('slds-button_icon-inverse');
        });
    });

    it('Border menu variant attribute', () => {
        element.menuVariant = 'border';
        element.menuLabel = 'Label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button-toggle-menu"]'
            );
            expect(button.className).toContain('slds-button_neutral');
        });
    });

    it('Border inverse menu variant attribute', () => {
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

    it('Border filled menu variant attribute', () => {
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

    it('Container menu variant attribute', () => {
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

    it('Xx-small menu icon size attribute', () => {
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

    it('X-small menu icon size attribute', () => {
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

    it('Small menu icon size attribute', () => {
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

    it('Large menu icon size attribute', () => {
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

    it('Small action icon  scaling class', () => {
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

    /* ----- TABS ----- */

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
                expect(tabs.labels).toEqual(['Utility', 'Doctype', 'Action']);
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
        element.hiddenCategories = ['Standard', 'Custom', 'Doctype', 'Action'];

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
                const firstStandardIcon = element.shadowRoot.querySelectorAll(
                    '.slds-icon_container'
                )[1].lastChild.title;
                expect(firstStandardIcon).toBe('standard:account');
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
                const firstUtilityIcon = element.shadowRoot.querySelectorAll(
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
                const firstDoctypeIcon = element.shadowRoot.querySelectorAll(
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
        jest.useFakeTimers();

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
                    new CustomEvent('select', { detail: { value: 'Custom' } })
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

    /* ----- ERROR MESSAGE ----- */

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
        element.value = 'standard:account';

        const handler = jest.fn();
        element.addEventListener('change', handler);

        return Promise.resolve()
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="input"]'
                );
                input.dispatchEvent(
                    new CustomEvent('input', {
                        target: { value: 'standard:account' }
                    })
                );
                input.dispatchEvent(new CustomEvent('blur'));
            })
            .then(() => {
                element.value = '';
            })
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="input"]'
                );
                input.dispatchEvent(new CustomEvent('blur'));
            })
            .then(() => {
                expect(handler).toHaveBeenCalledTimes(2);
                expect(handler.mock.calls[0][0].detail.value).toBe(
                    'standard:account'
                );
                expect(handler.mock.calls[1][0].detail.value).toBeNull();
            });
    });

    /* ----- PUBLIC METHODS ----- */

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

    /* ----- ICON SELECTION ----- */

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
                    .querySelector('[data-element-id="lightning-button-done"]')
                    .click();
            })
            .then(() => {
                const icon = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-icon-menu"]'
                );
                expect(icon.iconName).toBe('standard:action_list_component');
                expect(element.value).toBe('standard:action_list_component');
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
        element.value = 'standard:user';

        const handler = jest.fn();
        element.addEventListener('change', handler);

        return Promise.resolve()
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="input"]'
                );
                input.dispatchEvent(
                    new CustomEvent('input', {
                        target: { value: 'standard:user' }
                    })
                );
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
                    new KeyboardEvent('keydown', { keyCode: 13 })
                );
            })
            .then(() => {
                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.value).toBe(
                    'standard:account'
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
                    new KeyboardEvent('keydown', { keyCode: 1 })
                );
            })
            .then(() => {
                expect(handler).not.toHaveBeenCalled();
            });
    });

    /* ----- SEARCH INPUT ----- */

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
                    new CustomEvent('change', { detail: { value: 'quip_' } })
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
                    new CustomEvent('change', { detail: { value: 'quip_' } })
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

    /* ----- POPOVER BEHAVIOR ----- */

    it('Close popover on outside click', () => {
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
                popover.dispatchEvent(new CustomEvent('mouseenter'));
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input"]'
                ).parentElement;
                popover.dispatchEvent(new CustomEvent('mouseleave'));
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input"]'
                ).parentElement;
                popover.dispatchEvent(new CustomEvent('blur'));
            })
            .then(() => {
                const popoverElement = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input"]'
                );
                expect(popoverElement).toBeNull();
            });
    });

    it('Do not close popover on inside click', () => {
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
                popover.dispatchEvent(new CustomEvent('mouseenter'));
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input"]'
                ).parentElement;
                popover.dispatchEvent(new CustomEvent('blur'));
            })
            .then(() => {
                const popoverElement = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input"]'
                );
                expect(popoverElement).not.toBeNull();
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
                    new KeyboardEvent('keydown', { keyCode: 9 })
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
                    new KeyboardEvent('keyup', { keyCode: 9 })
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
                    new KeyboardEvent('keydown', { keyCode: 16 })
                );
                popover.dispatchEvent(
                    new KeyboardEvent('keydown', { keyCode: 9 })
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
                    new KeyboardEvent('keyup', { keyCode: 9 })
                );
                popover.dispatchEvent(
                    new KeyboardEvent('keyup', { keyCode: 16 })
                );
            })
            .then(() => {
                const popoverElement = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input"]'
                );
                expect(popoverElement).not.toBeNull();
            });
    });

    it('Invalid keypress', () => {
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
                    new KeyboardEvent('keydown', { keyCode: 1 })
                );
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input"]'
                ).parentElement;
                popover.dispatchEvent(
                    new KeyboardEvent('keyup', { keyCode: 1 })
                );
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input"]'
                ).parentElement;
                popover.dispatchEvent(new CustomEvent('blur'));
            })
            .then(() => {
                const popoverElement = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input"]'
                );
                expect(popoverElement).toBeNull();
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
                    new KeyboardEvent('keydown', { keyCode: 27 })
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
