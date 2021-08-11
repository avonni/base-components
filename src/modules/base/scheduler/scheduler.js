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
    normalizeBoolean,
    normalizeString
} from 'c/utilsPrivate';
import { classSet } from 'c/utils';
import {
    dateTimeObjectFrom,
    addToDate,
    numberOfUnitsBetweenDates
} from './dateUtils';
import { eventCrudMethods } from './eventCrud';
import {
    EDIT_MODES,
    EVENTS_DATES_FORMAT,
    EVENTS_THEMES,
    EVENTS_PALETTES,
    THEMES,
    DEFAULT_AVAILABLE_DAYS_OF_THE_WEEK,
    DEFAULT_AVAILABLE_MONTHS,
    DEFAULT_AVAILABLE_TIME_FRAMES,
    DEFAULT_EDIT_DIALOG_LABELS,
    DEFAULT_CONTEXT_MENU_EMPTY_SPOT_ACTIONS,
    DEFAULT_CONTEXT_MENU_EVENT_ACTIONS,
    DEFAULT_START_DATE,
    DEFAULT_VISIBLE_SPAN,
    PALETTES,
    UNITS
} from './defaults';
import SchedulerHeader from './header';
import SchedulerRow from './row';
import SchedulerEvent from './event';

export default class Scheduler extends LightningElement {
    _editDialogLabels = DEFAULT_EDIT_DIALOG_LABELS;
    _availableDaysOfTheWeek = DEFAULT_AVAILABLE_DAYS_OF_THE_WEEK;
    _availableMonths = DEFAULT_AVAILABLE_MONTHS;
    _availableTimeFrames = DEFAULT_AVAILABLE_TIME_FRAMES;
    _columns = [];
    _contextMenuEmptySpotActions = [];
    _contextMenuEventActions = [];
    _customEventsPalette = [];
    _disabledDatesTimes = [];
    _eventsPalette = EVENTS_PALETTES.default;
    _eventsTheme = EVENTS_THEMES.default;
    _headers = [];
    _readOnly = false;
    _recurrentEditModes = EDIT_MODES;
    _rows = [];
    _rowsKeyField;
    _start = dateTimeObjectFrom(DEFAULT_START_DATE);
    _theme = THEMES.default;
    _visibleSpan = DEFAULT_VISIBLE_SPAN;

    _datatableRowsHeight;
    _datatableWidth;
    _draggedEvent;
    _draggedSplitter = false;
    _initialState = {};
    _mouseIsDown = false;
    _referenceHeader;
    _resizedEvent;
    cellWidth = 0;
    computedHeaders = [];
    computedRows = [];
    computedEvents = [];
    contextMenuActions = [];
    datatableIsHidden = false;
    datatableIsOpen = false;
    selectedEvent;
    showContextMenu = false;
    showEditDialog = false;
    showDetailPopover = false;
    showRecurrenceDialog = false;

    connectedCallback() {
        this.initSchedule();
        this.crud = eventCrudMethods(this);

        // Close the popovers on scroll
        this.addEventListener('scroll', this.handleScroll);
    }

