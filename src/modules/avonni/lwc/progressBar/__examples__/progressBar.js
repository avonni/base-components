import Component from 'avonni/progressBar';

customElements.define(
    'ac-avonni-progress-bar',
    Component.CustomElementConstructor
);

export const ProgressBar = ({
    label,
    size,
    value,
    showValue,
    valuePosition,
    valueLabel,
    badges,
    variant,
    theme,
    textured,
    thickness,
    orientation
}) => {
    const element = document.createElement('ac-avonni-progress-bar');
    element.label = label;
    element.size = size;
    element.value = value;
    element.showValue = showValue;
    element.valuePosition = valuePosition;
    element.valueLabel = valueLabel;
    element.badges = badges;
    element.variant = variant;
    element.theme = theme;
    element.textured = textured;
    element.thickness = thickness;
    element.orientation = orientation;
    return element;
};
