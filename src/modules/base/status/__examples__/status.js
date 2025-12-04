import Component from '../status';

customElements.define('ac-status', Component.CustomElementConstructor);

export const Status = ({ iconPosition, iconSize, states, value }) => {
    const element = document.createElement('ac-status');
    element.iconPosition = iconPosition;
    element.iconSize = iconSize;
    element.states = states;
    element.value = value;
    return element;
};
