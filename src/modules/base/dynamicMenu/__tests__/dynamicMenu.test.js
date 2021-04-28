import { createElement } from 'lwc';
import DynamicMenu from 'c/dynamicMenu';

// not tested
// iconSize because not in code

const items = [
    {
        label: 'Acme',
        meta: ['Account', 'San Francisco'],
        id: 0,
        value: 'acme',
        avatar: {
            fallbackIconName: 'standard:account',
            alternativeText: 'Account'
        }
    },
    {
        label: 'Remo',
        meta: ['Contact', 'San Francisco'],
        id: 1,
        value: 'remo',
        avatar: {
            fallbackIconName: 'standard:contact',
            alternativeText: 'Contact'
        }
    },
    {
        label: 'Niko',
        meta: ['Lead', 'San Francisco'],
        id: 2,
        value: 'niko',
        avatar: {
            fallbackIconName: 'standard:lead',
            alternativeText: 'Lead'
        }
    }
];

describe('Dynamic Menu', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Dynamic Menu Default attributes', () => {
        const element = createElement('base-dynamic-menu', {
            is: DynamicMenu
        });

        expect(element.label).toBeUndefined();
        expect(element.iconName).toBeUndefined();
        // expect(element.iconSize).toBeUndefined();
        expect(element.items).toMatchObject([]);
        expect(element.alternativeText).toBeUndefined();
        expect(element.menuAlignment).toBe('left');
        expect(element.disabled).toBeFalsy();
        expect(element.loadingStateAlternativeText).toBeUndefined();
        expect(element.isLoading).toBeFalsy();
        expect(element.searchInputPlaceholder).toBe('Search…');
        expect(element.withSearch).toBeFalsy();
        expect(element.title).toBeUndefined();
        expect(element.variant).toBe('border');
        expect(element.accessKey).toBeUndefined();
        expect(element.tooltip).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // label
    it('Dynamic Menu label', () => {
        const element = createElement('base-dynamic-menu', {
            is: DynamicMenu
        });
        document.body.appendChild(element);

        element.label = 'This is a label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.label).toBe('This is a label');
        });
    });

    // icon name
    it('Dynamic Menu icon name without label', () => {
        const element = createElement('base-dynamic-menu', {
            is: DynamicMenu
        });
        document.body.appendChild(element);

        element.iconName = 'utility:close';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                'lightning-button-icon'
            );
            expect(button.iconName).toBe('utility:close');
        });
    });

    it('Dynamic Menu icon name with label', () => {
        const element = createElement('base-dynamic-menu', {
            is: DynamicMenu
        });
        document.body.appendChild(element);

        element.label = 'Label';
        element.iconName = 'utility:close';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.iconName).toBe('utility:close');
        });
    });

    // items
    it('Dynamic Menu icon size without label', () => {
        const element = createElement('base-dynamic-menu', {
            is: DynamicMenu
        });
        document.body.appendChild(element);

        element.items = items;

        return Promise.resolve().then(() => {
            items.forEach((item, index) => {
                const correspondingItem = items[index];
                expect(correspondingItem).toBeTruthy();
                expect(item.label).toBe(correspondingItem.label);
                expect(item.value).toBe(correspondingItem.value);
                expect(item.meta).toBe(correspondingItem.meta);
                expect(item.id).toBe(correspondingItem.id);
                expect(item.avatar).toBe(correspondingItem.avatar);
            });
        });
    });

    // alternative text
    it('Dynamic Menu alternative text', () => {
        const element = createElement('base-dynamic-menu', {
            is: DynamicMenu
        });
        document.body.appendChild(element);

        element.alternativeText = 'This is an alternative text';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                'lightning-button-icon'
            );
            expect(button.alternativeText).toBe('This is an alternative text');
        });
    });

    // menu alignment
    it('Dynamic Menu menu alignment left', () => {
        const element = createElement('base-dynamic-menu', {
            is: DynamicMenu
        });
        document.body.appendChild(element);

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    'lightning-button-icon'
                );
                button.click();
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '.slds-dropdown '
                );
                expect(dropdown.className).toContain('slds-dropdown_left');
                expect(dropdown.className).toContain('slds-nubbin_top-left');
            });
    });

    it('Dynamic Menu menu alignment right', () => {
        const element = createElement('base-dynamic-menu', {
            is: DynamicMenu
        });
        document.body.appendChild(element);

        element.menuAlignment = 'right';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    'lightning-button-icon'
                );
                button.click();
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '.slds-dropdown '
                );
                expect(dropdown.className).toContain('slds-dropdown_right');
                expect(dropdown.className).toContain('slds-nubbin_top-right');
            });
    });
});
