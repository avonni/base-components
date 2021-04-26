import Component from 'avonni/avatarGroup';

customElements.define(
    'ac-base-avatar-group',
    Component.CustomElementConstructor
);

export const AvatarGroup = ({
    variant,
    items,
    size,
    layout,
    maxCount,
    listButtonLabel,
    listButtonVariant,
    listButtonIconName,
    listButtonIconPosition
}) => {
    const element = document.createElement('ac-base-avatar-group');
    element.items = items;
    element.variant = variant;
    element.layout = layout;
    element.size = size;
    element.maxCount = maxCount;
    element.listButtonLabel = listButtonLabel;
    element.listButtonVariant = listButtonVariant;
    element.listButtonIconName = listButtonIconName;
    element.listButtonIconPosition = listButtonIconPosition;
    return element;
};
