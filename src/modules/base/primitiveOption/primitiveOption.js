import { LightningElement, api } from 'lwc';
import { classSet } from 'c/utils';
import { normalizeBoolean } from 'c/utilsPrivate';

export default class PrimitiveOption extends LightningElement {
    @api label;
    @api avatarFallbackIconName;
    @api avatarSrc;
    @api avatarInitials;
    @api avatarVariant;
    @api avatarPrimaryText;
    @api avatarSecondaryText;
    @api requiredOptions;

    _value;
    _isSelected = false;
    _index;

    connectedCallback() {}

    @api
    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
        this.setAttribute('data-option', value);
    }

    @api
    get index() {
        return this._index;
    }

    set index(value) {
        this._index = value;
        this.setAttribute('data-index', value);
    }

    @api
    get isSelected() {
        return this._isSelected;
    }

    set isSelected(value) {
        this._isSelected = normalizeBoolean(value);
    }

    get hasAvatar() {
        return (
            this.avatarFallbackIconName ||
            this.avatarSrc ||
            this.avatarInitials ||
            this.avatarPrimaryText ||
            this.avatarSecondaryText
        );
    }

    get isRequired() {
        return this.requiredOptions.includes(this.value);
    }

    get computedOptionClass() {
        return classSet(
            'slds-listbox__option slds-listbox__option_plain slds-media slds-media_center slds-media_small slds-media_inline'
        )
            .add({
                'slds-is-selected': this._isSelected === true
            })
            .toString();
    }

    get computedTabIndex() {
        if (this._isSelected) {
            return '0';
        }
        return '-1';
    }

    get computedAriaSelected() {
        if (this._isSelected) {
            return true;
        }
        return false;
    }

    get computedAriaDisabled() {
        if (this.requiredOptions.includes(this.value)) {
            return true;
        }
        return false;
    }

    handleClick() {
        this._isSelected = !this._isSelected;
        this.dispatchEvent(
            new CustomEvent('selected', {
                detail: {
                    value: this.value
                }
            })
        );
    }

    handleBlur() {
        this._isSelected = false;
    }
}
