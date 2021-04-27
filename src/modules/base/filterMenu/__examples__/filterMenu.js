import Component from 'avonni/filterMenu';

customElements.define(
    'ac-base-filter-menu',
    Component.CustomElementConstructor
);

export const FilterMenu = ({
    accessKey,
    alternativeText,
    disabled,
    iconName,
    iconSize,
    isLoading,
    label,
    loadingStateAlternativeText,
    items,
    title,
    tooltip,
    value,
    variant,
    searchInputPlaceholder,
    hideSearchBox,
    submitButtonLabel,
    resetButtonLabel,
    menuAlignment,
    menuWidth,
    menuLength,
    nubbin
}) => {
    const element = document.createElement('ac-base-filter-menu');
    element.accessKey = accessKey;
    element.alternativeText = alternativeText;
    element.disabled = disabled;
    element.iconName = iconName;
    element.iconSize = iconSize;
    element.isLoading = isLoading;
    element.label = label;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.items = items;
    element.title = title;
    element.tooltip = tooltip;
    element.value = value;
    element.variant = variant;
    element.searchInputPlaceholder = searchInputPlaceholder;
    element.hideSearchBox = hideSearchBox;
    element.submitButtonLabel = submitButtonLabel;
    element.resetButtonLabel = resetButtonLabel;
    element.menuAlignment = menuAlignment;
    element.menuWidth = menuWidth;
    element.menuLength = menuLength;
    element.nubbin = nubbin;
    return element;
};
