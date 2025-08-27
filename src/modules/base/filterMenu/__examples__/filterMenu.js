import Component from 'avonni/filterMenu';

customElements.define(
    'ac-base-filter-menu',
    Component.CustomElementConstructor
);

export const FilterMenu = ({
    accessKey,
    alternativeText,
    applyButtonLabel,
    buttonVariant,
    closed,
    collapsible,
    disabled,
    dropdownAlignment,
    dropdownNubbin,
    hideApplyResetButtons,
    hideSelectedItems,
    iconName,
    iconSize,
    isLoading,
    label,
    loadingStateAlternativeText,
    name,
    resetButtonLabel,
    showSelectedFilterValueCount,
    title,
    tooltip,
    type,
    typeAttributes,
    value,
    variant
}) => {
    const element = document.createElement('ac-base-filter-menu');
    element.accessKey = accessKey;
    element.alternativeText = alternativeText;
    element.applyButtonLabel = applyButtonLabel;
    element.buttonVariant = buttonVariant;
    element.closed = closed;
    element.collapsible = collapsible;
    element.disabled = disabled;
    element.dropdownAlignment = dropdownAlignment;
    element.dropdownNubbin = dropdownNubbin;
    element.hideApplyResetButtons = hideApplyResetButtons;
    element.hideSelectedItems = hideSelectedItems;
    element.iconName = iconName;
    element.iconSize = iconSize;
    element.isLoading = isLoading;
    element.label = label;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.name = name;
    element.resetButtonLabel = resetButtonLabel;
    element.showSelectedFilterValueCount = showSelectedFilterValueCount;
    element.title = title;
    element.tooltip = tooltip;
    element.type = type;
    element.typeAttributes = typeAttributes;
    element.value = value;
    element.variant = variant;
    return element;
};
