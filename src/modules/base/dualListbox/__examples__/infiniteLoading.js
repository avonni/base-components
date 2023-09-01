

import Component from '../../storybookWrappers/dualListbox/infiniteLoading';

customElements.define(
    'ac-infinite-loading-dual-listbox',
    Component.CustomElementConstructor
);

export const InfiniteLoadingDualListbox = ({
    addButtonIconName,
    addButtonLabel,
    buttonSize,
    buttonVariant,
    disableReordering,
    disabled,
    downButtonIconName,
    downButtonLabel,
    draggable,
    fieldLevelHelp,
    enableInfiniteLoading,
    hideBottomDivider,
    isLoading,
    label,
    loadMoreOffset,
    maxVisibleOptions,
    max,
    min,
    messageWhenRangeOverflow,
    messageWhenRangeUnderflow,
    messageWhenValueMissing,
    name,
    options,
    removeButtonIconName,
    removeButtonLabel,
    required,
    requiredOptions,
    allowSearch,
    selectedLabel,
    selectedPlaceholder,
    size,
    sourceLabel,
    upButtonIconName,
    upButtonLabel,
    value,
    variant
}) => {
    const element = document.createElement('ac-infinite-loading-dual-listbox');
    element.addButtonIconName = addButtonIconName;
    element.addButtonLabel = addButtonLabel;
    element.buttonSize = buttonSize;
    element.buttonVariant = buttonVariant;
    element.disableReordering = disableReordering;
    element.disabled = disabled;
    element.downButtonIconName = downButtonIconName;
    element.downButtonLabel = downButtonLabel;
    element.draggable = draggable;
    element.fieldLevelHelp = fieldLevelHelp;
    element.enableInfiniteLoading = enableInfiniteLoading;
    element.hideBottomDivider = hideBottomDivider;
    element.isLoading = isLoading;
    element.label = label;
    element.loadMoreOffset = loadMoreOffset;
    element.maxVisibleOptions = maxVisibleOptions;
    element.max = max;
    element.min = min;
    element.messageWhenRangeOverflow = messageWhenRangeOverflow;
    element.messageWhenRangeUnderflow = messageWhenRangeUnderflow;
    element.messageWhenValueMissing = messageWhenValueMissing;
    element.name = name;
    element.options = options;
    element.removeButtonIconName = removeButtonIconName;
    element.removeButtonLabel = removeButtonLabel;
    element.required = required;
    element.requiredOptions = requiredOptions;
    element.allowSearch = allowSearch;
    element.selectedLabel = selectedLabel;
    element.selectedPlaceholder = selectedPlaceholder;
    element.size = size;
    element.sourceLabel = sourceLabel;
    element.upButtonIconName = upButtonIconName;
    element.upButtonLabel = upButtonLabel;
    element.value = value;
    element.variant = variant;
    return element;
};
