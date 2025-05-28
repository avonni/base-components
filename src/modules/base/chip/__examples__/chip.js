import Component from '../../storybookWrappers/chip/chip';

customElements.define('ac-base-chip', Component.CustomElementConstructor);

export const Chip = ({
    backgroundColor,
    hideText,
    label,
    outline,
    textColor,
    variant
}) => {
    const element = document.createElement('ac-base-chip');
    element.backgroundColor = backgroundColor;
    element.hideText = hideText;
    element.label = label;
    element.outline = outline;
    element.textColor = textColor;
    element.variant = variant;
    return element;
};
