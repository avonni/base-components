import Component from 'avonni/timer';

customElements.define('ac-base-timer', Component.CustomElementConstructor);

export const Timer = ({
    autoStart,
    duration = 1,
    format,
    iconName,
    iconPosition,
    repeat,
    type,
    value = 0,
    variant
}) => {
    const element = document.createElement('ac-base-timer');
    element.autoStart = autoStart;
    element.duration = duration;
    element.format = format;
    element.iconName = iconName;
    element.iconPosition = iconPosition;
    element.repeat = repeat;
    element.type = type;
    element.value = value;
    element.variant = variant;
    return element;
};
