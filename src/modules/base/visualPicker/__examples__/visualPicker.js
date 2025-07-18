import Component from 'avonni/visualPicker';

customElements.define(
    'ac-base-visual-picker',
    Component.CustomElementConstructor
);

export const VisualPicker = ({
    collapsedShowMoreButton,
    columnAttributes,
    disabled,
    enableInfiniteLoading,
    expandedShowMoreButton,
    fieldAttributes,
    hideCheckMark,
    imageAttributes,
    isLoading,
    items,
    label,
    loadingStateAlternativeText,
    loadMoreOffset,
    max,
    maxCount,
    messageWhenRangeOverflow,
    messageWhenRangeUnderflow,
    messageWhenValueMissing,
    min,
    name,
    ratio,
    required,
    requiredAlternativeText,
    size,
    type,
    value,
    variant
}) => {
    const element = document.createElement('ac-base-visual-picker');
    element.collapsedShowMoreButton = collapsedShowMoreButton;
    element.columnAttributes = columnAttributes;
    element.disabled = disabled;
    element.enableInfiniteLoading = enableInfiniteLoading;
    element.expandedShowMoreButton = expandedShowMoreButton;
    element.fieldAttributes = fieldAttributes;
    element.hideCheckMark = hideCheckMark;
    element.imageAttributes = imageAttributes;
    element.isLoading = isLoading;
    element.items = items;
    element.label = label;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.loadMoreOffset = loadMoreOffset;
    element.max = max;
    element.maxCount = maxCount;
    element.messageWhenRangeOverflow = messageWhenRangeOverflow;
    element.messageWhenRangeUnderflow = messageWhenRangeUnderflow;
    element.messageWhenValueMissing = messageWhenValueMissing;
    element.min = min;
    element.name = name;
    element.ratio = ratio;
    element.required = required;
    element.requiredAlternativeText = requiredAlternativeText;
    element.size = size;
    element.type = type;
    element.value = value;
    element.variant = variant;
    return element;
};
