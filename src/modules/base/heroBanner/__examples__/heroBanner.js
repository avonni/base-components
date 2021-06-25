import Component from '../../storybookWrappers/heroBanner/heroBanner';

customElements.define(
    'ac-base-hero-banner',
    Component.CustomElementConstructor
);

export const HeroBanner = ({
    title,
    caption,
    subtitle,
    src,
    height,
    maxWidth,
    contentHorizontalAlignment,
    contentVerticalAlignment,
    contentWidth,
    primaryButtonLabel,
    secondaryButtonLabel
}) => {
    const element = document.createElement('ac-base-hero-banner');
    element.title = title;
    element.caption = caption;
    element.subtitle = subtitle;
    element.src = src;
    element.height = height;
    element.maxWidth = maxWidth;
    element.contentHorizontalAlignment = contentHorizontalAlignment;
    element.contentVerticalAlignment = contentVerticalAlignment;
    element.contentWidth = contentWidth;
    element.primaryButtonLabel = primaryButtonLabel;
    element.secondaryButtonLabel = secondaryButtonLabel;
    return element;
};
