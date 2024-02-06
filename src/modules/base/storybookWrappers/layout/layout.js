import { LightningElement, api } from 'lwc';

export default class Layout extends LightningElement {
    @api columnGap;
    @api direction;
    @api horizontalAlign;
    @api multipleRows;
    @api rowGap;
    @api verticalAlign;
}
