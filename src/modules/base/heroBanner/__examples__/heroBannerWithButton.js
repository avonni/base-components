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
    subtitle,
    subtitleColor,
    subtitleFontFamily,
    subtitleFontSize,
    subtitleFontWeight,
    src,
    linearGradient,
    height,
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
    element.subtitle = subtitle;
    element.subtitleFontFamily = subtitleFontFamily;
    element.subtitleColor = subtitleColor;
    element.subtitleFontSize = subtitleFontSize;
    element.subtitleFontWeight = subtitleFontWeight;
    element.src = src;
    element.linearGradient = linearGradient;
    element.height = height;
    element.textHorizontalAlignment = textHorizontalAlignment;
    element.textVerticalAlignment = textVerticalAlignment;
    return element;
};
