import { LightningElement, api } from 'lwc';

export default class BeforeChange extends LightningElement {
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
