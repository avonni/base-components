import Component from '../../storybookWrappers/pageHeader/pageHeader';

customElements.define(
    'ac-base-page-header',
    Component.CustomElementConstructor
);

export const PageHeader = ({
    iconName,
    info,
    isJoined,
    label,
    title,
    variant
}) => {
    const element = document.createElement('ac-base-page-header');
    element.iconName = iconName;
    element.info = info;
    element.isJoined = isJoined;
    element.label = label;
    element.title = title;
    element.variant = variant;
    return element;
};
