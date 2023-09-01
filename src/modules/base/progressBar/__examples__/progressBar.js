

import Component from 'avonni/progressBar';

customElements.define(
    'ac-base-progress-bar',
    Component.CustomElementConstructor
);

export const ProgressBar = ({
    label,
    size,
    value,
    showValue,
    valuePosition,
    valuePrefix,
    valueSuffix,
    referenceLines,
    variant,
    theme,
    textured,
    thickness,
    orientation
}) => {
    const element = document.createElement('ac-base-progress-bar');
    element.label = label;
    element.size = size;
    element.value = value;
    element.showValue = showValue;
    element.valuePosition = valuePosition;
    element.valuePrefix = valuePrefix;
    element.valueSuffix = valueSuffix;
    element.referenceLines = referenceLines;
    element.variant = variant;
    element.theme = theme;
    element.textured = textured;
    element.thickness = thickness;
    element.orientation = orientation;
    return element;
};
