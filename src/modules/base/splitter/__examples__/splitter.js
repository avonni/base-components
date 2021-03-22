import Component from '../../storybookWrappers/splitter/splitter';

customElements.define('ac-base-splitter', Component.CustomElementConstructor);

export const Splitter = () => {
    const element = document.createElement('ac-base-splitter');
    return element;
};
