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
    required,
    shareWithEntityId,
    value,
    variant,
    formats
}) => {
    const element = document.createElement('ac-base-input-rich-text');
    element.disabled = disabled;
    element.disabledCategories = disabledCategories || [];
    element.label = label;
    element.labelVisible = labelVisible;
    element.messageWhenBadInput = messageWhenBadInput;
    element.placeholder = placeholder;
    element.required = required;
    element.shareWithEntityId = shareWithEntityId;
    element.value = value;
    element.variant = variant;
    element.formats = formats;
    return element;
};
