import Component from 'base/relationshipGraph';

customElements.define(
    'ac-base-relationship-graph',
    Component.CustomElementConstructor
);

export const RelationshipGraph = ({
    label,
    avatarSrc,
    avatarFallbackIconName,
    href,
    variant,
    selectedItemName,
    groups,
    groupTheme,
    itemTheme,
    shrinkIconName,
    expandIconName
}) => {
    const element = document.createElement('ac-base-relationship-graph');
    element.label = label;
    element.avatarSrc = avatarSrc;
    element.avatarFallbackIconName = avatarFallbackIconName;
    element.href = href;
    element.variant = variant;
    element.selectedItemName = selectedItemName;
    element.groups = groups;
    element.groupTheme = groupTheme;
    element.itemTheme = itemTheme;
    element.shrinkIconName = shrinkIconName;
    element.expandIconName = expandIconName;

    return element;
};
