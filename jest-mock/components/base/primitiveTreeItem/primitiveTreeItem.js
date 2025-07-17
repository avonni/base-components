import { LightningElement, api } from 'lwc';

export default class PrimitiveTreeItem extends LightningElement {
    @api actions;
    @api actionsWhenDisabled;
    @api allowInlineEdit;
    @api avatar;
    @api childItems;
    @api cancelButtonLabel;
    @api closeButtonIconAlternativeText;
    @api collapseButtonAlternativeText;
    @api collapseDisabled;
    @api doneButtonLabel;
    @api color;
    @api disabled;
    @api editableFields;
    @api enableInfiniteLoading;
    @api expanded;
    @api expandButtonAlternativeText;
    @api fields;
    @api href;
    @api iconName;
    @api independentMultiSelect;
    @api indeterminate;
    @api isLeaf;
    @api isLoading;
    @api label;
    @api level;
    @api loadingStateAlternativeText;
    @api loadMoreButtonLabel;
    @api metatext;
    @api name;
    @api nodeKey;
    @api saveButtonIconAlternativeText;
    @api selected;
    @api showCheckbox;
    @api sortable;
}
