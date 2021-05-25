import Component from '../../storybookWrappers/heroBanner/heroBanner';

customElements.define(
    'ac-base-hero-banner',
    Component.CustomElementConstructor
);

export const HeroBanner = ({
    title,
    titleColor,
    titleFontFamily,
    titleFontSize,
    titleFontWeight,
    titleShadowColor,
    caption,
    captionColor,
    captionFontFamily,
    captionFontSize,
    captionFontWeight,
    subtitle,
    subtitleColor,
    subtitleFontFamily,
    subtitleFontSize,
    subtitleFontWeight,
    src,
    linearGradient,
    height,
    maxWidth,
    contentHorizontalAlignment,
    contentVerticalAlignment
}) => {
    const element = document.createElement('ac-base-hero-banner');
    element.title = title;
    element.titleColor = titleColor;
    element.titleFontFamily = titleFontFamily;
    element.titleFontSize = titleFontSize;
    element.titleFontWeight = titleFontWeight;
    element.titleShadowColor = titleShadowColor;
    element.caption = caption;
    element.captionFontFamily = captionFontFamily;
    element.captionColor = captionColor;
    element.captionFontSize = captionFontSize;
    element.captionFontWeight = captionFontWeight;
    element.subtitle = subtitle;
    element.subtitleFontFamily = subtitleFontFamily;
    element.subtitleColor = subtitleColor;
    element.subtitleFontSize = subtitleFontSize;
    element.subtitleFontWeight = subtitleFontWeight;
    element.src = src;
    element.linearGradient = linearGradient;
    element.height = height;
    element.maxWidth = maxWidth;
    element.contentHorizontalAlignment = contentHorizontalAlignment;
    element.contentVerticalAlignment = contentVerticalAlignment;
    return element;
};
