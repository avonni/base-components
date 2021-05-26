import Component from '../../storybookWrappers/heroBanner/heroBannerWithSearchBarInFooter';

customElements.define(
    'ac-hero-banner-with-search-bar-in-footer',
    Component.CustomElementConstructor
);

export const HeroBannerWithSearchBarInFooter = ({
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
    backgroundColor,
    linearGradient,
    height,
    maxWidth,
    contentHorizontalAlignment,
    contentVerticalAlignment,
    contentWidth,
    primaryButtonLabel,
    primaryButtonTextColor,
    primaryButtonTextHoverColor,
    primaryButtonBackgroundColor,
    primaryButtonBackgroundHoverColor,
    primaryButtonBorderColor,
    primaryButtonBorderRadius,
    secondaryButtonLabel,
    secondaryButtonTextColor,
    secondaryButtonTextHoverColor,
    secondaryButtonBackgroundColor,
    secondaryButtonBackgroundHoverColor,
    secondaryButtonBorderColor,
    secondaryButtonBorderRadius
}) => {
    const element = document.createElement(
        'ac-hero-banner-with-search-bar-in-footer'
    );
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
    element.backgroundColor = backgroundColor;
    element.linearGradient = linearGradient;
    element.height = height;
    element.maxWidth = maxWidth;
    element.contentHorizontalAlignment = contentHorizontalAlignment;
    element.contentVerticalAlignment = contentVerticalAlignment;
    element.contentWidth = contentWidth;
    element.primaryButtonLabel = primaryButtonLabel;
    element.primaryButtonTextColor = primaryButtonTextColor;
    element.primaryButtonTextHoverColor = primaryButtonTextHoverColor;
    element.primaryButtonBackgroundColor = primaryButtonBackgroundColor;
    element.primaryButtonBackgroundHoverColor = primaryButtonBackgroundHoverColor;
    element.primaryButtonBorderColor = primaryButtonBorderColor;
    element.primaryButtonBorderRadius = primaryButtonBorderRadius;
    element.secondaryButtonLabel = secondaryButtonLabel;
    element.secondaryButtonTextColor = secondaryButtonTextColor;
    element.secondaryButtonTextHoverColor = secondaryButtonTextHoverColor;
    element.secondaryButtonBackgroundColor = secondaryButtonBackgroundColor;
    element.secondaryButtonBackgroundHoverColor = secondaryButtonBackgroundHoverColor;
    element.secondaryButtonBorderColor = secondaryButtonBorderColor;
    element.secondaryButtonBorderRadius = secondaryButtonBorderRadius;
    return element;
};
