import Component from '../../storybookWrappers/image/image';

customElements.define('ac-base-image', Component.CustomElementConstructor);

export const Image = ({
    alternativeText,
    compareAlternativeText,
    compareAttributes,
    compareSrc,
    cropFit,
    cropPositionX,
    cropPositionY,
    cropSize,
    fluid,
    fluidGrow,
    height,
    lazyLoading,
    leftCompareIconAlternativeText,
    magnifierAttributes,
    magnifierType,
    position,
    rightCompareIconAlternativeText,
    sizes,
    src,
    srcset,
    staticImages,
    thumbnail,
    width
}) => {
    const element = document.createElement('ac-base-image');
    element.alternativeText = alternativeText;
    element.compareAlternativeText = compareAlternativeText;
    element.compareAttributes = compareAttributes;
    element.compareSrc = compareSrc;
    element.cropFit = cropFit;
    element.cropPositionX = cropPositionX;
    element.cropPositionY = cropPositionY;
    element.cropSize = cropSize;
    element.fluid = fluid;
    element.fluidGrow = fluidGrow;
    element.height = height;
    element.lazyLoading = lazyLoading;
    element.leftCompareIconAlternativeText = leftCompareIconAlternativeText;
    element.magnifierAttributes = magnifierAttributes;
    element.magnifierType = magnifierType;
    element.position = position;
    element.rightCompareIconAlternativeText = rightCompareIconAlternativeText;
    element.sizes = sizes;
    element.src = src;
    element.srcset = srcset;
    element.staticImages = staticImages;
    element.thumbnail = thumbnail;
    element.width = width;
    return element;
};
