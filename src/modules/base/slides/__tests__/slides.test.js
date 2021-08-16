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
import Slides from 'c/slides';

// Not tested because depends on slot content:
// autoplayDelay
// coverflowSlideHeight
// coverflowSlideWidth
// direction
// effect
// height
// indicatorPosition
// slidesPerView
// spaceBetween
// speed
// width
// all methods (first, last, next, previous, pause and setSlide)
// change event

describe('Slides', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-slides', {
            is: Slides
        });

        expect(element.autoplayDelay).toBeUndefined();
        expect(element.buttonInner).toBeFalsy();
        expect(element.nextButtonIconName).toBe('utility:right');
        expect(element.nextButtonIconPosition).toBe('right');
        expect(element.nextButtonLabel).toBeUndefined();
        expect(element.nextButtonVariant).toBe('neutral');
        expect(element.buttonPosition).toBe('middle');
        expect(element.previousButtonIconName).toBe('utility:left');
        expect(element.previousButtonIconPosition).toBe('left');
        expect(element.previousButtonLabel).toBeUndefined();
        expect(element.previousButtonVariant).toBe('neutral');
        expect(element.coverflowSlideHeight).toBeUndefined();
        expect(element.coverflowSlideWidth).toBeUndefined();
        expect(element.direction).toBe('horizontal');
        expect(element.effect).toBe('slide');
        expect(element.fractionLabel).toBe('/');
        expect(element.fractionPrefixLabel).toBeUndefined();
        expect(element.height).toBeUndefined();
        expect(element.indicatorPosition).toBe('bottom-center');
        expect(element.indicators).toBeFalsy();
        expect(element.indicatorType).toBe('bullets');
        expect(element.initialSlide).toBe(0);
        expect(element.loop).toBeFalsy();
        expect(element.navigation).toBeFalsy();
        expect(element.slidesPerView).toBe(1);
        expect(element.spaceBetween).toBe(0);
        expect(element.speed).toBe(300);
        expect(element.width).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // button-inner
    it('buttonInner = false', () => {
        const element = createElement('base-slides', {
            is: Slides
        });

        document.body.appendChild(element);
        element.buttonInner = false;

        return Promise.resolve().then(() => {
            expect(element.classList).not.toContain('avonni-button-inner');
        });
    });

    it('buttonInner = true', () => {
        const element = createElement('base-slides', {
            is: Slides
        });

        document.body.appendChild(element);
        element.buttonInner = true;

        return Promise.resolve().then(() => {
            expect(element.classList).toContain('avonni-button-inner');
        });
    });

    // button-next-icon-name
    // Depends on navigation
    it('nextButtonIconName', () => {
        const element = createElement('base-slides', {
            is: Slides
        });

        document.body.appendChild(element);
        element.nextButtonIconName = 'utility:apps';
        element.navigation = true;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '.avonni-right-button lightning-button'
            );
            expect(button.iconName).toBe('utility:apps');
        });
    });

    // button-next-icon-position
    // Depends on navigation
    it('nextButtonIconPosition', () => {
        const element = createElement('base-slides', {
            is: Slides
        });

        document.body.appendChild(element);
        element.nextButtonIconPosition = 'left';
        element.navigation = true;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '.avonni-right-button lightning-button'
            );
            expect(button.iconPosition).toBe('left');
        });
    });

    // button-next-label
    // Depends on navigation
    it('nextButtonLabel', () => {
        const element = createElement('base-slides', {
            is: Slides
        });

        document.body.appendChild(element);
        element.nextButtonLabel = 'A string label';
        element.navigation = true;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '.avonni-right-button lightning-button'
            );
            expect(button.label).toBe('A string label');
        });
    });

    // button-next-variant
    // Depends on navigation
    it('nextButtonVariant', () => {
        const element = createElement('base-slides', {
            is: Slides
        });

        document.body.appendChild(element);
        element.nextButtonVariant = 'brand';
        element.navigation = true;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '.avonni-right-button lightning-button'
            );
            expect(button.variant).toBe('brand');
        });
    });

    // button-position
    it('buttonPosition = middle', () => {
        const element = createElement('base-slides', {
            is: Slides
        });

        document.body.appendChild(element);
        element.buttonPosition = 'middle';

        return Promise.resolve().then(() => {
            expect(element.classList).toContain('avonni-flex-middle');
            expect(element.classList).not.toContain('avonni-flex-top');
            expect(element.classList).not.toContain('avonni-flex-bottom');
        });
    });

    it('buttonPosition = top', () => {
        const element = createElement('base-slides', {
            is: Slides
        });

        document.body.appendChild(element);
        element.buttonPosition = 'top';

        return Promise.resolve().then(() => {
            expect(element.classList).not.toContain('avonni-flex-middle');
            expect(element.classList).toContain('avonni-flex-top');
            expect(element.classList).not.toContain('avonni-flex-bottom');
        });
    });

    it('buttonPosition = bottom', () => {
        const element = createElement('base-slides', {
            is: Slides
        });

        document.body.appendChild(element);
        element.buttonPosition = 'bottom';

        return Promise.resolve().then(() => {
            expect(element.classList).not.toContain('avonni-flex-middle');
            expect(element.classList).not.toContain('avonni-flex-top');
            expect(element.classList).toContain('avonni-flex-bottom');
        });
    });

    // button-previous-icon-name
    // Depends on navigation
    it('previousButtonIconName', () => {
        const element = createElement('base-slides', {
            is: Slides
        });

        document.body.appendChild(element);
        element.previousButtonIconName = 'utility:apps';
        element.navigation = true;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '.avonni-left-button lightning-button'
            );
            expect(button.iconName).toBe('utility:apps');
        });
    });

    // button-previous-icon-position
    // Depends on navigation
    it('previousButtonIconPosition', () => {
        const element = createElement('base-slides', {
            is: Slides
        });

        document.body.appendChild(element);
        element.previousButtonIconPosition = 'right';
        element.navigation = true;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '.avonni-left-button lightning-button'
            );
            expect(button.iconPosition).toBe('right');
        });
    });

    // button-previous-label
    // Depends on navigation
    it('previousButtonLabel', () => {
        const element = createElement('base-slides', {
            is: Slides
        });

        document.body.appendChild(element);
        element.previousButtonLabel = 'A string label';
        element.navigation = true;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '.avonni-left-button lightning-button'
            );
            expect(button.label).toBe('A string label');
        });
    });

    // button-previous-variant
    // Depends on navigation
    it('previousButtonVariant', () => {
        const element = createElement('base-slides', {
            is: Slides
        });

        document.body.appendChild(element);
        element.previousButtonVariant = 'brand';
        element.navigation = true;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '.avonni-left-button lightning-button'
            );
            expect(button.variant).toBe('brand');
        });
    });

    // fraction-label and initial-slide
    // Depends on indicators and indicatorType
    it('fractionLabel and initialSlide', () => {
        const element = createElement('base-slides', {
            is: Slides
        });

        document.body.appendChild(element);
        element.fractionLabel = 'of';
        element.indicatorType = 'fractions';
        element.indicators = true;
        element.initialSlide = 12;

        return Promise.resolve().then(() => {
            const fraction = element.shadowRoot.querySelector(
                '.avonni-fractions'
            );
            expect(fraction.textContent.trim()).toBe('13 of 0');
        });
    });

    // fraction-prefix-label
    // Depends on indicators and indicatorType
    it('fractionPrefixLabel', () => {
        const element = createElement('base-slides', {
            is: Slides
        });

        document.body.appendChild(element);
        element.fractionPrefixLabel = 'Slide';
        element.indicatorType = 'fractions';
        element.indicators = true;

        return Promise.resolve().then(() => {
            const fraction = element.shadowRoot.querySelector(
                '.avonni-fractions'
            );
            expect(fraction.textContent.trim()).toBe('Slide 1 / 0');
        });
    });

    // indicators
    it('indicators = false', () => {
        const element = createElement('base-slides', {
            is: Slides
        });

        document.body.appendChild(element);
        element.indicators = false;

        return Promise.resolve().then(() => {
            const bullets = element.shadowRoot.querySelector('.avonni-bullets');
            expect(bullets).toBeFalsy();
        });
    });

    it('indicators = true', () => {
        const element = createElement('base-slides', {
            is: Slides
        });

        document.body.appendChild(element);
        element.indicators = true;

        return Promise.resolve().then(() => {
            const bullets = element.shadowRoot.querySelector('.avonni-bullets');
            expect(bullets).toBeTruthy();
        });
    });

    // indicator-type
    // Depends on indicator
    it('indicatorType = bullets', () => {
        const element = createElement('base-slides', {
            is: Slides
        });

        document.body.appendChild(element);
        element.indicators = true;
        element.indicatorType = 'bullets';

        return Promise.resolve().then(() => {
            const bullets = element.shadowRoot.querySelector('.avonni-bullets');
            const fractions = element.shadowRoot.querySelector(
                '.avonni-fractions'
            );
            const progressBar = element.shadowRoot.querySelector(
                '.slds-progress-bar'
            );

            expect(bullets).toBeTruthy();
            expect(fractions).toBeFalsy();
            expect(progressBar).toBeFalsy();
        });
    });

    it('indicatorType = progress-bar', () => {
        const element = createElement('base-slides', {
            is: Slides
        });

        document.body.appendChild(element);
        element.indicators = true;
        element.indicatorType = 'progress-bar';

        return Promise.resolve().then(() => {
            const bullets = element.shadowRoot.querySelector('.avonni-bullets');
            const fractions = element.shadowRoot.querySelector(
                '.avonni-fractions'
            );
            const progressBar = element.shadowRoot.querySelector(
                '.slds-progress-bar'
            );

            expect(bullets).toBeFalsy();
            expect(fractions).toBeFalsy();
            expect(progressBar).toBeTruthy();
        });
    });

    it('indicatorType = dynamic-bullets', () => {
        const element = createElement('base-slides', {
            is: Slides
        });

        document.body.appendChild(element);
        element.indicators = true;
        element.indicatorType = 'dynamic-bullets';

        return Promise.resolve().then(() => {
            const bullets = element.shadowRoot.querySelector('.avonni-bullets');
            const fractions = element.shadowRoot.querySelector(
                '.avonni-fractions'
            );
            const progressBar = element.shadowRoot.querySelector(
                '.slds-progress-bar'
            );

            expect(bullets).toBeTruthy();
            expect(fractions).toBeFalsy();
            expect(progressBar).toBeFalsy();
        });
    });

    it('indicatorType = fractions', () => {
        const element = createElement('base-slides', {
            is: Slides
        });

        document.body.appendChild(element);
        element.indicators = true;
        element.indicatorType = 'fractions';

        return Promise.resolve().then(() => {
            const bullets = element.shadowRoot.querySelector('.avonni-bullets');
            const fractions = element.shadowRoot.querySelector(
                '.avonni-fractions'
            );
            const progressBar = element.shadowRoot.querySelector(
                '.slds-progress-bar'
            );

            expect(bullets).toBeFalsy();
            expect(fractions).toBeTruthy();
            expect(progressBar).toBeFalsy();
        });
    });

    // loop
    // Depends on navigation
    it('loop = false', () => {
        const element = createElement('base-slides', {
            is: Slides
        });

        document.body.appendChild(element);
        element.navigation = true;
        element.loop = false;

        return Promise.resolve().then(() => {
            const leftButton = element.shadowRoot.querySelector(
                '.avonni-left-button lightning-button'
            );

            expect(leftButton.disabled).toBeTruthy();
        });
    });

    it('loop = true', () => {
        const element = createElement('base-slides', {
            is: Slides
        });

        document.body.appendChild(element);
        element.navigation = true;
        element.loop = true;

        return Promise.resolve().then(() => {
            const leftButton = element.shadowRoot.querySelector(
                '.avonni-left-button lightning-button'
            );

            expect(leftButton.disabled).toBeFalsy();
        });
    });

    // navigation
    it('navigation = false', () => {
        const element = createElement('base-slides', {
            is: Slides
        });

        document.body.appendChild(element);
        element.navigation = false;

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                'lightning-button'
            );

            expect(buttons).toHaveLength(0);
        });
    });

    it('navigation = true', () => {
        const element = createElement('base-slides', {
            is: Slides
        });

        document.body.appendChild(element);
        element.navigation = true;

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                'lightning-button'
            );

            expect(buttons).toHaveLength(2);
        });
    });
});
