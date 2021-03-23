import { LightningElement, api } from 'lwc';

export default class Segment extends LightningElement {
    @api value;
    @api variant = 'shade';
    @api disabled = false;
}
