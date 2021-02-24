import { LightningElement, api, track } from 'lwc';
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

    @track _errorMessage = '';
    @track _options = [];
    @track _selectedValue;
    @track _variant;
    @track _required = false;
    @track _disabled = false;
    @track _multiple = false;
    @track _fieldLevelHelp;
    @track _size;
    @track _ariaDescribedBy;
    @track _tabIndex;

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
