import {
    computeDisabledDates,
    computeLabelDates,
    computeMarkedDates,
    computeSelectedDates,
    DEFAULT_DATE,
    DEFAULT_MAX,
    DEFAULT_MIN,
    DEFAULT_WEEK_START_DAY,
    getDateWithTimezone,
    isAfterMax,
    isBeforeMin,
    isInvalidDate,
    MONTHS,
    removeValuesOutsideRange,
    SELECTION_MODES,
    setIntervalWithOneValidValue,
    startOfDay
} from 'c/calendarUtils';
import { getFormattedDate, setDate } from 'c/dateTimeUtils';
import {
    classSet,
    deepCopy,
    normalizeArray,
    normalizeBoolean,
    normalizeString
} from 'c/utils';
import { equal } from 'c/utilsPrivate';
import { api, LightningElement } from 'lwc';

const DEFAULT_NUMBER_CALENDAR = 1;

const DEFAULT_NEXT_MONTH_BUTTON_ALTERNATIVE_TEXT = 'Next Month';
const DEFAULT_PREVIOUS_MONTH_BUTTON_ALTERNATIVE_TEXT = 'Previous Month';
const DEFAULT_YEAR_SELECT_ASSISTIVE_TEXT = 'Pick a year';

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
    _nbMonthCalendars = DEFAULT_NUMBER_CALENDAR;
    _selectionMode = SELECTION_MODES.default;
    _timezone;
    _value;
    _weekNumber = false;
    _weekStartDay = DEFAULT_WEEK_START_DAY;

    _connected = false;
    _focusDate;
    calendarDataList = [];
    computedDateLabels = [];
    computedDisabledDates = [];
    computedMarkedDates = [];
    computedMax;
    computedMin;
    computedValue = [];
    displayDate; // The calendar displays this date's month
    month;
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
        this.computeFocusAll();
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
        this._max = isInvalidDate(value) ? DEFAULT_MAX : value;

        if (this._connected) {
            this.computedMax = getDateWithTimezone(this.max, this.timezone);
            this.validateCurrentDayValue();

            if (this.displayDate > this.computedMax) {
                this.displayDate = new Date(this.computedMax);
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
        this._min = isInvalidDate(value) ? DEFAULT_MIN : value;

        if (this._connected) {
            this.computedMin = getDateWithTimezone(this.min, this.timezone);
            this.validateCurrentDayValue();

            if (this.displayDate < this.computedMin) {
                this.displayDate = new Date(this.computedMin);
            }
            this.updateDateParameters();
        }
    }

    /**
     * Number of month calendars to be displayed.
     *
     * @type {number}
     * @default 1
     * @public
     */
    @api
    get nbMonthCalendars() {
        return this._nbMonthCalendars;
    }
    set nbMonthCalendars(value) {
        const number = parseInt(value, 10);
        this._nbMonthCalendars =
            isNaN(number) || number < DEFAULT_NUMBER_CALENDAR
                ? DEFAULT_NUMBER_CALENDAR
                : number;
        if (this._connected) {
            this.generateViewData();
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
            if (this.computedValue[0]) {
                if (this.isMultiCalendars) {
                    this.setDisplayDateMultipleCalendars();
                } else {
                    this.displayDate = new Date(this.computedValue[0]);
                }
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

    /**
     * Day displayed as the first day of the week. The value has to be a number between 0 and 6, 0 being Sunday, 1 being Monday, and so on until 6.
     *
     * @type {number}
     * @default 0
     * @public
     */
    @api
    get weekStartDay() {
        return this._weekStartDay;
    }
    set weekStartDay(value) {
        const number = parseInt(value, 10);
        this._weekStartDay =
            isNaN(number) || number < 0 || number > 6
                ? DEFAULT_WEEK_START_DAY
                : number;

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
        return this.computedValue.every(
            (value) =>
                isBeforeMin(value, this.computedMin) ||
                isAfterMax(value, this.computedMax)
        );
    }

    /**
     * CSS classes of the wrapper element.
     *
     * @type {string}
     */
    get computedWrapperClass() {
        return classSet('avonni-calendar__wrapper')
            .add({
                'avonni-calendar__scrolling': this.isMultiCalendars
            })
            .toString();
    }

    /**
     * Disable interaction on next date layout.
     */
    get disabledNext() {
        let disabled = this.disabled;
        const month = this.displayDate.getMonth() + 1;
        const nextDate = setDate(this.displayDate, 'month', month, 1);
        const maxDate = this.endOfMonth(this.computedMax);

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
        const startOfDayDate = startOfDay(this.computedMin);
        const minDate = setDate(startOfDayDate, 'month', 0, 0);

        if (previousDate.getTime() < minDate.getTime()) {
            disabled = true;
        }

        return disabled;
    }

    /**
     * Check if current date is between the min-max interval.
     */
    get isCurrentDateBetweenMinAndMax() {
        return (
            this.computedMin.getTime() <= new Date().getTime() &&
            new Date().getTime() <= this.computedMax.getTime()
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
     * Check if there are multiple month calendars.
     *
     * @return {boolean}
     */
    get isMultiCalendars() {
        return this.nbMonthCalendars > 1;
    }

    /**
     * Compute year list spread from min and max.
     */
    get yearsList() {
        let startYear = this.computedMin.getFullYear();
        let endYear = this.computedMax.getFullYear();

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
        if (isInvalidDate(dateValue)) {
            return;
        }

        this._focusDate = getDateWithTimezone(dateValue, this.timezone);
        // Previously, display date was updated, but `updateDateParameters` wasn't called to update the view, so it didn't change the position the calendar.
        // The method `focusDate` should not move the position of the calendar, this is the role of `goToDate`.
        // If changing the year immedialely using the select options or the arrows to change months, it would be based on the new display date
        // whose changes were not reflected in the view yet. Therefore, the update of the display date by the method `focusDate` was removed.
        // this.displayDate = getDateWithTimezone(dateValue, this.timezone);
        this.computeFocusAll();
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
        const selectedDate = getDateWithTimezone(date, this.timezone);
        if (isInvalidDate(selectedDate)) {
            console.warn(`The date ${date} is not valid.`);
            return;
        }
        this.displayDate = selectedDate;
        this.updateDateParameters();
        this.computeFocusAll();
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
     * Compute the class for a month button.
     *
     * @param {boolean} hasButton If present, the button is visible.
     * @returns {string} The computed month button class.
     */
    computeMonthButtonClass(hasButton) {
        return classSet('slds-align-middle')
            .add({
                'slds-hidden': !hasButton
            })
            .toString();
    }

    /**
     * Place focus according to keyboard selection
     *
     * @param {boolean} applyFocus Focus point is always computed, but is only focused if applyFocus is true.
     * @param {Date} [focusDate=this._focusDate] The date that should receive focus inside the calendar.
     * @param {number|null} [index] The index of the calendar to focus. If null or undefined, the index is
     *  resolved by matching the focus date’s year and month against rendered
     *  calendar components.
     */
    computeFocus(applyFocus, focusDate = this._focusDate, index) {
        requestAnimationFrame(() => {
            let resolvedIndex = index;

            // Set index from focused date if not explicitly provided
            if (resolvedIndex == null && focusDate) {
                const year = focusDate.getFullYear();
                const monthIndex = focusDate.getMonth();

                resolvedIndex = Number(
                    this.template.querySelector(
                        `[data-element-id="avonni-calendar__primitive-calendar"]` +
                            `[data-year="${year}"][data-month-index="${monthIndex}"]`
                    )?.dataset.index ?? 0
                );
            }
            // Fallback to first calendar
            resolvedIndex = resolvedIndex ?? 0;

            const calendar = this.template.querySelector(
                `[data-element-id="avonni-calendar__primitive-calendar"][data-index="${resolvedIndex}"]`
            );

            calendar?.focusDate(focusDate, applyFocus);
        });
    }

    /**
     * Compute the focus for all the calendars
     */
    computeFocusAll() {
        requestAnimationFrame(() => {
            const calendars = this.template.querySelectorAll(
                '[data-element-id="avonni-calendar__primitive-calendar"]'
            );
            calendars.forEach((calendar) => {
                calendar.focusDate(null, false);
            });
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
     * Focus the container to avoid focus loss when selectng a date or navigating with keyboard.
     */
    focusContainer() {
        this.template
            .querySelector('[data-element-id="avonni-calendar__container"]')
            ?.focus();
    }

    /**
     * Generate the calendar data.
     */
    generateViewData() {
        const calendarDataList = [];

        const firstIndex = 0;
        const lastIndex = this._nbMonthCalendars - 1;
        for (
            let monthOffset = 0;
            monthOffset < this._nbMonthCalendars;
            monthOffset++
        ) {
            const displayDate = new Date(this.displayDate);
            displayDate.setDate(1);
            displayDate.setMonth(displayDate.getMonth() + monthOffset);

            const year = displayDate.getFullYear();
            const monthIndex = displayDate.getMonth();
            const month = MONTHS[monthIndex];
            const hasPreviousButton = monthOffset === firstIndex;
            const hasNextButton = monthOffset === lastIndex;
            const hasYearSelectOption = monthOffset === lastIndex;
            const computedPreviousButtonClass =
                this.computeMonthButtonClass(hasPreviousButton);
            const computedNextButtonClass =
                this.computeMonthButtonClass(hasNextButton);

            // We have to use the monthOffset has a key, otherwise we lose focus on the next/previous buttons
            // Since we have a if _connected for each api of avonni-primitive-calendar to generate the view, it won't cause a problem.
            calendarDataList.push({
                id: `${monthOffset}`,
                hasPreviousButton,
                hasNextButton,
                computedPreviousButtonClass,
                computedNextButtonClass,
                hasYearSelectOption,
                year,
                month,
                monthIndex,
                displayDate
            });
        }
        this.calendarDataList = calendarDataList;
    }

    /**
     * Returns current date if it is between the min-max interval. If not, returns the min.
     *
     * @return {DateTime}
     */
    getCurrentDateOrMin() {
        if (this.isCurrentDateBetweenMinAndMax) {
            return getDateWithTimezone(new Date(), this.timezone);
        }
        return new Date(this.computedMin);
    }

    /**
     * Initialize the date labels to include the timezone.
     */
    initDateLabels() {
        this.computedDateLabels = computeLabelDates(
            this.dateLabels,
            this.timezone
        );
    }

    /**
     * Initialize all the properties depending on dates, to include the timezone and set them to the beginning of the day.
     */
    initDates() {
        const max = getDateWithTimezone(this.max, this.timezone);
        const min = getDateWithTimezone(this.min, this.timezone);
        this.computedMax = setDate(max, 'hours', 0, 0, 0, 0);
        this.computedMin = setDate(min, 'hours', 0, 0, 0, 0);
        this.initDateLabels();
        this.initDisabledDates();
        this.initMarkedDates();
        this.initValue();

        if (this.displayDate) {
            this.displayDate = startOfDay(this.displayDate);
        }
    }

    /**
     * Initialize the disabled dates to include the timezone and set them to the beginning of the day.
     */
    initDisabledDates() {
        this.computedDisabledDates = computeDisabledDates(
            this.disabledDates,
            this.timezone
        );
    }

    /**
     * Initialize the displayed date to center the calendar on the appropriate month.
     */
    initDisplayDate() {
        let date = getDateWithTimezone(DEFAULT_DATE, this.timezone);
        if (this.computedValue[0]) {
            date = this.computedValue[0];
        } else if (date < this.computedMin) {
            date = this.computedMin;
        } else if (date > this.computedMax) {
            date = this.computedMax;
        }
        this.displayDate = new Date(date);
    }

    /**
     * Initialize the marked dates to include the timezone and set them to the beginning of the day.
     */
    initMarkedDates() {
        this.computedMarkedDates = computeMarkedDates(
            this.markedDates,
            this.timezone
        );
    }

    /**
     * Initialize the value to include the timezone, sort them and set them to the beginning of the day.
     */
    initValue() {
        this.computedValue = computeSelectedDates(this.value, this.timezone);
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
     * Set the display date when multiple calendars are shown.
     */
    setDisplayDateMultipleCalendars() {
        if (!this.isMultiCalendars) return;
        const isAnyValueVisible = this.computedValue.some((dateValue) => {
            const date = new Date(dateValue);
            const year = date.getFullYear();
            const monthIndex = date.getMonth();

            return this.calendarDataList?.some(
                (calendar) =>
                    calendar.year === year && calendar.monthIndex === monthIndex
            );
        });

        // First-time initialization or update only if ALL values are outside ALL calendars
        if (!this.displayDate || !isAnyValueVisible) {
            this.displayDate = new Date(this.computedValue[0]);
        }
    }

    /**
     * Update the dates displayed and generate the view data.
     */
    updateDateParameters() {
        this.year = this.displayDate.getFullYear();
        this.month = MONTHS[this.displayDate.getMonth()];
        this.updateSelectYear();
        this.generateViewData();
    }

    /**
     * Update the select year.
     */
    updateSelectYear() {
        const selectYear = this.template.querySelector(
            '[data-element-id="select-year"]'
        );
        if (selectYear) {
            selectYear.value = this.year;
        }
    }

    /**
     * Update the value with the current computed value.
     */
    updateValue() {
        if (!this.computedValue.length) {
            this._value = this.selectionMode === 'single' ? null : [];
            return;
        }
        const stringDates = this.computedValue.map((date) => {
            return this.toISO(date);
        });
        this._value =
            this.selectionMode === 'single' ? stringDates[0] : stringDates;
    }

    /**
     * If invalid current day, center calendar's current day to closest date in min-max interval
     */
    validateCurrentDayValue() {
        if (!this.computedValue.length) {
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
        const minValue = this.computedValue[0];
        const maxValue = this.computedValue[this.computedValue.length - 1];
        const initComputedValue = deepCopy(this.computedValue);

        if (this.allValuesOutsideMinAndMax) {
            if (
                isBeforeMin(minValue, this.computedMin) &&
                isAfterMax(maxValue, this.computedMax)
            ) {
                this.computedValue = [
                    new Date(this.computedMin),
                    new Date(this.computedMax)
                ];
                this.displayDate = new Date(this.computedMin);
            } else {
                this.computedValue = [];
                this.displayDate = this.getCurrentDateOrMin();
            }
            this.updateDateParameters();
        } else {
            this.computedValue = removeValuesOutsideRange(
                this.computedValue,
                this.computedMin,
                this.computedMax
            );

            if (this.computedValue.length) {
                // Check if previous min-max values saved were outside of range to create interval
                if (this.computedValue.length === 1) {
                    this.computedValue = setIntervalWithOneValidValue(
                        this.computedValue,
                        this.computedMin,
                        this.computedMax,
                        minValue,
                        maxValue
                    );
                }
                const shouldUpdateDisplayDate =
                    !this.isMultiCalendars ||
                    (this.isMultiCalendars &&
                        !equal(initComputedValue, this.computedValue));
                if (shouldUpdateDisplayDate) {
                    this.displayDate = new Date(this.computedValue[0]);
                }
                this.updateDateParameters();
            }
        }
    }

    /**
     * Validate value for multiple selection mode.
     */
    validateValueMultipleMode() {
        const initComputedValue = deepCopy(this.computedValue);
        this.computedValue = removeValuesOutsideRange(
            this.computedValue,
            this.computedMin,
            this.computedMax
        );

        if (this.computedValue.length) {
            const shouldUpdateDisplayDate =
                !this.isMultiCalendars ||
                (this.isMultiCalendars &&
                    !equal(initComputedValue, this.computedValue));
            if (shouldUpdateDisplayDate) {
                this.displayDate = new Date(this.computedValue[0]);
            }
            this.updateDateParameters();
        }
    }

    /**
     * Validate value for single selection mode.
     */
    validateValueSingleMode() {
        // If multiple values are selected, we remove those outside range
        if (this.computedValue && this.computedValue.length > 1) {
            this.computedValue = removeValuesOutsideRange(
                this.computedValue,
                this.computedMin,
                this.computedMax
            );
        }
        // If one single value, we check if it's in interval and set to closest value if not
        else {
            if (isInvalidDate(this.computedValue[0])) {
                this.computedValue = [];
                this.displayDate = this.getCurrentDateOrMin();
            } else if (isAfterMax(this.computedValue[0], this.computedMax)) {
                this.computedValue = [];
                this.displayDate = new Date(this.computedMax);
            } else if (isBeforeMin(this.computedValue[0], this.computedMin)) {
                this.computedValue = [];
                this.displayDate = new Date(this.computedMin);
            }
            this.updateDateParameters();
        }
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS AND DISPATCHERS
     * -------------------------------------------------------------
     */

    /**
     * Private blur handler.
     */
    handleBlur(event) {
        if (
            event.relatedTarget &&
            this.template.contains(event.relatedTarget)
        ) {
            return;
        }
        /**
         * The event fired when the focus is removed from the calendar.
         *
         * @event
         * @name blur
         * @public
         */
        this.dispatchEvent(new CustomEvent('blur'));

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

        const focusDate = new Date(Number(event.detail.fullDate));
        if (isInvalidDate(focusDate)) {
            return;
        }
        this._focusDate = focusDate;
        this.handleFocus(event);
    }

    /**
     * Private focus handler.
     */
    handleFocus(event) {
        if (
            event.relatedTarget &&
            this.template.contains(event.relatedTarget)
        ) {
            return;
        }

        /**
         * The event fired when the focus is set on the calendar.
         *
         * @event
         * @name focus
         * @public
         */
        this.dispatchEvent(new CustomEvent('focus'));

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
     * Keyboard date selection handler.
     *
     * @param {Event} event
     */
    handleKeyDownDate(event) {
        const nextDateTimeStamp = Number(event.detail.nextDate);
        const fullDateTimeStamp = Number(event.detail.fullDate);
        const dataIndex = Number(event.currentTarget.dataset.index);
        if (isNaN(nextDateTimeStamp) || isNaN(fullDateTimeStamp)) {
            return;
        }
        const initialDate = new Date(fullDateTimeStamp);
        const nextDate = new Date(nextDateTimeStamp);

        const isNavigate =
            initialDate.getMonth() !== nextDate.getMonth() ||
            initialDate.getFullYear() !== nextDate.getFullYear();

        // Handle navigation for single calendar
        if (isNavigate && !this.isMultiCalendars) {
            this.dispatchNavigateEvent(nextDate);
        }
        // Clamping the next date based on the min and max
        let computedNextDate;
        if (nextDate.getTime() < this.computedMin.getTime()) {
            computedNextDate = this.computedMin;
        } else if (nextDate.getTime() > this.computedMax.getTime()) {
            computedNextDate = this.computedMax;
        } else {
            computedNextDate = nextDate;
        }
        this._focusDate = computedNextDate;

        // On multi calendars navigation
        if (isNavigate && this.isMultiCalendars) {
            const firstDayOfMonth = setDate(computedNextDate, 'date', 1);
            const nextYear = computedNextDate.getFullYear();
            const nextMonthIndex = computedNextDate.getMonth();
            const isOutsideCalendarList = !this.calendarDataList.some(
                ({ monthIndex, year }) =>
                    monthIndex === nextMonthIndex && year === nextYear
            );

            // Navigate outside the calendar list
            if (isOutsideCalendarList) {
                // We adjust the date so that the displayed calendars are only shifted by the necessary months
                const adjustedDate = setDate(
                    firstDayOfMonth,
                    'month',
                    computedNextDate.getMonth() - dataIndex
                );
                this.dispatchNavigateEvent(adjustedDate);
                this.displayDate = adjustedDate;
            }
            // We leave the displayDate unchanged if the calendars are not shifted
        }

        // Single calendar always syncs display date
        if (!this.isMultiCalendars) {
            this.displayDate = computedNextDate;
        }

        this.focusContainer();
        this.updateDateParameters();
        this.computeFocusAll();
        this.computeFocus(true, computedNextDate);
    }

    /**
     * Mouse out date handler.
     */
    handleMouseOutDate() {
        const calendars = this.template.querySelectorAll(
            '[data-element-id="avonni-calendar__primitive-calendar"]'
        );
        calendars.forEach((calendar) => {
            calendar.mouseOutDate();
        });
    }

    /**
     * Mouse over date handler.
     */
    handleMouseOverDate(event) {
        const day = Number(event.detail.day);

        const calendars = this.template.querySelectorAll(
            '[data-element-id="avonni-calendar__primitive-calendar"]'
        );
        calendars.forEach((calendar) => {
            // We need to remove the borders on the dates first
            calendar.mouseOutDate();
            calendar.mouseOverDate(day);
        });
    }

    /**
     * Next month handler.
     */
    handlerNextMonth() {
        // We have to get the first day of month.
        // Otherwise, setDate will skip 2 months instead of 1 if the display date is the last day of the month
        const firstDayOfMonth = setDate(this.displayDate, 'date', 1);
        const month = firstDayOfMonth.getMonth() + 1;
        this.displayDate = setDate(firstDayOfMonth, 'month', month);
        this.updateDateParameters();
        this.computeFocusAll();
        this.computeFocus(false);
        this.dispatchNavigateEvent(this.displayDate);
    }

    /**
     * Previous month handler.
     */
    handlerPreviousMonth() {
        // We have to get the first day of month.
        // Otherwise, setDate will skip 2 months instead of 1, if the display date is the last day of the month
        const firstDayOfMonth = setDate(this.displayDate, 'date', 1);
        const month = firstDayOfMonth.getMonth() - 1;
        this.displayDate = setDate(firstDayOfMonth, 'month', month);
        this.updateDateParameters();
        this.computeFocusAll();
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

        const { bounds, fullDate, disabled, isDateHidden } = event.detail;
        const dataIndex = Number(event.currentTarget.dataset.index);
        const date = new Date(Number(fullDate));
        if (isInvalidDate(date) || disabled || isDateHidden) {
            return;
        }

        switch (this.selectionMode) {
            case 'interval':
                this.computedValue = this.isSelectedInterval(
                    this.computedValue,
                    date
                );
                break;
            case 'multiple':
                this.computedValue = this.isSelectedMultiple(
                    this.computedValue,
                    date
                );
                break;
            default: {
                const unselect =
                    this.computedValue.length &&
                    this.computedValue[0].getTime() === date.getTime();
                this.computedValue = unselect ? [] : [date];
                break;
            }
        }
        const clickedDate = this.toISO(date);
        // When deadling with multiple calendars, we leave the display date unchanged
        this.displayDate = this.isMultiCalendars ? this.displayDate : date;
        this.focusContainer();
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
                    bounds: bounds,
                    value: this.value,
                    clickedDate
                }
            })
        );
        this.computeFocusAll();
        this.computeFocus(true, date, dataIndex);
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

        if (this.displayDate.getTime() < this.computedMin.getTime()) {
            const month = this.computedMin.getMonth();
            this.displayDate = setDate(this.displayDate, 'month', month);
        }

        if (this.displayDate.getTime() > this.computedMax.getTime()) {
            const month = this.computedMax.getMonth();
            this.displayDate = setDate(this.displayDate, 'month', month);
        }

        this.dispatchNavigateEvent(this.displayDate);
        this.updateDateParameters();
        event.stopPropagation();
        this.computeFocusAll();
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
