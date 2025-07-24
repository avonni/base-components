import { LightningElement, api } from 'lwc';

export default class Dialog extends LightningElement {
    @api ariaDescribedBy;
    @api ariaLabelledBy;
    @api cancelButtonLabel;
    @api closeButtonAlternativeText;
    @api dialogName;
    @api isLoading;
    @api loadingStateAlternativeText;
    @api saveButtonLabel;
    @api size;
    @api showDialog;
    @api title;
}
