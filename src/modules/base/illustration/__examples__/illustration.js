import Component from '../../storybookWrappers/illustration/illustration';

customElements.define(
    'ac-base-illustration',
    Component.CustomElementConstructor
);

export const Illustration = ({ title, size, variant }) => {
    const element = document.createElement('ac-base-illustration');
    element.title = title;
    element.size = size;
    element.variant = variant;
    return element;
};
