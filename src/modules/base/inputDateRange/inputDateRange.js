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
import { normalizeBoolean, normalizeString } from 'c/utilsPrivate';
// import { parseDateTime } from 'c/internationalizationLibrary';
import { classSet } from 'c/utils';
import { FieldConstraintApi, InteractingState } from 'c/inputUtils';

const DATE_TYPES = {
    valid: ['date', 'datetime'],
    default: 'date'
};
const DATE_STYLES = {
    valid: ['short', 'medium', 'long'],
    defaultDate: 'medium',
    defaultTime: 'short'
};
const LABEL_VARIANTS = {
    valid: ['standard', 'label-hidden'],
    default: 'standard'
};

/**
 * @class
 * @public
 * @storyId example-input-date-range--base
 * @descriptor avonni-input-date-range
 */
export default class InputDateRange extends LightningElement {
    /**
     * Help text detailing the purpose and function of the input.
     * This attribute isn't supported for file, radio, toggle, and checkbox-button types.
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
     * Text label for the start input.
     *
     * @type {string}
     * @public
     */
    @api labelStartDate;

    /**
     * If type is datetime, text label for the start time input.
     *
     * @type {string}
     * @public
     */
    @api labelStartTime;

    /**
     * Text label for the end input.
     *
     * @type {string}
     * @public
     */
    @api labelEndDate;

    /**
     * If type is datetime, text label for the end time input.
     *
     * @type {string}
     * @public
     */
    @api labelEndTime;

    /**
     * Error message to be displayed when the start-date is missing.
     *
     * @type {string}
     * @public
     */
    @api messageWhenValueMissing;

    _timezone;
    _startDate;
    _endDate;

    _dateStyle = DATE_STYLES.defaultDate;
    _timeStyle = DATE_STYLES.defaultTime;
    _type = DATE_TYPES.default;
    _disabled = false;
    _required = false;
    _readOnly = false;
    _variant = LABEL_VARIANTS.default;

    startTime;
    endTime;
    isOpenStartDate = false;
    isOpenEndDate = false;
    _cancelBlurStartDate = false;
    _cancelBlurEndDate = false;
    _focusStartDate;
    _focusEndDate;
    savedFocus;

    showEndDate = false;
    showStartDate = false;
    enteredStartCalendar = false;
    enteredEndCalendar = false;
    _selectionModeEndDate = 'interval';
    keepInputFocus = false;

    helpMessage;
    _valid = true;

    connectedCallback() {
        this.interactingState = new InteractingState();
        this.interactingState.onleave(() => this.showHelpMessageIfInvalid());
    }

    renderedCallback() {
        this.updateClassListWhenError();
    }

    /**
     * Value of the input. Object with two keys: <code>startDate</code> and <code>endDate</code>.
     *
     * @type {object}
     * @public
     */
    @api
    get value() {
        return { startDate: this._startDate, endDate: this._endDate };
    }

    /**
     * Focused date for start date when calendar is open.
     *
     * @type {object}
     */
    @api
    get focusStartDate() {
        return this._focusStartDate;
    }

    /**
     * Focused date for start date when calendar is open.
     *
     * @type {object}
     */
    @api
    get focusEndDate() {
        return this._focusEndDate;
    }

    /**
     * Specifies the value of the start date input, which can be a Date object, timestamp, or an ISO8601 formatted string.
     *
     * @type {(string|Date|number)}
     * @public
     */
    @api
    get startDate() {
        return this._startDate;
    }

    set startDate(value) {
        this._startDate = value;
        this.initialStartDate = value;
        this.initStartDate();
    }

    /**
     * Specifies the value of the end date input, which can be a Date object, timestamp, or an ISO8601 formatted string.
     *
     * @type {(string|Date|number)}
     * @public
     */
    @api
    get endDate() {
        return this._endDate;
    }

    set endDate(value) {
        this._endDate = value;
        this.initialEndDate = value;
        this.initEndtDate();
    }

    /**
     * Specifies the time zone used when the type is <code>datetime</code> only.
     * This value defaults to the user's Salesforce time zone setting.
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
        this.initStartDate();
        this.initEndtDate();
    }

    /**
     * The display style of the date.
     * Valid values are short, medium and long. The format of each style is specific to the locale.
     * On mobile devices this attribute has no effect.
     *
     * @type {string}
     * @default medium
     * @public
     */
    @api
    get dateStyle() {
        return this._dateStyle;
    }

    set dateStyle(value) {
        this._dateStyle = normalizeString(value, {
            fallbackValue: DATE_STYLES.defaultDate,
            validValues: DATE_STYLES.valid
        });
    }

