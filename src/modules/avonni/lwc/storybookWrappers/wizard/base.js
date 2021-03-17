import { LightningElement, api } from 'lwc';

export default class Base extends LightningElement {
    @api title;
    @api type;
    @api currentStep;
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
    @api fractionPrefixLabel;
    @api fractionLabel;
}
