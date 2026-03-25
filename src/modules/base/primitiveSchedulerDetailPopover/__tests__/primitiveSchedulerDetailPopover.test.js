import { createElement } from 'lwc';
import PrimitiveSchedulerDetailPopover from '../primitiveSchedulerDetailPopover';

let element;
describe('PrimitiveSchedulerDetailPopover', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        window.requestAnimationFrame.mockRestore();
    });

    beforeEach(() => {
        element = createElement('base-primitive-scheduler-detail-popover', {
            is: PrimitiveSchedulerDetailPopover
        });
        document.body.appendChild(element);

        jest.useFakeTimers();

        jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
            setTimeout(() => {
                cb();
            }, 0);
        });
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.contextMenuEvent).toEqual([]);
            expect(element.fields).toEqual([]);
            expect(element.isMobileView).toBeFalsy();
            expect(element.label).toEqual('');
            expect(element.show).toBeFalsy();
        });

        it('Context menu event', () => {
            const contextMenuEvent = [
                {
                    label: 'Action 1',
                    name: 'action1',
                    disabled: true
                },
                {
                    label: 'Action 2',
                    name: 'action2',
                    iconName: 'utility:edit'
                },
                {
                    label: 'Action 3',
                    name: 'action3',
                    disabled: true,
                    iconName: 'utility:edit'
                },
                {
                    label: 'Action 4',
                    name: 'action4'
                }
            ];
            element.contextMenuEvent = contextMenuEvent;
            element.show = true;

            return Promise.resolve().then(() => {
                const buttons = element.shadowRoot.querySelectorAll(
                    '[data-group-name="context-event-button"]'
                );
                expect(buttons).toHaveLength(2);
                expect(buttons[0].label).toBe('Action 1');
                expect(buttons[0].disabled).toBeTruthy();
                expect(buttons[0].iconName).toBeUndefined();

                expect(buttons[1].label).toBe('Action 2');
                expect(buttons[1].disabled).toBeFalsy();
                expect(buttons[1].iconName).toBe('utility:edit');

                const buttonMenusItems = element.shadowRoot.querySelectorAll(
                    '[data-group-name="context-menu-event-button"]'
                );
                expect(buttonMenusItems).toHaveLength(2);
                expect(buttonMenusItems[0].label).toBe('Action 3');
                expect(buttonMenusItems[0].disabled).toBeTruthy();
                expect(buttonMenusItems[0].prefixIconName).toBe('utility:edit');

                expect(buttonMenusItems[1].label).toBe('Action 4');
                expect(buttonMenusItems[1].disabled).toBeFalsy();
                expect(buttonMenusItems[1].prefixIconName).toBeUndefined();
            });
        });

        it('Fields', () => {
            const fields = [
                {
                    value: 'Event 1',
                    variant: 'label-hidden',
                    label: 'Title',
                    key: '1'
                },
                {
                    value: '20, 02 2023, 12:00:00',
                    label: 'Starting date',
                    type: 'text',
                    key: '2'
                },
                {
                    value: '20, 02 2023, 14:30:00',
                    label: 'Ending date',
                    type: 'text',
                    key: '3'
                },
                {
                    value: false,
                    type: 'boolean',
                    key: '4'
                },
                {
                    value: 'Resource 1',
                    label: 'Resources',
                    key: '5'
                }
            ];

            element.fields = fields;
            element.show = true;

            return Promise.resolve().then(() => {
                const fieldElements = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-output-data-detail-popover-field"]'
                );
                expect(fieldElements).toHaveLength(5);

                expect(fieldElements[0].value).toBe('Event 1');
                expect(fieldElements[0].label).toBe('Title');
                expect(fieldElements[0].variant).toBe('label-hidden');

                expect(fieldElements[1].value).toBe('20, 02 2023, 12:00:00');
                expect(fieldElements[1].label).toBe('Starting date');
                expect(fieldElements[1].type).toBe('text');

                expect(fieldElements[2].value).toBe('20, 02 2023, 14:30:00');
                expect(fieldElements[2].label).toBe('Ending date');
                expect(fieldElements[2].type).toBe('text');

                expect(fieldElements[3].value).toBe(false);
                expect(fieldElements[3].label).toBeUndefined();
                expect(fieldElements[3].type).toBe('boolean');

                expect(fieldElements[4].value).toBe('Resource 1');
                expect(fieldElements[4].label).toBe('Resources');
                expect(fieldElements[4].type).toBeUndefined();
            });
        });

        describe('Is mobile view', () => {
            it('true', () => {
                const fields = [
                    {
                        value: 'Event 1',
                        variant: 'label-hidden',
                        label: 'Title',
                        key: '1'
                    }
                ];

                element.fields = fields;
                element.isMobileView = true;
                element.show = true;

                return Promise.resolve().then(() => {
                    const divField = element.shadowRoot.querySelector(
                        '[data-element-id="div-field"]'
                    );
                    expect(divField.classList).toContain('slds-size_1-of-1');
                    expect(divField.classList).not.toContain(
                        'slds-size_1-of-2'
                    );

                    const divDetailPopover = element.shadowRoot.querySelector(
                        '[data-element-id="div-detail-popover"]'
                    );
                    expect(divDetailPopover.className).toContain(
                        'avonni-scheduler__event-details-popover-full'
                    );
                    expect(divDetailPopover.className).not.toContain(
                        'slds-popover_medium'
                    );
                });
            });

            it('false', () => {
                const fields = [
                    {
                        value: 'Event 1',
                        variant: 'label-hidden',
                        label: 'Title',
                        key: '1'
                    }
                ];

                element.fields = fields;
                element.isMobileView = false;
                element.show = true;

                return Promise.resolve().then(() => {
                    const divField = element.shadowRoot.querySelector(
                        '[data-element-id="div-field"]'
                    );
                    expect(divField.classList).not.toContain(
                        'slds-size_1-of-1'
                    );
                    expect(divField.classList).toContain('slds-size_1-of-2');

                    const divDetailPopover = element.shadowRoot.querySelector(
                        '[data-element-id="div-detail-popover"]'
                    );
                    expect(divDetailPopover.className).not.toContain(
                        'avonni-scheduler__event-details-popover-full'
                    );
                    expect(divDetailPopover.className).toContain(
                        'slds-popover_medium'
                    );
                });
            });
        });

        it('Label', () => {
            const label = 'Event details';
            element.label = label;
            element.show = true;

            return Promise.resolve().then(() => {
                const popoverLabel = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-formatted-rich-text-label"]'
                );
                expect(popoverLabel.value).toBe(label);
            });
        });

        describe('Show', () => {
            it('true', () => {
                element.show = true;

                return Promise.resolve().then(() => {
                    const popover = element.shadowRoot.querySelector(
                        '[data-element-id="div-detail-popover"]'
                    );
                    expect(popover).not.toBeNull();
                });
            });

            it('false', () => {
                element.show = false;

                return Promise.resolve().then(() => {
                    const popover = element.shadowRoot.querySelector(
                        '[data-element-id="div-detail-popover"]'
                    );
                    expect(popover).toBeNull();
                });
            });
        });
    });

    describe('Events', () => {
        it('Private mouse enter', () => {
            const mouseEnterEventHandler = jest.fn();
            element.addEventListener(
                'privatemouseenter',
                mouseEnterEventHandler
            );
            element.show = true;

            return Promise.resolve().then(() => {
                const popover = element.shadowRoot.querySelector(
                    '[data-element-id="div-detail-popover"]'
                );
                popover.dispatchEvent(new CustomEvent('mouseenter'));

                expect(mouseEnterEventHandler).toHaveBeenCalled();
            });
        });

        it('Private mouse leave', () => {
            const mouseLeaveEventHandler = jest.fn();
            element.addEventListener(
                'privatemouseleave',
                mouseLeaveEventHandler
            );
            element.show = true;

            return Promise.resolve().then(() => {
                const popover = element.shadowRoot.querySelector(
                    '[data-element-id="div-detail-popover"]'
                );
                popover.dispatchEvent(new CustomEvent('mouseleave'));

                expect(mouseLeaveEventHandler).toHaveBeenCalled();
            });
        });

        it('Private action select', () => {
            const actionSelectEventHandler = jest.fn();
            element.addEventListener('actionselect', actionSelectEventHandler);
            element.contextMenuEvent = [
                {
                    label: 'Action 1',
                    name: 'action1'
                }
            ];
            element.show = true;

            return Promise.resolve().then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-group-name="context-event-button"]'
                );
                button.click();

                expect(actionSelectEventHandler).toHaveBeenCalled();
                expect(
                    actionSelectEventHandler.mock.calls[0][0].detail.name
                ).toBe('action1');
            });
        });

        it('Private action select with button menu', () => {
            const actionSelectEventHandler = jest.fn();
            element.addEventListener('actionselect', actionSelectEventHandler);
            element.contextMenuEvent = [
                {
                    label: 'Action 1',
                    name: 'action1'
                },
                {
                    label: 'Action 2',
                    name: 'action2'
                },
                {
                    label: 'Action 3',
                    name: 'action3'
                }
            ];
            element.show = true;

            return Promise.resolve().then(() => {
                const buttonMenu = element.shadowRoot.querySelector(
                    '[data-element-id="context-event-button-menu"]'
                );
                buttonMenu.dispatchEvent(
                    new CustomEvent('select', { detail: { value: 'action3' } })
                );

                expect(actionSelectEventHandler).toHaveBeenCalled();
                expect(
                    actionSelectEventHandler.mock.calls[0][0].detail.name
                ).toBe('action3');
            });
        });

        it('Close button', () => {
            const closeEventHandler = jest.fn();
            element.addEventListener('close', closeEventHandler);
            element.show = true;

            return Promise.resolve().then(() => {
                const closeButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-detail-popover-close-button"]'
                );
                closeButton.click();

                expect(closeEventHandler).toHaveBeenCalled();
            });
        });

        describe('Keyboard events', () => {
            it('Escape key', () => {
                const closeEventHandler = jest.fn();
                element.addEventListener('close', closeEventHandler);
                element.show = true;

                return Promise.resolve().then(() => {
                    const popover = element.shadowRoot.querySelector(
                        '[data-element-id="div-detail-popover"]'
                    );
                    popover.dispatchEvent(
                        new KeyboardEvent('keyup', { key: 'Escape' })
                    );

                    expect(closeEventHandler).toHaveBeenCalled();
                });
            });

            it('Other key', () => {
                const closeEventHandler = jest.fn();
                element.addEventListener('close', closeEventHandler);
                element.show = true;

                return Promise.resolve().then(() => {
                    const popover = element.shadowRoot.querySelector(
                        '[data-element-id="div-detail-popover"]'
                    );
                    popover.dispatchEvent(
                        new KeyboardEvent('keyup', { key: 'Enter' })
                    );

                    expect(closeEventHandler).not.toHaveBeenCalled();
                });
            });
        });
    });
});
