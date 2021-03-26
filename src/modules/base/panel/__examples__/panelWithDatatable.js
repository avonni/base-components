import Component from '../../storybookWrappers/panel/panelWithDatatable';

customElements.define(
    'ac-with-datatable-panel',
    Component.CustomElementConstructor
);

export const PanelWithDatatable = ({ position, title, size, showPanel }) => {
    const element = document.createElement('ac-with-datatable-panel');
    element.position = position;
    element.title = title;
    element.size = size;
    element.showPanel = showPanel;
    return element;
};
