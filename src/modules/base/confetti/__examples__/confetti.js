import Component from '../../storybookWrappers/confetti/base';

customElements.define('ac-base-confetti', Component.CustomElementConstructor);

export const Confetti = ({
    colors,
    name,
    originX,
    originY,
    variant,
    zIndex
}) => {
    const element = document.createElement('ac-base-confetti');
    element.colors = colors;
    element.name = name;
    element.originX = originX;
    element.originY = originY;
    element.variant = variant;
    element.zIndex = zIndex;
    return element;
};
