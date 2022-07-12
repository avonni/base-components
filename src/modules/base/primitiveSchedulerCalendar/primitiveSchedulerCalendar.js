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
import {
    addToDate,
    dateTimeObjectFrom,
    isAllowedTime,
    removeFromDate
} from 'c/utilsPrivate';
import { classSet } from 'c/utils';
import Column from './column';
import {
    getElementOnXAxis,
    getElementOnYAxis,
    PrimitiveScheduleBase,
    updateOccurrencesOffset,
    updateOccurrencesPosition
} from 'c/schedulerUtils';

const CELL_SELECTOR = '[data-element-id="div-cell"]';
const COLUMN_SELECTOR = '[data-element-id="div-column"]';
const DEFAULT_SELECTED_DATE = new Date();
export default class PrimitiveSchedulerCalendar extends PrimitiveScheduleBase {
    _selectedDate = dateTimeObjectFrom(DEFAULT_SELECTED_DATE);

    _eventData;
    _mouseIsDown = false;
    _resizeObserver;
    _updateOccurrencesLength = false;
    cellHeight = 0;
    cellWidth = 0;
    columns = [];
    computedEvents = [];
    computedResources = [];
    dayCellDuration = 0;
    eventHeaderCells = {};
    firstColumnIsHidden = false;
    firstColumnIsOpen = false;
    firstColWidth = 0;
    hourCellDuration = 0;
    multiDayCellHeight = 0;
    multiDayEvents = [];
    singleDayEvents = [];
    start = dateTimeObjectFrom(DEFAULT_SELECTED_DATE);
    visibleInterval;

    connectedCallback() {
        window.addEventListener('mouseup', this.handleMouseUp);
        this.setStartToBeginningOfUnit();
        this.initResources();
        this.initHeaders();
        super.connectedCallback();
    }

