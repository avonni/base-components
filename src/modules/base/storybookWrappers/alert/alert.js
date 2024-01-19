import { LightningElement, api } from 'lwc';

const DEFAULT_ALERT_VARIANT = 'base';
const DEFAULT_ICON_SIZE = 'small';

export default class Alert extends LightningElement {
    @api iconName;
    @api iconSize = DEFAULT_ICON_SIZE;
    @api closeAction;
    @api variant = DEFAULT_ALERT_VARIANT;
    @api isDismissible = false;
}
