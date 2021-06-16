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
import { classSet } from 'c/utils';
import { FieldConstraintApiWithProxyInput } from 'c/inputUtils';

const validVariants = {valid: [
    'standard',
    'label-inline',
    'label-hidden',
    'label-stacked'
], default: 'standard'};

const validTypes = {valid: [
    'number',
    'currency',
    'percent'
], default: 'number'};

const DEFAULT_STEP = 1;

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
    @api fieldLevelHelp;
    @api accessKey;
    @api value;

    _variant = validVariants.default;
    _disabled;
    _step = DEFAULT_STEP;
    _type = validTypes.default;
    _readOnly;
    _required;
    _fractionDigits;
    _fractionDigitsLength;
    _constraintApi;
    _constraintApiProxyInputUpdater;
    _helpMessage;
    labelVariant;
    labelFieldLevelHelp;
    init = false;

    renderedCallback() {
        if (!this.init) {
            let srcElement = this.template.querySelector(
                '.avonni-input-counter'
            );

            if (srcElement) {
                const style = document.createElement('style');
                style.innerText =
                    '.avonni-input-counter .slds-input {text-align: center;padding: 0 var(--lwc-spacingXxLarge,3rem);}';
                srcElement.appendChild(style);
            }
            // this.updateValue(this.value);
            this.showHelpMessageIfInvalid();
            this.init = true;
        }
        this.checkValidity();
    }

    @api get min() {
        return this._min;
    }

    set min(min) {
        this._min = typeof min === 'number' ? this.handlePrecision(min) : '';
    }

    @api get max() {
        return this._max;
    }

    set max(max) {
        this._max = typeof max === 'number' ? this.handlePrecision(max) : '';
    }
    
    @api get fractionDigits() {
        return this._fractionDigits;
    }

    set fractionDigits(digits) {
        const baseFractionValue = 1;
        this._fractionDigits = typeof digits === 'number' ? +('0.' + baseFractionValue.toString().padStart(digits, '0')) : '';
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

    set type(type) {
        this._type = normalizeString(type, {
            fallbackValue: validTypes.default,
            validValues: validTypes.valid
        });
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

            
        decrementValue() {
            this.max = this.handlePrecision(this.max);
            this.min = this.handlePrecision(this.min);
            this.step = this.handlePrecision(this.step);
        if (this.value !== undefined && !isNaN(this.value)) {
            this.value = Number(this.value) - Number(this.step);           
            if (this.min || this.min === 0) {                
                    if (this.min > this.value - this.step ) {
                        this.value = this.min;
                    }
            }
            if (this.max) {
                if (this.value + this.step > this.max) {
                    this.value = this.max;
                }     
            }
        } else {
            if (!this.step && !this.min) {
                this.value = -1;                
            } else if (this.step && this.min === 0 && isNaN(this.value)) {                
                this.value = 0;
            } else if (this.step && !this.min) {                
                this.value = -this.step;                
            } else if (this.step && this.min) {
                this.value = this.min;                
            }     
        }
        this.value = this.handlePrecision(this.value);
        this.updateValue(this.value);
        this.changeValue();
        this.checkValidity();
        this.showHelpMessageIfInvalid();
    }

    incrementValue() {
        this.max = this.handlePrecision(this.max);
        this.min = this.handlePrecision(this.min);
        this.step = this.handlePrecision(this.step);        
        if (this.value !== undefined && !isNaN(this.value)) {
            this.value = Number(this.value) + Number(this.step);            
            if (this.min || this.min === 0) {                
                    if (this.min > this.value - this.step ) {
                        this.value = this.min;
                    }    
            }
            if (this.max) {
                if (this.value + this.step > this.max) {
                    this.value = this.max;
                }     
            }
        } else {            
            if (!this.step && !this.min) {
                this.value = +1;                
            } else if (this.step && !this.min) {
                this.value = +this.step;                
            } else if (this.step && this.min) {
                this.value = this.min;     
            } else if (this.step && this.min === 0 && isNaN(this.value)) {                
                this.value = 0;
            }
        }
        this.value = this.handlePrecision(this.value);
        this.updateValue(this.value);
        this.changeValue();
        this.checkValidity();
        this.showHelpMessageIfInvalid();
    }

    handlePrecision(input) {   
        this._fractionDigitsLength = this.fractionDigits && this.fractionDigits.toString().length;
        const uniformOutputCorrection = this._fractionDigitsLength > 2 ? 2 : 1;

        if (this.fractionDigits && input.toString().length > this._fractionDigitsLength) {
            input = +(input.toFixed(this._fractionDigitsLength - uniformOutputCorrection));
        }

        return input;
    }

    updateValue(value) {
        [...this.template.querySelectorAll('lightning-input')].forEach(
            (element) => {
                element.value = value;
                // element.max = this.max;
                // element.min = this.min;
                // element.formatter = this.type;
            }
        );
        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    value: this.value,
                    // max: this.max,
                    // min: this.min,
                    // formatter: this.type
                }
            })
        );
        console.log("UPDATE VALUE")
        this.changeValue();
        // this.checkValidity();
        // this.showHelpMessageIfInvalid();
    }

    // validateValue() {
    //     [...this.template.querySelectorAll('lightning-input')].reduce(
    //         (validSoFar, inputCmp) => {
    //             inputCmp.reportValidity();
    //             return validSoFar && inputCmp.checkValidity();
    //         },
    //         true
    //     );
    // }

    handlerChange(event) {
        console.log("HANDLER CHANGE")
        this.value = event.target.value;
        this.changeValue();
    }
    
    @api
    focus() {
        this.template.querySelector('lightning-input').focus();
    }

    @api
    blur() {
        this.template.querySelector('lightning-input').blur();
    }

    handlerFocus() {
        this.dispatchEvent(new CustomEvent('focus'));
    }

    handlerBlur(event) {
        this.value = event.target.value;
        // const minval = this.template.querySelector('lightning-input');
        // console.log(minval.validity.rangeUnderflow);
        // console.log(event.target.min)
        // event.target.min = "";
        // console.log(minval.validity.rangeUnderflow);
        // console.log(event.target.min)
        // // this.updateValue(this.value);
        this.changeValue();
        this.checkValidity();
        this.showHelpMessageIfInvalid();
        this.dispatchEvent(new CustomEvent('blur'));
    }

    handleInput(event) {
        this.value = event.target.value;
        this.changeValue();
    }

    changeValue() {
        this._updateProxyInputAttributes('value');
        console.log("CHANGE VALUE")
        const selectedEvent = new CustomEvent('change', {
            detail: {
                value: Number(this.value)
            }
        });

        this.dispatchEvent(selectedEvent);
    }

    @api get validity() {
        return this._constraint.validity;
    }

    @api
    checkValidity() {
        return this._constraint.checkValidity();
    }

    @api
    reportValidity() {
        console.log("CHANGE REPORT")
        let helpMessage = '';

        let valMsg = this._constraint.reportValidity((message) => {
            helpMessage = helpMessage + message;
        });

        this._helpMessage = helpMessage;
        console.log(valMsg);
        console.log(helpMessage);
        return valMsg;
    }

    @api
    setCustomValidity(message) {
        this._constraint.setCustomValidity(message);
    }

    @api
    showHelpMessageIfInvalid() {
        this.reportValidity();
    }

    _updateProxyInputAttributes(attributes) {
        if (this._constraintApiProxyInputUpdater) {
            this._constraintApiProxyInputUpdater(attributes);
        }
    }

    get _constraint() {
        if (!this._constraintApi) {
            this._constraintApi = new FieldConstraintApiWithProxyInput(
                () => this
            );

            console.log("CONSTRAINT")

            this._constraintApiProxyInputUpdater = this._constraintApi.setInputAttributes(
                {
                    type: () => 'number',
                    value: () => this.handlePrecision(this.value),
                    max: () => this.handlePrecision(this.max),
                    min: () => this.handlePrecision(this.min),
                    step: () => this.fractionDigits,
                    formatter: () => this.type,
                    disabled: () => this.disabled
                }
            );
        }
        console.log(this._constraintApi)
        return this._constraintApi;
    }
}