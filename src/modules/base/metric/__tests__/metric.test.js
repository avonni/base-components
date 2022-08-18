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
import Metric from '../metric';
import { Tooltip } from 'c/tooltipLibrary';

jest.mock('c/tooltipLibrary');

let element;
describe('Metric', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('avonni-metric', {
            is: Metric
        });
        document.body.appendChild(element);

        Tooltip.mockClear();
    });

    it('Metric: Default attributes', () => {
        expect(element.avatar).toBeUndefined();
        expect(element.currencyCode).toBeUndefined();
        expect(element.currencyDisplayAs).toBe('symbol');
        expect(element.description).toBeUndefined();
        expect(element.formatStyle).toBe('decimal');
        expect(element.label).toBeUndefined();
        expect(element.maximumFractionDigits).toBeUndefined();
        expect(element.maximumSignificantDigits).toBeUndefined();
        expect(element.minimumFractionDigits).toBeUndefined();
        expect(element.minimumIntegerDigits).toBeUndefined();
        expect(element.minimumSignificantDigits).toBeUndefined();
        expect(element.prefix).toBeUndefined();
        expect(element.secondaryCurrencyCode).toBeUndefined();
        expect(element.secondaryCurrencyDisplayAs).toBe('symbol');
        expect(element.secondaryFormatStyle).toBe('decimal');
        expect(element.secondaryMaximumFractionDigits).toBeUndefined();
        expect(element.secondaryMaximumSignificantDigits).toBeUndefined();
        expect(element.secondaryMinimumFractionDigits).toBeUndefined();
        expect(element.secondaryMinimumIntegerDigits).toBeUndefined();
        expect(element.secondaryMinimumSignificantDigits).toBeUndefined();
        expect(element.secondaryPrefix).toBeUndefined();
        expect(element.secondarySuffix).toBeUndefined();
        expect(element.secondaryShowTrendColor).toBeFalsy();
        expect(element.secondaryTrendBreakpointValue).toBe(0);
        expect(element.secondaryTrendIcon).toBeUndefined();
        expect(element.secondaryValue).toBeUndefined();
        expect(element.secondaryValueSign).toBe('negative');
        expect(element.showTrendColor).toBeFalsy();
        expect(element.suffix).toBeUndefined();
        expect(element.tooltip).toBeUndefined();
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

    // avatar
    it('Metric: avatar', () => {
        const avatar = {
            alternativeText: 'Avonni components',
            fallbackIconName: 'standard:user',
            initials: 'AC',
            size: 'x-small',
            src: 'https://www.avonnicomponents.com/assets/images/logo.svg',
            variant: 'circle'
        };

        element.avatar = avatar;
        return Promise.resolve().then(() => {
            const avatarElement = element.shadowRoot.querySelector(
                '[data-element-id="avonni-avatar"]'
            );
            expect(avatarElement.alternativeText).toBe(avatar.alternativeText);
            expect(avatarElement.fallbackIconName).toBe(
                avatar.fallbackIconName
            );
            expect(avatarElement.initials).toBe(avatar.initials);
            expect(avatarElement.size).toBe(avatar.size);
            expect(avatarElement.src).toBe(avatar.src);
            expect(avatarElement.variant).toBe(avatar.variant);
            expect(avatarElement.className).toBe('slds-m-right_x-small');
        });
    });

    it('Metric: avatar, top position', () => {
        element.avatar = {
            position: 'top'
        };
        return Promise.resolve().then(() => {
            const avatarElement = element.shadowRoot.querySelector(
                '[data-element-id="avonni-avatar"]'
            );
            expect(avatarElement.className).toBe(
                'slds-m-bottom_x-small slds-size_1-of-1'
            );
        });
    });

    it('Metric: avatar, bottom position', () => {
        element.avatar = {
            position: 'bottom'
        };
        return Promise.resolve().then(() => {
            const avatarElement = element.shadowRoot.querySelector(
                '[data-element-id="avonni-avatar"]'
            );
            expect(avatarElement.className).toBe(
                'slds-m-top_x-small avonni-metric__avatar_after-text slds-size_1-of-1'
            );
        });
    });

    it('Metric: avatar, right position', () => {
        element.avatar = {
            position: 'right'
        };
        return Promise.resolve().then(() => {
            const avatarElement = element.shadowRoot.querySelector(
                '[data-element-id="avonni-avatar"]'
            );
            expect(avatarElement.className).toBe(
                'avonni-metric__avatar_after-text slds-m-left_x-small'
            );
        });
    });

    // currency-code
    it('Metric: currencyCode', () => {
        element.currencyCode = 'CAD';

        return Promise.resolve().then(() => {
            const metric = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-metric-primary"]'
            );
            expect(metric.currencyCode).toBe('CAD');
        });
    });

    // currency-display-as
    it('Metric: currencyDisplayAs', () => {
        element.currencyDisplayAs = 'code';

        return Promise.resolve().then(() => {
            const metric = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-metric-primary"]'
            );
            expect(metric.currencyDisplayAs).toBe('code');
        });
    });

    // description
    it('Metric: description', () => {
        element.description = 'some description';

        return Promise.resolve().then(() => {
            const description = element.shadowRoot.querySelector(
                '[data-element-id="div-description"]'
            );
            expect(description.textContent).toBe('some description');
        });
    });

    // format-style
    it('Metric: formatStyle', () => {
        element.formatStyle = 'percent';

        return Promise.resolve().then(() => {
            const metric = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-metric-primary"]'
            );
            expect(metric.formatStyle).toBe('percent');
        });
    });

    // label
    it('Metric: label', () => {
        element.label = 'some label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '[data-element-id="div-label"]'
            );
            expect(label.textContent).toBe('some label');
        });
    });

    // maximum-fraction-digits
    it('Metric: maximumFractionDigits', () => {
        element.maximumFractionDigits = 3;

        return Promise.resolve().then(() => {
            const metric = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-metric-primary"]'
            );
            expect(metric.maximumFractionDigits).toBe(3);
        });
    });

    // maximum-significant-digits
    it('Metric: maximumSignificantDigits', () => {
        element.maximumSignificantDigits = 3;

        return Promise.resolve().then(() => {
            const metric = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-metric-primary"]'
            );
            expect(metric.maximumSignificantDigits).toBe(3);
        });
    });

    // minimum-fraction-digits
    it('Metric: minimumFractionDigits', () => {
        element.minimumFractionDigits = 3;

        return Promise.resolve().then(() => {
            const metric = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-metric-primary"]'
            );
            expect(metric.minimumFractionDigits).toBe(3);
        });
    });

    // minimum-integer-digits
    it('Metric: minimumIntegerDigits', () => {
        element.minimumIntegerDigits = 3;

        return Promise.resolve().then(() => {
            const metric = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-metric-primary"]'
            );
            expect(metric.minimumIntegerDigits).toBe(3);
        });
    });

    // minimum-significant-digits
    it('Metric: minimumSignificantDigits', () => {
        element.minimumSignificantDigits = 3;

        return Promise.resolve().then(() => {
            const metric = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-metric-primary"]'
            );
            expect(metric.minimumSignificantDigits).toBe(3);
        });
    });

    // prefix
    it('Metric: prefix', () => {
        element.prefix = 'some prefix';

        return Promise.resolve().then(() => {
            const metric = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-metric-primary"]'
            );
            expect(metric.prefix).toBe('some prefix');
        });
    });

    // secondary-currency-code
    it('Metric: secondaryCurrencyCode', () => {
        element.secondaryCurrencyCode = 'CAD';
        element.secondaryValue = 16;

        return Promise.resolve().then(() => {
            const metric = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-metric-secondary"]'
            );
            expect(metric.currencyCode).toBe('CAD');
        });
    });

    // secondary-currency-display-as
    it('Metric: secondaryCurrencyDisplayAs', () => {
        element.secondaryCurrencyDisplayAs = 'code';
        element.secondaryValue = 16;

        return Promise.resolve().then(() => {
            const metric = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-metric-secondary"]'
            );
            expect(metric.currencyDisplayAs).toBe('code');
        });
    });

    // secondary-format-style
    it('Metric: secondaryFormatStyle', () => {
        element.secondaryFormatStyle = 'percent';
        element.secondaryValue = 16;

        return Promise.resolve().then(() => {
            const metric = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-metric-secondary"]'
            );
            expect(metric.formatStyle).toBe('percent');
        });
    });

    // secondary-maximum-fraction-digits
    it('Metric: secondaryMaximumFractionDigits', () => {
        element.secondaryMaximumFractionDigits = 3;
        element.secondaryValue = 16;

        return Promise.resolve().then(() => {
            const metric = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-metric-secondary"]'
            );
            expect(metric.maximumFractionDigits).toBe(3);
        });
    });

    // secondary-maximum-significant-digits
    it('Metric: secondaryMaximumSignificantDigits', () => {
        element.secondaryMaximumSignificantDigits = 3;
        element.secondaryValue = 16;

        return Promise.resolve().then(() => {
            const metric = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-metric-secondary"]'
            );
            expect(metric.maximumSignificantDigits).toBe(3);
        });
    });

    // secondary-minimum-fraction-digits
    it('Metric: secondaryMinimumFractionDigits', () => {
        element.secondaryMinimumFractionDigits = 3;
        element.secondaryValue = 16;

        return Promise.resolve().then(() => {
            const metric = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-metric-secondary"]'
            );
            expect(metric.minimumFractionDigits).toBe(3);
        });
    });

    // secondary-minimum-integer-digits
    it('Metric: secondaryMinimumIntegerDigits', () => {
        element.secondaryMinimumIntegerDigits = 3;
        element.secondaryValue = 16;

        return Promise.resolve().then(() => {
            const metric = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-metric-secondary"]'
            );
            expect(metric.minimumIntegerDigits).toBe(3);
        });
    });

    // secondary-minimum-significant-digits
    it('Metric: secondaryMinimumSignificantDigits', () => {
        element.secondaryMinimumSignificantDigits = 3;
        element.secondaryValue = 16;

        return Promise.resolve().then(() => {
            const metric = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-metric-secondary"]'
            );
            expect(metric.minimumSignificantDigits).toBe(3);
        });
    });

    // secondary-prefix
    it('Metric: secondaryPrefix', () => {
        element.secondaryPrefix = 'prefix';
        element.secondaryValue = 16;

        return Promise.resolve().then(() => {
            const metric = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-metric-secondary"]'
            );
            expect(metric.prefix).toBe('prefix');
        });
    });

    // secondary-suffix
    it('Metric: secondarySuffix', () => {
        element.secondarySuffix = 'suffix';
        element.secondaryValue = 16;

        return Promise.resolve().then(() => {
            const metric = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-metric-secondary"]'
            );
            expect(metric.suffix).toBe('suffix');
        });
    });

    // secondary-show-trend-color and secondary-trend-breakpoint-value
    it('Metric: secondaryShowTrendColor = false', () => {
        element.secondaryShowTrendColor = false;
        element.secondaryTrendBreakpointValue = 10;
        element.secondaryValue = 16;

        return Promise.resolve().then(() => {
            const metric = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-metric-secondary"]'
            );
            expect(metric.className).toBe('avonni-metric__secondary');
        });
    });

    it('Metric: secondaryShowTrendColor and secondaryTrendBreakPointValue', () => {
        element.secondaryShowTrendColor = true;
        element.secondaryTrendBreakpointValue = 10;
        element.secondaryValue = 16;

        return Promise.resolve()
            .then(() => {
                // Trending up
                const metric = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-metric-secondary"]'
                );
                expect(metric.className).toBe(
                    'avonni-metric__secondary avonni-metric__secondary_positive-trend'
                );

                element.secondaryValue = 8;
            })
            .then(() => {
                // Trending down
                const metric = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-metric-secondary"]'
                );
                expect(metric.className).toBe(
                    'avonni-metric__secondary avonni-metric__secondary_negative-trend'
                );

                element.secondaryValue = 10;
            })
            .then(() => {
                // Neutral trending
                const metric = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-metric-secondary"]'
                );
                expect(metric.className).toBe(
                    'avonni-metric__secondary avonni-metric__secondary_neutral-trend'
                );
            });
    });

    // secondary-trend-icon
    it('Metric: secondaryTrendIcon', () => {
        element.secondaryTrendIcon = 'dynamic';
        element.secondaryValue = 16;

        return Promise.resolve().then(() => {
            const metric = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-metric-secondary"]'
            );
            expect(metric.trendIcon).toBe('dynamic');
        });
    });

    // secondary-value
    it('Metric: secondaryValue', () => {
        element.secondaryValue = 16;

        return Promise.resolve().then(() => {
            const metric = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-metric-secondary"]'
            );
            expect(metric.value).toBe(16);
        });
    });

    // secondary-value-sign
    it('Metric: secondaryValueSign', () => {
        element.secondaryValueSign = 'positive-and-negative';
        element.secondaryValue = 16;

        return Promise.resolve().then(() => {
            const metric = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-metric-secondary"]'
            );
            expect(metric.valueSign).toBe('positive-and-negative');
        });
    });

    // show-trend-color and trend-breakpoint-value
    it('Metric: showTrendColor = false', () => {
        element.showTrendColor = false;
        element.trendBreakpointValue = 10;
        element.value = 16;

        return Promise.resolve().then(() => {
            const metric = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-metric-primary"]'
            );
            expect(metric.className).toBe('avonni-metric__primary');
        });
    });

    it('Metric: showTrendColor and trendBreakpointValue', () => {
        element.showTrendColor = true;
        element.trendBreakpointValue = 10;
        element.value = 16;

        return Promise.resolve()
            .then(() => {
                // Trending up
                const metric = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-metric-primary"]'
                );
                expect(metric.className).toBe(
                    'avonni-metric__primary avonni-metric__primary_positive-trend'
                );

                element.value = 8;
            })
            .then(() => {
                // Trending down
                const metric = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-metric-primary"]'
                );
                expect(metric.className).toBe(
                    'avonni-metric__primary avonni-metric__primary_negative-trend'
                );

                element.value = 10;
            })
            .then(() => {
                // Neutral trending
                const metric = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-metric-primary"]'
                );
                expect(metric.className).toBe(
                    'avonni-metric__primary avonni-metric__primary_neutral-trend'
                );
            });
    });

    // suffix
    it('Metric: suffix', () => {
        element.suffix = 'some suffix';

        return Promise.resolve().then(() => {
            const metric = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-metric-primary"]'
            );
            expect(metric.suffix).toBe('some suffix');
        });
    });

    // tooltip
    it('Metric: tooltip', () => {
        element.tooltip = 'some tooltip';
        expect(Tooltip).toHaveBeenCalled();
        expect(Tooltip.mock.calls[0][0]).toBe('some tooltip');

        const instance = Tooltip.mock.instances[0];
        expect(instance.initialize).toHaveBeenCalled();
    });

    // trend-icon
    it('Metric: trendIcon', () => {
        element.trendIcon = 'dynamic';

        return Promise.resolve().then(() => {
            const metric = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-metric-primary"]'
            );
            expect(metric.trendIcon).toBe('dynamic');
        });
    });

    // value
    it('Metric: value', () => {
        element.value = 3;

        return Promise.resolve().then(() => {
            const metric = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-metric-primary"]'
            );
            expect(metric.value).toBe(3);
        });
    });

    // value-sign
    it('Metric: valueSign', () => {
        element.valueSign = 'positive-and-negative';

        return Promise.resolve().then(() => {
            const metric = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-metric-primary"]'
            );
            expect(metric.valueSign).toBe('positive-and-negative');
        });
    });
});
