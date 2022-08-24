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
import PillContainer from '../pillContainer';

// Not tested:
// Resize observer and auto count of hidden collapsed pills

const ITEMS = [
    {
        href: '#first-pill',
        label: 'First pill',
        name: 'first-pill',
        avatar: {
            fallbackIconName: 'custom:custom1',
            variant: 'circle'
        }
    },
    {
        label: 'Second pill',
        name: 'second-pill'
    },
    {
        label: 'Third pill',
        name: 'third-pill',
        avatar: {
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
            initials: 'FP'
        }
    }
];

let element;
expect.extend({
    toHavePosition(initialIndex, position) {
        const instructions = element.shadowRoot.querySelector(
            '[data-element-id="span-instructions"]'
        );
        const pills = element.shadowRoot.querySelectorAll(
            '[data-element-id="avonni-primitive-pill"]'
        );
        const label = pills[initialIndex].label;
        const total = pills.length;
        const altText = `${label}. ${position} / ${total}`;
        return {
            pass: instructions.textContent === altText,
            message: () =>
                `Expected assistive text to be "${altText}", but got "${instructions.textContent}"`
        };
    }
});

describe('Pill Container', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('avonni-pill-container', {
            is: PillContainer
        });
        document.body.appendChild(element);
    });

    it('Pill container: Default attributes', () => {
        expect(element.actions).toEqual([]);
        expect(element.alternativeText).toBe('Selected Options:');
        expect(element.isCollapsible).toBeFalsy();
        expect(element.isExpanded).toBeFalsy();
        expect(element.items).toEqual([]);
        expect(element.singleLine).toBeFalsy();
        expect(element.sortable).toBeFalsy();
    });

    /* ----- ATTRIBUTES ----- */

    // actions
    it('Pill container: actions', () => {
        const actions = [
            {
                label: 'Action 1',
                disabled: true,
                name: 'action1'
            },
            {
                label: 'Action 2',
                name: 'action2',
                iconName: 'utility:down'
            }
        ];
        element.items = ITEMS;
        element.actions = actions;

        return Promise.resolve().then(() => {
            const pills = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-pill"]'
            );
            pills.forEach((pill) => {
                expect(pill.actions).toEqual(actions);
            });
        });
    });

    // alternative-text
    it('Pill container: alternativeText', () => {
        element.alternativeText = 'Some alt text';

        return Promise.resolve().then(() => {
            const altText = element.shadowRoot.querySelector(
                '[data-element-id="span-alternative-text"]'
            );
            expect(altText.textContent).toBe('Some alt text');
        });
    });

    // is-collapsible and is-expanded
    it('Pill container: isCollapsible and isExpanded', () => {
        let button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-show-more"]'
        );
        expect(button).toBeFalsy();
        element.isCollapsible = true;

        return Promise.resolve()
            .then(() => {
                button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-show-more"]'
                );
                expect(button).toBeTruthy();

                button.click();
            })
            .then(() => {
                expect(element.isExpanded).toBeTruthy();
                button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-show-more"]'
                );
                expect(button).toBeFalsy();
            });
    });

    // items
    it('Pill container: items', () => {
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const pills = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-pill"]'
            );
            expect(pills).toHaveLength(ITEMS.length);

            pills.forEach((pill, index) => {
                expect(pill.avatar).toEqual(ITEMS[index].avatar);
                expect(pill.href).toBe(ITEMS[index].href);
                expect(pill.label).toBe(ITEMS[index].label);
            });
        });
    });

    // single-line
    it('Pill container: singleLine = false', () => {
        element.singleLine = false;
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            expect(wrapper.classList).not.toContain('slds-pill_container');
            expect(wrapper.classList).toContain('slds-listbox_selection-group');
            expect(wrapper.classList).toContain('slds-is-expanded');

            const ul = element.shadowRoot.querySelector(
                '[data-element-id="ul"]'
            );
            expect(ul.classList).not.toContain('slds-listbox_inline');

            const li = element.shadowRoot.querySelector(
                '[data-element-id="li"]'
            );
            expect(li.classList).not.toContain(
                'avonni-pill-container__item_sortable-single-line'
            );
        });
    });

    it('Pill container: singleLine = true', () => {
        element.singleLine = true;
        element.sortable = true;
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            expect(wrapper.classList).toContain('slds-pill_container');
            expect(wrapper.classList).not.toContain(
                'slds-listbox_selection-group'
            );
            expect(wrapper.classList).not.toContain('slds-is-expanded');

            const ul = element.shadowRoot.querySelector(
                '[data-element-id="ul"]'
            );
            expect(ul.classList).toContain('slds-listbox_inline');

            const li = element.shadowRoot.querySelector(
                '[data-element-id="li"]'
            );
            expect(li.classList).toContain(
                'avonni-pill-container__item_sortable-single-line'
            );
        });
    });

    // sortable
    it('Pill container: sortable = false', () => {
        element.sortable = false;
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const pill = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-pill"]'
            );
            expect(pill.classList).not.toContain(
                'avonni-pill-container__pill-sortable'
            );

            const li = element.shadowRoot.querySelector(
                '[data-element-id="li"]'
            );
            expect(li.classList).not.toContain('slds-is-relative');
            expect(li.classList).not.toContain(
                'avonni-pill-container__item_sortable-single-line'
            );
        });
    });

    it('Pill container: sortable = true', () => {
        element.sortable = true;
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const pill = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-pill"]'
            );
            expect(pill.classList).toContain(
                'avonni-pill-container__pill-sortable'
            );

            const li = element.shadowRoot.querySelector(
                '[data-element-id="li"]'
            );
            expect(li.classList).toContain('slds-is-relative');
            expect(li.classList).not.toContain(
                'avonni-pill-container__item_sortable-single-line'
            );
        });
    });

    /*
     * ------------------------------------------------------------
     *  METHODS
     * -------------------------------------------------------------
     */

    it('Pill container: focus() method, no items', () => {
        const ul = element.shadowRoot.querySelector('[data-element-id="ul"]');
        const spy = jest.spyOn(ul, 'focus');

        element.focus();
        expect(spy).toHaveBeenCalled();
    });

    it('Pill container: focus() method, item with no link', () => {
        element.items = [ITEMS[1]];

        return Promise.resolve().then(() => {
            const pill = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-pill"]'
            );
            const focusSpy = jest.spyOn(pill, 'focus');
            const focusLinkSpy = jest.spyOn(pill, 'focusLink');

            element.focus();
            expect(focusSpy).toHaveBeenCalled();
            expect(focusLinkSpy).not.toHaveBeenCalled();
        });
    });

    it('Pill container: focus() method, item with a link', () => {
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const pill = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-pill"]'
            );
            const focusSpy = jest.spyOn(pill, 'focus');
            const focusLinkSpy = jest.spyOn(pill, 'focusLink');

            element.focus();
            expect(focusSpy).not.toHaveBeenCalled();
            expect(focusLinkSpy).toHaveBeenCalled();
        });
    });

    it('Pill container: focus() method is called on pill click', () => {
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const pills = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-pill"]'
            );
            const focusSpy = jest.spyOn(pills[1], 'focus');

            expect(pills[1].tabIndex).toBe(-1);
            pills[1].click();
            expect(pills[1].tabIndex).toBe(0);
            expect(focusSpy).toHaveBeenCalled();
        });
    });

    it('Pill container: focus() method is called on "show more" click', () => {
        element.items = ITEMS;
        element.isCollapsible = true;

        return Promise.resolve().then(() => {
            const showMore = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-show-more"]'
            );
            const pills = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-pill"]'
            );
            const focusSpy = jest.spyOn(pills[0], 'focusLink');

            showMore.click();
            expect(focusSpy).toHaveBeenCalled();
        });
    });

    it('Pill container: focused item changes on keyboard navigation', () => {
        element.items = ITEMS;
        const keyDown = new CustomEvent('keydown');

        return Promise.resolve().then(() => {
            const pills = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-pill"]'
            );
            const ul = element.shadowRoot.querySelector(
                '[data-element-id="ul"]'
            );
            const focusSpy = jest.spyOn(pills[1], 'focus');
            const focusLinkSpy = jest.spyOn(pills[0], 'focusLink');

            // Press right
            keyDown.keyCode = 39;
            ul.dispatchEvent(keyDown);
            expect(pills[1].tabIndex).toBe(0);
            expect(focusSpy).toHaveBeenCalled();

            // Press left
            keyDown.keyCode = 37;
            ul.dispatchEvent(keyDown);
            expect(pills[1].tabIndex).toBe(-1);
            expect(pills[0].tabIndex).toBe(0);
            expect(focusLinkSpy).toHaveBeenCalled();

            // Press left again, to loop back to the last item
            keyDown.keyCode = 37;
            ul.dispatchEvent(keyDown);
            expect(pills[0].tabIndex).toBe(-1);
            expect(pills[2].tabIndex).toBe(0);

            // Press right again, to loop back to the first item
            keyDown.keyCode = 39;
            ul.dispatchEvent(keyDown);
            expect(pills[0].tabIndex).toBe(0);
            expect(pills[2].tabIndex).toBe(-1);
        });
    });

    /*
     * ------------------------------------------------------------
     *  EVENTS
     * -------------------------------------------------------------
     */

    // actionclick
    it('Pill container: actionclick event', () => {
        element.items = ITEMS;
        element.actions = [
            {
                label: 'action 1',
                name: 'action-1',
                iconName: 'utility:user'
            }
        ];

        const handler = jest.fn();
        element.addEventListener('actionclick', handler);

        return Promise.resolve().then(() => {
            const pills = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-pill"]'
            );
            pills[2].dispatchEvent(
                new CustomEvent('actionclick', {
                    detail: {
                        name: 'action-1'
                    },
                    bubbles: true
                })
            );

            expect(handler).toHaveBeenCalled();
            const event = handler.mock.calls[0][0];
            expect(event.detail.name).toBe('action-1');
            expect(event.detail.index).toBe(2);
            expect(event.detail.targetName).toBe(ITEMS[2].name);
            expect(event.bubbles).toBeFalsy();
            expect(event.cancelable).toBeFalsy();
            expect(event.composed).toBeFalsy();
        });
    });

    // blur
    it('Pill container: blur event', () => {
        element.items = ITEMS;

        const handler = jest.fn();
        element.addEventListener('blur', handler);

        return Promise.resolve().then(() => {
            const pills = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-pill"]'
            );
            pills[2].dispatchEvent(
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

    // focus
    it('Pill container: focus event', () => {
        element.items = ITEMS;

        const handler = jest.fn();
        element.addEventListener('focus', handler);

        return Promise.resolve().then(() => {
            const pills = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-pill"]'
            );
            pills[1].dispatchEvent(
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
    it('Pill container: reorder event, to the right', () => {
        element.items = ITEMS;
        element.sortable = true;
        jest.useFakeTimers();

        const handler = jest.fn();
        element.addEventListener('reorder', handler);

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="li"]'
            );
            items[0].dispatchEvent(new MouseEvent('mousedown'));
            jest.runAllTimers();

            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            expect(wrapper.classList).toContain(
                'avonni-pill-container__list_dragging'
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
                'avonni-pill-container__pill_right-border'
            );

            element.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
            expect(handler).toHaveBeenCalled();
            const event = handler.mock.calls[0][0];
            expect(event.detail.items).toEqual([ITEMS[1], ITEMS[0], ITEMS[2]]);
            expect(event.bubbles).toBeFalsy();
            expect(event.cancelable).toBeFalsy();
            expect(event.composed).toBeFalsy();

            expect(wrapper.classList).not.toContain(
                'avonni-pill-container__list_dragging'
            );
            expect(items[1].classList).not.toContain(
                'avonni-pill-container__pill_right-border'
            );
        });
    });

    it('Pill container: reorder event, to the left', () => {
        element.items = ITEMS;
        element.sortable = true;
        jest.useFakeTimers();

        const handler = jest.fn();
        element.addEventListener('reorder', handler);

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="li"]'
            );
            items[2].dispatchEvent(new MouseEvent('mousedown'));
            jest.runAllTimers();

            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            expect(wrapper.classList).toContain(
                'avonni-pill-container__list_dragging'
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
                'avonni-pill-container__pill_left-border'
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

    it('Pill container: reorder event, using keyboard', () => {
        element.items = ITEMS;
        element.sortable = true;
        jest.useFakeTimers();

        const handler = jest.fn();
        element.addEventListener('reorder', handler);
        const keyDown = new CustomEvent('keydown');

        return Promise.resolve()
            .then(() => {
                const items = element.shadowRoot.querySelectorAll(
                    '[data-element-id="li"]'
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
                    'avonni-pill-container__list_dragging'
                );
                expect(0).toHavePosition(1);

                // Press right more times than the length of the list
                keyDown.keyCode = 39;
                ul.dispatchEvent(keyDown);
                expect(items[1].classList).toContain(
                    'avonni-pill-container__pill_right-border'
                );
                ul.dispatchEvent(keyDown);
                expect(items[2].classList).toContain(
                    'avonni-pill-container__pill_right-border'
                );
                ul.dispatchEvent(keyDown);
                expect(items[2].classList).toContain(
                    'avonni-pill-container__pill_right-border'
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
                    '[data-element-id="li"]'
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
                    'avonni-pill-container__pill_left-border'
                );
                ul.dispatchEvent(keyDown);
                expect(items[0].classList).toContain(
                    'avonni-pill-container__pill_left-border'
                );
                ul.dispatchEvent(keyDown);
                expect(items[0].classList).toContain(
                    'avonni-pill-container__pill_left-border'
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

    it('Pill container: reorder event, cancel movement using keyboard', () => {
        element.items = ITEMS;
        element.sortable = true;
        jest.useFakeTimers();

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
});
