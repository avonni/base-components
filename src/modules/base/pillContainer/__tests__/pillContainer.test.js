import { createElement } from 'lwc';
import PillContainer from '../pillContainer';

// Not tested:
// Resize observer
// Infinite scroll in the single-line collapsed popover
// Auto scroll on drag in the single-line collapsed popover
// Positioning of the action menu

const ACTIONS = [
    {
        label: 'action 1',
        name: 'action-1',
        iconName: 'utility:user',
        disabled: true
    },
    {
        label: 'action 2',
        name: 'action-2'
    }
];

const ITEMS = [
    {
        href: '#first-pill',
        label: 'First pill',
        name: 'first',
        avatar: {
            fallbackIconName: 'custom:custom1',
            variant: 'circle'
        }
    },
    {
        label: 'Second pill',
        name: 'second'
    },
    {
        label: 'Third pill',
        name: 'third',
        avatar: {
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
            initials: 'FP'
        }
    }
];

let element;
expect.extend({
    toHavePosition(initialIndex, position) {
        const instructions = element.shadowRoot.querySelector(
            '[data-element-id="span-instructions"]'
        );
        const pills = element.shadowRoot.querySelectorAll(
            '[data-element-id="avonni-primitive-pill"]'
        );
        const label = pills[initialIndex].label;
        const total = pills.length;
        const altText = `${label}. ${position} / ${total}`;
        return {
            pass: instructions.textContent === altText,
            message: () =>
                `Expected assistive text to be "${altText}", but got "${instructions.textContent}"`
        };
    }
});

