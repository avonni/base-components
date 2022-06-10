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
import Card from '../card';

// Not tested: displaying the correct default slot, as it depends on inserting html into the DOM.

let element;
describe('Card', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('avonni-card', {
            is: Card
        });
        document.body.appendChild(element);
    });

    it('Default attributes', () => {
        expect(element.title).toBeUndefined();
        expect(element.iconName).toBeUndefined();
        expect(element.mediaPosition).toBe('top');
        expect(element.mediaSrc).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // title
    it('Card: title', () => {
        element.title = 'This is a title text';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector(
                '[data-element-id="avonni-card-title"]'
            );
            const titleSlot = element.shadowRoot.querySelector(
                '[data-element-id="avonni-card-title-slot"]'
            );
            expect(title.textContent).toBe('This is a title text');
            expect(titleSlot).toBeFalsy();
        });
    });

    // iconName
    it('Card: iconName', () => {
        element.iconName = 'utility:account';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="avonni-card-header-icon"]'
            );
            expect(icon.iconName).toBe('utility:account');
        });
    });

    // mediaSrc
    it('Card: mediaSrc without mediaPosition', () => {
        element.mediaSrc = 'https://via.placeholder.com/300x200';

        return Promise.resolve().then(() => {
            const bodyContainer = element.shadowRoot.querySelector(
                '[data-element-id="avonni-card-body-container"]'
            );
            const mediaImage = element.shadowRoot.querySelector(
                '[data-element-id="avonni-card-media-image"]'
            );
            expect(bodyContainer.classList).toContain('avonni-card__media-top');
            expect(mediaImage.src).toBe('https://via.placeholder.com/300x200');
        });
    });

    // mediaPosition
    it('Card: mediaPosition = left', () => {
        element.mediaPosition = 'left';
        element.mediaSrc = 'https://via.placeholder.com/300x200';

        return Promise.resolve().then(() => {
            const bodyContainer = element.shadowRoot.querySelector(
                '[data-element-id="avonni-card-body-container"]'
            );
            const mediaImage = element.shadowRoot.querySelector(
                '[data-element-id="avonni-card-media-image"]'
            );
            expect(bodyContainer.classList).toContain(
                'avonni-card__media-left'
            );
            expect(mediaImage.src).toBe('https://via.placeholder.com/300x200');
        });
    });

    it('Card: mediaPosition = right', () => {
        element.mediaPosition = 'right';
        element.mediaSrc = 'https://via.placeholder.com/300x200';

        return Promise.resolve().then(() => {
            const bodyContainer = element.shadowRoot.querySelector(
                '[data-element-id="avonni-card-body-container"]'
            );
            const mediaImage = element.shadowRoot.querySelector(
                '[data-element-id="avonni-card-media-image"]'
            );
            expect(bodyContainer.classList).toContain(
                'avonni-card__media-right'
            );
            expect(mediaImage.src).toBe('https://via.placeholder.com/300x200');
        });
    });

    it('Card: mediaPosition = top', () => {
        element.mediaPosition = 'top';
        element.mediaSrc = 'https://via.placeholder.com/300x200';

        return Promise.resolve().then(() => {
            const bodyContainer = element.shadowRoot.querySelector(
                '[data-element-id="avonni-card-body-container"]'
            );
            const mediaImage = element.shadowRoot.querySelector(
                '[data-element-id="avonni-card-media-image"]'
            );
            expect(bodyContainer.classList).toContain('avonni-card__media-top');
            expect(mediaImage.src).toBe('https://via.placeholder.com/300x200');
        });
    });

    it('Card: mediaPosition = center', () => {
        element.mediaPosition = 'center';
        element.mediaSrc = 'https://via.placeholder.com/300x200';
        element.title = 'This is a title text';

        return Promise.resolve().then(() => {
            const bodyContainer = element.shadowRoot.querySelector(
                '[data-element-id="avonni-card-body-container"]'
            );
            const mediaImage = element.shadowRoot.querySelector(
                '[data-element-id="avonni-card-media-image"]'
            );
            const defaultSlot = element.shadowRoot.querySelector(
                '[data-element-id="avonni-card-default-slot"]'
            );
            expect(bodyContainer.classList).toContain(
                'avonni-card__media-center'
            );
            expect(defaultSlot.classList).toContain('slds-hide');
            expect(mediaImage.src).toBe('https://via.placeholder.com/300x200');
        });
    });

    it('Card: mediaPosition = bottom', () => {
        element.mediaPosition = 'bottom';
        element.mediaSrc = 'https://via.placeholder.com/300x200';

        return Promise.resolve().then(() => {
            const bodyContainer = element.shadowRoot.querySelector(
                '[data-element-id="avonni-card-body-container"]'
            );
            const mediaImage = element.shadowRoot.querySelector(
                '[data-element-id="avonni-card-media-image"]'
            );
            expect(bodyContainer.classList).toContain(
                'avonni-card__media-bottom'
            );
            expect(mediaImage.src).toBe('https://via.placeholder.com/300x200');
        });
    });

    it('Card: mediaPosition = background', () => {
        element.mediaPosition = 'background';
        element.mediaSrc = 'https://via.placeholder.com/300x200';

        return Promise.resolve().then(() => {
            const bodyContainer = element.shadowRoot.querySelector(
                '[data-element-id="avonni-card-body-container"]'
            );
            const mediaImage = element.shadowRoot.querySelector(
                '[data-element-id="avonni-card-media-image"]'
            );
            expect(bodyContainer.classList).toContain(
                'avonni-card__media-background'
            );
            expect(mediaImage.src).toBe('https://via.placeholder.com/300x200');
        });
    });

    it('Card: mediaPosition = overlay', () => {
        element.mediaPosition = 'overlay';
        element.mediaSrc = 'https://via.placeholder.com/300x200';

        return Promise.resolve().then(() => {
            const bodyContainer = element.shadowRoot.querySelector(
                '[data-element-id="avonni-card-body-container"]'
            );
            const mediaImage = element.shadowRoot.querySelector(
                '[data-element-id="avonni-card-media-image"]'
            );
            expect(bodyContainer.classList).toContain(
                'avonni-card__media-overlay'
            );
            expect(mediaImage.src).toBe('https://via.placeholder.com/300x200');
        });
    });
});
