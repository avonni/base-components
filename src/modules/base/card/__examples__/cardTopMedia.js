

import Component from '../../storybookWrappers/card/cardTopMedia';

customElements.define('ac-card-top-media', Component.CustomElementConstructor);

export const CardTopMedia = ({ iconName, mediaPosition, mediaSrc, title }) => {
    const element = document.createElement('ac-card-top-media');
    element.iconName = iconName;
    element.mediaPosition = mediaPosition;
    element.mediaSrc = mediaSrc;
    element.title = title;
    return element;
};
