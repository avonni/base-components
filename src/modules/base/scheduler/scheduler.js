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

import { LightningElement, api } from 'lwc';
import { DateTime } from 'c/luxon';
import { generateUniqueId } from 'c/utils';
import { normalizeArray, normalizeString } from 'c/utilsPrivate';
import {
    dateTimeObjectFrom,
    addToDate,
    numberOfUnitsBetweenDates,
    nextAllowedMonth,
    nextAllowedDay,
    nextAllowedTime
} from './dateUtils';
import {
    EVENTS_THEMES,
    EVENTS_PALETTES,
    THEMES,
    DEFAULT_START_DATE,
    DEFAULT_VISIBLE_SPAN,
    PALETTES,
    UNITS,
    DEFAULT_AVAILABLE_DAYS_OF_THE_WEEK,
    DEFAULT_AVAILABLE_TIME_FRAMES,
    DEFAULT_AVAILABLE_MONTHS
} from './defaults';
import Header from './header';
import Row from './row';
import Event from './event';

export default class Scheduler extends LightningElement {
    _availableDaysOfTheWeek = DEFAULT_AVAILABLE_DAYS_OF_THE_WEEK;
    _availableMonths = DEFAULT_AVAILABLE_MONTHS;
    _availableTimeFrames = DEFAULT_AVAILABLE_TIME_FRAMES;
    _columns = [];
    _customEventsPalette = [];
    _disabledDatesTimes = [];
    _eventsPalette = EVENTS_PALETTES.default;
    _eventsTheme = EVENTS_THEMES.default;
    _headers = [];
    _rows = [];
    _rowsKeyField;
    _start = DEFAULT_START_DATE;
    _theme = THEMES.default;
    _visibleSpan = DEFAULT_VISIBLE_SPAN;

    _referenceHeader;
    computedHeaders = [];
    computedRows = [];
    computedEvents = [];

    connectedCallback() {
        this.initSchedule();
    }

    renderedCallback() {
        this.updateHeadersStyle();
        this.updateBodyStyle();
        this.updateEventsStyle();
    }

    @api
    get availableDaysOfTheWeek() {
        return this._availableDaysOfTheWeek;
    }
    set availableDaysOfTheWeek(value) {
        const days = normalizeArray(value);
        this._availableDaysOfTheWeek =
            days.length > 0 ? days : DEFAULT_AVAILABLE_DAYS_OF_THE_WEEK;

        if (this.isConnected) this.initSchedule();
    }

    @api
    get availableMonths() {
        return this._availableMonths;
    }
    set availableMonths(value) {
        const months = normalizeArray(value);
        this._availableMonths =
            months.length > 0 ? months : DEFAULT_AVAILABLE_MONTHS;

        if (this.isConnected) this.initSchedule();
    }

    @api
    get availableTimeFrames() {
        return this._availableTimeFrames;
    }
    set availableTimeFrames(value) {
        const timeFrames = normalizeArray(value);
        this._availableTimeFrames =
            timeFrames.length > 0 ? timeFrames : DEFAULT_AVAILABLE_TIME_FRAMES;

        if (this.isConnected) this.initSchedule();
    }

    @api
    get columns() {
        return this._columns;
    }
    set columns(value) {
        this._columns = normalizeArray(value);
    }

    @api
    get customEventsPalette() {
        return this._customEventsPalette;
    }
    set customEventsPalette(value) {
        this._customEventsPalette = normalizeArray(value);
    }

    @api
    get disabledDatesTimes() {
        return this._disabledDatesTimes;
    }
    set disabledDatesTimes(value) {
        this._disabledDatesTimes = normalizeArray(value);
    }

    @api
    get events() {
        return this._events;
    }
    set events(value) {
        this._events = normalizeArray(value);

        if (this.isConnected) {
            this.initEvents();
            this.initRows();
        }
    }

