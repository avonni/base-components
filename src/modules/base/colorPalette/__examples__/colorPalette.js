

import Component from 'avonni/colorPalette';

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
    groups,
    showCheckmark,
    hideOutline,
    tileWidth,
    tileHeight,
    value,
    variant
}) => {
    const element = document.createElement('ac-base-color-palette');
    element.disabled = disabled;
    element.readOnly = readOnly;
    element.isLoading = isLoading;
    element.colors = colors;
    element.columns = columns;
    element.groups = groups;
    element.showCheckmark = showCheckmark;
    element.hideOutline = hideOutline;
    element.tileWidth = tileWidth;
    element.tileHeight = tileHeight;
    element.value = value;
    element.variant = variant;
    return element;
};
