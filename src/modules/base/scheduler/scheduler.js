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
import { normalizeArray, normalizeString } from 'c/utilsPrivate';
import {
    dateObjectFrom,
    allowedHoursInUnit,
    allowedDaysInUnit,
    allowedMinutesInUnit,
    getUnitFromTime
} from './dateUtils';
import {
    EVENTS_THEMES,
    EVENTS_PALETTES,
    THEMES,
    DEFAULT_START_DATE,
    DEFAULT_VISIBLE_SPAN,
    PALETTES,
    UNITS,
    UNITS_IN_MS,
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
        const computedDate = dateObjectFrom(value);
        this._start = computedDate || DEFAULT_START_DATE;

        if (this.isConnected) {
            this.headers.forEach((header) => {
                header.start = this._start;
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

        // The reference header is the header using the visibleSpan unit
        const referenceHeaderIndex = sortedHeaders.findIndex(
            (header) => header.unit === this.visibleSpan.unit
        );

        if (!isNaN(referenceHeaderIndex)) {
            const header = sortedHeaders[referenceHeaderIndex];
            const unit = header.unit;
            const span = header.span;
            const millisecondsPerCol = UNITS_IN_MS[unit] * span;

            const maxVisibleTime =
                UNITS_IN_MS[this.visibleSpan.unit] * this.visibleSpan.span;
            const columns =
                Math.floor(maxVisibleTime / millisecondsPerCol) || 1;

            this._referenceHeader = new Header({
                unit: unit,
                span: span,
                label: header.label,
                start: this.start,
                timeFrames: this.availableTimeFrames,
                daysOfTheWeek: this.availableDaysOfTheWeek,
                months: this.availableMonths,
                millisecondsPerCol: millisecondsPerCol,
                numberOfColumns: columns,
                isReference: true
            });
        }

        const headerObjects = [];
        const reference = this._referenceHeader;
        let parentHeader;
        sortedHeaders.forEach((header) => {
            const unit = header.unit;
            const millisecondsPerCol = UNITS_IN_MS[unit] * header.span;
            let headerObject;

            // If the current header is the reference (it uses the visibleSpan unit)
            if (
                reference &&
                reference.unit === unit &&
                reference.label === header.label
            ) {
                headerObject = reference;

                // If the current header is not the reference, but there is a reference header
            } else if (reference) {
                let columns = 0;

                // If the reference has a longer unit than the header
                const referenceIsLonger =
                    UNITS_IN_MS[reference.unit] - UNITS_IN_MS[unit] > 0;
                if (referenceIsLonger) {
                    columns = this.maxColumnsInParent(header, parentHeader);
                } else {
                    // If the header has a longer unit than the reference
                    const referenceEnd =
                        reference.columns[reference.columns.length - 1].time +
                        reference.millisecondsPerCol;
                    let end = this.start.getTime();

                    while (end < referenceEnd) {
                        columns += 1;
                        end += millisecondsPerCol;
                    }
                }

                headerObject = new Header({
                    unit: unit,
                    span: header.span,
                    label: header.label,
                    start: this.start,
                    timeFrames: this.availableTimeFrames,
                    daysOfTheWeek: this.availableDaysOfTheWeek,
                    months: this.availableMonths,
                    millisecondsPerCol: millisecondsPerCol,
                    numberOfColumns: columns
                });

                // If there is no reference header (no header uses the visibleSpan unit)
            } else {
                // const columnsInVisibleSpan = this.maxVisibleColumns(header);
                // const columnsInParent = parentHeader
                //     ? this.maxColumnsInParent(header, parentHeader)
                //     : 0;
                // const columns =
                //     columnsInParent && columnsInParent < columnsInVisibleSpan
                //         ? columnsInParent
                //         : columnsInVisibleSpan;
                // if (parentHeader) {
                //     const allowedUnits = this.maxAllowedUnitsInParent(
                //         header.unit,
                //         parentHeader.unit
                //     );
                //     parentHeader.numberOfChildColumnsInOneSpan = Math.floor(allowedUnits / header.span);
                // }
            }

            if (parentHeader) {
                parentHeader.childKey = headerObject.key;
            }
            parentHeader = headerObject;
            headerObjects.push(headerObject);
        });

        this._headers = headerObjects;
        this.initHeaderColumnWidths();
    }

    // maxVisibleColumns(header) {
    //     const maxVisibleTime = UNITS_IN_MS[this.visibleSpan.unit] * this.visibleSpan.span;
    //     return Math.floor(maxVisibleTime / UNITS_IN_MS[header.unit] / header.span) || 1;
    // }

    maxColumnsInParent(header, parentHeader) {
        const allowedUnits = this.maxAllowedUnitsInParent(
            header.unit,
            parentHeader.unit
        );
        const numberOfColumns = Math.floor(allowedUnits / header.span);
        return (
            numberOfColumns * parentHeader.span * parentHeader.numberOfColumns
        );
    }

    maxAllowedUnitsInParent(unit, parentUnit) {
        if (unit === parentUnit) return 1;

        let allowedUnits;
        switch (unit) {
            case 'minute':
                allowedUnits = this.availableTimeFrames.reduce(
                    (accumulator, timeFrame) => {
                        return (
                            accumulator +
                            allowedMinutesInUnit(
                                timeFrame,
                                parentUnit,
                                this.start
                            )
                        );
                    },
                    0
                );
                break;
            case 'hour':
                allowedUnits = this.availableTimeFrames.reduce(
                    (accumulator, timeFrame) => {
                        return (
                            accumulator +
                            allowedHoursInUnit(timeFrame, parentUnit)
                        );
                    },
                    0
                );
                break;
            case 'day':
                allowedUnits = allowedDaysInUnit(
                    this.availableDaysOfTheWeek,
                    parentUnit
                );
                break;
            case 'month':
                allowedUnits = this.availableMonths.length;
                break;
            default:
                allowedUnits = 0;
                break;
        }
        return allowedUnits;
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
            // If the header has a child header,
            // columns may be smaller than their full possible time span
            if (header.childKey) {
                const child = this.headers.find(
                    (headerObj) => headerObj.key === header.childKey
                );
                const childWidth = 100 / child.columns.length;
                // const childSpan = child.millisecondsPerCol;
                let time = this.start.getTime();
                let childColumnIndex = 0;
                console.log(header.columns);
                header.columns.forEach(() => {
                    let width = 0;
                    let start = getUnitFromTime(header.unit, time);
                    const end = header.unit === 'week' ? start + 7 : start + 1;

                    // Stop if there are no child columns left
                    while (childColumnIndex < child.columns.length) {
                        const childColumn = child.columns[childColumnIndex];
                        time = childColumn.time;
                        const previousStart = start;
                        start = getUnitFromTime(header.unit, time);
                        // debugger

                        // Stop if the next child column belongs to the next header unit.
                        // previousStart is used to check if start went from a higher number to 0,
                        // for example between December and January
                        if (start >= end || start < previousStart) break;
                        childColumnIndex += 1;
                        width += childWidth;
                    }

                    header.columnWidths.push(width);
                });

                // If the header has a shorter time unit than the reference header,
                // columns will always take their full possible span.
                // All columns have the same width.
            } else {
                const columnWidth = 100 / header.columns.length;
                header.columns.forEach(() => {
                    header.columnWidths.push(columnWidth);
                });
            }
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
