import Component from '../../storybookWrappers/dynamicMenu/dynamicMenu';

customElements.define(
    'ac-base-dynamic-menu',
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
    disabled,
    iconSize
}) => {
    const element = document.createElement('ac-base-dynamic-menu');
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
    element.iconSize = iconSize;
    return element;
};
