import Component from 'c/outputData';

customElements.define(
    'ac-base-output-data',
    Component.CustomElementConstructor
);

export const OutputData = ({ label, type, typeAttributes, value, variant }) => {
    const element = document.createElement('ac-base-output-data');
    element.label = label;
    element.type = type;
    element.typeAttributes = typeAttributes;
    element.value = value;
    element.variant = variant;
    return element;
};
