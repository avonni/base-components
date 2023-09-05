import Component from '../../storybookWrappers/panel/filtersPanel';

customElements.define('ac-filters-panel', Component.CustomElementConstructor);

export const FiltersPanel = ({ position, title, size, showPanel }) => {
    const element = document.createElement('ac-filters-panel');
    element.position = position;
    element.title = title;
    element.size = size;
    element.showPanel = showPanel;
    return element;
};
