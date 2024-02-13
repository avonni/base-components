import { LightningElement, api } from 'lwc';

export default class PrimitiveCombobox extends LightningElement {
    @api actions;
    @api allowSearch;
    @api backAction;
    @api disabled;
    @api dropdownAlignment;
    @api dropdownLength;
    @api enableInfiniteLoading;
    @api fieldsLevelHelp;
    @api groups;
    @api hideOptionsUntilSearch;
    @api isLoading;
    @api isMultiSelect;
    @api label;
    @api loadingStateAlternativeText;
    @api loadMoreOffset;
    @api max;
    @api messageWhenBadInput;
    @api messageWhenRangeOverflow;
    @api messageWhenRangeUnderflow;
    @api messageWhenValueMissing;
    @api min;
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
    @api resetLevel() {}
    @api setCustomValidity() {}
    @api showHelpMessageIfInvalid() {}
}
