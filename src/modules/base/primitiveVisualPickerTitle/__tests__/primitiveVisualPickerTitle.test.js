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
import PrimitiveVisualPickerTitle from 'c/primitiveVisualPickerTitle';

let element;
describe('PrimitiveVisualPickerTitle', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-primitive-visual-picker-title', {
            is: PrimitiveVisualPickerTitle
        });
        document.body.appendChild(element);
    });

    it('Default attributes', () => {
        expect(element.avatar).toBeUndefined();
        expect(element.avatarPosition).toBe('left');
        expect(element.displayAvatar).toBeFalsy();
        expect(element.size).toBe('medium');
        expect(element.title).toBeUndefined();
    });

    it('Avatar is left', () => {
        element.avatarPosition = 'left';
        element.avatar = {
            iconName: 'custom:custom68'
        };
        element.title = 'test';
        element.displayAvatar = true;
        return Promise.resolve().then(() => {
            const avatar =
                element.shadowRoot.querySelector('c-primitive-avatar');
            expect(avatar.fallbackIconName).toBe('custom:custom68');
            expect(avatar.size).toBe('medium');
            expect(avatar.classList).toContain('slds-m-right_x-small');
        });
    });

    it('Avatar is right', () => {
        element.avatarPosition = 'right';
        element.avatar = {
            iconName: 'custom:custom68'
        };
        element.title = 'test';
        element.displayAvatar = true;
        return Promise.resolve().then(() => {
            const avatar =
                element.shadowRoot.querySelector('c-primitive-avatar');
            expect(avatar.fallbackIconName).toBe('custom:custom68');
            expect(avatar.size).toBe('medium');
            expect(avatar.classList).toContain('slds-m-left_x-small');
        });
    });
});
