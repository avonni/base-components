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

/*
 * THIS IS ONLY A SAMPLE TEST OF DEMO HOW TO RUN SAME TEST FROM WDIO
 * AS A KARMA TEST, SHOULD BE ALIGN TO ASYNC MODEL INSTEAD OF waitFor
 */
import { createElement } from 'lwc';
import Bounding from 'x/bounding';

function createHtml(props = {}) {
    const element = createElement('x-bounding', { is: Bounding });
    Object.assign(element, props);
    return element;
}

const FLIP_MAP = {
    bottom: 'bottom',
    'bottom-left': 'bottom-right',
    'bottom-right': 'bottom-left',
    left: 'right',
    'left-bottom': 'right-bottom',
    'left-top': 'right-bottom',
    right: 'left',
    'right-bottom': 'left-bottom',
    'right-top': 'left-top',
    top: 'top',
    'top-left': 'top-right',
    'top-right': 'top-left'
};

/**
 * Fixes @W-8235775.
 * Clean up the DOM, removing anything that isn't Jasmine related or script/css.
 * These tests are sensitive to the height of the DOM and fail if other stuff is too tall.
 *
 * TODO: Remove this cleanup when this can be done in a central location instead.
 */
function cleanDom() {
    const bodyNodes = Array.prototype.slice.call(
        document.querySelectorAll('body > *')
    );
    const nodesToRemove = bodyNodes.filter(
        (n) =>
            n.tagName.toLowerCase() !== 'script' &&
            n.tagName.toLowerCase() !== 'link' &&
            n.className.indexOf('jasmine') !== 0
    );
    for (let i = 0; i < nodesToRemove.length; i++) {
        document.body.removeChild(nodesToRemove[i]);
    }
}

function setup() {
    cleanDom();

    const element = createHtml();
    document.body.appendChild(element);
    return element;
}

function convertCasesToRtl(cases) {
    const result = {};
    Object.keys(cases).forEach((align) => {
        result[align] = {};
        Object.keys(cases[align]).forEach((pos) => {
            const nubbinAlign = cases[align][pos];
            result[align][pos] = FLIP_MAP[nubbinAlign];
        });
    });
    return result;
}

/**
 * Waits for the bubble to be visible and have the correct positioning. If the wait condition is
 * not satisfied within the global Jasmine timeout interval (5000ms by default) the consuming test
 * will fail.
 * @param {Node} element test root node
 * @param {String} expected expected nubbin class
 */
function waitForBubbleAlignment(element, expected) {
    return new Promise((resolve) => {
        function waitCondition() {
            const bubble = element.shadowRoot.querySelector(
                'lightning-primitive-bubble'
            );
            if (bubble && bubble.visible) {
                const classList = bubble.getAttribute('class').split(' ');
                const positioned = classList.indexOf(expected) > -1;
                if (positioned) {
                    resolve(positioned);
                }
            }

            window.requestAnimationFrame(waitCondition);
        }
        waitCondition();
    });
}

/**
 * The nubbin css class is used to determine the correctness of the bubble position.
 * @param {String} align alignment of the bubble
 * @param {String} pos name of target for the bubble
 * @param {String} nubbinAlign expected alignment for the nubbin
 */
async function verifyBubbleAlignment(align, pos, nubbinAlign) {
    // Set the bubble alignment for the test.
    const element = document.querySelector('x-bounding');
    const button = element.shadowRoot.querySelector(`[data-align=${align}]`);
    button.click();

    // Show the bubble at the position being tested.
    const show = element.shadowRoot.querySelector(`[data-pos=${pos}]`);
    show.click();

    const expected = `slds-nubbin_${nubbinAlign}`;
    const positioned = await waitForBubbleAlignment(element, expected);
    expect(positioned).toBeTruthy();
}

/**
 * Dynamically creates test cases for all the combinations of alignments and positions specified in
 * the given map.
 * @param {Object} cases alignments with positions and their expected outcomes to test
 */
function executeCases(cases) {
    Object.keys(cases).forEach((align) => {
        Object.keys(cases[align]).forEach((pos) => {
            const nubbinAlign = cases[align][pos];
            it(`should have bubble with nubbin alignment of ${nubbinAlign} relative to the ${pos} element when ${align} alignment is used`, async () => {
                await verifyBubbleAlignment(align, pos, nubbinAlign);
            });
        });
    });
}

/*
 * THIS IS ONLY A SAMPLE TEST OF DEMO HOW TO RUN SAME TEST FROM WDIO
 * AS A KARMA TEST, SHOULD BE ALIGN TO ASYNC MODEL INSTEAD OF waitFor
 */
