

import { Metric } from '../__examples__/metric';

export default {
    title: 'Example/Metric',
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
        secondaryPosition: {
            name: 'secondary-position',
            control: {
                type: 'select'
            },
            options: ['right', 'left', 'top', 'bottom'],
            description:
                'Position of the secondary value, relative to the value.',
            table: {
                type: { summary: 'string' }
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
        secondaryShowTrendColor: {
            name: 'secondary-show-trend-color',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the secondary value will change color and background depending on the trend direction.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
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
        secondaryTrendBreakpointValue: {
            name: 'seconday-trend-breakpoint-value',
            control: {
                type: 'number'
            },
            description:
                'Number at which the secondary value will be considered neutral. Works in association with `secondary-trend-icon` and `secondary-show-trend-color`.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '0' }
            }
        },
        secondaryTrendIcon: {
            name: 'secondary-trend-icon',
            control: {
                type: 'select'
            },
            options: ['dynamic', 'arrow', 'caret'],
            description:
                'Type of icon indicating the trend direction of the secondary value. Valid values include dynamic, arrow and caret.',
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
        secondaryValueSign: {
            name: 'secondary-value-sign',
            control: {
                type: 'select'
            },
            options: ['negative', 'positive-and-negative', 'none'],
            description:
                'Determine what signs are allowed to be displayed in front of the secondary value, to indicate that it is positive or negative.\nValid values include negative, positive-and-negative or none.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'negative' }
            }
        },
        showTrendColor: {
            name: 'show-trend-color',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the value will change color depending on the trend direction.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
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
        trendBreakpointValue: {
            name: 'trend-breakpoint-value',
            control: {
                type: 'number'
            },
            description:
                'Number at which the value will be considered neutral. Works in association with `trend-icon` and `show-trend-color`.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '0' }
            }
        },
        trendIcon: {
            name: 'trend-icon',
            control: {
                type: 'select'
            },
            options: ['dynamic', 'arrow', 'caret'],
            description:
                'Type of icon indicating the trend direction of the value. Valid values include dynamic, arrow and caret.',
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
                type: { summary: 'number' }
            }
        },
        valueSign: {
            name: 'value-sign',
            control: {
                type: 'select'
            },
            options: ['negative', 'positive-and-negative', 'none'],
            description:
                'Determine what signs are allowed to be displayed in front of the value, to indicate that it is positive or negative. \nValid values include negative, positive-and-negative or none.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'negative' }
            }
        }
    },
    args: {
        currencyDisplayAs: 'symbol',
        formatStyle: 'decimal',
        secondaryCurrencyDisplayAs: 'symbol',
        secondaryFormatStyle: 'decimal',
        secondaryPosition: 'right',
        secondaryShowTrendColor: false,
        secondaryTrendBreakpointValue: 0,
        secondaryValueSign: 'negative',
        showTrendColor: false,
        trendBreakpointValue: 0,
        valueSign: 'negative'
    }
};

const Template = (args) => Metric(args);

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
    formatStyle: 'percent-fixed',
    secondaryFormatStyle: 'percent-fixed',
    secondaryMinimumFractionDigits: 1,
    secondarySuffix: 'this month',
    secondaryValue: 8.6,
    secondaryValueSign: 'positive-and-negative',
    showTrendColor: true,
    suffix: 'overall',
    trendIcon: 'caret',
    value: -14,
    secondaryPosition: 'bottom'
};

export const SecondaryTrendUp = Template.bind({});
SecondaryTrendUp.args = {
    avatar: {
        fallbackIconName: 'standard:customers',
        size: 'large'
    },
    label: 'Total Subscribers',
    secondaryShowTrendColor: true,
    secondaryTrendIcon: 'dynamic',
    secondaryValue: 122,
    value: 71897
};
