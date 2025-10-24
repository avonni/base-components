import { LightningElement, api } from 'lwc';

const DEFAULT_SIZE = 'medium';
const DEFAULT_POSITION = 'top-left';
const DEFAULT_VARIANT = 'circle';

export default class ProfileCard extends LightningElement {
    @api avatarAlternativeText;
    @api avatarFallbackIconName;
    @api avatarMobilePosition; // Deprecated
    @api avatarPosition = DEFAULT_POSITION;
    @api avatarSize = DEFAULT_SIZE;
    @api avatarSrc;
    @api avatarVariant = DEFAULT_VARIANT;
    @api backgroundAlternativeText;
    @api backgroundSrc;
    @api largeAvatarPosition;
    @api mediumAvatarPosition;
    @api smallAvatarPosition;
    @api subtitle;
    @api title;
}
