import { FieldConstraintApi, InteractingState } from 'c/inputUtils';
import { classSet, normalizeBoolean, normalizeString } from 'c/utils';
import { LightningElement, api } from 'lwc';

const DEFAULT_INVALID_TIME_RANGE_MESSAGE =
    'End time must be after or equal to the start time.';
const LABEL_VARIANTS = {
    valid: ['standard', 'label-hidden'],
    default: 'standard'
};
const SLDS_CLASS_ERROR = 'slds-has-error';
const TIME_STYLES = {
    valid: ['short', 'medium', 'long'],
    default: 'short'
};

/**
 * @class
 * @public
 * @storyId example-input-time-range--base
 * @descriptor avonni-input-time-range
 */
export default class InputTimeRange extends LightningElement {
    /**
     * Help text detailing the purpose and function of the input.
     * This attribute isn't supported for file, radio, toggle, and checkbox-button types.
     *
     * @type {string}
     * @public
     */
    @api fieldLevelHelp;
    /**
     * Message to be displayed when the current time range is invalid.
     *
     * @type {string}
     * @public
     * @default End time must be after or equal to the start time.
     */
    @api invalidTimeRangeMessage = DEFAULT_INVALID_TIME_RANGE_MESSAGE;
    /**
     * Text label for the input.
     *
     * @type {string}
     * @required
     * @public
     */
    @api label;
    /**
     * Text label for the end time input.
     *
     * @type {string}
     * @public
     */
    @api labelEndTime;
    /**
     * Text label for the start time input.
     *
     * @type {string}
     * @public
     */
    @api labelStartTime;

    _disabled = false;
    _endTime;
    _readOnly = false;
    _required = false;
    _startTime;
    _timeStyle = TIME_STYLES.default;
    _variant = LABEL_VARIANTS.default;

    _connected = false;

    normalizedStartTime;
    normalizedEndTime;

