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

let element;
describe('FilterMenuGroup', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-filter-menu-group', {
            is: FilterMenuGroup
        });
        document.body.appendChild(element);
    });

    it('Filter menu group: Default attributes', () => {
        expect(element.applyButtonLabel).toBe('Apply');
        expect(element.hideSelectedItems).toBeFalsy();
        expect(element.menus).toMatchObject([]);
        expect(element.resetButtonLabel).toBe('Reset');
        expect(element.variant).toBe('horizontal');
    });

    /* ----- ATTRIBUTES ----- */

    // apply-button-label
    // Depends on variant
    it('Filter menu group: applyButtonLabel, with horizontal variant', () => {
        element.applyButtonLabel = 'Save';
        element.variant = 'horizontal';

        return Promise.resolve().then(() => {
            const menus = element.shadowRoot.querySelectorAll(
                '[data-element-id^="avonni-filter-menu"]'
            );
            menus.forEach((menu) => {
                expect(menu.applyButtonLabel).toBe('Save');
            });
        });
    });

    it('Filter menu group: applyButtonLabel, with vertical variant', () => {
        element.applyButtonLabel = 'Save';
        element.variant = 'vertical';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-apply"]'
            );
            expect(button.label).toBe('Save');
        });
    });

    // hide-selected-items
    // Depends on menus
    it('Filter menu group: hideSelectedItems = false', () => {
        element.menus = MENUS;
        element.hideSelectedItems = false;

        return Promise.resolve().then(() => {
            const pills = element.shadowRoot.querySelector(
                '[data-element-id^="lightning-pill-container"]'
            );
            expect(pills).toBeTruthy();
        });
    });

    it('Filter menu group: hideSelectedItems = true', () => {
        element.menus = MENUS;
        element.hideSelectedItems = true;

        return Promise.resolve().then(() => {
            const pills = element.shadowRoot.querySelector(
                '[data-element-id^="lightning-pill-container"]'
            );
            expect(pills).toBeFalsy();
        });
    });

    // menus
    it('Filter menu group: menus', () => {
        element.menus = MENUS;

        return Promise.resolve().then(() => {
            const menus = element.shadowRoot.querySelectorAll(
                '[data-element-id^="avonni-filter-menu"]'
            );
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
                const menuValue =
                    typeof MENUS[index].value === 'string'
                        ? [MENUS[index].value]
                        : MENUS[index].value;
                expect(menu.value).toMatchObject(menuValue || []);
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
    it('Filter menu group: resetButtonLabel, with horizontal variant', () => {
        element.resetButtonLabel = 'Erase';
        element.variant = 'horizontal';

        return Promise.resolve().then(() => {
            const menus = element.shadowRoot.querySelectorAll(
                '[data-element-id^="avonni-filter-menu"]'
            );
            menus.forEach((menu) => {
                expect(menu.resetButtonLabel).toBe('Erase');
            });
        });
    });

    it('Filter menu group: resetButtonLabel, with vertical variant', () => {
        element.resetButtonLabel = 'Erase';
        element.variant = 'vertical';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-reset"]'
            );
            expect(button.label).toBe('Erase');
        });
    });

    // variant
    // Depends on menus
    it('Filter menu group: variant = horizontal', () => {
        element.variant = 'horizontal';
        element.menus = MENUS;

        return Promise.resolve().then(() => {
            const menus = element.shadowRoot.querySelectorAll(
                '[data-element-id^="avonni-filter-menu"]'
            );
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
                '[data-element-id="lightning-button-reset"]'
            );
            expect(buttons).toHaveLength(0);
        });
    });

    it('Filter menu group: variant = vertical', () => {
        element.variant = 'vertical';
        element.menus = MENUS;

        return Promise.resolve().then(() => {
            const menus = element.shadowRoot.querySelectorAll(
                '[data-element-id^="avonni-filter-menu"]'
            );
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
                '[data-element-id^="lightning-button"]'
            );
            expect(buttons).toHaveLength(2);
        });
    });

    /* ----- METHODS ----- */

    // clear
    // Depends on menus
    it('Filter menu group: clear method', () => {
        element.menus = MENUS;

        return Promise.resolve()
            .then(() => {
                element.clear();
            })
            .then(() => {
                const menus = element.shadowRoot.querySelectorAll(
                    '[data-element-id^="avonni-filter-menu"]'
                );
                menus.forEach((menu) => {
                    expect(menu.value).toMatchObject([]);
                });

                const pills = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-pill-container"]'
                );
                expect(pills).toBeFalsy();
            });
    });

    // apply
    // Depends on menus
    it('Filter menu group: apply method', () => {
        element.menus = NO_VALUE_MENU;

        return Promise.resolve()
            .then(() => {
                const menus = element.shadowRoot.querySelectorAll(
                    '[data-element-id^="avonni-filter-menu"]'
                );
                menus[0].value = ['call'];

                element.apply();
            })
            .then(() => {
                const pills = element.shadowRoot.querySelector(
                    '[data-element-id^="lightning-pill-container"]'
                );
                expect(pills.items[0].name).toBe('contact,call');
            });
    });

    /* ----- EVENTS ----- */

    // select
    // Depends on menus
    it('Filter menu group: select event', () => {
        const handler = jest.fn();
        element.addEventListener('select', handler);
        element.menus = MENUS;

        return Promise.resolve().then(() => {
            const menus = element.shadowRoot.querySelectorAll(
                '[data-element-id^="avonni-filter-menu"]'
            );
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
    it('Filter menu group: click on apply button, with horizontal variant', () => {
        element.menus = NO_VALUE_MENU;

        return Promise.resolve()
            .then(() => {
                const menus = element.shadowRoot.querySelectorAll(
                    '[data-element-id^="avonni-filter-menu"]'
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
                    '[data-element-id="lightning-pill-container-horizontal"]'
                );
                expect(pills.items[0].name).toBe('contact,call');
            });
    });

    it('Filter menu group: click on apply button, with vertical variant', () => {
        element.menus = NO_VALUE_MENU;
        element.variant = 'vertical';

        return Promise.resolve()
            .then(() => {
                const menus = element.shadowRoot.querySelectorAll(
                    '[data-element-id^="avonni-filter-menu"]'
                );
                menus[0].value = ['call'];

                const applyButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-apply"]'
                );
                applyButton.click();
            })
            .then(() => {
                const pills = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-pill-container-vertical"]'
                );
                expect(pills.items[0].name).toBe('contact,call');
            });
    });

    // click on reset button
    // Depends on menus and variant
    it('Filter menu group: click on reset button, with horizontal variant', () => {
        element.menus = MENUS;

        return Promise.resolve()
            .then(() => {
                const menus = element.shadowRoot.querySelectorAll(
                    '[data-element-id^="avonni-filter-menu"]'
                );
                menus.forEach((menu) => {
                    menu.dispatchEvent(new CustomEvent('reset'));
                });
            })
            .then(() => {
                const pills = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-pill-container-horizontal"]'
                );
                expect(pills).toBeFalsy();
            });
    });

    it('Filter menu group: click on reset button, with vertical variant', () => {
        element.menus = MENUS;
        element.variant = 'vertical';

        return Promise.resolve()
            .then(() => {
                const resetButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-reset"]'
                );
                resetButton.click();
            })
            .then(() => {
                const pills = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-pill-container-vertical"]'
                );
                expect(pills).toBeFalsy();
            });
    });

    // Remove selected item
    // Depends on menus
    it('Filter menu group: Remove selected item', () => {
        element.menus = MENUS;

        return Promise.resolve()
            .then(() => {
                const pills = element.shadowRoot.querySelector(
                    '[data-element-id^="lightning-pill-container"]'
                );
                const emailPill = pills.items.find(
                    (item) => item.name === 'contact,email'
                );
                expect(emailPill).toBeTruthy();
                expect(pills.items).toHaveLength(3);
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
                    '[data-element-id^="lightning-pill-container"]'
                );
                const emailPill = pills.items.find(
                    (item) => item.name === 'contact,email'
                );
                expect(emailPill).toBeFalsy();
                expect(pills.items).toHaveLength(2);
            });
    });
});
