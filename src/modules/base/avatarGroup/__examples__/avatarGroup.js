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
    listButtonShowMoreLabel,
    listButtonVariant,
    listButtonShowMoreIconName,
    listButtonShowMoreIconPosition,
    listButtonShowLessIconPosition,
    listButtonShowLessIconName,
    listButtonShowLessLabel,
    actionIconName,
    name
}) => {
    const element = document.createElement('ac-base-avatar-group');
    element.items = items;
    element.variant = variant;
    element.layout = layout;
    element.size = size;
    element.maxCount = maxCount;
    element.listButtonShowMoreLabel = listButtonShowMoreLabel;
    element.listButtonVariant = listButtonVariant;
    element.listButtonShowMoreIconName = listButtonShowMoreIconName;
    element.listButtonShowMoreIconPosition = listButtonShowMoreIconPosition;
    element.listButtonShowLessIconPosition = listButtonShowLessIconPosition;
    element.listButtonShowLessIconName = listButtonShowLessIconName;
    element.listButtonShowLessLabel = listButtonShowLessLabel;
    element.actionIconName = actionIconName;
    element.name = name;
    return element;
};
