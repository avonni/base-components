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
import Image from 'c/image';

// not tested
// cannot test computed images based on layout ( e.g. static Images and certain image states that do not have assigned dimensions ). Jest does not provide a layout system.
// cannot test aspect-ratio//most crop-size output. Jest/JS-Dom does not recognize its attribute within dom element. The JS function goes through, however since aspect-ratio computes only with 1 dimension ( e.g. width or height ) - we can only test the input dimension to match the same output dimension which is pointless.

const src =
    'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg';

let element;
describe('Image', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-image', {
            is: Image
        });
        document.body.appendChild(element);
    });

    it('Image - Default attributes', () => {
        expect(element.alternativeText).toBeUndefined();
        expect(element.cropFit).toBe('cover');
        expect(element.cropPositionX).toBe('50');
        expect(element.cropPositionY).toBe('50');
        expect(element.cropSize).toBeUndefined();
        expect(element.fluid).toBeFalsy();
        expect(element.fluidGrow).toBeFalsy();
        expect(element.height).toBeUndefined();
        expect(element.lazyLoading).toBe('auto');
        expect(element.sizes).toBeUndefined();
        expect(element.position).toBe('left');
        expect(element.src).toBeUndefined();
        expect(element.srcset).toBeUndefined();
        expect(element.staticImages).toBeFalsy();
        expect(element.thumbnail).toBeFalsy();
        expect(element.width).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // alt
    it('Image - alternative text', () => {
        element.src = src;
        element.alternativeText = 'This is an Alternative text';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.alt).toBe('This is an Alternative text');
        });
    });

    // Crop Fit
    it('Image - Crop Fit Cover', () => {
        element.src = src;
        element.cropSize = '16x9';
        element.cropFit = 'cover';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.style.objectFit).toBe('cover');
        });
    });

    it('Image - Crop Fit Contain', () => {
        element.src = src;
        element.cropSize = '16x9';
        element.cropFit = 'contain';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.style.objectFit).toBe('contain');
        });
    });

    it('Image - Crop Fit Fill', () => {
        element.src = src;
        element.cropSize = '16x9';
        element.cropFit = 'fill';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.style.objectFit).toBe('fill');
        });
    });

    it('Image - Crop Fit None', () => {
        element.src = src;
        element.cropSize = '16x9';
        element.cropFit = 'none';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.style.objectFit).toBe('none');
        });
    });

    // Crop Position
    it('Image - Crop Position', () => {
        element.src = src;
        element.cropSize = '16x9';
        element.cropFit = 'none';
        element.cropPositionX = '25';
        element.cropPositionY = '75';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.style.objectPosition).toBe('25% 75%');
        });
    });

    // Cropped Img Alignment - left, right, centre
    it('Image - Cropped Image Left', () => {
        element.src = src;
        element.cropSize = '16x9';
        element.width = '300';
        element.position = 'left';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.className).toBe('avonni-image avonni-image_float-left');
        });
    });

    it('Image - Cropped Image Center', () => {
        element.src = src;
        element.cropSize = '16x9';
        element.width = '300';
        element.position = 'center';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.className).toBe(
                'avonni-image avonni-image_margin-auto avonni-image_display-block'
            );
        });
    });

    it('Image - Cropped Image - Right', () => {
        element.src = src;
        element.cropSize = '16x9';
        element.width = '300';
        element.position = 'right';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.className).toBe('avonni-image avonni-image_float-right');
        });
    });

    // img NO Crop - Height Only
    it('Image - No crop - Height Only', () => {
        element.src = src;
        element.height = '225';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.style.width).toBeFalsy();
            expect(img.style.height).toBe('225px');
        });
    });

    // fluid
    it('Image - Fluid', () => {
        element.src = src;
        element.fluid = true;

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.className).toContain('avonni-image_fluid');
        });
    });

    // fluid grow
    it('Image - Fluid grow', () => {
        element.src = src;
        element.fluidGrow = true;

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.className).toContain(
                'avonni-image_fluid avonni-image_fluid-grow'
            );
        });
    });

    // position
    it('Image - Position left', () => {
        element.src = src;
        element.positon = 'left';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.className).toBe('avonni-image avonni-image_float-left');
        });
    });

    it('Image - Position right', () => {
        element.src = src;
        element.position = 'right';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.className).toBe('avonni-image avonni-image_float-right');
        });
    });

    it('Image - Position center', () => {
        element.src = src;
        element.position = 'center';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.className).toBe(
                'avonni-image avonni-image_margin-auto avonni-image_display-block'
            );
        });
    });

    // sizes
    it('Image - Sizes', () => {
        element.srcset =
            'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg 320w';
        element.sizes =
            '(max-width: 320px) 280px, (max-width: 480px) 440px, 800px';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.sizes).toBe(
                '(max-width: 320px) 280px, (max-width: 480px) 440px, 800px'
            );
        });
    });

    it('Image - Sizes[]', () => {
        element.srcset =
            'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg 320w';
        element.sizes = [
            '(max-width: 320px) 280px, (max-width: 480px) 440px, 800px'
        ];

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.sizes).toBe(
                '(max-width: 320px) 280px, (max-width: 480px) 440px, 800px'
            );
        });
    });

    // src
    it('Image - Src', () => {
        element.src = src;

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.src).toBe(
                'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg'
            );
        });
    });

    // srcset
    it('Image - Srcset string', () => {
        element.srcset =
            'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.srcset).toBe(
                'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg'
            );
        });
    });

    it('Image - srcset string[]', () => {
        element.srcset = [
            'https://www.avonni.app/, https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg'
        ];

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.srcset).toBe(
                'https://www.avonni.app/, https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg'
            );
        });
    });

    // Static Images NO CROP
    it('Image - Static Image - No Crop - Width - No Height', () => {
        element.src = src;
        element.staticImages = true;
        element.width = '400';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.className).toBe('avonni-image avonni-image_float-left');
            expect(img.style.maxWidth).toBe('400px');
            expect(img.style.height).toBeFalsy();
        });
    });
    it('Image - Static Image - No Crop - No Width - Height', () => {
        element.src = src;
        element.staticImages = true;
        element.height = '400';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.style.maxHeight).toBe('400px');
            expect(img.style.minHeight).toBe('400px');
            expect(img.style.height).toBe('400px');
        });
    });

    it('Image - Static Image - No Crop - No Width - No Height', () => {
        element.src = src;
        element.staticImages = true;
        document.body.appendChild(element);

        return Promise.resolve()
            .then(() => {})
            .then(() => {
                const img = element.shadowRoot.querySelector(
                    '[data-element-id="img"]'
                );
                expect(img.className).toBe(
                    'avonni-image avonni-image_float-left'
                );
                expect(img.style.minWidth).toBe('0px');
                expect(img.style.minHeight).toBe('0px');
                expect(img.style.maxWidth).toBe('0px');
                expect(img.style.maxHeight).toBe('0px');
            });
    });

    it('Image - Static Image - No Crop - Width - Height', () => {
        element.src = src;
        element.staticImages = true;
        element.height = 400;
        element.width = 400;

        return Promise.resolve()
            .then(() => {})
            .then(() => {
                const img = element.shadowRoot.querySelector(
                    '[data-element-id="img"]'
                );
                expect(img.style.minWidth).toBe('400px');
                expect(img.style.minHeight).toBe('400px');
                expect(img.style.maxWidth).toBe('400px');
                expect(img.style.maxHeight).toBe('400px');
            });
    });

    // Static Images - Cropped
    it('Image - Static Image - Crop 1x1 - Width - No Height', () => {
        element.src = src;
        element.staticImages = true;
        element.width = '400';
        element.cropSize = '1x1';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.style.maxWidth).toBe('400px');
            expect(img.style.maxHeight).toBe('400px');
            expect(img.style.minWidth).toBe('400px');
            expect(img.style.minHeight).toBe('400px');
            expect(img.style.maxWidth).toBe('400px');
        });
    });

    // thumbnail
    it('Image - Thumbnail', () => {
        element.src = src;
        element.thumbnail = true;

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.className).toContain('avonni-image_thumbnail');
        });
    });

    // width & height
    it('Image - Width & height numbers', () => {
        element.src = src;
        element.width = 120;
        element.height = 100;

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.width).toBe(120);
            expect(img.height).toBe(100);
        });
    });

    it('Image - Width & height strings', () => {
        element.src = src;
        element.width = '120';
        element.height = '100';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.width).toBe(120);
            expect(img.height).toBe(100);
        });
    });

    it('Image - % on width', () => {
        element.src = src;
        element.width = '50%';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.style.width).toBe('50%');
        });
    });

    it('Image - % on height', () => {
        element.src = src;
        element.height = '50%';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.style.height).toBe('50%');
        });
    });
});
