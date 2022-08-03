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
// Mouse move and all actions related to it (dragging the item and reorganizing the list)
// Touch events (we can't artificially give a touch position to save in _initialY)

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

    it('List: Default attributes', () => {
        expect(element.actions).toMatchObject([]);
        expect(element.alternativeText).toBeUndefined();
        expect(element.items).toMatchObject([]);
        expect(element.label).toBeUndefined();
        expect(element.sortable).toBeFalsy();
        expect(element.sortableIconName).toBeUndefined();
        expect(element.sortableIconPosition).toBe('right');
        expect(element.imageAttributes).toBeUndefined();
        expect(element.variant).toBe('list');
        expect(element.loadMoreOffset).toBe(20);
        expect(element.enableInfiniteLoading).toBeUndefined();
        expect(element.cols).toBeUndefined();
        expect(element.smallContainerCols).toBeUndefined();
        expect(element.mediumContainerCols).toBeUndefined();
        expect(element.LargeContainerCols).toBeUndefined();
        // add: enableInfiniteLoading, cols + small, medium, large,
    });

    /* ----- ATTRIBUTES ----- */

    // alternative-text
    it('List: AlternativeText', () => {
        element.alternativeText = 'A string alternative text';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector(
                '[data-element-id="span-alternative-text"]'
            );
            expect(span.textContent).toBe('A string alternative text');
        });
    });

    // items
    // it('List: Items', () => {
    //     element.items = ITEMS;

    //     return Promise.resolve().then(() => {
    //         const items = element.shadowRoot.querySelectorAll(
    //             '[data-element-id^="li-item"'
    //         );
    //         expect(items).toHaveLength(5);

    //         items.forEach((item, index) => {
    //             const originalItem = ITEMS[index];

    //             console.log(item);
    //             expect(item.dataset.index).toBe(index.toString());
    //             expect(item.ariaLabel).toBe(originalItem.label);
    //             expect(item.textContent).toBe(originalItem.label);
    //         });

    //         [0, 2].forEach((index) => {
    //             const item = items[index];
    //             const avatar = item.querySelector(
    //                 '[data-element-id="avonni-avatar"]'
    //             );
    //             expect(avatar.fallbackIconName).toBe(
    //                 ITEMS[index].avatar.fallbackIconName
    //             );
    //             expect(avatar.src).toBe(ITEMS[index].avatar.src);
    //         });

    //         [0, 1, 2, 4].forEach((index) => {
    //             const item = items[index];
    //             const avatar = item.querySelector(
    //                 '[data-element-id="avonni-avatar"]'
    //             );
    //             expect(avatar).toBeTruthy();
    //         });
    //         const item = items[3];
    //         const avatar = item.querySelector(
    //             '[data-element-id="avonni-avatar"]'
    //         );
    //         expect(avatar).toBeNull();
    //     });
    // });

    // label
    it('List: Label', () => {
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.avonni-list__header_font'
            );
            expect(label.textContent).toBe('A string label');
        });
    });

    // divider
    it('List: Divider = around', () => {
        element.divider = 'around';

        return Promise.resolve().then(() => {
            const menu = element.shadowRoot.querySelector(
                '.avonni-list__item-menu'
            );
            expect(menu.classList).toContain('avonni-list__has-card-style');
        });
    });
    it('List: Divider = top', () => {
        element.divider = 'top';

        return Promise.resolve().then(() => {
            const menu = element.shadowRoot.querySelector(
                '.avonni-list__item-menu'
            );
            expect(menu.classList).toContain('slds-has-dividers_top-space');
        });
    });
    it('List: Divider = bottom', () => {
        element.divider = 'bottom';

        return Promise.resolve().then(() => {
            const menu = element.shadowRoot.querySelector(
                '.avonni-list__item-menu'
            );
            expect(menu.classList).toContain('slds-has-dividers_bottom-space');
        });
    });

    // ACTIONS with BUTTON-MENU / BUTTON / BUTTON-ICON
    it('List: Actions button-menu', () => {
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
                    '[data-element-id^="lightning-menu-item"]'
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

    it('List: Action lightning-button', () => {
        element.items = ITEMS;
        element.actions = ACTION;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );

            expect(button.label).toBe('Completed');
            expect(button.iconName).toBe('utility:check');
            expect(button.disabled).toBeFalsy();
            expect(button.value).toBe('completed-action');
        });
    });

    it('List: Action lightning-button-icon', () => {
        element.items = ITEMS;
        element.actions = ACTION_NO_LABEL;

        return Promise.resolve().then(() => {
            const buttonIcon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon"]'
            );

            expect(buttonIcon.iconName).toBe('utility:event');
            expect(buttonIcon.disabled).toBeFalsy();
            expect(buttonIcon.value).toBe('event-action');
        });
    });

    // sortable
    // Depends on items
    it('List: Sortable = false', () => {
        element.sortable = false;
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="li-item"]'
            );
            const menu = element.shadowRoot.querySelector(
                '.avonni-list__item-menu'
            );

            expect(menu.role).toBeFalsy();

            items.forEach((item) => {
                expect(item.role).toBeFalsy();
            });

            // Item is clicked on
            items[1].dispatchEvent(new CustomEvent('mousedown'));
            expect(items[1].classList).not.toContain(
                'avonni-list__item-sortable_dragged'
            );
        });
    });

    it('List: Sortable = true', () => {
        element.sortable = true;
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="li-item"]'
            );
            const menu = element.shadowRoot.querySelector(
                '.avonni-list__item-menu'
            );

            expect(menu.role).toBe('listbox');

            items.forEach((item) => {
                expect(item.role).toBe('option');
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
    it('List: SortableIconName, with sortable = false', () => {
        element.sortableIconName = 'utility:apps';
        element.sortable = false;
        element.items = ITEMS_WITHOUT_ICONS;

        return Promise.resolve().then(() => {
            const icons = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-icon-sort"]'
            );
            expect(icons).toHaveLength(0);
        });
    });

    it('List: SortableIconName, with sortable = true', () => {
        element.sortableIconName = 'utility:apps';
        element.sortable = true;
        element.items = ITEMS_WITHOUT_ICONS;

        return Promise.resolve().then(() => {
            const icons = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-icon-sort"]'
            );
            icons.forEach((icon) => {
                expect(icon.iconName).toBe('utility:apps');
            });
            expect(icons).toHaveLength(4);
        });
    });

    // sortable-icon-position
    // Depends on items, sortable and sortableIconName
    it('List: SortableIconPosition = right', () => {
        element.sortableIconName = 'utility:drag_and_drop';
        element.sortable = true;
        element.sortableIconPosition = 'right';
        element.items = ITEMS_WITHOUT_ICONS;

        return Promise.resolve().then(() => {
            const iconsRight =
                element.shadowRoot.querySelectorAll('.icon-right');
            const iconsLeft = element.shadowRoot.querySelectorAll(
                '[data-element-id="lightning-icon-sort-left"]'
            );
            expect(iconsLeft).toHaveLength(0);
            expect(iconsRight).toHaveLength(4);
        });
    });

    it('List: SortableIconPosition = left', () => {
        element.sortableIconName = 'utility:apps';
        element.sortable = true;
        element.sortableIconPosition = 'left';
        element.items = ITEMS_WITHOUT_ICONS;

        return Promise.resolve().then(() => {
            const iconsRight =
                element.shadowRoot.querySelectorAll('.icon-right');
            const iconsLeft = element.shadowRoot.querySelectorAll(
                '[data-element-id="lightning-icon-sort-left"]'
            );
            expect(iconsRight).toHaveLength(0);
            expect(iconsLeft).toHaveLength(4);
        });
    });
    /* images */
    it('List: Images presence', () => {
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const images = element.shadowRoot.querySelectorAll(
                '[data-element-id="list-img-media"]'
            );
            expect(images).toHaveLength(3);
        });
    });

    it('List: Images size small', () => {
        element.items = ITEMS;
        element.imageAttributes = { size: 'small' };

        return Promise.resolve().then(() => {
            const images = element.shadowRoot.querySelectorAll(
                '[data-element-id="list-img"]'
            );
            expect(images[0].classList).toContain(
                'avonni-list__item-image_small-width'
            );
            expect(images[1].classList).toContain(
                'avonni-list__item-image_small-width'
            );
            expect(images[2].classList).toContain(
                'avonni-list__item-image_small-width'
            );
        });
    });

    it('List: Images width medium', () => {
        element.items = ITEMS;
        element.imageAttributes = { size: 'medium' };

        return Promise.resolve().then(() => {
            const images = element.shadowRoot.querySelectorAll(
                '[data-element-id="list-img"]'
            );
            expect(images[0].classList).toContain(
                'avonni-list__item-image_medium-width'
            );
            expect(images[1].classList).toContain(
                'avonni-list__item-image_medium-width'
            );
            expect(images[2].classList).toContain(
                'avonni-list__item-image_medium-width'
            );
        });
    });

    it('List: Images width large', () => {
        element.items = ITEMS;
        element.imageAttributes = { size: 'large' };

        return Promise.resolve().then(() => {
            const images = element.shadowRoot.querySelectorAll(
                '[data-element-id="list-img"]'
            );
            expect(images[0].classList).toContain(
                'avonni-list__item-image_large-width'
            );
            expect(images[1].classList).toContain(
                'avonni-list__item-image_large-width'
            );
            expect(images[2].classList).toContain(
                'avonni-list__item-image_large-width'
            );
        });
    });

    /* ----- METHOD ----- */

    // reset
    // Depends on items, sortable and the keyboard reorder
    it('List: Reset method', () => {
        element.items = ITEMS;
        element.sortable = true;

        return Promise.resolve()
            .then(() => {
                const items = element.shadowRoot.querySelectorAll(
                    '[data-element-id="li-item"]'
                );

                // Reorder
                const spaceEvent = new CustomEvent('keydown');
                spaceEvent.key = ' ';
                const downEvent = new CustomEvent('keydown');
                downEvent.key = 'ArrowDown';
                items[1].dispatchEvent(spaceEvent);
                items[1].dispatchEvent(downEvent);
                items[1].dispatchEvent(spaceEvent);
            })
            .then(() => {
                const items = element.shadowRoot.querySelectorAll(
                    '[data-element-id="li-item"]'
                );
                const label = items[1].querySelector(
                    '[data-element-id="div-item-label"]'
                );
                expect(label.textContent).toBe(ITEMS[2].label);
                element.reset();
            })
            .then(() => {
                const items = element.shadowRoot.querySelectorAll(
                    '[data-element-id="li-item"]'
                );
                const label = items[1].querySelector(
                    '[data-element-id="div-item-label"]'
                );
                expect(label.textContent).toBe(ITEMS[1].label);
            });
    });

    /* ----- EVENT ----- */

    // actionclick
    // Depends on items and actions
    it('List: Actionclick event, one action', () => {
        const handler = jest.fn();
        element.addEventListener('actionclick', handler);
        element.items = ITEMS;
        element.actions = ACTION;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            button.dispatchEvent(new CustomEvent('click'));

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.item).toMatchObject(
                ITEMS[0]
            );
            expect(handler.mock.calls[0][0].detail.name).toBe(ACTION[0].name);
            expect(handler.mock.calls[0][0].detail.targetName).toBe(
                ITEMS[0].name
            );
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
        });
    });

    it('List: Actionclick event, one icon action', () => {
        const handler = jest.fn();
        element.addEventListener('actionclick', handler);
        element.items = ITEMS;
        element.actions = ACTION_NO_LABEL;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon"]'
            );
            button.dispatchEvent(new CustomEvent('click'));

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.item).toMatchObject(
                ITEMS[0]
            );
            expect(handler.mock.calls[0][0].detail.name).toBe(
                ACTION_NO_LABEL[0].name
            );
            expect(handler.mock.calls[0][0].detail.targetName).toBe(
                ITEMS[0].name
            );
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
        });
    });

    it('List: Actionclick event, multiple action', () => {
        const handler = jest.fn();
        element.addEventListener('actionclick', handler);
        element.items = ITEMS;
        element.actions = ACTIONS;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-menu"]'
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
            expect(handler.mock.calls[0][0].detail.targetName).toBe(
                ITEMS[0].name
            );
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
        });
    });

    // itemclick
    // Depends on items
    it('List: Itemclick event', () => {
        const handler = jest.fn();
        element.addEventListener('itemclick', handler);
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="li-item"]'
            );

            items[2].dispatchEvent(new CustomEvent('click'));
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.item).toMatchObject(
                ITEMS[2]
            );
            expect(handler.mock.calls[0][0].detail.bounds).not.toBeUndefined();
            expect(handler.mock.calls[0][0].detail.name).toBe(ITEMS[2].name);
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
        });
    });

    it('List: Itemclick event, fired with keyboard', () => {
        const handler = jest.fn();
        element.addEventListener('itemclick', handler);
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="li-item"]'
            );

            const event = new CustomEvent('keydown');
            event.key = 'Enter';
            items[1].dispatchEvent(event);
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.item).toMatchObject(
                ITEMS[1]
            );
            expect(handler.mock.calls[0][0].detail.bounds).not.toBeUndefined();
            expect(handler.mock.calls[0][0].detail.name).toBe(ITEMS[1].name);
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
        });
    });

    // itemmousedown
    it('List: Itemmousedown event', () => {
        const handler = jest.fn();
        element.addEventListener('itemmousedown', handler);
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="li-item"]'
            );

            const event = new CustomEvent('mousedown');
            event.button = 0;
            items[2].dispatchEvent(event);
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.item).toMatchObject(
                ITEMS[2]
            );
            expect(handler.mock.calls[0][0].detail.name).toBe(ITEMS[2].name);
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
        });
    });

    // itemmouseup
    it('List: Itemmouseup event', () => {
        const handler = jest.fn();
        element.addEventListener('itemmouseup', handler);
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="li-item"]'
            );

            const event = new CustomEvent('mouseup');
            event.button = 0;
            items[1].dispatchEvent(event);
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.item).toMatchObject(
                ITEMS[1]
            );
            expect(handler.mock.calls[0][0].detail.name).toBe(ITEMS[1].name);
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
        });
    });

    // reorder
    // Depends on items and sortable
    it('List: Reorder event, fired with keyboard', () => {
        const newOrder = [ITEMS[0], ITEMS[2], ITEMS[1], ITEMS[3], ITEMS[4]];
        const handler = jest.fn();
        element.addEventListener('reorder', handler);
        element.items = ITEMS;
        element.sortable = true;

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="li-item"]'
            );

            // Start dragging
            const spaceEvent = new CustomEvent('keydown');
            spaceEvent.key = ' ';
            items[1].dispatchEvent(spaceEvent);

            // Move the item up and down
            const upDownEvent = new CustomEvent('keydown');
            upDownEvent.key = 'ArrowDown';
            items[1].dispatchEvent(upDownEvent);
            items[1].dispatchEvent(upDownEvent);
            upDownEvent.key = 'ArrowUp';
            items[1].dispatchEvent(upDownEvent);

            expect(items[2].classList).toContain(
                'avonni-list__item-sortable_moved'
            );

            // Stop dragging
            items[1].dispatchEvent(spaceEvent);

            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler.mock.calls[0][0].detail.items).toMatchObject(
                newOrder
            );
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
        });
    });

    it('List: Reorder event, cancel a move with escape key', () => {
        const handler = jest.fn();
        element.addEventListener('reorder', handler);
        element.items = ITEMS;
        element.sortable = true;

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="li-item"]'
            );

            // Start dragging
            const spaceEvent = new CustomEvent('keydown');
            spaceEvent.key = ' ';
            items[1].dispatchEvent(spaceEvent);

            // Move the item
            const upDownEvent = new CustomEvent('keydown');
            upDownEvent.key = 'ArrowDown';
            items[1].dispatchEvent(upDownEvent);
            items[1].dispatchEvent(upDownEvent);

            // Cancel
            const escEvent = new CustomEvent('keydown');
            escEvent.key = 'Escape';
            items[1].dispatchEvent(escEvent);

            expect(handler).toHaveBeenCalledTimes(0);
        });
    });
});
