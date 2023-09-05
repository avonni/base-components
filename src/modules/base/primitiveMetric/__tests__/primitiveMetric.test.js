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

    it('Primitive Metric: Default attributes', () => {
        expect(element.currencyCode).toBeUndefined();
        expect(element.currencyDisplayAs).toBe('symbol');
        expect(element.formatStyle).toBe('decimal');
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

    /*
     * ------------------------------------------------------------
     *  ATTRIBUTES
     * -------------------------------------------------------------
     */

    // currency-code
    it('Primitive Metric: currencyCode', () => {
        element.currencyCode = 'EUR';
        element.value = 40;

        return Promise.resolve().then(() => {
            const number = element.shadowRoot.querySelector(
                '[data-element-id="lightning-formatted-number"]'
            );
            expect(number.currencyCode).toBe('EUR');
        });
    });

    // currency-display-as
    it('Primitive Metric: currencyDisplayAs', () => {
        element.currencyDisplayAs = 'code';
        element.value = 40;

        return Promise.resolve().then(() => {
            const number = element.shadowRoot.querySelector(
                '[data-element-id="lightning-formatted-number"]'
            );
            expect(number.currencyDisplayAs).toBe('code');
        });
    });

    // format-style
    it('Primitive Metric: formatStyle', () => {
        element.formatStyle = 'percent-fixed';
        element.value = 40;

        return Promise.resolve().then(() => {
            const number = element.shadowRoot.querySelector(
                '[data-element-id="lightning-formatted-number"]'
            );
            expect(number.formatStyle).toBe('percent-fixed');
        });
    });

    // maximum-fraction-digits
    it('Primitive Metric: maximumFractionDigits', () => {
        element.maximumFractionDigits = 2;
        element.value = 40;

        return Promise.resolve().then(() => {
            const number = element.shadowRoot.querySelector(
                '[data-element-id="lightning-formatted-number"]'
            );
            expect(number.maximumFractionDigits).toBe(2);
        });
    });

    // maximum-significant-digits
    it('Primitive Metric: maximumSignificantDigits', () => {
        element.maximumSignificantDigits = 2;
        element.value = 40;

        return Promise.resolve().then(() => {
            const number = element.shadowRoot.querySelector(
                '[data-element-id="lightning-formatted-number"]'
            );
            expect(number.maximumSignificantDigits).toBe(2);
        });
    });

    // minimum-fraction-digits
    it('Primitive Metric: minimumFractionDigits', () => {
        element.minimumFractionDigits = 2;
        element.value = 40;

        return Promise.resolve().then(() => {
            const number = element.shadowRoot.querySelector(
                '[data-element-id="lightning-formatted-number"]'
            );
            expect(number.minimumFractionDigits).toBe(2);
        });
    });

    // minimum-integer-digits
    it('Primitive Metric: minimumIntegerDigits', () => {
        element.minimumIntegerDigits = 2;
        element.value = 40;

        return Promise.resolve().then(() => {
            const number = element.shadowRoot.querySelector(
                '[data-element-id="lightning-formatted-number"]'
            );
            expect(number.minimumIntegerDigits).toBe(2);
        });
    });

    // minimum-significant-digits
    it('Primitive Metric: minimumSignificantDigits', () => {
        element.minimumSignificantDigits = 2;
        element.value = 40;

        return Promise.resolve().then(() => {
            const number = element.shadowRoot.querySelector(
                '[data-element-id="lightning-formatted-number"]'
            );
            expect(number.minimumSignificantDigits).toBe(2);
        });
    });

    // prefix
    it('Primitive Metric: prefix', () => {
        element.prefix = 'some prefix';
        element.value = 40;

        return Promise.resolve().then(() => {
            const prefix = element.shadowRoot.querySelector(
                '[data-element-id="span-prefix"]'
            );
            expect(prefix.textContent).toBe('some prefix ');
        });
    });

    // suffix
    it('Primitive Metric: suffix', () => {
        element.suffix = 'some suffix';
        element.value = 40;

        return Promise.resolve().then(() => {
            const suffix = element.shadowRoot.querySelector(
                '[data-element-id="span-suffix"]'
            );
            expect(suffix.textContent).toBe(' some suffix');
        });
    });

    // trend-breakpoint-value and trend-icon
    it('Primitive Metric: trendBreakpointValue and trendIcon, trending down', () => {
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
                expect(altText.textContent).toBe('Trend direction: down');

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
                expect(altText.textContent).toBe('Trend direction: down');
            });
    });

    it('Primitive Metric: trendBreakpointValue and trendIcon, not trending', () => {
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
                expect(altText.textContent).toBe('Trend direction: neutral');

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
                expect(altText.textContent).toBe('Trend direction: neutral');
            });
    });

    it('Primitive Metric: trendBreakpointValue and trendIcon, trending up', () => {
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

    // value
    it('Primitive Metric: value', () => {
        element.value = 30;

        return Promise.resolve().then(() => {
            const number = element.shadowRoot.querySelector(
                '[data-element-id="lightning-formatted-number"]'
            );
            expect(number.value).toBe(30);
        });
    });

    it('Primitive Metric: no value will hide the primitive', () => {
        element.value = null;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            expect(wrapper).toBeFalsy();
        });
    });

    // value-sign
    it('Primitive Metric: valueSign = negative', () => {
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

    it('Primitive Metric: valueSign = positive-and-negative', () => {
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

    it('Primitive Metric: valueSign = none', () => {
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
