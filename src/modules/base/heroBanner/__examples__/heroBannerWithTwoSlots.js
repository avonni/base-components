import Component from '../../storybookWrappers/heroBanner/heroBannerWithTwoSlots';

customElements.define(
    'ac-hero-banner-with-two-slots',
    Component.CustomElementConstructor
);

export const HeroBannerWithTwoSlots = ({
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
    const element = document.createElement('ac-hero-banner-with-two-slots');
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
