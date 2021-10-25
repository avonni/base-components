import { LightningElement, api } from 'lwc';

export default class ColorGradient extends LightningElement {
    @api messageWhenBadInput;
    @api value;
    @api disabled;
    @api readOnly;
    @api opacity;

    @api
    renderValue() {
        return true;
    }
}
