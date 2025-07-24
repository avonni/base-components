import Component from 'avonni/rating';

customElements.define('ac-base-rating', Component.CustomElementConstructor);

export const Rating = ({
    disabled,
    fieldLevelHelp,
    iconName,
    iconSize,
    label,
    max,
    min,
    readOnly,
    required,
    selection,
    value,
    valueHidden,
    variant
}) => {
    const element = document.createElement('ac-base-rating');
    element.disabled = disabled;
    element.fieldLevelHelp = fieldLevelHelp;
    element.iconName = iconName;
    element.iconSize = iconSize;
    element.label = label;
    element.max = max || 5;
    element.min = min || 1;
    element.readOnly = readOnly;
    element.required = required;
    element.selection = selection;
    element.value = value;
    element.valueHidden = valueHidden;
    element.variant = variant;
    return element;
};
