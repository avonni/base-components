import Component from '../../storybookWrappers/mediaObject/doubleMediaObject';

customElements.define(
    'ac-base-double-media-object',
    Component.CustomElementConstructor
);

export const DoubleMediaObject = ({
    inline,
    responsive,
    size,
    verticalAlign
}) => {
    const element = document.createElement('ac-base-double-media-object');
    element.inline = inline;
    element.responsive = responsive;
    element.size = size;
    element.verticalAlign = verticalAlign;
    return element;
};
