

import Component from 'avonni/inputPen';

customElements.define('ac-base-input-pen', Component.CustomElementConstructor);

export const InputPen = ({
    variant,
    label,
    fieldLevelHelp,
    value,
    backgroundColor,
    color,
    showSignaturePad,
    size,
    mode,
    disabledButtons,
    disabled,
    readOnly,
    required,
    hideControls
}) => {
    const element = document.createElement('ac-base-input-pen');
    element.backgroundColor = backgroundColor;
    element.color = color;
    element.disabledButtons = disabledButtons;
    element.variant = variant;
    element.label = label;
    element.fieldLevelHelp = fieldLevelHelp;
    element.value = value;
    element.mode = mode;
    element.size = size;
    element.showSignaturePad = showSignaturePad;
    element.disabled = disabled;
    element.readOnly = readOnly;
    element.required = required;
    element.hideControls = hideControls;
    return element;
};
