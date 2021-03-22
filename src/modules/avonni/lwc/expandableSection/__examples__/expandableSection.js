import Component from '../../storybookWrappers/expandableSection/expandableSection';

customElements.define(
    'ac-avonni-expandable-section',
    Component.CustomElementConstructor
);

export const ExpandableSection = ({ title, closed, collapsable }) => {
    const element = document.createElement('ac-avonni-expandable-section');
    element.title = title;
    element.closed = closed;
    element.collapsable = collapsable;
    return element;
};
