import Component from 'base/avatarGroup';

customElements.define(
    'ac-base-avatar-group',
    Component.CustomElementConstructor
);

export const AvatarGroup = ({ items, size, layout, maxCount }) => {
    const element = document.createElement('ac-base-avatar-group');
    element.items = items;
    element.layout = layout;
    element.size = size;
    element.maxCount = maxCount;
    return element;
};
