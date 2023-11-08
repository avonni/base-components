import Component from '../../storybookWrappers/panel/panel';

customElements.define('ac-base-panel', Component.CustomElementConstructor);

export const Panel = ({ position, title, size, showPanel }) => {
    const element = document.createElement('ac-base-panel');
    element.position = position;
    element.title = title;
    element.size = size;
    element.showPanel = showPanel;
    return element;
};
