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

import { api, track } from 'lwc';
import {
    addToDate,
    dateTimeObjectFrom,
    deepCopy,
    normalizeArray,
    normalizeString
} from 'c/utilsPrivate';
import { classSet } from 'c/utils';
import {
    DEFAULT_START_DATE,
    HEADERS,
    PRESET_HEADERS,
    UNITS,
    VARIANTS
} from './defaults';
import SchedulerResource from './resource';
import {
    getElementOnXAxis,
    getElementOnYAxis,
    PrimitiveScheduleBase,
    updateOccurrencesOffset,
    updateOccurrencesPosition
} from 'c/schedulerUtils';

export default class PrimitiveSchedulerTimeline extends PrimitiveScheduleBase {
    _columns = [];
    _start = DEFAULT_START_DATE;
    _variant = VARIANTS.default;

    _draggedSplitter;
    _eventData;
    _headersAreLoading = true;
    _initialFirstColWidth;
    _initialState = {};
    _mouseIsDown = false;
    _rowsHeight = [];
    _updateOccurrencesLength = false;
    cellWidth = 0;
    @track computedEvents = [];
    computedHeaders = [];
    computedResources = [];
    firstColumnIsHidden = false;
    firstColumnIsOpen = false;
    firstColWidth = 0;
    smallestHeader;

    connectedCallback() {
        this.initHeaders();
        this.initResources();
        super.connectedCallback();
    }