    /**
     * The display style of the time when type='time' or type='datetime'.
     * Valid values are short, medium and long. Currently, medium and long styles look the same.
     * On mobile devices this attribute has no effect.
     *
     * @type {string}
     * @default short
     * @public
     */
    @api
    get timeStyle() {
        return this._timeStyle;
    }

    set timeStyle(value) {
        this._timeStyle = normalizeString(value, {
            fallbackValue: DATE_STYLES.defaultTime,
            validValues: DATE_STYLES.valid
        });
    }

    /**
     * Valid types include date and datetime.
     *
     * @type {string}
     * @default date
     * @public
     */
    @api
    get type() {
        return this._type;
    }

    set type(type) {
        this._type = normalizeString(type, {
            fallbackValue: DATE_TYPES.default,
            validValues: DATE_TYPES.valid
        });
        this.initStartDate();
        this.initEndtDate();
    }

    /**
     * If present, the input field is disabled and users cannot interact with it.
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
    }

    /**
     * If present, the input is read-only and cannot be edited by users.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get readOnly() {
        return this._readOnly;
    }

    set readOnly(value) {
        this._readOnly = normalizeBoolean(value);
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

    set required(value) {
        this._required = normalizeBoolean(value);
    }

    /**
     * The variant changes the appearance of an input field.
     * Accepted variants include standard and label-hidden.
     * This value defaults to standard, which displays the label above the field.
     * Use label-hidden to hide the label but make it available to assistive technology.
     *
     * @type {string}
     * @default standard
     * @public
     */
    @api
    get variant() {
        return this._variant;
    }

    set variant(value) {
        this._variant = normalizeString(value, {
            fallbackValue: LABEL_VARIANTS.default,
            validValues: LABEL_VARIANTS.valid
        });
    }

    /**
     * Represents the validity states that an element can be in, with respect to constraint validation.
     *
     * @type {string}
     * @public
     */
    @api
    get validity() {
        return this._constraint.validity;
    }

    /**
     * Start date input.
     *
     * @type {element}
     */
    get startDateInput() {
        return this.template.querySelector(
            '[data-element-id="input-start-date"]'
        );
    }

    /**
     * End date input.
     *
     * @type {element}
     */
    get endDateInput() {
        return this.template.querySelector(
            '[data-element-id="input-end-date"]'
        );
    }

    /**
     * Start time input.
     *
     * @type {element}
     */
    get startTimeInput() {
        return this.template.querySelector(
            '[data-element-id="lightning-input-start-time"]'
        );
    }

    /**
     * End time input.
     *
     * @type {element}
     */
    get endTimeInput() {
        return this.template.querySelector(
            '[data-element-id="lightning-input-end-time"]'
        );
    }

    /**
     * True if type is datetime.
     *
     * @type {boolean}
     */
    get showTime() {
        return this.type === 'datetime';
    }

    /**
     * Formatted start date string.
     *
     * @type {string}
     */
    get startDateString() {
        let dateStr = '';

        if (this.startDate) {
            dateStr = this.dateFormat(this.startDate);
        }

        return dateStr;
    }

    /**
     * Formatted end date string.
     *
     * @type {string}
     */
    get endDateString() {
        let dateStr = '';

        if (this.endDate) {
            dateStr = this.dateFormat(this.endDate);
        }

        return dateStr;
    }

    /**
     * Class of the label container.
     *
     * @type {string}
     */
    get computedLabelClass() {
        return classSet('avonni-date-range__label-container')
            .add({
                'slds-assistive-text': this.variant === 'label-hidden'
            })
            .toString();
    }

    /**
     * True if readOnly and startDateString.
     *
     * @type {boolean}
     */
    get readOnlyAndDate() {
        return this.readOnly && this.startDateString;
    }

    /**
     * Returns true if only the start date is present.
     *
     * @type {boolean}
     */
    get isOnlyStartDate() {
        return this.startDate && !this.endDate;
    }

    /**
     * Returns true if only the end date is present.
     *
     * @type {boolean}
     */
    get isOnlyEndDate() {
        return !this.startDate && this.endDate;
    }

    /**
     * Returns true if the start date and end date are present.
     *
     * @type {boolean}
     */
    get areBothDatePresent() {
        return this.startDate && this.endDate;
    }

    /**
     * Array with the start date and end date.
     * With added fallback to return one date or the other or none at all.
     *
     * @type {object}
     */
    get startDateEndDate() {
        if (!this.startDate && !this.endDate) return null;
        if (!this.startDate && this.endDate) return this.endDate;
        if (this.startDate && !this.endDate) return this.startDate;

        return [this.startDate, this.endDate];
    }

