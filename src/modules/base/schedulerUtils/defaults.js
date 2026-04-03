const CELL_SELECTOR = '[data-element-id="div-cell"]';
const DEFAULT_ACTION_NAMES = {
    add: 'Standard.Scheduler.AddEvent',
    edit: 'Standard.Scheduler.EditEvent',
    delete: 'Standard.Scheduler.DeleteEvent'
};
const DEFAULT_AVAILABLE_TIME_FRAMES = ['00:00-23:59'];
const DEFAULT_AVAILABLE_DAYS_OF_THE_WEEK = [0, 1, 2, 3, 4, 5, 6];
const DEFAULT_AVAILABLE_MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const DEFAULT_DATE_FORMAT = 'ff';
const DEFAULT_EVENTS_LABELS = {
    center: {
        fieldName: 'title'
    }
};
const DEFAULT_NEW_EVENT_TITLE = 'New event';
const DEFAULT_TIME_SPAN = {
    unit: 'day',
    span: 1
};
const EDIT_MODES = ['all', 'one'];
const EVENTS_THEMES = {
    valid: ['default', 'transparent', 'line', 'hollow', 'rounded'],
    default: 'default'
};
const MONTH_DAY_LABEL_HEIGHT = 30;
const MONTH_EVENT_HEIGHT = 25;
const RECURRENCES = [
    {
        name: 'daily',
        unit: 'day'
    },
    {
        name: 'weekly',
        unit: 'week'
    },
    {
        name: 'monthly',
        unit: 'month'
    },
    {
        name: 'yearly',
        unit: 'year'
    }
];
const REFERENCE_LINE_VARIANTS = {
    valid: ['default', 'inverse', 'success', 'warning', 'error', 'lightest'],
    default: 'default'
};

const WEEK_START_DAYS = {
    default: 0,
    valid: [0, 1, 2, 3, 4, 5, 6]
};

const PRESET_HEADERS = {
    minuteAndHour: [
        {
            unit: 'minute',
            span: 30,
            label: 'mm'
        },
        {
            unit: 'hour',
            span: 1,
            label: 'h a'
        }
    ],
    minuteHourAndDay: [
        {
            unit: 'minute',
            span: 30,
            label: 'mm'
        },
        {
            unit: 'hour',
            span: 1,
            label: 'h a'
        },
        {
            unit: 'day',
            span: 1,
            label: 'ccc, LLL d'
        }
    ],
    hourAndDay: [
        {
            unit: 'hour',
            span: 1,
            label: 'h a'
        },
        {
            unit: 'day',
            span: 1,
            label: 'ccc, LLL d'
        }
    ],
    hourDayAndWeek: [
        {
            unit: 'hour',
            span: 1,
            label: 'h a'
        },
        {
            unit: 'day',
            span: 1,
            label: 'ccc, LLL d'
        },
        {
            unit: 'week',
            span: 1,
            label: "'w.'W 'of' yyyy"
        }
    ],
    dayAndMonth: [
        {
            unit: 'day',
            span: 1,
            label: 'dd'
        },
        {
            unit: 'month',
            span: 1,
            label: 'LLLL'
        }
    ],
    dayAndWeek: [
        {
            unit: 'day',
            span: 1,
            label: 'ccc, LLL d'
        },
        {
            unit: 'week',
            span: 1,
            label: "'w.'W 'of' yyyy"
        }
    ],
    dayLetterAndWeek: [
        {
            unit: 'day',
            span: 1,
            label: 'ccccc'
        },
        {
            unit: 'week',
            span: 1,
            label: "'w.'W 'of' yyyy"
        }
    ],
    dayWeekAndMonth: [
        {
            unit: 'day',
            span: 1,
            label: 'dd'
        },
        {
            unit: 'week',
            span: 1,
            label: "'w.'W 'of' yyyy"
        },
        {
            unit: 'month',
            span: 1,
            label: 'LLLL yyyy'
        }
    ],
    weekAndMonth: [
        {
            unit: 'week',
            span: 1,
            label: "'w.'W 'of' yyyy"
        },
        {
            unit: 'month',
            span: 1,
            label: 'LLLL yyyy'
        }
    ],
    weekMonthAndYear: [
        {
            unit: 'week',
            span: 1,
            label: "'w.'W 'of' yyyy"
        },
        {
            unit: 'month',
            span: 1,
            label: 'LLLL'
        },
        {
            unit: 'year',
            span: 1,
            label: 'yyyy'
        }
    ],
    monthAndYear: [
        {
            unit: 'month',
            span: 1,
            label: 'LLLL'
        },
        {
            unit: 'year',
            span: 1,
            label: 'yyyy'
        }
    ],
    quartersAndYear: [
        {
            unit: 'month',
            span: 4,
            label: 'LLL'
        },
        {
            unit: 'year',
            span: 1,
            label: 'yyyy'
        }
    ],
    fiveYears: [
        {
            unit: 'year',
            span: 5,
            label: 'yyyy'
        }
    ]
};

export {
    CELL_SELECTOR,
    DEFAULT_ACTION_NAMES,
    DEFAULT_AVAILABLE_TIME_FRAMES,
    DEFAULT_AVAILABLE_DAYS_OF_THE_WEEK,
    DEFAULT_AVAILABLE_MONTHS,
    DEFAULT_DATE_FORMAT,
    DEFAULT_EVENTS_LABELS,
    DEFAULT_NEW_EVENT_TITLE,
    DEFAULT_TIME_SPAN,
    EDIT_MODES,
    EVENTS_THEMES,
    MONTH_DAY_LABEL_HEIGHT,
    MONTH_EVENT_HEIGHT,
    PRESET_HEADERS,
    RECURRENCES,
    REFERENCE_LINE_VARIANTS,
    WEEK_START_DAYS
};
