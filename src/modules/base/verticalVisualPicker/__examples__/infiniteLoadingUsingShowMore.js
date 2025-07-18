import Component from '../../storybookWrappers/verticalVisualPicker/infiniteLoadingUsingShowMore';

customElements.define(
    'ac-base-vertical-visual-picker-infinite-loading-using-show-more',
    Component.CustomElementConstructor
);

export const InfiniteLoadingUsingShowMoreVerticalVisualPicker = ({
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
    maxCount,
    messageWhenValueMissing,
    name,
    required,
    requiredAlternativeText,
    size,
    type,
    value,
    variant
}) => {
    const element = document.createElement(
        'ac-base-vertical-visual-picker-infinite-loading-using-show-more'
    );
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
    element.maxCount = maxCount;
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
