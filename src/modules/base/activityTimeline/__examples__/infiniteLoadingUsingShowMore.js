import Component from '../../storybookWrappers/activityTimeline/infiniteLoadingUsingShowMore';

customElements.define(
    'ac-infinite-loading-activity-timeline-using-show-more',
    Component.CustomElementConstructor
);

export const InfiniteLoadingUsingShowMoreActivityTimeline = ({
    actions,
    buttonShowLessIconName,
    buttonShowLessIconPosition,
    buttonShowLessLabel,
    buttonShowMoreIconName,
    buttonShowMoreIconPosition,
    buttonShowMoreLabel,
    buttonVariant,
    closed,
    collapsible,
    disableUpcomingGroup,
    enableInfiniteLoading,
    fieldAttributes,
    groupBy,
    hideItemDate,
    hideVerticalBar,
    iconName,
    iconSize,
    intervalDaysLength,
    isLoading,
    itemDateFormat,
    itemIconSize,
    items,
    loadMoreOffset,
    loadingStateAlternativeText,
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
    element.disableUpcomingGroup = disableUpcomingGroup;
    element.enableInfiniteLoading = enableInfiniteLoading;
    element.fieldAttributes = fieldAttributes;
    element.groupBy = groupBy;
    element.hideItemDate = hideItemDate;
    element.hideVerticalBar = hideVerticalBar;
    element.iconName = iconName;
    element.iconSize = iconSize;
    element.isLoading = isLoading;
    element.itemDateFormat = itemDateFormat;
    element.itemIconSize = itemIconSize;
    element.items = items;
    element.intervalDaysLength = intervalDaysLength;
    element.loadMoreOffset = loadMoreOffset;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.locale = locale;
    element.maxVisibleItems = maxVisibleItems;
    element.orientation = orientation;
    element.sortedDirection = sortedDirection;
    element.timezone = timezone;
    element.title = title;
    return element;
};