describe('Pill Container', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        jest.clearAllMocks();
        jest.clearAllTimers();
    });

    beforeEach(() => {
        element = createElement('avonni-pill-container', {
            is: PillContainer
        });
        document.body.appendChild(element);
        jest.useFakeTimers();
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
            setTimeout(() => cb(), 0);
        });
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.actions).toEqual([]);
            expect(element.alternativeText).toBe('Selected Options:');
            expect(element.isCollapsible).toBeFalsy();
            expect(element.isExpanded).toBeFalsy();
            expect(element.items).toEqual([]);
            expect(element.showMoreButtonLabel).toBe('more');
            expect(element.singleLine).toBeFalsy();
            expect(element.sortable).toBeFalsy();
        });

        describe('actions', () => {
            it('Passed to the component', () => {
                const actions = [
                    {
                        label: 'Action 1',
                        disabled: true,
                        name: 'action1'
                    },
                    {
                        label: 'Action 2',
                        name: 'action2',
                        iconName: 'utility:down'
                    }
                ];
                element.items = ITEMS;
                element.actions = actions;

                return Promise.resolve().then(() => {
                    const pills = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-primitive-pill"]'
                    );
                    pills.forEach((pill) => {
                        expect(pill.actions).toEqual(actions);
                    });
                });
            });
        });

        describe('alternativeText', () => {
            it('Passed to the component', () => {
                element.alternativeText = 'Some alt text';

                return Promise.resolve().then(() => {
                    const altText = element.shadowRoot.querySelector(
                        '[data-element-id="span-alternative-text"]'
                    );
                    expect(altText.textContent).toBe('Some alt text');
                });
            });
        });

        describe('isCollapsible and isExpanded', () => {
            it('Passed to the component', () => {
                const wrapper = element.shadowRoot.querySelector(
                    '[data-element-id="div-wrapper"]'
                );
                jest.spyOn(wrapper, 'offsetWidth', 'get').mockImplementation(
                    () => 150
                );
                element.items = ITEMS;
                element.showMoreButtonLabel = 'mores';

                return Promise.resolve()
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button-show-more"]'
                        );
                        expect(button).toBeFalsy();

                        const items = element.shadowRoot.querySelectorAll(
                            '[data-element-id="li-item"]'
                        );
                        items.forEach((it) => {
                            jest.spyOn(
                                it,
                                'offsetWidth',
                                'get'
                            ).mockImplementation(() => 50);
                        });

                        element.isCollapsible = true;
                    })
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button-show-more"]'
                        );
                        expect(button).toBeTruthy();
                        expect(button.label).toBe('+2 mores');

                        const items = element.shadowRoot.querySelectorAll(
                            '[data-element-id="li-item"]'
                        );
                        expect(items).toHaveLength(1);

                        element.isExpanded = true;
                    })
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button-show-more"]'
                        );
                        expect(button).toBeFalsy();

                        const items = element.shadowRoot.querySelectorAll(
                            '[data-element-id="li-item"]'
                        );
                        expect(items).toHaveLength(ITEMS.length);
                    });
            });

            it('expand collapsed pills on button click', () => {
                const wrapper = element.shadowRoot.querySelector(
                    '[data-element-id="div-wrapper"]'
                );
                jest.spyOn(wrapper, 'offsetWidth', 'get').mockImplementation(
                    () => 150
                );
                element.items = ITEMS;

                return Promise.resolve()
                    .then(() => {
                        const items = element.shadowRoot.querySelectorAll(
                            '[data-element-id="li-item"]'
                        );
                        items.forEach((it) => {
                            jest.spyOn(
                                it,
                                'offsetWidth',
                                'get'
                            ).mockImplementation(() => 50);
                        });
                        element.isCollapsible = true;
                    })
                    .then(() => {
                        const items = element.shadowRoot.querySelectorAll(
                            '[data-element-id="li-item"]'
                        );
                        expect(items).toHaveLength(1);

                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button-show-more"]'
                        );
                        button.click();
                    })
                    .then(() => {
                        const items = element.shadowRoot.querySelectorAll(
                            '[data-element-id="li-item"]'
                        );
                        expect(items).toHaveLength(ITEMS.length);
                    });
            });

            it('open collapsed popover on single-line button click', () => {
                const wrapper = element.shadowRoot.querySelector(
                    '[data-element-id="div-wrapper"]'
                );
                jest.spyOn(wrapper, 'offsetWidth', 'get').mockImplementation(
                    () => 150
                );
                element.items = ITEMS;
                element.singleLine = true;

                return Promise.resolve()
                    .then(() => {
                        const items = element.shadowRoot.querySelectorAll(
                            '[data-element-id="li-item"]'
                        );
                        items.forEach((it) => {
                            jest.spyOn(
                                it,
                                'offsetWidth',
                                'get'
                            ).mockImplementation(() => 50);
                        });
                        element.isCollapsible = true;
                    })
                    .then(() => {
                        const items = element.shadowRoot.querySelectorAll(
                            '[data-element-id="li-item"]'
                        );
                        expect(items).toHaveLength(1);

                        const popover = element.shadowRoot.querySelector(
                            '[data-element-id="div-popover"]'
                        );
                        expect(popover).toBeFalsy();

                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button-show-more"]'
                        );
                        button.click();
                    })
                    .then(() => {
                        const items = element.shadowRoot.querySelectorAll(
                            '[data-element-id="li-item"]'
                        );
                        expect(items).toHaveLength(1);

                        const popover = element.shadowRoot.querySelector(
                            '[data-element-id="div-popover"]'
                        );
                        expect(popover).toBeTruthy();

                        const hiddenItems = element.shadowRoot.querySelectorAll(
                            '[data-element-id="li-item-hidden"]'
                        );
                        expect(hiddenItems).toHaveLength(ITEMS.length - 1);
                    });
            });

            it('close single-line collapsed popover on focusout', () => {
                const wrapper = element.shadowRoot.querySelector(
                    '[data-element-id="div-wrapper"]'
                );
                jest.spyOn(wrapper, 'offsetWidth', 'get').mockImplementation(
                    () => 150
                );
                element.items = ITEMS;
                element.singleLine = true;

                return Promise.resolve()
                    .then(() => {
                        const items = element.shadowRoot.querySelectorAll(
                            '[data-element-id="li-item"]'
                        );
                        items.forEach((it) => {
                            jest.spyOn(
                                it,
                                'offsetWidth',
                                'get'
                            ).mockImplementation(() => 50);
                        });
                        element.isCollapsible = true;
                    })
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button-show-more"]'
                        );
                        button.click();
                    })
                    .then(() => {
                        const popover = element.shadowRoot.querySelector(
                            '[data-element-id="div-popover"]'
                        );
                        expect(popover).toBeTruthy();

                        popover.dispatchEvent(new CustomEvent('focusout'));
                        jest.runAllTimers();
                    })
                    .then(() => {
                        const popover = element.shadowRoot.querySelector(
                            '[data-element-id="div-popover"]'
                        );
                        expect(popover).toBeFalsy();
                    });
            });
        });

        describe('items', () => {
            it('Passed to the component', () => {
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    const pills = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-primitive-pill"]'
                    );
                    expect(pills).toHaveLength(ITEMS.length);

                    pills.forEach((pill, index) => {
                        expect(pill.avatar).toEqual(ITEMS[index].avatar);
                        expect(pill.href).toBe(ITEMS[index].href);
                        expect(pill.label).toBe(ITEMS[index].label);
                    });
                });
            });
        });

        describe('singleLine', () => {
            it('Passed to the component when false', () => {
                element.singleLine = false;
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector(
                        '[data-element-id="div-wrapper"]'
                    );
                    expect(wrapper.className).toBe(
                        'avonni-pill-container__wrapper slds-is-relative'
                    );

                    const ul = element.shadowRoot.querySelector(
                        '[data-element-id="ul"]'
                    );
                    expect(ul.classList).not.toContain('slds-listbox_inline');

                    const li = element.shadowRoot.querySelector(
                        '[data-element-id="li-item"]'
                    );
                    expect(li.classList).not.toContain(
                        'avonni-pill-container__item_sortable-single-line'
                    );
                });
            });

            it('Passed to the component when true', () => {
                element.singleLine = true;
                element.sortable = true;
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector(
                        '[data-element-id="div-wrapper"]'
                    );
                    expect(wrapper.className).toBe(
                        'avonni-pill-container__wrapper slds-is-relative slds-pill_container'
                    );

                    const ul = element.shadowRoot.querySelector(
                        '[data-element-id="ul"]'
                    );
                    expect(ul.classList).toContain('slds-listbox_inline');

                    const li = element.shadowRoot.querySelector(
                        '[data-element-id="li-item"]'
                    );
                    expect(li.classList).toContain(
                        'avonni-pill-container__item_sortable-single-line'
                    );
                });
            });
        });

        describe('sortable', () => {
            it('Passed to the component when false', () => {
                element.sortable = false;
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    const pill = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-pill"]'
                    );
                    expect(pill.classList).not.toContain(
                        'avonni-pill-container__pill-sortable'
                    );

                    const li = element.shadowRoot.querySelector(
                        '[data-element-id="li-item"]'
                    );
                    expect(li.classList).not.toContain('slds-is-relative');
                    expect(li.classList).not.toContain(
                        'avonni-pill-container__item_sortable-single-line'
                    );
                });
            });

            it('Passed to the component when true', () => {
                element.sortable = true;
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    const pill = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-pill"]'
                    );
                    expect(pill.classList).toContain(
                        'avonni-pill-container__pill-sortable'
                    );

                    const li = element.shadowRoot.querySelector(
                        '[data-element-id="li-item"]'
                    );
                    expect(li.classList).toContain('slds-is-relative');
                    expect(li.classList).not.toContain(
                        'avonni-pill-container__item_sortable-single-line'
                    );
                });
            });
        });
    });

    describe('Methods', () => {
        describe('focus', () => {
            it('No items', () => {
                const ul = element.shadowRoot.querySelector(
                    '[data-element-id="ul"]'
                );
                const spy = jest.spyOn(ul, 'focus');

                element.focus();
                expect(spy).toHaveBeenCalled();
            });

            it('Item with no link', () => {
                element.items = [ITEMS[1]];

                return Promise.resolve().then(() => {
                    const pill = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-pill"]'
                    );
                    const focusSpy = jest.spyOn(pill, 'focus');
                    const focusLinkSpy = jest.spyOn(pill, 'focusLink');

                    element.focus();
                    expect(focusSpy).toHaveBeenCalled();
                    expect(focusLinkSpy).not.toHaveBeenCalled();
                });
            });

            it('Item with a link', () => {
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    const pill = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-pill"]'
                    );
                    const focusSpy = jest.spyOn(pill, 'focus');
                    const focusLinkSpy = jest.spyOn(pill, 'focusLink');

                    element.focus();
                    expect(focusSpy).not.toHaveBeenCalled();
                    expect(focusLinkSpy).toHaveBeenCalled();
                });
            });

            it('Is called on pill click', () => {
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    const pills = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-primitive-pill"]'
                    );
                    const focusSpy = jest.spyOn(pills[1], 'focus');

                    expect(pills[1].tabIndex).toBe(-1);
                    pills[1].click();
                    expect(pills[1].tabIndex).toBe(0);
                    expect(focusSpy).toHaveBeenCalled();
                });
            });

            it('focused item changes on keyboard navigation', () => {
                element.items = ITEMS;
                const keyDown = new CustomEvent('keydown');

                return Promise.resolve().then(() => {
                    const pills = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-primitive-pill"]'
                    );
                    const ul = element.shadowRoot.querySelector(
                        '[data-element-id="ul"]'
                    );
                    const focusSpy = jest.spyOn(pills[1], 'focus');
                    const focusLinkSpy = jest.spyOn(pills[0], 'focusLink');

                    // Press right
                    keyDown.key = 'ArrowRight';
                    ul.dispatchEvent(keyDown);
                    expect(pills[1].tabIndex).toBe(0);
                    expect(focusSpy).toHaveBeenCalled();

                    // Press left
                    keyDown.key = 'ArrowLeft';
                    ul.dispatchEvent(keyDown);
                    expect(pills[1].tabIndex).toBe(-1);
                    expect(pills[0].tabIndex).toBe(0);
                    expect(focusLinkSpy).toHaveBeenCalled();

                    // Press left again, to loop back to the last item
                    keyDown.key = 'ArrowLeft';
                    ul.dispatchEvent(keyDown);
                    expect(pills[0].tabIndex).toBe(-1);
                    expect(pills[2].tabIndex).toBe(0);

                    // Press right again, to loop back to the first item
                    keyDown.key = 'ArrowRight';
                    ul.dispatchEvent(keyDown);
                    expect(pills[0].tabIndex).toBe(0);
                    expect(pills[2].tabIndex).toBe(-1);
                });
            });
        });
    });

    describe('Events', () => {
        describe('actionclick', () => {
            it('Is called when an action is clicked', () => {
                element.items = ITEMS;
                element.actions = [ACTIONS[0]];

                const handler = jest.fn();
                element.addEventListener('actionclick', handler);

                return Promise.resolve().then(() => {
                    const pills = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-primitive-pill"]'
                    );
                    pills[2].dispatchEvent(
                        new CustomEvent('actionclick', {
                            detail: {
                                name: 'action-1'
                            },
                            bubbles: true
                        })
                    );

                    expect(handler).toHaveBeenCalled();
                    const event = handler.mock.calls[0][0];
                    expect(event.detail.name).toBe('action-1');
                    expect(event.detail.index).toBe(2);
                    expect(event.bubbles).toBeFalsy();
                    expect(event.cancelable).toBeFalsy();
                    expect(event.composed).toBeFalsy();
                });
            });

            it('actionclick event through action menu', () => {
                element.items = ITEMS;
                element.actions = ACTIONS;

                const handler = jest.fn();
                element.addEventListener('actionclick', handler);

                return Promise.resolve()
                    .then(() => {
                        // Open action menu
                        const actionMenu = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-dropdown-menu"]'
                        );
                        expect(actionMenu).toBeFalsy();

                        const pills = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-primitive-pill"]'
                        );
                        pills[2].dispatchEvent(
                            new CustomEvent('openactionmenu', {
                                detail: {
                                    targetName: ITEMS[2].name,
                                    bounds: { x: 12, y: 44 }
                                },
                                bubbles: true
                            })
                        );
                    })
                    .then(() => {
                        // Select an action
                        const actionMenu = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-dropdown-menu"]'
                        );
                        actionMenu.dispatchEvent(
                            new CustomEvent('privateselect', {
                                detail: { name: ACTIONS[1].name }
                            })
                        );

                        expect(handler).toHaveBeenCalled();
                        const detail = handler.mock.calls[0][0].detail;
                        expect(detail.index).toBe(2);
                        expect(detail.targetName).toBe(ITEMS[2].name);
                        expect(detail.name).toBe(ACTIONS[1].name);
                    });
            });

            it('Is called when the action menu is closed', () => {
                element.items = ITEMS;
                element.actions = ACTIONS;

                const handler = jest.fn();
                element.addEventListener('actionclick', handler);
                let spy;

                return Promise.resolve()
                    .then(() => {
                        // Open action menu
                        const actionMenu = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-dropdown-menu"]'
                        );
                        expect(actionMenu).toBeFalsy();

                        const pills = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-primitive-pill"]'
                        );
                        pills[2].dispatchEvent(
                            new CustomEvent('openactionmenu', {
                                detail: {
                                    targetName: ITEMS[2].name,
                                    bounds: { x: 12, y: 44 }
                                },
                                bubbles: true
                            })
                        );
                    })
                    .then(() => {
                        // Close action menu, pill should be focused
                        jest.runAllTimers();
                        const actionMenu = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-dropdown-menu"]'
                        );
                        expect(actionMenu).toBeTruthy();
                        expect(actionMenu.items).toEqual(ACTIONS);

                        const pills = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-primitive-pill"]'
                        );
                        spy = jest.spyOn(pills[2], 'focus');
                        actionMenu.dispatchEvent(new CustomEvent('close'));
                    })
                    .then(() => {
                        expect(spy).toHaveBeenCalled();
                    });
            });
        });

        describe('Open action menu', () => {
            it('From single-line collapsed popover', () => {
                const wrapper = element.shadowRoot.querySelector(
                    '[data-element-id="div-wrapper"]'
                );
                jest.spyOn(wrapper, 'offsetWidth', 'get').mockImplementation(
                    () => 150
                );
                element.items = ITEMS;
                element.singleLine = true;
                element.actions = ACTIONS;

                return Promise.resolve()
                    .then(() => {
                        const items = element.shadowRoot.querySelectorAll(
                            '[data-element-id="li-item"]'
                        );
                        items.forEach((it) => {
                            jest.spyOn(
                                it,
                                'offsetWidth',
                                'get'
                            ).mockImplementation(() => 50);
                        });
                        element.isCollapsible = true;
                    })
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button-show-more"]'
                        );
                        button.click();
                    })
                    .then(() => {
                        const hiddenPills = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-primitive-pill-hidden"]'
                        );
                        hiddenPills[1].dispatchEvent(
                            new CustomEvent('openactionmenu', {
                                detail: {
                                    targetName: ITEMS[2].name,
                                    bounds: { x: 12, y: 44 }
                                },
                                bubbles: true
                            })
                        );
                    })
                    .then(() => {
                        jest.runAllTimers();
                        const actionMenu = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-dropdown-menu"]'
                        );
                        expect(actionMenu).toBeTruthy();
                        expect(actionMenu.items).toEqual(ACTIONS);
                    });
            });
        });

        describe('Blur', () => {
            it('blur event', () => {
                element.items = ITEMS;

                const handler = jest.fn();
                element.addEventListener('blur', handler);

                return Promise.resolve().then(() => {
                    const pills = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-primitive-pill"]'
                    );
                    pills[2].dispatchEvent(
                        new FocusEvent('focusout', {
                            bubbles: true
                        })
                    );

                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                });
            });
        });

        describe('Expand', () => {
            it('expand event', () => {
                const wrapper = element.shadowRoot.querySelector(
                    '[data-element-id="div-wrapper"]'
                );
                jest.spyOn(wrapper, 'offsetWidth', 'get').mockImplementation(
                    () => 150
                );
                element.items = ITEMS;

                const handler = jest.fn();
                element.addEventListener('expand', handler);

                return Promise.resolve()
                    .then(() => {
                        const items = element.shadowRoot.querySelectorAll(
                            '[data-element-id="li-item"]'
                        );
                        items.forEach((it) => {
                            jest.spyOn(
                                it,
                                'offsetWidth',
                                'get'
                            ).mockImplementation(() => 50);
                        });
                        element.isCollapsible = true;
                    })
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button-show-more"]'
                        );
                        button.click();

                        expect(handler).toHaveBeenCalled();
                        const call = handler.mock.calls[0][0];
                        expect(call.bubbles).toBeFalsy();
                        expect(call.cancelable).toBeFalsy();
                        expect(call.composed).toBeFalsy();
                    });
            });
        });

        describe('Focus', () => {
            it('focus event', () => {
                element.items = ITEMS;

                const handler = jest.fn();
                element.addEventListener('focus', handler);

                return Promise.resolve().then(() => {
                    const pills = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-primitive-pill"]'
                    );
                    pills[1].dispatchEvent(
                        new FocusEvent('focusin', {
                            bubbles: true
                        })
                    );

                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                });
            });
        });

        describe('Itemclick', () => {
            it('itemclick event', () => {
                element.items = ITEMS;
                element.sortable = true;

                const handler = jest.fn();
                element.addEventListener('itemclick', handler);

                return Promise.resolve().then(() => {
                    const items = element.shadowRoot.querySelectorAll(
                        '[data-element-id="li-item"]'
                    );
                    const mousedown = new MouseEvent('mousedown');
                    mousedown.pageX = 100;
                    mousedown.pageY = 100;
                    items[0].dispatchEvent(mousedown);
                    jest.runAllTimers();

                    const mousemove = new CustomEvent('mousemove');
                    mousemove.pageX = 102; // not enough to be considered as a drag
                    mousemove.pageY = 100;
                    items[0].dispatchEvent(mousemove);

                    const wrapper = element.shadowRoot.querySelector(
                        '[data-element-id="div-wrapper"]'
                    );
                    expect(wrapper.classList).not.toContain(
                        'avonni-pill-container__list_dragging'
                    );

                    items[0].dispatchEvent(new MouseEvent('mouseup'));
                    expect(handler).toHaveBeenCalled();
                    const event = handler.mock.calls[0][0];
                    expect(event.detail).toEqual({
                        index: 0,
                        targetName: ITEMS[0].name
                    });
                    expect(event.bubbles).toBeFalsy();
                    expect(event.cancelable).toBeFalsy();
                    expect(event.composed).toBeFalsy();

                    expect(wrapper.classList).not.toContain(
                        'avonni-pill-container__list_dragging'
                    );
                    expect(items[1].classList).not.toContain(
                        'avonni-pill-container__pill_after-border'
                    );
                });
            });
        });

        describe('Reorder', () => {
            it('To the right', () => {
                element.items = ITEMS;
                element.sortable = true;

                const handler = jest.fn();
                element.addEventListener('reorder', handler);

                return Promise.resolve().then(() => {
                    const items = element.shadowRoot.querySelectorAll(
                        '[data-element-id="li-item"]'
                    );
                    const mousedown = new MouseEvent('mousedown');
                    mousedown.pageX = 100;
                    mousedown.pageY = 100;
                    items[0].dispatchEvent(mousedown);
                    jest.runAllTimers();

                    items[1].getBoundingClientRect = jest
                        .fn()
                        .mockImplementation(() => {
                            return {
                                left: 50,
                                width: 10
                            };
                        });
                    const mousemove = new CustomEvent('mousemove');
                    mousemove.pageX = 110;
                    mousemove.pageY = 100;
                    mousemove.clientX = 70;
                    items[1].dispatchEvent(mousemove);

                    const wrapper = element.shadowRoot.querySelector(
                        '[data-element-id="div-wrapper"]'
                    );
                    expect(wrapper.classList).toContain(
                        'avonni-pill-container__list_dragging'
                    );
                    expect(items[1].classList).toContain(
                        'avonni-pill-container__pill_after-border'
                    );
                    expect(0).toHavePosition(2);

                    element.dispatchEvent(
                        new MouseEvent('mouseup', { bubbles: true })
                    );
                    expect(handler).toHaveBeenCalled();
                    const event = handler.mock.calls[0][0];
                    expect(event.detail.items).toEqual([
                        ITEMS[1],
                        ITEMS[0],
                        ITEMS[2]
                    ]);
                    expect(event.bubbles).toBeFalsy();
                    expect(event.cancelable).toBeFalsy();
                    expect(event.composed).toBeFalsy();

                    expect(wrapper.classList).not.toContain(
                        'avonni-pill-container__list_dragging'
                    );
                    expect(items[1].classList).not.toContain(
                        'avonni-pill-container__pill_after-border'
                    );
                });
            });

            it('To the left', () => {
                element.items = ITEMS;
                element.sortable = true;

                const handler = jest.fn();
                element.addEventListener('reorder', handler);

                return Promise.resolve().then(() => {
                    const items = element.shadowRoot.querySelectorAll(
                        '[data-element-id="li-item"]'
                    );
                    const mousedown = new MouseEvent('mousedown');
                    mousedown.pageX = 100;
                    mousedown.pageY = 100;
                    items[2].dispatchEvent(mousedown);
                    jest.runAllTimers();

                    items[1].getBoundingClientRect = jest
                        .fn()
                        .mockImplementation(() => {
                            return {
                                left: 50,
                                width: 10
                            };
                        });
                    const mousemove = new CustomEvent('mousemove');
                    mousemove.pageX = 100;
                    mousemove.pageY = 110;
                    mousemove.clientX = 30;
                    items[1].dispatchEvent(mousemove);

                    const wrapper = element.shadowRoot.querySelector(
                        '[data-element-id="div-wrapper"]'
                    );
                    expect(wrapper.classList).toContain(
                        'avonni-pill-container__list_dragging'
                    );
                    expect(items[1].classList).toContain(
                        'avonni-pill-container__pill_before-border'
                    );
                    expect(2).toHavePosition(2);

                    element.dispatchEvent(
                        new MouseEvent('mouseup', { bubbles: true })
                    );
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.items).toEqual([
                        ITEMS[0],
                        ITEMS[2],
                        ITEMS[1]
                    ]);
                });
            });

            it('Using keyboard', () => {
                element.items = ITEMS;
                element.sortable = true;

                const handler = jest.fn();
                element.addEventListener('reorder', handler);
                const keyDown = new CustomEvent('keydown');

                return Promise.resolve()
                    .then(() => {
                        const items = element.shadowRoot.querySelectorAll(
                            '[data-element-id="li-item"]'
                        );
                        const ul = element.shadowRoot.querySelector(
                            '[data-element-id="ul"]'
                        );

                        // Press space
                        keyDown.key = ' ';
                        ul.dispatchEvent(keyDown);
                        const wrapper = element.shadowRoot.querySelector(
                            '[data-element-id="div-wrapper"]'
                        );
                        expect(wrapper.classList).toContain(
                            'avonni-pill-container__list_dragging'
                        );
                        expect(0).toHavePosition(1);

                        // Press right more times than the length of the list
                        keyDown.key = 'ArrowRight';
                        ul.dispatchEvent(keyDown);
                        expect(items[1].classList).toContain(
                            'avonni-pill-container__pill_after-border'
                        );
                        ul.dispatchEvent(keyDown);
                        expect(items[2].classList).toContain(
                            'avonni-pill-container__pill_after-border'
                        );
                        ul.dispatchEvent(keyDown);
                        expect(items[2].classList).toContain(
                            'avonni-pill-container__pill_after-border'
                        );
                        expect(0).toHavePosition(3);

                        // Press space
                        keyDown.key = ' ';
                        ul.dispatchEvent(keyDown);
                        expect(handler).toHaveBeenCalledTimes(1);
                        expect(handler.mock.calls[0][0].detail.items).toEqual([
                            ITEMS[1],
                            ITEMS[2],
                            ITEMS[0]
                        ]);
                    })
                    .then(() => {
                        const items = element.shadowRoot.querySelectorAll(
                            '[data-element-id="li-item"]'
                        );
                        const ul = element.shadowRoot.querySelector(
                            '[data-element-id="ul"]'
                        );

                        // Press space
                        ul.dispatchEvent(keyDown);
                        expect(2).toHavePosition(3);

                        // Press left more times than the length of the list
                        keyDown.key = 'ArrowLeft';
                        ul.dispatchEvent(keyDown);
                        expect(items[1].classList).toContain(
                            'avonni-pill-container__pill_before-border'
                        );
                        ul.dispatchEvent(keyDown);
                        expect(items[0].classList).toContain(
                            'avonni-pill-container__pill_before-border'
                        );
                        ul.dispatchEvent(keyDown);
                        expect(items[0].classList).toContain(
                            'avonni-pill-container__pill_before-border'
                        );
                        expect(2).toHavePosition(1);

                        // Press space
                        keyDown.key = ' ';
                        ul.dispatchEvent(keyDown);
                        expect(handler).toHaveBeenCalledTimes(2);
                        expect(handler.mock.calls[1][0].detail.items).toEqual([
                            ITEMS[0],
                            ITEMS[1],
                            ITEMS[2]
                        ]);
                    });
            });

            it('cancel movement using keyboard', () => {
                element.items = ITEMS;
                element.sortable = true;

                const handler = jest.fn();
                element.addEventListener('reorder', handler);
                const keyDown = new CustomEvent('keydown');

                return Promise.resolve().then(() => {
                    const ul = element.shadowRoot.querySelector(
                        '[data-element-id="ul"]'
                    );

                    // Press space
                    keyDown.key = ' ';
                    ul.dispatchEvent(keyDown);

                    // Press right
                    keyDown.key = 'ArrowRight';
                    ul.dispatchEvent(keyDown);

                    // Press escape
                    keyDown.key = 'Escape';
                    ul.dispatchEvent(keyDown);
                    expect(handler).not.toHaveBeenCalled();
                });
            });

            it('from single-line collapsed popover to visible pill', () => {
                const wrapper = element.shadowRoot.querySelector(
                    '[data-element-id="div-wrapper"]'
                );
                jest.spyOn(wrapper, 'offsetWidth', 'get').mockImplementation(
                    () => 150
                );

                element.items = ITEMS;
                element.sortable = true;
                element.singleLine = true;

                const handler = jest.fn();
                element.addEventListener('reorder', handler);

                return Promise.resolve()
                    .then(() => {
                        // Collapse the items
                        const items = element.shadowRoot.querySelectorAll(
                            '[data-element-id="li-item"]'
                        );
                        items.forEach((it) => {
                            jest.spyOn(
                                it,
                                'offsetWidth',
                                'get'
                            ).mockImplementation(() => 50);
                        });
                        element.isCollapsible = true;
                    })
                    .then(() => {
                        // Open the popover
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button-show-more"]'
                        );
                        button.click();
                    })
                    .then(() => {
                        // Start dragging
                        const hiddenItems = element.shadowRoot.querySelectorAll(
                            '[data-element-id="li-item-hidden"]'
                        );
                        const mousedown = new CustomEvent('mousedown');
                        mousedown.pageX = 100;
                        mousedown.pageY = 100;
                        hiddenItems[0].dispatchEvent(mousedown);
                        jest.runAllTimers();

                        // Move at the beginning of the list
                        const items = element.shadowRoot.querySelectorAll(
                            '[data-element-id="li-item"]'
                        );
                        jest.spyOn(
                            items[0],
                            'getBoundingClientRect'
                        ).mockImplementation(() => {
                            return { left: 3, width: 50, top: 120, height: 20 };
                        });
                        const mouseMove = new CustomEvent('mousemove');
                        mouseMove.pageX = 100;
                        mouseMove.pageY = 110;
                        mouseMove.clientX = 12;
                        items[0].dispatchEvent(mouseMove);

                        expect(items[0].classList).toContain(
                            'avonni-pill-container__pill_before-border'
                        );
                        items[0].dispatchEvent(
                            new CustomEvent('mouseup', { bubbles: true })
                        );

                        expect(handler).toHaveBeenCalledTimes(1);
                        const detail = handler.mock.calls[0][0].detail;
                        expect(detail.items).toEqual([
                            ITEMS[1],
                            ITEMS[0],
                            ITEMS[2]
                        ]);
                    });
            });

            it('from visible pill to single-line collapsed popover', () => {
                const wrapper = element.shadowRoot.querySelector(
                    '[data-element-id="div-wrapper"]'
                );
                jest.spyOn(wrapper, 'offsetWidth', 'get').mockImplementation(
                    () => 150
                );

                element.items = ITEMS;
                element.sortable = true;
                element.singleLine = true;

                const handler = jest.fn();
                element.addEventListener('reorder', handler);

                return Promise.resolve()
                    .then(() => {
                        // Collapse the items
                        const items = element.shadowRoot.querySelectorAll(
                            '[data-element-id="li-item"]'
                        );
                        items.forEach((it) => {
                            jest.spyOn(
                                it,
                                'offsetWidth',
                                'get'
                            ).mockImplementation(() => 50);
                        });
                        element.isCollapsible = true;
                    })
                    .then(() => {
                        // Start dragging
                        const items = element.shadowRoot.querySelectorAll(
                            '[data-element-id="li-item"]'
                        );
                        items.forEach((it) => {
                            jest.spyOn(
                                it,
                                'offsetWidth',
                                'get'
                            ).mockImplementation(() => 50);
                        });
                        const mousedown = new CustomEvent('mousedown');
                        mousedown.pageX = 100;
                        mousedown.pageY = 100;
                        items[0].dispatchEvent(mousedown);
                        jest.runAllTimers();

                        // Hover the button to open the popover
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button-show-more"]'
                        );
                        button.dispatchEvent(new CustomEvent('mouseenter'));
                        jest.runAllTimers();
                    })
                    .then(() => {
                        // Move at the bottom of the first hidden item
                        const popover = element.shadowRoot.querySelector(
                            '[data-element-id="div-popover"]'
                        );
                        expect(popover).toBeTruthy();

                        const hiddenItems = element.shadowRoot.querySelectorAll(
                            '[data-element-id="li-item-hidden"]'
                        );
                        jest.spyOn(
                            hiddenItems[0],
                            'getBoundingClientRect'
                        ).mockImplementation(() => {
                            return { left: 3, width: 50, top: 120, height: 20 };
                        });
                        const mouseMove = new CustomEvent('mousemove');
                        mouseMove.pageX = 110;
                        mouseMove.pageY = 100;
                        mouseMove.clientY = 135;
                        hiddenItems[0].dispatchEvent(mouseMove);
                        expect(hiddenItems[0].classList).toContain(
                            'avonni-pill-container__pill_after-border'
                        );

                        hiddenItems[0].dispatchEvent(
                            new CustomEvent('mouseup', { bubbles: true })
                        );
                        expect(handler).toHaveBeenCalledTimes(1);
                        const detail = handler.mock.calls[0][0].detail;
                        expect(detail.items).toEqual([
                            ITEMS[1],
                            ITEMS[0],
                            ITEMS[2]
                        ]);
                    });
            });
        });
    });
});
