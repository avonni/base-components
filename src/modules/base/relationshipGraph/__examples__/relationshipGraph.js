import Component from 'avonni/relationshipGraph';

customElements.define(
    'ac-relationship-graph',
    Component.CustomElementConstructor
);

export const RelationshipGraph = ({
    label,
    avatarSrc,
    avatarFallbackIconName,
    href,
    variant,
    actions,
    selectedItemName,
    groups,
    groupActions,
    groupActionsPosition,
    groupTheme,
    itemActions,
    itemTheme,
    shrinkIconName,
    expandIconName,
    hideItemsCount
}) => {
    const element = document.createElement('ac-relationship-graph');
    element.label = label;
    element.avatarSrc = avatarSrc;
    element.avatarFallbackIconName = avatarFallbackIconName;
    element.href = href;
    element.variant = variant;
    element.actions = actions;
    element.selectedItemName = selectedItemName;
    element.groups = groups;
    element.groupActions = groupActions;
    element.groupActionsPosition = groupActionsPosition;
    element.groupTheme = groupTheme;
    element.itemActions = itemActions;
    element.itemTheme = itemTheme;
    element.shrinkIconName = shrinkIconName;
    element.expandIconName = expandIconName;
    element.hideItemsCount = hideItemsCount;

    return element;
};