    renderedCallback() {
        // Save the cell width
        if (!this.cellWidth) {
            const th = this.template.querySelector('thead tr:last-of-type th');
            // We add one pixel for the right border
            this.cellWidth = Math.ceil(th.getBoundingClientRect().width) + 1;
            this.initHeaderWidths();
            // The cellWidth change will trigger another render, so we return right away
            return;
        }

        // Save the default datatable column width, in case the styling hook was used
        if (!this._datatableWidth) {
            this._datatableWidth = this.datatableCol.getBoundingClientRect().width;
        }

        // Save the datatable row height and update the header and body styles
        if (!this._datatableRowsHeight) {
            this.updateDatatableRowsHeight();
        }
        this.updateHeadersStyle();
        this.updateRowsStyle();

        // Update the position and height of occurrences
        if (this._updateOccurrences) {
            this.updateOccurrencesPosition();
            this._updateOccurrences = false;
        }

        // Position the detail popover
        if (this.showDetailPopover) {
            const popover = this.template.querySelector(
                '.scheduler__event-detail-popover'
            );
            this.positionPopover(popover);
        }

        // Position the context menu
        if (this.showContextMenu && this.contextMenuActions.length) {
            const contextMenu = this.template.querySelector(
                '.scheduler__context-menu'
            );
            this.positionPopover(contextMenu);
        }

        // If a new event was just created, set the dragged event
        if (this.selection && this.selection.newEvent && !this._draggedEvent) {
            this._draggedEvent = this.template.querySelector(
                `c-primitive-scheduler-event-occurrence[data-key="${this.selection.occurrence.key}"]`
            );
            if (this._draggedEvent) {
                this.initDraggedEventState();
            }
        }

        // If the edit dialog is opened, focus on the first input
        if (this.showEditDialog) {
            this.template.querySelector('c-dialog lightning-input').focus();
        }
    }

    disconnectedCallback() {
        this.removeEventListener('scroll', this.handleScroll);
    }

    @api
    get editDialogLabels() {
        return this._editDialogLabels;
    }
    set editDialogLabels(value) {
        if (value) {
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
            labels.newEventTitle =
                value.newEventTitle || DEFAULT_EDIT_DIALOG_LABELS.newEventTitle;

            this._editDialogLabels = labels;
        } else {
            this._editDialogLabels = DEFAULT_EDIT_DIALOG_LABELS;
        }
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
        this._columns = JSON.parse(JSON.stringify(normalizeArray(value)));
    }

    @api
    get contextMenuEmptySpotActions() {
        return this._contextMenuEmptySpotActions;
    }
    set contextMenuEmptySpotActions(value) {
        this._contextMenuEmptySpotActions = normalizeArray(value);
    }

