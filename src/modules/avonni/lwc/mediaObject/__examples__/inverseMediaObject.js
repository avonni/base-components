import Component from '../../storybookWrappers/mediaObject/inverseMediaObject';

customElements.define(
    'ac-avonni-inverse-media-object',
    Component.CustomElementConstructor
);

export const InverseMediaObject = ({
    verticalAlign,
    responsive,
    inline,
    size
}) => {
    const element = document.createElement('ac-avonni-inverse-media-object');
    element.verticalAlign = verticalAlign;
    element.responsive = responsive;
    element.inline = inline;
    element.size = size;
    return element;
};
