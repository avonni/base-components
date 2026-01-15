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
        if (this._connected) {
            this.validateCurrentDayValue();
            this.updateDateParameters();
        }
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
        this._value = value;
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
                `[data-element-id="td"][data-full-date="${rovingDate}"]:not([data-is-date-invisible="true"])`
            );
            const selectedDates = this.template.querySelectorAll(
                '[data-selected="true"]:not([data-is-date-invisible="true"])'
            );
            const todaysDate = this.template.querySelector(
                '[data-today="true"]:not([data-is-date-invisible="true"])'
            );
            const firstOfMonth = this.template.querySelector(
                `[data-element-id="td"][data-full-date="${firstOfMonthDate}"]:not([data-disabled="true"])`
            );
            const rovingMonthDate = this.template.querySelector(
                `[data-element-id="td"][data-full-date="${selectedMonthDate}"]:not([data-is-date-invisible="true"]):not([data-is-date-invisible="true"])`
            );
            const firstValidDate = this.template.querySelector(
                '[data-element-id="td"]:not([data-disabled="true"]):not([data-is-date-invisible="true"])'
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

    @api mouseOutDate() {
        this.handlerMouseOut();
    }

    @api mouseOverDate(day) {
        this.handlerMouseOver(day);
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    handlerMouseOut() {
        this.template.querySelectorAll('td').forEach((x) => {
            x.classList.remove('avonni-calendar__cell_bordered-top_bottom');
            x.classList.remove('avonni-calendar__cell_bordered-right');
            x.classList.remove('avonni-calendar__cell_bordered-left');
        });
    }

    handlerMouseOver(day) {
        const dayCell = this.template.querySelector(
            `[data-full-date="${day}"]:not([data-is-date-invisible="true"])`
        );
        const timeArray = this._value
            .map((x) => x.getTime())
            .sort((a, b) => a - b);
        const cellSelector = 'td:not([data-is-date-invisible="true"])';
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
     * Mouse out handler.
     */
    handleMouseOut() {
        this.handlerMouseOut();
    }

    /**
     * Mouse over handler.
     */
    handleMouseOver(event) {
        const isDateInvisible = event.target.dataset.isDateInvisible;
        // We don't want to border invisible dates on mouseover
        if (isDateInvisible === 'true') {
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
        const { fullDate, disabled, isDateInvisible } =
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
         * @param {boolean} isDateInvisible If present, the selected date is invisible.
         */
        this.dispatchEvent(
            new CustomEvent('selectdate', {
                detail: {
                    bounds: event.currentTarget.getBoundingClientRect(),
                    fullDate,
                    disabled: disabled === 'true',
                    isDateInvisible: isDateInvisible === 'true'
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

    dispatchMouseOutDate() {
        /**
         * The event fired when a date is moused out.
         *
         * @event
         * @public
         * @name mouseoutdate
         */
        this.dispatchEvent(new CustomEvent('mouseoutdate'));
    }

    dispatchMouseOverDate(day) {
        /**
         * The event fired when a date is moused over.
         *
         * @event
         * @public
         * @name mouseoverdate
         * @param {string} day The mouse over date in string .
         */
        this.dispatchEvent(
            new CustomEvent('mouseoverdate', {
                detail: {
                    day
                }
            })
        );
    }
}
