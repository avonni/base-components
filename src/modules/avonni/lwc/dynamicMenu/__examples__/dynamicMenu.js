import Component from '../../storybookWrappers/dynamicMenu/dynamicMenu';

customElements.define(
    'ac-avonni-dynamic-menu',
    Component.CustomElementConstructor
);

export const DynamicMenu = ({
    iconName,
    value,
    alternativeText,
    loadingStateAlternativeText,
    label,
    withSearch,
    accessKey,
    title,
    searchInputPlaceholder,
    tooltip,
    items,
    isLoading,
    variant,
    menuAlignment,
    disabled
}) => {
    const element = document.createElement('ac-avonni-dynamic-menu');
    element.iconName = iconName;
    element.value = value;
    element.alternativeText = alternativeText;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.label = label;
    element.withSearch = withSearch;
    element.accessKey = accessKey;
    element.title = title;
    element.searchInputPlaceholder = searchInputPlaceholder;
    element.tooltip = tooltip;
    element.items = items;
    element.isLoading = isLoading;
    element.variant = variant;
    element.menuAlignment = menuAlignment;
    element.disabled = disabled;
    return element;
};
