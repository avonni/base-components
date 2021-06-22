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
        this.millisecondsPerCol = props.millisecondsPerCol;
        this.numberOfColumns = props.numberOfColumns;
        this.childKey = null;
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
        this.columns = [];
        let time = this.start.getTime();

        // For each column
        for (let i = 0; i < this.numberOfColumns; i++) {
            time = this.nextAllowedMonth(time);

            // We don't want to take the day or time of the date into account
            // if the header does not use them
            if (
                this.unit !== 'month' &&
                this.unit !== 'year' &&
                this.unit !== 'week'
            ) {
                time = this.nextAllowedDay(time);

                if (this.unit !== 'day') {
                    time = this.nextAllowedTime(time);
                }
            }

            this.columns.push({
                label: formatTime(time, this.label),
                time: time
            });
            time += this.millisecondsPerCol;
        }
    }

    isAllowedTime(time) {
        let i = 0;
        let isAllowed = false;
        while (!isAllowed && i < this.timeFrames.length) {
            isAllowed = isInTimeFrame(time, this.timeFrames[i]);
            i += 1;
        }
        return isAllowed;
    }

    isAllowedDay(time) {
        const day = new Date(time).getDay();
        return this.daysOfTheWeek.includes(day);
    }

    isAllowedMonth(time) {
        const month = new Date(time).getMonth();
        return this.months.includes(month);
    }

    nextAllowedMonth(startTime) {
        let time = startTime;
        if (!this.isAllowedMonth(time)) {
            // Add a month
            const date = new Date(time);
            time = date.setMonth(date.getMonth() + 1);
            time = this.nextAllowedMonth(time);
        }
        return time;
    }

    nextAllowedDay(startTime) {
        let time = startTime;
        if (!this.isAllowedDay(time)) {
            // Add a day
            const date = new Date(time);
            time = date.setDate(date.getDate() + 1);
            time = this.nextAllowedDay(time);
        }
        return time;
    }

    nextAllowedTime(startTime) {
        let time = startTime;
        if (!this.isAllowedTime(time)) {
            // Go to next time slot
            time += this.millisecondsPerCol;
            time = this.nextAllowedTime(time);
        }

        return time;
    }
}
