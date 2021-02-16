import Component from '../../storybookWrappers/buttonIconPopover/buttonIconPopover';

customElements.define(
    'ac-avonni-button-icon-popover',
    Component.CustomElementConstructor
);

export const ButtonIconPopover = ({
    accessKey,
    alternativeText,
    title,
    iconName,
    iconClass,
    loadingStateAlternativeText,
    tooltip,
    disabled,
    isLoading,
    size,
    placement,
    variant,
    popoverSize,
    triggers,
    popoverVariant
}) => {
    const element = document.createElement('ac-avonni-button-icon-popover');
    element.accessKey = accessKey;
    element.alternativeText = alternativeText;
    element.title = title;
    element.iconName = iconName;
    element.iconClass = iconClass;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.tooltip = tooltip;
    element.disabled = disabled;
    element.isLoading = isLoading;
    element.size = size;
    element.placement = placement;
    element.variant = variant;
    element.popoverSize = popoverSize;
    element.triggers = triggers;
    element.popoverVariant = popoverVariant;
    return element;
};
