import Component from 'avonni/inputRichText';

customElements.define(
    'ac-base-input-rich-text',
    Component.CustomElementConstructor
);

export const InputRichText = ({
    disabled,
    disabledCategories,
    formats,
    isPublisher,
    label,
    labelVisible,
    messageWhenBadInput,
    placeholder,
    readOnly,
    shareWithEntityId,
    value,
    variant
}) => {
    const element = document.createElement('ac-base-input-rich-text');
    element.disabled = disabled;
    element.disabledCategories = disabledCategories || [];
    element.formats = formats;
    element.isPublisher = isPublisher;
    element.label = label;
    element.labelVisible = labelVisible;
    element.messageWhenBadInput = messageWhenBadInput;
    element.placeholder = placeholder;
    element.readOnly = readOnly;
    element.shareWithEntityId = shareWithEntityId;
    element.value = value;
    element.variant = variant;
    return element;
};
