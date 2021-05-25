import Component from '../../storybookWrappers/heroBanner/heroBannerWithTwoSlots';

customElements.define(
    'ac-hero-banner-with-two-slots',
    Component.CustomElementConstructor
);

export const HeroBannerWithTwoSlots = ({
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
    captionShadowColor,
    subtitle,
    subtitleColor,
    subtitleFontFamily,
    subtitleFontSize,
    subtitleFontWeight,
    subtitleShadowColor,
    src,
    linearGradient,
    height,
    maxWidth,
    contentHorizontalAlignment,
    contentVerticalAlignment
}) => {
    const element = document.createElement('ac-hero-banner-with-two-slots');
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
    element.captionShadowColor = captionShadowColor;
    element.subtitle = subtitle;
    element.subtitleFontFamily = subtitleFontFamily;
    element.subtitleColor = subtitleColor;
    element.subtitleFontSize = subtitleFontSize;
    element.subtitleFontWeight = subtitleFontWeight;
    element.subtitleShadowColor = subtitleShadowColor;
    element.src = src;
    element.linearGradient = linearGradient;
    element.height = height;
    element.maxWidth = maxWidth;
    element.contentHorizontalAlignment = contentHorizontalAlignment;
    element.contentVerticalAlignment = contentVerticalAlignment;
    return element;
};
