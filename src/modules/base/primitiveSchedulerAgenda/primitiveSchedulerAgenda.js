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

import { api } from 'lwc';
import { addToDate, dateTimeObjectFrom, removeFromDate } from 'c/utilsPrivate';
import { generateUUID } from 'c/utils';
import { Interval } from 'c/luxon';
import {
    getFirstAvailableWeek,
    nextAllowedDay,
    nextAllowedMonth,
    ScheduleBase
} from 'c/schedulerUtils';
import DayGroup from './dayGroup';

const DEFAULT_SELECTED_DATE = new Date();

export default class PrimitiveSchedulerAgenda extends ScheduleBase {
    _selectedDate;

    computedGroups = [];
    start;

    connectedCallback() {
        this.setStartToBeginningOfUnit();
        super.connectedCallback();
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Object used to set the duration of the timeline. It should have two keys:
     * * unit (minute, hour, day, week, month or year)
     * * span (number).
     *
     * @type {object}
     * @public
     * @default { unit: 'day', span: 1 }
     */
    @api
    get timeSpan() {
        return super.timeSpan;
    }
    set timeSpan(value) {
        super.timeSpan = value;

        if (this._connected) {
            this.setStartToBeginningOfUnit();
        }
    }

    /**
     * Specifies the selected date/timedate on which the calendar should be centered. It can be a Date object, timestamp, or an ISO8601 formatted string.
     *
     * @type {(Date|number|string)}
     * @public
     * @default new Date()
     */
    @api
    get selectedDate() {
        return this._selectedDate;
    }
    set selectedDate(value) {
        this._selectedDate =
            dateTimeObjectFrom(value) ||
            dateTimeObjectFrom(DEFAULT_SELECTED_DATE);

        if (this._connected) {
            this.setStartToBeginningOfUnit();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    get resourceOptions() {
        return this.resources.map((res) => {
            const style = `
                --sds-c-checkbox-color-background-checked: ${res.color}; --slds-c-checkbox-color-border: ${res.color};
                --slds-c-checkbox-mark-color-foreground: #fff;
                --sds-c-checkbox-shadow-focus: 0 0 3px ${res.color};
                --slds-c-checkbox-color-border-focus: ${res.color};
            `;
            return {
                label: res.label || res.name,
                selected: this.selectedResources.includes(res.name),
                style,
                value: res.name
            };
        });
    }

    get uniqueKey() {
        return generateUUID();
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    initEventGroups() {
        // Add the occurrences to each day it crosses in the map
        const dayMap = {};
        this.computedEvents.forEach((event) => {
            event.occurrences.forEach((occ) => {
                const interval = Interval.fromDateTimes(occ.from, occ.to);
                const days = interval.count('days');
                let date = occ.from;

                for (let i = 0; i < days; i++) {
                    const ISODay = date.toFormat('yyyy-LL-dd');
                    if (!dayMap[ISODay]) {
                        dayMap[ISODay] = [];
                    }
                    dayMap[ISODay].push({
                        ...occ,
                        event,
                        startsInPreviousCell: occ.from.day < date.day,
                        endsInLaterCell: occ.to.day > date.day
                    });
                    date = addToDate(date, 'day', 1);
                }
            });
        });

        if (!Object.keys(dayMap).length) {
            this.computedGroups = [];
            return;
        }

        // Create a group for each day and sort them by date
        const groups = [];
        Object.entries(dayMap).forEach(([ISODay, events]) => {
            const date = dateTimeObjectFrom(ISODay);
            const today = new Date().toISOString().split('T')[0];
            groups.push(new DayGroup({
                date,
                events,
                isToday: ISODay === today
            }));
        });
        groups.sort((a, b) => a.date - b.date);
        this.computedGroups = groups;
    }

    initEvents() {
        super.initEvents();
        this._eventData.smallestHeader = { unit: 'day', span: 1 };
        this._eventData.initEvents();
        this.initEventGroups();
    }

    initResources() {
        this.computedResources = this.resources.map((res) => {
            return { ...res, height: 0, data: { res } };
        });
    }

    setSelectedDateToAvailableDate() {
        this._selectedDate = nextAllowedMonth(
            this.selectedDate,
            this.availableMonths
        );
        this._selectedDate = nextAllowedDay(
            this.selectedDate,
            this.availableMonths,
            this.availableDaysOfTheWeek
        );
    }

    setStartToBeginningOfUnit() {
        this.setSelectedDateToAvailableDate();
        const isSunday = this.selectedDate.weekday === 7;

        if (this.isDay || (this.isWeek && isSunday)) {
            this.start = this.selectedDate.startOf('day');
        } else if (this.isYear) {
            this.start = this.selectedDate.startOf('year');
        } else {
            this.start = this.selectedDate;

            if (this.isMonth) {
                this.start = this.start.startOf('month');

                if (this.start.weekday !== 7) {
                    // Make sure there are available days in the current week.
                    // Otherwise, go to the next week.
                    this.start = getFirstAvailableWeek(
                        this.start,
                        this.availableDaysOfTheWeek
                    );
                }
            }

            if (this.start.weekday !== 7) {
                this.start = this.start.startOf('week');
                this.start = removeFromDate(this.start, 'day', 1);
            }
        }

        const { span, unit } = this.timeSpan;
        const end = addToDate(this.start, unit, span);
        this.visibleInterval = Interval.fromDateTimes(this.start, end);
        this.dispatchVisibleIntervalChange(this.start, this.visibleInterval);
        this.initEvents();
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS AND DISPATCHERS
     * -------------------------------------------------------------
     */
}
