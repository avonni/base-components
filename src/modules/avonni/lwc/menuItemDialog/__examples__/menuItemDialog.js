import Component from '../../storybookWrappers/menuItemDialog/menuItemDialog';

customElements.define(
    'ac-avonni-menu-item-dialog',
    Component.CustomElementConstructor
);

export const MenuItemDialog = ({
    value,
    accessKey,
    draftAlternativeText,
    iconName,
    label,
    prefixIconName,
    tabIndex,
    disabled,
    isDraft
}) => {
    const element = document.createElement('ac-avonni-menu-item-dialog');
    element.value = value;
    element.accessKey = accessKey;
    element.draftAlternativeText = draftAlternativeText;
    element.iconName = iconName;
    element.label = label;
    element.prefixIconName = prefixIconName;
    element.tabIndex = tabIndex;
    element.disabled = disabled;
    element.isDraft = isDraft;
    return element;
};
