import { LightningElement, api } from 'lwc';
import { classSet } from 'c/utils';

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

    connectedCallback() {
        console.log(this._isSelected);
    }

    @api
    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
        this.setAttribute('data-option', value);
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

    handleFocus() {
        this._isSelected = !this._isSelected;
    }

    handleBlur() {
        this._isSelected = false;
    }
}
