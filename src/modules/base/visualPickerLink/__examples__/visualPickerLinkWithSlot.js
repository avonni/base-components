import Component from '../../storybookWrappers/visualPickerLink/visualPickerLinkWithSlot';

customElements.define(
    'ac-base-visual-picker-link-with-slot',
    Component.CustomElementConstructor
);

export const VisualPickerLinkWithSlot = ({
    iconName,
    title,
    href,
    iconPosition,
    completed,
    infoOnly
}) => {
    const element = document.createElement(
        'ac-base-visual-picker-link-with-slot'
    );
    element.iconName = iconName;
    element.title = title;
    element.href = href;
    element.iconPosition = iconPosition;
    element.completed = completed;
    element.infoOnly = infoOnly;
    return element;
};
