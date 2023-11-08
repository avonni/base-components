import Component from '../../storybookWrappers/heroBanner/heroBannerWithSearchBarInFooter';

customElements.define(
    'ac-hero-banner-with-search-bar-in-footer',
    Component.CustomElementConstructor
);

export const HeroBannerWithSearchBarInFooter = ({
    caption,
    contentHorizontalAlignment,
    contentVerticalAlignment,
    contentWidth,
    height,
    imageLayout,
    imagePosition,
    maxWidth,
    primaryButtonIconName,
    primaryButtonIconPosition,
    primaryButtonIconSize,
    primaryButtonLabel,
    primaryButtonVariant,
    secondaryButtonIconName,
    secondaryButtonIconPosition,
    secondaryButtonIconSize,
    secondaryButtonLabel,
    secondaryButtonVariant,
    src,
    subtitle,
    title
}) => {
    const element = document.createElement(
        'ac-hero-banner-with-search-bar-in-footer'
    );
    element.caption = caption;
    element.contentHorizontalAlignment = contentHorizontalAlignment;
    element.contentVerticalAlignment = contentVerticalAlignment;
    element.contentWidth = contentWidth;
    element.height = height;
    element.imageLayout = imageLayout;
    element.imagePosition = imagePosition;
    element.maxWidth = maxWidth;
    element.primaryButtonIconName = primaryButtonIconName;
    element.primaryButtonIconPosition = primaryButtonIconPosition;
    element.primaryButtonIconSize = primaryButtonIconSize;
    element.primaryButtonLabel = primaryButtonLabel;
    element.primaryButtonVariant = primaryButtonVariant;
    element.secondaryButtonIconName = secondaryButtonIconName;
    element.secondaryButtonIconPosition = secondaryButtonIconPosition;
    element.secondaryButtonIconSize = secondaryButtonIconSize;
    element.secondaryButtonLabel = secondaryButtonLabel;
    element.secondaryButtonVariant = secondaryButtonVariant;
    element.src = src;
    element.subtitle = subtitle;
    element.title = title;
    return element;
};
