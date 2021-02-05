import '@lwc/synthetic-shadow';
import buildAndRegisterCustomElement from '../../../../../.storybook/utils/build-custom-element';
import Component from 'avonni/badgeIcon';

buildAndRegisterCustomElement('avonni-badge-icon', Component);

export const BadgeIcon = ({ iconName, variant, label, iconPosition }) => {
    const element = document.createElement('avonni-badge-icon');
    element.iconName = iconName;
    element.variant = variant;
    element.label = label;
    element.iconPosition = iconPosition;
    return element;
};
