import { LightningElement, api } from 'lwc';

export default class FilterMenu extends LightningElement {
    @api accessKey;
    @api alternativeText;
    @api applyButtonLabel;
    @api buttonVariant;
    @api disabled;
    @api dropdownAlignment;
    @api dropdownNubbin;
    @api hideApplyResetButtons;
    @api hideSelectedItems;
    @api iconName;
    @api iconSize;
    @api isLoading;
    @api label;
    @api loadingStateAlternativeText;
    @api name;
    @api resetButtonLabel;
    @api title;
    @api tooltip;
    @api type;
    @api typeAttributes;
    @api value;
    @api variant;

    @api apply() {}
    @api clear() {}
    @api focus() {}
    @api reset() {}
}
