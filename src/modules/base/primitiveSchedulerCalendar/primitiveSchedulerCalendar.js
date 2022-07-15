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
    normalizeArray,
    removeFromDate
} from 'c/utilsPrivate';
import { classSet } from 'c/utils';
import Column from './column';
import {
    getElementOnXAxis,
    getElementOnYAxis,
    ScheduleBase,
    updateOccurrencesOffset,
    updateOccurrencesPosition
} from 'c/schedulerUtils';
import { AvonniResizeObserver } from 'c/resizeObserver';

const CELL_SELECTOR = '[data-element-id="div-cell"]';
const COLUMN_SELECTOR = '[data-element-id="div-column"]';
const DEFAULT_SELECTED_DATE = new Date();
export default class PrimitiveSchedulerCalendar extends ScheduleBase {
    _selectedDate = dateTimeObjectFrom(DEFAULT_SELECTED_DATE);
    _selectedResources = [];

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
    dayHeadersVisibleWidth = 0;
    eventHeaderCells = {};
    firstColumnIsHidden = false;
    firstColumnIsOpen = false;
    firstColWidth = 0;
    hourCellDuration = 0;
    multiDayCellHeight = 0;
    multiDayEvents = [];
    multiDayEventsCellGroup = {};
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
        if (!this._resizeObserver) {
            this._resizeObserver = this.initResizeObserver();
        }

