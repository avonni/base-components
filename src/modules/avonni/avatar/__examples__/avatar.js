import Component from 'avonni/avatar';

customElements.define('ac-avonni-avatar', Component.CustomElementConstructor);

export const Avatar = ({
    alternativeText,
    fallbackIconName,
    initials,
    size,
    src,
    status,
    statusPosition,
    variant
}) => {
    const element = document.createElement('ac-avonni-avatar');
    element.alternativeText = alternativeText;
    element.fallbackIconName = fallbackIconName;
    element.initials = initials;
    element.size = size;
    element.src = src;
    element.status = status;
    element.statusPosition = statusPosition;
    element.variant = variant;
    return element;
};
