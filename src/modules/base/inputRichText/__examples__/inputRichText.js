import Component from 'base/inputRichText';

customElements.define(
    'ac-base-input-rich-text',
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
    const element = document.createElement('ac-base-input-rich-text');
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
