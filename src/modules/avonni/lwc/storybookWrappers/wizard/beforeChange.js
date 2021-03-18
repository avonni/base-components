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