    /**
     * calendar selection mode
     *
     * @type {string}
     */
    @api
    get selectionModeEndDate() {
        return this._selectionModeEndDate;
    }

    /**
     * calendar selection mode
     *
     * @type {string}
     */
    @api
    get selectionModeStartDate() {
        return this._selectionModeStartDate;
    }

    /** TO BE FIXED
     *
     * Removes the slds-has-error class on the whole element if it's not valid.
     * Aplies it on every input we need it applied.
     * Removes it from every input when valid.
     */
    updateClassListWhenError() {
        if (!this._valid && !this._readOnly) {
            this.classList.remove('slds-has-error');
            this.startDateInput.classList.add('slds-has-error');
            this.startDateInput.classList.add('avonni-date-range__input_error');
            this.endDateInput.classList.add('slds-has-error');
            this.endDateInput.classList.add('avonni-date-range__input_error');
            if (this.showTime) {
                this.startTimeInput.classList.add('slds-has-error');
                this.endTimeInput.classList.add('slds-has-error');
            }
        }
        if (this._valid && !this._readOnly) {
            this.startDateInput.classList.remove('slds-has-error');
            this.startDateInput.classList.remove(
                'avonni-date-range__input_error'
            );
            this.endDateInput.classList.remove('slds-has-error');
            this.endDateInput.classList.remove(
                'avonni-date-range__input_error'
            );
            if (this.showTime) {
                this.startTimeInput.classList.remove('slds-has-error');
                this.endTimeInput.classList.remove('slds-has-error');
            }
        }
    }

    /**
     * Sets focus on the start date input.
     *
     * @public
     */
    @api
    focus() {
        this.startDateInput.focus();
    }

    /**
     * Removes keyboard focus from the start date input and end date input.
     *
     * @public
     */
    @api
    blur() {
        this.startDateInput.blur();
        this.endDateInput.blur();
        this.checkInputDatesValidity();
    }

    onFocusOut() {
        setTimeout(() => {
            if (!this.showStartDate && !this.showEndDate) {
                this.interactingState.leave();
                this.checkInputDatesValidity();
            }
        }, 1);
    }

