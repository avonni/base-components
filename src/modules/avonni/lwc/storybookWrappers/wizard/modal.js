import { LightningElement, api } from 'lwc';

export default class Modal extends LightningElement {
    @api title;
    @api iconName;
    @api variant;
    @api currentStep;
    @api indicatorType;
    @api indicatorPosition;
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
