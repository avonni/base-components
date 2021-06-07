import { LightningElement, api } from 'lwc';
import { normalizeBoolean, normalizeString } from 'c/utilsPrivate';
import { classSet } from 'c/utils';

const validVariants = {valid: [
    'standard',
    'label-inline',
    'label-hidden',
    'label-stacked'
], default: 'standard'};

const validTypes = {
    valid: [
        'number',
        'curreny',
        'percent'
    ],
    default : 'number'
};

const DEFAULT_VALUE = 0;

const DEFAULT_STEP = 1

export default class InputCounter extends LightningElement {
    @api name;
    @api label;
    @api messageWhenBadInput;
    @api messageWhenPatternMismatch;
    @api messageWhenRangeOverflow;
    @api messageWhenRangeUnderflow;
    @api messageWhenStepMismatch;
    @api messageWhenValueMissing;
    @api ariaLabel;
    @api ariaControls;
    @api ariaLabelledBy;
    @api ariaDescribedBy;
    @api max;
    @api min;
    @api value = DEFAULT_VALUE;
    @api fieldLevelHelp;
    @api accessKey;
    @api typeAttributes;

    _variant = validVariants.default;
    _disabled;
    _step = DEFAULT_STEP;
    _readOnly;
    _required;
    labelVariant;
    labelFieldLevelHelp;
    init = false;
    _type = validTypes.default;
    _value = DEFAULT_VALUE;

    renderedCallback() {
        if (!this.init) {
            let srcElement = this.template.querySelector(
                '.avonni-input-counter'
            );

            if (srcElement) {
                const style = document.createElement('style');
                style.innerText =
                    '.avonni-input-counter .slds-input {font-size: 0;z-index: 0;text-align: center;padding: 0 var(--lwc-spacingXxLarge,3rem);}';
                srcElement.appendChild(style);
            }

            this.init = true;
        }

        // console.log(this.Locale)
    }

    // @api get value() {
    //     return this._value;
    // }

    // set value(value) {
    //     this._value = +value.toFixed(this.maximumFractionDigits);
    // }

