import Component from '../../storybookWrappers/image/imageList';

customElements.define('ac-image-list', Component.CustomElementConstructor);

export const ImageList = ({
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
    blankColor,
    cropSize,
    cropFit,
    cropPositionX,
    cropPositionY,
    staticImages,
    lazyLoading,
}) => {
    const element = document.createElement('ac-image-list');
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
    element.cropSize = cropSize;
    element.cropFit = cropFit;
    element.cropPositionX = cropPositionX;
    element.cropPositionY = cropPositionY;
    element.staticImages = staticImages;
    element.lazyLoading = lazyLoading;
    
    return element;
};
