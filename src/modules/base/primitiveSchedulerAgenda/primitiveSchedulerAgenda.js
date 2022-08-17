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
import { addToDate, dateTimeObjectFrom } from 'c/utilsPrivate';
import { generateUUID } from 'c/utils';
import { Interval } from 'c/luxon';
import {
    getElementOnYAxis,
    isAllDay,
    isAllowedDay,
    nextAllowedDay,
    nextAllowedMonth,
    ScheduleBase
} from 'c/schedulerUtils';
import DayGroup from './dayGroup';
import { spansOnMoreThanOneDay } from '../schedulerUtils/dateComputations';

const DEFAULT_SELECTED_DATE = new Date();

export default class PrimitiveSchedulerAgenda extends ScheduleBase {
    _selectedDate = dateTimeObjectFrom(DEFAULT_SELECTED_DATE);

    _computedEvents = [];
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
            this.initLeftPanelCalendarDisabledDates();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Events computed by the `SchedulerEventData` class instance. The setter is called every time the events are refreshed in `_eventData`, allowing for the groups to be updated too.
     *
     * @type {object[]}
     */
    get computedEvents() {
        return this._computedEvents;
    }
    set computedEvents(value) {
        this._computedEvents = value;
        this.initEventGroups();
    }

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
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    @api
    newEvent(x, y, saveEvent) {
        const dayGroupElement = getElementOnYAxis(
            this.template,
            y,
            '[data-element-id="div-day-group"]'
        );
        const date = dateTimeObjectFrom(Number(dayGroupElement.dataset.date));
        const from = date.startOf('day');
        const to = from.endOf('day');
        const resourceNames = [this.firstSelectedResource.name];
        this._eventData.newEvent({ from, resourceNames, to, x, y }, saveEvent);
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
                const from = occ.from;
                const to = event.referenceLine ? from.endOf('day') : occ.to;
                const interval = Interval.fromDateTimes(from, to);
                const days = interval.count('days');
                let date = from;

                for (let i = 0; i < days; i++) {
                    const isVisible = this.visibleInterval.contains(date);
                    const isAllowed = isAllowedDay(
                        date,
                        this.availableDaysOfTheWeek
                    );
                    if (!isVisible || !isAllowed) {
                        // Do not display the days outside of the visible interval
                        date = addToDate(date, 'day', 1);
                        continue;
                    }

                    const ISODay = date.startOf('day').toISO();

                    if (!dayMap[ISODay]) {
                        dayMap[ISODay] = [];
                    }
                    dayMap[ISODay].push({
                        ...occ,
                        endsInLaterCell: to.day > date.day,
                        event,
                        startsInPreviousCell: from.day < date.day,
                        time: this.formatTime(event, from, to)
                    });
                    date = addToDate(date, 'day', 1);
                }
            });
        });

        if (!Object.keys(dayMap).length) {
            this.computedGroups = [];
            return;
        }

        // Sort the days and create a group for each
        const days = Object.entries(dayMap).sort((a, b) => {
            return new Date(a[0]) - new Date(b[0]);
        });
        const groups = [];
        let currentMonth;
        days.forEach(([ISODay, events]) => {
            const date = dateTimeObjectFrom(ISODay);
            const today = dateTimeObjectFrom(new Date()).startOf('day');
            groups.push(
                new DayGroup({
                    date,
                    events,
                    isFirstDayOfMonth:
                        this.isYear && date.month !== currentMonth,
                    isToday: ISODay === today.toISO()
                })
            );
            currentMonth = date.month;
        });
        this.computedGroups = groups;
    }

    initEvents() {
        super.initEvents();
        this._eventData.smallestHeader = { unit: 'hour', span: 1 };
        this._eventData.isAgenda = true;
        this._eventData.initEvents();
    }

    initResources() {
        this.computedResources = this.resources.map((res) => {
            return { ...res, height: 0, data: { res } };
        });
    }

    formatTime(event, from, to) {
        if (event.referenceLine) {
            return from.toFormat('HH:mm');
        } else if (isAllDay(event, from, to)) {
            return 'All Day';
        } else if (spansOnMoreThanOneDay(event, from, to)) {
            return `${from.toFormat('dd LLL')} - ${to.toFormat('dd LLL')}`;
        }
        return `${from.toFormat('HH:mm')} - ${to.toFormat('HH:mm')}`;
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
        super.setStartToBeginningOfUnit();

        const { span, unit } = this.timeSpan;
        if (unit === 'month') {
            this.start = this.selectedDate.startOf('month');
        }

        const end = dateTimeObjectFrom(addToDate(this.start, unit, span) - 1);
        this.visibleInterval = Interval.fromDateTimes(this.start, end);
        this.dispatchVisibleIntervalChange(this.start, this.visibleInterval);
        this.initEvents();
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS AND DISPATCHERS
     * -------------------------------------------------------------
     */

    stopPropagation(event) {
        event.stopPropagation();
    }
}
