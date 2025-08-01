import {
    addToDate,
    getWeekNumber,
    intervalFrom,
    numberOfUnitsBetweenDates
} from 'c/luxonDateTimeUtils';
import { AvonniResizeObserver } from 'c/resizeObserver';
import {
    DEFAULT_ACTION_NAMES,
    getElementOnXAxis,
    getElementOnYAxis,
    isAllowedTime,
    nextAllowedDay,
    nextAllowedMonth,
    positionPopover,
    ScheduleBase,
    SchedulerEventOccurrence,
    spansOnMoreThanOneDay,
    updateOccurrencesOffset,
    updateOccurrencesPosition
} from 'c/schedulerUtils';
import {
    classSet,
    deepCopy,
    normalizeBoolean,
    normalizeObject,
    normalizeString
} from 'c/utils';
import { equal } from 'c/utilsPrivate';
import { api } from 'lwc';
import Column from './column';

const CELL_SELECTOR = '[data-element-id="div-cell"]';
const COLUMN_SELECTOR = '[data-element-id="div-column"]';
const DEFAULT_SELECTED_DATE = new Date();
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
const SIDE_PANEL_POSITIONS = {
    valid: ['left', 'right'],
    default: 'left'
};
const SPLITTER_BAR_WIDTH = 12;

/**
 * Main part of the scheduler, when the selected display is "calendar".
 *
 * @class
 * @descriptor c-primitive-scheduler-calendar
 * @extends ScheduleBase
 */
export default class PrimitiveSchedulerCalendar extends ScheduleBase {
    _hideResourcesFilter = false;
    _hideSidePanel = false;
    _selectedDate = DEFAULT_SELECTED_DATE;
    _sidePanelPosition = SIDE_PANEL_POSITIONS.default;

    _centerDraggedEvent = false;
    _dayHeadersLoading = true;
    _eventsAreRendering = false;
    _eventData;
    _hourHeadersLoading = true;
    _mouseIsDown = false;
    _popoverDate;
    _popoverPosition;
    _renderAnimationFrames = [];
    _resizeObserver;
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
    multiDayEventsCellGroup = new Column({});
    singleDayEvents = [];
    start = DEFAULT_SELECTED_DATE;
    visibleInterval;

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

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

        this.positionPopover();

