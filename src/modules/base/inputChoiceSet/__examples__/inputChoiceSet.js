

import Component from '../inputChoiceSet';

customElements.define(
    'ac-base-input-choice-set',
    Component.CustomElementConstructor
);

export const InputChoiceSet = ({
    checkPosition,
    disabled,
    fieldLevelHelp,
    isLoading,
    isMultiSelect,
    label,
    messageWhenValueMissing,
    options,
    orientation,
    orientationAttributes,
    readOnly,
    required,
    type,
    typeAttributes,
    value,
    variant
}) => {
    const element = document.createElement('ac-base-input-choice-set');
    element.checkPosition = checkPosition;
    element.disabled = disabled;
    element.fieldLevelHelp = fieldLevelHelp;
    element.isLoading = isLoading;
    element.isMultiSelect = isMultiSelect;
    element.label = label;
    element.messageWhenValueMissing = messageWhenValueMissing;
    element.options = options;
    element.orientation = orientation;
    element.orientationAttributes = orientationAttributes;
    element.readOnly = readOnly;
    element.required = required;
    element.type = type;
    element.typeAttributes = typeAttributes;
    element.value = value;
    element.variant = variant;
    return element;
};
