import { LightningElement } from 'lwc';

export default class WizardBeforeChange extends LightningElement {
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
