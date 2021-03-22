import Component from '../../storybookWrappers/mediaObject/mediaObject';

customElements.define(
    'ac-base-media-object',
    Component.CustomElementConstructor
);

export const MediaObject = ({ verticalAlign, responsive, inline, size }) => {
    const element = document.createElement('ac-base-media-object');
    element.verticalAlign = verticalAlign;
    element.responsive = responsive;
    element.inline = inline;
    element.size = size;
    return element;
};
