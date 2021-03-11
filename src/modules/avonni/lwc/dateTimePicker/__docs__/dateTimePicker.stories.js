import { DateTimePicker } from '../__examples__/dateTimePicker';

export default {
    title: 'Example/Date Time Picker',
    argTypes: {
        disabled: {
            control: {
                type: 'boolean'
            },
            description:
                'If present, the date time picker is disabled and users cannot interact with it.',
            table: {
                type: { summary: 'boolean' }
            }
        },
        fieldLevelHelp: {
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
            type: { required: true },
            description: 'Text label for the input.',
            table: {
                type: { summary: 'string' }
            }
        },
        variant: {
            control: {
                type: 'select',
                options: ['standard', 'label-hidden']
            },
            defaultValue: 'standard',
            description:
                'The variant changes the appearance of the field. Accepted variants include standard and label-hidden.',
            table: {
                defaultValue: { summary: 'standard' },
                type: { summary: 'string' }
            }
        },
        messageWhenValueMissing: {
            control: {
                type: 'text'
            },
            description:
                'Error message to be displayed when the value is missing. The valueMissing error can be returned when you specify the required attribute for any input type.',
            table: {
                type: { summary: 'string' }
            }
        },
        name: {
            control: {
                type: 'text'
            },
            description: 'Specifies the name of an input element.',
            table: {
                type: { summary: 'string' }
            }
        },
        readOnly: {
            control: {
                type: 'boolean'
            },
            description:
                'If present, the input field is read-only and cannot be edited by users.',
            table: {
                type: { summary: 'boolean' }
            }
        },
        required: {
            control: {
                type: 'boolean'
            },
            description:
                'If present, the input field must be filled out before the form is submitted.',
            table: {
                type: { summary: 'boolean' }
            }
        },
        value: {
            control: {
                type: 'object'
            },
            description:
                'The value of the date selected, which can be a Date object, timestamp, or an ISO8601 formatted string. If "type" is "checkbox", an array of values can be provided.'
        },
        startTime: {
            control: {
                type: 'text'
            },
            defaultValue: '08:00',
            description:
                'Start of the time slots. Must be an ISO8601 formatted time string.',
            table: {
                defaultValue: { summary: '08:00' },
                type: { summary: 'string' }
            }
        },
        endTime: {
            control: {
                type: 'text'
            },
            defaultValue: '18:00',
            description:
                'End of the time slots. Must be an ISO8601 formatted time string.',
            table: {
                defaultValue: { summary: '18:00' },
                type: { summary: 'string' }
            }
        },
        timeSlotDuration: {
            control: {
                type: 'text'
            },
            defaultValue: '00:30',
            description:
                'Duration of each time slot. Must be an ISO8601 formatted time string.',
            table: {
                defaultValue: { summary: '00:30' },
                type: { summary: 'string' }
            }
        },
        timeFormatHour: {
            control: {
                type: 'select',
                options: ['2-digit', 'numeric']
            },
            description: 'Valid values include numeric and 2-digit.',
            table: {
                type: { summary: 'string' },
                defaultValue: 'numeric'
            }
        },
        timeFormatHour12: {
            control: {
                type: 'boolean'
            },
            description:
                "Determines whether time is displayed as 12-hour. If false, time displays as 24-hour. The default setting is determined by the user's locale.",
            table: {
                type: { summary: 'boolean' }
            }
        },
        timeFormatMinute: {
            control: {
                type: 'select',
                options: ['2-digit', 'numeric']
            },
            description: 'Valid values include numeric and 2-digit.',
            table: {
                type: { summary: 'string' },
                defaultValue: '2-digit'
            }
        },
        timeFormatSecond: {
            control: {
                type: 'select',
                options: ['2-digit', 'numeric']
            },
            description: 'Valid values include numeric and 2-digit.',
            table: {
                type: { summary: 'string' }
            }
        },
        disabledDateTimes: {
            control: {
                type: 'object'
            },
            description:
                'An array that will be used to determine which date times to be disabled in the calendar.',
            table: {
                type: { summary: 'array' }
            }
        },
        dateFormatDay: {
            control: {
                type: 'select',
                options: ['2-digit', 'numeric']
            },
            defaultValue: 'numeric',
            description: 'Valid values include numeric and 2-digit.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'numeric' }
            }
        },
        dateFormatWeekday: {
            control: {
                type: 'select',
                options: ['narrow', 'short', 'long']
            },
            defaultValue: 'short',
            description:
                'Specifies how to display the day of the week. Allowed values are narrow, short, or long.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'short' }
            }
        },
        dateFormatMonth: {
            control: {
                type: 'select',
                options: ['numeric', '2-digit', 'narrow', 'short', 'long']
            },
            defaultValue: 'long',
            description:
                'Allowed values are numeric, 2-digit, long, short or narrow.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'long' }
            }
        },
        dateFormatYear: {
            control: {
                type: 'select',
                options: ['2-digit', 'numeric']
            },
            description: 'Valid values include numeric and 2-digit.',
            table: {
                type: { summary: 'string' }
            }
        },
        max: {
            control: {
                type: 'date'
            },
            defaultValue: '2099-12-31',
            description:
                'Specifies the minimum date, which the calendar can show.',
            table: {
                defaultValue: { summary: '2099-12-31' },
                type: { summary: 'string' }
            }
        },
        min: {
            control: {
                type: 'date'
            },
            defaultValue: '1900-01-01',
            description:
                'Specifies the maximum date, which the calendar can show.',
            table: {
                defaultValue: { summary: '1900-01-01' },
                type: { summary: 'string' }
            }
        },
        visibility: {
            control: {
                type: 'select',
                options: ['day', 'week']
            },
            defaultValue: 'day',
            description: 'Valid values include day and week.',
            table: {
                defaultValue: { summary: 'day' },
                type: { summary: 'string' }
            }
        },
        type: {
            control: {
                type: 'select',
                options: ['radio', 'checkbox']
            },
            defaultValue: 'radio',
            description: 'Valid values include radio and checkbox.',
            table: {
                defaultValue: { summary: 'radio' },
                type: { summary: 'string' }
            }
        },
        showTimeZone: {
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        hideNavigation: {
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description: 'If true, hide next, previous and today buttons.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        hideDatePicker: {
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description: 'If true, hide the date picker button',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        }
    }
};

const Template = (args) => DateTimePicker(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Date picker'
};

export const Complex = Template.bind({});
Complex.args = {
    label: 'Date picker',
    disabledDateTimes: ['Wed', new Date('2021-03-12T13:00:00.00Z')],
    showTimeZone: true,
    required: true,
    visibility: 'week',
    value: ['2021-03-13T13:00:00.000Z', '2021-03-13T14:00:00.000Z'],
    type: 'checkbox',
    dateFormatWeekday: 'long',
    timeFormatHour12: false
};
