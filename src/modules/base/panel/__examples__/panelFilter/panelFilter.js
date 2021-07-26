import { LightningElement, api } from 'lwc';

const DEFAULT_PANEL_POSITION = 'right';
const DEFAULT_PANEL_SIZE = 'medium';

export default class PanelFilter extends LightningElement {
    @api position = DEFAULT_PANEL_POSITION;
    @api title;
    @api size = DEFAULT_PANEL_SIZE;

    open() {
        this.template.querySelector('avonni-panel').open();
    }

    close() {
        this.template.querySelector('avonni-panel').close();
    }

    toggle() {
        this.template.querySelector('avonni-panel').toggle();
    }

    get isRight() {
        return this.position === 'right';
    }
}
