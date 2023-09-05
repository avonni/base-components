import Component from '../../storybookWrappers/submenu/submenu';

customElements.define('ac-base-submenu', Component.CustomElementConstructor);

export const Submenu = () => {
    const element = document.createElement('ac-base-submenu');
    return element;
};
