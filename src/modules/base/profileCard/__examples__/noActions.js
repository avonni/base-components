import Component from '../../storybookWrappers/profileCard/noActions';

customElements.define(
    'ac-avonni-no-actions-profile-card',
    Component.CustomElementConstructor
);

export const NoActionsProfileCard = ({
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
    const element = document.createElement('ac-avonni-no-actions-profile-card');
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
