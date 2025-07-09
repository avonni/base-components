import Component from 'avonni/avatar';

customElements.define('ac-base-avatar', Component.CustomElementConstructor);

export const Avatar = ({
    actionMenuIcon,
    actionPosition,
    actions,
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
    presencePosition,
    presenceTitle,
    primaryText,
    primaryTextUrl,
    secondaryText,
    size,
    src,
    status,
    statusPosition,
    statusTitle,
    tags,
    tertiaryText,
    textPosition,
    variant
}) => {
    const element = document.createElement('ac-base-avatar');
    element.actionMenuIcon = actionMenuIcon;
    element.actionPosition = actionPosition;
    element.actions = actions;
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
    element.presencePosition = presencePosition;
    element.presenceTitle = presenceTitle;
    element.primaryText = primaryText;
    element.primaryTextUrl = primaryTextUrl;
    element.secondaryText = secondaryText;
    element.size = size;
    element.src = src;
    element.status = status;
    element.statusPosition = statusPosition;
    element.statusTitle = statusTitle;
    element.tags = tags;
    element.tertiaryText = tertiaryText;
    element.textPosition = textPosition;
    element.variant = variant;
    return element;
};
