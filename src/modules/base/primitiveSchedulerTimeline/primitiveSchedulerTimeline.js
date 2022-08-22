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
    ScheduleBase,
    updateOccurrencesOffset,
    updateOccurrencesPosition
} from 'c/schedulerUtils';
import { AvonniResizeObserver } from 'c/resizeObserver';

const CELL_SELECTOR = '[data-element-id="div-cell"]';

/**
 * Main part of the scheduler, when the selected display is "timeline".
 *
 * @class
 * @descriptor c-primitive-scheduler-timeline
 * @extends ScheduleBase
 */
export default class PrimitiveSchedulerTimeline extends ScheduleBase {
    _columns = [];
    _start = DEFAULT_START_DATE;
    _variant = VARIANTS.default;

    _eventData;
    _initialState = {};
    _mouseIsDown = false;
    _resizeObserver;
    _rowsHeight = [];
    _updateOccurrencesLength = false;
    cellWidth = 0;
    @track computedEvents = [];
    computedHeaders = [];
    computedResources = [];
    headersAreLoading = true;
    smallestHeader;

    connectedCallback() {
        window.addEventListener('mouseup', this.handleMouseUp);
        this.initHeaders();
        super.connectedCallback();
    }

    renderedCallback() {
        if (!this._resizeObserver) {
            this._resizeObserver = this.initResizeObserver();
        }

        if (this.headersAreLoading) {
            this.setLoaderHeight();
            return;
        }

        if (!this._rowsHeight.length) {
            this.updateRowsHeight();
        }

        this.updateOccurrencesOffset();
        this.updateOccurrencesPosition();
        this.updateResourcesStyle();

        if (this._eventData.shouldInitDraggedEvent) {
            // A new event is being created by dragging.
            // On the first move, display the event on the timeline.
            this.updateVisibleResources();
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

    /**
     * Array of data table column objects (see [Data Table](/components/datatable/) for allowed keys). The columns are displayed to the left of the timeline and visible only for the horizontal variant.
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

    /**
     * Array of event objects.
     *
     * @type {object[]}
     * @public
     */
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

    /**
     * Array of resource objects. The resources can be bound to events.
     *
     * @type {object[]}
     * @public
     * @required
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
     * Array of selected resources names. Only the events of the selected resources will be visible.
     *
     * @type {string[]}
     * @public
     */
    @api
    get selectedResources() {
        return super.selectedResources;
    }
    set selectedResources(value) {
        super.selectedResources = value;

        if (this._connected) {
            this._rowsHeight = [];
            this.updateVisibleResources();

            requestAnimationFrame(() => {
                this.updateCellWidth();
            });
        }
    }

    /**
     * Specifies the starting date/time of the timeline. It can be a Date object, timestamp, or an ISO8601 formatted string.
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

    /**
     * Object used to set the duration of the timeline. It should have two keys:
     * * unit (minute, hour, day, week, month or year)
     * * span (number).
     *
     * @type {object}
     * @public
     * @default { unit: 'day', span: 1 }
     */
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
     * Orientation of the timeline. Valid values include horizontal and vertical.
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

    /**
     * Computed header cells used by the primitive events to position themselves.
     *
     * @type {object}
     */
    get eventHeaderCells() {
        if (this.isVertical) {
            return { yAxis: this.smallestHeader.cells };
        }
        return { xAxis: this.smallestHeader.cells };
    }

    /**
     * Variant of the primitive events.
     *
     * @type {string}
     */
    get eventVariant() {
        return this.isVertical ? 'timeline-vertical' : 'timeline-horizontal';
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
        return classSet('avonni-scheduler__first-col slds-grid')
            .add({
                'avonni-scheduler__first-col_vertical avonni-scheduler__grid_align-end':
                    this.isVertical
            })
            .toString();
    }

    /**
     * Initial valid string CSS width of the first column. It is used to set the left panel width, before resize.
     *
     * @type {string}
     */
    get firstColInitialWidth() {
        return this.isVertical ? '110px' : '300px';
    }

    /**
     * First column width, in pixels.
     *
     * @type {number}
     */
    get firstColWidth() {
        return this.firstCol ? this.firstCol.getBoundingClientRect().width : 0;
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
     * True if editing a recurring event only updates the occurrence, never the complete event.
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
     * Computed CSS classes for the timeline resources.
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
     * HTML element of the timeline body.
     *
     * @type {HTMLElement}
     */
    get scheduleBody() {
        return this.template.querySelector(
            '[data-element-id="div-schedule-body"]'
        );
    }

    /**
     * Computed CSS classes for the timeline body.
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
     * Computed CSS classes for the timeline column.
     *
     * @type {string}
     */
    get scheduleColClass() {
        return classSet(
            'slds-col slds-grid avonni-scheduler__schedule-col slds-theme_default'
        )
            .add({
                'avonni-scheduler__schedule-col_zoom-to-fit': this.zoomToFit
            })
            .toString();
    }

    /**
     * Width of the timeline column, in pixels.
     *
     * @type {number}
     */
    get scheduleColWidth() {
        const wrapper = this.template.querySelector(
            '[data-element-id="div-schedule-wrapper"]'
        );

        if (wrapper) {
            return wrapper.getBoundingClientRect().width;
        }
        return 0;
    }

    /**
     * Computed CSS classes for the nested schedule column.
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
     * Computed CSS classes for the timeline wrapper.
     *
     * @type {string}
     */
    get scheduleWrapperClass() {
        return classSet('slds-grid slds-is-relative avonni-scheduler__wrapper')
            .add({
                'avonni-scheduler__wrapper_vertical': this.isVertical
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
     * Array of records corresponding to the selected resources data.
     *
     * @type {object[]}
     */
    get selectedDatatableRecords() {
        return this.resources.filter((res) => {
            return this.selectedResources.includes(res.name);
        });
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
     * Computed CSS classes for the vertical resource header cells.
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

    /**
     * Array of visible resources.
     *
     * @type {object[]}
     */
    get visibleComputedResources() {
        return this.computedResources.filter((res) => {
            return this.selectedResources.includes(res.name);
        });
    }

    /**
     * Visible interval of time.
     *
     * @type {Interval}
     */
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

    /**
     * Clear the selected event.
     *
     * @param {boolean} cancelNewEvent If true and a new event was being created, the new event will be canceled.
     * @public
     */
    @api
    cleanSelection(cancelNewEvent) {
        super.cleanSelection(cancelNewEvent);
        this.updateVisibleResources();
    }

    /**
     * Create a new event.
     *
     * @param {object} event New event object.
     * @public
     */
    @api
    createEvent(event) {
        super.createEvent(event);
        this.updateVisibleResources();
    }

    /**
     * Delete an event.
     *
     * @param {string} name Unique name of the event to delete.
     * @public
     */
    @api
    deleteEvent(name) {
        super.deleteEvent(name);
        this.updateVisibleResources();
    }

    /**
     * Add a new event to the timeline, without necessarily saving it.
     *
     * @param {number} x Position of the new event on the X axis.
     * @param {number} y Position of the new event on the Y axis.
     * @param {boolean} saveEvent If true, the event will be saved.
     * @public
     */
    @api
    newEvent(x, y, saveEvent) {
        const resourceElement = this.getResourceElementFromPosition(x, y);
        const cell = this.isVertical
            ? getElementOnYAxis(resourceElement, y, CELL_SELECTOR)
            : getElementOnXAxis(resourceElement, x, CELL_SELECTOR);
        const resourceNames = [resourceElement.dataset.name];
        const from = Number(cell.dataset.start);
        const to = Number(cell.dataset.end) + 1;
        this._eventData.newEvent({ resourceNames, from, to, x, y }, saveEvent);
    }

    /**
     * Save the changes made to the selected event.
     *
     * @param {string} recurrenceMode Edition mode of the recurrent events. Valid values include one or all.
     * @public
     */
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

    /**
     * Initialize the event data.
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
        this.headersAreLoading = true;
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

    /**
     * Initialize the screen resize observer.
     *
     * @returns {AvonniResizeObserver} Resize observer.
     */
    initResizeObserver() {
        if (!this.scheduleBody) {
            return null;
        }
        const resizeObserver = new AvonniResizeObserver(() => {
            this.updateCellWidth();
        });
        resizeObserver.observe(this.scheduleBody);
        return resizeObserver;
    }

    /**
     * Initialize the resources.
     */
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
            return resource;
        });

        this._rowsHeight = [];

        if (this.isVertical) {
            requestAnimationFrame(() => {
                this.updateCellWidth();
            });
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

    /**
     * Get the HTML element of a resource, from its position.
     *
     * @param {number} x Position of the resource on the X axis.
     * @param {number} y Position of the resource on the Y axis.
     * @returns {HTMLElement} Resource element.
     */
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
     * Set the headers loader height.
     */
    setLoaderHeight() {
        const loader = this.template.querySelector(
            '[data-element-id="div-loading-spinner"]'
        );
        if (loader) {
            const headers = this.template.querySelector(
                '[data-element-id="avonni-primitive-scheduler-header-group"]'
            );
            const height = this.isVertical
                ? 80
                : this.firstCol.offsetHeight - headers.offsetHeight;
            loader.style.height = `${height}px`;
        }
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
                headers.visibleWidth = this.scheduleColWidth;
            }
            return;
        }

        super.updateCellWidth();
    }

    /**
     * Update the event occurrences offset. The offset is used to prevent the occurrences from overlaping when they are on the same time frame.
     */
    updateOccurrencesOffset() {
        // For each resource
        this.computedResources.forEach((resource) => {
            // Get all the event occurrences of the resource
            const occurrenceElements = Array.from(
                this.template.querySelectorAll(
                    `[data-element-id="avonni-primitive-scheduler-event-occurrence"][data-resource-name="${resource.name}"]:not([data-disabled="true"])`
                )
            );

            const resourceHeight = updateOccurrencesOffset.call(this, {
                occurrenceElements,
                isVertical: this.isVertical
            });
            if (resourceHeight) {
                resource.height = resourceHeight;
            }

            occurrenceElements.forEach((occElement) => {
                if (occElement.labels.right) {
                    // Hide the right label if it overflows the schedule
                    const elementRightBorder =
                        occElement.getBoundingClientRect().right +
                        occElement.rightLabelWidth;
                    const scheduleRightBorder =
                        this.scheduleBody.getBoundingClientRect().right;
                    if (elementRightBorder >= scheduleRightBorder) {
                        occElement.hideRightLabel();
                    } else {
                        occElement.showRightLabel();
                    }
                }
            });
        });
    }

    /**
     * Update the event occurrences position.
     */
    updateOccurrencesPosition() {
        updateOccurrencesPosition.call(this);

        if (this.isVertical) {
            // Set the reference line height to the width of the schedule
            const scheduleWidth =
                this.scheduleBody.getBoundingClientRect().width;
            this.scheduleBody.style = `
                --avonni-primitive-scheduler-event-reference-line-length: ${scheduleWidth}px
            `;
        }
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
        this.visibleComputedResources.forEach((resource) => {
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
     * Handle the datatable resize. Update the rows heights.
     *
     * @param {Event} event `resize` event fired by the datatable.
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
     * Handle a mouse down on an event. Select the event and prepare for it to be dragged or resized.
     *
     * * @param {Event} mouseEvent `privatemousedown` event fired by a primitive event occurrence.
     */
    handleEventMouseDown(mouseEvent) {
        this._mouseIsDown = true;
        const { x, y } = mouseEvent.detail;
        const resourceElement = this.getResourceElementFromPosition(x, y);
        this._eventData.handleExistingEventMouseDown(
            mouseEvent,
            resourceElement
        );
        this.dispatchHidePopovers();
    }

    /**
     * Handle the change of a header cell size. Set the cell width or height, depending on the orientation of the header.
     *
     * @param {Event} event `privatecellsizechange` event fired by a primitive header.
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
     * Handle a change of the primitive headers. Save the smallest unit header to a variable and make sure the datatable position will be updated on next render.
     *
     * @param {Event} event `privateheaderchange` event fired by the primitive header.
     */
    handleHeaderChange(event) {
        this.smallestHeader = event.detail.smallestHeader;

        // Update the start date in case it was not available
        this._start = this.smallestHeader.start;

        this.dispatchVisibleIntervalChange(this.start, this.visibleInterval);
        this.initEvents();
        this.updateVisibleResources();
        this._rowsHeight = [];
        this.headersAreLoading = false;

        requestAnimationFrame(() => {
            this.pushDatatableDown();
        });
    }

    /**
     * Handle a mouse down on an empty space. Prepare the timeline for a new event to be created on drag.
     *
     * @param {Event} event `mousedown` event fired by an empty cell or a disabled primitive event occurrence.
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
        const cell = this.isVertical
            ? getElementOnYAxis(resourceElement, y, CELL_SELECTOR)
            : getElementOnXAxis(resourceElement, x, CELL_SELECTOR);
        const resourceNames = [resourceElement.dataset.name];
        const from = Number(cell.dataset.start);
        const to = Number(cell.dataset.end) + 1;

        this._eventData.handleNewEventMouseDown({
            event,
            cellGroupElement: resourceElement,
            resourceNames,
            from,
            to,
            x,
            y
        });
    }

    /**
     * Handle a movement of the mouse. If an event is being clicked, compute its resizing or dragging.
     *
     * @param {Event} mouseEvent `mousemove` event fired by the calendar.
     */
    handleMouseMove(mouseEvent) {
        if (!this._mouseIsDown) {
            return;
        }

        // Prevent scrolling
        mouseEvent.preventDefault();

        this._eventData.handleMouseMove(mouseEvent);

        if (this._eventData.shouldInitDraggedEvent) {
            this.updateVisibleResources();
        }
    }

    /**
     * Handle a mouse up in the window. If an event was dragged or resize, save the change.
     *
     * @param {Event} event `mouseup` event.
     */
    handleMouseUp = (mouseEvent) => {
        if (!this._mouseIsDown) {
            return;
        }

        this._mouseIsDown = false;
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
            this.updateVisibleResources();
        }
    };

    /**
     * Handle a scroll of the timeline. Hide the popovers of the events that are scrolled out of the screen.
     *
     * @param {Event} event `scroll` event fired by the right panel.
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

        if (this.isVertical) {
            // Create an artificial scroll for the vertical headers
            const verticalHeaders = this.template.querySelector(
                '[data-element-id="div-vertical-header-wrapper"]'
            );
            verticalHeaders.scroll(0, event.currentTarget.scrollTop);
        }
    }
}
