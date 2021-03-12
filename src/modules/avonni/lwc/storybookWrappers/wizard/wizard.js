import { LightningElement, api } from 'lwc';

export default class Wizard extends LightningElement {
    @api title;
    @api currentStep;
    @api variant;
    @api indicatorType;
    @api hideIndicator;
    @api buttonPreviousIconName;
    @api buttonPreviousIconPosition;
    @api buttonPreviousLabel;
    @api buttonPreviousVariant;
    @api buttonNextIconName;
    @api buttonNextIconPosition;
    @api buttonNextLabel;
    @api buttonNextVariant;
    @api buttonFinishIconName;
    @api buttonFinishIconPosition;
    @api buttonFinishVariant;
    @api buttonFinishLabel;
    @api buttonAlignmentBump;
    @api actionPosition;
    @api navigationPosition;
    @api fractionPrefixLabel;
    @api fractionLabel;
}
