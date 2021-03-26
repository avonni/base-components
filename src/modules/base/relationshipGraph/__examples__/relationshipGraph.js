import Component from 'base/relationshipGraph';

customElements.define(
    'ac-base-relationship-graph',
    Component.CustomElementConstructor
);

export const RelationshipGraph = ({
    label,
    variant,
    groups,
    shrinkIconName,
    expandIconName
}) => {
    const element = document.createElement('ac-base-relationship-graph');
    element.label = label;
    element.variant = variant;
    element.groups = groups;
    element.shrinkIconName = shrinkIconName;
    element.expandIconName = expandIconName;

    return element;
};
