import Component from '../inputChoiceSet';

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
    orientation,
    required,
    value,
    variant
}) => {
    const element = document.createElement('ac-base-input-choice-set');
    element.disabled = disabled;
    element.label = label;
    element.type = type;
    element.orientation = orientation;
    element.messageWhenValueMissing = messageWhenValueMissing;
    element.options = options;
    element.required = required;
    element.value = value;
    element.variant = variant;
    return element;
};
