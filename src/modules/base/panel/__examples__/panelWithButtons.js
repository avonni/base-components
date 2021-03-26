import Component from '../../storybookWrappers/panel/panelWithButtons';

customElements.define(
    'ac-with-buttons-panel',
    Component.CustomElementConstructor
);

export const PanelWithButtons = ({ position, title, size, showPanel }) => {
    const element = document.createElement('ac-with-buttons-panel');
    element.position = position;
    element.title = title;
    element.size = size;
    element.showPanel = showPanel;
    return element;
};
