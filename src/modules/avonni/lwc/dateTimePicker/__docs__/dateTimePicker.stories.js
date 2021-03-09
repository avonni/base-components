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
                type: 'text'
            },
            description:
                'The value of the date selected, which can be a Date object, timestamp, or an ISO8601 formatted string.',
            table: {
                type: { summary: 'string' }
            }
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
        disabledDateTimes: {
            control: {
                type: 'object'
            }
        },
        max: {
            control: {
                type: 'text'
            },
            defaultValue: '12/31/2099',
            description:
                'Specifies the minimum date, which the calendar can show.',
            table: {
                defaultValue: { summary: '12/31/2099' },
                type: { summary: 'string' }
            }
        },
        min: {
            control: {
                type: 'text'
            },
            defaultValue: '01/01/1900',
            description:
                'Specifies the maximum date, which the calendar can show.',
            table: {
                defaultValue: { summary: '01/01/1900' },
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
    label: 'Avonni date and time picker',
    disabledDateTimes: ['Wed', new Date('2021-03-12T13:00:00.00Z')],
    visibility: 'week',
    showTimeZone: true
};
