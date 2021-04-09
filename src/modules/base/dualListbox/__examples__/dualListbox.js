import Component from 'base/dualListbox';

customElements.define(
    'ac-base-dual-listbox',
    Component.CustomElementConstructor
);

export const DualListbox = ({
    addButtonIconName,
    addButtonLabel,
    buttonSize,
    buttonVariant,
    disableReordering,
    disabled,
    downButtonIconName,
    downButtonLabel,
    fieldLevelHelp,
    isLoading,
    label,
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
    searchEngine,
    selectedLabel,
    selectedPlaceholder,
    size,
    sourceLabel,
    upButtonIconName,
    upButtonLabel,
    validity,
    value,
    variant
}) => {
    const element = document.createElement('ac-base-dual-listbox');
    element.addButtonIconName = addButtonIconName;
    element.addButtonLabel = addButtonLabel;
    element.buttonSize = buttonSize;
    element.buttonVariant = buttonVariant;
    element.disableReordering = disableReordering;
    element.disabled = disabled;
    element.downButtonIconName = downButtonIconName;
    element.downButtonLabel = downButtonLabel;
    element.fieldLevelHelp = fieldLevelHelp;
    element.isLoading = isLoading;
    element.label = label;
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
    element.searchEngine = searchEngine;
    element.selectedLabel = selectedLabel;
    element.selectedPlaceholder = selectedPlaceholder;
    element.size = size;
    element.sourceLabel = sourceLabel;
    element.upButtonIconName = upButtonIconName;
    element.upButtonLabel = upButtonLabel;
    element.validity = validity;
    element.value = value;
    element.variant = variant;
    return element;
};
