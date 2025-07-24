import { createElement } from 'lwc';
import PrimitiveRelationshipGraphItem from 'c/primitiveRelationshipGraphItem';

// Not tested due to impossibility of targetting child component (mediaObject) slot content:
// avatarFallbackIconName
// avatarSrc
// customActions
// defaultActions
// hideDefaultActions
// actionclick event

let element;
describe('Primitive Relationship Graph Item', () => {
    beforeEach(() => {
        element = createElement('data-primitive-relationship-graph-item', {
            is: PrimitiveRelationshipGraphItem
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
            expect(element.actionsMenuAlternativeText).toBe('Show menu');
            expect(element.activeSelection).toBeFalsy();
            expect(element.avatarFallbackIconName).toBeUndefined();
            expect(element.avatarSrc).toBeUndefined();
            expect(element.contentData).toBeUndefined();
            expect(element.customActions).toMatchObject([]);
            expect(element.defaultActions).toMatchObject([]);
            expect(element.disabled).toBeFalsy();
            expect(element.groups).toMatchObject([]);
            expect(element.hideDefaultActions).toBeFalsy();
            expect(element.href).toBeUndefined();
            expect(element.label).toBeUndefined();
            expect(element.name).toBeUndefined();
            expect(element.selected).toBeFalsy();
            expect(element.variant).toBe('horizontal');
        });

        describe('activeSelection', () => {
            it('false', () => {
                element.activeSelection = false;

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector('.item');
                    expect(wrapper.classList).not.toContain('item_is-active');
                });
            });

            it('true', () => {
                element.activeSelection = true;

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector('.item');
                    expect(wrapper.classList).toContain('item_is-active');
                });
            });
        });

        describe('contentData', () => {
            it('Passed to the component', () => {
                const data = [
                    {
                        label: 'Label 1',
                        value: 'value-1'
                    },
                    {
                        label: 'Label 2',
                        value: 'value-2'
                    }
                ];

                element.contentData = data;

                return Promise.resolve().then(() => {
                    const labels = element.shadowRoot.querySelectorAll('dt');
                    const values = element.shadowRoot.querySelectorAll('dd');

                    data.forEach((item, index) => {
                        expect(labels[index].textContent).toBe(item.label);
                        expect(values[index].textContent).toBe(item.value);
                    });
                });
            });
        });

        describe('disabled', () => {
            it('Passed to the component', () => {
                element.disabled = true;

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector('.item');
                    expect(wrapper.classList).toContain('item_is-disabled');
                });
            });
        });

        describe('groups', () => {
            it('Passed to the component', () => {
                element.groups = [
                    {
                        label: 'Label 1',
                        name: 'name-1',
                        items: [
                            {
                                label: 'Item 1',
                                name: 'item-1'
                            }
                        ]
                    },
                    {
                        label: 'Label 2',
                        name: 'name-2'
                    }
                ];

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector('.item');
                    expect(wrapper.classList).toContain('item_has-groups');
                    expect(wrapper.classList).toContain('item_has-children');
                });
            });
        });

        describe('href', () => {
            it('Passed to the component', () => {
                element.href = 'https://www.avonni.app/';
                element.label = 'A string label';

                return Promise.resolve().then(() => {
                    const link = element.shadowRoot.querySelector(
                        '.slds-text-heading_small a'
                    );
                    expect(link).toBeTruthy();
                });
            });
        });

        describe('label', () => {
            it('Passed to the component', () => {
                element.label = 'A string label';

                return Promise.resolve().then(() => {
                    const title = element.shadowRoot.querySelector(
                        '.slds-text-heading_small'
                    );
                    expect(title).toBeTruthy();
                });
            });
        });

        describe('selected', () => {
            it('false', () => {
                element.selected = false;

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector('.item');
                    expect(wrapper.classList).not.toContain('item_is-selected');
                });
            });

            it('true', () => {
                element.selected = true;

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector('.item');
                    expect(wrapper.classList).toContain('item_is-selected');
                });
            });
        });

        describe('variant', () => {
            it('horizontal', () => {
                element.variant = 'horizontal';

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector('.item');
                    expect(wrapper.classList).toContain('item_horizontal');
                });
            });

            it('vertical', () => {
                element.variant = 'vertical';

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector('.item');
                    expect(wrapper.classList).not.toContain('item_horizontal');
                });
            });
        });
    });

    describe('Events', () => {
        it('select event', () => {
            element.name = 'a-string-name';

            const handler = jest.fn();
            element.addEventListener('select', handler);

            const wrapper = element.shadowRoot.querySelector('.item');
            wrapper.click();

            return Promise.resolve().then(() => {
                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.name).toBe(
                    'a-string-name'
                );

                expect(element.selected).toBeTruthy();
                expect(element.activeSelection).toBeTruthy();
            });
        });
    });
});
