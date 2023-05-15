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
import ChipContainer from '../chipContainer';

const ITEMS = [
    {
        label: 'First chip',
        name: 'first',
        prefixIconName: 'utility',
        suffixIconName: 'table',
        variant: 'base',
        outline: true
    },
    {
        label: 'loooooooooooooooooooooooooooooooooooooooooooooooong 2nd chip',
        name: 'second',
        variant: 'warning',
        outline: false,
        avatar: {
            fallbackIconName: 'custom:custom1',
            size: 'x-small',
            variant: 'circle',
            position: 'left'
        }
    },
    {
        label: 'third chip',
        name: 'third',
        outline: false,
        variant: 'base',
        avatar: {
            fallbackIconName: 'custom:custom1',
            variant: 'circle',
            size: 'x-small',
            position: 'right'
        }
    }
];

const DEFAULT_ALTERNATIVE_TEXT = 'Selected Options:';

let element;
expect.extend({
    toHavePosition(initialIndex, position) {
        const instructions = element.shadowRoot.querySelector(
            '[data-element-id="span-instructions"]'
        );
        const chips = element.shadowRoot.querySelectorAll(
            '[data-element-id="avonni-primitive-chip"]'
        );
        const label = chips[initialIndex].label;
        const total = chips.length;
        const altText = `${label}. ${position} / ${total}`;
        return {
            pass: instructions.textContent === altText,
            message: () =>
                `Expected assistive text to be "${altText}", but got "${instructions.textContent}"`
        };
    }
});

// not tested
// AvonniResizeObserver callback()
// computedButtonLabel on resize (check for correct value)

