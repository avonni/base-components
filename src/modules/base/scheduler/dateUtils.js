/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2021, Avonni Labs, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * - Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { DateTime } from 'c/luxon';

const FORMATS = [
    {
        pattern: /<ss>/g,
        rule: { second: '2-digit' }
    },
    {
        pattern: /<s>/g,
        rule: { second: 'numeric' }
    },
    {
        pattern: /<mm>/g,
        rule: { minute: '2-digit' }
    },
    {
        pattern: /<m>/g,
        rule: { minute: 'numeric' }
    },
    {
        pattern: /<HH>/g,
        rule: { hour: '2-digit' }
    },
    {
        pattern: /<H>/g,
        rule: { hour: 'numeric' }
    },
    {
        pattern: /<dddd>/g,
        rule: { weekday: 'long' }
    },
    {
        pattern: /<ddd>/g,
        rule: { weekday: 'short' }
    },
    {
        pattern: /<d>/g,
        rule: { weekday: 'narrow' }
    },
    {
        pattern: /<DD>/g,
        rule: { day: '2-digit' }
    },
    {
        pattern: /<D>/g,
        rule: { day: 'numeric' }
    },
    {
        pattern: /<MMMM>/g,
        rule: { month: 'long' }
    },
    {
        pattern: /<MMM>/g,
        rule: { month: 'short' }
    },
    {
        pattern: /<MM>/g,
        rule: { month: '2-digit' }
    },
    {
        pattern: /<M>/g,
        rule: { month: 'numeric' }
    },
    {
        pattern: /<YYYY>/g,
        rule: { year: 'numeric' }
    },
    {
        pattern: /<YY>/g,
        rule: { year: '2-digit' }
    }
];

/**
 * Converts a timestamp or a date object into a Luxon DateTime object.
 * @param {number} - Timestamp to convert
 * @returns {object} DateTime object or false
 */
const dateTimeObjectFrom = (date) => {
    let time;
    if (date instanceof Date) {
        time = date.getTime();
    } else if (!isNaN(new Date(date).getTime())) {
        time = new Date(date).getTime();
    }

    return DateTime.fromMillis(time);
};

/**
 * @param {number} time - Timestamp used as a reference by the formatter
 * @param {string} stringToFormat - String containing the formatting pattern
 * @returns {string} Formatted string
 */
const formatTime = (time, stringToFormat) => {
    const date = new Date(time);
    let result = stringToFormat;

    FORMATS.forEach((format) => {
        const formattedDate = date.toLocaleString('default', format.rule);
        result = result.replaceAll(format.pattern, formattedDate);
    });

    return result;
};

/**
 * Checks if a time is included in a time frame.
 * @param {DateTime} date - DateTime object
 * @param {string} timeFrame - The time frame of reference, in the format '00:00-00:00'
 * @returns {boolean} true or false
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
 * Checks the number of minutes in one specific unit
 * @param {string} timeFrame - The time frame of reference, in the format '00:00-00:00'
 * @param {string} unit - The unit (hour, day, week, month or year)
 * @returns {number} Number of minutes in one unit
 */
const allowedMinutesInUnit = (timeFrame, unit) => {
    const startMatch = timeFrame.match(/^([0-9]{2}):([0-9]{2})/);
    const endMatch = timeFrame.match(/-([0-9]{2}):([0-9]{2})/);
    if (!startMatch || !endMatch) return false;

    const startHour = Number(startMatch[1]);
    const startMinute = Number(startMatch[2]);
    const start = new Date(2021, 0, 0, startHour, startMinute, 0, 0);

    const endHour = Number(endMatch[1]);
    const endMinute = Number(endMatch[2]);
    const end = new Date(2021, 0, 0, endHour, endMinute, 0, 0);

    const minutesInADay = (end - start) / 60000;

    let minutesInUnit;
    switch (unit) {
        case 'hour':
            minutesInUnit = minutesInADay / 24;
            break;
        case 'week':
            minutesInUnit = 7 * minutesInADay;
            break;
        case 'month':
            minutesInUnit = Math.floor(30.4167 * minutesInADay);
            break;
        case 'year':
            minutesInUnit = 365 * minutesInADay;
            break;
        default:
            minutesInUnit = minutesInADay;
            break;
    }
    return minutesInUnit;
};

/**
 * Checks the number of hours in one specific unit
 * @param {string} timeFrame - The time frame of reference, in the format '00:00-00:00'
 * @param {string} unit - The unit (day, week, month or year)
 * @returns {number} Number of hours in one unit
 */
const allowedHoursInUnit = (timeFrame, unit) => {
    let hoursInADay = 0;

    for (let i = 0; i < 24; i++) {
        const time = new Date().setHours(i, 0, 0, 0);

        if (isInTimeFrame(DateTime.fromMillis(time), timeFrame)) {
            hoursInADay += 1;
        }
    }

    let hoursInUnit;
    switch (unit) {
        case 'week':
            hoursInUnit = 7 * hoursInADay;
            break;
        case 'month':
            hoursInUnit = Math.floor(30.4167 * hoursInADay);
            break;
        case 'year':
            hoursInUnit = 365 * hoursInADay;
            break;
        default:
            hoursInUnit = hoursInADay;
            break;
    }
    return hoursInUnit;
};

/**
 * Checks the number of days in one specific unit
 * @param {string} timeFrame - The time frame of reference, in the format '00:00-00:00'
 * @param {string} unit - The unit (week, month or year)
 * @returns {number} Number of days in one unit
 */
const allowedDaysInUnit = (allowedDaysInAWeek, unit) => {
    const daysInAWeek = allowedDaysInAWeek.length;

    let daysInUnit;
    switch (unit) {
        case 'month':
            daysInUnit = Math.floor(4.34524 * daysInAWeek);
            break;
        case 'year':
            daysInUnit = 52 * daysInAWeek;
            break;
        default:
            daysInUnit = daysInAWeek;
            break;
    }

    return daysInUnit;
};

export {
    formatTime,
    dateTimeObjectFrom,
    isInTimeFrame,
    allowedHoursInUnit,
    allowedDaysInUnit,
    allowedMinutesInUnit
};
