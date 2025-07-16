import Component from '../../storybookWrappers/mediaObject/inverseMediaObject';

customElements.define(
    'ac-base-inverse-media-object',
    Component.CustomElementConstructor
);

export const InverseMediaObject = ({
    inline,
    responsive,
    size,
    verticalAlign
}) => {
    const element = document.createElement('ac-base-inverse-media-object');
    element.inline = inline;
    element.responsive = responsive;
    element.size = size;
    element.verticalAlign = verticalAlign;
    return element;
};
