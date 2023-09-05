import Component from '../../storybookWrappers/chip/chip';

customElements.define('ac-base-chip', Component.CustomElementConstructor);

export const Chip = ({ label, variant, outline }) => {
    const element = document.createElement('ac-base-chip');
    element.label = label;
    element.outline = outline;
    element.variant = variant;
    return element;
};
