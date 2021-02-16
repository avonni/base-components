import { LightningElement, api } from 'lwc';

export default class ButtonDialog extends LightningElement {
    @api accessKey;
    @api label;
    @api iconName;
    @api disabled;
    @api variant;
    @api iconPosition;
}
