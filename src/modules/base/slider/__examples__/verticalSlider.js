import Component from '../../storybookWrappers/slider/verticalSlider/verticalSlider';

customElements.define('ac-vertical-slider', Component.CustomElementConstructor);

export const VerticalSlider = ({
    label,
    size,
    type,
    variant,
    unit,
    unitAttributes,
    value,
    showPin,
    min,
    max,
    step,
    disabled,
    tickMarkStyle,
    showTickMarks,
    disableSwap,
    hideMinMaxValues,
    hideTrack,
    minimumDistance,
    messageWhenRangeOverflow,
    messageWhenRangeUnderflow,
    messageWhenStepMismatch,
    alternativeText
}) => {
    const element = document.createElement('ac-vertical-slider');
    element.label = label;
    element.size = size;
    element.type = type;
    element.variant = variant;
    element.unit = unit;
    element.unitAttributes = unitAttributes;
    element.tickMarkStyle = tickMarkStyle;
    element.showTickMarks = showTickMarks;
    element.disableSwap = disableSwap;
    element.hideMinMaxValues = hideMinMaxValues;
    element.hideTrack = hideTrack;
    element.minimumDistance = minimumDistance;
    element.value = value;
    element.showPin = showPin;
    element.min = min;
    element.max = max;
    element.step = step;
    element.disabled = disabled;
    element.messageWhenRangeOverflow = messageWhenRangeOverflow;
    element.messageWhenRangeUnderflow = messageWhenRangeUnderflow;
    element.messageWhenStepMismatch = messageWhenStepMismatch;
    element.alternativeText = alternativeText;
    return element;
};
