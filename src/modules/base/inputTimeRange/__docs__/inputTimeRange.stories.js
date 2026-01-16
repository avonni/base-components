import { InputTimeRange } from '../__examples__/inputTimeRange';

export default {
    title: 'Example/Input Time Range',
    argTypes: {
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
        endTime: {
            name: 'end-time',
            control: {
                type: 'text'
            },
            description:
                'Specifies the value of the end time input, which can be an ISO8601 formatted string.',
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
        labelEndTime: {
            name: 'label-end-time',
            control: {
                type: 'text'
            },
            description: 'Text label for the end time input.',
            table: {
                type: { summary: 'string' }
            }
        },
        labelStartTime: {
            name: 'label-start-time',
            control: {
                type: 'text'
            },
            description: 'Text label for the start time input.',
            table: {
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
        startTime: {
            name: 'start-time',
            control: {
                type: 'text'
            },
            description:
                'Specifies the value of the start time input, which can be an ISO8601 formatted string.',
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
                'The display style of the time. Valid values are short (default), medium, and long. Currently, medium and long styles look the same. On mobile devices this attribute has no effect.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'short' }
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
        }
    },
    args: {
        disabled: false,
        readOnly: false,
        required: false,
        timeStyle: 'short',
        variant: 'standard'
    }
};

const Template = (args) => InputTimeRange(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Text label'
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    label: 'Label',
    labelStartTime: 'Start time',
    labelEndTime: 'End time',
    startTime: '10:00',
    endTime: '18:15',
    readOnly: true,
    variant: 'label-hidden'
};

export const Hour12Format = Template.bind({});
Hour12Format.args = {
    label: 'Label',
    fieldLevelHelp: 'Support format H:MM AM/PM or HH:MMAM/PM',
    labelStartTime: 'Start time',
    labelEndTime: 'End time',
    startTime: '10:00 AM',
    endTime: '6:00 PM'
};

export const Hour24Format = Template.bind({});
Hour24Format.args = {
    label: 'Label',
    fieldLevelHelp: 'Support format HH:MM or HH:MM:SS(.sss)',
    labelStartTime: 'Start time',
    labelEndTime: 'End time',
    startTime: '09:30',
    endTime: '18:15'
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Disabled input',
    disabled: true,
    fieldLevelHelp: 'Disabled input with prefilled start and end times',
    labelStartTime: 'Start time',
    labelEndTime: 'End time',
    startTime: '10:00',
    endTime: '18:15'
};

export const Required = Template.bind({});
Required.args = {
    label: 'Label',
    required: true,
    fieldLevelHelp: 'Start time is required but end time is optional',
    labelStartTime: 'Start time',
    labelEndTime: 'End time',
    endTime: '18:00'
};

export const InvalidRange = Template.bind({});
InvalidRange.args = {
    label: 'Label',
    fieldLevelHelp:
        'The end time must be the same as or later than the start time',
    labelStartTime: 'Start time',
    labelEndTime: 'End time',
    startTime: '17:30',
    endTime: '08:05'
};
