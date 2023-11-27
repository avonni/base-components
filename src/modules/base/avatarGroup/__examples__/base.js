import Component from '../avatarGroup';

customElements.define(
    'ac-base-avatar-group',
    Component.CustomElementConstructor
);

export const AvatarGroup = ({
    enableInfiniteLoading,
    variant,
    isLoading,
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
    loadMoreOffset,
    actionIconName,
    name
}) => {
    const element = document.createElement('ac-base-avatar-group');
    element.enableInfiniteLoading = enableInfiniteLoading;
    element.isLoading = isLoading;
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
    element.loadMoreOffset = loadMoreOffset;
    element.actionIconName = actionIconName;
    element.name = name;
    return element;
};
