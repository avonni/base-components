import Component from '../../storybookWrappers/buttonPopover/buttonPopover';

customElements.define(
    'ac-avonni-button-popover',
    Component.CustomElementConstructor
);

export const ButtonPopover = ({
    accessKey,
    label,
    title,
    iconName,
    loadingStateAlternativeText,
    iconPosition,
    popoverSize,
    placement,
    variant,
    triggers,
    popoverVariant,
    disabled,
    isLoading
}) => {
    const element = document.createElement('ac-avonni-button-popover');
    element.accessKey = accessKey;
    element.label = label;
    element.title = title;
    element.iconName = iconName;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.iconPosition = iconPosition;
    element.popoverSize = popoverSize;
    element.placement = placement;
    element.variant = variant;
    element.triggers = triggers;
    element.popoverVariant = popoverVariant;
    element.disabled = disabled;
    element.isLoading = isLoading;
    return element;
};
