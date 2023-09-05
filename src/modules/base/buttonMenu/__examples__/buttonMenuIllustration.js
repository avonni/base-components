import Component from '../../storybookWrappers/buttonMenu/illustration';

customElements.define(
    'ac-button-menu-illustration',
    Component.CustomElementConstructor
);

export const ButtonMenuIllustration = ({
    accessKey,
    alternativeText,
    disabled,
    draftAlternatveText,
    hideDownArrow,
    iconName,
    iconSize,
    isDraft,
    isLoading,
    label,
    loadingStateAlternativeText,
    menuAlignment,
    nubbin,
    title,
    tooltip,
    value,
    variant
}) => {
    const element = document.createElement('ac-button-menu-illustration');
    element.accessKey = accessKey;
    element.alternativeText = alternativeText;
    element.disabled = disabled;
    element.draftAlternatveText = draftAlternatveText;
    element.hideDownArrow = hideDownArrow;
    element.iconName = iconName;
    element.iconSize = iconSize;
    element.isDraft = isDraft;
    element.isLoading = isLoading;
    element.label = label;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.menuAlignment = menuAlignment;
    element.nubbin = nubbin;
    element.title = title;
    element.tooltip = tooltip;
    element.value = value;
    element.variant = variant;
    return element;
};
