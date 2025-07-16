import { LightningElement, api } from 'lwc';

const DEFAULT_SCOPED_NOTIFICATION_VARIANT = 'base';
const DEFAULT_ICON_SIZE = 'medium';

export default class NoSlotScopedNotification extends LightningElement {
    @api iconName;
    @api iconSize = DEFAULT_ICON_SIZE;
    @api title;
    @api variant = DEFAULT_SCOPED_NOTIFICATION_VARIANT;
}
