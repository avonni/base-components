import { LightningElement, api } from 'lwc';

export default class Tree extends LightningElement {
    @api actions;
    @api actionsWhenDisabled;
    @api allowInlineEdit;
    @api disableSelectionCascade;
    @api editableFields;
    @api header;
    @api isLoading;
    @api isMultiSelect;
    @api items;
    @api loadingStateAlternativeText;
    @api selectedItems;
    @api sortable;

    handleSelect(event) {
        // Prevent the links from navigating
        event.preventDefault();
    }
}
