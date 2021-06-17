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
import { generateUniqueId } from 'c/utils';
import { dateObjectFrom } from './dateUtils';
import {
    EVENTS_THEMES,
    EVENTS_PALETTES,
    THEMES,
    DEFAULT_START_DATE,
    DEFAULT_VISIBLE_SPAN,
    PALETTES,
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

    _millisecondsVisible =
        UNITS_IN_MS[DEFAULT_VISIBLE_SPAN.unit] * DEFAULT_VISIBLE_SPAN.span;
    scheduleRows = [];

    connectedCallback() {
        this.initScheduleRows();
        this.initVisibleSpan();

        if (this.start !== DEFAULT_START_DATE) {
            this.updateHeadersStart();
        }
        if (this.availableTimeFrames !== DEFAULT_AVAILABLE_TIME_FRAMES) {
            this.updateHeadersTimeFrames();
        }
    }

    renderedCallback() {
        // Set the datatable header height
        const thead = this.template.querySelector('thead');
        const datatable = this.template.querySelector('c-datatable');
        // We take one off because of the border
        datatable.setHeaderHeight(`${thead.offsetHeight - 1}px`);

        // Set the header columns width
        const headerRows = this.template.querySelectorAll('thead tr');
        headerRows.forEach((row) => {
            const header = this.headers.find((headerObj) => {
                return headerObj.key === row.dataset.key;
            });
            const cells = row.querySelectorAll('th');
            cells.forEach((cell) => {
                cell.style.maxWidth = header.columnMaxWidth;
            });
        });
    }

    @api
    get availableDaysOfTheWeek() {
        return this._availableDaysOfTheWeek;
    }
    set availableDaysOfTheWeek(value) {
        this._availableDaysOfTheWeek = normalizeArray(value);
    }

    @api
    get availableMonths() {
        return this._availableMonths;
    }
    set availableMonths(value) {
        this._availableMonths = normalizeArray(value);
    }

    @api
    get availableTimeFrames() {
        return this._availableTimeFrames;
    }
    set availableTimeFrames(value) {
        this._availableTimeFrames = normalizeArray(value);

        if (this.isConnected) this.updateHeadersTimeFrames();
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
        const headers = normalizeArray(value);
        const headerObjects = headers.map((header) => {
            return new Header(header);
        });
        this._headers = headerObjects;
    }

    @api
    get rows() {
        return this._rows;
    }
    set rows(value) {
        this._rows = normalizeArray(value);

        if (this.isConnected) {
            this.initScheduleRows();
            this.updateRowColumns();
        }
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

        if (this.isConnected) this.updateHeadersStart();
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

        if (this.isConnected) this.initVisibleSpan();
    }

    get generateKey() {
        return generateUniqueId();
    }

    get palette() {
        return this.customEventsPalette.length
            ? this.customEventsPalette
            : PALETTES[this.eventsPalette];
    }

    initScheduleRows() {
        this.scheduleRows = this.rows.map((row) => {
            return new Row({
                key: row[this.rowsKeyField]
            });
        });

        if (this.isConnected) this.updateRowColumns();
    }

    initVisibleSpan() {
        const unit = this._visibleSpan.unit;
        const span = this._visibleSpan.span;
        this._millisecondsVisible = UNITS_IN_MS[unit] * span;

        // Update the number of columns in the headers
        this.headers.forEach((header) => {
            header.millisecondsVisible = this._millisecondsVisible;
        });

        this.updateRowColumns();
    }

    updateHeadersStart() {
        this.headers.forEach((header) => {
            header.start = this.start;
        });

        this.updateRowColumns();
    }

    updateHeadersTimeFrames() {
        this.headers.forEach((header) => {
            header.timeFrames = this.availableTimeFrames;
        });

        this.updateRowColumns();
    }

    updateRowColumns() {
        const headerCols = this.headers[this.headers.length - 1].columnLabels;
        this.scheduleRows.forEach((row) => {
            row.generateColumns(headerCols);
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
