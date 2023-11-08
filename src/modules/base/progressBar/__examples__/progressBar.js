import Component from 'avonni/progressBar';

customElements.define(
    'ac-base-progress-bar',
    Component.CustomElementConstructor
);

export const ProgressBar = ({
    label,
    size,
    value,
    showPin,
    showValue,
    valuePosition,
    valuePrefix,
    valueSuffix,
    referenceLines,
    variant,
    theme,
    textured,
    thickness,
    orientation,
    pinAttributes
}) => {
    const element = document.createElement('ac-base-progress-bar');
    element.label = label;
    element.size = size;
    element.showPin = showPin;
    element.showValue = showValue;
    element.value = value;
    element.valuePosition = valuePosition;
    element.valuePrefix = valuePrefix;
    element.valueSuffix = valueSuffix;
    element.referenceLines = referenceLines;
    element.variant = variant;
    element.theme = theme;
    element.textured = textured;
    element.thickness = thickness;
    element.orientation = orientation;
    element.pinAttributes = pinAttributes;
    return element;
};
