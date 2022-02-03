import { LightningElement, api } from 'lwc';

export default class Tree extends LightningElement {
    @api actions;
    @api header;
    @api isLoading;
    @api items;
    @api loadingStateAlternativeText;
    @api selectedItem;
    @api sortable;

    handleSelect(event) {
        event.preventDefault();
    }
}
