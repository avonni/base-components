import Component from 'avonni/hoverableText';

customElements.define(
    'ac-base-hoverable-text',
    Component.CustomElementConstructor
);

export const HoverableText = ({
    label,
    href,
    title,
    titleHref,
    avatarSrc,
    avatarFallbackIconName,
    fields,
    popoverSize,
    placement,
    isLoading,
    loadingStateAlternativeText,
    theme
}) => {
    const element = document.createElement('ac-base-hoverable-text');
    element.label = label;
    element.href = href;
    element.title = title;
    element.titleHref = titleHref;
    element.avatarSrc = avatarSrc;
    element.avatarFallbackIconName = avatarFallbackIconName;
    element.fields = fields;
    element.popoverSize = popoverSize;
    element.placement = placement;
    element.isLoading = isLoading;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.theme = theme;
    return element;
};
