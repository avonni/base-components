import { createElement } from 'lwc';
import Publisher from 'c/publisher';

describe('Publisher', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-publisher', {
            is: Publisher
        });

        expect(element.buttonLabel).toBeUndefined();
        expect(element.disabled).toBeFalsy();
        expect(element.placeholder).toBeUndefined();
        expect(element.value).toBeUndefined();
        expect(element.variant).toBe('base');
    });

    /* ----- ATTRIBUTES ----- */

    // button-label
    it('buttonLabel', () => {
        const element = createElement('base-publisher', {
            is: Publisher
        });

        document.body.appendChild(element);

        element.buttonLabel = 'A string label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.label).toBe('A string label');
        });
    });

    // disabled
    // Depends on focus()
    it('disabled = false', () => {
        const element = createElement('base-publisher', {
            is: Publisher
        });

        document.body.appendChild(element);

        element.disabled = false;

        return Promise.resolve().then(() => {
            // The button should not be disabled by default
            const button = element.shadowRoot.querySelector('lightning-button');
            const input = element.shadowRoot.querySelector('lightning-input');

            expect(input.disabled).toBeFalsy();
            expect(button.disabled).toBeFalsy();
        });
    });

    it('disabled = true', () => {
        const element = createElement('base-publisher', {
            is: Publisher
        });

        document.body.appendChild(element);

        element.disabled = true;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            const input = element.shadowRoot.querySelector('lightning-input');

            expect(input.disabled).toBeTruthy();
            expect(button.disabled).toBeTruthy();
        });
    });

    // placeholder
    // Depends on focus()
    it('placeholder', () => {
        const element = createElement('base-publisher', {
            is: Publisher
        });

        document.body.appendChild(element);

        element.placeholder = 'A string placeholder';

        return Promise.resolve()
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    'lightning-input'
                );
                expect(input.placeholder).toBe('A string placeholder');

                element.focus();
            })
            .then(() => {
                const richText = element.shadowRoot.querySelector(
                    '.richTextPublisher'
                );
                expect(richText.placeholder).toBe('A string placeholder');
            });
    });

    // value
    // Depends on focus()
    it('value', () => {
        const element = createElement('base-publisher', {
            is: Publisher
        });

        document.body.appendChild(element);

        element.value = 'A string value';
        element.focus();

        return Promise.resolve().then(() => {
            const richText = element.shadowRoot.querySelector(
                'c-input-rich-text'
            );
            expect(richText.value).toBe('A string value');
        });
    });

    // variant
    it('variant = base', () => {
        const element = createElement('base-publisher', {
            is: Publisher
        });

        document.body.appendChild(element);

        element.variant = 'base';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button).toBeTruthy();
        });
    });

    it('variant = comment', () => {
        const element = createElement('base-publisher', {
            is: Publisher
        });

        document.body.appendChild(element);

        element.variant = 'comment';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button).toBeFalsy();
        });
    });

    /* ----- METHOD ----- */

    // focus
    it('focus method', () => {
        const element = createElement('base-publisher', {
            is: Publisher
        });

        document.body.appendChild(element);

        element.focus();

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('.slds-publisher');
            const richText = element.shadowRoot.querySelector(
                'c-input-rich-text'
            );

            expect(wrapper.classList).toContain('slds-is-active');
            expect(richText).toBeTruthy();
        });
    });

    /* ----- EVENT ----- */

    // submit
    // Depends on value
    it('submit event', () => {
        const element = createElement('base-publisher', {
            is: Publisher
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.value = 'A string value';
        element.addEventListener('submit', handler);
        element.focus();

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');

            button.click();
            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler.mock.calls[0][0].detail).toBe('A string value');
        });
    });
});
