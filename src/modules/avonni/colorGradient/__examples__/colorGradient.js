import '@lwc/synthetic-shadow';
import buildAndRegisterCustomElement from '../../../../../.storybook/utils/build-custom-element';
import Component from 'avonni/colorGradient';

buildAndRegisterCustomElement('avonni-color-gradient', Component);

export const ColorGradient = ({ 
    disabled,
    value,
    readOnly,
    opacity,
    messageWhenBadInput
}) => {
    const element = document.createElement('avonni-color-gradient');
    element.disabled = disabled;
    element.value = value;
    element.readOnly = readOnly;
    element.opacity = opacity;
    element.messageWhenBadInput = messageWhenBadInput;
    return element;
};