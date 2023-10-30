import Component from '../../storybookWrappers/profileCard/profileCard';

customElements.define(
    'ac-base-profile-card',
    Component.CustomElementConstructor
);

export const ProfileCard = ({
    title,
    subtitle,
    backgroundSrc,
    backgroundAlternativeText,
    avatarSrc,
    avatarAlternativeText,
    avatarFallbackIconName,
    avatarSize,
    avatarPosition,
    avatarMobilePosition,
    avatarVariant
}) => {
    const element = document.createElement('ac-base-profile-card');
    element.title = title;
    element.subtitle = subtitle;
    element.backgroundSrc = backgroundSrc;
    element.backgroundAlternativeText = backgroundAlternativeText;
    element.avatarSrc = avatarSrc;
    element.avatarAlternativeText = avatarAlternativeText;
    element.avatarFallbackIconName = avatarFallbackIconName;
    element.avatarSize = avatarSize;
    element.avatarPosition = avatarPosition;
    element.avatarMobilePosition = avatarMobilePosition;
    element.avatarVariant = avatarVariant;
    return element;
};
