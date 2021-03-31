import { createElement } from 'lwc';
import Alert from 'c/alert';

describe('Alert', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-alert', {
            is: Alert
        });

        expect(element.iconName).toBeUndefined();
        expect(element.variant).toBe('base');
        expect(element.textured).toBe(false);
        expect(element.isDismissible).toBe(false);
    });

    it('Alert variant base', () => {
        const element = createElement('base-alert', {
            is: Alert
        });
        document.body.appendChild(element);

        const div = element.shadowRoot.querySelector('div');
        expect(div.classList).toContain('slds-theme_info');
    });

    it('Alert variant error', () => {
        const element = createElement('base-alert', {
            is: Alert
        });

        document.body.appendChild(element);

        const div = element.shadowRoot.querySelector('div');

        element.variant = 'error';

        return Promise.resolve().then(() => {
            expect(element.variant).toBe('error');
            expect(div.classList).toContain('slds-theme_error');
        });
    });

    it('Alert variant offline', () => {
        const element = createElement('base-alert', {
            is: Alert
        });

        document.body.appendChild(element);

        const div = element.shadowRoot.querySelector('div');

        element.variant = 'offline';

        return Promise.resolve().then(() => {
            expect(element.variant).toBe('offline');
            expect(div.classList).toContain('slds-theme_offline');
        });
    });

    it('Alert variant warning', () => {
        const element = createElement('base-alert', {
            is: Alert
        });

        document.body.appendChild(element);

        const div = element.shadowRoot.querySelector('div');
        const lightningButtonIcon = element.shadowRoot.querySelector(
            'lightning-button-icon'
        );
        const lightningIcon = element.shadowRoot.querySelector(
            'lightning-icon'
        );

        expect(lightningButtonIcon.iconClass).toBe('slds-button_icon-inverse');
        expect(lightningIcon.variant).toBe('inverse');

        element.variant = 'warning';

        return Promise.resolve().then(() => {
            expect(element.variant).toBe('warning');
            expect(div.classList).toContain('slds-theme_warning');
            expect(lightningButtonIcon.iconClass).toBe('');
            expect(lightningIcon.variant).toBe('bare');
        });
    });

    it('Alert textured', () => {
        const element = createElement('base-alert', {
            is: Alert
        });

        document.body.appendChild(element);

        const div = element.shadowRoot.querySelector('div');

        element.textured = true;

        return Promise.resolve().then(() => {
            expect(element.textured).toBe(true);
            expect(div.classList).toContain('slds-theme_alert-texture');
        });
    });

    it('Alert isDismissible', () => {
        const element = createElement('base-alert', {
            is: Alert
        });

        document.body.appendChild(element);

        let lightningButtonIcon = element.shadowRoot.querySelector(
            'lightning-button-icon'
        );

        expect(lightningButtonIcon).toBeTruthy();

        element.isDismissible = true;

        return Promise.resolve().then(() => {
            lightningButtonIcon = element.shadowRoot.querySelector(
                'lightning-button-icon'
            );
            expect(element.isDismissible).toBe(true);
            expect(lightningButtonIcon).toBeFalsy();
        });
    });

    it('Alert iconName', () => {
        const element = createElement('base-alert', {
            is: Alert
        });

        document.body.appendChild(element);

        let lightningIcon = element.shadowRoot.querySelector('lightning-icon');

        expect(element.iconName).toBeUndefined();
        expect(lightningIcon.iconName).toBeUndefined();

        element.iconName = 'utility:user';

        return Promise.resolve().then(() => {
            lightningIcon = element.shadowRoot.querySelector('lightning-icon');
            expect(element.iconName).toBe('utility:user');
            expect(lightningIcon.iconName).toBe('utility:user');
        });
    });

    it('Alert closeAction', () => {
        const element = createElement('base-alert', {
            is: Alert
        });

        document.body.appendChild(element);

        const mockCallBack = jest.fn();

        let div = element.shadowRoot.querySelector('div');
        let lightningButtonIcon = element.shadowRoot.querySelector(
            'lightning-button-icon'
        );

        expect(div).toBeTruthy();
        element.closeAction = mockCallBack;
        lightningButtonIcon.click();

        expect(mockCallBack.mock.calls.length).toEqual(1);

        return Promise.resolve().then(() => {
            div = element.shadowRoot.querySelector('div');
            expect(div).toBeFalsy();
        });
    });
});
