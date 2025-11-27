import Component from '../../storybookWrappers/filterMenuGroup/filterMenuGroup';

customElements.define(
    'ac-base-filter-menu-group',
    Component.CustomElementConstructor
);

export const FilterMenuGroup = ({
    align,
    applyButtonLabel,
    hideApplyButton,
    hideApplyResetButtons,
    hideSelectedItems,
    menus,
    resetButtonLabel,
    showClearButton,
    singleLine,
    value,
    variant,
    weekStartDay
}) => {
    const element = document.createElement('ac-base-filter-menu-group');
    element.align = align;
    element.applyButtonLabel = applyButtonLabel;
    element.hideApplyButton = hideApplyButton;
    element.hideApplyResetButtons = hideApplyResetButtons;
    element.hideSelectedItems = hideSelectedItems;
    element.menus = menus;
    element.resetButtonLabel = resetButtonLabel;
    element.showClearButton = showClearButton;
    element.singleLine = singleLine;
    element.value = value;
    element.variant = variant;
    element.weekStartDay = weekStartDay;
    return element;
};
