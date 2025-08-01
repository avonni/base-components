import Component from '../../storybookWrappers/slider/verticalSlider/verticalSlider';

customElements.define('ac-vertical-slider', Component.CustomElementConstructor);

export const VerticalSlider = ({
    alternativeText,
    disabled,
    disableSwap,
    hideMinMaxValues,
    hideTrack,
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
    const element = document.createElement('ac-vertical-slider');
    element.alternativeText = alternativeText;
    element.disabled = disabled;
    element.disableSwap = disableSwap;
    element.hideMinMaxValues = hideMinMaxValues;
    element.hideTrack = hideTrack;
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
