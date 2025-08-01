import Component from 'avonni/inputCounter';

customElements.define(
    'ac-base-input-counter',
    Component.CustomElementConstructor
);

export const InputCounter = ({
    disabled,
    decrementButtonTitle,
    fieldLevelHelp,
    fractionDigits,
    incrementButtonTitle,
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
    requiredAlternativeText,
    step,
    type,
    value,
    variant
}) => {
    const element = document.createElement('ac-base-input-counter');
    element.disabled = disabled;
    element.decrementButtonTitle = decrementButtonTitle;
    element.fieldLevelHelp = fieldLevelHelp;
    element.fractionDigits = fractionDigits;
    element.incrementButtonTitle = incrementButtonTitle;
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
    element.requiredAlternativeText = requiredAlternativeText;
    element.step = step;
    element.type = type;
    element.value = value;
    element.variant = variant;
    return element;
};
