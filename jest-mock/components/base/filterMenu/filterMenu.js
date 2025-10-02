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
    @api dropdownNubbin;
    @api hideApplyButton;
    @api hideApplyResetButtons;
    @api hideSelectedItems;
    @api iconName;
    @api iconSize;
    @api isLoading;
    @api label;
    @api loadingStateAlternativeText;
    @api name;
    @api resetButtonLabel;
    @api showClearButton;
    @api title;
    @api tooltip;
    @api type;
    @api typeAttributes;
    @api value;
    @api variant;

    @api apply() {}
    @api clear() {}
    @api focus() {}
    @api focusSearchInput() {}
    @api reset() {}
}
