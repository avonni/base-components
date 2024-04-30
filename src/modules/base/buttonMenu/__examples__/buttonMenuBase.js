import Component from '../../storybookWrappers/buttonMenu/base';

customElements.define(
    'ac-button-menu-base',
    Component.CustomElementConstructor
);

export const ButtonMenuBase = ({
    accessKey,
    alternativeText,
    disabled,
    draftAlternatveText,
    hideDownArrow,
    iconName,
    iconSize,
    iconSrc,
    isDraft,
    isLoading,
    label,
    loadingStateAlternativeText,
    menuAlignment,
    nubbin,
    title,
    tooltip,
    triggers,
    value,
    variant
}) => {
    const element = document.createElement('ac-button-menu-base');
    element.accessKey = accessKey;
    element.alternativeText = alternativeText;
    element.disabled = disabled;
    element.draftAlternatveText = draftAlternatveText;
    element.hideDownArrow = hideDownArrow;
    element.iconName = iconName;
    element.iconSize = iconSize;
    element.iconSrc = iconSrc;
    element.isDraft = isDraft;
    element.isLoading = isLoading;
    element.label = label;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.menuAlignment = menuAlignment;
    element.nubbin = nubbin;
    element.title = title;
    element.tooltip = tooltip;
    element.triggers = triggers;
    element.value = value;
    element.variant = variant;
    return element;
};
