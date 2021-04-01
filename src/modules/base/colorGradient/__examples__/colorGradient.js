import Component from 'base/colorGradient';

customElements.define(
    'ac-base-color-gradient',
    Component.CustomElementConstructor
);

export const ColorGradient = ({
    disabled,
    value,
    readOnly,
    opacity,
    messageWhenBadInput
}) => {
    const element = document.createElement('ac-base-color-gradient');
    element.disabled = disabled;
    element.value = value;
    element.readOnly = readOnly;
    element.opacity = opacity;
    element.messageWhenBadInput = messageWhenBadInput;
    return element;
};