    @api
    get contextMenuEventActions() {
        return this._contextMenuEventActions;
    }
    set contextMenuEventActions(value) {
        this._contextMenuEventActions = normalizeArray(value);
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
    get readOnly() {
        return this._readOnly;
    }
    set readOnly(value) {
        this._readOnly = normalizeBoolean(value);
    }

    @api
    get recurrentEditModes() {
        return this._recurrentEditModes;
    }
    set recurrentEditModes(value) {
        const modes = normalizeArray(value);
        this._recurrentEditModes = modes.filter((mode) => {
            return EDIT_MODES.includes(mode);
        });

        if (!this._recurrentEditModes.length) {
            this._recurrentEditModes = EDIT_MODES;
        }
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

    get datatable() {
        return this.template.querySelector('c-datatable');
    }

    get datatableCol() {
        return this.template.querySelector('.scheduler__datatable-col');
    }

    get datatableColClass() {
        return classSet('slds-border_right scheduler__datatable-col')
            .add({
                'scheduler__datatable-col_hidden': this.datatableIsHidden,
                'scheduler__datatable-col_open': this.datatableIsOpen
            })
            .toString();
    }

    get smallestColumnDuration() {
        const header = this.smallestHeader;
        const headerColumnEnd =
            addToDate(header.start, header.unit, header.span) - 1;
        return dateTimeObjectFrom(headerColumnEnd).diff(header.start)
            .milliseconds;
    }

    get computedContextMenuEmptySpot() {
        const actions = this.contextMenuEmptySpotActions;
        return this.readOnly
            ? actions
            : (actions.length && actions) ||
                  DEFAULT_CONTEXT_MENU_EMPTY_SPOT_ACTIONS;
    }

    get computedContextMenuEvent() {
        const actions = this.contextMenuEventActions;
        return this.readOnly
            ? actions
            : (actions.length && actions) || DEFAULT_CONTEXT_MENU_EVENT_ACTIONS;
    }

    get palette() {
        return this.customEventsPalette.length
            ? this.customEventsPalette
            : PALETTES[this.eventsPalette];
    }

    get editDialogTitle() {
        return (
            (this.selection && this.selection.event.title) ||
            this.editDialogLabels.newEventTitle
        );
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

    get onlyOccurrenceEditAllowed() {
        return (
            this.recurrentEditModes.length === 1 &&
            this.recurrentEditModes[0] === 'one'
        );
    }

    get showRecurrenceSaveOptions() {
        return (
            this.recurrentEditModes.length > 1 &&
            this.selection.event.recurrence
        );
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

    @api
    newEvent() {
        this.crud.newEvent();
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

        const reference = new SchedulerHeader({
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

                headerObject = new SchedulerHeader({
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

        // On next render, reset the headers widths
        this.cellWidth = undefined;
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

        // The disabled dates/times are special events
        const disabledEvents = this.disabledDatesTimes.map((evt) => {
            const event = { ...evt };
            event.disabled = true;
            return event;
        });
        const events = this.events.concat(disabledEvents);

        const computedEvents = [];
        events.forEach((evt) => {
            const event = { ...evt };
            this.updateEventDefaults(event);
            computedEvents.push(new SchedulerEvent(event));
        });

        this.computedEvents = computedEvents;
    }

    initEventOccurrences() {
        this.computedEvents.forEach((event) => {
            event.initOccurrences();
        });

        // We will want to update the occurrences position on the next render
        this._updateOccurrences = true;
    }

    initDraggedEventState() {
        // Save the initial position values
        const scheduleElement = this.template.querySelector('tbody');
        const schedulePosition = scheduleElement.getBoundingClientRect();
        const eventPosition = this._draggedEvent.getBoundingClientRect();
        const { mouseX, mouseY } = this._initialState;

        const leftBoundary =
            this._resizeSide === 'right'
                ? eventPosition.left + 24
                : schedulePosition.left + (mouseX - eventPosition.left);
        const rightBoundary =
            this._resizeSide === 'left'
                ? eventPosition.right - 24
                : schedulePosition.right + (mouseX - eventPosition.right);

        this._initialState = {
            mouseX,
            mouseY,
            initialX: this._draggedEvent.x,
            initialY: this._draggedEvent.y,
            eventLeft: eventPosition.left,
            eventRight: eventPosition.right,
            eventWidth: eventPosition.width,
            left: leftBoundary,
            right: rightBoundary,
            top: schedulePosition.top + (mouseY - eventPosition.top),
            bottom: schedulePosition.bottom + (mouseY - eventPosition.bottom),
            row: this.getRowFromPosition(mouseY)
        };
    }

    initRows() {
        let colorIndex = 0;
        this.computedRows = this.rows.map((row) => {
            const rowKey = row[this.rowsKeyField];

            // If there is no color left in the palette,
            // restart from the beginning
            if (!this.palette[colorIndex]) {
                colorIndex = 0;
            }

            const occurrences = this.crud.getOccurrencesFromRowKey(rowKey);

            const computedRow = new SchedulerRow({
                color: this.palette[colorIndex],
                key: rowKey,
                referenceColumns: this.smallestHeader.columns,
                events: occurrences
            });

            // If there's already been a render and we know the datatable rows height,
            // assign the min-height of the row
            if (this._datatableRowsHeight) {
                const dataRowHeight = this._datatableRowsHeight.find(
                    (dataRow) => dataRow.rowKey === rowKey
                ).height;
                computedRow.minHeight = dataRowHeight;
            }

            colorIndex += 1;
            return computedRow;
        });
    }

    updateRowsStyle() {
        // Set the rows height
        const rows = this.template.querySelectorAll('tbody tr');

        rows.forEach((row, index) => {
            const key = row.dataset.key;
            const computedRow = this.computedRows.find((cptRow) => {
                return cptRow.key === key;
            });
            const rowHeight = computedRow.height;
            row.style.height = `${rowHeight}px`;

            const dataRowHeight = this._datatableRowsHeight.find(
                (dataRow) => dataRow.rowKey === key
            ).height;
            row.style.minHeight = `${dataRowHeight}px`;

            if (index === 0) {
                this.datatable.setRowHeight(key, rowHeight - 1);
            } else {
                this.datatable.setRowHeight(key, rowHeight);
            }
        });
    }

    updateDatatableRowsHeight() {
        this._datatableRowsHeight = [];
        const datatable = this.template.querySelector('c-datatable');
        if (!datatable) return;

        this.computedRows.forEach((row) => {
            const rowKey = row.key;
            const height = datatable.getRowHeight(rowKey);
            this._datatableRowsHeight.push({ rowKey, height });
            row.minHeight = height;
        });
    }

    updateDraggedEventStyleAfterResize(x) {
        const side = this._resizeSide;
        const eventWidth = this._initialState.eventWidth;
        const event = this._draggedEvent;
        const multiplier = side === 'left' ? -1 : 1;
        const computedX = side === 'left' ? x + this._initialState.initialX : x;

        const width = eventWidth + x * multiplier;
        event.style.width = `${width}px`;

        if (side === 'left') {
            event.x = computedX;
        }
    }

    updateEventDefaults(event) {
        event.schedulerEnd = this.end;
        event.schedulerStart = this._referenceHeader.start;
        event.availableMonths = this.availableMonths;
        event.availableDaysOfTheWeek = this.availableDaysOfTheWeek;
        event.availableTimeFrames = this.availableTimeFrames;
        event.smallestHeader = this.smallestHeader;
        event.theme = event.disabled
            ? 'disabled'
            : event.theme || this.eventsTheme;
    }

    updateHeadersStyle() {
        // Set the datatable header height
        const thead = this.template.querySelector('thead');
        this.datatableCol.style.paddingTop = `${thead.offsetHeight - 34}px`;

        // Push the events block at the bottom of the headers
        const events = this.template.querySelector('.scheduler__events');
        events.style.top = `${thead.offsetHeight}px`;
        events.style.height = `calc(100% - ${thead.offsetHeight}px)`;

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
                cell.style.width = `${header.columnWidths[index]}px`;
            });
        });
    }

    updateOccurrencesPosition() {
        const eventOccurrences = this.template.querySelectorAll(
            'c-primitive-scheduler-event-occurrence'
        );
        eventOccurrences.forEach((occurrence) => {
            if (occurrence.disabled) {
                occurrence.updateHeight();
            }
            occurrence.updatePosition();
        });
    }

    updateRowsHeight() {
        this.computedRows.forEach((row) => {
            row.updateHeightAndPositions();
        });

        this.updateRowsStyle();
        this.updateOccurrencesPosition();
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

    cleanDraggedElement() {
        if (this._draggedEvent) {
            this._draggedEvent.classList.remove('scheduler__event-dragged');
            this._draggedEvent = undefined;
        }
        this._resizeSide = undefined;
    }

    cleanSelection() {
        // If a new event was being created, remove the unfinished event from the computedEvents
        const lastEvent = this.computedEvents[this.computedEvents.length - 1];
        if (
            this.selection &&
            this.selection.newEvent &&
            lastEvent === this.selection.event
        ) {
            this.computedEvents.pop();
            this._updateOccurrences = true;
            this.initRows();
        }
        this.selection = undefined;
    }

    positionPopover(popover) {
        // Make sure the popover is not outside of the screen
        const y = this.selection.y;
        const x = this.selection.x;
        const height = popover.offsetHeight;
        const width = popover.offsetWidth;
        const popoverBottom = y + height;
        const popoverRight = x + width;

        const bottomView = window.innerHeight;
        const rightView = window.innerWidth;

        const yTransform = popoverBottom > bottomView ? height * -1 : 0;
        const xTransform = popoverRight > rightView ? width * -1 : 0;

        popover.style.transform = `translate(${xTransform}px, ${yTransform}px)`;
        popover.style.top = `${y}px`;
        popover.style.left = `${x}px`;
    }

    selectEvent(mouseEvent) {
        const { eventName, from } = mouseEvent.detail;

        const computedEvent = this.computedEvents.find(
            (evt) => evt.name === eventName
        );
        const occurrences = computedEvent.occurrences.filter(
            (occ) => occ.from.ts === from.ts
        );
        const key = mouseEvent.target.dataset.key;
        const occurrence = occurrences.find((occ) => occ.key === key);

        this.selection = {
            event: computedEvent,
            occurrences,
            occurrence,
            x: mouseEvent.detail.x,
            y: mouseEvent.detail.y,
            draftValues: {}
        };
    }

    resizeEventToX(x) {
        const occurrence = this.selection.occurrence;
        const { row, mouseX } = this._initialState;
        const computedX = x - mouseX;

        // If a new event is created through click and drag,
        // Set the direction the user is going to
        if (this.selection.newEvent) {
            this._resizeSide = computedX >= 0 ? 'right' : 'left';
        }

        // Get the events present in the cell crossed
        const hoveredCell = this.getCellFromPosition(row, x);
        const computedRow = this.getRowFromKey(row.dataset.key);
        const computedCell = computedRow.getColumnFromStart(
            Number(hoveredCell.dataset.start)
        );
        const cellEvents = computedCell.events;

        // Check if any event in the cell has the same offsetTop
        const eventIsHovered = cellEvents.some((cellEvent) => {
            return (
                cellEvent.offsetTop === occurrence.offsetTop &&
                cellEvent.key !== occurrence.key
            );
        });

        // If one of them do, the dragged event is passing over it
        // We have to rerender the grid so the row height enlarges
        if (eventIsHovered) {
            this.resizeEventToCell(hoveredCell);
        } else {
            // If we are not passing above another event,
            // change the styling of the dragged event to follow the cursor
            this.updateDraggedEventStyleAfterResize(computedX);
        }
    }

    resizeEventToCell(cell) {
        const side = this._resizeSide;
        const occurrence = this.selection.occurrence;

        // Remove the occurrence from the row
        const rowKey = occurrence.rowKey;
        const row = this.getRowFromKey(rowKey);
        row.removeEvent(occurrence);

        if (side === 'right') {
            // Update the end date if the event was resized from the right
            occurrence.to = dateTimeObjectFrom(Number(cell.dataset.end));
        } else if (side === 'left') {
            // Update the start date if the event was resized from the left
            occurrence.from = dateTimeObjectFrom(Number(cell.dataset.start));
        }

        // Add the occurrence to the row with the updated start/end date
        row.events.push(occurrence);
        row.addEventToColumns(occurrence);
        row.resetEventsOffsetTop();
        this.updateRowsHeight();
    }

    dragEventTo(row, cell) {
        const { occurrence, draftValues } = this.selection;

        // Update the start and end date
        const duration = occurrence.to - occurrence.from;
        const start = dateTimeObjectFrom(Number(cell.dataset.start));
        draftValues.from = start.toUTC().toISO();
        draftValues.to = addToDate(start, 'millisecond', duration)
            .toUTC()
            .toISO();

        // Update the rows
        const rowKey = row.dataset.key;
        const previousRowKey = occurrence.rowKey;

        if (previousRowKey !== rowKey) {
            const keyFieldIndex = occurrence.keyFields.findIndex(
                (key) => key === previousRowKey
            );
            draftValues.keyFields = [...occurrence.keyFields];
            draftValues.keyFields.splice(keyFieldIndex, 1);

            if (!draftValues.keyFields.includes(rowKey)) {
                draftValues.keyFields.push(rowKey);
            }
        }
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

    hideAllPopovers() {
        this.hideDetailPopover();
        this.hideContextMenu();
        this.hideEditDialog();
    }

    hideContextMenu() {
        this.contextMenuActions = [];
        this.showContextMenu = false;
    }

    hideDetailPopover() {
        this.showDetailPopover = false;
    }

    hideEditDialog() {
        this.showEditDialog = false;
    }

    hideRecurrenceDialog() {
        this.showRecurrenceDialog = false;
    }

    handleMouseDown(mouseEvent) {
        if (mouseEvent.button !== 0 || this.readOnly) return;
        this._mouseIsDown = true;

        this._initialState.mouseX = mouseEvent.clientX;
        this._initialState.mouseY = mouseEvent.clientY;
        this.hideAllPopovers();

        const target = mouseEvent.target;
        if (
            target.tagName !== 'C-PRIMITIVE-SCHEDULER-EVENT-OCCURRENCE' ||
            target.disabled
        ) {
            this.cleanDraggedElement();
            this.crud.newEvent(mouseEvent.clientX, mouseEvent.clientY, false);
        } else {
            this.initDraggedEventState();
        }
    }

    handleEventMouseEnter(event) {
        if (this._mouseIsDown || this.showContextMenu) return;

        this.selectEvent(event);
        this.showDetailPopover = true;
        this._draggedEvent = event.currentTarget;
    }

    handleEventMouseDown(mouseEvent) {
        this._resizeSide = mouseEvent.detail.side;
        this._draggedEvent = mouseEvent.currentTarget;
        this._draggedEvent.classList.add('scheduler__event-dragged');
        this.selectEvent(mouseEvent);
    }

    handleMouseMove(mouseEvent) {
        if (!this._mouseIsDown) return;

        // Prevent scrolling
        mouseEvent.preventDefault();

        // The splitter between the datatable and the schedule is being dragged
        if (this._draggedSplitter) {
            const { mouseX, datatableWidth } = this._initialState;
            const x = mouseEvent.clientX;
            const width = datatableWidth + (x - mouseX);

            this.datatable.style.width = `${width}px`;
            this.datatableCol.style.width = `${width}px`;

            // An event is being dragged
        } else if (this._draggedEvent) {
            const { mouseX, mouseY, initialX, initialY } = this._initialState;

            this.selection.isMoving = true;

            // Prevent the event from being dragged out of the schedule grid,
            // or from being squished outside of its boundaries when resizing
            const position = this.normalizeMousePosition(
                mouseEvent.clientX,
                mouseEvent.clientY
            );

            if (this._resizeSide || this.selection.newEvent) {
                // Resizing
                this.resizeEventToX(position.x);
            } else {
                // Drag and drop
                const x = position.x - mouseX;
                const y = position.y - mouseY;
                this._draggedEvent.x = x + initialX;
                this._draggedEvent.y = y + initialY;
            }

            // The user started the creation of a new event, through click and drag.
            // On the first move, display the new event on the schedule.
        } else if (this.selection && this.selection.newEvent) {
            this.computedEvents.push(this.selection.event);
            this._updateOccurrences = true;
            this.initRows();
        }
    }

    handleMouseUp(mouseEvent) {
        this._mouseIsDown = false;
        if (mouseEvent.button !== 0) return;

        if (this._draggedSplitter) {
            this._draggedSplitter = false;
        } else if (this.selection && this.selection.isMoving) {
            // Get the new position
            const { mouseX, eventLeft, eventRight } = this._initialState;
            const { draftValues, newEvent, event } = this.selection;
            const side = this._resizeSide;
            const position = this.normalizeMousePosition(
                mouseEvent.clientX,
                mouseEvent.clientY
            );
            const leftX = position.x - (mouseX - eventLeft);
            const rightX = position.x + (eventRight - mouseX);
            const x = side === 'right' ? rightX : leftX;
            const y = position.y;

            // Find the row and cell the event was dropped on
            const rowElement = this.getRowFromPosition(y);
            const cellElement = this.getCellFromPosition(rowElement, x);

            // Update the draft values
            const to = dateTimeObjectFrom(Number(cellElement.dataset.end));
            const from = dateTimeObjectFrom(Number(cellElement.dataset.start));
            switch (side) {
                case 'right':
                    draftValues.to = to.toUTC().toISO();
                    break;
                case 'left':
                    draftValues.from = from.toUTC().toISO();
                    break;
                default:
                    this.dragEventTo(rowElement, cellElement);
                    break;
            }

            if (newEvent) {
                this.showEditDialog = true;
                this.selection.isMoving = false;
            } else {
                if (this.showRecurrenceSaveOptions) {
                    this.showRecurrenceDialog = true;
                    return;
                } else if (event.recurrence && this.onlyOccurrenceEditAllowed) {
                    this.crud.saveOccurrence();
                } else {
                    this.crud.saveEvent();
                }
                this.initRows();
                this._updateOccurrences = true;
                this.cleanSelection();
            }
        } else if (this.selection) {
            this.cleanSelection();
        }
        this.cleanDraggedElement();
    }

    handleDatatableResize(event) {
        if (event.detail.isUserTriggered) {
            this.datatable.style.width = null;
            this._datatableRowsHeight = undefined;
            this.initRows();
        } else {
            this.updateDatatableRowsHeight();
            this.updateRowsStyle();
        }
    }

    handleEventContextMenu(mouseEvent) {
        if (mouseEvent.currentTarget.disabled) return;

        if (this.computedContextMenuEvent.length) {
            this.hideAllPopovers();
            this.contextMenuActions = this.computedContextMenuEvent;
            this.selectEvent(mouseEvent);
            this.showContextMenu = true;
        }
    }

    handleEmptySpotContextMenu(mouseEvent) {
        const target = mouseEvent.target;
        if (
            target.tagName === 'C-PRIMITIVE-SCHEDULER-EVENT-OCCURRENCE' &&
            !target.disabled
        )
            return;
        mouseEvent.preventDefault();

        if (this.computedContextMenuEmptySpot.length) {
            this.hideAllPopovers();
            this.contextMenuActions = this.computedContextMenuEmptySpot;
            this.showContextMenu = true;
            this.crud.newEvent(mouseEvent.clientX, mouseEvent.clientY, false);
        }
    }

    handleActionSelect(event) {
        const name = event.detail.name;

        this.dispatchEvent(
            new CustomEvent('actionclick', {
                detail: {
                    name: name,
                    targetName: this.selection.event
                        ? this.selection.event.name
                        : undefined
                },
                bubbles: true
            })
        );

        switch (name) {
            case 'edit':
                this.showEditDialog = true;
                break;
            case 'delete':
                this.crud.deleteEvent();
                break;
            case 'add-event':
                this.showEditDialog = true;
                this.computedEvents.push(this.selection.event);
                break;
            default:
                this.cleanSelection();
                this.cleanDraggedElement();
                break;
        }
    }

    handleDoubleClick(mouseEvent) {
        if (
            (mouseEvent.target.tagName ===
                'C-PRIMITIVE-SCHEDULER-EVENT-OCCURRENCE' &&
                !mouseEvent.target.disabled) ||
            this.readOnly
        ) {
            return;
        }

        this.crud.Event(mouseEvent.clientX, mouseEvent.clientY, true);
    }

    handleEventDoubleClick(event) {
        this._draggedEvent = undefined;
        this.selectEvent(event);
        this.hideAllPopovers();
        this.showEditDialog = true;
    }

    handleEventTitleChange(event) {
        const title = event.currentTarget.value;
        this.selection.draftValues.title = title;
    }

    handleEventDateChange(event) {
        const from = event.detail.startDate;
        const to = event.detail.endDate;

        this.selection.draftValues.from = from;
        this.selection.draftValues.to = to;
    }

    handleEventKeyFieldsChange(event) {
        const keyFields = event.detail.value;
        this.selection.draftValues.keyFields = keyFields;
    }

    handleCloseEditDialog() {
        this.cleanDraggedElement();
        this.cleanSelection();
        this.hideEditDialog();
    }

    handleCloseRecurrenceDialog() {
        if (this._resizeSide) {
            const row = this._initialState.row;
            let x;
            if (this._resizeSide === 'left') {
                x = this._initialState.eventLeft;
            } else {
                x = this._initialState.eventRight;
            }
            const initialCell = this.getCellFromPosition(row, x);
            this.resizeEventToCell(initialCell);
        }
        this.cleanDraggedElement();
        this.cleanSelection();
        this.hideRecurrenceDialog();
        this.initRows();
        this._updateOccurrences = true;
    }

    handleSaveEvent(mouseEvent) {
        const { event, occurrence } = this.selection;
        const recurrentChange =
            mouseEvent.detail.value || mouseEvent.currentTarget.value;

        if (
            recurrentChange === 'one' ||
            (event.recurrence && this.onlyOccurrenceEditAllowed)
        ) {
            this.crud.saveOccurrence();
        } else {
            // Update the event with the selected occurrence values,
            // in case the selected occurrence had already been edited
            if (occurrence.from !== event.from) event._from = occurrence.from;
            if (occurrence.to !== event.to) event._to = occurrence.to;
            if (occurrence.title !== event.title)
                event.title = occurrence.title;
            if (occurrence.keyFields !== event.keyFields)
                event.keyFields = occurrence.keyFields;

            // Update the event with the draft values from the edit form
            this.crud.saveEvent();
        }

        this.initRows();
        this._updateOccurrences = true;
        this.cleanDraggedElement();
        this.cleanSelection();

        if (this.showRecurrenceDialog) {
            this.hideRecurrenceDialog();
        } else {
            this.hideEditDialog();
        }
    }

    handleEditSaveKeyDown(event) {
        if (event.key === 'Tab') {
            this.template.querySelector('lightning-input').focus();
        }
    }

    handleScroll = () => {
        if (this.showDetailPopover) {
            // Hide the detail popover only if it goes off screen
            const right = this._draggedEvent.getBoundingClientRect().right;
            if (right < 0) this.hideDetailPopover();
        } else {
            this.hideDetailPopover();
            this.hideContextMenu();
        }
    };

    handleSplitterMouseDown(mouseEvent) {
        if (
            mouseEvent.button !== 0 ||
            mouseEvent.target.tagName === 'LIGHTNING-BUTTON-ICON'
        )
            return;

        this.clearDatatableColumnWidth();
        this._mouseIsDown = true;
        this._draggedSplitter = true;
        this._initialState = {
            mouseX: mouseEvent.clientX,
            datatableWidth: this.datatable.offsetWidth
        };
        this.datatableIsHidden = false;
        this.datatableIsOpen = false;
    }

    handleHideDatatable() {
        this.datatableCol.style.width = null;
        this.datatable.style.width = null;

        if (this.datatableIsOpen) {
            this.datatableIsOpen = false;
        } else {
            this.datatableIsHidden = true;
        }
    }

    clearDatatableColumnWidth() {
        const lastColumn = this.columns[this.columns.length - 1];
        if (lastColumn.initialWidth) {
            lastColumn.initialWidth = undefined;
            this._columns = [...this.columns];
        }
    }

    handleOpenDatatable() {
        this.datatableCol.style.width = null;
        this.datatable.style.width = null;

        if (this.datatableIsHidden) {
            this.datatableIsHidden = false;
            this.datatable.style.width = `${this._datatableWidth}px`;
        } else {
            this.datatableIsOpen = true;
            const width = this.template.host.getBoundingClientRect().width;
            this.datatable.style.width = `${width}px`;
        }
    }

    dispatchChangeEvent(name, onlyOneOccurrence = false) {
        const detail = {
            name: name,
            draftValues: this.selection.draftValues
        };

        if (onlyOneOccurrence) {
            detail.recurrenceDates = {
                from: this.selection.occurrence.from,
                to: this.selection.occurrence.to
            };
        }

        this.dispatchEvent(
            new CustomEvent('eventchange', {
                detail,
                bubbles: true
            })
        );
    }
}
