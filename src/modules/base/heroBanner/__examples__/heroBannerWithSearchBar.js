import Component from '../../storybookWrappers/heroBanner/heroBannerWithSearchBar';

customElements.define(
    'ac-hero-banner-with-search-bar',
    Component.CustomElementConstructor
);

export const HeroBannerWithSearchBar = ({
    title,
    titleFontColor,
    titleFontFamily,
    titleFontSize,
    titleFontWeight,
    subtitle,
    subtitleFontColor,
    subtitleFontFamily,
    subtitleFontSize,
    subtitleFontWeight,
    src,
    linearGradient,
    height,
    textHorizontalAlignment,
    textVerticalAlignment
}) => {
    const element = document.createElement('ac-hero-banner-with-search-bar');
    element.title = title;
    element.titleFontColor = titleFontColor;
    element.titleFontFamily = titleFontFamily;
    element.titleFontSize = titleFontSize;
    element.titleFontWeight = titleFontWeight;
    element.subtitle = subtitle;
    element.subtitleFontFamily = subtitleFontFamily;
    element.subtitleFontColor = subtitleFontColor;
    element.subtitleFontSize = subtitleFontSize;
    element.subtitleFontWeight = subtitleFontWeight;
    element.src = src;
    element.linearGradient = linearGradient;
    element.height = height;
    element.textHorizontalAlignment = textHorizontalAlignment;
    element.textVerticalAlignment = textVerticalAlignment;
    return element;
};
