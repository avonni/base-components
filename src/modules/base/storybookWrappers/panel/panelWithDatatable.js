import { LightningElement, api } from 'lwc';

export default class PanelWithDatatable extends LightningElement {
    @api position;
    @api title;
    @api size = 'medium';
    @api showPanel = false;

    open() {
        this.template.querySelector('c-panel').open();
    }

    close() {
        this.template.querySelector('c-panel').close();
    }

    toggle() {
        this.template.querySelector('c-panel').toggle();
    }
}
