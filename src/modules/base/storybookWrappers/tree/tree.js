import { LightningElement, api } from 'lwc';

export default class Tree extends LightningElement {
    @api header;
    @api isLoading;
    @api items;
    @api loadingStateAlternativeText;
    @api readOnly;
    @api selectedItem;

    handleSelect(event) {
        event.preventDefault();
    }
}
