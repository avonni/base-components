import Component from 'base/badgeIcon';

customElements.define('ac-base-badge-icon', Component.CustomElementConstructor);

export const BadgeIcon = ({ 
    iconName, 
    variant, 
    label, 
    iconPosition 
}) => {
    const element = document.createElement('ac-base-badge-icon');
    element.iconName = iconName;
    element.variant = variant;
    element.label = label;
    element.iconPosition = iconPosition;
    return element;
};
