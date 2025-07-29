import { LightningElement, api } from 'lwc';

const DEFAULT_PUBLISHER_VARIANT = 'base';

export default class Publisher extends LightningElement {
    @api buttonLabel;
    @api disabled;
    @api placeholder;
    @api submitAction;
    @api value;
    @api variant = DEFAULT_PUBLISHER_VARIANT;
}
