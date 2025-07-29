import { LightningElement, api } from 'lwc';

const DEFAULT_PANEL_POSITION = 'right';
const DEFAULT_PANEL_SIZE = 'medium';

export default class PanelWithButtons extends LightningElement {
    @api position = DEFAULT_PANEL_POSITION;
    @api showPanel = false;
    @api size = DEFAULT_PANEL_SIZE;
    @api title;

    open() {
        this.template.querySelector('[data-element-id="avonni-panel"]').open();
    }

    close() {
        this.template.querySelector('[data-element-id="avonni-panel"]').close();
    }

    toggle() {
        this.template
            .querySelector('[data-element-id="avonni-panel"]')
            .toggle();
    }

    get isRight() {
        return this.position === 'right';
    }
}
