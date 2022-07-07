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
import {
    addToDate,
    dateTimeObjectFrom,
    isAllowedTime,
    removeFromDate
} from 'c/utilsPrivate';
import { classSet, generateUUID } from 'c/utils';
import { normalizeArray, normalizeBoolean } from 'c/utilsPrivate';
import {
    dispatchHidePopovers,
    dispatchVisibleIntervalChange,
    handleDoubleClick,
    handleEmptySpotContextMenu,
    handleEventContextMenu,
    handleEventDoubleClick,
    handleEventFocus,
    handleEventMouseEnter,
    SchedulerEventData
} from 'c/schedulerUtils';

const DEFAULT_AVAILABLE_TIME_FRAMES = ['00:00-23:59'];
const DEFAULT_AVAILABLE_DAYS_OF_THE_WEEK = [0, 1, 2, 3, 4, 5, 6];
const DEFAULT_AVAILABLE_MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const DEFAULT_DATE_FORMAT = 'ff';
const DEFAULT_SELECTED_DATE = new Date();
const DEFAULT_TIME_SPAN = {
    span: 1,
    unit: 'day'
};

export default class PrimitiveSchedulerCalendar extends LightningElement {
    _availableDaysOfTheWeek = DEFAULT_AVAILABLE_DAYS_OF_THE_WEEK;
    _availableMonths = DEFAULT_AVAILABLE_MONTHS;
    _availableTimeFrames = DEFAULT_AVAILABLE_TIME_FRAMES;
    _availableTimeSpans = [];
    _collapseDisabled = false;
    _dateFormat = DEFAULT_DATE_FORMAT;
    _events = [];
    _readOnly = false;
    _resizeColumnDisabled = false;
    _resources = [];
    _selectedDate = dateTimeObjectFrom(DEFAULT_SELECTED_DATE);
    _timeSpan = DEFAULT_TIME_SPAN;
    _zoomToFit = false;

    _connected = false;
    _eventData = new SchedulerEventData(this);
    _mouseIsDown = false;
    columns = [];
    computedEvents = [];
    cells = [];
    eventHeaderCells = {};
    firstColumnIsHidden = false;
    firstColumnIsOpen = false;
    firstColWidth = 0;
    cellDuration = 0;
    cellHeight = 0;
    cellWidth = 0;
    start = dateTimeObjectFrom(DEFAULT_SELECTED_DATE);
    visibleInterval;

    connectedCallback() {
        this.setStartToBeginningOfUnit();
        this.initHeaders();
        this._connected = true;
    }

