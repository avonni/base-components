import Component from '../../storybookWrappers/profileCard/noActions';

customElements.define(
    'ac-avonni-no-actions-profile-card',
    Component.CustomElementConstructor
);

export const NoActionsProfileCard = ({
    avatarAlternativeText,
    avatarFallbackIconName,
    avatarPosition,
    avatarSize,
    avatarSrc,
    avatarVariant,
    backgroundAlternativeText,
    backgroundSrc,
    largeAvatarPosition,
    mediumAvatarPosition,
    smallAvatarPosition,
    subtitle,
    title
}) => {
    const element = document.createElement('ac-avonni-no-actions-profile-card');
    element.avatarAlternativeText = avatarAlternativeText;
    element.avatarFallbackIconName = avatarFallbackIconName;
    element.avatarPosition = avatarPosition;
    element.avatarSize = avatarSize;
    element.avatarSrc = avatarSrc;
    element.avatarVariant = avatarVariant;
    element.backgroundAlternativeText = backgroundAlternativeText;
    element.backgroundSrc = backgroundSrc;
    element.largeAvatarPosition = largeAvatarPosition;
    element.mediumAvatarPosition = mediumAvatarPosition;
    element.smallAvatarPosition = smallAvatarPosition;
    element.subtitle = subtitle;
    element.title = title;
    return element;
};
