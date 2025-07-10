import Component from '../../storybookWrappers/blockquote/blockquote';

customElements.define('ac-base-blockquote', Component.CustomElementConstructor);

export const Blockquote = ({
    iconName,
    iconPosition,
    iconSize,
    title,
    variant
}) => {
    const element = document.createElement('ac-base-blockquote');
    element.iconName = iconName;
    element.iconPosition = iconPosition;
    element.iconSize = iconSize;
    element.title = title;
    element.variant = variant;
    return element;
};
