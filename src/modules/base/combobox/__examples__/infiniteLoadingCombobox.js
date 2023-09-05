import Component from '../../storybookWrappers/combobox/combobox';

customElements.define(
    'ac-infinite-loading-combobox',
    Component.CustomElementConstructor
);

export const InfiniteLoadingCombobox = ({
    actions,
    allowSearch,
    backAction,
    disabled,
    dropdownAlignment,
    dropdownLength,
    fieldLevelHelp,
    enableInfiniteLoading,
    groups,
    hideClearIcon,
    hideOptionsUntilSearch,
    hideSelectedOptions,
    isLoading,
    isMultiSelect,
    label,
    loadingStateAlternativeText,
    loadMoreOffset,
    messageWhenBadInput,
    messageWhenValueMissing,
    multiLevelGroups,
    name,
    options,
    placeholder,
    readOnly,
    removeSelectedOptions,
    required,
    scopes,
    scopesGroups,
    search,
    selectedOptionsAriaLabel,
    selectedOptionsDirection,
    sortableSelectedOptions,
    sortableSelectedOptionsIconName,
    value,
    variant
}) => {
    const element = document.createElement('ac-infinite-loading-combobox');
    element.actions = actions;
    element.allowSearch = allowSearch;
    element.backAction = backAction;
    element.disabled = disabled;
    element.dropdownAlignment = dropdownAlignment;
    element.dropdownLength = dropdownLength;
    element.enableInfiniteLoading = enableInfiniteLoading;
    element.fieldLevelHelp = fieldLevelHelp;
    element.groups = groups;
    element.hideClearIcon = hideClearIcon;
    element.hideOptionsUntilSearch = hideOptionsUntilSearch;
    element.hideSelectedOptions = hideSelectedOptions;
    element.isLoading = isLoading;
    element.isMultiSelect = isMultiSelect;
    element.label = label;
    element.loadMoreOffset = loadMoreOffset;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.messageWhenBadInput = messageWhenBadInput;
    element.messageWhenValueMissing = messageWhenValueMissing;
    element.multiLevelGroups = multiLevelGroups;
    element.name = name;
    element.options = options;
    element.placeholder = placeholder;
    element.readOnly = readOnly;
    element.removeSelectedOptions = removeSelectedOptions;
    element.required = required;
    element.scopes = scopes;
    element.scopesGroups = scopesGroups;
    element.search = search;
    element.selectedOptionsAriaLabel = selectedOptionsAriaLabel;
    element.selectedOptionsDirection = selectedOptionsDirection;
    element.sortableSelectedOptions = sortableSelectedOptions;
    element.sortableSelectedOptionsIconName = sortableSelectedOptionsIconName;
    element.value = value;
    element.variant = variant;
    return element;
};
