import Component from '../../storybookWrappers/blockquote/blockquote';

customElements.define('ac-base-blockquote', Component.CustomElementConstructor);

export const Blockquote = ({
    title,
    iconName,
    variant,
    iconPosition,
    iconSize
}) => {
    const element = document.createElement('ac-base-blockquote');
    element.title = title;
    element.iconName = iconName;
    element.variant = variant;
    element.iconPosition = iconPosition;
    element.iconSize = iconSize;
    return element;
};