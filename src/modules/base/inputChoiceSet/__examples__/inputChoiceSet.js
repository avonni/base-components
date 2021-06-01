import Component from 'avonni/inputChoiceSet';

customElements.define(
    'ac-base-input-choice-set',
    Component.CustomElementConstructor
);

export const InputChoiceSet = ({
    disabled,
    label,
    type,
    messageWhenValueMissing,
    options,
    required,
    value,
    variant
}) => {
    const element = document.createElement('ac-base-input-choice-set');
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
