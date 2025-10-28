import { InputDateRange } from '../__examples__/inputDateRange';

export default {
    title: 'Example/Input Date Range',
    argTypes: {
        dateStyle: {
            name: 'date-style',
            control: {
                type: 'select'
            },
            options: ['short', 'medium', 'long'],
            description:
                "The display style of the date when type='date' or type='datetime'. Valid values are short, medium and long. The format of each style is specific to the locale. On mobile devices this attribute has no effect.",
            table: {
                defaultValue: { summary: 'medium' },
                type: { summary: 'string' }
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            description:
                'If present, the input field is disabled and users cannot interact with it.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'Validation'
            }
        },
        endDate: {
            name: 'end-date',
            control: {
                type: 'text'
            },
            description: 'Specifies the value of the end date input.',
            table: {
                type: { summary: 'string' }
            }
        },
        fieldLevelHelp: {
            name: 'field-level-help',
            control: {
                type: 'text'
            },
            description:
                'Help text detailing the purpose and function of the input.',
            table: {
                type: { summary: 'string' }
            }
        },
        label: {
            control: {
                type: 'text'
            },
            type: {
                required: true
            },
            description: 'Text label for the input.',
            table: {
                type: { summary: 'string' }
            }
        },
        labelEndDate: {
            name: 'label-end-date',
            control: {
                type: 'text'
            },
            description: 'Text label for the end input.',
            table: {
                type: { summary: 'string' }
            }
        },
        labelEndTime: {
            name: 'label-end-time',
            control: {
                type: 'text'
            },
            description:
                'If type is datetime, text label for the end time input.',
            table: {
                type: { summary: 'string' }
            }
        },
        labelStartDate: {
            name: 'label-start-date',
            control: {
                type: 'text'
            },
            description: 'Text label for the start input.',
            table: {
                type: { summary: 'string' }
            }
        },
        labelStartTime: {
            name: 'label-start-time',
            control: {
                type: 'text'
            },
            description:
                'If type is datetime, text label for the start time input.',
            table: {
                type: { summary: 'string' }
            }
        },
        messageWhenValueMissing: {
            name: 'message-when-value-missing',
            control: {
                type: 'text'
            },
            description:
                'Error message to be displayed when the start-date is missing.',
            table: {
                category: 'Validation',
                type: { summary: 'string' }
            }
        },
        readOnly: {
            name: 'read-only',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the input is read-only and cannot be edited by users.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Validation'
            }
        },
        required: {
            control: {
                type: 'boolean'
            },
            description:
                'If present, the input field must be filled out before the form is submitted.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'Validation'
            }
        },
        requiredAlternativeText: {
            name: 'required-alternative-text',
            control: {
                type: 'text'
            },
            description:
                'The assistive text when the required attribute is set to true.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Required' }
            }
        },
        startDate: {
            name: 'start-date',
            control: {
                type: 'text'
            },
            description: 'Specifies the value of the start date input.',
            table: {
                type: { summary: 'string' }
            }
        },
        timeStyle: {
            name: 'time-style',
            control: {
                type: 'select'
            },
            options: ['short', 'medium', 'long'],
            description:
                "The display style of the time when type='time' or type='datetime'. Valid values are short (default), medium, and long. Currently, medium and long styles look the same. On mobile devices this attribute has no effect.",
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'short' }
            }
        },
        timezone: {
            control: {
                type: 'text'
            },
            description:
                "Specifies the time zone used when type='datetime' only. This value defaults to the user's Salesforce time zone setting.",
            table: {
                type: { summary: 'string' }
            }
        },
        todayButtonLabel: {
            name: 'today-button-label',
            control: {
                type: 'text'
            },
            description: 'Text label for the today button on the calendar.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Today' }
            }
        },
        type: {
            control: {
                type: 'select'
            },
            options: ['date', 'datetime'],
            description: 'Valid types include date and datetime.',
            table: {
                defaultValue: { summary: 'date' },
                type: { summary: 'string' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: ['standard', 'label-hidden'],
            description:
                'The variant changes the appearance of an input field. Accepted variants include standard, label-inline, label-hidden, and label-stacked. This value defaults to standard, which displays the label above the field. Use label-hidden to hide the label but make it available to assistive technology. Use label-inline to horizontally align the label and input field. Use label-stacked to place the label above the input field.',
            table: {
                defaultValue: { summary: 'standard' },
                type: { summary: 'string' }
            }
        },
        weekStartDay: {
            name: 'week-start-day',
            control: { type: 'number' },
            description:
                'Day displayed as the first day of the week. The value has to be a number between 0 and 6, 0 being Sunday, 1 being Monday, and so on until 6.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '0' }
            }
        }
    },
    args: {
        dateStyle: 'medium',
        disabled: false,
        readOnly: false,
        required: false,
        requiredAlternativeText: 'Required',
        timeStyle: 'short',
        todayButtonLabel: 'Today',
        type: 'date',
        variant: 'standard',
        weekStartDay: 0
    }
};

const Template = (args) => InputDateRange(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Text label'
};

export const readOnly = Template.bind({});
readOnly.args = {
    labelStartDate: 'Start date',
    labelEndDate: 'End date',
    startDate: '7/20/2021 10:00',
    endDate: '7/21/2021 18:15',
    dateStyle: 'long',
    readOnly: true,
    type: 'datetime'
};

export const Prefilled = Template.bind({});
Prefilled.args = {
    label: 'Input with prefilled values',
    required: true,
    fieldLevelHelp: 'The date format has been set to long',
    labelStartDate: 'Start date',
    labelEndDate: 'End date',
    startDate: '7/20/2021',
    endDate: '7/21/2021',
    dateStyle: 'long'
};

export const DateTime = Template.bind({});
DateTime.args = {
    label: 'Input with dates and times',
    type: 'datetime',
    required: true,
    fieldLevelHelp: 'The date format has been set to short',
    labelStartDate: 'Start date',
    labelEndDate: 'End date',
    dateStyle: 'short'
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Disabled input',
    disabled: true,
    fieldLevelHelp: 'Disabled input with prefilled start and end dates',
    labelStartDate: 'Start date',
    labelEndDate: 'End date',
    startDate: '7/20/2021 10:00',
    endDate: '7/21/2021 18:15',
    type: 'datetime'
};
