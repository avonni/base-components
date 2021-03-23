import { generateColors } from '../../utilsPrivate/colorUtils';
import Component from 'base/progressCircle';

customElements.define(
    'ac-base-progress-circle',
    Component.CustomElementConstructor
);

export const ProgressCircle = ({
    title,
    value,
    variant,
    color,
    direction,
    size,
    thickness
}) => {
    const element = document.createElement('ac-base-progress-circle');
    element.title = title;
    element.value = value;
    element.variant = variant;
    element.color = generateColors(color).hex;
    element.direction = direction;
    element.size = size;
    element.thickness = thickness;
    return element;
};
