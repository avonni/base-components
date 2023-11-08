import Component from '../../storybookWrappers/panel/panelWithContentInside';

customElements.define(
    'ac-with-content-panel',
    Component.CustomElementConstructor
);

export const PanelWithContentInside = ({
    position,
    title,
    size,
    showPanel
}) => {
    const element = document.createElement('ac-with-content-panel');
    element.position = position;
    element.title = title;
    element.size = size;
    element.showPanel = showPanel;
    return element;
};
