import Component from '../../storybookWrappers/separator/separator';

customElements.define('ac-base-separator', Component.CustomElementConstructor);

export const Separator = ({
    alignContent,
    iconName,
    iconPosition,
    iconSize,
    iconSrc,
    iconVariant,
    label,
    orientation
}) => {
    const element = document.createElement('ac-base-separator');
    element.alignContent = alignContent;
    element.iconName = iconName;
    element.iconPosition = iconPosition;
    element.iconSize = iconSize;
    element.iconSrc = iconSrc;
    element.iconVariant = iconVariant;
    element.label = label;
    element.orientation = orientation;
    return element;
};
