import Component from '../../storybookWrappers/slider/maxHeightSlider/maxHeightSlider';

customElements.define('ac-max-y-slider', Component.CustomElementConstructor);

export const MaxHeightSlider = ({
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
    const element = document.createElement('ac-max-y-slider');
    element.disabled = disabled;
    element.disableSwap = disableSwap;
    element.hideMinMaxValues = hideMinMaxValues;
    element.hideTrack = hideTrack;
    element.label = label;
    element.max = max || 100;
    element.messageWhenRangeOverflow = messageWhenRangeOverflow;
    element.messageWhenRangeUnderflow = messageWhenRangeUnderflow;
    element.messageWhenStepMismatch = messageWhenStepMismatch;
    element.min = min || 0;
    element.minimumDistance = minimumDistance;
    element.showPin = showPin;
    element.showTickMarks = showTickMarks;
    element.size = size;
    element.step = step || 1;
    element.tickMarkStyle = tickMarkStyle;
    element.type = type;
    element.unit = unit;
    element.unitAttributes = unitAttributes;
    element.value = value;
    element.variant = variant;
    return element;
};
