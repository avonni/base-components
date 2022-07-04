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

import { LightningElement, api, track } from 'lwc';
import {
    addToDate,
    dateTimeObjectFrom,
    deepCopy,
    normalizeArray,
    normalizeBoolean,
    normalizeString
} from 'c/utilsPrivate';
import { classSet } from 'c/utils';
import {
    DEFAULT_AVAILABLE_TIME_FRAMES,
    DEFAULT_AVAILABLE_DAYS_OF_THE_WEEK,
    DEFAULT_AVAILABLE_MONTHS,
    DEFAULT_DATE_FORMAT,
    DEFAULT_EVENTS_LABELS,
    DEFAULT_NEW_EVENT_TITLE,
    DEFAULT_START_DATE,
    DEFAULT_TIME_SPAN,
    EDIT_MODES,
    EVENTS_THEMES,
    HEADERS,
    PRESET_HEADERS,
    UNITS,
    VARIANTS
} from './defaults';
import { AvonniResizeObserver } from 'c/resizeObserver';
import SchedulerTimelineResource from './resource';
import SchedulerTimelineEventData from './eventData';

export default class PrimitiveSchedulerTimeline extends LightningElement {
    _availableDaysOfTheWeek = DEFAULT_AVAILABLE_DAYS_OF_THE_WEEK;
    _availableMonths = DEFAULT_AVAILABLE_MONTHS;
    _availableTimeFrames = DEFAULT_AVAILABLE_TIME_FRAMES;
    _availableTimeSpans = [];
    _columns = [];
    _dateFormat = DEFAULT_DATE_FORMAT;
    _events = [];
    _newEventTitle = DEFAULT_NEW_EVENT_TITLE;
    _readOnly = false;
    _recurrentEditModes = EDIT_MODES;
    _resizeColumnDisabled = false;
    _resources = [];
    _start = DEFAULT_START_DATE;
    _timeSpan = DEFAULT_TIME_SPAN;
    _variant = VARIANTS.default;
    _zoomToFit = false;

    _draggedSplitter;
    _eventData;
    _headersAreLoading = true;
    _initialFirstColWidth;
    _initialStatep = {};
    _isConnected = false;
    _mouseIsDown = false;
    _rowsHeight = [];
    _updateOccurrencesLength = false;
    cellWidth = 0;
    computedHeaders = [];
    @track computedEvents = [];
    computedResources = [];
    firstColumnIsHidden = false;
    firstColumnIsOpen = false;
    firstColWidth = 0;
    selection;
    smallestHeader;

    connectedCallback() {
        this.initHeaders();
        this.initResources();
        this._eventData = new SchedulerTimelineEventData(this);
        this._isConnected = true;
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
        this.updateResourcesStyle();
        this.updateOccurrencesPosition();

        if (!this._resizeObserver) {
            this._resizeObserver = this.initResizeObserver();
        }
    }

