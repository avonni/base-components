import { LightningElement, api } from 'lwc';

export default class Splitter extends LightningElement {
    @api orientation;

    @api
    changeHeight(height) {}
}
