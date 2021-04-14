import { createElement } from 'lwc';
import PrimitiveRelationshipGraphItem from 'c/primitiveRelationshipGraphItem';

// Not tested due to impossibility of targetting child component (mediaObject) slot content:
// avatarFallbackIconName
// avatarSrc
// customActions
// defaultActions
// hideDefaultActions
// actionclick event

describe('PrimitiveRelationshipGraphItem', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement(
            'base-primitive-relationship-graph-item',
            {
                is: PrimitiveRelationshipGraphItem
            }
        );

        expect(element.activeSelection).toBeFalsy();
        expect(element.avatarFallbackIconName).toBeUndefined();
        expect(element.avatarSrc).toBeUndefined();
        expect(element.contentData).toBeUndefined();
        expect(element.customActions).toMatchObject([]);
        expect(element.defaultActions).toMatchObject([]);
        expect(element.groups).toMatchObject([]);
        expect(element.hideDefaultActions).toBeFalsy();
        expect(element.href).toBeUndefined();
        expect(element.label).toBeUndefined();
        expect(element.name).toBeUndefined();
        expect(element.selected).toBeFalsy();
        expect(element.theme).toBe('default');
        expect(element.variant).toBe('horizontal');
    });

    /* ----- ATTRIBUTES ----- */

    // active-selection
    it('actionSelection = false', () => {
        const element = createElement(
            'base-primitive-relationship-graph-item',
            {
                is: PrimitiveRelationshipGraphItem
            }
        );

        document.body.appendChild(element);

        element.activeSelection = false;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('.item');
            expect(wrapper.classList).not.toContain('item_is-active');
        });
    });

    it('actionSelection = true', () => {
        const element = createElement(
            'base-primitive-relationship-graph-item',
            {
                is: PrimitiveRelationshipGraphItem
            }
        );

        document.body.appendChild(element);

        element.activeSelection = true;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('.item');
            expect(wrapper.classList).toContain('item_is-active');
        });
    });

    // contenData
    it('contenData', () => {
        const element = createElement(
            'base-primitive-relationship-graph-item',
            {
                is: PrimitiveRelationshipGraphItem
            }
        );

        document.body.appendChild(element);

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

    // groups
    it('groups', () => {
        const element = createElement(
            'base-primitive-relationship-graph-item',
            {
                is: PrimitiveRelationshipGraphItem
            }
        );

        document.body.appendChild(element);

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

    // href
    it('href', () => {
        const element = createElement(
            'base-primitive-relationship-graph-item',
            {
                is: PrimitiveRelationshipGraphItem
            }
        );

        document.body.appendChild(element);

        element.href = 'https://www.avonni.app/';

        return Promise.resolve().then(() => {
            const link = element.shadowRoot.querySelector(
                '.slds-text-heading_small a'
            );
            expect(link).toBeTruthy();
        });
    });

    // label
    it('label', () => {
        const element = createElement(
            'base-primitive-relationship-graph-item',
            {
                is: PrimitiveRelationshipGraphItem
            }
        );

        document.body.appendChild(element);

        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector(
                '.slds-text-heading_small'
            );
            expect(title).toBeTruthy();
        });
    });

    // selected
    it('selected = false', () => {
        const element = createElement(
            'base-primitive-relationship-graph-item',
            {
                is: PrimitiveRelationshipGraphItem
            }
        );

        document.body.appendChild(element);

        element.selected = false;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('.item');
            expect(wrapper.classList).not.toContain('item_is-selected');
        });
    });

    it('selected = true', () => {
        const element = createElement(
            'base-primitive-relationship-graph-item',
            {
                is: PrimitiveRelationshipGraphItem
            }
        );

        document.body.appendChild(element);

        element.selected = true;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('.item');
            expect(wrapper.classList).toContain('item_is-selected');
        });
    });

    // theme
    it('theme = default', () => {
        const element = createElement(
            'base-primitive-relationship-graph-item',
            {
                is: PrimitiveRelationshipGraphItem
            }
        );

        document.body.appendChild(element);

        element.theme = 'default';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('.item');
            expect(wrapper.classList).toContain('slds-theme_default');
            expect(wrapper.classList).not.toContain('avonni-theme_inverse');
            expect(wrapper.classList).not.toContain('slds-theme_shade');
            expect(wrapper.classList).not.toContain('slds-text-color_default');
        });
    });

    it('theme = shade', () => {
        const element = createElement(
            'base-primitive-relationship-graph-item',
            {
                is: PrimitiveRelationshipGraphItem
            }
        );

        document.body.appendChild(element);

        element.theme = 'shade';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('.item');
            expect(wrapper.classList).not.toContain('slds-theme_default');
            expect(wrapper.classList).not.toContain('avonni-theme_inverse');
            expect(wrapper.classList).toContain('slds-theme_shade');
            expect(wrapper.classList).toContain('slds-text-color_default');
        });
    });

    it('theme = inverse', () => {
        const element = createElement(
            'base-primitive-relationship-graph-item',
            {
                is: PrimitiveRelationshipGraphItem
            }
        );

        document.body.appendChild(element);

        element.theme = 'inverse';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('.item');
            expect(wrapper.classList).not.toContain('slds-theme_default');
            expect(wrapper.classList).toContain('avonni-theme_inverse');
            expect(wrapper.classList).not.toContain('slds-theme_shade');
            expect(wrapper.classList).not.toContain('slds-text-color_default');
        });
    });

    // variant
    it('variant = horizontal', () => {
        const element = createElement(
            'base-primitive-relationship-graph-item',
            {
                is: PrimitiveRelationshipGraphItem
            }
        );

        document.body.appendChild(element);

        element.variant = 'horizontal';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('.item');
            expect(wrapper.classList).toContain('item_horizontal');
        });
    });

    it('variant = vertical', () => {
        const element = createElement(
            'base-primitive-relationship-graph-item',
            {
                is: PrimitiveRelationshipGraphItem
            }
        );

        document.body.appendChild(element);

        element.variant = 'vertical';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('.item');
            expect(wrapper.classList).not.toContain('item_horizontal');
        });
    });

    /* ----- EVENTS ----- */

    // select
    // Depends on name
    it('select event', () => {
        const element = createElement(
            'base-primitive-relationship-graph-item',
            {
                is: PrimitiveRelationshipGraphItem
            }
        );

        document.body.appendChild(element);

        element.name = 'a-string-name';

        const handler = jest.fn();
        element.addEventListener('select', handler);

        const wrapper = element.shadowRoot.querySelector('.item');
        wrapper.click();

        return Promise.resolve().then(() => {
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.name).toBe('a-string-name');

            expect(element.selected).toBeTruthy();
            expect(element.activeSelection).toBeTruthy();
        });
    });
});
