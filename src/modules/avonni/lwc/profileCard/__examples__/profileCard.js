import Component from '../../storybookWrappers/profileCard/profileCard';

customElements.define(
    'ac-avonni-profile-card',
    Component.CustomElementConstructor
);

export const ProfileCard = ({
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
    avatarVariant
}) => {
    const element = document.createElement('ac-avonni-profile-card');
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
    element.avatarVariant = avatarVariant;
    return element;
};
