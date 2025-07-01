import Component from '../../storybookWrappers/panel/panel';

customElements.define('ac-base-panel', Component.CustomElementConstructor);

export const Panel = ({ position, showPanel, size, title }) => {
    const element = document.createElement('ac-base-panel');
    element.position = position;
    element.showPanel = showPanel;
    element.size = size;
    element.title = title;
    return element;
};
