import { LightningElement, api } from 'lwc';

export default class FilterMenu extends LightningElement {
    @api accessKey;
    @api alternativeText;
    @api applyButtonLabel;
    @api buttonVariant;
    @api closed;
    @api collapsible;
    @api disabled;
    @api dropdownAlignment;
    @api dropdownLength;
    @api dropdownNubbin;
    @api dropdownWidth;
    @api hideApplyButton;
    @api hideApplyResetButtons;
    @api hideSelectedItems;
    @api iconName;
    @api iconSize;
    @api isLoading;
    @api isMultiSelect;
    @api items;
    @api label;
    @api loadingStateAlternativeText;
    @api name;
    @api resetButtonLabel;
    @api searchInputPlaceholder;
    @api showClearButton;
    @api showSearchBox;
    @api title;
    @api tooltip;
    @api type;
    @api typeAttributes;
    @api value;
    @api variant;
    @api weekStartDay;

    @api apply() {}
    @api clear() {}
    @api focus() {}
    @api focusSearchInput() {}
    @api reset() {}
}
