import { LightningElement, api } from 'lwc';

export default class VerticalProgressIndicator extends LightningElement {
    @api currentStep;
    @api variant = 'base';
    @api hasError = false;
    @api contentInLine = false;
}
