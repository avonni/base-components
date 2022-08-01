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
    isAllowedTime,
    nextAllowedMonth,
    nextAllowedDay,
    removeFromDate
} from 'c/utilsPrivate';
import { classSet, generateUUID } from 'c/utils';
import Column from './column';
import {
    getElementOnXAxis,
    getElementOnYAxis,
    isOneDayOrMore,
    positionPopover,
    ScheduleBase,
    SchedulerEventOccurrence,
    updateOccurrencesOffset,
    updateOccurrencesPosition
} from 'c/schedulerUtils';
import { AvonniResizeObserver } from 'c/resizeObserver';

const CELL_SELECTOR = '[data-element-id="div-cell"]';
const COLUMN_SELECTOR = '[data-element-id="div-column"]';
const DEFAULT_SELECTED_DATE = new Date();
const MINIMUM_DAY_COLUMN_WIDTH = 48;
const MONTH_DAY_LABEL_HEIGHT = 30;

export default class PrimitiveSchedulerCalendar extends ScheduleBase {
    _selectedDate = dateTimeObjectFrom(DEFAULT_SELECTED_DATE);
    _selectedResources = [];

    _centerDraggedEvent = false;
    _eventData;
    _initialFirstColWidth = 0;
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
    firstColumnIsHidden = false;
    firstColumnIsOpen = false;
    firstColWidth = 0;
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
        this.initResources();
        this.initHeaders();
        super.connectedCallback();
    }

    renderedCallback() {
        if (!this._resizeObserver) {
            this._resizeObserver = this.initResizeObserver();
        }

        if (!this._initialFirstColWidth) {
            this.resetFirstColumnWidth();
        }

        if (this.isMonth) {
            this.updateMonthEventsOffset();
        } else {
            this.updateDayAndWeekEventsOffset();
        }
        this.updateOccurrencesPosition();
        this.setHorizontalHeadersSideSpacing();

        if (this.isMonth) {
            this.toggleShowMoreButtonsVisibility();
        }

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
        const computedDate = dateTimeObjectFrom(value);
        this._selectedDate =
            computedDate || dateTimeObjectFrom(DEFAULT_SELECTED_DATE);

        if (this._connected) {
            const previousStart = this.start.ts;
            this.setStartToBeginningOfUnit();

            if (previousStart !== this.start.ts) {
                this.initHeaders();
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

    get dayHeadersTimeSpan() {
        if (this.isDay) {
            return this.hourHeadersTimeSpan;
        }
        return {
            unit: 'week',
            span: 1
        };
    }

    get firstSelectedResource() {
        return this.resources.find((res) => {
            return this.selectedResources.includes(res.name);
        });
    }

    get hourHeadersTimeSpan() {
        return {
            unit: 'day',
            span: 1
        };
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

    get isMonth() {
        const { span, unit } = this.timeSpan;
        return unit === 'month' && span === 1;
    }

    get isWeek() {
        const { span, unit } = this.timeSpan;
        return unit === 'week' || (unit === 'day' && span === 7);
    }

    /**
     * Computed CSS classes for the left panel.
     *
     * @type {string}
     */
    get leftPanelClass() {
        return classSet('slds-border_right slds-grid')
            .add({
                'avonni-scheduler__first-col_hidden': this.firstColumnIsHidden,
                'avonni-scheduler__first-col_open': this.firstColumnIsOpen
            })
            .toString();
    }

    get leftPanelContent() {
        return this.template.querySelector(
            '[data-element-id="div-panel-content"]'
        );
    }

    get leftPanelContentClass() {
        return classSet('slds-scrollable_y')
            .add({
                'slds-p-around_small': !this.firstColumnIsHidden
            })
            .toString();
    }

    get mainGridEvents() {
        return this.isMonth
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
            'slds-col avonni-primitive-scheduler-calendar__inherit-height slds-grid slds-grid_vertical'
        )
            .add({
                'slds-hide': this.firstColumnIsOpen,
                'avonni-scheduler__schedule-col_zoom-to-fit': this.zoomToFit
            })
            .toString();
    }

    get showHourHeaders() {
        return this.isDay || this.isWeek;
    }

    get showTopMultiDayEvents() {
        return this.multiDayEvents.length && !this.isMonth;
    }

    get singleDayEventVariant() {
        return this.isMonth ? 'calendar-month' : 'calendar-vertical';
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

        // Create a cell group for the multi day events row
        // visible for the day and week time spans
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

    getFirstAvailableWeek(start) {
        let date = dateTimeObjectFrom(start);
        const availableDays = [...this.availableDaysOfTheWeek];
        if (availableDays[0] === 0) {
            // Transform "0" Sunday to a "7" Luxon Sunday
            availableDays[0] = 7;
            availableDays.sort();
        }

        let hasAvailableDayThisWeek = false;
        while (date.weekday !== 7 && !hasAvailableDayThisWeek) {
            hasAvailableDayThisWeek = availableDays.includes(date.weekday);
            date = addToDate(date, 'day', 1);
        }
        if (!hasAvailableDayThisWeek) {
            return addToDate(start, 'week', 1);
        }
        return start;
    }

    getMultiDayPlaceholders(isFirstCol, col, event, occ) {
        const { from, to } = occ;
        const isMultiDay = isOneDayOrMore(
            event,
            event.computedFrom,
            event.computedTo
        );
        const cellsPassed = col.cells.filter((cell) => {
            return cell.start > from && cell.end <= to.endOf('day');
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

    hideSelectionPlaceholders() {
        const key = this._eventData.selection.occurrence.key;
        const placeholders = this.template.querySelectorAll(
            `[data-element-id="avonni-primitive-scheduler-event-occurrence-placeholder"][data-key="${key}"]`
        );
        placeholders.forEach((placeholder) => {
            placeholder.classList.add('slds-hide');
        });
    }

    /**
     * Reset the width of the first column to the width it had before being collapsed.
     */
    resetFirstColumnWidth() {
        const columnWidth = this.leftPanelContent.getBoundingClientRect().width;
        this._initialFirstColWidth = columnWidth;
        this.firstColWidth = columnWidth;
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
            } else {
                this.horizontalHeaders.style.paddingLeft = null;
            }

            // Align the horizontal headers with the right scrollbar, if any
            const scrollBarWidth =
                this.cellsGrid.offsetWidth - this.cellsGrid.clientWidth;
            this.horizontalHeaders.style.marginRight = `${scrollBarWidth}px`;
        }
    }

    setSelectedDateToAvailableDate() {
        if (this.isMonth) {
            this._selectedDate = nextAllowedMonth(
                this.selectedDate,
                this.availableMonths
            );
        } else {
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
        } else {
            this.start = this.selectedDate;
            if (this.isMonth) {
                this.start = this.start.startOf('month');

                if (this.start.weekday !== 7) {
                    // Make sure there are available days in the current week.
                    // Otherwise, go to the next week.
                    this.start = this.getFirstAvailableWeek(this.start);
                }
            }

            if (this.start.weekday !== 7) {
                this.start = this.start.startOf('week');
                this.start = removeFromDate(this.start, 'day', 1);
            }
        }
    }

    updateCellHeight() {
        const numberOfRows = this.columns[0].referenceCells.length;
        const leftPanelHeight =
            this.leftPanelContent.getBoundingClientRect().height;
        const dayHeaders = this.template.querySelector(
            '[data-element-id="avonni-primitive-scheduler-header-group-horizontal"]'
        );
        const dayHeadersHeight = dayHeaders.getBoundingClientRect().height;
        const availableHeight = leftPanelHeight - dayHeadersHeight;
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

        if (!this.isMonth) {
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

            rowHeight += updateOccurrencesOffset.call(
                this,
                occurrences,
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

            const disabledCellSize = isSingleDayOccurrence
                ? this.cellWidth
                : this.multiDayCellHeight;
            rowHeight += updateOccurrencesOffset.call(
                this,
                disabledOccurrences,
                true,
                disabledCellSize
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
                    updateOccurrencesOffset.call(
                        this,
                        allOccurrences,
                        false,
                        cellSize
                    );
                }
            });
        });

        if (this._eventData && this._eventData.eventDrag) {
            const occurrence = this._eventData.selection.occurrence;
            occurrence.overflowsCell = false;
        }
    }

    updateVisibleWidth() {
        const wrapper = this.template.querySelector(
            '[data-element-id="div-schedule-wrapper"]'
        );
        const leftPanel = this.template.querySelector(
            '[data-element-id="div-left-panel"]'
        );
        const hourHeader = this.template.querySelector(
            '[data-element-id="avonni-primitive-scheduler-header-group-vertical"]'
        );

        if (wrapper && leftPanel && this.cellsGrid) {
            const scrollBarWidth =
                this.cellsGrid.offsetWidth - this.cellsGrid.clientWidth;
            const verticalHeaderWidth = hourHeader ? hourHeader.offsetWidth : 0;
            const width =
                wrapper.offsetWidth -
                leftPanel.offsetWidth -
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
            this.template.host.style = `
                --avonni-scheduler-cell-height: ${this.cellHeight}px;
            `;
        } else {
            this.cellWidth = cellSize;
        }
    }

    /**
     * Handle the click event fired by the splitter left collapse button. If the first column was taking the full screen, resize it to its initial width. Else, hide the first column.
     */
    handleHideFirstCol() {
        this.dispatchHidePopovers();

        if (this.firstColumnIsOpen) {
            this.firstColumnIsOpen = false;
            this.firstColWidth = this._initialFirstColWidth;
            this.leftPanelContent.style.width = `${this._initialFirstColWidth}px`;
        } else {
            this.firstColumnIsHidden = true;
            this.firstColWidth = 0;
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
            occurrence.startsInPreviousCell = occ.from.day < startDate.day;
            occurrence.endsInLaterCell = occ.to.day > startDate.day;
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
            this.leftPanelContent.style.width = `${width}px`;
            this.firstColWidth = width;
        } else {
            const { event, occurrence, occurrences, isMoving } =
                this._eventData.selection;
            const shouldShrinkMultiDayEvent =
                this.isMonth &&
                !isMoving &&
                isOneDayOrMore(event, occurrence.from, occurrence.to);

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
    }

    handleMouseUp = (mouseEvent) => {
        if (!this._mouseIsDown) {
            return;
        }
        this._mouseIsDown = false;
        this._showPlaceholderOccurrence = false;
        this._centerDraggedEvent = false;

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

    /**
     * Handle the click event fired by the splitter right collapse button. If the first column was hidden, resize it to its initial width. Else, make it full screen.
     */
    handleOpenFirstCol() {
        this.dispatchHidePopovers();
        this.leftPanelContent.style.width = null;

        if (this.firstColumnIsHidden) {
            this.firstColumnIsHidden = false;
            this.firstColWidth = this._initialFirstColWidth;
        } else {
            const splitter = this.template.querySelector(
                '[data-element-id="div-splitter"]'
            );
            const splitterWidth = splitter.getBoundingClientRect().width;
            this.firstColumnIsOpen = true;
            const width =
                this.template.host.getBoundingClientRect().width -
                splitterWidth;
            this.firstColWidth = width;
            this.leftPanelContent.style.width = `${width}px`;
        }

        this.updateCellWidth();
        this.updateVisibleWidth();
    }

    handlePlaceholderMouseDown(mouseEvent) {
        const isVisible = mouseEvent.currentTarget.dataset.columnIndex === '0';
        if (!isVisible) {
            return;
        }
        this._showPlaceholderOccurrence = true;
        this.handleHiddenEventMouseDown(mouseEvent);
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

    handleShowMorePopoverClose() {
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
        this.showMorePopover = null;
        this.dispatchHidePopovers();
        this._centerDraggedEvent = true;

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
            if (
                !this._showMorePopoverIsFocused &&
                this._mouseInShowMorePopover &&
                !this._showMorePopoverContextMenuIsOpened
            ) {
                this.focusPopoverClose();
            } else if (
                !this._showMorePopoverIsFocused &&
                !this._mouseInShowMorePopover &&
                !this._showMorePopoverContextMenuIsOpened
            ) {
                this.showMorePopover = null;
            }
        });
    }

    handleShowMorePopoverMouseEnter() {
        this._mouseInShowMorePopover = true;
    }

    handleShowMorePopoverMouseLeave() {
        this._mouseInShowMorePopover = false;
    }

    /**
     * Handle the mousedown event fired by the splitter bar. Prepare for a column resize.
     */
    handleSplitterMouseDown(mouseEvent) {
        if (
            this.resizeColumnDisabled ||
            mouseEvent.button !== 0 ||
            mouseEvent.target.tagName === 'LIGHTNING-BUTTON-ICON'
        ) {
            return;
        }

        this._mouseIsDown = true;
        this._draggedSplitter = true;
        this._initialState = {
            mouseX: mouseEvent.clientX,
            firstColWidth: this.leftPanelContent.offsetWidth
        };
        this.firstColumnIsHidden = false;
        this.firstColumnIsOpen = false;
        this.dispatchHidePopovers();
    }

    handleVerticalHeaderChange(event) {
        const { start, cells, unit, span } = event.detail.smallestHeader;

        // Update the start date in case it was not available
        this.start = start;

        this.eventHeaderCells.yAxis = cells;
        const end = addToDate(start, unit, span) - 1;
        this.hourCellDuration =
            dateTimeObjectFrom(end).diff(start).milliseconds;
        this._initialFirstColWidth = 0;
    }

    stopPropagation(event) {
        event.stopPropagation();
    }
}
