import Component from '../../storybookWrappers/alert/alert';

customElements.define('ac-avonni-alert', Component.CustomElementConstructor);

export const Alert = ({
    iconName,
    closeAction,
    variant,
    textured,
    isDismissible
}) => {
    const element = document.createElement('ac-avonni-alert');
    element.iconName = iconName;
    element.closeAction = closeAction;
    element.variant = variant;
    element.textured = textured;
    element.isDismissible = isDismissible;
    return element;
};
