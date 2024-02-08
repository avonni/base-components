import Component from '../../storybookWrappers/buttonPopover/buttonPopoverWithToggle';

customElements.define(
    'ac-base-button-popover-with-toggle',
    Component.CustomElementConstructor
);

export const ButtonPopoverWithToggle = ({
    accessKey,
    disabled,
    hideCloseButton,
    iconName,
    iconPosition,
    iconSize,
    iconSrc,
    isLoading,
    label,
    loadingStateAlternativeText,
    placement,
    popoverSize,
    popoverVariant,
    title,
    triggers,
    variant
}) => {
    const element = document.createElement(
        'ac-base-button-popover-with-toggle'
    );
    element.accessKey = accessKey;
    element.disabled = disabled;
    element.hideCloseButton = hideCloseButton;
    element.isLoading = isLoading;
    element.iconName = iconName;
    element.iconPosition = iconPosition;
    element.iconSize = iconSize;
    element.iconSrc = iconSrc;
    element.label = label;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.placement = placement;
    element.popoverSize = popoverSize;
    element.popoverVariant = popoverVariant;
    element.title = title;
    element.triggers = triggers;
    element.variant = variant;
    return element;
};
