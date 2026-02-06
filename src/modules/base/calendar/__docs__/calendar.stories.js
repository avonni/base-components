import { Calendar } from '../__examples__/calendar';

export default {
    title: 'Example/Calendar',
    argTypes: {
        dateLabels: {
            name: 'date-labels',
            control: {
                type: 'object'
            },
            description: 'An array of dates and label properties.'
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            description: 'If true, the calendar is disabled.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        disabledDates: {
            name: 'disabled-dates',
            control: {
                type: 'object'
            },
            description:
                'An array that will be used to determine which dates to be disabled in the calendar.',
            table: {
                type: { summary: 'string|string[]' }
            }
        },
        hideNavigation: {
            name: 'hide-navigation',
            control: {
                type: 'boolean'
            },
            description: 'Specifies if the calendar header should be hidden.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        markedDates: {
            name: 'marked-dates',
            control: {
                type: 'object'
            },
            description:
                'An array that will be used to determine which dates to be marked in the calendar.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        min: {
            control: {
                type: 'date'
            },
            description:
                'Specifies the minimum date, which the calendar can show.',
            table: {
                type: { summary: 'object' },
                defaultValue: { summary: 'Date(1900, 0, 1)' }
            }
        },
        max: {
            control: {
                type: 'date'
            },
            description:
                'Specifies the maximum date, which the calendar can show.',
            table: {
                type: { summary: 'object' },
                defaultValue: { summary: 'Date(2099, 11, 31)' }
            }
        },
        nbMonthCalendars: {
            name: 'nb-month-calendars',
            control: {
                type: 'number'
            },
            description: 'Number of month calendars to be displayed.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '1' }
            }
        },
        nextMonthButtonAlternativeText: {
            name: 'next-month-button-alternative-text',
            control: {
                type: 'text'
            },
            description: 'The alternative text for the next month button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Next Month' }
            }
        },
        previousMonthButtonAlternativeText: {
            name: 'previous-month-button-alternative-text',
            control: {
                type: 'text'
            },
            description: 'The alternative text for the previous month button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Previous Month' }
            }
        },
        selectionMode: {
            name: 'selection-mode',
            control: {
                type: 'select'
            },
            options: ['single', 'multiple', 'interval'],
            description:
                'Specifies the selection mode of the calendar. Valid values include single, multiple and interval. If single, only one date can be selected at a time. If multiple, the user can select multiple dates. If interval, the user can only select a date range (two dates).',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'single' }
            }
        },
        timezone: {
            control: {
                type: 'string'
            },
            description:
                "Time zone used, in a valid IANA format. If empty, the browser's time zone is used.",
            table: {
                type: { summary: 'string' }
            }
        },
        value: {
            control: {
                type: 'object'
            },
            description:
                'The value of the date selected, which can be a Date object, timestamp, or an ISO8601 formatted string.',
            table: {
                type: { summary: 'string|string[]' }
            }
        },
        weekNumber: {
            name: 'week-number',
            control: {
                type: 'boolean'
            },
            description: 'If true, display a week number column',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        weekStartDay: {
            name: 'week-start-day',
            control: {
                type: 'number'
            },
            description:
                'Day displayed as the first day of the week. The value has to be a number between 0 and 6, 0 being Sunday, 1 being Monday, and so on until 6.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '0' }
            }
        },
        yearSelectAssistiveText: {
            name: 'year-select-assistive-text',
            control: {
                type: 'text'
            },
            description: 'The assistive text for the year select.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Pick a year' }
            }
        }
    },
    args: {
        disabled: false,
        hideNavigation: false,
        min: new Date(1900, 0, 1),
        max: new Date(2099, 11, 31),
        nbMonthCalendars: 1,
        nextMonthButtonAlternativeText: 'Next Month',
        previousMonthButtonAlternativeText: 'Previous Month',
        yearSelectAssistiveText: 'Pick a year',
        selectionMode: 'single',
        weekNumber: false,
        weekStartDay: 0
    }
};

const markedDates = [
    { date: new Date('05/09/2022'), color: 'red' },
    { date: new Date('05/26/2022'), color: 'brown' },
    { date: 14, color: 'blue' },
    { date: 25, color: 'yellow' },
    { date: 'Wed', color: 'black' }
];

const Template = (args) => Calendar(args);

export const Base = Template.bind({});
Base.args = {
    value: '05/08/2022',
    disabledDates: '05/09/2022'
};

export const Multiple = Template.bind({});
Multiple.args = {
    value: ['05/03/2022', '05/08/2022', '05/12/2022', '05/18/2022'],
    selectionMode: 'multiple'
};

export const Interval = Template.bind({});
Interval.args = {
    value: ['05/10/2022', '05/22/2022'],
    selectionMode: 'interval',
    disabledDates: ['Wed', 'Thu']
};

export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true
};

export const BaseWithWeekNumber = Template.bind({});
BaseWithWeekNumber.args = {
    value: '05/09/2022',
    weekNumber: true,
    disabledDates: [
        new Date(2022, 4, 9),
        new Date(2022, 4, 26),
        13,
        14,
        20,
        21,
        'Wed',
        'Thu'
    ]
};

export const MarkedDates = Template.bind({});
MarkedDates.args = {
    value: '05/09/2022',
    disabledDates: [20, 'Sat'],
    markedDates: markedDates
};

export const NumberOfMonthCalendars = Template.bind({});
NumberOfMonthCalendars.args = {
    value: ['05/10/2022', '05/22/2022'],
    selectionMode: 'interval',
    nbMonthCalendars: 2
};

export const Labels = Template.bind({});
Labels.args = {
    value: ['05/10/2022', '05/30/2022'],
    selectionMode: 'interval',
    dateLabels: [
        {
            date: 'Tue',
            label: 'Tuesday',
            variant: 'success',
            iconName: 'standard:branch_merge',
            iconPosition: 'right',
            iconVariant: 'inverse'
        },
        {
            date: 23,
            variant: 'success',
            iconName: 'standard:campaign',
            iconVariant: 'inverse'
        },
        {
            date: '05/25/2022',
            label: '25 may long label',
            variant: 'error',
            iconName: 'standard:lightning_component',
            iconVariant: 'inverse'
        }
    ],
    disabledDates: ['Sat']
};
