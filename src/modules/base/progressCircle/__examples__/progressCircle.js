import Component from 'avonni/progressCircle';

customElements.define(
    'ac-base-progress-circle',
    Component.CustomElementConstructor
);

export const ProgressCircle = ({
    title,
    titlePosition,
    value,
    label,
    variant,
    direction,
    size,
    thickness,
    isLoading
}) => {
    const element = document.createElement('ac-base-progress-circle');
    element.title = title;
    element.titlePosition = titlePosition;
    element.value = value;
    element.label = label;
    element.variant = variant;
    element.direction = direction;
    element.size = size;
    element.thickness = thickness;
    element.isLoading = isLoading;
    return element;
};
