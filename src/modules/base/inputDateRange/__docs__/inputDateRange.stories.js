import { InputDateRange } from '../__examples__/inputDateRange';

export default {
    title: 'Example/Input Date Range',
    argTypes: {
        type: {
            control: {
                type: 'select',
                options: ['date', 'datetime']
            },
            defaultValue: 'date',
            description: 'Values include date, datetime.',
            table: {
                defaultValue: { summary: 'date' },
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
        dateStyle: {
            name: 'date-style',
            control: {
                type: 'select',
                options: ['short', 'medium', 'long']
            },
            defaultValue: 'medium',
            description:
                'Valid values are short, medium (default), and long. The format of each style is specific to the locale. On mobile devices this attribute has no effect.',
            table: {
                defaultValue: { summary: 'medium' },
                type: { summary: 'string' }
            }
        },
        timeStyle: {
            name: 'time-style',
            control: {
                type: 'select',
                options: ['short', 'medium', 'long']
            },
            defaultValue: 'short',
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
        disabled: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description:
                'If present, the input field is disabled and users cannot interact with it.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'Validation'
            }
        },
        required: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description:
                'If present, the input field must be filled out before the form is submitted.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'Validation'
            }
        }
    }
};

const Template = (args) => InputDateRange(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Text label'
};

export const Prefilled = Template.bind({});
Prefilled.args = {
    label: 'Input with prefilled values',
    required: true,
    fieldLevelHelp: 'The date format has been set to long',
    labelStartDate: 'Start date',
    labelEndDate: 'End date',
    startDate: new Date('7/20/2021 10:00'),
    endDate: new Date('7/21/2021 18:15'),
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
    startDate: new Date('7/20/2021 10:00'),
    endDate: new Date('7/21/2021 18:15')
};
