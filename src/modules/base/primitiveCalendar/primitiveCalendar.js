import { LightningElement, api } from 'lwc';
import {
    classSet,
    deepCopy,
    generateUUID,
    normalizeBoolean,
    normalizeString,
    normalizeArray
} from 'c/utils';
import { setDate, getStartOfWeek, DateTime } from 'c/dateTimeUtils';
import { keyValues } from 'c/utilsPrivate';
import { equal } from 'c/utilsPrivate';

import {
    CalendarDate,
    computeDisabledDates,
    computeLabelDates,
    computeMarkedDates,
    computeSelectedDates,
    DAYS,
    DEFAULT_DATE,
    DEFAULT_MAX,
    DEFAULT_MIN,
    DEFAULT_WEEK_START_DAY,
    fullDatesFromArray,
    isInvalidDate,
    monthDaysFromArray,
    SELECTION_MODES,
    startOfDay,
    weekDaysFromArray
} from 'c/calendarUtils';

const SELECTOR_IS_VISIBLE = ':not([data-is-date-hidden="true"])';

const SELECTOR_HAS_BORDER = `${SELECTOR_IS_VISIBLE}:not([data-is-week-disabled="true"])`;

/**
 * @class
 * @descriptor avonni-primitive-calendar
 */
export default class PrimitiveCalendar extends LightningElement {
    // To avoid shifting the dates infinitely due to a timezone difference, the date labels, display date, disabled dates, and
    // marked dates are expected to be timezone normalized by the parent component avonni-calendar.
    // The validation and timezone of the display date and value are expected to be handled by the parent component avonni-calendar as well.
    _dateLabels = [];
    _displayDate = DEFAULT_DATE;
    _disabled = false;
    _disabledDates = [];
    _isMultiCalendars = false;
    _markedDates = [];
    _max = DEFAULT_MAX;
    _min = DEFAULT_MIN;
    _selectionMode = SELECTION_MODES.default;
    _timezone;
    _value = [];
    _weekNumber = false;
    _weekStartDay = DEFAULT_WEEK_START_DAY;

    _computedDateLabels = [];
    _computedDisabledDates = [];
    _computedDisplayDate = DEFAULT_DATE;
    _computedMarkedDates = [];
    _computedMax = DEFAULT_MAX;
    _computedMin = DEFAULT_MIN;
    _computedValue = [];
    _connected = false;

    calendarData = [];
    weekdays = [];

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        this.initWeekdays();
        this.initDates();
        this.generateViewData();
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
     * Array of disabled dates. Dates must be a Date object.
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
     * The display date. The date should be a Date object.
     *
     * @public
     * @type {Date}
     */
    @api
    get displayDate() {
        return this._displayDate;
    }
    set displayDate(value) {
        this._displayDate = isInvalidDate(value) ? DEFAULT_DATE : value;
        this._computedDisplayDate = new Date(this._displayDate);
        if (this._connected) {
            this.generateViewData();
        }
    }

