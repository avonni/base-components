import Component from '../../storybookWrappers/illustration/illustrationWithSlot';

customElements.define(
    'ac-base-illustration-with-slot',
    Component.CustomElementConstructor
);

export const IllustrationWithSlot = ({
    alternativeText,
    size,
    title,
    variant
}) => {
    const element = document.createElement('ac-base-illustration-with-slot');
    element.alternativeText = alternativeText;
    element.size = size;
    element.title = title;
    element.variant = variant;
    return element;
};
