

import Component from '../barcode';

customElements.define('ac-base-barcode', Component.CustomElementConstructor);

export const Barcode = ({
    background,
    checksum,
    color,
    height,
    hideValue,
    textColor,
    textAlignment,
    type,
    value,
    width
}) => {
    const element = document.createElement('ac-base-barcode');
    element.background = background;
    element.checksum = checksum;
    element.color = color;
    element.height = height;
    element.hideValue = hideValue;
    element.textAlignment = textAlignment;
    element.textColor = textColor;
    element.type = type;
    element.value = value;
    element.width = width;
    return element;
};
