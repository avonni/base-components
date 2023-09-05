import Component from 'avonni/verticalVisualPicker';

customElements.define(
    'ac-base-vertical-visual-picker',
    Component.CustomElementConstructor
);

export const VerticalVisualPicker = ({
    disabled,
    hideCheckMark,
    items,
    label,
    messageWhenValueMissing,
    name,
    required,
    size,
    type,
    value,
    variant
}) => {
    const element = document.createElement('ac-base-vertical-visual-picker');
    element.disabled = disabled;
    element.hideCheckMark = hideCheckMark;
    element.items = items;
    element.label = label;
    element.messageWhenValueMissing = messageWhenValueMissing;
    element.name = name;
    element.required = required;
    element.size = size;
    element.type = type;
    element.value = value;
    element.variant = variant;
    return element;
};
