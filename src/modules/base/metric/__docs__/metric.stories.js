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
                type: { summary: 'object' },
                category: 'Display'
            }
        },
        value: {
            control: {
                type: 'text'
            },
            description:
                'Value of the primary metric. Can be a number or a date.',
            required: true,
            table: {
                type: { summary: 'string' },
                category: 'Primary Value'
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
                type: { summary: 'string' },
                category: 'Primary Value Number Format'
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
                defaultValue: { summary: 'symbol' },
                category: 'Primary Value Number Format'
            }
        },
        day: {
            control: { type: 'select' },
            options: ['numeric', '2-digit', undefined],
            description: 'How to display the day in date format.',
            table: {
                type: { summary: 'string' },
                category: 'Primary Value Date Format'
            }
        },
        description: {
            control: {
                type: 'text'
            },
            description: 'Additional text to display below the label.',
            table: {
                type: { summary: 'string' },
                category: 'Display'
            }
        },
        era: {
            control: { type: 'select' },
            options: ['short', 'long', undefined],
            description: 'How to display the era in date format.',
            table: {
                type: { summary: 'string' },
                category: 'Primary Value Date Format'
            }
        },
        errorMessage: {
            name: 'error-message',
            control: {
                type: 'text'
            },
            description: 'Error message to display next to the label.',
            table: {
                type: { summary: 'string' },
                category: 'Validation'
            }
        },
        formatStyle: {
            name: 'format-style',
            control: {
                type: 'select'
            },
            options: [
                'currency',
                'date',
                'decimal',
                'percent',
                'percent-fixed'
            ],
            description:
                'The number formatting style to use. Possible values are currency, date, decimal, percent, and percent-fixed. This value defaults to decimal.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'decimal' },
                category: 'Primary Value'
            }
        },
        hour: {
            control: { type: 'select' },
            options: ['numeric', '2-digit', undefined],
            description: 'How to display the hour in date format.',
            table: {
                type: { summary: 'string' },
                category: 'Primary Value Date Format'
            }
        },
        label: {
            control: {
                type: 'text'
            },
            description:
                'Label of the statistic. If present, it will be displayed on top of the data.',
            table: {
                type: { summary: 'string' },
                category: 'Display'
            }
        },
        labelPosition: {
            name: 'label-position',
            control: {
                type: 'select'
            },
            options: ['top', 'bottom'],
            description: 'Position of label.',
            table: {
                type: { summary: 'string' },
                category: 'Display'
            }
        },
        loadingStateAlternativeText: {
            name: 'loading-state-alternative-text',
            control: {
                type: 'text'
            },
            description:
                'Message to display when the metric is in a loading state.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Loading...' },
                category: 'Validation'
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
                type: { summary: 'number' },
                category: 'Primary Value Number Format'
            }
        },
        maximumIntegerDigits: {
            name: 'maximum-integer-digits',
            control: {
                type: 'number'
            },
            description:
                'The maximum number of integer digits that are allowed.',
            table: {
                type: { summary: 'number' },
                category: 'Primary Value Number Format'
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
                type: { summary: 'number' },
                category: 'Primary Value Number Format'
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
                type: { summary: 'number' },
                category: 'Primary Value Number Format'
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
                type: { summary: 'number' },
                category: 'Primary Value Number Format'
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
                type: { summary: 'number' },
                category: 'Primary Value Number Format'
            }
        },
        minute: {
            control: { type: 'select' },
            options: ['numeric', '2-digit', undefined],
            description: 'How to display the minute in date format.',
            table: {
                type: { summary: 'string' },
                category: 'Primary Value Date Format'
            }
        },
        month: {
            control: { type: 'select' },
            options: ['numeric', '2-digit', 'short', 'long', undefined],
            description: 'How to display the month in date format.',
            table: {
                type: { summary: 'string' },
                category: 'Primary Value Date Format'
            }
        },
        prefix: {
            control: {
                type: 'text'
            },
            description: 'Text to display before the primary value',
            table: {
                type: { summary: 'string' },
                category: 'Primary Value'
            }
        },
        secondaryValue: {
            name: 'secondary-value',
            control: {
                type: 'text'
            },
            description:
                'If present, a secondary number or date will be displayed to the right of the primary one.',
            table: {
                type: { summary: 'string' },
                category: 'Secondary Value'
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
                type: { summary: 'string' },
                category: 'Secondary Value Number Format'
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
                defaultValue: { summary: 'symbol' },
                category: 'Secondary Value Number Format'
            }
        },
        secondaryDay: {
            name: 'secondary-day',
            control: { type: 'select' },
            options: ['numeric', '2-digit', undefined],
            description:
                'How to display the day for the secondary value in date format.',
            table: {
                type: { summary: 'string' },
                category: 'Secondary Value Date Format'
            }
        },
        secondaryFormatStyle: {
            name: 'secondary-format-style',
            control: {
                type: 'select'
            },
            options: [
                'currency',
                'date',
                'decimal',
                'percent',
                'percent-fixed'
            ],
            description:
                'The formatting style to use for the secondary value. Possible values are date, decimal, currency, percent and percent-fixed.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'decimal' },
                category: 'Secondary Value'
            }
        },
        secondaryHour: {
            name: 'secondary-hour',
            control: { type: 'select' },
            options: ['numeric', '2-digit', undefined],
            description:
                'How to display the hour for the secondary value in date format.',
            table: {
                type: { summary: 'string' },
                category: 'Secondary Value Date Format'
            }
        },
        secondaryMaximumFractionDigits: {
            name: 'secondary-maximum-fraction-digits',
            control: {
                type: 'number'
            },
            description:
                'The maximum number of fraction digits that are allowed for the secondary value.',
            table: {
                type: { summary: 'number' },
                category: 'Secondary Value Number Format'
            }
        },
        secondaryMaximumSignificantDigits: {
            name: 'secondary-maximum-significant-digits',
            control: {
                type: 'number'
            },
            description:
                'The maximum number of significant digits that are allowed for the secondary value. Possible values are from 1 to 21.',
            table: {
                type: { summary: 'number' },
                category: 'Secondary Value Number Format'
            }
        },
        secondaryMinimumFractionDigits: {
            name: 'secondary-minimum-fraction-digits',
            control: {
                type: 'number'
            },
            description:
                'The minimum number of fraction digits that are required for the secondary value.',
            table: {
                type: { summary: 'number' },
                category: 'Secondary Value Number Format'
            }
        },
        secondaryMinimumIntegerDigits: {
            name: 'secondary-minimum-integer-digits',
            control: {
                type: 'number'
            },
            description:
                'The minimum number of integer digits that are required for the secondary value. Possible values are from 1 to 21.',
            table: {
                type: { summary: 'number' },
                category: 'Secondary Value Number Format'
            }
        },
        secondaryMinimumSignificantDigits: {
            name: 'secondary-minimum-significant-digits',
            control: {
                type: 'number'
            },
            description:
                'The minimum number of significant digits that are required for the secondary value. Possible values are from 1 to 21.',
            table: {
                type: { summary: 'number' },
                category: 'Secondary Value Number Format'
            }
        },
        secondaryMinute: {
            name: 'secondary-minute',
            control: { type: 'select' },
            options: ['numeric', '2-digit', undefined],
            description:
                'How to display the minute for the secondary value in date format.',
            table: {
                type: { summary: 'string' },
                category: 'Secondary Value Date Format'
            }
        },
        secondaryMonth: {
            name: 'secondary-month',
            control: { type: 'select' },
            options: ['numeric', '2-digit', 'short', 'long', undefined],
            description:
                'How to display the month for the secondary value in date format.',
            table: {
                type: { summary: 'string' },
                category: 'Secondary Value Date Format'
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
                type: { summary: 'string' },
                category: 'Secondary Value'
            }
        },
        secondaryPrefix: {
            name: 'secondary-prefix',
            control: {
                type: 'text'
            },
            description: 'Text to display before the secondary value.',
            table: {
                type: { summary: 'string' },
                category: 'Secondary Value'
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
                defaultValue: { summary: 'false' },
                category: 'Secondary Value'
            }
        },
        secondarySuffix: {
            name: 'secondary-suffix',
            control: {
                type: 'text'
            },
            description: 'Text to display after the secondary value.',
            table: {
                type: { summary: 'string' },
                category: 'Secondary Value'
            }
        },
        secondaryTimeZone: {
            name: 'secondary-time-zone',
            control: { type: 'text' },
            description: 'The time zone to use for the secondary date value.',
            table: {
                type: { summary: 'string' },
                category: 'Secondary Value Date Format'
            }
        },
        secondaryTimeZoneName: {
            name: 'secondary-time-zone-name',
            control: { type: 'select' },
            options: [
                'short',
                'long',
                'shortOffset',
                'longOffset',
                'shortGeneric',
                'longGeneric',
                undefined
            ],
            description:
                'The time zone name style to use for the secondary date value.',
            table: {
                type: { summary: 'string' },
                category: 'Secondary Value Date Format'
            }
        },
        secondaryTrendBreakpointValue: {
            name: 'secondary-trend-breakpoint-value',
            control: {
                type: 'number'
            },
            description:
                'Number at which the secondary value will be considered neutral. Works in association with `secondary-trend-icon` and `secondary-show-trend-color`.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '0' },
                category: 'Secondary Value'
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
                type: { summary: 'string' },
                category: 'Secondary Value'
            }
        },
        secondaryValueIsLoading: {
            name: 'secondary-value-is-loading',
            control: {
                type: 'boolean'
            },
            description:
                'If present, a spinner is displayed to indicate that the secondary value is loading.',
            table: {
                type: { summary: 'boolean' },
                category: 'Secondary Value'
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
                defaultValue: { summary: 'negative' },
                category: 'Secondary Value'
            }
        },
        secondaryWeekday: {
            name: 'secondary-weekday',
            control: { type: 'select' },
            options: ['long', 'short', 'narrow', undefined],
            description:
                'How to display the weekday for the secondary value in date format.',
            table: {
                type: { summary: 'string' },
                category: 'Secondary Value Date Format'
            }
        },
        secondaryYear: {
            name: 'secondary-year',
            control: { type: 'select' },
            options: ['numeric', '2-digit', undefined],
            description:
                'How to display the year for the secondary value in date format.',
            table: {
                type: { summary: 'string' },
                category: 'Secondary Value Date Format'
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
                defaultValue: { summary: 'false' },
                category: 'Primary Value'
            }
        },
        suffix: {
            control: {
                type: 'text'
            },
            description: 'Text to display after the primary value.',
            table: {
                type: { summary: 'string' },
                category: 'Primary Value'
            }
        },
        timeZone: {
            name: 'time-zone',
            control: { type: 'text' },
            description: 'The time zone to use.',
            table: {
                type: { summary: 'string' },
                category: 'Primary Value Date Format'
            }
        },
        timeZoneName: {
            name: 'time-zone-name',
            control: { type: 'select' },
            options: ['short', 'long', undefined],
            description: 'The time zone name style to use.',
            table: {
                type: { summary: 'string' },
                category: 'Primary Value Date Format'
            }
        },
        tooltip: {
            control: {
                type: 'text'
            },
            description: 'Text to display when the user mouses over.',
            table: {
                type: { summary: 'string' },
                category: 'Display'
            }
        },
        trendBreakpointValue: {
            name: 'trend-breakpoint-value',
            control: {
                type: 'text'
            },
            description:
                'Numbe or date at which the value will be considered neutral. Works in association with `trend-icon` and `show-trend-color`.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '0' },
                category: 'Primary Value'
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
                type: { summary: 'string' },
                category: 'Primary Value'
            }
        },
        valueIsLoading: {
            name: 'value-is-loading',
            control: {
                type: 'boolean'
            },
            description:
                'If present, a spinner is displayed to indicate that the value is loading.',
            table: {
                type: { summary: 'boolean' },
                category: 'Primary Value'
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
                defaultValue: { summary: 'negative' },
                category: 'Primary Value'
            }
        },
        weekday: {
            control: { type: 'select' },
            options: ['long', 'short', 'narrow', undefined],
            description: 'How to display the weekday in date format.',
            table: {
                type: { summary: 'string' },
                category: 'Primary Value Date Format'
            }
        },
        year: {
            control: { type: 'select' },
            options: ['numeric', '2-digit', undefined],
            description: 'How to display the year in date format.',
            table: {
                type: { summary: 'string' },
                category: 'Primary Value Date Format'
            }
        }
    },
    args: {
        currencyDisplayAs: 'symbol',
        formatStyle: 'decimal',
        labelPosition: 'top',
        loadingStateAlternativeText: 'Loading...',
        secondaryCurrencyDisplayAs: 'symbol',
        secondaryFormatStyle: 'decimal',
        secondaryPosition: 'right',
        secondaryShowTrendColor: false,
        secondaryTrendBreakpointValue: '0',
        secondaryValueIsLoading: false,
        secondaryValueSign: 'negative',
        showTrendColor: false,
        trendBreakpointValue: '0',
        valueIsLoading: false,
        valueSign: 'negative'
    }
};

const Template = (args) => Metric(args);

export const Base = Template.bind({});
Base.args = {
    value: '7552.8'
};

export const BaseEmptyWithError = Template.bind({});
BaseEmptyWithError.args = {
    label: 'Total Subscribers',
    errorMessage: 'This is an error message'
};

export const DateFormat = Template.bind({});
DateFormat.args = {
    label: 'Last Updated',
    formatStyle: 'date',
    value: '2025-01-01'
};

export const LabelAndDescription = Template.bind({});
LabelAndDescription.args = {
    description: 'Since last month',
    label: 'Gross volume',
    minimumFractionDigits: '2',
    value: '7552.8',
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
    minimumFractionDigits: '2',
    value: '8.6',
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
    secondaryValue: '8.6',
    secondaryValueSign: 'positive-and-negative',
    showTrendColor: true,
    suffix: 'overall',
    trendIcon: 'caret',
    value: '-14',
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
    secondaryValue: '122',
    value: '71897'
};
