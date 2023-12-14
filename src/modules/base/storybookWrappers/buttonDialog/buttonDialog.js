import { LightningElement, api } from 'lwc';

export default class ButtonDialog extends LightningElement {
    @api accessKey;
    @api alternativeText;
    @api disabled;
    @api iconName;
    @api iconPosition;
    @api iconSrc;
    @api label;
    @api stretch;
    @api variant;
}
