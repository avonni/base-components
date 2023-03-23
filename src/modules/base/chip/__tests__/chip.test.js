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
import Chip from 'c/chip';

let element;
describe('Chip', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-chip', {
            is: Chip
        });
        document.body.appendChild(element);
    });

    it('Chip: Default attributes', () => {
        expect(element.label).toBeUndefined();
        expect(element.outline).toBeFalsy();
        expect(element.variant).toBe('base');
    });

    /*
     * ------------------------------------------------------------
     *  ATTRIBUTES
     * -------------------------------------------------------------
     */

    // label
    it('Chip: label', () => {
        element.label = 'This is a label';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector(
                '[data-element-id="span-wrapper"]'
            );
            expect(span.textContent).toBe('This is a label');
        });
    });

    // variant
    it('Chip: variant base', () => {
        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector(
                '[data-element-id="span-wrapper"]'
            );
            expect(span.className).toBe('avonni-chip avonni-chip_theme-base');
        });
    });

    it('Chip: variant brand', () => {
        element.variant = 'brand';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector(
                '[data-element-id="span-wrapper"]'
            );
            expect(span.className).toBe('avonni-chip avonni-chip_theme-brand');
        });
    });

    it('Chip: variant inverse', () => {
        element.variant = 'inverse';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector(
                '[data-element-id="span-wrapper"]'
            );
            expect(span.className).toBe(
                'avonni-chip avonni-chip_theme-inverse'
            );
        });
    });

    it('Chip: variant alt-inverse', () => {
        element.variant = 'alt-inverse';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector(
                '[data-element-id="span-wrapper"]'
            );
            expect(span.className).toBe(
                'avonni-chip avonni-chip_theme-alt-inverse'
            );
        });
    });

    it('Chip: variant success', () => {
        element.variant = 'success';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector(
                '[data-element-id="span-wrapper"]'
            );
            expect(span.className).toBe(
                'avonni-chip avonni-chip_theme-success'
            );
        });
    });

    it('Chip: variant info', () => {
        element.variant = 'info';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector(
                '[data-element-id="span-wrapper"]'
            );
            expect(span.className).toBe('avonni-chip avonni-chip_theme-info');
        });
    });

    it('Chip: variant warning', () => {
        element.variant = 'warning';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector(
                '[data-element-id="span-wrapper"]'
            );
            expect(span.className).toBe(
                'avonni-chip avonni-chip_theme-warning'
            );
        });
    });

    it('Chip: variant error', () => {
        element.variant = 'error';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector(
                '[data-element-id="span-wrapper"]'
            );
            expect(span.className).toBe('avonni-chip avonni-chip_theme-error');
        });
    });

    it('Chip: variant offline', () => {
        element.variant = 'offline';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector(
                '[data-element-id="span-wrapper"]'
            );
            expect(span.className).toBe(
                'avonni-chip avonni-chip_theme-offline'
            );
        });
    });

    // outline
    it('Chip: outline', () => {
        element.outline = true;

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector(
                '[data-element-id="span-wrapper"]'
            );
            expect(span.className).toContain('avonni-chip_outline');
        });
    });

    /*
     * ------------------------------------------------------------
     *  SLOTS
     * -------------------------------------------------------------
     */

    // Left slot visibility
    it('Chip: left slot visibility', () => {
        const leftSlot = element.shadowRoot.querySelector(
            '[data-element-id="slot-left"]'
        );
        expect(leftSlot.classList).toContain('slds-hide');

        leftSlot.assignedElements = jest.fn(() => {
            return 1;
        });
        leftSlot.dispatchEvent(new CustomEvent('slotchange'));
        expect(leftSlot.classList).not.toContain('slds-hide');
    });

    // Right slot visibility
    it('Chip: right slot visibility', () => {
        const rightSlot = element.shadowRoot.querySelector(
            '[data-element-id="slot-right"]'
        );
        expect(rightSlot.classList).toContain('slds-hide');

        rightSlot.assignedElements = jest.fn(() => {
            return 1;
        });
        rightSlot.dispatchEvent(new CustomEvent('slotchange'));
        expect(rightSlot.classList).not.toContain('slds-hide');
    });
});
