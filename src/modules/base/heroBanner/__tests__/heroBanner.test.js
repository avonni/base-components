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

    it('Hero Banner: Default attributes', () => {
        expect(element.caption).toBeUndefined();
        expect(element.contentHorizontalAlignment).toBe('left');
        expect(element.contentVerticalAlignment).toBe('center');
        expect(element.contentWidth).toBe(100);
        expect(element.height).toBe(400);
        expect(element.imageLayout).toBe('scale-to-fill');
        expect(element.imagePosition).toBe('center');
        expect(element.maxWidth).toBe(960);
        expect(element.primaryButtonIconName).toBeUndefined();
        expect(element.primaryButtonIconPosition).toBe('left');
        expect(element.primaryButtonIconSize).toBe('medium');
        expect(element.primaryButtonLabel).toBeUndefined();
        expect(element.primaryButtonVariant).toBe('neutral');
        expect(element.secondaryButtonIconName).toBeUndefined();
        expect(element.secondaryButtonIconPosition).toBe('left');
        expect(element.secondaryButtonIconSize).toBe('medium');
        expect(element.secondaryButtonLabel).toBeUndefined();
        expect(element.secondaryButtonVariant).toBe('neutral');
        expect(element.src).toBeUndefined();
        expect(element.subtitle).toBeUndefined();
        expect(element.title).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // caption
    it('Hero Banner: caption', () => {
        element.caption = 'This is a caption text';

        return Promise.resolve().then(() => {
            const caption = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-caption"]'
            );
            expect(caption.textContent).toBe('This is a caption text');
        });
    });

    // content horizontal alignment
    it('Hero Banner: content horizontal alignment - center', () => {
        element.title = 'This is a title text';
        element.contentHorizontalAlignment = 'center';

        return Promise.resolve().then(() => {
            const textContainer = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-content-width"]'
            );
            expect(textContainer.className).toContain(
                'avonni-hero-banner__horizontal-alignment_center'
            );
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner__horizontal-alignment_right'
            );
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner__horizontal-alignment_left'
            );
        });
    });

    it('Hero Banner: content horizontal alignment - left', () => {
        element.title = 'This is a title text';
        element.contentHorizontalAlignment = 'left';

        return Promise.resolve().then(() => {
            const textContainer = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-content-width"]'
            );
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner__horizontal-alignment_center'
            );
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner__horizontal-alignment_right'
            );
            expect(textContainer.className).toContain(
                'avonni-hero-banner__horizontal-alignment_left'
            );
        });
    });

    it('Hero Banner: content horizontal alignment - right', () => {
        element.title = 'This is a title text';
        element.contentHorizontalAlignment = 'right';

        return Promise.resolve().then(() => {
            const textContainer = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-content-width"]'
            );
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner__horizontal-alignment_center'
            );
            expect(textContainer.className).toContain(
                'avonni-hero-banner__horizontal-alignment_right'
            );
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner__horizontal-alignment_left'
            );
        });
    });

    // content vertical alignment
    it('Hero Banner: content vertical alignment - center', () => {
        element.title = 'This is a title text';
        element.contentVerticalAlignment = 'center';

        return Promise.resolve().then(() => {
            const textContainer = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-content-container"]'
            );
            expect(textContainer.className).toContain(
                'avonni-hero-banner__vertical-alignment_center'
            );
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner__vertical-alignment_bottom'
            );
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner__vertical-alignment_top'
            );
        });
    });

    it('Hero Banner: content vertical alignment - top', () => {
        element.title = 'This is a title text';
        element.contentVerticalAlignment = 'top';

        return Promise.resolve().then(() => {
            const textContainer = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-content-container"]'
            );
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner__vertical-alignment_center'
            );
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner__vertical-alignment_bottom'
            );
            expect(textContainer.className).toContain(
                'avonni-hero-banner__vertical-alignment_top'
            );
        });
    });

    it('Hero Banner: content vertical alignment - bottom', () => {
        element.title = 'This is a title text';
        element.contentVerticalAlignment = 'bottom';

        return Promise.resolve().then(() => {
            const textContainer = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-content-container"]'
            );
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner__vertical-alignment_center'
            );
            expect(textContainer.className).toContain(
                'avonni-hero-banner__vertical-alignment_bottom'
            );
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner__vertical-alignment_top'
            );
        });
    });

    // content width
    it('Hero Banner: content width', () => {
        element.title = 'This is a title text';
        element.contentWidth = 10;
        const contentWidth = '10%';

        return Promise.resolve().then(() => {
            const textContainer = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-content"]'
            );
            expect(textContainer.style.width).toBe(contentWidth);
        });
    });

    // height
    it('Hero Banner: height', () => {
        const height = '200px';
        element.height = 200;

        return Promise.resolve().then(() => {
            const background = element.shadowRoot.querySelector(
                '.avonni-hero-banner__background'
            );
            expect(background.style.height).toBe(height);
        });
    });

    // Needs an image
    // image layout
    it('Hero Banner: image layout - scale-to-fill', () => {
        element.src =
            'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png';
        element.imageLayout = 'scale-to-fill';

        return Promise.resolve().then(() => {
            const background = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-background"]'
            );
            expect(background.getAttribute('style')).toContain('/ cover');
        });
    });

    it('Hero Banner: image layout - fit', () => {
        element.src =
            'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png';
        element.imageLayout = 'fit';

        return Promise.resolve().then(() => {
            const background = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-background"]'
            );
            expect(background.getAttribute('style')).toContain(
                '/ contain no-repeat'
            );
        });
    });

    it('Hero Banner: image layout - tile', () => {
        element.src =
            'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png';
        element.imageLayout = 'tile';

        return Promise.resolve().then(() => {
            const background = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-background"]'
            );
            expect(background.getAttribute('style')).toContain('repeat');
        });
    });

    it('Hero Banner: image layout - tile-horizontally', () => {
        element.src =
            'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png';
        element.imageLayout = 'tile-horizontally';

        return Promise.resolve().then(() => {
            const background = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-background"]'
            );
            expect(background.getAttribute('style')).toContain('repeat-x');
        });
    });

    it('Hero Banner: image layout - tile-vertically', () => {
        element.src =
            'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png';
        element.imageLayout = 'tile-vertically';

        return Promise.resolve().then(() => {
            const background = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-background"]'
            );
            expect(background.getAttribute('style')).toContain('repeat-y');
        });
    });

    // Needs an image
    // image position
    it('Hero Banner: image position - center', () => {
        element.src =
            'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png';
        element.imagePosition = 'center';

        return Promise.resolve().then(() => {
            const background = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-background"]'
            );
            expect(background.getAttribute('style')).toContain('center center');
        });
    });

    it('Hero Banner: image position - right', () => {
        element.src =
            'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png';
        element.imagePosition = 'right';

        return Promise.resolve().then(() => {
            const background = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-background"]'
            );
            expect(background.getAttribute('style')).toContain('center right');
        });
    });

    it('Hero Banner: image position - left', () => {
        element.src =
            'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png';
        element.imagePosition = 'left';

        return Promise.resolve().then(() => {
            const background = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-background"]'
            );
            expect(background.getAttribute('style')).toContain('center left');
        });
    });

    it('Hero Banner: image position - top center', () => {
        element.src =
            'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png';
        element.imagePosition = 'top-center';

        return Promise.resolve().then(() => {
            const background = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-background"]'
            );
            expect(background.getAttribute('style')).toContain('top center');
        });
    });

    it('Hero Banner: image position - top right', () => {
        element.src =
            'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png';
        element.imagePosition = 'top-right';

        return Promise.resolve().then(() => {
            const background = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-background"]'
            );
            expect(background.getAttribute('style')).toContain('top right');
        });
    });

    it('Hero Banner: image position - top left', () => {
        element.src =
            'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png';
        element.imagePosition = 'top-left';

        return Promise.resolve().then(() => {
            const background = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-background"]'
            );
            expect(background.getAttribute('style')).toContain('top left');
        });
    });

    it('Hero Banner: image position - bottom center', () => {
        element.src =
            'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png';
        element.imagePosition = 'bottom-center';

        return Promise.resolve().then(() => {
            const background = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-background"]'
            );
            expect(background.getAttribute('style')).toContain('bottom center');
        });
    });

    it('Hero Banner: image position - bottom right', () => {
        element.src =
            'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png';
        element.imagePosition = 'bottom-right';

        return Promise.resolve().then(() => {
            const background = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-background"]'
            );
            expect(background.getAttribute('style')).toContain('bottom right');
        });
    });

    it('Hero Banner: image position - bottom left', () => {
        element.src =
            'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png';
        element.imagePosition = 'bottom-left';

        return Promise.resolve().then(() => {
            const background = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-background"]'
            );
            expect(background.getAttribute('style')).toContain('bottom left');
        });
    });

    // max width
    it('Hero Banner: max width', () => {
        const maxWidth = '50px';
        element.maxWidth = 50;

        return Promise.resolve().then(() => {
            const background = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-content-width"]'
            );
            expect(background.style.width).toBe(maxWidth);
        });
    });

    // Primary button icon name
    it('Hero Banner: primary button icon name', () => {
        element.primaryButtonIconName = 'utility:down';

        return Promise.resolve().then(() => {
            const primaryButton = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-primary-button"]'
            );
            const primaryIconLeft = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-primary-button-left"]'
            );
            const primaryIconRight = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-primary-button-right"]'
            );
            expect(primaryButton).toBeTruthy();
            expect(primaryIconLeft.iconName).toBe('utility:down');
            expect(primaryIconRight).toBeFalsy();
        });
    });

    // Primary button icon position
    it('Hero Banner: primary button icon position - left', () => {
        element.primaryButtonIconName = 'utility:down';
        element.primaryButtonIconPosition = 'left';

        return Promise.resolve().then(() => {
            const primaryButton = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-primary-button"]'
            );
            const primaryIconLeft = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-primary-button-left"]'
            );
            const primaryIconRight = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-primary-button-right"]'
            );
            expect(primaryButton).toBeTruthy();
            expect(primaryIconLeft.iconName).toBe('utility:down');
            expect(primaryIconRight).toBeFalsy();
        });
    });

    it('Hero Banner: primary button icon position - right', () => {
        element.primaryButtonIconName = 'utility:down';
        element.primaryButtonIconPosition = 'right';

        return Promise.resolve().then(() => {
            const primaryButton = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-primary-button"]'
            );
            const primaryIconLeft = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-primary-button-left"]'
            );
            const primaryIconRight = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-primary-button-right"]'
            );
            expect(primaryButton).toBeTruthy();
            expect(primaryIconLeft).toBeFalsy();
            expect(primaryIconRight.iconName).toBe('utility:down');
        });
    });

    // Primary button icon size
    it('Hero Banner: primary button icon size - x-small', () => {
        element.primaryButtonIconName = 'utility:down';
        element.primaryButtonIconSize = 'x-small';

        return Promise.resolve().then(() => {
            const primaryButton = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-primary-button"]'
            );
            const primaryIconLeft = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-primary-button-left"]'
            );
            expect(primaryButton).toBeTruthy();
            expect(primaryIconLeft.svgClass).toBe(
                'slds-button__icon slds-button__icon_x-small'
            );
        });
    });

    it('Hero Banner: primary button icon size - small', () => {
        element.primaryButtonIconName = 'utility:down';
        element.primaryButtonIconSize = 'small';

        return Promise.resolve().then(() => {
            const primaryButton = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-primary-button"]'
            );
            const primaryIconLeft = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-primary-button-left"]'
            );
            expect(primaryButton).toBeTruthy();
            expect(primaryIconLeft.svgClass).toBe(
                'slds-button__icon slds-button__icon_small'
            );
        });
    });

    it('Hero Banner: primary button icon size - medium', () => {
        element.primaryButtonIconName = 'utility:down';
        element.primaryButtonIconSize = 'medium';

        return Promise.resolve().then(() => {
            const primaryButton = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-primary-button"]'
            );
            const primaryIconLeft = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-primary-button-left"]'
            );
            expect(primaryButton).toBeTruthy();
            expect(primaryIconLeft.svgClass).toBe('slds-button__icon');
        });
    });

    it('Hero Banner: primary button icon size - large', () => {
        element.primaryButtonIconName = 'utility:down';
        element.primaryButtonIconSize = 'large';

        return Promise.resolve().then(() => {
            const primaryButton = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-primary-button"]'
            );
            const primaryIconLeft = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-primary-button-left"]'
            );
            expect(primaryButton).toBeTruthy();
            expect(primaryIconLeft.svgClass).toBe(
                'slds-button__icon slds-button__icon_large'
            );
        });
    });

    // Primary button label
    it('Hero Banner: primary button label', () => {
        element.primaryButtonLabel = 'This is a primary button label';

        return Promise.resolve().then(() => {
            const primaryButton = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-primary-button"]'
            );
            expect(primaryButton.textContent).toBe(
                'This is a primary button label'
            );
        });
    });

    // Primary button variant
    it('Hero Banner: primary button variant - neutral', () => {
        element.primaryButtonLabel = 'This is a primary button label';

        return Promise.resolve().then(() => {
            const primaryButton = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-primary-button"]'
            );
            expect(primaryButton.className).toContain(
                'avonni-hero-banner__primary-button_variant-neutral'
            );
        });
    });

    it('Hero Banner: primary button variant - base', () => {
        element.primaryButtonLabel = 'This is a primary button label';
        element.primaryButtonVariant = 'base';

        return Promise.resolve().then(() => {
            const primaryButton = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-primary-button"]'
            );
            expect(primaryButton.className).toBe(
                'avonni-hero-banner__primary-button'
            );
        });
    });

    it('Hero Banner: primary button variant - brand', () => {
        element.primaryButtonLabel = 'This is a primary button label';
        element.primaryButtonVariant = 'brand';

        return Promise.resolve().then(() => {
            const primaryButton = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-primary-button"]'
            );
            expect(primaryButton.className).toContain(
                'avonni-hero-banner__primary-button_variant-brand'
            );
        });
    });

    it('Hero Banner: primary button variant - brand outline', () => {
        element.primaryButtonLabel = 'This is a primary button label';
        element.primaryButtonVariant = 'brand-outline';

        return Promise.resolve().then(() => {
            const primaryButton = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-primary-button"]'
            );
            expect(primaryButton.className).toContain(
                'avonni-hero-banner__primary-button_variant-outline-brand'
            );
        });
    });

    it('Hero Banner: primary button variant - destructive', () => {
        element.primaryButtonLabel = 'This is a primary button label';
        element.primaryButtonVariant = 'destructive';

        return Promise.resolve().then(() => {
            const primaryButton = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-primary-button"]'
            );
            expect(primaryButton.className).toContain(
                'avonni-hero-banner__primary-button_variant-destructive'
            );
        });
    });

    it('Hero Banner: primary button variant - destructive text', () => {
        element.primaryButtonLabel = 'This is a primary button label';
        element.primaryButtonVariant = 'destructive-text';

        return Promise.resolve().then(() => {
            const primaryButton = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-primary-button"]'
            );
            expect(primaryButton.className).toContain(
                'avonni-hero-banner__primary-button_variant-text-destructive'
            );
        });
    });

    it('Hero Banner: primary button variant - inverse', () => {
        element.primaryButtonLabel = 'This is a primary button label';
        element.primaryButtonVariant = 'inverse';

        return Promise.resolve().then(() => {
            const primaryButton = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-primary-button"]'
            );
            expect(primaryButton.className).toContain(
                'avonni-hero-banner__primary-button_variant-inverse'
            );
        });
    });

    it('Hero Banner: primary button variant - success', () => {
        element.primaryButtonLabel = 'This is a primary button label';
        element.primaryButtonVariant = 'success';

        return Promise.resolve().then(() => {
            const primaryButton = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-primary-button"]'
            );
            expect(primaryButton.className).toContain(
                'avonni-hero-banner__primary-button_variant-success'
            );
        });
    });

    // Needs a primary button
    // Primary button icon name
    it('Hero Banner: secondary button icon name', () => {
        element.primaryButtonLabel = 'This is a primary button label';
        element.secondaryButtonIconName = 'utility:down';

        return Promise.resolve().then(() => {
            const secondaryButton = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-secondary-button"]'
            );
            const secondaryIconLeft = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-secondary-button-left"]'
            );
            expect(secondaryButton).toBeTruthy();
            expect(secondaryIconLeft.iconName).toBe('utility:down');
        });
    });

    // secondary button icon position
    it('Hero Banner: secondary button icon position - left', () => {
        element.primaryButtonLabel = 'This is a primary button label';
        element.secondaryButtonIconName = 'utility:down';
        element.secondaryButtonIconPosition = 'left';

        return Promise.resolve().then(() => {
            const secondaryButton = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-secondary-button"]'
            );
            const secondaryIconLeft = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-secondary-button-left"]'
            );
            const secondaryIconRight = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-secondary-button-right"]'
            );
            expect(secondaryButton).toBeTruthy();
            expect(secondaryIconLeft.iconName).toBe('utility:down');
            expect(secondaryIconRight).toBeFalsy();
        });
    });

    it('Hero Banner: secondary button icon position - right', () => {
        element.primaryButtonLabel = 'This is a primary button label';
        element.secondaryButtonIconName = 'utility:down';
        element.secondaryButtonIconPosition = 'right';

        return Promise.resolve().then(() => {
            const secondaryButton = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-secondary-button"]'
            );
            const secondaryIconLeft = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-secondary-button-left"]'
            );
            const secondaryIconRight = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-secondary-button-right"]'
            );
            expect(secondaryButton).toBeTruthy();
            expect(secondaryIconLeft).toBeFalsy();
            expect(secondaryIconRight.iconName).toBe('utility:down');
        });
    });

    // secondary button icon size
    it('Hero Banner: secondary button icon size - x-small', () => {
        element.primaryButtonLabel = 'This is a primary button label';
        element.secondaryButtonIconName = 'utility:down';
        element.secondaryButtonIconSize = 'x-small';

        return Promise.resolve().then(() => {
            const secondaryButton = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-secondary-button"]'
            );
            const secondaryIconLeft = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-secondary-button-left"]'
            );
            expect(secondaryButton).toBeTruthy();
            expect(secondaryIconLeft.svgClass).toBe(
                'slds-button__icon slds-button__icon_x-small'
            );
        });
    });

    it('Hero Banner: secondary button icon size - small', () => {
        element.primaryButtonLabel = 'This is a primary button label';
        element.secondaryButtonIconName = 'utility:down';
        element.secondaryButtonIconSize = 'small';

        return Promise.resolve().then(() => {
            const secondaryButton = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-secondary-button"]'
            );
            const secondaryIconLeft = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-secondary-button-left"]'
            );
            expect(secondaryButton).toBeTruthy();
            expect(secondaryIconLeft.svgClass).toBe(
                'slds-button__icon slds-button__icon_small'
            );
        });
    });

    it('Hero Banner: secondary button icon size - medium', () => {
        element.primaryButtonLabel = 'This is a primary button label';
        element.secondaryButtonIconName = 'utility:down';
        element.secondaryButtonIconSize = 'medium';

        return Promise.resolve().then(() => {
            const secondaryButton = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-secondary-button"]'
            );
            const secondaryIconLeft = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-secondary-button-left"]'
            );
            expect(secondaryButton).toBeTruthy();
            expect(secondaryIconLeft.svgClass).toBe('slds-button__icon');
        });
    });

    it('Hero Banner: secondary button icon size - large', () => {
        element.primaryButtonLabel = 'This is a primary button label';
        element.secondaryButtonIconName = 'utility:down';
        element.secondaryButtonIconSize = 'large';

        return Promise.resolve().then(() => {
            const secondaryButton = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-secondary-button"]'
            );
            const secondaryIconLeft = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-secondary-button-left"]'
            );
            expect(secondaryButton).toBeTruthy();
            expect(secondaryIconLeft.svgClass).toBe(
                'slds-button__icon slds-button__icon_large'
            );
        });
    });

    // secondary button label
    it('Hero Banner: secondary button label', () => {
        element.primaryButtonLabel = 'This is a primary button label';
        element.secondaryButtonLabel = 'This is a secondary button label';

        return Promise.resolve().then(() => {
            const secondaryButton = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-secondary-button"]'
            );
            expect(secondaryButton.textContent).toBe(
                'This is a secondary button label'
            );
        });
    });

    // secondary button variant
    it('Hero Banner: secondary button variant - neutral', () => {
        element.primaryButtonLabel = 'This is a primary button label';
        element.secondaryButtonLabel = 'This is a secondary button label';

        return Promise.resolve().then(() => {
            const secondaryButton = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-secondary-button"]'
            );
            expect(secondaryButton.className).toContain(
                'avonni-hero-banner__secondary-button_variant-neutral'
            );
        });
    });

    it('Hero Banner: secondary button variant - base', () => {
        element.primaryButtonLabel = 'This is a primary button label';
        element.secondaryButtonLabel = 'This is a secondary button label';
        element.secondaryButtonVariant = 'base';

        return Promise.resolve().then(() => {
            const secondaryButton = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-secondary-button"]'
            );
            expect(secondaryButton.className).toBe(
                'avonni-hero-banner__secondary-button slds-m-left_x-small'
            );
        });
    });

    it('Hero Banner: secondary button variant - brand', () => {
        element.primaryButtonLabel = 'This is a primary button label';
        element.secondaryButtonLabel = 'This is a secondary button label';
        element.secondaryButtonVariant = 'brand';

        return Promise.resolve().then(() => {
            const secondaryButton = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-secondary-button"]'
            );
            expect(secondaryButton.className).toContain(
                'avonni-hero-banner__secondary-button_variant-brand'
            );
        });
    });

    it('Hero Banner: secondary button variant - brand outline', () => {
        element.primaryButtonLabel = 'This is a primary button label';
        element.secondaryButtonLabel = 'This is a secondary button label';
        element.secondaryButtonVariant = 'brand-outline';

        return Promise.resolve().then(() => {
            const secondaryButton = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-secondary-button"]'
            );
            expect(secondaryButton.className).toContain(
                'avonni-hero-banner__secondary-button_variant-outline-brand'
            );
        });
    });

    it('Hero Banner: secondary button variant - destructive', () => {
        element.primaryButtonLabel = 'This is a primary button label';
        element.secondaryButtonLabel = 'This is a secondary button label';
        element.secondaryButtonVariant = 'destructive';

        return Promise.resolve().then(() => {
            const secondaryButton = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-secondary-button"]'
            );
            expect(secondaryButton.className).toContain(
                'avonni-hero-banner__secondary-button_variant-destructive'
            );
        });
    });

    it('Hero Banner: secondary button variant - destructive text', () => {
        element.primaryButtonLabel = 'This is a primary button label';
        element.secondaryButtonLabel = 'This is a secondary button label';
        element.secondaryButtonVariant = 'destructive-text';

        return Promise.resolve().then(() => {
            const secondaryButton = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-secondary-button"]'
            );
            expect(secondaryButton.className).toContain(
                'avonni-hero-banner__secondary-button_variant-text-destructive'
            );
        });
    });

    it('Hero Banner: secondary button variant - inverse', () => {
        element.primaryButtonLabel = 'This is a primary button label';
        element.secondaryButtonLabel = 'This is a secondary button label';
        element.secondaryButtonVariant = 'inverse';

        return Promise.resolve().then(() => {
            const secondaryButton = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-secondary-button"]'
            );
            expect(secondaryButton.className).toContain(
                'avonni-hero-banner__secondary-button_variant-inverse'
            );
        });
    });

    it('Hero Banner: secondary button variant - success', () => {
        element.primaryButtonLabel = 'This is a primary button label';
        element.secondaryButtonLabel = 'This is a secondary button label';
        element.secondaryButtonVariant = 'success';

        return Promise.resolve().then(() => {
            const secondaryButton = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-secondary-button"]'
            );
            expect(secondaryButton.className).toContain(
                'avonni-hero-banner__secondary-button_variant-success'
            );
        });
    });

    // subtitle
    it('Hero Banner: subtitle', () => {
        element.subtitle = 'This is a subtitle text';

        return Promise.resolve().then(() => {
            const subtitle = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-subtitle"]'
            );
            expect(subtitle.textContent).toBe('This is a subtitle text');
        });
    });

    // title
    it('Hero Banner: title', () => {
        element.title = 'This is a title text';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-title"]'
            );
            expect(title.textContent).toBe('This is a title text');
        });
    });

    /* ----- EVENTS ----- */

    // primary button click
    it('Hero banner: primary button click event', () => {
        element.primaryButtonLabel = 'This is a primary button label';

        const handler = jest.fn();
        element.addEventListener('primarybuttonclick', handler);

        return Promise.resolve().then(() => {
            const primaryButton = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-primary-button"]'
            );
            primaryButton.click();
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });

    // secondary button click
    it('Hero banner: secondary button click event', () => {
        element.primaryButtonLabel = 'This is a primary button label';
        element.secondaryButtonLabel = 'This is a secondary button label';

        const handler = jest.fn();
        element.addEventListener('secondarybuttonclick', handler);

        return Promise.resolve().then(() => {
            const secondaryButton = element.shadowRoot.querySelector(
                '[data-element-id="avonni-hero-banner-secondary-button"]'
            );
            secondaryButton.click();
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });
});
