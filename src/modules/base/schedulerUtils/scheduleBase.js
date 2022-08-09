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
    dateTimeObjectFrom,
    deepCopy,
    getStartOfWeek,
    normalizeArray,
    normalizeBoolean,
    normalizeString
} from 'c/utilsPrivate';
import {
    DEFAULT_AVAILABLE_DAYS_OF_THE_WEEK,
    DEFAULT_AVAILABLE_MONTHS,
    DEFAULT_AVAILABLE_TIME_FRAMES,
    DEFAULT_DATE_FORMAT,
    DEFAULT_EVENTS_LABELS,
    DEFAULT_NEW_EVENT_TITLE,
    DEFAULT_TIME_SPAN,
    EDIT_MODES,
    EVENTS_THEMES
} from './defaults';
import EventData from './eventData';
import { getDisabledWeekdays, getFirstAvailableWeek } from './dateComputations';

export class ScheduleBase extends LightningElement {
    @api loadingStateAlternativeText;

    _availableDaysOfTheWeek = DEFAULT_AVAILABLE_DAYS_OF_THE_WEEK;
    _availableMonths = DEFAULT_AVAILABLE_MONTHS;
    _availableTimeFrames = DEFAULT_AVAILABLE_TIME_FRAMES;
    _availableTimeSpans = [];
    _collapseDisabled = false;
    _dateFormat = DEFAULT_DATE_FORMAT;
    _events = [];
    _eventsLabels = DEFAULT_EVENTS_LABELS;
    _eventsTheme = EVENTS_THEMES.default;
    _newEventTitle = DEFAULT_NEW_EVENT_TITLE;
    _readOnly = false;
    _recurrentEditModes = EDIT_MODES;
    _resizeColumnDisabled = false;
    _resources = [];
    _selectedResources = [];
    _timeSpan = DEFAULT_TIME_SPAN;
    _zoomToFit = false;

    _connected = false;
    navCalendarDisabledWeekdays = [];
    _resizeObserver;
    navCalendarDisabledDates = [];

    connectedCallback() {
        this.initResources();
        this.initLeftPanelCalendarDisabledDates();
        this._connected = true;
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
        const days = deepCopy(normalizeArray(value)).sort((a, b) => a - b);
        this._availableDaysOfTheWeek =
            days.length > 0 ? days : DEFAULT_AVAILABLE_DAYS_OF_THE_WEEK;

        if (this._connected) {
            this._eventData.updateAllEventsDefaults();
            this.initLeftPanelCalendarDisabledDates();
        }
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
        const months = deepCopy(normalizeArray(value)).sort((a, b) => a - b);
        this._availableMonths =
            months.length > 0 ? months : DEFAULT_AVAILABLE_MONTHS;

        if (this._connected) {
            this._eventData.updateAllEventsDefaults();
        }
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

        if (this._connected) {
            this._eventData.updateAllEventsDefaults();
        }
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

        if (this._connected) {
            this._eventData.updateAllEventsDefaults();
        }
    }

