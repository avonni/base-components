import Component from '../../storybookWrappers/mediaObject/mediaObject';

customElements.define(
    'ac-base-media-object',
    Component.CustomElementConstructor
);

export const MediaObject = ({ inline, responsive, size, verticalAlign }) => {
    const element = document.createElement('ac-base-media-object');
    element.inline = inline;
    element.responsive = responsive;
    element.size = size;
    element.verticalAlign = verticalAlign;
    return element;
};
