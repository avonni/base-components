import { LightningElement, api } from 'lwc';

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

    connectedCallback() {
        console.log(this.isRequired);
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
}
