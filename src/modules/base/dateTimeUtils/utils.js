import { DATE, DEFAULT_LANGUAGE, HOUR, MONTH, YEAR } from './constants';

function _buildMonthMaps(locale) {
    const shortMonths = {};
    const longMonths = {};

    for (let i = 0; i < 12; i++) {
        const date = new Date(2000, i, 1);

        const short = new Intl.DateTimeFormat(locale, { month: 'short' })
            .format(date)
            .replace('.', '')
            .toLowerCase();

        const long = new Intl.DateTimeFormat(locale, { month: 'long' })
            .format(date)
            .toLowerCase();

        shortMonths[short] = i;
        longMonths[long] = i;
    }

    return { shortMonths, longMonths };
}

function _normalizeDay(day) {
    if (day >= 1 && day <= 31) {
        return day;
    }
    return null;
}

function _normalizeMonth(month) {
    if (month >= 0 && month <= 11) {
        return month;
    }
    return null;
}

function _normalizeYear(year) {
    if (year >= 0 && year <= 99) {
        return 2000 + year;
    }
    return year;
}

function getStartOfWeek(date, weekStartDay = 0) {
    const weekday = date.getDay();
    let daysDiff = weekday - weekStartDay;
    if (daysDiff < 0) {
        daysDiff = daysDiff + 7;
    }
    const timestamp = new Date(date).setDate(date.getDate() - daysDiff);
    return new Date(timestamp);
}

function pad(value, length) {
    return (typeof value === 'number' && !isNaN(value)) || value
        ? value.toString().padStart(length, '0')
        : '';
}

function parseFormattedDateString({
    value,
    format,
    locale = DEFAULT_LANGUAGE
}) {
    if (typeof value !== 'string') return null;

    const { shortMonths, longMonths } = _buildMonthMaps(locale);

    let year, month, day;

    switch (format) {
        case 'L/d/y': {
            const match = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{1,6})$/);
            if (!match) return null;

            month = _normalizeMonth(Number(match[1]) - 1);
            day = _normalizeDay(Number(match[2]));
            year = _normalizeYear(Number(match[3]));
            break;
        }

        case 'LLL. d, y': {
            const match = value.match(
                /^([\p{L}.]+)\s+(\d{1,2}),\s+(\d{1,6})$/u
            );
            if (!match) return null;

            const monthKey = match[1].replace('.', '').toLowerCase();
            month = _normalizeMonth(shortMonths[monthKey]);
            day = _normalizeDay(Number(match[2]));
            year = _normalizeYear(Number(match[3]));
            break;
        }

        case 'LLLL d, y': {
            const match = value.match(/^([\p{L}]+)\s+(\d{1,2}),\s+(\d{1,6})$/u);
            if (!match) return null;

            const monthKey = match[1].toLowerCase();
            month = _normalizeMonth(longMonths[monthKey]);
            day = _normalizeDay(Number(match[2]));
            year = _normalizeYear(Number(match[3]));
            break;
        }

        default:
            return null;
    }
    if (month == null || year == null || day == null) return null;

    const date = new Date(year, month, day);
    date.setHours(0, 0, 0, 0);

    return isNaN(date.getTime()) ? null : date;
}

function setDate(date, unit, ...value) {
    switch (unit) {
        case HOUR:
            return new Date(new Date(date).setHours(...value));
        case DATE:
            return new Date(new Date(date).setDate(...value));
        case MONTH:
            return new Date(new Date(date).setMonth(...value));
        case YEAR:
            return new Date(new Date(date).setFullYear(...value));
        default:
            return new Date(date);
    }
}

export { getStartOfWeek, pad, parseFormattedDateString, setDate };
