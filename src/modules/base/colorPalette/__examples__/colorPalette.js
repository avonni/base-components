import Component from 'base/colorPalette';

customElements.define(
    'ac-base-color-palette',
    Component.CustomElementConstructor
);

export const ColorPalette = ({
    disabled,
    readOnly,
    isLoading,
    colors,
    columns,
    tileWidth,
    tileHeight
}) => {
    const element = document.createElement('ac-base-color-palette');
    element.disabled = disabled;
    element.readOnly = readOnly;
    element.isLoading = isLoading;
    element.colors = colors;
    element.columns = columns;
    element.tileWidth = tileWidth;
    element.tileHeight = tileHeight;
    return element;
};
