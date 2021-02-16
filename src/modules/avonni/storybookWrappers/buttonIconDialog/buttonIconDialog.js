import { LightningElement, api } from 'lwc';

export default class ButtonIconDialog extends LightningElement {
    @api accessKey;
    @api alternativeText;
    @api tooltip;
    @api iconClass;
    @api iconName;
    @api disabled;
    @api size = 'medium';
    @api variant = 'border';
}
