import { LightningElement, api } from 'lwc';

const DEFAULT_INDICATOR_VARIANT = 'base'

export default class VerticalProgressIndicator extends LightningElement {
    @api currentStep;
    @api variant = DEFAULT_INDICATOR_VARIANT;
    @api hasError = false;
    @api contentInLine = false;
}
