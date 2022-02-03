import { LightningElement, api } from 'lwc';

export default class Tree extends LightningElement {
    @api actions;
    @api header;
    @api isLoading;
    @api items;
    @api loadingStateAlternativeText;
    @api selectedItem;

    handleSelect(event) {
        event.preventDefault();
    }
}
