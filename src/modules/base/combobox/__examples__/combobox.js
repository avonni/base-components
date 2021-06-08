import Component from 'avonni/combobox';

customElements.define('ac-base-combobox', Component.CustomElementConstructor);

export const Combobox = ({
    actions,
    allowSearch,
    disabled,
    dropdownAlignment,
    dropdownLength,
    fieldLevelHelp,
    groups,
    hideSelectedOptions,
    isLoading,
    isMultiSelect,
    label,
    loadingStateAlternativeText,
    messageWhenValueMissing,
    multiLevelGroups,
    name,
    options,
    placeholder,
    readOnly,
    removeSelectedOptions,
    required,
    scopes,
    scopesTitle,
    search,
    value,
    variant
}) => {
    const element = document.createElement('ac-base-combobox');
    element.actions = actions;
    element.allowSearch = allowSearch;
    element.disabled = disabled;
    element.dropdownAlignment = dropdownAlignment;
    element.dropdownLength = dropdownLength;
    element.fieldLevelHelp = fieldLevelHelp;
    element.groups = groups;
    element.hideSelectedOptions = hideSelectedOptions;
    element.isLoading = isLoading;
    element.isMultiSelect = isMultiSelect;
    element.label = label;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.messageWhenValueMissing = messageWhenValueMissing;
    element.multiLevelGroups = multiLevelGroups;
    element.name = name;
    element.options = options;
    element.placeholder = placeholder;
    element.readOnly = readOnly;
    element.removeSelectedOptions = removeSelectedOptions;
    element.required = required;
    element.scopes = scopes;
    element.scopesTitle = scopesTitle;
    element.search = search;
    element.value = value;
    element.variant = variant;
    return element;
};
