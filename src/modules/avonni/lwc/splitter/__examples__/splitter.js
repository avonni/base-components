import Component from '../../storybookWrappers/splitter/splitter';

customElements.define('ac-avonni-splitter', Component.CustomElementConstructor);

export const Splitter = ({ orientation }) => {
    const element = document.createElement('ac-avonni-splitter');
    element.orientation = orientation;
    return element;
};
