import Component from 'avonni/colorPicker';

customElements.define(
    'ac-base-color-picker',
    Component.CustomElementConstructor
);

export const ColorPicker = ({
    columns,
    disabled,
    readOnly,
    required,
    inline,
    isLoading,
    label,
    name,
    fieldLevelHelp,
    hideClearIcon,
    paletteShowCheckmark,
    paletteHideOutline,
    paletteTileHeight,
    paletteTileWidth,
    value,
    variant,
    type,
    menuVariant,
    menuIconName,
    menuIconSize,
    menuLabel,
    menuAlignment,
    menuNubbin,
    colors,
    hideColorInput,
    opacity,
    messageWhenBadInput,
    tokens,
    messageWhenValueMissing,
    groups
}) => {
    const element = document.createElement('ac-base-color-picker');
    element.columns = columns;
    element.disabled = disabled;
    element.hideClearIcon = hideClearIcon;
    element.readOnly = readOnly;
    element.required = required;
    element.inline = inline;
    element.paletteHideOutline = paletteHideOutline;
    element.paletteShowCheckmark = paletteShowCheckmark;
    element.paletteTileHeight = paletteTileHeight;
    element.paletteTileWidth = paletteTileWidth;
    element.isLoading = isLoading;
    element.label = label;
    element.name = name;
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
    element.colors = colors;
    element.hideColorInput = hideColorInput;
    element.opacity = opacity;
    element.messageWhenBadInput = messageWhenBadInput;
    element.tokens = tokens;
    element.messageWhenValueMissing = messageWhenValueMissing;
    element.groups = groups;
    return element;
};
