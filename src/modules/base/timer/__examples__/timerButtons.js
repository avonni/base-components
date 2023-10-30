import Component from '../../storybookWrappers/timer/timerButtons';

customElements.define(
    'ac-base-timer-buttons',
    Component.CustomElementConstructor
);

export const TimerButtons = ({
    value = 0,
    variant,
    type,
    duration = 1,
    autoStart,
    repeat,
    iconName,
    iconPosition,
    format
}) => {
    const element = document.createElement('ac-base-timer-buttons');
    element.value = value;
    element.variant = variant;
    element.type = type;
    element.duration = duration;
    element.autoStart = autoStart;
    element.repeat = repeat;
    element.iconName = iconName;
    element.iconPosition = iconPosition;
    element.format = format;
    return element;
};
