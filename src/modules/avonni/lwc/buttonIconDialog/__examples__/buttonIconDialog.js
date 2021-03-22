import Component from '../../storybookWrappers/buttonIconDialog/buttonIconDialog';

customElements.define(
    'ac-avonni-button-icon-dialog',
    Component.CustomElementConstructor
);

export const ButtonIconDialog = ({
    accessKey,
    alternativeText,
    tooltip,
    iconClass,
    iconName,
    disabled,
    size,
    variant
}) => {
    const element = document.createElement('ac-avonni-button-icon-dialog');
    element.accessKey = accessKey;
    element.alternativeText = alternativeText;
    element.tooltip = tooltip;
    element.iconClass = iconClass;
    element.iconName = iconName;
    element.disabled = disabled;
    element.size = size;
    element.variant = variant;
    return element;
};
