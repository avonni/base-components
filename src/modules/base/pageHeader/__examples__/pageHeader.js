import Component from '../../storybookWrappers/pageHeader/pageHeader';

customElements.define(
    'ac-base-page-header',
    Component.CustomElementConstructor
);

export const PageHeader = ({
    iconName,
    label,
    title,
    info,
    variant,
    items
}) => {
    const element = document.createElement('ac-base-page-header');
    element.iconName = iconName;
    element.label = label;
    element.title = title;
    element.info = info;
    element.variant = variant;
    element.items = items;
    return element;
};
