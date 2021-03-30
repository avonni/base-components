import { LightningElement, api } from 'lwc';

export default class PrimitiveOption extends LightningElement {
    @api label;
    @api value;
    @api avatarFallbackIconName;
    @api avatarSrc;
    @api avatarInitials;
    @api avatarVariant;
    @api avatarPrimaryText;
    @api avatarSecondaryText;

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
