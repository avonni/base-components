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

import { DateTime, Interval } from 'c/luxon';

/**
 * Convert a timestamp or a date object into a Luxon DateTime object.
 * @param {(number | Date)} date Timestamp or date object to convert
 * @returns {(DateTime | false)} DateTime object or false
 */
const dateTimeObjectFrom = (date) => {
    let time;
    if (date instanceof Date) {
        time = date.getTime();
    } else if (!isNaN(new Date(date).getTime())) {
        time = new Date(date).getTime();
    }

    if (time) return DateTime.fromMillis(time);
    return false;
};

/**
 * Check if a time is included in a time frame.
 * @param {DateTime} date DateTime object
 * @param {string} timeFrame The time frame of reference, in the format '00:00-00:00'
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
 * Add unit * span to the date
 * @param {DateTime} date The date we want to add time to
 * @param {string} unit The unit (minute, hour, day, week, month or year)
 * @param {number} span The number of unit to add
 * @returns {DateTime} DateTime object with the added time
 */
const addToDate = (date, unit, span) => {
    const options = {};
    options[unit] = span;
    return date.plus(options);
};

const numberOfUnitsBetweenDates = (unit, start, end) => {
    // Compensate the fact that luxon weeks start on Monday
    const isWeek = unit === 'week';
    let normalizedStart = isWeek ? addToDate(start, 'day', 1) : start;
    let normalizedEnd = isWeek ? addToDate(end, 'day', 1) : end;

    const interval = Interval.fromDateTimes(normalizedStart, normalizedEnd);
    return interval.count(unit);
};

export {
    addToDate,
    dateTimeObjectFrom,
    isInTimeFrame,
    numberOfUnitsBetweenDates
};
