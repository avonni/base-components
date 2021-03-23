import Component from 'base/avatarGroup';

customElements.define('ac-base-avatar-group', Component.CustomElementConstructor);

export const AvatarGroup = ({
    items,
    size,
    variant,
    maxCount
}) => {
    const element = document.createElement('ac-base-avatar-group');
    element.items = items;
    element.variant = variant;
    element.size = size;
    element.maxCount = maxCount;
    return element;
};
