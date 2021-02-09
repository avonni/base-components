import '@lwc/synthetic-shadow';
import Component from 'avonni/rating';

customElements.define('ac-avonni-rating', Component.CustomElementConstructor);

export const Rating = ({
    label,
    fieldLevelHelp,
    value,
    iconName,
    min,
    max,
    selection,
    disabled,
    readOnly,
    valueHidden
}) => {
    const element = document.createElement('ac-avonni-rating');
    element.label = label;
    element.fieldLevelHelp = fieldLevelHelp;
    element.value = value;
    element.iconName = iconName;
    element.min = min || 1;
    element.max = max || 5;
    element.selection = selection;
    element.disabled = disabled;
    element.readOnly = readOnly;
    element.valueHidden = valueHidden;
    return element;
};