describe('Viewport Bounding', () => {
    // We can reuse the same page instance for the tests so we only need to run setup once.
    beforeAll(() => {
        setup();
    });
    afterAll(() => {
        const element = document.querySelector('x-bounding');
        document.body.removeChild(element);
    });

    // TODO: New cases will be added and some expected alignments will change when we add support
    // for left-top, right-top, left-bottom, right-bottom alignments.
    const cases = {
        Bottom: {
            leftTop: 'top-left',
            top: 'top',
            rightTop: 'top-right',
            left: 'top-left',
            center: 'top',
            right: 'top-right',
            leftBottom: 'bottom-left',
            bottom: 'bottom',
            rightBottom: 'bottom-right'
        },
        BottomLeft: {
            leftTop: 'top-left',
            top: 'top-left',
            rightTop: 'top-right',
            left: 'top-left',
            center: 'top-left',
            right: 'top-right',
            leftBottom: 'bottom-left',
            bottom: 'bottom-left',
            rightBottom: 'bottom-right'
        },
        BottomRight: {
            leftTop: 'top-left',
            top: 'top-right',
            rightTop: 'top-right',
            left: 'top-left',
            center: 'top-right',
            right: 'top-right',
            leftBottom: 'bottom-left',
            bottom: 'bottom-right',
            rightBottom: 'bottom-right'
        },
        Left: {
            leftTop: 'top-left', // left-top
            top: 'top-right', // right-top
            rightTop: 'top-right', // right-top
            left: 'left',
            center: 'right',
            right: 'right',
            leftBottom: 'bottom-left', // left-bottom
            bottom: 'bottom-right', // right-bottom
            rightBottom: 'bottom-right' // right-bottom
        },
        Right: {
            leftTop: 'top-left', // left-top
            top: 'top-left', // left-top
            rightTop: 'top-right', // right-top
            left: 'left',
            center: 'left',
            right: 'right',
            leftBottom: 'bottom-left', // left-bottom
            bottom: 'bottom-left', // left-bottom
            rightBottom: 'bottom-right' // right-bottom
        },
        Top: {
            leftTop: 'top-left',
            top: 'top',
            rightTop: 'top-right',
            left: 'bottom-left',
            center: 'bottom',
            right: 'bottom-right',
            leftBottom: 'bottom-left',
            bottom: 'bottom',
            rightBottom: 'bottom-right'
        },
        TopLeft: {
            leftTop: 'top-left',
            top: 'top-left',
            rightTop: 'top-right',
            left: 'bottom-left',
            center: 'bottom-left',
            right: 'bottom-right',
            leftBottom: 'bottom-left',
            bottom: 'bottom-left',
            rightBottom: 'bottom-right'
        },
        TopRight: {
            leftTop: 'top-left',
            top: 'top-right',
            rightTop: 'top-right',
            left: 'bottom-left',
            center: 'bottom-right',
            right: 'bottom-right',
            leftBottom: 'bottom-left',
            bottom: 'bottom-right',
            rightBottom: 'bottom-right'
        }
    };

    describe('LTR', () => {
        executeCases(cases);
    });

    describe('RTL', () => {
        beforeEach(() => {
            document.dir = 'rtl';
        });

        executeCases(convertCasesToRtl(cases));

        afterEach(() => {
            document.dir = 'ltr';
        });
    });
});

describe('Element Bounding', () => {
    // Same setup as viewport bounding but with element bounding enabled.
    beforeAll(() => {
        setup();
        const element = document.querySelector('x-bounding');
        element.shadowRoot.querySelector('[name=elementBound]').click();
    });

    afterAll(() => {
        const element = document.querySelector('x-bounding');
        document.body.removeChild(element);
    });

    describe('LTR', () => {
        const cases = {
            BottomLeft: {
                left: 'top-left',
                center: 'top-left',
                right: 'top-right'
            },
            BottomRight: {
                left: 'top-left',
                center: 'top-left',
                right: 'top-right'
            }
        };

        executeCases(cases);
    });

    describe('RTL', () => {
        beforeEach(() => {
            document.dir = 'rtl';
        });

        // RTL flips the positions of the left and right elements.
        const cases = {
            BottomLeft: {
                left: 'top-right',
                center: 'top-right',
                right: 'top-left'
            },
            BottomRight: {
                left: 'top-right',
                center: 'top-right',
                right: 'top-left'
            }
        };

        executeCases(cases);

        afterEach(() => {
            document.dir = 'ltr';
        });
    });
});
