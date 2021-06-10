import { LightningElement, api } from 'lwc';

const DEFAULT_PUBLISHER_VARIANT = 'base'

export default class Publisher extends LightningElement {
    @api placeholder;
    @api buttonLabel;
    @api submitAction;
    @api variant = DEFAULT_PUBLISHER_VARIANT;
    @api disabled;
    @api value;
}
