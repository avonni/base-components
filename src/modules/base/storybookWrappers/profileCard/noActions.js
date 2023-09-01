

import { LightningElement, api } from 'lwc';

const DEFAULT_SIZE = 'medium';
const DEFAULT_POSITION = 'top-left';
const DEFAULT_VARIANT = 'circle';

export default class ProfileCard extends LightningElement {
    @api title;
    @api subtitle;
    @api backgroundSrc;
    @api backgroundAlternativeText;
    @api avatarSrc;
    @api avatarAlternativeText;
    @api avatarFallbackIconName;
    @api avatarSize = DEFAULT_SIZE;
    @api avatarPosition = DEFAULT_POSITION;
    @api avatarMobilePosition = DEFAULT_POSITION;
    @api avatarVariant = DEFAULT_VARIANT;
}
