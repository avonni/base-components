import Component from 'avonni/inputPen';

customElements.define('ac-base-input-pen', Component.CustomElementConstructor);

export const InputPen = ({
    backgroundColor,
    backgroundButtonAlternativeText,
    clearButtonAlternativeText,
    color,
    colorButtonAlternativeText,
    disabled,
    disabledButtons,
    downloadButtonAlternativeText,
    drawButtonAlternativeText,
    eraseButtonAlternativeText,
    fieldLevelHelp,
    hideControls,
    inkButtonAlternativeText,
    label,
    mode,
    paintButtonAlternativeText,
    readOnly,
    redoButtonAlternativeText,
    required,
    requiredAlternativeText,
    showSignaturePad,
    size,
    sizeButtonAlternativeText,
    undoButtonAlternativeText,
    value,
    variant
}) => {
    const element = document.createElement('ac-base-input-pen');
    element.backgroundColor = backgroundColor;
    element.backgroundButtonAlternativeText = backgroundButtonAlternativeText;
    element.clearButtonAlternativeText = clearButtonAlternativeText;
    element.color = color;
    element.colorButtonAlternativeText = colorButtonAlternativeText;
    element.disabled = disabled;
    element.disabledButtons = disabledButtons;
    element.downloadButtonAlternativeText = downloadButtonAlternativeText;
    element.drawButtonAlternativeText = drawButtonAlternativeText;
    element.eraseButtonAlternativeText = eraseButtonAlternativeText;
    element.fieldLevelHelp = fieldLevelHelp;
    element.hideControls = hideControls;
    element.inkButtonAlternativeText = inkButtonAlternativeText;
    element.label = label;
    element.mode = mode;
    element.paintButtonAlternativeText = paintButtonAlternativeText;
    element.readOnly = readOnly;
    element.redoButtonAlternativeText = redoButtonAlternativeText;
    element.required = required;
    element.requiredAlternativeText = requiredAlternativeText;
    element.showSignaturePad = showSignaturePad;
    element.size = size;
    element.sizeButtonAlternativeText = sizeButtonAlternativeText;
    element.undoButtonAlternativeText = undoButtonAlternativeText;
    element.value = value;
    element.variant = variant;
    return element;
};
