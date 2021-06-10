import { LightningElement, api } from 'lwc';

const DEFAULT_SCOPED_NOTIFICATION_VARIANT = 'base'
const DEFAULT_ICON_SIZE = 'medium'

export default class NoSlotScopedNotification extends LightningElement {
    @api title;
    @api iconName;
    @api variant = DEFAULT_SCOPED_NOTIFICATION_VARIANT;
    @api iconSize = DEFAULT_ICON_SIZE;
}
