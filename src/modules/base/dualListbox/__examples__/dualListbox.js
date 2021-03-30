import Component from 'base/dualListbox';

customElements.define(
    'ac-base-dual-listbox',
    Component.CustomElementConstructor
);

export const DualListbox = ({
    addButtonLabel,
    disableReordering,
    disabled,
    downButtonLabel,
    fieldLevelHelp,
    label,
    max,
    min,
    messageWhenRangeOverflow,
    messageWhenRangeUnderflow,
    messageWhenValueMissing,
    name,
    options,
    removeButtonLabel,
    required,
    requiredOptions,
    searchEngine,
    selectedLabel,
    showActivityIndicator,
    size,
    sourceLabel,
    upButtonLabel,
    validity,
    value,
    variant
}) => {
    const element = document.createElement('ac-base-dual-listbox');
    element.addButtonLabel = addButtonLabel;
    element.disableReordering = disableReordering;
    element.disabled = disabled;
    element.downButtonLabel = downButtonLabel;
    element.fieldLevelHelp = fieldLevelHelp;
    element.label = label;
    element.max = max;
    element.min = min;
    element.messageWhenRangeOverflow = messageWhenRangeOverflow;
    element.messageWhenRangeUnderflow = messageWhenRangeUnderflow;
    element.messageWhenValueMissing = messageWhenValueMissing;
    element.name = name;
    element.options = options;
    element.removeButtonLabel = removeButtonLabel;
    element.required = required;
    element.requiredOptions = requiredOptions;
    element.searchEngine = searchEngine;
    element.selectedLabel = selectedLabel;
    element.showActivityIndicator = showActivityIndicator;
    element.size = size;
    element.sourceLabel = sourceLabel;
    element.upButtonLabel = upButtonLabel;
    element.validity = validity;
    element.value = value;
    element.variant = variant;
    return element;
};
