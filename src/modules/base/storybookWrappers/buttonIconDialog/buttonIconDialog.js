import { LightningElement, api } from 'lwc';

const DEFAULT_BUTTON_SIZE = 'medium'
const DEFAULT_BUTTON_VARIANT = 'border'

export default class ButtonIconDialog extends LightningElement {
    @api accessKey;
    @api alternativeText;
    @api tooltip;
    @api iconClass;
    @api iconName;
    @api disabled;
    @api size = DEFAULT_BUTTON_SIZE;
    @api variant = DEFAULT_BUTTON_VARIANT;
}
