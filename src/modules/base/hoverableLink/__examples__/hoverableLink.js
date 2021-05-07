import Component from 'avonni/hoverableLink';

customElements.define(
    'ac-base-hoverable-link',
    Component.CustomElementConstructor
);

export const HoverableLink = ({
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
    const element = document.createElement('ac-base-hoverable-link');
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
