import Component from '../../storybookWrappers/alert/alert';

customElements.define('ac-base-alert', Component.CustomElementConstructor);

export const Alert = ({
    closeAction,
    iconName,
    iconSize,
    isDismissible,
    variant
}) => {
    const element = document.createElement('ac-base-alert');
    element.closeAction = closeAction;
    element.iconName = iconName;
    element.iconSize = iconSize;
    element.isDismissible = isDismissible;
    element.variant = variant;
    return element;
};
