import { createElement } from 'lwc';
import ScopedNotification from 'c/scopedNotification';

let element;
describe('ScopedNotification', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-scoped-notification', {
            is: ScopedNotification
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.iconName).toBeUndefined();
            expect(element.iconSize).toBe('medium');
            expect(element.title).toBeUndefined();
            expect(element.variant).toBe('base');
        });

        describe('iconName', () => {
            it('Passed to the component', () => {
                element.iconName = 'utility:apps';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon"]'
                    );
                    expect(icon).toBeTruthy();
                    expect(icon.iconName).toBe('utility:apps');
                });
            });
        });

        describe('iconSize', () => {
            it('Passed to the component', () => {
                element.iconName = 'utility:apps';
                element.iconSize = 'large';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon"]'
                    );
                    expect(icon.size).toBe('large');
                });
            });
        });

        describe('title', () => {
            it('Passed to the component', () => {
                element.title = 'A string title';

                return Promise.resolve().then(() => {
                    const title = element.shadowRoot.querySelector(
                        '[data-element-id="p-title"]'
                    );
                    expect(title.textContent).toBe('A string title');
                });
            });
        });

        describe('variant', () => {
            it('base', () => {
                element.variant = 'base';

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector(
                        '.slds-scoped-notification'
                    );

                    expect(wrapper.classList).toContain(
                        'avonni-scoped-notification_theme-base'
                    );
                    expect(wrapper.classList).not.toContain(
                        'avonni-scoped-notification_theme-dark'
                    );
                    expect(wrapper.classList).not.toContain(
                        'avonni-scoped-notification_theme-warning'
                    );
                    expect(wrapper.classList).not.toContain(
                        'avonni-scoped-notification_theme-error'
                    );
                    expect(wrapper.classList).not.toContain(
                        'avonni-scoped-notification_theme-success'
                    );
                });
            });

            it('dark', () => {
                element.variant = 'dark';
                element.iconName = 'utility:favorite';

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector(
                        '.slds-scoped-notification'
                    );
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon"]'
                    );

                    expect(wrapper.classList).not.toContain(
                        'avonni-scoped-notification_theme-base'
                    );
                    expect(wrapper.classList).toContain(
                        'avonni-scoped-notification_theme-dark'
                    );
                    expect(wrapper.classList).not.toContain(
                        'avonni-scoped-notification_theme-warning'
                    );
                    expect(wrapper.classList).not.toContain(
                        'avonni-scoped-notification_theme-error'
                    );
                    expect(wrapper.classList).not.toContain(
                        'avonni-scoped-notification_theme-success'
                    );
                    expect(icon.variant).toBe('inverse');
                });
            });

            it('warning', () => {
                element.variant = 'warning';
                element.iconName = 'utility:favorite';

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector(
                        '.slds-scoped-notification'
                    );

                    expect(wrapper.classList).not.toContain(
                        'avonni-scoped-notification_theme-base'
                    );
                    expect(wrapper.classList).not.toContain(
                        'avonni-scoped-notification_theme-dark'
                    );
                    expect(wrapper.classList).toContain(
                        'avonni-scoped-notification_theme-warning'
                    );
                    expect(wrapper.classList).not.toContain(
                        'avonni-scoped-notification_theme-error'
                    );
                    expect(wrapper.classList).not.toContain(
                        'avonni-scoped-notification_theme-success'
                    );
                });
            });

            it('error', () => {
                element.variant = 'error';
                element.iconName = 'utility:favorite';

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector(
                        '.slds-scoped-notification'
                    );
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon"]'
                    );

                    expect(wrapper.classList).not.toContain(
                        'avonni-scoped-notification_theme-base'
                    );
                    expect(wrapper.classList).not.toContain(
                        'avonni-scoped-notification_theme-dark'
                    );
                    expect(wrapper.classList).not.toContain(
                        'avonni-scoped-notification_theme-warning'
                    );
                    expect(wrapper.classList).toContain(
                        'avonni-scoped-notification_theme-error'
                    );
                    expect(wrapper.classList).not.toContain(
                        'avonni-scoped-notification_theme-success'
                    );
                    expect(icon.variant).toBe('inverse');
                });
            });

            it('success', () => {
                element.variant = 'success';
                element.iconName = 'utility:favorite';

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector(
                        '.slds-scoped-notification'
                    );
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon"]'
                    );

                    expect(wrapper.classList).not.toContain(
                        'avonni-scoped-notification_theme-base'
                    );
                    expect(wrapper.classList).not.toContain(
                        'avonni-scoped-notification_theme-dark'
                    );
                    expect(wrapper.classList).not.toContain(
                        'avonni-scoped-notification_theme-warning'
                    );
                    expect(wrapper.classList).not.toContain(
                        'avonni-scoped-notification_theme-error'
                    );
                    expect(wrapper.classList).toContain(
                        'avonni-scoped-notification_theme-success'
                    );
                    expect(icon.variant).toBe('inverse');
                });
            });
        });
    });
});
