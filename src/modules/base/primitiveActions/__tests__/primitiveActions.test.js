import { createElement } from 'lwc';
import PrimitiveActions from 'c/primitiveActions';

const ACTIONS = [
    {
        name: 'action1',
        label: 'Action 1',
        disabled: false,
        iconName: 'utility:check'
    },
    { name: 'action2', disabled: true, iconName: 'utility:close' }
];

let element;
describe('Primitive Actions', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('avonni-primitive-actions', {
            is: PrimitiveActions
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.actions).toEqual([]);
            expect(element.buttonIconSize).toBeUndefined();
            expect(element.buttonIconVariant).toBeUndefined();
            expect(element.visibleActions).toBeUndefined();
        });

        describe('Actions', () => {
            it('Multiple', () => {
                element.actions = ACTIONS;

                return Promise.resolve().then(() => {
                    const buttonGroup = element.shadowRoot.querySelector(
                        'lightning-button-group'
                    );
                    const buttons =
                        buttonGroup.querySelectorAll('lightning-button');
                    const buttonIcons = buttonGroup.querySelectorAll(
                        'lightning-button-icon'
                    );

                    expect(buttons.length).toBe(1);
                    expect(buttonIcons.length).toBe(1);
                    expect(
                        buttonGroup.querySelector('lightning-button-icon')
                    ).toBeTruthy();
                    expect(
                        buttonGroup.querySelector('lightning-button-menu')
                    ).toBeNull();
                });
            });

            it('Single, with label', () => {
                element.actions = [ACTIONS[0]];

                return Promise.resolve().then(() => {
                    const button =
                        element.shadowRoot.querySelector('lightning-button');
                    const buttonIcon = element.shadowRoot.querySelector(
                        'lightning-button-icon'
                    );
                    const buttonGroup = element.shadowRoot.querySelector(
                        'lightning-button-group'
                    );

                    expect(buttonGroup).toBeNull();
                    expect(button).not.toBeNull();
                    expect(buttonIcon).toBeNull();
                    expect(button.label).toBe('Action 1');
                });
            });
        });

        describe('buttonIconSize and buttonIconVariant', () => {
            it('Single, without label', () => {
                element.actions = [ACTIONS[1]];
                element.buttonIconSize = 'small';
                element.buttonIconVariant = 'border-filled';

                return Promise.resolve().then(() => {
                    const button =
                        element.shadowRoot.querySelector('lightning-button');
                    const buttonIcon = element.shadowRoot.querySelector(
                        'lightning-button-icon'
                    );
                    const buttonGroup = element.shadowRoot.querySelector(
                        'lightning-button-group'
                    );

                    expect(buttonGroup).toBeNull();
                    expect(buttonIcon).not.toBeNull();
                    expect(buttonIcon.size).toBe('small');
                    expect(buttonIcon.variant).toBe('border-filled');
                    expect(button).toBeNull();
                });
            });
        });

        describe('visibleActions', () => {
            it('One', () => {
                element.actions = [
                    ...ACTIONS,
                    {
                        name: 'action3',
                        label: 'Action 3',
                        disabled: false,
                        iconName: 'utility:add'
                    }
                ];
                element.visibleActions = 1;

                return Promise.resolve().then(() => {
                    const buttonGroup = element.shadowRoot.querySelector(
                        'lightning-button-group'
                    );
                    const buttons =
                        buttonGroup.querySelectorAll('lightning-button');
                    const buttonIcon = buttonGroup.querySelector(
                        'lightning-button-icon'
                    );
                    const buttonMenu = buttonGroup.querySelector(
                        'lightning-button-menu'
                    );

                    expect(buttons.length).toBe(1);
                    expect(buttonIcon).toBeNull();
                    expect(buttonMenu).not.toBeNull();
                    expect(
                        buttonMenu.querySelectorAll('lightning-menu-item')
                            .length
                    ).toBe(2);
                });
            });
        });
    });

    describe('Events', () => {
        describe('actionclick', () => {
            it('Correct name on button click', () => {
                const handler = jest.fn();
                element.addEventListener('actionclick', handler);
                element.actions = ACTIONS;

                return Promise.resolve().then(() => {
                    const button =
                        element.shadowRoot.querySelector('lightning-button');
                    button.dispatchEvent(new CustomEvent('click'));

                    expect(handler).toHaveBeenCalledWith(
                        expect.objectContaining({
                            detail: { name: 'action1' }
                        })
                    );
                });
            });

            it('Correct name on button-icon click', () => {
                const handler = jest.fn();
                element.addEventListener('actionclick', handler);
                element.actions = ACTIONS;

                return Promise.resolve().then(() => {
                    const buttonIcon = element.shadowRoot.querySelector(
                        'lightning-button-icon'
                    );
                    buttonIcon.dispatchEvent(new CustomEvent('click'));

                    expect(handler).toHaveBeenCalledWith(
                        expect.objectContaining({
                            detail: { name: 'action2' }
                        })
                    );
                });
            });

            it('Correct name on lightning-button-menu select', () => {
                const handler = jest.fn();
                element.addEventListener('actionclick', handler);
                element.actions = ACTIONS;
                element.visibleActions = 0;

                return Promise.resolve().then(() => {
                    const buttonMenu = element.shadowRoot.querySelector(
                        'lightning-button-menu'
                    );
                    buttonMenu.dispatchEvent(
                        new CustomEvent('select', {
                            detail: { value: 'action1' }
                        })
                    );

                    expect(handler).toHaveBeenCalledWith(
                        expect.objectContaining({
                            detail: { name: 'action1' }
                        })
                    );
                });
            });
        });
    });
});
