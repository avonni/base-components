import '@lwc/synthetic-shadow';
import Component from 'avonni/inputCounter';

customElements.define('ac-avonni-input-counter', Component.CustomElementConstructor);

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
    return element;
};