    /**
     * If present, there are multiple calendars.
     *
     * @public
     * @type {boolean}
     */
    @api
    get isMultiCalendars() {
        return this._isMultiCalendars;
    }
    set isMultiCalendars(value) {
        this._isMultiCalendars = normalizeBoolean(value);
        if (this._connected) {
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
        this._computedMax = new Date(this._max);
        if (this._connected) {
            this.generateViewData();
        }
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
        this._computedMin = new Date(this._min);

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
            this.generateViewData();
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
            this.generateViewData();
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
            this.generateViewData();
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
            this.initWeekdays();
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
            this.initWeekdays();
            this.generateViewData();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Computed class for the table.
     *
     * @return {string}
     */
    get computedTableClasses() {
        return classSet(
            'slds-datepicker__month slds-is-relative avonni-primitive-calendar__table'
        )
            .add({
                'avonni-primitive-calendar__date-with-labels': this.isLabeled
            })
            .toString();
    }

    /**
     * Generate unique ID key.
     */
    get generateKey() {
        return generateUUID();
    }

    /**
     * Check if the calendar is labeled.
     *
     * @return {boolean}
     */
    get isLabeled() {
        return this._dateLabels.length > 0;
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

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Set the focus on a given date.
     *
     * @param {Date} focusDate A value to be focused, which can be a Date object, timestamp, or an ISO8601 formatted string.
     * @param {boolean} applyFocus Focus point is always computed, but is only focused if applyFocus is true.
     * @public
     */
    @api
    focusDate(focusDate, applyFocus) {
        // if a date was previously selected or focused, focus the same date in this month.
        let selectedMonthDate, rovingDate;
        if (focusDate) {
            rovingDate = focusDate.getTime();
            selectedMonthDate = setDate(
                this._computedDisplayDate,
                'date',
                focusDate.getDate()
            ).getTime();
        }
        const firstOfMonthDate = startOfDay(
            setDate(this._computedDisplayDate, 'date', 1)
        ).getTime();

        requestAnimationFrame(() => {
            const rovingFocusDate = this.template.querySelector(
                `[data-element-id="td"][data-full-date="${rovingDate}"]${SELECTOR_IS_VISIBLE}`
            );
            const selectedDates = this.template.querySelectorAll(
                `[data-selected="true"]${SELECTOR_IS_VISIBLE}`
            );
            const todaysDate = this.template.querySelector(
                `[data-today="true"]${SELECTOR_IS_VISIBLE}`
            );
            const firstOfMonth = this.template.querySelector(
                `[data-element-id="td"][data-full-date="${firstOfMonthDate}"]:not([data-disabled="true"])`
            );
            const rovingMonthDate = this.template.querySelector(
                `[data-element-id="td"][data-full-date="${selectedMonthDate}"]${SELECTOR_IS_VISIBLE}`
            );
            const firstValidDate = this.template.querySelector(
                `[data-element-id="td"]:not([data-disabled="true"])${SELECTOR_IS_VISIBLE}`
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
     * Simulates a mouseout event on the calendar by removing the borders on the dates.
     *
     * @public
     */
    @api mouseOutDate() {
        this.removeDateBorder();
    }

    /**
     * Simulates a mouseon event on a calendar date by adding borders.
     * @param {number} day The timestamp of the date.
     * @public
     */
    @api mouseOverDate(day) {
        this.addDateBorder(day);
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Add borders on cells
     * @param {number} day The timestamp of the date
     */
    addDateBorder(day) {
        if (
            this.selectionMode !== 'interval' ||
            day === undefined ||
            day === null
        ) {
            return;
        }

        const computedDay = Number(day);
        if (isNaN(computedDay)) {
            return;
        }
        const dayCell = this.template.querySelector(
            `[data-full-date="${computedDay}"]${SELECTOR_HAS_BORDER}`
        );
        const timeArray = this._computedValue
            .map((x) => x.getTime())
            .sort((a, b) => a - b);
        const cellSelector = `td${SELECTOR_HAS_BORDER}`;
        if (timeArray.length === 1) {
            if (computedDay > timeArray[0]) {
                dayCell?.classList.add(
                    'avonni-primitive-calendar__cell_bordered-right'
                );
                this.template.querySelectorAll(cellSelector).forEach((x) => {
                    const timestamp = Number(x.getAttribute('data-full-date'));
                    if (timestamp >= timeArray[0] && timestamp <= computedDay) {
                        x.classList.add(
                            'avonni-primitive-calendar__cell_bordered-top_bottom'
                        );
                    }
                });
            }
            if (computedDay < timeArray[0]) {
                dayCell?.classList.add(
                    'avonni-primitive-calendar__cell_bordered-left'
                );
                this.template.querySelectorAll(cellSelector).forEach((x) => {
                    const timestamp = Number(x.getAttribute('data-full-date'));
                    if (timestamp <= timeArray[0] && timestamp >= computedDay) {
                        x.classList.add(
                            'avonni-primitive-calendar__cell_bordered-top_bottom'
                        );
                    }
                });
            }
        } else if (timeArray.length === 2) {
            if (computedDay > timeArray[1]) {
                dayCell?.classList.add(
                    'avonni-primitive-calendar__cell_bordered-right'
                );
                this.template.querySelectorAll(cellSelector).forEach((x) => {
                    const timestamp = Number(x.getAttribute('data-full-date'));
                    if (timestamp >= timeArray[1] && timestamp <= computedDay) {
                        x.classList.add(
                            'avonni-primitive-calendar__cell_bordered-top_bottom'
                        );
                    }
                });
            }
            if (computedDay < timeArray[0]) {
                dayCell?.classList.add(
                    'avonni-primitive-calendar__cell_bordered-left'
                );
                this.template.querySelectorAll(cellSelector).forEach((x) => {
                    const timestamp = Number(x.getAttribute('data-full-date'));
                    if (timestamp <= timeArray[0] && timestamp >= computedDay) {
                        x.classList.add(
                            'avonni-primitive-calendar__cell_bordered-top_bottom'
                        );
                    }
                });
            }
        }
    }

    /**
     * Initialize the date labels without including the timezone.
     */
    initDateLabels() {
        this._computedDateLabels = computeLabelDates(this.dateLabels, '');
    }

    /**
     * Initialize all the properties depending on dates, without including the timezone and set them to the beginning of the day.
     */
    initDates() {
        const max = new Date(this.max);
        const min = new Date(this.min);
        this._computedMax = setDate(max, 'hours', 0, 0, 0, 0);
        this._computedMin = setDate(min, 'hours', 0, 0, 0, 0);
        this._computedDisplayDate = new Date(this._displayDate);
        this.initDateLabels();
        this.initDisabledDates();
        this.initMarkedDates();
        this.initValue();
    }

    /**
     * Initialize the disabled dates without including the timezone and set them to the beginning of the day.
     */
    initDisabledDates() {
        this._computedDisabledDates = computeDisabledDates(
            this.disabledDates,
            ''
        );
    }

    /**
     * Initialize the marked dates without including the timezone and set them to the beginning of the day.
     */
    initMarkedDates() {
        this._computedMarkedDates = computeMarkedDates(this.markedDates, '');
    }

    /**
     * Initialize the value, sort them and set them to the beginning of the day. The timezone is expected to have been included by the parent.
     */
    initValue() {
        this._computedValue = computeSelectedDates(this._value, '');
    }

    /**
     * Generate the calendar data.
     */
    generateViewData() {
        const today = startOfDay(new Date());

        const mode = this.selectionMode;
        const firstValue = this._computedValue[0];
        const lastValue = this._computedValue[this._computedValue.length - 1];
        const isInterval =
            mode === 'interval' && this._computedValue.length >= 2;

        const calendarData = [];

        const displayDate = new Date(this._computedDisplayDate);
        displayDate.setDate(1);

        const currentMonth = displayDate.getMonth();
        const firstDay = setDate(displayDate, 'date', 1);
        let date = getStartOfWeek(firstDay, this.weekStartDay);

        // Add an array per week
        for (let i = 0; i < 6; i++) {
            const weekData = [];
            const isWeekDisabled =
                date.getMonth() !== currentMonth && this.isMultiCalendars;
            // The first week number must always be visible
            const isWeekNumberHidden =
                isWeekDisabled && this.isMultiCalendars && i !== 0;

            if (this.weekNumber) {
                // Week number
                weekData.push(
                    new CalendarDate({
                        date,
                        disabled: isWeekDisabled,
                        isDateHidden: isWeekNumberHidden,
                        isWeekNumber: true
                    })
                );
            }

            // Add 7 days to each week
            for (let a = 0; a < 7; a++) {
                const time = date.getTime();
                const disabledDate = this.getIsDisabled(date);
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
                            startOfDay(value).getTime() ===
                            startOfDay(time).getTime()
                        );
                    });
                } else if (firstValue) {
                    selected =
                        startOfDay(firstValue).getTime() ===
                        startOfDay(time).getTime();
                }
                const isAdjacentMonth = date.getMonth() !== currentMonth;
                const isDateHidden = this.isMultiCalendars && isAdjacentMonth;
                weekData.push(
                    new CalendarDate({
                        adjacentMonth: isAdjacentMonth,
                        date,
                        disabled:
                            this.disabled ||
                            disabledDate ||
                            outsideOfMinMax ||
                            isDateHidden,
                        isDateHidden: isDateHidden,
                        isPartOfInterval,
                        isToday: today.getTime() === time,
                        ...(isPartOfInterval && {
                            isStartDate: firstValue.getTime() === time,
                            isEndDate: lastValue.getTime() === time
                        }),
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
            if (!isInvalidDate(labelDate)) {
                const startOfDayDate = startOfDay(labelDate);
                labelAsTime = startOfDayDate.getTime();
            }

            return (
                labelAsTime === date.getTime() ||
                labelAsNumber === date.getDate() ||
                weekday === labelDate.getDay()
            );
        });
    }

    /**
     * Check if the given date is disabled.
     *
     * @param {DateTime} date Date to check.
     * @returns {boolean} True if the date is disabled.
     */
    getIsDisabled(date) {
        const dates = this._computedDisabledDates;
        const time = startOfDay(date).getTime();
        const dateTime = new DateTime(date);
        const weekday = dateTime.getUnit('weekday', 'short').replace(/\.$/, '');
        const monthDay = dateTime.day;
        return (
            fullDatesFromArray(dates).indexOf(time) > -1 ||
            weekDaysFromArray(dates).indexOf(weekday) > -1 ||
            monthDaysFromArray(dates).indexOf(monthDay) > -1
        );
    }

    /**
     * Get the markers for the given date.
     *
     * @param {DateTime} date Date to get the markers for.
     * @returns {string[]} Array of marker styles.
     */
    getMarkers(date) {
        const markers = [];
        const time = startOfDay(date).getTime();
        const dateTime = new DateTime(date, this.timezone);
        const weekday = dateTime.getUnit('weekday', 'short');
        const monthDay = dateTime.day;

        this._computedMarkedDates.forEach((marker) => {
            const dateArray = [marker.date];
            if (
                fullDatesFromArray(dateArray).indexOf(time) > -1 ||
                weekDaysFromArray(dateArray).indexOf(weekday) > -1 ||
                monthDaysFromArray(dateArray).indexOf(monthDay) > -1
            ) {
                markers.push(`background-color: ${marker.color}`);
            }
        });
        // A maximum of 3 markers are displayed per date
        return markers.slice(0, 3);
    }

    /**
     * Initialize the weekdays headers.
     */
    initWeekdays() {
        const days = DAYS.slice(this.weekStartDay).concat(
            DAYS.slice(0, this.weekStartDay)
        );
        if (this.weekNumber) {
            days.unshift('');
        }
        this.weekdays = days;
    }

    /**
     * Remove borders on cells
     */
    removeDateBorder() {
        this.template.querySelectorAll('td').forEach((x) => {
            x.classList.remove(
                'avonni-primitive-calendar__cell_bordered-top_bottom'
            );
            x.classList.remove(
                'avonni-primitive-calendar__cell_bordered-right'
            );
            x.classList.remove('avonni-primitive-calendar__cell_bordered-left');
        });
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
     * Handler of a date focus.
     */
    handleDateFocus(event) {
        if (!event.currentTarget) {
            return;
        }
        const fullDate = event.currentTarget.dataset.fullDate;
        /**
         * The event fired when a focus target is found in the public method focusDate().
         * The focused date passed to focusDate() is not necessarily the same as the focus target.
         * Therefore, it allows to sync the focusDate to the parent.
         *
         * @event
         * @public
         * @name datefocus
         * @param {string} fullDate The focused date
         */
        this.dispatchEvent(
            new CustomEvent('datefocus', {
                detail: {
                    fullDate
                }
            })
        );
    }

    /**
     * Mouse out handler.
     */
    handleMouseOut() {
        this.dispatchMouseOutDate();
    }

    /**
     * Mouse over handler.
     */
    handleMouseOver(event) {
        const { isDateHidden, isWeekDisabled } = event.target.dataset;
        // We don't want to draw border on hidden dates or disabled week number on mouseover
        if (isDateHidden === 'true' || isWeekDisabled === 'true') {
            this.dispatchMouseOutDate();
            return;
        }
        const day = Number(event.target.getAttribute('data-full-date'));
        this.dispatchMouseOverDate(day);
    }

    /**
     * Date selection handler.
     *
     * @param {object} event
     */
    handleSelectDate(event) {
        const { fullDate, disabled, isDateHidden } =
            event.currentTarget.dataset;
        /**
         * The event fired when the selected date is changed.
         *
         * @event
         * @public
         * @name selectdate
         * @param {DOMRect} bounds The size and position of the clicked date in the viewport.
         * @param {number} fullDate The selected date.
         * @param {boolean} disabled If present, the selected date is disabled.
         * @param {boolean} isDateHidden If present, the selected date is hidden.
         */
        this.dispatchEvent(
            new CustomEvent('selectdate', {
                detail: {
                    bounds: event.currentTarget.getBoundingClientRect(),
                    fullDate: Number(fullDate),
                    disabled: disabled === 'true',
                    isDateHidden: isDateHidden === 'true'
                }
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
        if (isNaN(fullDate)) {
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
                    nextDate = getStartOfWeek(initialDate, this.weekStartDay);
                    break;
                case keyValues.end: {
                    const startOfWeek = getStartOfWeek(
                        initialDate,
                        this.weekStartDay
                    );
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

        /**
         * The event fired when the selected date is changed by key.
         *
         * @event
         * @public
         * @name keydowndate
         * @param {number} fulldate The current date timestamp
         * @param {number} nextDate The next date timestamp
         */
        this.dispatchEvent(
            new CustomEvent('keydowndate', {
                detail: {
                    fullDate,
                    nextDate: nextDate.getTime()
                }
            })
        );
    }

    /*
     * ------------------------------------------------------------
     *  EVENT DISPATCHERS
     * -------------------------------------------------------------
     */

    /**
     * The event fired when a date is moused out.
     *
     * @event
     * @public
     * @name mouseoutdate
     */
    dispatchMouseOutDate() {
        this.dispatchEvent(new CustomEvent('mouseoutdate'));
    }

    /**
     * The event fired when a date is moused over.
     *
     * @event
     * @public
     * @name mouseoverdate
     * @param {number} day The timestamp of the date moused over
     */
    dispatchMouseOverDate(day) {
        this.dispatchEvent(
            new CustomEvent('mouseoverdate', {
                detail: {
                    day
                }
            })
        );
    }
}
