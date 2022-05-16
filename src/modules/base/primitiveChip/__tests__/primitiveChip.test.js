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
import PrimitiveChip from '../primitiveChip';

const MOCK_AVATAR = {
    fallbackIconName: 'standard:user',
    variant: 'circle',
    src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg'
};

let element;
describe('Primitive Chip', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('avonni-primitive-chip', {
            is: PrimitiveChip
        });
        document.body.appendChild(element);
    });

    it('Default attributes', () => {
        expect(element.label).toEqual('');
        expect(element.outline).toEqual(false);
        expect(element.avatar).toEqual(null);
        expect(element.variant).toEqual('base');
    });

    /* ----- ATTRIBUTES ----- */

    // label
    it('label', () => {
        element.label = 'This is a label text';
        return Promise.resolve().then(() => {
            const chip = element.shadowRoot.querySelector(
                '[data-element-id="chip"]'
            );
            expect(chip.label).toBe('This is a label text');
        });
    });

    //avatar
    it('avatar', () => {
        element.avatar = MOCK_AVATAR;
        return Promise.resolve().then(() => {
            expect(
                element.shadowRoot.querySelector(
                    '[data-element-id="avatar-right"]'
                )
            ).toBeFalsy();
            const avatar = element.shadowRoot.querySelector(
                '[data-element-id="avatar-left"]'
            );
            expect(avatar.slot).toBe('left');
            expect(avatar.src).toBe(MOCK_AVATAR.src);
            expect(avatar.variant).toBe(MOCK_AVATAR.variant);
            expect(avatar.fallbackIconName).toBe(MOCK_AVATAR.fallbackIconName);
        });
    });

    // variant
    it('variant', () => {
        element.variant = 'warning';
        return Promise.resolve().then(() => {
            const chip = element.shadowRoot.querySelector(
                '[data-element-id="chip"]'
            );
            expect(chip.variant).toBe('warning');
        });
    });

    // outline
    it('outline', () => {
        element.outline = true;
        return Promise.resolve().then(() => {
            const chip = element.shadowRoot.querySelector(
                '[data-element-id="chip"]'
            );
            expect(chip.outline).toBe(true);
        });
    });
});
