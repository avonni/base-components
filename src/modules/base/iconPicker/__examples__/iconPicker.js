import Component from '../iconPicker';

customElements.define(
    'avonni-base-icon-picker',
    Component.CustomElementConstructor
);

export const IconPicker = ({
    value,
    accessKey,
    disabled,
    fieldLevelHelp,
    label,
    name,
    readOnly,
    required,
    variant,
    hiddenCategories,
    menuVariant,
    menuIconSize,
    menuLabel,
    messageWhenBadInput,
    hideInputText,
    hideFooter,
    placeholder
}) => {
    const element = document.createElement('avonni-base-icon-picker');
    element.value = value;
    element.accessKey = accessKey;
    element.disabled = disabled;
    element.fieldLevelHelp = fieldLevelHelp;
    element.label = label;
    element.name = name;
    element.readOnly = readOnly;
    element.required = required;
    element.variant = variant;
    element.hiddenCategories = hiddenCategories;
    element.menuVariant = menuVariant;
    element.menuIconSize = menuIconSize;
    element.menuLabel = menuLabel;
    element.messageWhenBadInput = messageWhenBadInput;
    element.hideInputText = hideInputText;
    element.hideFooter = hideFooter;
    element.placeholder = placeholder;
    return element;
};
