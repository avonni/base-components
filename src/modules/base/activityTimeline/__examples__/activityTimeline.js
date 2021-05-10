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
    items,
    actions
}) => {
    const element = document.createElement('ac-base-activity-timeline');
    element.title = title;
    element.iconName = iconName;
    element.collapsible = collapsible;
    element.closed = closed;
    element.groupBy = groupBy;
    element.items = items;
    element.actions = actions;
    return element;
};
