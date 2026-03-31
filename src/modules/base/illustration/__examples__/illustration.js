import Component from '../../storybookWrappers/illustration/illustration';

customElements.define(
    'ac-base-illustration',
    Component.CustomElementConstructor
);

export const Illustration = ({ alternativeText, size, title, variant }) => {
    const element = document.createElement('ac-base-illustration');
    element.alternativeText = alternativeText;
    element.size = size;
    element.title = title;
    element.variant = variant;
    return element;
};
