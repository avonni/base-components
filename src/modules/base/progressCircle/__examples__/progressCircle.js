import Component from 'avonni/progressCircle';

customElements.define(
    'ac-base-progress-circle',
    Component.CustomElementConstructor
);

export const ProgressCircle = ({
    alternativeText,
    direction,
    isLoading,
    label,
    size,
    thickness,
    title,
    titlePosition,
    value,
    variant
}) => {
    const element = document.createElement('ac-base-progress-circle');
    element.alternativeText = alternativeText;
    element.direction = direction;
    element.isLoading = isLoading;
    element.label = label;
    element.size = size;
    element.thickness = thickness;
    element.title = title;
    element.titlePosition = titlePosition;
    element.value = value;
    element.variant = variant;
    return element;
};
