import Component from '../../storybookWrappers/chip/chip';

customElements.define('ac-avonni-chip', Component.CustomElementConstructor);

export const Chip = ({ label, variant, outline }) => {
    const element = document.createElement('ac-avonni-chip');
    element.label = label;
    element.variant = variant;
    element.outline = outline;
    return element;
};