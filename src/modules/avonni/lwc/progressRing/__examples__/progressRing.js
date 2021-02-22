import Component from '../../storybookWrappers/progressRing/progressRing';

customElements.define(
    'ac-avonni-progress-ring',
    Component.CustomElementConstructor
);

export const ProgressRing = ({ direction, size, value, variant, hideIcon }) => {
    const element = document.createElement('ac-avonni-progress-ring');
    element.direction = direction;
    element.size = size;
    element.value = value;
    element.variant = variant;
    element.hideIcon = hideIcon;
    return element;
};
