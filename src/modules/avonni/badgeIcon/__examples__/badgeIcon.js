import '@lwc/synthetic-shadow';
import Component from 'avonni/badgeIcon';

customElements.define('ac-avonni-badge-icon', Component.CustomElementConstructor);

export const BadgeIcon = ({ 
    iconName, 
    variant, 
    label, 
    iconPosition 
}) => {
    const element = document.createElement('ac-avonni-badge-icon');
    element.iconName = iconName;
    element.variant = variant;
    element.label = label;
    element.iconPosition = iconPosition;
    return element;
};
