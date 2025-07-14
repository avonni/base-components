import Component from '../../storybookWrappers/expandableSection/expandableSection';

customElements.define(
    'ac-base-expandable-section',
    Component.CustomElementConstructor
);

export const ExpandableSection = ({
    closed,
    closedIconAlternativeText,
    collapsible,
    openedIconAlternativeText,
    title,
    variant
}) => {
    const element = document.createElement('ac-base-expandable-section');
    element.closed = closed;
    element.closedIconAlternativeText = closedIconAlternativeText;
    element.collapsible = collapsible;
    element.openedIconAlternativeText = openedIconAlternativeText;
    element.title = title;
    element.variant = variant;
    return element;
};
