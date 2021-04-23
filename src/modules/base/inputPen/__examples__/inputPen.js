import Component from 'avonni/inputPen';

customElements.define('ac-base-input-pen', Component.CustomElementConstructor);

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
    hideControls,
    invalid
}) => {
    const element = document.createElement('ac-base-input-pen');
    element.variant = variant;
    element.label = label;
    element.fieldLevelHelp = fieldLevelHelp;
    element.value = value;
    element.mode = mode;
    element.disabled = disabled;
    element.readOnly = readOnly;
    element.required = required;
    element.hideControls = hideControls;
    element.invalid = invalid;

    if (disabledButtons) {
        element.disabledButtons = disabledButtons;
    }

    if (color) {
        element.color = color;
    }

    if (size) {
        element.size = size;
    }

    return element;
};
