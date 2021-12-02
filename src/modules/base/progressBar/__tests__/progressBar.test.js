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
import ProgressBar from 'c/progressBar';

const REFERENCE_LINES = [
    {
        label: 'Reference 1',
        value: 34,
        variant: 'lightest',
        borderStyle: 'dashed'
    },
    {
        label: 'Reference 2',
        value: 78,
        variant: 'inverse'
    },
    {
        label: 'Reference 3',
        value: 18
    }
];

const SIZES = ['x-small', 'small', 'medium', 'large', 'full'];

let element;
describe('ProgressBar', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-progress-bar', {
            is: ProgressBar
        });
        document.body.appendChild(element);
    });

    it('Progress Bar: Default attributes', () => {
        expect(element.label).toBeUndefined();
        expect(element.showValue).toBeFalsy();
        expect(element.orientation).toBe('horizontal');
        expect(element.referenceLines).toMatchObject([]);
        expect(element.size).toBe('full');
        expect(element.textured).toBeFalsy();
        expect(element.theme).toBe('base');
        expect(element.thickness).toBe('medium');
        expect(element.value).toBe(0);
        expect(element.valueLabel).toBeUndefined();
        expect(element.valuePosition).toBe('top-right');
        expect(element.variant).toBe('base');
    });

    /* ----- ATTRIBUTES ----- */

    // label
    it('Progress Bar: label', () => {
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.avonni-progress-bar__label_font'
            );
            expect(label.textContent).toBe('A string label');
        });
    });

    // show-value
    it('Progress Bar: showValue = false', () => {
        element.showValue = false;

        return Promise.resolve().then(() => {
            const value = element.shadowRoot.querySelector(
                '.avonni-progress-bar__value_font'
            );
            expect(value).toBeFalsy();
        });
    });

    it('Progress Bar: showValue = true', () => {
        element.showValue = true;

        return Promise.resolve().then(() => {
            const value = element.shadowRoot.querySelector(
                '.avonni-progress-bar__value_font'
            );
            expect(value).toBeTruthy();
        });
    });

    // orientation
    // Depends on referenceLines
    it('Progress Bar: orientation = horizontal', () => {
        element.orientation = 'horizontal';
        element.referenceLines = REFERENCE_LINES;

        return Promise.resolve().then(() => {
            const outerWrapper = element.shadowRoot.querySelector(
                '.slds-progress-bar'
            );
            const innerWrapper = element.shadowRoot.querySelector(
                '.avonni-progress-bar__bar-value'
            );
            const primitives = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-reference-line"]'
            );

            expect(outerWrapper.classList).not.toContain(
                'slds-progress-bar_vertical'
            );
            expect(innerWrapper.style.width).toBe('0%');

            primitives.forEach((primitive) => {
                expect(primitive.orientation).toBe('horizontal');
            });
        });
    });

    it('Progress Bar: orientation = vertical', () => {
        element.orientation = 'vertical';
        element.referenceLines = REFERENCE_LINES;

        return Promise.resolve().then(() => {
            const outerWrapper = element.shadowRoot.querySelector(
                '.slds-progress-bar'
            );
            const innerWrapper = element.shadowRoot.querySelector(
                '.avonni-progress-bar__bar-value'
            );
            const primitives = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-reference-line"]'
            );

            expect(outerWrapper.classList).toContain(
                'slds-progress-bar_vertical'
            );
            expect(innerWrapper.style.height).toBe('0%');

            primitives.forEach((primitive) => {
                expect(primitive.orientation).toBe('vertical');
            });
        });
    });

    // reference-lines
    it('Progress Bar: referenceLines', () => {
        element.referenceLines = REFERENCE_LINES;

        return Promise.resolve().then(() => {
            const primitives = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-reference-line"]'
            );

            primitives.forEach((primitive, index) => {
                expect(primitive.label).toBe(REFERENCE_LINES[index].label);
                expect(primitive.value).toBe(REFERENCE_LINES[index].value);
                expect(primitive.variant).toBe(
                    REFERENCE_LINES[index].variant || 'default'
                );
                expect(primitive.borderStyle).toBe(
                    REFERENCE_LINES[index].borderStyle || 'dotted'
                );
            });
        });
    });

    // size
    // Depends on orientation
    it('Progress Bar: size = full, with horizontal orientation', () => {
        element.size = 'full';
        element.orientation = 'horizontal';

        return Promise.resolve().then(() => {
            SIZES.forEach((size) => {
                const wrapperVertical = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__vertical-bar_size-${size}`
                );
                const wrapperHorizontal = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__bar-horizontal_size-${size}`
                );
                const innerWrapperVertical = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__vertical-bar_size-${size}`
                );

                if (size !== 'full') {
                    expect(wrapperVertical).toBeFalsy();
                    expect(wrapperHorizontal).toBeFalsy();
                    expect(innerWrapperVertical).toBeFalsy();
                }
            });
        });
    });

    it('Progress Bar: size = full, with vertical orientation', () => {
        element.size = 'full';
        element.orientation = 'vertical';

        return Promise.resolve().then(() => {
            SIZES.forEach((size) => {
                const wrapperVertical = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__vertical-bar_size-${size}`
                );
                const wrapperHorizontal = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__bar-horizontal_size-${size}`
                );
                const innerWrapperVertical = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__vertical-bar_size-${size}`
                );

                if (size === 'full') {
                    expect(wrapperVertical).toBeTruthy();
                } else {
                    expect(wrapperVertical).toBeFalsy();
                    expect(wrapperHorizontal).toBeFalsy();
                    expect(innerWrapperVertical).toBeFalsy();
                }
            });
        });
    });

    it('Progress Bar: size = x-small, with horizontal orientation', () => {
        element.size = 'x-small';
        element.orientation = 'horizontal';

        return Promise.resolve().then(() => {
            SIZES.forEach((size) => {
                const wrapperVertical = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__vertical-bar_size-${size}`
                );
                const wrapperHorizontal = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__bar-horizontal_size-${size}`
                );
                const innerWrapperVertical = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__vertical-bar_size-${size}`
                );

                if (size === 'x-small') {
                    expect(wrapperVertical).toBeFalsy();
                    expect(wrapperHorizontal).toBeTruthy();
                    expect(innerWrapperVertical).toBeFalsy();
                } else {
                    expect(wrapperVertical).toBeFalsy();
                    expect(wrapperHorizontal).toBeFalsy();
                    expect(innerWrapperVertical).toBeFalsy();
                }
            });
        });
    });

    it('Progress Bar: size = x-small, with vertical orientation', () => {
        element.size = 'x-small';
        element.orientation = 'vertical';

        return Promise.resolve().then(() => {
            SIZES.forEach((size) => {
                const wrapperVertical = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__vertical-bar_size-${size}`
                );
                const wrapperHorizontal = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__bar-horizontal_size-${size}`
                );
                const innerWrapperVertical = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__vertical-bar_size-${size}`
                );

                if (size === 'x-small') {
                    expect(wrapperVertical).toBeTruthy();
                    expect(wrapperHorizontal).toBeFalsy();
                    expect(innerWrapperVertical).toBeTruthy();
                } else {
                    expect(wrapperVertical).toBeFalsy();
                    expect(wrapperHorizontal).toBeFalsy();
                    expect(innerWrapperVertical).toBeFalsy();
                }
            });
        });
    });

    it('Progress Bar: size = small, with horizontal orientation', () => {
        element.size = 'small';
        element.orientation = 'horizontal';

        return Promise.resolve().then(() => {
            SIZES.forEach((size) => {
                const wrapperVertical = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__vertical-bar_size-${size}`
                );
                const wrapperHorizontal = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__bar-horizontal_size-${size}`
                );
                const innerWrapperVertical = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__vertical-bar_size-${size}`
                );

                if (size === 'small') {
                    expect(wrapperVertical).toBeFalsy();
                    expect(wrapperHorizontal).toBeTruthy();
                    expect(innerWrapperVertical).toBeFalsy();
                } else {
                    expect(wrapperVertical).toBeFalsy();
                    expect(wrapperHorizontal).toBeFalsy();
                    expect(innerWrapperVertical).toBeFalsy();
                }
            });
        });
    });

    it('Progress Bar: size = small, with vertical orientation', () => {
        element.size = 'small';
        element.orientation = 'vertical';

        return Promise.resolve().then(() => {
            SIZES.forEach((size) => {
                const wrapperVertical = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__vertical-bar_size-${size}`
                );
                const wrapperHorizontal = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__bar-horizontal_size-${size}`
                );
                const innerWrapperVertical = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__vertical-bar_size-${size}`
                );

                if (size === 'small') {
                    expect(wrapperVertical).toBeTruthy();
                    expect(wrapperHorizontal).toBeFalsy();
                    expect(innerWrapperVertical).toBeTruthy();
                } else {
                    expect(wrapperVertical).toBeFalsy();
                    expect(wrapperHorizontal).toBeFalsy();
                    expect(innerWrapperVertical).toBeFalsy();
                }
            });
        });
    });

    it('Progress Bar: size = medium, with horizontal orientation', () => {
        element.size = 'medium';
        element.orientation = 'horizontal';

        return Promise.resolve().then(() => {
            SIZES.forEach((size) => {
                const wrapperVertical = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__vertical-bar_size-${size}`
                );
                const wrapperHorizontal = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__bar-horizontal_size-${size}`
                );
                const innerWrapperVertical = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__vertical-bar_size-${size}`
                );

                if (size === 'medium') {
                    expect(wrapperVertical).toBeFalsy();
                    expect(wrapperHorizontal).toBeTruthy();
                    expect(innerWrapperVertical).toBeFalsy();
                } else {
                    expect(wrapperVertical).toBeFalsy();
                    expect(wrapperHorizontal).toBeFalsy();
                    expect(innerWrapperVertical).toBeFalsy();
                }
            });
        });
    });

    it('Progress Bar: size = medium, with vertical orientation', () => {
        element.size = 'medium';
        element.orientation = 'vertical';

        return Promise.resolve().then(() => {
            SIZES.forEach((size) => {
                const wrapperVertical = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__vertical-bar_size-${size}`
                );
                const wrapperHorizontal = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__bar-horizontal_size-${size}`
                );
                const innerWrapperVertical = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__vertical-bar_size-${size}`
                );

                if (size === 'medium') {
                    expect(wrapperVertical).toBeTruthy();
                    expect(wrapperHorizontal).toBeFalsy();
                    expect(innerWrapperVertical).toBeTruthy();
                } else {
                    expect(wrapperVertical).toBeFalsy();
                    expect(wrapperHorizontal).toBeFalsy();
                    expect(innerWrapperVertical).toBeFalsy();
                }
            });
        });
    });

    it('Progress Bar: size = large, with horizontal orientation', () => {
        element.size = 'large';
        element.orientation = 'horizontal';

        return Promise.resolve().then(() => {
            SIZES.forEach((size) => {
                const wrapperVertical = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__vertical-bar_size-${size}`
                );
                const wrapperHorizontal = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__bar-horizontal_size-${size}`
                );
                const innerWrapperVertical = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__vertical-bar_size-${size}`
                );

                if (size === 'large') {
                    expect(wrapperVertical).toBeFalsy();
                    expect(wrapperHorizontal).toBeTruthy();
                    expect(innerWrapperVertical).toBeFalsy();
                } else {
                    expect(wrapperVertical).toBeFalsy();
                    expect(wrapperHorizontal).toBeFalsy();
                    expect(innerWrapperVertical).toBeFalsy();
                }
            });
        });
    });

    it('Progress Bar: size = large, with vertical orientation', () => {
        element.size = 'large';
        element.orientation = 'vertical';

        return Promise.resolve().then(() => {
            SIZES.forEach((size) => {
                const wrapperVertical = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__vertical-bar_size-${size}`
                );
                const wrapperHorizontal = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__bar-horizontal_size-${size}`
                );
                const innerWrapperVertical = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__vertical-bar_size-${size}`
                );

                if (size === 'large') {
                    expect(wrapperVertical).toBeTruthy();
                    expect(wrapperHorizontal).toBeFalsy();
                    expect(innerWrapperVertical).toBeTruthy();
                } else {
                    expect(wrapperVertical).toBeFalsy();
                    expect(wrapperHorizontal).toBeFalsy();
                    expect(innerWrapperVertical).toBeFalsy();
                }
            });
        });
    });

    // textured
    it('Progress Bar: textured = false', () => {
        element.textured = false;

        return Promise.resolve().then(() => {
            const innerWrapper = element.shadowRoot.querySelector(
                '.avonni-progress-bar__bar-value'
            );
            expect(innerWrapper.classList).not.toContain(
                'slds-theme_alert-texture'
            );
        });
    });

    it('Progress Bar: textured = true', () => {
        element.textured = true;

        return Promise.resolve().then(() => {
            const innerWrapper = element.shadowRoot.querySelector(
                '.avonni-progress-bar__bar-value'
            );
            expect(innerWrapper.classList).toContain(
                'slds-theme_alert-texture'
            );
        });
    });

    // theme
    it('Progress Bar: theme = base', () => {
        element.theme = 'base';

        return Promise.resolve().then(() => {
            const innerWrapper = element.shadowRoot.querySelector(
                '.avonni-progress-bar__bar-value'
            );
            expect(innerWrapper.classList).toContain(
                'avonni-progress-bar__bar_theme-base'
            );
            expect(innerWrapper.classList).not.toContain(
                'avonni-progress-bar__bar_theme-success'
            );
            expect(innerWrapper.classList).not.toContain('avonni-progress-bar__bar_theme-inverse');
            expect(innerWrapper.classList).not.toContain(
                'avonni-progress-bar__bar_theme-alt-inverse'
            );
            expect(innerWrapper.classList).not.toContain('avonni-progress-bar__bar_theme-warning');
            expect(innerWrapper.classList).not.toContain('avonni-progress-bar__bar_theme-info');
            expect(innerWrapper.classList).not.toContain('avonni-progress-bar__bar_theme-error');
            expect(innerWrapper.classList).not.toContain('avonni-progress-bar__bar_theme-offline');
        });
    });

    it('Progress Bar: theme = success', () => {
        element.theme = 'success';

        return Promise.resolve().then(() => {
            const innerWrapper = element.shadowRoot.querySelector(
                '.avonni-progress-bar__bar-value'
            );
            expect(innerWrapper.classList).toContain(
                'avonni-progress-bar__bar_theme-success'
            );
            expect(innerWrapper.classList).not.toContain('avonni-progress-bar__bar_theme-inverse');
            expect(innerWrapper.classList).not.toContain(
                'avonni-progress-bar__bar_theme-alt-inverse'
            );
            expect(innerWrapper.classList).not.toContain('avonni-progress-bar__bar_theme-warning');
            expect(innerWrapper.classList).not.toContain('avonni-progress-bar__bar_theme-info');
            expect(innerWrapper.classList).not.toContain('avonni-progress-bar__bar_theme-error');
            expect(innerWrapper.classList).not.toContain('avonni-progress-bar__bar_theme-offline');
        });
    });

    it('Progress Bar: theme = inverse', () => {
        element.theme = 'inverse';

        return Promise.resolve().then(() => {
            const innerWrapper = element.shadowRoot.querySelector(
                '.avonni-progress-bar__bar-value'
            );
            expect(innerWrapper.classList).not.toContain(
                'avonni-progress-bar__bar_theme-success'
            );
            expect(innerWrapper.classList).toContain('avonni-progress-bar__bar_theme-inverse');
            expect(innerWrapper.classList).not.toContain(
                'avonni-progress-bar__bar_theme-alt-inverse'
            );
            expect(innerWrapper.classList).not.toContain('avonni-progress-bar__bar_theme-warning');
            expect(innerWrapper.classList).not.toContain('avonni-progress-bar__bar_theme-info');
            expect(innerWrapper.classList).not.toContain('avonni-progress-bar__bar_theme-error');
            expect(innerWrapper.classList).not.toContain('avonni-progress-bar__bar_theme-offline');
        });
    });

    it('Progress Bar: theme = alt-inverse', () => {
        element.theme = 'alt-inverse';

        return Promise.resolve().then(() => {
            const innerWrapper = element.shadowRoot.querySelector(
                '.avonni-progress-bar__bar-value'
            );
            expect(innerWrapper.classList).not.toContain(
                'avonni-progress-bar__bar_theme-success'
            );
            expect(innerWrapper.classList).not.toContain('avonni-progress-bar__bar_theme-inverse');
            expect(innerWrapper.classList).toContain('avonni-progress-bar__bar_theme-alt-inverse');
            expect(innerWrapper.classList).not.toContain('avonni-progress-bar__bar_theme-warning');
            expect(innerWrapper.classList).not.toContain('avonni-progress-bar__bar_theme-info');
            expect(innerWrapper.classList).not.toContain('avonni-progress-bar__bar_theme-error');
            expect(innerWrapper.classList).not.toContain('avonni-progress-bar__bar_theme-offline');
        });
    });

    it('Progress Bar: theme = warning', () => {
        element.theme = 'warning';

        return Promise.resolve().then(() => {
            const innerWrapper = element.shadowRoot.querySelector(
                '.avonni-progress-bar__bar-value'
            );
            expect(innerWrapper.classList).not.toContain(
                'avonni-progress-bar__bar_theme-success'
            );
            expect(innerWrapper.classList).not.toContain('avonni-progress-bar__bar_theme-inverse');
            expect(innerWrapper.classList).not.toContain(
                'avonni-progress-bar__bar_theme-alt-inverse'
            );
            expect(innerWrapper.classList).toContain('avonni-progress-bar__bar_theme-warning');
            expect(innerWrapper.classList).not.toContain('avonni-progress-bar__bar_theme-info');
            expect(innerWrapper.classList).not.toContain('avonni-progress-bar__bar_theme-error');
            expect(innerWrapper.classList).not.toContain('avonni-progress-bar__bar_theme-offline');
        });
    });

    it('Progress Bar: theme = info', () => {
        element.theme = 'info';

        return Promise.resolve().then(() => {
            const innerWrapper = element.shadowRoot.querySelector(
                '.avonni-progress-bar__bar-value'
            );
            expect(innerWrapper.classList).not.toContain(
                'avonni-progress-bar__bar_theme-success'
            );
            expect(innerWrapper.classList).not.toContain('avonni-progress-bar__bar_theme-inverse');
            expect(innerWrapper.classList).not.toContain(
                'avonni-progress-bar__bar_theme-alt-inverse'
            );
            expect(innerWrapper.classList).not.toContain('avonni-progress-bar__bar_theme-warning');
            expect(innerWrapper.classList).toContain('avonni-progress-bar__bar_theme-info');
            expect(innerWrapper.classList).not.toContain('avonni-progress-bar__bar_theme-error');
            expect(innerWrapper.classList).not.toContain('avonni-progress-bar__bar_theme-offline');
        });
    });

    it('Progress Bar: theme = error', () => {
        element.theme = 'error';

        return Promise.resolve().then(() => {
            const innerWrapper = element.shadowRoot.querySelector(
                '.avonni-progress-bar__bar-value'
            );
            expect(innerWrapper.classList).not.toContain(
                'avonni-progress-bar__bar_theme-success'
            );
            expect(innerWrapper.classList).not.toContain('avonni-progress-bar__bar_theme-inverse');
            expect(innerWrapper.classList).not.toContain(
                'avonni-progress-bar__bar_theme-alt-inverse'
            );
            expect(innerWrapper.classList).not.toContain('avonni-progress-bar__bar_theme-warning');
            expect(innerWrapper.classList).not.toContain('avonni-progress-bar__bar_theme-info');
            expect(innerWrapper.classList).toContain('avonni-progress-bar__bar_theme-error');
            expect(innerWrapper.classList).not.toContain('avonni-progress-bar__bar_theme-offline');
        });
    });

    it('Progress Bar: theme = offline', () => {
        element.theme = 'offline';

        return Promise.resolve().then(() => {
            const innerWrapper = element.shadowRoot.querySelector(
                '.avonni-progress-bar__bar-value'
            );
            expect(innerWrapper.classList).not.toContain(
                'avonni-progress-bar__bar_theme-success'
            );
            expect(innerWrapper.classList).not.toContain('avonni-progress-bar__bar_theme-inverse');
            expect(innerWrapper.classList).not.toContain(
                'avonni-progress-bar__bar_theme-alt-inverse'
            );
            expect(innerWrapper.classList).not.toContain('avonni-progress-bar__bar_theme-warning');
            expect(innerWrapper.classList).not.toContain('avonni-progress-bar__bar_theme-info');
            expect(innerWrapper.classList).not.toContain('avonni-progress-bar__bar_theme-error');
            expect(innerWrapper.classList).toContain('avonni-progress-bar__bar_theme-offline');
        });
    });

    // thickness
    // Depends on referenceLines
    it('Progress Bar: thickness = medium', () => {
        element.thickness = 'medium';
        element.referenceLines = REFERENCE_LINES;

        return Promise.resolve().then(() => {
            const outerWrapper = element.shadowRoot.querySelector(
                '.slds-progress-bar'
            );
            const primitives = element.querySelectorAll(
                '[data-element-id="avonni-primitive-reference-line"]-line'
            );

            expect(outerWrapper.classList).not.toContain(
                'slds-progress-bar_x-small'
            );
            expect(outerWrapper.classList).not.toContain(
                'slds-progress-bar_small'
            );
            expect(outerWrapper.classList).not.toContain(
                'slds-progress-bar_large'
            );
            primitives.forEach((primitive) => {
                expect(primitive.thickness).toBe('medium');
            });
        });
    });

    it('Progress Bar: thickness = x-small', () => {
        element.thickness = 'x-small';
        element.referenceLines = REFERENCE_LINES;

        return Promise.resolve().then(() => {
            const outerWrapper = element.shadowRoot.querySelector(
                '.slds-progress-bar'
            );
            const primitives = element.querySelectorAll(
                '[data-element-id="avonni-primitive-reference-line"]-line'
            );

            expect(outerWrapper.classList).toContain(
                'slds-progress-bar_x-small'
            );
            expect(outerWrapper.classList).not.toContain(
                'slds-progress-bar_small'
            );
            expect(outerWrapper.classList).not.toContain(
                'slds-progress-bar_large'
            );
            primitives.forEach((primitive) => {
                expect(primitive.thickness).toBe('x-small');
            });
        });
    });

    it('Progress Bar: thickness = small', () => {
        element.thickness = 'small';
        element.referenceLines = REFERENCE_LINES;

        return Promise.resolve().then(() => {
            const outerWrapper = element.shadowRoot.querySelector(
                '.slds-progress-bar'
            );
            const primitives = element.querySelectorAll(
                '[data-element-id="avonni-primitive-reference-line"]-line'
            );

            expect(outerWrapper.classList).not.toContain(
                'slds-progress-bar_x-small'
            );
            expect(outerWrapper.classList).toContain('slds-progress-bar_small');
            expect(outerWrapper.classList).not.toContain(
                'slds-progress-bar_large'
            );
            primitives.forEach((primitive) => {
                expect(primitive.thickness).toBe('small');
            });
        });
    });

    it('Progress Bar: thickness = large', () => {
        element.thickness = 'large';
        element.referenceLines = REFERENCE_LINES;

        return Promise.resolve().then(() => {
            const outerWrapper = element.shadowRoot.querySelector(
                '.slds-progress-bar'
            );
            const primitives = element.querySelectorAll(
                '[data-element-id="avonni-primitive-reference-line"]-line'
            );

            expect(outerWrapper.classList).not.toContain(
                'slds-progress-bar_x-small'
            );
            expect(outerWrapper.classList).not.toContain(
                'slds-progress-bar_small'
            );
            expect(outerWrapper.classList).toContain('slds-progress-bar_large');
            primitives.forEach((primitive) => {
                expect(primitive.thickness).toBe('large');
            });
        });
    });

    // value
    // Depends on showValue
    it('Progress Bar: value', () => {
        element.value = 56;
        element.showValue = true;

        return Promise.resolve().then(() => {
            const value = element.shadowRoot.querySelector(
                '.avonni-progress-bar__value_font'
            );
            const assistiveText = element.shadowRoot.querySelector(
                '.slds-assistive-text'
            );
            const innerWrapper = element.shadowRoot.querySelector(
                '.avonni-progress-bar__bar-value'
            );

            expect(value.textContent.trim()).toBe('56%');
            expect(assistiveText.textContent).toBe('Progress: 56%');
            expect(innerWrapper.style.width).toBe('56%');
        });
    });

    it('Progress Bar: value > 100', () => {
        element.value = 156;
        element.showValue = true;

        return Promise.resolve().then(() => {
            const value = element.shadowRoot.querySelector(
                '.avonni-progress-bar__value_font'
            );
            const assistiveText = element.shadowRoot.querySelector(
                '.slds-assistive-text'
            );
            const innerWrapper = element.shadowRoot.querySelector(
                '.avonni-progress-bar__bar-value'
            );

            expect(value.textContent.trim()).toBe('100%');
            expect(assistiveText.textContent).toBe('Progress: 100%');
            expect(innerWrapper.style.width).toBe('100%');
        });
    });

    it('Progress Bar: value NaN', () => {
        element.value = 'a';
        element.showValue = true;

        return Promise.resolve().then(() => {
            const value = element.shadowRoot.querySelector(
                '.avonni-progress-bar__value_font'
            );
            const assistiveText = element.shadowRoot.querySelector(
                '.slds-assistive-text'
            );
            const innerWrapper = element.shadowRoot.querySelector(
                '.avonni-progress-bar__bar-value'
            );

            expect(value.textContent.trim()).toBe('0%');
            expect(assistiveText.textContent).toBe('Progress: 0%');
            expect(innerWrapper.style.width).toBe('0%');
        });
    });

    // value-label
    // Depends on showValue
    it('Progress Bar: valueLabel', () => {
        element.valueLabel = 'A string label';
        element.showValue = true;

        return Promise.resolve().then(() => {
            const value = element.shadowRoot.querySelector(
                '.avonni-progress-bar__value_font'
            );
            expect(value.textContent.trim()).toBe('0% A string label');
        });
    });

    // value-position
    // Depends on showValue
    it('Progress Bar: valuePosition = top-right', () => {
        element.showValue = true;
        element.valuePosition = 'top-right';

        return Promise.resolve().then(() => {
            const left = element.shadowRoot.querySelector(
                '[data-position-left]'
            );
            const topLeft = element.shadowRoot.querySelector(
                '[data-position-top-left]'
            );
            const topRight = element.shadowRoot.querySelector(
                '[data-position-top-right]'
            );
            const bottomRight = element.shadowRoot.querySelector(
                '[data-position-bottom-right]'
            );
            const bottomLeft = element.shadowRoot.querySelector(
                '[data-position-bottom-left]'
            );
            const right = element.shadowRoot.querySelector(
                '[data-position-right]'
            );

            expect(left).toBeFalsy();
            expect(topLeft).toBeFalsy();
            expect(topRight).toBeTruthy();
            expect(bottomRight).toBeFalsy();
            expect(bottomLeft).toBeFalsy();
            expect(right).toBeFalsy();
        });
    });

    it('Progress Bar: valuePosition = left', () => {
        element.showValue = true;
        element.valuePosition = 'left';

        return Promise.resolve().then(() => {
            const left = element.shadowRoot.querySelector(
                '[data-position-left]'
            );
            const topLeft = element.shadowRoot.querySelector(
                '[data-position-top-left]'
            );
            const topRight = element.shadowRoot.querySelector(
                '[data-position-top-right]'
            );
            const bottomRight = element.shadowRoot.querySelector(
                '[data-position-bottom-right]'
            );
            const bottomLeft = element.shadowRoot.querySelector(
                '[data-position-bottom-left]'
            );
            const right = element.shadowRoot.querySelector(
                '[data-position-right]'
            );

            expect(left).toBeTruthy();
            expect(topLeft).toBeFalsy();
            expect(topRight).toBeFalsy();
            expect(bottomRight).toBeFalsy();
            expect(bottomLeft).toBeFalsy();
            expect(right).toBeFalsy();
        });
    });

    it('Progress Bar: valuePosition = top-left', () => {
        element.showValue = true;
        element.valuePosition = 'top-left';

        return Promise.resolve().then(() => {
            const left = element.shadowRoot.querySelector(
                '[data-position-left]'
            );
            const topLeft = element.shadowRoot.querySelector(
                '[data-position-top-left]'
            );
            const topRight = element.shadowRoot.querySelector(
                '[data-position-top-right]'
            );
            const bottomRight = element.shadowRoot.querySelector(
                '[data-position-bottom-right]'
            );
            const bottomLeft = element.shadowRoot.querySelector(
                '[data-position-bottom-left]'
            );
            const right = element.shadowRoot.querySelector(
                '[data-position-right]'
            );

            expect(left).toBeFalsy();
            expect(topLeft).toBeTruthy();
            expect(topRight).toBeFalsy();
            expect(bottomRight).toBeFalsy();
            expect(bottomLeft).toBeFalsy();
            expect(right).toBeFalsy();
        });
    });

    it('Progress Bar: valuePosition = bottom-right', () => {
        element.showValue = true;
        element.valuePosition = 'bottom-right';

        return Promise.resolve().then(() => {
            const left = element.shadowRoot.querySelector(
                '[data-position-left]'
            );
            const topLeft = element.shadowRoot.querySelector(
                '[data-position-top-left]'
            );
            const topRight = element.shadowRoot.querySelector(
                '[data-position-top-right]'
            );
            const bottomRight = element.shadowRoot.querySelector(
                '[data-position-bottom-right]'
            );
            const bottomLeft = element.shadowRoot.querySelector(
                '[data-position-bottom-left]'
            );
            const right = element.shadowRoot.querySelector(
                '[data-position-right]'
            );

            expect(left).toBeFalsy();
            expect(topLeft).toBeFalsy();
            expect(topRight).toBeFalsy();
            expect(bottomRight).toBeTruthy();
            expect(bottomLeft).toBeFalsy();
            expect(right).toBeFalsy();
        });
    });

    it('Progress Bar: valuePosition = bottom-left', () => {
        element.showValue = true;
        element.valuePosition = 'bottom-left';

        return Promise.resolve().then(() => {
            const left = element.shadowRoot.querySelector(
                '[data-position-left]'
            );
            const topLeft = element.shadowRoot.querySelector(
                '[data-position-top-left]'
            );
            const topRight = element.shadowRoot.querySelector(
                '[data-position-top-right]'
            );
            const bottomRight = element.shadowRoot.querySelector(
                '[data-position-bottom-right]'
            );
            const bottomLeft = element.shadowRoot.querySelector(
                '[data-position-bottom-left]'
            );
            const right = element.shadowRoot.querySelector(
                '[data-position-right]'
            );

            expect(left).toBeFalsy();
            expect(topLeft).toBeFalsy();
            expect(topRight).toBeFalsy();
            expect(bottomRight).toBeFalsy();
            expect(bottomLeft).toBeTruthy();
            expect(right).toBeFalsy();
        });
    });

    it('Progress Bar: valuePosition = right', () => {
        element.showValue = true;
        element.valuePosition = 'right';

        return Promise.resolve().then(() => {
            const left = element.shadowRoot.querySelector(
                '[data-position-left]'
            );
            const topLeft = element.shadowRoot.querySelector(
                '[data-position-top-left]'
            );
            const topRight = element.shadowRoot.querySelector(
                '[data-position-top-right]'
            );
            const bottomRight = element.shadowRoot.querySelector(
                '[data-position-bottom-right]'
            );
            const bottomLeft = element.shadowRoot.querySelector(
                '[data-position-bottom-left]'
            );
            const right = element.shadowRoot.querySelector(
                '[data-position-right]'
            );

            expect(left).toBeFalsy();
            expect(topLeft).toBeFalsy();
            expect(topRight).toBeFalsy();
            expect(bottomRight).toBeFalsy();
            expect(bottomLeft).toBeFalsy();
            expect(right).toBeTruthy();
        });
    });

    // variant
    it('Progress Bar: variant = base', () => {
        element.variant = 'base';

        return Promise.resolve().then(() => {
            const outerWrapper = element.shadowRoot.querySelector(
                '.slds-progress-bar'
            );
            expect(outerWrapper.classList).not.toContain(
                'slds-progress-bar_circular'
            );
        });
    });

    it('Progress Bar: variant = circular', () => {
        element.variant = 'circular';

        return Promise.resolve().then(() => {
            const outerWrapper = element.shadowRoot.querySelector(
                '.slds-progress-bar'
            );
            expect(outerWrapper.classList).toContain(
                'slds-progress-bar_circular'
            );
        });
    });
});
