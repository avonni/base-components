import '@lwc/synthetic-shadow';
import buildAndRegisterCustomElement from '../../../../../.storybook/utils/build-custom-element';
import Component from 'avonni/avatarGroup';

buildAndRegisterCustomElement('avonni-avatar-group', Component);

export const AvatarGroup = ({ items, size, variant, maxCount }) => {
    const element = document.createElement('avonni-avatar-group');
    element.items = items;
    element.variant = variant;
    element.size = size;
    element.maxCount = maxCount;
    return element;
};
