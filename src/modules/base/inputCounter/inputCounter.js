import { LightningElement, api } from 'lwc';
import {
    classListMutation,
    normalizeBoolean,
    normalizeString
} from 'c/utilsPrivate';
import { classSet } from 'c/utils';
import { FieldConstraintApiWithProxyInput } from 'c/inputUtils';
import {
    formatNumber,
    hasValidNumberSymbol,
    increaseNumberByStep
} from './numberFormat';

const INPUT_COUNTER_VARIANTS = {
    valid: ['standard', 'label-inline', 'label-hidden', 'label-stacked'],
    default: 'standard'
};
const INPUT_COUNTER_TYPES = {
    valid: ['number', 'currency', 'percent'],
    default: 'number'
};

const DEFAULT_STEP = 1;

/**
 * @class
 * @description The Input Counter allows a user to increase or decrease a numerical value.
 * @descriptor avonni-input-counter
 * @storyId example-input-counter--base
 * @public
 */
export default class InputCounter extends LightningElement {
    /**
     * Specifies a shortcut key to activate or focus an element.
     *
     * @type {string}
     * @public
     */
    @api accessKey;
    /**
     * Describes the input to assistive technologies.
     *
     * @type {string}
     * @public
     */
    @api ariaLabel;
    /**
     * A space-separated list of element IDs whose presence or content is controlled by the input.
     *
     * @type {string}
     * @public
     */
    @api ariaControls;
    /**
     * A space-separated list of element IDs that provide descriptive labels for the input.
     *
     * @type {string}
     * @public
     */
    @api ariaDescribedBy;
    /**
     * A space-separated list of element IDs that provide labels for the input.
     *
     * @type {string}
     * @public
     */
    @api ariaLabelledBy;
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
     * Error message to be displayed when a bad input is detected.
     *
     * @type {string}
     * @public
     */
    @api messageWhenBadInput;
    /**
     * Error message to be displayed when a pattern mismatch is detected.
     * @type {string}
     * @public
     */
    @api messageWhenPatternMismatch;
    /**
     * Error message to be displayed when a range overflow is detected.
     *
     * @type {string}
     * @public
     */
    @api messageWhenRangeOverflow;
    /**
     * Error message to be displayed when a range underflow is detected.
     *
     * @type {string}
     * @public
     */
    @api messageWhenRangeUnderflow;
    /**
     * Error message to be displayed when a step mismatch is detected.
     *
     * @type {string}
     * @public
     */
    @api messageWhenStepMismatch;
    /**
     * Error message to be displayed when the value is missing.
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

    _disabled = false;
    _fractionDigits;
    _max;
    _min;
    _step = DEFAULT_STEP;
    _type = INPUT_COUNTER_TYPES.default;
    _readOnly = false;
    _required = false;
    _value = null;
    _variant = INPUT_COUNTER_VARIANTS.default;

    _connected = false;
    _constraintApi;
    _constraintApiProxyInputUpdater;
    _previousValue;
    helpMessage;

    connectedCallback() {
        this._connected = true;
    }

    renderedCallback() {
        if (this.value || this.value === 0) {
            this.showHelpMessageIfInvalid();
        }
        this._updateDisplayedValue();
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
     * Granularity of the value - number of significant decimal digits specified as a positive integer. For example, 2 formats the value to 2 digits after the decimal.
     *
     * @type {number}
     * @default null
     * @public
     */
    @api
    get fractionDigits() {
        return this._fractionDigits;
    }
    set fractionDigits(value) {
        const digits = Number(value);
        this._fractionDigits = !isNaN(digits)
            ? Math.round(Math.abs(digits))
            : null;

        if (this._connected) {
            this._updateDisplayedValue();
        }
    }

    /**
     * The maximum acceptable value for the input. Constrains the incrementer to stop at the specified maximum. If the entered value is above the maximum, incrementing or decrementing will then set the value to the specified maximum.
     *
     * @type {number}
     * @public
     */
    @api
    get max() {
        return this._max;
    }
    set max(value) {
        this._max = !isNaN(value) && value !== null ? Number(value) : undefined;

        if (this._connected) {
            this._normalizeValue();
            this._updateDisplayedValue();
        }
    }