    renderedCallback() {
        this.updateOccurrencesOffset();
        updateOccurrencesPosition.call(this, true);

        if (!this._resizeObserver) {
            this._resizeObserver = this.initResizeObserver();
        }

        if (this._eventData && this._eventData.shouldInitDraggedEvent) {
            // A new event is being created by dragging.
            // On the first move, display the event on the timeline.
            this.updateColumnEvents();
            this._eventData.setDraggedEvent();
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('mouseup', this.handleMouseUp);
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    @api
    get resources() {
        return super.resources;
    }
    set resources(value) {
        super.resources = value;

        if (this._connected) {
            this.initResources();
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
        return super.timeSpan;
    }
    set timeSpan(value) {
        super.timeSpan = value;

        if (this._connected) {
            this.setStartToBeginningOfUnit();
            this.initHeaders();
        }
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
    createEvent(event) {
        super.createEvent(event);
        this.updateColumnEvents();
    }

    @api
    deleteEvent(name) {
        super.deleteEvent(name);
        this.updateColumnEvents();
    }

    @api
    newEvent(x, y, saveEvent) {
        const column = getElementOnXAxis(this.template, x, COLUMN_SELECTOR);
        const cell = getElementOnYAxis(column, y, CELL_SELECTOR);
        const from = Number(cell.dataset.start);
        const to = Number(cell.dataset.end) + 1;
        const resourceNames = [this.resources[0].name];
        this._eventData.newEvent({ from, resourceNames, to, x, y }, saveEvent);
    }

    @api
    saveSelection(recurrenceMode) {
        super.saveSelection(recurrenceMode);
        this.updateColumnEvents();
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    initEvents() {
        super.initEvents();
        this._eventData.isCalendar = true;
        this._eventData.isVertical = true;
        this._eventData.smallestHeader = this.hourHeaders[0];
        this._eventData.initEvents();
    }

    initHeaders() {
        this.eventHeaderCells = {};
        let startDate = new Date(this.start.ts);
        startDate.setHours(0, 0, 0, 0);

        let time = dateTimeObjectFrom(startDate);
        const availableHours = [];
        for (let i = 0; i < 24; i++) {
            if (isAllowedTime(time, this.availableTimeFrames)) {
                availableHours.push(time.hour);
            }
            time = addToDate(time, 'hour', 1);
        }

        const columns = [];
        const numberOfColumns = this.isWeek
            ? this.availableDaysOfTheWeek.length
            : 1;

        startDate = dateTimeObjectFrom(startDate);
        for (let i = 0; i < numberOfColumns; i++) {
            const weekday = this.isWeek
                ? this.availableDaysOfTheWeek[i]
                : startDate.weekday;
            const column = {
                weekday,
                events: [],
                referenceCells: []
            };

            for (let j = 0; j < availableHours.length; j++) {
                startDate = startDate.set({ hour: availableHours[j] });
                const start = startDate.startOf('hour');
                const end = startDate.endOf('hour');
                column.referenceCells.push({
                    start: start.ts,
                    end: end.ts
                });
            }
            columns.push(new Column(column));
            startDate = addToDate(startDate, 'day', 1);
        }
        this.columns = columns;
    }

    initResources() {
        this.computedResources = this.resources.map((res) => {
            return { ...res, height: 0, data: { res } };
        });
    }

    getColumnElementFromPosition(x) {
        return getElementOnXAxis(this.template, x, COLUMN_SELECTOR);
    }

    /**
     * Push the vertical headers, so their top is aligned with the bottom of the horizontal headers.
     */
    pushVerticalHeadersDown() {
        if (this.horizontalHeaders && this.verticalHeaders) {
            let height = this.horizontalHeaders.offsetHeight;

            const multiDayEventsWrapper = this.template.querySelector(
                '[data-element-id="div-multi-day-events-wrapper"]'
            );
            if (multiDayEventsWrapper) {
                height += multiDayEventsWrapper.offsetHeight;
            }
            this.verticalHeaders.style.marginTop = `${height}px`;
        }
    }

    setStartToBeginningOfUnit() {
        const unit = this.timeSpan.unit;
        const isSunday = this.selectedDate.weekday === 7;

        if (this.isWeek && isSunday) {
            this.start = this.selectedDate.startOf('day');
        } else {
            this.start = this.selectedDate.startOf(unit);

            if (this.isWeek) {
                this.start = removeFromDate(this.start, 'day', 1);
            }
        }
    }

    updateColumnEvents() {
        this.columns.forEach((col) => {
            const weekday = col.weekday;
            const events = [];
            this.singleDayEvents.forEach((event) => {
                if (!event.disabled) {
                    const occurrences = event.occurrences.filter(
                        (occurrence) => {
                            return occurrence.fromWeekday === weekday;
                        }
                    );

                    events.push(occurrences);
                }
            });
            col.events = events.flat();
            col.initCells();
        });
    }

    /**
     * Prevent the events from overlapping by computing their horizontal position.
     */
    updateOccurrencesOffset() {
        // For each day column
        this.columns.forEach(({ weekday, events }) => {
            if (events.length) {
                // Get all the event occurrences for the current weekday column
                const singleDayOccurrences = Array.from(
                    this.template.querySelectorAll(
                        `[data-element-id="avonni-primitive-scheduler-event-occurrence-single-day"][data-weekday="${weekday}"]:not([data-disabled="true"])`
                    )
                );

                updateOccurrencesOffset.call(
                    this,
                    singleDayOccurrences,
                    events,
                    true
                );
            }
        });

        if (this.multiDayEvents.length) {
            const multiDayOccurrences = Array.from(
                this.template.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-multi-day"]:not([data-disabled="true"])'
                )
            );
            const events = this.multiDayEvents.map((ev) => ev.occurrences);
            const occurrences = events.flat();
            const multiDayRowHeight = updateOccurrencesOffset.call(
                this,
                multiDayOccurrences,
                occurrences
            );

            const multiDayEventsWrapper = this.template.querySelector(
                '[data-element-id="div-multi-day-events-wrapper"]'
            );
            multiDayEventsWrapper.style.height = `${multiDayRowHeight}px`;
            this.pushVerticalHeadersDown();
        }
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS AND DISPATCHERS
     * -------------------------------------------------------------
     */

    /**
     * Handle the privatemousedown event fired by a primitive event occurrence. Select the event and prepare for it to be dragged or resized.
     */
    handleEventMouseDown(mouseEvent) {
        this._mouseIsDown = true;
        const x = mouseEvent.detail.x;
        const column = getElementOnXAxis(this.template, x, COLUMN_SELECTOR);
        this._eventData.handleExistingEventMouseDown(mouseEvent, column);
        this.dispatchHidePopovers();
    }

    handleHeaderCellSizeChange(event) {
        const { cellSize, orientation } = event.detail;

        if (orientation === 'vertical') {
            this.cellHeight = cellSize;
            this.multiDayCellHeight = cellSize;
        } else {
            this.cellWidth = cellSize;
        }

        this.template.host.style = `
            --avonni-scheduler-cell-height: ${this.cellHeight}px;
        `;
    }

    handleHorizontalHeaderChange(event) {
        const { smallestHeader, visibleInterval } = event.detail;
        const { start, cells, unit, span } = smallestHeader;

        // Update the start date in case it was not available
        this.start = start;

        this.eventHeaderCells.xAxis = cells;
        this.visibleInterval = visibleInterval;
        this.dispatchVisibleIntervalChange(start, visibleInterval);
        const end = addToDate(start, unit, span) - 1;
        this.dayCellDuration = dateTimeObjectFrom(end).diff(start).milliseconds;

        this.initEvents();
        this.updateColumnEvents();
        requestAnimationFrame(() => {
            this.pushVerticalHeadersDown();
        });
    }

    /**
     * Handle the mousedown event fired by an empty cell or a disabled primitive event occurrence. Prepare the scheduler for a new event to be created on drag.
     */
    handleMouseDown(event) {
        if (event.button || this.readOnly) {
            return;
        }

        this._mouseIsDown = true;
        this.dispatchHidePopovers();

        const x = event.clientX || event.detail.x;
        const y = event.clientY || event.detail.y;
        const columnElement = getElementOnXAxis(
            this.template,
            x,
            COLUMN_SELECTOR
        );

        const cell = getElementOnYAxis(columnElement, y, CELL_SELECTOR);
        const resourceNames = [this.resources[0].name];
        const from = Number(cell.dataset.start);
        const to = Number(cell.dataset.end) + 1;
        this._eventData.handleNewEventMouseDown({
            event,
            cellGroupElement: columnElement,
            from,
            resourceNames,
            to,
            x,
            y
        });
    }

    /**
     * Handle the mousemove event fired by the schedule. If the splitter is being clicked, compute its movement. If an event is being clicked, compute its resizing or dragging.
     */
    handleMouseMove(mouseEvent) {
        if (!this._mouseIsDown) {
            return;
        }

        // Prevent scrolling
        mouseEvent.preventDefault();

        if (this._draggedSplitter) {
            // The splitter between the left column and the schedule is being dragged
            const { mouseX, firstColWidth } = this._initialState;
            const x = mouseEvent.clientX;
            const width = firstColWidth + (x - mouseX);
            this.firstCol.style.width = `${width}px`;
            this.firstCol.style.minWidth = `${width}px`;
            this.firstColWidth = width;
        } else {
            this._eventData.handleMouseMove(mouseEvent);

            if (this._eventData.shouldInitDraggedEvent) {
                this.updateColumnEvents();
            }
        }
    }

    handleMouseUp = (mouseEvent) => {
        if (!this._mouseIsDown) {
            return;
        }
        this._mouseIsDown = false;

        if (this._draggedSplitter) {
            this._draggedSplitter = false;
        } else {
            const x = mouseEvent.clientX;
            const y = mouseEvent.clientY;
            const { eventToDispatch, updateCellGroups } =
                this._eventData.handleMouseUp(x, y);

            switch (eventToDispatch) {
                case 'edit':
                    this.dispatchOpenEditDialog(this._eventData.selection);
                    break;
                case 'recurrence':
                    this.dispatchOpenRecurrenceDialog();
                    break;
                default:
                    break;
            }
            if (updateCellGroups) {
                this.updateColumnEvents();
            }
        }
    };

    handleVerticalHeaderChange(event) {
        const { start, cells, unit, span } = event.detail.smallestHeader;

        // Update the start date in case it was not available
        this.start = start;

        this.eventHeaderCells.yAxis = cells;
        const end = addToDate(start, unit, span) - 1;
        this.hourCellDuration =
            dateTimeObjectFrom(end).diff(start).milliseconds;
    }
}
