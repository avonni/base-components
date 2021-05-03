import Component from 'avonni/filterMenuGroup';

customElements.define(
    'ac-base-filter-menu-group',
    Component.CustomElementConstructor
);

export const FilterMenuGroup = ({
    items,
    applyButtonLabel,
    resetButtonLabel,
    hideSelectedItems,
    variant
}) => {
    const element = document.createElement('ac-base-filter-menu-group');
    element.items = items;
    element.applyButtonLabel = applyButtonLabel;
    element.resetButtonLabel = resetButtonLabel;
    element.hideSelectedItems = hideSelectedItems;
    element.variant = variant;
    return element;
};
