import Component from 'avonni/avatar';

customElements.define('ac-base-avatar', Component.CustomElementConstructor);

export const Avatar = ({
    alternativeText,
    entityIconName,
    entityInitials,
    entityPosition,
    entitySrc,
    entityTitle,
    entityVariant,
    fallbackIconName,
    hideAvatarDetails,
    initials,
    presence,
    presenceTitle,
    presencePosition,
    primaryText,
    secondaryText,
    tertiaryText,
    size,
    src,
    status,
    statusPosition,
    statusTitle,
    variant,
    textPosition
}) => {
    const element = document.createElement('ac-base-avatar');
    element.alternativeText = alternativeText;
    element.entityIconName = entityIconName;
    element.entityInitials = entityInitials;
    element.entityPosition = entityPosition;
    element.entitySrc = entitySrc;
    element.entityTitle = entityTitle;
    element.entityVariant = entityVariant;
    element.fallbackIconName = fallbackIconName;
    element.hideAvatarDetails = hideAvatarDetails;
    element.initials = initials;
    element.presence = presence;
    element.presenceTitle = presenceTitle;
    element.presencePosition = presencePosition;
    element.primaryText = primaryText;
    element.secondaryText = secondaryText;
    element.tertiaryText = tertiaryText;
    element.size = size;
    element.src = src;
    element.status = status;
    element.statusPosition = statusPosition;
    element.statusTitle = statusTitle;
    element.variant = variant;
    element.textPosition = textPosition;
    return element;
};
