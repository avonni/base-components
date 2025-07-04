import Component from 'avonni/range';

customElements.define('ac-base-range', Component.CustomElementConstructor);

export const Range = ({
    disabled,
    label,
    max,
    messageWhenBadInput,
    messageWhenPatternMismatch,
    messageWhenRangeOverflow,
    messageWhenRangeUnderflow,
    messageWhenStepMismatch,
    messageWhenTooLong,
    messageWhenTypeMismatch,
    messageWhenValueMissing,
    min,
    pin,
    size,
    step,
    type,
    unit,
    unitAttributes,
    valueLower,
    valueUpper,
    variant
}) => {
    const element = document.createElement('ac-base-range');
    element.disabled = disabled;
    element.label = label;
    element.max = max || 100;
    element.messageWhenBadInput = messageWhenBadInput;
    element.messageWhenPatternMismatch = messageWhenPatternMismatch;
    element.messageWhenRangeOverflow = messageWhenRangeOverflow;
    element.messageWhenRangeUnderflow = messageWhenRangeUnderflow;
    element.messageWhenStepMismatch = messageWhenStepMismatch;
    element.messageWhenTooLong = messageWhenTooLong;
    element.messageWhenTypeMismatch = messageWhenTypeMismatch;
    element.messageWhenValueMissing = messageWhenValueMissing;
    element.min = min || 0;
    element.pin = pin;
    element.size = size;
    element.step = step || 1;
    element.type = type;
    element.unit = unit;
    element.unitAttributes = unitAttributes || [];
    element.valueLower = valueLower;
    element.valueUpper = valueUpper;
    element.variant = variant;
    return element;
};
