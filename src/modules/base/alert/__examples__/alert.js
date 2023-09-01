

import Component from '../../storybookWrappers/alert/alert';

customElements.define('ac-base-alert', Component.CustomElementConstructor);

export const Alert = ({
    iconName,
    iconSize,
    closeAction,
    variant,
    isDismissible
}) => {
    const element = document.createElement('ac-base-alert');
    element.iconName = iconName;
    element.iconSize = iconSize;
    element.closeAction = closeAction;
    element.variant = variant;
    element.isDismissible = isDismissible;
    return element;
};
