import Component from '../../storybookWrappers/image/imageList';

customElements.define('ac-image-list', Component.CustomElementConstructor);

export const ImageList = ({
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
    imageErrorLabel,
    lazyLoading,
    leftCompareIconAlternativeText,
    magnifierAttributes,
    magnifierType,
    noImageLabel,
    position,
    sizes,
    src,
    srcset,
    staticImages,
    thumbnail,
    width
}) => {
    const element = document.createElement('ac-image-list');
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
    element.imageErrorLabel = imageErrorLabel;
    element.lazyLoading = lazyLoading;
    element.magnifierAttributes = magnifierAttributes;
    element.magnifierType = magnifierType;
    element.leftCompareIconAlternativeText = leftCompareIconAlternativeText;
    element.noImageLabel = noImageLabel;
    element.position = position;
    element.sizes = sizes;
    element.src = src;
    element.srcset = srcset;
    element.staticImages = staticImages;
    element.thumbnail = thumbnail;
    element.width = width;
    return element;
};
