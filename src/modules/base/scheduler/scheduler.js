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
import { normalizeArray, normalizeString } from 'c/utilsPrivate';
import {
    dateTimeObjectFrom,
    addToDate,
    removeToDate,
    numberOfUnitsBetweenDates
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
    scheduleRows = [];

    connectedCallback() {
        this.initHeaders();
        this.initScheduleRows();
    }

    renderedCallback() {
        // Set the datatable header height
        const datatableCol = this.template.querySelector(
            '.scheduler__datatable-col'
        );
        const thead = this.template.querySelector('thead');
        datatableCol.style.paddingTop = `${thead.offsetHeight - 34}px`;

        // Get the rows and sort them from the shortest unit to the longest
        const headerRows = Array.from(
            this.template.querySelectorAll('thead tr')
        ).reverse();
        headerRows.forEach((row) => {
            const header = this.headers.find((headerObj) => {
                return headerObj.key === row.dataset.key;
            });

            const cells = row.querySelectorAll('th');
            cells.forEach((cell, index) => {
                cell.style.width = `${header.columnWidths[index]}%`;
            });
        });
    }

    @api
    get availableDaysOfTheWeek() {
        return this._availableDaysOfTheWeek;
    }
    set availableDaysOfTheWeek(value) {
        const days = normalizeArray(value);
        this._availableDaysOfTheWeek =
            days.length > 0 ? days : DEFAULT_AVAILABLE_DAYS_OF_THE_WEEK;

        if (this.isConnected) {
            this.headers.forEach((header) => {
                header.daysOfTheWeek = this._availableDaysOfTheWeek;
            });

            this.updateRowColumns();
        }
    }

    @api
    get availableMonths() {
        return this._availableMonths;
    }
    set availableMonths(value) {
        const months = normalizeArray(value);
        this._availableMonths =
            months.length > 0 ? months : DEFAULT_AVAILABLE_MONTHS;

        if (this.isConnected) {
            this.headers.forEach((header) => {
                header.months = this._availableMonths;
            });

            this.updateRowColumns();
        }
    }

    @api
    get availableTimeFrames() {
        return this._availableTimeFrames;
    }
    set availableTimeFrames(value) {
        const timeFrames = normalizeArray(value);
        this._availableTimeFrames =
            timeFrames.length > 0 ? timeFrames : DEFAULT_AVAILABLE_TIME_FRAMES;

        if (this.isConnected) {
            this.headers.forEach((header) => {
                header.timeFrames = this._availableTimeFrames;
            });

            this.updateRowColumns();
        }
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

        if (this.isConnected) this.initHeaders();
    }

    @api
    get rows() {
        return this._rows;
    }
    set rows(value) {
        this._rows = normalizeArray(value);

        if (this.isConnected) this.initScheduleRows();
    }

    @api
    get rowsKeyField() {
        return this._rowsKeyField;
    }
    set rowsKeyField(value) {
        this._rowsKeyField = value;

        if (this.isConnected) this.initScheduleRows();
    }

    @api
    get start() {
        return this._start;
    }
    set start(value) {
        const computedDate = dateTimeObjectFrom(value);
        this._start = computedDate || DEFAULT_START_DATE;

        if (this.isConnected) {
            this.headers.forEach((header) => {
                header.start = this._start;
                header.end = this.end;
            });

            this.updateRowColumns();
        }
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

        if (this.isConnected) {
            this.initHeaders();
            this.updateRowColumns();
        }
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
            label: referenceHeader ? referenceHeader.label : '',
            start: this.start,
            availableTimeFrames: this.availableTimeFrames,
            availableDaysOfTheWeek: this.availableDaysOfTheWeek,
            availableMonths: this.availableMonths,
            numberOfColumns: referenceColumns / referenceSpan,
            isReference: true,
            // If there is no header using the visibleSpan unit,
            // hide the reference header
            isHidden: !referenceHeader
        });

        // Compute the end
        let referenceEnd;
        const lastColumnStart = DateTime.fromMillis(
            reference.columns[reference.columns.length - 1].start
        );
        // If the number of columns is a float,
        // the end date will be before the end of the last column span
        if (!Number.isInteger(reference.numberOfColumns)) {
            const lastColumnDuration =
                (reference.numberOfColumns -
                    Math.floor(reference.numberOfColumns)) *
                reference.maxColumnDuration;
            referenceEnd = DateTime.fromMillis(
                lastColumnStart + lastColumnDuration
            );
        } else {
            referenceEnd = lastColumnStart;
        }
        reference.end = referenceEnd.endOf(
            sortedHeaders[sortedHeaders.length - 1].unit
        );

        this._referenceHeader = reference;

        // Create all headers
        const headerObjects = [];
        // let parentHeader;
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
                    numberOfColumns: columns
                });
            }

            // if (parentHeader) {
            //     parentHeader.childKey = headerObject.key;
            // }
            // parentHeader = headerObject;
            headerObjects.push(headerObject);
        });

        this._headers = headerObjects;
        this.initHeaderColumnWidths();
    }

    initScheduleRows() {
        this.scheduleRows = this.rows.map((row) => {
            return new Row({
                key: row[this.rowsKeyField]
            });
        });

        this.updateRowColumns();
    }

    updateRowColumns() {
        const headerCols = this.headers[this.headers.length - 1].columns;
        this.scheduleRows.forEach((row) => {
            row.generateColumns(headerCols);
        });
    }

    initHeaderColumnWidths() {
        this.headers.forEach((header) => {
            const unit = header.unit;
            const isWeek = unit === 'week';
            const totalDuration = this.end - this.start;

            // Compensate the fact that luxon weeks start on Monday
            let start = isWeek
                ? addToDate(header.start, 'day', 1)
                : header.start;

            header.columns.forEach(() => {
                let unitEnd = start.endOf(unit);

                // Compensate the fact that luxon weeks start on Monday
                if (isWeek) {
                    unitEnd = removeToDate(unitEnd, 'day', 1);
                    start = removeToDate(start, 'day', 1);
                }

                const end = this.end > unitEnd ? unitEnd : this.end;
                const columnDuration = end - start;
                const width = (100 * columnDuration) / totalDuration;
                header.columnWidths.push(width);

                start = DateTime.fromMillis(end + 1);
                // Compensate the fact that luxon weeks start on Monday
                if (isWeek) {
                    start = addToDate(start, 'day', 1);
                }
            });
        });
    }

    handlePrivateRowHeightChange(event) {
        const index = event.detail.index;
        // The first row has one pixel more because of the border
        const height =
            index === 0 ? event.detail.height + 1 : event.detail.height;
        const row = this.template.querySelector(`[data-index="${index}"]`);
        if (row) row.style.height = `${height}px`;
    }
}
