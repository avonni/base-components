import Component from '../../storybookWrappers/buttonMenu/footer';

customElements.define(
    'ac-button-menu-footer',
    Component.CustomElementConstructor
);

export const ButtonMenuFooter = ({
    accessKey,
    alternativeText,
    allowSearch,
    disabled,
    draftAlternatveText,
    enableInfiniteLoading,
    hideDownArrow,
    iconName,
    iconSize,
    iconSrc,
    isButtonLoading,
    isDraft,
    isLoading,
    label,
    loadingStateAlternativeText,
    menuAlignment,
    menuLength,
    nubbin,
    prefixIconName,
    searchInputPlaceholder,
    title,
    tooltip,
    triggers,
    value,
    variant
}) => {
    const element = document.createElement('ac-button-menu-footer');
    element.accessKey = accessKey;
    element.alternativeText = alternativeText;
    element.allowSearch = allowSearch;
    element.disabled = disabled;
    element.draftAlternatveText = draftAlternatveText;
    element.enableInfiniteLoading = enableInfiniteLoading;
    element.hideDownArrow = hideDownArrow;
    element.iconName = iconName;
    element.iconSize = iconSize;
    element.iconSrc = iconSrc;
    element.isButtonLoading = isButtonLoading;
    element.isDraft = isDraft;
    element.isLoading = isLoading;
    element.label = label;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.menuAlignment = menuAlignment;
    element.menuLength = menuLength;
    element.nubbin = nubbin;
    element.prefixIconName = prefixIconName;
    element.searchInputPlaceholder = searchInputPlaceholder;
    element.title = title;
    element.tooltip = tooltip;
    element.triggers = triggers;
    element.value = value;
    element.variant = variant;
    return element;
};
