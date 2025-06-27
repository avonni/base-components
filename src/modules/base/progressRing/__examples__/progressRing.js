import Component from '../../storybookWrappers/progressRing/progressRing';

customElements.define(
    'ac-base-progress-ring',
    Component.CustomElementConstructor
);

export const ProgressRing = ({
    alternativeText,
    direction,
    size,
    value,
    variant,
    hideIcon
}) => {
    const element = document.createElement('ac-base-progress-ring');
    element.alternativeText = alternativeText;
    element.direction = direction;
    element.size = size;
    element.value = value;
    element.variant = variant;
    element.hideIcon = hideIcon;
    return element;
};
