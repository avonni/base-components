import { createElement } from 'lwc';
import Submenu from 'c/submenu';

let element;
describe('Submenu', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-submenu', {
            is: Submenu
        });
        document.body.appendChild(element);
    });

    it('Submenu: Default attributes', () => {
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
    it('Submenu: accessKey', () => {
        element.accessKey = 'k';

        return Promise.resolve().then(() => {
            const link = element.shadowRoot.querySelector(
                '[data-element-id="a"]'
            );
            expect(link.accessKey).toBe('k');
        });
    });

    // disabled
    it('Submenu: disabled = false', () => {
        element.disabled = false;
        const handler = jest.fn();
        element.addEventListener('privateselect', handler);

        return Promise.resolve().then(() => {
            const link = element.shadowRoot.querySelector(
                '[data-element-id="a"]'
            );
            link.dispatchEvent(new CustomEvent('mouseenter'));

            expect(link.ariaDisabled).toBe('false');
            expect(handler).toHaveBeenCalled();
        });
    });

    it('Submenu: disabled = true', () => {
        element.disabled = true;
        const handler = jest.fn();
        element.addEventListener('privateselect', handler);

        return Promise.resolve().then(() => {
            const link = element.shadowRoot.querySelector(
                '[data-element-id="a"]'
            );
            link.dispatchEvent(new CustomEvent('mouseenter'));

            expect(link.ariaDisabled).toBe('true');
            expect(handler).not.toHaveBeenCalled();
        });
    });

    // draft-alternative-text
    // Depends on isDraft
    it('Submenu: draftAlternativeText', () => {
        element.isDraft = true;
        element.draftAlternativeText = 'A string help';

        return Promise.resolve().then(() => {
            const abbr = element.shadowRoot.querySelector(
                '[data-element-id="abbr"]'
            );
            expect(abbr.title).toBe('A string help');
        });
    });

    // icon-name
    it('Submenu: iconName', () => {
        element.iconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-icon"]'
            );
            expect(icon).toBeTruthy();
            expect(icon.iconName).toBe('utility:apps');
        });
    });

    // is-draft
    it('Submenu: isDraft = false', () => {
        element.isDraft = false;

        return Promise.resolve().then(() => {
            const abbr = element.shadowRoot.querySelector(
                '[data-element-id="abbr"]'
            );
            expect(abbr).toBeFalsy();
        });
    });

    it('Submenu: isDraft = true', () => {
        element.isDraft = true;

        return Promise.resolve().then(() => {
            const abbr = element.shadowRoot.querySelector(
                '[data-element-id="abbr"]'
            );
            expect(abbr).toBeTruthy();
        });
    });

    it('Submenu: label', () => {
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
    it('Submenu: prefixIconName', () => {
        element.prefixIconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-icon-prefix"]'
            );
            expect(icon).toBeTruthy();
            expect(icon.iconName).toBe('utility:apps');
        });
    });

    // tab-index
    it('Submenu: tabIndex', () => {
        element.tabIndex = '-1';

        return Promise.resolve().then(() => {
            const link = element.shadowRoot.querySelector(
                '[data-element-id="a"]'
            );
            expect(link.tabIndex).toBe(-1);
        });
    });

    /* ----- METHODS ----- */

    // focus
    it('Submenu: focus method', () => {
        const handler = jest.fn();
        element.addEventListener('focus', handler);
        element.focus();

        expect(handler).toHaveBeenCalled();
    });

    /* ----- EVENTS ----- */
    it('Submenu: blur', () => {
        const handler = jest.fn();
        element.addEventListener('blur', handler);

        return Promise.resolve().then(() => {
            const a = element.shadowRoot.querySelector('a');
            a.dispatchEvent(new CustomEvent('blur'));

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });

    it('Submenu: privateblur', () => {
        const handler = jest.fn();
        element.addEventListener('privateblur', handler);

        return Promise.resolve().then(() => {
            const a = element.shadowRoot.querySelector('a');
            a.dispatchEvent(new CustomEvent('blur'));

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].composed).toBeTruthy();
            expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
        });
    });

    it('Submenu: privatefocus', () => {
        const handler = jest.fn();
        element.addEventListener('privatefocus', handler);

        return Promise.resolve().then(() => {
            const a = element.shadowRoot.querySelector('a');
            a.dispatchEvent(new CustomEvent('focus'));

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
        });
    });
});
