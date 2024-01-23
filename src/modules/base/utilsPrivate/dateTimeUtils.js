import { DateTime, Interval } from 'c/luxon';

/**
 * Convert a timestamp or a date object into a Luxon DateTime object.
 *
 * @param {(number | Date)} date Timestamp or date object to convert.
 * @returns {(DateTime | false)} DateTime object or false.
 */
const dateTimeObjectFrom = (date, options) => {
    let time;
    if (date instanceof Date) {
        time = date.getTime();
    } else if (date instanceof DateTime) {
        time = date.ts;
        if (!options) {
            options = { zone: date.zoneName };
        }
    } else if (!isNaN(new Date(date).getTime())) {
        time = new Date(date).getTime();
    } else if (typeof date === 'string') {
        // Add support for Salesforce format 2023-01-25, 12:00 p.m.
        let normalizedDate = date.replace('p.m.', 'PM');
        normalizedDate = normalizedDate.replace('a.m.', 'AM');

        const dateTime = DateTime.fromFormat(normalizedDate, 'yyyy-MM-dd, t', {
            locale: 'default'
        });
        if (dateTime.isValid) {
            time = dateTime.ts;
        }
    }

    if (time) {
        const dateTime = DateTime.fromMillis(time, options);
        if (dateTime.invalidExplanation) {
            // Ignore invalid options but log the error
            console.error(dateTime.invalidExplanation);
            return DateTime.fromMillis(time);
        }
        return dateTime;
    }
    return false;
};

/**
 * Get the weekday of a date, starting the weeks from Sunday.
 *
 * @param {Date|DateTime|number|string} date The date we want to get the weekday of.
 * @returns {number|null} The weekday or null if the date is not a valid date. Weekdays go from 0 (Sunday) to 6 (Saturday).
 */
const getWeekday = (date) => {
    let normalizedDate = date;
    if (!(date instanceof DateTime)) {
        normalizedDate = dateTimeObjectFrom(date);
        if (!normalizedDate) return null;
    }

    const weekday = normalizedDate.weekday;
    return weekday === 7 ? 0 : weekday;
};

const intervalFrom = (start, end) => {
    const normalizedStart = DateTime.isDateTime(start)
        ? start
        : dateTimeObjectFrom(start);
    const normalizedEnd = DateTime.isDateTime(end)
        ? end
        : dateTimeObjectFrom(end);
    if (!normalizedStart || !normalizedEnd) {
        return null;
    }
    return Interval.fromDateTimes(start, end);
};

/**
 * Check if the given time frame is valid, and parse it into a start and an end date.
 *
 * @param {string} timeFrame Time frame to validate and parse.
 * @returns {object} Object with three possible keys: valid, start and end.
 */
const parseTimeFrame = (timeFrame, options) => {
    const startMatch = timeFrame.match(/^([0-9:]+(\.\d+)?)-/);
    const endMatch = timeFrame.match(/-([0-9:]+(\.\d+)?)$/);

    if (!startMatch || !endMatch) {
        console.error(
            `Wrong time frame format for ${timeFrame}. The time frame needs to follow the pattern ‘start-end’, with start and end being ISO8601 formatted time strings.`
        );
        return { valid: false };
    }
    const start = DateTime.fromISO(startMatch[1], options);
    const end = DateTime.fromISO(endMatch[1], options);

    if (end < start) {
        console.error(
            `Wrong time frame format for ${timeFrame}. The end time is smaller than the start time.`
        );
        return { valid: false };
    }

    return { start, end, valid: true };
};

/**
 * Check if a time is included in a time frame.
 *
 * @param {DateTime} date DateTime object.
 * @param {string} timeFrame The time frame of reference, in the format '00:00-00:00'.
 * @returns {boolean} true or false.
 */
const isInTimeFrame = (date, timeFrame) => {
    const { start, end, valid } = parseTimeFrame(timeFrame, {
        zone: date.zoneName
    });
    if (!valid) {
        return true;
    }

    const time = date.set({
        year: start.year,
        month: start.month,
        day: start.day
    });

    return time < end && time >= start;
};

/**
 * Add unit * span to the date.
 *
 * @param {DateTime} date The date we want to add time to.
 * @param {string} unit The time unit (minute, hour, day, week, month or year).
 * @param {number} span The number of unit to add.
 * @returns {DateTime} DateTime object with the added time.
 */
const addToDate = (date, unit, span) => {
    const options = {};
    options[unit] = span;
    return date.plus(options);
};

/**
 * Remove unit * span from the date.
 *
 * @param {DateTime} date The date we want to remove time from.
 * @param {string} unit The time unit (minute, hour, day, week, month or year).
 * @param {number} span The number of unit to remove.
 * @returns {DateTime} DateTime object with the removed time.
 */
const removeFromDate = (date, unit, span) => {
    const options = {};
    options[unit] = -span;
    return date.plus(options);
};

