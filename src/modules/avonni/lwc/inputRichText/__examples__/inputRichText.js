import Component from 'avonni/inputRichText';

customElements.define(
    'ac-avonni-input-rich-text',
    Component.CustomElementConstructor
);

export const InputRichText = ({
    disabled,
    disabledCategories,
    label,
    labelVisible,
    messageWhenBadInput,
    placeholder,
    shareWithEntityId,
    value,
    variant,
    formats,
    isPublisher
}) => {
    const element = document.createElement('ac-avonni-input-rich-text');
    element.disabled = disabled;
    element.disabledCategories = disabledCategories || [];
    element.label = label;
    element.labelVisible = labelVisible;
    element.messageWhenBadInput = messageWhenBadInput;
    element.placeholder = placeholder;
    element.shareWithEntityId = shareWithEntityId;
    element.value = value;
    element.variant = variant;
    element.formats = formats;
    element.isPublisher = isPublisher;
    return element;
};
