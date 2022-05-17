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

const MOCK_ITEM_SET = [
    {
        label: 'First chip',
        variant: 'base',
        outline: true
    },
    {
        label: 'Second chip',
        variant: 'warning',
        avatar: {
            fallbackIconName: 'custom:custom1',
            variant: 'circle'
        }
    },
    {
        label: 'third chip',
        avatarPosition: 'right',
        avatar: {
            fallbackIconName: 'custom:custom1',
            variant: 'circle'
        }
    }
];

const DEFAULT_ALTERNATIVE_TEXT = 'Task list';

let element;
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
        expect(element.items).toEqual([]);
        expect(element.alternativeText).toEqual(DEFAULT_ALTERNATIVE_TEXT);
    });

    /* ----- ATTRIBUTES ----- */

    // items
    it('Chip container : items', () => {
        element.items = MOCK_ITEM_SET;
        return Promise.resolve().then(() => {
            const itemsContainer = element.shadowRoot.querySelector(
                '[data-element-id="chip-container-list"]'
            );
            expect(itemsContainer.childElementCount).toBe(3);
        });
    });

    // alternative text
    it('Chip container : alternative text', () => {
        element.alternativeText = 'alternative text';
        return Promise.resolve().then(() => {
            const itemsContainer = element.shadowRoot.querySelector(
                '[data-element-id="span-alternative-text"]'
            );
            expect(itemsContainer.textContent).toEqual('alternative text');
        });
    });
});
