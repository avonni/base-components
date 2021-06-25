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
import { formatTime, isInTimeFrame } from './dateUtils';

export default class Header {
    constructor(props) {
        this.key = this.generateKey;
        this.unit = props.unit;
        this.span = props.span;
        this.label = props.label;
        this.columns = [];
        this.columnWidths = [];
        this.isReference = props.isReference;
        this.numberOfColumns = props.numberOfColumns;
        this.childKey = null;
        this.end = props.end;
        this._start = props.start;
        this._timeFrames = props.timeFrames;
        this._daysOfTheWeek = props.daysOfTheWeek;
        this._months = props.months;

        this.computeColumns();
    }

    get start() {
        return this._start;
    }
    set start(value) {
        this._start = value;
        this.computeColumns();
    }

    get daysOfTheWeek() {
        return this._daysOfTheWeek;
    }
    set daysOfTheWeek(value) {
        this._daysOfTheWeek = value;
        this.computeColumns();
    }

    get months() {
        return this._months;
    }
    set months(value) {
        this._months = value;
        this.computeColumns();
    }

    get timeFrames() {
        return this._timeFrames;
    }
    set timeFrames(value) {
        this._timeFrames = value;
        this.computeColumns();
    }

    get generateKey() {
        return generateUniqueId();
    }

    computeColumns() {
        const { unit, label, end, span, columns, numberOfColumns } = this;
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

            this.columns.push({
                label: formatTime(date, label),
                time: date.ts
            });
            const options = {};
            options[unit] = span;
            date = date.plus(options);

            if (end && end.startOf(unit) < date.startOf(unit)) {
                this.numberOfColumns = columns.length;
                break;
            }
        }
    }

    isAllowedTime(date) {
        let i = 0;
        let isAllowed = false;
        while (!isAllowed && i < this.timeFrames.length) {
            isAllowed = isInTimeFrame(date, this.timeFrames[i]);
            i += 1;
        }
        return isAllowed;
    }

    isAllowedDay(date) {
        // Luxon week days start at 1
        return this.daysOfTheWeek.includes(date.weekday - 1);
    }

    isAllowedMonth(date) {
        // Luxon months start at 1
        return this.months.includes(date.month - 1);
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
            const options = {};
            options[this.unit] = this.span;
            date = date.plus(options);
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
