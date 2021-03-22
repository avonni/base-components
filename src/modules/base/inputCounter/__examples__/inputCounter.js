import Component from 'base/inputCounter';

customElements.define('ac-base-input-counter', Component.CustomElementConstructor);

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
    required
}) => {
    const element = document.createElement('ac-base-input-counter');
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
    return element;
};