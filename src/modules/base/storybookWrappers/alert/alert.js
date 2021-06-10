import { LightningElement, api } from 'lwc';

const DEFAULT_ALERT_VARIANT = 'base'

export default class Alert extends LightningElement {
    @api iconName;
    @api closeAction;
    @api variant = DEFAULT_ALERT_VARIANT;
    @api isDismissible = false;
}
