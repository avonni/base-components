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

import { generateUniqueId } from 'c/utils';
import { DateTime } from 'c/luxon';
import { isInTimeFrame, addToDate } from './dateUtils';

/**
 * Scheduler header
 * @class
 * @param {string} key Unique identifier for the header
 * @param {string} unit Unit used by the header (minute, hour, day, week, month or year)
 * @param {number} span Number of unit in one column of the header
 * @param {string} label Pattern of the columns labels
 * @param {object[]} columns Array of column objects. Each object has two keys: time and label.
 * @param {number[]} columnWidths Array of column widths in percent
 * @param {boolean} isHidden If true, the header will be hidden
 * @param {boolean} isReference If true, the header unit is the one used by the visibleSpan of the parent Scheduler
 * @param {number} numberOfColumns Number of columns in the header
 * @param {string} childKey Contains the key of the next smaller unit header, if one exists
 * @param {DateTime} end End date of the header
 * @param {DateTime} start Start date of the header
 * @param {string[]} availableTimeFrames Array of available time frames
 * @param {number[]} availableDaysOfTheWeek Array of available days
 * @param {number[]} availableMonths Array of available months
 */
export default class Header {
    constructor(props) {
        this.availableDaysOfTheWeek = props.availableDaysOfTheWeek;
        this.availableMonths = props.availableMonths;
        this.availableTimeFrames = props.availableTimeFrames;
        this.childKey = null;
        this.columns = [];
        this.columnWidths = [];
        this.isHidden = props.isHidden;
        this.isReference = props.isReference;
        this.key = this.generateKey;
        this.label = props.label;
        this.numberOfColumns = props.numberOfColumns;
        this.span = props.span;
        this.start = props.start;
        this._end = props.end;
        this.unit = props.unit;

        this.computeColumns();
    }

    get end() {
        return this._end;
    }
    set end(value) {
        this._end = value;

        if (this.columns.length) {
            this.columns[this.columns.length - 1].end = value.ts;
        }
    }

    get generateKey() {
        return generateUniqueId();
    }

    get maxColumnDuration() {
        // We take one millisecond off to exclude the next unit
        const columnEnd = addToDate(this.start, this.unit, this.span) - 1;
        return DateTime.fromMillis(columnEnd).diff(this.start).milliseconds;
    }

    computeColumns() {
        const { unit, label, end, span, numberOfColumns } = this;
        this.columns = [];
        let date = DateTime.fromMillis(this.start.ts);

        // For each column
        for (let i = 0; i < numberOfColumns; i++) {
            date = this.nextAllowedMonth(date);

            // We don't want to take the day or time of the date into account
            // if the header does not use them
            if (unit !== 'month' && unit !== 'year' && unit !== 'week') {
                date = this.nextAllowedDay(date);
                if (unit !== 'day') {
                    date = this.nextAllowedTime(date);
                }
            }

            // if (this.columns.length) {
            //     this.columns[i - 1].end = date.ts - 1;
            // }

            this.columns.push({
                label: date.startOf(unit).toFormat(label),
                start: date.ts,
                end: addToDate(date, 'millisecond', this.maxColumnDuration)
            });

            date = addToDate(date, unit, span);

            // Make sure the current date is not bigger than the end
            if (!this.isReference) {
                let dateUnit;
                let endUnit;

                if (unit === 'week') {
                    dateUnit = addToDate(date, 'day', 1).endOf(unit);
                    endUnit = addToDate(end, 'day', 1).endOf(unit);
                } else {
                    dateUnit = date.endOf(unit);
                    endUnit = end.endOf(unit);
                }

                if (endUnit < dateUnit) {
                    this.numberOfColumns = this.columns.length;
                    this.columns[this.columns.length - 1].end = end.ts;
                    break;
                }
            }
        }

        this._start = DateTime.fromMillis(this.columns[0].start);
    }

    isAllowedTime(date) {
        let i = 0;
        let isAllowed = false;
        while (!isAllowed && i < this.availableTimeFrames.length) {
            isAllowed = isInTimeFrame(date, this.availableTimeFrames[i]);
            i += 1;
        }
        return isAllowed;
    }

    isAllowedDay(date) {
        // Luxon week days start at Monday = 1
        const normalizedDate = date.weekday % 7;
        return this.availableDaysOfTheWeek.includes(normalizedDate);
    }

    isAllowedMonth(date) {
        // Luxon months start at 1
        return this.availableMonths.includes(date.month - 1);
    }

    nextAllowedMonth(startDate) {
        let date = DateTime.fromMillis(startDate.ts);
        if (!this.isAllowedMonth(date)) {
            // Add a month
            date = date.plus({ months: 1 }).set({ day: 1 });
            date = this.nextAllowedMonth(date);
        }
        return date;
    }

    nextAllowedDay(startDate) {
        let date = DateTime.fromMillis(startDate.ts);
        if (!this.isAllowedDay(date)) {
            // Add a day
            date = date
                .plus({ days: 1 })
                .set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
            date = this.nextAllowedDay(date);

            // If the next day available is another month, make sure the month is allowed
            if (date.diff(startDate, 'months') > 0) {
                date = this.nextAllowedMonth(date);
                date = this.nextAllowedDay(date);
            }
        }
        return date;
    }

    nextAllowedTime(startDate) {
        let date = DateTime.fromMillis(startDate.ts);

        if (!this.isAllowedTime(date)) {
            // Go to next time slot
            date = addToDate(date, this.unit, this.span);
            date = this.nextAllowedTime(date);

            // If the next time available is in another day, make sure the day is allowed
            if (date.diff(startDate, 'day') > 0) {
                date = this.nextAllowedDay(date);
                date = this.nextAllowedTime(date);
            }
        }

        return date;
    }
}
