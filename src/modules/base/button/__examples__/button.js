import Component from 'avonni/button';

customElements.define('ac-base-button', Component.CustomElementConstructor);

export const Button = ({
    accessKey,
    disableAnimation,
    disabled,
    iconName,
    iconPosition,
    iconSize,
    iconSrc,
    isButtonLoading,
    label,
    loadingStateAlternativeText,
    name,
    stretch,
    type,
    value,
    variant
}) => {
    const element = document.createElement('ac-base-button');
    element.accessKey = accessKey;
    element.disableAnimation = disableAnimation;
    element.disabled = disabled;
    element.iconName = iconName;
    element.iconPosition = iconPosition;
    element.iconSize = iconSize;
    element.iconSrc = iconSrc;
    element.isButtonLoading = isButtonLoading;
    element.label = label;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.name = name;
    element.stretch = stretch;
    element.type = type;
    element.value = value;
    element.variant = variant;
    return element;
};
