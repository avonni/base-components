import { LightningElement, api } from 'lwc';

export default class ButtonDialog extends LightningElement {
    @api accessKey;
    @api alternativeText;
    @api cancelButtonLabel;
    @api disabled;
    @api iconName;
    @api iconPosition;
    @api iconSrc;
    @api isButtonLoading;
    @api label;
    @api loadingStateAlternativeText;
    @api saveButtonLabel;
    @api stretch;
    @api variant;
}
