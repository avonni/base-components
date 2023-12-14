import Component from '../../storybookWrappers/buttonDialog/buttonDialog';

customElements.define(
    'ac-base-button-dialog',
    Component.CustomElementConstructor
);

export const ButtonDialog = ({
    accessKey,
    alternativeText,
    disabled,
    iconName,
    iconPosition,
    iconSrc,
    label,
    stretch,
    variant
}) => {
    const element = document.createElement('ac-base-button-dialog');
    element.accessKey = accessKey;
    element.alternativeText = alternativeText;
    element.disabled = disabled;
    element.iconName = iconName;
    element.iconPosition = iconPosition;
    element.iconSrc = iconSrc;
    element.label = label;
    element.stretch = stretch;
    element.variant = variant;
    return element;
};
