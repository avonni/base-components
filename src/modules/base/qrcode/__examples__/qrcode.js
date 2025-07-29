import { generateColors } from 'c/colorUtils';
import Component from 'avonni/qrcode';

customElements.define('ac-base-qrcode', Component.CustomElementConstructor);

export const Qrcode = ({
    alternativeText,
    background,
    borderColor,
    borderWidth,
    color,
    encoding,
    errorCorrection,
    padding,
    renderAs,
    size,
    value
}) => {
    const element = document.createElement('ac-base-qrcode');
    element.alternativeText = alternativeText;
    element.background = generateColors(background).hex;
    element.borderColor = generateColors(borderColor).hex;
    element.borderWidth = borderWidth;
    element.color = generateColors(color).hex;
    element.encoding = encoding;
    element.errorCorrection = errorCorrection;
    element.padding = padding;
    element.renderAs = renderAs;
    element.size = size;
    element.value = value;
    return element;
};
