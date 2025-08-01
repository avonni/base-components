import Component from 'avonni/relationshipGraph';

customElements.define(
    'ac-relationship-graph',
    Component.CustomElementConstructor
);

export const RelationshipGraph = ({
    actions,
    actionsMenuAlternativeText,
    avatarFallbackIconName,
    avatarSrc,
    expandIconName,
    groupActions,
    groupActionsPosition,
    groupTheme,
    groups,
    hideItemsCount,
    href,
    itemActions,
    itemTheme,
    label,
    loadingStateAlternativeText,
    noResultsMessage,
    selectedItemName,
    shrinkIconName,
    variant
}) => {
    const element = document.createElement('ac-relationship-graph');
    element.actions = actions;
    element.actionsMenuAlternativeText = actionsMenuAlternativeText;
    element.avatarFallbackIconName = avatarFallbackIconName;
    element.avatarSrc = avatarSrc;
    element.expandIconName = expandIconName;
    element.groupActions = groupActions;
    element.groupActionsPosition = groupActionsPosition;
    element.groupTheme = groupTheme;
    element.groups = groups;
    element.hideItemsCount = hideItemsCount;
    element.href = href;
    element.itemActions = itemActions;
    element.itemTheme = itemTheme;
    element.label = label;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.noResultsMessage = noResultsMessage;
    element.selectedItemName = selectedItemName;
    element.shrinkIconName = shrinkIconName;
    element.variant = variant;
    return element;
};
