import { NULL_DATE } from './constants';
import { DateTime, setDate } from 'c/dateTimeUtils';

/**
 * If possible, transform the given value into a DateTime including the timezone.
 *
 * @param {any} value Value to be transformed. If it is an invalid date, it will be returned as is.
 * @param {string} timezone The IANA timezone.
 * @returns DateTime object, or value as is.
 */
function getDateWithTimezone(value, timezone) {
    if (!timezone) {
        return new Date(value);
    }
    const date = new DateTime(value, timezone).tzDate;
    if (!date || startOfDay(date).getTime() === NULL_DATE) {
        return value;
    }
    return date;
}

/**
 * Filter the valid dates from the given array.
 *
 * @param {object[]} array Array to filter.
 * @returns Array of DateTime objects, set to the beginning of the day.
 */
function fullDatesFromArray(array) {
    const dates = [];

    array.forEach((date) => {
        if (typeof date === 'object') {
            dates.push(startOfDay(date).getTime());
        }
    });

    return dates;
}

/**
 * Check if value is an invalid date.
 */
function isInvalidDate(value) {
    const date = new Date(value);
    return !date || isNaN(date) || startOfDay(date).getTime() === NULL_DATE;
}

/**
 * Filter the numbers from the given array.
 *
 * @param {object[]} array Array to filter.
 * @returns Array of numbers.
 */
function monthDaysFromArray(array) {
    let dates = [];

    array.forEach((date) => {
        if (typeof date === 'number') {
            dates.push(date);
        }
    });

    return dates;
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
 * Filter the strings from the given array.
 *
 * @param {object[]} array Array to filter.
 * @returns Array of strings.
 */
function weekDaysFromArray(array) {
    let dates = [];

    array.forEach((date) => {
        if (typeof date === 'string') {
            dates.push(date);
        }
    });

    return dates;
}

export {
    getDateWithTimezone,
    fullDatesFromArray,
    isInvalidDate,
    monthDaysFromArray,
    startOfDay,
    weekDaysFromArray
};
