import Component from '../../storybookWrappers/scopedNotification/scopedNotification';

customElements.define(
    'ac-base-scoped-notification',
    Component.CustomElementConstructor
);

export const ScopedNotification = ({ iconName, iconSize, title, variant }) => {
    const element = document.createElement('ac-base-scoped-notification');
    element.iconName = iconName;
    element.iconSize = iconSize;
    element.title = title;
    element.variant = variant;
    return element;
};
