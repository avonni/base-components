import Component from '../../storybookWrappers/progressRing/progressRing';

customElements.define(
    'ac-base-progress-ring',
    Component.CustomElementConstructor
);

export const ProgressRing = ({
    alternativeText,
    hideIcon,
    direction,
    size,
    value,
    variant
}) => {
    const element = document.createElement('ac-base-progress-ring');
    element.alternativeText = alternativeText;
    element.direction = direction;
    element.hideIcon = hideIcon;
    element.size = size;
    element.value = value;
    element.variant = variant;
    return element;
};
