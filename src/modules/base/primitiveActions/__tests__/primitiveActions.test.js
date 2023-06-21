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
import PrimitiveActions from 'c/primitiveActions';

const ACTIONS = [
    {
        name: 'action1',
        label: 'Action 1',
        disabled: false,
        iconName: 'utility:check'
    },
    { name: 'action2', disabled: true, iconName: 'utility:close' }
];

let element;
describe('Primitive Actions', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('avonni-primitive-actions', {
            is: PrimitiveActions
        });
        document.body.appendChild(element);
    });

    it('Activity Timeline Item: Default attributes', () => {
        expect(element.actions).toEqual([]);
        expect(element.buttonIconSize).toBeUndefined();
        expect(element.buttonIconVariant).toBeUndefined();
        expect(element.visibleActions).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // actions
    it('Primitive Actions: Actions multiple', () => {
        element.actions = ACTIONS;

        return Promise.resolve().then(() => {
            const buttonGroup = element.shadowRoot.querySelector(
                'lightning-button-group'
            );
            const buttons = buttonGroup.querySelectorAll('lightning-button');
            const buttonIcons = buttonGroup.querySelectorAll(
                'lightning-button-icon'
            );

            expect(buttons.length).toBe(1);
            expect(buttonIcons.length).toBe(1);
            expect(
                buttonGroup.querySelector('lightning-button-icon')
            ).toBeTruthy();
            expect(
                buttonGroup.querySelector('lightning-button-menu')
            ).toBeNull();
        });
    });

    it('Primitive Actions: Actions single, with label', () => {
        element.actions = [ACTIONS[0]];

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            const buttonIcon = element.shadowRoot.querySelector(
                'lightning-button-icon'
            );
            const buttonGroup = element.shadowRoot.querySelector(
                'lightning-button-group'
            );

            expect(buttonGroup).toBeNull();
            expect(button).not.toBeNull();
            expect(buttonIcon).toBeNull();
            expect(button.label).toBe('Action 1');
        });
    });

    // buttonIconSize and buttonIconVariant
    it('Primitive Actions: Actions single, without label', () => {
        element.actions = [ACTIONS[1]];
        element.buttonIconSize = 'small';
        element.buttonIconVariant = 'border-filled';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            const buttonIcon = element.shadowRoot.querySelector(
                'lightning-button-icon'
            );
            const buttonGroup = element.shadowRoot.querySelector(
                'lightning-button-group'
            );

            expect(buttonGroup).toBeNull();
            expect(buttonIcon).not.toBeNull();
            expect(buttonIcon.size).toBe('small');
            expect(buttonIcon.variant).toBe('border-filled');
            expect(button).toBeNull();
        });
    });

    // visibleActions
    it('Primitive Actions: Visible Actions, one', () => {
        element.actions = [
            ...ACTIONS,
            {
                name: 'action3',
                label: 'Action 3',
                disabled: false,
                iconName: 'utility:add'
            }
        ];
        element.visibleActions = 1;

        return Promise.resolve().then(() => {
            const buttonGroup = element.shadowRoot.querySelector(
                'lightning-button-group'
            );
            const buttons = buttonGroup.querySelectorAll('lightning-button');
            const buttonIcon = buttonGroup.querySelector(
                'lightning-button-icon'
            );
            const buttonMenu = buttonGroup.querySelector(
                'lightning-button-menu'
            );

            expect(buttons.length).toBe(1);
            expect(buttonIcon).toBeNull();
            expect(buttonMenu).not.toBeNull();
            expect(
                buttonMenu.querySelectorAll('lightning-menu-item').length
            ).toBe(2);
        });
    });

    /* ----- EVENTS ----- */

    // actionclick
    it('Primitive Actions: Actionclick event, correct name on button click', () => {
        const handler = jest.fn();
        element.addEventListener('actionclick', handler);
        element.actions = ACTIONS;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            button.dispatchEvent(new CustomEvent('click'));

            expect(handler).toHaveBeenCalledWith(
                expect.objectContaining({
                    detail: { name: 'action1' }
                })
            );
        });
    });

    it('Primitive Actions: Actionclick event, correct name on button-icon click', () => {
        const handler = jest.fn();
        element.addEventListener('actionclick', handler);
        element.actions = ACTIONS;

        return Promise.resolve().then(() => {
            const buttonIcon = element.shadowRoot.querySelector(
                'lightning-button-icon'
            );
            buttonIcon.dispatchEvent(new CustomEvent('click'));

            expect(handler).toHaveBeenCalledWith(
                expect.objectContaining({
                    detail: { name: 'action2' }
                })
            );
        });
    });

    it('Primitive Actions: Actionclick event, correct name on lightning-button-menu select', () => {
        const handler = jest.fn();
        element.addEventListener('actionclick', handler);
        element.actions = ACTIONS;
        element.visibleActions = 0;

        return Promise.resolve().then(() => {
            const buttonMenu = element.shadowRoot.querySelector(
                'lightning-button-menu'
            );
            buttonMenu.dispatchEvent(
                new CustomEvent('select', { detail: { value: 'action1' } })
            );

            expect(handler).toHaveBeenCalledWith(
                expect.objectContaining({
                    detail: { name: 'action1' }
                })
            );
        });
    });
});
