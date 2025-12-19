import { LightningElement, api } from 'lwc';

export default class PrimitiveAvatar extends LightningElement {
    @api actionMenuIcon;
    @api actionPosition;
    @api actions;
    @api actionTitle;
    @api alternativeText;
    @api entityIconName;
    @api entityInitials;
    @api entityPosition;
    @api entitySrc;
    @api entityTitle;
    @api entityVariant;
    @api fallbackIconName;
    @api href;
    @api initials;
    @api presence;
    @api presencePosition;
    @api presenceTitle;
    @api size;
    @api src;
    @api status;
    @api statusPosition;
    @api statusTitle;
    @api variant;

    @api
    getBackgroundColor() {}
}
