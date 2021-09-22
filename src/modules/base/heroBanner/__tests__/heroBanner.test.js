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
import HeroBanner from 'c/heroBanner';

// not tested
// src & linear gradient

let element;
describe('Hero Banner', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);
    });

    it('Default attributes', () => {
        expect(element.title).toBeUndefined();
        expect(element.caption).toBeUndefined();
        expect(element.subtitle).toBeUndefined();
        expect(element.src).toBeUndefined();
        expect(element.height).toBe(400);
        expect(element.maxWidth).toBe(960);
        expect(element.contentHorizontalAlignment).toBe('left');
        expect(element.contentVerticalAlignment).toBe('center');
        expect(element.contentWidth).toBe(100);
        expect(element.primaryButtonLabel).toBeUndefined();
        expect(element.secondaryButtonLabel).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // title
    it('Hero Banner title', () => {
        element.title = 'This is a title text';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector('h2');
            expect(title.textContent).toBe('This is a title text');
        });
    });

    // caption
    it('Hero Banner caption', () => {
        element.caption = 'This is a caption text';

        return Promise.resolve().then(() => {
            const caption = element.shadowRoot.querySelector('h1');
            expect(caption.textContent).toBe('This is a caption text');
        });
    });

    // subtitle
    it('Hero Banner subtitle', () => {
        element.subtitle = 'This is a subtitle text';

        return Promise.resolve().then(() => {
            const subtitle = element.shadowRoot.querySelector('p');
            expect(subtitle.textContent).toBe('This is a subtitle text');
        });
    });

    // height
    it('Hero Banner height', () => {
        const height = '200px';
        element.height = 200;

        return Promise.resolve().then(() => {
            const background = element.shadowRoot.querySelector(
                '.avonni-hero-banner-background-class'
            );
            expect(background.style.height).toBe(height);
        });
    });

    // max width
    it('Hero Banner max width', () => {
        const maxWidth = '50px';
        element.maxWidth = 50;

        return Promise.resolve().then(() => {
            const background = element.shadowRoot.querySelector(
                '.avonni-hero-banner-width-container'
            );
            expect(background.style.width).toBe(maxWidth);
        });
    });

    // content horizontal alignment
    it('Hero Banner content horizontal alignment center', () => {
        element.title = 'This is a title text';
        element.contentHorizontalAlignment = 'center';

        return Promise.resolve().then(() => {
            const textContainer = element.shadowRoot.querySelector(
                '.avonni-hero-banner-width-container'
            );
            expect(textContainer.className).toContain(
                'avonni-hero-banner-horizontal-alignment_center'
            );
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner-horizontal-alignment_right'
            );
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner-horizontal-alignment_left'
            );
        });
    });

    it('Hero Banner content horizontal alignment left', () => {
        element.title = 'This is a title text';
        element.contentHorizontalAlignment = 'left';

        return Promise.resolve().then(() => {
            const textContainer = element.shadowRoot.querySelector(
                '.avonni-hero-banner-width-container'
            );
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner-horizontal-alignment_center'
            );
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner-horizontal-alignment_right'
            );
            expect(textContainer.className).toContain(
                'avonni-hero-banner-horizontal-alignment_left'
            );
        });
    });

    it('Hero Banner content horizontal alignment right', () => {
        element.title = 'This is a title text';
        element.contentHorizontalAlignment = 'right';

        return Promise.resolve().then(() => {
            const textContainer = element.shadowRoot.querySelector(
                '.avonni-hero-banner-width-container'
            );
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner-horizontal-alignment_center'
            );
            expect(textContainer.className).toContain(
                'avonni-hero-banner-horizontal-alignment_right'
            );
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner-horizontal-alignment_left'
            );
        });
    });

    // content vertical alignment
    it('Hero Banner content vertical alignment center', () => {
        element.title = 'This is a title text';
        element.contentVerticalAlignment = 'center';

        return Promise.resolve().then(() => {
            const textContainer = element.shadowRoot.querySelector(
                '.avonni-hero-banner-content-container'
            );
            expect(textContainer.className).toContain(
                'avonni-hero-banner-vertical-alignement_center'
            );
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner-vertical-alignement_bottom'
            );
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner-vertical-alignement_top'
            );
        });
    });

    it('Hero Banner content vertical alignment top', () => {
        element.title = 'This is a title text';
        element.contentVerticalAlignment = 'top';

        return Promise.resolve().then(() => {
            const textContainer = element.shadowRoot.querySelector(
                '.avonni-hero-banner-content-container'
            );
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner-vertical-alignement_center'
            );
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner-vertical-alignement_bottom'
            );
            expect(textContainer.className).toContain(
                'avonni-hero-banner-vertical-alignement_top'
            );
        });
    });

    it('Hero Banner content vertical alignment bottom', () => {
        element.title = 'This is a title text';
        element.contentVerticalAlignment = 'bottom';

        return Promise.resolve().then(() => {
            const textContainer = element.shadowRoot.querySelector(
                '.avonni-hero-banner-content-container'
            );
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner-vertical-alignement_center'
            );
            expect(textContainer.className).toContain(
                'avonni-hero-banner-vertical-alignement_bottom'
            );
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner-vertical-alignement_top'
            );
        });
    });

    // content width
    it('Hero Banner content width', () => {
        element.title = 'This is a title text';
        element.contentWidth = 10;
        const contentWidth = '10%';

        return Promise.resolve().then(() => {
            const textContainer = element.shadowRoot.querySelector(
                '.avonni-hero-banner-content'
            );
            expect(textContainer.style.width).toBe(contentWidth);
        });
    });

    // Primary button label
    it('Hero Banner primary button label', () => {
        element.primaryButtonLabel = 'This is a primary button label';

        return Promise.resolve().then(() => {
            const primaryButton = element.shadowRoot.querySelector(
                '.avonni-hero-banner-primary-button'
            );
            expect(primaryButton.textContent).toBe(
                'This is a primary button label'
            );
        });
    });

    // Needs a primary button
    // Secondary button label
    it('Hero Banner secondary button label', () => {
        element.primaryButtonLabel = 'This is a primary button label';
        element.secondaryButtonLabel = 'This is a secondary button label';

        return Promise.resolve().then(() => {
            const secondaryButton = element.shadowRoot.querySelector(
                '.avonni-hero-banner-secondary-button'
            );
            expect(secondaryButton.textContent).toBe(
                'This is a secondary button label'
            );
        });
    });
});
