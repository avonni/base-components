

import Component from 'avonni/inputData';

customElements.define('ac-base-input-data', Component.CustomElementConstructor);

export const InputData = ({
    checked,
    disabled,
    label,
    latitude,
    longitude,
    name,
    placeholder,
    readOnly,
    required,
    type,
    value,
    variant
}) => {
    const element = document.createElement('ac-base-input-data');
    element.checked = checked;
    element.disabled = disabled;
    element.label = label;
    element.latitude = latitude;
    element.longitude = longitude;
    element.name = name;
    element.placeholder = placeholder;
    element.readOnly = readOnly;
    element.required = required;
    element.type = type;
    element.value = value;
    element.variant = variant;
    return element;
};
