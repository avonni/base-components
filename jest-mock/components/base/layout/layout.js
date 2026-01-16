import { LightningElement, api } from 'lwc';

export default class Layout extends LightningElement {
    @api direction;
    @api equalHeights;
    @api horizontalAlign;
    @api multipleRows;
    @api verticalAlign;
}
