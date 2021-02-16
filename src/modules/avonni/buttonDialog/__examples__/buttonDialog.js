import Component from '../../storybookWrappers/buttonDialog/buttonDialog';

customElements.define(
    'ac-avonni-button-dialog',
    Component.CustomElementConstructor
);

export const ButtonDialog = ({
    accessKey,
    label,
    iconName,
    disabled,
    variant,
    iconPosition
}) => {
    const element = document.createElement('ac-avonni-button-dialog');
    element.accessKey = accessKey;
    element.label = label;
    element.iconName = iconName;
    element.disabled = disabled;
    element.variant = variant;
    element.iconPosition = iconPosition;
    return element;
};
