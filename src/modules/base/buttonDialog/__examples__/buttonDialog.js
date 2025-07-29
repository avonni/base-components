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
    isButtonLoading,
    label,
    loadingStateAlternativeText,
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
    element.isButtonLoading = isButtonLoading;
    element.label = label;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.saveButtonLabel = saveButtonLabel;
    element.stretch = stretch;
    element.variant = variant;
    return element;
};
