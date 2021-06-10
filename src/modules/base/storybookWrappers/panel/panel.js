import { LightningElement, api } from 'lwc';

const DEFAULT_PANEL_POSITION = 'right'
const DEFAULT_PANEL_SIZE = 'medium'

export default class Panel extends LightningElement {
    @api position = DEFAULT_PANEL_POSITION;
    @api title;
    @api size = DEFAULT_PANEL_SIZE;
    @api showPanel = false;

    open() {
        this.template.querySelector('c-panel').open();
    }
}
