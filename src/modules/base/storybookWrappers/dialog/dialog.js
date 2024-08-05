import { LightningElement, api } from 'lwc';

export default class Dialog extends LightningElement {
    @api ariaDescribedBy;
    @api ariaLabelledBy;
    @api closeButtonAlternativeText;
    @api dialogName;
    @api title;
    @api loadingStateAlternativeText;
    @api size;
    @api isLoading;
    @api showDialog;
}
