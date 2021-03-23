import { LightningElement, api } from 'lwc';

export default class SummaryDetail extends LightningElement {
    @api title;
    @api closed;
}
