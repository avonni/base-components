import Component from 'avonni/activityTimeline';

customElements.define(
    'ac-base-activity-timeline',
    Component.CustomElementConstructor
);

export const ActivityTimeline = ({
    title,
    iconName,
    collapsible,
    closed,
    groupBy,
    variant,
    items
}) => {
    const element = document.createElement('ac-base-activity-timeline');
    element.title = title;
    element.iconName = iconName;
    element.collapsible = collapsible;
    element.closed = closed;
    element.groupBy = groupBy;
    element.variant = variant;
    element.items = items;
    return element;
};
