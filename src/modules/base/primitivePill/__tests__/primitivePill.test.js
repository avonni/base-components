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
import PrimitivePill from '../primitivePill';

const ACTIONS = [
    {
        disabled: true,
        iconName: 'utility:down',
        label: 'Disabled action',
        name: 'disabledAction'
    },
    {
        label: 'Action one',
        name: 'one'
    },
    {
        iconName: 'standard:apps',
        label: 'Another action',
        name: 'another'
    }
];

let element;
describe('Primitive Pill', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('avonni-primitive-pill', {
            is: PrimitivePill
        });
        document.body.appendChild(element);
    });

    it('Primitive pill: Default attributes', () => {
        expect(element.actions).toEqual([]);
        expect(element.avatar).toBeUndefined();
        expect(element.href).toBeUndefined();
        expect(element.label).toBeUndefined();
        expect(element.name).toBeUndefined();
    });

    /*
     * ------------------------------------------------------------
     *  ATTRIBUTES
     * -------------------------------------------------------------
     */

    // actions
    it('Primitive pill: actions', () => {
        element.actions = ACTIONS;

        return Promise.resolve().then(() => {
            const actionButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon"]'
            );
            expect(actionButton).toBeFalsy();

            const actions = element.shadowRoot.querySelectorAll(
                '[data-element-id="lightning-menu-item"]'
            );
            expect(actions).toHaveLength(ACTIONS.length);
            actions.forEach((action, index) => {
                expect(action.disabled).toBe(ACTIONS[index].disabled);
                expect(action.label).toBe(ACTIONS[index].label);
                expect(action.prefixIconName).toBe(ACTIONS[index].iconName);
                expect(action.value).toBe(ACTIONS[index].name);
            });
        });
    });

    it('Primitive pill: actions, only one', () => {
        element.actions = [ACTIONS[0]];

        return Promise.resolve().then(() => {
            const actions = element.shadowRoot.querySelectorAll(
                '[data-element-id="lightning-menu-item"]'
            );
            expect(actions).toHaveLength(0);

            const actionButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon"]'
            );
            expect(actionButton).toBeTruthy();
            expect(actionButton.alternativeText).toBe(ACTIONS[0].label);
            expect(actionButton.disabled).toBe(ACTIONS[0].disabled);
            expect(actionButton.iconName).toBe(ACTIONS[0].iconName);
            expect(actionButton.value).toBe(ACTIONS[0].name);
        });
    });

    it('Primitive pill: actions, focus on actions when tab key is pressed', () => {
        element.actions = ACTIONS;

        return Promise.resolve().then(() => {
            const actionMenu = element.shadowRoot.querySelector(
                '[data-group-name="action"]'
            );
            const focusSpy = jest.spyOn(actionMenu, 'focus');
            const event = new CustomEvent('keydown');
            const propagationSpy = jest.spyOn(event, 'stopPropagation');
            const defaultSpy = jest.spyOn(event, 'preventDefault');
            event.keyCode = 9;

            element.dispatchEvent(event);
            expect(focusSpy).toHaveBeenCalledTimes(1);
            expect(propagationSpy).toHaveBeenCalledTimes(1);
            expect(defaultSpy).toHaveBeenCalledTimes(1);

            // The focus is captured only once
            element.dispatchEvent(event);
            expect(focusSpy).toHaveBeenCalledTimes(1);
            expect(propagationSpy).toHaveBeenCalledTimes(1);
            expect(defaultSpy).toHaveBeenCalledTimes(1);
        });
    });

    // avatar
    it('Primitive pill: avatar', () => {
        const avatar = {
            fallbackIconName: 'standard:account',
            initials: 'AB',
            src: 'https://avonni.app',
            variant: 'circle'
        };
        element.avatar = avatar;

        return Promise.resolve().then(() => {
            const avatarElement = element.shadowRoot.querySelector(
                '[data-element-id="avonni-avatar"]'
            );
            expect(avatarElement).toBeTruthy();
            expect(avatarElement.fallbackIconName).toBe(
                avatar.fallbackIconName
            );
            expect(avatarElement.initials).toBe(avatar.initials);
            expect(avatarElement.src).toBe(avatar.src);
            expect(avatarElement.variant).toBe(avatar.variant);
        });
    });

    // href and label
    it('Primitive pill: href and label', () => {
        element.href = 'https://avonni.app/';
        element.label = 'Some label';

        return Promise.resolve()
            .then(() => {
                const span = element.shadowRoot.querySelector(
                    '[data-element-id="span-label"]'
                );
                const link = element.shadowRoot.querySelector(
                    '[data-element-id="a-label"]'
                );
                expect(span).toBeFalsy();
                expect(link).toBeTruthy();
                expect(link.href).toBe('https://avonni.app/');
                expect(link.title).toBe('Some label');
                expect(link.textContent).toBe('Some label');
                expect(element.classList).toContain(
                    'avonni-primitive-pill__action'
                );

                element.href = null;
            })
            .then(() => {
                const span = element.shadowRoot.querySelector(
                    '[data-element-id="span-label"]'
                );
                const link = element.shadowRoot.querySelector(
                    '[data-element-id="a-label"]'
                );
                expect(link).toBeFalsy();
                expect(span).toBeTruthy();
                expect(span.title).toBe('Some label');
                expect(span.textContent).toBe('Some label');
                expect(element.classList).not.toContain(
                    'avonni-primitive-pill__action'
                );
            });
    });

    /*
     * ------------------------------------------------------------
     *  METHODS
     * -------------------------------------------------------------
     */

    // focusLink
    it('Primitive pill: focusLink() method', () => {
        element.href = 'https://avonni.app/';

        return Promise.resolve().then(() => {
            const link = element.shadowRoot.querySelector(
                '[data-element-id="a-label"]'
            );
            const spy = jest.spyOn(link, 'focus');

            element.focusLink();
            expect(spy).toHaveBeenCalled();
        });
    });

    /*
     * ------------------------------------------------------------
     *  EVENTS
     * -------------------------------------------------------------
     */

    // actionclick
    it('Primitive pill: actionclick event', () => {
        element.actions = ACTIONS;
        element.name = 'pill-name';

        const handler = jest.fn();
        element.addEventListener('actionclick', handler);

        return Promise.resolve()
            .then(() => {
                const action = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-menu-item"]'
                );
                action.dispatchEvent(
                    new CustomEvent('select', {
                        detail: {
                            value: ACTIONS[1].name
                        },
                        bubbles: true
                    })
                );

                expect(handler).toHaveBeenCalledTimes(1);
                const firstEvent = handler.mock.calls[0][0];
                expect(firstEvent.detail.name).toBe(ACTIONS[1].name);
                expect(firstEvent.detail.targetName).toBe('pill-name');
                expect(firstEvent.bubbles).toBeTruthy();
                expect(firstEvent.cancelable).toBeFalsy();
                expect(firstEvent.composed).toBeFalsy();

                element.actions = [ACTIONS[2]];
            })
            .then(() => {
                const actionButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon"]'
                );
                actionButton.click();

                expect(handler).toHaveBeenCalledTimes(2);
                const secondEvent = handler.mock.calls[1][0];
                expect(secondEvent.detail.name).toBe(ACTIONS[2].name);
                expect(secondEvent.detail.targetName).toBe('pill-name');
            });
    });

    // Event management relative to the pill container
    it('Primitive pill: Event management relative to the pill container', () => {
        element.actions = ACTIONS;
        element.href = 'https://avonni.app/';

        return Promise.resolve().then(() => {
            const actionMenu = element.shadowRoot.querySelector(
                '[data-group-name="action"]'
            );
            const clickEvent = new CustomEvent('click');
            const spy = jest.spyOn(clickEvent, 'stopPropagation');
            actionMenu.dispatchEvent(clickEvent);
            expect(spy).toHaveBeenCalled();

            const link = element.shadowRoot.querySelector(
                '[data-element-id="a-label"]'
            );
            const mouseDownEvent = new CustomEvent('mousedown');
            const spy2 = jest.spyOn(mouseDownEvent, 'preventDefault');
            link.dispatchEvent(mouseDownEvent);
            expect(spy2).toHaveBeenCalled();
        });
    });
});
