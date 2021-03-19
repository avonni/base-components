import { LightningElement, api } from 'lwc';

export default class ProfileCard extends LightningElement {
    @api title;
    @api subtitle;
    @api backgroundColor;
    @api backgroundSrc;
    @api backgroundAlternativeText;
    @api avatarSrc;
    @api avatarAlternativeText;
    @api avatarFallbackIconName;
    @api size = 'medium';
    @api avatarPosition = 'top-left';
    @api avatarVariant = 'circle';
}
