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
    element.shrinkIconName = shrinkIconName;
    element.expandIconName = expandIconName;

    return element;
};
