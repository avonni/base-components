import { LightningElement, api } from 'lwc';

export default class MediaObject extends LightningElement {
    @api verticalAlign;
    @api responsive;
    @api inline;
    @api size;
}
