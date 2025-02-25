import { DateTime, getFormattedDate } from 'c/dateTimeUtils';
import { FieldConstraintApi, InteractingState } from 'c/inputUtils';
import {
    Direction,
    startPositioning,
    stopPositioning
} from 'c/positionLibrary';
import { classSet, normalizeBoolean, normalizeString } from 'c/utils';
import { animationFrame, keyCodes, timeout } from 'c/utilsPrivate';
import { LightningElement, api } from 'lwc';

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
     * Error message to be displayed when a required date is missing.
     *
     * @type {string}
     * @public
     */
    @api messageWhenValueMissing;

    _dateStyle = DATE_STYLES.defaultDate;
    _disabled = false;
    _endDate;
    _readOnly = false;
    _required = false;
    _startDate;
    _timeStyle = DATE_STYLES.defaultTime;
    _type = DATE_TYPES.default;
    _variant = LABEL_VARIANTS.default;

    calendarKeyEvent;
    enteredEndCalendar = false;
    enteredStartCalendar = false;
    endTime;
    isOpenStartDate = false;
    isOpenEndDate = false;
    helpMessage;
    savedFocus;
    showEndDate = false;
    showStartDate = false;
    startTime;
    selectionModeEndDate = 'interval';
    selectionModeStartDate = 'interval';
    _autoPosition;
    _cancelBlurStartDate = false;
    _cancelBlurEndDate = false;
    _connected = false;
    _focusStartDate;
    _focusEndDate;

    connectedCallback() {
        this.initStartDate();
        this.initEndDate();
        this.interactingState = new InteractingState();
        this.interactingState.onleave(() => this.showHelpMessageIfInvalid());
        this._connected = true;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

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
        const date = new Date(value);
        this._endDate = !value || isNaN(date) ? null : date;
        this._initialEndDate = !this._endDate ? null : new Date(date);

        if (this._connected) {
            this.initEndDate();
        }
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
        const date = new Date(value);
        this._startDate = !value || isNaN(date) ? null : date;
        this._initialStartDate = !this._startDate ? null : new Date(date);

        if (this._connected) {
            this.initStartDate();
        }
    }

    /**
     * The display style of the time when type='time' or type='datetime'.
     * Valid values are short, medium and long. Currently, medium and long styles look the same.
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
            this.initStartDate();
            this.initEndDate();
        }
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

        if (this._connected) {
            this.initStartDate();
            this.initEndDate();
        }
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
     * Value of the input. Object with two keys: <code>startDate</code> and <code>endDate</code>. The value is read-only.
     *
     * @type {object}
     * @public
     */
    @api
    get value() {
        return { startDate: this._startDate, endDate: this._endDate };
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

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

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
     * Classes to remove right padding on end date input.
     *
     * @type {string}
     */
    get computedEndInputClasses() {
        return classSet(
            'slds-form-element slds-scrollable_none slds-m-bottom_xxx-small'
        )
            .add({ 'slds-p-right_none': !this.showTime })
            .toString();
    }

    /**
     * Start time input.
     *
     * @type {element}
     */
    get startDateIcon() {
        return this.template.querySelector(
            '[data-element-id="lightning-icon-start-date"]'
        );
    }

    /**
     * Start time input.
     *
     * @type {element}
     */
    get endDateIcon() {
        return this.template.querySelector(
            '[data-element-id="lightning-icon-end-date"]'
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
     * Set focus in a selected calendar
     */
    setFocusDate(date, calendar) {
        requestAnimationFrame(() => {
            const targetCalendar = this.template.querySelector(
                `[data-element-id="calendar-${calendar}-date"]`
            );
            if (targetCalendar) {
                targetCalendar.focusDate(date);
            }
        });
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
     * Array with the start date and end date.
     * With added fallback to return one date or the other or none at all.
     *
     * @type {object}
     */
    get calendarValue() {
        const value = [];
        if (this.startDate) {
            value.push(this.startDate);
        }
        if (this.endDate) {
            value.push(this.endDate);
        }
        return value;
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
                    (!this.startDate || !this.endDate)
            });
        }
        return this._constraintApi;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

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
        this.showStartDate = false;
        this.showEndDate = false;
        this.stopPositioning();
        this.handleFocusOut();
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

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * ------------------------------------------------------------
     */

    formatDate(date, format) {
        return getFormattedDate({ date, format, timeZone: this.timezone });
    }

    /**
     * Removes the slds-has-error class on the whole element if it's not valid.
     * Aplies it on every input we need it applied.
     * Removes it from every input when valid.
     */
    updateClassListWhenError() {
        if (this.readOnly) {
            return;
        }
        if (!this.validity.valid) {
            this.classList.remove('slds-has-error');
            this.startDateInput.classList.add('slds-has-error');
            this.startDateInput.classList.add('avonni-date-range__input_error');
            this.endDateInput.classList.add('slds-has-error');
            this.endDateInput.classList.add('avonni-date-range__input_error');
            if (this.showTime) {
                this.startTimeInput.classList.add('slds-has-error');
                this.endTimeInput.classList.add('slds-has-error');
            }
        } else if (this.validity.valid) {
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
     * Initialize the start time.
     */
    initStartDate() {
        if (!this.startDate) {
            this.startTime = null;
            this.startTimeString = '';
            return;
        }

        if (this.type === 'datetime') {
            this.startTime = this.formatDate(this.startDate, 'TT.SSS');
            this.startTimeString = this.timeFormat(this.startDate);
        }
    }

    /**
     * Initialize the end time.
     */
    initEndDate() {
        if (!this.endDate) {
            this.endTime = null;
            this.endTimeString = '';
            return;
        }

        if (this.type === 'datetime') {
            this.endTime = this.formatDate(this.endDate, 'TT.SSS');
            this.endTimeString = this.timeFormat(this.endDate);
        }
    }

    /**
     * Handles the change of start-time.
     *
     * @param {Event} event
     */
    handleChangeStartTime(event) {
        event.stopPropagation();
        event.preventDefault();
        this.startTime = event.target.value;
        this.dispatchChange();
    }

    /**
     * Handles the change of end-time.
     *
     * @param {Event} event
     */
    handleChangeEndTime(event) {
        event.stopPropagation();
        event.preventDefault();
        this.endTime = event.target.value;
        this.dispatchChange();
    }

    /**
     * Change the date format depending on date style.
     *
     * @param {date} value date object
     * @returns {date} formatted date depending on the date style.
     */
    dateFormat(value) {
        switch (this.dateStyle) {
            case 'medium':
                return this.formatDate(value, 'LLL. d, y');
            case 'long':
                return this.formatDate(value, 'LLLL d, y');
            default:
                return this.formatDate(value, 'L/d/y');
        }
    }

    startPositioning(type) {
        const align = {
            horizontal: Direction.Left,
            vertical: Direction.Top
        };

        const targetAlign = {
            horizontal: Direction.Left,
            vertical: Direction.Bottom
        };

        let autoFlip = true;
        let autoFlipVertical;

        return animationFrame()
            .then(() => {
                this.stopPositioning();
                const element = this.template.querySelector(
                    `[data-element-id="div-${type}-date-dropdown"]`
                );
                const target = this.template.querySelector(
                    `[data-element-id="input-${type}-date"]`
                );
                if (!element || !target) {
                    return Promise.resolve();
                }
                this._autoPosition = startPositioning(
                    this,
                    {
                        target: () => target,
                        element: () => element,
                        align,
                        targetAlign,
                        autoFlip,
                        autoFlipVertical,
                        padTop: 4,
                        scrollableParentBound: false
                    },
                    true
                );
                if (this._autoPosition) {
                    return this._autoPosition.reposition();
                }
                return Promise.reject();
            })
            .then(() => {
                return timeout(0);
            });
    }

    /**
     * Stop menu positioning and animation.
     */
    stopPositioning() {
        if (this._autoPosition) {
            stopPositioning(this._autoPosition);
            this._autoPosition = null;
        }
    }

    /**
     * Change the time format depending on time style.
     *
     * @param {date}
     * @returns {time} formatted time depending on the time style.
     */
    timeFormat(value) {
        switch (this.timeStyle) {
            case 'short':
                return this.formatDate(value, 't');
            default:
                return this.formatDate(value, 'tt');
        }
    }

    toISOString(dateObject, timeString) {
        if (!dateObject) {
            return null;
        }
        const date = new DateTime(dateObject, this.timezone).toISO();
        const time = timeString ? `T${timeString}` : 'T00:00:00.000';
        return date.replace(/T[0-9:.]+/, time);
    }

    /**
     * Dispatch changes from start-date input, end-date input, c-calendar for start-date and c-calendar for end-date.
     */
    dispatchChange() {
        const startDate = this.toISOString(this.startDate, this.startTime);
        const endDate = this.toISOString(this.endDate, this.endTime);

        /**
         * The event fired when the value changed.
         *
         * @event
         * @name change
         * @param {string} startDate Start date, as an ISO8601 formatted string.
         * @param {string} endDate End date, as an ISO8601 formatted string.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    startDate,
                    endDate
                }
            })
        );
    }

    /**
     * Handles the change of start date
     *
     * @param {Event} event
     */
    handleChangeStartDate(event) {
        event.stopPropagation();
        const value = event.detail.value;
        const clickedDate = new Date(event.detail.clickedDate);
        const normalizedValue = value instanceof Array ? value : [value];
        const dates = normalizedValue.map((date) => {
            return date ? new Date(date) : null;
        });

        let state;
        const clickedOnFirstValue =
            dates[0] && clickedDate.getTime() === dates[0].getTime();
        const clickedOnSecondValue =
            dates[1] && clickedDate.getTime() === dates[1].getTime();
        const clickedOnStartDate =
            this._startDate &&
            clickedDate.getTime() === this._startDate.getTime();
        const clickedOnEndDate =
            this._endDate && clickedDate.getTime() === this._endDate.getTime();

        // Case selection
        if (clickedOnFirstValue) {
            state = 'SELECT_ONLY_START';
        }

        if (clickedOnSecondValue && dates[1] < this._endDate) {
            state = 'SELECT_NEW_START';
        }

        if (
            (clickedOnSecondValue && dates[1] > this._endDate) ||
            dates[0] > this._endDate
        ) {
            state = 'SELECT_START_ABOVE_END';
        }

        if (clickedOnEndDate) {
            state = 'SELECT_START_EQUAL_END';
        }

        if (
            (clickedOnEndDate && clickedOnStartDate) ||
            (!clickedOnFirstValue &&
                !clickedOnSecondValue &&
                clickedOnStartDate)
        ) {
            state = 'DESELECT_START';
        }

        // Case execution
        switch (state) {
            case 'SELECT_ONLY_START':
                this._startDate = dates[0];
                break;

            case 'SELECT_NEW_START':
                this._startDate = dates[1];
                break;

            case 'SELECT_START_ABOVE_END':
                this._startDate = dates.length === 2 ? dates[1] : dates[0];
                this._endDate = null;
                break;

            case 'DESELECT_START':
                this._startDate = null;
                if (this._endDate) {
                    this._focusStartDate = this._endDate;
                }
                this.showStartDate = true;
                this.startPositioning('start');
                this.dispatchChange();
                return;

            case 'SELECT_START_EQUAL_END':
                this._startDate = this._endDate;
                break;

            default:
        }

        this.dispatchChange();
        this.stopPositioning();
        this.showStartDate = false;

        requestAnimationFrame(() => {
            if (this.calendarKeyEvent === 'keyboard') {
                this.startDateIcon.focus();
            } else if (!this.endDate) {
                this.setFocusDate(this._startDate, 'end');
                this.showEndDate = true;
                this.startPositioning('end');
            }
            this.calendarKeyEvent = null;
        });
    }

    /**
     * Handles the change of end date
     *
     * @param {Event} event
     */
    handleChangeEndDate(event) {
        event.stopPropagation();
        const value = event.detail.value;
        const clickedDate = new Date(event.detail.clickedDate);
        const normalizedValue = value instanceof Array ? value : [value];
        const dates = normalizedValue.map((date) => {
            return date ? new Date(date) : null;
        });
        let state;
        const clickedOnFirstValue =
            dates[0] && clickedDate.getTime() === dates[0].getTime();
        const clickedOnSecondValue =
            dates[1] && clickedDate.getTime() === dates[1].getTime();
        const clickedOnStartDate =
            this._startDate &&
            clickedDate.getTime() === this._startDate.getTime();
        const clickedOnEndDate =
            this._endDate && clickedDate.getTime() === this._endDate.getTime();

        // Case selection
        if (clickedOnFirstValue && dates.length === 1) {
            state = 'SELECT_ONLY_END';
        }

        if (clickedOnFirstValue && dates[0] < this._startDate) {
            state = 'SELECT_END_BELOW_START';
        }

        if (clickedOnSecondValue) {
            state = 'SELECT_NEW_END';
        }
        if (clickedOnStartDate) {
            state = 'SELECT_END_EQUAL_START';
        }

        if (
            (clickedOnEndDate && clickedOnStartDate) ||
            (!clickedOnFirstValue && !clickedOnSecondValue && clickedOnEndDate)
        ) {
            state = 'DESELECT_END';
        }

        // Case execution
        switch (state) {
            case 'SELECT_ONLY_END':
                this._endDate = dates[0];
                break;

            case 'SELECT_END_BELOW_START':
                this._endDate = dates[0];
                this._startDate = null;
                break;

            case 'SELECT_NEW_END':
                this._endDate = dates[1];
                break;

            case 'DESELECT_END':
                this._endDate = null;
                if (this._startDate) {
                    this._focusEndDate = this._startDate;
                }
                this.showEndDate = true;
                this.startPositioning('end');
                this.dispatchChange();
                return;

            case 'SELECT_END_EQUAL_START':
                this._endDate = this._startDate;
                break;

            default:
        }

        this.dispatchChange();

        requestAnimationFrame(() => {
            this.showEndDate = false;
            this.stopPositioning();
            if (this.calendarKeyEvent === 'keyboard') {
                this.endDateIcon.focus();
            } else if (!this.startDate) {
                this.setFocusDate(this._endDate, 'start');
                this.showStartDate = true;
            }
            this.calendarKeyEvent = null;
        });
    }

    /*
     * ------------------------------------------------------------
     *  FOCUS HANDLING
     * ------------------------------------------------------------
     */

    /**
     * Check validity on focus out.
     */
    handleFocusOut() {
        requestAnimationFrame(() => {
            if (!(this.showEndDate || this.showStartDate)) {
                this.updateClassListWhenError();
                this.interactingState.leave();
            }
        });
    }

    /**
     * Handle a blur of the end date button icon. Close the calendar popover if the focus is really lost.
     */
    handleBlurEndButtonIcon() {
        requestAnimationFrame(() => {
            if (!this.enteredEndCalendar) {
                this.showEndDate = false;
                this.stopPositioning();
            }
            this.enteredEndCalendar = false;
        });
    }

    /**
     * Handle a blur of the end date input. Empty the value if the input was cleared, anc close the calendar popover if the focus is really lost.
     */
    handleBlurEndInput(event) {
        const value = event.currentTarget.value;
        if (!value && this.endDate) {
            this._endDate = null;
            this.dispatchChange();
        }

        requestAnimationFrame(() => {
            const activeElement = this.template.activeElement;
            const activeButton =
                activeElement &&
                activeElement.dataset.elementId === 'lightning-icon-start-date';

            if (!this.enteredEndCalendar && !activeButton) {
                // Don't hide the calendar if the focus was moved to the icon
                this.showEndDate = false;
                this.stopPositioning();
            }
            this.enteredEndCalendar = false;
        });
    }

    /**
     * Handle a blur of the start date button icon. Close the calendar popover if the focus is really lost.
     */
    handleBlurStartButtonIcon() {
        requestAnimationFrame(() => {
            if (!this.enteredStartCalendar) {
                this.showStartDate = false;
                this.stopPositioning();
            }
            this.enteredStartCalendar = false;
        });
    }

    /**
     * Handle a blur of the start date input. Empty the value if the input was cleared, anc close the calendar popover if the focus is really lost.
     */
    handleBlurStartInput(event) {
        const value = event.currentTarget.value;
        if (!value && this.startDate) {
            this._startDate = null;
            this.dispatchChange();
        }

        requestAnimationFrame(() => {
            const activeElement = this.template.activeElement;
            const activeButton =
                activeElement &&
                activeElement.dataset.elementId === 'lightning-icon-start-date';

            if (!this.enteredStartCalendar && !activeButton) {
                // Don't hide the calendar if the focus was moved to the icon
                this.showStartDate = false;
                this.stopPositioning();
            }
            this.enteredStartCalendar = false;
        });
    }

    /**
     * Register that focus is in start calendar
     *
     * @param {Event} event
     */
    handleStartCalendarFocusIn() {
        if (this.keepFocus) {
            this.keepFocus = false;
        }
        this.enteredStartCalendar = true;
    }

    /**
     * Register that focus is in end calendar
     *
     * @param {Event} event
     */
    handleEndCalendarFocusIn() {
        if (this.keepFocus) {
            this.keepFocus = false;
        }
        this.enteredEndCalendar = true;
    }

    /**
     * On calendar focus out, close calendar and
     * bring back focus to input
     */
    handleStartCalendarFocusOut() {
        this.keepFocus = true;

        requestAnimationFrame(() => {
            if (this.keepFocus) {
                this.showStartDate = false;
                this.stopPositioning();

                if (this.template.activeElement !== this.startDateIcon) {
                    this.startDateInput.focus();
                }
            }
        });
    }

    /**
     * On calendar focus out, close calendar and
     * bring back focus to input
     */
    handleEndCalendarFocusOut() {
        this.keepFocus = true;

        requestAnimationFrame(() => {
            if (this.keepFocus) {
                this.showEndDate = false;
                this.stopPositioning();

                if (this.template.activeElement !== this.endDateIcon) {
                    this.endDateInput.focus();
                }
            }
        });
    }

    /**
     * Click the today button on start calendar
     */
    handleSelectStartToday() {
        this._startDate = new Date(new Date().setHours(0, 0, 0, 0));

        if (this._startDate > this._endDate) this._endDate = null;

        this.dispatchChange();
        this.stopPositioning();
        this.showStartDate = false;

        requestAnimationFrame(() => {
            if (this.calendarKeyEvent === 'keyboard') {
                this.startDateIcon.focus();
            } else if (!this.endDate) {
                this.setFocusDate(this._startDate, 'end');
                this.showEndDate = true;
                this.startPositioning('end');
            }
            this.calendarKeyEvent = null;
        });
    }

    /**
     * Click the today button on end calendar
     */
    handleSelectEndToday() {
        this._endDate = new Date(new Date().setHours(0, 0, 0, 0));

        if (this._endDate < this._startDate) {
            this._startDate = null;
        }

        this.dispatchChange();

        requestAnimationFrame(() => {
            this.showEndDate = false;
            this.stopPositioning();
            if (this.calendarKeyEvent === 'keyboard') this.endDateIcon.focus();
            else if (!this.startDate) {
                this.setFocusDate(this._endDate, 'start');
                this.showStartDate = true;
            }
            this.calendarKeyEvent = null;
        });
    }

    /**
     * Listen for the escape key to escape the calendar
     *
     * @param {Event} event
     */
    handleCalendarDialogKeyDown(event) {
        if (!event.keyCode || !event.target) {
            return;
        }
        const elementId = event.target.dataset.elementId;

        switch (event.keyCode) {
            case keyCodes.escape:
                if (elementId.includes('start-date')) {
                    this.showStartDate = false;
                    this.stopPositioning();
                    this.startDateIcon.focus();
                } else if (elementId.includes('end-date')) {
                    this.showEndDate = false;
                    this.stopPositioning();
                    this.endDateIcon.focus();
                }
                break;

            case keyCodes.space:
            case keyCodes.enter:
                this.calendarKeyEvent = 'keyboard';
                break;

            default:
        }
    }

    /**
     * Clicking either an input field or its icon to open or close its calendar
     *
     * @param {Event} event
     */
    handleClickDateInput(event) {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        this.interactingState.enter();

        switch (event.target.dataset.elementId) {
            case 'input-start-date':
                /**
                 * Show only a single date input if no other date,
                 * otherwise selecting a new start date looks like selecting a range.
                 */
                this.selectionModeStartDate = !this._endDate
                    ? 'single'
                    : 'interval';
                this.showStartDate = true;
                this.showEndDate = false;
                this.startPositioning('start');
                break;
            case 'lightning-icon-start-date':
                this.selectionModeStartDate = !this._endDate
                    ? 'single'
                    : 'interval';
                this.showStartDate = true;
                this.showEndDate = false;
                this.startPositioning('start');
                this.setFocusDate(
                    this.startDate || this.endDate || today,
                    'start'
                );
                break;
            case 'input-end-date':
                this.selectionModeEndDate = !this._startDate
                    ? 'single'
                    : 'interval';
                this.showEndDate = true;
                this.showStartDate = false;
                this.startPositioning('end');
                break;
            case 'lightning-icon-end-date':
                this.selectionModeEndDate = !this._startDate
                    ? 'single'
                    : 'interval';
                this.showEndDate = true;
                this.showStartDate = false;
                this.startPositioning('end');
                this.setFocusDate(
                    this.endDate || this.startDate || today,
                    'end'
                );
                break;

            default:
                break;
        }
    }

    /**
     * Type `escape` on inputs or input icons
     *
     * @param {Event} event
     */
    handleInputKeyDown(event) {
        if (event.key === 'Escape') {
            if (
                event.currentTarget === this.startDateInput ||
                event.currentTarget === this.startDateIcon
            ) {
                this.showStartDate = false;
                this.stopPositioning();
            }
            if (
                event.currentTarget === this.endDateInput ||
                event.currentTarget === this.endDateIcon
            ) {
                this.showEndDate = false;
                this.stopPositioning();
            }
        }
    }
}
