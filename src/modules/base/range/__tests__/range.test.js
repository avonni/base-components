import { createElement } from 'lwc';
import { FieldConstraintApiWithProxyInput } from 'c/inputUtils';
import Range from 'c/range';

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

    describe('Attributes', () => {
        it('Default attributes', () => {
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
            expect(element.pin).toBeFalsy();
            expect(element.size).toBe('full');
            expect(element.step).toBe(1);
            expect(element.unit).toBe('decimal');
            expect(element.unitAttributes).toMatchObject({});
            expect(element.type).toBe('horizontal');
            expect(element.valueLower).toBe(0);
            expect(element.valueUpper).toBe(100);
            expect(element.validity).toBeTruthy();
            expect(element.variant).toBe('standard');
        });

        describe('disabled', () => {
            it('false', () => {
                element.disabled = false;

                return Promise.resolve().then(() => {
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-group-name="input"]'
                    );
                    inputs.forEach((input) => {
                        expect(input.disabled).toBeFalsy();
                    });
                });
            });

            it('true', () => {
                element.disabled = true;

                return Promise.resolve().then(() => {
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-group-name="input"]'
                    );
                    inputs.forEach((input) => {
                        expect(input.disabled).toBeTruthy();
                        expect(
                            element.shadowRoot
                                .querySelector(
                                    '[data-element-id="progress-bar"]'
                                )
                                .classList.contains(
                                    'avonni-range__progress_disabled'
                                )
                        ).toBe(true);
                    });
                });
            });
        });

        describe('label', () => {
            it('Passed to the component', () => {
                element.label = 'A string label';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '[data-element-id="label"]'
                    );
                    expect(label.textContent).toBe('A string label');
                });
            });
        });

        describe('max', () => {
            it('Passed to the component', () => {
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
        });

        describe('min', () => {
            it('Passed to the component', () => {
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
        });

        describe('pin', () => {
            it('false', () => {
                element.pin = false;

                return Promise.resolve().then(() => {
                    const bubbles = element.shadowRoot.querySelectorAll(
                        '.avonni-range__bubble'
                    );
                    expect(bubbles).toHaveLength(0);
                });
            });

            it('true', () => {
                element.pin = true;

                return Promise.resolve().then(() => {
                    const bubbles = element.shadowRoot.querySelectorAll(
                        '.avonni-range__bubble'
                    );
                    expect(bubbles).toHaveLength(2);
                });
            });
        });

        describe('size', () => {
            it('full', () => {
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

            it('x-small', () => {
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

            it('small', () => {
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

            it('medium', () => {
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

            it('large', () => {
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
        });

        describe('step', () => {
            it('Passed to the component', () => {
                element.step = 3;

                return Promise.resolve().then(() => {
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-group-name="input"]'
                    );
                    inputs.forEach((input) => {
                        expect(input.step).toBe('3');
                    });
                });
            });
        });

        describe('unit', () => {
            it('Passed to the component', () => {
                element.unit = 'currency';

                return Promise.resolve().then(() => {
                    const formattedNumbers =
                        element.shadowRoot.querySelectorAll(
                            '[data-element-id^="lightning-formatted-number"]'
                        );
                    formattedNumbers.forEach((formattedNumber) => {
                        expect(formattedNumber.formatStyle).toBe('currency');
                    });
                });
            });
        });

        describe('unitAttributes', () => {
            it('Passed to the component', () => {
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
                    const formattedNumbers =
                        element.shadowRoot.querySelectorAll(
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
        });

        describe('type', () => {
            it('horizontal', () => {
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
                    const horizontalMinMaxLabels =
                        element.shadowRoot.querySelector(
                            '[data-element-id="horizontal-unit-container"]'
                        );
                    const bubbles = element.shadowRoot.querySelectorAll(
                        '[data-group-name="bubble"]'
                    );

                    expect(wrapper).toBeFalsy();
                    expect(verticalMaxLabel).toBeFalsy();
                    expect(verticalMinLabel).toBeFalsy();
                    expect(horizontalMinMaxLabels).toBeTruthy();
                    expect(bubbles).toHaveLength(2);
                });
            });

            it('vertical', () => {
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
                    const horizontalMinMaxLabels =
                        element.shadowRoot.querySelector(
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
        });

        describe('valueLower', () => {
            it('Passed to the component', () => {
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
        });

        describe('valueUpper', () => {
            it('Passed to the component', () => {
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
        });

        describe('variant', () => {
            it('standard', () => {
                element.variant = 'standard';
                element.label = 'A string label';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '[data-element-id="span-label"]'
                    );
                    expect(label.classList).not.toContain(
                        'slds-assistive-text'
                    );
                    expect(label.classList).toContain(
                        'slds-slider-label__label'
                    );
                });
            });

            it('label-hidden', () => {
                element.variant = 'label-hidden';
                element.label = 'A string label';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '[data-element-id="span-label"]'
                    );
                    expect(label.classList).toContain('slds-assistive-text');
                    expect(label.classList).not.toContain(
                        'slds-slider-label__label'
                    );
                });
            });
        });
    });

    describe('Methods', () => {
        describe('checkValidity', () => {
            it('true', () => {
                return Promise.resolve().then(() => {
                    expect(element.checkValidity()).toBeTruthy();
                });
            });

            it('false', () => {
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
        });

        describe('reportValidity', () => {
            it('true', () => {
                return Promise.resolve().then(() => {
                    expect(element.reportValidity()).toBeTruthy();
                });
            });

            it('false', () => {
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
        });
    });

    describe('Events', () => {
        describe('change', () => {
            it('on left input', () => {
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

            it('on right input', () => {
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

            it('on left input going lower than left input', () => {
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
        });

        describe('mousemove', () => {
            it('close to left thumb node', () => {
                const inputRight = element.shadowRoot.querySelector(
                    '[data-element-id="input-right"]'
                );
                const inputLeft = element.shadowRoot.querySelector(
                    '[data-element-id="input-left"]'
                );
                inputRight.value = 20;
                jest.spyOn(inputLeft, 'clientWidth', 'get').mockReturnValue(
                    100
                );
                let customEvent = new MouseEvent('mousemove', {
                    offsetX: 0,
                    offsetY: 0
                });
                customEvent.offsetX = 0;
                customEvent.offsetY = 0;

                element.shadowRoot.dispatchEvent(customEvent);

                return Promise.resolve().then(() => {
                    expect(
                        inputLeft.classList.contains(
                            'avonni-range__slider-left_above'
                        )
                    ).toBe(true);
                });
            });

            it('close to right thumb node', () => {
                const inputRight = element.shadowRoot.querySelector(
                    '[data-element-id="input-right"]'
                );
                const inputLeft = element.shadowRoot.querySelector(
                    '[data-element-id="input-left"]'
                );
                inputRight.value = 20;
                jest.spyOn(inputLeft, 'clientWidth', 'get').mockReturnValue(
                    100
                );
                let customEvent = new MouseEvent('mousemove', {
                    offsetX: 0,
                    offsetY: 0
                });
                customEvent.offsetX = 75;
                customEvent.offsetY = 0;

                element.shadowRoot.dispatchEvent(customEvent);

                return Promise.resolve().then(() => {
                    expect(
                        inputLeft.classList.contains(
                            'avonni-range__slider-left_above'
                        )
                    ).toBe(false);
                });
            });
        });

        describe('mousedown', () => {
            it('on right input', () => {
                element.pin = true;

                return Promise.resolve()
                    .then(() => {
                        const inputRight = element.shadowRoot.querySelector(
                            '[data-element-id="input-right"]'
                        );
                        inputRight.dispatchEvent(new MouseEvent('mousedown'));
                        expect(
                            element.shadowRoot
                                .querySelector(
                                    '[data-element-id="right-bubble"]'
                                )
                                .classList.contains(
                                    'avonni-range__bubble_visible'
                                )
                        ).toBeTruthy();
                        inputRight.dispatchEvent(new MouseEvent('mouseup'));
                    })
                    .then(() => {
                        expect(
                            element.shadowRoot
                                .querySelector(
                                    '[data-element-id="right-bubble"]'
                                )
                                .classList.contains(
                                    'avonni-range__bubble_visible'
                                )
                        ).toBeFalsy();
                    });
            });

            it('on left input', () => {
                element.pin = true;

                return Promise.resolve()
                    .then(() => {
                        const inputLeft = element.shadowRoot.querySelector(
                            '[data-element-id="input-left"]'
                        );
                        inputLeft.dispatchEvent(new MouseEvent('mousedown'));
                        expect(
                            element.shadowRoot
                                .querySelector(
                                    '[data-element-id="left-bubble"]'
                                )
                                .classList.contains(
                                    'avonni-range__bubble_visible'
                                )
                        ).toBeTruthy();
                        inputLeft.dispatchEvent(new MouseEvent('mouseup'));
                    })
                    .then(() => {
                        expect(
                            element.shadowRoot
                                .querySelector(
                                    '[data-element-id="left-bubble"]'
                                )
                                .classList.contains(
                                    'avonni-range__bubble_visible'
                                )
                        ).toBeFalsy();
                    });
            });
        });

        describe('setBubblesPosition', () => {
            it('should place bubbles', () => {
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
    });
});