    focusDateInput() {
        this.keepInputFocus = true;
    }

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
    }

    /**
     * Gets FieldConstraintApi.
     *
     * @type {object}
     */
    get _constraint() {
        if (!this._constraintApi) {
            this._constraintApi = new FieldConstraintApi(() => this, {
                valueMissing: () =>
                    !this.disabled &&
                    this.required &&
                    !this.startDate &&
                    !this.endDate
            });
        }
        return this._constraintApi;
    }

    /** ✅
     * Initialization of start date depending on timezone and type.
     */
    initStartDate() {
        if (this.startDate) {
            if (this.timezone) {
                this._startDate = new Date(
                    new Date(this.initialStartDate).toLocaleString('default', {
                        timeZone: this.timezone
                    })
                );
            } else {
                this._startDate = new Date(this.initialStartDate);
            }

            if (this.type === 'datetime') {
                this.startTime = this._startDate.toTimeString().substr(0, 5);
                this.startTimeString = this.timeFormat(this._startDate);
            }

            this._startDate.setHours(0, 0, 0, 0);
        }
    }

    /** ✅
     * Initialization of end date depending on timezone and type.
     */
    initEndtDate() {
        if (this.endDate) {
            if (this.timezone) {
                this._endDate = new Date(
                    new Date(this.initialEndDate).toLocaleString('default', {
                        timeZone: this.timezone
                    })
                );
            } else {
                this._endDate = new Date(this.initialEndDate);
            }

            if (this.type === 'datetime') {
                this.endTime = this._endDate.toTimeString().substr(0, 5);
                this.endTimeString = this.timeFormat(this._endDate);
            }

            this._endDate.setHours(0, 0, 0, 0);
        }
    }

    /** ✅
     * Handles the change of start-time.
     */
    handleChangeStartTime(event) {
        event.stopPropagation();
        event.preventDefault();
        this.startTime = event.target.value;
        this.dispatchChange();
        this.handleDateInputBlur('startTime');
    }

    /** ✅
     * Handles the change of end-time.
     */
    handleChangeEndTime(event) {
        event.stopPropagation();
        event.preventDefault();
        this.endTime = event.target.value;
        this.dispatchChange();
    }

    /** ✅
     * Change the date format depending on date style.
     *
     * @param {date}
     * @returns {date} formatted date depending on the date style.
     */
    dateFormat(value) {
        let date = value.getDate();
        let year = value.getFullYear();
        let month = value.getMonth() + 1;

        if (this.dateStyle === 'medium') {
            month = value.toLocaleString('default', { month: 'short' });
            return `${month} ${date}, ${year}`;
        }

        if (this.dateStyle === 'long') {
            month = value.toLocaleString('default', { month: 'long' });
            return `${month} ${date}, ${year}`;
        }

        return `${month}/${date}/${year}`;
    }

    // ✅
    /**
     * Change the time format depending on time style.
     *
     * @param {date}
     * @returns {time} formatted time depending on the time style.
     */
    timeFormat(value) {
        return this.timeStyle === 'short'
            ? value.toLocaleString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
              })
            : value.toLocaleString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
              });
    }

    /** ✅
     * Dispatch changes from start-date input, end-date input, c-calendar for start-date and c-calendar for end-date.
     */
    dispatchChange() {
        let startDate = this.startTime
            ? `${this.startDateString} ${this.startTime}`
            : this.startDateString;
        let endDate = this.endTime
            ? `${this.endDateString} ${this.endTime}`
            : this.endDateString;

        if (this.timezone) {
            startDate = new Date(startDate).toLocaleString('default', {
                timeZone: this.timezone
            });
            endDate = new Date(endDate).toLocaleString('default', {
                timeZone: this.timezone
            });
        }

        /**
         * The event fired when the value changed.
         *
         * @event
         * @name change
         * @param {string} startDate Start date value.
         * @param {string} endDate End date value.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    startDate: startDate,
                    endDate: endDate
                }
            })
        );
    }

    saveFocus(element) {
        this.savedFocus = element;
    }

    // ✅ toggle calendars when clicking on the inputs or input icons
    clickDateInput(event) {
        if (event.currentTarget) this.saveFocus(event.currentTarget);

        switch (event.target.dataset.elementId) {
            case 'input-start-date':
                this._focusEndDate = null;
                this._selectionModeStartDate = !this._endDate
                    ? 'single'
                    : 'interval';
                this.showStartDate = true;
                this.showEndDate = false;
                break;
            case 'lightning-icon-start-date':
                this._focusStartDate = this.startDate || new Date();
                this._selectionModeStartDate = !this._endDate
                    ? 'single'
                    : 'interval';
                this.showStartDate = true;
                this.showEndDate = false;
                break;
            case 'input-end-date':
                this._focusEndDate = null;
                this._selectionModeEndDate = !this._startDate
                    ? 'single'
                    : 'interval';
                this.showEndDate = true;
                this.showStartDate = false;
                break;
            case 'lightning-icon-end-date':
                this._focusEndDate = this.endDate || new Date();
                this._selectionModeEndDate = !this._startDate
                    ? 'single'
                    : 'interval';
                this.showEndDate = true;
                this.showStartDate = false;
                break;

            default:
                break;
        }
    }

    calendarFocusIn(event) {
        switch (event.target.dataset.elementId) {
            case 'calendar-start-date':
                this.enteredStartCalendar = true;
                break;
            case 'calendar-end-date':
                this.enteredEndCalendar = true;
                break;
            default:
                break;
        }
    }

    blurDateInput(event) {
        const blurredInput = event.target.dataset.elementId;

        setTimeout(() => {
            switch (blurredInput) {
                case 'input-start-date':
                    if (!this.enteredStartCalendar) this.showStartDate = false;
                    break;
                case 'input-end-date':
                    if (!this.enteredEndCalendar) this.showEndDate = false;
                    break;
                default:
                    break;
            }
        }, 1);

        this.enteredStartCalendar = false;
        this.enteredEndCalendar = false;
    }

    checkInputDatesValidity() {
        if (this.required)
            this._valid = this.required && !(!this.startDate || !this.endDate);
        this.updateClassListWhenError();
    }

    restoreFocus() {
        // this restores the focus to the last focused field,
        // but in the case the calendar was switched, focused returns to the first field, this is bad
        if (this.savedFocus) this.savedFocus.focus();
    }

    // ✅ handle calendar focus out
    calendarFocusOut(event) {
        // const closingMethod = event.detail.method;
        // console.log(closingMethod);

        // come back here

        switch (event.target.dataset.elementId) {
            case 'calendar-start-date':
                this.showStartDate = false;
                break;
            case 'calendar-end-date':
                this.showEndDate = false;
                break;

            default:
                break;
        }
        // this.restoreFocus();
    }

    /** ✅
     * Handles the change of start-date on c-calendar.
     */
    handleChangeStartDate(event) {
        // errors to fix, if new start date betwen range, no change
        const value = event.detail.value;
        const clickedDate = new Date(event.detail.clickedDate);
        const normalizedValue = value instanceof Array ? value : [value];
        const dates = normalizedValue.map((date) => {
            return date ? new Date(date) : null;
        });
        let keepFocusOn = false;
        let clicked0 = dates[0] && clickedDate.getTime() === dates[0].getTime();
        let clicked1 = dates[1] && clickedDate.getTime() === dates[1].getTime();
        let clickedStart =
            this._startDate &&
            clickedDate.getTime() === this._startDate.getTime();
        let clickedEnd =
            this._endDate && clickedDate.getTime() === this._endDate.getTime();

        /** CASES
         * a) click one date, new start date
         * b) click date 0, new start date
         * c) click date 1, new start date
         *      c1) if > end, null end date => jump to end
         * d) click start, start not in dates, delete start
         * e) click end, new start equal end
         */

        // a)
        if (clicked0 && dates.length === 1) {
            this._startDate = dates[0];

            // b)
        } else if (clicked0) {
            this._startDate = dates[0];

            // c)
        } else if (clicked1) {
            this._startDate = dates[1];

            // c1)
            if (dates[1] > this._endDate) {
                this._endDate = null;
            }

            // d)
        } else if (!clicked0 && !clicked1 && clickedStart) {
            this._startDate = null;
            if (this._endDate) this._focusStartDate = this._endDate;
            keepFocusOn = true;

            // e)
        } else if (clickedEnd) {
            this._startDate = this._endDate;
        }

        event.stopPropagation();
        this.dispatchChange();
        if (keepFocusOn) {
            setTimeout(() => {
                this.showStartDate = true;
            }, 1);
        } else {
            this.handleDateInputBlur('startDate');
        }
        if (!this._valid) this.checkInputDatesValidity();
    }

    // ✅
    handleChangeEndDate(event) {
        const value = event.detail.value;
        const clickedDate = event.detail.clickedDate;
        const normalizedValue = value instanceof Array ? value : [value];
        const dates = normalizedValue.map((date) => {
            return date ? new Date(date) : null;
        });
        let keepFocusOn = false;
        let clicked0 = dates[0] && clickedDate.getTime() === dates[0].getTime();
        let clicked1 = dates[1] && clickedDate.getTime() === dates[1].getTime();
        let clickedStart =
            this._startDate &&
            clickedDate.getTime() === this._startDate.getTime();
        let clickedEnd =
            this._endDate && clickedDate.getTime() === this._endDate.getTime();

        /** CASES
         * a) click one date, new end date
         * b) click date 0, new end date
         *      b1) if < start, null start date => jump to start
         * c) click date 1, new end date
         * d) click end && not in dates, delete end
         * e) click start, new end equal start
         */

        // a)
        if (clicked0 && dates.length === 1) {
            this._endDate = dates[0];

            // b)
        } else if (clicked0) {
            this._endDate = dates[0];

            // b1)
            if (dates[0] < this._startDate) {
                this._startDate = null;
            }

            // c)
        } else if (clicked1) {
            this._endDate = dates[1];

            // d)
        } else if (!clicked0 && !clicked1 && clickedEnd) {
            this._endDate = null;

            if (this._startDate) this._focusEndDate = this._startDate;
            keepFocusOn = true;

            // e)
        } else if (clickedStart) {
            this._endDate = this._startDate;
        }

        event.stopPropagation();
        this.dispatchChange();

        if (keepFocusOn) {
            setTimeout(() => {
                this.showEndDate = true;
            }, 1);
        } else {
            this.handleDateInputBlur('endDate');
        }
        if (!this._valid) this.checkInputDatesValidity();
    }

    // handle focus procession through the fields
    handleDateInputBlur(type) {
        // action when [type] gets blurred
        // requestAnimationFrame(() => {
        switch (type) {
            case 'startDate':
                this.showStartDate = false;
                if (!this.endDate) {
                    this._focusEndDate = this._startDate;
                    this.showEndDate = true;
                    this.savedFocus = null;
                }
                break;
            case 'endDate':
                this.showEndDate = false;
                if (!this.startDate) {
                    this._focusStartDate = this._endDate;
                    this.showStartDate = true;
                    this.savedFocus = null;
                }
                break;

            default:
                break;
        }
        // });

        this._focusStartDate = null;
        this._focusEndDate = null;
    }
}
