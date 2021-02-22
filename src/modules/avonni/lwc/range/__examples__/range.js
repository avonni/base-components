import Component from 'c/range';

customElements.define('ac-avonni-range', Component.CustomElementConstructor);

export const Range = ({
    label,
    size,
    type,
    variant,
    unit,
    unitAttributes,
    valueLower,
    valueUpper,
    pin,
    min,
    max,
    step,
    disabled,
    messageWhenRangeOverflow,
    messageWhenRangeUnderflow,
    messageWhenStepMismatch,
    messageWhenValueMissing,
    messageWhenTooLong,
    messageWhenBadInput,
    messageWhenPatternMismatch,
    messageWhenTypeMismatch
}) => {
    const element = document.createElement('ac-avonni-range');
    element.label = label;
    element.size = size;
    element.type = type;
    element.variant = variant;
    element.unit = unit;
    element.unitAttributes = unitAttributes || [];
    element.valueLower = valueLower;
    element.valueUpper = valueUpper;
    element.pin = pin;
    element.min = min || 0;
    element.max = max || 100;
    element.step = step || 1;
    element.disabled = disabled;
    element.messageWhenRangeOverflow = messageWhenRangeOverflow;
    element.messageWhenRangeUnderflow = messageWhenRangeUnderflow;
    element.messageWhenStepMismatch = messageWhenStepMismatch;
    element.messageWhenValueMissing = messageWhenValueMissing;
    element.messageWhenTooLong = messageWhenTooLong;
    element.messageWhenBadInput = messageWhenBadInput;
    element.messageWhenPatternMismatch = messageWhenPatternMismatch;
    element.messageWhenTypeMismatch = messageWhenTypeMismatch;
    return element;
};