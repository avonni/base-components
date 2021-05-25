import Component from '../../storybookWrappers/heroBanner/heroBannerWithButton';

customElements.define(
    'ac-hero-banner-with-button',
    Component.CustomElementConstructor
);

export const HeroBannerWithButton = ({
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
    textHorizontalAlignment,
    textVerticalAlignment
}) => {
    const element = document.createElement('ac-hero-banner-with-button');
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
    element.textHorizontalAlignment = textHorizontalAlignment;
    element.textVerticalAlignment = textVerticalAlignment;
    return element;
};
