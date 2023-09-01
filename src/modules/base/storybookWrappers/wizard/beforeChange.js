

import { LightningElement, api } from 'lwc';

export default class BeforeChange extends LightningElement {
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

    counter = 4;
    errorMessage = `Keep clicking on a button to change step!`;

    beforeChangeWithError = () => {
        this.counter -= 1;
        if (this.counter === 0) {
            this.counter = 4;
            return true;
        }
        return false;
    };

    beforeChangeWithConsoleLog = () => {
        console.log('Hello world!');
        return true;
    };
}
