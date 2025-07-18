import { createElement } from 'lwc';
import PrimitiveDropdownMenu from 'c/primitiveDropdownMenu';

// Not tested because depends on DOM measurements:
// offsetHeight
// offsetWidth

// Many methods were not tested because they depend on keyboard or mouse events

const items = [
    {
        name: 'item-1',
        label: 'Item 1',
        iconName: 'utility:user'
    },
    {
        name: 'item-2',
        label: 'Item 2'
    },
    {
        name: 'item-3',
        label: 'Item 3',
        iconName: 'utility:apps'
    }
];

let element;
describe('PrimitiveDropdownMenu', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-primitive-dropdown-menu', {
            is: PrimitiveDropdownMenu
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.items).toMatchObject([]);
            expect(element.offsetHeight).toBeNull();
            expect(element.offsetWidth).toBeNull();
            expect(element.show).toBeFalsy();
        });

        describe('items', () => {
            it('Passed to the component', () => {
                element.items = items;
                element.show = true;

                return Promise.resolve().then(() => {
                    const itemElements = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="lightning-menu-item"]'
                    );
                    expect(itemElements).toHaveLength(items.length);

                    itemElements.forEach((item, index) => {
                        expect(item.label).toBe(items[index].label);
                        expect(item.prefixIconName).toBe(items[index].iconName);
                        expect(item.value).toBe(items[index].name);
                    });
                });
            });
        });

        describe('show', () => {
            it('Passed to the component when show = false', () => {
                element.show = false;

                return Promise.resolve().then(() => {
                    const popover = element.shadowRoot.querySelector(
                        '[data-element-id="div-popover"]'
                    );
                    expect(popover).toBeFalsy();
                });
            });

            it('Passed to the component when show = true', () => {
                element.show = true;

                return Promise.resolve().then(() => {
                    const popover = element.shadowRoot.querySelector(
                        '[data-element-id="div-popover"]'
                    );
                    expect(popover).toBeTruthy();
                });
            });
        });
    });

    describe('Events', () => {
        describe('privateblur', () => {
            it('Passed to the component', () => {
                element.show = true;
                element.items = items;

                return Promise.resolve()
                    .then(() => {
                        const item = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-menu-item"]'
                        );
                        item.dispatchEvent(
                            new CustomEvent('mouseout', { bubbles: true })
                        );
                        item.dispatchEvent(
                            new CustomEvent('privateblur', {
                                bubbles: true
                            })
                        );
                    })
                    .then(() => {
                        const popover = element.shadowRoot.querySelector(
                            '[data-element-id="div-popover"]'
                        );
                        expect(popover).toBeFalsy();
                    });
            });
        });

        describe('privateselect', () => {
            it('Passed to the component', () => {
                element.show = true;
                element.items = items;

                const handler = jest.fn();
                element.addEventListener('privateselect', handler);

                return Promise.resolve()
                    .then(() => {
                        const item = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-menu-item"]'
                        );
                        item.dispatchEvent(
                            new CustomEvent('privateselect', {
                                detail: {
                                    value: 'item-1'
                                },
                                bubbles: true
                            })
                        );
                    })
                    .then(() => {
                        const popover = element.shadowRoot.querySelector(
                            '[data-element-id="div-popover"]'
                        );
                        expect(popover).toBeFalsy();

                        expect(handler).toHaveBeenCalled();
                        expect(handler.mock.calls[0][0].detail.name).toBe(
                            'item-1'
                        );
                    });
            });
        });
    });
});
