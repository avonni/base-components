import Component from '../../storybookWrappers/scopedNotification/noSlotScopedNotification';

customElements.define(
    'ac-avonni-no-slot-scoped-notification',
    Component.CustomElementConstructor
);

export const NoSlotScopedNotification = ({
    iconName,
    iconSize,
    title,
    variant
}) => {
    const element = document.createElement(
        'ac-avonni-no-slot-scoped-notification'
    );
    element.iconName = iconName;
    element.iconSize = iconSize;
    element.title = title;
    element.variant = variant;
    return element;
};
