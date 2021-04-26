import Component from 'avonni/visualPicker';

customElements.define(
    'ac-base-visual-picker',
    Component.CustomElementConstructor
);

export const VisualPicker = ({
    label,
    value,
    items,
    variant,
    type,
    size,
    ratio,
    hideCheckMark,
    hideBorder,
    disabled,
    required,
    messageWhenValueMissing
}) => {
    const element = document.createElement('ac-base-visual-picker');
    element.label = label;
    element.value = value;
    element.items = items;
    element.variant = variant;
    element.type = type;
    element.size = size;
    element.ratio = ratio;
    element.hideCheckMark = hideCheckMark;
    element.hideBorder = hideBorder;
    element.disabled = disabled;
    element.required = required;
    element.messageWhenValueMissing = messageWhenValueMissing;
    return element;
};
