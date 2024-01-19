import Component from '../../storybookWrappers/profileCard/noActions';

customElements.define(
    'ac-avonni-no-actions-profile-card',
    Component.CustomElementConstructor
);

export const NoActionsProfileCard = ({
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
    const element = document.createElement('ac-avonni-no-actions-profile-card');
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
