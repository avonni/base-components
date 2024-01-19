import Component from '../../storybookWrappers/buttonPopover/buttonPopoverWithToggle';

customElements.define(
    'ac-base-button-popover-with-toggle',
    Component.CustomElementConstructor
);

export const ButtonPopoverWithToggle = ({
    accessKey,
    label,
    title,
    loadingStateAlternativeText,
    hideCloseButton,
    iconName,
    iconPosition,
    popoverSize,
    placement,
    variant,
    triggers,
    popoverVariant,
    disabled,
    isLoading
}) => {
    const element = document.createElement(
        'ac-base-button-popover-with-toggle'
    );
    element.accessKey = accessKey;
    element.label = label;
    element.title = title;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.hideCloseButton = hideCloseButton;
    element.iconName = iconName;
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
