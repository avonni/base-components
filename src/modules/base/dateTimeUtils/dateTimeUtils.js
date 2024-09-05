// Constants used to make minification possible
// and lighten the code once in production
const short = 'short';
const medium = 'medium';
const long = 'long';
const full = 'full';
const numeric = 'numeric';
const doubleDigit = '2-digit';
const defaultLanguage = 'default';
const second = 'second';
const minute = 'minute';
const hour = 'hour';
const weekday = 'weekday';
const month = 'month';
const year = 'year';
const era = 'era';
const timeZoneName = 'timeZoneName';

const DATE_FORMAT_PRESETS = {
    DATE_SHORT: { dateStyle: short },
    DATE_MED: { dateStyle: medium },
    DATE_MED_WITH_WEEKDAY: {
        year: numeric,
        month: short,
        day: numeric,
        weekday: short
    },
    DATE_FULL: { dateStyle: long },
    DATE_HUGE: { dateStyle: full },
    TIME_SIMPLE: { timeStyle: short },
    TIME_WITH_SECONDS: { timeStyle: medium },
    TIME_WITH_SHORT_OFFSET: { timeStyle: long },
    TIME_WITH_LONG_OFFSET: { timeStyle: full },
    TIME_24_SIMPLE: { timeStyle: short, hour12: false },
    TIME_24_WITH_SECONDS: { timeStyle: medium, hour12: false },
    TIME_24_WITH_SHORT_OFFSET: { timeStyle: long, hour12: false },
    TIME_24_WITH_LONG_OFFSET: { timeStyle: full, hour12: false },
    DATETIME_SHORT: { dateStyle: short, timeStyle: short },
    DATETIME_SHORT_WITH_SECONDS: {
        year: numeric,
        month: numeric,
        day: numeric,
        hour: numeric,
        minute: numeric,
        second: numeric
    },
    DATETIME_MED: { dateStyle: medium, timeStyle: short },
    DATETIME_MED_WITH_SECONDS: {
        year: numeric,
        month: short,
        day: numeric,
        hour: numeric,
        minute: numeric,
        second: numeric
    },
    DATETIME_MED_WITH_WEEKDAY: {
        year: numeric,
        month: short,
        day: numeric,
        weekday: short,
        hour: numeric,
        minute: numeric
    },
    DATETIME_FULL: {
        year: numeric,
        month: long,
        day: numeric,
        hour: numeric,
        minute: numeric,
        timeZoneName: short
    },
    DATETIME_FULL_WITH_SECONDS: {
        year: numeric,
        month: long,
        day: numeric,
        hour: numeric,
        minute: numeric,
        second: numeric,
        timeZoneName: short
    },
    DATETIME_HUGE: {
        year: numeric,
        month: long,
        day: numeric,
        weekday: long,
        hour: numeric,
        minute: numeric,
        timeZoneName: long
    },
    DATETIME_HUGE_WITH_SECONDS: {
        year: numeric,
        month: long,
        day: numeric,
        weekday: long,
        hour: numeric,
        minute: numeric,
        second: numeric,
        timeZoneName: long
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

const WEEKDAY_NUMBERS = {
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
    Sun: 7
};

function _getTzDate(date, timeZone) {
    const parts = new Intl.DateTimeFormat('en-US', {
        day: doubleDigit,
        timeZone,
        year: numeric,
        month: doubleDigit,
        hour: doubleDigit,
        minute: doubleDigit,
        second: doubleDigit,
        hour12: false
    }).formatToParts(date);
    const y = parts[4].value;
    const mo = parts[0].value;
    const d = parts[2].value;
    const h = parts[6].value;
    const min = parts[8].value;
    const sec = parts[10].value;
    return new Date(`${y}-${mo}-${d}T${h}:${min}:${sec}`);
}

function _getDayOfYear(date, timeZone) {
    const startOfYear = _getTzDate(date, timeZone);
    startOfYear.setMonth(0, 1);
    const tzDate = _getTzDate(date, timeZone);
    const day = 1 + Math.ceil((tzDate - startOfYear) / 86400000);
    return day ? day.toString() : '';
}

function _getIsoWeek(date, timeZone) {
    const target = _getTzDate(date, timeZone);
    const day = (date.getDay() + 6) % 7;
    target.setDate(target.getDate() - day + 3);
    const firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
        target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
    }
    const isoWeek = 1 + Math.ceil((firstThursday - target) / 604800000);
    return isoWeek ? isoWeek.toString() : '';
}

function _getIsoYear(date, timeZone) {
    // Set to the Thursday of the current week
    const d = _getTzDate(date, timeZone);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));

    // Calculate the ISO week year
    const y = d.getFullYear();
    const startOfYear = new Date(Date.UTC(y, 0, 1));
    const isWeek53 =
        startOfYear.getDay() === 4 ||
        new Date(
            Date.UTC(y, 0, 1 - ((startOfYear.getDay() + 6) % 7))
        ).getDay() === 4;
    const isoYear =
        y + (isWeek53 && d.getTime() < startOfYear.getTime() ? -1 : 0);
    return isoYear ? isoYear.toString() : '';
}

