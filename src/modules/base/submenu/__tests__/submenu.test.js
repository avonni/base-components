import { createElement } from 'lwc';
import Submenu from 'c/submenu';

describe('Submenu', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-submenu', {
            is: Submenu
        });

        expect(element.accessKey).toBeUndefined();
        expect(element.disabled).toBeFalsy();
        expect(element.draftAlternativeText).toBeUndefined();
        expect(element.iconName).toBeUndefined();
        expect(element.isDraft).toBeFalsy();
        expect(element.label).toBeUndefined();
        expect(element.prefixIconName).toBeUndefined();
        expect(element.tabIndex).toBe('0');
    });

    /* ----- ATTRIBUTES ----- */

    // access-key
    it('accessKey', () => {
        const element = createElement('base-submenu', {
            is: Submenu
        });

        document.body.appendChild(element);
        element.accessKey = 'k';

        return Promise.resolve().then(() => {
            const link = element.shadowRoot.querySelector('a');
            expect(link.accessKey).toBe('k');
        });
    });

    // disabled
    it('disabled = false', () => {
        const element = createElement('base-submenu', {
            is: Submenu
        });

        document.body.appendChild(element);

        element.disabled = false;
        const handler = jest.fn();
        element.addEventListener('privateselect', handler);

        return Promise.resolve().then(() => {
            const link = element.shadowRoot.querySelector('a');
            link.dispatchEvent(new CustomEvent('mouseenter'));

            expect(link.ariaDisabled).toBe('false');
            expect(handler).toHaveBeenCalled();
        });
    });

    it('disabled = true', () => {
        const element = createElement('base-submenu', {
            is: Submenu
        });

        document.body.appendChild(element);

        element.disabled = true;
        const handler = jest.fn();
        element.addEventListener('privateselect', handler);

        return Promise.resolve().then(() => {
            const link = element.shadowRoot.querySelector('a');
            link.dispatchEvent(new CustomEvent('mouseenter'));

            expect(link.ariaDisabled).toBe('true');
            expect(handler).not.toHaveBeenCalled();
        });
    });

    // draft-alternative-text
    // Depends on isDraft
    it('draftAlternativeText', () => {
        const element = createElement('base-submenu', {
            is: Submenu
        });

        document.body.appendChild(element);

        element.isDraft = true;
        element.draftAlternativeText = 'A string help';

        return Promise.resolve().then(() => {
            const abbr = element.shadowRoot.querySelector('abbr');
            expect(abbr.title).toBe('A string help');
        });
    });

    // icon-name
    it('iconName', () => {
        const element = createElement('base-submenu', {
            is: Submenu
        });

        document.body.appendChild(element);
        element.iconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                'span + lightning-icon'
            );
            expect(icon).toBeTruthy();
            expect(icon.iconName).toBe('utility:apps');
        });
    });

    // is-draft
    it('isDraft = false', () => {
        const element = createElement('base-submenu', {
            is: Submenu
        });

        document.body.appendChild(element);
        element.isDraft = false;

        return Promise.resolve().then(() => {
            const abbr = element.shadowRoot.querySelector('abbr');
            expect(abbr).toBeFalsy();
        });
    });

    it('isDraft = true', () => {
        const element = createElement('base-submenu', {
            is: Submenu
        });

        document.body.appendChild(element);
        element.isDraft = true;

        return Promise.resolve().then(() => {
            const abbr = element.shadowRoot.querySelector('abbr');
            expect(abbr).toBeTruthy();
        });
    });

    it('label', () => {
        const element = createElement('base-submenu', {
            is: Submenu
        });

        document.body.appendChild(element);
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector('span');
            expect(span.textContent).toBe('A string label');
            expect(span.title).toBe('A string label');
        });
    });

    // prefix-icon-name
    it('prefixIconName', () => {
        const element = createElement('base-submenu', {
            is: Submenu
        });

        document.body.appendChild(element);
        element.prefixIconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                'span lightning-icon'
            );
            expect(icon).toBeTruthy();
            expect(icon.iconName).toBe('utility:apps');
        });
    });

    // tab-index
    it('tabIndex', () => {
        const element = createElement('base-submenu', {
            is: Submenu
        });

        document.body.appendChild(element);
        element.tabIndex = '-1';

        return Promise.resolve().then(() => {
            const link = element.shadowRoot.querySelector('a');
            expect(link.tabIndex).toBe(-1);
        });
    });

    /* ----- METHODS ----- */

    // focus
    it('focus method', () => {
        const element = createElement('base-submenu', {
            is: Submenu
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('focus', handler);
        element.focus();

        expect(handler).toHaveBeenCalled();
    });
});
