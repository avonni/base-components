import Component from 'avonni/image';

customElements.define('ac-avonni-image', Component.CustomElementConstructor);

export const Image = ({
    src,
    srcset,
    sizes,
    alt,
    width,
    height,
    block,
    fluid,
    fluidGrow,
    rounded,
    thumbnail,
    left,
    right,
    center,
    blank,
    blankColor
}) => {
    const element = document.createElement('ac-avonni-image');
    element.src = src;
    element.srcset = srcset;
    element.sizes = sizes;
    element.alt = alt;
    element.width = width;
    element.height = height;
    element.block = block;
    element.fluid = fluid;
    element.fluidGrow = fluidGrow;
    element.rounded = rounded;
    element.thumbnail = thumbnail;
    element.left = left;
    element.right = right;
    element.center = center;
    element.blank = blank;
    element.blankColor = blankColor;
    return element;
};