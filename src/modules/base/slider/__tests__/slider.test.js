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
import Slider from '../slider';

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

let element;
describe('Slider', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        jest.clearAllMocks();
    });

    beforeEach(() => {
        jest.useFakeTimers();
        element = createElement('avonni-slider', {
            is: Slider
        });
        document.body.appendChild(element);
    });

    it('Default attributes', () => {
        expect(element.disabled).toEqual(false);
        expect(element.disableSwap).toEqual(false);
        expect(element.min).toEqual(0);
        expect(element.minimumDistance).toEqual(0);
        expect(element.max).toEqual(100);
        expect(element.label).toBeUndefined();
        expect(element.pin).toEqual(false);
        expect(element.removeTrack).toEqual(false);
        expect(element.showTickMarks).toEqual(false);
        expect(element.size).toEqual('full');
        expect(element.step).toEqual(1);
        expect(element.type).toEqual('horizontal');
        expect(element.tickMarkStyle).toEqual('inner-tick');
        expect(element.variant).toEqual('standard');
        expect(element.unit).toEqual('decimal');
        expect(element.unitAttributes).toEqual({});
        expect(element.value).toEqual(50);
    });

    /* ----- ATTRIBUTES ----- */

    // disabled
    it('disabled = false', () => {
        element.disabled = false;

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll(
                '[data-group-name="input"]'
            );
            inputs.forEach((input) => {
                expect(input.disabled).toBeFalsy();
                expect(
                    element.shadowRoot.querySelector(
                        '[data-element-id="progress-bar"]'
                    ).classList
                ).not.toContain('avonni-range__progress_disabled');
            });
        });
    });

    it('disabled = true', () => {
        element.disabled = true;

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll(
                '[data-group-name="input"]'
            );
            inputs.forEach((input) => {
                expect(input.disabled).toBeTruthy();
                expect(
                    element.shadowRoot.querySelector(
                        '[data-element-id="progress-bar"]'
                    ).classList
                ).toContain('avonni-range__progress_disabled');
            });
        });
    });

    // disabled
    it('disableSwap = false', () => {
        element.disableSwap = false;
        element.min = 0;
        element.max = 10;
        element.value = [2, 5];

        return Promise.resolve()
            .then(() => {
                const firstInput = element.shadowRoot.querySelector(
                    '[data-group-name="input"][data-index="0"]'
                );
                firstInput.value = 8;
                firstInput.dispatchEvent(new CustomEvent('input'));
            })
            .then(() => {
                expect(element.value).toEqual([5, 8]);
            });
    });

    it('disableSwap = true', () => {
        element.disableSwap = true;
        element.min = 0;
        element.max = 10;
        element.value = [2, 5];

        return Promise.resolve()
            .then(() => {
                const firstInput = element.shadowRoot.querySelector(
                    '[data-group-name="input"][data-index="0"]'
                );
                firstInput.value = 8;
                firstInput.dispatchEvent(new CustomEvent('input'));
            })
            .then(() => {
                expect(element.value).toEqual([5, 5]);
            });
    });

    //min
    it('min = 10', () => {
        element.disableSwap = false;
        element.min = 10;
        element.value = 5;

        return Promise.resolve().then(() => {
            expect(element.min).toEqual(10);
            expect(element.value).toEqual(10);
        });
    });

    //minimumDistance
    it('minimumDistance = 0', () => {
        element.minimumDistance = 0;
        element.disableSwap = true;
        element.min = 0;
        element.max = 10;
        element.value = [2, 5];

        return Promise.resolve()
            .then(() => {
                expect(element.minimumDistance).toEqual(0);
                const firstInput = element.shadowRoot.querySelector(
                    '[data-group-name="input"][data-index="0"]'
                );
                firstInput.value = 8;
                firstInput.dispatchEvent(new CustomEvent('input'));
            })
            .then(() => {
                expect(element.value).toEqual([5, 5]);
            });
    });

    it('minimumDistance = 1', () => {
        element.minimumDistance = 1;
        element.disableSwap = true;
        element.min = 0;
        element.max = 10;
        element.value = [2, 5];

        return Promise.resolve()
            .then(() => {
                expect(element.minimumDistance).toEqual(1);
                const firstInput = element.shadowRoot.querySelector(
                    '[data-group-name="input"][data-index="0"]'
                );
                firstInput.value = 8;
                firstInput.dispatchEvent(new CustomEvent('input'));
            })
            .then(() => {
                expect(element.value).toEqual([4, 5]);
            });
    });

    //max
    it('max = 10', () => {
        element.disableSwap = false;
        element.max = 10;
        element.value = 15;

        return Promise.resolve().then(() => {
            expect(element.max).toEqual(10);
            expect(element.value).toEqual(10);
        });
    });

    //label
    it('label = "test label"', () => {
        element.label = 'test label';

        return Promise.resolve().then(() => {
            expect(element.label).toEqual('test label');
            expect(
                element.shadowRoot.querySelector(
                    '[ data-element-id="span-label"]'
                ).textContent
            ).toEqual('test label');
        });
    });

    //pin
    it('pin = false', () => {
        element.pin = false;

        return Promise.resolve().then(() => {
            expect(element.pin).toEqual(false);
            expect(
                element.shadowRoot.querySelector(
                    '[data-group-name="bubble"][data-index="0"]'
                )
            ).toBeFalsy();
        });
    });

    it('pin = true', () => {
        element.pin = true;

        return Promise.resolve().then(() => {
            expect(element.pin).toEqual(true);
            expect(
                element.shadowRoot.querySelector(
                    '[data-group-name="bubble"][data-index="0"]'
                )
            ).toBeTruthy();
        });
    });

    //removeTrack
    it('removeTrack = false', () => {
        element.removeTrack = false;

        return Promise.resolve().then(() => {
            expect(element.removeTrack).toEqual(false);
            expect(
                element.shadowRoot.querySelector(
                    '[data-element-id="progress-bar"]'
                )
            ).toBeTruthy();
        });
    });

    it('removeTrack = true', () => {
        element.removeTrack = true;

        return Promise.resolve().then(() => {
            expect(element.removeTrack).toEqual(true);
            expect(
                element.shadowRoot.querySelector(
                    '[data-element-id="progress-bar"]'
                )
            ).toBeFalsy();
        });
    });

    // showTickMarks
    it('Range: showTickMarks = false', () => {
        element.showTickMarks = false;

        return Promise.resolve().then(() => {
            expect(
                element.shadowRoot.querySelector('[data-element-id="ruler"]')
            ).toBeFalsy();
        });
    });

    it('Range: showTickMarks = true', () => {
        element.showTickMarks = true;

        return Promise.resolve().then(() => {
            const ruler = element.shadowRoot.querySelector(
                '[data-element-id="ruler"]'
            );
            //TODO: ask Nawel why it seems the tests pass on all the rendered bools and sets them to true, even though they did nothing
            expect(ruler).toBeTruthy();
            expect(ruler.childElementCount).toEqual(3);
        });
    });

    // size
    it('size = full', () => {
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

    it('size = x-small', () => {
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

    it('size = small', () => {
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

    it('size = medium', () => {
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

    it('size = large', () => {
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
    it('step = 3', () => {
        element.step = 3;

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll(
                '[data-group-name="input"]'
            );
            inputs.forEach((input) => {
                expect(input.step).toEqual('3');
            });
        });
    });

    // unit
    it('unit = currency', () => {
        element.unit = 'currency';

        return Promise.resolve().then(() => {
            const formattedNumbers = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-formatted-number"]'
            );
            formattedNumbers.forEach((formattedNumber) => {
                expect(formattedNumber.formatStyle).toBe('currency');
            });
        });
    });

    it('unit = percent', () => {
        element.unit = 'percent';

        return Promise.resolve().then(() => {
            const formattedNumbers = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-formatted-number"]'
            );
            formattedNumbers.forEach((formattedNumber) => {
                expect(formattedNumber.formatStyle).toBe('percent');
            });
        });
    });

    it('unit = custom', () => {
        element.unit = 'custom';

        return Promise.resolve().then(() => {
            const formattedNumbers = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-formatted-number"]'
            );
            formattedNumbers.forEach((formattedNumber) => {
                expect(formattedNumber.formatStyle).toBe('decimal'); // because no custom labels were set, it ignores the unit
            });
        });
    });

    it('unit = custom (with custom labels)', () => {
        element.unit = 'custom';
        element.unitAttributes = {
            customLabels: MOCK_CUSTOM_LABELS
        };

        return Promise.resolve().then(() => {
            const formattedNumbers = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-formatted-number"]'
            );
            expect(formattedNumbers.length).toEqual(0);
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
                '[data-element-id^="lightning-formatted-number"]'
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
    it('Range: customLabels on horizontal component', () => {
        element.unit = 'custom';
        element.type = 'horizontal';
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

    it('Range: customLabels on vertical component', () => {
        element.unit = 'custom';
        element.type = 'vertical';
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

    it('Range: customLabels and tickMarkers (tick)', () => {
        element.unit = 'custom';
        element.type = 'horizontal';
        element.tickMarkStyle = 'tick';
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

            const ruler = element.shadowRoot.querySelector(
                '[data-element-id="ruler"]'
            );
            expect(ruler).toBeTruthy();
            expect(ruler.firstChild.tagName).toEqual('line');
            expect(ruler.childElementCount).toEqual(5);
        });
    });

    it('Range: customLabels and tickMarkers (dot)', () => {
        element.unit = 'custom';
        element.type = 'horizontal';
        element.tickMarkStyle = 'dot';
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

            const ruler = element.shadowRoot.querySelector(
                '[data-element-id="ruler"]'
            );
            expect(ruler).toBeTruthy();
            expect(ruler.firstChild.tagName).toEqual('circle');
            expect(ruler.childElementCount).toEqual(5);
        });
    });

    it('Range: customLabels and tickMarkers (inner-tick)', () => {
        element.unit = 'custom';
        element.type = 'horizontal';
        element.valueUpper = 25;
        element.valueLower = 75;
        element.tickMarkStyle = 'inner-tick';
        element.showTickMarks = true;
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

            const ruler = element.shadowRoot.querySelector(
                '[data-element-id="ruler"]'
            );
            expect(ruler).toBeTruthy();
            expect(ruler.firstChild.tagName).toEqual('rect');
            expect(ruler.childNodes[3].tagName).toEqual('line');
            expect(ruler.childElementCount).toEqual(103);
        });
    });
});
