import Component from 'avonni/visualPicker';

customElements.define(
    'ac-base-visual-picker',
    Component.CustomElementConstructor
);

export const VisualPicker = ({
    label,
    value,
    items,
    max,
    min,
    variant,
    type,
    size,
    ratio,
    hideCheckMark,
    disabled,
    required,
    messageWhenRangeOverflow,
    messageWhenRangeUnderflow,
    messageWhenValueMissing,
    name,
    imageAttributes,
    fieldAttributes,
    columnAttributes
}) => {
    const element = document.createElement('ac-base-visual-picker');
    element.label = label;
    element.value = value;
    element.items = items;
    element.max = max;
    element.min = min;
    element.variant = variant;
    element.type = type;
    element.size = size;
    element.ratio = ratio;
    element.hideCheckMark = hideCheckMark;
    element.disabled = disabled;
    element.required = required;
    element.messageWhenRangeOverflow = messageWhenRangeOverflow;
    element.messageWhenRangeUnderflow = messageWhenRangeUnderflow;
    element.messageWhenValueMissing = messageWhenValueMissing;
    element.name = name;
    element.imageAttributes = imageAttributes;
    element.fieldAttributes = fieldAttributes;
    element.columnAttributes = columnAttributes;
    return element;
};
