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
    { iconName: 'utility:error', label: 'Error', value: 'error', color: 'red' }
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
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.iconPosition).toBe('left');
            expect(element.iconSize).toBe('medium');
            expect(element.states).toMatchObject([]);
            expect(element.value).toBeUndefined();
        });

        describe('Icon Position', () => {
            it('iconPosition = "left"', () => {
                element.states = STATES;
                element.iconPosition = 'left';
                element.value = 'success';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon"]'
                    );
                    expect(icon.className).toBe(
                        'slds-order_0 slds-m-right_x-small'
                    );
                });
            });

            it('iconPosition = "right"', () => {
                element.states = STATES;
                element.iconPosition = 'right';
                element.value = 'success';

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
            it('Small', () => {
                element.states = STATES;
                element.iconSize = 'small';
                element.value = 'success';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon"]'
                    );
                    expect(icon.size).toBe('small');
                });
            });
        });

        describe('Tooltip', () => {
            it('Passed to the component', () => {
                element.states = [
                    {
                        iconName: 'utility:success',
                        label: 'Success',
                        value: 'success',
                        color: 'green',
                        tooltip: 'some tooltip'
                    }
                ];
                element.value = 'success';

                return Promise.resolve().then(() => {
                    expect(Tooltip).toHaveBeenCalled();
                    expect(Tooltip.mock.calls[0][0]).toBe('some tooltip');

                    const instance = Tooltip.mock.instances[0];
                    expect(instance.initialize).toHaveBeenCalled();
                });
            });
        });
    });
});
