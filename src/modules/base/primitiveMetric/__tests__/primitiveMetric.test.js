import { createElement } from 'lwc';
import PrimitiveMetric from '../primitiveMetric';

let element;
describe('Primitive Metric', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('avonni-primitive-metric', {
            is: PrimitiveMetric
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.currencyCode).toBeUndefined();
            expect(element.currencyDisplayAs).toBe('symbol');
            expect(element.formatStyle).toBe('decimal');
            expect(element.isLoading).toBeFalsy();
            expect(element.maximumFractionDigits).toBeUndefined();
            expect(element.maximumSignificantDigits).toBeUndefined();
            expect(element.minimumFractionDigits).toBeUndefined();
            expect(element.minimumIntegerDigits).toBeUndefined();
            expect(element.minimumSignificantDigits).toBeUndefined();
            expect(element.prefix).toBeUndefined();
            expect(element.suffix).toBeUndefined();
            expect(element.trendBreakpointValue).toBe(0);
            expect(element.trendIcon).toBeUndefined();
            expect(element.value).toBeUndefined();
            expect(element.valueSign).toBe('negative');
        });

        describe('currencyCode', () => {
            it('Passed to the component', () => {
                element.currencyCode = 'EUR';
                element.value = 40;

                return Promise.resolve().then(() => {
                    const number = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-number"]'
                    );
                    expect(number.currencyCode).toBe('EUR');
                });
            });
        });

        describe('currencyDisplayAs', () => {
            it('Passed to the component', () => {
                element.currencyDisplayAs = 'code';
                element.value = 40;

                return Promise.resolve().then(() => {
                    const number = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-number"]'
                    );
                    expect(number.currencyDisplayAs).toBe('code');
                });
            });
        });

        describe('formatStyle', () => {
            it('Passed to the component', () => {
                element.formatStyle = 'percent-fixed';
                element.value = 40;

                return Promise.resolve().then(() => {
                    const number = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-number"]'
                    );
                    expect(number.formatStyle).toBe('percent-fixed');
                });
            });
        });

        describe('isLoading', () => {
            it('Passed to the component when isLoading = false', () => {
                element.isLoading = false;
                element.value = 40;

                return Promise.resolve().then(() => {
                    const number = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-number"]'
                    );
                    const spinner = element.shadowRoot.querySelector(
                        '[data-element-id="div-loading-spinner"]'
                    );
                    expect(spinner).toBeFalsy();
                    expect(number).toBeTruthy();
                });
            });

            it('Passed to the component when isLoading = true', () => {
                element.isLoading = true;
                element.value = 40;

                return Promise.resolve().then(() => {
                    const emptyValue = element.shadowRoot.querySelector(
                        '[data-element-id="empty-value"]'
                    );
                    const number = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-number"]'
                    );
                    const spinner = element.shadowRoot.querySelector(
                        '[data-element-id="div-loading-spinner"]'
                    );
                    expect(emptyValue).toBeFalsy();
                    expect(spinner).toBeTruthy();
                    expect(number).toBeFalsy();
                });
            });

            it('Passed to the component when isLoading = true and no value', () => {
                element.isLoading = true;
                element.value = null;

                return Promise.resolve().then(() => {
                    const emptyValue = element.shadowRoot.querySelector(
                        '[data-element-id="empty-value"]'
                    );
                    const number = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-number"]'
                    );
                    const spinner = element.shadowRoot.querySelector(
                        '[data-element-id="div-loading-spinner"]'
                    );
                    expect(emptyValue).toBeTruthy();
                    expect(spinner).toBeTruthy();
                    expect(number).toBeFalsy();
                });
            });
        });

        describe('maximumFractionDigits', () => {
            it('Passed to the component', () => {
                element.maximumFractionDigits = 2;
                element.value = 40;

                return Promise.resolve().then(() => {
                    const number = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-number"]'
                    );
                    expect(number.maximumFractionDigits).toBe(2);
                });
            });
        });

        describe('maximumSignificantDigits', () => {
            it('Passed to the component', () => {
                element.maximumSignificantDigits = 2;
                element.value = 40;

                return Promise.resolve().then(() => {
                    const number = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-number"]'
                    );
                    expect(number.maximumSignificantDigits).toBe(2);
                });
            });
        });

        describe('minimumFractionDigits', () => {
            it('Passed to the component', () => {
                element.minimumFractionDigits = 2;
                element.value = 40;

                return Promise.resolve().then(() => {
                    const number = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-number"]'
                    );
                    expect(number.minimumFractionDigits).toBe(2);
                });
            });
        });

        describe('minimumIntegerDigits', () => {
            it('Passed to the component', () => {
                element.minimumIntegerDigits = 2;
                element.value = 40;

                return Promise.resolve().then(() => {
                    const number = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-number"]'
                    );
                    expect(number.minimumIntegerDigits).toBe(2);
                });
            });
        });

        describe('minimumSignificantDigits', () => {
            it('Passed to the component', () => {
                element.minimumSignificantDigits = 2;
                element.value = 40;

                return Promise.resolve().then(() => {
                    const number = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-number"]'
                    );
                    expect(number.minimumSignificantDigits).toBe(2);
                });
            });
        });

        describe('prefix', () => {
            it('Passed to the component', () => {
                element.prefix = 'some prefix';
                element.value = 40;

                return Promise.resolve().then(() => {
                    const prefix = element.shadowRoot.querySelector(
                        '[data-element-id="span-prefix"]'
                    );
                    expect(prefix.textContent).toBe('some prefix ');
                });
            });
        });

        describe('suffix', () => {
            it('Passed to the component', () => {
                element.suffix = 'some suffix';
                element.value = 40;

                return Promise.resolve().then(() => {
                    const suffix = element.shadowRoot.querySelector(
                        '[data-element-id="span-suffix"]'
                    );
                    expect(suffix.textContent).toBe(' some suffix');
                });
            });
        });

        describe('trendBreakpointValue and trendIcon', () => {
            it('Passed to the component when trending down', () => {
                element.trendBreakpointValue = 10;
                element.value = 7;
                element.trendIcon = 'dynamic';

                return Promise.resolve()
                    .then(() => {
                        const dynamicIcon = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-dynamic-icon-sign"]'
                        );
                        const icon = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-icon-sign"]'
                        );
                        expect(icon).toBeFalsy();
                        expect(dynamicIcon).toBeTruthy();
                        expect(dynamicIcon.option).toBe('down');
                        expect(dynamicIcon.alternativeText).toBe('down');

                        element.trendIcon = 'arrow';
                    })
                    .then(() => {
                        const dynamicIcon = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-dynamic-icon-sign"]'
                        );
                        const altText = element.shadowRoot.querySelector(
                            '[data-element-id="span-icon-assistive-text"]'
                        );
                        const icon = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-icon-sign"]'
                        );
                        expect(dynamicIcon).toBeFalsy();
                        expect(icon).toBeTruthy();
                        expect(icon.iconName).toBe('utility:arrowdown');
                        expect(altText.textContent).toBe(
                            'Trend direction: down'
                        );

                        element.trendIcon = 'caret';
                    })
                    .then(() => {
                        const dynamicIcon = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-dynamic-icon-sign"]'
                        );
                        const altText = element.shadowRoot.querySelector(
                            '[data-element-id="span-icon-assistive-text"]'
                        );
                        const icon = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-icon-sign"]'
                        );
                        expect(dynamicIcon).toBeFalsy();
                        expect(icon).toBeTruthy();
                        expect(icon.iconName).toBe('utility:down');
                        expect(altText.textContent).toBe(
                            'Trend direction: down'
                        );
                    });
            });

            it('Passed to the component when not trending', () => {
                element.trendBreakpointValue = 4;
                element.value = 4;
                element.trendIcon = 'dynamic';

                return Promise.resolve()
                    .then(() => {
                        const dynamicIcon = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-dynamic-icon-sign"]'
                        );
                        const icon = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-icon-sign"]'
                        );
                        expect(icon).toBeFalsy();
                        expect(dynamicIcon).toBeTruthy();
                        expect(dynamicIcon.option).toBe('neutral');
                        expect(dynamicIcon.alternativeText).toBe('neutral');

                        element.trendIcon = 'arrow';
                    })
                    .then(() => {
                        const dynamicIcon = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-dynamic-icon-sign"]'
                        );
                        const altText = element.shadowRoot.querySelector(
                            '[data-element-id="span-icon-assistive-text"]'
                        );
                        const icon = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-icon-sign"]'
                        );
                        expect(dynamicIcon).toBeFalsy();
                        expect(icon).toBeTruthy();
                        expect(icon.iconName).toBe('utility:forward');
                        expect(altText.textContent).toBe(
                            'Trend direction: neutral'
                        );

                        element.trendIcon = 'caret';
                    })
                    .then(() => {
                        const dynamicIcon = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-dynamic-icon-sign"]'
                        );
                        const altText = element.shadowRoot.querySelector(
                            '[data-element-id="span-icon-assistive-text"]'
                        );
                        const icon = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-icon-sign"]'
                        );
                        expect(dynamicIcon).toBeFalsy();
                        expect(icon).toBeTruthy();
                        expect(icon.iconName).toBe('utility:right');
                        expect(altText.textContent).toBe(
                            'Trend direction: neutral'
                        );
                    });
            });

            it('Passed to the component when trending up', () => {
                element.trendBreakpointValue = -10;
                element.value = -4;
                element.trendIcon = 'dynamic';

                return Promise.resolve()
                    .then(() => {
                        const dynamicIcon = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-dynamic-icon-sign"]'
                        );
                        const icon = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-icon-sign"]'
                        );
                        expect(icon).toBeFalsy();
                        expect(dynamicIcon).toBeTruthy();
                        expect(dynamicIcon.option).toBe('up');
                        expect(dynamicIcon.alternativeText).toBe('up');

                        element.trendIcon = 'arrow';
                    })
                    .then(() => {
                        const dynamicIcon = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-dynamic-icon-sign"]'
                        );
                        const altText = element.shadowRoot.querySelector(
                            '[data-element-id="span-icon-assistive-text"]'
                        );
                        const icon = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-icon-sign"]'
                        );
                        expect(dynamicIcon).toBeFalsy();
                        expect(icon).toBeTruthy();
                        expect(icon.iconName).toBe('utility:arrowup');
                        expect(altText.textContent).toBe('Trend direction: up');

                        element.trendIcon = 'caret';
                    })
                    .then(() => {
                        const dynamicIcon = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-dynamic-icon-sign"]'
                        );
                        const altText = element.shadowRoot.querySelector(
                            '[data-element-id="span-icon-assistive-text"]'
                        );
                        const icon = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-icon-sign"]'
                        );
                        expect(dynamicIcon).toBeFalsy();
                        expect(icon).toBeTruthy();
                        expect(icon.iconName).toBe('utility:up');
                        expect(altText.textContent).toBe('Trend direction: up');
                    });
            });
        });

        describe('value', () => {
            it('Passed to the component', () => {
                element.value = 30;

                return Promise.resolve().then(() => {
                    const number = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-number"]'
                    );
                    expect(number.value).toBe(30);
                });
            });

            it('Passed to the component when no value', () => {
                element.value = null;

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector(
                        '[data-element-id="div-wrapper"]'
                    );
                    const emptyValue = element.shadowRoot.querySelector(
                        '[data-element-id="empty-value"]'
                    );
                    const number = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-number"]'
                    );
                    expect(wrapper).toBeTruthy();
                    expect(emptyValue).toBeTruthy();
                    expect(number).toBeFalsy();
                });
            });
        });

        describe('valueSign', () => {
            it('Passed to the component when valueSign = negative', () => {
                element.value = 30;
                element.valueSign = 'negative';

                return Promise.resolve()
                    .then(() => {
                        const number = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-formatted-number"]'
                        );
                        const sign = element.shadowRoot.querySelector(
                            '[data-element-id="span-math-sign"]'
                        );
                        expect(number.value).toBe(30);
                        expect(sign).toBeFalsy();

                        element.value = -3;
                    })
                    .then(() => {
                        const number = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-formatted-number"]'
                        );
                        const sign = element.shadowRoot.querySelector(
                            '[data-element-id="span-math-sign"]'
                        );
                        expect(number.value).toBe(3);
                        expect(sign.textContent).toBe('- ');
                    });
            });

            it('Passed to the component when valueSign = positive-and-negative', () => {
                element.value = 30;
                element.valueSign = 'positive-and-negative';

                return Promise.resolve()
                    .then(() => {
                        const number = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-formatted-number"]'
                        );
                        const sign = element.shadowRoot.querySelector(
                            '[data-element-id="span-math-sign"]'
                        );
                        expect(number.value).toBe(30);
                        expect(sign.textContent).toBe('+ ');

                        element.value = -3;
                    })
                    .then(() => {
                        const number = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-formatted-number"]'
                        );
                        const sign = element.shadowRoot.querySelector(
                            '[data-element-id="span-math-sign"]'
                        );
                        expect(number.value).toBe(3);
                        expect(sign.textContent).toBe('- ');
                    });
            });

            it('Passed to the component when valueSign = none', () => {
                element.value = 30;
                element.valueSign = 'none';

                return Promise.resolve()
                    .then(() => {
                        const number = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-formatted-number"]'
                        );
                        const sign = element.shadowRoot.querySelector(
                            '[data-element-id="span-math-sign"]'
                        );
                        expect(number.value).toBe(30);
                        expect(sign).toBeFalsy();

                        element.value = -3;
                    })
                    .then(() => {
                        const number = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-formatted-number"]'
                        );
                        const sign = element.shadowRoot.querySelector(
                            '[data-element-id="span-math-sign"]'
                        );
                        expect(number.value).toBe(3);
                        expect(sign).toBeFalsy();
                    });
            });
        });
    });
});
