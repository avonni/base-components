import Component from '../../storybookWrappers/mediaObject/doubleMediaObject';

customElements.define(
    'ac-avonni-double-media-object',
    Component.CustomElementConstructor
);

export const DoubleMediaObject = ({
    verticalAlign,
    responsive,
    inline,
    size
}) => {
    const element = document.createElement('ac-avonni-double-media-object');
    element.verticalAlign = verticalAlign;
    element.responsive = responsive;
    element.inline = inline;
    element.size = size;
    return element;
};
