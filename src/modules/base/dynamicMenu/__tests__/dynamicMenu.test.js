import { createElement } from 'lwc';
import DynamicMenu from 'c/dynamicMenu';

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
        expect(element.iconSize).toBeUndefined();
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
            const span = element.shadowRoot.querySelector('span');
            expect(span.textContent).toBe('This is a label');
        });
    });
});
