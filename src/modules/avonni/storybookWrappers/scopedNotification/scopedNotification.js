import { LightningElement, api } from 'lwc';

export default class ScopedNotification extends LightningElement {
    @api title;
    @api iconName;
    @api variant = 'base';
    @api iconSize = 'medium';
}
