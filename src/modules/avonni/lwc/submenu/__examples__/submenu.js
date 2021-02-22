import Component from '../../storybookWrappers/submenu/submenu';

customElements.define('ac-avonni-submenu', Component.CustomElementConstructor);

export const Submenu = () => {
    const element = document.createElement('ac-avonni-submenu');
    return element;
};
