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
import Skeleton from '../skeleton';

let element;
describe('Skeleton', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('avonni-skeleton', {
            is: Skeleton
        });
        document.body.appendChild(element);
    });

    it('Skeleton: Default attributes', () => {
        expect(element.animation).toBeUndefined();
        expect(element.height).toBeUndefined();
        expect(element.variant).toBe('text');
        expect(element.width).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // skeleton-base
    // it('Skeleton: base', () => {
    //     const skeleton = element.shadowRoot.querySelector(
    //         '[data-element-id="avonni-skeleton"]'
    //     );
    //     return Promise.resolve().then(() => {
    //         expect(skeleton.className).toBe(
    //             'avonni-skeleton__base avonni-skeleton__variant-text avonni-skeleton__animation-undefined'
    //         );
    //     });
    // });

    // // skeleton-variant text
    // it('Skeleton: text variant', () => {
    //     element.variant = 'text';
    //     const skeleton = element.shadowRoot.querySelector(
    //         '[data-element-id="avonni-skeleton"]'
    //     );
    //     return Promise.resolve().then(() => {
    //         expect(skeleton.className).toBe(
    //             'avonni-skeleton__base avonni-skeleton__variant-text avonni-skeleton__animation-undefined'
    //         );
    //     });
    // });

    // // skeleton-variant rectangular
    // it('Skeleton: rectangular variant', () => {
    //     element.variant = 'rectangular';
    //     const skeleton = element.shadowRoot.querySelector(
    //         '[data-element-id="avonni-skeleton"]'
    //     );
    //     return Promise.resolve().then(() => {
    //         expect(skeleton.className).toBe(
    //             'avonni-skeleton__base avonni-skeleton__animation-undefined avonni-skeleton__variant-rectangular'
    //         );
    //     });
    // });

    // // skeleton-variant rectangular
    // it('Skeleton: circular variant', () => {
    //     element.variant = 'circular';
    //     const skeleton = element.shadowRoot.querySelector(
    //         '[data-element-id="avonni-skeleton"]'
    //     );
    //     return Promise.resolve().then(() => {
    //         expect(skeleton.className).toBe(
    //             'avonni-skeleton__base avonni-skeleton__animation-undefined avonni-skeleton__variant-circular'
    //         );
    //     });
    // });

    // // skeleton-animation pulse
    // it('Skeleton: pulse animation', () => {
    //     element.animation = 'pulse';
    //     const skeleton = element.shadowRoot.querySelector(
    //         '[data-element-id="avonni-skeleton"]'
    //     );
    //     return Promise.resolve().then(() => {
    //         expect(skeleton.className).toBe(
    //             'avonni-skeleton__base avonni-skeleton__variant-text avonni-skeleton__animation-pulse'
    //         );
    //     });
    // });

    // // skeleton-animation pulse
    // it('Skeleton: wave animation', () => {
    //     element.animation = 'wave';
    //     const skeleton = element.shadowRoot.querySelector(
    //         '[data-element-id="avonni-skeleton"]'
    //     );
    //     return Promise.resolve().then(() => {
    //         expect(skeleton.className).toBe(
    //             'avonni-skeleton__base avonni-skeleton__variant-text avonni-skeleton__animation-wave'
    //         );
    //     });
    // });

    // // skeleton-height undefined
    // it('Skeleton: undefined height should set component height to undefined and DOM avonni-skeleton height to default height for text variant (0.7em)', () => {
    //     element.variant = 'text';
    //     element.height = undefined;
    //     const skeleton = element.shadowRoot.querySelector(
    //         '[data-element-id="avonni-skeleton"]'
    //     );
    //     return Promise.resolve().then(() => {
    //         expect(skeleton.style.height).toBe('0.7em');
    //         expect(element.height).toBe(undefined);
    //     });
    // });

    // // skeleton-height defined
    // it('Skeleton: 100px height should set component and DOM avonni-skeleton height to 100px', () => {
    //     element.variant = 'rectangular';
    //     element.height = '100px';
    //     const skeleton = element.shadowRoot.querySelector(
    //         '[data-element-id="avonni-skeleton"]'
    //     );
    //     return Promise.resolve().then(() => {
    //         expect(element.height).toBe('100px');
    //         expect(skeleton.style.height).toBe('100px');
    //     });
    // });

    // // skeleton-width undefined
    // it('Skeleton: undefined width should set component height to undefined and DOM avonni-skeleton height to default width for text variant (0.7em)', () => {
    //     element.variant = 'text';
    //     element.width = undefined;
    //     const skeleton = element.shadowRoot.querySelector(
    //         '[data-element-id="avonni-skeleton"]'
    //     );
    //     return Promise.resolve().then(() => {
    //         expect(skeleton.style.width).toBe('100%');
    //         expect(element.width).toBe(undefined);
    //     });
    // });

    // // skeleton-width defined
    // it('Skeleton: 100px width should set component and DOM avonni-skeleton width to 100px', () => {
    //     element.variant = 'rectangular';
    //     element.width = '100px';
    //     const skeleton = element.shadowRoot.querySelector(
    //         '[data-element-id="avonni-skeleton"]'
    //     );
    //     return Promise.resolve().then(() => {
    //         expect(element.width).toBe('100px');
    //         expect(skeleton.style.width).toBe('100px');
    //     });
    // });

    // avatar variant
    it('Skeleton Avatar: pulse animation', () => {
        element.variant = 'avatar';
        element.animation = 'pulse';
        element.variantAttributes = {
            variant: 'circle',
            size: 'x-large',
            primaryText: 'primary',
            secondaryText: 'secondary',
            tertiaryText: 'tertiary'
        };

        return Promise.resolve().then(() => {
            const skeletonAvatarFigure = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton__avatar-figure"]'
            );

            expect(skeletonAvatarFigure.className).toContain(
                'avonni-skeleton__avatar-animation-pulse'
            );
        });

        // return Promise.resolve().then(() => {
        //     const skeletonAvatar = element.shadowRoot.querySelector(
        //         '[data-element-id="avonni-skeleton__avatar-figure"]'
        //     );
        //     const skeletonAvatarPrimaryText = element.shadowRoot.querySelector(
        //         '[data-element-id="avonni-skeleton__avatar-primary-text"]'
        //     );
        //     const skeletonAvatarSecondaryText =
        //         element.shadowRoot.querySelector(
        //             '[data-element-id="avonni-skeleton__avatar-secondary-text"]'
        //         );
        //     const skeletonAvatarTertiaryText = element.shadowRoot.querySelector(
        //         '[data-element-id="avonni-skeleton__avatar-tertiary-text"]'
        //     );
        //     expect(skeletonAvatar).toBeTruthy();
        //     expect(skeletonAvatarPrimaryText).toBeTruthy();
        //     expect(skeletonAvatarSecondaryText).toBeTruthy();
        //     expect(skeletonAvatarTertiaryText).toBeTruthy();
        // });
    });

    // avatar variant
    // it('Skeleton Avatar: size medium', () => {
    //     element.variant = 'avatar';
    //     element.animation = 'pulse';
    //     element.variantAttributes = {
    //         variant: 'circle',
    //         size: 'medium',
    //         primaryText: 'primary',
    //         secondaryText: 'secondary',
    //         tertiaryText: 'tertiary'
    //     };

    //     return Promise.resolve().then(() => {
    //         const skeletonAvatar = element.shadowRoot.querySelector(
    //             '[data-element-id="avonni-skeleton__avatar-figure"]'
    //         );
    //         const skeletonAvatarPrimaryText = element.shadowRoot.querySelector(
    //             '[data-element-id="avonni-skeleton__avatar-primary-text"]'
    //         );
    //         const skeletonAvatarSecondaryText =
    //             element.shadowRoot.querySelector(
    //                 '[data-element-id="avonni-skeleton__avatar-secondary-text"]'
    //             );
    //         const skeletonAvatarTertiaryText = element.shadowRoot.querySelector(
    //             '[data-element-id="avonni-skeleton__avatar-tertiary-text"]'
    //         );
    //         expect(skeletonAvatar).toBeTruthy();
    //         expect(skeletonAvatarPrimaryText).toBeTruthy();
    //         expect(skeletonAvatarSecondaryText).toBeTruthy();
    //         expect(skeletonAvatarTertiaryText).not.toBeTruthy();
    //     });
    // });
});
