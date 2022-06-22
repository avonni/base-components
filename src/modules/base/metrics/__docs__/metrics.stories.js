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
        align: {
            control: {
                type: 'select'
            },
            options: ['left', 'center', 'right'],
            description:
                'The horizontal alignment of the statistic. Valid values include center, left or right.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'left' }
            }
        },
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
        enableTrend: {
            name: 'enable-trend',
            control: {
                type: 'boolean'
            },
            description:
                'Whether to display the primary value with a positive or negative trend color.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false }
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
        positiveTrend: {
            name: 'positive-trend',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the primary value will be considered a positive trend.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
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
        secondaryEnableTrend: {
            name: 'seconday-enable-trend',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the secondary value will be displayed with a positive or negative trend color.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false }
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
        secondaryPositiveTrend: {
            name: 'secondary-positive-trend',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the secondary value will be considered a positive trend.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
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
        secondarySignDisplay: {
            name: 'secondary-sign-display',
            control: {
                type: 'select'
            },
            options: ['auto', 'exceptZero', 'trendArrows'],
            description:
                'Valid values include auto, exceptZero and trendArrows.',
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
        signDisplay: {
            name: 'sign-display',
            control: {
                type: 'select'
            },
            options: ['auto', 'exceptZero', 'trendArrows'],
            description:
                'Valid values include auto, exceptZero and trendArrows.',
            table: {
                type: { summary: 'string' }
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
        }
    },
    args: {
        align: 'left',
        currencyDisplayAs: 'symbol',
        enableTrend: false,
        formatStyle: 'decimal',
        positiveTrend: false,
        secondaryCurrencyDisplayAs: 'symbol',
        secondaryEnableTrend: false,
        secondaryFormatStyle: 'decimal',
        secondaryPositiveTrend: false,
        secondarySignDisplay: 'auto',
        signDisplay: 'auto',
        value: 0
    }
};

const Template = (args) => Metrics(args);

export const Base = Template.bind({});
Base.args = {
    value: 7552.8
};

export const SupportingTexts = Template.bind({});
SupportingTexts.args = {
    description: 'Since last month',
    label: 'Gross volume',
    minimumFractionDigits: 2,
    prefix: 'Prefix',
    suffix: 'Suffix',
    value: 7552.8
};

export const AvatarAndSecondaryTrendUp = Template.bind({});
AvatarAndSecondaryTrendUp.args = {
    avatar: {
        fallbackIconName: 'standard:customers',
        size: 'large'
    },
    label: 'Total Subscribers',
    secondaryFormatStyle: 'percent',
    secondaryEnableTrend: true,
    secondaryPositiveTrend: true,
    secondaryValue: 122,
    value: 71897
};
