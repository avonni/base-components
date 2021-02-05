import '@lwc/synthetic-shadow';
import buildAndRegisterCustomElement from '../../../../../.storybook/utils/build-custom-element';
import Component from 'avonni/avatarGroup';

buildAndRegisterCustomElement('avonni-avatar-group', Component);

export const AvatarGroup = ({ items, size, variant, maxCount }) => {
    const el = document.createElement('avonni-avatar-group');
    el.items = items;
    el.variant = variant;
    el.size = size;
    el.maxCount = maxCount;
    return el;
};
