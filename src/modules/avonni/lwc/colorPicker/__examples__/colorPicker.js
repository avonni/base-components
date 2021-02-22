import Component from 'avonni/colorPicker';

customElements.define('ac-avonni-color-picker', Component.CustomElementConstructor);

export const ColorPicker = ({
    disabled,
    readOnly,
    isLoading,
    label,
    fieldLevelHelp,
    value,
    variant,
    type,
    menuVariant,
    menuIconName,
    menuIconSize,
    menuLabel,
    menuAlignment,
    menuNubbin,
    colorsValue,
    hideColorInput,
    opacity,
    messageWhenBadInput
}) => {
    const element = document.createElement('ac-avonni-color-picker');
    element.disabled = disabled;
    element.readOnly = readOnly;
    element.isLoading = isLoading;
    element.label = label;
    element.fieldLevelHelp = fieldLevelHelp;
    element.value = value;
    element.variant = variant;
    element.type = type;
    element.menuVariant = menuVariant;
    element.menuIconName = menuIconName;
    element.menuIconSize = menuIconSize;
    element.menuLabel = menuLabel;
    element.menuAlignment = menuAlignment;
    element.menuNubbin = menuNubbin;
    element.colorsValue = colorsValue;
    element.hideColorInput = hideColorInput;
    element.opacity = opacity;
    element.messageWhenBadInput = messageWhenBadInput;
    return element;
};