import Component from '../avatarGroup';

customElements.define(
    'ac-base-avatar-group',
    Component.CustomElementConstructor
);

export const AvatarGroup = ({
    actionAlternativeText,
    actionIconName,
    enableInfiniteLoading,
    iconPosition,
    isLoading,
    items,
    keyboardAssistiveText,
    layout,
    listButtonShowLessIconName,
    listButtonShowLessIconPosition,
    listButtonShowLessLabel,
    listButtonShowMoreIconName,
    listButtonShowMoreIconPosition,
    listButtonShowMoreLabel,
    listButtonVariant,
    loadingStateAlternativeText,
    loadMoreOffset,
    maxCount,
    name,
    showMoreButtonAlternativeText,
    size,
    variant
}) => {
    const element = document.createElement('ac-base-avatar-group');
    element.actionAlternativeText = actionAlternativeText;
    element.actionIconName = actionIconName;
    element.enableInfiniteLoading = enableInfiniteLoading;
    element.iconPosition = iconPosition;
    element.isLoading = isLoading;
    element.items = items;
    element.keyboardAssistiveText = keyboardAssistiveText;
    element.layout = layout;
    element.listButtonShowLessIconName = listButtonShowLessIconName;
    element.listButtonShowLessIconPosition = listButtonShowLessIconPosition;
    element.listButtonShowLessLabel = listButtonShowLessLabel;
    element.listButtonShowMoreIconName = listButtonShowMoreIconName;
    element.listButtonShowMoreIconPosition = listButtonShowMoreIconPosition;
    element.listButtonShowMoreLabel = listButtonShowMoreLabel;
    element.listButtonVariant = listButtonVariant;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.loadMoreOffset = loadMoreOffset;
    element.maxCount = maxCount;
    element.name = name;
    element.showMoreButtonAlternativeText = showMoreButtonAlternativeText;
    element.size = size;
    element.variant = variant;
    return element;
};
