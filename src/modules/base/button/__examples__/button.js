import Component from 'avonni/button';

customElements.define('ac-base-button', Component.CustomElementConstructor);

export const Button = ({
    accessKey,
    disabled,
    iconName,
    iconPosition,
    iconSize,
    iconSrc,
    label,
    name,
    stretch,
    type,
    value,
    variant
}) => {
    const element = document.createElement('ac-base-button');
    element.accessKey = accessKey;
    element.disabled = disabled;
    element.iconName = iconName;
    element.iconPosition = iconPosition;
    element.iconSize = iconSize;
    element.iconSrc = iconSrc;
    element.label = label;
    element.name = name;
    element.stretch = stretch;
    element.type = type;
    element.value = value;
    element.variant = variant;
    return element;
};
