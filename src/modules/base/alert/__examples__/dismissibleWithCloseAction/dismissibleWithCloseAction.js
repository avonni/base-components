import { LightningElement } from 'lwc';

export default class AlertDismissibleWithCloseAction extends LightningElement {
    closeAction() {
        console.log('Close action triggered');
    }
}
