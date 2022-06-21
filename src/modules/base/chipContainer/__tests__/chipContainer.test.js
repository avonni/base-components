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
        prefixIconName: 'utility:table',
        variant: 'base',
        outline: true
    },
    {
        label: 'loooooooooooooooooooooooooooooooooooooooooooooooong 2nd chip',
        variant: 'warning',
        mediaPosition: 'left',
        outline: false,
        avatar: {
            fallbackIconName: 'custom:custom1',
            size: 'x-small',
            variant: 'circle'
        }
    },
    {
        label: 'third chip',
        mediaPosition: 'right',
        outline: false,
        variant: 'base',
        avatar: {
            fallbackIconName: 'custom:custom1',
            variant: 'circle',
            size: 'x-small'
        }
    }
];

const DEFAULT_ALTERNATIVE_TEXT = 'Selected Options:';

// not tested
// AvonniResizeObserver callback()
// computedButtonLabel on resize (check for correct value)

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
        expect(element.isCollapsible).toEqual(false);
        expect(element.isExpanded).toEqual(false);
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

    // isCollapsible
    it('isCollapsible', () => {
        element.items = MOCK_ITEM_SET;
        element.isCollapsible = true;
        return Promise.resolve().then(() => {
            expect(
                element.shadowRoot.querySelector(
                    '[data-element-id="show-more-button"]'
                )
            ).toBeTruthy();
        });
    });

    // isExpanded
    it('isExpanded (without isCollapsible)', () => {
        element.items = MOCK_ITEM_SET;
        element.isExpanded = true;
        return Promise.resolve().then(() => {
            expect(
                element.shadowRoot.querySelector(
                    '[data-element-id="show-more-button"]'
                )
            ).toBeFalsy();
        });
    });

    it('isExpanded (with isCollapsible)', () => {
        element.items = MOCK_ITEM_SET;
        element.isCollapsible = true;
        element.isExpanded = false;
        return Promise.resolve().then(() => {
            expect(
                element.shadowRoot.querySelector(
                    '[data-element-id="show-more-button"]'
                )
            ).toBeTruthy();
        });
    });

    // items
    it('items', () => {
        element.items = MOCK_ITEM_SET;
        return Promise.resolve().then(() => {
            const chips = element.shadowRoot.querySelectorAll(
                '[data-element-id="chip"]'
            );
            expect(chips.length).toBe(3);
            chips.forEach((chip, index) => {
                expect(chip.label).toBe(MOCK_ITEM_SET[index].label);
                expect(chip.variant).toBe(MOCK_ITEM_SET[index].variant);
                expect(chip.iconName).toBe(
                    MOCK_ITEM_SET[index].prefixIconName || 'utility:check'
                );
                expect(chip.avatar).toEqual(
                    MOCK_ITEM_SET[index].avatar || null
                );
                expect(chip.avatarPosition).toBe(
                    MOCK_ITEM_SET[index].avatarPosition
                );
                expect(chip.outline).toBe(MOCK_ITEM_SET[index].outline);
            });
        });
    });

    /* ----- SCENARIOS ----- */

    it('clicking on the show more button sets isExpanded to true', () => {
        element.items = MOCK_ITEM_SET;
        element.isCollapsible = true;
        element.isExpanded = false;
        return Promise.resolve().then(() => {
            element.shadowRoot
                .querySelector('[data-element-id="show-more-button"]')
                .click();
            expect(element.isExpanded).toEqual(true);
        });
    });
});
