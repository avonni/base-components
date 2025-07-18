import Component from '../../storybookWrappers/visualPicker/infiniteLoading';

customElements.define(
    'ac-base-visual-picker-infinite-loading',
    Component.CustomElementConstructor
);

export const InfiniteLoadingVisualPicker = ({
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
        'ac-base-visual-picker-infinite-loading'
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