    /**
     * If present, the schedule column is not collapsible or expandable.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get collapseDisabled() {
        return this._collapseDisabled;
    }
    set collapseDisabled(value) {
        this._collapseDisabled = normalizeBoolean(value);
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

        if (this._connected) {
            this.initEvents();
        }
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

        if (this._connected) {
            this._eventData.updateAllEventsDefaults();
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

        if (this._connected) {
            this._eventData.updateAllEventsDefaults();
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

        if (this._eventData) {
            this._eventData.newEventTitle = this._newEventTitle;
        }
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

        if (this._eventData) {
            this._eventData.recurrentEditModes = this._recurrentEditModes;
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

    get allowCollapse() {
        return !this.collapseDisabled;
    }

    get allowResizeColumn() {
        return !this.resizeColumnDisabled;
    }

    get firstSelectedResource() {
        return this.resources.find((res) => {
            return this.selectedResources.includes(res.name);
        });
    }

    get isDay() {
        const { span, unit } = this.timeSpan;
        return unit === 'day' && span < 7;
    }

    get isMonth() {
        const { span, unit } = this.timeSpan;
        const manyDays = unit === 'day' && span > 7;
        const manyWeeks = unit === 'week' && span > 1 && span <= 4;
        const oneMonth = unit === 'month' && span <= 1;
        return oneMonth || manyWeeks || manyDays;
    }

    get isWeek() {
        const { span, unit } = this.timeSpan;
        return (unit === 'week' && span <= 1) || (unit === 'day' && span === 7);
    }

    get isYear() {
        const { span, unit } = this.timeSpan;
        return unit === 'year' || (unit === 'month' && span > 1);
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    @api
    cleanSelection(cancelNewEvent) {
        this._eventData.cleanSelection(cancelNewEvent);
        this._eventData.refreshEvents();
    }

    @api
    createEvent(event) {
        this._eventData.createEvent(event);
    }

    @api
    deleteEvent(name) {
        this._eventData.deleteEvent(name);
    }

    @api
    focusEvent(name) {
        const event = this.template.querySelector(
            `[data-element-id="avonni-primitive-scheduler-event-occurrence"][data-event-name="${name}"]`
        );
        if (event) {
            event.focus();
        }
    }

    @api
    saveSelection(recurrenceMode) {
        const { event, occurrence } = this._eventData.selection;
        if (
            recurrenceMode === 'one' ||
            (event.recurrence && this.onlyOccurrenceEditAllowed)
        ) {
            this._eventData.saveOccurrence();
        } else {
            // Update the event with the selected occurrence values,
            // in case the selected occurrence had already been edited
            if (occurrence.from !== event.from) {
                event._from = occurrence.from;
            }
            if (occurrence.to !== event.to) {
                event._to = occurrence.to;
            }
            if (occurrence.title !== event.title) {
                event.title = occurrence.title;
            }
            if (occurrence.resourceNames !== event.resourceNames) {
                event.resourceNames = occurrence.resourceNames;
            }

            // Update the event with the draft values from the edit form
            this._eventData.saveEvent();
        }
        this._eventData.cleanSelection();
    }

    @api
    selectEvent(detail) {
        return this._eventData.selectEvent(detail);
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    initEvents() {
        this._eventData = new EventData(this, {
            availableDaysOfTheWeek: this.availableDaysOfTheWeek,
            availableMonths: this.availableMonths,
            availableTimeFrames: this.availableTimeFrames,
            events: this.events,
            eventsLabels: this.eventsLabels,
            eventsTheme: this.eventsTheme,
            newEventTitle: this.newEventTitle,
            recurrentEditModes: this.recurrentEditModes,
            selectedResources: this.selectedResources,
            visibleInterval: this.visibleInterval
        });
    }

    initLeftPanelCalendarDisabledDates() {
        const disabled = getDisabledWeekdays(this.availableDaysOfTheWeek);
        this.navCalendarDisabledWeekdays = disabled;
        this.navCalendarDisabledDates = [...disabled];
    }

    setStartToBeginningOfUnit() {
        this.setSelectedDateToAvailableDate();
        const unit = this.timeSpan.unit;

        let state;
        if (this.isDay) {
            state = 'START_OF_DAY';
        } else if (this.isWeek || (this.isMonth && unit !== 'month')) {
            state = 'START_OF_WEEK';
        } else if (this.isMonth && unit === 'month') {
            state = 'START_OF_MONTH_AND_WEEK';
        } else if (unit === 'month') {
            state = 'START_OF_MONTH';
        } else if (this.isYear) {
            state = 'START_OF_YEAR';
        }

        switch (state) {
            case 'START_OF_DAY':
                this.start = this.selectedDate.startOf('day');
                break;
            case 'START_OF_WEEK':
                this.start = getStartOfWeek(this.selectedDate);
                break;
            case 'START_OF_MONTH_AND_WEEK':
                this.start = this.selectedDate.startOf('month');
                if (this.start.weekday !== 7) {
                    // Make sure there are available days in the current week.
                    // Otherwise, go to the next week.
                    this.start = getFirstAvailableWeek(
                        this.start,
                        this.availableDaysOfTheWeek
                    );
                }
                this.start = getStartOfWeek(this.start);
                break;
            case 'START_OF_MONTH':
                this.start = this.selectedDate.startOf('month');
                break;
            case 'START_OF_YEAR':
                this.start = this.selectedDate.startOf('year');
                break;
            default:
                break;
        }
    }

    updateCellWidth() {
        const cell = this.template.querySelector(
            '[data-element-id="div-cell"]'
        );
        if (cell) {
            const cellWidth = cell.getBoundingClientRect().width;
            if (cellWidth !== this.cellWidth) {
                this.cellWidth = cellWidth;
                this._updateOccurrencesLength = true;
            }
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
     * Handle the dblclick event fired by an empty spot of the schedule or a disabled primitive event occurrence. Create a new event at this position and open the edit dialog.
     */
    handleDoubleClick(event) {
        if (this.readOnly) {
            return;
        }
        const x = event.clientX;
        const y = event.clientY;
        this.newEvent(x, y, true);

        this.dispatchOpenEditDialog(this._eventData.selection);
    }

