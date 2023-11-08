import Component from 'avonni/inputCounter';

customElements.define(
    'ac-base-input-counter',
    Component.CustomElementConstructor
);

export const InputCounter = ({
    disabled,
    fieldLevelHelp,
    fractionDigits,
    label,
    max,
    messageWhenBadInput,
    messageWhenPatternMismatch,
    messageWhenRangeOverflow,
    messageWhenRangeUnderflow,
    messageWhenStepMismatch,
    messageWhenValueMissing,
    min,
    readOnly,
    required,
    step,
    type,
    value,
    variant
}) => {
    const element = document.createElement('ac-base-input-counter');
    element.disabled = disabled;
    element.fieldLevelHelp = fieldLevelHelp;
    element.fractionDigits = fractionDigits;
    element.label = label;
    element.max = max;
    element.messageWhenBadInput = messageWhenBadInput;
    element.messageWhenPatternMismatch = messageWhenPatternMismatch;
    element.messageWhenRangeOverflow = messageWhenRangeOverflow;
    element.messageWhenRangeUnderflow = messageWhenRangeUnderflow;
    element.messageWhenStepMismatch = messageWhenStepMismatch;
    element.messageWhenValueMissing = messageWhenValueMissing;
    element.min = min;
    element.readOnly = readOnly;
    element.required = required;
    element.step = step;
    element.type = type;
    element.value = value;
    element.variant = variant;
    return element;
};
