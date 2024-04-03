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

// Not tested:
// Tick Marks positions (tested visually in storybook)
// Custom Label positions (tested visually in storybook)
// AvonniResizeObserver callback function (tested visually in storybook)

let element;
describe('Slider', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        jest.restoreAllMocks();
        jest.clearAllTimers();
    });

    beforeEach(() => {
        jest.useFakeTimers();
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
            setTimeout(() => cb(), 0);
        });
        element = createElement('avonni-slider', {
            is: Slider
        });
        document.body.appendChild(element);
    });

    it('Default attributes', () => {
        expect(element.disabled).toEqual(false);
        expect(element.disableSwap).toEqual(false);
        expect(element.hideMinMaxValues).toEqual(false);
        expect(element.hideTrack).toEqual(false);
        expect(element.label).toBeUndefined();
        expect(element.max).toBe(100);
        expect(element.messageWhenRangeOverflow).toBeUndefined();
        expect(element.messageWhenRangeUnderflow).toBeUndefined();
        expect(element.messageWhenStepMismatch).toBeUndefined();
        expect(element.min).toEqual(0);
        expect(element.minimumDistance).toEqual(0);
        expect(element.showPin).toEqual(false);
        expect(element.showTickMarks).toEqual(false);
        expect(element.size).toEqual('responsive');
        expect(element.step).toEqual(1);
        expect(element.tickMarkStyle).toEqual('inner-tick');
        expect(element.type).toEqual('horizontal');
        expect(element.unit).toEqual('decimal');
        expect(element.unitAttributes).toEqual({});
        expect(element.validity).toEqual(true);
        expect(element.value).toEqual(50);
        expect(element.variant).toEqual('standard');
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
                        '[data-element-id="track"]'
                    ).classList
                ).not.toContain('avonni-slider__track_disabled');
                expect(
                    element.shadowRoot.querySelector(
                        '[data-group-name="input"]'
                    ).classList
                ).not.toContain('avonni-slider__slider_disabled');
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
                        '[data-element-id="track"]'
                    ).classList
                ).toContain('avonni-slider__track_disabled');
                expect(
                    element.shadowRoot.querySelector(
                        '[data-group-name="input"]'
                    ).classList
                ).toContain('avonni-slider__slider_disabled');
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

    //max
    it('max = 10', () => {
        element.disableSwap = false;
        element.max = 10;
        element.value = 15;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-group-name="input"]'
            );
            expect(input.value).toBe('10');
        });
    });

    //min
    it('min = 10', () => {
        element.disableSwap = false;
        element.min = 10;
        element.value = 0;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-group-name="input"]'
            );
            expect(input.value).toBe('10');
        });
    });

    //minimumDistance
    it('minimumDistance = 0 (left to right)', () => {
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

    it('minimumDistance = 0 (right to left)', () => {
        element.minimumDistance = 0;
        element.disableSwap = true;
        element.min = 0;
        element.max = 10;
        element.value = [5, 7];

        return Promise.resolve()
            .then(() => {
                expect(element.minimumDistance).toEqual(0);
                const secondInput = element.shadowRoot.querySelector(
                    '[data-group-name="input"][data-index="1"]'
                );
                secondInput.value = 2;
                secondInput.dispatchEvent(new CustomEvent('input'));
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

    // hideMinMaxValues
    it('hideMinMaxValues = false', () => {
        element.hideMinMaxValues = false;

        return Promise.resolve().then(() => {
            expect(element.hideMinMaxValues).toEqual(false);
            expect(
                element.shadowRoot.querySelectorAll(
                    '[data-group-name="min-max-values"]'
                ).length
            ).toEqual(2);
        });
    });

    it('hideMinMaxValues = true', () => {
        element.hideMinMaxValues = true;

        return Promise.resolve().then(() => {
            expect(element.hideMinMaxValues).toEqual(true);
            expect(
                element.shadowRoot.querySelectorAll(
                    '[data-group-name="min-max-values"]'
                ).length
            ).toEqual(0);
        });
    });

    // hideTrack
    it('hideTrack = false', () => {
        element.hideTrack = false;

        return Promise.resolve().then(() => {
            expect(element.hideTrack).toEqual(false);
            expect(
                element.shadowRoot.querySelector('[data-element-id="track"]')
            ).toBeTruthy();
        });
    });

    it('hideTrack = true', () => {
        element.hideTrack = true;

        return Promise.resolve().then(() => {
            expect(element.hideTrack).toEqual(true);
            expect(
                element.shadowRoot.querySelector('[data-element-id="track"]')
            ).toBeFalsy();
        });
    });

    //showPin
    it('showPin = false', () => {
        element.showPin = false;

        return Promise.resolve().then(() => {
            expect(element.showPin).toEqual(false);
            expect(
                element.shadowRoot.querySelector(
                    '[data-group-name="pin"][data-index="0"]'
                )
            ).toBeFalsy();
        });
    });

    it('showPin = true', () => {
        element.showPin = true;

        return Promise.resolve().then(() => {
            expect(element.showPin).toEqual(true);
            expect(
                element.shadowRoot.querySelector(
                    '[data-group-name="pin"][data-index="0"]'
                )
            ).toBeTruthy();
        });
    });

    // showTickMarks
    it('showTickMarks = false', () => {
        element.showTickMarks = false;

        return Promise.resolve().then(() => {
            expect(
                element.shadowRoot.querySelector('[data-element-id="ruler"]')
            ).toBeFalsy();
        });
    });

    it('showTickMarks = true', () => {
        element.showTickMarks = true;
        let ruler;
        return Promise.resolve().then(() => {
            ruler = element.shadowRoot.querySelector(
                '[data-element-id="ruler"]'
            );
            expect(ruler).toBeTruthy();
            expect(ruler.firstChild.tagName).toEqual('line');
            expect(ruler.childElementCount).toEqual(101);
            element.showTickMarks = false;
        });
    });

    it('showTickMarks, a maximum of 500 ticks can be visible', () => {
        element.showTickMarks = true;
        element.step = '0.001';

        return Promise.resolve().then(() => {
            const ruler = element.shadowRoot.querySelector(
                '[data-element-id="ruler"]'
            );
            expect(ruler.childElementCount).toEqual(501);
        });
    });

    // size
    it('size = responsive', () => {
        element.size = 'responsive';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-range"]'
            );
            expect(wrapper.className).toBe(
                'avonni-slider__container-horizontal-size_responsive'
            );
        });
    });

    it('size = responsive (vertical), no max-width', () => {
        element.size = 'responsive';
        element.type = 'vertical';

        jest.spyOn(
            CSSStyleDeclaration.prototype,
            'getPropertyValue'
        ).mockReturnValue('');

        jest.spyOn(Element.prototype, 'clientHeight', 'get').mockReturnValue(
            1000
        );

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-range"]'
            );
            expect(wrapper.classList).toContain(
                'avonni-slider__container-vertical-origin_responsive'
            );
        });
    });

    it('size = responsive (vertical) max-width', () => {
        element.size = 'responsive';
        element.type = 'vertical';

        jest.spyOn(
            CSSStyleDeclaration.prototype,
            'getPropertyValue'
        ).mockReturnValue('1000px');

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-range"]'
            );
            expect(wrapper.classList).toContain(
                'avonni-slider__container-vertical-origin_responsive'
            );
        });
    });

    it('size = x-small', () => {
        element.size = 'x-small';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-range"]'
            );
            expect(wrapper.classList).toContain(
                'avonni-slider__container-horizontal-size_x-small'
            );
        });
    });

    it('size = small', () => {
        element.size = 'small';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-range"]'
            );
            expect(wrapper.classList).toContain(
                'avonni-slider__container-horizontal-size_small'
            );
        });
    });

    it('size = medium', () => {
        element.size = 'medium';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-range"]'
            );
            expect(wrapper.classList).toContain(
                'avonni-slider__container-horizontal-size_medium'
            );
        });
    });

    it('size = large', () => {
        element.size = 'large';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-range"]'
            );
            expect(wrapper.classList).toContain(
                'avonni-slider__container-horizontal-size_large'
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

    it('step = 0.1', () => {
        element.min = 0;
        element.max = 10;
        element.step = 0.1;
        element.value = 5.5;

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll(
                '[data-group-name="input"]'
            );
            inputs.forEach((input) => {
                expect(input.step).toEqual('0.1');
                expect(element.min).toEqual(0);
                expect(element.max).toEqual(10);
                expect(element.value).toEqual(5.5);
            });
        });
    });

    // tickMarkStyle
    it('tickMarkStyle = "tick"', () => {
        element.tickMarkStyle = 'tick';
        element.showTickMarks = true;

        return Promise.resolve().then(() => {
            const ruler = element.shadowRoot.querySelector(
                '[data-element-id="ruler"]'
            );
            expect(ruler).toBeTruthy();
            expect(ruler.firstChild.tagName).toEqual('line');
            expect(ruler.childElementCount).toEqual(101);
        });
    });

    it('tickMarkStyle = "dot"', () => {
        element.tickMarkStyle = 'dot';
        element.showTickMarks = true;

        return Promise.resolve().then(() => {
            const ruler = element.shadowRoot.querySelector(
                '[data-element-id="ruler"]'
            );
            expect(ruler).toBeTruthy();
            expect(ruler.firstChild.tagName).toEqual('circle');
            expect(ruler.childElementCount).toEqual(99);
        });
    });

    it('tickMarkStyle = "inner-tick"', () => {
        element.tickMarkStyle = 'inner-tick';
        element.showTickMarks = true;

        return Promise.resolve().then(() => {
            const ruler = element.shadowRoot.querySelector(
                '[data-element-id="ruler"]'
            );
            expect(ruler).toBeTruthy();
            expect(ruler.firstChild.tagName).toEqual('line');
            expect(ruler.childElementCount).toEqual(101);
        });
    });

    // type
    it('type = horizontal', () => {
        element.type = 'horizontal';
        element.showPin = true;

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
            const pins = element.shadowRoot.querySelectorAll(
                '[data-group-name="pin"]'
            );

            expect(wrapper).toBeFalsy();
            expect(verticalMaxLabel).toBeFalsy();
            expect(verticalMinLabel).toBeFalsy();
            expect(horizontalMinMaxLabels).toBeTruthy();
            expect(pins).toHaveLength(1);
        });
    });

    it('type = vertical', () => {
        element.type = 'vertical';
        element.showPin = true;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.avonni-slider__vertical'
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
            const pins = element.shadowRoot.querySelectorAll(
                '[data-group-name="pin"]'
            );

            expect(wrapper).toBeTruthy();
            expect(verticalMaxLabel).toBeTruthy();
            expect(verticalMinLabel).toBeTruthy();
            expect(horizontalMinMaxLabels).toBeFalsy();
            expect(pins).toHaveLength(1);
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
        element.min = 0;

        return Promise.resolve().then(() => {
            const formattedNumbers = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-formatted-number"]'
            );
            const max = element.shadowRoot.querySelector(
                '[data-element-id="lightning-formatted-number-max"]'
            );
            expect(max.value).toEqual(1);
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
    it('unitAttributes', () => {
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
    it('customLabels on horizontal component', () => {
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

    it('customLabels on vertical component', () => {
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

    it('customLabels and tickMarkers (tick)', () => {
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

    it('customLabels and tickMarkers (dot)', () => {
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
            expect(ruler.childElementCount).toEqual(3);
        });
    });

    it('customLabels and tickMarkers (inner-tick)', () => {
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
            expect(ruler.firstChild.tagName).toEqual('line');
            expect(ruler.childElementCount).toEqual(101);
        });
    });

    // validity
    it('validity should be positive', () => {
        element.value = 10;
        element.max = 1000;

        return Promise.resolve().then(() => {
            expect(element.validity).toEqual(true);
        });
    });

    it('validity should be positive (cappedValues)', () => {
        element.value = 1000;
        element.max = 10;

        return Promise.resolve().then(() => {
            expect(element.validity).toEqual(true);
        });
    });

    it('validity should be positive (two values and capped)', () => {
        element.value = [1000, 50];
        element.max = 10;

        return Promise.resolve().then(() => {
            expect(element.validity).toEqual(true);
        });
    });

    // value
    it('value = undefined', () => {
        element.value = undefined;

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll(
                '[data-group-name="input"]'
            );
            expect(inputs.length).toEqual(1);
            expect(element.value).toEqual(50);
        });
    });

    it('value = 5 (single value)', () => {
        element.value = 5;

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll(
                '[data-group-name="input"]'
            );
            expect(inputs.length).toEqual(1);
            expect(element.value).toEqual(5);
        });
    });

    it('value = [5] (single value in array)', () => {
        element.value = [5];

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll(
                '[data-group-name="input"]'
            );
            expect(inputs.length).toEqual(1);
            expect(element.value).toEqual(5);
        });
    });

    it('value = [1, 2, 3, 4] (multiple value in array)', () => {
        element.value = [1, 2, 3, 4];

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll(
                '[data-group-name="input"]'
            );
            expect(inputs.length).toEqual(4);
            expect(element.value).toEqual([1, 2, 3, 4]);
            expect(
                element.shadowRoot.querySelector('[data-element-id="track"]')
            ).toBeFalsy();
        });
    });

    // variant
    it('variant = standard', () => {
        element.label = 'A string label';
        element.variant = 'standard';

        return Promise.resolve().then(() => {
            expect(element.variant).toEqual('standard');
            const label = element.shadowRoot.querySelector(
                '[data-element-id="span-label"]'
            );
            expect(label.classList).not.toContain('slds-assistive-text');
        });
    });

    it('variant = label-hidden', () => {
        element.variant = 'label-hidden';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            expect(element.variant).toEqual('label-hidden');
            const label = element.shadowRoot.querySelector(
                '[data-element-id="span-label"]'
            );
            expect(label).toEqual(null);
        });
    });

    /* ----- PUBLIC METHODS ------ */

    //blur
    it('blur removes all focus', () => {
        element.value = [25, 50, 75];
        let inputs = [];
        return Promise.resolve()
            .then(() => {
                inputs = element.shadowRoot.querySelectorAll(
                    '[data-group-name="input"]'
                );
                expect(element.shadowRoot.activeElement).toEqual(null);
                element.focus();
                expect(element.shadowRoot.activeElement).toEqual(inputs[0]);
            })
            .then(() => {
                element.blur();
                expect(element.shadowRoot.activeElement).toEqual(null);
            });
    });

    //focus
    it('focus changes focus target by one index', () => {
        element.value = [25, 50, 75];
        let inputs = [];
        return Promise.resolve()
            .then(() => {
                inputs = element.shadowRoot.querySelectorAll(
                    '[data-group-name="input"]'
                );
                expect(element.shadowRoot.activeElement).toEqual(null);
                element.focus();
                expect(element.shadowRoot.activeElement).toEqual(inputs[0]);
            })
            .then(() => {
                element.focus();
                expect(element.shadowRoot.activeElement).toEqual(inputs[1]);
            })
            .then(() => {
                element.focus();
                expect(element.shadowRoot.activeElement).toEqual(inputs[2]);
            })
            .then(() => {
                element.focus();
                expect(element.shadowRoot.activeElement).toEqual(inputs[0]);
            });
    });

    //reportValidity
    it('reportValidity() should return true', () => {
        element.value = 1000;
        element.max = 10000;
        return Promise.resolve()
            .then(() => {
                expect(element.reportValidity()).toEqual(true);
            })
            .then(() => {
                expect(
                    element.shadowRoot.querySelector(
                        '[data-element-id="help-message"]'
                    )
                ).toBeFalsy();
            });
    });

    it('reportValidity() should return true (capped values)', () => {
        element.value = 1000;
        element.max = 10;
        return Promise.resolve()
            .then(() => {
                expect(element.reportValidity()).toEqual(true);
            })
            .then(() => {
                expect(
                    element.shadowRoot.querySelector(
                        '[data-element-id="help-message"]'
                    )
                ).toBeFalsy();
            });
    });

    //checkValidity
    it('checkValidity() should return true', () => {
        element.value = 1000;
        element.max = 10000;
        return Promise.resolve().then(() => {
            expect(element.checkValidity()).toEqual(true);
        });
    });

    it('checkValidity() should return true (capped values)', () => {
        element.value = 1000;
        element.max = 10;
        return Promise.resolve().then(() => {
            expect(element.checkValidity()).toEqual(true);
        });
    });

    //showHelpMessageIfInvalid
    it('showHelpMessageIfInvalid() should not show message', () => {
        element.value = 1000;
        element.max = 10000;
        return Promise.resolve()
            .then(() => {
                element.showHelpMessageIfInvalid();
            })
            .then(() => {
                expect(
                    element.shadowRoot.querySelector(
                        '[data-element-id="help-message"]'
                    )
                ).toBeFalsy();
            });
    });

    it('showHelpMessageIfInvalid() should not show message (cappedValues)', () => {
        element.value = 1000;
        element.max = 10;
        return Promise.resolve()
            .then(() => {
                element.showHelpMessageIfInvalid();
            })
            .then(() => {
                expect(
                    element.shadowRoot.querySelector(
                        '[data-element-id="help-message"]'
                    )
                ).toBeFalsy();
            });
    });

    //setCustomValidity
    it('setCustomValidity() should set the display for custom message when invalid', () => {
        element.value = 1000;
        element.max = 10;
        return Promise.resolve()
            .then(() => {
                element.setCustomValidity('custom help message');
                element.showHelpMessageIfInvalid();
            })
            .then(() => {
                const helpMessage = element.shadowRoot.querySelector(
                    '[data-element-id="help-message"]'
                );
                expect(helpMessage).toBeTruthy();
                expect(helpMessage.textContent).toEqual('custom help message');
            });
    });

    it('setCustomValidity() should set the display for custom message when invalid for every invalid value', () => {
        element.value = [1000, 1001];
        element.max = 10;
        return Promise.resolve()
            .then(() => {
                element.setCustomValidity('custom help message');
                element.showHelpMessageIfInvalid();
            })
            .then(() => {
                const helpMessage = element.shadowRoot.querySelector(
                    '[data-element-id="help-message"]'
                );
                expect(helpMessage).toBeTruthy();
                expect(helpMessage.textContent).toEqual(
                    'Slider 0: custom help message'
                );
            });
    });

    /* ----- EVENTS ------ */

    // change
    it('change event on input (single value)', () => {
        const handler = jest.fn();
        element.addEventListener('change', handler);
        element.value = 34;
        element.showHelpMessageIfInvalid();

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-group-name="input"]'
            );
            input.dispatchEvent(new CustomEvent('input'));
            jest.runAllTimers();

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.value).toEqual(34);
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });

    it('change event on input (multiple value)', () => {
        const handler = jest.fn();
        element.addEventListener('change', handler);

        element.value = [1, 2, 3];

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-group-name="input"]'
            );
            input.dispatchEvent(new CustomEvent('input'));
            jest.runAllTimers();

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.value).toEqual([1, 2, 3]);
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });

    /* ----- EVENT LISTENERS ----- */

    //onmousemove
    it('onmousemove close to middle thumb node', () => {
        element.value = [25, 50, 75];
        let firstInput;
        let middleInput;
        let lastInput;
        return Promise.resolve()
            .then(() => {
                firstInput = element.shadowRoot.querySelector(
                    '[data-group-name="input"][data-index="0"]'
                );
                middleInput = element.shadowRoot.querySelector(
                    '[data-group-name="input"][data-index="1"]'
                );
                lastInput = element.shadowRoot.querySelector(
                    '[data-group-name="input"][data-index="2"]'
                );
                jest.spyOn(firstInput, 'clientWidth', 'get').mockReturnValue(
                    100
                );
                let customEvent = new MouseEvent('mousemove', {
                    offsetX: 50,
                    offsetY: 0
                });
                customEvent.offsetX = 50;
                customEvent.offsetY = 0;
                element.shadowRoot.dispatchEvent(customEvent);
            })
            .then(() => {
                expect(firstInput.classList).not.toContain(
                    'avonni-slider__slider_above'
                );
                expect(middleInput.classList).toContain(
                    'avonni-slider__slider_above'
                );
                expect(lastInput.classList).not.toContain(
                    'avonni-slider__slider_above'
                );
            });
    });

    // onmousedown and onmouseup on input
    it('onmousedown on input && showPin = true', () => {
        element.value = 25;
        element.showPin = true;
        let pin;
        let input;
        return Promise.resolve()
            .then(() => {
                input = element.shadowRoot.querySelector(
                    '[data-group-name="input"][data-index="0"]'
                );
                pin = element.shadowRoot.querySelector(
                    '[data-group-name="pin"]'
                );
                input.dispatchEvent(new MouseEvent('mousedown'));
            })
            .then(() => {
                expect(pin.classList).toContain('avonni-slider__pin_visible');
            })
            .then(() => {
                input.dispatchEvent(new MouseEvent('mouseup'));
            })
            .then(() => {
                expect(pin.classList).not.toContain(
                    'avonni-slider__pin_visible'
                );
            });
    });

    /* ----- SCENARIOS ----- */

    it('input change with showPin = true)', () => {
        element.min = 0;
        element.max = 10;
        element.step = 0.5;
        element.showPin = true;
        element.value = 5;
        let input;
        let pin;
        let pinPositionBefore;

        return Promise.resolve()
            .then(() => {
                expect(element.minimumDistance).toEqual(0);
                input = element.shadowRoot.querySelector(
                    '[data-group-name="input"][data-index="0"]'
                );
                pin = element.shadowRoot.querySelector(
                    '[data-group-name="pin"]'
                );
                pinPositionBefore = pin.style.left;
                input.value = 8;
                input.dispatchEvent(new CustomEvent('input'));
            })
            .then(() => {
                expect(pinPositionBefore).not.toEqual(pin.style.left);
                pinPositionBefore = pin.style.left;
                input.value = 2;
                input.dispatchEvent(new CustomEvent('input'));
            })
            .then(() => {
                expect(pinPositionBefore).not.toEqual(pin.style.left);
                pinPositionBefore = pin.style.left;
            });
    });

    it('ruler color redraw when input changes', () => {
        element.value = 1;
        element.showTickMarks = true;
        element.tickMarkStyle = 'inner-tick';
        let ruler;
        let input;
        return Promise.resolve()
            .then(() => {
                ruler = element.shadowRoot.querySelector(
                    '[data-element-id="ruler"]'
                );
                input = element.shadowRoot.querySelector(
                    '[data-group-name="input"]'
                );
                expect(ruler).toBeTruthy();
                expect(ruler.firstChild.tagName).toEqual('line');
                expect(ruler.firstChild.getAttribute('stroke')).toEqual(
                    '#0176d3'
                );
                expect(ruler.childNodes[2].getAttribute('stroke')).toEqual(
                    '#ecebea'
                );
                expect(ruler.childElementCount).toEqual(101);
                element.value = 50;
                input.dispatchEvent(new CustomEvent('input'));
            })
            .then(() => {
                expect(ruler.firstChild.tagName).toEqual('line');
                expect(ruler.childNodes[1].getAttribute('stroke')).toEqual(
                    '#0176d3'
                );
                expect(ruler.childNodes[23].getAttribute('stroke')).toEqual(
                    '#ecebea'
                );
                expect(ruler.childElementCount).toEqual(101);
            });
    });

    it('onmousemove event debounce (moving mouse constantly)', () => {
        element.value = [25, 50, 75];
        let firstInput;
        let middleInput;
        let lastInput;
        return Promise.resolve()
            .then(() => {
                firstInput = element.shadowRoot.querySelector(
                    '[data-group-name="input"][data-index="0"]'
                );
                middleInput = element.shadowRoot.querySelector(
                    '[data-group-name="input"][data-index="1"]'
                );
                lastInput = element.shadowRoot.querySelector(
                    '[data-group-name="input"][data-index="2"]'
                );
                jest.spyOn(firstInput, 'clientWidth', 'get').mockReturnValue(
                    100
                );
                // we move the mouse at offsetX = 50
                let customEvent = new MouseEvent('mousemove', {
                    offsetX: 50
                });
                customEvent.offsetX = 50;
                element.shadowRoot.dispatchEvent(customEvent);
            })
            .then(() => {
                // middle input is above
                expect(firstInput.classList).not.toContain(
                    'avonni-slider__slider_above'
                );
                expect(middleInput.classList).toContain(
                    'avonni-slider__slider_above'
                );
                expect(lastInput.classList).not.toContain(
                    'avonni-slider__slider_above'
                );
            })
            .then(() => {
                // we move the mouse at offsetX = 0
                let customEvent = new MouseEvent('mousemove', {
                    offsetX: 50
                });
                customEvent.offsetX = 50;
                element.shadowRoot.dispatchEvent(customEvent);
            })
            .then(() => {
                // we moved mouse too fast, inputs should be in same order
                expect(firstInput.classList).not.toContain(
                    'avonni-slider__slider_above'
                );
                expect(middleInput.classList).toContain(
                    'avonni-slider__slider_above'
                );
                expect(lastInput.classList).not.toContain(
                    'avonni-slider__slider_above'
                );
            })
            .then(() => {
                // we wait for timeout then move mouse to offsetX = 0
                jest.advanceTimersToNextTimer();
                let customEvent = new MouseEvent('mousemove', {
                    offsetX: 0
                });
                customEvent.offsetX = 0;
                element.shadowRoot.dispatchEvent(customEvent);
            })
            .then(() => {
                // first input is now above, since we waited for timeout
                expect(firstInput.classList).toContain(
                    'avonni-slider__slider_above'
                );
                expect(middleInput.classList).not.toContain(
                    'avonni-slider__slider_above'
                );
                expect(lastInput.classList).not.toContain(
                    'avonni-slider__slider_above'
                );
            });
    });
});
