const DATE_FORMAT_PRESETS = {
    DATE_SHORT: { dateStyle: 'short' },
    DATE_MED: { dateStyle: 'medium' },
    DATE_MED_WITH_WEEKDAY: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        weekday: 'short'
    },
    DATE_FULL: { dateStyle: 'long' },
    DATE_HUGE: { dateStyle: 'full' },
    TIME_SIMPLE: { timeStyle: 'short' },
    TIME_WITH_SECONDS: { timeStyle: 'medium' },
    TIME_WITH_SHORT_OFFSET: { timeStyle: 'long' },
    TIME_WITH_LONG_OFFSET: { timeStyle: 'full' },
    TIME_24_SIMPLE: { timeStyle: 'short', hour12: false },
    TIME_24_WITH_SECONDS: { timeStyle: 'medium', hour12: false },
    TIME_24_WITH_SHORT_OFFSET: { timeStyle: 'long', hour12: false },
    TIME_24_WITH_LONG_OFFSET: { timeStyle: 'full', hour12: false },
    DATETIME_SHORT: { dateStyle: 'short', timeStyle: 'short' },
    DATETIME_SHORT_WITH_SECONDS: {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    },
    DATETIME_MED: { dateStyle: 'medium', timeStyle: 'medium' },
    DATETIME_MED_WITH_SECONDS: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    },
    DATETIME_MED_WITH_WEEKDAY: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric'
    },
    DATETIME_FULL: { dateStyle: 'long', timeStyle: 'long' },
    DATETIME_FULL_WITH_SECONDS: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short'
    },
    DATETIME_HUGE: { dateStyle: 'full', timeStyle: 'full' },
    DATETIME_HUGE_WITH_SECONDS: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'long'
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
        day: '2-digit',
        timeZone,
        year: 'numeric',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).formatToParts(date);
    const year = parts[4].value;
    const month = parts[0].value;
    const day = parts[2].value;
    const hour = parts[6].value;
    const minute = parts[8].value;
    const second = parts[10].value;
    return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);
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
    const year = d.getFullYear();
    const startOfYear = new Date(Date.UTC(year, 0, 1));
    const isWeek53 =
        startOfYear.getDay() === 4 ||
        new Date(
            Date.UTC(year, 0, 1 - ((startOfYear.getDay() + 6) % 7))
        ).getDay() === 4;
    const isoYear =
        year + (isWeek53 && d.getTime() < startOfYear.getTime() ? -1 : 0);
    return isoYear ? isoYear.toString() : '';
}

function _getQuarter(date, timeZone) {
    const month = _getTzDate(date, timeZone).getMonth();
    const quarter = Math.ceil(month / 3);
    return quarter ? quarter.toString() : '';
}

function _parseCustomToken({ date, token, timeZone }) {
    const pad = (value, length) => {
        return value ? value.toString().padStart(length, '0') : '';
    };

    const getUnit = (unit, unitFormat = 'numeric', hour12 = true) => {
        const parts = new Intl.DateTimeFormat('default', {
            [unit]: unitFormat,
            hour12,
            timeZone
        }).formatToParts(date);
        const value = parts.find((part) => part.type === unit).value;
        return value || '';
    };

    const format = (opt = {}) => {
        return new Intl.DateTimeFormat('default', {
            ...opt,
            timeZone
        }).format(date);
    };

    const ms = date.getMilliseconds();
    const offset = -date.getTimezoneOffset() / 60;
    const offsetSign = offset > 0 ? '+' : '-';
    const paddedOffset = pad(offset, 2);
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
            return getUnit('second');
        case 'ss':
            return getUnit('second', '2-digit');
        case 'm':
            return getUnit('minute');
        case 'mm':
            return getUnit('minute', '2-digit');
        case 'h':
            return getUnit('hour');
        case 'hh':
            return getUnit('hour', '2-digit');
        case 'H':
            return getUnit('hour', 'numeric', false);
        case 'HH':
            return getUnit('hour', '2-digit', false);
        case 'Z':
            return `${offsetSign}${offset}`;
        case 'ZZ':
            return `${offsetSign}${paddedOffset}:00`;
        case 'ZZZ':
            return `${offsetSign}${paddedOffset}00`;
        case 'ZZZZ':
            return getUnit('timeZoneName', 'short');
        case 'ZZZZZ':
            return getUnit('timeZoneName', 'long');
        case 'z':
            return timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;
        case 'a': {
            const parts = new Intl.DateTimeFormat('en-US', {
                hour: 'numeric',
                timeZone
            }).formatToParts(date);
            const value = parts.find((part) => part.type === 'dayPeriod').value;
            return value || '';
        }
        case 'd':
            return getUnit('day');
        case 'dd':
            return getUnit('day', '2-digit');
        case 'c':
        case 'E': {
            const weekday = new Intl.DateTimeFormat('en-US', {
                weekday: 'short',
                timeZone
            }).format(date);
            return WEEKDAY_NUMBERS[weekday] ? WEEKDAY_NUMBERS.toString() : '';
        }
        case 'ccc':
        case 'EEE':
            return getUnit('weekday', 'short');
        case 'cccc':
        case 'EEEE':
            return getUnit('weekday', 'long');
        case 'ccccc':
        case 'EEEEE':
            return getUnit('weekday', 'narrow');
        case 'L':
        case 'M':
            return getUnit('month');
        case 'LL':
        case 'MM':
            return getUnit('month', '2-digit');
        case 'LLL':
        case 'MMM':
            return getUnit('month', 'short');
        case 'LLLL':
        case 'MMMM':
            return getUnit('month', 'long');
        case 'LLLLL':
        case 'MMMMM':
            return getUnit('month', 'narrow');
        case 'y':
            return getUnit('year');
        case 'ii':
        case 'yy':
            return getUnit('year', '2-digit');
        case 'iiii':
        case 'yyyy':
            return getUnit('year', 'numeric', 4);
        case 'G':
            return getUnit('era', 'short');
        case 'GG':
            return getUnit('era', 'long');
        case 'GGGGG':
            return getUnit('era', 'narrow');
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
    if (now - date > 0 && now - date < 60000) {
        return 'now';
    }
    const diff = date - now;
    const unit = Object.keys(INTERVALS).find(
        (u) => Math.abs(diff) >= INTERVALS[u]
    );
    const numberOfUnits = Math.floor(diff / INTERVALS[unit]);
    return new Intl.RelativeTimeFormat('default').format(numberOfUnits, unit);
}

function _standardFormat({ date, timeZone }) {
    const now = new Date();
    const timeOptions = {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone
    };
    const formattedTime = new Intl.DateTimeFormat(
        'default',
        timeOptions
    ).format(date);

    if (_isSameDate(date, now)) {
        return `Today ${formattedTime}`;
    }
    const yesterday = new Date(now - 86400000);
    if (_isSameDate(date, yesterday)) {
        return `Yesterday ${formattedTime}`;
    }
    return new Intl.DateTimeFormat('default', {
        ...timeOptions,
        month: 'short',
        day: 'numeric'
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
        return new Intl.DateTimeFormat('default', {
            ...DATE_FORMAT_PRESETS[format],
            timeZone
        }).format(givenDate);
    }

    return _customFormat({ date: givenDate, format, timeZone });
};

export { DATE_FORMAT_PRESETS, getFormattedDate };
