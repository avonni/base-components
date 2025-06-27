import Component from '../../storybookWrappers/heroBanner/heroBanner';

customElements.define(
    'ac-base-hero-banner',
    Component.CustomElementConstructor
);

export const HeroBanner = ({
    caption,
    contentHorizontalAlignment,
    contentVerticalAlignment,
    contentWidth,
    height,
    imageLayout,
    imagePosition,
    maxWidth,
    primaryButtonAlternativeText,
    primaryButtonIconName,
    primaryButtonIconPosition,
    primaryButtonIconSize,
    primaryButtonLabel,
    primaryButtonVariant,
    secondaryButtonAlternativeText,
    secondaryButtonIconName,
    secondaryButtonIconPosition,
    secondaryButtonIconSize,
    secondaryButtonLabel,
    secondaryButtonVariant,
    src,
    subtitle,
    title
}) => {
    const element = document.createElement('ac-base-hero-banner');
    element.caption = caption;
    element.contentHorizontalAlignment = contentHorizontalAlignment;
    element.contentVerticalAlignment = contentVerticalAlignment;
    element.contentWidth = contentWidth;
    element.height = height;
    element.imageLayout = imageLayout;
    element.imagePosition = imagePosition;
    element.maxWidth = maxWidth;
    element.primaryButtonAlternativeText = primaryButtonAlternativeText;
    element.primaryButtonIconName = primaryButtonIconName;
    element.primaryButtonIconPosition = primaryButtonIconPosition;
    element.primaryButtonIconSize = primaryButtonIconSize;
    element.primaryButtonLabel = primaryButtonLabel;
    element.primaryButtonVariant = primaryButtonVariant;
    element.secondaryButtonAlternativeText = secondaryButtonAlternativeText;
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
