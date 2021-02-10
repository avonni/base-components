import Component from 'avonni/colorPalette';

customElements.define('ac-avonni-color-palette', Component.CustomElementConstructor);

export const ColorPalette = ({
    disabled,
    readOnly,
    isLoading,
    colors,
    columns,
    tileWidth,
    tileHeight
}) => {
    const element = document.createElement('ac-avonni-color-palette');
    element.disabled = disabled;
    element.readOnly = readOnly;
    element.isLoading = isLoading;
    element.colors = colors;
    element.columns = columns;
    element.tileWidth = tileWidth;
    element.tileHeight = tileHeight;
    return element;
};