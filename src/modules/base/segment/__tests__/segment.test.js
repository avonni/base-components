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
import Segment from 'c/segment';

// Not tested because depends on slot content
// disabled
// value

const VARIANTS = ['shade', 'success', 'warning', 'error'];

describe('Segment', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-segment', {
            is: Segment
        });

        expect(element.disabled).toBeFalsy();
        expect(element.value).toBeUndefined();
        expect(element.variant).toBe('shade');
    });

    /* ----- ATTRIBUTES ----- */

    // variant
    it('variant = shade', () => {
        const element = createElement('base-segment', {
            is: Segment
        });

        document.body.appendChild(element);

        element.variant = 'shade';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.avonni-segment-container'
            );

            VARIANTS.forEach((variant) => {
                if (variant === 'shade') {
                    expect(wrapper.classList).toContain(
                        `avonni-segment-${variant}`
                    );
                } else {
                    expect(wrapper.classList).not.toContain(
                        `avonni-segment-${variant}`
                    );
                }
            });
        });
    });

    it('variant = success', () => {
        const element = createElement('base-segment', {
            is: Segment
        });

        document.body.appendChild(element);

        element.variant = 'success';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.avonni-segment-container'
            );

            VARIANTS.forEach((variant) => {
                if (variant === 'success') {
                    expect(wrapper.classList).toContain(
                        `avonni-segment-${variant}`
                    );
                } else {
                    expect(wrapper.classList).not.toContain(
                        `avonni-segment-${variant}`
                    );
                }
            });
        });
    });

    it('variant = warning', () => {
        const element = createElement('base-segment', {
            is: Segment
        });

        document.body.appendChild(element);

        element.variant = 'warning';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.avonni-segment-container'
            );

            VARIANTS.forEach((variant) => {
                if (variant === 'warning') {
                    expect(wrapper.classList).toContain(
                        `avonni-segment-${variant}`
                    );
                } else {
                    expect(wrapper.classList).not.toContain(
                        `avonni-segment-${variant}`
                    );
                }
            });
        });
    });

    it('variant = error', () => {
        const element = createElement('base-segment', {
            is: Segment
        });

        document.body.appendChild(element);

        element.variant = 'error';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.avonni-segment-container'
            );

            VARIANTS.forEach((variant) => {
                if (variant === 'error') {
                    expect(wrapper.classList).toContain(
                        `avonni-segment-${variant}`
                    );
                } else {
                    expect(wrapper.classList).not.toContain(
                        `avonni-segment-${variant}`
                    );
                }
            });
        });
    });

    /* ----- EVENTS ----- */

    // change event
    it('change event', () => {
        const element = createElement('base-segment', {
            is: Segment
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('change', handler);

        const wrapper = element.shadowRoot.querySelector(
            '.avonni-segment-container'
        );
        wrapper.dispatchEvent(
            new CustomEvent('click', {
                detail: {
                    value: 'a-string-value'
                }
            })
        );

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
        expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
    });
});
