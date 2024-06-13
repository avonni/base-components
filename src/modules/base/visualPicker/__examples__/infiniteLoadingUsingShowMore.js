import Component from '../../storybookWrappers/visualPicker/infiniteLoadingUsingShowMore';

customElements.define(
    'ac-base-visual-picker-infinite-loading-using-show-more',
    Component.CustomElementConstructor
);

export const InfiniteLoadingUsingShowMoreVisualPicker = ({
    disabled,
    enableInfiniteLoading,
    hideCheckMark,
    isLoading,
    items,
    label,
    loadMoreOffset,
    maxCount,
    messageWhenValueMissing,
    name,
    required,
    size,
    type,
    value,
    variant
}) => {
    const element = document.createElement(
        'ac-base-visual-picker-infinite-loading-using-show-more'
    );
    element.disabled = disabled;
    element.enableInfiniteLoading = enableInfiniteLoading;
    element.hideCheckMark = hideCheckMark;
    element.isLoading = isLoading;
    element.items = items;
    element.label = label;
    element.loadMoreOffset = loadMoreOffset;
    element.maxCount = maxCount;
    element.messageWhenValueMissing = messageWhenValueMissing;
    element.name = name;
    element.required = required;
    element.size = size;
    element.type = type;
    element.value = value;
    element.variant = variant;
    return element;
};
