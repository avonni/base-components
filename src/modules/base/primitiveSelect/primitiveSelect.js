import { LightningElement, api } from 'lwc';
import { classSet, normalizeBoolean } from 'c/utils';
import { getRealDOMId, classListMutation } from 'c/utilsPrivate';
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
    @api accessKey;
    @api label;
    @api messageWhenValueMissing;
    @api name;

    _ariaDescribedBy;
    _disabled = false;
    _errorMessage = '';
    _fieldLevelHelp;
    _multiple = false;
    _options = [];
    _required = false;
    _selectedValue;
    _size;
    _tabIndex;
    _variant;

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        this.classList.add('slds-form-element');
        this.updateClassList();
        this.interactingState = new InteractingState();
        this.interactingState.onleave(() => this.showHelpMessageIfInvalid());
        this._connected = true;
    }

    renderedCallback() {
        if (this.options && this._selectedValue !== undefined) {
            this.selectOptionsByValue(this._selectedValue);
        }
    }

    disconnectedCallback() {
        this._connected = false;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    @api
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = normalizeBoolean(value);
    }

    @api
    get fieldLevelHelp() {
        return this._fieldLevelHelp;
    }
    set fieldLevelHelp(value) {
        this._fieldLevelHelp = value;
    }

    @api
    get multiple() {
        return this._multiple;
    }
    set multiple(value) {
        this._multiple = normalizeBoolean(value);
    }

    @api
    get options() {
        return this._options;
    }
    set options(value) {
        this._options = value;

        if (this._connected && value) {
            this.selectOptionsByValue(this._selectedValue);
        }
    }

    @api
    get required() {
        return this._required;
    }
    set required(value) {
        this._required = normalizeBoolean(value);
    }

    @api
    get size() {
        return this.multiple ? this._size || '4' : null;
    }
    set size(value) {
        this._size = value;
    }

    @api
    get tabIndex() {
        return this._tabIndex;
    }
    set tabIndex(value) {
        this._tabIndex = value;
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
    get value() {
        return this._selectedValue;
    }
    set value(value) {
        this._selectedValue = value;

        if (this._connected && value) {
            this.selectOptionsByValue(value);
        }
    }

    @api
    get variant() {
        return this._variant || VARIANT.STANDARD;
    }
    set variant(value) {
        this._variant = normalizeVariant(value);
        this.updateClassList();
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    get computedAriaDescribedBy() {
        return this._ariaDescribedBy;
    }

    get computedLabelClass() {
        return classSet('slds-form-element__label')
            .add({
                'slds-assistive-text': this.isLabelHidden
            })
            .toString();
    }

    get computedUniqueErrorMessageElementId() {
        return getRealDOMId(this.template.querySelector('[data-help-message]'));
    }

    get errorMessage() {
        return this._errorMessage;
    }

    get getElement() {
        return this.template.querySelector('[data-element-id="select"]');
    }

    get i18n() {
        return i18n;
    }

    get isLabelHidden() {
        return this.variant === VARIANT.LABEL_HIDDEN;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    @api
    blur() {
        if (this._connected) {
            this.getElement.blur();
        }
    }

    @api
    checkValidity() {
        const value = this.validity.valid;

        if (!value) {
            this.dispatchEvent(
                new CustomEvent('invalid', {
                    cancelable: true
                })
            );
        }

        return value;
    }

    @api
    focus() {
        if (this._connected) {
            this.getElement.focus();
        }
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

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    getSelectedOptionValues() {
        if (this.multiple) {
            const options = this.template.querySelectorAll(
                '[data-element-id^="option"]'
            );
            return selectedOptionValues.call(
                options,
                (option, item) => (
                    item.selected && option.push(item.value), option
                ),
                []
            );
        }
        return this.getElement.value;
    }

    removeAriaDescribedBy() {
        this.getElement.removeAttribute('aria-describedby');
    }

    selectOptionsByValue(value) {
        if (this.multiple) {
            if (Array.isArray(value)) {
                this.template
                    .querySelectorAll('[data-element-id^="option"]')
                    .forEach((option) => {
                        option.selected = value.includes(t.value);
                    });
            }
        } else {
            this.getElement.value = value;
        }
    }

    setAriaDescribedBy(value) {
        this.getElement.setAttribute('aria-describedby', value);
    }

    updateClassList() {
        classListMutation(this.classList, {
            'slds-form-element_stacked': this.variant === VARIANT.LABEL_STACKED,
            'slds-form-element_horizontal':
                this.variant === VARIANT.LABEL_INLINE
        });
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS && DISPATCHERS
     * -------------------------------------------------------------
     */

    handleBlur() {
        this.interactingState.leave();
        this.dispatchEvent(new CustomEvent('blur'));
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
}
