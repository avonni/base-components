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
import FilterMenuGroup from 'c/filterMenuGroup';
import { MENUS, NO_VALUE_MENU } from '../__docs__/data';

describe('FilterMenuGroup', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-filter-menu-group', {
            is: FilterMenuGroup
        });

        expect(element.applyButtonLabel).toBe('Apply');
        expect(element.hideSelectedItems).toBeFalsy();
        expect(element.menus).toMatchObject([]);
        expect(element.resetButtonLabel).toBe('Reset');
        expect(element.variant).toBe('horizontal');
    });

    /* ----- ATTRIBUTES ----- */

    // apply-button-label
    // Depends on variant
    it('applyButtonLabel, with horizontal variant', () => {
        const element = createElement('base-filter-menu-group', {
            is: FilterMenuGroup
        });

        document.body.appendChild(element);

        element.applyButtonLabel = 'Save';
        element.variant = 'horizontal';

        return Promise.resolve().then(() => {
            const menus = element.shadowRoot.querySelectorAll('c-filter-menu');
            menus.forEach((menu) => {
                expect(menu.applyButtonLabel).toBe('Save');
            });
        });
    });

    it('applyButtonLabel, with vertical variant', () => {
        const element = createElement('base-filter-menu-group', {
            is: FilterMenuGroup
        });

        document.body.appendChild(element);

        element.applyButtonLabel = 'Save';
        element.variant = 'vertical';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                'lightning-button + lightning-button'
            );
            expect(button.label).toBe('Save');
        });
    });

    // hide-selected-items
    // Depends on menus
    it('hideSelectedItems = false', () => {
        const element = createElement('base-filter-menu-group', {
            is: FilterMenuGroup
        });

        document.body.appendChild(element);

        element.menus = MENUS;
        element.hideSelectedItems = false;

        return Promise.resolve().then(() => {
            const pills = element.shadowRoot.querySelector(
                'lightning-pill-container'
            );
            expect(pills).toBeTruthy();
        });
    });

    it('hideSelectedItems = true', () => {
        const element = createElement('base-filter-menu-group', {
            is: FilterMenuGroup
        });

        document.body.appendChild(element);

        element.menus = MENUS;
        element.hideSelectedItems = true;

        return Promise.resolve().then(() => {
            const pills = element.shadowRoot.querySelector(
                'lightning-pill-container'
            );
            expect(pills).toBeFalsy();
        });
    });

    // menus
    it('menus', () => {
        const element = createElement('base-filter-menu-group', {
            is: FilterMenuGroup
        });

        document.body.appendChild(element);

        element.menus = MENUS;

        return Promise.resolve().then(() => {
            const menus = element.shadowRoot.querySelectorAll('c-filter-menu');
            menus.forEach((menu, index) => {
                expect(menu.accessKey).toBe(MENUS[index].accessKey);
                expect(menu.alternativeText).toBe(
                    MENUS[index].alternativeText || 'Show Menu'
                );
                expect(menu.disabled).toBe(MENUS[index].disabled || false);
                expect(menu.iconName).toBe(
                    MENUS[index].iconName || 'utility:down'
                );
                expect(menu.iconSize).toBe(MENUS[index].iconSize || 'medium');
                expect(menu.isLoading).toBe(MENUS[index].isLoading || false);
                expect(menu.label).toBe(MENUS[index].label);
                expect(menu.loadingStateAlternativeText).toBe(
                    MENUS[index].loadingStateAlternativeText || 'Loading'
                );
                expect(menu.items).toMatchObject(MENUS[index].items || []);
                expect(menu.title).toBe(MENUS[index].title);
                expect(menu.tooltip).toBe(MENUS[index].tooltip);
                expect(menu.value).toMatchObject(MENUS[index].value || []);
                expect(menu.buttonVariant).toBe(
                    MENUS[index].buttonVariant || 'border'
                );
                expect(menu.searchInputPlaceholder).toBe(
                    MENUS[index].searchInputPlaceholder || 'Search...'
                );
                expect(menu.showSearchBox).toBe(
                    MENUS[index].showSearchBox || false
                );
                expect(menu.dropdownAlignment).toBe(
                    MENUS[index].dropdownAlignment || 'left'
                );
                expect(menu.dropdownWidth).toBe(
                    MENUS[index].dropdownWidth || 'small'
                );
                expect(menu.dropdownLength).toBe(
                    MENUS[index].dropdownLength || '7-items'
                );
                expect(menu.dataset.name).toBe(MENUS[index].name);
            });
        });
    });

    // reset-button-label
    // Depends on variant
    it('resetButtonLabel, with horizontal variant', () => {
        const element = createElement('base-filter-menu-group', {
            is: FilterMenuGroup
        });

        document.body.appendChild(element);

        element.resetButtonLabel = 'Erase';
        element.variant = 'horizontal';

        return Promise.resolve().then(() => {
            const menus = element.shadowRoot.querySelectorAll('c-filter-menu');
            menus.forEach((menu) => {
                expect(menu.resetButtonLabel).toBe('Erase');
            });
        });
    });

    it('resetButtonLabel, with vertical variant', () => {
        const element = createElement('base-filter-menu-group', {
            is: FilterMenuGroup
        });

        document.body.appendChild(element);

        element.resetButtonLabel = 'Erase';
        element.variant = 'vertical';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.label).toBe('Erase');
        });
    });

    // variant
    // Depends on menus
    it('variant = horizontal', () => {
        const element = createElement('base-filter-menu-group', {
            is: FilterMenuGroup
        });

        document.body.appendChild(element);

        element.variant = 'horizontal';
        element.menus = MENUS;

        return Promise.resolve().then(() => {
            const menus = element.shadowRoot.querySelectorAll('c-filter-menu');
            menus.forEach((menu) => {
                expect(menu.hideApplyResetButtons).toBeFalsy();
            });

            const buttonGroupRow = element.shadowRoot.querySelector(
                '.slds-button-group-row'
            );
            expect(buttonGroupRow).toBeTruthy();

            const buttonGroupItem = element.shadowRoot.querySelector(
                '.slds-button-group-item'
            );
            expect(buttonGroupItem).toBeTruthy();

            const buttons = element.shadowRoot.querySelectorAll(
                'lightning-button'
            );
            expect(buttons).toHaveLength(0);
        });
    });

    it('variant = vertical', () => {
        const element = createElement('base-filter-menu-group', {
            is: FilterMenuGroup
        });

        document.body.appendChild(element);

        element.variant = 'vertical';
        element.menus = MENUS;

        return Promise.resolve().then(() => {
            const menus = element.shadowRoot.querySelectorAll('c-filter-menu');
            menus.forEach((menu) => {
                expect(menu.hideApplyResetButtons).toBeTruthy();
            });

            const buttonGroupRow = element.shadowRoot.querySelector(
                '.slds-button-group-row'
            );
            expect(buttonGroupRow).toBeFalsy();

            const buttonGroupItem = element.shadowRoot.querySelector(
                '.slds-button-group-item'
            );
            expect(buttonGroupItem).toBeFalsy();

            const buttons = element.shadowRoot.querySelectorAll(
                'lightning-button'
            );
            expect(buttons).toHaveLength(2);
        });
    });

    /* ----- METHODS ----- */

    // clear
    // Depends on menus
    it('clear method', () => {
        const element = createElement('base-filter-menu-group', {
            is: FilterMenuGroup
        });

        document.body.appendChild(element);

        element.menus = MENUS;

        return Promise.resolve()
            .then(() => {
                element.clear();
            })
            .then(() => {
                const menus = element.shadowRoot.querySelectorAll(
                    'c-filter-menu'
                );
                menus.forEach((menu) => {
                    expect(menu.value).toMatchObject([]);
                });

                const pills = element.shadowRoot.querySelector(
                    'lightning-pill-container'
                );
                expect(pills).toBeFalsy();
            });
    });

    // apply
    // Depends on menus
    it('apply method', () => {
        const element = createElement('base-filter-menu-group', {
            is: FilterMenuGroup
        });

        document.body.appendChild(element);

        element.menus = NO_VALUE_MENU;

        return Promise.resolve()
            .then(() => {
                const menus = element.shadowRoot.querySelectorAll(
                    'c-filter-menu'
                );
                menus[0].value = ['call'];

                element.apply();
            })
            .then(() => {
                const pills = element.shadowRoot.querySelector(
                    'lightning-pill-container'
                );
                expect(pills.items[0].name).toBe('contact,call');
            });
    });

    /* ----- EVENTS ----- */

    // select
    // Depends on menus
    it('select event', () => {
        const element = createElement('base-filter-menu-group', {
            is: FilterMenuGroup
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('select', handler);
        element.menus = MENUS;

        return Promise.resolve().then(() => {
            const menus = element.shadowRoot.querySelectorAll('c-filter-menu');
            menus[1].dispatchEvent(
                new CustomEvent('select', {
                    cancelable: true,
                    detail: {
                        value: ['free']
                    }
                })
            );

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.name).toBe('prices');
            expect(handler.mock.calls[0][0].detail.value).toMatchObject([
                'free'
            ]);
            expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
        });
    });

    /* ----- USER ACTIONS ----- */

    // click on apply button
    // Depends on menus and variant
    it('click on apply button, with horizontal variant', () => {
        const element = createElement('base-filter-menu-group', {
            is: FilterMenuGroup
        });

        document.body.appendChild(element);

        element.menus = NO_VALUE_MENU;

        return Promise.resolve()
            .then(() => {
                const menus = element.shadowRoot.querySelectorAll(
                    'c-filter-menu'
                );
                menus[0].dispatchEvent(
                    new CustomEvent('apply', {
                        detail: {
                            value: ['call']
                        }
                    })
                );
            })
            .then(() => {
                const pills = element.shadowRoot.querySelector(
                    'lightning-pill-container'
                );
                expect(pills.items[0].name).toBe('contact,call');
            });
    });

    it('click on apply button, with vertical variant', () => {
        const element = createElement('base-filter-menu-group', {
            is: FilterMenuGroup
        });

        document.body.appendChild(element);

        element.menus = NO_VALUE_MENU;
        element.variant = 'vertical';

        return Promise.resolve()
            .then(() => {
                const menus = element.shadowRoot.querySelectorAll(
                    'c-filter-menu'
                );
                menus[0].value = ['call'];

                const applyButton = element.shadowRoot.querySelector(
                    'lightning-button + lightning-button'
                );
                applyButton.click();
            })
            .then(() => {
                const pills = element.shadowRoot.querySelector(
                    'lightning-pill-container'
                );
                expect(pills.items[0].name).toBe('contact,call');
            });
    });

    // click on reset button
    // Depends on menus and variant
    it('click on reset button, with horizontal variant', () => {
        const element = createElement('base-filter-menu-group', {
            is: FilterMenuGroup
        });

        document.body.appendChild(element);

        element.menus = MENUS;

        return Promise.resolve()
            .then(() => {
                const menus = element.shadowRoot.querySelectorAll(
                    'c-filter-menu'
                );
                menus[0].dispatchEvent(new CustomEvent('reset'));
            })
            .then(() => {
                const pills = element.shadowRoot.querySelector(
                    'lightning-pill-container'
                );
                expect(pills).toBeFalsy();
            });
    });

    it('click on reset button, with vertical variant', () => {
        const element = createElement('base-filter-menu-group', {
            is: FilterMenuGroup
        });

        document.body.appendChild(element);

        element.menus = MENUS;
        element.variant = 'vertical';

        return Promise.resolve()
            .then(() => {
                const resetButton = element.shadowRoot.querySelector(
                    'lightning-button'
                );
                resetButton.click();
            })
            .then(() => {
                const pills = element.shadowRoot.querySelector(
                    'lightning-pill-container'
                );
                expect(pills).toBeFalsy();
            });
    });

    // Remove selected item
    // Depends on menus
    it('Remove selected item', () => {
        const element = createElement('base-filter-menu-group', {
            is: FilterMenuGroup
        });

        document.body.appendChild(element);

        element.menus = MENUS;

        return Promise.resolve()
            .then(() => {
                const pills = element.shadowRoot.querySelector(
                    'lightning-pill-container'
                );
                pills.dispatchEvent(
                    new CustomEvent('itemremove', {
                        detail: {
                            item: {
                                name: 'contact,email'
                            },
                            index: 0
                        },
                        cancelable: true
                    })
                );
            })
            .then(() => {
                const pills = element.shadowRoot.querySelector(
                    'lightning-pill-container'
                );
                expect(pills.items).toHaveLength(1);
                expect(pills.items[0]).toMatchObject({
                    label: 'Meeting',
                    name: 'contact,meeting'
                });
            });
    });
});
