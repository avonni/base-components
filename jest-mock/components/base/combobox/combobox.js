import { LightningElement, api } from 'lwc';

export default class Combobox extends LightningElement {
    @api actions;
    @api allowSearch;
    @api backAction;
    @api disabled;
    @api dropdownAlignment;
    @api dropdownLength;
    @api enableInfiniteLoading;
    @api fieldLevelHelp;
    @api groups;
    @api hideClearIcon;
    @api hideOptionsUntilSearch;
    @api hideSelectedOptions;
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
    @api noResultsMessage;
    @api options;
    @api placeholder;
    @api readOnly;
    @api removeSelectedOptions;
    @api required;
    @api requiredAlternativeText;
    @api scopes;
    @api scopesGroups;
    @api search;
    @api selectedOptionsAriaLabel;
    @api selectedOptionsDirection;
    @api sortableSelectedOptions;
    @api sortableSelectedOptionsIconName;
    @api value;
    @api variant;

    @api blur() {}
    @api checkValidity() {}
    @api close() {}
    @api focus() {}
    @api open() {}
    @api reportValidity() {}
    @api resetLevel() {}
    @api setCustomValidity() {}
    @api showHelpMessageIfInvalid() {}
    @api updateScope() {}
}
