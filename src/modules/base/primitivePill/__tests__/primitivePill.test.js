import { createElement } from 'lwc';
import PrimitivePill from '../primitivePill';

const ACTIONS = [
    {
        disabled: true,
        iconName: 'utility:down',
        label: 'Disabled action',
        name: 'disabledAction'
    },
    {
        label: 'Action one',
        name: 'one'
    },
    {
        iconName: 'standard:apps',
        label: 'Another action',
        name: 'another'
    }
];

let element;
describe('Primitive Pill', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('avonni-primitive-pill', {
            is: PrimitivePill
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.actions).toEqual([]);
            expect(element.avatar).toBeUndefined();
            expect(element.href).toBeUndefined();
            expect(element.target).toBeUndefined();
            expect(element.label).toBeUndefined();
            expect(element.name).toBeUndefined();
            expect(element.variant).toBe('base');
        });

        describe('actions', () => {
            it('Passed to the component', () => {
                element.actions = ACTIONS;

                return Promise.resolve().then(() => {
                    const actionButton = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-icon"]'
                    );
                    expect(actionButton).toBeTruthy();
                    expect(actionButton.alternativeText).toBe('Actions menu');
                    expect(actionButton.disabled).toBeFalsy();
                    expect(actionButton.iconName).toBe('utility:down');
                });
            });

            it('Passed to the component when only one action', () => {
                element.actions = [ACTIONS[0]];

                return Promise.resolve().then(() => {
                    const actionButton = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-icon"]'
                    );
                    expect(actionButton.alternativeText).toBe(ACTIONS[0].label);
                    expect(actionButton.disabled).toBe(ACTIONS[0].disabled);
                    expect(actionButton.iconName).toBe(ACTIONS[0].iconName);
                });
            });

            it('actions, focus on actions when tab key is pressed', () => {
                element.actions = ACTIONS;

                return Promise.resolve().then(() => {
                    const actionMenu = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-icon"]'
                    );
                    const focusSpy = jest.spyOn(actionMenu, 'focus');
                    const event = new CustomEvent('keydown');
                    const propagationSpy = jest.spyOn(event, 'stopPropagation');
                    const defaultSpy = jest.spyOn(event, 'preventDefault');
                    event.key = 'Tab';

                    element.dispatchEvent(event);
                    expect(focusSpy).toHaveBeenCalledTimes(1);
                    expect(propagationSpy).toHaveBeenCalledTimes(1);
                    expect(defaultSpy).toHaveBeenCalledTimes(1);

                    // The focus is captured only once
                    element.dispatchEvent(event);
                    expect(focusSpy).toHaveBeenCalledTimes(1);
                    expect(propagationSpy).toHaveBeenCalledTimes(1);
                    expect(defaultSpy).toHaveBeenCalledTimes(1);
                });
            });
        });

        describe('avatar', () => {
            it('Passed to the component', () => {
                const avatar = {
                    fallbackIconName: 'standard:account',
                    initials: 'AB',
                    src: 'https://avonni.app',
                    variant: 'circle'
                };
                element.avatar = avatar;

                return Promise.resolve().then(() => {
                    const avatarElement = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-avatar"]'
                    );
                    expect(avatarElement).toBeTruthy();
                    expect(avatarElement.fallbackIconName).toBe(
                        avatar.fallbackIconName
                    );
                    expect(avatarElement.initials).toBe(avatar.initials);
                    expect(avatarElement.src).toBe(avatar.src);
                    expect(avatarElement.variant).toBe(avatar.variant);
                });
            });
        });

        describe('href and label', () => {
            it('Passed to the component', () => {
                element.href = 'https://avonni.app/';
                element.label = 'Some label';
                element.target = '_blank';

                return Promise.resolve()
                    .then(() => {
                        const wrapper = element.shadowRoot.querySelector(
                            '[data-element-id="div-wrapper"]'
                        );
                        const label = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-formatted-rich-text"]'
                        );
                        const link = element.shadowRoot.querySelector(
                            '[data-element-id="a-label"]'
                        );
                        expect(label).toBeFalsy();
                        expect(link).toBeTruthy();
                        expect(link.href).toBe('https://avonni.app/');
                        expect(link.target).toBe('_blank');
                        expect(link.title).toBe('Some label');
                        expect(link.textContent).toBe('Some label');
                        expect(wrapper.classList).toContain(
                            'avonni-primitive-pill__action'
                        );

                        element.href = null;
                    })
                    .then(() => {
                        const wrapper = element.shadowRoot.querySelector(
                            '[data-element-id="div-wrapper"]'
                        );
                        const label = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-formatted-rich-text"]'
                        );
                        const link = element.shadowRoot.querySelector(
                            '[data-element-id="a-label"]'
                        );
                        expect(link).toBeFalsy();
                        expect(label).toBeTruthy();
                        expect(label.title).toBe('Some label');
                        expect(label.value).toBe('Some label');
                        expect(wrapper.classList).not.toContain(
                            'avonni-primitive-pill__action'
                        );
                    });
            });
        });

        describe('variant', () => {
            it('base', () => {
                element.variant = 'base';

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector(
                        '[data-element-id="div-wrapper"]'
                    );
                    expect(wrapper.classList).not.toContain(
                        'avonni-primitive-pill_list'
                    );
                });
            });

            it('list', () => {
                element.variant = 'list';

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector(
                        '[data-element-id="div-wrapper"]'
                    );
                    expect(wrapper.classList).toContain(
                        'avonni-primitive-pill_list'
                    );
                });
            });
        });
    });

    describe('Methods', () => {
        describe('focusLink', () => {
            it('Focus on the link', () => {
                element.href = 'https://avonni.app/';

                return Promise.resolve().then(() => {
                    const link = element.shadowRoot.querySelector(
                        '[data-element-id="a-label"]'
                    );
                    const spy = jest.spyOn(link, 'focus');

                    element.focusLink();
                    expect(spy).toHaveBeenCalled();
                });
            });
        });
    });

    describe('Events', () => {
        describe('actionclick', () => {
            it('Action click event', () => {
                element.actions = [ACTIONS[1]];
                element.name = 'pill-name';

                const handler = jest.fn();
                element.addEventListener('actionclick', handler);

                return Promise.resolve().then(() => {
                    const action = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-icon"]'
                    );
                    action.click();

                    expect(handler).toHaveBeenCalledTimes(1);
                    const call = handler.mock.calls[0][0];
                    expect(call.detail.name).toBe(ACTIONS[1].name);
                    expect(call.detail.targetName).toBe('pill-name');
                    expect(call.bubbles).toBeTruthy();
                    expect(call.cancelable).toBeFalsy();
                    expect(call.composed).toBeFalsy();
                });
            });
        });

        describe('openactionmenu', () => {
            it('Open action menu event', () => {
                element.actions = ACTIONS;
                element.name = 'pill-name';

                const handler = jest.fn();
                element.addEventListener('openactionmenu', handler);

                return Promise.resolve().then(() => {
                    const action = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-icon"]'
                    );
                    action.click();

                    expect(handler).toHaveBeenCalledTimes(1);
                    const call = handler.mock.calls[0][0];
                    expect(call.detail.targetName).toBe('pill-name');
                    expect(call.detail.bounds).toEqual(
                        action.getBoundingClientRect()
                    );
                    expect(call.bubbles).toBeTruthy();
                    expect(call.cancelable).toBeFalsy();
                    expect(call.composed).toBeFalsy();
                });
            });
        });

        describe('Event management relative to the pill container', () => {
            it('Event management relative to the pill container', () => {
                element.actions = ACTIONS;
                element.href = 'https://avonni.app/';

                return Promise.resolve().then(() => {
                    const link = element.shadowRoot.querySelector(
                        '[data-element-id="a-label"]'
                    );
                    const mouseDownEvent = new CustomEvent('mousedown');
                    const spy2 = jest.spyOn(mouseDownEvent, 'preventDefault');
                    link.dispatchEvent(mouseDownEvent);
                    expect(spy2).toHaveBeenCalled();
                });
            });
        });
    });
});
