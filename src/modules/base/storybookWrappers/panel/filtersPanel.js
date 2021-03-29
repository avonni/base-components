import { LightningElement, api } from 'lwc';

export default class FiltersPanel extends LightningElement {
    @api position = 'right';
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

    get isRight() {
        return this.position === 'right';
    }
}
