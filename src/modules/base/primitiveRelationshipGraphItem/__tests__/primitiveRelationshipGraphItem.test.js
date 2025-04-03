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

    it('Primitive relationship graph item: Default attributes', () => {
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
        expect(element.variant).toBe('horizontal');
    });

    /* ----- ATTRIBUTES ----- */

    // active-selection
    it('Primitive relationship graph item: actionSelection = false', () => {
        element.activeSelection = false;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('.item');
            expect(wrapper.classList).not.toContain('item_is-active');
        });
    });

    it('Primitive relationship graph item: actionSelection = true', () => {
        element.activeSelection = true;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('.item');
            expect(wrapper.classList).toContain('item_is-active');
        });
    });

    // contenData
    it('Primitive relationship graph item: contenData', () => {
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
    it('Primitive relationship graph item: groups', () => {
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
    it('Primitive relationship graph item: href', () => {
        element.href = 'https://www.avonni.app/';

        return Promise.resolve().then(() => {
            const link = element.shadowRoot.querySelector(
                '.slds-text-heading_small a'
            );
            expect(link).toBeTruthy();
        });
    });

    // label
    it('Primitive relationship graph item: label', () => {
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector(
                '.slds-text-heading_small'
            );
            expect(title).toBeTruthy();
        });
    });

    // selected
    it('Primitive relationship graph item: selected = false', () => {
        element.selected = false;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('.item');
            expect(wrapper.classList).not.toContain('item_is-selected');
        });
    });

    it('Primitive relationship graph item: selected = true', () => {
        element.selected = true;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('.item');
            expect(wrapper.classList).toContain('item_is-selected');
        });
    });

    // variant
    it('Primitive relationship graph item: variant = horizontal', () => {
        element.variant = 'horizontal';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('.item');
            expect(wrapper.classList).toContain('item_horizontal');
        });
    });

    it('Primitive relationship graph item: variant = vertical', () => {
        element.variant = 'vertical';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('.item');
            expect(wrapper.classList).not.toContain('item_horizontal');
        });
    });

    /* ----- EVENTS ----- */

    // select
    // Depends on name
    it('Primitive relationship graph item: select event', () => {
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
