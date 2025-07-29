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

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.buttonLabel).toBeUndefined();
            expect(element.disabled).toBeFalsy();
            expect(element.placeholder).toBeUndefined();
            expect(element.value).toBeUndefined();
            expect(element.variant).toBe('base');
        });

        describe('buttonLabel', () => {
            it('Passed to the component', () => {
                element.buttonLabel = 'A string label';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button"]'
                    );
                    expect(button.label).toBe('A string label');
                });
            });
        });

        describe('disabled', () => {
            it('false', () => {
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

            it('true', () => {
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
        });

        describe('placeholder', () => {
            it('Passed to the component', () => {
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
                            element.shadowRoot.querySelector(
                                '.richTextPublisher'
                            );
                        expect(richText.placeholder).toBe(
                            'A string placeholder'
                        );
                    });
            });
        });

        describe('value', () => {
            it('Passed to the component', () => {
                element.value = 'A string value';
                element.focus();

                return Promise.resolve().then(() => {
                    const richText = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-input-rich-text"]'
                    );
                    expect(richText.value).toBe('A string value');
                });
            });
        });

        describe('variant', () => {
            it('base', () => {
                element.variant = 'base';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button"]'
                    );
                    expect(button).toBeTruthy();
                });
            });

            it('comment', () => {
                element.variant = 'comment';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button"]'
                    );
                    expect(button).toBeFalsy();
                });
            });
        });
    });

    describe('Methods', () => {
        describe('focus', () => {
            it('focus method', () => {
                element.focus();

                return Promise.resolve().then(() => {
                    const wrapper =
                        element.shadowRoot.querySelector('.slds-publisher');
                    const richText = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-input-rich-text"]'
                    );

                    expect(wrapper.classList).toContain('slds-is-active');
                    expect(richText).toBeTruthy();
                });
            });
        });
    });

    describe('Events', () => {
        describe('submit', () => {
            it('submit event', () => {
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
    });
});
