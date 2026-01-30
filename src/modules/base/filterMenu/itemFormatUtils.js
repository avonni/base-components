import { DATE_FORMAT_PRESETS } from 'c/dateTimeUtils';
import { DateTime } from 'c/luxon';

import { isValidISOTimeString, STANDARD_TIME_FORMAT } from 'c/iso8601Utils';

/**
 * Format a Date object using Intl.DateTimeFormat into a string.
 *
 * @param {Date} date - The date to format.
 * @param {Object} options - Formatting options.
 * @param {boolean} [options.showTime=false] - If present, include time.
 * @param {string} [options.dateStyle='medium'] - The date formatting style.
 * @param {string} [options.timeStyle='short'] - The time formatting style.
 * @param {string} [options.timeZone] - IANA Timezone
 * @returns {string} Formatted string, or an empty string if invalid date.
 */
export function formatDateFromStyle(
    date,
    {
        showTime = false,
        dateStyle = 'medium',
        timeStyle = 'short',
        timeZone
    } = {}
) {
    if (!(date instanceof Date) || isNaN(date)) {
        return '';
    }

    const options = {
        dateStyle,
        timeStyle: showTime ? timeStyle : undefined,
        timeZone
    };

    return new Intl.DateTimeFormat('default', options).format(date);
}

/**
 * Formats a time string of the HH:mm:ss.SSS format into the format h:mm a or h:mm depending on the user locale.
 *
 * @param {string} value - The time string to format, expected in the format "HH:mm:ss.SSS".
 * @returns {string} The formatted time string according to the user's locale or empty string if invalid.

 */
export function formatTimeString(value) {
    if (!isValidISOTimeString(value)) return '';
    const time = DateTime.fromFormat(value, STANDARD_TIME_FORMAT, {
        locale: 'default'
    });

    return time.isValid
        ? time.toLocaleString(DATE_FORMAT_PRESETS.TIME_SIMPLE)
        : '';
}
