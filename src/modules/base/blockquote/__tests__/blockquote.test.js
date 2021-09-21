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
import Blockquote from 'c/blockquote';

let element;
describe('Blockquote', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-blockquote', {
            is: Blockquote
        });
        document.body.appendChild(element);
    });

    it('Default attributes', () => {
        expect(element.variant).toBe('default');
        expect(element.title).toBeUndefined();
        expect(element.iconName).toBeUndefined();
        expect(element.iconPosition).toBe('left');
        expect(element.iconSize).toBe('small');
    });

    /* ----- ATTRIBUTES ----- */
    // variant
    it('Blockquote variant default', () => {
        element.title = 'Blockquote Title';

        return Promise.resolve().then(() => {
            const div = element.shadowRoot.querySelector('.doc');
            expect(div.className).toContain('blockquote-default');
        });
    });

    it('Blockquote variant brand', () => {
        element.variant = 'brand';

        return Promise.resolve().then(() => {
            const div = element.shadowRoot.querySelector('.doc');
            expect(div.className).toContain('blockquote-brand');
        });
    });

    it('Blockquote variant warning', () => {
        element.variant = 'warning';

        return Promise.resolve().then(() => {
            const div = element.shadowRoot.querySelector('.doc');
            expect(div.className).toContain('blockquote-warning');
        });
    });

    it('Blockquote variant success', () => {
        element.variant = 'success';

        return Promise.resolve().then(() => {
            const div = element.shadowRoot.querySelector('.doc');
            expect(div.className).toContain('blockquote-success');
        });
    });

    it('Blockquote variant error', () => {
        element.variant = 'error';

        return Promise.resolve().then(() => {
            const div = element.shadowRoot.querySelector('.doc');
            expect(div.className).toContain('blockquote-error');
        });
    });

    // title
    it('Blockquote title', () => {
        element.title = 'Blockquote Title';

        return Promise.resolve().then(() => {
            const div = element.shadowRoot.querySelector('.doc.lead');
            expect(div.textContent).toBe('Blockquote Title');
        });
    });

    // icon name
    it('Blockquote icon name', () => {
        element.iconName = 'utility:error';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(icon.iconName).toBe('utility:error');
        });
    });

    // icon size
    it('Blockquote icon size xx-small', () => {
        element.iconName = 'utility:error';
        element.iconSize = 'xx-small';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(icon.size).toBe('xx-small');
        });
    });

    it('Blockquote icon size x-small', () => {
        element.iconName = 'utility:error';
        element.iconSize = 'x-small';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(icon.size).toBe('x-small');
        });
    });

    it('Blockquote icon size small', () => {
        element.iconName = 'utility:error';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(icon.size).toBe('small');
        });
    });

    it('Blockquote icon size medium', () => {
        element.iconName = 'utility:error';
        element.iconSize = 'medium';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(icon.size).toBe('medium');
        });
    });

    it('Blockquote icon size large', () => {
        element.iconName = 'utility:error';
        element.iconSize = 'large';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(icon.size).toBe('large');
        });
    });

    // icon position
    it('Blockquote icon position right', () => {
        element.iconName = 'utility:error';
        element.iconPosition = 'right';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(icon.className).toContain('slds-m-left_x-small');
        });
    });

    it('Blockquote icon position left', () => {
        element.iconName = 'utility:error';
        element.iconPosition = 'left';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(icon.className).toContain('slds-m-right_x-small');
        });
    });
});
