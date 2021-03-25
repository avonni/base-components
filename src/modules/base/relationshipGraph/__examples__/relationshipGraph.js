import Component from 'base/relationshipGraph';

customElements.define(
    'ac-base-relationship-graph',
    Component.CustomElementConstructor
);

export const RelationshipGraph = ({ label, groups }) => {
    const element = document.createElement('ac-base-relationship-graph');
    element.label = label;
    element.groups = groups;
    return element;
};
