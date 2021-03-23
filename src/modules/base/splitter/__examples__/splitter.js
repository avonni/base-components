import Component from '../../storybookWrappers/splitter/splitter';

customElements.define('ac-base-splitter', Component.CustomElementConstructor);

export const Splitter = ({ orientation }) => {
    const element = document.createElement('ac-base-splitter');
    element.orientation = orientation;
    return element;
};
