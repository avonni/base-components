import { generateColors } from '../../utilsPrivate/colorUtils'
import Component from 'c/qrcode';

customElements.define('ac-avonni-qrcode', Component.CustomElementConstructor);

export const Qrcode = ({
    value,
    color,
    background,
    borderColor,
    borderWidth,
    padding,
    encoding,
    errorCorrection,
    renderAs,
    size
}) => {
    const element = document.createElement('ac-avonni-qrcode');
    element.value = value;
    element.color = generateColors(color).hex;
    element.background = generateColors(background).hex;
    element.borderColor = generateColors(borderColor).hex;
    element.borderWidth = borderWidth;
    element.padding = padding;
    element.encoding = encoding;
    element.errorCorrection = errorCorrection;
    element.renderAs = renderAs;
    element.size = size;
    return element;
};