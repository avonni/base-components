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

import {
    normalizeArray,
    normalizeBoolean,
    normalizeString
} from 'c/utilsPrivate';
import { addToDate, dateTimeObjectFrom } from './dateUtils';
import { RECURRENCES, EVENTS_THEMES } from './defaults';

/**
 * Scheduler event
 * @class
 * @param {string[]} keyFields Required. Array of unique row IDs. The event will be shown in the scheduler for each of these rows.
 * @param {string} title Title of the event.
 * @param {string} iconName The Lightning Design System name of the icon. Names are written in the format utility:user. The icon is appended to the left of the title.
 * @param {(object|number|string)} from Required. Start of the event. It can be a Date object, timestamp, or an ISO8601 formatted string.
 * @param {(object|number|string)} to Required if allDay is not true. End of the event. It can be a Date object, timestamp, or an ISO8601 formatted string.
 * @param {boolean} allDay If true, the event will be applied to the whole day(s). Defaults to false.
 * @param {string} name Required. Unique name for the event. It will be returned by the eventclick event.
 * @param {string} recurrence Recurrence of the event. Valid values include daily, weekly, monthly and yearly.
 * @param {(object|number|string)} recurrenceEndDate End of the recurrence. It can be a Date object, timestamp, or an ISO8601 formatted string.
 * If a recurrenceCount is also given, the earliest ending date will be used.
 * @param {number} recurrenceCount Number of times the event will be repeated before the recurrence stops.
 * If a recurrenceEndDate is also given, the earliest ending date will be used.
 * @param {object} recurrenceAttributes Attributes specific to the recurrence type (see available attributes in the table below).
 * @param {string} color Custom color for the event. If present, it will overwrite the default color.
 * It has to be a valid {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value CSS color value}. For example #3A7D44 or rgba(58, 125, 68, 0.8)
 * @param {string} theme Custom theme for the event. If present, it will overwrite the default event theme. Valid values include default, transparent, line, hollow and rounded.
 */
export default class Event {
    constructor(props) {
        this.allDay = normalizeBoolean(props.allDay);
        this.color = props.color;

        this.schedulerEnd = props.schedulerEnd;

        const from = dateTimeObjectFrom(props.from);
        this.from = this.allDay ? from.startOf('day') : from;

        const to = this.allDay
            ? addToDate(this.from, 'day', 1)
            : dateTimeObjectFrom(props.to);
        this.to = this.schedulerEnd < to ? this.schedulerEnd : to;

        this.dates = [
            {
                from: this.from,
                to: this.to
            }
        ];

        this.iconName = props.iconName;
        this.keyFields = normalizeArray(props.keyFields);
        const recurrence = RECURRENCES.find(
            (recurrenceObject) => recurrenceObject.name === props.recurrence
        );

        if (recurrence) {
            this.recurrence = recurrence;
            this.recurrenceAttributes =
                typeof props.recurrenceAttributes === 'object'
                    ? props.recurrenceAttributes
                    : undefined;
            this.recurrenceEndDate = dateTimeObjectFrom(
                props.recurrenceEndDate
            );
            this.recurrenceCount = Number(props.recurrenceCount);

            this.computeRecurrence();
        }

        this.theme = normalizeString(props.theme, {
            fallbackValue: undefined,
            validValues: EVENTS_THEMES.valid
        });
        this.title = props.title;
        this.name = props.name;

        this.width = 0;
    }

    get duration() {
        return this.to.diff(this.from).milliseconds;
    }

    computeRecurrence() {
        const { recurrence, to, from, schedulerEnd } = this;
        const endDate = this.recurrenceEndDate;
        const attributes = this.recurrenceAttributes;
        const interval =
            attributes && attributes.interval ? attributes.interval : 1;
        const count = this.recurrenceCount > 1 ? this.recurrenceCount - 1 : 1;
        const countEnd =
            this.recurrenceCount &&
            addToDate(from, recurrence.unit, count * interval);

        // If there is a recurrence end or a recurrence count, use the shortest as the end
        // Else, use the scheduler end
        let end = endDate && endDate < schedulerEnd ? endDate : schedulerEnd;
        if (countEnd && countEnd < end) {
            end = countEnd;
        }

        let date = addToDate(from, 'day', interval);

        switch (this.recurrence.name) {
            case 'daily':
                while (date <= end) {
                    // Make sure the end time is in the future
                    const endHour = to.hour > from.hour ? to.hour : 23;
                    const endMinute =
                        to.minutes > from.minutes ? to.minutes : 59;
                    const endSecond =
                        to.seconds > from.seconds ? to.seconds : 59;

                    this.dates.push({
                        from: date,
                        to: date.set({
                            hours: endHour,
                            minutes: endMinute,
                            seconds: endSecond
                        })
                    });
                    date = addToDate(date, 'day', interval);
                }
                break;
            default:
                break;
        }
    }

    updateWidth({ columnDuration, columns }) {
        // Find the column where the event starts
        let i = columns.findIndex((column) => {
            return column.end > this.from;
        });

        if (i < 0) return;

        let width = 0;

        // Add the width of the columns completely filled by the event
        while (i < columns.length) {
            if (columns[i].end > this.to) break;
            width += 100;
            i += 1;
        }

        // If the event ends in the middle of a column,
        // add the remaining width
        if (columns[i] && columns[i].start < this.to) {
            const columnStart = dateTimeObjectFrom(columns[i].start);
            const eventDurationLeft = this.to.diff(columnStart).milliseconds;
            width += (eventDurationLeft * 100) / columnDuration;
        }

        this.width = width;
    }
}
