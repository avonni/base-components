

import Component from '../../storybookWrappers/card/card';

customElements.define('ac-card', Component.CustomElementConstructor);

export const Card = ({ iconName, mediaPosition, mediaSrc, title }) => {
    const element = document.createElement('ac-card');
    element.iconName = iconName;
    element.mediaPosition = mediaPosition;
    element.mediaSrc = mediaSrc;
    element.title = title;
    return element;
};
