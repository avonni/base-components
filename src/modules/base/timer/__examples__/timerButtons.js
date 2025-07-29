import Component from '../../storybookWrappers/timer/timerButtons';

customElements.define(
    'ac-base-timer-buttons',
    Component.CustomElementConstructor
);

export const TimerButtons = ({
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
    const element = document.createElement('ac-base-timer-buttons');
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
