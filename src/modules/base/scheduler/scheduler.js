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
    normalizeArray,
    normalizeBoolean,
    normalizeString,
    dateTimeObjectFrom,
    addToDate
} from 'c/utilsPrivate';
import { classSet } from 'c/utils';
import { eventCrudMethods } from './eventCrud';
import {
    EDIT_MODES,
    EVENTS_THEMES,
    EVENTS_PALETTES,
    DEFAULT_AVAILABLE_DAYS_OF_THE_WEEK,
    DEFAULT_AVAILABLE_MONTHS,
    DEFAULT_AVAILABLE_TIME_FRAMES,
    DEFAULT_DATE_FORMAT,
    DEFAULT_EDIT_DIALOG_LABELS,
    DEFAULT_EVENTS_LABELS,
    DEFAULT_CONTEXT_MENU_EMPTY_SPOT_ACTIONS,
    DEFAULT_CONTEXT_MENU_EVENT_ACTIONS,
    DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT,
    DEFAULT_START_DATE,
    DEFAULT_VISIBLE_SPAN,
    HEADERS,
    PALETTES,
    PRESET_HEADERS
} from './defaults';
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
    _collapseDisabled = false;
    _customHeaders = [];
    _dateFormat = DEFAULT_DATE_FORMAT;
    _disabledDatesTimes = [];
    _eventsLabels = DEFAULT_EVENTS_LABELS;
    _eventsPalette = EVENTS_PALETTES.default;
    _eventsTheme = EVENTS_THEMES.default;
    _headers = HEADERS.default;
    _isLoading = false;
    _loadingStateAlternativeText = DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT;
    _readOnly = false;
    _recurrentEditModes = EDIT_MODES;
    _referenceLines = [];
    _resizeColumnDisabled = false;
    _rows = [];
    _rowsKeyField;
    _start = dateTimeObjectFrom(DEFAULT_START_DATE);
    _visibleSpan = DEFAULT_VISIBLE_SPAN;

    _allEvents = [];
    _datatableRowsHeight;
    _datatableWidth;
    _draggedEvent;
    _draggedSplitter = false;
    _initialState = {};
    _mouseIsDown = false;
    _numberOfVisibleCells = 0;
    _resizedEvent;
    _headerHeightChange = false;
    _visibleInterval;
    cellWidth = 0;
    computedDisabledDatesTimes = [];
    computedHeaders = [];
    computedReferenceLines = [];
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
    smallestHeader;

    connectedCallback() {
        this.crud = eventCrudMethods(this);
        this.initHeaders();
    }

    renderedCallback() {
        if (this._headerHeightChange) {
            // The first header primitive render will set this variable to true
            // and trigger a re-render. So we return to prevent running the other calculations twice.
            this.updateDatatablePosition();
            this._headerHeightChange = false;
            return;
        }

        // Save the default datatable column width, in case the styling hook was used
        if (!this._datatableWidth) {
            this._datatableWidth = this.datatableCol.getBoundingClientRect().width;
        }

        // Save the datatable row height and update the body styles
        if (!this._datatableRowsHeight) {
            this.updateDatatableRowsHeight();
        }
        this.updateOccurrencesOffsetTop();
        this.updateRowsStyle();

        // Update the position and height of occurrences
        this.updateOccurrencesPosition();

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
                this.initDraggedEventState(
                    this._initialState.mouseX,
                    this._initialState.mouseY
                );
            }
        }

        // If the edit dialog is opened, focus on the first input
        if (this.showEditDialog) {
            this.template.querySelector('c-dialog lightning-input').focus();
        }
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
    get customHeaders() {
        return this._customHeaders;
    }
    set customHeaders(value) {
        this._customHeaders = normalizeArray(value);

        if (this.isConnected) this.initSchedule();
    }

    @api
    get collapseDisabled() {
        return this._collapseDisabled;
    }
    set collapseDisabled(value) {
        this._collapseDisabled = normalizeBoolean(value);
    }

    @api
    get dateFormat() {
        return this._dateFormat;
    }
    set dateFormat(value) {
        this._dateFormat =
            value && typeof value === 'string' ? value : DEFAULT_DATE_FORMAT;
    }

    @api
    get disabledDatesTimes() {
        return this._disabledDatesTimes;
    }
    set disabledDatesTimes(value) {
        this._disabledDatesTimes = normalizeArray(value);

        this.computedDisabledDatesTimes = this._disabledDatesTimes.map(
            (evt) => {
                const event = { ...evt };
                event.disabled = true;
                return event;
            }
        );

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
    get eventsLabels() {
        return this._eventsLabels;
    }
    set eventsLabels(value) {
        this._eventsLabels =
            typeof value === 'object' ? value : DEFAULT_EVENTS_LABELS;

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
        this._headers = normalizeString(value, {
            fallbackValue: HEADERS.default,
            validValues: HEADERS.valid,
            toLowerCase: false
        });

        if (this.isConnected) this.initSchedule();
    }

    @api
    get isLoading() {
        return this._isLoading;
    }
    set isLoading(value) {
        this._isLoading = normalizeBoolean(value);
    }

    @api
    get loadingStateAlternativeText() {
        return this._loadingStateAlternativeText;
    }
    set loadingStateAlternativeText(value) {
        this._loadingStateAlternativeText =
            typeof value === 'string'
                ? value
                : DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT;
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
    get referenceLines() {
        return this._referenceLines;
    }
    set referenceLines(value) {
        this._referenceLines = normalizeArray(value);

        this.computedReferenceLines = this._referenceLines.map((line) => {
            const from = line.date
                ? dateTimeObjectFrom(line.date)
                : dateTimeObjectFrom(Date.now());
            const to = addToDate(from, 'millisecond', 1);

            return {
                title: line.label,
                theme: line.variant,
                from,
                to,
                recurrence: line.recurrence,
                recurrenceEndDate: line.recurrenceEndDate,
                recurrenceCount: line.recurrenceCount,
                recurrenceAttributes: line.recurrenceAttributes,
                referenceLine: true
            };
        });
    }

    @api
    get resizeColumnDisabled() {
        return this._resizeColumnDisabled;
    }
    set resizeColumnDisabled(value) {
        this._resizeColumnDisabled = normalizeBoolean(value);
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
        return this.smallestHeader && this.smallestHeader.end;
    }

    get onlyOccurrenceEditAllowed() {
        return (
            this.recurrentEditModes.length === 1 &&
            this.recurrentEditModes[0] === 'one'
        );
    }

    get selectionFrom() {
        return this.selection.occurrence.from.toFormat(this.dateFormat);
    }

    get selectionTo() {
        return this.selection.occurrence.to.toFormat(this.dateFormat);
    }

    get showCollapseLeft() {
        return !this.collapseDisabled && !this.datatableIsHidden;
    }

    get showCollapseRight() {
        return !this.collapseDisabled && !this.datatableIsOpen;
    }

    get showRecurrenceSaveOptions() {
        return (
            this.recurrentEditModes.length > 1 &&
            this.selection.event.recurrence
        );
    }

    get showLeftInfiniteLoadSpinner() {
        if (!this.smallestHeader || this.isLoading) return false;

        const firstVisibleColumn = this.smallestHeader.columns[0];
        const firstVisibleTime =
            firstVisibleColumn && dateTimeObjectFrom(firstVisibleColumn.start);
        return firstVisibleTime > this.smallestHeader.start;
    }

    get showRightInfiniteLoadSpinner() {
        if (!this.smallestHeader || this.isLoading) return false;

        const lastVisibleColumn = this.smallestHeader.columns[
            this.smallestHeader.columns.length - 1
        ];
        const lastVisibleTime =
            lastVisibleColumn && dateTimeObjectFrom(lastVisibleColumn.end);
        return lastVisibleTime < this.smallestHeader.end;
    }

    get smallestColumnDuration() {
        const header = this.smallestHeader;
        if (header) return 0;

        const headerColumnEnd =
            addToDate(header.start, header.unit, header.span) - 1;
        return dateTimeObjectFrom(headerColumnEnd).diff(header.start)
            .milliseconds;
    }

    get splitterClass() {
        return classSet(
            'scheduler__splitter slds-is-absolute slds-grid slds-grid_align-end'
        )
            .add({
                scheduler__splitter_disabled: this.resizeColumnDisabled
            })
            .toString();
    }

    @api
    createEvent(eventObject) {
        this.crud.createEvent(eventObject);
    }

    @api
    deleteEvent(eventName) {
        this.crud.deleteEvent(eventName);
    }

    @api
    focusEvent(eventName) {
        this._programmaticFocus = true;
        this.crud.focusEvent(eventName);
    }

    @api
    opentEditEventDialog(eventName) {
        this._draggedEvent = undefined;
        this.focusEvent(eventName);
        this.hideAllPopovers();
        this.showEditDialog = true;
    }

    @api
    openNewEventDialog() {
        this.crud.newEvent();
    }

    initSchedule() {
        this.initHeaders();
        this.initEvents();
        this.initRows();
    }

    initHeaders() {
        // Use the custom headers or a preset
        let headers = [...this.customHeaders];
        if (!headers.length) {
            const presetConfig = PRESET_HEADERS.find(
                (preset) => preset.name === this.headers
            );
            headers = presetConfig.headers;
        }

        this.computedHeaders = headers;
    }

    initEvents() {
        if (!this.smallestHeader) return;

        // The disabled dates/times and reference lines are special events
        this._allEvents = this.events
            .concat(this.computedDisabledDatesTimes)
            .concat(this.computedReferenceLines);
        this._allEvents.sort((first, second) => {
            return (
                dateTimeObjectFrom(first.from) < dateTimeObjectFrom(second.from)
            );
        });

        // Create only the visible events
        this.computedEvents = this.createEventsFromInterval(
            this._visibleInterval
        );
    }

    initDraggedEventState(mouseX, mouseY) {
        // Save the initial position values
        const scheduleElement = this.template.querySelector('.scheduler__body');
        const schedulePosition = scheduleElement.getBoundingClientRect();
        const eventPosition = this._draggedEvent.getBoundingClientRect();

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

            const occurrences = this.getOccurrencesFromRowKey(rowKey);

            const computedRow = new SchedulerRow({
                color: this.palette[colorIndex],
                key: rowKey,
                referenceColumns: this.smallestHeader.columns,
                events: occurrences,
                // We store the initial row object in a variable,
                // in case one of its field is used by an event's label
                data: { ...row }
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
        const rows = this.template.querySelectorAll('.scheduler__row');

        rows.forEach((row, index) => {
            const key = row.dataset.key;
            const computedRow = this.computedRows.find((cptRow) => {
                return cptRow.key === key;
            });
            const rowHeight = computedRow.height;

            const dataRowHeight = this._datatableRowsHeight.find(
                (dataRow) => dataRow.rowKey === key
            ).height;

            row.style = `
                min-height: ${dataRowHeight}px;
                height: ${rowHeight}px;
                --avonni-scheduler-cell-width: ${this.cellWidth}px;
            `;

            if (index === 0) {
                this.datatable.setRowHeight(key, rowHeight - 1);
            } else {
                this.datatable.setRowHeight(key, rowHeight);
            }
        });
    }

    updateDatatablePosition() {
        // Align the datatable header with the smallest schedule header
        const headers = this.template.querySelector(
            'c-primitive-scheduler-header-group'
        );
        this.datatableCol.style.paddingTop = `${headers.offsetHeight - 39}px`;
    }

    updateDatatableRowsHeight() {
        const datatable = this.template.querySelector('c-datatable');
        if (!datatable || !this.computedRows.length) return;

        this._datatableRowsHeight = [];
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
        // We store the initial event object in a variable,
        // in case a custom field is used by the labels
        event.data = { ...event };
        event.schedulerEnd = this.end;
        event.schedulerStart = this.smallestHeader.start;
        event.availableMonths = this.availableMonths;
        event.availableDaysOfTheWeek = this.availableDaysOfTheWeek;
        event.availableTimeFrames = this.availableTimeFrames;
        event.smallestHeader = this.smallestHeader;
        event.theme = event.disabled
            ? 'disabled'
            : event.theme || this.eventsTheme;

        event.labels =
            typeof event.labels === 'object' ? event.labels : this.eventsLabels;
    }

    updateOccurrencesOffsetTop() {
        // For each row
        this.computedRows.forEach((row) => {
            let rowHeight = 0;
            let levelHeight = 0;

            // Get all the event occurrences of the row
            const occurrenceElements = Array.from(
                this.template.querySelectorAll(
                    `.scheduler__primitive-event[data-row-key="${row.key}"]`
                )
            );

            if (occurrenceElements.length) {
                // Sort the occurrences by ascending start date
                occurrenceElements.sort((a, b) => a.from - b.from);

                // Compute the vertical level of the occurrences
                const previousOccurrences = [];
                occurrenceElements.forEach((occElement) => {
                    // We update the position, in case the element was visible in the scheduler,
                    // but we changed the computed events and its position changed
                    occElement.updatePosition();

                    const left = occElement.leftPosition;
                    const level = this.computeEventVerticalLevel(
                        previousOccurrences,
                        left
                    );

                    // If the occurrence is taller than the previous ones,
                    // update the default level height
                    const height = occElement.getBoundingClientRect().height;
                    if (height > levelHeight) {
                        levelHeight = height;
                    }

                    const occurrence = row.events.find(
                        (occ) => occ.key === occElement.occurrenceKey
                    );

                    previousOccurrences.unshift({
                        level,
                        left,
                        right: occElement.rightPosition,
                        occurrence:
                            occurrence ||
                            (this.selection && this.selection.occurrence)
                    });
                });

                // Add the corresponding offset to the top of the occurrences
                previousOccurrences.forEach((position) => {
                    const offsetTop = position.level * levelHeight;
                    position.occurrence.offsetTop = offsetTop;

                    // If the occurrence offset is bigger than the previous occurrences,
                    // update the row height
                    const totalHeight = levelHeight + offsetTop;
                    if (totalHeight > rowHeight) {
                        rowHeight = totalHeight;
                    }
                });
            }

            // Add 10 pixels to the row for padding
            row.height = rowHeight + 10;
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

    updateVisibleEvents() {
        const intersection = this._visibleInterval.intersection(
            this._previousInterval
        );
        const previousEvents = this.computedEvents.filter((event) => {
            const from = event.occurrences[0].from;
            const to = event.occurrences[event.occurrences.length - 1].to;
            return (
                (intersection.contains(from) &&
                    this._previousInterval.contains(to)) ||
                (intersection.contains(to) &&
                    this._previousInterval.contains(from))
            );
        });

        const newVisibleInterval = this._visibleInterval.difference(
            this._previousInterval
        )[0];
        const newVisibleEvents = this.createEventsFromInterval(
            newVisibleInterval
        );
        this.computedEvents = previousEvents.concat(newVisibleEvents);
    }

    updateVisibleRows() {
        this.computedRows.forEach((computedRow) => {
            computedRow.events = this.getOccurrencesFromRowKey(computedRow.key);
            computedRow.referenceColumns = this.smallestHeader.columns;
            computedRow.initColumns();
        });
    }

    getCellFromPosition(row, x) {
        const cells = Array.from(row.querySelectorAll('.scheduler__cell'));

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

    getOccurrencesFromRowKey(key) {
        const occurrences = [];
        this.computedEvents.forEach((event) => {
            if (!event.disabled) {
                const occ = event.visibleOccurrences.filter((occurrence) => {
                    return occurrence.rowKey === key;
                });
                occurrences.push(occ);
            }
        });

        return occurrences.flat();
    }

    getRowFromKey(key) {
        return this.computedRows.find((row) => row.key === key);
    }

    getRowFromPosition(y) {
        const rows = Array.from(
            this.template.querySelectorAll('.scheduler__row')
        );
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
            this.initRows();
            this.updateVisibleEvents();
        }
        this.selection = undefined;
    }

    clearDatatableColumnWidth() {
        const lastColumn = this.columns[this.columns.length - 1];
        if (lastColumn.initialWidth) {
            lastColumn.initialWidth = undefined;
            this._columns = [...this.columns];
        }
    }

    computeEventVerticalLevel(previousOccurrences, left, level = 0) {
        // Find the last event with the same level
        const sameOffset = previousOccurrences.find((occ) => {
            return occ.level === level;
        });

        // If we find an event and their dates overlap, add one to the level
        // and make sure there isn't another event at the same height
        if (sameOffset && left < sameOffset.right) {
            level += 1;
            level = this.computeEventVerticalLevel(
                previousOccurrences,
                left,
                level
            );
        }

        return level;
    }

    createEventsFromInterval(interval) {
        const events = this._allEvents.filter((event) => {
            const from = dateTimeObjectFrom(event.from);
            const to = dateTimeObjectFrom(event.to);
            return (
                interval.contains(from) ||
                interval.contains(to) ||
                (interval.isAfter(from) && interval.isBefore(to)) ||
                event.recurrence
            );
        });
        const computedEvents = events.map((evt) => {
            const event = { ...evt };
            this.updateEventDefaults(event);
            return new SchedulerEvent(event);
        });

        return computedEvents.filter((event) => {
            event.visibleOccurrences = event.occurrences.filter(
                (occurrence) => {
                    const { from, to } = occurrence;
                    return (
                        interval.contains(from) ||
                        interval.contains(to) ||
                        (interval.isAfter(from) && interval.isBefore(to))
                    );
                }
            );

            return event.visibleOccurrences.length;
        });
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
        const distanceMoved = x - mouseX;

        // If a new event is created through click and drag,
        // Set the direction the user is going to
        if (this.selection.newEvent) {
            this._resizeSide = distanceMoved >= 0 ? 'right' : 'left';
        }

        const labelWidth =
            this._resizeSide === 'left'
                ? this._draggedEvent.leftLabelWidth * -1
                : this._draggedEvent.rightLabelWidth;
        const computedX = x + labelWidth;

        // Get the events present in the cell crossed
        const hoveredCell = this.getCellFromPosition(row, computedX);
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
            const cell = labelWidth
                ? hoveredCell
                : this.getCellFromPosition(row, x);
            this.resizeEventToCell(cell);
        } else {
            // If we are not passing above another event,
            // change the styling of the dragged event to follow the cursor
            this.updateDraggedEventStyleAfterResize(distanceMoved);
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
            occurrence.to = dateTimeObjectFrom(Number(cell.dataset.end) + 1);
        } else if (side === 'left') {
            // Update the start date if the event was resized from the left
            occurrence.from = dateTimeObjectFrom(Number(cell.dataset.start));
        }

        // Add the occurrence to the row with the updated start/end date
        row.events.push(occurrence);
        row.addEventToColumns(occurrence);
        this.updateVisibleEvents();
    }

    dragEventTo(row, cell) {
        const { occurrence, draftValues } = this.selection;

        // Update the start and end date
        const duration = occurrence.to - occurrence.from;
        const start = dateTimeObjectFrom(Number(cell.dataset.start));
        draftValues.from = start.toUTC().toISO();
        draftValues.to = addToDate(start, 'millisecond', duration + 1)
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
        this.contextMenuActions.splice(0);
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

    handleHeaderCellWidthChange(event) {
        this.cellWidth = event.detail.cellWidth;
    }

    handleHeaderChange(event) {
        this.smallestHeader = event.detail.smallestHeader;
    }

    handleHeaderHeightChange() {
        this._headerHeightChange = true;
    }

    handleHeaderVisibleCellsChange(event) {
        const {
            direction,
            previousInterval,
            visibleCells,
            visibleInterval
        } = event.detail;
        this._numberOfVisibleCells = visibleCells;
        this._visibleInterval = visibleInterval;
        this._previousInterval =
            visibleInterval.s.ts !== previousInterval.s.ts && previousInterval;

        // Create the visible events
        if (!this.computedEvents.length || !this._previousInterval) {
            this.initEvents();
        } else {
            this.updateVisibleEvents();
        }

        // Create the rows or update the visible columns
        if (!this.computedRows.length) {
            this.initRows();
        } else {
            this.updateVisibleRows();
        }

        if (direction) {
            const schedule = this.template.querySelector(
                '.scheduler__schedule-col'
            );
            const scrollOffset = this.cellWidth * visibleCells;
            const scrollValue =
                schedule.scrollLeft <= scrollOffset * 2
                    ? schedule.scrollLeft + scrollOffset
                    : schedule.scrollLeft - scrollOffset;
            schedule.scrollTo({ left: scrollValue });
        }
    }

    handleEventFocus(event) {
        const detail = {
            name: event.detail.eventName
        };
        if (event.currentTarget.recurrence) {
            detail.recurrenceDates = {
                from: event.detail.from.toUTC().toISO(),
                to: event.detail.to.toUTC().toISO()
            };
        }

        if (!this._programmaticFocus) {
            this.dispatchEvent(
                new CustomEvent('eventselect', {
                    detail,
                    bubbles: true
                })
            );
        }
        this._programmaticFocus = false;

        this.handleEventMouseEnter(event);
    }

    handleMouseDown(mouseEvent) {
        if (mouseEvent.button || this.readOnly) return;

        this._mouseIsDown = true;
        this.hideAllPopovers();
        this.cleanDraggedElement();

        const x = mouseEvent.clientX || mouseEvent.detail.x;
        const y = mouseEvent.clientY || mouseEvent.detail.y;
        this._initialState = { mouseX: x, mouseY: y };
        this.crud.newEvent(x, y, false);
    }

    handleEventMouseEnter(event) {
        if (this._mouseIsDown || this.showContextMenu) return;

        this.selectEvent(event);
        this.showDetailPopover = true;
        this._draggedEvent = event.currentTarget;
    }

    handleEventMouseDown(mouseEvent) {
        const { side, x, y } = mouseEvent.detail;
        this._mouseIsDown = true;
        this._resizeSide = side;
        this._draggedEvent = mouseEvent.currentTarget;
        this._draggedEvent.classList.add('scheduler__event-dragged');
        this.selectEvent(mouseEvent);
        this.hideAllPopovers();
        this.initDraggedEventState(x, y);
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
            this.initRows();
            this.updateVisibleEvents();
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
            const { draftValues, newEvent, event, occurrence } = this.selection;
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
            const to = dateTimeObjectFrom(Number(cellElement.dataset.end) + 1);
            const from = dateTimeObjectFrom(Number(cellElement.dataset.start));
            switch (side) {
                case 'right':
                    draftValues.to = to.toUTC().toISO();
                    if (newEvent) occurrence.to = to;
                    break;
                case 'left':
                    draftValues.from = from.toUTC().toISO();
                    if (newEvent) occurrence.from = from;
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
        const target = mouseEvent.currentTarget;
        if (target.disabled || target.referenceLine) return;

        if (this.computedContextMenuEvent.length) {
            this.hideAllPopovers();
            this.contextMenuActions = [...this.computedContextMenuEvent];
            this.selectEvent(mouseEvent);
            this.showContextMenu = true;
        }
    }

    handleEmptySpotContextMenu(mouseEvent) {
        mouseEvent.preventDefault();

        if (this.computedContextMenuEmptySpot.length) {
            this.hideAllPopovers();
            this.contextMenuActions = [...this.computedContextMenuEmptySpot];
            this.showContextMenu = true;
            const x = mouseEvent.clientX || mouseEvent.detail.x;
            const y = mouseEvent.clientY || mouseEvent.detail.y;
            this.crud.newEvent(x, y, false);
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

    handleEventDelete() {
        this.crud.deleteEvent();
    }

    handleDoubleClick(mouseEvent) {
        const x = mouseEvent.clientX || mouseEvent.detail.x;
        const y = mouseEvent.clientY || mouseEvent.detail.y;
        this.crud.newEvent(x, y, true);
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
            this.template.querySelector('c-dialog lightning-input').focus();
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

        // Get the number of cells scrolled
        const cells = this._numberOfVisibleCells;
        const schedule = this.template.querySelector(
            '.scheduler__schedule-col'
        );
        const scroll = schedule.scrollLeft;
        const cellsScrolled = Math.floor(scroll / this.cellWidth);

        const startOfSchedule =
            this._visibleInterval.s.ts === this.smallestHeader.start.ts;
        const loadLeftSchedule = !startOfSchedule && cellsScrolled <= cells;
        const loadRightSchedule = cellsScrolled >= cells * 3;

        if (loadRightSchedule || loadLeftSchedule) {
            const direction = loadRightSchedule ? 'right' : 'left';
            // Reload the schedule to only see the visible part
            const headers = this.template.querySelector(
                'c-primitive-scheduler-header-group'
            );
            headers.scrollHeadersTo(direction);
        }
    };

    handleSplitterMouseDown(mouseEvent) {
        if (
            this.resizeColumnDisabled ||
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
                from: this.selection.occurrence.from.toUTC().toISO(),
                to: this.selection.occurrence.to.toUTC().toISO()
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
