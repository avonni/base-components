import { generateColors } from '../../utilsPrivate/colorUtils';
import Component from 'avonni/progressCircle';

customElements.define(
    'ac-base-progress-circle',
    Component.CustomElementConstructor
);

export const ProgressCircle = ({
    title,
    titlePosition,
    value,
    label,
    variant,
    color,
    direction,
    size,
    thickness,
    round
}) => {
    const element = document.createElement('ac-base-progress-circle');
    element.title = title;
    element.titlePosition = titlePosition;
    element.value = value;
    element.label = label;
    element.variant = variant;
    element.color = generateColors(color).hex;
    element.direction = direction;
    element.size = size;
    element.thickness = thickness;
    element.round = round;
    return element;
};
