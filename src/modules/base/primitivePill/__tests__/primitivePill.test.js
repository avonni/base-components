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
        expect(element.variant).toBe('base');
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
            expect(actionButton).toBeTruthy();
            expect(actionButton.alternativeText).toBe('Actions menu');
            expect(actionButton.disabled).toBeFalsy();
            expect(actionButton.iconName).toBe('utility:down');
        });
    });

    it('Primitive pill: actions, only one', () => {
        element.actions = [ACTIONS[0]];

        return Promise.resolve().then(() => {
            const actionButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon"]'
            );
            expect(actionButton.alternativeText).toBe(ACTIONS[0].label);
            expect(actionButton.disabled).toBe(ACTIONS[0].disabled);
            expect(actionButton.iconName).toBe(ACTIONS[0].iconName);
        });
    });

    it('Primitive pill: actions, focus on actions when tab key is pressed', () => {
        element.actions = ACTIONS;

        return Promise.resolve().then(() => {
            const actionMenu = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon"]'
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
                const wrapper = element.shadowRoot.querySelector(
                    '[data-element-id="div-wrapper"]'
                );
                const label = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-formatted-rich-text"]'
                );
                const link = element.shadowRoot.querySelector(
                    '[data-element-id="a-label"]'
                );
                expect(label).toBeFalsy();
                expect(link).toBeTruthy();
                expect(link.href).toBe('https://avonni.app/');
                expect(link.title).toBe('Some label');
                expect(link.textContent).toBe('Some label');
                expect(wrapper.classList).toContain(
                    'avonni-primitive-pill__action'
                );

                element.href = null;
            })
            .then(() => {
                const wrapper = element.shadowRoot.querySelector(
                    '[data-element-id="div-wrapper"]'
                );
                const label = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-formatted-rich-text"]'
                );
                const link = element.shadowRoot.querySelector(
                    '[data-element-id="a-label"]'
                );
                expect(link).toBeFalsy();
                expect(label).toBeTruthy();
                expect(label.title).toBe('Some label');
                expect(label.value).toBe('Some label');
                expect(wrapper.classList).not.toContain(
                    'avonni-primitive-pill__action'
                );
            });
    });

    // variant
    it('Primitive pill: variant = base', () => {
        element.variant = 'base';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            expect(wrapper.classList).not.toContain(
                'avonni-primitive-pill_list'
            );
        });
    });

    it('Primitive pill: variant = list', () => {
        element.variant = 'list';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            expect(wrapper.classList).toContain('avonni-primitive-pill_list');
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
        element.actions = [ACTIONS[1]];
        element.name = 'pill-name';

        const handler = jest.fn();
        element.addEventListener('actionclick', handler);

        return Promise.resolve().then(() => {
            const action = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon"]'
            );
            action.click();

            expect(handler).toHaveBeenCalledTimes(1);
            const call = handler.mock.calls[0][0];
            expect(call.detail.name).toBe(ACTIONS[1].name);
            expect(call.detail.targetName).toBe('pill-name');
            expect(call.bubbles).toBeTruthy();
            expect(call.cancelable).toBeFalsy();
            expect(call.composed).toBeFalsy();
        });
    });

    // openactionmenu
    it('Primitive pill: openactionmenu event', () => {
        element.actions = ACTIONS;
        element.name = 'pill-name';

        const handler = jest.fn();
        element.addEventListener('openactionmenu', handler);

        return Promise.resolve().then(() => {
            const action = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon"]'
            );
            action.click();

            expect(handler).toHaveBeenCalledTimes(1);
            const call = handler.mock.calls[0][0];
            expect(call.detail.targetName).toBe('pill-name');
            expect(call.detail.bounds).toEqual(action.getBoundingClientRect());
            expect(call.bubbles).toBeTruthy();
            expect(call.cancelable).toBeFalsy();
            expect(call.composed).toBeFalsy();
        });
    });

    // Event management relative to the pill container
    it('Primitive pill: Event management relative to the pill container', () => {
        element.actions = ACTIONS;
        element.href = 'https://avonni.app/';

        return Promise.resolve().then(() => {
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
