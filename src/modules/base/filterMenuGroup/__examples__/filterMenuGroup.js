import Component from '../../storybookWrappers/filterMenuGroup/filterMenuGroup';

customElements.define(
    'ac-base-filter-menu-group',
    Component.CustomElementConstructor
);

export const FilterMenuGroup = ({
    menus,
    applyButtonLabel,
    hideApplyResetButtons,
    resetButtonLabel,
    hideSelectedItems,
    value,
    variant
}) => {
    const element = document.createElement('ac-base-filter-menu-group');
    element.menus = menus;
    element.applyButtonLabel = applyButtonLabel;
    element.hideApplyResetButtons = hideApplyResetButtons;
    element.resetButtonLabel = resetButtonLabel;
    element.hideSelectedItems = hideSelectedItems;
    element.value = value;
    element.variant = variant;
    return element;
};
