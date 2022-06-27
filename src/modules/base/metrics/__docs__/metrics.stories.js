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

import { Metrics } from '../__examples__/metrics';

export default {
    title: 'Example/Metrics',
    argTypes: {
        avatar: {
            control: {
                type: 'object'
            },
            description:
                'Avatar object. If present, the avatar is displayed to the left of the item.',
            table: {
                type: { summary: 'object' }
            }
        },
        currencyCode: {
            name: 'currency-code',
            control: {
                type: 'text'
            },
            description:
                "Only used if format-style='currency', this attribute determines which currency is displayed. Possible values are the ISO 4217 currency codes, such as 'USD' for the US dollar.",
            table: {
                type: { summary: 'string' }
            }
        },
        currencyDisplayAs: {
            name: 'currency-display-as',
            control: {
                type: 'select'
            },
            options: ['symbol', 'code', 'name'],
            description:
                'Determines how currency is displayed. Possible values are symbol, code, and name. This value defaults to symbol.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'symbol' }
            }
        },
        description: {
            control: {
                type: 'text'
            },
            description: 'Additional text to display below the label.',
            table: {
                type: { summary: 'string' }
            }
        },
        formatStyle: {
            name: 'format-style',
            control: {
                type: 'select'
            },
            options: ['decimal', 'percent', 'percent-fixed', 'currency'],
            description:
                'The number formatting style to use. Possible values are decimal, currency, percent, and percent-fixed. This value defaults to decimal.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'decimal' }
            }
        },
        label: {
            control: {
                type: 'text'
            },
            description:
                'Label of the statistic. If present, it will be displayed on top of the data.',
            table: {
                type: { summary: 'string' }
            }
        },
        maximumFractionDigits: {
            name: 'maximum-fraction-digits',
            control: {
                type: 'number'
            },
            description:
                'The maximum number of fraction digits that are allowed.',
            table: {
                type: { summary: 'number' }
            }
        },
        maximumSignificantDigits: {
            name: 'maximum-significant-digits',
            control: {
                type: 'number'
            },
            description:
                'The maximum number of significant digits that are allowed. Possible values are from 1 to 21.',
            table: {
                type: { summary: 'number' }
            }
        },
        minimumFractionDigits: {
            name: 'minimum-fraction-digits',
            control: {
                type: 'number'
            },
            description:
                'The minimum number of fraction digits that are required.',
            table: {
                type: { summary: 'number' }
            }
        },
        minimumIntegerDigits: {
            name: 'minimum-integer-digits',
            control: {
                type: 'number'
            },
            description:
                'The minimum number of integer digits that are required. Possible values are from 1 to 21.',
            table: {
                type: { summary: 'number' }
            }
        },
        minimumSignificantDigits: {
            name: 'minimum-significant-digits',
            control: {
                type: 'number'
            },
            description:
                'The minimum number of significant digits that are required. Possible values are from 1 to 21.',
            table: {
                type: { summary: 'number' }
            }
        },
        prefix: {
            control: {
                type: 'text'
            },
            description: 'Text to display before the primary value',
            table: {
                type: { summary: 'string' }
            }
        },
        secondaryCurrencyCode: {
            name: 'secondary-currency-code',
            control: {
                type: 'text'
            },
            description:
                "Only used if format-style='currency', this attribute determines which currency is displayed. Possible values are the ISO 4217 currency codes, such as 'USD' for the US dollar.",
            table: {
                type: { summary: 'string' }
            }
        },
        secondaryCurrencyDisplayAs: {
            name: 'secondary-currency-display-as',
            control: {
                type: 'select'
            },
            options: ['symbol', 'code', 'name'],
            description:
                'Determines how currency is displayed. Possible values are symbol, code, and name. This value defaults to symbol.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'symbol' }
            }
        },
        secondaryFormatStyle: {
            name: 'secondary-format-style',
            control: {
                type: 'select'
            },
            options: ['decimal', 'percent', 'percent-fixed', 'currency'],
            description:
                'The formatting style to use for the secondary value. Possible values are decimal, currency, percent, and percent-fixed. This value defaults to decimal.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'decimal' }
            }
        },
        secondaryMaximumFractionDigits: {
            name: 'secondary-maximum-fraction-digits',
            control: {
                type: 'number'
            },
            description:
                'The maximum number of fraction digits that are allowed.',
            table: {
                type: { summary: 'number' }
            }
        },
        secondaryMaximumSignificantDigits: {
            name: 'secondary-maximum-significant-digits',
            control: {
                type: 'number'
            },
            description:
                'The maximum number of significant digits that are allowed. Possible values are from 1 to 21.',
            table: {
                type: { summary: 'number' }
            }
        },
        secondaryMinimumFractionDigits: {
            name: 'secondary-minimum-fraction-digits',
            control: {
                type: 'number'
            },
            description:
                'The minimum number of fraction digits that are required.',
            table: {
                type: { summary: 'number' }
            }
        },
        secondaryMinimumIntegerDigits: {
            name: 'secondary-minimum-integer-digits',
            control: {
                type: 'number'
            },
            description:
                'The minimum number of integer digits that are required. Possible values are from 1 to 21.',
            table: {
                type: { summary: 'number' }
            }
        },
        secondaryMinimumSignificantDigits: {
            name: 'secondary-minimum-significant-digits',
            control: {
                type: 'number'
            },
            description:
                'The minimum number of significant digits that are required. Possible values are from 1 to 21.',
            table: {
                type: { summary: 'number' }
            }
        },
        secondaryPrefix: {
            name: 'secondary-prefix',
            control: {
                type: 'text'
            },
            description: 'Text to display before the secondary value.',
            table: {
                type: { summary: 'string' }
            }
        },
        secondarySuffix: {
            name: 'secondary-suffix',
            control: {
                type: 'text'
            },
            description: 'Text to display after the secondary value.',
            table: {
                type: { summary: 'string' }
            }
        },
        secondaryTrendColorBreakpointValue: {
            name: 'seconday-trend-color-breakpoint-value',
            control: {
                type: 'number'
            },
            description:
                'Number at which the secondary value will be considered neutral. \nIf the secondary value is equal to, or greater than the breakpoint, it will be displayed with a positive color. If the secondary value is lesser than the breakpoint, it will be displayed with a negative color.',
            table: {
                type: { summary: 'number' }
            }
        },
        secondaryValue: {
            name: 'secondary-value',
            control: {
                type: 'number'
            },
            description:
                'If present, a secondary number will be displayed to the right of the primary one.',
            table: {
                type: { summary: 'number' }
            }
        },
        secondaryValueSign: {
            name: 'secondary-value-sign',
            control: {
                type: 'select'
            },
            options: [
                'arrow',
                'auto',
                'caret',
                'dynamic-icon',
                'minus-and-plus'
            ],
            description:
                'Determine which sign to display before the secondary value, to indicate if it is positive or negative. \nValid values include arrow, auto, caret, dynamic-icon and minus-and-plus.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'auto' }
            }
        },
        suffix: {
            control: {
                type: 'text'
            },
            description: 'Text to display after the primary value.',
            table: {
                type: { summary: 'string' }
            }
        },
        tooltip: {
            control: {
                type: 'text'
            },
            description: 'Text to display when the user mouses over.',
            table: {
                type: { summary: 'string' }
            }
        },
        trendColorBreakpointValue: {
            name: 'trend-color-breakpoint-value',
            control: {
                type: 'number'
            },
            description:
                'Number at which the value will be considered neutral. \nIf the value is equal to, or greater than the breakpoint, it will be displayed with a positive color. If the value is lesser than the breakpoint, it will be displayed with a negative color.',
            table: {
                type: { summary: 'number' }
            }
        },
        value: {
            control: {
                type: 'number'
            },
            description: 'Value of the statistic.',
            required: true,
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '0' }
            }
        },
        valueSign: {
            name: 'value-sign',
            control: {
                type: 'select'
            },
            options: [
                'arrow',
                'auto',
                'caret',
                'dynamic-icon',
                'minus-and-plus'
            ],
            description:
                'Determine which sign to display before the value, to indicate if it is positive or negative. \nValid values include arrow, auto, caret, dynamic-icon and minus-and-plus.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'auto' }
            }
        }
    },
    args: {
        currencyDisplayAs: 'symbol',
        formatStyle: 'decimal',
        secondaryCurrencyDisplayAs: 'symbol',
        secondaryFormatStyle: 'decimal',
        secondaryValueSign: 'auto',
        value: 0,
        valueSign: 'auto'
    }
};

