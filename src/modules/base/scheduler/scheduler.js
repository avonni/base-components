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
import {
    normalizeArray,
    normalizeString,
    animationFrame,
    timeout
} from 'c/utilsPrivate';
import { classSet } from 'c/utils';
import {
    Direction,
    startPositioning,
    stopPositioning
} from 'c/positionLibrary';
import {
    dateTimeObjectFrom,
    addToDate,
    numberOfUnitsBetweenDates
} from './dateUtils';
import {
    EVENTS_DATES_FORMAT,
    EVENTS_THEMES,
    EVENTS_PALETTES,
    THEMES,
    DEFAULT_AVAILABLE_DAYS_OF_THE_WEEK,
    DEFAULT_AVAILABLE_MONTHS,
    DEFAULT_AVAILABLE_TIME_FRAMES,
    DEFAULT_EDIT_DIALOG_LABELS,
    DEFAULT_CONTEXT_MENU_ACTIONS,
    DEFAULT_START_DATE,
    DEFAULT_VISIBLE_SPAN,
    PALETTES,
    UNITS
} from './defaults';
import Header from './header';
import Row from './row';
import Event from './event';

export default class Scheduler extends LightningElement {
    _editDialogLabels = DEFAULT_EDIT_DIALOG_LABELS;
    _availableDaysOfTheWeek = DEFAULT_AVAILABLE_DAYS_OF_THE_WEEK;
    _availableMonths = DEFAULT_AVAILABLE_MONTHS;
    _availableTimeFrames = DEFAULT_AVAILABLE_TIME_FRAMES;
    _columns = [];
    _contextMenuActions = DEFAULT_CONTEXT_MENU_ACTIONS;
    _customEventsPalette = [];
    _disabledDatesTimes = [];
    _eventsPalette = EVENTS_PALETTES.default;
    _eventsTheme = EVENTS_THEMES.default;
    _headers = [];
    _rows = [];
    _rowsKeyField;
    _start = dateTimeObjectFrom(DEFAULT_START_DATE);
    _theme = THEMES.default;
    _visibleSpan = DEFAULT_VISIBLE_SPAN;

    _datatableRowsHeight;
    _draggedEvent;
    _initialState;
    _referenceHeader;
    _resizedEvent;
    computedHeaders = [];
    computedRows = [];
    computedEvents = [];
    selectedEvent;
    showContextMenu = false;
    showEditDialog = false;
    showDetailPopover = false;

    connectedCallback() {
        this.initSchedule();

        // Close the popovers on scroll
        window.addEventListener('scroll', this.hideAllPopovers);
    }

    renderedCallback() {
        // On the first render, save the datatable rows height
        if (!this._datatableRowsHeight) {
            this.updateDatatableRowsHeight();
        }

        this.updateHeadersStyle();
        this.updateBodyStyle();
        this.stopPositioning();

        // Position the detail popover
        if (this.showDetailPopover) {
            const popover = this.template.querySelector(
                '.scheduler__event-detail-popover'
            );
            const event = this.template.querySelector(
                `.scheduler__event-wrapper[data-key="${this.selectedEvent.key}"]`
            );
            this.startPositioning(event, popover);
        }

        // Position the context menu
        if (this.showContextMenu) {
            const contextMenu = this.template.querySelector(
                'c-primitive-dropdown-menu'
            );
            const event = this.template.querySelector(
                `.scheduler__event-wrapper[data-key="${this.selectedEvent.key}"]`
            );
            this.startPositioning(event, contextMenu);
        }

        // If the render happened in the middle of a resizing
        const side = this._resizeSide;
        if (this._draggedEvent && side) {
            // Update the dragged event with the new HTML element
            const key = this._draggedEvent.dataset.key;
            const event = this.template.querySelector(
                `.scheduler__event-wrapper[data-key="${key}"]`
            );
            event.classList.add('scheduler__event-dragged');
            this._draggedEvent = event;

            // Update the initial dragging state
            const state = this._initialState;
            const initialX = state.initialX;
            const position = event.getBoundingClientRect();
            state.eventWidth = position.width;
            state.eventLeft = position.left;
            state.eventRight = position.right;

            // Adjust the dragged event style to follow the cursor
            const sideX = side === 'left' ? state.eventLeft : state.eventRight;
            const x = initialX - sideX;
            this.updateDraggedEventStyleAfterResize(x);

            // Update the initialX position to remove the x offset
            state.initialX = state.initialX - x;
        }
    }