function _getQuarter(date, timeZone) {
    const monthNumber = _getTzDate(date, timeZone).getMonth();
    const quarter = Math.ceil(monthNumber / 3);
    return quarter === 0 ? '1' : quarter.toString();
}

function _parseCustomToken({ date, token, timeZone }) {
    const pad = (value, length) => {
        return (typeof value === 'number' && !isNaN(value)) || value
            ? value.toString().padStart(length, '0')
            : '';
    };

    const getUnit = (unit, unitFormat = numeric, hour12 = true) => {
        const parts = new Intl.DateTimeFormat(defaultLanguage, {
            [unit]: unitFormat,
            hour12,
            timeZone
        }).formatToParts(date);
        const value = parts.find((part) => part.type === unit).value;
        return value || '';
    };

    const format = (opt = {}) => {
        return new Intl.DateTimeFormat(defaultLanguage, {
            ...opt,
            timeZone
        }).format(date);
    };

    const ms = date.getMilliseconds();
    switch (token) {
        case 'S':
            return pad(ms);
        case 'SSS':
        case 'u':
            return pad(ms, 3);
        case 'uu':
            return pad(Math.floor(ms / 10), 2);
        case 'uuu':
            return pad(Math.floor(ms / 100));
        case 's':
            return getUnit(second);
        case 'ss':
            return pad(getUnit(second), 2);
        case 'm':
            return getUnit(minute);
        case 'mm':
            return getUnit(minute, doubleDigit);
        case 'h':
            return getUnit(hour);
        case 'hh':
            return getUnit(hour, doubleDigit);
        case 'H':
            return getUnit(hour, numeric, false);
        case 'HH':
            return getUnit(hour, doubleDigit, false);
        case 'Z': {
            try {
                let offset = getUnit(timeZoneName, 'shortOffset');
                offset = offset && offset.match(/-|\+\d+$/);
                return offset ? offset[0] : '';
            } catch (e) {
                // "shortOffset" is not supported by node version < 17.0.0
                // and package indicates we support node version >= 12.18.3
                console.error(e);
                return '';
            }
        }
        case 'ZZ': {
            try {
                // "longOffset" is not supported by node version < 17.0.0
                // and package indicates we support node version >= 12.18.3
                let offset = getUnit(timeZoneName, 'longOffset');
                offset = offset && offset.match(/-|\+[\d:]+$/);
                return offset ? offset[0] : '';
            } catch (e) {
                console.error(e);
                return '';
            }
        }
        case 'ZZZ': {
            try {
                // "longOffset" is not supported by node version < 17.0.0
                // and package indicates we support node version >= 12.18.3
                let offset = getUnit(timeZoneName, 'longOffset');
                offset = offset && offset.match(/-|\+[\d:]+$/);
                return offset ? offset[0].replace(':', '') : '';
            } catch (e) {
                console.error(e);
                return '';
            }
        }
        case 'ZZZZ':
            return getUnit(timeZoneName, short);
        case 'ZZZZZ':
            return getUnit(timeZoneName, long);
        case 'z':
            return timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;
        case 'a': {
            const parts = new Intl.DateTimeFormat('en-US', {
                hour: numeric,
                timeZone
            }).formatToParts(date);
            const value = parts.find((part) => part.type === 'dayPeriod').value;
            return value || '';
        }
        case 'd':
            return getUnit('day');
        case 'dd':
            return getUnit('day', doubleDigit);
        case 'c':
        case 'E': {
            const day = new Intl.DateTimeFormat('en-US', {
                weekday: short,
                timeZone
            }).format(date);
            return WEEKDAY_NUMBERS[day] ? WEEKDAY_NUMBERS[day].toString() : '';
        }
        case 'ccc':
        case 'EEE':
            // Remove trailing period
            return getUnit(weekday, short).replace(/\.$/, '');
        case 'cccc':
        case 'EEEE':
            return getUnit(weekday, long);
        case 'ccccc':
        case 'EEEEE':
            return getUnit(weekday, 'narrow');
        case 'L':
        case 'M':
            return getUnit(month);
        case 'LL':
        case 'MM':
            return getUnit(month, doubleDigit);
        case 'LLL':
        case 'MMM':
            // Remove trailing period
            return getUnit(month, short).replace(/\.$/, '');
        case 'LLLL':
        case 'MMMM':
            return getUnit(month, long);
        case 'LLLLL':
        case 'MMMMM':
            return getUnit(month, 'narrow');
        case 'y':
            return getUnit(year);
        case 'ii':
        case 'yy':
            return getUnit(year, doubleDigit);
        case 'iiii':
        case 'yyyy':
            return getUnit(year, numeric, 4);
        case 'G':
            return getUnit(era, short);
        case 'GG':
            return getUnit(era, long);
        case 'GGGGG':
            return getUnit(era, 'narrow');
        case 'kk':
            return _getIsoYear(date, timeZone).slice(-2);
        case 'kkkk':
            return _getIsoYear(date, timeZone);
        case 'W':
        case 'n':
            return _getIsoWeek(date, timeZone);
        case 'nn':
        case 'WW':
            return pad(_getIsoWeek(date, timeZone), 2);
        case 'o':
            return _getDayOfYear(date, timeZone);
        case 'ooo':
            return pad(_getDayOfYear(date, timeZone), 3);
        case 'q':
            return _getQuarter(date, timeZone);
        case 'qq':
            return pad(_getQuarter(date, timeZone), 2);
        case 'D':
            return format(DATE_FORMAT_PRESETS.DATE_SHORT);
        case 'DD':
            return format(DATE_FORMAT_PRESETS.DATE_MED);
        case 'DDD':
            return format(DATE_FORMAT_PRESETS.DATE_FULL);
        case 'DDDD':
            return format(DATE_FORMAT_PRESETS.DATE_HUGE);
        case 't':
            return format(DATE_FORMAT_PRESETS.TIME_SIMPLE);
        case 'tt':
            return format(DATE_FORMAT_PRESETS.TIME_WITH_SECONDS);
        case 'ttt':
            return format(DATE_FORMAT_PRESETS.TIME_WITH_SHORT_OFFSET);
        case 'tttt':
            return format(DATE_FORMAT_PRESETS.TIME_WITH_LONG_OFFSET);
        case 'T':
            return format(DATE_FORMAT_PRESETS.TIME_24_SIMPLE);
        case 'TT':
            return format(DATE_FORMAT_PRESETS.TIME_24_WITH_SECONDS);
        case 'TTT':
            return format(DATE_FORMAT_PRESETS.TIME_24_WITH_SHORT_OFFSET);
        case 'TTTT':
            return format(DATE_FORMAT_PRESETS.TIME_24_WITH_LONG_OFFSET);
        case 'f':
            return format(DATE_FORMAT_PRESETS.DATETIME_SHORT);
        case 'ff':
            return format(DATE_FORMAT_PRESETS.DATETIME_MED);
        case 'fff':
            return format(DATE_FORMAT_PRESETS.DATETIME_FULL);
        case 'ffff':
            return format(DATE_FORMAT_PRESETS.DATETIME_HUGE);
        case 'F':
            return format(DATE_FORMAT_PRESETS.DATETIME_SHORT_WITH_SECONDS);
        case 'FF':
            return format(DATE_FORMAT_PRESETS.DATETIME_MED_WITH_SECONDS);
        case 'FFF':
            return format(DATE_FORMAT_PRESETS.DATETIME_FULL_WITH_SECONDS);
        case 'FFFF':
            return format(DATE_FORMAT_PRESETS.DATETIME_HUGE_WITH_SECONDS);
        case 'X':
            return Math.floor(date.getTime() / 1000);
        case 'x':
            return date.getTime();
        default:
            return token;
    }
}

