import Component from '../../storybookWrappers/scopedNotification/noSlotScopedNotification';

customElements.define(
    'ac-avonni-no-slot-scoped-notification',
    Component.CustomElementConstructor
);

export const NoSlotScopedNotification = ({
    title,
    iconName,
    variant,
    iconSize
}) => {
    const element = document.createElement(
        'ac-avonni-no-slot-scoped-notification'
    );
    element.title = title;
    element.iconName = iconName;
    element.variant = variant;
    element.iconSize = iconSize;
    return element;
};
