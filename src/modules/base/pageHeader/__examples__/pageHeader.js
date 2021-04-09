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
    fields
}) => {
    const element = document.createElement('ac-base-page-header');
    element.iconName = iconName;
    element.label = label;
    element.title = title;
    element.info = info;
    element.variant = variant;
    element.fields = fields;
    return element;
};
