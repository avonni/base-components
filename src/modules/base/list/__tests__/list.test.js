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
import {
    ITEMS,
    ITEMS_WITHOUT_ICONS,
    ACTIONS,
    ACTION,
    ACTION_NO_LABEL
} from './data';
import List from 'c/list';

// Not tested:
// Keyboard navigation (we can't artificially dispatch an event with a key code)
// Mouse move and all actions related to it (dragging the item and reorganizing the list)
// Touch events (we can't artificially give a touch position to save in _initialY)
// Partial test of reset() (we can't check if it would reorder the items, we only check that it unselects the currently dragged item)
// reorder event

let element;
describe('List', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-list', {
            is: List
        });
        document.body.appendChild(element);
    });

    it('Default attributes', () => {
        expect(element.alternativeText).toBeUndefined();
        expect(element.items).toMatchObject([]);
        expect(element.label).toBeUndefined();
        expect(element.sortable).toBeFalsy();
        expect(element.sortableIconName).toBeUndefined();
        expect(element.sortableIconPosition).toBe('right');
        expect(element.actions).toMatchObject([]);
        expect(element.imageWidth).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // alternative-text
    it('alternativeText', () => {
        element.alternativeText = 'A string alternative text';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector(
                '.slds-assistive-text:nth-of-type(2)'
            );
            expect(span.textContent).toBe('A string alternative text');
        });
    });

    // items
    it('items', () => {
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll('li');
            expect(items).toHaveLength(5);

            items.forEach((item, index) => {
                const originalItem = ITEMS[index];

                expect(item.dataset.index).toBe(index.toString());
                expect(item.ariaLabel).toBe(originalItem.label);
                expect(item.textContent).toBe(originalItem.label);

                const avatar = item.querySelector('c-avatar');
                if (avatar) {
                    if (originalItem.avatarFallbackIconName) {
                        expect(avatar.fallbackIconName).toBe(
                            originalItem.avatarFallbackIconName
                        );
                    }
                    if (originalItem.avatarSrc) {
                        expect(avatar.src).toBe(originalItem.avatarSrc);
                    }
                }
            });
        });
    });

    // label
    it('label', () => {
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.slds-text-heading_small'
            );
            expect(label.textContent).toBe('A string label');
        });
    });
    // divider
    it('divider = around', () => {
        element.divider = 'around';

        return Promise.resolve().then(() => {
            const menu = element.shadowRoot.querySelector(
                '.avonni-list__item-menu'
            );
            expect(menu.classList).toContain('slds-has-dividers_around');
        });
    });
    it('divider = top', () => {
        element.divider = 'top';

        return Promise.resolve().then(() => {
            const menu = element.shadowRoot.querySelector(
                '.avonni-list__item-menu'
            );
            expect(menu.classList).toContain('slds-has-dividers_top-space');
        });
    });
    it('divider = bottom', () => {
        element.divider = 'bottom';

        return Promise.resolve().then(() => {
            const menu = element.shadowRoot.querySelector(
                '.avonni-list__item-menu'
            );
            expect(menu.classList).toContain('slds-has-dividers_bottom-space');
        });
    });

    // ACTIONS with BUTTON-MENU / BUTTON / BUTTON-ICON
    it('actions button-menu', () => {
        element.items = ITEMS;
        element.actions = ACTIONS;

        return Promise.resolve()
            .then(() => {
                const actions = element.shadowRoot.querySelector(
                    'lightning-button-menu'
                );
                actions.click();
            })
            .then(() => {
                const menuItem = element.shadowRoot.querySelectorAll(
                    'lightning-menu-item'
                );
                expect(menuItem[0].label).toBe('Completed');
                expect(menuItem[0].value).toBe('completed-action');
                expect(menuItem[0].iconName).toBe('utility:check');
                expect(menuItem[0].disabled).toBeFalsy();
                expect(menuItem[1].label).toBe('Pending');
                expect(menuItem[1].value).toBe('pending-action');
                expect(menuItem[1].iconName).toBe('utility:spinner');
                expect(menuItem[1].disabled).toBeFalsy();
                expect(menuItem[2].label).toBe('Delete');
                expect(menuItem[2].value).toBe('delete-action');
                expect(menuItem[2].iconName).toBe('utility:delete');
                expect(menuItem[2].disabled).toBeTruthy();
            });
    });

    it('action lightning-button', () => {
        element.items = ITEMS;
        element.actions = ACTION;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');

            expect(button.label).toBe('Completed');
            expect(button.iconName).toBe('utility:check');
            expect(button.disabled).toBeFalsy();
            expect(button.value).toBe('completed-action');
        });
    });

    it('action lightning-button-icon', () => {
        element.items = ITEMS;
        element.actions = ACTION_NO_LABEL;

        return Promise.resolve().then(() => {
            const buttonIcon = element.shadowRoot.querySelector(
                'lightning-button-icon'
            );

            expect(buttonIcon.iconName).toBe('utility:event');
            expect(buttonIcon.disabled).toBeFalsy();
            expect(buttonIcon.value).toBe('event-action');
        });
    });

    // sortable
    // Depends on items
    it('sortable = false', () => {
        element.sortable = false;
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll('li');
            const menu = element.shadowRoot.querySelector(
                '.avonni-list__item-menu'
            );

            expect(menu.role).toBeFalsy();

            items.forEach((item) => {
                expect(item.role).toBeFalsy();
                expect(item.tabIndex).toBe(-1);
            });

            // Item is clicked on
            items[1].dispatchEvent(new CustomEvent('mousedown'));
            expect(items[1].classList).not.toContain(
                'avonni-list__item-sortable_dragged'
            );
        });
    });

    it('sortable = true', () => {
        element.sortable = true;
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll('li');
            const menu = element.shadowRoot.querySelector(
                '.avonni-list__item-menu'
            );

            expect(menu.role).toBe('listbox');

            items.forEach((item) => {
                expect(item.role).toBe('option');
                expect(item.tabIndex).toBe(0);
            });

            // Item is clicked on
            items[1].dispatchEvent(new CustomEvent('mousedown'));
            expect(items[1].classList).not.toContain(
                'avonni-list__item-sortable_dragged'
            );

            // The avonni-list__item-sortable_dragged is added the selected item moved, then removed when the item is released.

            // Item is dropped
            items[1].dispatchEvent(new CustomEvent('mouseup'));
            expect(items[1].classList).not.toContain(
                'avonni-list__item-sortable_dragged'
            );
        });
    });

    // sortable-icon-name
    // Depends on items and sortable
    it('sortableIconName, with sortable = false', () => {
        element.sortableIconName = 'utility:apps';
        element.sortable = false;
        element.items = ITEMS_WITHOUT_ICONS;

        return Promise.resolve().then(() => {
            const icons = element.shadowRoot.querySelectorAll('lightning-icon');
            expect(icons).toHaveLength(0);
        });
    });

    it('sortableIconName, with sortable = true', () => {
        element.sortableIconName = 'utility:apps';
        element.sortable = true;
        element.items = ITEMS_WITHOUT_ICONS;

        return Promise.resolve().then(() => {
            const icons = element.shadowRoot.querySelectorAll('lightning-icon');
            expect(icons).toHaveLength(4);

            icons.forEach((icon) => {
                expect(icon.iconName).toBe('utility:apps');
            });
        });
    });

    // sortable-icon-position
    // Depends on items, sortable and sortableIconName
    it('sortableIconPosition = right', () => {
        element.sortableIconName = 'utility:drag_and_drop';
        element.sortable = true;
        element.sortableIconPosition = 'right';
        element.items = ITEMS_WITHOUT_ICONS;

        return Promise.resolve().then(() => {
            const iconsRight = element.shadowRoot.querySelectorAll(
                '.icon-right'
            );
            const iconsLeft = element.shadowRoot.querySelectorAll('.icon-left');
            expect(iconsRight).toHaveLength(4);
            expect(iconsLeft).toHaveLength(0);
        });
    });

    it('sortableIconPosition = left', () => {
        element.sortableIconName = 'utility:apps';
        element.sortable = true;
        element.sortableIconPosition = 'left';
        element.items = ITEMS_WITHOUT_ICONS;

        return Promise.resolve().then(() => {
            const iconsRight = element.shadowRoot.querySelectorAll(
                '.icon-right'
            );
            const iconsLeft = element.shadowRoot.querySelectorAll('.icon-left');
            expect(iconsRight).toHaveLength(0);
            expect(iconsLeft).toHaveLength(4);
        });
    });
    /* images */
    it('images presence', () => {
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const images = element.shadowRoot.querySelectorAll('img');
            expect(images).toHaveLength(3);
        });
    });

    it('images width small', () => {
        element.items = ITEMS;
        element.imageWidth = 'small';

        return Promise.resolve().then(() => {
            const images = element.shadowRoot.querySelectorAll('img');
            expect(images[0].width).toBe(48);
            expect(images[1].width).toBe(48);
            expect(images[2].width).toBe(48);
        });
    });

    it('images width medium', () => {
        element.items = ITEMS;
        element.imageWidth = 'medium';

        return Promise.resolve().then(() => {
            const images = element.shadowRoot.querySelectorAll('img');
            expect(images[0].width).toBe(72);
            expect(images[1].width).toBe(72);
            expect(images[2].width).toBe(72);
        });
    });

    it('images width large', () => {
        element.items = ITEMS;
        element.imageWidth = 'large';

        return Promise.resolve().then(() => {
            const images = element.shadowRoot.querySelectorAll('img');
            expect(images[0].width).toBe(128);
            expect(images[1].width).toBe(128);
            expect(images[2].width).toBe(128);
        });
    });

    it('images rounded on sortable icon right', () => {
        element.items = ITEMS;
        element.imageWidth = 'large';
        element.divider = 'around';
        element.sortable = true;
        element.sortableIconName = 'utility:add';
        element.sortableIconPosition = 'right';

        return Promise.resolve().then(() => {
            const images = element.shadowRoot.querySelectorAll(
                '.avonni-list__item-image-container'
            );
            expect(images[0].classList).toContain(
                'avonni-list__item-image-container_rounded-corners'
            );
            expect(images[1].classList).toContain(
                'avonni-list__item-image-container_rounded-corners'
            );
            expect(images[2].classList).toContain(
                'avonni-list__item-image-container_rounded-corners'
            );
        });
    });

    /* ----- METHOD ----- */

    // reset
    // Depends on items and sortable
    it('reset method', () => {
        element.items = ITEMS;
        element.sortable = true;

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll('li');

            items[2].dispatchEvent(new CustomEvent('mousedown'));
            element.reset();
            expect(items[2].classList).not.toContain(
                'avonni-list__item-sortable_dragged'
            );
        });
    });

    /* ----- EVENT ----- */

    // actionclick
    // Depends on items and actions
    it('actionclick event, one action', () => {
        const handler = jest.fn();
        element.addEventListener('actionclick', handler);
        element.items = ITEMS;
        element.actions = ACTION;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                'li lightning-button'
            );
            button.dispatchEvent(new CustomEvent('click'));

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.item).toMatchObject(
                ITEMS[0]
            );
            expect(handler.mock.calls[0][0].detail.name).toBe(ACTION[0].name);
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
        });
    });

    it('actionclick event, one icon action', () => {
        const handler = jest.fn();
        element.addEventListener('actionclick', handler);
        element.items = ITEMS;
        element.actions = ACTION_NO_LABEL;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                'li lightning-button-icon'
            );
            button.dispatchEvent(new CustomEvent('click'));

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.item).toMatchObject(
                ITEMS[0]
            );
            expect(handler.mock.calls[0][0].detail.name).toBe(
                ACTION_NO_LABEL[0].name
            );
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
        });
    });

    it('actionclick event, multiple action', () => {
        const handler = jest.fn();
        element.addEventListener('actionclick', handler);
        element.items = ITEMS;
        element.actions = ACTIONS;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                'li lightning-button-menu'
            );
            button.dispatchEvent(
                new CustomEvent('select', {
                    detail: {
                        value: ACTIONS[0].name
                    }
                })
            );

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.item).toMatchObject(
                ITEMS[0]
            );
            expect(handler.mock.calls[0][0].detail.name).toBe(ACTIONS[0].name);
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
        });
    });

    // reorder
    // Depends on items
    it('reorder event', () => {
        const handler = jest.fn();
        element.addEventListener('itemclick', handler);
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll('li');

            items[2].dispatchEvent(new CustomEvent('click'));
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.item).toMatchObject(
                ITEMS[2]
            );
            expect(handler.mock.calls[0][0].detail.bounds).not.toBeUndefined();
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
        });
    });
});
