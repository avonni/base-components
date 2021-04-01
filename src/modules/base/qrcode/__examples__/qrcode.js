import { generateColors } from '../../utilsPrivate/colorUtils';
import Component from 'base/qrcode';

customElements.define('ac-base-qrcode', Component.CustomElementConstructor);

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
    const element = document.createElement('ac-base-qrcode');
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
