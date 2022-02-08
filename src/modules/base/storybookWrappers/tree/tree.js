import { LightningElement, api } from 'lwc';

export default class Tree extends LightningElement {
    @api actions;
    @api actionsWhenDisabled;
    @api allowInlineEdit;
    @api editFields;
    @api header;
    @api isLoading;
    @api isMultiSelect;
    @api items;
    @api loadingStateAlternativeText;
    @api selectedItems;
    @api sortable;

    handleSelect(event) {
        event.preventDefault();
    }
}
