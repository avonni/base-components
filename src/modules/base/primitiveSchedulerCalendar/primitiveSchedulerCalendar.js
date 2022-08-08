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
import { Interval } from 'c/luxon';
import {
    addToDate,
    dateTimeObjectFrom,
    deepCopy,
    getWeekNumber,
    removeFromDate
} from 'c/utilsPrivate';
import { classSet, generateUUID } from 'c/utils';
import Column from './column';
import {
    getElementOnXAxis,
    getElementOnYAxis,
    getFirstAvailableWeek,
    isAllowedTime,
    nextAllowedMonth,
    nextAllowedDay,
    positionPopover,
    ScheduleBase,
    SchedulerEventOccurrence,
    spansOnMoreThanOneDay,
    updateOccurrencesOffset,
    updateOccurrencesPosition
} from 'c/schedulerUtils';
import { AvonniResizeObserver } from 'c/resizeObserver';

const CELL_SELECTOR = '[data-element-id="div-cell"]';
const COLUMN_SELECTOR = '[data-element-id="div-column"]';
const DEFAULT_SELECTED_DATE = new Date();
const MINIMUM_DAY_COLUMN_WIDTH = 48;
const MONTH_DAY_LABEL_HEIGHT = 30;
const MONTHS = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
};
const SPLITTER_BAR_WIDTH = 12;

export default class PrimitiveSchedulerCalendar extends ScheduleBase {
    _selectedDate = dateTimeObjectFrom(DEFAULT_SELECTED_DATE);
    _selectedResources = [];

    _centerDraggedEvent = false;
    _eventData;
    _mouseInShowMorePopover = false;
    _mouseIsDown = false;
    _resizeObserver;
    _showMorePopoverContextMenuIsOpened = false;
    _showMorePopoverIsFocused = false;
    _showPlaceholderOccurrence = false;
    _updateOccurrencesLength = false;
    cellHeight = 0;
    cellWidth = 0;
    columns = [];
    computedResources = [];
    dayCellDuration = 0;
    dayHeadersVisibleWidth = 0;
    eventHeaderCells = {};
    hourCellDuration = 0;
    multiDayCellHeight = 0;
    multiDayEvents = [];
    multiDayEventsCellGroup = {};
    showMorePopover;
    singleDayEvents = [];
    start = dateTimeObjectFrom(DEFAULT_SELECTED_DATE);
    visibleInterval;

    connectedCallback() {
        window.addEventListener('mouseup', this.handleMouseUp);
        this.setStartToBeginningOfUnit();
        this.initHeaders();
        super.connectedCallback();
    }

