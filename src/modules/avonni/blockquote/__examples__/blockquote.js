import Component from '../../storybookWrappers/blockquote/blockquote';

customElements.define('ac-avonni-blockquote', Component.CustomElementConstructor);

export const Blockquote = ({
    title,
    iconName,
    variant,
    iconPosition,
    iconSize
}) => {
    const element = document.createElement('ac-avonni-blockquote');
    element.title = title;
    element.iconName = iconName;
    element.variant = variant;
    element.iconPosition = iconPosition;
    element.iconSize = iconSize;
    return element;
};