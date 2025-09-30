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

/**
 * Get the start of the week for a given date.
 *
 * @param {DateTime} date Date we want to get the start of the week for.
 * @param {number} weekStartDay Day that the week starts on, as a number between 0 and 6, 0 being Sunday, 1 being Monday, and so on until 6.
 * @returns {DateTime} The start of the week, as a DateTime object.
 */
const getStartOfWeek = (date, weekStartDay = 0) => {
    if (weekStartDay === 0) {
        const isSunday = date.weekday === 7;
        if (isSunday) {
            return date.startOf('day');
        }
        const monday = date.startOf('week');
        return removeFromDate(monday, 'day', 1);
    }
    if (date.weekday >= weekStartDay) {
        return removeFromDate(date, 'day', date.weekday - weekStartDay).startOf(
            'day'
        );
    }
    return removeFromDate(
        date,
        'day',
        7 - (weekStartDay - date.weekday)
    ).startOf('day');
};

/**
 * Get the end of the week for a given date.
 *
 * @param {DateTime} date Date we want to get the end of the week for.
 * @param {number} weekStartDay Day that the week starts on, as a number between 0 and 6, 0 being Sunday, 1 being Monday, and so on until 6.
 * @returns {DateTime} The end of the week, as a DateTime object.
 */
const getEndOfWeek = (date, weekStartDay = 0) => {
    const start = getStartOfWeek(date, weekStartDay).minus({ millisecond: 1 });
    return start.plus({ week: 1 });
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
const numberOfUnitsBetweenDates = ({ unit, start, end, weekStartDay = 0 }) => {
    if (unit === 'week') {
        // Transform "0" Sunday to a "7" Luxon Sunday
        let count = 1;
        let date = getStartOfWeek(start, weekStartDay);
        const endWeek = getStartOfWeek(end, weekStartDay);
        while (date < endWeek) {
            date = addToDate(date, 'week', 1);
            count++;
        }
        return count;
    }

    const interval = Interval.fromDateTimes(start, end);
    return interval.count(unit);
};

export {
    addToDate,
    dateTimeObjectFrom,
    getEndOfWeek,
    getStartOfWeek,
    getWeekday,
    getWeekNumber,
    intervalFrom,
    isInTimeFrame,
    numberOfUnitsBetweenDates,
    parseTimeFrame,
    removeFromDate
};
