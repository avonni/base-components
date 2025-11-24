// Constants used to make minification possible
// and lighten the code once in production
const DEFAULT_LANGUAGE = 'default';
const DATE = 'date';
const DOUBLE_DIGIT = '2-digit';
const ERA = 'era';
const FULL = 'full';
const HOUR = 'hour';
const LONG = 'long';
const MEDIUM = 'medium';
const MONTH = 'month';
const NARROW = 'narrow';
const NUMERIC = 'numeric';
const SHORT = 'short';
const TIME_ZONE_NAME = 'timeZoneName';
const WEEKDAY = 'weekday';
const YEAR = 'year';

const DATE_FORMAT_PRESETS = {
    DATE_SHORT: { dateStyle: SHORT },
    DATE_MED: { dateStyle: MEDIUM },
    DATE_MED_WITH_WEEKDAY: {
        year: NUMERIC,
        month: SHORT,
        day: NUMERIC,
        weekday: SHORT
    },
    DATE_FULL: { dateStyle: LONG },
    DATE_HUGE: { dateStyle: FULL },
    TIME_SIMPLE: { timeStyle: SHORT },
    TIME_WITH_SECONDS: { timeStyle: MEDIUM },
    TIME_WITH_SHORT_OFFSET: { timeStyle: LONG },
    TIME_WITH_LONG_OFFSET: { timeStyle: FULL },
    TIME_24_SIMPLE: { timeStyle: SHORT, hour12: false },
    TIME_24_WITH_SECONDS: { timeStyle: MEDIUM, hour12: false },
    TIME_24_WITH_SHORT_OFFSET: { timeStyle: LONG, hour12: false },
    TIME_24_WITH_LONG_OFFSET: { timeStyle: FULL, hour12: false },
    DATETIME_SHORT: { dateStyle: SHORT, timeStyle: SHORT },
    DATETIME_SHORT_WITH_SECONDS: {
        year: NUMERIC,
        month: NUMERIC,
        day: NUMERIC,
        hour: NUMERIC,
        minute: NUMERIC,
        second: NUMERIC
    },
    DATETIME_MED: { dateStyle: MEDIUM, timeStyle: SHORT },
    DATETIME_MED_WITH_SECONDS: {
        year: NUMERIC,
        month: SHORT,
        day: NUMERIC,
        hour: NUMERIC,
        minute: NUMERIC,
        second: NUMERIC
    },
    DATETIME_MED_WITH_WEEKDAY: {
        year: NUMERIC,
        month: SHORT,
        day: NUMERIC,
        weekday: SHORT,
        hour: NUMERIC,
        minute: NUMERIC
    },
    DATETIME_FULL: {
        year: NUMERIC,
        month: LONG,
        day: NUMERIC,
        hour: NUMERIC,
        minute: NUMERIC,
        timeZoneName: SHORT
    },
    DATETIME_FULL_WITH_SECONDS: {
        year: NUMERIC,
        month: LONG,
        day: NUMERIC,
        hour: NUMERIC,
        minute: NUMERIC,
        second: NUMERIC,
        timeZoneName: SHORT
    },
    DATETIME_HUGE: {
        year: NUMERIC,
        month: LONG,
        day: NUMERIC,
        weekday: LONG,
        hour: NUMERIC,
        minute: NUMERIC,
        timeZoneName: LONG
    },
    DATETIME_HUGE_WITH_SECONDS: {
        year: NUMERIC,
        month: LONG,
        day: NUMERIC,
        weekday: LONG,
        hour: NUMERIC,
        minute: NUMERIC,
        second: NUMERIC,
        timeZoneName: LONG
    }
};

// Based on the Salesforce Record Details
const DEFAULT_DATE_FORMATS = {
    date: {
        year: NUMERIC,
        month: NUMERIC,
        day: NUMERIC
    },
    dateTime: {
        year: NUMERIC,
        month: NUMERIC,
        day: NUMERIC,
        hour: NUMERIC,
        minute: DOUBLE_DIGIT
    }
};

const millisecondsPerSecond = 1000;
const secondsPerMinute = 60;
const minutesPerHour = 60;
const hoursPerDay = 24;
const daysPerWeek = 7;
const weeksPerYear = 52;
const INTERVALS = {
    year:
        millisecondsPerSecond *
        secondsPerMinute *
        minutesPerHour *
        hoursPerDay *
        daysPerWeek *
        weeksPerYear,
    week:
        millisecondsPerSecond *
        secondsPerMinute *
        minutesPerHour *
        hoursPerDay *
        daysPerWeek,
    day:
        millisecondsPerSecond * secondsPerMinute * minutesPerHour * hoursPerDay,
    hour: millisecondsPerSecond * secondsPerMinute * minutesPerHour,
    minute: millisecondsPerSecond * secondsPerMinute,
    second: millisecondsPerSecond
};

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}/;

export {
    DATE,
    DATE_FORMAT_PRESETS,
    DEFAULT_DATE_FORMATS,
    DEFAULT_LANGUAGE,
    DOUBLE_DIGIT,
    ERA,
    HOUR,
    INTERVALS,
    ISO_DATE_PATTERN,
    LONG,
    MONTH,
    NARROW,
    NUMERIC,
    SHORT,
    TIME_ZONE_NAME,
    WEEKDAY,
    YEAR
};
