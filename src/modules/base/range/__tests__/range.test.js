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
import { FieldConstraintApiWithProxyInput } from 'c/inputUtils';

import Range from 'c/range';

const MOCK_CUSTOM_LABELS = [
    {
        label: 'Custom 0',
        value: 0
    },
    {
        label: 'Custom 1',
        value: 1
    },
    {
        label: 'Custom 2',
        value: 2
    },
    {
        label: 'Custom 3',
        value: 3
    }
];

// Not tested because not used:
// Debounce on mousemove of 50ms
// messageWhenRangeOverflow
// messageWhenRangeUnderflow
// messageWhenStepMismatch
// messageWhenValueMissing
// messageWhenTooLong
// messageWhenBadInput
// messageWhenPatternMismatch
// messageWhenTypeMismatch

let element;
describe('Range', () => {
    afterEach(() => {
        jest.clearAllMocks();
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        jest.useFakeTimers();
        element = createElement('base-range', {
            is: Range
        });
        document.body.appendChild(element);
    });

    it('Range: default attributes', () => {
        expect(element.disabled).toBeFalsy();
        expect(element.label).toBeUndefined();
        expect(element.max).toBe(100);
        expect(element.messageWhenRangeOverflow).toBeUndefined();
        expect(element.messageWhenRangeUnderflow).toBeUndefined();
        expect(element.messageWhenStepMismatch).toBeUndefined();
        expect(element.messageWhenValueMissing).toBeUndefined();
        expect(element.messageWhenTooLong).toBeUndefined();
        expect(element.messageWhenBadInput).toBeUndefined();
        expect(element.messageWhenPatternMismatch).toBeUndefined();
        expect(element.messageWhenTypeMismatch).toBeUndefined();
        expect(element.min).toBe(0);
        expect(element.pin).toEqual(false);
        expect(element.showHatchMarks).toEqual(false);
        expect(element.size).toBe('full');
        expect(element.step).toBe(1);
        expect(element.unit).toBe('decimal');
        expect(element.unitAttributes).toMatchObject({});
        expect(element.type).toBe('horizontal');
        expect(parseInt(element.valueLower, 10)).toBe(0);
        expect(parseInt(element.valueUpper, 10)).toBe(0);
        expect(element.validity).toBeTruthy();
        expect(element.variant).toBe('standard');
    });

    /* ----- ATTRIBUTES ----- */

    // disabled
    it('Range: disabled = false', () => {
        element.disabled = false;

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll(
                '[data-element-id="input"]'
            );
            inputs.forEach((input) => {
                expect(input.disabled).toBeFalsy();
            });
        });
    });

    it('Range: disabled = true', () => {
        element.disabled = true;

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll(
                '[data-element-id="input"]'
            );
            inputs.forEach((input) => {
                expect(input.disabled).toBeTruthy();
            });
        });
    });

    // label
    it('Range: label', () => {
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '[data-element-id="label"]'
            );
            expect(label.textContent).toBe('A string label');
        });
    });

    // max
    it('Range: max', () => {
        element.max = 45;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="input-right"]'
            );
            const formattedNumber = element.shadowRoot.querySelector(
                '[data-element-id="lightning-formatted-number-max"]'
            );
            expect(formattedNumber.value).toBe(45);
            expect(input.max).toBe('45');
        });
    });

    // min
    it('Range: min', () => {
        element.min = 34;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="input-left"]'
            );
            const formattedNumber = element.shadowRoot.querySelector(
                '[data-element-id="lightning-formatted-number-min"]'
            );
            expect(formattedNumber.value).toBe(34);
            expect(input.min).toBe('34');
        });
    });

    // pin
    it('Range: pin = false', () => {
        element.pin = false;

        return Promise.resolve().then(() => {
            const bubbles = element.shadowRoot.querySelectorAll(
                '.avonni-range__bubble'
            );
            expect(bubbles).toHaveLength(0);
        });
    });

    it('Range: pin = true', () => {
        element.pin = true;

        return Promise.resolve().then(() => {
            const bubbles = element.shadowRoot.querySelectorAll(
                '.avonni-range__bubble'
            );
            expect(bubbles).toHaveLength(2);
        });
    });

    // showHatchMarks
    it('Range: showHatchMarks = false', () => {
        element.pin = false;

        return Promise.resolve().then(() => {
            expect(
                element.shadowRoot.querySelector('[data-element-id="ruler"]')
            ).toBeFalsy();
        });
    });

    it('Range: showHatchMarks = true', () => {
        element.pin = true;

        return Promise.resolve().then(() => {
            expect(
                element.shadowRoot.querySelector('[data-element-id="ruler"]')
            ).toBeFalsy();
        });
    });

    // size
    it('Range: size = full', () => {
        element.size = 'full';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            expect(wrapper.className).toBe(
                'avonni-range__container-horizontal-size_full'
            );
        });
    });

    it('Range: size = x-small', () => {
        element.size = 'x-small';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            expect(wrapper.classList).toContain(
                'avonni-range__container-horizontal-size_x-small'
            );
        });
    });

    it('Range: size = small', () => {
        element.size = 'small';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            expect(wrapper.classList).toContain(
                'avonni-range__container-horizontal-size_small'
            );
        });
    });

    it('Range: size = medium', () => {
        element.size = 'medium';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            expect(wrapper.classList).toContain(
                'avonni-range__container-horizontal-size_medium'
            );
        });
    });

    it('Range: size = large', () => {
        element.size = 'large';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            expect(wrapper.classList).toContain(
                'avonni-range__container-horizontal-size_large'
            );
        });
    });

    // step
    it('Range: step', () => {
        element.step = 3;

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll(
                '[data-element-id="input"]'
            );
            inputs.forEach((input) => {
                expect(input.step).toBe('3');
            });
        });
    });

    // unit
    it('Range: unit', () => {
        element.unit = 'currency';

        return Promise.resolve().then(() => {
            const formattedNumbers = element.shadowRoot.querySelectorAll(
                '[data-element-id="lightning-formatted-number"]'
            );
            formattedNumbers.forEach((formattedNumber) => {
                expect(formattedNumber.formatStyle).toBe('currency');
            });
        });
    });

    // unit-attributes
    it('Range: unitAttributes', () => {
        const unitAttributes = {
            currencyCode: 'CAD',
            currencyDisplayAs: 'name',
            maximumFractionDigits: 3,
            maximumSignificantDigits: 6,
            minimumFractionDigits: 2,
            minimumIntegerDigits: 4,
            minimumSignificantDigits: 1
        };
        element.unitAttributes = unitAttributes;

        return Promise.resolve().then(() => {
            const formattedNumbers = element.shadowRoot.querySelectorAll(
                '[data-element-id="lightning-formatted-number"]'
            );
            formattedNumbers.forEach((formattedNumber) => {
                expect(formattedNumber.currencyCode).toBe(
                    unitAttributes.currencyCode
                );
                expect(formattedNumber.currencyDisplayAs).toBe(
                    unitAttributes.currencyDisplayAs
                );
                expect(formattedNumber.maximumFractionDigits).toBe(
                    unitAttributes.maximumFractionDigits
                );
                expect(formattedNumber.maximumSignificantDigits).toBe(
                    unitAttributes.maximumSignificantDigits
                );
                expect(formattedNumber.minimumFractionDigits).toBe(
                    unitAttributes.minimumFractionDigits
                );
                expect(formattedNumber.minimumIntegerDigits).toBe(
                    unitAttributes.minimumIntegerDigits
                );
                expect(formattedNumber.minimumSignificantDigits).toBe(
                    unitAttributes.minimumSignificantDigits
                );
            });
        });
    });

    // unit-attributes ~ customLabels
    it('Range: customLabels', () => {
        element.unit = 'custom';
        element.unitAttributes = {
            customLabels: MOCK_CUSTOM_LABELS
        };

        return Promise.resolve().then(() => {
            const customLabels = element.shadowRoot.querySelectorAll(
                '[data-element-id="custom-label"]'
            );
            customLabels.forEach((customLabel, index) => {
                expect(customLabel.dataset.value).toEqual(`${index}`);
                expect(customLabel.textContent).toEqual(`Custom ${index}`);
            });
            expect(
                element.shadowRoot.querySelector('[data-element-id="ruler"]')
            ).toBeTruthy();
        });
    });

    // type
    // Depends on pin
    it('Range: type = horizontal', () => {
        element.type = 'horizontal';
        element.pin = true;

        return Promise.resolve().then(() => {
            const wrapper =
                element.shadowRoot.querySelector('.avonni-vertical');
            const verticalMaxLabel = element.shadowRoot.querySelector(
                '[data-element-id="vertical-max-unit-container"]'
            );
            const verticalMinLabel = element.shadowRoot.querySelector(
                '[data-element-id="vertical-min-unit-container"]'
            );
            const horizontalMinMaxLabels = element.shadowRoot.querySelector(
                '[data-element-id="horizontal-unit-container"]'
            );
            const bubbles = element.shadowRoot.querySelectorAll(
                '.avonni-range__bubble'
            );

            expect(wrapper).toBeFalsy();
            expect(verticalMaxLabel).toBeFalsy();
            expect(verticalMinLabel).toBeFalsy();
            expect(horizontalMinMaxLabels).toBeTruthy();
            expect(bubbles).toHaveLength(2);
        });
    });

    it('Range: type = vertical', () => {
        element.type = 'vertical';
        element.pin = true;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.avonni-range__vertical'
            );
            const verticalMaxLabel = element.shadowRoot.querySelector(
                '[data-element-id="vertical-max-unit-container"]'
            );
            const verticalMinLabel = element.shadowRoot.querySelector(
                '[data-element-id="vertical-min-unit-container"]'
            );
            const horizontalMinMaxLabels = element.shadowRoot.querySelector(
                '[data-element-id="horizontal-unit-container"]'
            );
            const bubbles = element.shadowRoot.querySelectorAll(
                '.avonni-range__bubble-vertical'
            );

            expect(wrapper).toBeTruthy();
            expect(verticalMaxLabel).toBeTruthy();
            expect(verticalMinLabel).toBeTruthy();
            expect(horizontalMinMaxLabels).toBeFalsy();
            expect(bubbles).toHaveLength(2);
        });
    });

    // value-lower
    // Depends on pin
    it('Range: valueLower', () => {
        element.valueLower = 34;
        element.pin = true;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="input-left"]'
            );
            const bubble = element.shadowRoot.querySelector(
                '[data-element-id="lightning-formatted-number-left"]'
            );
            expect(input.value).toBe('34');
            expect(bubble.value).toBe(34);
        });
    });

    // value-upper
    // Depends on pin
    it('Range: valueUpper', () => {
        element.valueUpper = 34;
        element.pin = true;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="input-right"]'
            );
            const bubble = element.shadowRoot.querySelector(
                '[data-element-id="lightning-formatted-number-right"]'
            );
            expect(input.value).toBe('34');
            expect(bubble.value).toBe(34);
        });
    });

    // variant
    // Depends on label
    it('Range: variant = standard', () => {
        element.variant = 'standard';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '[data-element-id="span-label"]'
            );
            expect(label.classList).not.toContain('slds-assistive-text');
            expect(label.classList).toContain('slds-slider-label__label');
        });
    });

    it('Range: variant = label-hidden', () => {
        element.variant = 'label-hidden';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '[data-element-id="span-label"]'
            );
            expect(label.classList).toContain('slds-assistive-text');
            expect(label.classList).not.toContain('slds-slider-label__label');
        });
    });

    // checkValidity
    it('Range: checkValidity method (true)', () => {
        return Promise.resolve().then(() => {
            expect(element.checkValidity()).toBeTruthy();
        });
    });

    it('Range: checkValidity method (false)', () => {
        element.valueUpper = 50;
        element.max = 5;
        element.min = 0;
        element.valueLower = -30;
        jest.spyOn(
            FieldConstraintApiWithProxyInput.prototype,
            'checkValidity'
        ).mockReturnValue(false);

        return Promise.resolve().then(() => {
            expect(element.checkValidity()).toBeFalsy();
        });
    });

    // reportValidity
    it('Range: reportValidity method (true)', () => {
        return Promise.resolve().then(() => {
            expect(element.reportValidity()).toBeTruthy();
        });
    });

    it('Range: reportValidity method', () => {
        element.valueUpper = 50;
        element.max = 5;
        element.min = 0;
        element.valueLower = -30;
        jest.spyOn(
            FieldConstraintApiWithProxyInput.prototype,
            'reportValidity'
        ).mockReturnValue(false);

        return Promise.resolve().then(() => {
            expect(element.reportValidity()).toBeFalsy();
        });
    });

    /* ----- EVENTS ----- */

    // change
    // Depends on valueLower and valueUpper
    it('Range: change event on left input', () => {
        const handler = jest.fn();
        element.addEventListener('change', handler);

        element.valueLower = 34;
        element.valueUpper = 48;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="input-left"]'
            );
            input.dispatchEvent(new CustomEvent('input'));

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.valueLower).toBe(34);
            expect(handler.mock.calls[0][0].detail.valueUpper).toBe(48);
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });

    it('Range: change event on right input', () => {
        const handler = jest.fn();
        element.addEventListener('change', handler);

        element.valueLower = 34;
        element.valueUpper = 48;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="input-right"]'
            );
            input.dispatchEvent(new CustomEvent('input'));

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.valueUpper).toBe(48);
            expect(handler.mock.calls[0][0].detail.valueLower).toBe(34);
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });

    it('Range: change event on left input going lower than left input', () => {
        const inputLeft = element.shadowRoot.querySelector(
            '[data-element-id="input-left"]'
        );
        const inputRight = element.shadowRoot.querySelector(
            '[data-element-id="input-right"]'
        );
        inputRight.value = 30;
        inputRight.dispatchEvent(new CustomEvent('input'));
        inputLeft.value = 20;
        inputLeft.dispatchEvent(new CustomEvent('input'));

        const handler = jest.fn();
        element.addEventListener('change', handler);
        inputRight.value = 10;
        inputRight.dispatchEvent(new CustomEvent('input'));

        return Promise.resolve().then(() => {
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.valueLower).toBe(20);
            expect(handler.mock.calls[0][0].detail.valueUpper).toBe(20);
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });

    //onmousemove
    it('Range: onmousemove close to left thumb node', () => {
        const inputRight = element.shadowRoot.querySelector(
            '[data-element-id="input-right"]'
        );
        const inputLeft = element.shadowRoot.querySelector(
            '[data-element-id="input-left"]'
        );
        inputRight.value = 20;
        jest.spyOn(inputLeft, 'clientWidth', 'get').mockReturnValue(100);
        let customEvent = new MouseEvent('mousemove', {
            offsetX: 0,
            offsetY: 0
        });
        customEvent.offsetX = 0;
        customEvent.offsetY = 0;

        element.shadowRoot.dispatchEvent(customEvent);

        return Promise.resolve().then(() => {
            expect(
                inputLeft.classList.contains('avonni-range__slider-left_above')
            ).toBe(true);
        });
    });

    it('Range: onmousemove close to right thumb node', () => {
        const inputRight = element.shadowRoot.querySelector(
            '[data-element-id="input-right"]'
        );
        const inputLeft = element.shadowRoot.querySelector(
            '[data-element-id="input-left"]'
        );
        inputRight.value = 20;
        jest.spyOn(inputLeft, 'clientWidth', 'get').mockReturnValue(100);
        let customEvent = new MouseEvent('mousemove', {
            offsetX: 0,
            offsetY: 0
        });
        customEvent.offsetX = 75;
        customEvent.offsetY = 0;

        element.shadowRoot.dispatchEvent(customEvent);

        return Promise.resolve().then(() => {
            expect(
                inputLeft.classList.contains('avonni-range__slider-left_above')
            ).toBe(false);
        });
    });

    //mousedown on input with pins
    it('Range: onmousedown to right input', () => {
        element.pin = true;

        return Promise.resolve()
            .then(() => {
                const inputRight = element.shadowRoot.querySelector(
                    '[data-element-id="input-right"]'
                );
                inputRight.dispatchEvent(new MouseEvent('mousedown'));
                expect(
                    element.shadowRoot
                        .querySelector('[data-element-id="right-bubble"]')
                        .classList.contains('avonni-range__bubble_visible')
                ).toBeTruthy();
                inputRight.dispatchEvent(new MouseEvent('mouseup'));
            })
            .then(() => {
                expect(
                    element.shadowRoot
                        .querySelector('[data-element-id="right-bubble"]')
                        .classList.contains('avonni-range__bubble_visible')
                ).toBeFalsy();
            });
    });

    it('Range: onmousedown to left input', () => {
        element.pin = true;

        return Promise.resolve()
            .then(() => {
                const inputLeft = element.shadowRoot.querySelector(
                    '[data-element-id="input-left"]'
                );
                inputLeft.dispatchEvent(new MouseEvent('mousedown'));
                expect(
                    element.shadowRoot
                        .querySelector('[data-element-id="left-bubble"]')
                        .classList.contains('avonni-range__bubble_visible')
                ).toBeTruthy();
                inputLeft.dispatchEvent(new MouseEvent('mouseup'));
            })
            .then(() => {
                expect(
                    element.shadowRoot
                        .querySelector('[data-element-id="left-bubble"]')
                        .classList.contains('avonni-range__bubble_visible')
                ).toBeFalsy();
            });
    });

    // setBubblePosition with pins
    it('Range: setBubblePosition() should place bubbles', () => {
        element.pin = true;

        return Promise.resolve()
            .then(() => {
                const inputRight = element.shadowRoot.querySelector(
                    '[data-element-id="input-right"]'
                );
                inputRight.value = 20;
                inputRight.dispatchEvent(new CustomEvent('input'));
                jest.advanceTimersToNextTimer();
            })
            .then(() => {
                expect(
                    element.shadowRoot.querySelector(
                        '[data-element-id="right-bubble"]'
                    ).style.left
                ).toEqual('calc(20% - 11.2px)');
                expect(
                    element.shadowRoot.querySelector(
                        '[data-element-id="left-bubble"]'
                    ).style.left
                ).toEqual('calc(0% - 8px)');
            });
    });
});
