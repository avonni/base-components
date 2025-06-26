import Component from '../iconPicker';

customElements.define(
    'avonni-base-icon-picker',
    Component.CustomElementConstructor
);

export const IconPicker = ({
    accessKey,
    cancelButtonLabel,
    doneButtonLabel,
    disabled,
    fieldLevelHelp,
    hiddenCategories,
    hideClearIcon,
    hideFooter,
    hideInputText,
    label,
    menuIconSize,
    menuLabel,
    menuVariant,
    messageWhenBadInput,
    name,
    placeholder,
    readOnly,
    required,
    searchInputPlaceholder,
    value,
    variant
}) => {
    const element = document.createElement('avonni-base-icon-picker');
    element.accessKey = accessKey;
    element.cancelButtonLabel = cancelButtonLabel;
    element.doneButtonLabel = doneButtonLabel;
    element.disabled = disabled;
    element.fieldLevelHelp = fieldLevelHelp;
    element.hiddenCategories = hiddenCategories;
    element.hideClearIcon = hideClearIcon;
    element.hideFooter = hideFooter;
    element.hideInputText = hideInputText;
    element.label = label;
    element.menuIconSize = menuIconSize;
    element.menuLabel = menuLabel;
    element.menuVariant = menuVariant;
    element.messageWhenBadInput = messageWhenBadInput;
    element.name = name;
    element.placeholder = placeholder;
    element.readOnly = readOnly;
    element.required = required;
    element.searchInputPlaceholder = searchInputPlaceholder;
    element.value = value;
    element.variant = variant;
    return element;
};
