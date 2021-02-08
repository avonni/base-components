import '@lwc/synthetic-shadow';
import Component from 'avonni/colorGradient';

customElements.define('ac-avonni-color-gradient', Component.CustomElementConstructor);

export const ColorGradient = ({ 
    disabled,
    value,
    readOnly,
    opacity,
    messageWhenBadInput
}) => {
    const element = document.createElement('ac-avonni-color-gradient');
    element.disabled = disabled;
    element.value = value;
    element.readOnly = readOnly;
    element.opacity = opacity;
    element.messageWhenBadInput = messageWhenBadInput;
    return element;
};