

import { LightningElement, api } from 'lwc';

const DEFAULT_INDICATOR_VARIANT = 'base';
const DEFAULT_VERTICAL_PROGRESS_INDICATOR_FORMAT = 'linear';

export default class VerticalProgressIndicator extends LightningElement {
    @api completedSteps;
    @api contentInLine = false;
    @api currentStep;
    @api format = DEFAULT_VERTICAL_PROGRESS_INDICATOR_FORMAT;
    @api hasError = false;
    @api markAsComplete = false;
    @api variant = DEFAULT_INDICATOR_VARIANT;
}
