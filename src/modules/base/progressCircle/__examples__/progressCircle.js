import { generateColors } from '../../utilsPrivate/colorUtils'
import Component from 'base/progressCircle';

customElements.define('ac-base-progress-circle', Component.CustomElementConstructor);

export const ProgressCircle = ({
    label,
    value,
    variant,
    color,
    direction,
    size
}) => {
    const element = document.createElement('ac-base-progress-circle');
    element.label = label;
    element.value = value;
    element.variant = variant;
    element.color = generateColors(color).hex;
    element.direction = direction;
    element.size = size;
    return element;
};