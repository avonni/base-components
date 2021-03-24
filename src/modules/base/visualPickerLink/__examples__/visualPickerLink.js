import Component from '../../storybookWrappers/visualPickerLink/visualPickerLink';

customElements.define(
    'ac-base-visual-picker-link',
    Component.CustomElementConstructor
);

export const VisualPickerLink = ({
    iconName,
    title,
    href,
    iconPosition,
    completed,
    infoOnly
}) => {
    const element = document.createElement('ac-base-visual-picker-link');
    element.iconName = iconName;
    element.title = title;
    element.href = href;
    element.iconPosition = iconPosition;
    element.completed = completed;
    element.infoOnly = infoOnly;
    return element;
};
