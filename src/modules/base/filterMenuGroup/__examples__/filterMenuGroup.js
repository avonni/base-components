import Component from '../../storybookWrappers/filterMenuGroup/filterMenuGroup';

customElements.define(
    'ac-base-filter-menu-group',
    Component.CustomElementConstructor
);

export const FilterMenuGroup = ({
    applyButtonLabel,
    hideApplyResetButtons,
    hideSelectedItems,
    isToggleButtonVariant,
    menus,
    offsetFilterWidth,
    resetButtonLabel,
    showSelectedFilterValueCount,
    value,
    variant,
    wrapperWidth
}) => {
    const element = document.createElement('ac-base-filter-menu-group');
    element.applyButtonLabel = applyButtonLabel;
    element.hideApplyResetButtons = hideApplyResetButtons;
    element.hideSelectedItems = hideSelectedItems;
    element.isToggleButtonVariant = isToggleButtonVariant;
    element.menus = menus;
    element.offsetFilterWidth = offsetFilterWidth;
    element.resetButtonLabel = resetButtonLabel;
    element.showSelectedFilterValueCount = showSelectedFilterValueCount;
    element.value = value;
    element.variant = variant;
    element.wrapperWidth = wrapperWidth;
    return element;
};
