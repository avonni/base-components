import Component from '../../storybookWrappers/splitter/splitter';

customElements.define('ac-avonni-splitter', Component.CustomElementConstructor);

export const Splitter = () => {
    const element = document.createElement('ac-avonni-splitter');
    return element;
};
