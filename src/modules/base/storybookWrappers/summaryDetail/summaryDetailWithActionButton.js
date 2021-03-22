import { LightningElement, api } from 'lwc';

export default class SummaryDetailWithActionButton extends LightningElement {
    @api title;
    @api closed;
}
