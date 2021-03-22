import Component from 'base/confetti';

customElements.define('ac-base-confetti', Component.CustomElementConstructor);

export const Confetti = ({
    variant,
    colors,
    originX,
    originY
}) => {
    const element = document.createElement('ac-base-confetti');
    element.variant = variant;
    element.colors = colors;
    element.originX = originX;
    element.originY = originY;
    return element;
};