import Component from 'avonni/inputPen';

customElements.define('ac-avonni-input-pen', Component.CustomElementConstructor);

export const InputPen = ({
    variant,
    label,
    fieldLevelHelp,
    value,
    color,
    size,
    mode,
    disabledButtons,
    disabled,
    readOnly,
    required,
    hideControls
}) => {

    const element = document.createElement('ac-avonni-input-pen');
    element.variant = variant;
    element.label = label;
    element.fieldLevelHelp = fieldLevelHelp;
    element.value = value;
    element.mode = mode;
    element.disabledButtons = disabledButtons;
    element.disabled = disabled;
    element.readOnly = readOnly;
    element.required = required;
    element.hideControls = hideControls;

    if (color) {
        element.color = color;
    }

    if (size) {
        element.size = size;
    }
    
    return element;
};