        this.updateSingleAndMultiDayEventsOffset();
        this.updateOccurrencesPosition();
        this.setHorizontalHeadersSideSpacing();

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
    get selectedResources() {
        return this._selectedResources;
    }
    set selectedResources(value) {
        this._selectedResources = normalizeArray(value, 'string');

        if (this._connected) {
            this._eventData.selectedResources = this._selectedResources;
            this.initEvents();
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
            '[data-element-id="div-horizontal-header-wrapper"]'
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

    get isDay() {
        const { span, unit } = this.timeSpan;
        return unit === 'day' && span === 1;
    }

    get isWeek() {
        const { span, unit } = this.timeSpan;
        return unit === 'week' || (unit === 'day' && span === 7);
    }

    get multiDayEventHeaderCells() {
        if (!this.eventHeaderCells.xAxis) {
            return [];
        }
        // Normalize the end and start of the first and last cells
        const cells = [...this.eventHeaderCells.xAxis];
        const start = dateTimeObjectFrom(cells[0].start);
        const end = dateTimeObjectFrom(cells[cells.length - 1].end);
        cells[0].start = start.startOf('day').ts;
        cells[cells.length - 1].end = end.endOf('day').ts;
        return { xAxis: cells };
    }

    get multiDayWrapper() {
        return this.template.querySelector(
            '[data-element-id="div-multi-day-events-wrapper"]'
        );
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
        this._eventData.selectedResources = this.selectedResources;
        this._eventData.initEvents();

        // Create a cell group for the multi day events row
        const referenceCells = this.columns.map((col) => {
            return {
                start: col.start.ts,
                end: col.end.ts - 1
            };
        });

        this.multiDayEventsCellGroup = new Column({ referenceCells });
        this._eventData.multiDayEventsCellGroup = this.multiDayEventsCellGroup;
        this.updateColumnEvents();
    }

    initHeaders() {
        // Reset the header cells used by the events to position themselves
        this.eventHeaderCells = {};

        // Start at the begining of the first day
        let startDate = new Date(this.start.ts);
        startDate.setHours(0, 0, 0, 0);
        let time = dateTimeObjectFrom(startDate);

        // Find all the available hours
        const availableHours = [];
        for (let i = 0; i < 24; i++) {
            if (isAllowedTime(time, this.availableTimeFrames)) {
                availableHours.push(time.hour);
            }
            time = addToDate(time, 'hour', 1);
        }

        // Create a column for each available day
        const columns = [];
        const numberOfColumns = this.isWeek
            ? this.availableDaysOfTheWeek.length
            : 1;

        startDate = dateTimeObjectFrom(startDate);
        for (let i = 0; i < numberOfColumns; i++) {
            const column = {
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

    /**
     * Initialize the screen resize observer.
     *
     * @returns {AvonniResizeObserver} Resize observer.
     */
    initResizeObserver() {
        const resizeObserver = new AvonniResizeObserver(() => {
            this.updateCellWidth();
        });
        const schedule = this.template.querySelector(
            '[data-element-id="div-hours-grid"]'
        );
        resizeObserver.observe(schedule);
        return resizeObserver;
    }

    initResources() {
        this.computedResources = this.resources.map((res) => {
            return { ...res, height: 0, data: { res } };
        });
    }

    getColumnElementFromPosition(x, isMultiDayColumn) {
        const selector = isMultiDayColumn
            ? `[data-element-id="div-multi-day-events-wrapper"] ${CELL_SELECTOR}`
            : COLUMN_SELECTOR;
        return getElementOnXAxis(this.template, x, selector);
    }

    /**
     * Push the vertical headers, so their top is aligned with the bottom of the horizontal headers.
     */
    setHorizontalHeadersSideSpacing() {
        if (this.horizontalHeaders) {
            if (this.verticalHeaders) {
                // Align the horizontal headers with the vertical headers
                const width =
                    this.verticalHeaders.getBoundingClientRect().width;
                this.horizontalHeaders.style.paddingLeft = `${width - 1}px`;
            }

            // Align the horizontal headers with the right scrollbar, if any
            const hourGrid = this.template.querySelector(
                '[data-element-id="div-hours-grid"]'
            );
            const scrollBarWidth = hourGrid.offsetWidth - hourGrid.clientWidth;
            this.horizontalHeaders.style.marginRight = `${scrollBarWidth}px`;
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

    updateCellWidth() {
        super.updateCellWidth();

        const wrapper = this.template.querySelector(
            '[data-element-id="div-schedule-wrapper"]'
        );
        const firstCol = this.template.querySelector(
            '[data-element-id="div-first-column"]'
        );
        const hourHeader = this.template.querySelector(
            '[data-element-id="avonni-primitive-scheduler-header-group-vertical"]'
        );

        if (wrapper && firstCol && hourHeader) {
            this.dayHeadersVisibleWidth =
                wrapper.offsetWidth -
                firstCol.offsetWidth -
                hourHeader.offsetWidth;
        }
    }

    updateColumnEvents() {
        this.columns.forEach((col) => {
            const weekday = col.weekday;
            const events = [];
            const disabledEvents = [];
            this.singleDayEvents.forEach((event) => {
                const occurrences = event.occurrences.filter((occurrence) => {
                    return occurrence.fromWeekday === weekday;
                });
                if (event.disabled) {
                    disabledEvents.push(occurrences);
                } else {
                    events.push(occurrences);
                }
            });
            col.events = events.flat();
            col.disabledEvents = disabledEvents.flat();
            col.initCells();
        });

        const multiDayOccurrences = [];
        const disabledMultiDayOccurrences = [];
        this.multiDayEvents.forEach((event) => {
            if (event.disabled) {
                disabledMultiDayOccurrences.push(...event.occurrences);
            } else {
                multiDayOccurrences.push(...event.occurrences);
            }
        });
        this.multiDayEventsCellGroup.events = multiDayOccurrences;
        this.multiDayEventsCellGroup.disabledEvents =
            disabledMultiDayOccurrences;
        this.multiDayEventsCellGroup.initCells();
    }

    updateOccurrencesOffset(column, selector, isSingleDayOccurrence) {
        const { events, disabledEvents } = column;
        let rowHeight = 0;

        if (events.length) {
            // Update the occurrences offset
            const occurrences = Array.from(
                this.template.querySelectorAll(
                    `${selector}:not([data-disabled="true"])`
                )
            );

            rowHeight += updateOccurrencesOffset.call(
                this,
                occurrences,
                events,
                isSingleDayOccurrence
            );
        }

        if (disabledEvents.length) {
            // Update the disabled occurrences offset
            const disabledOccurrences = Array.from(
                this.template.querySelectorAll(
                    `${selector}[data-disabled="true"]`
                )
            );

            const cellSize = isSingleDayOccurrence
                ? this.cellWidth
                : this.multiDayCellHeight;
            rowHeight += updateOccurrencesOffset.call(
                this,
                disabledOccurrences,
                disabledEvents,
                true,
                cellSize
            );
        }
        return rowHeight;
    }

    updateOccurrencesPosition() {
        updateOccurrencesPosition.call(this);

        // Set the reference line height to the width of one cell
        const schedule = this.template.querySelector(
            '[data-element-id="div-schedule-body"]'
        );
        schedule.style = `
            --avonni-primitive-scheduler-event-reference-line-length: ${this.cellWidth}px
        `;
    }

    /**
     * Prevent the events from overlapping by computing their horizontal position.
     */
    updateSingleAndMultiDayEventsOffset() {
        this.columns.forEach((column) => {
            const selector = `[data-element-id="avonni-primitive-scheduler-event-occurrence-single-day"][data-weekday="${column.weekday}"]`;
            this.updateOccurrencesOffset(column, selector, true);
        });

        if (this.multiDayEvents.length && this.multiDayWrapper) {
            const multiDaySelector =
                '[data-element-id="avonni-primitive-scheduler-event-occurrence-multi-day"]';
            const rowHeight = this.updateOccurrencesOffset(
                this.multiDayEventsCellGroup,
                multiDaySelector
            );
            const height = rowHeight || this.cellHeight;
            this.multiDayCellHeight = height;
            this.multiDayWrapper.style.height = `${height}px`;
        }
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS AND DISPATCHERS
     * -------------------------------------------------------------
     */

    handleCalendarChange(event) {
        const value = event.detail.value;
        if (!value) {
            event.currentTarget.value = this.selectedDate;
            return;
        }

        this._selectedDate = dateTimeObjectFrom(value);
        this.dispatchEvent(
            new CustomEvent('datechange', {
                detail: {
                    value: this.selectedDate
                }
            })
        );
    }

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
                    this.dispatchOpenRecurrenceDialog(
                        this._eventData.selection
                    );
                    break;
                default:
                    break;
            }
            if (updateCellGroups) {
                this.updateColumnEvents();
            }
        }
    };

    handleMultiDayEmptyCellMouseDown(event) {
        if (event.button || this.readOnly) {
            return;
        }

        this._mouseIsDown = true;
        this.dispatchHidePopovers();

        const x = event.clientX || event.detail.x;
        const y = event.clientY || event.detail.y;
        const row = this.multiDayWrapper;
        const cell = getElementOnXAxis(row, x, CELL_SELECTOR);
        const resourceNames = [this.resources[0].name];
        const from = Number(cell.dataset.start);
        const to = Number(cell.dataset.end) + 1;
        this._eventData.handleNewEventMouseDown({
            event,
            cellGroupElement: row,
            from,
            isVertical: false,
            resourceNames,
            to,
            x,
            y
        });
    }

    handleMultiDayEventMouseDown(mouseEvent) {
        this._mouseIsDown = true;
        const row = this.multiDayWrapper;
        this._eventData.handleExistingEventMouseDown(mouseEvent, row, false);
        this.dispatchHidePopovers();
    }

    handleResourceToggle(event) {
        const name = event.currentTarget.value;
        const selected = event.detail.checked;
        if (selected) {
            this.selectedResources.push(name);
        } else {
            const index = this.selectedResources.indexOf(name);
            this.selectedResources.splice(index, 1);
        }
        this.initEvents();
        this.dispatchEvent(
            new CustomEvent('resourceselect', {
                detail: { name }
            })
        );
    }

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
