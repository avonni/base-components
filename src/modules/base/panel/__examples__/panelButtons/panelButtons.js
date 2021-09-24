import { LightningElement } from 'lwc';
export default class PanelButtons extends LightningElement {
    open() {
        this.template.querySelector('[data-element-id="avonni-panel"]').open();
    }

    close() {
        this.template.querySelector('[data-element-id="avonni-panel"]').close();
    }

    toggle() {
        this.template.querySelector('[data-element-id="avonni-panel"]').toggle();
    }
}
