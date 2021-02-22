import Component from 'avonni/confetti';

customElements.define('ac-avonni-confetti', Component.CustomElementConstructor);

export const Confetti = ({
    variant,
    colors,
    originX,
    originY
}) => {
    const element = document.createElement('ac-avonni-confetti');
    element.variant = variant;
    element.colors = colors;
    element.originX = originX;
    element.originY = originY;
    return element;
};