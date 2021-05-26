import { createElement } from 'lwc';
import List from 'c/list';

// Not tested:
// Keyboard navigation (we can't artificially dispatch an event with a key code)
// Mouse move and all actions related to it (dragging the item and reorganizing the list)
// Touch events (we can't artificially give a touch position to save in _initialY)
// Partial test of reset() (we can't check if it would reorder the items, we only check that it unselects the currently dragged item)
// Partial test of the reorder event (we can fire the event, but the items have not been reordered)

const ITEMS = [
    {
        label: 'Item 1',
        iconName: 'standard:apps'
    },
    {
        label: 'Item 2',
        iconName: 'standard:user'
    },
    {
        label: 'Item 3'
    }
];

const ITEMS_WITHOUT_ICONS = [
    {
        label: 'Item 1'
    },
    {
        label: 'Item 2'
    },
    {
        label: 'Item 3'
    },
    {
        label: 'Item 4'
    }
];

describe('List', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-list', {
            is: List
        });

        expect(element.alternativeText).toBeUndefined();
        expect(element.items).toMatchObject([]);
        expect(element.label).toBeUndefined();
        expect(element.sortable).toBeFalsy();
        expect(element.sortableIconName).toBeUndefined();
        expect(element.sortableIconPosition).toBe('right');
    });

    /* ----- ATTRIBUTES ----- */

    // alternative-text
    it('alternativeText', () => {
        const element = createElement('base-list', {
            is: List
        });

        document.body.appendChild(element);

        element.alternativeText = 'A string alternative text';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector(
                '.slds-assistive-text:nth-of-type(2)'
            );
            expect(span.textContent).toBe('A string alternative text');
        });
    });

    // items
    it('items', () => {
        const element = createElement('base-list', {
            is: List
        });

        document.body.appendChild(element);

        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll('li');
            expect(items).toHaveLength(3);

            items.forEach((item, index) => {
                expect(item.dataset.index).toBe(index.toString());
                expect(item.ariaLabel).toBe(ITEMS[index].label);
                expect(item.textContent).toBe(ITEMS[index].label);

                const icon = item.querySelector('lightning-icon');
                if (ITEMS[index].iconName) {
                    expect(icon).toBeTruthy();
                    expect(icon.iconName).toBe(ITEMS[index].iconName);
                } else {
                    expect(icon).toBeFalsy();
                }
            });
        });
    });

    // label
    it('label', () => {
        const element = createElement('base-list', {
            is: List
        });

        document.body.appendChild(element);

        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.slds-text-heading_small'
            );
            expect(label.textContent).toBe('A string label');
        });
    });

    // sortable
    // Depends on items
    it('sortable = false', () => {
        const element = createElement('base-list', {
            is: List
        });

        document.body.appendChild(element);

        element.sortable = false;
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll('li');
            const menu = element.shadowRoot.querySelector('.menu');

            expect(menu.role).toBeFalsy();

            items.forEach((item) => {
                expect(item.role).toBeFalsy();
                expect(item.tabIndex).toBe(-1);
            });

            // Item is clicked on
            items[1].dispatchEvent(new CustomEvent('mousedown'));
            expect(items[1].classList).not.toContain('sortable-item_dragged');
        });
    });

    it('sortable = true', () => {
        const element = createElement('base-list', {
            is: List
        });

        document.body.appendChild(element);

        element.sortable = true;
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll('li');
            const menu = element.shadowRoot.querySelector('.menu');

            expect(menu.role).toBe('listbox');

            items.forEach((item) => {
                expect(item.role).toBe('option');
                expect(item.tabIndex).toBe(0);
            });

            // Item is clicked on
            items[1].dispatchEvent(new CustomEvent('mousedown'));
            expect(items[1].classList).toContain('sortable-item_dragged');

            // Item is moved (theoretically)
            items[1].dispatchEvent(new CustomEvent('mousemove'));

            // Item is dropped
            items[1].dispatchEvent(new CustomEvent('mouseup'));
            expect(items[1].classList).not.toContain('sortable-item_dragged');
        });
    });

    // sortable-icon-name
    // Depends on items and sortable
    it('sortableIconName, with sortable = false', () => {
        const element = createElement('base-list', {
            is: List
        });

        document.body.appendChild(element);

        element.sortableIconName = 'utility:apps';
        element.sortable = false;
        element.items = ITEMS_WITHOUT_ICONS;

        return Promise.resolve().then(() => {
            const icons = element.shadowRoot.querySelectorAll('lightning-icon');
            expect(icons).toHaveLength(0);
        });
    });

    it('sortableIconName, with sortable = true', () => {
        const element = createElement('base-list', {
            is: List
        });

        document.body.appendChild(element);

        element.sortableIconName = 'utility:apps';
        element.sortable = true;
        element.items = ITEMS_WITHOUT_ICONS;

        return Promise.resolve().then(() => {
            const icons = element.shadowRoot.querySelectorAll('lightning-icon');
            expect(icons).toHaveLength(4);

            icons.forEach((icon) => {
                expect(icon.iconName).toBe('utility:apps');
            });
        });
    });

    // sortable-icon-position
    // Depends on items, sortable and sortableIconName
    it('sortableIconPosition = right', () => {
        const element = createElement('base-list', {
            is: List
        });

        document.body.appendChild(element);

        element.sortableIconName = 'utility:apps';
        element.sortable = true;
        element.sortableIconPosition = 'right';
        element.items = ITEMS_WITHOUT_ICONS;

        return Promise.resolve().then(() => {
            const iconsRight = element.shadowRoot.querySelectorAll(
                'li div > div + lightning-icon'
            );
            const divWithIconLeft = element.shadowRoot.querySelectorAll(
                'li div > lightning-icon + div'
            );
            expect(iconsRight).toHaveLength(4);
            expect(divWithIconLeft).toHaveLength(0);
        });
    });

    it('sortableIconPosition = left', () => {
        const element = createElement('base-list', {
            is: List
        });

        document.body.appendChild(element);

        element.sortableIconName = 'utility:apps';
        element.sortable = true;
        element.sortableIconPosition = 'left';
        element.items = ITEMS_WITHOUT_ICONS;

        return Promise.resolve().then(() => {
            const iconsRight = element.shadowRoot.querySelectorAll(
                'li div > div + lightning-icon'
            );
            const divWithIconLeft = element.shadowRoot.querySelectorAll(
                'li div > lightning-icon + div'
            );
            expect(iconsRight).toHaveLength(0);
            expect(divWithIconLeft).toHaveLength(4);
        });
    });

    /* ----- METHOD ----- */

    // reset
    // Depends on items and sortable
    it('reset method', () => {
        const element = createElement('base-list', {
            is: List
        });

        document.body.appendChild(element);

        element.items = ITEMS;
        element.sortable = true;

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll('li');

            items[2].dispatchEvent(new CustomEvent('mousedown'));
            element.reset();
            expect(items[2].classList).not.toContain('sortable-item_dragged');
        });
    });

    /* ----- EVENT ----- */

    // reorder
    // Depends on items and sortable
    it('reorder event', () => {
        const element = createElement('base-list', {
            is: List
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('reorder', handler);
        element.items = ITEMS;
        element.sortable = true;

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll('li');

            items[2].dispatchEvent(new CustomEvent('mousedown'));
            items[2].dispatchEvent(new CustomEvent('mousemove'));
            items[2].dispatchEvent(new CustomEvent('mouseup'));
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.items).toMatchObject(ITEMS);
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
        });
    });
});
