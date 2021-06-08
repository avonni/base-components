import { LightningElement, api } from 'lwc';
import { normalizeBoolean, normalizeString } from 'c/utilsPrivate';
import { classSet } from 'c/utils';
import { ContainerWithSmallPopoverError } from '../buttonIconPopover/__docs__/buttonIconPopover.stories';

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
    // @api value = DEFAULT_VALUE;
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
                    '.avonni-input-counter .slds-input {font-size: 16px;z-index: 0;text-align: left;padding: 0 var(--lwc-spacingXxLarge,3rem);}';
                srcElement.appendChild(style);
            }

            this.init = true;
        }

        console.log("%c RENDERED value:", 'background: green; color: white;', this.value)
        console.log("%c RENDERED modulo remainder val-min % step:", 'background: green; color: white;', (((this.value - this.min) + this.step) % this.step)) // ((a % n ) + n ) % n.
        console.log('%c RENDERED modulo val/step:', 'background: green; color: white;', (this.value % this.step))
            
    }

    @api get value() {
        return this._value;
    }

    set value(value) {
        this._value = parseFloat(value);
    }

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
        } else if ( this._type === 'percent' ) {
            this._type = 'percent-fixed';
        } else if ( this._type === 'currency') {
            this._type = 'currency'
        }
    }

    get currencyCode() {
        return this.type === 'currency' ? this.typeAttributes.currency.currencyCode : "USD"; //locale
    }

    get currencyDisplayAs() {
        return this.type === 'currency' ? this.typeAttributes.currency.currencyDisplayAs : "symbol";
    }

    get minimumIntegerDigits() {
        let keyType = this._type;
        if (this._type === 'decimal') { 
            keyType = 'number'; 
        } else if ( this._type === 'percent-fixed' ) {
            keyType = 'percent';
        } else if ( this._type === 'currency') {
            keyType = 'currency'
        }
        return this.typeAttributes[keyType].minimumIntegerDigits;
    }
    get minimumFractionDigits() {
        let keyType = this._type;
        if (this._type === 'decimal') { 
            keyType = 'number'; 
        } else if ( this._type === 'percent-fixed' ) {
            keyType = 'percent';
        } else if ( this._type === 'currency') {
            keyType = 'currency'
        }
        return this.typeAttributes[keyType].minimumFractionDigits;
    }
    get maximumFractionDigits() {
        let keyType = this._type;
        if (this._type === 'decimal') { 
            keyType = 'number'; 
        } else if ( this._type === 'percent-fixed' ) {
            keyType = 'percent';
        } else if ( this._type === 'currency') {
            keyType = 'currency'
        }
        
        return this.typeAttributes[keyType].maximumFractionDigits;
    }
    get minimumSignificantDigits() {
        let keyType = this._type;
        if (this._type === 'decimal') { 
            keyType = 'number'; 
        } else if ( this._type === 'percent-fixed' ) {
            keyType = 'percent';
        } else if ( this._type === 'currency') {
            keyType = 'currency'
        }
        
        return this.typeAttributes[keyType].minimumSignificantDigits;
    }
    get maximumSignificantDigits() {
        let keyType = this._type;
        if (this._type === 'decimal') { 
            keyType = 'number'; 
        } else if ( this._type === 'percent-fixed' ) {
            keyType = 'percent';
        } else if ( this._type === 'currency') {
            keyType = 'currency'
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
        this._step = typeof value === 'number' ? parseFloat(value) : DEFAULT_STEP;
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
            this.value = Number.parseFloat((currentValue - stepValue).toFixed(this.maximumFractionDigits));
            console.log("%c dec. value:", 'background: orange; color: white;', this.value);
            console.log("%c dec. previous value:", 'background: orange; color: white;', currentValue)
            console.log("%c dec. val - previous % step:", 'background: orange; color: white;', ((this.value - currentValue) + this.step ) % this._step); 
            console.log("%c dec. this step:", 'background: orange; color: white;', this._step);
            console.log("%c dec. prev value - step:", 'background: orange; color: white;', currentValue - this._step);
            console.log("%c dec. value + step:", 'background: orange; color: white;', this.value + this._step);
            this.step = parseFloat(parseFloat(stepValue).toFixed(this.maximumFractionDigits));
            
            let remainder = false;
            let stepBefore;           

            let myStep = stepValue;
            console.log("%c dec. MyStep:", 'background: orange; color: white;', myStep);
            remainder = this.value % myStep;
            console.log("%c dec. Remainder:", 'background: orange; color: white;',remainder);
            this.value = Math.floor(this.value / myStep ) * myStep;
            console.log("%c dec. Floor value:", 'background: orange; color: white;',this.value)
            stepBefore = this.step;
            console.log("%c dec. StepBefore:", 'background: orange; color: white;',stepBefore)
            this.step = myStep;
            console.log("%c dec. This.step = MyStep:", 'background: orange; color: white;',this.step)
            
            this.updateValue(this.value);

            if ( remainder ) {
                this.value = +((+(this.value) + remainder).toFixed(this.maximumFractionDigits));
                console.log("%c dec. Value + Remainder:", 'background: orange; color: white;',this.value);
                this.step = +(stepBefore.toFixed(this.maximumFractionDigits));
                console.log("%c dec. This.step = StepBefore:", 'background: orange; color: white;',this.step);
                remainder = false;
            }

        } else {
            this.value = -1;
            this.updateValue(this.value);
        }
    }

    incrementValue() {
        if (this.value !== undefined && !isNaN(this.value)) {
            let currentValue = Number(this.value);
            let stepValue = Number(this.step);
            this.value = Number.parseFloat((currentValue + stepValue).toFixed(this.maximumFractionDigits));
            console.log("%c inc. value:", 'background: blue; color: white;', this.value);
            console.log("%c inc. previous value:", 'background: blue; color: white;', currentValue)
            console.log("%c inc. val - previous % step:", 'background: blue; color: white;', (this.value - currentValue) % this._step);
            this.step = parseFloat(parseFloat(stepValue).toFixed(this.maximumFractionDigits));

            let remainder = false;
            let stepBefore;           

            let myStep = stepValue;
            console.log("%c dec. MyStep:", 'background: orange; color: white;', myStep);
            remainder = this.value % myStep;
            console.log("%c dec. Remainder:", 'background: orange; color: white;',remainder);
            this.value = Math.floor(this.value / myStep ) * myStep;
            console.log("%c dec. Floor value:", 'background: orange; color: white;',this.value)
            stepBefore = this.step;
            console.log("%c dec. StepBefore:", 'background: orange; color: white;',stepBefore)
            this.step = myStep;
            console.log("%c dec. This.step = MyStep:", 'background: orange; color: white;',this.step)

            this.updateValue(this.value);

            if ( remainder ) {
                this.value = +((+(this.value) + remainder).toFixed(this.maximumFractionDigits));
                console.log("%c dec. Value + Remainder:", 'background: orange; color: white;',this.value);
                this.step = +(stepBefore.toFixed(this.maximumFractionDigits));
                console.log("%c dec. This.step = StepBefore:", 'background: orange; color: white;',this.step);
                remainder = false;
            }

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
                console.log('%c ValidsoFar:' + validSoFar, 'background: red; color: white;');
                console.log('%c inputcmp:', 'background: red; color: white;', inputCmp);
                console.log('%c inputcmp.reportValidity:' + inputCmp.reportValidity(), 'background: red; color: white;');
                console.log('%c inputcmp.checkValidity:' + inputCmp.checkValidity(), 'background: red; color: white;');
                inputCmp.reportValidity();
                return validSoFar && inputCmp.checkValidity();
            },
            true
        );
    }

    handlerChange(event) {
        this.value = parseFloat(event.target.value);
        this.validateValue();
    }

    handlerFocus() {
        this.dispatchEvent(new CustomEvent('focus'));
    }

    handlerBlur() {
        this.dispatchEvent(new CustomEvent('blur'));
    }
}
