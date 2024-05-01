import Component from '../../storybookWrappers/submenu/submenu';

customElements.define('ac-base-submenu', Component.CustomElementConstructor);

export const Submenu = ({ buttonMenuTriggers }) => {
    const element = document.createElement('ac-base-submenu');
    element.buttonMenuTriggers = buttonMenuTriggers;
    return element;
};
