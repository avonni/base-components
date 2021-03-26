import { LightningElement, api } from 'lwc';

export default class Panel extends LightningElement {
    @api position = 'right';
    @api title;
    @api size = 'medium';
    @api showPanel;
}
