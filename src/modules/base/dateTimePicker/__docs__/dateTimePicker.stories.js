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
                type: { summary: 'boolean' },
                category: 'Validation'
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
        avatar: {
            control: {
                type: 'object'
            },
            description:
                'Avatar object. The avatar will be displayed in the header, to the left of the label.',
            table: {
                type: { summary: 'object' }
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
        hideLabel: {
            name: 'hide-label',
            control: {
                type: 'boolean'
            },
            description: 'If present, hide the label.',
            table: {
                type: { summary: 'boolean' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: ['daily', 'weekly', 'inline', 'timeline', 'monthly'],
            description:
                'The variant changes the appearance of the time picker. Accepted variants include daily and weekly.',
            table: {
                defaultValue: { summary: 'daily' },
                type: { summary: 'string' }
            }
        },
        messageWhenValueMissing: {
            name: 'message-when-value-missing',
            control: {
                type: 'text'
            },
            description:
                'Error message to be displayed when the value is missing. The valueMissing error can be returned when you specify the required attribute for any input type.',
            table: {
                type: { summary: 'string' },
                category: 'Validation'
            }
        },
        name: {
            control: {
                type: 'text'
            },
            description: 'Specifies the name of an input element.',
            table: {
                type: { summary: 'string' },
                category: 'Validation'
            }
        },
        readOnly: {
            name: 'read-only',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the input field is read-only and cannot be edited by users.',
            table: {
                type: { summary: 'boolean' },
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
                defaultValue: { summary: 'Required' },
                category: 'Validation'
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
            name: 'start-time',
            control: {
                type: 'text'
            },
            description:
                'Start of the time slots. Must be an ISO8601 formatted time string.',
            table: {
                defaultValue: { summary: '08:00' },
                type: { summary: 'string' },
                category: 'Time'
            }
        },
        endTime: {
            name: 'end-time',
            control: {
                type: 'text'
            },
            description:
                'End of the time slots. Must be an ISO8601 formatted time string.',
            table: {
                defaultValue: { summary: '18:00' },
                type: { summary: 'string' },
                category: 'Time'
            }
        },
        timeSlotDuration: {
            name: 'time-slot-duration',
            control: {
                type: 'text'
            },
            description:
                'Duration of each time slot. Must be an ISO8601 formatted time string.',
            table: {
                defaultValue: { summary: '00:30' },
                type: { summary: 'string' },
                category: 'Time'
            }
        },
        timeFormatHour: {
            name: 'time-format-hour',
            control: {
                type: 'select'
            },
            options: ['2-digit', 'numeric'],
            description: 'Valid values include numeric and 2-digit.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'numeric' },
                category: 'Time'
            }
        },
        timeFormatHour12: {
            name: 'time-format-hour12',
            control: {
                type: 'boolean'
            },
            description:
                "Determines whether time is displayed as 12-hour. If false, time displays as 24-hour. The default setting is determined by the user's locale.",
            table: {
                type: { summary: 'boolean' },
                category: 'Time'
            }
        },
        timeFormatMinute: {
            name: 'time-format-minute',
            control: {
                type: 'select'
            },
            options: ['2-digit', 'numeric'],
            description: 'Valid values include numeric and 2-digit.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '2-digit' },
                category: 'Time'
            }
        },
        timeFormatSecond: {
            name: 'time-format-second',
            control: {
                type: 'select'
            },
            options: ['2-digit', 'numeric'],
            description: 'Valid values include numeric and 2-digit.',
            table: {
                type: { summary: 'string' },
                category: 'Time'
            }
        },
        disabledDateTimes: {
            name: 'disabled-date-times',
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
            name: 'date-format-day',
            control: {
                type: 'select'
            },
            options: ['2-digit', 'numeric'],
            description: 'Valid values include numeric and 2-digit.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'numeric' },
                category: 'Date'
            }
        },
        dateFormatWeekday: {
            name: 'date-format-weekday',
            control: {
                type: 'select'
            },
            options: ['narrow', 'short', 'long'],
            description:
                'Specifies how to display the day of the week. Allowed values are narrow, short, or long.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'short' },
                category: 'Date'
            }
        },
        dateFormatMonth: {
            name: 'date-format-month',
            control: {
                type: 'select'
            },
            options: ['numeric', '2-digit', 'narrow', 'short', 'long'],
            description:
                'Allowed values are numeric, 2-digit, long, short or narrow.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'long' },
                category: 'Date'
            }
        },
        dateFormatYear: {
            name: 'date-format-year',
            control: {
                type: 'select'
            },
            options: ['2-digit', 'numeric'],
            description: 'Valid values include numeric and 2-digit.',
            table: {
                type: { summary: 'string' },
                category: 'Date'
            }
        },
        showEndTime: {
            name: 'show-end-time',
            control: {
                type: 'boolean'
            },
            description:
                'If true, show the end time in each slots. Ex: 1:00 PM - 1:30 PM',
            table: {
                type: { summary: 'boolean' },
                category: 'Time'
            }
        },
        showDisabledDates: {
            name: 'show-disabled-dates',
            control: {
                type: 'boolean'
            },
            description:
                'If true, show the disabled dates in the date time picker.',
            table: {
                type: { summary: 'boolean' }
            }
        },
        max: {
            control: {
                type: 'date'
            },
            description:
                'Specifies the minimum date, which the calendar can show.',
            table: {
                defaultValue: { summary: '2099-12-31' },
                type: { summary: 'string' },
                category: 'Validation'
            }
        },
        min: {
            control: {
                type: 'date'
            },
            description:
                'Specifies the maximum date, which the calendar can show.',
            table: {
                defaultValue: { summary: '1900-01-01' },
                type: { summary: 'string' },
                category: 'Validation'
            }
        },
        type: {
            control: {
                type: 'select'
            },
            options: ['radio', 'checkbox'],
            description: 'Valid values include radio and checkbox.',
            table: {
                defaultValue: { summary: 'radio' },
                type: { summary: 'string' },
                category: 'Validation'
            }
        },
        showTimeZone: {
            name: 'show-time-zone',
            control: {
                type: 'boolean'
            },
            description: 'If present, show the time zone.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'Time'
            }
        },
        hideNavigation: {
            name: 'hide-navigation',
            control: {
                type: 'boolean'
            },
            description: 'If true, hide next, previous and today buttons.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        hideDateLabel: {
            name: 'hide-date-label',
            control: {
                type: 'boolean'
            },
            description:
                'If present, hide the currently visible date or date range.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        hideDatePicker: {
            name: 'hide-date-picker',
            control: {
                type: 'boolean'
            },
            description: 'If true, hide the date picker button',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'Date'
            }
        },
        datePickerVariant: {
            name: 'date-picker-variant',
            control: {
                type: 'select'
            },
            options: ['input', 'inline'],
            description:
                'Variant of the date picker displayed in the header. Valid values include input and inline.',
            table: {
                type: { summary: 'string' },
                category: 'Date'
            }
        },
        timezone: {
            control: {
                type: 'text'
            },
            description:
                "Time zone used, in a valid IANA format. If empty, the browser's time zone is used.",
            table: {
                type: { summary: 'string' },
                category: 'Time'
            }
        },
        timezoneLabel: {
            name: 'timezone-label',
            control: {
                type: 'text'
            },
            description: 'The label for the time zone.',
            table: {
                type: { summary: 'string' },
                category: 'Time',
                defaultValue: { summary: 'Time Zone:' }
            }
        },
        timezonePlaceholder: {
            name: 'timezone-placeholder',
            control: {
                type: 'text'
            },
            description: 'The placeholder for the time zone combobox.',
            table: {
                type: { summary: 'string' },
                category: 'Time',
                defaultValue: { summary: 'Select time zone' }
            }
        },
        todayButtonLabel: {
            name: 'today-button-label',
            control: {
                type: 'text'
            },
            description: 'The label for the today button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Today' }
            }
        },
        nextDatesButtonAlternativeText: {
            name: 'next-dates-button-alternative-text',
            control: {
                type: 'text'
            },
            description: 'The alternative text for the next dates button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Next dates' }
            }
        },
        nextWeekButtonAlternativeText: {
            name: 'next-week-button-alternative-text',
            control: {
                type: 'text'
            },
            description: 'The alternative text for the next week button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Next week' }
            }
        },
        previousDatesButtonAlternativeText: {
            name: 'previous-dates-button-alternative-text',
            control: {
                type: 'text'
            },
            description: 'The alternative text for the previous dates button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Previous dates' }
            }
        },
        previousWeekButtonAlternativeText: {
            name: 'previous-week-button-alternative-text',
            control: {
                type: 'text'
            },
            description: 'The alternative text for the previous week button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Previous week' }
            }
        },
        noResultsMessage: {
            name: 'no-results-message',
            control: {
                type: 'text'
            },
            description:
                'The message to be displayed when there are no available time slots for the selected period.',
            table: {
                type: { summary: 'string' },
                defaultValue: {
                    summary: 'No available time slots for this period.'
                }
            }
        }
    },
    args: {
        dateFormatDay: 'numeric',
        dateFormatMonth: 'long',
        dateFormatWeekday: 'short',
        datePickerVariant: 'input',
        disabled: false,
        endTime: '18:00',
        hideDateLabel: false,
        hideDatePicker: false,
        hideLabel: false,
        hideNavigation: false,
        max: '2099-12-31',
        min: '1900-01-01',
        noResultsMessage: 'No available time slots for this period.',
        readOnly: false,
        required: false,
        requiredAlternativeText: 'Required',
        showDisabledDates: false,
        showEndTime: false,
        showTimeZone: false,
        startTime: '08:00',
        timeFormatHour: 'numeric',
        timeFormatHour12: false,
        timeFormatMinute: '2-digit',
        timeSlotDuration: '00:30',
        timezoneLabel: 'Time Zone:',
        timezonePlaceholder: 'Select time zone',
        todayButtonLabel: 'Today',
        type: 'radio',
        variant: 'daily'
    }
};