describe('Chip Container', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('avonni-chip-container', {
            is: ChipContainer
        });
        document.body.appendChild(element);
    });

    it('Default attributes', () => {
        expect(element.alternativeText).toEqual(DEFAULT_ALTERNATIVE_TEXT);
        expect(element.isCollapsible).toEqual(false);
        expect(element.isExpanded).toEqual(false);
        expect(element.items).toEqual([]);
        expect(element.singleLine).toBeFalsy();
        expect(element.sortable).toBeFalsy();
    });

    /* ----- ATTRIBUTES ----- */

    // alternative text
    it('alternative text', () => {
        element.alternativeText = 'alternative text';
        return Promise.resolve().then(() => {
            const itemsContainer = element.shadowRoot.querySelector(
                '[data-element-id="span-alternative-text"]'
            );
            expect(itemsContainer.textContent).toEqual('alternative text');
        });
    });

    // is-collapsible and is-expanded
    it('Chip container: isCollapsible and isExpanded', () => {
        const wrapper = element.shadowRoot.querySelector(
            '[data-element-id="div-wrapper"]'
        );
        jest.spyOn(wrapper, 'offsetWidth', 'get').mockImplementation(() => 150);
        element.items = ITEMS;

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-show-more"]'
                );
                expect(button).toBeFalsy();

                const items = element.shadowRoot.querySelectorAll(
                    '[data-element-id="li-item"]'
                );
                items.forEach((it) => {
                    jest.spyOn(it, 'offsetWidth', 'get').mockImplementation(
                        () => 50
                    );
                });

                element.isCollapsible = true;
            })
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-show-more"]'
                );
                expect(button).toBeTruthy();

                const items = element.shadowRoot.querySelectorAll(
                    '[data-element-id="li-item"]'
                );
                expect(items).toHaveLength(1);

                element.isExpanded = true;
            })
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-show-more"]'
                );
                expect(button).toBeFalsy();

                const items = element.shadowRoot.querySelectorAll(
                    '[data-element-id="li-item"]'
                );
                expect(items).toHaveLength(ITEMS.length);
            });
    });
    it('Chip container: expand collapsed chips on button click', () => {
        const wrapper = element.shadowRoot.querySelector(
            '[data-element-id="div-wrapper"]'
        );
        jest.spyOn(wrapper, 'offsetWidth', 'get').mockImplementation(() => 150);
        element.items = ITEMS;

        return Promise.resolve()
            .then(() => {
                const items = element.shadowRoot.querySelectorAll(
                    '[data-element-id="li-item"]'
                );
                items.forEach((it) => {
                    jest.spyOn(it, 'offsetWidth', 'get').mockImplementation(
                        () => 50
                    );
                });
                element.isCollapsible = true;
            })
            .then(() => {
                const items = element.shadowRoot.querySelectorAll(
                    '[data-element-id="li-item"]'
                );
                expect(items).toHaveLength(1);

                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-show-more"]'
                );
                button.click();
            })
            .then(() => {
                const items = element.shadowRoot.querySelectorAll(
                    '[data-element-id="li-item"]'
                );
                expect(items).toHaveLength(ITEMS.length);
            });
    });

    it('Chip container: open collapsed popover on single-line button click', () => {
        const wrapper = element.shadowRoot.querySelector(
            '[data-element-id="div-wrapper"]'
        );
        jest.spyOn(wrapper, 'offsetWidth', 'get').mockImplementation(() => 150);
        element.items = ITEMS;
        element.singleLine = true;

        return Promise.resolve()
            .then(() => {
                const items = element.shadowRoot.querySelectorAll(
                    '[data-element-id="li-item"]'
                );
                items.forEach((it) => {
                    jest.spyOn(it, 'offsetWidth', 'get').mockImplementation(
                        () => 50
                    );
                });
                element.isCollapsible = true;
            })
            .then(() => {
                const items = element.shadowRoot.querySelectorAll(
                    '[data-element-id="li-item"]'
                );
                expect(items).toHaveLength(1);

                const popover = element.shadowRoot.querySelector(
                    '[data-element-id="div-popover"]'
                );
                expect(popover).toBeFalsy();

                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-show-more"]'
                );
                button.click();
            })
            .then(() => {
                const items = element.shadowRoot.querySelectorAll(
                    '[data-element-id="li-item"]'
                );
                expect(items).toHaveLength(1);

                const popover = element.shadowRoot.querySelector(
                    '[data-element-id="div-popover"]'
                );
                expect(popover).toBeTruthy();

                const hiddenItems = element.shadowRoot.querySelectorAll(
                    '[data-element-id="li-item-hidden"]'
                );
                expect(hiddenItems).toHaveLength(ITEMS.length - 1);
            });
    });

    it('Chip container: close single-line collapsed popover on focusout', () => {
        const wrapper = element.shadowRoot.querySelector(
            '[data-element-id="div-wrapper"]'
        );
        jest.spyOn(wrapper, 'offsetWidth', 'get').mockImplementation(() => 150);
        element.items = ITEMS;
        element.singleLine = true;

        return Promise.resolve()
            .then(() => {
                const items = element.shadowRoot.querySelectorAll(
                    '[data-element-id="li-item"]'
                );
                items.forEach((it) => {
                    jest.spyOn(it, 'offsetWidth', 'get').mockImplementation(
                        () => 25
                    );
                });
                element.isCollapsible = true;
            })
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-show-more"]'
                );
                button.click();
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector(
                    '[data-element-id="div-popover"]'
                );
                expect(popover).toBeTruthy();

                jest.useFakeTimers();
            });
    });

    // items
    it('Chip Container: items', () => {
        element.items = ITEMS;
        return Promise.resolve().then(() => {
            const chips = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-chip"]'
            );
            expect(chips.length).toBe(3);
            chips.forEach((chip, index) => {
                expect(chip.label).toBe(ITEMS[index].label);
                expect(chip.variant).toBe(ITEMS[index].variant);
                expect(chip.prefixIconName).toBe(ITEMS[index].prefixIconName);
                expect(chip.suffixIconName).toBe(ITEMS[index].suffixIconName);
                expect(chip.avatar).toEqual(ITEMS[index].avatar || null);
                expect(chip.outline).toBe(ITEMS[index].outline);
            });
        });
    });

    // single-line
    it('Chip container: singleLine = false', () => {
        element.singleLine = false;
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            expect(wrapper.className).toBe(
                'avonni-chip-container__wrapper slds-is-relative'
            );

            const ul = element.shadowRoot.querySelector(
                '[data-element-id="ul"]'
            );
            expect(ul.classList).not.toContain('slds-listbox_inline');

            const li = element.shadowRoot.querySelector(
                '[data-element-id="li-item"]'
            );
            expect(li.classList).not.toContain(
                'avonni-chip-container__item_sortable-single-line'
            );
        });
    });

    it('Chip container: singleLine = true', () => {
        element.singleLine = true;
        element.sortable = true;
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            expect(wrapper.className).toBe(
                'avonni-chip-container__wrapper slds-is-relative avonni-chip-container__container'
            );

            const ul = element.shadowRoot.querySelector(
                '[data-element-id="ul"]'
            );
            expect(ul.classList).toContain('slds-listbox_inline');

            const li = element.shadowRoot.querySelector(
                '[data-element-id="li-item"]'
            );
            expect(li.classList).toContain(
                'avonni-chip-container__item_sortable-single-line'
            );
        });
    });

    // sortable
    it('Chip container: sortable = false', () => {
        element.sortable = false;
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const chip = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-chip"]'
            );
            expect(chip.classList).not.toContain(
                'avonni-chip-container__chip-sortable'
            );

            const li = element.shadowRoot.querySelector(
                '[data-element-id="li-item"]'
            );
            expect(li.classList).not.toContain('slds-is-relative');
            expect(li.classList).not.toContain(
                'avonni-chip-container__item_sortable-single-line'
            );
        });
    });

    it('Chip container: sortable = true', () => {
        element.sortable = true;
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const chip = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-chip"]'
            );
            expect(chip.classList).toContain(
                'avonni-chip-container__chip-sortable'
            );

            const li = element.shadowRoot.querySelector(
                '[data-element-id="li-item"]'
            );
            expect(li.classList).toContain('slds-is-relative');
            expect(li.classList).not.toContain(
                'avonni-chip-container__item_sortable-single-line'
            );
        });
    });

    /*
     * ------------------------------------------------------------
     *  METHODS
     * -------------------------------------------------------------
     */

    it('Chip container: focus() method, no items', () => {
        const ul = element.shadowRoot.querySelector('[data-element-id="ul"]');
        const spy = jest.spyOn(ul, 'focus');

        element.focus();
        expect(spy).toHaveBeenCalled();
    });

    it('Chip container: focus() method is called on chip click', () => {
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const chips = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-chip"]'
            );
            const focusSpy = jest.spyOn(chips[1], 'focus');

            expect(chips[1].tabIndex).toBe(-1);
            chips[1].click();
            expect(chips[1].tabIndex).toBe(0);
            expect(focusSpy).toHaveBeenCalled();
        });
    });

    it('Chip container: focused item changes on keyboard navigation', () => {
        element.items = ITEMS;
        const keyDown = new CustomEvent('keydown');

        return Promise.resolve().then(() => {
            const chips = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-chip"]'
            );
            const ul = element.shadowRoot.querySelector(
                '[data-element-id="ul"]'
            );
            const focusSpySecond = jest.spyOn(chips[1], 'focus');
            const focusLinkFirst = jest.spyOn(chips[0], 'focus');

            // Press right
            keyDown.keyCode = 39;
            ul.dispatchEvent(keyDown);
            expect(chips[1].tabIndex).toBe(0);
            expect(focusSpySecond).toHaveBeenCalled();

            // Press left
            keyDown.keyCode = 37;
            ul.dispatchEvent(keyDown);
            expect(chips[1].tabIndex).toBe(-1);
            expect(chips[0].tabIndex).toBe(0);
            expect(focusLinkFirst).toHaveBeenCalled();

            // Press left again, to loop back to the last item
            keyDown.keyCode = 37;
            ul.dispatchEvent(keyDown);
            expect(chips[0].tabIndex).toBe(-1);
            expect(chips[2].tabIndex).toBe(0);

            // Press right again, to loop back to the first item
            keyDown.keyCode = 39;
            ul.dispatchEvent(keyDown);
            expect(chips[0].tabIndex).toBe(0);
            expect(chips[2].tabIndex).toBe(-1);
        });
    });

    /*
     * ------------------------------------------------------------
     *  EVENTS
     * -------------------------------------------------------------
     */

    // blur
    it('Chip container: blur event', () => {
        element.items = ITEMS;

        const handler = jest.fn();
        element.addEventListener('blur', handler);

        return Promise.resolve().then(() => {
            const chips = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-chip"]'
            );
            chips[2].dispatchEvent(
                new FocusEvent('focusout', {
                    bubbles: true
                })
            );

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
        });
    });

    // expand
    it('Chip container: expand event', () => {
        const wrapper = element.shadowRoot.querySelector(
            '[data-element-id="div-wrapper"]'
        );
        jest.spyOn(wrapper, 'offsetWidth', 'get').mockImplementation(() => 150);
        element.items = ITEMS;

        const handler = jest.fn();
        element.addEventListener('expand', handler);

        return Promise.resolve()
            .then(() => {
                const items = element.shadowRoot.querySelectorAll(
                    '[data-element-id="li-item"]'
                );
                items.forEach((it) => {
                    jest.spyOn(it, 'offsetWidth', 'get').mockImplementation(
                        () => 50
                    );
                });
                element.isCollapsible = true;
            })
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-show-more"]'
                );
                button.click();

                expect(handler).toHaveBeenCalled();
                const call = handler.mock.calls[0][0];
                expect(call.bubbles).toBeFalsy();
                expect(call.cancelable).toBeFalsy();
                expect(call.composed).toBeFalsy();
            });
    });

    // focus
    it('Chip container: focus event', () => {
        element.items = ITEMS;

        const handler = jest.fn();
        element.addEventListener('focus', handler);

        return Promise.resolve().then(() => {
            const chips = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-chip"]'
            );
            chips[1].dispatchEvent(
                new FocusEvent('focusin', {
                    bubbles: true
                })
            );

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
        });
    });

    // reorder
    it('Chip container: reorder event, to the right', () => {
        element.items = ITEMS;
        element.sortable = true;

        const handler = jest.fn();
        element.addEventListener('reorder', handler);

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="li-item"]'
            );
            items[0].dispatchEvent(new MouseEvent('mousedown'));
            jest.runAllTimers();

            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            expect(wrapper.classList).toContain(
                'avonni-chip-container__list_dragging'
            );
            expect(0).toHavePosition(1);

            items[1].getBoundingClientRect = jest
                .fn()
                .mockImplementation(() => {
                    return {
                        left: 50,
                        width: 10
                    };
                });
            const mousemove = new CustomEvent('mousemove');
            mousemove.clientX = 70;
            items[1].dispatchEvent(mousemove);

            expect(0).toHavePosition(2);
            expect(items[1].classList).toContain(
                'avonni-chip-container__chip_after-border'
            );

            element.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
            expect(handler).toHaveBeenCalled();
            const event = handler.mock.calls[0][0];
            expect(event.detail.items).toEqual([ITEMS[1], ITEMS[0], ITEMS[2]]);
            expect(event.bubbles).toBeFalsy();
            expect(event.cancelable).toBeFalsy();
            expect(event.composed).toBeFalsy();

            expect(wrapper.classList).not.toContain(
                'avonni-chip-container__list_dragging'
            );
            expect(items[1].classList).not.toContain(
                'avonni-chip-container__chip_after-border'
            );
        });
    });

    it('Chip container: reorder event, to the left', () => {
        element.items = ITEMS;
        element.sortable = true;

        const handler = jest.fn();
        element.addEventListener('reorder', handler);

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="li-item"]'
            );
            items[2].dispatchEvent(new MouseEvent('mousedown'));
            jest.runAllTimers();

            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            expect(wrapper.classList).toContain(
                'avonni-chip-container__list_dragging'
            );
            expect(2).toHavePosition(3);

            items[1].getBoundingClientRect = jest
                .fn()
                .mockImplementation(() => {
                    return {
                        left: 50,
                        width: 10
                    };
                });
            const mousemove = new CustomEvent('mousemove');
            mousemove.clientX = 30;
            items[1].dispatchEvent(mousemove);

            expect(2).toHavePosition(2);
            expect(items[1].classList).toContain(
                'avonni-chip-container__chip_before-border'
            );

            element.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.items).toEqual([
                ITEMS[0],
                ITEMS[2],
                ITEMS[1]
            ]);
        });
    });

    it('Chip container: reorder event, using keyboard', () => {
        element.items = ITEMS;
        element.sortable = true;

        const handler = jest.fn();
        element.addEventListener('reorder', handler);
        const keyDown = new CustomEvent('keydown');

        return Promise.resolve()
            .then(() => {
                const items = element.shadowRoot.querySelectorAll(
                    '[data-element-id="li-item"]'
                );
                const ul = element.shadowRoot.querySelector(
                    '[data-element-id="ul"]'
                );

                // Press space
                keyDown.keyCode = 32;
                ul.dispatchEvent(keyDown);
                const wrapper = element.shadowRoot.querySelector(
                    '[data-element-id="div-wrapper"]'
                );
                expect(wrapper.classList).toContain(
                    'avonni-chip-container__list_dragging'
                );
                expect(0).toHavePosition(1);

                // Press right more times than the length of the list
                keyDown.keyCode = 39;
                ul.dispatchEvent(keyDown);
                expect(items[1].classList).toContain(
                    'avonni-chip-container__chip_after-border'
                );
                ul.dispatchEvent(keyDown);
                expect(items[2].classList).toContain(
                    'avonni-chip-container__chip_after-border'
                );
                ul.dispatchEvent(keyDown);
                expect(items[2].classList).toContain(
                    'avonni-chip-container__chip_after-border'
                );
                expect(0).toHavePosition(3);

                // Press space
                keyDown.keyCode = 32;
                ul.dispatchEvent(keyDown);
                expect(handler).toHaveBeenCalledTimes(1);
                expect(handler.mock.calls[0][0].detail.items).toEqual([
                    ITEMS[1],
                    ITEMS[2],
                    ITEMS[0]
                ]);
            })
            .then(() => {
                const items = element.shadowRoot.querySelectorAll(
                    '[data-element-id="li-item"]'
                );
                const ul = element.shadowRoot.querySelector(
                    '[data-element-id="ul"]'
                );

                // Press space
                ul.dispatchEvent(keyDown);
                expect(2).toHavePosition(3);

                // Press left more times than the length of the list
                keyDown.keyCode = 37;
                ul.dispatchEvent(keyDown);
                expect(items[1].classList).toContain(
                    'avonni-chip-container__chip_before-border'
                );
                ul.dispatchEvent(keyDown);
                expect(items[0].classList).toContain(
                    'avonni-chip-container__chip_before-border'
                );
                ul.dispatchEvent(keyDown);
                expect(items[0].classList).toContain(
                    'avonni-chip-container__chip_before-border'
                );
                expect(2).toHavePosition(1);

                // Press space
                keyDown.keyCode = 32;
                ul.dispatchEvent(keyDown);
                expect(handler).toHaveBeenCalledTimes(2);
                expect(handler.mock.calls[1][0].detail.items).toEqual([
                    ITEMS[0],
                    ITEMS[1],
                    ITEMS[2]
                ]);
            });
    });

    it('Chip container: reorder event, cancel movement using keyboard', () => {
        element.items = ITEMS;
        element.sortable = true;

        const handler = jest.fn();
        element.addEventListener('reorder', handler);
        const keyDown = new CustomEvent('keydown');

        return Promise.resolve().then(() => {
            const ul = element.shadowRoot.querySelector(
                '[data-element-id="ul"]'
            );

            // Press space
            keyDown.keyCode = 32;
            ul.dispatchEvent(keyDown);

            // Press right
            keyDown.keyCode = 39;
            ul.dispatchEvent(keyDown);

            // Press escape
            keyDown.keyCode = 27;
            ul.dispatchEvent(keyDown);
            expect(handler).not.toHaveBeenCalled();
        });
    });

    it('Chip container: reorder event, from single-line collapsed popover to visible chip', () => {
        const wrapper = element.shadowRoot.querySelector(
            '[data-element-id="div-wrapper"]'
        );
        jest.spyOn(wrapper, 'offsetWidth', 'get').mockImplementation(() => 150);

        element.items = ITEMS;
        element.sortable = true;
        element.singleLine = true;

        const handler = jest.fn();
        element.addEventListener('reorder', handler);

        return Promise.resolve()
            .then(() => {
                // Collapse the items
                const items = element.shadowRoot.querySelectorAll(
                    '[data-element-id="li-item"]'
                );
                items.forEach((it) => {
                    jest.spyOn(it, 'offsetWidth', 'get').mockImplementation(
                        () => 50
                    );
                });
                element.isCollapsible = true;
            })
            .then(() => {
                // Open the popover
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-show-more"]'
                );
                button.click();
            })
            .then(() => {
                // Start dragging
                const hiddenItems = element.shadowRoot.querySelectorAll(
                    '[data-element-id="li-item-hidden"]'
                );
                hiddenItems[0].dispatchEvent(new CustomEvent('mousedown'));
                jest.runAllTimers();

                // Move at the beginning of the list
                const items = element.shadowRoot.querySelectorAll(
                    '[data-element-id="li-item"]'
                );
                jest.spyOn(
                    items[0],
                    'getBoundingClientRect'
                ).mockImplementation(() => {
                    return { left: 3, width: 50, top: 120, height: 20 };
                });
                const mouseMove = new CustomEvent('mousemove');
                mouseMove.clientX = 12;
                items[0].dispatchEvent(mouseMove);

                expect(items[0].classList).toContain(
                    'avonni-chip-container__chip_before-border'
                );
                items[0].dispatchEvent(
                    new CustomEvent('mouseup', { bubbles: true })
                );

                expect(handler).toHaveBeenCalledTimes(1);
                const detail = handler.mock.calls[0][0].detail;
                expect(detail.items).toEqual([ITEMS[1], ITEMS[0], ITEMS[2]]);
            });
    });

    it('Chip container: reorder event, from visible chip to single-line collapsed popover', () => {
        const wrapper = element.shadowRoot.querySelector(
            '[data-element-id="div-wrapper"]'
        );
        jest.spyOn(wrapper, 'offsetWidth', 'get').mockImplementation(() => 150);

        element.items = ITEMS;
        element.sortable = true;
        element.singleLine = true;

        const handler = jest.fn();
        element.addEventListener('reorder', handler);

        return Promise.resolve()
            .then(() => {
                // Collapse the items
                const items = element.shadowRoot.querySelectorAll(
                    '[data-element-id="li-item"]'
                );
                items.forEach((it) => {
                    jest.spyOn(it, 'offsetWidth', 'get').mockImplementation(
                        () => 50
                    );
                });
                element.isCollapsible = true;
            })
            .then(() => {
                // Start dragging
                const items = element.shadowRoot.querySelectorAll(
                    '[data-element-id="li-item"]'
                );
                items.forEach((it) => {
                    jest.spyOn(it, 'offsetWidth', 'get').mockImplementation(
                        () => 50
                    );
                });
                items[0].dispatchEvent(new CustomEvent('mousedown'));
                jest.runAllTimers();

                // Hover the button to open the popover
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-show-more"]'
                );
                button.dispatchEvent(new CustomEvent('mouseenter'));
                jest.runAllTimers();
            })
            .then(() => {
                // Move at the bottom of the first hidden item
                const popover = element.shadowRoot.querySelector(
                    '[data-element-id="div-popover"]'
                );
                expect(popover).toBeTruthy();

                const hiddenItems = element.shadowRoot.querySelectorAll(
                    '[data-element-id="li-item-hidden"]'
                );
                jest.spyOn(
                    hiddenItems[0],
                    'getBoundingClientRect'
                ).mockImplementation(() => {
                    return { left: 3, width: 50, top: 120, height: 20 };
                });
                const mouseMove = new CustomEvent('mousemove');
                mouseMove.clientY = 135;
                hiddenItems[0].dispatchEvent(mouseMove);
                expect(hiddenItems[0].classList).toContain(
                    'avonni-chip-container__chip_after-border'
                );

                hiddenItems[0].dispatchEvent(
                    new CustomEvent('mouseup', { bubbles: true })
                );
                expect(handler).toHaveBeenCalledTimes(1);
                const detail = handler.mock.calls[0][0].detail;
                expect(detail.items).toEqual([ITEMS[1], ITEMS[0], ITEMS[2]]);
            });
    });
});
