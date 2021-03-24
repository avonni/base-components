import { LightningElement, api } from 'lwc';

export default class VisualPickerLink extends LightningElement {
    @api iconName;
    @api title;
    @api href;
    @api iconPosition = 'left';
    @api completed = false;
    @api infoOnly = false;
}