    helpMessage;

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
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
     * Specifies the value of the end time input, which can be an ISO8601 formatted string.
     *
     * @type {(string)}
     * @public
     */
    @api
    get endTime() {
        return this._endTime;
    }
    set endTime(value) {
        this._setEndTime(value);

        if (this.startTime || this.endTime) {
            this._checkInputValidity();
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
     * Specifies the value of the start time input, which can be an ISO8601 formatted string.
     *
     * @type {(string)}
     * @public
     */
    @api
    get startTime() {
        return this._startTime;
    }
    set startTime(value) {
        this._setStartTime(value);

        if (this.startTime || this.endTime) {
            this._checkInputValidity();
        }
    }

    /**
     * The display style of the time.
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
            fallbackValue: TIME_STYLES.default,
            validValues: TIME_STYLES.valid
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
     * Value of the input. Object with two keys: <code>startTime</code> and <code>endTime</code>. The value is read-only.
     *
     * @type {object}
     * @public
     */
    @api
    get value() {
        return {
            startTime: this.normalizedStartTime,
            endTime: this.normalizedEndTime
        };
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    get _constraint() {
        if (!this._constraintApi) {
            this._constraintApi = new FieldConstraintApi(() => this, {
                valueMissing: () =>
                    !this.disabled && this.required && !this.startTime,
                customError: () => this._validateTimeRange() === false
            });
        }
        return this._constraintApi;
    }

    get computedLabelClass() {
        return classSet(
            'slds-form-element__legend slds-form-element__label avonni-input-time-range__label'
        )
            .add({
                'slds-assistive-text': this.variant === 'label-hidden'
            })
            .toString();
    }

    get endTimeInput() {
        return this.template.querySelector(
            '[data-element-id="input-end-time"]'
        );
    }

    get startTimeInput() {
        return this.template.querySelector(
            '[data-element-id="input-start-time"]'
        );
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Removes keyboard focus from the start time input and end time input.
     *
     * @public
     */
    @api
    blur() {
        if (this.startTimeInput) {
            this.startTimeInput.blur();
        }
        if (this.endTimeInput) {
            this.endTimeInput.blur();
        }
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
     * Sets focus on the start time input.
     *
     * @public
     */
    @api
    focus() {
        if (this.startTimeInput) {
            this.startTimeInput.focus();
        }
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
     * -------------------------------------------------------------
     */

    _checkInputValidity() {
        const isValid = this._validateTimeRange();
        if (isValid) {
            this.setCustomValidity('');
        } else {
            this.setCustomValidity(this.invalidTimeRangeMessage);
        }
        this.reportValidity();
        return isValid;
    }

    _isValidTime(value) {
        // Matches H:MMAM/PM, HH:MM AM/PM, HH:MM, HH:MM:SS, HH:MM:SS.sss
        const timeRegex =
            /^(([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d)(\.\d{1,3})?)?|(0?[1-9]|1[0-2]):([0-5]\d)\s?(AM|PM|am|pm))$/i;
        return timeRegex.test(value);
    }

    /**
     * Normalizes to ISO time (HH:MM:SS).
     *
     * @param {string} value The time string to normalize.
     * @returns {string|null} The normalized time in ISO format or null if invalid.
     */
    _normalizeToISOTime(value) {
        if (!this._isValidTime(value)) return null;

        value = value.trim();

        // 12-hour format H:MM AM/PM or HH:MMAM/PM
        const hour12Regex = /^(0?[1-9]|1[0-2]):([0-5]\d)\s?(AM|PM)$/i;
        const match12 = value.match(hour12Regex);

        if (match12) {
            let hours = parseInt(match12[1], 10);
            const minutes = match12[2];
            const ampm = match12[3].toUpperCase();

            if (ampm === 'PM' && hours !== 12) hours += 12;
            if (ampm === 'AM' && hours === 12) hours = 0;

            return `${hours.toString().padStart(2, '0')}:${minutes}:00`;
        }

        // 24-hour format HH:MM or HH:MM:SS(.sss)
        const hour24Regex =
            /^([01]\d|2[0-3]):([0-5]\d)(?::([0-5]\d)(\.\d{1,3})?)?$/;
        const match24 = value.match(hour24Regex);

        if (match24) {
            const hours = match24[1];
            const minutes = match24[2];
            const seconds = match24[3] || '00';
            return `${hours}:${minutes}:${seconds}`;
        }

        return null;
    }

    _setEndTime(value) {
        if (!this._isValidTime(value)) {
            this._endTime = undefined;
            this.normalizedEndTime = null;
            return;
        }
        const normalized = this._normalizeToISOTime(value);
        this._endTime = normalized;
        this.normalizedEndTime = normalized;
    }

    _setStartTime(value) {
        if (!this._isValidTime(value)) {
            this._startTime = undefined;
            this.normalizedStartTime = null;
            return;
        }
        const normalized = this._normalizeToISOTime(value);
        this._startTime = normalized;
        this.normalizedStartTime = normalized;
    }

    /**
     * Removes the slds-has-error class on the whole element if it's not valid.
     * Aplies it on every input we need it applied.
     * Removes it from every input when valid.
     */
    _updateClassListWhenError() {
        if (this.readOnly || !this.startTimeInput || !this.endTimeInput) {
            return;
        }
        if (!this.validity.valid) {
            this.classList.add(SLDS_CLASS_ERROR);
            this.startTimeInput.classList.add(SLDS_CLASS_ERROR);
            this.endTimeInput.classList.add(SLDS_CLASS_ERROR);
        } else if (this.validity.valid) {
            this.classList.remove(SLDS_CLASS_ERROR);
            this.startTimeInput.classList.remove(SLDS_CLASS_ERROR);
            this.endTimeInput.classList.remove(SLDS_CLASS_ERROR);
        }
    }

    _validateTimeRange() {
        if (this.normalizedStartTime && this.normalizedEndTime) {
            const date = '1970-01-01T'; // Arbitrary date to compare times
            const startDate = new Date(`${date}${this.normalizedStartTime}`);
            const endDate = new Date(`${date}${this.normalizedEndTime}`);
            return endDate >= startDate;
        }
        return true;
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS
     * ------------------------------------------------------------
     */

    handleBlur(event) {
        if (
            event.relatedTarget &&
            this.template.contains(event.relatedTarget)
        ) {
            return;
        }
        this._dispatchBlur();
    }

    handleClickTimeInput() {
        this.interactingState.enter();
    }

    handleEndInputBlur(event) {
        const value = event.currentTarget.value;
        if (!value && this.endTime) {
            this._setEndTime(null);
            this._dispatchChange();
        }
        this.handleBlur(event);
    }

    handleEndInputChange(event) {
        event.stopPropagation();
        this._setEndTime(event.detail.value);
        const isValid = this._checkInputValidity();
        if (isValid) {
            this._dispatchChange();
        }
    }

    handleFocus(event) {
        if (
            event.relatedTarget &&
            this.template.contains(event.relatedTarget)
        ) {
            return;
        }
        this._dispatchFocus();
    }

    handleFocusOut() {
        requestAnimationFrame(() => {
            this._updateClassListWhenError();
            this.interactingState.leave();
        });
    }

    handleStartInputBlur(event) {
        const value = event.currentTarget.value;
        if (!value && this.startTime) {
            this._setStartTime(null);
            this._dispatchChange();
        }
        this.handleBlur(event);
    }

    handleStartInputChange(event) {
        event.stopPropagation();
        this._setStartTime(event.detail.value);

        const isValid = this._checkInputValidity();
        if (isValid) {
            this._dispatchChange();
        }
    }

    /*
     * ------------------------------------------------------------
     *  EVENT DISPATCHERS
     * -------------------------------------------------------------
     */

    _dispatchBlur() {
        /**
         * The event fired when the focus is removed from the input time range.
         *
         * @event
         * @name blur
         * @public
         */
        this.dispatchEvent(new CustomEvent('blur'));
    }

    _dispatchChange() {
        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    startTime: this.normalizedStartTime,
                    endTime: this.normalizedEndTime
                }
            })
        );
    }

    _dispatchFocus() {
        /**
         * The event fired when the focus is set on the input time range.
         *
         * @event
         * @name focus
         * @public
         */
        this.dispatchEvent(new CustomEvent('focus'));
    }
}
