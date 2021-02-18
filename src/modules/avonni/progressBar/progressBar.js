import { LightningElement, api } from 'lwc';

export default class ProgressBar extends LightningElement {
    @api label;

    _size = 'medium';
    _value = 0;
    _showValue = false;
    _valueLabel = '';
}
