import { LightningElement, api } from 'lwc';

export default class OutputData extends LightningElement {
    @api label;
    @api type;
    @api typeAttributes;
    @api value;
    @api variant;
}
