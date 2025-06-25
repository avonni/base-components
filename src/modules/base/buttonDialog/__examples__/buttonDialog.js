import Component from '../../storybookWrappers/buttonDialog/buttonDialog';

customElements.define(
    'ac-base-button-dialog',
    Component.CustomElementConstructor
);

export const ButtonDialog = ({
    accessKey,
    alternativeText,
    cancelButtonLabel,
    disabled,
    iconName,
    iconPosition,
    iconSize,
    iconSrc,
    label,
    saveButtonLabel,
    stretch,
    variant
}) => {
    const element = document.createElement('ac-base-button-dialog');
    element.accessKey = accessKey;
    element.alternativeText = alternativeText;
    element.cancelButtonLabel = cancelButtonLabel;
    element.disabled = disabled;
    element.iconName = iconName;
    element.iconPosition = iconPosition;
    element.iconSize = iconSize;
    element.iconSrc = iconSrc;
    element.label = label;
    element.saveButtonLabel = saveButtonLabel;
    element.stretch = stretch;
    element.variant = variant;
    return element;
};
