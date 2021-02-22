import Component from 'c/checkboxGroup';

customElements.define('ac-avonni-checkbox-group', Component.CustomElementConstructor);

export const CheckboxGroup = ({ 
    disabled,
    label,
    type,
    messageWhenValueMissing,
    options,
    required,
    value,
    variant
}) => {
    const element = document.createElement('ac-avonni-checkbox-group');
    element.disabled = disabled;
    element.label = label;
    element.type = type;
    element.messageWhenValueMissing = messageWhenValueMissing;
    element.options = options;
    element.required = required;
    element.value = value;
    element.variant = variant;
    return element;
};