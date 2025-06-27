import { Tooltip } from 'c/tooltipLibrary';
import { createElement } from 'lwc';
import Metric from '../metric';

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

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.avatar).toBeUndefined();
            expect(element.currencyCode).toBeUndefined();
            expect(element.currencyDisplayAs).toBe('symbol');
            expect(element.description).toBeUndefined();
            expect(element.formatStyle).toBe('decimal');
            expect(element.label).toBeUndefined();
            expect(element.labelPosition).toBe('top');
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
            expect(element.secondaryPosition).toBe('right');
            expect(element.secondaryPrefix).toBeUndefined();
            expect(element.secondarySuffix).toBeUndefined();
            expect(element.secondaryShowTrendColor).toBeFalsy();
            expect(element.secondaryTrendBreakpointValue).toBe(0);
            expect(element.secondaryTrendIcon).toBeUndefined();
            expect(element.secondaryValue).toBeUndefined();
            expect(element.secondaryValueIsLoading).toBeFalsy();
            expect(element.secondaryValueSign).toBe('negative');
            expect(element.showTrendColor).toBeFalsy();
            expect(element.suffix).toBeUndefined();
            expect(element.tooltip).toBeUndefined();
            expect(element.trendBreakpointValue).toBe(0);
            expect(element.trendIcon).toBeUndefined();
            expect(element.value).toBeUndefined();
            expect(element.valueIsLoading).toBeFalsy();
            expect(element.valueSign).toBe('negative');
        });

        describe('avatar', () => {
            it('Passed to the component', () => {
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
                    expect(avatarElement.alternativeText).toBe(
                        avatar.alternativeText
                    );
                    expect(avatarElement.fallbackIconName).toBe(
                        avatar.fallbackIconName
                    );
                    expect(avatarElement.initials).toBe(avatar.initials);
                    expect(avatarElement.size).toBe(avatar.size);
                    expect(avatarElement.src).toBe(avatar.src);
                    expect(avatarElement.variant).toBe(avatar.variant);
                    expect(avatarElement.className).toContain(
                        'avonni-metric__avatar slds-m-right_x-small'
                    );
                });
            });

            it('top position', () => {
                element.avatar = {
                    position: 'top'
                };
                return Promise.resolve().then(() => {
                    const avatarElement = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-avatar"]'
                    );
                    expect(avatarElement.className).toBe(
                        'avonni-metric__avatar slds-m-bottom_x-small slds-size_1-of-1'
                    );
                });
            });

            it('bottom position', () => {
                element.avatar = {
                    position: 'bottom'
                };
                return Promise.resolve().then(() => {
                    const avatarElement = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-avatar"]'
                    );
                    expect(avatarElement.className).toBe(
                        'avonni-metric__avatar slds-m-top_x-small avonni-metric__avatar_after-text slds-size_1-of-1'
                    );
                });
            });

            it('right position', () => {
                element.avatar = {
                    position: 'right'
                };
                return Promise.resolve().then(() => {
                    const avatarElement = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-avatar"]'
                    );
                    expect(avatarElement.className).toBe(
                        'avonni-metric__avatar avonni-metric__avatar_after-text slds-m-left_x-small'
                    );
                });
            });
        });

        describe('currencyCode', () => {
            it('Passed to the component', () => {
                element.currencyCode = 'CAD';

                return Promise.resolve().then(() => {
                    const metric = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-metric-primary"]'
                    );
                    expect(metric.currencyCode).toBe('CAD');
                });
            });
        });

        describe('currencyDisplayAs', () => {
            it('Passed to the component', () => {
                element.currencyDisplayAs = 'code';

                return Promise.resolve().then(() => {
                    const metric = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-metric-primary"]'
                    );
                    expect(metric.currencyDisplayAs).toBe('code');
                });
            });
        });

        describe('description', () => {
            it('Passed to the component', () => {
                element.description = 'some description';

                return Promise.resolve().then(() => {
                    const description = element.shadowRoot.querySelector(
                        '[data-element-id="div-description"]'
                    );
                    expect(description.textContent).toBe('some description');
                });
            });
        });

        describe('errorMessage', () => {
            it('Passed to the component', () => {
                element.errorMessage = 'some error message';
                return Promise.resolve().then(() => {
                    const errorMessage = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-helptext-error"]'
                    );
                    expect(errorMessage.content).toBe('some error message');
                    expect(errorMessage.iconName).toBe('utility:warning');
                });
            });
        });

        describe('formatStyle', () => {
            it('Passed to the component', () => {
                element.formatStyle = 'percent';

                return Promise.resolve().then(() => {
                    const metric = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-metric-primary"]'
                    );
                    expect(metric.formatStyle).toBe('percent');
                });
            });
        });

        describe('label', () => {
            it('Passed to the component', () => {
                element.label = 'some label';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '[data-element-id="div-label"]'
                    );
                    expect(label.textContent).toBe('some label');
                });
            });
        });

        describe('labelPosition', () => {
            it('top', () => {
                element.labelPosition = 'top';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '[data-element-id="div-label"]'
                    );
                    expect(label.classList).toContain(
                        'avonni-metric__label-top'
                    );
                    expect(label.classList).not.toContain(
                        'avonni-metric__label-bottom'
                    );
                });
            });

            it('bottom', () => {
                element.labelPosition = 'bottom';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '[data-element-id="div-label"]'
                    );
                    expect(label.classList).not.toContain(
                        'avonni-metric__label-top'
                    );
                    expect(label.classList).toContain(
                        'avonni-metric__label-bottom'
                    );
                });
            });
        });

        describe('maximumFractionDigits', () => {
            it('Passed to the component', () => {
                element.maximumFractionDigits = 3;

                return Promise.resolve().then(() => {
                    const metric = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-metric-primary"]'
                    );
                    expect(metric.maximumFractionDigits).toBe(3);
                });
            });
        });
        describe('maximumSignificantDigits', () => {
            it('Passed to the component', () => {
                element.maximumSignificantDigits = 3;

                return Promise.resolve().then(() => {
                    const metric = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-metric-primary"]'
                    );
                    expect(metric.maximumSignificantDigits).toBe(3);
                });
            });
        });

        describe('minimumFractionDigits', () => {
            it('Passed to the component', () => {
                element.minimumFractionDigits = 3;

                return Promise.resolve().then(() => {
                    const metric = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-metric-primary"]'
                    );
                    expect(metric.minimumFractionDigits).toBe(3);
                });
            });
        });

        describe('minimumIntegerDigits', () => {
            it('Passed to the component', () => {
                element.minimumIntegerDigits = 3;

                return Promise.resolve().then(() => {
                    const metric = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-metric-primary"]'
                    );
                    expect(metric.minimumIntegerDigits).toBe(3);
                });
            });
        });

        describe('minimumSignificantDigits', () => {
            it('Passed to the component', () => {
                element.minimumSignificantDigits = 3;

                return Promise.resolve().then(() => {
                    const metric = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-metric-primary"]'
                    );
                    expect(metric.minimumSignificantDigits).toBe(3);
                });
            });
        });

        describe('prefix', () => {
            it('Passed to the component', () => {
                element.prefix = 'some prefix';

                return Promise.resolve().then(() => {
                    const metric = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-metric-primary"]'
                    );
                    expect(metric.prefix).toBe('some prefix');
                });
            });
        });

        describe('secondaryCurrencyCode', () => {
            it('Passed to the component', () => {
                element.secondaryCurrencyCode = 'CAD';
                element.secondaryValue = 16;

                return Promise.resolve().then(() => {
                    const metric = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-metric-secondary"]'
                    );
                    expect(metric.currencyCode).toBe('CAD');
                });
            });
        });

        describe('secondaryCurrencyDisplayAs', () => {
            it('Passed to the component', () => {
                element.secondaryCurrencyDisplayAs = 'code';
                element.secondaryValue = 16;

                return Promise.resolve().then(() => {
                    const metric = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-metric-secondary"]'
                    );
                    expect(metric.currencyDisplayAs).toBe('code');
                });
            });
        });

        describe('secondaryFormatStyle', () => {
            it('Passed to the component', () => {
                element.secondaryFormatStyle = 'percent';
                element.secondaryValue = 16;

                return Promise.resolve().then(() => {
                    const metric = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-metric-secondary"]'
                    );
                    expect(metric.formatStyle).toBe('percent');
                });
            });
        });

        describe('secondaryMaximumFractionDigits', () => {
            it('Passed to the component', () => {
                element.secondaryMaximumFractionDigits = 3;
                element.secondaryValue = 16;

                return Promise.resolve().then(() => {
                    const metric = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-metric-secondary"]'
                    );
                    expect(metric.maximumFractionDigits).toBe(3);
                });
            });
        });

        describe('secondaryMaximumSignificantDigits', () => {
            it('Passed to the component', () => {
                element.secondaryMaximumSignificantDigits = 3;
                element.secondaryValue = 16;

                return Promise.resolve().then(() => {
                    const metric = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-metric-secondary"]'
                    );
                    expect(metric.maximumSignificantDigits).toBe(3);
                });
            });
        });

        describe('secondaryMinimumFractionDigits', () => {
            it('Passed to the component', () => {
                element.secondaryMinimumFractionDigits = 3;
                element.secondaryValue = 16;

                return Promise.resolve().then(() => {
                    const metric = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-metric-secondary"]'
                    );
                    expect(metric.minimumFractionDigits).toBe(3);
                });
            });
        });

        describe('secondaryMinimumIntegerDigits', () => {
            it('Passed to the component', () => {
                element.secondaryMinimumIntegerDigits = 3;
                element.secondaryValue = 16;

                return Promise.resolve().then(() => {
                    const metric = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-metric-secondary"]'
                    );
                    expect(metric.minimumIntegerDigits).toBe(3);
                });
            });
        });

        describe('secondaryMinimumSignificantDigits', () => {
            it('Passed to the component', () => {
                element.secondaryMinimumSignificantDigits = 3;
                element.secondaryValue = 16;

                return Promise.resolve().then(() => {
                    const metric = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-metric-secondary"]'
                    );
                    expect(metric.minimumSignificantDigits).toBe(3);
                });
            });
        });

        describe('secondaryPosition', () => {
            it('right', () => {
                element.secondaryPosition = 'right';
                element.value = 13.6;
                element.secondaryValue = 16;

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector(
                        '[data-element-id="div-metrics"]'
                    );
                    expect(wrapper.className).toBe(
                        'avonni-metric__primary-and-secondary-wrapper slds-grid slds-wrap slds-grid_vertical-align-end'
                    );

                    const primary = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-metric-primary"]'
                    );
                    expect(primary.className).toBe(
                        'avonni-metric__primary slds-show slds-m-right_x-small'
                    );

                    const secondary = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-metric-secondary"]'
                    );
                    expect(secondary.className).toBe(
                        'avonni-metric__secondary slds-show'
                    );
                });
            });

            it('left', () => {
                element.secondaryPosition = 'left';
                element.value = 13.6;
                element.secondaryValue = 16;

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector(
                        '[data-element-id="div-metrics"]'
                    );
                    expect(wrapper.className).toBe(
                        'avonni-metric__primary-and-secondary-wrapper slds-grid slds-wrap slds-grid_vertical-align-end slds-grid_reverse'
                    );

                    const primary = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-metric-primary"]'
                    );
                    expect(primary.className).toBe(
                        'avonni-metric__primary slds-show slds-m-left_x-small'
                    );

                    const secondary = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-metric-secondary"]'
                    );
                    expect(secondary.className).toBe(
                        'avonni-metric__secondary slds-show'
                    );
                });
            });

            it('bottom', () => {
                element.secondaryPosition = 'bottom';
                element.value = 13.6;
                element.secondaryValue = 16;

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector(
                        '[data-element-id="div-metrics"]'
                    );
                    expect(wrapper.className).toBe(
                        'avonni-metric__primary-and-secondary-wrapper'
                    );

                    const primary = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-metric-primary"]'
                    );
                    expect(primary.className).toBe(
                        'avonni-metric__primary slds-show_inline-block'
                    );

                    const secondary = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-metric-secondary"]'
                    );
                    expect(secondary.className).toBe(
                        'avonni-metric__secondary slds-show_inline-block'
                    );
                });
            });

            it('top', () => {
                element.secondaryPosition = 'top';
                element.value = 13.6;
                element.secondaryValue = 16;

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector(
                        '[data-element-id="div-metrics"]'
                    );
                    expect(wrapper.className).toBe(
                        'avonni-metric__primary-and-secondary-wrapper slds-grid slds-wrap slds-grid_vertical-reverse'
                    );

                    const primary = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-metric-primary"]'
                    );
                    expect(primary.className).toBe(
                        'avonni-metric__primary slds-show_inline-block'
                    );

                    const secondary = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-metric-secondary"]'
                    );
                    expect(secondary.className).toBe(
                        'avonni-metric__secondary slds-show_inline-block'
                    );
                });
            });
        });

        describe('secondaryPrefix', () => {
            it('Passed to the component', () => {
                element.secondaryPrefix = 'prefix';
                element.secondaryValue = 16;

                return Promise.resolve().then(() => {
                    const metric = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-metric-secondary"]'
                    );
                    expect(metric.prefix).toBe('prefix');
                });
            });
        });

        describe('secondarySuffix', () => {
            it('Passed to the component', () => {
                element.secondarySuffix = 'suffix';
                element.secondaryValue = 16;

                return Promise.resolve().then(() => {
                    const metric = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-metric-secondary"]'
                    );
                    expect(metric.suffix).toBe('suffix');
                });
            });
        });

        describe('secondaryShowTrendColor', () => {
            it('false', () => {
                element.secondaryShowTrendColor = false;
                element.secondaryTrendBreakpointValue = 10;
                element.secondaryValue = 16;

                return Promise.resolve().then(() => {
                    const metric = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-metric-secondary"]'
                    );
                    expect(metric.className).toBe(
                        'avonni-metric__secondary slds-show'
                    );
                });
            });

            it('true', () => {
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
                            'avonni-metric__secondary slds-show avonni-metric__secondary_positive-trend'
                        );

                        element.secondaryValue = 8;
                    })
                    .then(() => {
                        // Trending down
                        const metric = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-metric-secondary"]'
                        );
                        expect(metric.className).toBe(
                            'avonni-metric__secondary slds-show avonni-metric__secondary_negative-trend'
                        );

                        element.secondaryValue = 10;
                    })
                    .then(() => {
                        // Neutral trending
                        const metric = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-metric-secondary"]'
                        );
                        expect(metric.className).toBe(
                            'avonni-metric__secondary slds-show avonni-metric__secondary_neutral-trend'
                        );
                    });
            });
        });

        describe('secondaryTrendIcon', () => {
            it('Passed to the component', () => {
                element.secondaryTrendIcon = 'dynamic';
                element.secondaryValue = 16;

                return Promise.resolve().then(() => {
                    const metric = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-metric-secondary"]'
                    );
                    expect(metric.trendIcon).toBe('dynamic');
                });
            });
        });

        describe('secondaryValue', () => {
            it('Passed to the component', () => {
                element.secondaryValue = 16;

                return Promise.resolve().then(() => {
                    const metric = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-metric-secondary"]'
                    );
                    expect(metric.value).toBe(16);
                });
            });
        });

        describe('secondaryValueIsLoading', () => {
            it('Passed to the component', () => {
                element.secondaryValue = 16;
                element.secondaryValueIsLoading = true;

                return Promise.resolve().then(() => {
                    const metric = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-metric-secondary"]'
                    );
                    expect(metric.isLoading).toBeTruthy();
                });
            });
        });

        describe('secondaryValueSign', () => {
            it('Passed to the component', () => {
                element.secondaryValueSign = 'positive-and-negative';
                element.secondaryValue = 16;

                return Promise.resolve().then(() => {
                    const metric = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-metric-secondary"]'
                    );
                    expect(metric.valueSign).toBe('positive-and-negative');
                });
            });
        });

        describe('showTrendColor', () => {
            it('false', () => {
                element.showTrendColor = false;
                element.trendBreakpointValue = 10;
                element.value = 16;

                return Promise.resolve().then(() => {
                    const metric = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-metric-primary"]'
                    );
                    expect(metric.className).toBe(
                        'avonni-metric__primary slds-show'
                    );
                });
            });

            it('true', () => {
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
                            'avonni-metric__primary slds-show avonni-metric__primary_positive-trend'
                        );

                        element.value = 8;
                    })
                    .then(() => {
                        // Trending down
                        const metric = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-metric-primary"]'
                        );
                        expect(metric.className).toBe(
                            'avonni-metric__primary slds-show avonni-metric__primary_negative-trend'
                        );

                        element.value = 10;
                    })
                    .then(() => {
                        // Neutral trending
                        const metric = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-metric-primary"]'
                        );
                        expect(metric.className).toBe(
                            'avonni-metric__primary slds-show avonni-metric__primary_neutral-trend'
                        );
                    });
            });
        });

        describe('suffix', () => {
            it('Passed to the component', () => {
                element.suffix = 'some suffix';

                return Promise.resolve().then(() => {
                    const metric = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-metric-primary"]'
                    );
                    expect(metric.suffix).toBe('some suffix');
                });
            });
        });

        describe('tooltip', () => {
            it('Passed to the component', () => {
                element.tooltip = 'some tooltip';
                expect(Tooltip).toHaveBeenCalled();
                expect(Tooltip.mock.calls[0][0]).toBe('some tooltip');

                const instance = Tooltip.mock.instances[0];
                expect(instance.initialize).toHaveBeenCalled();
            });
        });

        describe('trendIcon', () => {
            it('Passed to the component', () => {
                element.trendIcon = 'dynamic';

                return Promise.resolve().then(() => {
                    const metric = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-metric-primary"]'
                    );
                    expect(metric.trendIcon).toBe('dynamic');
                });
            });
        });

        describe('value', () => {
            it('Passed to the component', () => {
                element.value = 3;

                return Promise.resolve().then(() => {
                    const metric = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-metric-primary"]'
                    );
                    expect(metric.value).toBe(3);
                });
            });
        });

        describe('valueIsLoading', () => {
            it('Passed to the component', () => {
                element.value = 3;
                element.valueIsLoading = true;

                return Promise.resolve().then(() => {
                    const metric = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-metric-primary"]'
                    );
                    expect(metric.isLoading).toBeTruthy();
                });
            });
        });

        describe('valueSign', () => {
            it('Passed to the component', () => {
                element.valueSign = 'positive-and-negative';

                return Promise.resolve().then(() => {
                    const metric = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-metric-primary"]'
                    );
                    expect(metric.valueSign).toBe('positive-and-negative');
                });
            });
        });
    });

    describe('Events', () => {
        it('Primary Metric Click', () => {
            element.value = 3;

            const handler = jest.fn();
            element.addEventListener('metricclick', handler);

            return Promise.resolve().then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-metric-primary"]'
                );
                button.click();

                expect(handler).toHaveBeenCalled();
            });
        });

        it('Secondary Metric Click', () => {
            element.secondaryValue = 16;

            const handler = jest.fn();
            element.addEventListener('secondarymetricclick', handler);

            return Promise.resolve().then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-metric-secondary"]'
                );
                button.click();

                expect(handler).toHaveBeenCalled();
            });
        });
    });
});
