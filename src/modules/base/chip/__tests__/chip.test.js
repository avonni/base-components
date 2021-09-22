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

    it('Chip Default attributes', () => {
        expect(element.label).toBeUndefined();
        expect(element.variant).toBe('base');
        expect(element.outline).toBeFalsy();
    });

    /* ----- ATTRIBUTES ----- */

    // label
    it('Chip label', () => {
        element.label = 'This is a label';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector('span');
            expect(span.textContent).toBe('This is a label');
        });
    });

    // variant
    it('Chip variant base', () => {
        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector('span');
            expect(span.className).toBe('slds-badge slds-theme_base');
        });
    });

    it('Chip variant brand', () => {
        element.variant = 'brand';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector('span');
            expect(span.className).toBe('slds-badge slds-theme_brand');
        });
    });

    it('Chip variant inverse', () => {
        element.variant = 'inverse';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector('span');
            expect(span.className).toBe('slds-badge slds-theme_inverse');
        });
    });

    it('Chip variant alt-inverse', () => {
        element.variant = 'alt-inverse';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector('span');
            expect(span.className).toBe('slds-badge slds-theme_alt-inverse');
        });
    });

    it('Chip variant success', () => {
        element.variant = 'success';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector('span');
            expect(span.className).toBe('slds-badge slds-theme_success');
        });
    });

    it('Chip variant info', () => {
        element.variant = 'info';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector('span');
            expect(span.className).toBe('slds-badge slds-theme_info');
        });
    });

    it('Chip variant warning', () => {
        element.variant = 'warning';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector('span');
            expect(span.className).toBe('slds-badge slds-theme_warning');
        });
    });

    it('Chip variant error', () => {
        element.variant = 'error';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector('span');
            expect(span.className).toBe('slds-badge slds-theme_error');
        });
    });

    it('Chip variant offline', () => {
        element.variant = 'offline';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector('span');
            expect(span.className).toBe('slds-badge slds-theme_offline');
        });
    });

    // outline
    it('Chip outline', () => {
        element.outline = true;

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector('span');
            expect(span.className).toContain('avonni-outline');
        });
    });
});
