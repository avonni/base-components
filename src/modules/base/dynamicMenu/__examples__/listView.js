import Component from '../../storybookWrappers/dynamicMenu/listView';

customElements.define(
    'ac-base-dynamic-menu-list-view',
    Component.CustomElementConstructor
);

export const ListView = ({
    accessKey,
    allowSearch,
    alternativeText,
    buttonSize,
    disabled,
    hideCheckMark,
    iconName,
    iconPosition,
    iconSize,
    isLoading,
    items,
    label,
    loadingStateAlternativeText,
    menuAlignment,
    menuLength,
    menuWidth,
    nubbin,
    searchInputPlaceholder,
    title,
    tooltip,
    value,
    variant
}) => {
    const element = document.createElement('ac-base-dynamic-menu-list-view');
    element.accessKey = accessKey;
    element.allowSearch = allowSearch;
    element.alternativeText = alternativeText;
    element.buttonSize = buttonSize;
    element.disabled = disabled;
    element.hideCheckMark = hideCheckMark;
    element.iconName = iconName;
    element.iconPosition = iconPosition;
    element.iconSize = iconSize;
    element.isLoading = isLoading;
    element.items = items;
    element.label = label;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.menuAlignment = menuAlignment;
    element.menuLength = menuLength;
    element.menuWidth = menuWidth;
    element.nubbin = nubbin;
    element.searchInputPlaceholder = searchInputPlaceholder;
    element.title = title;
    element.tooltip = tooltip;
    element.value = value;
    element.variant = variant;
    return element;
};
