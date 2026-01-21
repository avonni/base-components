import { DAYS } from './calendarConstants';
import { normalizeArray } from 'c/utils';
import { getDateWithTimezone, startOfDay } from './calendarFormatter';
import { isInvalidDate } from './calendarValidation';

/**
 * Compute disabled dates with timezone applied and normalized to start of day.
 *
 * @param {Array} disabledDates
 * @param {string} timezone
 * @returns {Array}
 */
function computeDisabledDates(disabledDates, timezone) {
    return disabledDates.map((date) => {
        if (DAYS.includes(date) || isInvalidDate(date)) {
            return date;
        }

        const fullDate = getDateWithTimezone(date, timezone);
        return startOfDay(fullDate);
    });
}

/**
 * Compute label dates with timezone applied.
 *
 * @param {Array<{ label: string, date: Date }>} labelDates
 * @param {string} timezone
 * @returns {Array<{ label: string, date: Date }>}
 */
function computeLabelDates(labelDates, timezone) {
    return labelDates.map((item) => ({
        ...item,
        date: getDateWithTimezone(item.date, timezone)
    }));
}

/**
 * Compute marked dates with timezone applied and normalized to start of day.
 *
 * @param {Array<{ color: string, date: Date }>} markedDates
 * @param {string} timezone
 * @returns {Array<{ color: string, date: Date }>}
 */
function computeMarkedDates(markedDates, timezone) {
    return markedDates.map((marker) => ({
        color: marker.color,
        date: isInvalidDate(marker.date)
            ? marker.date
            : startOfDay(getDateWithTimezone(marker.date, timezone))
    }));
}

/**
 * Compute the selected dates for a given value.
 *
 * @param {any} value The value of the selected date(s). Dates can be a Date object, timestamp, or an ISO8601 formatted string.
 * @param {string|null} timezone The IANA timezone.
 * @returns Array of dates
 */
function computeSelectedDates(value, timezone) {
    const normalizedValue =
        value && !Array.isArray(value) ? [value] : normalizeArray(value);
    const computedValues = [];
    normalizedValue.forEach((date) => {
        if (!isInvalidDate(date)) {
            const normalizedDate = startOfDay(
                getDateWithTimezone(date, timezone)
            );
            computedValues.push(normalizedDate);
        }
    });
    computedValues.sort((a, b) => a.getTime() - b.getTime());
    return computedValues;
}

export {
    computeDisabledDates,
    computeLabelDates,
    computeMarkedDates,
    computeSelectedDates
};
