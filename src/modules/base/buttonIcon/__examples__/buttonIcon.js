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
    loadingStateAlternativeText,
    name,
    size,
    title,
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
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.name = name;
    element.size = size;
    element.title = title;
    element.tooltip = tooltip;
    element.type = type;
    element.value = value;
    element.variant = variant;
    return element;
};
