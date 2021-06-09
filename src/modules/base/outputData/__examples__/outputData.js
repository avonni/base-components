import Component from 'c/outputData';

customElements.define(
    'ac-base-output-data',
    Component.CustomElementConstructor
);

export const OutputData = ({ label, typeAttributes, type, value }) => {
    const element = document.createElement('ac-base-output-data');
    element.label = label;
    element.typeAttributes = typeAttributes;
    element.type = type;
    element.value = value;
    return element;
};
