

import Component from '../../storybookWrappers/separator/separator';

customElements.define('ac-base-separator', Component.CustomElementConstructor);

export const Separator = ({
    label,
    alignContent,
    iconName,
    iconPosition,
    iconSize,
    orientation
}) => {
    const element = document.createElement('ac-base-separator');
    element.label = label;
    element.alignContent = alignContent;
    element.iconName = iconName;
    element.iconPosition = iconPosition;
    element.iconSize = iconSize;
    element.orientation = orientation;
    return element;
};
