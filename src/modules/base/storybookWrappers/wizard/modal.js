import { LightningElement, api } from 'lwc';

export default class Modal extends LightningElement {
    @api actionPosition;
    @api buttonAlignmentBump;
    @api currentStep;
    @api finishButtonIconName;
    @api finishButtonIconPosition;
    @api finishButtonLabel;
    @api finishButtonVariant;
    @api fractionLabel;
    @api fractionPrefixLabel;
    @api hideIndicator;
    @api hideNavigation;
    @api iconName;
    @api indicatorPosition;
    @api indicatorType;
    @api nextButtonIconName;
    @api nextButtonIconPosition;
    @api nextButtonLabel;
    @api nextButtonVariant;
    @api previousButtonIconName;
    @api previousButtonIconPosition;
    @api previousButtonLabel;
    @api previousButtonVariant;
    @api title;
    @api variant;
}
