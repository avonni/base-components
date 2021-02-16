import Component from 'avonni/inputToggle';

customElements.define(
    'ac-avonni-input-toggle',
    Component.CustomElementConstructor
);

export const InputToggle = ({ accessKey }) => {
    const element = document.createElement('ac-avonni-input-toggle');
    element.accessKey = accessKey;
    return element;
};
