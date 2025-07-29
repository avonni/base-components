import Component from 'avonni/verticalVisualPicker';

customElements.define(
    'ac-base-vertical-visual-picker',
    Component.CustomElementConstructor
);

export const VerticalVisualPicker = ({
    collapsedShowMoreButton,
    disabled,
    enableInfiniteLoading,
    expandedShowMoreButton,
    hideCheckMark,
    isLoading,
    items,
    label,
    loadMoreOffset,
    loadingStateAlternativeText,
    max,
    min,
    maxCount,
    messageWhenRangeOverflow,
    messageWhenRangeUnderflow,
    messageWhenValueMissing,
    name,
    required,
    requiredAlternativeText,
    size,
    type,
    value,
    variant
}) => {
    const element = document.createElement('ac-base-vertical-visual-picker');
    element.collapsedShowMoreButton = collapsedShowMoreButton;
    element.disabled = disabled;
    element.enableInfiniteLoading = enableInfiniteLoading;
    element.expandedShowMoreButton = expandedShowMoreButton;
    element.hideCheckMark = hideCheckMark;
    element.isLoading = isLoading;
    element.items = items;
    element.label = label;
    element.loadMoreOffset = loadMoreOffset;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.max = max;
    element.min = min;
    element.maxCount = maxCount;
    element.messageWhenRangeOverflow = messageWhenRangeOverflow;
    element.messageWhenRangeUnderflow = messageWhenRangeUnderflow;
    element.messageWhenValueMissing = messageWhenValueMissing;
    element.name = name;
    element.required = required;
    element.requiredAlternativeText = requiredAlternativeText;
    element.size = size;
    element.type = type;
    element.value = value;
    element.variant = variant;
    return element;
};
