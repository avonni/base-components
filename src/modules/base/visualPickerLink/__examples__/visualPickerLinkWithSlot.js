import Component from '../../storybookWrappers/visualPickerLink/visualPickerLinkWithSlot';

customElements.define(
    'ac-base-visual-picker-link-with-slot',
    Component.CustomElementConstructor
);

export const VisualPickerLinkWithSlot = ({
    completed,
    completedIconAlternativeText,
    disabled,
    href,
    iconName,
    iconPosition,
    infoOnly,
    title
}) => {
    const element = document.createElement(
        'ac-base-visual-picker-link-with-slot'
    );
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
