import Component from '../../storybookWrappers/panel/panelWithDatatable';

customElements.define(
    'ac-with-datatable-panel',
    Component.CustomElementConstructor
);

export const PanelWithDatatable = ({ position, showPanel, size, title }) => {
    const element = document.createElement('ac-with-datatable-panel');
    element.position = position;
    element.showPanel = showPanel;
    element.size = size;
    element.title = title;
    return element;
};
