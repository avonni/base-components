import Component from 'avonni/colorPicker';

customElements.define(
    'ac-base-color-picker',
    Component.CustomElementConstructor
);

export const ColorPicker = ({
    accessKey,
    cancelButtonLabel,
    colors,
    columns,
    customTabLabel,
    defaultTabLabel,
    disabled,
    doneButtonLabel,
    fieldLevelHelp,
    groups,
    hideClearIcon,
    hideColorInput,
    inline,
    isLoading,
    label,
    loadingStateAlternativeText,
    menuAlignment,
    menuIconName,
    menuIconSize,
    menuLabel,
    menuNubbin,
    menuVariant,
    messageWhenBadInput,
    messageWhenValueMissing,
    name,
    opacity,
    paletteHideOutline,
    paletteShowCheckmark,
    paletteTileHeight,
    paletteTileWidth,
    readOnly,
    required,
    requiredAlternativeText,
    tokens,
    tokensTabLabel,
    type,
    value,
    variant
}) => {
    const element = document.createElement('ac-base-color-picker');
    element.accessKey = accessKey;
    element.cancelButtonLabel = cancelButtonLabel;
    element.colors = colors;
    element.columns = columns;
    element.customTabLabel = customTabLabel;
    element.defaultTabLabel = defaultTabLabel;
    element.disabled = disabled;
    element.doneButtonLabel = doneButtonLabel;
    element.fieldLevelHelp = fieldLevelHelp;
    element.groups = groups;
    element.hideClearIcon = hideClearIcon;
    element.hideColorInput = hideColorInput;
    element.inline = inline;
    element.isLoading = isLoading;
    element.label = label;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.menuAlignment = menuAlignment;
    element.menuIconName = menuIconName;
    element.menuIconSize = menuIconSize;
    element.menuLabel = menuLabel;
    element.menuNubbin = menuNubbin;
    element.menuVariant = menuVariant;
    element.messageWhenBadInput = messageWhenBadInput;
    element.messageWhenValueMissing = messageWhenValueMissing;
    element.name = name;
    element.opacity = opacity;
    element.paletteHideOutline = paletteHideOutline;
    element.paletteShowCheckmark = paletteShowCheckmark;
    element.paletteTileHeight = paletteTileHeight;
    element.paletteTileWidth = paletteTileWidth;
    element.readOnly = readOnly;
    element.required = required;
    element.requiredAlternativeText = requiredAlternativeText;
    element.tokens = tokens;
    element.tokensTabLabel = tokensTabLabel;
    element.type = type;
    element.value = value;
    element.variant = variant;
    return element;
};
