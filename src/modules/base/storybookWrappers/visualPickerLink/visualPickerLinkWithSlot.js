import { LightningElement, api } from 'lwc';

const DEFAULT_ICON_POSITION = 'left';

export default class VisualPickerLink extends LightningElement {
    @api completed = false;
    @api disabled = false;
    @api href;
    @api iconName;
    @api iconPosition = DEFAULT_ICON_POSITION;
    @api infoOnly = false;
    @api title;
}
