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
    buttonVariant,
    searchInputPlaceholder,
    showSearchBox,
    applyButtonLabel,
    resetButtonLabel,
    hideApplyResetButtons,
    menuAlignment,
    menuWidth,
    menuLength,
    nubbin,
    hideSelectedItems
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
    element.buttonVariant = buttonVariant;
    element.searchInputPlaceholder = searchInputPlaceholder;
    element.showSearchBox = showSearchBox;
    element.applyButtonLabel = applyButtonLabel;
    element.resetButtonLabel = resetButtonLabel;
    element.hideApplyResetButtons = hideApplyResetButtons;
    element.menuAlignment = menuAlignment;
    element.menuWidth = menuWidth;
    element.menuLength = menuLength;
    element.nubbin = nubbin;
    element.hideSelectedItems = hideSelectedItems;
    return element;
};