function _customFormat({ date, format, timeZone }) {
    const regex = /'[^']*'|[^a-zA-Z]|[a-zA-Z]+/g;
    const parts = format.match(regex);

    let result = '';
    parts.forEach((part) => {
        if (part.match(/^[a-zA-Z]+$/)) {
            result += _parseCustomToken({ date, token: part, timeZone });
        } else if (part.match(/^'[^']*'$/)) {
            result += part.match(/[^']+/)[0];
        } else {
            result += part;
        }
    });
    return result;
}

function _isSameDate(date1, date2) {
    return (
        date1.toISOString().slice(0, 10) === date2.toISOString().slice(0, 10)
    );
}

function _relativeFormat(date) {
    const now = new Date();
    if (now - date >= 0 && now - date < 60000) {
        return 'now';
    }
    const diff = date - now;
    const unit = Object.keys(INTERVALS).find(
        (u) => Math.abs(diff) >= INTERVALS[u]
    );
    const numberOfUnits = Math.floor(diff / INTERVALS[unit]);
    return new Intl.RelativeTimeFormat(defaultLanguage).format(
        numberOfUnits,
        unit
    );
}

function _standardFormat({ date, timeZone }) {
    const now = new Date();
    const timeOptions = {
        hour: numeric,
        minute: doubleDigit,
        timeZone
    };
    const formattedTime = new Intl.DateTimeFormat(
        defaultLanguage,
        timeOptions
    ).format(date);

    if (_isSameDate(date, now)) {
        return `Today ${formattedTime}`;
    }
    const yesterday = new Date(now - 86400000);
    if (_isSameDate(date, yesterday)) {
        return `Yesterday ${formattedTime}`;
    }
    return new Intl.DateTimeFormat(defaultLanguage, {
        ...timeOptions,
        month: short,
        day: numeric
    }).format(date);
}

const getFormattedDate = ({ date = new Date(), timeZone, format }) => {
    const givenDate = new Date(date);

    if (format === 'STANDARD') {
        return _standardFormat({ date: givenDate, timeZone });
    }
    if (format === 'RELATIVE') {
        return _relativeFormat(givenDate);
    }
    if (DATE_FORMAT_PRESETS[format]) {
        return new Intl.DateTimeFormat(defaultLanguage, {
            ...DATE_FORMAT_PRESETS[format],
            timeZone
        }).format(givenDate);
    }

    return _customFormat({ date: givenDate, format, timeZone });
};

export { DATE_FORMAT_PRESETS, getFormattedDate };
