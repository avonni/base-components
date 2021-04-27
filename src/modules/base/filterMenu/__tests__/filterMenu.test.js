import { createElement } from 'lwc';
import FilterMenu from 'c/filterMenu';

// Not tested due to impossibility of targetting child component (buttonMenu) slot content:
// hideSearchBox
// items
// resetButtonLabel
// searchInputPlaceholder
// submitButtonLabel
// value
// apply event
// reset event

// TODO:
// menuLength
// menuWidth
// tooltip

const ITEMS = [
    {
        label: 'Item 1',
        value: 'item-1'
    },
    {
        label: 'Item 2',
        value: 'item-2'
    },
    {
        label: 'Item 3',
        value: 'item-3'
    }
];

const VALUE = ['item-1', 'item-2'];

describe('FilterMenu', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        expect(element.accessKey).toBeUndefined();
        expect(element.alternativeText).toBeUndefined();
        expect(element.disabled).toBeFalsy();
        expect(element.hideSearchBox).toBeFalsy();
        expect(element.iconName).toBe('utility:down');
        expect(element.iconSize).toBe('medium');
        expect(element.isLoading).toBeFalsy();
        expect(element.items).toMatchObject([]);
        expect(element.label).toBeUndefined();
        expect(element.loadingStateAlternativeText).toBeUndefined();
        expect(element.menuAlignment).toBe('left');
        expect(element.menuLength).toBe('7-items');
        expect(element.menuWidth).toBe('small');
        expect(element.nubbin).toBeFalsy();
        expect(element.resetButtonLabel).toBe('Reset');
        expect(element.searchInputPlaceholder).toBe('Search...');
        expect(element.submitButtonLabel).toBe('Apply');
        expect(element.title).toBeUndefined();
        expect(element.tooltip).toBeUndefined();
        expect(element.value).toMatchObject([]);
        expect(element.variant).toBe('border');
    });

    /* ----- ATTRIBUTES ----- */

    // access-key
    it('accessKey', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.accessKey = 'K';

        return Promise.resolve().then(() => {
            const buttonMenu = element.shadowRoot.querySelector(
                'c-button-menu'
            );
            expect(buttonMenu.accessKey).toBe('K');
        });
    });

    // alternative-text
    it('alternativeText', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.alternativeText = 'A string alt text';

        return Promise.resolve().then(() => {
            const buttonMenu = element.shadowRoot.querySelector(
                'c-button-menu'
            );
            expect(buttonMenu.alternativeText).toBe('A string alt text');
        });
    });

    // disabled
    it('disabled = false', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.disabled = false;

        return Promise.resolve().then(() => {
            const buttonMenu = element.shadowRoot.querySelector(
                'c-button-menu'
            );
            expect(buttonMenu.disabled).toBeFalsy();
        });
    });

    it('disabled = true', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.disabled = true;

        return Promise.resolve().then(() => {
            const buttonMenu = element.shadowRoot.querySelector(
                'c-button-menu'
            );
            expect(buttonMenu.disabled).toBeTruthy();
        });
    });

    // icon-name
    it('iconName', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.iconName = 'utility:user';

        return Promise.resolve().then(() => {
            const buttonMenu = element.shadowRoot.querySelector(
                'c-button-menu'
            );
            expect(buttonMenu.iconName).toBe('utility:user');
        });
    });

    // icon-size
    it('iconSize', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.iconSize = 'x-small';

        return Promise.resolve().then(() => {
            const buttonMenu = element.shadowRoot.querySelector(
                'c-button-menu'
            );
            expect(buttonMenu.iconSize).toBe('x-small');
        });
    });

    // is-loading
    it('isLoading', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.isLoading = true;

        return Promise.resolve().then(() => {
            const buttonMenu = element.shadowRoot.querySelector(
                'c-button-menu'
            );
            expect(buttonMenu.isLoading).toBeTruthy();
        });
    });

    // label
    it('label', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const buttonMenu = element.shadowRoot.querySelector(
                'c-button-menu'
            );
            expect(buttonMenu.label).toBe('A string label');
        });
    });

    // loading-state-alternative-text
    it('loadingStateAlternativeText', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.loadingStateAlternativeText = 'A string alt text';

        return Promise.resolve().then(() => {
            const buttonMenu = element.shadowRoot.querySelector(
                'c-button-menu'
            );
            expect(buttonMenu.loadingStateAlternativeText).toBe(
                'A string alt text'
            );
        });
    });

    // menu-alignment
    it('menuAlignment', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.menuAlignment = 'bottom-right';

        return Promise.resolve().then(() => {
            const buttonMenu = element.shadowRoot.querySelector(
                'c-button-menu'
            );
            expect(buttonMenu.menuAlignment).toBe('bottom-right');
        });
    });

    // nubbin
    it('nubbin', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.nubbin = true;

        return Promise.resolve().then(() => {
            const buttonMenu = element.shadowRoot.querySelector(
                'c-button-menu'
            );
            expect(buttonMenu.nubbin).toBeTruthy();
        });
    });

    // title
    it('title', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.title = 'A string title';

        return Promise.resolve().then(() => {
            const buttonMenu = element.shadowRoot.querySelector(
                'c-button-menu'
            );
            expect(buttonMenu.title).toBe('A string title');
        });
    });

    // variant
    it('variant', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.variant = 'border-filled';

        return Promise.resolve().then(() => {
            const buttonMenu = element.shadowRoot.querySelector(
                'c-button-menu'
            );
            expect(buttonMenu.variant).toBe('border-filled');
        });
    });

    /* ----- METHODS ----- */

    // clear
    // Depends on value and items
    it('clear method', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.value = VALUE;
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            element.clear();
            expect(element.value).toMatchObject([]);
        });
    });
});
