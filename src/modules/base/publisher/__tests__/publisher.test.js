

import { createElement } from 'lwc';
import Publisher from 'c/publisher';

let element;
describe('Publisher', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-publisher', {
            is: Publisher
        });

        document.body.appendChild(element);
    });

    it('Publisher: Default attributes', () => {
        expect(element.buttonLabel).toBeUndefined();
        expect(element.disabled).toBeFalsy();
        expect(element.placeholder).toBeUndefined();
        expect(element.value).toBeUndefined();
        expect(element.variant).toBe('base');
    });

    /* ----- ATTRIBUTES ----- */

    // button-label
    it('Publisher: buttonLabel', () => {
        element.buttonLabel = 'A string label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            expect(button.label).toBe('A string label');
        });
    });

    // disabled
    // Depends on focus()
    it('Publisher: disabled = false', () => {
        element.disabled = false;

        return Promise.resolve().then(() => {
            // The button should not be disabled by default
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input"]'
            );

            expect(input.disabled).toBeFalsy();
            expect(button.disabled).toBeFalsy();
        });
    });

    it('Publisher: disabled = true', () => {
        element.disabled = true;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input"]'
            );

            expect(input.disabled).toBeTruthy();
            expect(button.disabled).toBeTruthy();
        });
    });

    // placeholder
    // Depends on focus()
    it('Publisher: placeholder', () => {
        element.placeholder = 'A string placeholder';

        return Promise.resolve()
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input"]'
                );
                expect(input.placeholder).toBe('A string placeholder');

                element.focus();
            })
            .then(() => {
                const richText =
                    element.shadowRoot.querySelector('.richTextPublisher');
                expect(richText.placeholder).toBe('A string placeholder');
            });
    });

    // value
    // Depends on focus()
    it('Publisher: value', () => {
        element.value = 'A string value';
        element.focus();

        return Promise.resolve().then(() => {
            const richText = element.shadowRoot.querySelector(
                '[data-element-id="avonni-input-rich-text"]'
            );
            expect(richText.value).toBe('A string value');
        });
    });

    // variant
    it('Publisher: variant = base', () => {
        element.variant = 'base';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            expect(button).toBeTruthy();
        });
    });

    it('Publisher: variant = comment', () => {
        element.variant = 'comment';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            expect(button).toBeFalsy();
        });
    });

    /* ----- METHOD ----- */

    // focus
    it('Publisher: focus method', () => {
        element.focus();

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('.slds-publisher');
            const richText = element.shadowRoot.querySelector(
                '[data-element-id="avonni-input-rich-text"]'
            );

            expect(wrapper.classList).toContain('slds-is-active');
            expect(richText).toBeTruthy();
        });
    });

    /* ----- EVENT ----- */

    // submit
    // Depends on value
    it('Publisher: submit event', () => {
        const handler = jest.fn();
        element.value = 'A string value';
        element.addEventListener('submit', handler);
        element.focus();

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );

            button.click();
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.value).toBe(
                'A string value'
            );
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });
});