    renderedCallback() {
        if (!this._resizeObserver && !this.isYear) {
            this._resizeObserver = this.initResizeObserver();
        } else if (this._resizeObserver && this.isYear) {
            this._resizeObserver.disconnect();
            this._resizeObserver = null;
        }

        if (this.isMonth) {
            this.updateMonthEventsOffset();
            this.toggleShowMoreButtonsVisibility();
        } else if (this.isWeek || this.isDay) {
            this.updateDayAndWeekEventsOffset();
        }
        if (this.isYear) {
            this.centerCalendarsOnRightMonths();
        } else {
            this.updateOccurrencesPosition();
        }
        this.setHorizontalHeadersSideSpacing();

        if (this._eventData && this._eventData.shouldInitDraggedEvent) {
            // A new event is being created by dragging.
            // On the first move, display the event on the timeline.
            this.updateColumnEvents();
            this._eventData.setDraggedEvent();
        }

        if (this.showMorePopover) {
            const popover = this.template.querySelector(
                '[data-element-id="div-popover"]'
            );
            positionPopover(popover, this.showMorePopover.position, true);
            this.focusPopoverClose();
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
        this._selectedDate =
            dateTimeObjectFrom(value) ||
            dateTimeObjectFrom(DEFAULT_SELECTED_DATE);

        if (this._connected) {
            const previousStart = this.start.ts;
            this.setStartToBeginningOfUnit();

            if (previousStart !== this.start.ts) {
                this.initHeaders();
                this.initLeftPanelCalendarDisabledDates();
            }
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

            // If the hour headers appear or disappear, the visible width changes
            requestAnimationFrame(() => {
                this.updateVisibleWidth();
            });
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    get cellsGrid() {
        return this.template.querySelector(
            '[data-element-id="div-cells-grid"]'
        );
    }

    get computedAvailableMonths() {
        return this.availableMonths.map((month) => {
            const luxonMonth = month + 1;
            const markedDates = this.getMonthMarkedDates(luxonMonth);
            const value =
                this.selectedDate.month === luxonMonth
                    ? this.selectedDate
                    : null;
            return {
                key: month,
                label: MONTHS[month],
                markedDates,
                value
            };
        });
    }

    get dayHeaders() {
        const label = this.isMonth ? 'ccc' : 'ccc dd';
        return [
            {
                label,
                unit: 'day',
                span: 1
            }
        ];
    }

    get dayHeadersClass() {
        return classSet('avonni-scheduler__calendar-header')
            .add({
                'slds-border_left': !this.isMonth
            })
            .toString();
    }

    get dayHeadersTimeSpan() {
        if (this.isDay) {
            return this.hourHeadersTimeSpan;
        }
        return {
            unit: 'week',
            span: 1
        };
    }

    get hourHeadersTimeSpan() {
        return {
            unit: 'day',
            span: 1
        };
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

    get leftPanelContent() {
        return this.template.querySelector(
            '[data-element-id="div-panel-content"]'
        );
    }

    get mainGridEvents() {
        return this.isMonth || this.isYear
            ? this.singleDayEvents.concat(this.multiDayEvents)
            : this.singleDayEvents;
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
     * Computed CSS class for the schedule column.
     *
     * @type {string}
     */
    get scheduleColClass() {
        return classSet(
            'avonni-primitive-scheduler-calendar__inherit-height slds-grid'
        )
            .add({
                'avonni-scheduler__schedule-col_zoom-to-fit': this.zoomToFit,
                'slds-grid_vertical': !this.isYear,
                'slds-wrap slds-scrollable_y': this.isYear
            })
            .toString();
    }

    get showHourHeaders() {
        return this.isDay || this.isWeek;
    }

    get showTopMultiDayEvents() {
        return (
            !this.isMonth &&
            this.multiDayEvents.length &&
            this.multiDayEventsCellGroup.cells
        );
    }

    get singleDayEventVariant() {
        return this.isMonth ? 'calendar-month' : 'calendar-vertical';
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
        const to = Number(cell.dataset.end);
        const resourceNames = [this.firstSelectedResource.name];
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

        if (this.isDay || this.isWeek) {
            // Create a cell group for the multi day events row
            const referenceCells = this.columns.map((col) => {
                return {
                    start: col.start.ts,
                    end: col.end.ts - 1
                };
            });
            this.multiDayEventsCellGroup = new Column({ referenceCells });
            this._eventData.multiDayEventsCellGroup =
                this.multiDayEventsCellGroup;
        }
        this.updateColumnEvents();
    }

    initHeaders() {
        if (this.isYear) {
            this.initEvents();
            return;
        }

        // Reset the header cells used by the events to position themselves
        this.eventHeaderCells = {};

        // Start at the begining of the first day
        let startDate = new Date(this.start.ts);
        startDate.setHours(0, 0, 0, 0);
        startDate = dateTimeObjectFrom(startDate);

        // Create a column for each available day
        const columns = [];
        const availableDays = this.isDay
            ? [startDate.weekday]
            : this.availableDaysOfTheWeek;

        for (let i = 0; i < availableDays.length; i++) {
            const column = {
                events: [],
                referenceCells: []
            };
            let weekday = availableDays[i];

            if (startDate.weekday === 7 && weekday !== 0) {
                // Make sure the day will be set to the next weekday,
                // not the previous weekday
                startDate = addToDate(startDate, 'day', 1);
            } else if (weekday === 0) {
                // Luxon's Sunday is 7, not 0
                weekday = 7;
            }
            startDate = startDate.set({ weekday });

            if (this.isMonth) {
                const firstColumn = columns[0];
                const minNumberOfCells = firstColumn
                    ? firstColumn.cells.length
                    : 0;
                this.computeDayCells(column, startDate, minNumberOfCells);
            } else {
                this.computeHourCells(column, startDate);
            }
            columns.push(new Column(column));
        }
        this.columns = columns;

        if (this.isMonth) {
            this.initMonthTimeBoundaries();
        }
    }

    initMonthTimeBoundaries() {
        // Set the vertical event header reference cells
        const lastColumn = this.columns[this.columns.length - 1];
        const yAxis = deepCopy(this.columns[0].referenceCells);
        yAxis.forEach((cell, index) => {
            const lastColumnCell = lastColumn.referenceCells[index];
            cell.end = lastColumnCell.end;
        });
        this.eventHeaderCells.yAxis = yAxis;

        // Set the horizontal event header reference cells
        this.eventHeaderCells.xAxis = this.columns.map((col) => {
            const cells = col.referenceCells;
            const lastCell = cells[cells.length - 1];
            return {
                start: cells[0].start,
                end: lastCell.end
            };
        });

        // Set the visible interval
        const lastCell = lastColumn.cells[lastColumn.cells.length - 1];
        const end = dateTimeObjectFrom(lastCell.end);
        this.visibleInterval = Interval.fromDateTimes(this.start, end);
    }

    /**
     * Initialize the screen resize observer.
     *
     * @returns {AvonniResizeObserver} Resize observer.
     */
    initResizeObserver() {
        const resizeObserver = new AvonniResizeObserver(() => {
            if (this.isMonth) {
                this.updateCellHeight();
            }
            this.updateCellWidth();
            this.updateVisibleWidth();
        });
        resizeObserver.observe(this.cellsGrid);
        resizeObserver.observe(this.leftPanelContent);
        return resizeObserver;
    }

    initResources() {
        this.computedResources = this.resources.map((res) => {
            return { ...res, height: 0, data: { res } };
        });
    }

    centerCalendarsOnRightMonths() {
        const calendars = this.template.querySelectorAll(
            '[data-element-id="avonni-calendar-year-month"]'
        );
        let date = dateTimeObjectFrom(this.start);
        calendars.forEach((calendar) => {
            calendar.goToDate(date.ts);
            date = addToDate(date, 'month', 1);
        });
    }

    computeDayCells(column, date, minNumberOfCells) {
        const currentMonth = addToDate(date, 'week', 1).month;
        let notEnoughCells = true;
        let isCurrentMonth = true;

        while (notEnoughCells || isCurrentMonth) {
            const start = date.startOf('day');
            const end = date.endOf('day');
            column.referenceCells.push({
                currentMonth,
                start: start.ts,
                end: end.ts
            });
            date = addToDate(date, 'week', 1);
            notEnoughCells =
                minNumberOfCells &&
                column.referenceCells.length < minNumberOfCells;
            const beginningOfJanuary = date.month === 1 && currentMonth === 12;
            isCurrentMonth = date.month <= currentMonth && !beginningOfJanuary;
        }
    }

    computeHourCells(column, date) {
        const availableHours = this.getAvailableHours(date);

        for (let j = 0; j < availableHours.length; j++) {
            date = date.set({ hour: availableHours[j] });
            const start = date.startOf('hour');
            const end = start.endOf('hour');
            column.referenceCells.push({
                start: start.ts,
                end: end.ts
            });
        }
    }

    createVisibleMultiWeekPlaceholders(occ, cells, event) {
        const placeholders = [];
        const eventKeysToCopy = [
            'color',
            'data',
            'disabled',
            'iconName',
            'labels',
            'name',
            'theme'
        ];

        for (let i = 0; i < cells.length; i++) {
            // Create a new visible placeholder
            // for each week the occurrence spans on
            const duplicate = new SchedulerEventOccurrence(occ);
            eventKeysToCopy.forEach((key) => {
                duplicate[key] = event[key];
            });

            duplicate.weekStart = dateTimeObjectFrom(cells[i].start);
            placeholders.push(duplicate);
        }
        return placeholders;
    }

    focusPopoverClose = () => {
        const closeButton = this.template.querySelector(
            '[data-element-id="lightning-button-icon-show-more-close"]'
        );
        if (closeButton) {
            closeButton.focus();
            this._showMorePopoverIsFocused = true;
        }
        this._showMorePopoverContextMenuIsOpened = false;
    };

    getAvailableHours(start) {
        let time = dateTimeObjectFrom(start);
        const availableHours = [];

        for (let i = 0; i < 24; i++) {
            if (isAllowedTime(time, this.availableTimeFrames)) {
                availableHours.push(time.hour);
            }
            time = addToDate(time, 'hour', 1);
        }
        return availableHours;
    }

    getColumnElementFromPosition(x, isMultiDayColumn) {
        const selector = isMultiDayColumn
            ? `[data-element-id="div-multi-day-events-wrapper"] ${CELL_SELECTOR}`
            : COLUMN_SELECTOR;
        return getElementOnXAxis(this.template, x, selector);
    }

    getMonthMarkedDates(month) {
        const monthDate = this.selectedDate.set({ month });
        const monthStart = monthDate.startOf('month');
        const monthEnd = monthDate.endOf('month');
        const monthInterval = Interval.fromDateTimes(monthStart, monthEnd);
        const dayMap = {};

        return this._eventData.events.reduce((markedDates, event) => {
            event.occurrences.forEach((occ) => {
                const { from, to, resourceName } = occ;
                const normalizedTo = event.referenceLine ? from : to;
                const occInterval = Interval.fromDateTimes(from, normalizedTo);
                const intersection = monthInterval.intersection(occInterval);

                if (intersection) {
                    const days = intersection.count('days');
                    const color =
                        event.color || this.getResourceColor(resourceName);
                    let currentDate = intersection.s;

                    for (let i = 0; i < days; i++) {
                        // Only add one marker per resource per day
                        const alreadyMarked =
                            dayMap[currentDate.day] &&
                            dayMap[currentDate.day].includes(resourceName);
                        if (!alreadyMarked) {
                            markedDates.push({
                                color,
                                date: currentDate.toUTC().toISO()
                            });

                            if (!dayMap[currentDate.day]) {
                                dayMap[currentDate.day] = [];
                            }
                            dayMap[currentDate.day].push(resourceName);
                            currentDate = addToDate(currentDate, 'day', 1);
                        }
                    }
                }
            });
            return markedDates;
        }, []);
    }

    getMultiDayPlaceholders(isFirstCol, col, event, occ) {
        const { from, to } = occ;
        const isMultiDay = spansOnMoreThanOneDay(
            event,
            event.computedFrom,
            event.computedTo
        );
        const cellsPassed = col.cells.filter((cell) => {
            return (
                cell.start > from &&
                (event.referenceLine || cell.end <= to.endOf('day'))
            );
        });
        const spansOnMoreThanOneWeek =
            getWeekNumber(from) !== getWeekNumber(to);
        const isPlaceholder =
            isMultiDay && (cellsPassed.length || spansOnMoreThanOneWeek);

        if (!isPlaceholder) {
            return [];
        }

        let placeholders = [];
        if (spansOnMoreThanOneWeek && isFirstCol) {
            // Create copies of the occurrence for each subsequent week it spans on.
            // These placeholders will be visible.
            placeholders = this.createVisibleMultiWeekPlaceholders(
                occ,
                cellsPassed,
                event
            );
            occ.copies = placeholders;
        } else {
            // Create hidden placeholders in any other column
            cellsPassed.forEach((cell) => {
                let placeholderOccurrence = occ;
                if (occ.copies) {
                    const copy = occ.copies.find((cop) => {
                        return cell.weekNumber === getWeekNumber(cop.weekStart);
                    });
                    if (copy) {
                        // Always use the first column occurrence or visible placeholder
                        // as a reference for the other row placeholders
                        placeholderOccurrence = copy;
                    }
                }
                placeholders.push(placeholderOccurrence);
            });
        }
        return placeholders;
    }

    getMultiDayPlaceholdersInCell(cell) {
        const placeholders = [];

        if (cell.events.length || cell.placeholders.length) {
            const cellStart = dateTimeObjectFrom(cell.start);
            const day = cellStart.day;
            const month = cellStart.month;
            const placeholderElements = this.template.querySelectorAll(
                `[data-element-id="avonni-primitive-scheduler-event-occurrence-placeholder"][data-month="${month}"][data-day="${day}"]`
            );
            placeholderElements.forEach((placeholder) => {
                if (!placeholder.occurrence.overflowsCell) {
                    placeholders.push(placeholder);
                }
            });
        }
        return placeholders;
    }

    getResourceColor(resourceName) {
        const resource = this.resources.find(
            (res) => res.name === resourceName
        );
        return resource && resource.color;
    }

    hideSelectionPlaceholders() {
        const key = this._eventData.selection.occurrence.key;
        const placeholders = this.template.querySelectorAll(
            `[data-element-id="avonni-primitive-scheduler-event-occurrence-placeholder"][data-key="${key}"]`
        );
        placeholders.forEach((placeholder) => {
            placeholder.classList.add('slds-hide');
        });
    }

    isDisabledCell(cell) {
        const start = Number(cell.dataset.start);
        if (this.isMonth && start) {
            const cellMonth = new Date(start).getMonth();
            if (!this.availableMonths.includes(cellMonth)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Push the vertical headers, so their top is aligned with the bottom of the horizontal headers.
     */
    setHorizontalHeadersSideSpacing() {
        const horizontalHeaders = this.template.querySelector(
            '[data-element-id="div-horizontal-header-wrapper"]'
        );
        if (!horizontalHeaders) {
            return;
        }

        const verticalHeaders = this.template.querySelector(
            '[data-element-id="avonni-primitive-scheduler-header-group-vertical"]'
        );
        if (verticalHeaders) {
            // Align the horizontal headers with the vertical headers
            const width = verticalHeaders.getBoundingClientRect().width;
            horizontalHeaders.style.paddingLeft = `${width - 1}px`;
        } else {
            horizontalHeaders.style.paddingLeft = null;
        }

        // Align the horizontal headers with the right scrollbar, if any
        const scrollBarWidth =
            this.cellsGrid.offsetWidth - this.cellsGrid.clientWidth;
        horizontalHeaders.style.marginRight = `${scrollBarWidth}px`;
    }

    setSelectedDateToAvailableDate() {
        this._selectedDate = nextAllowedMonth(
            this.selectedDate,
            this.availableMonths
        );
        if (this.isDay || this.isWeek) {
            this._selectedDate = nextAllowedDay(
                this.selectedDate,
                this.availableMonths,
                this.availableDaysOfTheWeek
            );
        }
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

        if (this.isYear) {
            const { span, unit } = this.timeSpan;
            const endOfSpan = addToDate(this.start, unit, span) - 1;
            const end = dateTimeObjectFrom(endOfSpan);
            this.visibleInterval = Interval.fromDateTimes(this.start, end);
            this.dispatchVisibleIntervalChange(
                this.start,
                this.visibleInterval
            );
        }
    }

    updateCellHeight() {
        const numberOfRows = this.columns[0].referenceCells.length;
        const splitter = this.template.querySelector(
            '[data-element-id="avonni-splitter"]'
        );
        const splitterHeight = splitter.getBoundingClientRect().height;
        const dayHeaders = this.template.querySelector(
            '[data-element-id="avonni-primitive-scheduler-header-group-horizontal"]'
        );
        const dayHeadersHeight = dayHeaders.getBoundingClientRect().height;
        const availableHeight = splitterHeight - dayHeadersHeight;
        this.cellHeight = availableHeight / numberOfRows;
        this.template.host.style = `
            --avonni-scheduler-cell-height: ${this.cellHeight}px;
        `;
    }

    updateColumnEvents() {
        this.columns.forEach((col, index) => {
            const events = [];
            const disabledEvents = [];
            let multiDayPlaceholders = [];
            const isFirstCol = index === 0;

            this.mainGridEvents.forEach((event) => {
                const occurrences = event.occurrences.filter((occurrence) => {
                    if (this.isMonth) {
                        const placeholders = this.getMultiDayPlaceholders(
                            isFirstCol,
                            col,
                            event,
                            occurrence
                        );
                        if (placeholders.length) {
                            multiDayPlaceholders =
                                multiDayPlaceholders.concat(placeholders);
                            return false;
                        }
                    }
                    return occurrence.fromWeekday === col.weekday;
                });

                if (event.disabled && !this.isMonth) {
                    disabledEvents.push(occurrences);
                } else {
                    events.push(occurrences);
                }
            });
            col.multiDayPlaceholders = multiDayPlaceholders;
            col.events = events.flat();
            col.disabledEvents = disabledEvents.flat();
            col.initCells();
        });

        if (this.isDay || this.isWeek) {
            this.updateMultiDayCellGroupEvents();
        }
    }

    updateMultiDayCellGroupEvents() {
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

    updateOccurrencesOffset(
        { events, disabledEvents },
        selector,
        isSingleDayOccurrence
    ) {
        let rowHeight = 0;

        if (events.length) {
            // Update the occurrences offset
            const occurrences = Array.from(
                this.template.querySelectorAll(
                    `${selector}:not([data-disabled="true"])`
                )
            );

            rowHeight += updateOccurrencesOffset.call(this, {
                occurrenceElements: occurrences,
                isVertical: isSingleDayOccurrence,
                isCalendarMonth: this.isMonth
            });
        }

        if (disabledEvents.length) {
            // Update the disabled occurrences offset
            const disabledOccurrences = Array.from(
                this.template.querySelectorAll(
                    `${selector}[data-disabled="true"]`
                )
            );

            const disabledCellSize = isSingleDayOccurrence
                ? this.cellWidth
                : this.multiDayCellHeight;
            rowHeight += updateOccurrencesOffset.call(this, {
                occurrenceElements: disabledOccurrences,
                isVertical: true,
                isCalendarMonth: this.isMonth,
                cellSize: disabledCellSize
            });
        }
        return rowHeight;
    }

    updateOccurrencesPosition() {
        updateOccurrencesPosition.call(this);

        if (this.isWeek || this.isDay) {
            // Set the reference line height to the width of one cell
            const schedule = this.template.querySelector(
                '[data-element-id="div-schedule-body"]'
            );
            schedule.style = `
                --avonni-primitive-scheduler-event-reference-line-length: ${this.cellWidth}px
            `;
        }
    }

    updateDayAndWeekEventsOffset() {
        this.columns.forEach((column) => {
            // Update the single day occurrences offset
            const selector = `[data-element-id="avonni-primitive-scheduler-event-occurrence-single-day"][data-weekday="${column.weekday}"]`;
            this.updateOccurrencesOffset(column, selector, true);

            if (this.multiDayEvents.length && this.multiDayWrapper) {
                // Update the multi-day occurrences offset
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
        });
    }

    updateMonthEventsOffset() {
        this.columns.forEach((column) => {
            column.cells.forEach((cell) => {
                const selector = `[data-element-id="avonni-primitive-scheduler-event-occurrence-single-day"][data-weekday="${column.weekday}"][data-day="${cell.day}"][data-month="${cell.month}"]`;
                const occurrences = Array.from(
                    this.template.querySelectorAll(selector)
                );
                const placeholders = this.getMultiDayPlaceholdersInCell(cell);
                const allOccurrences = occurrences.concat(placeholders);

                if (allOccurrences.length) {
                    const cellSize = this.cellHeight - MONTH_DAY_LABEL_HEIGHT;
                    updateOccurrencesOffset.call(this, {
                        occurrenceElements: allOccurrences,
                        isVertical: false,
                        isCalendarMonth: this.isMonth,
                        cellSize
                    });
                }
            });
        });
    }

    updateVisibleWidth() {
        const wrapper = this.template.querySelector(
            '[data-element-id="div-wrapper"]'
        );
        const hourHeader = this.template.querySelector(
            '[data-element-id="avonni-primitive-scheduler-header-group-vertical"]'
        );
        const splitter = this.template.querySelector(
            '[data-element-id="avonni-splitter"]'
        );

        if (wrapper && splitter) {
            const leftPanel = splitter.shadowRoot.querySelector(
                '[data-element-id="avonni-splitter-pane-left"]'
            );
            const rightPanel = splitter.shadowRoot.querySelector(
                '[data-element-id="avonni-splitter-pane-right"]'
            );
            const scrollBarWidth =
                rightPanel.offsetWidth - rightPanel.clientWidth;
            const verticalHeaderWidth = hourHeader ? hourHeader.offsetWidth : 0;

            const width =
                wrapper.offsetWidth -
                leftPanel.offsetWidth -
                SPLITTER_BAR_WIDTH -
                verticalHeaderWidth -
                scrollBarWidth;

            const cellWidth = width / this.columns.length;
            this.dayHeadersVisibleWidth =
                this.zoomToFit || cellWidth >= MINIMUM_DAY_COLUMN_WIDTH
                    ? width
                    : 0;
        }
    }

    toggleShowMoreButtonsVisibility() {
        this.columns.forEach((col) => {
            col.cells.forEach((cell) => {
                const button = this.template.querySelector(
                    `[data-element-id="lightning-button-month-show-more"][data-start="${cell.start}"]`
                );
                if (cell.overflowingEvents.length) {
                    button.classList.remove('slds-hide');
                    button.label = cell.showMoreLabel;
                } else {
                    button.classList.add('slds-hide');
                }
            });
        });
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS AND DISPATCHERS
     * -------------------------------------------------------------
     */

    handleDoubleClick(event) {
        if (this.isDisabledCell(event.currentTarget)) {
            return;
        }
        super.handleDoubleClick(event);
    }

    handleEmptySpotContextMenu(event) {
        if (this.isDisabledCell(event.currentTarget)) {
            return;
        }
        super.handleEmptySpotContextMenu(event);
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
            this.template.host.style = `
                --avonni-scheduler-cell-height: ${this.cellHeight}px;
            `;
        } else {
            this.cellWidth = cellSize;
        }
    }

    handleHorizontalHeaderChange(event) {
        const { smallestHeader, visibleInterval } = event.detail;
        const { start, cells, unit, span } = smallestHeader;

        // Update the start date in case it was not available
        this.start = start;

        if (!this.isMonth) {
            this.eventHeaderCells.xAxis = cells;
            this.visibleInterval = visibleInterval;
        }
        this.dispatchVisibleIntervalChange(start, visibleInterval);
        const end = addToDate(start, unit, span) - 1;
        this.dayCellDuration = dateTimeObjectFrom(end).diff(start).milliseconds;

        this.initEvents();
        if (this.isMonth) {
            this.updateCellHeight();
        }
    }

    handleMonthCellShowMoreClick(event) {
        const columnIndex = Number(event.currentTarget.dataset.columnIndex);
        const start = Number(event.currentTarget.dataset.start);
        const startDate = dateTimeObjectFrom(start);
        const cell = this.columns[columnIndex].cells.find((c) => {
            return c.start === start;
        });

        // Include the multi-day events that are going through the cell
        const allEvents = cell.events.concat(cell.placeholders);

        allEvents.sort((a, b) => {
            return a.from - b.from;
        });
        const events = allEvents.map((occ) => {
            const occurrence = { ...occ };
            occurrence.overflowsCell = false;
            occurrence.event = this._eventData.events.find((e) => {
                return e.key === occ.eventKey;
            });
            // If the event is a reference line,
            // use the start date as an end date too
            const to = occ.to ? occ.to : occ.from;
            occurrence.startsInPreviousCell =
                occ.from.startOf('day') < startDate.startOf('day');
            occurrence.endsInLaterCell =
                to.endOf('day') > startDate.endOf('day');
            return occurrence;
        });

        const { x, width } = event.currentTarget.getBoundingClientRect();
        const buttonCenter = x + width / 2;
        const position = {
            x: buttonCenter,
            y: event.clientY
        };

        const date = dateTimeObjectFrom(start);
        this.showMorePopover = {
            events,
            position,
            label: date.toFormat('cccc d')
        };
    }

    /**
     * Handle the mousedown event fired by an empty cell or a disabled primitive event occurrence. Prepare the scheduler for a new event to be created on drag.
     */
    handleMouseDown(event) {
        if (
            event.button ||
            this.readOnly ||
            !this.firstSelectedResource ||
            this.isMonth
        ) {
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
        const from = Number(cell.dataset.start);
        const to = Number(cell.dataset.end) + 1;
        this._eventData.handleNewEventMouseDown({
            event,
            cellGroupElement: columnElement,
            from,
            resourceNames: [this.firstSelectedResource.name],
            to,
            x,
            y
        });
    }

    /**
     * Handle the mousemove event fired by the schedule. If an event is being clicked, compute its resizing or dragging.
     */
    handleMouseMove(mouseEvent) {
        if (!this._mouseIsDown) {
            return;
        }

        // Prevent scrolling
        mouseEvent.preventDefault();

        const { event, occurrence, occurrences, isMoving } =
            this._eventData.selection;
        const shouldShrinkMultiDayEvent =
            this.isMonth &&
            !isMoving &&
            spansOnMoreThanOneDay(event, occurrence.from, occurrence.to);

        if (this._showPlaceholderOccurrence) {
            // Make sure the main occurrence is not hidden in a popover
            const mainOccurrence = occurrences.find(
                (occ) => occ.key === occurrence.key
            );
            mainOccurrence.overflowsCell = false;
            this.updateOccurrencesPosition();
            this._showPlaceholderOccurrence = false;
        }

        if (shouldShrinkMultiDayEvent || this._centerDraggedEvent) {
            // On first move, shrink the width of the month multi-day events
            // and center the dragged event under the mouse
            const x = mouseEvent.clientX;
            const y = mouseEvent.clientY;
            this._eventData.shrinkDraggedEvent(this.cellWidth, x, y);
            this.hideSelectionPlaceholders();
            this._centerDraggedEvent = false;
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
        this._showPlaceholderOccurrence = false;
        this._centerDraggedEvent = false;
        const x = mouseEvent.clientX;
        const y = mouseEvent.clientY;
        const { eventToDispatch, updateCellGroups } =
            this._eventData.handleMouseUp(x, y);

        switch (eventToDispatch) {
            case 'edit':
                this.dispatchOpenEditDialog(this._eventData.selection);
                break;
            case 'recurrence':
                this.dispatchOpenRecurrenceDialog(this._eventData.selection);
                break;
            default:
                break;
        }
        if (updateCellGroups) {
            this.updateColumnEvents();
        }
    };

    handleMultiDayEmptyCellMouseDown(event) {
        if (event.button || this.readOnly || !this.firstSelectedResource) {
            return;
        }

        this._mouseIsDown = true;
        this.dispatchHidePopovers();

        const x = event.clientX || event.detail.x;
        const y = event.clientY || event.detail.y;
        const row = this.multiDayWrapper;
        const cell = getElementOnXAxis(row, x, CELL_SELECTOR);
        const from = Number(cell.dataset.start);
        const to = Number(cell.dataset.end) + 1;
        this._eventData.handleNewEventMouseDown({
            event,
            cellGroupElement: row,
            from,
            isVertical: false,
            resourceNames: [this.firstSelectedResource.name],
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

    handlePlaceholderMouseDown(mouseEvent) {
        const isVisible = mouseEvent.currentTarget.dataset.columnIndex === '0';
        if (!isVisible) {
            return;
        }
        this._showPlaceholderOccurrence = true;
        this.handleHiddenEventMouseDown(mouseEvent);
    }

    handleShowMorePopoverClose() {
        const date = this.showMorePopover && this.showMorePopover.date;
        if (this.isYear && date) {
            requestAnimationFrame(() => {
                const calendar = this.template.querySelector(
                    `[data-element-id="avonni-calendar-year-month"][data-month="${
                        date.month - 1
                    }"]`
                );
                if (calendar) {
                    calendar.focusDate(date.ts);
                }
            });
        }
        this.showMorePopover = null;
        this._mouseInShowMorePopover = false;
        this._showMorePopoverIsFocused = false;
        this._showMorePopoverContextMenuIsOpened = false;
    }

    handleShowMorePopoverEventContextMenu(event) {
        const target = event.currentTarget;
        if (target.disabled || target.referenceLine) {
            return;
        }

        this.dispatchEvent(
            new CustomEvent('eventcontextmenu', {
                detail: {
                    ...event.detail,
                    focusPopover: this.focusPopoverClose
                }
            })
        );

        this._showMorePopoverContextMenuIsOpened = true;
    }

    handleHiddenEventMouseDown(mouseEvent) {
        if (this.isYear) {
            return;
        }
        this._mouseIsDown = true;
        const key = mouseEvent.currentTarget.dataset.key;
        const draggedEvent = this.template.querySelector(
            `[data-element-id="avonni-primitive-scheduler-event-occurrence-single-day"][data-key="${key}"]`
        );
        const eventInfo = {
            currentTarget: draggedEvent,
            detail: mouseEvent.detail
        };
        this._eventData.handleExistingEventMouseDown(eventInfo);
        this.handleShowMorePopoverClose();
        this.dispatchHidePopovers();
        this._centerDraggedEvent = true;
        this._showPlaceholderOccurrence = true;

        requestAnimationFrame(() => {
            // If the event was only visible in the popover,
            // or if the main event was hidden,
            // we need to update the dragged element after render
            this._eventData.setDraggedEvent();
        });
    }

    handleShowMorePopoverFocusin() {
        this._showMorePopoverIsFocused = true;
    }

    handleShowMorePopoverFocusout() {
        this._showMorePopoverIsFocused = false;

        requestAnimationFrame(() => {
            const activeElement = this.template.activeElement;
            const activeCalendar =
                this.isYear &&
                activeElement &&
                activeElement.dataset.elementId ===
                    'avonni-calendar-year-month';

            if (
                !this._showMorePopoverIsFocused &&
                this._mouseInShowMorePopover &&
                !this._showMorePopoverContextMenuIsOpened
            ) {
                this.focusPopoverClose();
            } else if (
                !this._showMorePopoverIsFocused &&
                !this._mouseInShowMorePopover &&
                !this._showMorePopoverContextMenuIsOpened &&
                !activeCalendar
            ) {
                this.handleShowMorePopoverClose();
            }
        });
    }

    handleShowMorePopoverMouseEnter() {
        this._mouseInShowMorePopover = true;
    }

    handleShowMorePopoverMouseLeave() {
        this._mouseInShowMorePopover = false;
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

    handleYearCalendarNavigate(event) {
        const calendar = event.currentTarget;
        const month = calendar.dataset.month;
        const date = this.start.set({ month: Number(month) + 1, day: 1 });
        calendar.goToDate(date.ts);
        calendar.focusDate(date.ts);
    }

    handleYearDateClick(event) {
        const date = dateTimeObjectFrom(event.detail.clickedDate);
        this._selectedDate = date;
        const dayElement = event.currentTarget.shadowRoot.querySelector(
            `[data-element-id="span-day-label"][data-day="${date.ts}"]`
        );
        const { x, y, width, height } = dayElement.getBoundingClientRect();
        const position = {
            x: x + width / 2,
            y: y + height / 2
        };

        const events = this._eventData.events.map((ev) => {
            const occurrences = [];
            ev.occurrences.forEach((occ) => {
                // If the event is a reference line,
                // use the start date as an end date too
                const to = occ.to ? occ.to : occ.from;
                const interval = Interval.fromDateTimes(occ.from, to);
                const day = Interval.fromDateTimes(
                    date.startOf('day'),
                    date.endOf('day')
                );
                if (interval.overlaps(day)) {
                    occurrences.push({
                        ...occ,
                        event: ev,
                        startsInPreviousCell:
                            occ.from.startOf('day') < date.startOf('day'),
                        endsInLaterCell: to.endOf('day') > date.endOf('day')
                    });
                }
            });
            return occurrences;
        });

        this.showMorePopover = {
            position,
            label: date.toFormat('LLLL d'),
            events: events.flat(),
            date
        };
    }

    stopPropagation(event) {
        event.stopPropagation();
    }
}