    disconnectedCallback() {
        if (this._resizeObserver) {
            this._resizeObserver.disconnect();
        }
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
     * Labels of the events. Valid keys include:
     * * top
     * * bottom
     * * left
     * * right
     * * center
     * The value of each key should be a label object.
     * Not supported for vertical variant.
     *
     * @type {object}
     * @public
     * @default {
     *   center: {
     *      fieldName: 'title'
     *   }
     * }
     */
    @api
    get eventsLabels() {
        return this._eventsLabels;
    }
    set eventsLabels(value) {
        this._eventsLabels =
            typeof value === 'object' ? value : DEFAULT_EVENTS_LABELS;

        if (this._isConnected) {
            this._eventData.updateAllEventsDefaults();
            this.computedEvents = [...this.computedEvents];
        }
    }

    /**
     * Theme of the events. Valid values include default, transparent, line, hollow and rounded.
     *
     * @type {string}
     * @public
     * @default default
     */
    @api
    get eventsTheme() {
        return this._eventsTheme;
    }
    set eventsTheme(value) {
        this._eventsTheme = normalizeString(value, {
            fallbackValue: EVENTS_THEMES.default,
            validValues: EVENTS_THEMES.valid
        });

        if (this._isConnected) {
            this._eventData.updateAllEventsDefaults();
            this.computedEvents = [...this.computedEvents];
        }
    }

    /**
     * Default title of the new events.
     *
     * @type {string}
     * @public
     * @default New event
     */
    @api
    get newEventTitle() {
        return this._newEventTitle;
    }
    set newEventTitle(value) {
        this._newEventTitle =
            typeof value === 'string' ? value : DEFAULT_NEW_EVENT_TITLE;
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
     * Allowed edition modes for recurring events. Available options are:
     * * `all`: All recurrent event occurrences will be updated when a change is made to one occurrence.
     * * `one`: Only the selected occurrence will be updated when a change is made.
     *
     * @type {string[]}
     * @public
     * @default ['all', 'one']
     */
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

    /**
     * Array of resource objects. The resources can be bound to events.
     *
     * @type {object[]}
     * @public
     * @required
     */
    @api
    get resources() {
        return this._resources;
    }
    set resources(value) {
        this._resources = normalizeArray(value, 'object');

        if (this._isConnected) {
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
        return this._timeSpan;
    }
    set timeSpan(value) {
        this._timeSpan = typeof value === 'object' ? value : DEFAULT_TIME_SPAN;

        if (this._isConnected) {
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
     * First column HTML Element. It contains the datatable (horizontal variant) or the headers (vertical variant).
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
     * Position and dimensions of the schedule body.
     *
     * @type {object}
     */
    get timelinePosition() {
        const scheduleElement = this.template.querySelector(
            '[data-element-id="div-schedule-body"]'
        );
        return scheduleElement.getBoundingClientRect();
    }

    /**
     * Width of the first column (horizontal variant) or height of the header row (vertical variant). Used by the events to make the labels sticky.
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

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    initEvents() {
        this._eventData.initEvents();
        this.computedEvents = this._eventData.events;
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
            '[data-element-id="div-schedule-body"]'
        );
        resizeObserver.observe(schedule);
        return resizeObserver;
    }

    initResources() {
        this.computedResources = this.resources.map((res) => {
            const name = res.name;
            const cells = this.smallestHeader && this.smallestHeader.cells;
            const resource = new SchedulerTimelineResource({
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
     * Push an event occurrence down a level, until it doesn't overlap another occurrence.
     *
     * @param {object[]} previousOccurrences Array of previous occurrences for which the level has already been computed.
     * @param {number} startPosition Start position of the evaluated occurrence, on the X axis (horizontal variant) or the Y axis (vertical variant).
     * @param {number} level Level of the occurrence in their resource. It starts at 0, so the occurrence is at the top (horizontal variant) or the left (vertical variant) of its resource.
     * @returns {object} Object with two keys:
     * * level (number): level of the event occurrence in the resource.
     * * numberOfOverlap (number): Total of occurrences overlaping, including the evaluated one.
     */
    computeEventLevelInResource(previousOccurrences, startPosition, level = 0) {
        // Find the last event with the same level
        const sameLevelEvent = previousOccurrences.find((occ) => {
            return occ.level === level;
        });

        const overlapsEvent =
            sameLevelEvent && startPosition < sameLevelEvent.end;
        if (overlapsEvent) {
            level += 1;

            // Make sure there isn't another event at the same position
            level = this.computeEventLevelInResource(
                previousOccurrences,
                startPosition,
                level
            ).level;
        }

        let numberOfOverlap = level + 1;
        if (this.isVertical) {
            numberOfOverlap = this.getTotalOfOccurrencesOverlapping(
                previousOccurrences,
                startPosition,
                numberOfOverlap
            );
        }

        return { level, numberOfOverlap };
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
     * Find a resource element from its position in the schedule.
     *
     * @param {number} position A position on the resource to find, on the Y axis (horizontal variant) or the X axis (vertical variant).
     * @returns {(HTMLElement|undefined)} The resource `<div>` element or undefined.
     */
    getResourceElementFromPosition(position) {
        const resources = Array.from(
            this.template.querySelectorAll('[data-element-id="div-resource"]')
        );
        return resources.find((div) => {
            const divPosition = div.getBoundingClientRect();
            const start = this.isVertical ? divPosition.left : divPosition.top;
            const end = this.isVertical
                ? divPosition.right
                : divPosition.bottom;

            return position >= start && position <= end;
        });
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
     * Get the total number of event occurrences that overlap one.
     *
     * @param {object[]} previousOccurrences The computed occurrences that appear before the current one.
     * @param {number} startPosition Start position of the evaluated occurrence, on the X axis (horizontal variant) or the Y axis (vertical variant).
     * @param {number} numberOfOverlap Minimum overlapped occurrences. This number correspond to the occurrence level + 1.
     * @returns {number} The total number of occurrences overlapping, including the one evaluated.
     */
    getTotalOfOccurrencesOverlapping(
        previousOccurrences,
        startPosition,
        minOverlap
    ) {
        let numberOfOverlap = minOverlap;

        const overlappingOccurrences = previousOccurrences.filter((occ) => {
            return startPosition < occ.end;
        });

        overlappingOccurrences.forEach((occ) => {
            if (occ.numberOfOverlap >= numberOfOverlap) {
                numberOfOverlap = occ.numberOfOverlap;
            } else {
                // Update the total of levels of the overlapped event occurrence
                occ.numberOfOverlap = numberOfOverlap;
                numberOfOverlap = this.getTotalOfOccurrencesOverlapping(
                    previousOccurrences,
                    occ.start,
                    numberOfOverlap
                );
            }
        });

        return numberOfOverlap;
    }

    /**
     * Vertically align the datatable header with the smallest unit schedule header.
     */
    pushLeftColumnDown() {
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

        const cell = this.template.querySelector(
            '[data-element-id="div-cell"]'
        );
        if (!cell) return;
        const cellWidth = cell.getBoundingClientRect().width;
        if (cellWidth !== this.cellWidth) {
            this.cellWidth = cellWidth;
            this._updateOccurrencesLength = true;
        }
    }

    /**
     * Set the default properties of the given event.
     *
     * @param {object} event The event object.
     */
    updateEventDefaults(event) {
        // We store the initial event object in a variable,
        // in case a custom field is used by the labels
        event.data = { ...event };
        event.schedulerEnd = this.visibleInterval.e;
        event.schedulerStart = this.visibleInterval.s;
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

    /**
     * Prevent the events from overlapping. In the horizontal variant, compute the vertical position of the events and the rows height. In the vertical variant, compute the horizontal position of the events.
     */
    updateOccurrencesOffset() {
        const scheduleRightBorder = this.timelinePosition.right;

        // For each resource
        this.computedResources.forEach((resource) => {
            let rowHeight = 0;
            let levelHeight = 0;

            // Get all the event occurrences of the resource
            const occurrenceElements = Array.from(
                this.template.querySelectorAll(
                    `.avonni-scheduler__primitive-event[data-resource-name="${resource.name}"]`
                )
            );

            if (occurrenceElements.length) {
                // Sort the occurrences by ascending start date
                occurrenceElements.sort((a, b) => a.from - b.from);

                // Compute the level of the occurrences in the resource
                const previousOccurrences = [];
                occurrenceElements.forEach((occElement) => {
                    const start = occElement.startPosition;
                    const { level, numberOfOverlap } =
                        this.computeEventLevelInResource(
                            previousOccurrences,
                            start
                        );

                    const occurrence = resource.events.find((occ) => {
                        return occ.key === occElement.occurrenceKey;
                    });

                    previousOccurrences.unshift({
                        level,
                        numberOfOverlap,
                        start,
                        end: occElement.endPosition,
                        occurrence:
                            occurrence ||
                            (this.selection && this.selection.occurrence)
                    });

                    if (!this.isVertical) {
                        if (occElement.labels.right) {
                            // Hide the right label if it overflows the schedule
                            const elementRightBorder =
                                occElement.getBoundingClientRect().right +
                                occElement.rightLabelWidth;
                            if (elementRightBorder >= scheduleRightBorder) {
                                occElement.hideRightLabel();
                            } else {
                                occElement.showRightLabel();
                            }
                        }

                        // If the occurrence is taller than the previous ones,
                        // update the default level height
                        const height =
                            occElement.getBoundingClientRect().height;
                        if (height > levelHeight) {
                            levelHeight = height;
                        }
                    }
                });

                // Add the corresponding offset to the top (horizontal variant)
                // or left (vertical variant) of the occurrences
                previousOccurrences.forEach((position) => {
                    const { level, occurrence, numberOfOverlap } = position;
                    let offsetSide = 0;

                    if (this.isVertical) {
                        offsetSide = (level * this.cellWidth) / numberOfOverlap;
                        occurrence.numberOfEventsInThisTimeFrame =
                            numberOfOverlap;
                        this._updateOccurrencesLength = true;
                    } else {
                        offsetSide = level * levelHeight;

                        // If the occurrence offset is bigger than the previous occurrences,
                        // update the row height
                        const totalHeight = levelHeight + offsetSide;
                        if (totalHeight > rowHeight) {
                            rowHeight = totalHeight;
                        }
                    }

                    occurrence.offsetSide = offsetSide;
                });
            }

            if (!this.isVertical) {
                // Add 10 pixels to the row for padding
                resource.height = rowHeight + 10;
            }
        });
    }

    /**
     * Update the primitive occurrences height, width and position.
     */
    updateOccurrencesPosition() {
        const eventOccurrences = this.template.querySelectorAll(
            '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
        );
        eventOccurrences.forEach((occurrence) => {
            if (this._updateOccurrencesLength) {
                occurrence.updateLength();
            }
            if (occurrence.disabled) {
                occurrence.updateThickness();
            }
            occurrence.updatePosition();
        });
        this._updateOccurrencesLength = false;

        if (this.isVertical) {
            // Set the reference line height to the width of the schedule
            const schedule = this.template.querySelector(
                '[data-element-id="div-schedule-body"]'
            );
            const scheduleWidth = this.timelinePosition.width;
            schedule.style = `
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
        const { mouseX, mouseY } = mouseEvent.detail;
        const resourceAxis = this.isVertical ? mouseX : mouseY;
        const resourceElement =
            this.getResourceElementFromPosition(resourceAxis);
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

        this.initEvents();
        this.updateVisibleResources();
        this._initialFirstColWidth = 0;
        this._rowsHeight = [];

        requestAnimationFrame(() => {
            this.pushLeftColumnDown();
            this._headersAreLoading = false;
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
        const headersAxisPosition = this.isVertical ? x : y;
        const resourceElement =
            this.getResourceElementFromPosition(headersAxisPosition);
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
                // A new event is being created by dragging.
                // On the first move, display the event on the timeline.
                this.computedEvents = [...this._eventData.events];
                this.updateVisibleResources();

                requestAnimationFrame(() => {
                    this._eventData.setDraggedEvent();
                });
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

            if (eventToDispatch) {
                this.dispatchEvent(new CustomEvent(eventToDispatch));
            }
            if (updateResources) {
                this.updateVisibleResources();
            }
        }
    }

    dispatchHidePopovers(list) {
        this.dispatchEvent(
            new CustomEvent('hidepopovers', {
                detail: { list }
            })
        );
    }
}
