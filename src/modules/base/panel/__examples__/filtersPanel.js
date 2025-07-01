import Component from '../../storybookWrappers/panel/filtersPanel';

customElements.define('ac-filters-panel', Component.CustomElementConstructor);

export const FiltersPanel = ({ position, title, size, showPanel }) => {
    const element = document.createElement('ac-filters-panel');
    element.position = position;
    element.showPanel = showPanel;
    element.size = size;
    element.title = title;
    return element;
};
