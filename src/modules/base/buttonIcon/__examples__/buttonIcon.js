import Component from 'avonni/buttonIcon';

customElements.define(
    'ac-base-button-icon',
    Component.CustomElementConstructor
);

export const ButtonIcon = ({
    accessKey,
    alternativeText,
    disabled,
    iconClass,
    iconName,
    iconSrc,
    isButtonLoading,
    name,
    size,
    tooltip,
    type,
    value,
    variant
}) => {
    const element = document.createElement('ac-base-button-icon');
    element.accessKey = accessKey;
    element.alternativeText = alternativeText;
    element.disabled = disabled;
    element.iconClass = iconClass;
    element.iconName = iconName;
    element.iconSrc = iconSrc;
    element.isButtonLoading = isButtonLoading;
    element.name = name;
    element.size = size;
    element.tooltip = tooltip;
    element.type = type;
    element.value = value;
    element.variant = variant;
    return element;
};
