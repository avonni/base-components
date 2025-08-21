import {
    DateTime,
    getFormattedDate,
    getStartOfWeek,
    setDate
} from 'c/dateTimeUtils';
import {
    classSet,
    deepCopy,
    generateUUID,
    normalizeArray,
    normalizeBoolean,
    normalizeString
} from 'c/utils';
import { equal, keyValues } from 'c/utilsPrivate';
import { LightningElement, api } from 'lwc';
import CalendarDate from './date';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DEFAULT_MAX = new Date(2099, 11, 31);
const DEFAULT_MIN = new Date(1900, 0, 1);
const DEFAULT_NEXT_MONTH_BUTTON_ALTERNATIVE_TEXT = 'Next Month';
const DEFAULT_PREVIOUS_MONTH_BUTTON_ALTERNATIVE_TEXT = 'Previous Month';
const DEFAULT_YEAR_SELECT_ASSISTIVE_TEXT = 'Pick a year';
const DEFAULT_DATE = new Date(new Date().setHours(0, 0, 0, 0));
const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
const NULL_DATE = new Date('12/31/1969').setHours(0, 0, 0, 0);
const SELECTION_MODES = {
    valid: ['single', 'multiple', 'interval'],
    default: 'single'
};

/**
 * @class
 * @name Calendar
 * @descriptor avonni-calendar
 * @storyId example-calendar--base
 * @public
 */
export default class Calendar extends LightningElement {
    /**
     * The alternative text for the next month button.
     *
     * @public
     * @type {string}
     */
    @api nextMonthButtonAlternativeText =
        DEFAULT_NEXT_MONTH_BUTTON_ALTERNATIVE_TEXT;
    /**
     * The alternative text for the previous month button.
     *
     * @public
     * @type {string}
     */
    @api previousMonthButtonAlternativeText =
        DEFAULT_PREVIOUS_MONTH_BUTTON_ALTERNATIVE_TEXT;
    /**
     * The assistive text for the year select.
     *
     * @public
     * @type {string}
     */
    @api yearSelectAssistiveText = DEFAULT_YEAR_SELECT_ASSISTIVE_TEXT;

    _dateLabels = [];
    _disabled = false;
    _disabledDates = [];
    _hideNavigation = false;
    _markedDates = [];
    _max = DEFAULT_MAX;
    _min = DEFAULT_MIN;
    _selectionMode = SELECTION_MODES.default;
    _timezone;
    _value;
    _weekNumber = false;

    _computedDateLabels = [];
    _computedDisabledDates = [];
    _computedMarkedDates = [];
    _computedMax;
    _computedMin;
    _computedValue = [];
    _connected = false;
    _focusDate;
    calendarData;
    day;
    displayDate; // The calendar displays this date's month
    month;
    months = MONTHS;
    year;

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        this.initDates();
        this.initDisplayDate();
        this.validateCurrentDayValue();
        this.updateDateParameters();
        this.computeFocus(false);
        this._connected = true;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Array of date label objects. If a date has several labels, the first one in the array will be used.
     *
     * @public
     * @type {object[]}
     */
    @api
    get dateLabels() {
        return this._dateLabels;
    }
    set dateLabels(value) {
        this._dateLabels = deepCopy(normalizeArray(value, 'object'));

        if (this._connected) {
            this.initDateLabels();
            this.generateViewData();
        }
    }

    /**
     * If true, the calendar is disabled.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = normalizeBoolean(value);

        if (this._connected) {
            this.generateViewData();
        }
    }

    /**
     * Array of disabled dates. The dates should be a Date object, a timestamp, or an ISO8601 formatted string.
     *
     * @public
     * @type {object[]}
     */
    @api
    get disabledDates() {
        return this._disabledDates;
    }
    set disabledDates(value) {
        this._disabledDates =
            value && !Array.isArray(value) ? [value] : normalizeArray(value);

        if (this._connected) {
            this.initDisabledDates();
            this.generateViewData();
        }
    }

    /**
     * Specifies if the calendar header should be hidden.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get hideNavigation() {
        return this._hideNavigation;
    }
    set hideNavigation(value) {
        this._hideNavigation = normalizeBoolean(value);
    }

    /**
     * Array of marked date objects. A maximum of three markers can be displayed on a same date.
     *
     * @public
     * @type {object[]}
     */
    @api
    get markedDates() {
        return this._markedDates;
    }
    set markedDates(value) {
        this._markedDates = normalizeArray(value, 'object');

        if (this._connected) {
            this.initMarkedDates();
            this.generateViewData();
        }
    }

    /**
     * Specifies the maximum date, which the calendar can show.
     *
     * @public
     * @type {object}
     * @default Date(2099, 11, 31)
     */
    @api
    get max() {
        return this._max;
    }
    set max(value) {
        this._max = this.isInvalidDate(value) ? DEFAULT_MAX : value;

        if (this._connected) {
            this._computedMax = this.getDateWithTimezone(this.max);
            this.validateCurrentDayValue();

            if (this.displayDate > this._computedMax) {
                this.displayDate = new Date(this._computedMax);
            }
            this.updateDateParameters();
        }
    }

