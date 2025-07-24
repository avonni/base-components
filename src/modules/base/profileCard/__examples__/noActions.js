import Component from '../../storybookWrappers/profileCard/noActions';

customElements.define(
    'ac-avonni-no-actions-profile-card',
    Component.CustomElementConstructor
);

export const NoActionsProfileCard = ({
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
    const element = document.createElement('ac-avonni-no-actions-profile-card');
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
