import { api, LightningElement } from 'lwc';

export default class ButtonSizes extends LightningElement {
    @api isButtonLoading;
    @api variant;
}
