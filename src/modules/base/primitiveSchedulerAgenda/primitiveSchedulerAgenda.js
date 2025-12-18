import { Interval } from 'c/luxon';
import { addToDate } from 'c/luxonDateTimeUtils';
import {
    getElementOnYAxis,
    isAllDay,
    isAllowedDay,
    nextAllowedDay,
    nextAllowedMonth,
    ScheduleBase,
    spansOnMoreThanOneDay
} from 'c/schedulerUtils';
import { classSet, normalizeBoolean, normalizeString } from 'c/utils';
import { api } from 'lwc';
import DayGroup from './dayGroup';

const DEFAULT_LABEL_NO_EVENTS_FOUND = 'No events for the selected date.';
const DEFAULT_SELECTED_DATE = new Date();
const SIDE_PANEL_POSITIONS = {
    valid: ['left', 'right'],
    default: 'left'
};

/**
 * Main part of the scheduler, when the selected display is "agenda".
 *
 * @class
 * @descriptor c-primitive-scheduler-agenda
 * @extends ScheduleBase
 */
export default class PrimitiveSchedulerAgenda extends ScheduleBase {
    _hideResourcesFilter = false;
    _hideSidePanel = false;
    _isMobileView = false;
    _labelNoEventsFound = DEFAULT_LABEL_NO_EVENTS_FOUND;
    _selectedDate = DEFAULT_SELECTED_DATE;
    _sidePanelPosition = SIDE_PANEL_POSITIONS.default;

    _computedEvents = [];
    computedGroups = [];
    start;

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        this.setStartToBeginningOfUnit();
        super.connectedCallback();
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Array of available days of the week. If present, the scheduler will only show the available days of the week. Defaults to all days being available.
     * The days are represented by a number, starting from 0 for Sunday, and ending with 6 for Saturday.
     * For example, if the available days are Monday to Friday, the value would be: `[1, 2, 3, 4, 5]`
     *
     * @type {number[]}
     * @public
     * @default [0, 1, ... , 5, 6]
     */
    @api
    get availableDaysOfTheWeek() {
        return super.availableDaysOfTheWeek;
    }
    set availableDaysOfTheWeek(value) {
        super.availableDaysOfTheWeek = value;

        if (this._connected) {
            this.setStartToBeginningOfUnit();
        }
    }

    /**
     * Array of available months. If present, the scheduler will only show the available months. Defaults to all months being available.
     * The months are represented by a number, starting from 0 for January, and ending with 11 for December.
     * For example, if the available months are January, February, June, July, August and December, the value would be: `[0, 1, 5, 6, 7, 11]`
     *
     * @type {number[]}
     * @public
     * @default [0, 1, … , 10, 11]
     */
    @api
    get availableMonths() {
        return super.availableMonths;
    }
    set availableMonths(value) {
        super.availableMonths = value;

        if (this._connected) {
            this.setStartToBeginningOfUnit();
        }
    }

    /**
     * If present, the resources filter is hidden.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get hideResourcesFilter() {
        return this._hideResourcesFilter;
    }
    set hideResourcesFilter(value) {
        this._hideResourcesFilter = normalizeBoolean(value);
    }

    /**
     * If present, the side panel will be hidden.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get hideSidePanel() {
        return this._hideSidePanel;
    }
    set hideSidePanel(value) {
        this._hideSidePanel = normalizeBoolean(value);
    }

    /**
     * If present, the mobile view is displayed.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get isMobileView() {
        return this._isMobileView;
    }
    set isMobileView(value) {
        this._isMobileView = normalizeBoolean(value);

        if (this._connected) {
            this.initEventGroups();
        }
    }

    /**
     * Message shown in the agenda display, when there are no events for the selected date.
     *
     * @type {string}
     * @default No events for the selected date.
     * @public
     */
    @api
    get labelNoEventsFound() {
        return this._labelNoEventsFound;
    }
    set labelNoEventsFound(value) {
        this._labelNoEventsFound =
            value && typeof value === 'string'
                ? value
                : DEFAULT_LABEL_NO_EVENTS_FOUND;
    }

