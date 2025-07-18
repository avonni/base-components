import Component from '../../storybookWrappers/card/cardTopMedia';

customElements.define('ac-card-top-media', Component.CustomElementConstructor);

export const CardTopMedia = ({
    iconName,
    mediaAlternativeText,
    mediaPosition,
    mediaSrc,
    title
}) => {
    const element = document.createElement('ac-card-top-media');
    element.iconName = iconName;
    element.mediaAlternativeText = mediaAlternativeText;
    element.mediaPosition = mediaPosition;
    element.mediaSrc = mediaSrc;
    element.title = title;
    return element;
};