    /**
     * Handle the contextmenu event fired by an empty spot of the schedule, or a disabled primitive event occurrence. Open the context menu and prepare for the creation of a new event at this position.
     */
    handleEmptySpotContextMenu(event) {
        event.preventDefault();

        const x = event.clientX;
        const y = event.clientY;
        this.newEvent(x, y);

        this.dispatchEvent(
            new CustomEvent('emptyspotcontextmenu', {
                detail: { selection: this._eventData.selection }
            })
        );
    }

    /**
     * Handle the privatecontextmenu event fired by a primitive event occurrence. Select the event and open its context menu.
     */
    handleEventContextMenu(event) {
        const target = event.currentTarget;
        if (target.disabled || target.referenceLine) {
            return;
        }

        this.dispatchEvent(
            new CustomEvent('eventcontextmenu', { detail: event.detail })
        );
    }

    /**
     * Handle the privatedblclick event fired by a primitive event occurrence. Open the edit dialog for this event.
     */
    handleEventDoubleClick(event) {
        if (this.readOnly) {
            return;
        }
        this._eventData.cleanSelection(true);
        this.selectEvent(event.detail);
        this.dispatchHidePopovers();
        this.dispatchOpenEditDialog(this._eventData.selection);
    }

    /**
     * Handle the privatefocus event fired by a primitive event occurrence. Dispatch the eventselect event and trigger the behaviour a mouse movement would have.
     */
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

        this.dispatchEvent(
            new CustomEvent('eventselect', {
                detail,
                bubbles: true
            })
        );
        this.handleEventMouseEnter.call(this, event);
    }

    /**
     * Handle the privatemouseenter event fired by a primitive event occurrence. Select the hovered event and show the detail popover.
     */
    handleEventMouseEnter(event) {
        if (this._mouseIsDown) {
            return;
        }
        this.dispatchEvent(
            new CustomEvent('eventmouseenter', {
                detail: event.detail
            })
        );
    }

    handleHideDetailPopover() {
        this.dispatchHidePopovers(['detail']);
    }

    handleLeftPanelCalendarNavigate(event) {
        const date = new Date(event.detail.date);
        const month = date.getMonth();
        this.navCalendarDisabledDates = [...this.navCalendarDisabledWeekdays];

        if (!this.availableMonths.includes(month)) {
            for (let day = 1; day < 32; day++) {
                this.navCalendarDisabledDates.push(day);
            }
        }
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
                detail: {
                    name,
                    selectedResources: this.selectedResources
                }
            })
        );
    }

    dispatchEventChange(detail) {
        this.dispatchEvent(
            new CustomEvent('eventchange', {
                detail,
                bubbles: true
            })
        );
    }

    dispatchEventCreate(event) {
        this.dispatchEvent(
            new CustomEvent('eventcreate', {
                detail: {
                    event: {
                        from: event.from.toUTC().toISO(),
                        resourceNames: event.resourceNames,
                        name: event.name,
                        title: event.title,
                        to: event.to.toUTC().toISO()
                    }
                },
                bubbles: true
            })
        );
    }

    dispatchHidePopovers(list) {
        this.dispatchEvent(
            new CustomEvent('hidepopovers', {
                detail: { list }
            })
        );
    }

    dispatchOpenEditDialog(selection) {
        this.dispatchEvent(
            new CustomEvent('openeditdialog', {
                detail: {
                    selection
                }
            })
        );
    }

    dispatchOpenRecurrenceDialog(selection) {
        this.dispatchEvent(
            new CustomEvent('openrecurrencedialog', {
                detail: {
                    selection
                }
            })
        );
    }

    dispatchVisibleIntervalChange(start, visibleInterval) {
        this.dispatchEvent(
            new CustomEvent('visibleintervalchange', {
                detail: { start, visibleInterval }
            })
        );
    }
}