    /**
     * Specifies the selected date/time on which the calendar should be centered. It can be a Date object, timestamp, or an ISO8601 formatted string.
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
        this._selectedDate = this.createDate(value)
            ? value
            : DEFAULT_SELECTED_DATE;

        if (this._connected) {
            this.setStartToBeginningOfUnit();

            if (!this.hideSidePanel) {
                this.initLeftPanelCalendarDisabledDates();
                this.initLeftPanelCalendarMarkedDates();
            }
        }
    }

    /**
     * Position of the side panel, relative to the schedule.
     *
     * @type {string}
     * @default left
     * @public
     */
    @api
    get sidePanelPosition() {
        return this._sidePanelPosition;
    }
    set sidePanelPosition(value) {
        this._sidePanelPosition = normalizeString(value, {
            fallbackValue: SIDE_PANEL_POSITIONS.default,
            validValues: SIDE_PANEL_POSITIONS.valid
        });
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
            this.setStartToBeginningOfUnit();
        }
    }

    /**
     * Time zone used, in a valid IANA format. If empty, the browser's time zone is used.
     *
     * @type {string}
     * @public
     */
    @api
    get timezone() {
        return super.timezone;
    }
    set timezone(value) {
        super.timezone = value;

        if (this._connected) {
            this.setStartToBeginningOfUnit();
            this.initLeftPanelCalendarDisabledDates();
            this.initEvents();
        }
    }

    /**
     * Day displayed as the first day of the week. The value has to be a number between 0 and 6, 0 being Sunday, 1 being Monday, and so on until 6.
     *
     * @type {number}
     * @default 0
     * @public
     */
    @api
    get weekStartDay() {
        return super.weekStartDay;
    }
    set weekStartDay(value) {
        super.weekStartDay = value;

        if (this._connected) {
            this.setStartToBeginningOfUnit();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Events computed by the `SchedulerEventData` class instance. The setter is called every time the events are refreshed in `_eventData`, allowing for the groups to be updated too.
     *
     * @type {object[]}
     */
    get computedEvents() {
        return this._computedEvents;
    }
    set computedEvents(value) {
        this._computedEvents = value;
        this.initEventGroups();
    }

    /**
     * Computed CSS classes for the day heading.
     *
     * @type {string}
     */
    get computedDayHeadingClass() {
        return classSet(
            'avonni-scheduler__agenda-day-heading slds-grid slds-wrap'
        ).add({
            'slds-grid_vertical-align-center slds-m-right_large ':
                !this.isMobileView,
            'slds-grid_vertical slds-m-right_medium': this.isMobileView
        });
    }

    /**
     * Computed CSS classes for the right panel.
     *
     * @type {string}
     */
    get computedMainSectionClass() {
        return classSet(
            'avonni-scheduler__main-border_top avonni-scheduler__main-border_bottom avonni-scheduler__main-section avonni-scheduler__second-col slds-scrollable'
        )
            .add({
                'avonni-scheduler__main-border_left':
                    this.hideSidePanel || this.sidePanelPosition === 'right',
                'avonni-scheduler__main-border_right':
                    this.hideSidePanel || this.sidePanelPosition === 'left'
            })
            .toString();
    }

    /**
     * Computed CSS classes for the side panel.
     *
     * @type {string}
     */
    get computedSidePanelClass() {
        return classSet(
            'avonni-scheduler__panel slds-scrollable avonni-scheduler__main-border_top avonni-scheduler__main-border_bottom'
        )
            .add({
                'avonni-scheduler__panel_collapsed': this._isCollapsed,
                'avonni-scheduler__panel_expanded': this._isExpanded,
                'avonni-scheduler__main-border_left':
                    this.sidePanelPosition === 'left' || !this.showSplitter,
                'avonni-scheduler__main-border_right':
                    this.sidePanelPosition === 'right' || !this.showSplitter
            })
            .toString();
    }

    /**
     * Computed CSS classes for the time container.
     *
     * @type {string}
     */
    get computedTimeContainerClass() {
        return classSet(
            'slds-size_1-of-5 slds-has-flexi-truncate avonni-scheduler__agenda-time'
        ).add({
            'avonni-scheduler__flex-col': !this.isMobileView
        });
    }

    /**
     * Computed resource options, displayed in the left panel as checkboxes.
     *
     * @type {object[]}
     */
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
     * True if the left side panel should be visible.
     *
     * @type {boolean}
     */
    get showLeftPanel() {
        return !this.hideSidePanel && this.sidePanelPosition === 'left';
    }

    /**
     * True if the right side panel should be visible.
     *
     * @type {boolean}
     */
    get showRightPanel() {
        return !this.hideSidePanel && this.sidePanelPosition === 'right';
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Add a new event to the agenda, without necessarily saving it.
     *
     * @param {number} x Position of the new event on the X axis.
     * @param {number} y Position of the new event on the Y axis.
     * @param {boolean} saveEvent If true, the event will be saved.
     * @public
     */
    @api
    newEvent(detail = {}) {
        if (!this.firstSelectedResource) {
            return null;
        }
        const boundaries = this._eventData.getDraggingBoundaries();
        const x = isNaN(detail.x) ? boundaries.x : detail.x;
        const y = isNaN(detail.y) ? boundaries.y : detail.y;
        const dayGroupElement = getElementOnYAxis(
            this.template,
            y,
            '[data-element-id="div-day-group"]'
        );
        const from = this.createDate(Number(dayGroupElement.dataset.start));
        const to = this.createDate(Number(dayGroupElement.dataset.end));
        const resourceNames = [this.firstSelectedResource.name];
        this._eventData.newEvent(
            { from, resourceNames, to, x, y },
            detail.saveEvent
        );
        return this._eventData.selection;
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Initialize the event groups.
     */
    initEventGroups() {
        // Add the occurrences to each day it crosses in the map
        const dayMap = {};
        this.computedEvents.forEach((event) => {
            event.occurrences.forEach((occ) => {
                const from = occ.from;
                const to = event.referenceLine ? from.endOf('day') : occ.to;
                const interval = Interval.fromDateTimes(from, to);
                const days = interval.count('days');
                let date = from;

                for (let i = 0; i < days; i++) {
                    const isVisible = this.visibleInterval.contains(date);
                    const isAllowed = isAllowedDay(
                        date,
                        this.availableDaysOfTheWeek
                    );
                    if (!isVisible || !isAllowed) {
                        // Do not display the days outside of the visible interval
                        date = addToDate(date, 'day', 1);
                        continue;
                    }

                    const ISODay = date.startOf('day').toISO();

                    if (!dayMap[ISODay]) {
                        dayMap[ISODay] = [];
                    }
                    dayMap[ISODay].push({
                        ...occ,
                        endsInLaterCell: to.day > date.day,
                        event,
                        startsInPreviousCell: from.day < date.day,
                        time: this.formatTime(event, from, to, occ),
                        to
                    });
                    date = addToDate(date, 'day', 1);
                }
            });
        });

        if (!Object.keys(dayMap).length) {
            this.computedGroups = [];
            return;
        }

        // Sort the days and create a group for each
        const days = Object.entries(dayMap).sort((a, b) => {
            return new Date(a[0]) - new Date(b[0]);
        });
        const groups = [];
        let currentMonth;
        days.forEach(([ISODay, events]) => {
            const date = this.createDate(ISODay);
            const today = this.createDate(new Date()).startOf('day');
            groups.push(
                new DayGroup({
                    date,
                    events,
                    isFirstDayOfMonth:
                        this.isYear && date.month !== currentMonth,
                    isToday: ISODay === today.toISO(),
                    isMobileView: this.isMobileView
                })
            );
            currentMonth = date.month;
        });
        this.computedGroups = groups;
    }

    /**
     * Initialize the events.
     */
    initEvents() {
        super.initEvents();
        this._eventData.smallestHeader = { unit: 'hour', span: 1 };
        this._eventData.isAgenda = true;
        this._eventData.initEvents();

        if (!this.hideSidePanel) {
            this.initLeftPanelCalendarMarkedDates();
        }
    }

    /**
     * Initialize the resources.
     */
    initResources() {
        this.computedResources = this.resources.map((res) => {
            return { ...res, height: 0, data: { res } };
        });
    }

    /**
     * Format an event time.
     *
     * @param {object} event Event of which the time should be formatted.
     * @param {DateTime} from Starting date of the event.
     * @param {DateTime} to Ending date of the event.
     * @returns {string} Formatted time describing the event duration.
     */
    formatTime(event, from, to, occurrence) {
        const endOfTo = occurrence.endOfTo;
        const startOfFrom = occurrence.startOfFrom;
        if (event.referenceLine || from.ts === to.ts) {
            return from.toFormat('t');
        } else if (
            isAllDay({
                event,
                from,
                to,
                endOfTo,
                startOfFrom
            })
        ) {
            return 'All Day';
        } else if (
            spansOnMoreThanOneDay({ event, from, to, endOfTo, startOfFrom })
        ) {
            return `${from.toFormat('dd LLL')} - ${to.toFormat('dd LLL')}`;
        }
        return `${from.toFormat('t')} - ${to.toFormat('t')}`;
    }

    /**
     * Set the selected date to the first available date.
     */
    setSelectedDateToAvailableDate() {
        this._selectedDate = nextAllowedMonth(
            this.selectedDate,
            this.availableMonths
        );
        this._selectedDate = nextAllowedDay(
            this.selectedDate,
            this.availableMonths,
            this.availableDaysOfTheWeek
        );
        if (!this.hideSidePanel) {
            this.initLeftPanelCalendarMarkedDates();
        }
    }

    /**
     * Set the starting date of the agenda.
     */
    setStartToBeginningOfUnit() {
        super.setStartToBeginningOfUnit();

        const { span, unit } = this.timeSpan;
        if (unit === 'month') {
            this.start = this.selectedDate.startOf('month');
        }

        const end = this.createDate(addToDate(this.start, unit, span) - 1);
        this.visibleInterval = Interval.fromDateTimes(this.start, end);
        this.dispatchVisibleIntervalChange(this.start, this.visibleInterval);
        this.initEvents();
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS AND DISPATCHERS
     * -------------------------------------------------------------
     */

    handleClick(event) {
        const { start, end } = event.currentTarget.dataset;
        this.dispatchScheduleClick({ from: start, to: end });
    }

    handleEmptySpotContextMenu(event) {
        if (!this.firstSelectedResource) {
            return;
        }

        super.handleEmptySpotContextMenu(event);
    }
}
