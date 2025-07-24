import { createElement } from 'lwc';
import Blockquote from 'c/blockquote';

let element;
describe('Blockquote', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-blockquote', {
            is: Blockquote
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.iconName).toBeUndefined();
            expect(element.iconPosition).toBe('left');
            expect(element.iconSize).toBe('small');
            expect(element.title).toBeUndefined();
            expect(element.variant).toBe('default');
        });

        describe('iconName', () => {
            it('Passed to the component', () => {
                element.iconName = 'utility:error';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id^="lightning-icon"]'
                    );
                    expect(icon.iconName).toBe('utility:error');
                });
            });
        });

        describe('iconPosition', () => {
            it('right', () => {
                element.iconName = 'utility:error';
                element.iconPosition = 'right';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id^="lightning-icon"]'
                    );
                    expect(icon.className).toContain('slds-m-left_x-small');
                });
            });

            it('left', () => {
                element.iconName = 'utility:error';
                element.iconPosition = 'left';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id^="lightning-icon"]'
                    );
                    expect(icon.className).toContain('slds-m-right_x-small');
                });
            });
        });

        describe('iconSize', () => {
            it('xx-small', () => {
                element.iconName = 'utility:error';
                element.iconSize = 'xx-small';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id^="lightning-icon"]'
                    );
                    expect(icon.size).toBe('xx-small');
                });
            });

            it('x-small', () => {
                element.iconName = 'utility:error';
                element.iconSize = 'x-small';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id^="lightning-icon"]'
                    );
                    expect(icon.size).toBe('x-small');
                });
            });

            it('small', () => {
                element.iconName = 'utility:error';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id^="lightning-icon"]'
                    );
                    expect(icon.size).toBe('small');
                });
            });

            it('medium', () => {
                element.iconName = 'utility:error';
                element.iconSize = 'medium';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id^="lightning-icon"]'
                    );
                    expect(icon.size).toBe('medium');
                });
            });

            it('large', () => {
                element.iconName = 'utility:error';
                element.iconSize = 'large';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id^="lightning-icon"]'
                    );
                    expect(icon.size).toBe('large');
                });
            });
        });

        describe('title', () => {
            it('Passed to the component', () => {
                element.title = 'Blockquote Title';

                return Promise.resolve().then(() => {
                    const div = element.shadowRoot.querySelector(
                        '.avonni-blockquote__container.avonni-blockquote__title'
                    );
                    expect(div.textContent).toBe('Blockquote Title');
                });
            });
        });

        describe('variant', () => {
            it('default', () => {
                element.title = 'Blockquote Title';

                return Promise.resolve().then(() => {
                    const div = element.shadowRoot.querySelector(
                        '.avonni-blockquote__container'
                    );
                    expect(div.className).toContain(
                        'avonni-blockquote__theme-default'
                    );
                });
            });

            it('brand', () => {
                element.variant = 'brand';

                return Promise.resolve().then(() => {
                    const div = element.shadowRoot.querySelector(
                        '.avonni-blockquote__container'
                    );
                    expect(div.className).toContain(
                        'avonni-blockquote__theme-brand'
                    );
                });
            });

            it('warning', () => {
                element.variant = 'warning';

                return Promise.resolve().then(() => {
                    const div = element.shadowRoot.querySelector(
                        '.avonni-blockquote__container'
                    );
                    expect(div.className).toContain(
                        'avonni-blockquote__theme-warning'
                    );
                });
            });

            it('success', () => {
                element.variant = 'success';

                return Promise.resolve().then(() => {
                    const div = element.shadowRoot.querySelector(
                        '.avonni-blockquote__container'
                    );
                    expect(div.className).toContain(
                        'avonni-blockquote__theme-success'
                    );
                });
            });

            it('error', () => {
                element.variant = 'error';

                return Promise.resolve().then(() => {
                    const div = element.shadowRoot.querySelector(
                        '.avonni-blockquote__container'
                    );
                    expect(div.className).toContain(
                        'avonni-blockquote__theme-error'
                    );
                });
            });
        });
    });
});
