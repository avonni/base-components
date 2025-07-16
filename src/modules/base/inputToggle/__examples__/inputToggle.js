import Component from 'avonni/inputToggle';

customElements.define(
    'ac-base-input-toggle',
    Component.CustomElementConstructor
);

export const InputToggle = ({
    accessKey,
    ariaControls,
    ariaDescribedBy,
    ariaLabel,
    ariaLabelledBy,
    checked,
    disabled,
    fieldLevelHelp,
    hideMark,
    label,
    messageToggleActive,
    messageToggleInactive,
    messageWhenValueMissing,
    name,
    readOnly,
    required,
    requiredAlternativeText,
    size,
    value,
    variant
}) => {
    const element = document.createElement('ac-base-input-toggle');
    element.accessKey = accessKey;
    element.ariaControls = ariaControls;
    element.ariaDescribedBy = ariaDescribedBy;
    element.ariaLabel = ariaLabel;
    element.ariaLabelledBy = ariaLabelledBy;
    element.checked = checked;
    element.disabled = disabled;
    element.fieldLevelHelp = fieldLevelHelp;
    element.hideMark = hideMark;
    element.label = label;
    element.messageToggleActive = messageToggleActive;
    element.messageToggleInactive = messageToggleInactive;
    element.messageWhenValueMissing = messageWhenValueMissing;
    element.name = name;
    element.readOnly = readOnly;
    element.required = required;
    element.requiredAlternativeText = requiredAlternativeText;
    element.size = size;
    element.value = value;
    element.variant = variant;
    return element;
};