    disconnectedCallback() {
        window.removeEventListener('scroll', this.hideAllPopovers);
    }

    @api
    get editDialogLabels() {
        return this._editDialogLabels;
    }
    set editDialogLabels(value) {
        const labels = {};
        labels.title = value.title || DEFAULT_EDIT_DIALOG_LABELS.title;
        labels.from = value.from || DEFAULT_EDIT_DIALOG_LABELS.from;
        labels.to = value.to || DEFAULT_EDIT_DIALOG_LABELS.to;
        labels.resources =
            value.resources || DEFAULT_EDIT_DIALOG_LABELS.resources;
        labels.saveButton =
            value.saveButton || DEFAULT_EDIT_DIALOG_LABELS.saveButton;
        labels.cancelButton =
            value.cancelButton || DEFAULT_EDIT_DIALOG_LABELS.cancelButton;

        this._editDialogLabels = labels;
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
    get contextMenuActions() {
        return this._contextMenuActions;
    }
    set contextMenuActions(value) {
        this._contextMenuActions = normalizeArray(value);
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

        if (this.isConnected) {
            this.initEvents();
            this.initRows();
        }
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
        this._rowsKeyField = value.toString();

        if (this.isConnected) this.initRows();
    }

    @api
    get start() {
        return this._start;
    }
    set start(value) {
        const computedDate = dateTimeObjectFrom(value);
        this._start = computedDate || dateTimeObjectFrom(DEFAULT_START_DATE);

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

    get allResourcesKeyFields() {
        return this.rows.map((row) => {
            return {
                label: row[this.rowsKeyField],
                value: row[this.rowsKeyField]
            };
        });
    }

    get cellWidth() {
        if (!this.smallestHeader || !this.smallestHeader.columns.length)
            return 0;
        return 100 / this.smallestHeader.columns.length;
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

    get eventDateFormat() {
        return EVENTS_DATES_FORMAT;
    }

    get smallestHeader() {
        if (!this.computedHeaders.length) return null;

        const lastIndex = this.computedHeaders.length - 1;
        return this.computedHeaders[lastIndex];
    }

    get detailPopover() {
        return this.template.querySelector('.scheduler__event-detail-popover');
    }

    get tableClass() {
        const onlyOneHeader = this.computedHeaders.length === 1;
        const onlyOneVisibleHeader =
            this.computedHeaders.length === 2 &&
            this.computedHeaders.find((header) => header.isHidden);

        return classSet('slds-table scheduler__schedule-table')
            .add({
                'slds-border_top': onlyOneHeader || onlyOneVisibleHeader
            })
            .toString();
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
        if (!this.computedHeaders.length) return;

        const computedEvents = [];
        const start = this._referenceHeader.start;

        // The disabled dates/times are special events
        const disabledEvents = this.disabledDatesTimes.map((evt) => {
            const event = { ...evt };
            event.disabled = true;
            return event;
        });
        const events = this.events.concat(disabledEvents);

        events.forEach((evt) => {
            const event = { ...evt };
            event.schedulerEnd = this.end;
            event.schedulerStart = start;
            event.availableMonths = this.availableMonths;
            event.availableDaysOfTheWeek = this.availableDaysOfTheWeek;
            event.availableTimeFrames = this.availableTimeFrames;
            event.smallestHeader = this.smallestHeader;
            event.theme = event.disabled
                ? 'disabled'
                : event.theme || this.eventsTheme;

            const computedEvent = new Event(event);

            if (computedEvent.dates.length) {
                this.updateEventWidth(computedEvent);
                computedEvents.push(computedEvent);
            }
        });

        this.computedEvents = computedEvents;
    }

    initRows() {
        let colorIndex = 0;
        this.computedRows = this.rows.map((row) => {
            const rowKey = row[this.rowsKeyField];
            const events = [];
            this.computedEvents.forEach((event) => {
                const isInRow = event.keyFields.includes(rowKey);
                if (isInRow) events.push(event);
            });

            if (!this.palette[colorIndex]) {
                colorIndex = 0;
            }

            const computedRow = new Row({
                key: rowKey,
                color: this.palette[colorIndex],
                events: events
            });

            colorIndex += 1;
            return computedRow;
        });

        this.updateRowColumns();
    }

    updateBodyStyle() {
        // Set the rows height
        const datatable = this.template.querySelector('c-datatable');
        const rows = this.template.querySelectorAll('tbody tr');
        rows.forEach((row, index) => {
            const key = row.dataset.key;
            const dataRowHeight = this._datatableRowsHeight.find(
                (dataRow) => dataRow.rowKey === key
            ).height;
            const rowHeight = row.offsetHeight;
            row.style.minHeight = `${dataRowHeight}px`;
            if (index === 0) {
                datatable.setRowHeight(key, rowHeight - 1);
            } else {
                datatable.setRowHeight(key, rowHeight);
            }
        });

        // Give the body cells their width
        const cells = this.template.querySelectorAll('tbody td');
        cells.forEach((cell) => {
            cell.style.width = `${this.cellWidth}%`;
        });
    }

    updateDatatableRowsHeight() {
        this._datatableRowsHeight = [];
        const datatable = this.template.querySelector('c-datatable');

        this.rows.forEach((row) => {
            const rowKey = row[this.rowsKeyField];
            const height = datatable.getRowHeight(rowKey);
            this._datatableRowsHeight.push({ rowKey, height });
        });
    }

    updateDraggedEventStyleAfterResize(x) {
        const side = this._resizeSide;
        const eventWidth = this._initialState.eventWidth;
        const event = this._draggedEvent;
        const multiplier = side === 'left' ? -1 : 1;

        const width = eventWidth + x * multiplier;
        event.style.width = `${width}px`;

        if (side === 'left') {
            event.style.transform = `translateX(${x}px)`;
        }
    }

    updateEventWidth(event) {
        const header = this.smallestHeader;
        const columnEnd = addToDate(header.start, header.unit, header.span) - 1;
        const duration = DateTime.fromMillis(columnEnd).diff(header.start)
            .milliseconds;

        event.updateWidth({
            columns: header.columns,
            columnDuration: duration
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
            row.initColumns(this.smallestHeader.columns);
        });
    }

    getCellFromPosition(row, x) {
        const cells = Array.from(row.querySelectorAll('td'));

        return cells.find((td, index) => {
            const left = td.getBoundingClientRect().left;
            const right = td.getBoundingClientRect().right;

            // Handle the cases where the events are on the side
            // and the mouse moved out of the schedule
            if (index === 0 && left >= x) return td;
            if (index === cells.length - 1 && x > right) return td;

            if (x >= left && x < right) return td;
            return undefined;
        });
    }

    getEventFromName(name) {
        return this.computedEvents.find((event) => event.name === name);
    }

    getRowFromKey(key) {
        return this.computedRows.find((row) => row.key === key);
    }

    getRowFromPosition(y) {
        const rows = Array.from(this.template.querySelectorAll('tbody tr'));
        return rows.find((tr) => {
            const top = tr.getBoundingClientRect().top;
            const bottom = tr.getBoundingClientRect().bottom;

            if (y >= top && y <= bottom) return tr;
            return undefined;
        });
    }

    startPositioning(target, element) {
        this._positioning = true;

        const align = {
            horizontal: Direction.Left,
            vertical: Direction.Top
        };

        const targetAlign = {
            horizontal: Direction.Left,
            vertical: Direction.Bottom
        };

        let autoFlip = true;
        let autoFlipVertical;

        return animationFrame()
            .then(() => {
                this.stopPositioning();
                this._autoPosition = startPositioning(
                    this,
                    {
                        target: () => target,
                        element: () => element,
                        align,
                        targetAlign,
                        autoFlip,
                        autoFlipVertical,
                        scrollableParentBound: true,
                        keepInViewport: true
                    },
                    true
                );
                // Edge case: W-7460656
                if (this._autoPosition) {
                    return this._autoPosition.reposition();
                }
                return Promise.reject();
            })
            .then(() => {
                return timeout(0);
            })
            .then(() => {
                // Use a flag to prevent this async function from executing multiple times in a single lifecycle
                this._positioning = false;
            });
    }

    stopPositioning() {
        if (this._autoPosition) {
            stopPositioning(this._autoPosition);
            this._autoPosition = null;
        }
        this._positioning = false;
    }

    selectEvent(event) {
        const eventWrapper = event.currentTarget;
        const from = new Date(Number(eventWrapper.dataset.from));
        const to = new Date(Number(eventWrapper.dataset.to));
        const keyFields = eventWrapper.dataset.keyFields.split(',');

        this.selectedEvent = {
            key: eventWrapper.dataset.key,
            keyFields: keyFields,
            name: eventWrapper.dataset.name,
            title: eventWrapper.dataset.title,
            from: from.toISOString(),
            to: to.toISOString(),
            draftValues: {},
            crossingEvents: []
        };
    }

    resizeEventTo(cell) {
        const side = this._resizeSide;
        const name = this._draggedEvent.dataset.name;
        const event = this.getEventFromName(name);
        const draftValues = this.selectedEvent.draftValues;

        if (side === 'right') {
            // Update the end date if the event was resized from the right
            event.to = dateTimeObjectFrom(Number(cell.dataset.end));
            draftValues.to = event.to.toUTC().toISO();
        } else if (side === 'left') {
            // Update the start date if the event was resized from the left
            event.from = Number(cell.dataset.start);
            draftValues.from = event.from.toUTC().toISO();
        }

        this.updateEventWidth(event);
        this.initRows();
    }

    dragEventTo(row, cell) {
        const name = this._draggedEvent.dataset.name;
        const event = this.getEventFromName(name);
        const draftValues = this.selectedEvent.draftValues;

        // Update the start and end date
        const duration = event.to - event.from;
        const start = dateTimeObjectFrom(Number(cell.dataset.start));
        event.from = start;
        event.to = addToDate(start, 'millisecond', duration);

        draftValues.from = event.from.toUTC().toISO();
        draftValues.to = event.to.toUTC().toISO();

        // Update the rows
        const rowKey = row.dataset.key;
        const previousRowKey = this._draggedEvent.dataset.rowKey;

        if (previousRowKey !== rowKey) {
            // Remove the old row key from the event
            const keyFieldIndex = event.keyFields.findIndex(
                (key) => key === previousRowKey
            );
            event.keyFields.splice(keyFieldIndex, 1);

            // If it's not already present, add the new row key to the event
            if (event.keyFields.indexOf(rowKey) < 0) {
                event.keyFields.push(rowKey);
            }

            draftValues.keyFields = event.keyFields;
        }

        this.updateEventWidth(event);
        this.initRows();
    }

    deleteSelectedEvent() {
        // Delete the event
        const index = this.computedEvents.findIndex((evt) => {
            return evt.name === this.selectedEvent.name;
        });
        this.computedEvents.splice(index, 1);
        this.initRows();

        // Dispatch the deletion
        this.dispatchEvent(
            new CustomEvent('eventdelete', {
                detail: {
                    name: this.selectedEvent.name
                },
                bubbles: true
            })
        );

        this.selectedEvent = undefined;
        this.hideAllPopovers();
    }

    normalizeMousePosition(mouseX, mouseY) {
        const { top, bottom, left, right } = this._initialState;

        let x = mouseX;
        let y = mouseY;

        if (y < top) {
            y = top;
        } else if (y > bottom) {
            y = bottom;
        }

        if (x < left) {
            x = left;
        } else if (x > right) {
            x = right;
        }

        return { x, y };
    }

    hideAllPopovers = () => {
        this.hideDetailPopover();
        this.hideContextMenu();
        this.hideEditDialog();
    };

    hideContextMenu() {
        this.showContextMenu = false;
    }

    hideDetailPopover() {
        this.showDetailPopover = false;
    }

    hideEditDialog() {
        this.showEditDialog = false;
        // Remove the changes from the selected event
        if (this.selectedEvent) this.selectedEvent.draftValues = {};
    }

    handleEventMouseEnter(mouseEvent) {
        if (this._draggedEvent || this.showContextMenu) return;

        this.selectEvent(mouseEvent);
        this.showDetailPopover = true;
    }

    handleEventMouseDown(mouseEvent) {
        if (mouseEvent.button !== 0) return;

        this._resizeSide = mouseEvent.target.dataset.resize;
        this._draggedEvent = mouseEvent.currentTarget;
        this._draggedEvent.classList.add('scheduler__event-dragged');
        this.hideAllPopovers();

        // Save the initial position values
        const scheduleElement = this.template.querySelector('tbody');
        const schedulePosition = scheduleElement.getBoundingClientRect();
        const eventPosition = this._draggedEvent.getBoundingClientRect();

        const leftBoundary =
            this._resizeSide === 'right'
                ? eventPosition.left + 24
                : schedulePosition.left +
                  (mouseEvent.clientX - eventPosition.left);
        const rightBoundary =
            this._resizeSide === 'left'
                ? eventPosition.right - 24
                : schedulePosition.right +
                  (mouseEvent.clientX - eventPosition.right);

        this._initialState = {
            initialX: mouseEvent.clientX,
            initialY: mouseEvent.clientY,
            eventLeft: eventPosition.left,
            eventRight: eventPosition.right,
            eventWidth: eventPosition.width,
            left: leftBoundary,
            right: rightBoundary,
            top:
                schedulePosition.top + (mouseEvent.clientY - eventPosition.top),
            bottom:
                schedulePosition.bottom +
                (mouseEvent.clientY - eventPosition.bottom),
            row: this.getRowFromPosition(mouseEvent.clientY)
        };
    }

    handleMouseMove(mouseEvent) {
        // Prevent scrolling
        mouseEvent.preventDefault();

        if (this._draggedEvent) {
            const { initialX, initialY, row } = this._initialState;
            const side = this._resizeSide;

            // Prevent the events from being dragged out of the schedule grid,
            // or from being squished outside of their boundaries when resizing
            const position = this.normalizeMousePosition(
                mouseEvent.clientX,
                mouseEvent.clientY
            );

            const x = position.x - initialX;
            const y = position.y - initialY;

            // If it is a resizing
            if (side) {
                const selected = this.selectedEvent;

                // Get the events present in the cell crossed
                const hoveredCell = this.getCellFromPosition(row, position.x);
                const computedRow = this.getRowFromKey(row.dataset.key);
                const computedCell = computedRow.getColumnFromStart(
                    Number(hoveredCell.dataset.start)
                );
                const cellEvents = computedCell.crossingEvents.concat(
                    computedCell.events
                );

                // Check if all the events in the cell already share a cell with the dragged event
                const cellEventsAreKnown = cellEvents.every((cellEvent) => {
                    return selected.crossingEvents.find(
                        (evt) => evt.key === cellEvent.key
                    );
                });

                // If one of them don't, the dragged event may be passing over it.
                // We have to rerender the grid so the row height enlarges
                if (!cellEventsAreKnown) {
                    this.resizeEventTo(hoveredCell);

                    if (side === 'left') {
                        selected.from = selected.draftValues.from;
                    } else {
                        selected.to = selected.draftValues.to;
                    }
                    selected.crossingEvents = cellEvents.concat({
                        key: selected.key
                    });
                    this._initialState.initialX = mouseEvent.clientX;
                } else {
                    // If we are not passing above another event,
                    // change the styling of the dragged event to follow the cursor
                    this.updateDraggedEventStyleAfterResize(x);
                }
            } else {
                // If it is a drag and drop
                this._draggedEvent.style.transform = `translate(${x}px, ${y}px)`;
            }
        }
    }

    handleEventMouseUp(mouseEvent) {
        if (mouseEvent.button !== 0) return;

        if (this._draggedEvent) {
            // If the dragged event has moved
            if (this._draggedEvent.style.transform || this._resizeSide) {
                // Get the new event position
                const { initialX, eventLeft, eventRight } = this._initialState;
                const side = this._resizeSide;
                const position = this.normalizeMousePosition(
                    mouseEvent.clientX,
                    mouseEvent.clientY
                );
                const leftX = position.x - (initialX - eventLeft);
                const rightX = position.x + (eventRight - initialX);
                const x = side === 'right' ? rightX : leftX;
                const y = position.y;

                // Find the row and cell the event was dropped on
                const rowElement = this.getRowFromPosition(y);
                const cellElement = this.getCellFromPosition(rowElement, x);

                // Update the event
                if (side) {
                    this.resizeEventTo(cellElement);
                } else {
                    this.dragEventTo(rowElement, cellElement);
                }

                // Dispatch the change
                const name = this._draggedEvent.dataset.name;
                this.dispatchChangeEvent(name);
            }

            // Clean the dragged element
            this._draggedEvent.classList.remove('scheduler__event-dragged');
            this._draggedEvent = undefined;
            this._resizeSide = undefined;
        }
    }

    handleDatatableResize() {
        this.updateDatatableRowsHeight();
        this.updateBodyStyle();
    }

    handleEventContextMenu(event) {
        event.preventDefault();

        this.selectEvent(event);
        this.hideAllPopovers();
        this.showContextMenu = true;
    }

    handleActionSelect(event) {
        const name = event.detail.name;

        this.dispatchEvent(
            new CustomEvent('actionclick', {
                detail: {
                    name: name,
                    targetName: this.selectedEvent.name
                },
                bubbles: true
            })
        );

        if (name === 'edit') {
            this.showEditDialog = true;
        } else if (name === 'delete') {
            this.deleteSelectedEvent();
        }
    }

    handleEventDoubleClick(event) {
        this._draggedEvent = undefined;
        this.selectEvent(event);
        this.hideAllPopovers();
        this.showEditDialog = true;
    }

    handleEventTitleChange(event) {
        const title = event.currentTarget.value;
        this.selectedEvent.draftValues.title = title;
    }

    handleEventDateChange(event) {
        const from = event.detail.startDate;
        const to = event.detail.endDate;

        this.selectedEvent.draftValues.from = from;
        this.selectedEvent.draftValues.to = to;
    }

    handleEventKeyFieldsChange(event) {
        const keyFields = event.detail.value;
        this.selectedEvent.draftValues.keyFields = keyFields;
    }

    handleSaveEditDialog() {
        const name = this.selectedEvent.name;
        const event = this.computedEvents.find((evt) => evt.name === name);

        // Change the event and update the rows
        const draftValues = this.selectedEvent.draftValues;
        Object.entries(draftValues).forEach((entry) => {
            const [key, value] = entry;

            if (value.length) {
                event[key] = value;
            }
        });

        this.updateEventWidth(event);
        this.initRows();

        // Dispatch the change and close the dialog
        this.dispatchChangeEvent(name);
        this.hideEditDialog();
    }

    dispatchChangeEvent(name) {
        this.dispatchEvent(
            new CustomEvent('eventchange', {
                detail: {
                    name: name,
                    draftValues: this.selectedEvent.draftValues
                },
                bubbles: true
            })
        );
    }
}
