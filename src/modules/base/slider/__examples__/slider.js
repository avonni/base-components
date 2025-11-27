import Component from '../slider';

customElements.define('ac-slider', Component.CustomElementConstructor);

export const Slider = ({
    alternativeText,
    disabled,
    disableSwap,
    hideMinMaxValues,
    hideTrack,
    isPercentage,
    label,
    max,
    messageWhenRangeOverflow,
    messageWhenRangeUnderflow,
    messageWhenStepMismatch,
    min,
    minimumDistance,
    showPin,
    showTickMarks,
    size,
    step,
    tickMarkStyle,
    type,
    unit,
    unitAttributes,
    value,
    variant
}) => {
    const element = document.createElement('ac-slider');
    element.alternativeText = alternativeText;
    element.disabled = disabled;
    element.disableSwap = disableSwap;
    element.hideMinMaxValues = hideMinMaxValues;
    element.hideTrack = hideTrack;
    element.isPercentage = isPercentage;
    element.label = label;
    element.max = max;
    element.messageWhenRangeOverflow = messageWhenRangeOverflow;
    element.messageWhenRangeUnderflow = messageWhenRangeUnderflow;
    element.messageWhenStepMismatch = messageWhenStepMismatch;
    element.min = min;
    element.minimumDistance = minimumDistance;
    element.showPin = showPin;
    element.showTickMarks = showTickMarks;
    element.size = size;
    element.step = step;
    element.tickMarkStyle = tickMarkStyle;
    element.type = type;
    element.unit = unit;
    element.unitAttributes = unitAttributes;
    element.value = value;
    element.variant = variant;
    return element;
};
