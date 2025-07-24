import Component from 'avonni/progressBar';

customElements.define(
    'ac-base-progress-bar',
    Component.CustomElementConstructor
);

export const ProgressBar = ({
    alternativeText,
    isLoading,
    label,
    loadingStateAlternativeText,
    orientation,
    pinAttributes,
    referenceLines,
    showPin,
    showValue,
    size,
    textured,
    theme,
    thickness,
    value,
    valuePosition,
    valuePrefix,
    valueSuffix,
    variant
}) => {
    const element = document.createElement('ac-base-progress-bar');
    element.alternativeText = alternativeText;
    element.isLoading = isLoading;
    element.label = label;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.orientation = orientation;
    element.pinAttributes = pinAttributes;
    element.referenceLines = referenceLines;
    element.showPin = showPin;
    element.showValue = showValue;
    element.size = size;
    element.textured = textured;
    element.theme = theme;
    element.thickness = thickness;
    element.value = value;
    element.valuePosition = valuePosition;
    element.valuePrefix = valuePrefix;
    element.valueSuffix = valueSuffix;
    element.variant = variant;
    return element;
};