const Template = (args) => Metrics(args);

export const Base = Template.bind({});
Base.args = {
    value: 7552.8
};

export const LabelAndDescription = Template.bind({});
LabelAndDescription.args = {
    description: 'Since last month',
    label: 'Gross volume',
    minimumFractionDigits: 2,
    value: 7552.8,
    formatStyle: 'currency',
    avatar: {
        fallbackIconName: 'standard:lightning_usage',
        position: 'top'
    }
};

export const PrefixAndSuffix = Template.bind({});
PrefixAndSuffix.args = {
    suffix: 'incl. taxes',
    prefix: 'Total of',
    minimumFractionDigits: 2,
    value: 8.6,
    currencyCode: 'CAD',
    formatStyle: 'currency',
    tooltip: 'Canadian dollars'
};

export const TrendDown = Template.bind({});
TrendDown.args = {
    value: -14,
    trendColorBreakpointValue: 0,
    formatStyle: 'percent-fixed',
    valueSign: 'caret',
    suffix: 'overall',
    secondarySuffix: 'this month',
    secondaryMinimumFractionDigits: 1,
    secondaryValue: 8.6,
    secondaryValueSign: 'minus-and-plus',
    secondaryFormatStyle: 'percent-fixed'
};

export const SecondaryTrendUp = Template.bind({});
SecondaryTrendUp.args = {
    avatar: {
        fallbackIconName: 'standard:customers',
        size: 'large'
    },
    label: 'Total Subscribers',
    secondaryValueSign: 'dynamic-icon',
    secondaryTrendColorBreakpointValue: 10,
    secondaryValue: 122,
    value: 71897
};
