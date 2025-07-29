import Component from '../../storybookWrappers/visualPickerLink/visualPickerLink';

customElements.define(
    'ac-base-visual-picker-link',
    Component.CustomElementConstructor
);

export const VisualPickerLink = ({
    completed,
    completedIconAlternativeText,
    disabled,
    href,
    iconName,
    iconPosition,
    infoOnly,
    title
}) => {
    const element = document.createElement('ac-base-visual-picker-link');
    element.completed = completed;
    element.completedIconAlternativeText = completedIconAlternativeText;
    element.disabled = disabled;
    element.href = href;
    element.iconName = iconName;
    element.iconPosition = iconPosition;
    element.infoOnly = infoOnly;
    element.title = title;
    return element;
};
