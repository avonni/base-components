import Component from '../../storybookWrappers/chip/chip';

customElements.define('ac-base-chip', Component.CustomElementConstructor);

export const Chip = ({ label, variant, outline }) => {
    const element = document.createElement('ac-base-chip');
    element.label = label;
    element.variant = variant;
    element.outline = outline;
    return element;
};