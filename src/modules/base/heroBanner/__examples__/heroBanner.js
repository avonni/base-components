import Component from '../../storybookWrappers/heroBanner/heroBanner';

customElements.define(
    'ac-base-hero-banner',
    Component.CustomElementConstructor
);

export const HeroBanner = ({
    title,
    description,
    src,
    textHorizontalAlignment,
    textVerticalAlignment
}) => {
    const element = document.createElement('ac-base-hero-banner');
    element.title = title;
    element.description = description;
    element.src = src;
    element.textHorizontalAlignment = textHorizontalAlignment;
    element.textVerticalAlignment = textVerticalAlignment;
    return element;
};
