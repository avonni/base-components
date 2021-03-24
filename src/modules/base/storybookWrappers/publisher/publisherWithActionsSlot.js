import { LightningElement, api } from 'lwc';

export default class Publisher extends LightningElement {
    @api placeholder;
    @api buttonLabel;
    @api submitAction;
    @api variant = 'base';
    @api disabled;
    @api value;
}
