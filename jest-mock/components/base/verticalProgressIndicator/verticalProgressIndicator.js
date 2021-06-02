import { LightningElement, api } from 'lwc';

export default class VerticalProgressIndicator extends LightningElement {
    @api currentStep;
    @api hasError;
    @api variant;
    @api contentInLine;
}
