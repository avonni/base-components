import '@lwc/synthetic-shadow';
import buildAndRegisterCustomElement from '../../../../../.storybook/utils/build-custom-element';
import Component from 'avonni/colorPalette';

buildAndRegisterCustomElement('avonni-color-palette', Component);

export const ColorPalette = ({
    disabled,
    readOnly,
    isLoading,
    colors,
    columns,
    tileWidth,
    tileHeight
}) => {
    const element = document.createElement('avonni-color-palette');
    element.disabled = disabled;
    element.readOnly = readOnly;
    element.isLoading = isLoading;
    element.colors = colors;
    element.columns = columns;
    element.tileWidth = tileWidth;
    element.tileHeight = tileHeight;
    return element;
};