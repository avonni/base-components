import Component from 'avonni/dualListbox';

customElements.define(
    'ac-base-dual-listbox',
    Component.CustomElementConstructor
);

export const DualListbox = ({
    addButtonIconName,
    addButtonLabel,
    allowSearch,
    buttonSize,
    buttonVariant,
    disableReordering,
    disabled,
    downButtonIconName,
    downButtonLabel,
    draggable,
    enableInfiniteLoading,
    fieldLevelHelp,
    hideBottomDivider,
    keyboardInteractionAssistiveText,
    isLoading,
    label,
    loadingStateAlternativeText,
    loadMoreOffset,
    max,
    maxVisibleOptions,
    messageWhenRangeOverflow,
    messageWhenRangeUnderflow,
    messageWhenValueMissing,
    min,
    name,
    options,
    removeButtonIconName,
    removeButtonLabel,
    required,
    requiredAlternativeText,
    requiredOptions,
    searchInputPlaceholder,
    selectedLabel,
    selectedPlaceholder,
    size,
    sourceLabel,
    upButtonIconName,
    upButtonLabel,
    value,
    variant
}) => {
    const element = document.createElement('ac-base-dual-listbox');
    element.addButtonIconName = addButtonIconName;
    element.addButtonLabel = addButtonLabel;
    element.allowSearch = allowSearch;
    element.buttonSize = buttonSize;
    element.buttonVariant = buttonVariant;
    element.disableReordering = disableReordering;
    element.disabled = disabled;
    element.downButtonIconName = downButtonIconName;
    element.downButtonLabel = downButtonLabel;
    element.draggable = draggable;
    element.enableInfiniteLoading = enableInfiniteLoading;
    element.fieldLevelHelp = fieldLevelHelp;
    element.hideBottomDivider = hideBottomDivider;
    element.keyboardInteractionAssistiveText = keyboardInteractionAssistiveText;
    element.isLoading = isLoading;
    element.label = label;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.loadMoreOffset = loadMoreOffset;
    element.max = max;
    element.maxVisibleOptions = maxVisibleOptions;
    element.messageWhenRangeOverflow = messageWhenRangeOverflow;
    element.messageWhenRangeUnderflow = messageWhenRangeUnderflow;
    element.messageWhenValueMissing = messageWhenValueMissing;
    element.min = min;
    element.name = name;
    element.options = options;
    element.removeButtonIconName = removeButtonIconName;
    element.removeButtonLabel = removeButtonLabel;
    element.required = required;
    element.requiredAlternativeText = requiredAlternativeText;
    element.requiredOptions = requiredOptions;
    element.searchInputPlaceholder = searchInputPlaceholder;
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
