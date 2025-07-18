import { LightningElement, api } from 'lwc';

const DEFAULT_PANEL_POSITION = 'right';
const DEFAULT_PANEL_SIZE = 'medium';

export default class PanelWithContentInside extends LightningElement {
    @api position = DEFAULT_PANEL_POSITION;
    @api showPanel = false;
    @api size = DEFAULT_PANEL_SIZE;
    @api title;

    close() {
        this.template.querySelector('[data-element-id="avonni-panel"]').close();
    }

    open() {
        this.template.querySelector('[data-element-id="avonni-panel"]').open();
    }

    toggle() {
        this.template
            .querySelector('[data-element-id="avonni-panel"]')
            .toggle();
    }
}
