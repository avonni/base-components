import Component from '../../storybookWrappers/activityTimeline/infiniteLoadingUsingShowMore';

customElements.define(
    'ac-infinite-loading-activity-timeline-using-show-more',
    Component.CustomElementConstructor
);

export const InfiniteLoadingUsingShowMoreActivityTimeline = ({
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
    groupBy,
    hideItemDate,
    itemDateFormat,
    iconName,
    iconSize,
    isLoading,
    itemIconSize,
    items,
    loadMoreOffset,
    locale,
    maxVisibleItems,
    orientation,
    sortedDirection,
    timezone,
    title
}) => {
    const element = document.createElement(
        'ac-infinite-loading-activity-timeline-using-show-more'
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
