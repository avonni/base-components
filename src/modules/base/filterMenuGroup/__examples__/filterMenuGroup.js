import Component from '../../storybookWrappers/filterMenuGroup/filterMenuGroup';

customElements.define(
    'ac-base-filter-menu-group',
    Component.CustomElementConstructor
);

export const FilterMenuGroup = ({
    applyButtonLabel,
    hideApplyResetButtons,
    hideSelectedItems,
    menus,
    resetButtonLabel,
    value,
    variant
}) => {
    const element = document.createElement('ac-base-filter-menu-group');
    element.applyButtonLabel = applyButtonLabel;
    element.hideApplyResetButtons = hideApplyResetButtons;
    element.hideSelectedItems = hideSelectedItems;
    element.menus = menus;
    element.resetButtonLabel = resetButtonLabel;
    element.value = value;
    element.variant = variant;
    return element;
};
