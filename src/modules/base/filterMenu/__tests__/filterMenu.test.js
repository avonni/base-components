import { createElement } from 'lwc';
import FilterMenu from 'c/filterMenu';

// Not tested:
// tooltip (is injected outside of shadow dom)
// auto positionning
// dropdown scrolling-related events (mouseup, mousedown, scroll)
// Keyboard navigation (we can't artificially dispatch an event with a key code)

const ITEMS = [
    {
        label: 'Item 1',
        value: 'item-1',
        disabled: true
    },
    {
        label: 'Item 2',
        value: 'item-2',
        iconName: 'utility:user',
        prefixIconName: 'standard:apps'
    },
    {
        label: 'Item 3 with more searchable text',
        value: 'item-3'
    },
    {
        label: 'Item 4',
        value: 'item-4'
    },
    {
        label: 'Item 5',
        value: 'item-5'
    },
    {
        label: 'Item 6',
        value: 'item-6'
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
        expect(element.alternativeText).toBe('Show Menu');
        expect(element.disabled).toBeFalsy();
        expect(element.hideSearchBox).toBeFalsy();
        expect(element.iconName).toBe('utility:down');
        expect(element.iconSize).toBe('medium');
        expect(element.isLoading).toBeFalsy();
        expect(element.items).toMatchObject([]);
        expect(element.label).toBeUndefined();
        expect(element.loadingStateAlternativeText).toBe('Loading');
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
            const button = element.shadowRoot.querySelector('button');
            expect(button.accessKey).toBe('K');
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
            const altText = element.shadowRoot.querySelector(
                '.slds-assistive-text'
            );
            expect(altText.textContent).toBe('A string alt text');
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
            const button = element.shadowRoot.querySelector('button');
            expect(button.disabled).toBeFalsy();
        });
    });

    it('disabled = true', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.disabled = true;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.disabled).toBeTruthy();
        });
    });

    // hide-search-box
    it('hideSearchBox = false', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.hideSearchBox = false;
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('lightning-input');
            expect(input).toBeTruthy();
        });
    });

    it('hideSearchBox = true', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.hideSearchBox = true;
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('lightning-input');
            expect(input).toBeFalsy();
        });
    });

    // icon-name
    it('iconName is down arrow', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.iconName = 'utility:chevrondown';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            const icons = element.shadowRoot.querySelectorAll(
                'c-primitive-icon'
            );
            expect(icons).toHaveLength(1);
            expect(icons[0].iconName).toBe('utility:chevrondown');
            expect(button.classList).not.toContain('slds-button_icon');
        });
    });

    it('iconName is not down arrow', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.iconName = 'standard:user';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            const icons = element.shadowRoot.querySelectorAll(
                'c-primitive-icon'
            );
            expect(icons).toHaveLength(2);
            expect(icons[0].iconName).toBe('standard:user');
            expect(icons[1].iconName).toBe('utility:down');
            expect(button.classList).toContain('slds-button_icon');
        });
    });

    // icon-size
    it('iconSize = xx-small', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.iconSize = 'xx-small';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList).toContain('slds-button_icon-xx-small');
            expect(button.classList).not.toContain('slds-button_icon-x-small');
            expect(button.classList).not.toContain('slds-button_icon-small');
            expect(button.classList).not.toContain('slds-button_icon-large');
        });
    });

    it('iconSize = x-small', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.iconSize = 'x-small';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList).not.toContain('slds-button_icon-xx-small');
            expect(button.classList).toContain('slds-button_icon-x-small');
            expect(button.classList).not.toContain('slds-button_icon-small');
            expect(button.classList).not.toContain('slds-button_icon-large');
        });
    });

    it('iconSize = medium', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.iconSize = 'medium';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList).not.toContain('slds-button_icon-xx-small');
            expect(button.classList).not.toContain('slds-button_icon-x-small');
            expect(button.classList).not.toContain('slds-button_icon-small');
            expect(button.classList).not.toContain('slds-button_icon-large');
        });
    });

    it('iconSize = large', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.iconSize = 'large';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList).not.toContain('slds-button_icon-xx-small');
            expect(button.classList).not.toContain('slds-button_icon-x-small');
            expect(button.classList).not.toContain('slds-button_icon-small');
            expect(button.classList).toContain('slds-button_icon-large');
        });
    });

    // is-loading
    it('isLoading = false', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.isLoading = false;
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const spinner = element.shadowRoot.querySelector(
                'lightning-spinner'
            );
            const list = element.shadowRoot.querySelector(
                '.slds-dropdown__list'
            );

            expect(spinner).toBeFalsy();
            expect(list).toBeTruthy();
        });
    });

    it('isLoading = true', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.isLoading = true;
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const spinner = element.shadowRoot.querySelector(
                'lightning-spinner'
            );
            const list = element.shadowRoot.querySelector(
                '.slds-dropdown__list'
            );

            expect(spinner).toBeTruthy();
            expect(list).toBeFalsy();
        });
    });

    // items
    it('items', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.items = ITEMS;
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll(
                'lightning-menu-item'
            );

            expect(items).toHaveLength(6);

            let firstFocusableItem;
            items.forEach((item, index) => {
                expect(item.label).toBe(ITEMS[index].label);
                expect(item.value).toBe(ITEMS[index].value);
                expect(item.iconName).toBe(ITEMS[index].iconName);
                expect(item.prefixIconName).toBe(ITEMS[index].prefixIconName);
                expect(item.disabled).toBe(ITEMS[index].disabled);

                if (!firstFocusableItem && !item.disabled) {
                    expect(item.tabIndex).toBe(0);
                    firstFocusableItem = true;
                } else {
                    expect(item.tabIndex).toBe(-1);
                }
            });
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
            const button = element.shadowRoot.querySelector('button');
            expect(button.textContent).toContain('A string label');
        });
    });

    // loading-state-alternative-text
    // Depends in isLoading
    it('loadingStateAlternativeText', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.loadingStateAlternativeText = 'A string alt text';
        element.isLoading = true;
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const spinner = element.shadowRoot.querySelector(
                'lightning-spinner'
            );
            expect(spinner.alternativeText).toBe('A string alt text');
        });
    });

    // menu-alignment and nubbin
    it('menuAlignment = left and nubbin = true', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.menuAlignment = 'left';
        element.nubbin = true;
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector('.slds-dropdown');
            expect(dropdown.classList).toContain('slds-dropdown_left');
            expect(dropdown.classList).not.toContain('slds-dropdown_center');
            expect(dropdown.classList).not.toContain('slds-dropdown_right');
            expect(dropdown.classList).not.toContain('slds-dropdown_bottom');
            expect(dropdown.classList).not.toContain(
                'slds-dropdown_bottom-right'
            );
            expect(dropdown.classList).not.toContain(
                'slds-dropdown_bottom-left'
            );

            expect(dropdown.classList).toContain('slds-nubbin_top-left');
            expect(dropdown.classList).not.toContain('slds-nubbin_top-right');
            expect(dropdown.classList).not.toContain('slds-nubbin_top');
            expect(dropdown.classList).not.toContain('slds-nubbin_bottom-left');
            expect(dropdown.classList).not.toContain(
                'slds-nubbin_bottom-right'
            );
            expect(dropdown.classList).not.toContain('slds-nubbin_bottom');
        });
    });

    it('menuAlignment = auto and nubbin = true', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.menuAlignment = 'auto';
        element.nubbin = true;
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector('.slds-dropdown');
            expect(dropdown.classList).toContain('slds-dropdown_left');
            expect(dropdown.classList).not.toContain('slds-dropdown_center');
            expect(dropdown.classList).not.toContain('slds-dropdown_right');
            expect(dropdown.classList).not.toContain('slds-dropdown_bottom');
            expect(dropdown.classList).not.toContain(
                'slds-dropdown_bottom-right'
            );
            expect(dropdown.classList).not.toContain(
                'slds-dropdown_bottom-left'
            );

            expect(dropdown.classList).not.toContain('slds-nubbin_top-left');
            expect(dropdown.classList).not.toContain('slds-nubbin_top-right');
            expect(dropdown.classList).not.toContain('slds-nubbin_top');
            expect(dropdown.classList).not.toContain('slds-nubbin_bottom-left');
            expect(dropdown.classList).not.toContain(
                'slds-nubbin_bottom-right'
            );
            expect(dropdown.classList).not.toContain('slds-nubbin_bottom');
        });
    });

    it('menuAlignment = center and nubbin = true', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.menuAlignment = 'center';
        element.nubbin = true;
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector('.slds-dropdown');
            expect(dropdown.classList).not.toContain('slds-dropdown_left');
            expect(dropdown.classList).toContain('slds-dropdown_center');
            expect(dropdown.classList).not.toContain('slds-dropdown_right');
            expect(dropdown.classList).not.toContain('slds-dropdown_bottom');
            expect(dropdown.classList).not.toContain(
                'slds-dropdown_bottom-right'
            );
            expect(dropdown.classList).not.toContain(
                'slds-dropdown_bottom-left'
            );

            expect(dropdown.classList).not.toContain('slds-nubbin_top-left');
            expect(dropdown.classList).not.toContain('slds-nubbin_top-right');
            expect(dropdown.classList).toContain('slds-nubbin_top');
            expect(dropdown.classList).not.toContain('slds-nubbin_bottom-left');
            expect(dropdown.classList).not.toContain(
                'slds-nubbin_bottom-right'
            );
            expect(dropdown.classList).not.toContain('slds-nubbin_bottom');
        });
    });

    it('menuAlignment = right and nubbin = true', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.menuAlignment = 'right';
        element.nubbin = true;
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector('.slds-dropdown');
            expect(dropdown.classList).not.toContain('slds-dropdown_left');
            expect(dropdown.classList).not.toContain('slds-dropdown_center');
            expect(dropdown.classList).toContain('slds-dropdown_right');
            expect(dropdown.classList).not.toContain('slds-dropdown_bottom');
            expect(dropdown.classList).not.toContain(
                'slds-dropdown_bottom-right'
            );
            expect(dropdown.classList).not.toContain(
                'slds-dropdown_bottom-left'
            );

            expect(dropdown.classList).not.toContain('slds-nubbin_top-left');
            expect(dropdown.classList).toContain('slds-nubbin_top-right');
            expect(dropdown.classList).not.toContain('slds-nubbin_top');
            expect(dropdown.classList).not.toContain('slds-nubbin_bottom-left');
            expect(dropdown.classList).not.toContain(
                'slds-nubbin_bottom-right'
            );
            expect(dropdown.classList).not.toContain('slds-nubbin_bottom');
        });
    });

    it('menuAlignment = bottom-left and nubbin = true', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.menuAlignment = 'bottom-left';
        element.nubbin = true;
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector('.slds-dropdown');
            expect(dropdown.classList).toContain('slds-dropdown_left');
            expect(dropdown.classList).not.toContain('slds-dropdown_center');
            expect(dropdown.classList).not.toContain('slds-dropdown_right');
            expect(dropdown.classList).toContain('slds-dropdown_bottom');
            expect(dropdown.classList).not.toContain(
                'slds-dropdown_bottom-right'
            );
            expect(dropdown.classList).toContain('slds-dropdown_bottom-left');

            expect(dropdown.classList).not.toContain('slds-nubbin_top-left');
            expect(dropdown.classList).not.toContain('slds-nubbin_top-right');
            expect(dropdown.classList).not.toContain('slds-nubbin_top');
            expect(dropdown.classList).toContain('slds-nubbin_bottom-left');
            expect(dropdown.classList).not.toContain(
                'slds-nubbin_bottom-right'
            );
            expect(dropdown.classList).not.toContain('slds-nubbin_bottom');
        });
    });

    it('menuAlignment = bottom-center and nubbin = true', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.menuAlignment = 'bottom-center';
        element.nubbin = true;
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector('.slds-dropdown');
            expect(dropdown.classList).not.toContain('slds-dropdown_left');
            expect(dropdown.classList).not.toContain('slds-dropdown_center');
            expect(dropdown.classList).not.toContain('slds-dropdown_right');
            expect(dropdown.classList).toContain('slds-dropdown_bottom');
            expect(dropdown.classList).not.toContain(
                'slds-dropdown_bottom-right'
            );
            expect(dropdown.classList).not.toContain(
                'slds-dropdown_bottom-left'
            );

            expect(dropdown.classList).not.toContain('slds-nubbin_top-left');
            expect(dropdown.classList).not.toContain('slds-nubbin_top-right');
            expect(dropdown.classList).not.toContain('slds-nubbin_top');
            expect(dropdown.classList).not.toContain('slds-nubbin_bottom-left');
            expect(dropdown.classList).not.toContain(
                'slds-nubbin_bottom-right'
            );
            expect(dropdown.classList).toContain('slds-nubbin_bottom');
        });
    });

    it('menuAlignment = bottom-right and nubbin = true', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.menuAlignment = 'bottom-right';
        element.nubbin = true;
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector('.slds-dropdown');
            expect(dropdown.classList).not.toContain('slds-dropdown_left');
            expect(dropdown.classList).not.toContain('slds-dropdown_center');
            expect(dropdown.classList).toContain('slds-dropdown_right');
            expect(dropdown.classList).toContain('slds-dropdown_bottom');
            expect(dropdown.classList).toContain('slds-dropdown_bottom-right');
            expect(dropdown.classList).not.toContain(
                'slds-dropdown_bottom-left'
            );

            expect(dropdown.classList).not.toContain('slds-nubbin_top-left');
            expect(dropdown.classList).not.toContain('slds-nubbin_top-right');
            expect(dropdown.classList).not.toContain('slds-nubbin_top');
            expect(dropdown.classList).not.toContain('slds-nubbin_bottom-left');
            expect(dropdown.classList).toContain('slds-nubbin_bottom-right');
            expect(dropdown.classList).not.toContain('slds-nubbin_bottom');
        });
    });

    it('nubbin = false', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.nubbin = false;
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector('.slds-dropdown');

            expect(dropdown.classList).not.toContain('slds-nubbin_top-left');
            expect(dropdown.classList).not.toContain('slds-nubbin_top-right');
            expect(dropdown.classList).not.toContain('slds-nubbin_top');
            expect(dropdown.classList).not.toContain('slds-nubbin_bottom-left');
            expect(dropdown.classList).not.toContain(
                'slds-nubbin_bottom-right'
            );
            expect(dropdown.classList).not.toContain('slds-nubbin_bottom');
        });
    });

    // menu-length
    it('menuLength = 7-items', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.menuLength = '7-items';
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const itemList = element.shadowRoot.querySelector(
                'lightning-input + div'
            );
            expect(itemList.classList).toContain(
                'slds-dropdown_length-with-icon-7'
            );
            expect(itemList.classList).not.toContain(
                'slds-dropdown_length-with-icon-5'
            );
            expect(itemList.classList).not.toContain(
                'slds-dropdown_length-with-icon-10'
            );
        });
    });

    it('menuLength = 5-items', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.menuLength = '5-items';
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const itemList = element.shadowRoot.querySelector(
                'lightning-input + div'
            );
            expect(itemList.classList).not.toContain(
                'slds-dropdown_length-with-icon-7'
            );
            expect(itemList.classList).toContain(
                'slds-dropdown_length-with-icon-5'
            );
            expect(itemList.classList).not.toContain(
                'slds-dropdown_length-with-icon-10'
            );
        });
    });

    it('menuLength = 10-items', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.menuLength = '10-items';
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const itemList = element.shadowRoot.querySelector(
                'lightning-input + div'
            );
            expect(itemList.classList).not.toContain(
                'slds-dropdown_length-with-icon-7'
            );
            expect(itemList.classList).not.toContain(
                'slds-dropdown_length-with-icon-5'
            );
            expect(itemList.classList).toContain(
                'slds-dropdown_length-with-icon-10'
            );
        });
    });

    // menu-width
    it('menuWidth = small', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.menuWidth = 'small';
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector('.slds-dropdown');
            expect(dropdown.classList).toContain('slds-dropdown_small');
            expect(dropdown.classList).not.toContain('slds-dropdown_xx-small');
            expect(dropdown.classList).not.toContain('slds-dropdown_x-small');
            expect(dropdown.classList).not.toContain('slds-dropdown_medium');
            expect(dropdown.classList).not.toContain('slds-dropdown_large');
        });
    });

    it('menuWidth = xx-small', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.menuWidth = 'xx-small';
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector('.slds-dropdown');
            expect(dropdown.classList).not.toContain('slds-dropdown_small');
            expect(dropdown.classList).toContain('slds-dropdown_xx-small');
            expect(dropdown.classList).not.toContain('slds-dropdown_x-small');
            expect(dropdown.classList).not.toContain('slds-dropdown_medium');
            expect(dropdown.classList).not.toContain('slds-dropdown_large');
        });
    });

    it('menuWidth = x-small', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.menuWidth = 'x-small';
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector('.slds-dropdown');
            expect(dropdown.classList).not.toContain('slds-dropdown_small');
            expect(dropdown.classList).not.toContain('slds-dropdown_xx-small');
            expect(dropdown.classList).toContain('slds-dropdown_x-small');
            expect(dropdown.classList).not.toContain('slds-dropdown_medium');
            expect(dropdown.classList).not.toContain('slds-dropdown_large');
        });
    });

    it('menuWidth = medium', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.menuWidth = 'medium';
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector('.slds-dropdown');
            expect(dropdown.classList).not.toContain('slds-dropdown_small');
            expect(dropdown.classList).not.toContain('slds-dropdown_xx-small');
            expect(dropdown.classList).not.toContain('slds-dropdown_x-small');
            expect(dropdown.classList).toContain('slds-dropdown_medium');
            expect(dropdown.classList).not.toContain('slds-dropdown_large');
        });
    });

    it('menuWidth = large', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.menuWidth = 'large';
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector('.slds-dropdown');
            expect(dropdown.classList).not.toContain('slds-dropdown_small');
            expect(dropdown.classList).not.toContain('slds-dropdown_xx-small');
            expect(dropdown.classList).not.toContain('slds-dropdown_x-small');
            expect(dropdown.classList).not.toContain('slds-dropdown_medium');
            expect(dropdown.classList).toContain('slds-dropdown_large');
        });
    });

    // reset-button-label
    it('resetButtonLabel', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.resetButtonLabel = 'A string label';
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const resetButton = element.shadowRoot.querySelector(
                '.slds-dropdown lightning-button:first-of-type'
            );
            expect(resetButton.label).toBe('A string label');
        });
    });

    // search-input-placeholder
    it('searchInputPlaceholder', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.searchInputPlaceholder = 'A string placeholder';
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('lightning-input');
            expect(input.placeholder).toBe('A string placeholder');
        });
    });

    // submit-button-label
    it('submitButtonLabel', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.submitButtonLabel = 'A string label';
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const submitButton = element.shadowRoot.querySelector(
                '.slds-dropdown lightning-button:last-of-type'
            );
            expect(submitButton.label).toBe('A string label');
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
            const button = element.shadowRoot.querySelector('button');
            expect(button.title).toBe('A string title');
        });
    });

    // value
    // Depends on items
    it('value', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.value = VALUE;
        element.items = ITEMS;
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll(
                'lightning-menu-item'
            );
            expect(items[0].checked).toBeTruthy();
            expect(items[1].checked).toBeTruthy();
            expect(items[2].checked).toBeFalsy();
        });
    });

    // variant
    // Depends on iconName and label
    it('variant = border', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.variant = 'border';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList.value).toBe(
                'slds-button slds-button_icon-border'
            );
        });
    });

    it('variant = border, with label', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.variant = 'border';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList.value).toBe(
                'slds-button slds-button_neutral'
            );
        });
    });

    it('variant = border, with icon', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.variant = 'border';
        element.iconName = 'utility:user';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList.value).toBe(
                'slds-button slds-button_icon slds-button_icon-more'
            );
        });
    });

    it('variant = bare', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.variant = 'bare';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList.value).toBe(
                'slds-button slds-button_icon-bare'
            );
        });
    });

    it('variant = bare, with label', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.variant = 'bare';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList.value).toBe('slds-button');
        });
    });

    it('variant = bare, with icon', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.variant = 'bare';
        element.iconName = 'standard:user';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList.value).toBe(
                'slds-button slds-button_icon slds-button_icon-bare slds-button_icon-more'
            );
        });
    });

    it('variant = container', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.variant = 'container';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList.value).toBe(
                'slds-button slds-button_icon-container'
            );
        });
    });

    it('variant = container, with label', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.variant = 'container';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList.value).toBe('slds-button');
        });
    });

    it('variant = container, with icon', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.variant = 'container';
        element.icon = 'utility:user';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList.value).toBe(
                'slds-button slds-button_icon-container'
            );
        });
    });

    it('variant = border-filled', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.variant = 'border-filled';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList.value).toBe(
                'slds-button slds-button_icon-border-filled'
            );
        });
    });

    it('variant = border-filled, with label', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.variant = 'border-filled';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList.value).toBe('slds-button');
        });
    });

    it('variant = border-filled, with icon', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.variant = 'border-filled';
        element.iconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList.value).toBe(
                'slds-button slds-button_icon slds-button_icon-more slds-button_icon-border-filled'
            );
        });
    });

    it('variant = bare-inverse', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.variant = 'bare-inverse';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList.value).toBe(
                'slds-button slds-button_icon-bare slds-button_icon-inverse'
            );
        });
    });

    it('variant = bare-inverse, with label', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.variant = 'bare-inverse';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList.value).toBe('slds-button');
        });
    });

    it('variant = bare-inverse, with icon', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.variant = 'bare-inverse';
        element.iconName = 'standard:apps';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList.value).toBe(
                'slds-button slds-button_icon slds-button_icon-bare slds-button_icon-container-more slds-button_icon-inverse'
            );
        });
    });

    it('variant = border-inverse', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.variant = 'border-inverse';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList.value).toBe(
                'slds-button slds-button_icon-border-inverse'
            );
        });
    });

    it('variant = border-inverse, with label', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.variant = 'border-inverse';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList.value).toBe(
                'slds-button slds-button_inverse'
            );
        });
    });

    it('variant = border-inverse, with icon', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.variant = 'border-inverse';
        element.icon = 'utility:apps';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList.value).toBe(
                'slds-button slds-button_icon-border-inverse'
            );
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

    // focus
    it('focus method', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        const button = element.shadowRoot.querySelector('button');
        button.addEventListener('focus', handler);

        element.focus();
        expect(handler).toHaveBeenCalled();
    });

    /* ----- EVENTS ----- */

    // select
    // Depends on items
    it('select event', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('select', handler);

        element.items = ITEMS;
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve()
            .then(() => {
                const items = element.shadowRoot.querySelectorAll(
                    'lightning-menu-item'
                );
                expect(items[2].checked).toBeFalsy();

                items[2].dispatchEvent(
                    new CustomEvent('privateselect', {
                        bubbles: true,
                        cancelable: true,
                        detail: {
                            value: items[2].value
                        }
                    })
                );

                expect(handler).toHaveBeenCalled();
                expect(element.value).toMatchObject(['item-3']);
            })
            .then(() => {
                const items = element.shadowRoot.querySelectorAll(
                    'lightning-menu-item'
                );
                expect(items[2].checked).toBeTruthy();

                items[2].dispatchEvent(
                    new CustomEvent('privateselect', {
                        bubbles: true,
                        cancelable: true,
                        detail: {
                            value: items[2].value
                        }
                    })
                );
            })
            .then(() => {
                const items = element.shadowRoot.querySelectorAll(
                    'lightning-menu-item'
                );
                expect(items[2].checked).toBeFalsy();
            });
    });

    // apply
    // Depends on items and value
    it('apply event', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('apply', handler);

        element.items = ITEMS;
        element.value = VALUE;
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const applyButton = element.shadowRoot.querySelector(
                '.slds-dropdown lightning-button:last-of-type'
            );
            applyButton.click();

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.value).toMatchObject(VALUE);
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
        });
    });

    // reset
    // Depends on items and value
    it('reset event', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('reset', handler);

        element.items = ITEMS;
        element.value = VALUE;
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const applyButton = element.shadowRoot.querySelector(
                '.slds-dropdown lightning-button:first-of-type'
            );
            applyButton.click();

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();

            expect(element.value).toMatchObject([]);
        });
    });

    // close
    it('close event', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('close', handler);

        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            expect(element.shadowRoot.host.classList).toContain('slds-is-open');
            button.click();
            expect(handler).toHaveBeenCalled();
            expect(element.shadowRoot.host.classList).not.toContain(
                'slds-is-open'
            );
        });
    });

    // search
    // Depends on items
    it('search event', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('search', handler);

        element.items = ITEMS;
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve()
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    'lightning-input'
                );
                input.value = 'Searchable';
                input.dispatchEvent(new CustomEvent('change'));

                expect(handler).toHaveBeenCalled();
            })
            .then(() => {
                const items = element.shadowRoot.querySelectorAll(
                    'lightning-menu-item'
                );
                expect(items).toHaveLength(1);
                expect(items[0].value).toBe('item-3');
            });
    });

    // blur
    it('blur event (button blur)', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('blur', handler);

        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            button.click();
            button.dispatchEvent(new CustomEvent('blur'));

            expect(handler).toHaveBeenCalled();
            expect(element.shadowRoot.host.classList).not.toContain(
                'slds-is-open'
            );
        });
    });

    // content blur
    // Depends on items
    it('blur of an inside element', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.items = ITEMS;
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const item = element.shadowRoot.querySelector(
                'lightning-menu-item'
            );
            item.dispatchEvent(
                new CustomEvent('privatefocus', {
                    bubbles: true,
                    cancelable: true,
                    detail: {
                        value: item.value
                    }
                })
            );
            item.dispatchEvent(
                new CustomEvent('privateblur', {
                    composed: true,
                    bubbles: true,
                    cancelable: true
                })
            );

            expect(element.shadowRoot.host.classList).not.toContain(
                'slds-is-open'
            );
        });
    });

    // mouseleave
    it('mouseleave event', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector('.slds-dropdown');
            dropdown.dispatchEvent(new CustomEvent('mouseleave'));
            expect(element.shadowRoot.host.classList).not.toContain(
                'slds-is-open'
            );
        });
    });

    // mouseenter
    it('mouseenter event', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve()
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '.slds-dropdown'
                );
                dropdown.dispatchEvent(new CustomEvent('mouseenter'));
            })
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    'lightning-input'
                );
                input.dispatchEvent(new CustomEvent('blur'));

                expect(element.shadowRoot.host.classList).toContain(
                    'slds-is-open'
                );
            });
    });

    // privatebuttonregister
    it('privatebuttonregister event', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        const handler = jest.fn();
        element.addEventListener('privatebuttonregister', handler);

        document.body.appendChild(element);

        expect(handler).toHaveBeenCalled();
    });
});
