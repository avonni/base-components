

import { createElement } from 'lwc';
import MenuItemDialog from 'c/menuItemDialog';

let element;
describe('MenuItemDialog', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-menu-item-dialog', {
            is: MenuItemDialog
        });
        document.body.appendChild(element);
    });

    it('Menu item dialog: Default attributes', () => {
        expect(element.accessKey).toBeUndefined();
        expect(element.disabled).toBeFalsy();
        expect(element.draftAlternativeText).toBeUndefined();
        expect(element.iconName).toBeUndefined();
        expect(element.isDraft).toBeFalsy();
        expect(element.label).toBeUndefined();
        expect(element.prefixIconName).toBeUndefined();
        expect(element.tabIndex).toBe('0');
        expect(element.value).toBeUndefined();
    });

    /* ---- ATTRIBUTES ----- */

    // access-key
    it('Menu item dialog: accessKey', () => {
        const link = element.shadowRoot.querySelector('[data-element-id="a"]');
        element.accessKey = 'K';

        return Promise.resolve().then(() => {
            expect(link.accessKey).toBe('K');
        });
    });

    // disabled
    // Depends on the dispatch of a privateselect event on click
    it('Menu item dialog: disabled = false', () => {
        let eventDispatched = false;
        element.disabled = false;
        element.addEventListener('privateselect', () => {
            eventDispatched = true;
        });

        const link = element.shadowRoot.querySelector('[data-element-id="a"]');
        link.click();

        return Promise.resolve().then(() => {
            expect(eventDispatched).toBeTruthy();
        });
    });

    it('Menu item dialog: disabled = true', () => {
        let eventDispatched = false;
        element.disabled = true;
        element.addEventListener('privateselect', () => {
            eventDispatched = true;
        });

        const link = element.shadowRoot.querySelector('[data-element-id="a"]');
        link.click();

        return Promise.resolve().then(() => {
            expect(eventDispatched).toBeFalsy();
        });
    });

    // draft-alternative-text
    // Depend on isDraft
    it('Menu item dialog: draftAlternativeText', () => {
        element.draftAlternativeText = 'A string alternative text';
        element.isDraft = true;

        return Promise.resolve().then(() => {
            const abbr = element.shadowRoot.querySelector(
                '[data-element-id="abbr"]'
            );
            expect(abbr.title).toBe('A string alternative text');
        });
    });

    // icon-name
    it('Menu item dialog: iconName', () => {
        element.iconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-icon"]'
            );
            expect(icon).toBeTruthy();
        });
    });

    // is-draft
    it('Menu item dialog: isDraft = false', () => {
        element.isDraft = false;

        return Promise.resolve().then(() => {
            const abbr = element.shadowRoot.querySelector(
                '[data-element-id="abbr"]'
            );
            expect(abbr).toBeFalsy();
        });
    });

    it('Menu item dialog: isDraft = true', () => {
        element.isDraft = true;

        return Promise.resolve().then(() => {
            const abbr = element.shadowRoot.querySelector(
                '[data-element-id="abbr"]'
            );
            expect(abbr).toBeTruthy();
        });
    });

    // label
    it('Menu item dialog: label', () => {
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector(
                '[data-element-id="span-label"]'
            );
            expect(span.textContent).toBe('A string label');
            expect(span.title).toBe('A string label');
        });
    });

    // prefix-icon-name
    it('Menu item dialog: prefixIconName', () => {
        element.prefixIconName = 'standard:apps';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-icon-prefix"]'
            );
            expect(icon).toBeTruthy();
        });
    });

    // tab-index
    it('Menu item dialog: tabIndex', () => {
        element.tabIndex = '-1';

        return Promise.resolve().then(() => {
            const link = element.shadowRoot.querySelector(
                '[data-element-id="a"]'
            );
            expect(link.getAttribute('tabindex')).toBe('-1');
        });
    });

    // value
    // Depends on the dispatch of a privateselect event on click
    it('Menu item dialog: value', () => {
        let eventDetailValue;
        element.value = 'a-string-value';
        element.addEventListener('privateselect', (event) => {
            eventDetailValue = event.detail.value;
        });

        const link = element.shadowRoot.querySelector('[data-element-id="a"]');
        link.click();

        return Promise.resolve().then(() => {
            expect(eventDetailValue).toBe('a-string-value');
        });
    });

    /* ---- METHOD ----- */

    // focus
    it('Menu item dialog: focus', () => {
        let focusEvent = false;
        element.addEventListener('focus', () => {
            focusEvent = true;
        });

        element.focus();

        return Promise.resolve().then(() => {
            expect(focusEvent).toBeTruthy();
        });
    });
});
