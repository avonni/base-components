import Component from '../../storybookWrappers/image/imageList';

customElements.define('ac-image-list', Component.CustomElementConstructor);

export const ImageList = ({
    items
}) => {
    const element = document.createElement('ac-image-list');
    element.items = items;
    
    return element;
};
