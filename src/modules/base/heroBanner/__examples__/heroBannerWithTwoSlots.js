import Component from '../../storybookWrappers/heroBanner/heroBannerWithTwoSlots';

customElements.define(
    'ac-hero-banner-with-two-slots',
    Component.CustomElementConstructor
);

export const HeroBannerWithTwoSlots = ({
    title,
    titleFontColor,
    titleFontSize,
    titleFontWeight,
    description,
    descriptionFontColor,
    descriptionFontSize,
    descriptionFontWeight,
    src,
    height,
    textHorizontalAlignment,
    textVerticalAlignment
}) => {
    const element = document.createElement('ac-hero-banner-with-two-slots');
    element.title = title;
    element.titleFontColor = titleFontColor;
    element.titleFontSize = titleFontSize;
    element.titleFontWeight = titleFontWeight;
    element.description = description;
    element.descriptionFontColor = descriptionFontColor;
    element.descriptionFontSize = descriptionFontSize;
    element.descriptionFontWeight = descriptionFontWeight;
    element.src = src;
    element.height = height;
    element.textHorizontalAlignment = textHorizontalAlignment;
    element.textVerticalAlignment = textVerticalAlignment;
    return element;
};
