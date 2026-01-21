import { NULL_DATE } from './calendarConstants';
import { startOfDay } from './calendarFormatter';

/**
 * Check if value is after max date.
 * @param {Date} value Date to compare
 * @param {Date} max Max date
 * @returns {boolean} True if the value is after the max date.
 */
function isAfterMax(value, max) {
    return value.getTime() > max.getTime();
}

/**
 * Check if value is before min date.
 * @param {Date} value Date to compare
 * @param {Date} min Max date
 * @returns {boolean} True if the value is before the min date.
 */
function isBeforeMin(value, min) {
    return value.getTime() < min.getTime();
}

/**
 * Check if value is an invalid date.
 */
function isInvalidDate(value) {
    const date = new Date(value);
    return !date || isNaN(date) || startOfDay(date).getTime() === NULL_DATE;
}

export { isAfterMax, isBeforeMin, isInvalidDate };
