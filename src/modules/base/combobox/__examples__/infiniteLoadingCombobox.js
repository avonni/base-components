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
    hideAvatarInSelectedOptions,
    hideClearIcon,
    hideOptionsUntilSearch,
    hideSelectedOptions,
    isLoading,
    isMultiSelect,
    label,
    loadingStateAlternativeText,
    loadMoreOffset,
    max,
    messageWhenBadInput,
    messageWhenRangeOverflow,
    messageWhenRangeUnderflow,
    messageWhenValueMissing,
    min,
    multiLevelGroups,
    name,
    noResultsMessage,
    options,
    placeholder,
    readOnly,
    removeSelectedOptions,
    required,
    requiredAlternativeText,
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
    element.hideAvatarInSelectedOptions = hideAvatarInSelectedOptions;
    element.hideClearIcon = hideClearIcon;
    element.hideOptionsUntilSearch = hideOptionsUntilSearch;
    element.hideSelectedOptions = hideSelectedOptions;
    element.isLoading = isLoading;
    element.isMultiSelect = isMultiSelect;
    element.label = label;
    element.loadMoreOffset = loadMoreOffset;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.max = max;
    element.messageWhenBadInput = messageWhenBadInput;
    element.messageWhenRangeOverflow = messageWhenRangeOverflow;
    element.messageWhenRangeUnderflow = messageWhenRangeUnderflow;
    element.messageWhenValueMissing = messageWhenValueMissing;
    element.min = min;
    element.multiLevelGroups = multiLevelGroups;
    element.name = name;
    element.noResultsMessage = noResultsMessage;
    element.options = options;
    element.placeholder = placeholder;
    element.readOnly = readOnly;
    element.removeSelectedOptions = removeSelectedOptions;
    element.required = required;
    element.requiredAlternativeText = requiredAlternativeText;
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
