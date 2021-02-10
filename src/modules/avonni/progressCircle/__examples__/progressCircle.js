import { generateColors } from '../../utilsPrivate/colorUtils'
import Component from 'avonni/progressCircle';

customElements.define('ac-avonni-progress-circle', Component.CustomElementConstructor);

export const ProgressCircle = ({
    label,
    value,
    variant,
    color,
    direction,
    size
}) => {
    const element = document.createElement('ac-avonni-progress-circle');
    element.label = label;
    element.value = value;
    element.variant = variant;
    element.color = generateColors(color).hex;
    element.direction = direction;
    element.size = size;
    return element;
};