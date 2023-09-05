import Component from '../activityTimeline';

customElements.define(
    'ac-activity-timeline',
    Component.CustomElementConstructor
);

export const ActivityTimeline = ({
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
    fieldAttributes,
    itemDateFormat,
    iconName,
    iconSize,
    itemIconSize,
    items,
    hideItemDate,
    groupBy,
    orientation,
    maxVisibleItems,
    sortedDirection,
    timezone,
    title
}) => {
    const element = document.createElement('ac-activity-timeline');
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
    element.fieldAttributes = fieldAttributes;
    element.itemDateFormat = itemDateFormat;
    element.groupBy = groupBy;
    element.iconName = iconName;
    element.iconSize = iconSize;
    element.itemIconSize = itemIconSize;
    element.items = items;
    element.orientation = orientation;
    element.hideItemDate = hideItemDate;
    element.maxVisibleItems = maxVisibleItems;
    element.sortedDirection = sortedDirection;
    element.timezone = timezone;
    element.title = title;
    return element;
};
