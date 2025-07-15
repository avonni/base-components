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
    loadingStateAlternativeText,
    messageWhenValueMissing,
    options,
    orientation,
    orientationAttributes,
    readOnly,
    required,
    requiredAlternativeText,
    type,
    typeAttributes,
    value,
    variant
}) => {
    const element = document.createElement('ac-base-input-choice-set');
    element.checkPosition = checkPosition;
    element.disabled = disabled;
    element.fieldLevelHelp = fieldLevelHelp;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.isLoading = isLoading;
    element.isMultiSelect = isMultiSelect;
    element.label = label;
    element.messageWhenValueMissing = messageWhenValueMissing;
    element.options = options;
    element.orientation = orientation;
    element.orientationAttributes = orientationAttributes;
    element.readOnly = readOnly;
    element.required = required;
    element.requiredAlternativeText = requiredAlternativeText;
    element.type = type;
    element.typeAttributes = typeAttributes;
    element.value = value;
    element.variant = variant;
    return element;
};
