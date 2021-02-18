import { LightningElement, api } from 'lwc';

export default class ProgressBar extends LightningElement {
    @api label;

    _size = 'medium';
    _value = 0;
    _showValue = false;
    _valuePosition = 'top-right';
    _valueLabel = ''; // à vérifier
    _badges = {}; // à vérifier
    _variant = 'base';
    _theme = 'base';
    _textured = false;
    _thickness = 'medium';
    _orientation = 'horizontal';
}
