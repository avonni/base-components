import Component from '../../storybookWrappers/activityTimeline/infiniteLoadingActivityTimeline';

customElements.define(
    'ac-infinite-loading-activity-timeline',
    Component.CustomElementConstructor
);

export const InfiniteLoadingActivityTimeline = ({
    actions,
    buttonShowMoreLabel,
    buttonVariant,
    buttonShowMoreIconName,
    buttonShowMoreIconPosition,
    buttonShowLessIconPosition,
    buttonShowLessIconName,
    buttonShowLessLabel,
    closed,
    collapsible,
    enableInfiniteLoading,
    itemDateFormat,
    iconName,
    iconSize,
    isLoading,
    itemIconSize,
    items,
    loadMoreOffset,
    locale,
    hideItemDate,
    groupBy,
    orientation,
    maxVisibleItems,
    sortedDirection,
    timezone,
    title
}) => {
    const element = document.createElement(
        'ac-infinite-loading-activity-timeline'
    );
    element.actions = actions;
    element.buttonShowMoreLabel = buttonShowMoreLabel;
    element.buttonVariant = buttonVariant;
    element.buttonShowMoreIconName = buttonShowMoreIconName;
    element.buttonShowMoreIconPosition = buttonShowMoreIconPosition;
    element.buttonShowLessIconPosition = buttonShowLessIconPosition;
    element.buttonShowLessIconName = buttonShowLessIconName;
    element.buttonShowLessLabel = buttonShowLessLabel;
    element.closed = closed;
    element.collapsible = collapsible;
    element.enableInfiniteLoading = enableInfiniteLoading;
    element.itemDateFormat = itemDateFormat;
    element.locale = locale;
    element.groupBy = groupBy;
    element.iconName = iconName;
    element.iconSize = iconSize;
    element.isLoading = isLoading;
    element.itemIconSize = itemIconSize;
    element.items = items;
    element.loadMoreOffset = loadMoreOffset;
    element.orientation = orientation;
    element.hideItemDate = hideItemDate;
    element.maxVisibleItems = maxVisibleItems;
    element.sortedDirection = sortedDirection;
    element.timezone = timezone;
    element.title = title;
    return element;
};
