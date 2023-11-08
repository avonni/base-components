import Component from '../../storybookWrappers/scopedNotification/scopedNotification';

customElements.define(
    'ac-base-scoped-notification',
    Component.CustomElementConstructor
);

export const ScopedNotification = ({ title, iconName, variant, iconSize }) => {
    const element = document.createElement('ac-base-scoped-notification');
    element.title = title;
    element.iconName = iconName;
    element.variant = variant;
    element.iconSize = iconSize;
    return element;
};
