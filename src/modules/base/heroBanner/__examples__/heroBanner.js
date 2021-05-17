import Component from '../../storybookWrappers/heroBanner/heroBanner';

customElements.define(
    'ac-base-hero-banner',
    Component.CustomElementConstructor
);

export const HeroBanner = ({
    title,
    titleFontColor,
    titleFontSize,
    description,
    descriptionFontColor,
    descriptionFontSize,
    src,
    height,
    textHorizontalAlignment,
    textVerticalAlignment
}) => {
    const element = document.createElement('ac-base-hero-banner');
    element.title = title;
    element.titleFontColor = titleFontColor;
    element.titleFontSize = titleFontSize;
    element.description = description;
    element.descriptionFontColor = descriptionFontColor;
    element.descriptionFontSize = descriptionFontSize;
    element.src = src;
    element.height = height;
    element.textHorizontalAlignment = textHorizontalAlignment;
    element.textVerticalAlignment = textVerticalAlignment;
    return element;
};