    /**
     * The minimum acceptable value for the input. Constrains the decrementer to stop at the specified minimum. If an entered value is below the minimum, incrementing or decrementing will then set the value to the specified minimum.
     *
     * @type {number}
     * @public
     */
    @api
    get min() {
        return this._min;
    }
    set min(value) {
        this._min = !isNaN(value) && value !== null ? Number(value) : undefined;

        if (this._connected) {
            this._normalizeValue();
            this._updateDisplayedValue();
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
     * Amount to add or subtract from the value.
     *
     * @type {number}
     * @default 1
     * @public
     */
    @api
    get step() {
        return this._step;
    }
    set step(value) {
        this._step = Number(value) || DEFAULT_STEP;
    }

    /**
     * Input counter type. Valid values include number, currency and percent.
     *
     * @type {string}
     * @default number
     * @public
     */
    @api
    get type() {
        return this._type;
    }
    set type(type) {
        this._type = normalizeString(type, {
            fallbackValue: INPUT_COUNTER_TYPES.default,
            validValues: INPUT_COUNTER_TYPES.valid
        });

        if (this._connected) {
            this._updateDisplayedValue();
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
     * Specifies the value of an input element.
     *
     * @type {number}
     * @default null
     * @public
     */
    @api
    get value() {
        return this._value;
    }
    set value(val) {
        const value = Number(val);
        this._value = !isNaN(value) ? value : null;

        if (this._connected) {
            if (this._value || this._value === 0) {
                this.showHelpMessageIfInvalid();
            }
            this._updateDisplayedValue();
        }
    }

    /**
     * The variant changes the appearance of an input field. Accepted variants include standard, label-inline, label-hidden, and
     * label-stacked. This value defaults to standard, which displays the label above the field. Use label-hidden to hide the label but
     * make it available to assistive technology. Use label-inline to horizontally align the label and input field. Use label-stacked to
     * place the label above the input field.
     *
     * @type {string}
     * @default standard
     * @public
     */
    @api
    get variant() {
        return this._variant;
    }
    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: INPUT_COUNTER_VARIANTS.default,
            validValues: INPUT_COUNTER_VARIANTS.valid
        });

        classListMutation(this.classList, {
            'slds-form-element_stacked': this._variant === 'label-stacked',
            'avonni-input-counter__flex-container':
                this._variant === 'label-inline'
        });
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Compute constraintApi with fieldConstraintApiWithProxyInput.
     */
    get _constraint() {
        if (!this._constraintApi) {
            this._constraintApi = new FieldConstraintApiWithProxyInput(
                () => this
            );

            this._constraintApiProxyInputUpdater =
                this._constraintApi.setInputAttributes({
                    type: () => 'number',
                    value: () => this.validationValue,
                    max: () => this.max,
                    min: () => this.min,
                    step: () => this.inputStep,
                    formatter: () => this.type,
                    disabled: () => this.disabled
                });
        }
        return this._constraintApi;
    }

    /**
     * Get Aria Controls.
     *
     * @type {object}
     */
    get computedAriaControls() {
        return this.ariaControls || null;
    }

    /**
     * Get Aria Labelled by.
     *
     * @type {string}
     */
    get computedAriaLabelledBy() {
        return this.ariaLabelledBy || null;
    }

    /**
     * Get Aria Described By
     *
     * @type {string}
     */
    get computedAriaDescribedBy() {
        return this.ariaDescribedBy || null;
    }

    /**
     * Computed form element class add error if showError.
     *
     * @type {string}
     */
    get computedFormElementClass() {
        return classSet('slds-form-element')
            .add({
                'slds-has-error': this.showError
            })
            .toString();
    }

    /**
     * Computed CSS classes for the input element.
     *
     * @type {string}
     */
    get computedInputClass() {
        return classSet('slds-input slds-input_counter')
            .add({
                'slds-text-align_left slds-p-around_none': this.readOnly
            })
            .toString();
    }

    /**
     * Computed label class styling.
     *
     * @type {string}
     */
    get computedLabelClass() {
        return classSet(
            'slds-form-element__label slds-no-flex avonni-input-counter__label'
        )
            .add({
                'slds-assistive-text': this.variant === 'label-hidden'
            })
            .toString();
    }

    /**
     * Value sent to lightning-input step as a floating point number ( ex. 0.01 would result in 2 decimal places on the value ). Calculated
     * from the fractionDigits.
     *
     * @type {number}
     */
    get inputStep() {
        return this.fractionDigits ? 1 / Math.pow(10, this.fractionDigits) : 1;
    }

    /**
     * Value normalized to be passed in the validation constraint. If the type is percent, the value is multiplied by 100 to reflect its
     * end result (0.1 will be transformed into 10%).
     *
     * @type {number}
     */
    get validationValue() {
        if (this.type === 'percent' && !isNaN(this.value)) {
            return this.value * 100;
        }
        return this.value;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Sets focus on the input element.
     *
     * @public
     */
    @api
    focus() {
        const input = this.template.querySelector('[data-element-id="input"]');
        if (input) {
            input.focus();
        }
    }

    /**
     * Removes keyboard focus from the input element.
     *
     * @public
     */
    @api
    blur() {
        const input = this.template.querySelector('[data-element-id="input"]');
        if (input) {
            input.blur();
        }
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
     * -------------------------------------------------------------
     */

    /**
     * Increment or decrement the value of one step.
     *
     * @param {number} increment Direction of the increment. Valid values are 1 or -1.
     */
    _incrementValue(increment) {
        this._value = increaseNumberByStep({
            value: this.value,
            increment,
            step: this.step,
            fractionDigits: this.fractionDigits
        });
        this._normalizeValue();
        this.dispatchChange();
    }

    /**
     * Normalize the value so it doesn't go above the max or below the min.
     */
    _normalizeValue() {
        if ((this.min || this.min === 0) && this.value < this.min) {
            this._value = this.min;
        }
        if ((this.max || this.max === 0) && this.value > this.max) {
            this._value = this.max;
        }
    }

    /**
     * Update the displayed value to reflect the number of fraction digits and the type.
     */
    _updateDisplayedValue() {
        const input = this.template.querySelector('[data-element-id="input"]');
        const isSymbol =
            input.value.length === 1 && hasValidNumberSymbol(input.value);

        if (isSymbol) {
            // The input contains only a symbol (+-)
            return;
        } else if (!this.validity.valid) {
            // The value is invalid
            input.value = this.value;
            return;
        } else if (isNaN(this.value) || this.value === null) {
            // The value is empty
            input.value = '';
            return;
        }

        input.value = formatNumber(
            this.value,
            this.type,
            this.fractionDigits,
            this.step
        );
    }

    /**
     * Proxy Input Attributes updater.
     *
     * @param {object} attributes
     */
    _updateProxyInputAttributes(attributes) {
        if (this._constraintApiProxyInputUpdater) {
            this._constraintApiProxyInputUpdater(attributes);
        }
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS AND DISPATCHERS
     * -------------------------------------------------------------
     */

    /**
     * Handle a blur of the input.
     */
    handleBlur() {
        this._updateDisplayedValue();
        /**
         * The event fired when the focus is removed from the input counter.
         *
         * @event
         * @name blur
         * @public
         */
        this.dispatchEvent(new CustomEvent('blur'));
    }

    /**
     * Handle a change of the input.
     *
     * @param {Event} event
     */
    handleChange(event) {
        event.stopPropagation();
        const value = event.currentTarget.value;
        this._value = value === '' ? null : Number(value);
        this.dispatchChange();
    }

    /**
     * Handle a click on the decrement button.
     */
    handleDecrement() {
        this._incrementValue(-1);
        this._updateDisplayedValue();
    }

    /**
     * Handle a focus on the input.
     */
    handleFocus(event) {
        event.currentTarget.value = this.value || '';
        /**
         * The event fired when the input counter receives focus.
         *
         * @event
         * @name focus
         * @public
         */
        this.dispatchEvent(new CustomEvent('focus'));
    }

    /**
     * Handle a click on the increment button.
     */
    handleIncrement() {
        this._incrementValue(1);
        this._updateDisplayedValue();
    }

    /**
     * Handle a keydown on the input.
     *
     * @param {Event} event
     */
    handleKeyDown(event) {
        const key = event.key;
        switch (key) {
            case 'ArrowUp':
                event.preventDefault();
                this._incrementValue(1);
                event.currentTarget.value = this.value;
                break;
            case 'ArrowDown':
                event.preventDefault();
                this._incrementValue(-1);
                event.currentTarget.value = this.value;
                break;
            default:
                break;
        }
    }

    /**
     * Update the validity state and dispatch the change event.
     */
    dispatchChange() {
        this._updateProxyInputAttributes('value');

        /**
         * @event
         * @name change
         * @description The event fired when the value changes.
         * @param {number} value New value of the input.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    value: this.value
                }
            })
        );
        this.showHelpMessageIfInvalid();
    }
}
