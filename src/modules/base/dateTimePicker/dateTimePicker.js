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
    normalizeBoolean,
    normalizeString,
    normalizeArray
} from 'c/utilsPrivate';
import { FieldConstraintApi, InteractingState } from 'c/inputUtils';
import { classSet } from 'c/utils';
import { TIME_ZONES } from './timeZones';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const DATE_TIME_VARIANTS = {
    valid: ['daily', 'weekly', 'inline', 'timeline', 'monthly'],
    default: 'daily'
};
const DATE_TIME_TYPES = {
    valid: ['radio', 'checkbox'],
    default: 'radio'
};
const DATE_TIME_FORMATS = {
    valid: ['numeric', '2-digit'],
    dayDefault: 'numeric',
    hourDefault: 'numeric',
    minuteDefault: '2-digit'
};
const WEEKDAY_FORMATS = {
    valid: ['narrow', 'short', 'long'],
    default: 'short'
};
const MONTH_FORMATS = {
    valid: ['2-digit', 'numeric', 'narrow', 'short', 'long'],
    default: 'long'
};

const DEFAULT_START_TIME = 46800000;
const DEFAULT_END_TIME = 82800000;
const DEFAULT_TIME_SLOT_DURATION = 1800000;
const DEFAULT_MAX = new Date(new Date(2099, 11, 31).setHours(0, 0, 0, 0));
const DEFAULT_MIN = new Date(new Date(1900, 0, 1).setHours(0, 0, 0, 0));
const DEFAULT_DAY_CLASS = 'avonni-date-time-picker__day';

/**
 * @class
 * @public
 * @storyId example-date-time-picker--daily
 * @descriptor avonni-date-time-picker
 */
export default class DateTimePicker extends LightningElement {
    /**
     * Help text detailing the purpose and function of the input.
     *
     * @type {string}
     * @public
     */
    @api fieldLevelHelp;
    /**
     * Text label for the input.
     *
     * @type {string}
     * @required
     * @public
     */
    @api label;
    /**
     * Error message to be displayed when the value is missing.
     * The valueMissing error can be returned when you specify the required attribute for any input type.
     *
     * @type {string}
     * @public
     */
    @api messageWhenValueMissing;
    /**
     * Specifies the name of an input element.
     *
     * @type {string}
     * @public
     */
    @api name;

    _dateFormatDay = DATE_TIME_FORMATS.dayDefault;
    _dateFormatWeekday = WEEKDAY_FORMATS.default;
    _dateFormatMonth = MONTH_FORMATS.default;
    _dateFormatYear;
    _disabledDateTimes = [];
    _endTime = DEFAULT_END_TIME;
    _hideDatePicker = false;
    _hideLabel;
    _hideNavigation = false;
    _max = DEFAULT_MAX;
    _min = DEFAULT_MIN;
    _readOnly = false;
    _required = false;
    _value = [];
    _startTime = DEFAULT_START_TIME;
    _timeSlotDuration = DEFAULT_TIME_SLOT_DURATION;
    _timeSlots;
    _timeFormatHour;
    _timeFormatHour12;
    _timeFormatMinute;
    _timeFormatSecond;
    _showEndTime;
    _showDisabledDates;
    _type = DATE_TIME_TYPES.default;
    _showTimeZone = false;
    _disabled = false;
    _variant = DATE_TIME_VARIANTS.default;

    table;
    today;
    firstWeekDay;
    lastWeekDay;
    timeZones = TIME_ZONES;
    selectedTimeZone;
    helpMessage;
    datePickerValue;
    dayClass = DEFAULT_DAY_CLASS;

    _connected = false;
    _goToDate;
    _selectedDayTime;
    _valid = true;

    connectedCallback() {
        this._processValue();
        this.selectedTimeZone =
            Intl.DateTimeFormat().resolvedOptions().timeZone;
        this._initTimeSlots();
        const now = new Date();
        this.today = now;
        this.datePickerValue = now.toISOString();
        this._setFirstWeekDay();

        // If no time format is provided, defaults to hour:minutes (0:00)
        // The default is set here so it is possible to have only the hour, minutes:seconds, etc.
        this._initTimeFormat();

        this.interactingState = new InteractingState();
        this.interactingState.onleave(() => this.showHelpMessageIfInvalid());
        this._connected = true;
    }

