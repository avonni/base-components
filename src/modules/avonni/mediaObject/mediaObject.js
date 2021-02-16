import { LightningElement, api, track } from 'lwc';

export default class MediaObject extends LightningElement {
    @api verticalAlign;
    @api responsive;
    @api inline;
    @api size;

    @track _verticalAlign;
    @track _responsive = false;
    @track _inline = false;
    @track _size = 'slds-media_medium';
}
