import Component from '../../storybookWrappers/buttonDialog/buttonDialog';

customElements.define(
    'ac-base-button-dialog',
    Component.CustomElementConstructor
);

export const ButtonDialog = ({
    accessKey,
    alternativeText,
    label,
    iconName,
    disabled,
    variant,
    iconPosition
}) => {
    const element = document.createElement('ac-base-button-dialog');
    element.accessKey = accessKey;
    element.alternativeText = alternativeText;
    element.label = label;
    element.iconName = iconName;
    element.disabled = disabled;
    element.variant = variant;
    element.iconPosition = iconPosition;
    return element;
};