    @api
    get eventsPalette() {
        return this._eventsPalette;
    }
    set eventsPalette(value) {
        this._eventsPalette = normalizeString(value, {
            fallbackValue: EVENTS_PALETTES.default,
            validValues: EVENTS_PALETTES.valid
        });
    }

    @api
    get eventsTheme() {
        return this._eventsTheme;
    }
    set eventsTheme(value) {
        this._eventsTheme = normalizeString(value, {
            fallbackValue: EVENTS_THEMES.default,
            validValues: EVENTS_THEMES.valid
        });
    }

    @api
    get headers() {
        return this._headers;
    }
    set headers(value) {
        this._headers = normalizeArray(value);

        if (this.isConnected) this.initSchedule();
    }

    @api
    get rows() {
        return this._rows;
    }
    set rows(value) {
        this._rows = normalizeArray(value);

        if (this.isConnected) this.initRows();
    }

    @api
    get rowsKeyField() {
        return this._rowsKeyField;
    }
    set rowsKeyField(value) {
        this._rowsKeyField = value;

        if (this.isConnected) this.initRows();
    }

    @api
    get start() {
        return this._start;
    }
    set start(value) {
        const computedDate = dateTimeObjectFrom(value);
        this._start = computedDate || DEFAULT_START_DATE;

        if (this.isConnected) this.initSchedule();
    }

    @api
    get theme() {
        return this._theme;
    }
    set theme(value) {
        this._theme = normalizeString(value, {
            fallbackValue: THEMES.default,
            validValues: THEMES.valid
        });
    }

    @api
    get visibleSpan() {
        return this._visibleSpan;
    }
    set visibleSpan(value) {
        this._visibleSpan =
            typeof value === 'object' ? value : DEFAULT_VISIBLE_SPAN;

        if (this.isConnected) this.initSchedule();
    }

    get cellWidth() {
        if (!this.smallestHeader || !this.smallestHeader.columns.length)
            return 0;
        return 100 / this.smallestHeader.columns.length;
    }

    get generateKey() {
        return generateUniqueId();
    }

    get palette() {
        return this.customEventsPalette.length
            ? this.customEventsPalette
            : PALETTES[this.eventsPalette];
    }

    get end() {
        if (this._referenceHeader && this._referenceHeader.end) {
            return this._referenceHeader.end;
        }
        const visibleSpanEnd = addToDate(
            this.start,
            this.visibleSpan.unit,
            this.visibleSpan.span
        );
        // We take one millisecond off to exclude the next unit
        return DateTime.fromMillis(visibleSpanEnd - 1);
    }

    get smallestHeader() {
        if (!this.computedHeaders.length) return null;

        const lastIndex = this.computedHeaders.length - 1;
        return this.computedHeaders[lastIndex];
    }

    initSchedule() {
        this.initHeaders();
        this.initEvents();
        this.initRows();
    }

