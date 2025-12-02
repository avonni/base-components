import { createElement } from '@lwc/engine-dom';
import { Tooltip } from 'c/tooltipLibrary';
import Status from '../status';

jest.mock('c/tooltipLibrary');

const STATES = [
    {
        iconName: 'utility:success',
        label: 'Success',
        value: 'success',
        color: 'green'
    },
    {
        iconName: 'utility:warning',
        label: 'Warning',
        value: 'warning',
        color: 'yellow'
    },
    {
        iconName: 'utility:error',
        label: 'Error',
        value: 'error',
        color: 'red',
        tooltip: 'some tooltip'
    }
];

let element;
describe('Status', () => {
    beforeEach(() => {
        element = createElement('ac-test-status', {
            is: Status
        });
        document.body.appendChild(element);
    });

    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        jest.clearAllMocks();
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.iconPosition).toBe('left');
            expect(element.iconSize).toBe('medium');
            expect(element.states).toMatchObject([]);
            expect(element.value).toBeUndefined();
        });

        describe('Icon Position', () => {
            it('Left', () => {
                element.states = STATES;
                element.iconPosition = 'left';
                element.value = STATES[1].value;

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon"]'
                    );
                    expect(icon.className).toBe(
                        'slds-order_0 slds-m-right_x-small'
                    );
                });
            });

            it('Right', () => {
                element.states = STATES;
                element.iconPosition = 'right';
                element.value = STATES[0].value;

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon"]'
                    );
                    expect(icon.className).toBe(
                        'slds-order_2 slds-m-left_x-small'
                    );
                });
            });
        });

        describe('Icon Size', () => {
            it('Passed to the component', () => {
                element.states = STATES;
                element.iconSize = 'small';
                element.value = STATES[0].value;

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon"]'
                    );
                    expect(icon.size).toBe('small');
                });
            });
        });

        describe('States', () => {
            it('Selected state is displayed', () => {
                element.states = STATES;
                element.value = STATES[0].value;

                return Promise.resolve().then(() => {
                    const formattedText = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-text"]'
                    );
                    expect(formattedText).toBeTruthy();
                    expect(formattedText.style.cssText).toBe(
                        `color: ${STATES[0].color};`
                    );
                    expect(formattedText.value).toBe(STATES[0].label);

                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon"]'
                    );
                    expect(icon).toBeTruthy();
                    expect(icon.style.cssText).toBe(
                        `--slds-c-icon-color-foreground-default: ${STATES[0].color};`
                    );
                    expect(icon.iconName).toBe(STATES[0].iconName);
                });
            });
        });

        describe('Tooltip', () => {
            it('Created when tooltip is provided', () => {
                element.states = STATES;
                element.value = STATES[2].value;

                return Promise.resolve().then(() => {
                    expect(Tooltip).toHaveBeenCalled();
                    expect(Tooltip.mock.calls[0][0]).toBe('some tooltip');

                    const instance = Tooltip.mock.instances[0];
                    expect(instance.initialize).toHaveBeenCalled();
                });
            });

            it('Destroyed when tooltip is removed', () => {
                element.states = STATES;
                element.value = STATES[2].value;

                let instance;
                return Promise.resolve()
                    .then(() => {
                        instance = Tooltip.mock.instances[0];
                        expect(instance.initialize).toHaveBeenCalledTimes(1);
                        expect(instance.destroy).not.toHaveBeenCalled();
                        instance.initialize.mockClear();

                        element.value = STATES[0].value;
                    })
                    .then(() => {
                        expect(Tooltip.mock.instances).toHaveLength(1);
                        expect(instance.initialize).not.toHaveBeenCalled();
                        expect(instance.destroy).toHaveBeenCalledTimes(1);
                    });
            });
        });
    });
});
