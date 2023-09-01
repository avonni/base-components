

import { LightningElement, api } from 'lwc';

export default class Modal extends LightningElement {
    @api title;
    @api iconName;
    @api variant;
    @api currentStep;
    @api hideNavigation;
    @api indicatorType;
    @api indicatorPosition;
    @api hideIndicator;
    @api previousButtonIconName;
    @api previousButtonIconPosition;
    @api previousButtonLabel;
    @api previousButtonVariant;
    @api nextButtonIconName;
    @api nextButtonIconPosition;
    @api nextButtonLabel;
    @api nextButtonVariant;
    @api finishButtonIconName;
    @api finishButtonIconPosition;
    @api finishButtonVariant;
    @api finishButtonLabel;
    @api buttonAlignmentBump;
    @api actionPosition;
    @api fractionPrefixLabel;
    @api fractionLabel;
}