    initHeaders() {
        // Sort the headers from the longest unit to the shortest
        const sortedHeaders = [...this.headers].sort(
            (firstHeader, secondHeader) => {
                const firstIndex = UNITS.findIndex(
                    (unit) => unit === firstHeader.unit
                );
                const secondIndex = UNITS.findIndex(
                    (unit) => unit === secondHeader.unit
                );
                return secondIndex - firstIndex;
            }
        );

        // Create the reference header
        // The reference header is the header using the visibleSpan unit
        const referenceUnit = this.visibleSpan.unit;

        const referenceHeader = sortedHeaders.find(
            (header) => header.unit === referenceUnit
        );

        const referenceColumns = numberOfUnitsBetweenDates(
            referenceUnit,
            this.start,
            this.end
        );

        const referenceSpan = referenceHeader
            ? referenceHeader.span
            : this.visibleSpan.span;

        const reference = new Header({
            unit: referenceUnit,
            span: referenceSpan,
            duration: this.visibleSpan.span,
            label: referenceHeader ? referenceHeader.label : '',
            start: this.start,
            end: this.end,
            availableTimeFrames: this.availableTimeFrames,
            availableDaysOfTheWeek: this.availableDaysOfTheWeek,
            availableMonths: this.availableMonths,
            numberOfColumns: referenceColumns / referenceSpan,
            isReference: true,
            // If there is no header using the visibleSpan unit,
            // hide the reference header
            isHidden: !referenceHeader
        });

        // Make sure the reference end is at the end of the smallest header unit
        const referenceEnd = DateTime.fromMillis(
            reference.columns[reference.columns.length - 1].end
        );
        reference.end = referenceEnd.endOf(
            sortedHeaders[sortedHeaders.length - 1].unit
        );

        this._referenceHeader = reference;

        // Create all headers
        const headerObjects = [];
        sortedHeaders.forEach((header) => {
            const unit = header.unit;
            let headerObject;

            // If the current header is the reference, use the already made header object
            if (
                reference &&
                referenceUnit === unit &&
                reference.label === header.label
            ) {
                headerObject = reference;
            } else {
                const columns = numberOfUnitsBetweenDates(
                    unit,
                    this.start,
                    this.end
                );

                headerObject = new Header({
                    unit: unit,
                    span: header.span,
                    label: header.label,
                    start: reference.start,
                    end: this.end,
                    availableTimeFrames: this.availableTimeFrames,
                    availableDaysOfTheWeek: this.availableDaysOfTheWeek,
                    availableMonths: this.availableMonths,
                    numberOfColumns: columns / header.span
                });
            }

            headerObjects.push(headerObject);
        });

        this.computedHeaders = headerObjects;
        this.initHeaderWidths();
    }

    initHeaderWidths() {
        if (!this.cellWidth) return;

        const smallestHeaderColumns = this.smallestHeader.columns;
        for (let i = 0; i < this.computedHeaders.length; i++) {
            const header = this.computedHeaders[i];
            const unit = header.unit;

            // The columns of the header with the shortest unit all have the same width
            if (i === this.computedHeaders.length - 1) {
                header.columns.forEach(() => {
                    header.columnWidths.push(this.cellWidth);
                });

                // The other headers base their column widths on the header with the shortest unit
            } else {
                let columnIndex = 0;
                header.columns.forEach((column) => {
                    let width = 0;
                    let start = DateTime.fromMillis(column.start);
                    const end = addToDate(start, unit, header.span);

                    while (columnIndex < smallestHeaderColumns.length) {
                        const smallestHeaderColumn =
                            smallestHeaderColumns[columnIndex];
                        start = DateTime.fromMillis(smallestHeaderColumn.start);

                        // Normalize the beginning of the week, because Luxon's week start on Monday
                        const normalizedStart =
                            unit === 'week'
                                ? addToDate(start, 'day', 1)
                                : start;
                        const normalizedEnd =
                            unit === 'week' ? addToDate(end, 'day', 1) : end;

                        const startUnit = normalizedStart.startOf(unit);
                        const endUnit = normalizedEnd.startOf(unit);

                        // Stop if the next smallestHeader column belongs to the next header unit
                        if (endUnit <= startUnit) break;

                        width += this.cellWidth;
                        columnIndex += 1;
                    }
                    header.columnWidths.push(width);
                });
            }
        }
    }

    initEvents() {
        const events = [];
        const header = this.smallestHeader;
        const columnEnd =
            header && addToDate(header.start, header.unit, header.span) - 1;
        const duration =
            header &&
            DateTime.fromMillis(columnEnd).diff(header.start).milliseconds;
        const start = this._referenceHeader.start;

        this.events.forEach((event) => {
            const evt = { ...event };
            evt.schedulerEnd = this.end;

            let from = evt.allDay
                ? dateTimeObjectFrom(evt.from).startOf('day')
                : dateTimeObjectFrom(evt.from);
            let to = evt.allDay
                ? addToDate(from, 'day', 1)
                : dateTimeObjectFrom(evt.to);

            if (to > from && to > start && from < this.end) {
                evt.from = from > start ? from : start;
                evt.to = to < this.end ? to : this.schedulerEnd;

                if (this.containsAllowedDateTimes(evt.from, evt.to)) {
                    const computedEvent = new Event(evt);

                    if (header) {
                        computedEvent.updateWidth({
                            columns: header.columns,
                            columnDuration: duration
                        });
                    }

                    events.push(computedEvent);
                }
            }
        });

        this.computedEvents = events;
    }

