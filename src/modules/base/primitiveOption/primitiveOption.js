import { LightningElement, api } from 'lwc';

export default class PrimitiveOption extends LightningElement {
    @api label;
    @api avatarFallbackIconName;
    @api avatarSrc;
    @api avatarInitials;
    @api avatarVariant;
    @api avatarPrimaryText;
    @api avatarSecondaryText;

    _value;

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
}
