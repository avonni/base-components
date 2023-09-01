

import Component from '../../storybookWrappers/card/cardCenterBottom';

customElements.define(
    'ac-card-center-and-bottom',
    Component.CustomElementConstructor
);

export const CardCenterBottom = ({
    iconName,
    mediaPosition,
    mediaSrc,
    title
}) => {
    const element = document.createElement('ac-card-center-and-bottom');
    element.iconName = iconName;
    element.mediaPosition = mediaPosition;
    element.mediaSrc = mediaSrc;
    element.title = title;
    return element;
};
