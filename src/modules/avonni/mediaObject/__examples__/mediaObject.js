import Component from '../../storybookWrappers/mediaObject/mediaObject';

customElements.define(
    'ac-avonni-media-object',
    Component.CustomElementConstructor
);

export const MediaObject = ({ verticalAlign, responsive, inline, size }) => {
    const element = document.createElement('ac-avonni-media-object');
    element.verticalAlign = verticalAlign;
    element.responsive = responsive;
    element.inline = inline;
    element.size = size;
    return element;
};
