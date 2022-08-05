import {
    addToDate,
    dateTimeObjectFrom,
    normalizeArray,
    removeFromDate
} from 'c/utilsPrivate';
import { DateTime } from 'c/luxon';

/**
 * Check if the date day of the week is allowed.
 *
 * @param {DateTime} date Date to check.
 * @param {number[]} allowedDays Array of allowed days. The days are represented by a number, starting from 0 for Sunday, and ending with 6 for Saturday.
 * @returns {boolean} true or false.
 */
const isAllowedDay = (date, allowedDays) => {
    // Luxon week days start at Monday = 1
    const normalizedDate = date.weekday % 7;
    return allowedDays.includes(normalizedDate);
};

/**
 * Check if the date month is allowed.
 *
 * @param {DateTime} date Date to check.
 * @param {number[]} allowedMonths Array of allowed months. The months are represented by a number, starting from 0 for January, and ending with 11 for December.
 * @returns {boolean} true or false.
 */
const isAllowedMonth = (date, allowedMonths) => {
    // Luxon months start at 1
    return allowedMonths.includes(date.month - 1);
};

/**
 * Check if a time is included in a time frame.
 *
 * @param {DateTime} date DateTime object.
 * @param {string} timeFrame The time frame of reference, in the format '00:00-00:00'.
 * @returns {boolean} true or false.
 */
