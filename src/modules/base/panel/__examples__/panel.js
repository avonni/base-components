import Component from 'base/panel';

customElements.define('ac-base-panel', Component.CustomElementConstructor);

export const Panel = ({ position, title, size }) => {
    const element = document.createElement('ac-base-panel');
    element.position = position;
    element.title = title;
    element.size = size;
    return element;
};
