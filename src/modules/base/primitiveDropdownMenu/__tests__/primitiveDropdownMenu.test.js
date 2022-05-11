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
import PrimitiveDropdownMenu from 'c/primitiveDropdownMenu';

// Not tested because depends on DOM measurements:
// offsetHeight
// offsetWidth

// Many methods were not tested because they depend on keyboard or mouse events

const items = [
    {
        name: 'item-1',
        label: 'Item 1',
        iconName: 'utility:user'
    },
    {
        name: 'item-2',
        label: 'Item 2'
    },
    {
        name: 'item-3',
        label: 'Item 3',
        iconName: 'utility:apps'
    }
];

let element;
describe('PrimitiveDropdownMenu', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-primitive-dropdown-menu', {
            is: PrimitiveDropdownMenu
        });
        document.body.appendChild(element);
    });

    it('Primitive dropdown menu: Default attributes', () => {
        expect(element.items).toMatchObject([]);
        expect(element.offsetHeight).toBeNull();
        expect(element.offsetWidth).toBeNull();
        expect(element.show).toBeFalsy();
    });

    /* ----- ATTRIBUTES ----- */

    // items
    // Depends on show
    it('Primitive dropdown menu: items', () => {
        element.items = items;
        element.show = true;

        return Promise.resolve().then(() => {
            const itemElements = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-menu-item"]'
            );
            expect(itemElements).toHaveLength(items.length);

            itemElements.forEach((item, index) => {
                expect(item.label).toBe(items[index].label);
                expect(item.prefixIconName).toBe(items[index].iconName);
                expect(item.value).toBe(items[index].name);
            });
        });
    });

    // show
    it('Primitive dropdown menu: show = false', () => {
        element.show = false;

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.slds-popover');
            expect(popover).toBeFalsy();
        });
    });

    it('Primitive dropdown menu: show = true', () => {
        element.show = true;

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.slds-popover');
            expect(popover).toBeTruthy();
        });
    });

    /* ----- EVENTS ----- */

    // Handle the privateblur of an item
    // Depends on show and items
    it('Primitive dropdown menu: Close the dropdown if an item sends a blur event', () => {
        element.show = true;
        element.items = items;

        return Promise.resolve()
            .then(() => {
                const item = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-menu-item"]'
                );
                item.dispatchEvent(
                    new CustomEvent('privateblur', {
                        bubbles: true
                    })
                );
            })
            .then(() => {
                const popover =
                    element.shadowRoot.querySelector('.slds-popover');
                expect(popover).toBeFalsy();
            });
    });

    // privateselect
    // Depends on show and items
    it('Primitive dropdown menu: privateselect event', () => {
        element.show = true;
        element.items = items;

        const handler = jest.fn();
        element.addEventListener('privateselect', handler);

        return Promise.resolve()
            .then(() => {
                const item = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-menu-item"]'
                );
                item.dispatchEvent(
                    new CustomEvent('privateselect', {
                        detail: {
                            value: 'item-1'
                        },
                        bubbles: true
                    })
                );
            })
            .then(() => {
                const popover =
                    element.shadowRoot.querySelector('.slds-popover');
                expect(popover).toBeFalsy();

                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.name).toBe('item-1');
            });
    });
});
