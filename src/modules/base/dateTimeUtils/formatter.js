import {
    DATE_FORMAT_PRESETS,
    DEFAULT_LANGUAGE,
    DOUBLE_DIGIT,
    ERA,
    INTERVALS,
    ISO_DATE_PATTERN,
    LONG,
    MONTH,
    NARROW,
    NUMERIC,
    SHORT,
    TIME_ZONE_NAME,
    WEEKDAY
} from './constants';
import { DateTime } from './dateTime';
import { pad } from './utils';

function _parseCustomToken({ date, token, timeZone }) {
    const tzDate = new DateTime(date, timeZone);

    const format = (opt = {}) => {
        return new Intl.DateTimeFormat(DEFAULT_LANGUAGE, {
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
            return tzDate.second.toString();
        case 'ss':
            return pad(tzDate.second, 2);
        case 'm':
            return tzDate.minute.toString();
        case 'mm':
            return pad(tzDate.minute, 2);
        case 'h':
            return tzDate.hour12.toString();
        case 'hh':
            return pad(tzDate.hour12, 2);
        case 'H':
            return tzDate.hour.toString();
        case 'HH':
            return pad(tzDate.hour, 2);
        case 'Z': {
            const offset = tzDate.tzOffset;
            return offset.replace(/:\d{2}/, '');
        }
        case 'ZZ':
            return tzDate.tzOffset;
        case 'ZZZ': {
            const offset = tzDate.tzOffset;
            return offset.replace(':', '');
        }
        case 'ZZZZ':
            return tzDate.getUnit(TIME_ZONE_NAME, SHORT);
        case 'ZZZZZ':
            return tzDate.getUnit(TIME_ZONE_NAME, LONG);
        case 'z':
            return timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;
        case 'a': {
            const hour = Intl.DateTimeFormat(DEFAULT_LANGUAGE, {
                hour: 'numeric',
                hour12: true
            }).format(tzDate.tzDate);
            const match =
                typeof hour === 'string' ? hour.match(/(p|a).+/i) : null;
            return match ? match[0].trim() : '';
        }
        case 'd':
            return tzDate.day.toString();
        case 'dd':
            return pad(tzDate.day, 2);
        case 'c':
        case 'E':
            return tzDate.weekday.toString();
        case 'ccc':
        case 'EEE':
            return tzDate.getUnit(WEEKDAY, SHORT).replace(/\.$/, '');
        case 'cccc':
        case 'EEEE':
            return tzDate.getUnit(WEEKDAY, LONG);
        case 'ccccc':
        case 'EEEEE':
            return tzDate.getUnit(WEEKDAY, NARROW);
        case 'L':
        case 'M':
            return tzDate.month.toString();
        case 'LL':
        case 'MM':
            return pad(tzDate.month, 2);
        case 'LLL':
        case 'MMM':
            // Remove trailing period
            return tzDate.getUnit(MONTH, SHORT).replace(/\.$/, '');
        case 'LLLL':
        case 'MMMM':
            return tzDate.getUnit(MONTH, LONG);
        case 'LLLLL':
        case 'MMMMM':
            return tzDate.getUnit(MONTH, NARROW);
        case 'y':
            return tzDate.year.toString();
        case 'ii':
        case 'yy':
            return tzDate.year.toString().slice(-2);
        case 'iiii':
        case 'yyyy':
            return pad(tzDate.year, 4);
        case 'G':
            return tzDate.getUnit(ERA, SHORT);
        case 'GG':
            return tzDate.getUnit(ERA, LONG);
        case 'GGGGG':
            return tzDate.getUnit(ERA, NARROW);
        case 'kk':
            return tzDate.isoYear.toString().slice(-2);
        case 'kkkk':
            return tzDate.isoYear.toString();
        case 'W':
        case 'n':
            return tzDate.isoWeek.toString();
        case 'nn':
        case 'WW':
            return pad(tzDate.isoWeek, 2);
        case 'o':
            return tzDate.ordinal.toString();
        case 'ooo':
            return pad(tzDate.ordinal, 3);
        case 'q':
            return tzDate.quarter.toString();
        case 'qq':
            return pad(tzDate.quarter, 2);
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
    return new Intl.RelativeTimeFormat(DEFAULT_LANGUAGE).format(
        numberOfUnits,
        unit
    );
}

function _standardFormat({ date, timeZone }) {
    const now = new Date();
    const timeOptions = {
        hour: NUMERIC,
        minute: DOUBLE_DIGIT,
        timeZone
    };
    const formattedTime = new Intl.DateTimeFormat(
        DEFAULT_LANGUAGE,
        timeOptions
    ).format(date);

    if (_isSameDate(date, now)) {
        return `Today ${formattedTime}`;
    }
    const yesterday = new Date(now - 86400000);
    if (_isSameDate(date, yesterday)) {
        return `Yesterday ${formattedTime}`;
    }
    return new Intl.DateTimeFormat(DEFAULT_LANGUAGE, {
        ...timeOptions,
        month: SHORT,
        day: NUMERIC
    }).format(date);
}

function getFormattedDate({ date = new Date(), timeZone, format }) {
    const givenDate = new Date(date);

    if (format === 'STANDARD') {
        return _standardFormat({ date: givenDate, timeZone });
    }
    if (format === 'RELATIVE') {
        return _relativeFormat(givenDate);
    }
    if (DATE_FORMAT_PRESETS[format]) {
        return new Intl.DateTimeFormat(DEFAULT_LANGUAGE, {
            ...DATE_FORMAT_PRESETS[format],
            timeZone
        }).format(givenDate);
    }

    return _customFormat({ date: givenDate, format, timeZone });
}

function isISODateOnly(date) {
    return (
        typeof date === 'string' &&
        date.match(ISO_DATE_PATTERN) &&
        !date.includes('T')
    );
}

export { getFormattedDate, isISODateOnly };