    /**
     * Specifies the minimum date, which the calendar can show.
     *
     * @public
     * @type {object}
     * @default Date(1900, 0, 1)
     */
    @api
    get min() {
        return this._min;
    }
    set min(value) {
        this._min = this.isInvalidDate(value) ? DEFAULT_MIN : value;

        if (this._connected) {
            this._computedMin = this.getDateWithTimezone(this.min);
            this.validateCurrentDayValue();

            if (this.displayDate < this._computedMin) {
                this.displayDate = new Date(this._computedMin);
            }
            this.updateDateParameters();
        }
    }

    /**
     * Specifies the selection mode of the calendar. Valid values include single, multiple and interval.
     * If single, only one date can be selected at a time. If multiple, the user can select multiple dates.
     * If interval, the user can only select a date range (two dates).
     *
     * @public
     * @type {string}
     * @default single
     */
    @api
    get selectionMode() {
        return this._selectionMode;
    }
    set selectionMode(value) {
        this._selectionMode = normalizeString(value, {
            validValues: SELECTION_MODES.valid,
            fallbackValue: SELECTION_MODES.default
        });
        if (this._connected) {
            this.validateCurrentDayValue();
            this.updateDateParameters();
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
        return this._timezone;
    }
    set timezone(value) {
        this._timezone = value;

        if (this._connected) {
            this.initDates();
            this.updateDateParameters();
        }
    }

    /**
     * The value of the selected date(s). Dates can be a Date object, timestamp, or an ISO8601 formatted string.
     *
     * @public
     * @type {string|string[]}
     */
    @api
    get value() {
        return this._value;
    }
    set value(value) {
        if (equal(value, this._value)) {
            return;
        }
        this._value = value;

        if (this._connected) {
            this.initValue();
            if (this._computedValue[0]) {
                this.displayDate = new Date(this._computedValue[0]);
            }
            this.validateCurrentDayValue();
            this.updateDateParameters();
        }
    }

    /**
     * If true, display a week number column.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get weekNumber() {
        return this._weekNumber;
    }
    set weekNumber(value) {
        this._weekNumber = normalizeBoolean(value);

        if (this._connected) {
            this.generateViewData();
        }
    }
    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Check if all values are outside the min-max interval.
     *
     * @return {boolean}
     */
    get allValuesOutsideMinAndMax() {
        return this._computedValue.every(
            (value) => this.isBeforeMin(value) || this.isAfterMax(value)
        );
    }

    /**
     * Computed class for the table.
     *
     * @return {string}
     */
    get computedTableClasses() {
        const isLabeled = this._dateLabels.length > 0;
        return classSet(
            'slds-datepicker__month slds-is-relative avonni-calendar__table'
        )
            .add({ 'avonni-calendar__date-with-labels': isLabeled })
            .toString();
    }

    /**
     * Compute days from week.
     */
    get days() {
        const days = [];
        if (this.weekNumber) {
            days.push('');
        }
        return days.concat(DAYS);
    }

    /**
     * Disable interaction on next date layout.
     */
    get disabledNext() {
        let disabled = this.disabled;
        const month = this.displayDate.getMonth() + 1;
        const nextDate = setDate(this.displayDate, 'month', month, 1);
        const maxDate = this.endOfMonth(this._computedMax);

        if (nextDate > maxDate) {
            disabled = true;
        }

        return disabled;
    }

    /**
     * Disable interaction on previous date layout.
     */
    get disabledPrevious() {
        let disabled = this.disabled;
        const month = this.displayDate.getMonth() - 1;
        const previousDate = setDate(this.displayDate, 'month', month, 1);
        const startOfDay = this.startOfDay(this._computedMin);
        const minDate = setDate(startOfDay, 'month', 0, 0);

        if (previousDate.getTime() < minDate.getTime()) {
            disabled = true;
        }

        return disabled;
    }

    /**
     * Generate unique ID key.
     */
    get generateKey() {
        return generateUUID();
    }

    /**
     * Check if current date is between the min-max interval.
     */
    get isCurrentDateBetweenMinAndMax() {
        return (
            this._computedMin.getTime() <= new Date().getTime() &&
            new Date().getTime() <= this._computedMax.getTime()
        );
    }

    /**
     * Check if the calendar is in multi-select mode.
     *
     * @return {boolean}
     */
    get isMultiSelect() {
        return (
            this.selectionMode === 'interval' ||
            this.selectionMode === 'multiple'
        );
    }

    /**
     * Compute year list spread from min and max.
     */
    get yearsList() {
        let startYear = this._computedMin.getFullYear();
        let endYear = this._computedMax.getFullYear();

        return [...Array(endYear - startYear + 1).keys()].map((x) => {
            const value = startYear + x;
            return { selected: this.year === value, value };
        });
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Set the focus on the first focusable element of the calendar.
     *
     * @public
     */
    @api
    focus() {
        const button = this.template.querySelector(
            '[data-element-id="previous-lightning-button-icon"]'
        );
        if (button) {
            button.focus();
        }
    }

    /**
     * Set the focus on a given date.
     *
     * @param {Date} date A value to be focused, which can be a Date object, timestamp, or an ISO8601 formatted string.
     * @public
     */
    @api
    focusDate(dateValue) {
        if (this.isInvalidDate(dateValue)) {
            return;
        }

        this.displayDate = this.getDateWithTimezone(dateValue);
        this._focusDate = this.getDateWithTimezone(dateValue);
        this.computeFocus(true);
    }

    /**
     * Move the position of the calendar so the specified date is visible.
     *
     * @param {string | number | Date} date Date the calendar should be positioned on.
     * @public
     */
    @api
    goToDate(date) {
        const selectedDate = this.getDateWithTimezone(date);
        if (this.isInvalidDate(selectedDate)) {
            console.warn(`The date ${date} is not valid.`);
            return;
        }
        this.displayDate = selectedDate;
        this.updateDateParameters();
    }

    /**
     * Simulates a click on the next month button
     *
     * @public
     */
    @api
    nextMonth() {
        this.handlerNextMonth();
    }

    /**
     * Simulates a click on the previous month button
     *
     * @public
     */
    @api
    previousMonth() {
        this.handlerPreviousMonth();
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Place focus according to keyboard selection
     *
     * @param {boolean} applyFocus Focus point is always computed, but is only focused if applyFocus is true.
     */
    computeFocus(applyFocus) {
        // if a date was previously selected or focused, focus the same date in this month.
        let selectedMonthDate, rovingDate;
        if (this._focusDate) {
            rovingDate = this._focusDate.getTime();
            selectedMonthDate = setDate(
                this.displayDate,
                'date',
                this._focusDate.getDate()
            );
        }
        const firstOfMonthDate = this.startOfDay(
            setDate(this.displayDate, 'date', 1)
        ).getTime();

        requestAnimationFrame(() => {
            const rovingFocusDate = this.template.querySelector(
                `[data-element-id="td"][data-full-date="${rovingDate}"]`
            );
            const selectedDates = this.template.querySelectorAll(
                '[data-selected="true"]'
            );
            const todaysDate = this.template.querySelector(
                '[data-today="true"]'
            );
            const firstOfMonth = this.template.querySelector(
                `[data-element-id="td"][data-full-date="${firstOfMonthDate}"]:not([data-disabled="true"])`
            );
            const rovingMonthDate = this.template.querySelector(
                `[data-element-id="td"][data-full-date="${selectedMonthDate}"]`
            );
            const firstValidDate = this.template.querySelector(
                '[data-element-id="td"]:not([data-disabled="true"])'
            );

            const focusTarget =
                rovingFocusDate ||
                selectedDates[0] ||
                rovingMonthDate ||
                todaysDate ||
                firstOfMonth ||
                firstValidDate;

            const existingFocusPoints = this.template.querySelectorAll(
                '[data-element-id="td"][tabindex="0"]'
            );
            existingFocusPoints.forEach((focusPoint) => {
                focusPoint.setAttribute('tabindex', '-1');
            });

            if (selectedDates.length) {
                if (this.selectionMode === 'single') {
                    selectedDates[0].setAttribute('tabindex', '0');
                } else if (this.selectionMode === 'multiple') {
                    selectedDates.forEach((target) => {
                        target.setAttribute('tabindex', '0');
                    });
                } else if (this.selectionMode === 'interval') {
                    selectedDates[0].setAttribute('tabindex', '0');
                    selectedDates[selectedDates.length - 1].setAttribute(
                        'tabindex',
                        '0'
                    );
                }
            }

            if (focusTarget) {
                if (focusTarget.length > 0) {
                    focusTarget[0].setAttribute('tabindex', '0');
                    if (applyFocus) focusTarget[0].focus();
                } else {
                    focusTarget.setAttribute('tabindex', '0');
                    if (applyFocus) {
                        focusTarget.focus();
                    }
                }
            }
        });
    }

    /**
     * Returns the end of the month for the given date.
     *
     * @param {Date} date Date to get the end of the month for.
     * @returns {Date} The end of the month for the given date.
     */
    endOfMonth(date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0);
    }

    /**
     * Filter the valid dates from the given array.
     *
     * @param {object[]} array Array to filter.
     * @returns Array of DateTime objects, set to the beginning of the day.
     */
    fullDatesFromArray(array) {
        const dates = [];

        array.forEach((date) => {
            if (typeof date === 'object') {
                dates.push(this.startOfDay(date).getTime());
            }
        });

        return dates;
    }

    /**
     * Generate the calendar data.
     */
    generateViewData() {
        const calendarData = [];
        const today = this.startOfDay(new Date());
        const currentMonth = this.displayDate.getMonth();
        let date = getStartOfWeek(setDate(this.displayDate, 'date', 1));

        const mode = this.selectionMode;
        const firstValue = this._computedValue[0];
        const lastValue = this._computedValue[this._computedValue.length - 1];
        const isInterval =
            mode === 'interval' && this._computedValue.length >= 2;

        // Add an array per week
        for (let i = 0; i < 6; i++) {
            let weekData = [];

            if (this.weekNumber) {
                // Week number
                weekData.push(
                    new CalendarDate({
                        date,
                        isWeekNumber: true
                    })
                );
            }

            // Add 7 days to each week array
            for (let a = 0; a < 7; a++) {
                const time = date.getTime();
                const disabledDate = this.isDisabled(date);
                const outsideOfMinMax =
                    time < this._computedMin || time > this._computedMax;
                const markers = this.getMarkers(date);
                const label = this.getLabel(date);
                const isPartOfInterval =
                    isInterval &&
                    firstValue.getTime() <= time &&
                    lastValue.getTime() >= time;

                let selected;
                if (this.isMultiSelect) {
                    selected = this._computedValue.find((value) => {
                        return (
                            this.startOfDay(value).getTime() ===
                            this.startOfDay(time).getTime()
                        );
                    });
                } else if (firstValue) {
                    selected =
                        this.startOfDay(firstValue).getTime() ===
                        this.startOfDay(time).getTime();
                }

                weekData.push(
                    new CalendarDate({
                        adjacentMonth: date.getMonth() !== currentMonth,
                        date,
                        disabled:
                            this.disabled || disabledDate || outsideOfMinMax,
                        isPartOfInterval,
                        isToday: today.getTime() === time,
                        ...(isPartOfInterval
                            ? {
                                  isStartDate: firstValue.getTime() === time,
                                  isEndDate: lastValue.getTime() === time
                              }
                            : {}),
                        chip: label,
                        markers,
                        selected
                    })
                );
                date = setDate(date, 'date', date.getDate() + 1);
            }
            calendarData.push(weekData);
        }

        this.calendarData = calendarData;
    }

    /**
     * Returns current date if it is between the min-max interval. If not, returns the min.
     *
     * @return {DateTime}
     */
    getCurrentDateOrMin() {
        if (this.isCurrentDateBetweenMinAndMax) {
            return this.getDateWithTimezone(new Date());
        }
        return new Date(this._computedMin);
    }

    /**
     * If possible, transform the given value into a DateTime including the timezone.
     *
     * @param {any} value Value to be transformed. If it is an invalid date, it will be returned as is.
     * @returns DateTime object, or value as is.
     */
    getDateWithTimezone(value) {
        if (!this.timezone) {
            return new Date(value);
        }
        const date = new DateTime(value, this.timezone).tzDate;
        if (!date || this.startOfDay(date).getTime() === NULL_DATE) {
            return value;
        }
        return date;
    }

    /**
     * Get the label object for the given date.
     *
     * @param {DateTime} date Date to get the label for.
     * @returns {object} Label object.
     */
    getLabel(date) {
        const dayIndex = date.getDay();
        const weekday = DAYS[dayIndex];
        return this._computedDateLabels.find((label) => {
            const labelDate = label.date;
            const labelAsNumber = Number(labelDate);

            let labelAsTime;
            if (!this.isInvalidDate(labelDate)) {
                const startOfDay = this.startOfDay(labelDate);
                labelAsTime = startOfDay.getTime();
            }

            return (
                labelAsTime === date.getTime() ||
                labelAsNumber === date.getDate() ||
                weekday === labelDate.getDay()
            );
        });
    }

    /**
     * Get the markers for the given date.
     *
     * @param {DateTime} date Date to get the markers for.
     * @returns {string[]} Array of marker styles.
     */
    getMarkers(date) {
        const markers = [];
        const time = this.startOfDay(date).getTime();
        const dateTime = new DateTime(date, this.timezone);
        const weekday = dateTime.getUnit('weekday', 'short');
        const monthDay = dateTime.day;

        this._computedMarkedDates.forEach((marker) => {
            const dateArray = [marker.date];
            if (
                this.fullDatesFromArray(dateArray).indexOf(time) > -1 ||
                this.weekDaysFromArray(dateArray).indexOf(weekday) > -1 ||
                this.monthDaysFromArray(dateArray).indexOf(monthDay) > -1
            ) {
                markers.push(`background-color: ${marker.color}`);
            }
        });
        // A maximum of 3 markers are displayed per date
        return markers.slice(0, 3);
    }

    /**
     * Initialize the date labels to include the timezone.
     */
    initDateLabels() {
        this._computedDateLabels = this.dateLabels.map((label) => {
            return {
                ...label,
                date: this.getDateWithTimezone(label.date)
            };
        });
    }

    /**
     * Initialize all the properties depending on dates, to include the timezone and set them to the beginning of the day.
     */
    initDates() {
        const max = this.getDateWithTimezone(this.max);
        const min = this.getDateWithTimezone(this.min);
        this._computedMax = setDate(max, 'hours', 0, 0, 0, 0);
        this._computedMin = setDate(min, 'hours', 0, 0, 0, 0);
        this.initDateLabels();
        this.initDisabledDates();
        this.initMarkedDates();
        this.initValue();

        if (this.displayDate) {
            this.displayDate = this.startOfDay(this.displayDate);
        }
    }

    /**
     * Initialize the disabled dates to include the timezone and set them to the beginning of the day.
     */
    initDisabledDates() {
        this._computedDisabledDates = this.disabledDates.map((date) => {
            if (DAYS.includes(date) || this.isInvalidDate(date)) {
                return date;
            }
            const fullDate = this.getDateWithTimezone(date);
            return this.startOfDay(fullDate);
        });
    }

    /**
     * Initialize the displayed date to center the calendar on the appropriate month.
     */
    initDisplayDate() {
        let date = this.getDateWithTimezone(DEFAULT_DATE);
        if (this._computedValue[0]) {
            date = this._computedValue[0];
        } else if (date < this._computedMin) {
            date = this._computedMin;
        } else if (date > this._computedMax) {
            date = this._computedMax;
        }
        this.displayDate = new Date(date);
    }

    /**
     * Initialize the marked dates to include the timezone and set them to the beginning of the day.
     */
    initMarkedDates() {
        this._computedMarkedDates = this.markedDates.map((marker) => {
            return {
                color: marker.color,
                date: this.isInvalidDate(marker.date)
                    ? marker.date
                    : this.startOfDay(this.getDateWithTimezone(marker.date))
            };
        });
    }

    /**
     * Initialize the value to include the timezone, sort them and set them to the beginning of the day.
     */
    initValue() {
        const normalizedValue =
            this.value && !Array.isArray(this.value)
                ? [this.value]
                : normalizeArray(this.value);
        const computedValues = [];
        normalizedValue.forEach((date) => {
            if (!this.isInvalidDate(date)) {
                const normalizedDate = this.startOfDay(
                    this.getDateWithTimezone(date)
                );
                computedValues.push(normalizedDate);
            }
        });
        computedValues.sort((a, b) => a.getTime() - b.getTime());
        this._computedValue = computedValues;
    }

    /**
     * Check if value is after max date.
     */
    isAfterMax(value) {
        return value.getTime() > this._computedMax.getTime();
    }

    /**
     * Check if value is before min date.
     */
    isBeforeMin(value) {
        return value.getTime() < this._computedMin.getTime();
    }

    /**
     * Check if the given date is disabled.
     *
     * @param {DateTime} date Date to check.
     * @returns {boolean} True if the date is disabled.
     */
    isDisabled(date) {
        const dates = this._computedDisabledDates;
        const time = this.startOfDay(date).getTime();
        const dateTime = new DateTime(date);
        const weekday = dateTime.getUnit('weekday', 'short').replace(/\.$/, '');
        const monthDay = dateTime.day;
        return (
            this.fullDatesFromArray(dates).indexOf(time) > -1 ||
            this.weekDaysFromArray(dates).indexOf(weekday) > -1 ||
            this.monthDaysFromArray(dates).indexOf(monthDay) > -1
        );
    }

    /**
     * Check if value is an invalid date.
     */
    isInvalidDate(value) {
        const date = new Date(value);
        return (
            !date ||
            isNaN(date) ||
            this.startOfDay(date).getTime() === NULL_DATE
        );
    }

    /**
     * Returns an array of dates based on the selection mode interval.
     *
     * @param {object[]} array - array of dates
     * @param {string | Date} newDate - new date
     * @returns array of dates
     */
    isSelectedInterval(array, newDate) {
        const timestamp = newDate.getTime();
        const timestamps = array.map((x) => x.getTime()).sort((a, b) => a - b);

        if (timestamps.includes(timestamp)) {
            timestamps.splice(timestamps.indexOf(timestamp), 1);
        } else {
            if (timestamps.length === 0) {
                timestamps.push(timestamp);
            } else if (timestamps.length === 1) {
                if (timestamp > timestamps[0]) {
                    timestamps.push(timestamp);
                } else {
                    timestamps.splice(0, 0, timestamp);
                }
            } else {
                if (timestamp > timestamps[0]) {
                    timestamps.splice(1, 1, timestamp);
                } else {
                    timestamps.splice(0, 1, timestamp);
                }
            }
        }

        return timestamps.map((x) => new Date(x));
    }

    /**
     * Returns an array of dates base on the selection mode multiple.
     *
     * @param {object[]} array - array of dates
     * @param {string | Date} newDate - new date
     * @returns array of dates
     */
    isSelectedMultiple(array, newDate) {
        const timestamp = newDate.getTime();
        const timestamps = array.map((x) => x.getTime());

        if (!timestamps.includes(timestamp)) {
            timestamps.push(timestamp);
        } else {
            timestamps.splice(timestamps.indexOf(timestamp), 1);
        }
        return timestamps.map((x) => new Date(x));
    }

    /**
     * Filter the numbers from the given array.
     *
     * @param {object[]} array Array to filter.
     * @returns Array of numbers.
     */
    monthDaysFromArray(array) {
        let dates = [];

        array.forEach((date) => {
            if (typeof date === 'number') {
                dates.push(date);
            }
        });

        return dates;
    }

    /**
     * Remove invalid values, or values outside of min-max interval, from the computed value.
     */
    removeValuesOutsideRange() {
        this._computedValue = this._computedValue.filter((date) => {
            return (
                !this.isInvalidDate(date) &&
                !this.isAfterMax(date) &&
                !this.isBeforeMin(date)
            );
        });
    }

    /**
     * Set interval when only one value is valid (in min-max range) and the other one is outside range.
     *
     * @param {DateTime} minValue Minimum valid value.
     * @param {DateTime} maxValue Maximum valid value.
     */
    setIntervalWithOneValidValue(minValue, maxValue) {
        if (
            this.isBeforeMin(minValue) &&
            minValue.getTime() < this._computedValue[0].getTime()
        ) {
            this._computedValue[1] = this._computedValue[0];
            this._computedValue[0] = this._computedMin;
        } else if (
            this.isAfterMax(maxValue) &&
            maxValue.getTime() > this._computedValue[0].getTime()
        ) {
            this._computedValue[1] = this._computedMax;
        }
    }

    /**
     * Returns the start of the day for the given date.
     *
     * @param {Date} date Date to get the start of the day for.
     * @returns {Date} The start of the day for the given date.
     */
    startOfDay(date) {
        return setDate(date, 'hour', 0, 0, 0, 0);
    }

    /**
     * Returns the ISO string for the given date.
     *
     * @param {Date} dateObject Date to get the ISO string for.
     * @returns {string} The ISO string for the given date.
     */
    toISO(dateObject) {
        const date = getFormattedDate({
            date: dateObject,
            format: 'yyyy-MM-dd'
        });
        const offset = getFormattedDate({
            date,
            timeZone: this.timezone,
            format: 'ZZ'
        });
        return `${date}T00:00:00.000${offset}`;
    }

    /**
     * Update the dates displayed and generate the view data.
     */
    updateDateParameters() {
        this.year = this.displayDate.getFullYear();
        this.month = MONTHS[this.displayDate.getMonth()];
        this.day = this.displayDate.getDay();
        this.generateViewData();
    }

    /**
     * Update the value with the current computed value.
     */
    updateValue() {
        if (!this._computedValue.length) {
            this._value = this.selectionMode === 'single' ? null : [];
            return;
        }
        const stringDates = this._computedValue.map((date) => {
            return this.toISO(date);
        });
        this._value =
            this.selectionMode === 'single' ? stringDates[0] : stringDates;
    }

    /**
     * If invalid current day, center calendar's current day to closest date in min-max interval
     */
    validateCurrentDayValue() {
        if (!this._computedValue.length) {
            return;
        }

        switch (this.selectionMode) {
            case 'interval':
                this.validateValueIntervalMode();
                break;
            case 'single':
                this.validateValueSingleMode();
                break;
            case 'multiple':
                this.validateValueMultipleMode();
                break;
            default:
        }
    }

    /**
     * Validate values for interval selection mode.
     */
    validateValueIntervalMode() {
        const minValue = this._computedValue[0];
        const maxValue = this._computedValue[this._computedValue.length - 1];

        if (this.allValuesOutsideMinAndMax) {
            if (this.isBeforeMin(minValue) && this.isAfterMax(maxValue)) {
                this._computedValue[0] = new Date(this._computedMin);
                this._computedValue[1] = new Date(this._computedMax);
                this.displayDate = new Date(this._computedMin);
            } else {
                this._computedValue = [];
                this.displayDate = this.getCurrentDateOrMin();
            }
            this.updateDateParameters();
        } else {
            this.removeValuesOutsideRange();

            if (this._computedValue.length) {
                // Check if previous min-max values saved were outside of range to create interval
                if (this._computedValue.length === 1) {
                    this.setIntervalWithOneValidValue(minValue, maxValue);
                }
                this.displayDate = new Date(this._computedValue[0]);
                this.updateDateParameters();
            }
        }
    }

    /**
     * Validate value for multiple selection mode.
     */
    validateValueMultipleMode() {
        this.removeValuesOutsideRange();

        if (this._computedValue.length) {
            this.displayDate = this._computedValue[0];
            this.updateDateParameters();
        }
    }

    /**
     * Validate value for single selection mode.
     */
    validateValueSingleMode() {
        // If multiple values are selected, we remove those outside range
        if (this._computedValue && this._computedValue.length > 1) {
            this.removeValuesOutsideRange();
        }
        // If one single value, we check if it's in interval and set to closest value if not
        else {
            if (this.isInvalidDate(this._computedValue[0])) {
                this._computedValue = [];
                this.displayDate = this.getCurrentDateOrMin();
            } else if (this.isAfterMax(this._computedValue[0])) {
                this._computedValue = [];
                this.displayDate = new Date(this._computedMax);
            } else if (this.isBeforeMin(this._computedValue[0])) {
                this._computedValue = [];
                this.displayDate = new Date(this._computedMin);
            }
            this.updateDateParameters();
        }
    }

    /**
     * Filter the strings from the given array.
     *
     * @param {object[]} array Array to filter.
     * @returns Array of strings.
     */
    weekDaysFromArray(array) {
        let dates = [];

        array.forEach((date) => {
            if (typeof date === 'string') {
                dates.push(date);
            }
        });

        return dates;
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS AND DISPATCHERS
     * -------------------------------------------------------------
     */

    /**
     * Private blur handler.
     */
    handleBlur() {
        /**
         * @event
         * @private
         * @name privateblur
         * @bubbles
         * @cancelable
         * @composed
         */
        this.dispatchEvent(
            new CustomEvent('privateblur', {
                composed: true,
                bubbles: true,
                cancelable: true
            })
        );
    }

    /**
     * Record focus if a cell is clicked.
     */
    handleDateFocus(event) {
        if (!event.currentTarget) {
            return;
        }

        const focusDate = new Date(
            Number(event.currentTarget.dataset.fullDate)
        );
        if (focusDate) {
            this._focusDate = focusDate;
        }
    }

    /**
     * Private focus handler.
     */
    handleFocus() {
        /**
         * @event
         * @private
         * @name privatefocus
         * @bubbles
         * @cancelable
         */
        this.dispatchEvent(
            new CustomEvent('privatefocus', {
                bubbles: true,
                cancelable: true
            })
        );
    }

    /**
     * Keyboard navigation handler.
     *
     * @param {Event} event
     */
    handleKeyDown(event) {
        const fullDate = Number(event.target.dataset.fullDate);
        if (!fullDate) {
            return;
        }

        const initialDate = new Date(fullDate);
        const day = initialDate.getDate();
        const month = initialDate.getMonth();
        const year = initialDate.getFullYear();
        let nextDate;

        if (event.altKey) {
            if (event.key === keyValues.pageup) {
                nextDate = setDate(initialDate, 'year', year - 1);
            }
            if (event.key === keyValues.pagedown) {
                nextDate = setDate(initialDate, 'year', year + 1);
            }
        } else {
            switch (event.key) {
                case keyValues.left:
                    nextDate = setDate(initialDate, 'date', day - 1);
                    break;
                case keyValues.right:
                    nextDate = setDate(initialDate, 'date', day + 1);
                    break;
                case keyValues.up:
                    nextDate = setDate(initialDate, 'date', day - 7);
                    break;
                case keyValues.down:
                    nextDate = setDate(initialDate, 'date', day + 7);
                    break;
                case keyValues.home:
                    nextDate = getStartOfWeek(initialDate);
                    break;
                case keyValues.end: {
                    const startOfWeek = getStartOfWeek(initialDate);
                    nextDate = setDate(
                        startOfWeek,
                        'date',
                        startOfWeek.getDate() + 6
                    );
                    break;
                }
                case keyValues.pagedown:
                    nextDate = setDate(initialDate, 'month', month - 1);
                    break;
                case keyValues.pageup:
                    nextDate = setDate(initialDate, 'month', month + 1);
                    break;
                case keyValues.space:
                case keyValues.spacebar:
                case keyValues.enter:
                    {
                        const selectedDay = event.target.querySelector(
                            '[data-element-id="span-day-label"]'
                        );
                        if (selectedDay) {
                            selectedDay.click();
                        }
                    }
                    break;
                default:
            }
        }

        if (!nextDate) {
            return;
        }

        event.preventDefault();

        if (
            nextDate &&
            (month !== nextDate.getMonth() || year !== nextDate.getFullYear())
        ) {
            this.dispatchNavigateEvent(nextDate);
        }

        if (nextDate.getTime() < this._computedMin.getTime()) {
            this._focusDate = this._computedMin;
        } else if (nextDate.getTime() > this._computedMax.getTime()) {
            this._focusDate = this._computedMax;
        } else {
            this._focusDate = nextDate;
        }
        this.displayDate = this._focusDate;
        this.updateDateParameters();
        this.computeFocus(true);
    }

    /**
     * Mouse over handler.
     */
    handleMouseOver(event) {
        const day = event.target.getAttribute('data-full-date');
        const dayCell = this.template.querySelector(
            `[data-full-date="${day}"]`
        );
        const timeArray = this._computedValue
            .map((x) => x.getTime())
            .sort((a, b) => a - b);
        if (this.selectionMode === 'interval' && !!day) {
            if (timeArray.length === 1) {
                if (day > timeArray[0]) {
                    dayCell.classList.add(
                        'avonni-calendar__cell_bordered-right'
                    );
                    this.template.querySelectorAll('td').forEach((x) => {
                        if (
                            x.getAttribute('data-full-date') >= timeArray[0] &&
                            x.getAttribute('data-full-date') <= day
                        ) {
                            x.classList.add(
                                'avonni-calendar__cell_bordered-top_bottom'
                            );
                        }
                    });
                }
                if (day < timeArray[0]) {
                    dayCell.classList.add(
                        'avonni-calendar__cell_bordered-left'
                    );
                    this.template.querySelectorAll('td').forEach((x) => {
                        if (
                            x.getAttribute('data-full-date') <= timeArray[0] &&
                            x.getAttribute('data-full-date') >= day
                        ) {
                            x.classList.add(
                                'avonni-calendar__cell_bordered-top_bottom'
                            );
                        }
                    });
                }
            } else if (timeArray.length === 2) {
                if (day > timeArray[1]) {
                    dayCell.classList.add(
                        'avonni-calendar__cell_bordered-right'
                    );
                    this.template.querySelectorAll('td').forEach((x) => {
                        if (
                            x.getAttribute('data-full-date') >= timeArray[1] &&
                            x.getAttribute('data-full-date') <= day
                        ) {
                            x.classList.add(
                                'avonni-calendar__cell_bordered-top_bottom'
                            );
                        }
                    });
                }
                if (day < timeArray[0]) {
                    dayCell.classList.add(
                        'avonni-calendar__cell_bordered-left'
                    );
                    this.template.querySelectorAll('td').forEach((x) => {
                        if (
                            x.getAttribute('data-full-date') <= timeArray[0] &&
                            x.getAttribute('data-full-date') >= day
                        ) {
                            x.classList.add(
                                'avonni-calendar__cell_bordered-top_bottom'
                            );
                        }
                    });
                }
            }
        }
    }

    /**
     * Mouse out handler.
     */
    handleMouseOut() {
        this.template.querySelectorAll('td').forEach((x) => {
            x.classList.remove('avonni-calendar__cell_bordered-top_bottom');
            x.classList.remove('avonni-calendar__cell_bordered-right');
            x.classList.remove('avonni-calendar__cell_bordered-left');
        });
    }

    /**
     * Next month handler.
     */
    handlerNextMonth() {
        const month = this.displayDate.getMonth() + 1;
        this.displayDate = setDate(this.displayDate, 'month', month);
        this.updateDateParameters();
        this.computeFocus(false);
        this.dispatchNavigateEvent(this.displayDate);
    }

    /**
     * Previous month handler.
     */
    handlerPreviousMonth() {
        const month = this.displayDate.getMonth() - 1;
        this.displayDate = setDate(this.displayDate, 'month', month);
        this.updateDateParameters();
        this.computeFocus(false);
        this.dispatchNavigateEvent(this.displayDate);
    }

    /**
     * Date selection handler.
     *
     * @param {object} event
     */
    handleSelectDate(event) {
        this.handleDateFocus(event);

        const { fullDate, disabled } = event.currentTarget.dataset;
        const date = new Date(Number(fullDate));
        if (this.isInvalidDate(date) || disabled === 'true') {
            return;
        }

        switch (this.selectionMode) {
            case 'interval':
                this._computedValue = this.isSelectedInterval(
                    this._computedValue,
                    date
                );
                break;
            case 'multiple':
                this._computedValue = this.isSelectedMultiple(
                    this._computedValue,
                    date
                );
                break;
            default: {
                const unselect =
                    this._computedValue.length &&
                    this._computedValue[0].getTime() === date.getTime();
                this._computedValue = unselect ? [] : [date];
                break;
            }
        }
        const clickedDate = this.toISO(date);
        this.displayDate = date;
        this.updateDateParameters();
        this.updateValue();

        /**
         * The event fired when the selected date is changed.
         *
         * @event
         * @public
         * @name change
         * @param {DOMRect} bounds The size and position of the clicked date in the viewport.
         * @param {string|string[]} value Selected date(s), as an ISO8601 formatted string. Returns a string if the selection mode is single. Returns an array of dates otherwise.
         * @param {string} clickedDate Clicked date, as an ISO8601 formatted string.
         */
        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    bounds: event.currentTarget.getBoundingClientRect(),
                    value: this.value,
                    clickedDate
                }
            })
        );

        this.computeFocus(true);
    }

    /**
     * Year change handler.
     *
     * @param {object} event
     */
    handleYearChange(event) {
        this.displayDate = setDate(
            this.displayDate,
            'year',
            event.target.value
        );

        if (this.displayDate.getTime() < this._computedMin.getTime()) {
            const month = this._computedMin.getMonth();
            this.displayDate = setDate(this.displayDate, 'month', month);
        }

        if (this.displayDate.getTime() > this._computedMax.getTime()) {
            const month = this._computedMax.getMonth();
            this.displayDate = setDate(this.displayDate, 'month', month);
        }

        this.dispatchNavigateEvent(this.displayDate);
        this.updateDateParameters();
        event.stopPropagation();
        this.computeFocus(true);
    }

    /**
     * The event fired when the month is changed.
     *
     * @event
     * @public
     * @name navigate
     * @param {string} date First day of the new visible month, as an ISO8601 formatted string.
     */
    dispatchNavigateEvent(date) {
        const firstDayOfMonth = setDate(date, 'date', 1);

        this.dispatchEvent(
            new CustomEvent('navigate', {
                detail: {
                    date: this.toISO(firstDayOfMonth)
                }
            })
        );
    }
}
