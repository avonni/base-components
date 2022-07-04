const DEFAULT_AVAILABLE_TIME_FRAMES = ['00:00-23:59'];
const DEFAULT_AVAILABLE_DAYS_OF_THE_WEEK = [0, 1, 2, 3, 4, 5, 6];
const DEFAULT_AVAILABLE_MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const DEFAULT_DATE_FORMAT = 'ff';
const DEFAULT_EVENTS_LABELS = {
    center: {
        fieldName: 'title'
    }
};
const DEFAULT_START_DATE = new Date();
const DEFAULT_TIME_SPAN = {
    unit: 'day',
    span: 1
};
const EVENTS_THEMES = {
    valid: ['default', 'transparent', 'line', 'hollow', 'rounded'],
    default: 'default'
};
const HEADERS = {
    valid: [
        'minuteAndHour',
        'minuteHourAndDay',
        'hourAndDay',
        'hourDayAndWeek',
        'dayAndWeek',
        'dayAndMonth',
        'dayLetterAndWeek',
        'dayWeekAndMonth',
        'weekAndMonth',
        'weekMonthAndYear',
        'monthAndYear',
        'quartersAndYear',
        'fiveYears'
    ],
    default: 'hourAndDay'
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
const UNITS = ['minute', 'hour', 'day', 'week', 'month', 'year'];
const VARIANTS = {
    valid: ['horizontal', 'vertical'],
    default: 'horizontal'
};

export {
    DEFAULT_AVAILABLE_TIME_FRAMES,
    DEFAULT_AVAILABLE_DAYS_OF_THE_WEEK,
    DEFAULT_AVAILABLE_MONTHS,
    DEFAULT_DATE_FORMAT,
    DEFAULT_EVENTS_LABELS,
    DEFAULT_START_DATE,
    DEFAULT_TIME_SPAN,
    EVENTS_THEMES,
    HEADERS,
    PRESET_HEADERS,
    RECURRENCES,
    REFERENCE_LINE_VARIANTS,
    UNITS,
    VARIANTS
};
