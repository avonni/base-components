import { LightningElement, api } from 'lwc';

export default class PrimitiveCombobox extends LightningElement {
    @api actions;
    @api allowSearch;
    @api backAction;
    @api disabled;
    @api dropdownAlignment;
    @api dropdownLength;
    @api fieldsLevelHelp;
    @api groups;
    @api isLoading;
    @api isMultiSelect;
    @api label;
    @api loadingStateAlternativeText;
    @api messageWhenBadInput;
    @api messageWhenValueMissing;
    @api multiLevelGroups;
    @api name;
    @api options;
    @api placeholder;
    @api readOnly;
    @api removeSelectedOptions;
    @api required;
    @api search;
    @api hideClearIcon;
    @api value;
    @api variant;

    @api blur() {}
    @api checkValidity() {}
    @api close() {}
    @api focus() {}
    @api open() {}
    @api removeSelectedOption() {}
    @api reportValidity() {}
    @api setCustomValidity() {}
    @api showHelpMessageIfInvalid() {}
}
