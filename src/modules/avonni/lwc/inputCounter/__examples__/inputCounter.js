import Component from 'avonni/inputCounter';

customElements.define(
    'ac-avonni-input-counter',
    Component.CustomElementConstructor
);

export const InputCounter = ({
    label,
    fieldLevelHelp,
    max,
    min,
    step,
    value,
    variant,
    disabled,
    readOnly,
    required,
    messageWhenBadInput,
    messageWhenPatternMismatch,
    messageWhenRangeOverflow,
    messageWhenRangeUnderflow,
    messageWhenStepMismatch,
    messageWhenValueMissing
}) => {
    const element = document.createElement('ac-avonni-input-counter');
    element.label = label;
    element.fieldLevelHelp = fieldLevelHelp;
    element.max = max;
    element.min = min;
    element.step = step;
    element.value = value;
    element.variant = variant;
    element.disabled = disabled;
    element.readOnly = readOnly;
    element.required = required;
    element.messageWhenBadInput = messageWhenBadInput;
    element.messageWhenPatternMismatch = messageWhenPatternMismatch;
    element.messageWhenRangeOverflow = messageWhenRangeOverflow;
    element.messageWhenRangeUnderflow = messageWhenRangeUnderflow;
    element.messageWhenStepMismatch = messageWhenStepMismatch;
    element.messageWhenValueMissing = messageWhenValueMissing;
    return element;
};