        if (this.showLoading) {
            this.setLoaderHeight();
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
            this.initHeaders();
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
            this.initHeaders();
            this._dayHeadersLoading = false;
        }
    }

    /**
     * Array of available time frames. If present, the scheduler will only show the available time frames. Defaults to the full day being available.
     * Each time frame string must follow the pattern ‘start-end’, with start and end being ISO8601 formatted time strings.
     * For example, if the available times are from 10am to 12pm, and 2:30pm to 6:45pm, the value would be: `['10:00-11:59', '14:30-18:44']`
     *
     * @type {string[]}
     * @public
     * @default ['00:00-23:59']
     */
    @api
    get availableTimeFrames() {
        return super.availableTimeFrames;
    }
    set availableTimeFrames(value) {
        super.availableTimeFrames = value;

        if (this._connected) {
            this.initHeaders();
            this._dayHeadersLoading = false;
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
            const previousStart = this.start && this.start.ts;
            this.setStartToBeginningOfUnit();

            if (previousStart !== this.start.ts) {
                this.initHeaders();
                if (this.isYear) {
                    this.initEvents();
                }
                if (!this.hideSidePanel) {
                    this.initLeftPanelCalendarDisabledDates();
                    this.initLeftPanelCalendarMarkedDates();
                }
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
     * Object used to set the duration of the calendar. It should have two keys:
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
        const { unit, span } = normalizeObject(value);
        if (unit === this._timeSpan.unit && span === this._timeSpan.span) {
            return;
        }

        const previousDayHeadersTimeSpan = deepCopy(this.dayHeadersTimeSpan);
        const previousHourHeadersTimeSpan = deepCopy(this.hourHeadersTimeSpan);
        super.timeSpan = value;

        if (this._connected) {
            this.setStartToBeginningOfUnit();
            this.initHeaders();
            this.initEvents();

            // Make sure the headers stop loading when the time span has not changed
            if (equal(previousDayHeadersTimeSpan, this.dayHeadersTimeSpan)) {
                this._dayHeadersLoading = false;
            }
            if (equal(previousHourHeadersTimeSpan, this.hourHeadersTimeSpan)) {
                this._hourHeadersLoading = false;
            }

            // If the hour headers appear or disappear, the visible width changes
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    this.updateVisibleWidth();
                });
            });
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
            const previousStart = this.start && this.start.ts;
            this.setStartToBeginningOfUnit();

            if (!this.start || previousStart !== this.start.ts) {
                this.initHeaders();
                this.initLeftPanelCalendarDisabledDates();
            }
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Formatted available months, used to generate the calendars in the year view.
     *
     * @type {object[]}
     */
    get computedAvailableMonths() {
        const months = this.getVisibleMonths();
        return months.map((month) => {
            const luxonMonth = month + 1;
            const markedDates = this.getMonthMarkedDates(luxonMonth);
            const value =
                this.computedSelectedDate.month === luxonMonth
                    ? this.computedSelectedDate
                    : null;
            return {
                key: month,
                label: MONTHS[month],
                markedDates,
                value
            };
        });
    }

    /**
     * Computed CSS class for the cells grid.
     *
     * @type {string}
     */
    get computedCellsGridClass() {
        return classSet('slds-grid avonni-scheduler__flex-col slds-scrollable')
            .add({
                'slds-border_top slds-p-top_small avonni-scheduler-calendar__visible-scrollbar':
                    !this.isMonth,
                'avonni-scheduler__calendar-month-grid': this.isMonth
            })
            .toString();
    }

    /**
     * Computed CSS class for the column.
     *
     * @type {string}
     */
    get computedColumnClass() {
        return classSet('avonni-scheduler__calendar-column')
            .add({
                'avonni-scheduler__calendar-column_day':
                    this.isDay && this.timeSpan.unit === 1
            })
            .toString();
    }

    /**
     * Computed CSS class for the day header wrapper.
     *
     * @type {string}
     */
    get computedDayHeaderWrapperClass() {
        return classSet(
            'avonni-scheduler__flex-col slds-scrollable_y avonni-scheduler__calendar-horizontal-header'
        ).add({
            'avonni-scheduler-calendar__visible-scrollbar': !this.isMonth
        });
    }

    /**
     * Computed CSS class for the horizontal header wrapper.
     *
     * @type {string}
     */
    get computedHorizontalHeaderWrapperClass() {
        return classSet(
            'avonni-scheduler__calendar-day-header-wrapper slds-theme_default slds-is-relative slds-grid'
        )
            .add({
                'avonni-scheduler__calendar-day-header-wrapper_month':
                    this.isMonth
            })
            .toString();
    }

    /**
     * Computed CSS classes for the right panel.
     *
     * @type {string}
     */
    get computedMainPanelClass() {
        return classSet(
            'avonni-scheduler__main-border_top avonni-scheduler__main-border_bottom avonni-scheduler__main-section slds-scrollable'
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
     * Computed CSS classes for the schedule wrapper.
     *
     * @type {string}
     */
    get computedScheduleWrapperClass() {
        return classSet(
            'slds-grid avonni-primitive-scheduler-calendar__inherit-height'
        )
            .add({
                'slds-grid_vertical': !this.isYear,
                'slds-wrap slds-scrollable_y': this.isYear
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
            'slds-scrollable avonni-scheduler__panel avonni-scheduler__main-border_top avonni-scheduler__main-border_bottom'
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
     * Computed day headers, used by the horizontal primitive headers visible in the day, week and month view.
     *
     * @type {object[]}
     */
    get dayHeaders() {
        const isMonth =
            this.isMonth || (!this.isWeek && this.timeSpan.unit === 'week');
        const label = isMonth ? 'ccc' : 'ccc dd';
        return [
            {
                label,
                unit: 'day',
                span: 1
            }
        ];
    }

    /**
     * Computed visible time span, used by the horizontal primitive headers visible in the day, week and month view.
     *
     * @type {object}
     */
    get dayHeadersTimeSpan() {
        const oneDay = this.isDay && this.timeSpan.span <= 1;
        if (oneDay) {
            return this.hourHeadersTimeSpan;
        } else if (this.isWeek || this.isMonth) {
            return {
                unit: 'week',
                span: 1
            };
        }
        return {
            unit: 'day',
            span: this.timeSpan.span
        };
    }

    /**
     * Time span used by the vertical primitive headers visible in the day and week view.
     *
     * @type {object}
     */
    get hourHeadersTimeSpan() {
        return {
            unit: 'day',
            span: 1
        };
    }

    /**
     * Hour headers used by the vertical primitive headers visible in the day and week view.
     *
     * @type {object[]}
     */
    get hourHeaders() {
        return [
            {
                label: 'h a',
                unit: 'hour',
                span: 1
            }
        ];
    }

    /**
     * Start date to use for the hour headers. Prevent a 23 hour day on the spring time change day.
     *
     * @type {DateTime}
     */
    get hourHeadersStart() {
        const startOfDay = this.start.startOf('day');
        const endOfDay = this.start.endOf('day');
        const numberOfHours = numberOfUnitsBetweenDates(
            'hour',
            startOfDay,
            endOfDay
        );
        const isSpringTimeChange = numberOfHours < 24;
        return isSpringTimeChange
            ? addToDate(this.start, 'day', 1)
            : this.start;
    }

    /**
     * HTML element of the left panel content.
     *
     * @type {HTMLElement}
     */
    get leftPanelContent() {
        return this.template.querySelector(
            '[data-element-id="div-panel-content"]'
        );
    }

    /**
     * Computed events displayed in the main grid.
     *
     * @type {object[]}
     */
    get mainGridEvents() {
        return this.isMonth || this.isYear
            ? this.singleDayEvents.concat(this.multiDayEvents)
            : this.singleDayEvents;
    }

    /**
     * Variant of the main grid events.
     *
     * @type {string}
     */
    get mainGridEventVariant() {
        return this.isMonth ? 'calendar-month' : 'calendar-vertical';
    }

    /**
     * Computed header cells used by the multi-day primitive events visible in the day and week view.
     *
     * @type {object}
     */
    get multiDayEventHeaderCells() {
        if (!this.eventHeaderCells.xAxis) {
            return {};
        }
        // Normalize the end and start of the first and last cells
        const cells = [...this.eventHeaderCells.xAxis];
        const start = this.createDate(cells[0].start);
        const end = this.createDate(cells[cells.length - 1].end);
        cells[0].start = start.startOf('day').ts;
        cells[cells.length - 1].end = end.endOf('day').ts;
        return { xAxis: cells };
    }

    /**
     * True if the multi-day events are read-only.
     *
     * @type {boolean}
     */
    get multiDayEventReadOnly() {
        return this.readOnly || (this.isDay && this.timeSpan.span <= 1);
    }

    /**
     * HTML element of the multi-day events wrapper.
     *
     * @type {HTMLElement}
     */
    get multiDayWrapper() {
        return this.template.querySelector(
            '[data-element-id="div-multi-day-events-wrapper"]'
        );
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
     * HTML element of the popover.
     *
     * @type {HTMLElement}
     */
    get popoverElement() {
        return this.template.querySelector(
            '[data-element-id="avonni-primitive-scheduler-calendar-popover"]'
        );
    }

    /**
     * True if the primitive hour headers should be visible.
     *
     * @type {boolean}
     */
    get showHourHeaders() {
        return this.isDay || this.isWeek;
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
     * True if the loading spinner should be visible.
     *
     * @type {boolean}
     */
    get showLoading() {
        const headersAreLoading = this.isMonth
            ? this._dayHeadersLoading
            : this._dayHeadersLoading || this._hourHeadersLoading;
        return headersAreLoading || this._eventsAreRendering;
    }

    /**
     * True if the right side panel should be visible.
     *
     * @type {boolean}
     */
    get showRightPanel() {
        return !this.hideSidePanel && this.sidePanelPosition === 'right';
    }

    /**
     * True if the multi-day events should be visible.
     *
     * @type {boolean}
     */
    get showTopMultiDayEvents() {
        return (
            !this.isMonth &&
            this.multiDayEvents.length &&
            this.multiDayEventsCellGroup.cells
        );
    }

    /**
     * Timezone label, in the format GMT+0.
     *
     * @type {string}
     */
    get timezoneLabel() {
        const timezone = this.computedSelectedDate.toFormat('Z');
        return timezone === '+0' ? 'GMT' : `GMT${timezone}`;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Create a new event.
     *
     * @param {object} event New event object.
     * @public
     */
    @api
    createEvent(event) {
        super.createEvent(event);
        this.updateColumnEvents();
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
        this.updateColumnEvents();
    }

    /**
     * Add a new event to the grid, without necessarily saving it.
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
        const boundaries = this._eventData.getDraggingBoundaries(true);
        const x = isNaN(detail.x) ? boundaries.x : detail.x;
        const normalizedY = isNaN(detail.y) ? boundaries.y : detail.y;
        const column = getElementOnXAxis(this.template, x, COLUMN_SELECTOR);
        const cell = getElementOnYAxis(column, normalizedY, CELL_SELECTOR);
        const from = Number(cell.dataset.start);
        if (this.preventPastEventCreation && from < new Date()) {
            return null;
        }
        const to = Number(cell.dataset.end);
        const resourceNames = [this.firstSelectedResource.name];
        this._eventData.newEvent(
            { from, resourceNames, to, x, y: normalizedY },
            detail.saveEvent
        );
        return this._eventData.selection;
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
        this.updateColumnEvents();
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Center the calendars visible in the year view on their month.
     */
    centerCalendarsOnRightMonths() {
        const calendars = this.template.querySelectorAll(
            '[data-element-id="avonni-calendar-year-month"]'
        );
        const visibleMonths = this.getVisibleMonths();
        let date = this.createDate(this.start);
        let monthIndex = visibleMonths.findIndex((month) => {
            return month + 1 === date.month;
        });
        calendars.forEach((calendar) => {
            calendar.goToDate(date.ts);
            const nextMonth = visibleMonths[monthIndex + 1];
            monthIndex = nextMonth ? monthIndex + 1 : 0;
            date = date.set({ month: visibleMonths[monthIndex] + 1 });
        });
    }

    /**
     * Compute the reference cells of a column, in the month view. Each cell is one day long.
     *
     * @param {object} column Column of which the reference cells should be computed.
     * @param {DateTime} date Starting date of the column.
     * @param {number} minNumberOfCells Minimum number of cells in the column. It is used to make sure that if the first column includes cells from the previous month, the next columns will have the same amount of cells.
     */
    computeDayCells(column, date, minNumberOfCells) {
        const { unit, span } = this.timeSpan;
        const currentMonth =
            unit === 'month' ? addToDate(date, 'week', 1).month : null;
        const endOfTimeSpan = addToDate(this.start, unit, span);
        let notEnoughCells = true;
        let isInTimeSpan = true;

        while (notEnoughCells || isInTimeSpan) {
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
            if (unit === 'month') {
                const beginningOfJanuary =
                    date.month === 1 && currentMonth === 12;
                isInTimeSpan =
                    date.month <= currentMonth && !beginningOfJanuary;
            } else {
                isInTimeSpan = date < endOfTimeSpan;
            }
        }
    }

    /**
     * Compute the reference cells of a column in the day or week views. Each cell is one hour long.
     *
     * @param {object} column Column of which the reference cells should be computed.
     * @param {DateTime} date Starting date of the column.
     */
    computeHourCells(column, date) {
        const availableHours = this.getAvailableHours();
        availableHours.sort((a, b) => a - b);

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

    /**
     * Only used by the month view. Create copies of the given event occurrence, one for each subsequent week it spans on. These placeholders will be visible.
     *
     * @param {object} occ Event occurrence to be copied.
     * @param {object[]} cells Cells crossed by the occurrence.
     * @param {object} event Event the occurrence belongs to.
     * @returns {object[]} Placeholders created.
     */
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

            duplicate.weekStart = this.createDate(cells[i].start);
            placeholders.push(duplicate);
        }
        return placeholders;
    }

    /**
     * Get the available hours in one day.
     *
     * @returns {number[]} Available hours.
     */
    getAvailableHours() {
        let time = this.createDate(new Date());
        const availableHours = [];

        for (let i = 0; i < 24; i++) {
            if (isAllowedTime(time, this.availableTimeFrames)) {
                availableHours.push(time.hour);
            }
            time = addToDate(time, 'hour', 1);
        }
        return availableHours;
    }

    /**
     * Get the HTML element of a column from its position on the X axis.
     *
     * @param {number} x Position of the column on the X axis.
     * @param {boolean} isMultiDayColumn If true, the column is a multi-day column.
     * @returns {HTMLElement} HTML element of the column.
     */
    getColumnElementFromPosition(x, isMultiDayColumn) {
        const selector = isMultiDayColumn
            ? `[data-element-id="div-multi-day-events-wrapper"] ${CELL_SELECTOR}`
            : COLUMN_SELECTOR;
        return getElementOnXAxis(this.template, x, selector);
    }

    /**
     * Get the placeholders for the given occurrence, in a specific column.
     *
     * @param {boolean} isFirstCol True if the current column is the first one.
     * @param {object} col Column in which the placeholders should be created.
     * @param {object} event Event the occurrence belongs to.
     * @param {object} occ Occurrence of which the placeholders belong to.
     * @returns {object[]} Placeholders created.
     */
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
            placeholders = this.createVisibleMultiWeekPlaceholders(
                occ,
                cellsPassed,
                event
            );
            occ.copies = placeholders;
        } else {
            // Create hidden placeholders in any other cell
            cellsPassed.forEach((cell) => {
                let placeholderOccurrence = occ;
                if (occ.copies) {
                    const copy = occ.copies.find((cop) => {
                        return cell.weekNumber === getWeekNumber(cop.weekStart);
                    });
                    if (copy) {
                        // Always use the first column occurrence or visible placeholder
                        // as a reference for the other rows placeholders
                        placeholderOccurrence = copy;
                    }
                }
                placeholders.push(placeholderOccurrence);
            });
        }
        return placeholders;
    }

    /**
     * Get the multi-day placeholders present in a specific cell.
     *
     * @param {object} cell Cell in which the placeholders are.
     * @returns {object[]} Placeholders present in the cell.
     */
    getMultiDayPlaceholdersInCell(cell) {
        const placeholders = [];

        if (cell.events.length || cell.placeholders.length) {
            const cellStart = this.createDate(cell.start);
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

    /**
     * Get the visible week days displayed as columns in the day, week and month views.
     *
     * @param {DateTime} startDate Start date.
     * @returns {number[]} Array of the visible week days numbers.
     */
    getVisibleWeekdays(startDate) {
        const span = this.timeSpan.span;
        const oneDay = this.isDay && span <= 1;
        const weekday = startDate.weekday === 7 ? 0 : startDate.weekday;
        let availableDays = this.availableDaysOfTheWeek;

        if (oneDay) {
            availableDays = [weekday];
        } else if (this.isDay) {
            availableDays = [];
            let dayIndex = this.availableDaysOfTheWeek.findIndex(
                (dayNumber) => {
                    return dayNumber === weekday;
                }
            );
            for (let i = 0; i < span; i++) {
                availableDays.push(this.availableDaysOfTheWeek[dayIndex]);
                const nextDay = this.availableDaysOfTheWeek[dayIndex + 1];
                dayIndex = nextDay ? dayIndex + 1 : 0;
            }
        }
        return availableDays;
    }

    /**
     * Get the visible months displayed in the year view.
     *
     * @returns {number[]} Array of the visible months numbers.
     */
    getVisibleMonths() {
        const { unit, span } = this.timeSpan;
        if (unit === 'year') {
            return this.availableMonths;
        }

        const months = [];
        let monthIndex = this.availableMonths.findIndex((monthNumber) => {
            return monthNumber === this.start.month - 1;
        });
        for (let i = 0; i < span; i++) {
            months.push(this.availableMonths[monthIndex]);
            const nextMonth = this.availableMonths[monthIndex + 1];
            monthIndex = nextMonth ? monthIndex + 1 : 0;
        }
        return months;
    }

    /**
     * Hide the placeholders corresponding to the selected event occurrence.
     */
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
     * Initialize the event data.
     */
    initEvents() {
        const computeEvents = () => {
            super.initEvents();
            this._eventData.isCalendar = true;
            this._eventData.isVertical = true;
            this._eventData.smallestHeader = this.hourHeaders[0];
            this._eventData.initEvents();

            if (!this.hideSidePanel) {
                this.initLeftPanelCalendarMarkedDates();
            }

            if (this.isDay || this.isWeek) {
                // Create a cell group for the multi day events row
                const referenceCells = this.columns.map((col) => {
                    return {
                        start: col.start.ts,
                        end: col.end.ts - 1
                    };
                });
                this.multiDayEventsCellGroup = new Column({
                    referenceCells,
                    timezone: this.timezone
                });
                this._eventData.multiDayEventsCellGroup =
                    this.multiDayEventsCellGroup;
            }
            this.updateColumnEvents();
        };

        if (this.events.length > 20) {
            this._eventsAreRendering = true;
            this._renderAnimationFrames.forEach(cancelAnimationFrame);
            this._renderAnimationFrames[0] = requestAnimationFrame(() => {
                this._renderAnimationFrames[1] = requestAnimationFrame(() => {
                    this._eventsAreRendering = false;
                    computeEvents();
                });
            });
        } else {
            this._eventsAreRendering = false;
            computeEvents();
        }
    }

    /**
     * Initialize the headers.
     */
    initHeaders() {
        if (this.isYear) {
            this.initEvents();
            this._dayHeadersLoading = false;
            this._hourHeadersLoading = false;
            return;
        }

        this._dayHeadersLoading = true;
        this._hourHeadersLoading = true;

        // Reset the header cells used by the events to position themselves
        this.eventHeaderCells = {};

        // Start at the begining of the first day
        let startDate = this.createDate(this.start).startOf('day');

        // Create a column for each available day
        const columns = [];
        const availableDays = this.getVisibleWeekdays(startDate);

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
            columns.push(new Column({ ...column, timezone: this.timezone }));
        }
        this.columns = columns;

        if (this.isMonth) {
            this.initMonthTimeBoundaries();
        }
    }

    /**
     * Initialize the event header cells and the visible interval for the month view.
     */
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
        const end = this.createDate(lastCell.end);
        this.visibleInterval = intervalFrom(this.start, end);
    }

    /**
     * Initialize the screen resize observer.
     *
     * @returns {AvonniResizeObserver} Resize observer.
     */
    initResizeObserver() {
        const wrapper = this.template.querySelector(
            '[data-element-id="div-schedule-wrapper"]'
        );
        if (!wrapper) {
            return null;
        }
        const resizeObserver = new AvonniResizeObserver(wrapper, () => {
            if (this.isMonth) {
                this.updateCellHeight();
            }
            this.updateCellWidth();
            this.updateVisibleWidth();
        });
        if (this.leftPanelContent) {
            resizeObserver.observe(this.leftPanelContent);
        }
        return resizeObserver;
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
     * Check if a cell is disabled.
     *
     * @param {object} cell Cell to check.
     * @returns {boolean} True if the cell is disabled.
     */
    isDisabledCell(cell) {
        const start = Number(cell.dataset.start);
        if (this.isMonth && start) {
            const cellMonth = this.createDate(start).month - 1;
            if (!this.availableMonths.includes(cellMonth)) {
                return true;
            }
        }
        return false;
    }

    positionPopover() {
        const wrapper = this.template.querySelector(
            '[data-element-id="div-wrapper"]'
        );
        if (!this._popoverPosition || !this.popoverElement || !wrapper) {
            return;
        }
        positionPopover(
            wrapper.getBoundingClientRect(),
            this.popoverElement,
            this._popoverPosition,
            true
        );
    }

    /**
     * Align the horizontal headers with the end of the vertical headers.
     */
    setHorizontalHeadersSideSpacing() {
        const firstColumn = this.template.querySelector(
            '[data-element-id="div-horizontal-header-first-column"]'
        );
        if (!firstColumn) {
            return;
        }

        const verticalHeaders = this.template.querySelector(
            '[data-element-id="avonni-primitive-scheduler-header-group-vertical"]'
        );
        if (verticalHeaders) {
            // Align the horizontal headers with the vertical headers
            const width = verticalHeaders.getBoundingClientRect().width;
            firstColumn.style.width = `${width - 1}px`;
        } else {
            firstColumn.style.width = null;
        }
    }

    /**
     * Set the headers' loader height to the height of the left panel.
     */
    setLoaderHeight() {
        const loader = this.template.querySelector(
            '[data-element-id="div-loading-spinner"]'
        );
        if (loader && this.leftPanelContent) {
            loader.style.height = `${this.leftPanelContent.offsetWidth}px`;
        }
    }

    /**
     * Set the selected date to the first available date.
     */
    setSelectedDateToAvailableDate() {
        this._selectedDate = nextAllowedMonth(
            this.computedSelectedDate,
            this.availableMonths
        ).ts;
        if (this.isDay || this.isWeek) {
            this._selectedDate = nextAllowedDay(
                this.computedSelectedDate,
                this.availableMonths,
                this.availableDaysOfTheWeek
            ).ts;
        }
        if (!this.hideSidePanel) {
            this.initLeftPanelCalendarMarkedDates();
        }
    }

    /**
     * Set the starting date of the calendar.
     */
    setStartToBeginningOfUnit() {
        super.setStartToBeginningOfUnit();
        const { unit, span } = this.timeSpan;

        if (this.isYear) {
            // Compute the visible interval, since there is no primitive headers
            const endOfSpan = addToDate(this.start, unit, span) - 1;
            const end = this.createDate(endOfSpan);
            this.visibleInterval = intervalFrom(this.start, end);
            this.dispatchVisibleIntervalChange(
                this.start,
                this.visibleInterval
            );
        }
    }

    /**
     * Update the default cell height.
     */
    updateCellHeight() {
        const numberOfRows = this.columns[0].referenceCells.length;
        const wrapper = this.template.querySelector(
            '[data-element-id="div-main-wrapper"]'
        );
        const wrapperHeight = wrapper.getBoundingClientRect().height - 2;
        const dayHeaders = this.template.querySelector(
            '[data-element-id="avonni-primitive-scheduler-header-group-horizontal"]'
        );
        const dayHeadersHeight = dayHeaders.getBoundingClientRect().height;
        const availableHeight = wrapperHeight - dayHeadersHeight;
        this.cellHeight = availableHeight / numberOfRows;
        this.template.host.style = `
            --avonni-scheduler-cell-height: ${this.cellHeight}px;
        `;
    }

    /**
     * Update the column objects events and placeholders.
     */
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
                    return occurrence.firstAllowedWeekday === col.weekday;
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

    /**
     * Update the event occurrences offset in the day and week view.
     */
    updateDayAndWeekEventsOffset() {
        this.columns.forEach((column) => {
            // Update the single day occurrences offset
            const selector = `[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"][data-weekday="${column.weekday}"]`;
            this.updateOccurrencesOffset(column, selector, true);

            if (this.multiDayEvents.length) {
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
            } else {
                this.multiDayWrapper.style.height = `15px`;
            }
        });
    }

    /**
     * Update the event occurrences offset in the month view.
     */
    updateMonthEventsOffset() {
        this.columns.forEach((column) => {
            column.cells.forEach((cell) => {
                const selector = `[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"][data-weekday="${column.weekday}"][data-day="${cell.day}"][data-month="${cell.month}"]`;
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

    /**
     * Update the multi-day row object events.
     */
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

    /**
     * Update the given event occurrences offset. The offset is used to prevent the occurrences from overlaping when they are on the same time frame.
     *
     * @param {object} cellGroup Object containing the event occurrences to update. Valid keys are `events` and `disabledEvents`.
     * @param {string} selector Valid CSS selector to use to retreive one occurrence through a query selector.
     * @param {boolean} isSingleDayOccurrence If true, the grid is considered vertical (as for the single-day events), and the offset will be horizontal. Otherwise, the grid is considered horizontal (as for the multi-day events) and the offset will be vertical.
     * @returns {number} Cumulative row height, after all the occurrences have been layed down. Used to set the multi-day row height.
     */
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

    /**
     * Update the event occurrences position and set the cell width.
     */
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

    /**
     * Update the visible width of the calendar, used by the day headers in the day, week and month views.
     */
    updateVisibleWidth() {
        const wrapper = this.template.querySelector(
            '[data-element-id="div-wrapper"]'
        );
        const sidePanel = this.template.querySelector(
            '[data-element-id^="div-panel"]'
        );
        const schedule = this.template.querySelector(
            '[data-element-id="div-main-panel"]'
        );
        if (wrapper && schedule) {
            const hourHeader = this.template.querySelector(
                '[data-element-id="avonni-primitive-scheduler-header-group-vertical"]'
            );
            const multiDayWrapper = this.template.querySelector(
                '[data-element-id="div-day-header-wrapper"]'
            );
            const sidePanelWidth =
                this.hideSidePanel || !sidePanel ? 0 : sidePanel.offsetWidth;
            let scrollBarWidth =
                schedule.offsetWidth - schedule.clientWidth || 0;
            if (multiDayWrapper) {
                scrollBarWidth +=
                    multiDayWrapper.offsetWidth - multiDayWrapper.clientWidth;
            }
            const verticalHeaderWidth = hourHeader ? hourHeader.offsetWidth : 0;
            const splitterBarWidth =
                (this.collapseDisabled && this.resizeColumnDisabled) ||
                this.hideSidePanel
                    ? 0
                    : SPLITTER_BAR_WIDTH;

            this.dayHeadersVisibleWidth =
                wrapper.offsetWidth -
                sidePanelWidth -
                splitterBarWidth -
                verticalHeaderWidth -
                scrollBarWidth -
                1;
        }
    }

    /**
     * Toggle the "Show more" buttons visibility. The button is visible when the number of events visible in the cell is too important.
     */
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

    /**
     * Handle a click on a cell. Dispatch a schedule click event.
     *
     * @param {Event} event `click` event fired by a cell.
     */
    handleClick(event) {
        const { start, end } = event.target.dataset;
        this.dispatchScheduleClick({ from: start, to: end });
    }

    /**
     * Handle the close of the popover.
     *
     * @param {Event} event `click` event fired by the popover.
     */
    handleClosePopover(event) {
        if (this.isYear && this._popoverDate) {
            const activeElement = this.template.activeElement;
            const activeCalendar =
                this.isYear &&
                activeElement &&
                activeElement.dataset.elementId ===
                    'avonni-calendar-year-month';

            if (activeCalendar) {
                event.preventDefault();
                return;
            }

            requestAnimationFrame(() => {
                const calendar = this.template.querySelector(
                    `[data-element-id="avonni-calendar-year-month"][data-month="${
                        this._popoverDate.month - 1
                    }"]`
                );
                if (calendar) {
                    calendar.focusDate(this._popoverDate.ts);
                }
                this._popoverDate = null;
            });
        }
        this.popoverElement.classList.add('slds-hide');
        this._popoverPosition = null;
    }

    /**
     * Handle a double click on an empty space. Create a new event at this position and open the edit dialog.
     *
     * @param {Event} event `dblclick` event fired by an empty spot of the schedule or a disabled primitive event occurrence.
     */
    handleDoubleClick(event) {
        if (this.isDisabledCell(event.currentTarget)) {
            return;
        }
        super.handleDoubleClick(event);
    }

    /**
     * Handle a context menu action on an empty space. Open the context menu and prepare for the creation of a new event at this position.
     *
     * @param {Event} event `contextmenu` event fired by an empty spot of the schedule, or a disabled primitive event occurrence.
     */
    handleEmptySpotContextMenu(event) {
        if (
            !this.firstSelectedResource ||
            this.isDisabledCell(event.currentTarget)
        ) {
            return;
        }
        super.handleEmptySpotContextMenu(event);
    }

    /**
     * Handle a mouse down on an event. Select the event and prepare for it to be dragged or resized.
     *
     * @param {Event} mouseEvent `privatemousedown` event fired by a primitive event occurrence.
     */
    handleEventMouseDown(mouseEvent) {
        const x = mouseEvent.detail.x;
        const column = getElementOnXAxis(this.template, x, COLUMN_SELECTOR);

        if (this.preventPastEventCreation) {
            const y = mouseEvent.detail.y;
            const cell = getElementOnYAxis(column, y, CELL_SELECTOR);
            const to = Number(cell.dataset.end);
            const now = this.createDate(new Date());
            if (to < now.ts) {
                return;
            }
        }
        this._mouseIsDown = true;
        this._eventData.handleExistingEventMouseDown(mouseEvent, column);
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
            this.multiDayCellHeight = cellSize;

            try {
                this.template.host.style = `
                    --avonni-scheduler-cell-height: ${this.cellHeight}px;
                `;
            } catch (e) {
                // Prevents an error in Salesforce:
                // 'Cannot add property style, object is not extensible.'
                // The error seems to happen when the component is loading
                // and the host is not a Proxy yet.
            }
        } else {
            this.cellWidth = cellSize;
        }
    }

    /**
     * Handle a mouse down on a hidden event: in the month view "Show more" popover, or as a placeholder.
     *
     * @param {Event} mouseEvent
     */
    handleHiddenEventMouseDown(mouseEvent) {
        if (this.isYear) {
            return;
        }
        this._mouseIsDown = true;
        const key =
            mouseEvent.currentTarget.dataset.key || mouseEvent.detail.key;
        const draggedEvent = this.template.querySelector(
            `[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"][data-key="${key}"]`
        );
        const eventInfo = {
            currentTarget: draggedEvent,
            detail: mouseEvent.detail
        };
        this._eventData.handleExistingEventMouseDown(eventInfo);
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

    /**
     * Handle a change of the horizontal header. Update the visible interval with the new computed one.
     *
     * @param {Event} event `privateheaderchange` event fired by the horizontal "days" header.
     */
    handleHorizontalHeaderChange(event) {
        const { smallestHeader, visibleInterval } = event.detail;
        const { start, cells, unit, span } = smallestHeader;
        this._dayHeadersLoading = false;

        // Update the start date in case it was not available
        this.start = start;

        if (!this.isMonth) {
            this.eventHeaderCells.xAxis = cells;
            this.visibleInterval = visibleInterval;
        }
        this.dispatchVisibleIntervalChange(start, this.visibleInterval);
        const end = addToDate(start, unit, span) - 1;
        this.dayCellDuration = this.createDate(end).diff(start).milliseconds;

        this.initEvents();
        if (this.isMonth) {
            this.updateCellHeight();
        }
    }

    /**
     * Handle the click on the show more button of a month view cell.
     *
     * @param {Event} event `click` event.
     */
    handleMonthCellShowMoreClick(event) {
        const columnIndex = Number(event.currentTarget.dataset.columnIndex);
        const start = Number(event.currentTarget.dataset.start);
        const startDate = this.createDate(start);
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

        const date = this.createDate(start);
        this._popoverPosition = { x: buttonCenter, y: event.clientY };
        this.popoverElement.open({ events, label: date.toFormat('cccc d') });
        this.popoverElement.classList.remove('slds-hide');

        requestAnimationFrame(() => {
            this.positionPopover();
        });
    }

    /**
     * Handle a mouse down on an empty space. Prepare the calendar for a new event to be created on drag.
     *
     * @param {Event} event `mousedown` event fired by an empty cell or a disabled primitive event occurrence.
     */
    handleMouseDown(event) {
        if (
            event.button ||
            this.readOnly ||
            this.hiddenActions.includes(DEFAULT_ACTION_NAMES.add) ||
            !this.firstSelectedResource ||
            this.isMonth
        ) {
            return;
        }

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

        if (this.preventPastEventCreation) {
            const now = this.createDate(new Date());
            if (from < now.ts) {
                return;
            }
        }

        this._mouseIsDown = true;
        this.dispatchHidePopovers();
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
        this._showPlaceholderOccurrence = false;
        this._centerDraggedEvent = false;
        const x = mouseEvent.clientX;
        const y = mouseEvent.clientY;
        const { eventToDispatch, updateCellGroups } =
            this._eventData.handleMouseUp(x, y);

        switch (eventToDispatch) {
            case 'edit': {
                const prevented = this.dispatchOpenEditDialog(
                    this._eventData.selection
                );
                if (prevented) {
                    this._eventData.cleanSelection(true);
                }
                break;
            }
            case 'recurrence':
                this.dispatchOpenRecurrenceDialog(this._eventData.selection);
                break;
            default:
                break;
        }
        if (updateCellGroups) {
            this.updateColumnEvents();

            if (!eventToDispatch && this.preventPastEventCreation) {
                // Make sure the event position is reset if the drag was cancelled
                // because the event was moved before the current time
                this.singleDayEvents = [...this.singleDayEvents];
            }
        }
    };

    /**
     * Handle a mouse down on an empty space, in the multi-day row. Prepare the row for a new event being created on drag.
     *
     * @param {Event} event `mousedown` event fired by an empty cell or a disabled primitive event occurrence.
     */
    handleMultiDayEmptyCellMouseDown(event) {
        if (
            event.button ||
            this.readOnly ||
            this.hiddenActions.includes(DEFAULT_ACTION_NAMES.add) ||
            !this.firstSelectedResource
        ) {
            return;
        }

        const x = event.clientX || event.detail.x;
        const y = event.clientY || event.detail.y;
        const row = this.multiDayWrapper;
        const cell = getElementOnXAxis(row, x, CELL_SELECTOR);
        const from = Number(cell.dataset.start);
        const to = Number(cell.dataset.end) + 1;

        if (this.preventPastEventCreation) {
            const now = this.createDate(new Date());
            if (from < now.ts) {
                return;
            }
        }

        this._mouseIsDown = true;
        this.dispatchHidePopovers();
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

    /**
     * Handle a mouse down on a multi-day event. Select the event and prepare for it to be dragged or resized.
     *
     * @param {Event} event `privatemousedown` event fired by a multi-day event occurrence.
     */
    handleMultiDayEventMouseDown(event) {
        this._mouseIsDown = true;
        const row = this.multiDayWrapper;
        this._eventData.handleExistingEventMouseDown(event, row, false);
        this.dispatchHidePopovers();
    }

    /**
     * Handle a mouse down on a month view placeholder. If the placeholder is visible, select the event and prepare for it to be dragged or resized.
     *
     * @param {Event} event `privatemousedown` event fired by a placeholder event occurrence.
     */
    handlePlaceholderMouseDown(event) {
        const isVisible = event.currentTarget.dataset.columnIndex === '0';
        if (!isVisible) {
            return;
        }
        this._showPlaceholderOccurrence = true;
        this.handleHiddenEventMouseDown(event);
    }

    /**
     * Handle a change of the vertical primitive headers, corresponding to the hours in the week and day views.
     *
     * @param {Event} event
     */
    handleVerticalHeaderChange(event) {
        const { start, cells, unit, span } = event.detail.smallestHeader;
        this._hourHeadersLoading = false;

        // Update the start date in case it was not available
        if (start.hour !== this.hourHeadersStart.hour) {
            this.start =
                this.hourHeadersStart.ts === this.start.ts
                    ? start
                    : this.start.set({ hour: start.hour });
        }

        this.eventHeaderCells.yAxis = cells;
        const end = addToDate(start, unit, span) - 1;
        this.hourCellDuration = this.createDate(end).diff(start).milliseconds;
    }

    /**
     * Handle the change of month in a year calendar. The navigation can only occur using the keyboard. Make sure it is prevented and the calendar always show the month it is supposed to show.
     *
     * @param {Event} event
     */
    handleYearCalendarNavigate(event) {
        const calendar = event.currentTarget;
        const month = calendar.dataset.month;
        const date = this.start.set({ month: Number(month) + 1, day: 1 });
        calendar.goToDate(date.ts);
        calendar.focusDate(date.ts);
    }

    /**
     * Handle a click on the date of a year view calendar. Open the "Show more" popover.
     *
     * @param {Event} event
     */
    handleYearDateClick(event) {
        const date = this.createDate(event.detail.clickedDate);
        this._selectedDate = date.ts;
        this.initLeftPanelCalendarMarkedDates();
        const { x, y, width, height } = event.detail.bounds;

        const events = [];
        this._eventData.events.forEach((ev) => {
            ev.occurrences.forEach((occ) => {
                // If the event is a reference line,
                // use the start date as an end date too
                const to = occ.to ? occ.to : occ.from;
                const interval = intervalFrom(occ.from, to);
                const day = intervalFrom(
                    date.startOf('day'),
                    date.endOf('day')
                );
                if (interval.overlaps(day)) {
                    events.push({
                        ...occ,
                        event: ev,
                        startsInPreviousCell:
                            occ.from.startOf('day') < date.startOf('day'),
                        endsInLaterCell: to.endOf('day') > date.endOf('day')
                    });
                }
            });
        });

        this._popoverPosition = {
            x: x + width / 2,
            y: y + height / 2
        };
        this._popoverDate = date;
        this.popoverElement.open({
            events,
            label: date.toFormat('LLLL d')
        });
        this.popoverElement.classList.remove('slds-hide');
        requestAnimationFrame(() => {
            this.positionPopover();
        });
    }
}
