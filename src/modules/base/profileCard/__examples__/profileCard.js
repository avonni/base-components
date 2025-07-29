import Component from '../../storybookWrappers/profileCard/profileCard';

customElements.define(
    'ac-base-profile-card',
    Component.CustomElementConstructor
);

export const ProfileCard = ({
    avatarAlternativeText,
    avatarFallbackIconName,
    avatarMobilePosition,
    avatarPosition,
    avatarSize,
    avatarSrc,
    avatarVariant,
    backgroundAlternativeText,
    backgroundSrc,
    subtitle,
    title
}) => {
    const element = document.createElement('ac-base-profile-card');
    element.avatarAlternativeText = avatarAlternativeText;
    element.avatarFallbackIconName = avatarFallbackIconName;
    element.avatarMobilePosition = avatarMobilePosition;
    element.avatarPosition = avatarPosition;
    element.avatarSize = avatarSize;
    element.avatarSrc = avatarSrc;
    element.avatarVariant = avatarVariant;
    element.backgroundAlternativeText = backgroundAlternativeText;
    element.backgroundSrc = backgroundSrc;
    element.subtitle = subtitle;
    element.title = title;
    return element;
};
