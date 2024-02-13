import Component from '../../storybookWrappers/buttonIconPopover/buttonIconPopover';

customElements.define(
    'ac-base-button-icon-popover',
    Component.CustomElementConstructor
);

export const ButtonIconPopover = ({
    accessKey,
    alternativeText,
    disabled,
    hideCloseButton,
    iconName,
    iconClass,
    iconSrc,
    isLoading,
    loadingStateAlternativeText,
    placement,
    popoverSize,
    popoverVariant,
    size,
    title,
    tooltip,
    triggers,
    variant
}) => {
    const element = document.createElement('ac-base-button-icon-popover');
    element.accessKey = accessKey;
    element.alternativeText = alternativeText;
    element.disabled = disabled;
    element.hideCloseButton = hideCloseButton;
    element.iconName = iconName;
    element.iconClass = iconClass;
    element.iconSrc = iconSrc;
    element.isLoading = isLoading;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.placement = placement;
    element.popoverSize = popoverSize;
    element.popoverVariant = popoverVariant;
    element.size = size;
    element.title = title;
    element.tooltip = tooltip;
    element.triggers = triggers;
    element.variant = variant;
    return element;
};
