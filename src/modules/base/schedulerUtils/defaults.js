const DEFAULT_AVAILABLE_TIME_FRAMES = ['00:00-23:59'];
const DEFAULT_AVAILABLE_DAYS_OF_THE_WEEK = [0, 1, 2, 3, 4, 5, 6];
const DEFAULT_AVAILABLE_MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const DEFAULT_DATE_FORMAT = 'ff';
const DEFAULT_EVENTS_LABELS = {
    center: {
        fieldName: 'title'
    }
};
const DEFAULT_TIME_SPAN = {
    unit: 'day',
    span: 1
};
const EVENTS_THEMES = {
    valid: ['default', 'transparent', 'line', 'hollow', 'rounded'],
    default: 'default'
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

export {
    DEFAULT_AVAILABLE_TIME_FRAMES,
    DEFAULT_AVAILABLE_DAYS_OF_THE_WEEK,
    DEFAULT_AVAILABLE_MONTHS,
    DEFAULT_DATE_FORMAT,
    DEFAULT_EVENTS_LABELS,
    DEFAULT_TIME_SPAN,
    EVENTS_THEMES,
    RECURRENCES,
    REFERENCE_LINE_VARIANTS
};
