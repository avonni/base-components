import Component from '../../storybookWrappers/segment/segment';

customElements.define(
    'ac-avonni-segment',
    Component.CustomElementConstructor
);

export const Segment = ({ value, variant, disabled }) => {
    const element = document.createElement('ac-avonni-segment');
    element.value = value;
    element.variant = variant;
    element.disabled = disabled;
    return element;
};