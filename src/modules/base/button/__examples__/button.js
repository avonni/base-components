import Component from 'avonni/button';

customElements.define('ac-base-button', Component.CustomElementConstructor);

export const Button = ({
    accessKey,
    disabled,
    iconName,
    iconPosition,
    iconSize,
    label,
    name,
    src,
    stretch,
    type,
    variant
}) => {
    const element = document.createElement('ac-base-button');
    element.accessKey = accessKey;
    element.disabled = disabled;
    element.iconName = iconName;
    element.iconPosition = iconPosition;
    element.iconSize = iconSize;
    element.label = label;
    element.name = name;
    element.src = src;
    element.stretch = stretch;
    element.type = type;
    element.variant = variant;
    return element;
};