    containsAllowedDateTimes(start, end) {
        const firstAllowedMonth = nextAllowedMonth(start, this.availableMonths);
        if (firstAllowedMonth > end) return false;

        const firstAllowedDay = nextAllowedDay(
            firstAllowedMonth,
            this.availableMonths,
            this.availableDaysOfTheWeek
        );
        if (firstAllowedDay > end) return false;

        const unit = this.smallestHeader.unit === 'minute' ? 'minute' : 'hour';
        const firstAllowedTime = nextAllowedTime(
            firstAllowedDay,
            this.availableMonths,
            this.availableDaysOfTheWeek,
            this.availableTimeFrames,
            unit,
            this.smallestHeader.span
        );
        return firstAllowedTime < end;
    }

    initRows() {
        this.computedRows = this.rows.map((row) => {
            const rowKey = row[this.rowsKeyField];
            const events = [];
            this.computedEvents.forEach((event) => {
                const isInRow = event.keyFields.includes(rowKey);
                if (isInRow) events.push(event);
            });

            return new Row({
                key: rowKey,
                events: events
            });
        });

        this.updateRowColumns();
    }

    updateBodyStyle() {
        // Set the datatable rows height
        const datatable = this.template.querySelector('c-datatable');
        const rows = this.template.querySelectorAll('tbody tr');
        rows.forEach((row) => {
            datatable.setRowHeight(row.dataset.key, row.offsetHeight);
        });

        // Give the body cells their width
        const cells = this.template.querySelectorAll('tbody td');
        cells.forEach((cell) => {
            cell.style.width = `${this.cellWidth}%`;
        });
    }

    updateEventsStyle() {
        // Give the events their width
        const events = this.template.querySelectorAll('.scheduler__event');
        events.forEach((event) => {
            const percentWidth = event.dataset.width;
            const marginLeft = event.dataset.offsetLeft;
            // Since the cell border is not included in the %,
            // we add 1px per cell crossed by the event
            const borderWidth = Math.floor(percentWidth / 100);
            event.style.width = `calc(${percentWidth}% + ${borderWidth}px`;
            event.style.marginLeft = `${marginLeft}%`;
        });
    }

    updateHeadersStyle() {
        // Set the datatable header height
        const datatableCol = this.template.querySelector(
            '.scheduler__datatable-col'
        );
        const thead = this.template.querySelector('thead');
        datatableCol.style.paddingTop = `${thead.offsetHeight - 34}px`;

        // Get the header rows and sort them from the shortest unit to the longest
        const headerRows = Array.from(
            this.template.querySelectorAll('thead tr')
        ).reverse();
        headerRows.forEach((row) => {
            const header = this.computedHeaders.find((computedHeader) => {
                return computedHeader.key === row.dataset.key;
            });

            // Give the header cells their width
            const cells = row.querySelectorAll('th');
            cells.forEach((cell, index) => {
                cell.style.width = `${header.columnWidths[index]}%`;
            });
        });
    }

    updateRowColumns() {
        this.computedRows.forEach((row) => {
            row.generateColumns(this.smallestHeader.columns);
        });
    }

    handlePrivateRowHeightChange(event) {
        const key = event.detail.key;
        const height = event.detail.height;
        const row = this.template.querySelector(`[data-key="${key}"]`);
        if (row) row.style.minHeight = `${height}px`;
    }
}
