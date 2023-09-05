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

    it('Scoped notification: Default attributes', () => {
        expect(element.iconName).toBeUndefined();
        expect(element.iconSize).toBe('medium');
        expect(element.title).toBeUndefined();
        expect(element.variant).toBe('base');
    });

    /* ----- ATTRIBUTES ----- */

    // icon-name
    it('Scoped notification: iconName', () => {
        element.iconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-icon"]'
            );
            expect(icon).toBeTruthy();
            expect(icon.iconName).toBe('utility:apps');
        });
    });

    // icon-size
    // Depends on iconName
    it('Scoped notification: iconSize', () => {
        element.iconName = 'utility:apps';
        element.iconSize = 'large';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-icon"]'
            );
            expect(icon.size).toBe('large');
        });
    });

    // title
    it('Scoped notification: title', () => {
        element.title = 'A string title';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector(
                '[data-element-id="p-title"]'
            );
            expect(title.textContent).toBe('A string title');
        });
    });

    // variant
    // Depends on iconName
    it('Scoped notification: variant = base', () => {
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

    it('Scoped notification: variant = dark', () => {
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

    it('Scoped notification: variant = warning', () => {
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

    it('Scoped notification: variant = error', () => {
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

    it('Scoped notification: variant = success', () => {
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
