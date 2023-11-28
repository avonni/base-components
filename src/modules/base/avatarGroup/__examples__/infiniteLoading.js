import Component from '../../storybookWrappers/avatarGroup/infiniteLoading';

customElements.define(
    'ac-base-infinite-loading-avatar-group',
    Component.CustomElementConstructor
);

export const InfiniteLoadingAvatarGroup = ({
    actionIconName,
    enableInfiniteLoading,
    isLoading,
    items,
    layout,
    listButtonShowLessIconName,
    listButtonShowLessIconPosition,
    listButtonShowLessLabel,
    listButtonShowMoreIconName,
    listButtonShowMoreIconPosition,
    listButtonShowMoreLabel,
    listButtonVariant,
    loadMoreOffset,
    maxCount,
    name,
    size,
    variant
}) => {
    const element = document.createElement(
        'ac-base-infinite-loading-avatar-group'
    );
    element.actionIconName = actionIconName;
    element.enableInfiniteLoading = enableInfiniteLoading;
    element.isLoading = isLoading;
    element.items = items;
    element.layout = layout;
    element.listButtonShowLessIconName = listButtonShowLessIconName;
    element.listButtonShowLessIconPosition = listButtonShowLessIconPosition;
    element.listButtonShowLessLabel = listButtonShowLessLabel;
    element.listButtonShowMoreIconName = listButtonShowMoreIconName;
    element.listButtonShowMoreIconPosition = listButtonShowMoreIconPosition;
    element.listButtonShowMoreLabel = listButtonShowMoreLabel;
    element.listButtonVariant = listButtonVariant;
    element.loadMoreOffset = loadMoreOffset;
    element.maxCount = maxCount;
    element.name = name;
    element.size = size;
    element.variant = variant;
    return element;
};
