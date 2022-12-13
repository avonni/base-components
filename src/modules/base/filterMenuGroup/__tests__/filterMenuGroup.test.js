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
import { MENUS, VALUE } from './data';

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
        expect(element.hideApplyResetButtons).toBeFalsy();
        expect(element.hideSelectedItems).toBeFalsy();
        expect(element.menus).toMatchObject([]);
        expect(element.resetButtonLabel).toBe('Reset');
        expect(element.value).toEqual({});
        expect(element.variant).toBe('horizontal');
    });

    /*
     * ------------------------------------------------------------
     *  ATTRIBUTES
     * -------------------------------------------------------------
     */

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

    // hide-apply-reset-buttons
    // Depends on menus
    it('Filter menu group: hideApplyResetButtons = false', () => {
        element.menus = MENUS;
        element.hideApplyResetButtons = false;

        return Promise.resolve().then(() => {
            const menus = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-filter-menu"]'
            );
            menus.forEach((menu) => {
                expect(menu.hideApplyResetButtons).toBeFalsy();
            });
        });
    });

    it('Filter menu group: hideApplyResetButtons = true', () => {
        element.menus = MENUS;
        element.hideApplyResetButtons = true;

        return Promise.resolve().then(() => {
            const menus = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-filter-menu"]'
            );
            menus.forEach((menu) => {
                expect(menu.hideApplyResetButtons).toBeTruthy();
            });
        });
    });

    it('Filter menu group: hideApplyResetButtons, vertical variant', () => {
        element.menus = MENUS;
        element.hideApplyResetButtons = true;
        element.variant = 'vertical';

        return Promise.resolve().then(() => {
            const apply = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-apply"]'
            );
            const reset = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-reset"]'
            );
            expect(apply).toBeFalsy();
            expect(reset).toBeFalsy();
        });
    });

    // hide-selected-items
    // Depends on menus
    it('Filter menu group: hideSelectedItems = false', () => {
        element.menus = MENUS;
        element.value = VALUE;
        element.hideSelectedItems = false;

        return Promise.resolve().then(() => {
            const pills = element.shadowRoot.querySelector(
                '[data-element-id="avonni-pill-container-horizontal"]'
            );
            expect(pills).toBeTruthy();
        });
    });

    it('Filter menu group: hideSelectedItems = true', () => {
        element.menus = MENUS;
        element.value = VALUE;
        element.hideSelectedItems = true;

        return Promise.resolve().then(() => {
            const pills = element.shadowRoot.querySelector(
                '[data-element-id="avonni-pill-container-horizontal"]'
            );
            expect(pills).toBeFalsy();
        });
    });

    it('Filter menu group: hideSelectedItems = false, vertical variant', () => {
        element.menus = MENUS;
        element.value = VALUE;
        element.hideSelectedItems = false;
        element.variant = 'vertical';

        return Promise.resolve().then(() => {
            const pills = element.shadowRoot.querySelector(
                '[data-element-id="avonni-pill-container-vertical"]'
            );
            expect(pills).toBeTruthy();
        });
    });

    it('Filter menu group: hideSelectedItems = true, vertical variant', () => {
        element.menus = MENUS;
        element.value = VALUE;
        element.hideSelectedItems = true;
        element.variant = 'vertical';

        return Promise.resolve().then(() => {
            const pills = element.shadowRoot.querySelector(
                '[data-element-id="avonni-pill-container-vertical"]'
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
            expect(menus).toHaveLength(MENUS.length);
            menus.forEach((menu, i) => {
                expect(menu.accessKey).toBe(MENUS[i].accessKey);
                expect(menu.alternativeText).toBe(MENUS[i].alternativeText);
                expect(menu.disabled).toBe(MENUS[i].disabled);
                expect(menu.iconName).toBe(MENUS[i].iconName);
                expect(menu.iconSize).toBe(MENUS[i].iconSize);
                expect(menu.isLoading).toBe(MENUS[i].isLoading);
                expect(menu.label).toBe(MENUS[i].label);
                expect(menu.loadingStateAlternativeText).toBe(
                    MENUS[i].loadingStateAlternativeText
                );
                expect(menu.type).toBe(MENUS[i].type);
                expect(menu.typeAttributes).toEqual(MENUS[i].typeAttributes);
                expect(menu.title).toBe(MENUS[i].title);
                expect(menu.tooltip).toBe(MENUS[i].tooltip);
                expect(menu.value).toEqual([]);
                expect(menu.buttonVariant).toBe(MENUS[i].buttonVariant);
                expect(menu.dropdownAlignment).toBe(MENUS[i].dropdownAlignment);
                expect(menu.name).toBe(MENUS[i].name);
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

    // value
    it('Filter menu group: value', () => {
        element.value = VALUE;
        element.menus = MENUS;

        return Promise.resolve().then(() => {
            const menus = element.shadowRoot.querySelectorAll(
                '[data-element-id^="avonni-filter-menu"]'
            );
            expect(menus[0].value).toEqual([VALUE.contact]);
            expect(menus[2].value).toEqual(VALUE.editions);
            expect(menus[4].value).toEqual(VALUE.publication);
            [1, 3].forEach((i) => {
                expect(menus[i].value).toEqual([]);
            });

            const pills = element.shadowRoot.querySelector(
                '[data-element-id="avonni-pill-container-horizontal"]'
            );
            expect(pills.items).toHaveLength(4);
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
                '[data-element-id="ul"]'
            );
            expect(buttonGroupRow.classList).toContain('slds-grid');

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
                '[data-element-id="ul"]'
            );
            expect(buttonGroupRow.classList).not.toContain('slds-grid');

            const buttons = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-button"]'
            );
            expect(buttons).toHaveLength(2);
        });
    });

    /*
     * ------------------------------------------------------------
     *  METHODS
     * -------------------------------------------------------------
     */

    // apply
    it('Filter menu group: apply method', () => {
        element.menus = MENUS;

        return Promise.resolve()
            .then(() => {
                const menu = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-filter-menu"]'
                );
                menu.dispatchEvent(
                    new CustomEvent('select', {
                        detail: {
                            value: ['call']
                        },
                        bubbles: true
                    })
                );

                expect(element.value).toEqual({});
                element.apply();
                expect(element.value).toEqual({ contact: ['call'] });
            })
            .then(() => {
                const pills = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-pill-container-horizontal"]'
                );
                expect(pills.items[0].name).toBe('contact.call');
            });
    });

    // focus
    it('Filter menu group: focus method', () => {
        element.menus = MENUS;

        return Promise.resolve().then(() => {
            const menu = element.shadowRoot.querySelector(
                '[data-element-id="avonni-filter-menu"]'
            );
            const spy = jest.spyOn(menu, 'focus');
            element.focus();
            expect(spy).toHaveBeenCalled();
        });
    });

    // reset
    it('Filter menu group: reset method', () => {
        element.menus = MENUS;
        element.value = VALUE;

        return Promise.resolve()
            .then(() => {
                const menu = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-filter-menu"]'
                );
                expect(menu.value).toEqual(['other']);
                element.reset();
            })
            .then(() => {
                const menu = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-filter-menu"]'
                );
                expect(menu.value).toEqual([]);
                expect(element.value).toEqual(VALUE);
            });
    });

    /*
     * ------------------------------------------------------------
     *  EVENTS
     * -------------------------------------------------------------
     */

    // apply
    it('Filter menu group: apply event', () => {
        element.menus = MENUS;

        const handler = jest.fn();
        element.addEventListener('apply', handler);

        return Promise.resolve()
            .then(() => {
                const menus = element.shadowRoot.querySelectorAll(
                    '[data-element-id^="avonni-filter-menu"]'
                );
                menus[0].dispatchEvent(
                    new CustomEvent('apply', {
                        detail: {
                            value: ['call']
                        },
                        bubbles: true
                    })
                );

                expect(handler).toHaveBeenCalled();
                const call = handler.mock.calls[0][0];
                expect(call.detail.value).toEqual({ contact: ['call'] });
                expect(call.detail.name).toBe('contact');
                expect(call.bubbles).toBeFalsy();
                expect(call.composed).toBeFalsy();
                expect(call.cancelable).toBeFalsy();
            })
            .then(() => {
                const pills = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-pill-container-horizontal"]'
                );
                expect(pills.items[0].name).toBe('contact.call');
            });
    });

    it('Filter menu group: apply event, vertical variant', () => {
        element.menus = MENUS;
        element.variant = 'vertical';
        element.value = {
            editions: ['professional', 'enterprise'],
            contact: 'other',
            publication: [
                '2019-01-01T00:00:00.000Z',
                '2019-01-31T13:40:00.000Z'
            ]
        };

        const handler = jest.fn();
        element.addEventListener('apply', handler);

        return Promise.resolve()
            .then(() => {
                const menus = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-filter-menu"]'
                );
                menus[0].dispatchEvent(
                    new CustomEvent('select', {
                        detail: {
                            value: ['call']
                        },
                        bubbles: true
                    })
                );

                menus[1].dispatchEvent(
                    new CustomEvent('select', {
                        detail: {
                            value: [2, 45]
                        },
                        bubbles: true
                    })
                );

                const applyButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-apply"]'
                );
                applyButton.click();

                expect(handler).toHaveBeenCalled();
                const detail = handler.mock.calls[0][0].detail;
                expect(detail.value).toEqual({
                    editions: ['professional', 'enterprise'],
                    contact: ['call'],
                    price: [2, 45],
                    publication: [
                        '2019-01-01T00:00:00.000Z',
                        '2019-01-31T13:40:00.000Z'
                    ]
                });
                expect(detail.name).toBeUndefined();
            })
            .then(() => {
                const pills = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-pill-container-vertical"]'
                );
                expect(pills.items).toHaveLength(5);
                expect(pills.items[0].name).toBe('contact.call');
            });
    });

    it('Filter menu group: apply event, hideApplyResetButtons', () => {
        element.menus = MENUS;
        element.hideApplyResetButtons = true;

        const handler = jest.fn();
        element.addEventListener('apply', handler);

        return Promise.resolve()
            .then(() => {
                const menus = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-filter-menu"]'
                );
                menus[0].dispatchEvent(
                    new CustomEvent('select', {
                        detail: {
                            value: ['call']
                        },
                        bubbles: true
                    })
                );
                menus[0].dispatchEvent(
                    new CustomEvent('apply', {
                        detail: {
                            value: ['call']
                        },
                        bubbles: true
                    })
                );

                expect(handler).toHaveBeenCalledTimes(1);
                const detail = handler.mock.calls[0][0].detail;
                expect(detail.value).toEqual({
                    contact: ['call']
                });
                expect(detail.name).toBe('contact');
            })
            .then(() => {
                const pills = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-pill-container-horizontal"]'
                );
                expect(pills.items).toHaveLength(1);
                expect(pills.items[0].name).toBe('contact.call');
            });
    });

    it('Filter menu group: apply event, hideApplyResetButtons with vertical variant', () => {
        element.menus = MENUS;
        element.hideApplyResetButtons = true;
        element.variant = 'vertical';

        const handler = jest.fn();
        element.addEventListener('apply', handler);

        return Promise.resolve()
            .then(() => {
                const menus = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-filter-menu"]'
                );
                menus[0].dispatchEvent(
                    new CustomEvent('select', {
                        detail: {
                            value: ['call']
                        },
                        bubbles: true
                    })
                );
                menus[0].dispatchEvent(
                    new CustomEvent('apply', {
                        detail: {
                            value: ['call']
                        },
                        bubbles: true
                    })
                );

                expect(handler).toHaveBeenCalledTimes(1);
                const detail = handler.mock.calls[0][0].detail;
                expect(detail.value).toEqual({
                    contact: ['call']
                });
                expect(detail.name).toBe('contact');
            })
            .then(() => {
                const pills = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-pill-container-vertical"]'
                );
                expect(pills.items).toHaveLength(1);
                expect(pills.items[0].name).toBe('contact.call');
            });
    });

    it('Filter menu group: apply event, remove a selected item', () => {
        element.menus = MENUS;
        element.value = VALUE;

        const handler = jest.fn();
        element.addEventListener('apply', handler);

        return Promise.resolve()
            .then(() => {
                const pills = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-pill-container-horizontal"]'
                );
                expect(pills.items).toHaveLength(4);
                pills.dispatchEvent(
                    new CustomEvent('actionclick', {
                        detail: {
                            index: 1
                        }
                    })
                );

                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.value).toEqual({
                    editions: ['enterprise'],
                    contact: 'other',
                    publication: [
                        '2019-01-01T00:00:00.000Z',
                        '2019-01-31T13:40:00.000Z'
                    ]
                });
            })
            .then(() => {
                const pills = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-pill-container-horizontal"]'
                );
                expect(pills.items).toHaveLength(3);
            });
    });

    // loadmore
    it('Filter menu group: loadmore event', () => {
        element.menus = MENUS;

        const handler = jest.fn();
        element.addEventListener('loadmore', handler);

        return Promise.resolve().then(() => {
            const menu = element.shadowRoot.querySelector(
                '[data-element-id="avonni-filter-menu"]'
            );
            menu.dispatchEvent(
                new CustomEvent('loadmore', {
                    bubbles: true
                })
            );

            expect(handler).toHaveBeenCalled();
            const call = handler.mock.calls[0][0];
            expect(call.bubbles).toBeFalsy();
            expect(call.composed).toBeFalsy();
            expect(call.cancelable).toBeFalsy();
        });
    });

    // reset
    it('Filter menu group: reset event', () => {
        element.menus = MENUS;
        element.value = VALUE;

        const handler = jest.fn();
        element.addEventListener('reset', handler);

        return Promise.resolve().then(() => {
            const menu = element.shadowRoot.querySelector(
                '[data-element-id="avonni-filter-menu"]'
            );
            menu.dispatchEvent(new CustomEvent('reset', { bubbles: true }));

            expect(handler).toHaveBeenCalled();
            const call = handler.mock.calls[0][0];
            expect(call.detail.name).toBe('contact');
            expect(call.bubbles).toBeFalsy();
            expect(call.composed).toBeFalsy();
            expect(call.cancelable).toBeFalsy();

            expect(element.value).toEqual(VALUE);
        });
    });

    it('Filter menu group: reset event, vertical variant', () => {
        element.menus = MENUS;
        element.value = VALUE;
        element.variant = 'vertical';

        const handler = jest.fn();
        element.addEventListener('reset', handler);

        return Promise.resolve()
            .then(() => {
                const resetButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-reset"]'
                );
                resetButton.click();

                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.name).toBeUndefined();
            })
            .then(() => {
                const menus = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-filter-menu"]'
                );
                menus.forEach((menu) => {
                    expect(menu.value).toEqual([]);
                });
                expect(element.value).toEqual(VALUE);
            });
    });

    // search
    it('Filter menu group: search event', () => {
        element.menus = MENUS;

        const handler = jest.fn();
        element.addEventListener('search', handler);

        return Promise.resolve().then(() => {
            const menu = element.shadowRoot.querySelector(
                '[data-element-id="avonni-filter-menu"]'
            );
            menu.dispatchEvent(
                new CustomEvent('search', {
                    detail: {
                        value: 'some research'
                    },
                    bubbles: true
                })
            );

            expect(handler).toHaveBeenCalled();
            const call = handler.mock.calls[0][0];
            expect(call.detail.value).toBe('some research');
            expect(call.detail.name).toBe('contact');
            expect(call.bubbles).toBeFalsy();
            expect(call.composed).toBeFalsy();
            expect(call.cancelable).toBeFalsy();
        });
    });

    // select
    it('Filter menu group: select event', () => {
        element.menus = MENUS;

        const handler = jest.fn();
        element.addEventListener('select', handler);

        return Promise.resolve().then(() => {
            const menu = element.shadowRoot.querySelector(
                '[data-element-id="avonni-filter-menu"]'
            );
            menu.dispatchEvent(
                new CustomEvent('select', {
                    detail: {
                        value: ['call']
                    },
                    bubbles: true
                })
            );

            expect(handler).toHaveBeenCalled();
            const call = handler.mock.calls[0][0];
            expect(call.detail.value).toEqual(['call']);
            expect(call.detail.name).toBe('contact');
            expect(call.bubbles).toBeFalsy();
            expect(call.composed).toBeFalsy();
            expect(call.cancelable).toBeFalsy();
            expect(element.value).toEqual({});
        });
    });
});
