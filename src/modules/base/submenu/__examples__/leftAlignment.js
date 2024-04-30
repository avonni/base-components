import Component from '../../storybookWrappers/submenu/leftAlignment';

customElements.define(
    'ac-base-submenu-left-alignment',
    Component.CustomElementConstructor
);

export const SubmenuLeftAlignment = ({ buttonMenuTriggers }) => {
    const element = document.createElement('ac-base-submenu-left-alignment');
    element.buttonMenuTriggers = buttonMenuTriggers;
    return element;
};