const Template = (args) => DateTimePicker(args);

export const Daily = Template.bind({});
Daily.args = {
    label: 'Date picker',
    avatar: {
        fallbackIconName: 'standard:user',
        initials: 'GH',
        size: 'large'
    }
};

export const Weekly = Template.bind({});
Weekly.args = {
    label: 'Date picker',
    fieldLevelHelp: 'Pick one or several time slots',
    value: '2021-03-16T12:30:00.00Z',
    disabledDateTimes: [
        'Wed',
        '2021-03-15',
        new Date('2021-03-16T13:50:00.00Z')
    ],
    showTimeZone: true,
    required: true,
    variant: 'weekly',
    type: 'checkbox',
    timeFormatHour12: false,
    showEndTime: true,
    showDisabledDates: true
};

export const Inline = Template.bind({});
Inline.args = {
    label: 'Date picker',
    fieldLevelHelp: 'Pick a time',
    variant: 'inline',
    datePickerVariant: 'inline'
};

export const Timeline = Template.bind({});
Timeline.args = {
    label: 'Date picker',
    hideLabel: true,
    variant: 'timeline',
    timeSlotDuration: '00:05',
    disabledDateTimes: [
        new Date(new Date().setHours(9, 35, 0, 0)),
        new Date(new Date().setHours(9, 30, 0, 0)),
        new Date(new Date().setHours(9, 10, 0, 0)),
        new Date(new Date().setHours(10, 15, 0, 0)),
        new Date(new Date().setHours(15, 0, 0, 0)),
        new Date(new Date().setHours(15, 10, 0, 0)),
        new Date(new Date().setHours(16, 45, 0, 0)),
        new Date(new Date().setHours(17, 20, 0, 0)),
        'Wed',
        13
    ]
};

export const Monthly = Template.bind({});
Monthly.args = {
    label: 'Date picker',
    hideLabel: true,
    variant: 'monthly',
    timeSlotDuration: '01:00',
    disabledDateTimes: [
        new Date('2021-03-16T13:00:00.00Z'),
        new Date('2021-03-16T13:10:00.00Z'),
        'Wed',
        13
    ],
    value: '2021-03-16T15:00:00.00Z',
    timeFormatHour: 'numeric',
    dateFormatWeekday: 'long',
    dateFormatYear: 'numeric',
    showTimeZone: true,
    hideNavigation: true
};
