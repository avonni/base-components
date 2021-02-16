import Component from 'avonni/inputToggle';

customElements.define(
    'ac-avonni-input-toggle',
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
    label,
    messageToggleActive,
    messageToggleInactive,
    messageWhenValueMissing,
    name,
    readOnly,
    required,
    size,
    value
}) => {
    const element = document.createElement('ac-avonni-input-toggle');
    element.accessKey = accessKey;
    element.ariaControls = ariaControls;
    element.ariaDescribedBy = ariaDescribedBy;
    element.ariaLabel = ariaLabel;
    element.ariaLabelledBy = ariaLabelledBy;
    element.checked = checked;
    element.disabled = disabled;
    element.label = label;
    element.messageToggleActive = messageToggleActive;
    element.messageToggleInactive = messageToggleInactive;
    element.messageWhenValueMissing = messageWhenValueMissing;
    element.name = name;
    element.readOnly = readOnly;
    element.required = required;
    element.size = size;
    element.value = value;
    return element;
};