    @api get variant() {
        return this._variant;
    }

    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: validVariants.default,
            validValues: validVariants.valid
        });

        if (this._variant === 'label-inline') {
            this.labelVariant = 'label-hidden';
            this.classList.add('avonni-flex-container');
        } else {
            this.labelVariant = this._variant;
            this.labelFieldLevelHelp =
                this._variant !== 'label-hidden' ? this.fieldLevelHelp : null;
        }
    }

    @api get type() {
        return this._type;
    }

    set type(value) {
        this._type = normalizeString(value, {
            fallbackValue: validTypes.default,
            validTypes: validTypes.valid
        });

        if (this._type === 'number') {
            this._type = 'decimal';
        }
    }

    get currencyCode() {
        return this.type === 'currency' ? this.typeAttributes.currency.currencyCode : "USD";
    }

    get currencyDisplayAs() {
        return this.type === 'currency' ? this.typeAttributes.currency.currencyDisplayAs : "symbol";
    }

    get minimumIntegerDigits() {
        let keyType = this._type;
        if (this._type === 'decimal') { 
            keyType = 'number'; 
        }
        return this.typeAttributes[keyType].minimumIntegerDigits;
    }
    get minimumFractionDigits() {
        let keyType = this._type;
        if (this._type === 'decimal') { 
            keyType = 'number'; 
        }
        return this.typeAttributes[keyType].minimumFractionDigits;
    }
    get maximumFractionDigits() {
        let keyType = this._type;
        if (this._type === 'decimal') { 
            keyType = 'number'; 
        }
        
        return this.typeAttributes[keyType].maximumFractionDigits;
    }
    get minimumSignificantDigits() {
        let keyType = this._type;
        if (this._type === 'decimal') { 
            keyType = 'number'; 
        }
        
        return this.typeAttributes[keyType].minimumSignificantDigits;
    }
    get maximumSignificantDigits() {
        let keyType = this._type;
        if (this._type === 'decimal') { 
            keyType = 'number'; 
        }
        return this.typeAttributes[keyType].maximumSignificantDigits;
    }

    @api
    get disabled() {
        return this._disabled;
    }

    set disabled(value) {
        this._disabled = normalizeBoolean(value);
    }

    @api
    get readOnly() {
        return this._readOnly;
    }

    set readOnly(value) {
        this._readOnly = normalizeBoolean(value);
    }
    
    @api
    get step() {
        return this._step;
    }

    set step(value) {
        this._step = typeof value === 'number' ? value : DEFAULT_STEP;
    }

    @api
    get required() {
        return this._required;
    }

    set required(value) {
        this._required = normalizeBoolean(value);
    }

    get formElementClass() {
        return classSet('slds-form-element')
            .add({
                'slds-has-error': this.showError
            })
            .toString();
    }

    get buttonIncrementClass() {
        return classSet('slds-input__button_increment')
            .add({
                'avonni-standart-top':
                    this._variant !== 'label-inline' &&
                    this._variant !== 'label-hidden',
                'avonni-hidden-top': this._variant === 'label-hidden'
            })
            .toString();
    }

    get buttonDecrementClass() {
        return classSet('slds-input__button_decrement')
            .add({
                'avonni-standart-top':
                    this._variant !== 'label-inline' &&
                    this._variant !== 'label-hidden',
                'avonni-hidden-top': this._variant === 'label-hidden'
            })
            .toString();
    }

    get inputClass() {
        return this._readOnly ? '' : 'avonni-input-counter';
    }

    get isInline() {
        return this.variant === 'label-inline';
    }

    get computedAriaControls() {
        return this.ariaControls || null;
    }

    get computedAriaLabelledBy() {
        return this.ariaLabelledBy || null;
    }

    get computedAriaDescribedBy() {
        return this.ariaDescribedBy || null;
    }

    @api
    setCustomValidity() {
        this.template.querySelector('lightning-input').setCustomValidity();
    }

    @api
    reportValidity() {
        this.template.querySelector('lightning-input').reportValidity();
    }

    @api
    focus() {
        this.template.querySelector('lightning-input').focus();
    }

    @api
    blur() {
        this.template.querySelector('lightning-input').blur();
    }

    @api
    showHelpMessageIfInvalid() {
        this.template
            .querySelector('lightning-input')
            .showHelpMessageIfInvalid();
    }

    decrementValue() {
        if (this.value !== undefined && !isNaN(this.value)) {
            let currentValue = Number(this.value);
            let stepValue = Number(this.step);
            this.value = +((currentValue - stepValue).toFixed(this.maximumFractionDigits));
            this.updateValue(this.value);
        } else {
            this.value = -1;
            this.updateValue(this.value);
        }
    }

    incrementValue() {
        if (this.value !== undefined && !isNaN(this.value)) {
            let currentValue = Number(this.value);
            let stepValue = Number(this.step);
            this.value = +((currentValue + stepValue).toFixed(this.maximumFractionDigits));
            this.updateValue(this.value);
        } else {
            this.value = 1;
            this.updateValue(this.value);
        }
    }

    updateValue(value) {
        [...this.template.querySelectorAll('lightning-input')].forEach(
            (element) => {
                element.value = value;
            }
        );

        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    value: this.value
                }
            })
        );

        this.validateValue();
    }

    validateValue() {
        [...this.template.querySelectorAll('lightning-input')].reduce(
            (validSoFar, inputCmp) => {
                inputCmp.reportValidity();
                return validSoFar && inputCmp.checkValidity();
            },
            true
        );
    }

    handlerChange(event) {
        this.value = event.target.value;
        this.validateValue();
    }

    handlerFocus() {
        this.dispatchEvent(new CustomEvent('focus'));
    }

    handlerBlur() {
        this.dispatchEvent(new CustomEvent('blur'));
    }
}
