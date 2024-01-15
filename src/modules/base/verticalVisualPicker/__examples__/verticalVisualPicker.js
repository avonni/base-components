import Component from 'avonni/verticalVisualPicker';

customElements.define(
    'ac-base-vertical-visual-picker',
    Component.CustomElementConstructor
);

export const VerticalVisualPicker = ({
    disabled,
    enableInfiniteLoading,
    hideCheckMark,
    isLoading,
    items,
    label,
    loadMoreOffset,
    max,
    min,
    maxCount,
    messageWhenRangeOverflow,
    messageWhenRangeUnderflow,
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
    element.enableInfiniteLoading = enableInfiniteLoading;
    element.hideCheckMark = hideCheckMark;
    element.isLoading = isLoading;
    element.items = items;
    element.label = label;
    element.loadMoreOffset = loadMoreOffset;
    element.max = max;
    element.min = min;
    element.maxCount = maxCount;
    element.messageWhenRangeOverflow = messageWhenRangeOverflow;
    element.messageWhenRangeUnderflow = messageWhenRangeUnderflow;
    element.messageWhenValueMissing = messageWhenValueMissing;
    element.name = name;
    element.required = required;
    element.size = size;
    element.type = type;
    element.value = value;
    element.variant = variant;
    return element;
};