    renderedCallback() {
        this.pushVerticalHeadersDown();
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Array of available days of the week. If present, the scheduler will only show the available days of the week. Defaults to all days being available.
     * The days are represented by a number, starting from 0 for Sunday, and ending with 6 for Saturday.
     * For example, if the available days are Monday to Friday, the value would be: <code>[1, 2, 3, 4, 5]</code>
     *
     * @type {number[]}
     * @public
     * @default [0, 1, ... , 5, 6]
     */
    @api
    get availableDaysOfTheWeek() {
        return this._availableDaysOfTheWeek;
    }
    set availableDaysOfTheWeek(value) {
        const days = normalizeArray(value);
        this._availableDaysOfTheWeek =
            days.length > 0 ? days : DEFAULT_AVAILABLE_DAYS_OF_THE_WEEK;

        if (this._connected) {
            this.initHeaders();
        }
    }

    /**
     * Array of available months. If present, the scheduler will only show the available months. Defaults to all months being available.
     * The months are represented by a number, starting from 0 for January, and ending with 11 for December.
     * For example, if the available months are January, February, June, July, August and December, the value would be: <code>[0, 1, 5, 6, 7, 11]</code>
     *
     * @type {number[]}
     * @public
     * @default [0, 1, … , 10, 11]
     */
    @api
    get availableMonths() {
        return this._availableMonths;
    }
    set availableMonths(value) {
        const months = normalizeArray(value);
        this._availableMonths =
            months.length > 0 ? months : DEFAULT_AVAILABLE_MONTHS;
    }

    /**
     * Array of available time frames. If present, the scheduler will only show the available time frames. Defaults to the full day being available.
     * Each time frame string must follow the pattern ‘start-end’, with start and end being ISO8601 formatted time strings.
     * For example, if the available times are from 10am to 12pm, and 2:30pm to 6:45pm, the value would be: <code>['10:00-11:59', '14:30-18:44']</code>
     *
     * @type {string[]}
     * @public
     * @default ['00:00-23:59']
     */
    @api
    get availableTimeFrames() {
        return this._availableTimeFrames;
    }
    set availableTimeFrames(value) {
        const timeFrames = normalizeArray(value);
        this._availableTimeFrames =
            timeFrames.length > 0 ? timeFrames : DEFAULT_AVAILABLE_TIME_FRAMES;

        if (this._connected) {
            this.initHeaders();
        }
    }

    /**
     * Array of available time spans. Each time span object must have the following properties:
     * * unit: The unit of the time span.
     * * span: The span of the time span.
     *
     * @type {object[]}
     * @public
     */
    @api
    get availableTimeSpans() {
        return this._availableTimeSpans;
    }
    set availableTimeSpans(value) {
        this._availableTimeSpans = normalizeArray(value, 'object');
    }

    /**
     * If present, the schedule column is not collapsible or expandable.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get collapseDisabled() {
        return this._collapseDisabled;
    }
    set collapseDisabled(value) {
        this._collapseDisabled = normalizeBoolean(value);
    }

    /**
     * The date format to use in the events' details popup and the labels. See [Luxon’s documentation](https://moment.github.io/luxon/#/formatting?id=table-of-tokens) for accepted format. If you want to insert text in the label, you need to escape it using single quote.
     * For example, the format of "Jan 14 day shift" would be <code>"LLL dd 'day shift'"</code>.
     *
     * @type {string}
     * @public
     * @default ff
     */
    @api
    get dateFormat() {
        return this._dateFormat;
    }
    set dateFormat(value) {
        this._dateFormat =
            value && typeof value === 'string' ? value : DEFAULT_DATE_FORMAT;
    }

    /**
     * Array of event objects.
     *
     * @type {object[]}
     * @public
     */
    @api
    get events() {
        return this._events;
    }
    set events(value) {
        this._events = normalizeArray(value, 'object');
    }

    /**
     * If present, the scheduler is not editable. The events cannot be dragged and the default actions (edit, delete and add event) will be hidden from the context menus.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get readOnly() {
        return this._readOnly;
    }
    set readOnly(value) {
        this._readOnly = normalizeBoolean(value);
    }

    /**
     * If present, column resizing is disabled.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get resizeColumnDisabled() {
        return this._resizeColumnDisabled;
    }
    set resizeColumnDisabled(value) {
        this._resizeColumnDisabled = normalizeBoolean(value);
    }

    @api
    get resources() {
        return this._resources;
    }
    set resources(value) {
        this._resources = normalizeArray(value, 'object');
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
        const computedDate = dateTimeObjectFrom(value);
        this._selectedDate =
            computedDate || dateTimeObjectFrom(DEFAULT_SELECTED_DATE);

        if (this._connected) {
            this.setStartToBeginningOfUnit();
            this.initHeaders();
        }
    }

    @api
    get timeSpan() {
        return this._timeSpan;
    }
    set timeSpan(value) {
        this._timeSpan = typeof value === 'object' ? value : DEFAULT_TIME_SPAN;

        if (this._connected) {
            this.initHeaders();
        }
    }

    /**
     * If present, horizontal scrolling will be prevented.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get zoomToFit() {
        return this._zoomToFit;
    }
    set zoomToFit(value) {
        this._zoomToFit = normalizeBoolean(value);
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    get dayHeaders() {
        return [
            {
                label: 'ccc dd',
                unit: 'day',
                span: 1
            }
        ];
    }

    get dayTimeSpan() {
        return {
            unit: 'day',
            span: 1
        };
    }

    /**
     * First column HTML Element.
     *
     * @type {HTMLElement}
     */
    get firstCol() {
        return this.template.querySelector(
            '[data-element-id="div-first-column"]'
        );
    }

    /**
     * Computed CSS classes for the first column.
     *
     * @type {string}
     */
    get firstColClass() {
        return classSet('slds-border_right slds-grid')
            .add({
                'avonni-scheduler__first-col_hidden': this.firstColumnIsHidden,
                'avonni-scheduler__first-col_open': this.firstColumnIsOpen
            })
            .toString();
    }

    get horizontalHeaders() {
        return this.template.querySelector(
            '[data-element-id="avonni-primitive-scheduler-header-group-horizontal"]'
        );
    }

    get hourHeaders() {
        return [
            {
                label: 'h a',
                unit: 'hour',
                span: 1
            }
        ];
    }

    get isWeek() {
        const { span, unit } = this.timeSpan;
        return unit === 'week' || (unit === 'day' && span === 7);
    }

    get resourceOptions() {
        return this.resources.map((res) => {
            return {
                label: res.label || res.name,
                value: res.name
            };
        });
    }

    get smallestHeader() {
        return this.hourHeaders[0];
    }

    /**
     * If true, the left collapse button is displayed on the splitter bar.
     *
     * @type {boolean}
     * @default true
     */
    get showCollapseLeft() {
        return !this.collapseDisabled && !this.firstColumnIsHidden;
    }

    /**
     * If true, the right collapse button is displayed on the splitter bar.
     *
     * @type {boolean}
     * @default true
     */
    get showCollapseRight() {
        return !this.collapseDisabled && !this.firstColumnIsOpen;
    }

    /**
     * Class list of the splitter.
     *
     * @type {string}
     */
    get splitterClass() {
        return classSet('avonni-scheduler__splitter slds-is-absolute slds-grid')
            .add({
                'avonni-scheduler__splitter_disabled':
                    this.resizeColumnDisabled,
                'slds-grid_align-end': this.firstColumnIsOpen
            })
            .toString();
    }

    get uniqueKey() {
        return generateUUID();
    }

    get verticalHeaders() {
        return this.template.querySelector(
            '[data-element-id="avonni-primitive-scheduler-header-group-vertical"]'
        );
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    @api
    selectEvent(detail) {
        return this._eventData.selectEvent(detail);
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    initHeaders() {
        this.eventHeaderCells = {};
        const startDate = new Date(this.selectedDate.ts);
        startDate.setHours(0, 0, 0, 0);

        let hour = dateTimeObjectFrom(startDate);
        const availableHours = [];
        for (let i = 0; i < 24; i++) {
            if (isAllowedTime(hour, this.availableTimeFrames)) {
                availableHours.push(hour);
            }
            hour = addToDate(hour, 'hour', 1);
        }

        const cells = [];
        availableHours.forEach((availableHour) => {
            const start = availableHour.startOf('hour');
            const end = availableHour.endOf('hour');
            cells.push({
                start: start.ts,
                end: end.ts
            });
        });

        const columns = [];
        const numberOfColumns = this.isWeek
            ? this.availableDaysOfTheWeek.length
            : 1;

        for (let i = 0; i < numberOfColumns; i++) {
            columns.push(i);
        }

        this.cells = cells;
        this.columns = columns;
    }

    /**
     * Push the vertical headers, so their top is aligned with the bottom of the horizontal headers.
     */
    pushVerticalHeadersDown() {
        if (this.horizontalHeaders && this.verticalHeaders) {
            const height = this.horizontalHeaders.offsetHeight;
            this.verticalHeaders.style.marginTop = `${height}px`;
        }
    }

    setStartToBeginningOfUnit() {
        const unit = this.timeSpan.unit;
        this.start = this.selectedDate.startOf(unit);

        if (this.isWeek) {
            // Compensate the fact that luxon weeks start on Monday
            this.start = removeFromDate(this.start, 'day', 1);
        }
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS AND DISPATCHERS
     * -------------------------------------------------------------
     */

    handleDoubleClick(event) {
        handleDoubleClick.call(this, event);
    }

    handleEmptySpotContextMenu(event) {
        handleEmptySpotContextMenu.call(this, event);
    }

    handleEventContextMenu(event) {
        handleEventContextMenu.call(this, event);
    }

    handleEventDoubleClick(event) {
        handleEventDoubleClick.call(this, event);
    }

    handleEventFocus(event) {
        handleEventFocus.call(this, event);
    }

    handleEventMouseDown() {}

    /**
     * Handle the privatemouseenter event fired by a primitive event occurrence. Select the hovered event and show the detail popover.
     */
    handleEventMouseEnter(event) {
        handleEventMouseEnter.call(this, event);
    }

    handleEventResize() {}

    handleHeaderCellSizeChange(event) {
        const { cellSize, orientation } = event.detail;

        if (orientation === 'vertical') {
            this.cellHeight = cellSize;
        } else {
            this.cellWidth = cellSize;
        }

        this.template.host.style = `
            --avonni-scheduler-cell-height: ${this.cellHeight}px;
        `;
    }

    handleHideDetailPopover() {
        dispatchHidePopovers.call(this, ['detail']);
    }

    handleHorizontalHeaderChange(event) {
        const smallestHeader = event.detail.smallestHeader;

        // Update the start date in case it was not available
        this.start = smallestHeader.start;

        this.eventHeaderCells.xAxis = smallestHeader.cells;
        this.visibleInterval = event.detail.visibleInterval;
        dispatchVisibleIntervalChange.call(
            this,
            this.start,
            this.visibleInterval
        );

        this._eventData.initEvents(this.visibleInterval);
        this.pushVerticalHeadersDown();
    }

    handleMouseDown() {}

    handleMouseMove() {}

    handleMouseUp() {}

    handleScroll() {}

    handleVerticalHeaderChange(event) {
        const { start, cells, unit, span } = event.detail.smallestHeader;

        // Update the start date in case it was not available
        this.start = start;

        this.eventHeaderCells.yAxis = cells;
        const end = addToDate(start, unit, span) - 1;
        this.cellDuration = dateTimeObjectFrom(end).diff(start).milliseconds;
    }
}
