import Component from 'avonni/avatarGroup';

customElements.define('ac-avonni-avatar-group', Component.CustomElementConstructor);

export const AvatarGroup = ({
    items,
    size,
    variant,
    maxCount
}) => {
    const element = document.createElement('ac-avonni-avatar-group');
    element.items = items;
    element.variant = variant;
    element.size = size;
    element.maxCount = maxCount;
    return element;
};
