import Component from '../../storybookWrappers/buttonIconDialog/buttonIconDialog';

customElements.define(
    'ac-base-button-icon-dialog',
    Component.CustomElementConstructor
);

export const ButtonIconDialog = ({
    accessKey,
    alternativeText,
    disabled,
    iconClass,
    iconName,
    iconSrc,
    size,
    tooltip,
    variant
}) => {
    const element = document.createElement('ac-base-button-icon-dialog');
    element.accessKey = accessKey;
    element.alternativeText = alternativeText;
    element.disabled = disabled;
    element.iconClass = iconClass;
    element.iconName = iconName;
    element.iconSrc = iconSrc;
    element.size = size;
    element.tooltip = tooltip;
    element.variant = variant;
    return element;
};
