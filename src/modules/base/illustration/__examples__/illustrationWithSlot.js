import Component from '../../storybookWrappers/illustration/illustrationWithSlot';

customElements.define(
    'ac-base-illustration-with-slot',
    Component.CustomElementConstructor
);

export const IllustrationWithSlot = ({ title, size, variant }) => {
    const element = document.createElement('ac-base-illustration-with-slot');
    element.title = title;
    element.size = size;
    element.variant = variant;
    return element;
};
