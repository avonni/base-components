

import Component from '../../storybookWrappers/expandableSection/expandableSection';

customElements.define(
    'ac-base-expandable-section',
    Component.CustomElementConstructor
);

export const ExpandableSection = ({ title, closed, collapsible, variant }) => {
    const element = document.createElement('ac-base-expandable-section');
    element.title = title;
    element.closed = closed;
    element.collapsible = collapsible;
    element.variant = variant;
    return element;
};
