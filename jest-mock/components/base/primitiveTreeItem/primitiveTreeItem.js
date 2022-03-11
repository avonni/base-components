import { LightningElement, api } from 'lwc';

export default class PrimitiveTreeItem extends LightningElement {
    @api loadingStateAlternativeText;
    @api nodeKey;
    @api actions;
    @api actionsWhenDisabled;
    @api allowInlineEdit;
    @api avatar;
    @api childItems;
    @api disabled;
    @api editableFields;
    @api fields;
    @api href;
    @api independentMultiSelect;
    @api expanded;
    @api isLeaf;
    @api isLoading;
    @api label;
    @api level;
    @api metatext;
    @api name;
    @api selected;
    @api showCheckbox;
    @api sortable;
}
