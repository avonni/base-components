import Component from 'avonni/avatar';

customElements.define('ac-avonni-avatar', Component.CustomElementConstructor);

export const Avatar = ({
    alternativeText,
    fallbackIconName,
    initials,
    presence,
    presenceTitle,
    presencePosition,
    size,
    src,
    status,
    statusPosition,
    statusTitle,
    variant
}) => {
    const element = document.createElement('ac-avonni-avatar');
    element.alternativeText = alternativeText;
    element.fallbackIconName = fallbackIconName;
    element.initials = initials;
    element.presence = presence;
    element.presenceTitle = presenceTitle;
    element.presencePosition = presencePosition;
    element.size = size;
    element.src = src;
    element.status = status;
    element.statusPosition = statusPosition;
    element.statusTitle = statusTitle;
    element.variant = variant;
    return element;
};