const getStartOfWeek = (date) => {
    const isSunday = date.weekday === 7;
    if (isSunday) {
        return date.startOf('day');
    }
    const monday = date.startOf('week');
    return removeFromDate(monday, 'day', 1);
};

/**
 * Get the week number of a date, starting the weeks from Sunday.
 *
 * @param {Date|DateTime|number|string} date The date we want to get the week number of.
 * @returns {number|null} The week number or null if the date is not a valid date.
 */
const getWeekNumber = (date) => {
    let normalizedDate = date;
    if (!(date instanceof DateTime)) {
        normalizedDate = dateTimeObjectFrom(date);
        if (!normalizedDate) return null;
    }

    if (normalizedDate.weekday === 7) {
        normalizedDate = addToDate(normalizedDate, 'day', 1);
    }
    return normalizedDate.weekNumber;
};

/**
 * Calculate the number of units between two dates, including partial units.
 *
 * @param {string} unit The time unit (minute, hour, day, week, month or year).
 * @param {DateTime} start The starting date.
 * @param {DateTime} end The ending date.
 * @returns {number} Number of units between the start and end dates.
 */
const numberOfUnitsBetweenDates = (unit, start, end) => {
    // Compensate the fact that luxon weeks start on Monday
    const isWeek = unit === 'week';
    let normalizedStart = isWeek ? addToDate(start, 'day', 1) : start;
    let normalizedEnd = isWeek ? addToDate(end, 'day', 1) : end;

    const interval = Interval.fromDateTimes(normalizedStart, normalizedEnd);
    return interval.count(unit);
};

const formatDateFromStyle = (
    dateTime,
    { showTime = false, dateStyle = 'medium', timeStyle = 'short' }
) => {
    let formattedDate;

    switch (dateStyle) {
        case 'long':
            formattedDate = dateTime.toFormat('DDD');
            break;
        case 'short':
            formattedDate = dateTime.toFormat('D');
            break;
        default:
            formattedDate = dateTime.toFormat('DD');
            break;
    }

    if (showTime) {
        formattedDate += ' ';
        switch (timeStyle) {
            case 'long':
                formattedDate += dateTime.toFormat('ttt');
                break;
            case 'short':
                formattedDate += dateTime.toFormat('t');
                break;
            default:
                formattedDate += dateTime.toFormat('tt');
                break;
        }
    }

    return formattedDate;
};

const DATE_FORMAT_PRESETS = [
    'DATE_SHORT',
    'DATE_MED',
    'DATE_MED_WITH_WEEKDAY',
    'DATE_FULL',
    'DATE_HUGE',
    'TIME_SIMPLE',
    'TIME_WITH_SECONDS',
    'TIME_WITH_SHORT_OFFSET',
    'TIME_WITH_LONG_OFFSET',
    'TIME_24_SIMPLE',
    'TIME_24_WITH_SECONDS',
    'TIME_24_WITH_SHORT_OFFSET',
    'TIME_24_WITH_LONG_OFFSET',
    'DATETIME_SHORT',
    'DATETIME_MED',
    'DATETIME_FULL',
    'DATETIME_HUGE',
    'DATETIME_SHORT_WITH_SECONDS',
    'DATETIME_MED_WITH_SECONDS',
    'DATETIME_FULL_WITH_SECONDS',
    'DATETIME_HUGE_WITH_SECONDS'
];

const getFormattedDate = (date, dateOptions, format) => {
    const luxonDate = dateTimeObjectFrom(date, dateOptions);
    const luxonDateNow = dateTimeObjectFrom(Date.now(), dateOptions);

    if (format === 'STANDARD') {
        return getFormattedDateStandard(luxonDate, luxonDateNow);
    }
    if (format === 'RELATIVE') {
        return getFormattedDateRelative(luxonDate, luxonDateNow);
    }
    if (DATE_FORMAT_PRESETS.includes(format)) {
        return luxonDate.toLocaleString(DateTime[format]);
    }

    return luxonDate.toFormat(format);
};

function getFormattedDateRelative(luxonDate, luxonDateNow) {
    const diff = luxonDate.diff(luxonDateNow).as('seconds');
    const minuteInSeconds = 60;
    if (Math.abs(diff) < minuteInSeconds) return 'now';
    return luxonDate.toRelative();
}

function getFormattedDateStandard(luxonDate, luxonDateNow) {
    if (luxonDate.hasSame(luxonDateNow, 'day'))
        return `Today ${luxonDate.toFormat('h:mm a')}`;
    if (luxonDate.hasSame(luxonDateNow.minus({ days: 1 }), 'day'))
        return `Yesterday ${luxonDate.toFormat('h:mm a')}`;
    return luxonDate.toFormat('LLL d, h:mm a');
}

export {
    DATE_FORMAT_PRESETS,
    addToDate,
    dateTimeObjectFrom,
    formatDateFromStyle,
    getFormattedDate,
    getStartOfWeek,
    getWeekday,
    getWeekNumber,
    intervalFrom,
    isInTimeFrame,
    numberOfUnitsBetweenDates,
    parseTimeFrame,
    removeFromDate
};
