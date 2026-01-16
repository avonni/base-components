import { LightningElement, api } from 'lwc';
import {
    classSet,
    generateUUID,
    normalizeBoolean,
    normalizeString,
    normalizeArray
} from 'c/utils';
import { setDate, getStartOfWeek, startOfDay } from 'c/dateTimeUtils';
import { keyValues } from 'c/utilsPrivate';

const DEFAULT_WEEK_START_DAY = 0;

const SELECTION_MODES = {
    valid: ['single', 'multiple', 'interval'],
    default: 'single'
};

const SELECTOR_IS_VISIBLE = ':not([data-is-date-hidden="true"])';

const SELECTOR_HAS_BORDER = `${SELECTOR_IS_VISIBLE}:not([data-is-week-disabled="true"])`;

export default class PrimitiveCalendar extends LightningElement {
    _calendarData = [];
    _isLabeled = false;
    _isMultiSelect = false;
    _selectionMode = SELECTION_MODES.default;
    _value = [];
    _weekdays = [];
    _weekStartDay = DEFAULT_WEEK_START_DAY;

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Array of weekdays.
     *
     * @public
     * @type {object[]}
     */
    @api
    get calendarData() {
        return this._calendarData;
    }
    set calendarData(value) {
        this._calendarData = normalizeArray(value);
    }

    /**
     * If present, the calendar is labeled.
     *
     * @public
     * @type {boolean}
     */
    @api
    get isLabeled() {
        return this._isLabeled;
    }
    set isLabeled(value) {
        this._isLabeled = normalizeBoolean(value);
    }

    /**
     * If present, the calendar is multi selectable
     *
     * @public
     * @type {boolean}
     */
    @api
    get isMultiSelect() {
        return this._isMultiSelect;
    }
    set isMultiSelect(value) {
        this._isMultiSelect = normalizeBoolean(value);
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
    }

    /**
     * The value of the selected date(s). Dates can be a Date object, timestamp, or an ISO8601 formatted string.
     *
     * @public
     * @type {string[]}
     */
    @api
    get value() {
        return this._value;
    }
    set value(value) {
        const normalizedValue =
            value && !Array.isArray(value)
                ? [this.value]
                : normalizeArray(value);
        this._value = normalizedValue;
    }

    /**
     * Array of weekdays.
     *
     * @public
     * @type {object[]}
     */
    @api
    get weekdays() {
        return this._weekdays;
    }
    set weekdays(value) {
        this._weekdays = normalizeArray(value);
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
            'slds-datepicker__month slds-is-relative avonni-calendar__table'
        )
            .add({ 'avonni-calendar__date-with-labels': this._isLabeled })
            .toString();
    }

    /**
     * Generate unique ID key.
     */
    get generateKey() {
        return generateUUID();
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
     * @param {Date} displayDate A value to be displayed, which can be a Date object, timestamp, or an ISO8601 formatted string.
     * @param {boolean} applyFocus Focus point is always computed, but is only focused if applyFocus is true.
     * @public
     */
    @api
    focusDate(focusDate, displayDate, applyFocus) {
        // if a date was previously selected or focused, focus the same date in this month.
        let selectedMonthDate, rovingDate;
        if (focusDate) {
            rovingDate = focusDate.getTime();
            selectedMonthDate = setDate(
                displayDate,
                'date',
                focusDate.getDate()
            );
        }
        const firstOfMonthDate = startOfDay(
            setDate(displayDate, 'date', 1)
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
     * @param {string} day The timestamp of the date
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
     * @param {string} day The timestamp of the date
     */
    addDateBorder(day) {
        const dayCell = this.template.querySelector(
            `[data-full-date="${day}"]${SELECTOR_HAS_BORDER}`
        );
        const timeArray = this._value
            .map((x) => x.getTime())
            .sort((a, b) => a - b);
        const cellSelector = `td${SELECTOR_HAS_BORDER}`;
        if (this.selectionMode === 'interval' && !!day) {
            if (timeArray.length === 1) {
                if (day > timeArray[0]) {
                    dayCell?.classList.add(
                        'avonni-calendar__cell_bordered-right'
                    );
                    this.template
                        .querySelectorAll(cellSelector)
                        .forEach((x) => {
                            if (
                                x.getAttribute('data-full-date') >=
                                    timeArray[0] &&
                                x.getAttribute('data-full-date') <= day
                            ) {
                                x.classList.add(
                                    'avonni-calendar__cell_bordered-top_bottom'
                                );
                            }
                        });
                }
                if (day < timeArray[0]) {
                    dayCell?.classList.add(
                        'avonni-calendar__cell_bordered-left'
                    );
                    this.template
                        .querySelectorAll(cellSelector)
                        .forEach((x) => {
                            if (
                                x.getAttribute('data-full-date') <=
                                    timeArray[0] &&
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
                    dayCell?.classList.add(
                        'avonni-calendar__cell_bordered-right'
                    );
                    this.template
                        .querySelectorAll(cellSelector)
                        .forEach((x) => {
                            if (
                                x.getAttribute('data-full-date') >=
                                    timeArray[1] &&
                                x.getAttribute('data-full-date') <= day
                            ) {
                                x.classList.add(
                                    'avonni-calendar__cell_bordered-top_bottom'
                                );
                            }
                        });
                }
                if (day < timeArray[0]) {
                    dayCell?.classList.add(
                        'avonni-calendar__cell_bordered-left'
                    );
                    this.template
                        .querySelectorAll(cellSelector)
                        .forEach((x) => {
                            if (
                                x.getAttribute('data-full-date') <=
                                    timeArray[0] &&
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
     * Remove borders on cells
     */
    removeDateBorder() {
        this.template.querySelectorAll('td').forEach((x) => {
            x.classList.remove('avonni-calendar__cell_bordered-top_bottom');
            x.classList.remove('avonni-calendar__cell_bordered-right');
            x.classList.remove('avonni-calendar__cell_bordered-left');
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
        const focusDate = event.currentTarget.dataset.fullDate;
        /**
         * The event fired when a focus target is found in the public method focusDate().
         * The focused date passed to focusDate() is not necessarily the same as the focus target.
         * Therefore, it allows to sync the focusDate to the parent.
         *
         * @event
         * @public
         * @name datefocus
         * @param {string} fulldate The focused date
         */
        this.dispatchEvent(
            new CustomEvent('datefocus', {
                detail: {
                    focusDate
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
        const day = event.target.getAttribute('data-full-date');
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
         * @param {string} fullDate The selected date.
         * @param {boolean} disabled If present, the selected date is disabled.
         * @param {boolean} isDateHidden If present, the selected date is hidden.
         */
        this.dispatchEvent(
            new CustomEvent('selectdate', {
                detail: {
                    bounds: event.currentTarget.getBoundingClientRect(),
                    fullDate,
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
         * @name selectdatekey
         * @param {number} fulldate The current date
         * @param {Date} nextDate The selected date by key
         */
        this.dispatchEvent(
            new CustomEvent('selectdatekey', {
                detail: {
                    fullDate,
                    nextDate
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
     * @param {string} day The mouse over date in string .
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