    renderedCallback() {
        if (this._goToDate) {
            const monthlyCalendar = this.template.querySelector(
                '[data-element-id="avonni-calendar"]'
            );
            if (monthlyCalendar) {
                monthlyCalendar.goToDate(this._goToDate);
            }
            this._goToDate = undefined;
        }
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Valid values include numeric and 2-digit.
     *
     * @type {string}
     * @default numeric
     * @public
     */
    @api
    get dateFormatDay() {
        return this._dateFormatDay;
    }

    set dateFormatDay(value) {
        this._dateFormatDay = normalizeString(value, {
            fallbackValue: DATE_TIME_FORMATS.dayDefault,
            validValues: DATE_TIME_FORMATS.valid
        });

        if (this._connected && this.variant === 'weekly') this._generateTable();
    }

    /**
     * Valid values are numeric, 2-digit, long, short or narrow.
     *
     * @type {string}
     * @default long
     * @public
     */
    @api
    get dateFormatMonth() {
        return this._dateFormatMonth;
    }

    set dateFormatMonth(value) {
        this._dateFormatMonth = normalizeString(value, {
            fallbackValue: MONTH_FORMATS.default,
            validValues: MONTH_FORMATS.valid
        });
    }

    /**
     * Specifies how to display the day of the week. Valid values are narrow, short, or long.
     *
     * @type {string}
     * @default short
     * @public
     */
    @api
    get dateFormatWeekday() {
        return this._dateFormatWeekday;
    }

    set dateFormatWeekday(value) {
        this._dateFormatWeekday = normalizeString(value, {
            fallbackValue: WEEKDAY_FORMATS.default,
            validValues: WEEKDAY_FORMATS.valid
        });

        if (this._connected && this.variant === 'weekly') this._generateTable();
    }

    /**
     * Valid values include numeric and 2-digit.
     *
     * @type {string}
     * @public
     */
    @api
    get dateFormatYear() {
        return this._dateFormatYear;
    }

    set dateFormatYear(value) {
        this._dateFormatYear = normalizeString(value, {
            validValues: DATE_TIME_FORMATS.valid
        });
    }

    /**
     * If present, the date time picker is disabled and users cannot interact with it.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get disabled() {
        return this._disabled;
    }

    set disabled(value) {
        this._disabled = normalizeBoolean(value);
        if (this._connected) {
            this._initTimeFormat();
            this._generateTable();
        }
    }

    /**
     * Array of disabled dates. The dates must be Date objects or valid ISO8601 strings.
     *
     * @type {object[]}
     * @public
     */
    @api
    get disabledDateTimes() {
        return this._disabledDateTimes;
    }

    set disabledDateTimes(value) {
        this._disabledDateTimes = normalizeArray(value);

        if (this._connected) {
            this._generateTable();
        }
    }

    /**
     * End of the time slots. Must be an ISO8601 formatted time string.
     *
     * @type {string}
     * @default 18:00
     * @public
     */
    @api
    get endTime() {
        return this._endTime;
    }

    set endTime(value) {
        const end = new Date(`1970-01-01T${value}`);
        // Return end time in ms. Default value is 18:00.
        this._endTime = isNaN(end.getTime()) ? DEFAULT_END_TIME : end.getTime();
        if (this._connected) {
            this._initTimeSlots();
            this._generateTable();
        }
    }

    /**
     * If present, hide the date picker button.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get hideDatePicker() {
        return this._hideDatePicker;
    }

    set hideDatePicker(value) {
        this._hideDatePicker = normalizeBoolean(value);
    }

    /**
     * If present, hides the label.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get hideLabel() {
        return this._hideLabel;
    }

    set hideLabel(boolean) {
        this._hideLabel = normalizeBoolean(boolean);
    }

    /**
     * If present, hide next, previous and today buttons.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get hideNavigation() {
        return this._hideNavigation;
    }

    set hideNavigation(value) {
        this._hideNavigation = normalizeBoolean(value);
    }

    /**
     * Specifies the maximum date, which the calendar can show.
     *
     * @type {object}
     * @default Date(2099, 11, 31)
     * @public
     */
    @api
    get max() {
        return this._max;
    }

    set max(value) {
        const date = this._processDate(value);
        this._max = date
            ? new Date(date.setHours(0, 0, 0, 0))
            : new Date(DEFAULT_MAX);

        if (this._connected) {
            this._setFirstWeekDay();
        }
    }

    /**
     * Specifies the minimum date, which the calendar can show.
     *
     * @type {object}
     * @default Date(1900, 0, 1)
     * @public
     */
    @api
    get min() {
        return this._min;
    }

    set min(value) {
        const date = this._processDate(value);
        this._min = date
            ? new Date(date.setHours(0, 0, 0, 0))
            : new Date(DEFAULT_MIN);

        if (this._connected) {
            this._setFirstWeekDay();
        }
    }

    /**
     * If present, the input field is read-only and cannot be edited by users.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get readOnly() {
        return this._readOnly;
    }

    set readOnly(boolean) {
        this._readOnly = normalizeBoolean(boolean);
    }

    /**
     * If present, the input field must be filled out before the form is submitted.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get required() {
        return this._required;
    }

    set required(boolean) {
        this._required = normalizeBoolean(boolean);
    }

    /**
     * If present, show the disabled dates in the date time picker.
     * Ex: 1:00 PM - 1:30 PM.
     *
     * @type {boolean}
     * @public
     */
    @api
    get showDisabledDates() {
        return this._showDisabledDates;
    }

    set showDisabledDates(boolean) {
        this._showDisabledDates = normalizeBoolean(boolean);

        if (this._connected) {
            this._generateTable();
        }
    }

    /**
     * If present, show the end time in each slots.
     * Ex: 1:00 PM - 1:30 PM.
     *
     * @type {boolean}
     * @public
     */
    @api
    get showEndTime() {
        return this._showEndTime;
    }

    set showEndTime(boolean) {
        this._showEndTime = normalizeBoolean(boolean);
    }

    /**
     * If present, show the time zone.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get showTimeZone() {
        return this._showTimeZone;
    }

    set showTimeZone(value) {
        this._showTimeZone = normalizeBoolean(value);
    }

    /**
     * Start of the time slots. Must be an ISO8601 formatted time string.
     *
     * @type {string}
     * @default 08:00
     * @public
     */
    @api
    get startTime() {
        return this._startTime;
    }

    set startTime(value) {
        const start = new Date(`1970-01-01T${value}`);
        // Return start time in ms. Default value is 08:00.
        this._startTime = isNaN(start.getTime())
            ? DEFAULT_START_TIME
            : start.getTime();
        if (this._connected) {
            this._initTimeSlots();
            this._generateTable();
        }
    }

    /**
     * Valid values include numeric and 2-digit.
     *
     * @type {string}
     * @default numeric
     * @public
     */
    @api
    get timeFormatHour() {
        return this._timeFormatHour || undefined;
    }

    set timeFormatHour(value) {
        this._timeFormatHour = normalizeString(value, {
            validValues: DATE_TIME_FORMATS.valid
        });
    }

    /**
     * Determines whether time is displayed as 12-hour.
     * If false, time displays as 24-hour. The default setting is determined by the user's locale.
     *
     * @type {boolean}
     * @public
     */
    @api
    get timeFormatHour12() {
        return this._timeFormatHour12;
    }

    set timeFormatHour12(boolean) {
        if (boolean !== undefined) {
            this._timeFormatHour12 = normalizeBoolean(boolean);
        }
    }

    /**
     * Valid values include numeric and 2-digit.
     *
     * @type {string}
     * @default 2-digit
     * @public
     */
    @api
    get timeFormatMinute() {
        return this._timeFormatMinute || undefined;
    }

    set timeFormatMinute(value) {
        this._timeFormatMinute = normalizeString(value, {
            validValues: DATE_TIME_FORMATS.valid
        });
    }

    /**
     * Valid values include numeric and 2-digit.
     *
     * @type {string}
     * @public
     */
    @api
    get timeFormatSecond() {
        return this._timeFormatSecond || undefined;
    }

    set timeFormatSecond(value) {
        this._timeFormatSecond = normalizeString(value, {
            validValues: DATE_TIME_FORMATS.valid
        });
    }

    /**
     * Duration of each time slot. Must be an ISO8601 formatted time string.
     *
     * @type {string}
     * @default 00:30
     * @public
     */
    @api
    get timeSlotDuration() {
        return this._timeSlotDuration;
    }

    set timeSlotDuration(value) {
        const duration =
            typeof value === 'string' &&
            value.match(/(\d{2}):(\d{2}):?(\d{2})?/);
        let durationMilliseconds = 0;
        if (duration) {
            const durationHours = parseInt(duration[1], 10);
            const durationMinutes = parseInt(duration[2], 10);
            const durationSeconds = parseInt(duration[3], 10) || 0;
            durationMilliseconds =
                durationHours * 3600000 +
                durationMinutes * 60000 +
                durationSeconds * 1000;
        }

        // Return duration in ms. Default value is 00:30.
        this._timeSlotDuration =
            durationMilliseconds > 0
                ? durationMilliseconds
                : DEFAULT_TIME_SLOT_DURATION;

        if (this._connected) {
            this._initTimeSlots();
            this._generateTable();
        }
    }

    /**
     * Valid values include radio and checkbox.
     *
     * @type {string}
     * @default radio
     * @public
     */
    @api
    get type() {
        return this._type;
    }

    set type(value) {
        this._type = normalizeString(value, {
            fallbackValue: DATE_TIME_TYPES.default,
            validValues: DATE_TIME_TYPES.valid
        });
        if (this._connected) {
            this._processValue();
            this._generateTable();
        }
    }

    /**
     * Represents the validity states that an element can be in, with respect to constraint validation.
     *
     * @type {string}
     * @public
     */
    @api get validity() {
        return this._constraint.validity;
    }

    /**
     * The value of the date selected, which can be a Date object, timestamp, or an ISO8601 formatted string.
     *
     * @type {string}
     * @public
     */
    @api
    get value() {
        return this._value;
    }

    set value(value) {
        if (!value) {
            this._value = [];
        } else {
            this._value = value instanceof Array ? value : [value];
        }

        if (this._connected) {
            this._processValue();
            this._setFirstWeekDay();
        }
    }

    /**
     * The variant changes the appearance of the time picker.
     * Accepted variants include daily, weekly, monthly, inline and timeline.
     *
     * @type {string}
     * @default daily
     * @public
     */
    @api
    get variant() {
        return this._variant;
    }

    set variant(value) {
        this._variant = normalizeString(value, {
            fallbackValue: DATE_TIME_VARIANTS.default,
            validValues: DATE_TIME_VARIANTS.valid
        });

        this.dayClass = classSet('slds-text-align_center slds-grid').add({
            'avonni-date-time-picker__day_inline': this._variant === 'inline',
            'avonni-date-time-picker__day': this._variant !== 'inline'
        });

        if (this._connected) {
            this._setFirstWeekDay();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Retrieve constraint API for validation.
     *
     * @type {object}
     */
    get _constraint() {
        if (!this._constraintApi) {
            this._constraintApi = new FieldConstraintApi(() => this, {
                valueMissing: () =>
                    !this.disabled && this.required && !this.value.length
            });
        }
        return this._constraintApi;
    }

    /**
     * Returns an array of all the disabled date time.
     *
     * @type {array}
     */
    get _disabledFullDateTimes() {
        let dateTimes = [];

        this.disabledDateTimes.forEach((dateTime) => {
            const date = new Date(dateTime);
            if (!isNaN(date)) {
                dateTimes.push(date.getTime());
            }
        });

        return dateTimes;
    }

    /**
     * Returns an array of all the disabled weekdays.
     *
     * @type {array}
     */
    get _disabledWeekDays() {
        let dates = [];

        this.disabledDateTimes.forEach((date) => {
            if (typeof date === 'string') {
                dates.push(DAYS.indexOf(date));
            }
        });

        return dates;
    }

    /**
     * Returns an array of all the disabled monthdays.
     *
     * @type {array}
     */
    get _disabledMonthDays() {
        let dates = [];

        this.disabledDateTimes.forEach((date) => {
            if (typeof date === 'number') {
                dates.push(date);
            }
        });

        return dates;
    }

    /**
     * Returns a string with the date range depending on if variant is weekly or not.
     *
     * @type {string}
     */
    get currentDateRangeString() {
        const options = {
            month: this.dateFormatMonth,
            day: this.dateFormatDay
        };

        if (this.dateFormatYear) options.year = this.dateFormatYear;

        const firstWeekDay = this.firstWeekDay.toLocaleString('default', {
            weekday: this.dateFormatWeekday
        });
        const firstDay = this.firstWeekDay.toLocaleString('default', options);
        const lastDay = this.lastWeekDay.toLocaleString('default', options);

        return this.variant === 'weekly'
            ? `${firstDay} - ${lastDay}`
            : `${firstWeekDay}, ${firstDay}`;
    }

    /**
     * Returns first weekday in an ISOString format.
     *
     * @type {ISOstring}
     */
    get firstWeekDayToString() {
        return this.firstWeekDay.toISOString();
    }

    /**
     * Returns min in an ISOString format.
     *
     * @type {ISOstring}
     */
    get minToString() {
        return this.min.toISOString();
    }

    /**
     * Returns max in an ISOString format.
     *
     * @type {ISOstring}
     */
    get maxToString() {
        return this.max.toISOString();
    }

    /**
     * Returns true if the first weekday is smaller than min. It disables the prev button.
     *
     * @type {boolean}
     */
    get prevButtonIsDisabled() {
        return this.firstWeekDay <= this.min;
    }

    /**
     * Returns true if the last weekday is bigger than min. It disables the next button.
     *
     * @type {boolean}
     */
    get nextButtonIsDisabled() {
        return this.lastWeekDay >= this.max;
    }

    /**
     * Returns true if every day is disabled. It disables the entire period.
     *
     * @type {boolean}
     */
    get entirePeriodIsDisabled() {
        return this.table.every((day) => day.disabled);
    }

    /**
     * Returns true if variant is timeline.
     *
     * @type {boolean}
     */
    get isTimeline() {
        return this.variant === 'timeline';
    }

    /**
     * Returns true if variant is monthly.
     *
     * @type {boolean}
     */
    get isMonthly() {
        return this.variant === 'monthly';
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Checks if the input is valid.
     *
     * @returns {boolean} True if the element meets all constraint validations.
     * @public
     */
    @api
    checkValidity() {
        return this._constraint.checkValidity();
    }

    /**
     * Move the position of the picker so the specified date is visible.
     *
     * @param {(string | number | Date)} date Date the picker should be positioned on.
     * @public
     */
    @api
    goToDate(date) {
        const normalizedDate = new Date(date);
        if (isNaN(normalizedDate)) {
            console.error(
                `Invalid date passed to the goToDate() method: ${date} \nThe date must be a valid date string, timestamp, or Date object.`
            );
            return;
        }
        if (this.variant === 'weekly') {
            const dateDay = normalizedDate.getDate() - normalizedDate.getDay();
            const dateTime = new Date(date).setDate(dateDay);
            this.firstWeekDay = new Date(dateTime);
        } else {
            this.firstWeekDay = normalizedDate;
        }
        this._generateTable();
        this.datePickerValue = this.firstWeekDayToString;
        this._goToDate = normalizedDate;
    }

    /**
     * Displays the error messages. If the input is valid, <code>reportValidity()</code> clears displayed error messages.
     *
     * @returns {boolean} False if invalid, true if valid.
     * @public
     */
    @api
    reportValidity() {
        return this._constraint.reportValidity((message) => {
            this.helpMessage = message;
        });
    }

    /**
     * Sets a custom error message to be displayed when a form is submitted.
     *
     * @param {string} message The string that describes the error. If message is an empty string, the error message is reset.
     * @public
     */
    @api
    setCustomValidity(message) {
        this._constraint.setCustomValidity(message);
    }

    /**
     * Displays error messages on invalid fields.
     * An invalid field fails at least one constraint validation and returns false when <code>checkValidity()</code> is called.
     *
     * @public
     */
    @api
    showHelpMessageIfInvalid() {
        this.reportValidity();

        // Show errors on date picker
        const datePicker = this.template.querySelector(
            '[data-element-id="lightning-input"]'
        );
        if (datePicker) datePicker.reportValidity();
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Transform the given value into a Date object, or return null.
     *
     * @param {string} value The value of the date selected.
     * @returns {Date|null} Returns a date object or null.
     */
    _processDate(value) {
        let date = null;
        if (value instanceof Date) date = value;
        if (!isNaN(new Date(value).getTime())) date = new Date(value);
        return date;
    }

    /**
     * Processes the values to make sure it's an ISOstring.
     */
    _processValue() {
        if (this.type === 'checkbox') {
            const selectedDayTimes = [];
            const values = [];

            this.value.forEach((value) => {
                const date = this._processDate(value);
                if (date) {
                    selectedDayTimes.push(date.getTime());
                    values.push(date.toISOString());
                }
            });

            this._selectedDayTime = selectedDayTimes;
            this._value = values;
        } else {
            const date = this._processDate(this.value[0]);
            if (date) {
                this._selectedDayTime = date.getTime();
                this._value = [date.toISOString()];
            } else {
                this._selectedDayTime = null;
            }
        }
    }

    /**
     * Time slots initialization.
     */
    _initTimeSlots() {
        const timeSlots = [];
        let currentTime = this.startTime;

        while (currentTime < this.endTime) {
            timeSlots.push(
                new Date(currentTime).toLocaleTimeString('default', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                })
            );
            currentTime = currentTime + this.timeSlotDuration;
        }
        this._timeSlots = timeSlots;
    }

    /**
     * Time format initialization.
     */
    _initTimeFormat() {
        if (
            !this.timeFormatHour &&
            !this.timeFormatMinute &&
            !this.timeFormatSecond
        ) {
            this._timeFormatHour = DATE_TIME_FORMATS.hourDefault;
            this._timeFormatMinute = DATE_TIME_FORMATS.minuteDefault;
        }
    }

    /**
     * Center the picker on the right date.
     */
    _setFirstWeekDay() {
        let date = this.value.length
            ? this._processDate(this.value[0])
            : this.today;

        if (date < this.min) {
            date = new Date(this.min);
        } else if (date > this.max) {
            date = new Date(this.max);
        }
        this.goToDate(date);
    }

    /**
     * Generates table depending on the variant.
     */
    _generateTable() {
        const processedTable = [];
        const daysDisplayed = this.variant === 'weekly' ? 7 : 1;

        for (let i = 0; i < daysDisplayed; i++) {
            const day = new Date(
                new Date(this.firstWeekDay).setDate(
                    this.firstWeekDay.getDate() + i
                )
            );

            const disabled = this.disabled || this._isDisabled(day);

            // Create dayTime object
            const dayTime = {
                key: i,
                day: day,
                disabled: disabled,
                show: !disabled || this.showDisabledDates,
                isToday:
                    this.today.toLocaleDateString() ===
                    day.toLocaleDateString(),
                times: []
            };

            // Add a label to the day only if variant is 'week'
            if (this.variant === 'weekly') {
                const labelWeekday = day.toLocaleString('default', {
                    weekday: this.dateFormatWeekday
                });
                const labelDay = day.toLocaleString('default', {
                    day: this.dateFormatDay
                });
                dayTime.label = `${labelWeekday} ${labelDay}`;
            }

            this._createTimeSlots(dayTime);
            processedTable.push(dayTime);
        }

        this.lastWeekDay = processedTable[processedTable.length - 1].day;
        this.table = processedTable;
    }

    //  /!\ Changes the dayTime object passed as argument.
    _createTimeSlots(dayTime) {
        const disabledDates = this._disabledFullDateTimes;

        this._timeSlots.forEach((timeSlot) => {
            // Add time to day
            const hour = parseInt(timeSlot.slice(0, 2), 10);
            const minutes = parseInt(timeSlot.slice(3, 5), 10);
            const seconds = parseInt(timeSlot.slice(6, 8), 10);
            const day = dayTime.day;
            day.setHours(hour, minutes, seconds, 0);

            const timestamp = day.getTime();

            const selected =
                this._selectedDayTime && this._isSelected(timestamp);

            if (selected) dayTime.selected = true;

            const disabled =
                dayTime.disabled || disabledDates.indexOf(timestamp) > -1;

            const time = {
                startTimeISO: day.toISOString(),
                endTimeISO: new Date(
                    timestamp + this.timeSlotDuration
                ).toISOString(),
                disabled: disabled,
                selected: selected,
                show: !disabled || this.showDisabledDates
            };

            // If the variant is 'timeline', pushes a two-level deep object into dayTime.times
            // {
            //     hour: ISO datetime,
            //     times: [ time objects ]
            // }
            if (this.isTimeline) {
                let timelineHour = new Date(day);
                timelineHour.setHours(hour, 0, 0, 0);
                timelineHour = timelineHour.toISOString();

                const index = dayTime.times.findIndex(
                    (timeObject) => timeObject.hour === timelineHour
                );

                if (index < 0) {
                    dayTime.times.push({
                        hour: timelineHour,
                        times: [time]
                    });
                } else {
                    dayTime.times[index].times.push(time);
                }
                // For other variants, pushes the time object directly into dayTime.times
            } else {
                dayTime.times.push(time);
            }
        });
    }

    /**
     * Generates table depending on the variant.
     *
     * @param {object} time timestamp
     * @returns {boolean} returns false if selection === time.
     */
    _isSelected(time) {
        const selection = this._selectedDayTime;

        return Array.isArray(selection)
            ? selection.indexOf(time) > -1
            : selection === time;
    }

    /**
     * Generates table depending on the variant.
     *
     * @param {object} dayObject
     * @returns {boolean} true if disabled, false if not.
     */
    _isDisabled(dayObject) {
        // Remove time from the date object
        const day = new Date(new Date(dayObject).setHours(0, 0, 0, 0));

        const outsideOfAllowedDates = day < this.min || day > this.max;
        const weekDay = day.getDay();
        const monthDay = day.getDate();

        return (
            outsideOfAllowedDates ||
            this._disabledWeekDays.indexOf(weekDay) > -1 ||
            this._disabledMonthDays.indexOf(monthDay) > -1
        );
    }

    /**
     * Handles the onchange event of the combobox to change the time zone.
     */
    handleTimeZoneChange(event) {
        this.selectedTimeZone = event.detail.value;
    }

    /**
     * Handles the onclick event for the today button.
     */
    handleTodayClick() {
        this.datePickerValue = this.today.toISOString();
        this.goToDate(this.today);
        this._generateTable();
    }

    /**
     * Handles the onclick event for the next and previous button.
     */
    handlePrevNextClick(event) {
        const dayRange = this.variant === 'weekly' ? 7 : 1;
        const direction = event.currentTarget.dataset.direction;
        const dayRangeSign = direction === 'next' ? dayRange : -dayRange;
        this.firstWeekDay = new Date(
            new Date(this.firstWeekDay).setDate(
                this.firstWeekDay.getDate() + dayRangeSign
            )
        );
        this._generateTable();
        this.datePickerValue = this.firstWeekDay.toISOString();
    }

    /**
     * Handles the onchange event of the lightning-input to change the date.
     */
    handleDateChange(event) {
        const value = event.detail.value;
        if (!value || typeof value !== 'string') {
            // Prevent unselection of a date
            event.currentTarget.value = this.firstWeekDayToString;
            return;
        }

        const dateString = value.match(/^(\d{4})-(\d{2})-(\d{2})/);

        if (dateString) {
            const year = dateString[1];
            const month = dateString[2] - 1;
            const day = dateString[3];
            const date = new Date(year, month, day);

            this.goToDate(date);
            this._generateTable();
            this.datePickerValue = date.toISOString();
        }
    }

    /**
     * Handles the onclick event of the button for time slots.
     */
    handleTimeSlotClick(event) {
        if (this.readOnly) return;

        const dateTimeISO = event.currentTarget.firstChild.value;
        const date = new Date(dateTimeISO);

        // Select/unselect the date
        if (this.type === 'checkbox') {
            const valueIndex = this.value.indexOf(dateTimeISO);
            if (valueIndex > -1) {
                this._value.splice(valueIndex, 1);
            } else {
                this._value.push(dateTimeISO);
            }

            const selectIndex = this._selectedDayTime.indexOf(date.getTime());
            if (selectIndex > -1) {
                this._selectedDayTime.splice(selectIndex, 1);
            } else {
                this._selectedDayTime.push(date.getTime());
            }
        } else {
            this._value = this._value[0] === dateTimeISO ? [] : [dateTimeISO];
            this._selectedDayTime =
                this._selectedDayTime === date.getTime()
                    ? null
                    : date.getTime();
        }

        // Refresh table to show selected time slot
        this._generateTable();
        /**
         * The event fired when the value changed.
         *
         * @event
         * @name change
         * @param {string} value Picker new value.
         * @param {string} name Name of the picker.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    value:
                        this.type === 'radio'
                            ? this.value[0] || null
                            : this.value,
                    name: this.name
                }
            })
        );
    }

    /**
     * Triggers interactingState.leave() on blur.
     * Removes slds-has-error on the whole element if not valid.
     */
    handleValueBlur() {
        this._valid = !(this.required && !this.value.length);
        this.interactingState.leave();
        if (!this._valid) {
            this.classList.remove('slds-has-error');
        }
    }

    /**
     * Triggers interactingState.enter() on focus.
     */
    handleValueFocus() {
        this.interactingState.enter();
    }
}
