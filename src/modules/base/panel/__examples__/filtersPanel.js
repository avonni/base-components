import Component from '../../storybookWrappers/panel/filtersPanel';

customElements.define('ac-filters-panel', Component.CustomElementConstructor);

export const FiltersPanel = ({
    closeButtonAlternativeText,
    position,
    showPanel,
    size,
    title
}) => {
    const element = document.createElement('ac-filters-panel');
    element.closeButtonAlternativeText = closeButtonAlternativeText;
    element.position = position;
    element.showPanel = showPanel;
    element.size = size;
    element.title = title;
    return element;
};
