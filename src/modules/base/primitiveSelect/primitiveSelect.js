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
import { classSet } from 'c/utils';
import {
    normalizeBoolean,
    getRealDOMId,
    classListMutation
} from 'c/utilsPrivate';
import {
    normalizeVariant,
    VARIANT,
    InteractingState,
    buildSyntheticValidity,
    getErrorMessage
} from 'c/inputUtils';

const i18n = { required: 'required' };
const { reduce: selectedOptionValues } = Array.prototype;

export default class PrivateSelect extends LightningElement {
    @api label;
    @api name;
    @api messageWhenValueMissing;
    @api accessKey;

    _errorMessage = '';
    _options = [];
    _selectedValue;
    _variant;
    _required = false;
    _disabled = false;
    _multiple = false;
    _fieldLevelHelp;
    _size;
    _ariaDescribedBy;
    _tabIndex;

    @api
    get fieldLevelHelp() {
        return this._fieldLevelHelp;
    }

    set fieldLevelHelp(value) {
        this._fieldLevelHelp = value;
    }

    @api
    get variant() {
        return this._variant || VARIANT.STANDARD;
    }

    set variant(value) {
        this._variant = normalizeVariant(value);
        this.updateClassList();
    }

    @api
    get multiple() {
        return this._multiple;
    }

    set multiple(value) {
        this._multiple = normalizeBoolean(value);
    }

    @api
    get size() {
        if (this.multiple) {
            if (this._size === undefined) {
                return '4';
            } else {
                return this._size;
            }
        }
        return null;
    }

    set size(value) {
        this._size = value;
    }

    @api
    get required() {
        return this._required;
    }

    set required(value) {
        this._required = normalizeBoolean(value);
    }

    @api
    get disabled() {
        return this._disabled;
    }

    set disabled(value) {
        this._disabled = normalizeBoolean(value);
    }

    @api
    get value() {
        return this._selectedValue;
    }

    set value(value) {
        this._selectedValue = value;

        if (this.connected && value) {
            this.selectOptionsByValue(value);
        }
    }

    @api
    get options() {
        return this._options;
    }

    set options(value) {
        this._options = value;

        if (this.connected && value) {
            this.selectOptionsByValue(this._selectedValue);
        }
    }

    @api
    get tabIndex() {
        return this._tabIndex;
    }

    set tabIndex(value) {
        this._tabIndex = value;
    }

    connectedCallback() {
        this.classList.add('slds-form-element');
        this.updateClassList();
        this.interactingState = new InteractingState();
        this.interactingState.onleave(() => this.showHelpMessageIfInvalid());
        this.connected = true;
    }

    updateClassList() {
        classListMutation(this.classList, {
            'slds-form-element_stacked': this.variant === VARIANT.LABEL_STACKED,
            'slds-form-element_horizontal':
                this.variant === VARIANT.LABEL_INLINE
        });
    }

    renderedCallback() {
        if (this.options && this._selectedValue !== undefined) {
            this.selectOptionsByValue(this._selectedValue);
        }
    }

    disconnectedCallback() {
        this.connected = false;
    }

    @api
    focus() {
        if (this.connected) {
            this.getElement.focus();
        }
    }

    @api
    blur() {
        if (this.connected) {
            this.getElement.blur();
        }
    }

    @api
    get validity() {
        const value =
            !this.disabled &&
            this.required &&
            (null == this._selectedValue ||
                '' === this._selectedValue ||
                0 === this._selectedValue.length);
        return buildSyntheticValidity({
            valueMissing: value,
            customError:
                this.customErrorMessage != null &&
                this.customErrorMessage !== ''
        });
    }

    @api
    checkValidity() {
        const value = this.validity.valid;

        if (!value) {
            this.dispatchEvent(
                new CustomEvent('invalid', {
                    cancellable: true
                })
            );
        }

        return value;
    }

    @api
    reportValidity() {
        this.showHelpMessageIfInvalid();
        return this.checkValidity();
    }

    @api
    setCustomValidity(message) {
        this.customErrorMessage = message;
    }

    @api
    showHelpMessageIfInvalid() {
        const validity = this.validity;

        if (validity.valid) {
            this._errorMessage = '';
            this.classList.remove('slds-has-error');
            this.removeAriaDescribedBy();
        } else {
            this.classList.add('slds-has-error');
            this._errorMessage = getErrorMessage(validity, {
                valueMissing: this.messageWhenValueMissing,
                customError: this.customErrorMessage
            });
            this.setAriaDescribedBy(this.computedUniqueErrorMessageElementId);
        }
    }

    get i18n() {
        return i18n;
    }

    get errorMessage() {
        return this._errorMessage;
    }

    get getElement() {
        return this.template.querySelector('select');
    }

    get computedUniqueErrorMessageElementId() {
        return getRealDOMId(this.template.querySelector('[data-help-message]'));
    }

    get isLabelHidden() {
        return this.variant === VARIANT.LABEL_HIDDEN;
    }

    get computedLabelClass() {
        return classSet('slds-form-element__label')
            .add({
                'slds-assistive-text': this.isLabelHidden
            })
            .toString();
    }

    get computedAriaDescribedBy() {
        return this._ariaDescribedBy;
    }

    handleChange(event) {
        event.preventDefault();
        event.stopPropagation();
        this._selectedValue = this.getSelectedOptionValues();
        this.dispatchChangeEvent();
    }

    handleFocus() {
        this.interactingState.enter();
        this.dispatchEvent(new CustomEvent('focus'));
    }

    handleBlur() {
        this.interactingState.leave();
        this.dispatchEvent(new CustomEvent('blur'));
    }

    dispatchChangeEvent() {
        this.dispatchEvent(
            new CustomEvent('change', {
                composed: true,
                bubbles: true,
                detail: {
                    value: this._selectedValue
                }
            })
        );
    }

    selectOptionsByValue(value) {
        if (this.multiple) {
            if (Array.isArray(value)) {
                this.template.querySelectorAll('option').forEach((option) => {
                    option.selected = value.includes(t.value);
                });
            }
        } else {
            this.getElement.value = value;
        }
    }

    getSelectedOptionValues() {
        if (this.multiple) {
            const option = this.template.querySelectorAll('option');
            return selectedOptionValues.call(
                option,
                (option, item) => (
                    item.selected && option.push(item.value), option
                ),
                []
            );
        }
        return this.getElement.value;
    }

    setAriaDescribedBy(value) {
        this.getElement.setAttribute('aria-describedby', value);
    }

    removeAriaDescribedBy() {
        this.getElement.removeAttribute('aria-describedby');
    }
}
