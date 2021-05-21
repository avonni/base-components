import { createElement } from 'lwc';
import ScopedNotification from 'c/scopedNotification';

describe('ScopedNotification', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-scoped-notification', {
            is: ScopedNotification
        });

        expect(element.iconName).toBeUndefined();
        expect(element.iconSize).toBe('medium');
        expect(element.title).toBeUndefined();
        expect(element.variant).toBe('base');
    });

    /* ----- ATTRIBUTES ----- */

    // icon-name
    it('iconName', () => {
        const element = createElement('base-scoped-notification', {
            is: ScopedNotification
        });

        document.body.appendChild(element);

        element.iconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(icon).toBeTruthy();
            expect(icon.iconName).toBe('utility:apps');
        });
    });

    // icon-size
    // Depends on iconName
    it('iconSize', () => {
        const element = createElement('base-scoped-notification', {
            is: ScopedNotification
        });

        document.body.appendChild(element);

        element.iconName = 'utility:apps';
        element.iconSize = 'large';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(icon.size).toBe('large');
        });
    });

    // title
    it('title', () => {
        const element = createElement('base-scoped-notification', {
            is: ScopedNotification
        });

        document.body.appendChild(element);

        element.title = 'A string title';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector(
                '.slds-media__body p'
            );
            expect(title.textContent).toBe('A string title');
        });
    });

    // variant
    // Depends on iconName
    it('variant = base', () => {
        const element = createElement('base-scoped-notification', {
            is: ScopedNotification
        });

        document.body.appendChild(element);

        element.variant = 'base';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.slds-scoped-notification'
            );

            expect(wrapper.classList).not.toContain(
                'slds-scoped-notification_light'
            );
            expect(wrapper.classList).not.toContain(
                'slds-scoped-notification_dark'
            );
            expect(wrapper.classList).not.toContain(
                'avonni-scoped-notification_warning'
            );
            expect(wrapper.classList).not.toContain(
                'avonni-scoped-notification_error'
            );
            expect(wrapper.classList).not.toContain(
                'avonni-scoped-notification_success'
            );
        });
    });

    it('variant = light', () => {
        const element = createElement('base-scoped-notification', {
            is: ScopedNotification
        });

        document.body.appendChild(element);

        element.variant = 'light';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.slds-scoped-notification'
            );

            expect(wrapper.classList).toContain(
                'slds-scoped-notification_light'
            );
            expect(wrapper.classList).not.toContain(
                'slds-scoped-notification_dark'
            );
            expect(wrapper.classList).not.toContain(
                'avonni-scoped-notification_warning'
            );
            expect(wrapper.classList).not.toContain(
                'avonni-scoped-notification_error'
            );
            expect(wrapper.classList).not.toContain(
                'avonni-scoped-notification_success'
            );
        });
    });

    it('variant = dark', () => {
        const element = createElement('base-scoped-notification', {
            is: ScopedNotification
        });

        document.body.appendChild(element);

        element.variant = 'dark';
        element.iconName = 'utility:favorite';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.slds-scoped-notification'
            );
            const icon = element.shadowRoot.querySelector('lightning-icon');

            expect(wrapper.classList).not.toContain(
                'slds-scoped-notification_light'
            );
            expect(wrapper.classList).toContain(
                'slds-scoped-notification_dark'
            );
            expect(wrapper.classList).not.toContain(
                'avonni-scoped-notification_warning'
            );
            expect(wrapper.classList).not.toContain(
                'avonni-scoped-notification_error'
            );
            expect(wrapper.classList).not.toContain(
                'avonni-scoped-notification_success'
            );
            expect(icon.variant).toBe('inverse');
        });
    });

    it('variant = warning', () => {
        const element = createElement('base-scoped-notification', {
            is: ScopedNotification
        });

        document.body.appendChild(element);

        element.variant = 'warning';
        element.iconName = 'utility:favorite';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.slds-scoped-notification'
            );
            const icon = element.shadowRoot.querySelector('lightning-icon');

            expect(wrapper.classList).not.toContain(
                'slds-scoped-notification_light'
            );
            expect(wrapper.classList).not.toContain(
                'slds-scoped-notification_dark'
            );
            expect(wrapper.classList).toContain(
                'avonni-scoped-notification_warning'
            );
            expect(wrapper.classList).not.toContain(
                'avonni-scoped-notification_error'
            );
            expect(wrapper.classList).not.toContain(
                'avonni-scoped-notification_success'
            );
            expect(icon.variant).toBe('warning');
        });
    });

    it('variant = error', () => {
        const element = createElement('base-scoped-notification', {
            is: ScopedNotification
        });

        document.body.appendChild(element);

        element.variant = 'error';
        element.iconName = 'utility:favorite';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.slds-scoped-notification'
            );
            const icon = element.shadowRoot.querySelector('lightning-icon');

            expect(wrapper.classList).not.toContain(
                'slds-scoped-notification_light'
            );
            expect(wrapper.classList).not.toContain(
                'slds-scoped-notification_dark'
            );
            expect(wrapper.classList).not.toContain(
                'avonni-scoped-notification_warning'
            );
            expect(wrapper.classList).toContain(
                'avonni-scoped-notification_error'
            );
            expect(wrapper.classList).not.toContain(
                'avonni-scoped-notification_success'
            );
            expect(icon.variant).toBe('error');
        });
    });

    it('variant = success', () => {
        const element = createElement('base-scoped-notification', {
            is: ScopedNotification
        });

        document.body.appendChild(element);

        element.variant = 'success';
        element.iconName = 'utility:favorite';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.slds-scoped-notification'
            );
            const icon = element.shadowRoot.querySelector('lightning-icon');

            expect(wrapper.classList).not.toContain(
                'slds-scoped-notification_light'
            );
            expect(wrapper.classList).not.toContain(
                'slds-scoped-notification_dark'
            );
            expect(wrapper.classList).not.toContain(
                'avonni-scoped-notification_warning'
            );
            expect(wrapper.classList).not.toContain(
                'avonni-scoped-notification_error'
            );
            expect(wrapper.classList).toContain(
                'avonni-scoped-notification_success'
            );
            expect(icon.variant).toBe('success');
        });
    });
});