const isInTimeFrame = (date, timeFrame) => {
    const startMatch = timeFrame.match(/^([0-9:]+)-/);
    const endMatch = timeFrame.match(/-([0-9:]+)$/);
    if (!startMatch || !endMatch) {
        console.error(
            `Wrong time frame format for ${timeFrame}. The time frame needs to follow the pattern ‘start-end’, with start and end being ISO8601 formatted time strings.`
        );
        return true;
    }

    const start = DateTime.fromISO(startMatch[1]);
    const end = DateTime.fromISO(endMatch[1]);
    if (end < start) {
        console.error(
            `Wrong time frame format for ${timeFrame}. The end time is smaller than the start time.`
        );
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
 * Check if the date time is in an allowed time frame.
 *
 * @param {DateTime} date Date to check.
 * @param {string[]} allowedTimeFrames Array of allowed time frames. Each time frame string must follow the pattern 'start-end', with start and end being ISO8601 formatted time strings.
 * @returns {boolean} true or false.
 */
const isAllowedTime = (date, allowedTimeFrames) => {
    let i = 0;
    let isAllowed = false;
    while (!isAllowed && i < allowedTimeFrames.length) {
        isAllowed = isInTimeFrame(date, allowedTimeFrames[i]);
        i += 1;
    }
    return isAllowed;
};

/**
 * Find the next allowed month, based on a starting date. If the date month is already allowed, returns the original date.
 *
 * @param {DateTime} startDate The date we start from.
 * @param {number[]} allowedMonths Array of allowed months. The months are represented by a number, starting from 0 for January, and ending with 11 for December.
 * @param {boolean} startNewMonthOnFirstDay If false, the original day of the date will be kept, even if the original date month is not allowed. Defaults to true.
 * @returns {DateTime} Date of the next allowed month.
 */
const nextAllowedMonth = (
    startDate,
    allowedMonths,
    startNewMonthOnFirstDay = true
) => {
    let date = dateTimeObjectFrom(startDate);
    if (!isAllowedMonth(date, allowedMonths)) {
        // Add a month
        date = date.plus({ months: 1 });
        if (startNewMonthOnFirstDay) {
            date = date.set({ day: 1 });
        }
        date = nextAllowedMonth(date, allowedMonths, startNewMonthOnFirstDay);
    }
    return date;
};

/**
 * Find the next allowed day of the week, based on a starting date. If the date day is already allowed, returns the original date.
 *
 * @param {DateTime} startDate The date we start from.
 * @param {number[]} allowedMonths Array of allowed months. The months are represented by a number, starting from 0 for January, and ending with 11 for December.
 * @param {number[]} allowedDays Array of allowed days of the week. The days are represented by a number, starting from 0 for Sunday, and ending with 6 for Saturday.
 * @returns {DateTime} Date of the next allowed day of the week.
 */
const nextAllowedDay = (startDate, allowedMonths, allowedDays) => {
    let date = dateTimeObjectFrom(startDate);
    if (!isAllowedDay(date, allowedDays)) {
        // Add a day
        date = date
            .plus({ days: 1 })
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
        date = nextAllowedDay(date, allowedMonths, allowedDays);

        // If the next day available is another month, make sure the month is allowed
        if (date.diff(startDate, 'months') > 0) {
            date = nextAllowedMonth(date, allowedMonths);
            date = nextAllowedDay(date, allowedMonths, allowedDays);
        }
    }
    return date;
};

/**
 * Find the next allowed time, based on a starting date. If the date time is already allowed, returns the original date.
 *
 * @param {DateTime} startDate The date we start from.
 * @param {number[]} allowedMonths Array of allowed months. The months are represented by a number, starting from 0 for January, and ending with 11 for December.
 * @param {number[]} allowedDays Array of allowed days of the week. The days are represented by a number, starting from 0 for Sunday, and ending with 6 for Saturday.
 * @param {string[]} allowedTimeFrames Array of allowed time frames. Each time frame string must follow the pattern 'start-end', with start and end being ISO8601 formatted time strings.
 * @param {string} unit The time unit (hour or minute).
 * @param {number} span Duration of each unit span. For example, the value would be 30 if the time spans are 30 minutes long.
 * @returns {DateTime} Date of the next allowed time.
 */
const nextAllowedTime = (
    startDate,
    allowedMonths,
    allowedDays,
    allowedTimeFrames,
    unit,
    span
) => {
    let date = dateTimeObjectFrom(startDate);

    if (!isAllowedTime(date, allowedTimeFrames)) {
        // Go to next time slot
        date = addToDate(date, unit, span);
        date = nextAllowedTime(
            date,
            allowedMonths,
            allowedDays,
            allowedTimeFrames,
            unit,
            span
        );

        // If the next time available is in another day, make sure the day is allowed
        if (date.diff(startDate, 'day') > 0) {
            date = nextAllowedDay(date, allowedMonths, allowedDays);
            date = nextAllowedTime(
                date,
                allowedMonths,
                allowedDays,
                allowedTimeFrames,
                unit,
                span
            );
        }
    }

    return date;
};

/**
 * Find the previous allowed month, based on a starting date. If the date month is already allowed, returns the original date.
 *
 * @param {DateTime} startDate The date we start from.
 * @param {number[]} allowedMonths Array of allowed months. The months are represented by a number, starting from 0 for January, and ending with 11 for December.
 * @param {boolean} startNewMonthOnFirstDay If false, the original day of the date will be kept, even if the original date month is not allowed. Defaults to true.
 * @returns {DateTime} Date of the previous allowed month.
 */
const previousAllowedMonth = (
    startDate,
    allowedMonths,
    startNewMonthOnFirstDay = true
) => {
    let date = dateTimeObjectFrom(startDate);
    if (!isAllowedMonth(date, allowedMonths)) {
        // Remove a month
        date = removeFromDate(date, 'months', 1);
        if (startNewMonthOnFirstDay) {
            date = date.set({ day: 1 });
        }
        date = previousAllowedMonth(
            date,
            allowedMonths,
            startNewMonthOnFirstDay
        );
    }
    return date;
};

/**
 * Find the previous allowed day of the week, based on a starting date. If the date day is already allowed, returns the original date.
 *
 * @param {DateTime} startDate The date we start from.
 * @param {number[]} allowedMonths Array of allowed months. The months are represented by a number, starting from 0 for January, and ending with 11 for December.
 * @param {number[]} allowedDays Array of allowed days of the week. The days are represented by a number, starting from 0 for Sunday, and ending with 6 for Saturday.
 * @returns {DateTime} Date of the previous allowed day of the week.
 */
const previousAllowedDay = (startDate, allowedMonths, allowedDays) => {
    let date = dateTimeObjectFrom(startDate);
    if (!isAllowedDay(date, allowedDays)) {
        // Remove a day
        date = removeFromDate(date, 'days', 1).set({
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0
        });
        date = previousAllowedDay(date, allowedMonths, allowedDays);

        // If the previous day available is another month, make sure the month is allowed
        if (date.diff(startDate, 'months') < 0) {
            date = previousAllowedMonth(date, allowedMonths);
            date = previousAllowedDay(date, allowedMonths, allowedDays);
        }
    }
    return date;
};

/**
 * Find the previous allowed time, based on a starting date. If the date time is already allowed, returns the original date.
 *
 * @param {DateTime} startDate The date we start from.
 * @param {number[]} allowedMonths Array of allowed months. The months are represented by a number, starting from 0 for January, and ending with 11 for December.
 * @param {number[]} allowedDays Array of allowed days of the week. The days are represented by a number, starting from 0 for Sunday, and ending with 6 for Saturday.
 * @param {string[]} allowedTimeFrames Array of allowed time frames. Each time frame string must follow the pattern 'start-end', with start and end being ISO8601 formatted time strings.
 * @param {string} unit The time unit (hour or minute).
 * @param {number} span Duration of each unit span. For example, the value would be 30 if the time spans are 30 minutes long.
 * @returns {DateTime} Date of the previous allowed time.
 */
const previousAllowedTime = (
    startDate,
    allowedMonths,
    allowedDays,
    allowedTimeFrames,
    unit,
    span
) => {
    let date = dateTimeObjectFrom(startDate);

    if (!isAllowedTime(date, allowedTimeFrames)) {
        // Go to previous time slot
        date = removeFromDate(date, unit, span);
        date = previousAllowedTime(
            date,
            allowedMonths,
            allowedDays,
            allowedTimeFrames,
            unit,
            span
        );

        // If the previous time available is in another day, make sure the day is allowed
        if (date.diff(startDate, 'day') < 0) {
            date = previousAllowedDay(date, allowedMonths, allowedDays);
            date = previousAllowedTime(
                date,
                allowedMonths,
                allowedDays,
                allowedTimeFrames,
                unit,
                span
            );
        }
    }

    return date;
};

/**
 * Check if an interval of time contains allowed dates/times.
 *
 * @param {DateTime} start The starting date of the interval.
 * @param {DateTime} end The ending date of the interval.
 * @param {number[]} allowedMonths Array of allowed months. The months are represented by a number, starting from 0 for January, and ending with 11 for December.
 * @param {number[]} allowedDays Array of allowed days of the week. The days are represented by a number, starting from 0 for Sunday, and ending with 6 for Saturday.
 * @param {string[]} allowedTimeFrames Array of allowed time frames. Each time frame string must follow the pattern 'start-end', with start and end being ISO8601 formatted time strings.
 * @param {string} unit The time unit (minute, hour, day, week, month or year).
 * @param {number} span Duration of each unit span. For example, the value would be 30 if the time spans are 30 minutes long.
 * @returns {DateTime} Date of the next allowed time.
 */
const containsAllowedDateTimes = (
    start,
    end,
    allowedMonths,
    allowedDays,
    allowedTimeFrames,
    unit,
    span
) => {
    const firstAllowedMonth = nextAllowedMonth(start, allowedMonths);
    if (firstAllowedMonth > end) return false;

    const firstAllowedDay = nextAllowedDay(
        firstAllowedMonth,
        allowedMonths,
        allowedDays
    );
    if (firstAllowedDay > end) return false;

    if (unit === 'minute' || unit === 'hour') {
        const computedUnit = unit === 'minute' ? 'minute' : 'hour';
        const firstAllowedTime = nextAllowedTime(
            firstAllowedDay,
            allowedMonths,
            allowedDays,
            allowedTimeFrames,
            computedUnit,
            span
        );
        return firstAllowedTime < end;
    }

    return true;
};

const getFirstAvailableWeek = (start, availableDaysOfTheWeek) => {
    let date = dateTimeObjectFrom(start);
    const availableDays = [...availableDaysOfTheWeek];
    if (availableDays[0] === 0) {
        // Transform "0" Sunday to a "7" Luxon Sunday
        availableDays[0] = 7;
        availableDays.sort();
    }

    let hasAvailableDayThisWeek = false;
    while (date.weekday !== 7 && !hasAvailableDayThisWeek) {
        hasAvailableDayThisWeek = availableDays.includes(date.weekday);
        date = addToDate(date, 'day', 1);
    }
    if (!hasAvailableDayThisWeek) {
        return addToDate(start, 'week', 1);
    }
    return start;
};

const isAllDay = (event, from, to) => {
    const startAtBeginningOfDay = from.startOf('day').ts === from.ts;
    // A time set to 23:59 is considered to be at the end of the day,
    // even if the seconds/ms are not at 59
    const endAtEndOfDay = to.endOf('day').ts === to.endOf('minute').ts;
    return event.allDay || (startAtBeginningOfDay && endAtEndOfDay);
};

const spansOnMoreThanOneDay = (event, from, to) => {
    const differentStartAndEndDay = from.day !== to.day;
    const hasWeekdayRecurrence = normalizeArray(
        event.recurrenceAttributes && event.recurrenceAttributes.weekdays
    );
    return (
        (isAllDay(event, from, to) || differentStartAndEndDay) &&
        !hasWeekdayRecurrence.length
    );
};

export {
    containsAllowedDateTimes,
    getFirstAvailableWeek,
    isAllDay,
    isAllowedDay,
    isAllowedTime,
    nextAllowedDay,
    nextAllowedMonth,
    nextAllowedTime,
    previousAllowedDay,
    previousAllowedMonth,
    previousAllowedTime,
    spansOnMoreThanOneDay
};
