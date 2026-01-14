import { DATE, HOUR, MONTH, YEAR, NULL_DATE } from './constants';

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

/**
 * Returns the start of the day for the given date.
 *
 * @param {Date} date Date to get the start of the day for.
 * @returns {Date} The start of the day for the given date.
 */
function startOfDay(date) {
    return setDate(date, 'hour', 0, 0, 0, 0);
}

/**
 * Check if value is an invalid date.
 */
function isInvalidDate(value) {
    const date = new Date(value);
    return !date || isNaN(date) || startOfDay(date).getTime() === NULL_DATE;
}

export { getStartOfWeek, pad, setDate, startOfDay, isInvalidDate };
