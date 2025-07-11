import Component from 'avonni/colorPalette';

customElements.define(
    'ac-base-color-palette',
    Component.CustomElementConstructor
);

export const ColorPalette = ({
    colors,
    columns,
    disabled,
    groups,
    hideOutline,
    isLoading,
    loadingStateAlternativeText,
    readOnly,
    showCheckmark,
    tileHeight,
    tileWidth,
    value,
    variant
}) => {
    const element = document.createElement('ac-base-color-palette');
    element.colors = colors;
    element.columns = columns;
    element.disabled = disabled;
    element.groups = groups;
    element.hideOutline = hideOutline;
    element.isLoading = isLoading;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.readOnly = readOnly;
    element.showCheckmark = showCheckmark;
    element.tileHeight = tileHeight;
    element.tileWidth = tileWidth;
    element.value = value;
    element.variant = variant;
    return element;
};
