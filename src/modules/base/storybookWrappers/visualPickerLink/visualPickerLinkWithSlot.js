import { LightningElement, api } from 'lwc';

const DEFAULT_ICON_POSITION = 'left'

export default class VisualPickerLink extends LightningElement {
    @api iconName;
    @api title;
    @api href;
    @api iconPosition = DEFAULT_ICON_POSITION;
    @api completed = false;
    @api infoOnly = false;
}
