import Component from '../../storybookWrappers/profileCard/mobileProfileCard';

customElements.define(
    'ac-avonni-mobile-profile-card',
    Component.CustomElementConstructor
);

export const MobileProfileCard = ({
    title,
    subtitle,
    backgroundColor,
    backgroundSrc,
    backgroundAlternativeText,
    avatarSrc,
    avatarAlternativeText,
    avatarFallbackIconName,
    size,
    avatarPosition,
    avatarMobilePosition,
    avatarVariant
}) => {
    const element = document.createElement('ac-avonni-mobile-profile-card');
    element.title = title;
    element.subtitle = subtitle;
    element.backgroundColor = backgroundColor;
    element.backgroundSrc = backgroundSrc;
    element.backgroundAlternativeText = backgroundAlternativeText;
    element.avatarSrc = avatarSrc;
    element.avatarAlternativeText = avatarAlternativeText;
    element.avatarFallbackIconName = avatarFallbackIconName;
    element.size = size;
    element.avatarPosition = avatarPosition;
    element.avatarMobilePosition = avatarMobilePosition;
    element.avatarVariant = avatarVariant;
    return element;
};
