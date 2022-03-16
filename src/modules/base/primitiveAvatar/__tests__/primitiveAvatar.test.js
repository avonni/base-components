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
import PrimitiveAvatar from '../primitiveAvatar';

const ACTIONS = [
    {
        label: 'Edit item',
        name: 'edit-item',
        iconName: 'utility:edit'
    },
    {
        label: 'Add item',
        name: 'add-item',
        iconName: 'utility:add'
    }
];

let element;
describe('PrimitiveAvatar', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('primitive-avatar', {
            is: PrimitiveAvatar
        });
        document.body.appendChild(element);
    });

    it('Default attributes', () => {
        expect(element.initials).toBeFalsy();
        expect(element.variant).toBe('square');
        expect(element.size).toBe('medium');

        expect(element.actions).toEqual([]);
        expect(element.actionMenuIcon).toEqual('utility:down');
        expect(element.actionPosition).toEqual('bottom-left');

        expect(element.entityIconName).toBeFalsy();
        expect(element.entityPosition).toBe('top-left');
        expect(element.entityTitle).toBe('Entity');
        expect(element.entitySrc).toBeFalsy();
        expect(element.entityVariant).toBe('square');

        expect(element.presence).toBeFalsy();
        expect(element.presencePosition).toBe('bottom-right');
        expect(element.presenceTitle).toBe('Presence');

        expect(element.status).toBeFalsy();
        expect(element.statusTitle).toBe('Status');
        expect(element.statusPosition).toBe('top-right');
    });

    /* ----- ATTRIBUTES ----- */

    // actions
    it('Avatar with action menu', () => {
        element.initials = 'LG';
        element.actions = ACTIONS;

        return Promise.resolve().then(() => {
            const actionSection = element.shadowRoot.querySelector(
                '[data-element-id="action-section"]'
            );
            const actionMenu = element.shadowRoot.querySelector(
                '[data-element-id="action-menu-icon"]'
            );
            const actionButton = element.shadowRoot.querySelector(
                '[data-element-id="action-icon"]'
            );

            expect(actionSection).toBeTruthy();
            expect(actionMenu).toBeTruthy();
            expect(actionButton).toBeFalsy();
        });
    });

    it('Avatar with one action', () => {
        element.initials = 'LG';
        element.actions = new Array(ACTIONS[0]);

        return Promise.resolve().then(() => {
            const actionSection = element.shadowRoot.querySelector(
                '[data-element-id="action-section"]'
            );
            const avatarInitials = element.shadowRoot.querySelector(
                '[data-element-id="avatar-initials"]'
            );
            const actionMenu = element.shadowRoot.querySelector(
                '[data-element-id="action-menu-icon"]'
            );
            const actionButton = element.shadowRoot.querySelector(
                '[data-element-id="action-icon"]'
            );

            expect(avatarInitials.innerHTML.trim()).toContain('LG');
            expect(actionSection).toBeTruthy();
            expect(actionMenu).toBeFalsy();
            expect(actionButton).toBeTruthy();
        });
    });

    /* ----- EVENTS ----- */

    // actionclick event
    // Depends on action name
    it('actionclick event', () => {
        element.initials = 'LG';
        element.actions = new Array(ACTIONS[0]);
        const handler = jest.fn();
        element.addEventListener('actionclick', handler);

        return Promise.resolve().then(() => {
            const actionButton = element.shadowRoot.querySelector(
                '[data-element-id="action-icon"]'
            );
            expect(actionButton).toBeTruthy();
            actionButton.click();

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.name).toBe('edit-item');
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });
});
