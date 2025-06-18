import { LightningElement, api } from 'lwc';

export default class PrimitiveTreeItem extends LightningElement {
    @api color;
    @api enableInfiniteLoading;
    @api iconName;
    @api loadingStateAlternativeText;
    @api nodeKey;
    @api actions;
    @api actionsWhenDisabled;
    @api allowInlineEdit;
    @api avatar;
    @api childItems;
    @api collapseDisabled;
    @api disabled;
    @api editableFields;
    @api expanded;
    @api fields;
    @api hiddenActions;
    @api href;
    @api independentMultiSelect;
    @api indeterminate;
    @api isLeaf;
    @api isLoading;
    @api label;
    @api level;
    @api metatext;
    @api name;
    @api noSlots;
    @api selected;
    @api showCheckbox;
    @api slottableTypes;
    @api sortable;
    @api type;
    @api unselectable;
}
