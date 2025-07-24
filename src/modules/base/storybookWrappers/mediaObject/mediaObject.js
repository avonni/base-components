import { LightningElement, api } from 'lwc';

export default class MediaObject extends LightningElement {
    @api inline;
    @api responsive;
    @api size;
    @api verticalAlign;
}
