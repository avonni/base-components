import { NULL_DATE } from './calendarConstants';
import { DateTime, setDate } from 'c/dateTimeUtils';
import { isAfterMax, isBeforeMin, isInvalidDate } from './calendarValidation';

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
 * Remove invalid values, or values outside of a min–max interval.
 *
 * @param {Date[]} values
 * @param {Date} min
 * @param {Date} max
 * @returns {Date[]}
 */
function removeValuesOutsideRange(values, min, max) {
    return values.filter(
        (date) =>
            !isInvalidDate(date) &&
            !isAfterMax(date, max) &&
            !isBeforeMin(date, min)
    );
}

/**
 * Set interval when only one value is valid (inside min–max range)
 * and the other value is outside the range.
 *
 * @param {Date[]} values Current interval values (length = 1)
 * @param {Date} computedMin Minimum allowed date
 * @param {Date} computedMax Maximum allowed date
 * @param {Date} minValue Lower candidate value
 * @param {Date} maxValue Upper candidate value
 * @returns {Date[]}
 */
function setIntervalWithOneValidValue(
    values,
    computedMin,
    computedMax,
    minValue,
    maxValue
) {
    const result = [...values];

    if (
        isBeforeMin(minValue, computedMin) &&
        minValue.getTime() < result[0].getTime()
    ) {
        result[1] = result[0];
        result[0] = computedMin;
    } else if (
        isAfterMax(maxValue, computedMax) &&
        maxValue.getTime() > result[0].getTime()
    ) {
        result[1] = computedMax;
    }

    return result;
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
    monthDaysFromArray,
    removeValuesOutsideRange,
    setIntervalWithOneValidValue,
    startOfDay,
    weekDaysFromArray
};