    renderedCallback() {
        if (!this.smallestHeader) {
            return;
        }

        if (!this._initialFirstColWidth) {
            this.resetFirstColumnWidth();
        }

        if (!this._rowsHeight.length) {
            this.updateRowsHeight();
        }

        this.updateOccurrencesOffset();
        updateOccurrencesPosition.call(this, this.isVertical);
        this.updateResourcesStyle();

        if (this._eventData.shouldInitDraggedEvent) {
            // A new event is being created by dragging.
            // On the first move, display the event on the timeline.
            this.updateVisibleResources();
            this._eventData.setDraggedEvent();
        }

        super.renderedCallback();
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Array of data table column objects (see [Data Table](/components/datatable/) for allowed keys). The columns are displayed to the left of the schedule and visible only for the horizontal variant.
     *
     * @type {object[]}
     * @public
     */
    @api
    get columns() {
        return this._columns;
    }
    set columns(value) {
        this._columns = deepCopy(normalizeArray(value));
    }

    @api
    get events() {
        return super.events;
    }
    set events(value) {
        super.events = value;

        if (this._connected) {
            this.updateVisibleResources();
        }
    }

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
     * Specifies the starting date/timedate of the schedule. It can be a Date object, timestamp, or an ISO8601 formatted string.
     *
     * @type {(Date|number|string)}
     * @public
     * @default new Date()
     */
    @api
    get start() {
        return this._start;
    }
    set start(value) {
        const computedDate = dateTimeObjectFrom(value);
        this._start = computedDate || dateTimeObjectFrom(DEFAULT_START_DATE);
    }

    @api
    get timeSpan() {
        return super.timeSpan;
    }
    set timeSpan(value) {
        super.timeSpan = value;

        if (this._connected) {
            this.initHeaders();
        }
    }

    /**
     * Orientation of the scheduler. Valid values include horizontal and vertical.
     *
     * @type {string}
     * @default horizontal
     * @public
     */
    @api
    get variant() {
        return this._variant;
    }
    set variant(value) {
        this._variant = normalizeString(value, {
            fallbackValue: VARIANTS.default,
            validValues: VARIANTS.valid
        });

        this._initialFirstColWidth = null;

        if (this._connected) {
            this.initEvents();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Computed CSS classes of the cells.
     *
     * @type {string}
     */
    get cellClass() {
        return classSet(
            'slds-border_right slds-border_bottom slds-p-around_none slds-wrap avonni-scheduler__cell'
        )
            .add({
                'slds-col': !this.isVertical,
                'avonni-scheduler__cell_vertical': this.isVertical,
                'avonni-scheduler__cell_zoom-to-fit': this.zoomToFit
            })
            .toString();
    }

    /**
     * Datatable HTML Element.
     *
     * @type {HTMLElement}
     */
    get datatable() {
        return this.template.querySelector(
            '[data-element-id="avonni-datatable"]'
        );
    }

    get eventHeaderCells() {
        if (this.isVertical) {
            return { yAxis: this.smallestHeader.cells };
        }
        return { xAxis: this.smallestHeader.cells };
    }

    get eventVariant() {
        return this.isVertical ? 'timeline-vertical' : 'timeline-horizontal';
    }

    /**
     * Computed CSS classes for the first column.
     *
     * @type {string}
     */
    get firstColClass() {
        return classSet(
            'slds-border_right avonni-scheduler__first-col slds-grid'
        )
            .add({
                'avonni-scheduler__first-col_hidden': this.firstColumnIsHidden,
                'avonni-scheduler__first-col_open': this.firstColumnIsOpen,
                'avonni-scheduler__first-col_horizontal': !this.isVertical,
                'slds-p-right_x-small avonni-scheduler__first-col_vertical avonni-scheduler__grid_align-end':
                    this.isVertical
            })
            .toString();
    }

    /**
     * True if the variant is vertical.
     *
     * @type {boolean}
     */
    get isVertical() {
        return this.variant === 'vertical';
    }

    /**
     * If true, editing a recurring event only updates the occurrence, never the complete event.
     *
     * @type {boolean}
     * @default false
     */
    get onlyOccurrenceEditAllowed() {
        return (
            this.recurrentEditModes.length === 1 &&
            this.recurrentEditModes[0] === 'one'
        );
    }

    /**
     * Computed CSS class for the schedule resources.
     *
     * @type {string}
     */
    get resourceClass() {
        return classSet('slds-grid slds-is-relative')
            .add({
                'slds-grid_vertical slds-col': this.isVertical
            })
            .toString();
    }

    /**
     * Computed CSS class for the schedule body.
     *
     * @type {string}
     */
    get scheduleBodyClass() {
        return classSet('slds-is-relative')
            .add({
                'slds-grid avonni-scheduler__schedule-body_vertical':
                    this.isVertical
            })
            .toString();
    }

    /**
     * Computed CSS class for the schedule column.
     *
     * @type {string}
     */
    get scheduleColClass() {
        return classSet(
            'slds-col slds-grid avonni-scheduler__schedule-col slds-theme_default'
        )
            .add({
                'slds-hide': this.firstColumnIsOpen,
                'avonni-scheduler__schedule-col_vertical': this.isVertical,
                'avonni-scheduler__schedule-col_zoom-to-fit': this.zoomToFit
            })
            .toString();
    }

    /**
     * Width of the schedule column, in pixels.
     *
     * @type {number}
     */
    get scheduleColWidth() {
        const wrapper = this.template.querySelector(
            '[data-element-id="div-schedule-wrapper"]'
        );
        const firstCol = this.firstCol;

        if (wrapper && firstCol) {
            const wrapperWidth = wrapper.getBoundingClientRect().width;
            const firstColWidth = firstCol.getBoundingClientRect().width;
            return wrapperWidth - firstColWidth;
        }
        return 0;
    }

    /**
     * Computed CSS class for the nested schedule column.
     *
     * @type {string}
     */
    get scheduleNestedColClass() {
        return classSet('slds-col')
            .add({
                'avonni-scheduler__schedule-col_zoom-to-fit': this.zoomToFit
            })
            .toString();
    }

    /**
     * Width of the first column, used by the events to make the labels sticky.
     *
     * @type {number}
     */
    get scrollOffset() {
        return this.isVertical ? 0 : this.firstColWidth;
    }

    /**
     * Duration of one cell of the smallest unit header, in milliseconds.
     *
     * @type {number}
     * @default 0
     */
    get smallestCellDuration() {
        const header = this.smallestHeader;
        if (!header) {
            return 0;
        }

        const headerCellEnd =
            addToDate(header.start, header.unit, header.span) - 1;
        return dateTimeObjectFrom(headerCellEnd).diff(header.start)
            .milliseconds;
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
                'slds-grid_align-end': this.firstColumnIsOpen,
                'avonni-scheduler__splitter_vertical': this.isVertical
            })
            .toString();
    }

    /**
     * Computed CSS style for the vertical resource header cells.
     *
     * @type {string}
     */
    get verticalResourceHeaderCellClass() {
        return classSet(
            'slds-border_right slds-p-horizontal_x-small avonni-scheduler__vertical-resource-header-cell slds-grid slds-grid_vertical-align-center'
        )
            .add({
                'avonni-scheduler__vertical-resource-header-cell_zoom-to-fit':
                    this.zoomToFit
            })
            .toString();
    }

    get visibleInterval() {
        const headers = this.template.querySelector(
            '[data-element-id="avonni-primitive-scheduler-header-group"]'
        );
        if (headers) {
            return headers.visibleInterval;
        }
        return null;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    @api
    cleanSelection(cancelNewEvent) {
        super.cleanSelection(cancelNewEvent);
        this.updateVisibleResources();
    }

    @api
    createEvent(event) {
        super.createEvent(event);
        this.updateVisibleResources();
    }

    @api
    deleteEvent(name) {
        super.deleteEvent(name);
        this.updateVisibleResources();
    }

    @api
    newEvent(x, y, saveEvent) {
        const resourceElement = this.getResourceElementFromPosition(x, y);
        const selector = '[data-element-id="div-cell"]';
        const cell = this.isVertical
            ? getElementOnYAxis(resourceElement, y, selector)
            : getElementOnXAxis(resourceElement, x, selector);
        const resourceNames = [resourceElement.dataset.name];
        const from = Number(cell.dataset.start);
        const to = Number(cell.dataset.end) + 1;
        this._eventData.newEvent({ resourceNames, from, to, x, y }, saveEvent);
    }

    @api
    saveSelection(recurrenceMode) {
        super.saveSelection(recurrenceMode);
        this.updateVisibleResources();
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    initEvents() {
        super.initEvents();
        this._eventData.isVertical = this.isVertical;
        this._eventData.smallestHeader = this.smallestHeader;
        this._eventData.initEvents();
    }

    /**
     * Create the computed headers.
     */
    initHeaders() {
        this._headersAreLoading = true;
        const { customHeaders, headers } = this.timeSpan;

        if (customHeaders) {
            const normalizedHeaders = customHeaders.filter((hd) => {
                const validUnit = UNITS.includes(hd.unit);
                const validSpan = hd.span > 0;
                const validLabel = typeof hd.label === 'string';
                return validUnit && validSpan && validLabel;
            });

            if (normalizedHeaders.length) {
                this.computedHeaders = deepCopy(normalizedHeaders);
                return;
            }
        }

        const normalizedHeadersName = normalizeString(headers, {
            validValues: HEADERS.valid,
            fallbackValue: HEADERS.default,
            toLowerCase: false
        });

        this.computedHeaders = deepCopy(PRESET_HEADERS[normalizedHeadersName]);
    }

    initResources() {
        this.computedResources = this.resources.map((res) => {
            const name = res.name;
            const cells = this.smallestHeader && this.smallestHeader.cells;
            const resource = new SchedulerResource({
                avatarFallbackIconName: res.avatarFallbackIconName,
                avatarInitials: res.avatarInitials,
                avatarSrc: res.avatarSrc,
                color: res.color,
                label: res.label,
                name,
                referenceCells: cells,
                events: this.getOccurrencesFromResourceName(name),
                // We store the initial resource object in a variable,
                // in case one of its fields is used by an event's label
                data: { ...res }
            });

            resource.initCells();

            // Set the min-height to the datatable rows height
            if (this._rowsHeight.length && !this.isVertical) {
                const dataRow = this._rowsHeight.find((row) => {
                    return row.resourceName === name;
                });
                resource.minHeight = dataRow.height;
            }

            return resource;
        });

        if (this.isVertical) {
            requestAnimationFrame(() => {
                this.updateCellWidth();
            });
        }
    }

    /**
     * Remove the initial width of the datatable last column if there was one, so it will be resized when the splitter is moved.
     */
    clearDatatableColumnWidth() {
        if (this.isVertical) {
            return;
        }
        const lastColumn = this.columns[this.columns.length - 1];
        if (lastColumn.initialWidth) {
            lastColumn.initialWidth = undefined;
            this._columns = [...this.columns];
        }
    }

    /**
     * Find the event occurrences for a given resource name.
     *
     * @param {string} name The unique name of the resource.
     * @returns {object[]} Array of occurrence objects.
     */
    getOccurrencesFromResourceName(name) {
        const occurrences = [];
        this.computedEvents.forEach((event) => {
            if (!event.disabled) {
                const occ = event.occurrences.filter((occurrence) => {
                    return occurrence.resourceName === name;
                });
                occurrences.push(occ);
            }
        });

        return occurrences.flat();
    }

    getResourceElementFromPosition(x, y) {
        const position = this.isVertical ? x : y;
        const selector = '[data-element-id="div-resource"]';

        if (this.isVertical) {
            return getElementOnXAxis(this.template, position, selector);
        }
        return getElementOnYAxis(this.template, position, selector);
    }

    /**
     * Find a computed resource from its name.
     *
     * @param {string} name The unique name of the resource.
     * @returns {SchedulerResource} The computed resource object.
     */
    getResourceFromName(name) {
        return this.computedResources.find(
            (resource) => resource.name === name
        );
    }

    /**
     * Vertically align the top of the datatable with the bottom of the headers.
     */
    pushDatatableDown() {
        if (this.isVertical) {
            return;
        }

        const headers = this.template.querySelector(
            '[data-element-id="avonni-primitive-scheduler-header-group"]'
        );
        this.datatable.style.marginTop = `${headers.offsetHeight - 39}px`;
    }

    /**
     * Reset the width of the first column to the width it had before being collapsed.
     */
    resetFirstColumnWidth() {
        const columnWidth = this.firstCol.getBoundingClientRect().width;
        this._initialFirstColWidth = columnWidth;
        this.firstColWidth = columnWidth;
        if (this.isVertical) {
            this.setResourceHeaderFirstCellWidth();
        }
    }

    /**
     * Set the CSS style of the resource header first cell, in vertical variant.
     */
    setResourceHeaderFirstCellWidth() {
        const resourceHeaderFirstCell = this.template.querySelector(
            '[data-element-id="div-vertical-resource-header-first-cell"]'
        );
        resourceHeaderFirstCell.style.width = `${this.firstColWidth}px`;
        resourceHeaderFirstCell.style.minWidth = `${this.firstColWidth}px`;
    }

    /**
     * Update the cell width property if the cells grew because the splitter moved.
     */
    updateCellWidth() {
        if (this.zoomToFit && !this.isVertical) {
            // The header is computing the cell width
            const headers = this.template.querySelector(
                '[data-element-id="avonni-primitive-scheduler-header-group"]'
            );
            if (headers) {
                headers.scrollLeftOffset = this.firstColWidth;
            }
            return;
        } else if (this.isVertical) {
            this.setResourceHeaderFirstCellWidth();
        }

        super.updateCellWidth();
    }

    updateOccurrencesOffset() {
        // For each resource
        this.computedResources.forEach((resource) => {
            // Get all the event occurrences of the resource
            const occurrenceElements = Array.from(
                this.template.querySelectorAll(
                    `[data-element-id="avonni-primitive-scheduler-event-occurrence"][data-resource-name="${resource.name}"]:not([data-disabled="true"])`
                )
            );

            const resourceHeight = updateOccurrencesOffset.call(
                this,
                occurrenceElements,
                resource.events,
                this.isVertical
            );
            if (resourceHeight) {
                resource.height = resourceHeight;
            }
        });
    }

    /**
     * Set the resources height and cell width.
     */
    updateResourcesStyle() {
        if (this.isVertical) {
            this.template.host.style = `
                --avonni-scheduler-cell-height: ${this.cellHeight}px;
            `;
            const resourceHeaders = this.template.querySelector(
                '[data-element-id="div-vertical-resource-headers"]'
            );
            const scheduleWrapper = this.template.querySelector(
                '[data-element-id="div-schedule-wrapper"]'
            );
            const scrollBarWidth =
                scheduleWrapper.offsetWidth - scheduleWrapper.clientWidth;
            resourceHeaders.style.paddingRight = `${scrollBarWidth}px`;
        } else {
            const resourceElements = this.template.querySelectorAll(
                '[data-element-id="div-resource"]'
            );

            resourceElements.forEach((resourceElement, index) => {
                const name = resourceElement.dataset.name;
                const computedResource = this.getResourceFromName(name);
                const rowHeight = computedResource.height;

                const dataRow = this._rowsHeight.find((row) => {
                    return row.resourceName === name;
                });
                const dataRowHeight = dataRow.height;

                const style = `
                    min-height: ${dataRowHeight}px;
                    height: ${rowHeight}px;
                    --avonni-scheduler-cell-width: ${this.cellWidth}px;
                `;

                // Patch inconsistency in the datatable row heights
                const normalizedHeight =
                    index === 0 ? rowHeight - 1 : rowHeight;
                // Reset the datatable row height, in case the height was set by events
                this.datatable.setRowHeight(name, normalizedHeight);

                resourceElement.style = style;
            });
        }
    }

    /**
     * Save the datatable rows heights and use them as a min-height for the schedule rows.
     */
    updateRowsHeight() {
        if (this.isVertical || (!this.isVertical && !this.datatable)) {
            return;
        }

        this._rowsHeight = [];
        this.computedResources.forEach((resource) => {
            const resourceName = resource.name;
            const height = this.datatable.getRowHeight(resourceName);
            resource.minHeight = height;
            this._rowsHeight.push({ resourceName, height });
        });
    }

    /**
     * Update the cells and events of the currently loaded resources.
     */
    updateVisibleResources() {
        this.computedResources.forEach((resource) => {
            resource.events = this.getOccurrencesFromResourceName(
                resource.name
            );
            resource.referenceCells = this.smallestHeader.cells;
            resource.initCells();
        });
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS AND DISPATCHERS
     * -------------------------------------------------------------
     */

    /**
     * Handle the resize event fired by the datatable. Update the rows heights.
     */
    handleDatatableResize(event) {
        if (event.detail.isUserTriggered) {
            this.datatable.style.width = null;
            this._rowsHeight = [];
            this.computedResources.forEach((resource) => {
                resource.minHeight = undefined;
            });
            this.firstCol.style.width = null;
            this.firstCol.style.minWidth = null;
            this.computedResources = [...this.computedResources];
        } else {
            this.updateRowsHeight();
            this.updateResourcesStyle();
        }
    }

    /**
     * Handle the privatemousedown event fired by a primitive event occurrence. Select the event and prepare for it to be dragged or resized.
     */
    handleEventMouseDown(mouseEvent) {
        this._mouseIsDown = true;
        const { x, y } = mouseEvent.detail;
        const resourceElement = this.getResourceElementFromPosition(x, y);
        const resource = this.getResourceFromName(resourceElement.dataset.name);
        this._eventData.handleExistingEventMouseDown(
            mouseEvent,
            resource,
            resourceElement
        );
        this.dispatchHidePopovers();
    }

    /**
     * Handle the privatecellsizechange event fired by the primitive header. Save the smallest unit header cell size to a variable.
     */
    handleHeaderCellSizeChange(event) {
        const { cellSize, orientation } = event.detail;

        if (orientation === 'vertical') {
            this.cellHeight = cellSize;
        } else {
            this.cellWidth = cellSize;
        }
    }

    /**
     * Handle the `privateheaderchange` event fired by the primitive header. Save the smallest unit header to a variable and make sure the datatable position will be updated on next render.
     */
    handleHeaderChange(event) {
        this.smallestHeader = event.detail.smallestHeader;

        // Update the start date in case it was not available
        this._start = this.smallestHeader.start;

        this.dispatchVisibleIntervalChange(this.start, this.visibleInterval);
        this.initEvents();
        this.updateVisibleResources();
        this._initialFirstColWidth = 0;
        this._rowsHeight = [];
        this._headersAreLoading = false;

        requestAnimationFrame(() => {
            this.pushDatatableDown();
        });
    }

    /**
     * Handle the click event fired by the splitter left collapse button. If the first column was taking the full screen, resize it to its initial width. Else, hide the first column.
     */
    handleHideFirstCol() {
        this.dispatchHidePopovers();
        this.firstCol.style.width = null;
        this.firstCol.style.minWidth = null;

        if (this.firstColumnIsOpen) {
            this.firstColumnIsOpen = false;
            this.firstColWidth = this._initialFirstColWidth;
            if (this.isVertical) {
                this.setResourceHeaderFirstCellWidth();
            } else {
                this.datatable.style.width = null;
            }
        } else {
            this.firstColumnIsHidden = true;
            this.firstColWidth = 0;
            if (this.isVertical) {
                this.setResourceHeaderFirstCellWidth();
            } else {
                this.datatable.style.width = 0;
            }
        }
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
        const resourceElement = this.getResourceElementFromPosition(x, y);
        const resource = this.getResourceFromName(resourceElement.dataset.name);

        this._eventData.handleNewEventMouseDown({
            event,
            resource,
            resourceElement,
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

            if (!this.isVertical) {
                this.datatable.style.width = `${width}px`;
            }
            this.firstCol.style.width = `${width}px`;
            this.firstCol.style.minWidth = `${width}px`;
            this.firstColWidth = width;

            if (this.isVertical && !this.zoomToFit) {
                // Update the resource header first cell width
                // even if the schedule body width has not changed (is scrolling).
                // The rest of the time, the resize observer will trigger the update.
                this.setResourceHeaderFirstCellWidth();
            }
        } else {
            this._eventData.handleMouseMove(mouseEvent);

            if (this._eventData.shouldInitDraggedEvent) {
                this.updateVisibleResources();
            }
        }
    }

    /**
     * Handle the mouseup event fired by the schedule. Save the splitter or the dragged/resized event new position.
     */
    handleMouseUp(mouseEvent) {
        if (!this._mouseIsDown) {
            return;
        }
        this._mouseIsDown = false;

        if (this._draggedSplitter) {
            this._draggedSplitter = false;
        } else {
            const x = mouseEvent.clientX;
            const y = mouseEvent.clientY;
            const { eventToDispatch, updateResources } =
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
            if (updateResources) {
                this.updateVisibleResources();
            }
        }
    }

    /**
     * Handle the click event fired by the splitter right collapse button. If the first column was hidden, resize it to its initial width. Else, make it full screen.
     */
    handleOpenFirstCol() {
        this.dispatchHidePopovers();
        this.firstCol.style.width = null;
        this.clearDatatableColumnWidth();
        if (!this.isVertical) {
            this.datatable.style.width = null;
        }

        if (this.firstColumnIsHidden) {
            this.firstColumnIsHidden = false;
            this.firstColWidth = this._initialFirstColWidth;
            if (!this.isVertical) {
                this.datatable.style.width = `${this._initialFirstColWidth}px`;
            }
        } else {
            this.firstColumnIsOpen = true;
            const width = this.template.host.getBoundingClientRect().width;
            this.firstColWidth = width;
            if (!this.isVertical) {
                this.datatable.style.width = `${width}px`;
            }
        }
    }

    /**
     * Handle the scroll event fired by the schedule. Hide the popovers of the events that are scrolled out of the screen.
     */
    handleScroll(event) {
        if (this._eventData.selection) {
            // Hide the detail popover only if it goes off screen
            const key = this._eventData.selection.occurrence.key;
            const occurrence = this.template.querySelector(
                `[data-element-id="avonni-primitive-scheduler-event-occurrence"][data-key="${key}"`
            );
            if (occurrence) {
                const eventPosition = occurrence.getBoundingClientRect();
                if (eventPosition.right < 0 || eventPosition.bottom < 0) {
                    this.dispatchHidePopovers(['detail']);
                }
            }
        }
        this.dispatchHidePopovers(['context']);

        if (this.isVertical && !this.zoomToFit) {
            // Create an artificial scroll for the resource headers in vertical
            const resourceHeaders = this.template.querySelector(
                '[data-element-id="div-resource-header-cells"]'
            );
            resourceHeaders.scroll(event.currentTarget.scrollLeft, 0);
        }
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

        this.clearDatatableColumnWidth();
        this._mouseIsDown = true;
        this._draggedSplitter = true;
        const firstColWidth = this.isVertical
            ? this.firstCol.offsetWidth
            : this.datatable.offsetWidth;
        this._initialState = {
            mouseX: mouseEvent.clientX,
            firstColWidth
        };
        this.firstColumnIsHidden = false;
        this.firstColumnIsOpen = false;
        this.dispatchHidePopovers();
    }
}
