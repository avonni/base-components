import Component from '../../storybookWrappers/image/image';

customElements.define('ac-base-image', Component.CustomElementConstructor);

export const Image = ({
    alternativeText,
    cropFit,
    cropPositionX,
    cropPositionY,
    cropSize,
    fluid,
    fluidGrow,
    height,
    lazyLoading,
    position,
    sizes,
    src,
    srcset,
    staticImages,
    thumbnail,
    width,
    magnifierType,
    magnifierAttributes,
    compareAlternativeText,
    compareSrc,
    compareAttributes
}) => {
    const element = document.createElement('ac-base-image');
    element.alternativeText = alternativeText;
    element.cropFit = cropFit;
    element.cropPositionX = cropPositionX;
    element.cropPositionY = cropPositionY;
    element.cropSize = cropSize;
    element.fluid = fluid;
    element.fluidGrow = fluidGrow;
    element.height = height;
    element.lazyLoading = lazyLoading;
    element.position = position;
    element.sizes = sizes;
    element.src = src;
    element.srcset = srcset;
    element.staticImages = staticImages;
    element.thumbnail = thumbnail;
    element.width = width;
    element.magnifierType = magnifierType;
    element.magnifierAttributes = magnifierAttributes;
    element.compareAlternativeText = compareAlternativeText;
    element.compareSrc = compareSrc;
    element.compareAttributes = compareAttributes;
    return element;
};
