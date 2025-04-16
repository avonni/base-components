import Alert from 'c/alert';
import { createElement } from 'lwc';

let element;
describe('Alert', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-alert', {
            is: Alert
        });
        document.body.appendChild(element);
    });

    it('Alert: Default attributes', () => {
        expect(element.iconName).toBeUndefined();
        expect(element.iconSize).toBe('small');
        expect(element.variant).toBe('base');
        expect(element.isDismissible).toBe(false);
    });

    it('Alert: variant base', () => {
        const div = element.shadowRoot.querySelector('[data-element-id="div"]');
        expect(div.classList).toContain('avonni-alert__wrapper');
        expect(div.classList).toContain('avonni-alert_base');
        expect(div.classList).not.toContain('avonni-alert_error');
        expect(div.classList).not.toContain('avonni-alert_offline');
        expect(div.classList).not.toContain('avonni-alert_warning');
    });

    it('Alert: variant error', () => {
        const div = element.shadowRoot.querySelector('[data-element-id="div"]');

        element.variant = 'error';

        return Promise.resolve().then(() => {
            expect(element.variant).toBe('error');
            expect(div.classList).toContain('avonni-alert__wrapper');
            expect(div.classList).not.toContain('avonni-alert_base');
            expect(div.classList).toContain('avonni-alert_error');
            expect(div.classList).not.toContain('avonni-alert_offline');
            expect(div.classList).not.toContain('avonni-alert_warning');
        });
    });

    it('Alert: variant offline', () => {
        const div = element.shadowRoot.querySelector('[data-element-id="div"]');

        element.variant = 'offline';

        return Promise.resolve().then(() => {
            expect(element.variant).toBe('offline');
            expect(div.classList).toContain('avonni-alert__wrapper');
            expect(div.classList).not.toContain('avonni-alert_base');
            expect(div.classList).not.toContain('avonni-alert_error');
            expect(div.classList).toContain('avonni-alert_offline');
            expect(div.classList).not.toContain('avonni-alert_warning');
        });
    });

    it('Alert: variant warning', () => {
        const div = element.shadowRoot.querySelector('[data-element-id="div"]');
        element.variant = 'warning';

        return Promise.resolve().then(() => {
            expect(element.variant).toBe('warning');
            expect(div.classList).toContain('avonni-alert__wrapper');
            expect(div.classList).not.toContain('avonni-alert_base');
            expect(div.classList).not.toContain('avonni-alert_error');
            expect(div.classList).not.toContain('avonni-alert_offline');
            expect(div.classList).toContain('avonni-alert_warning');
        });
    });

    // is Dismissible
    it('Alert: isDismissible = false', () => {
        element.isDismissible = false;

        return Promise.resolve().then(() => {
            const lightningButtonIcon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon"]'
            );
            const div = element.shadowRoot.querySelector(
                '[data-element-id="div"]'
            );
            expect(lightningButtonIcon).toBeFalsy();
            expect(div.classList).not.toContain(
                'avonni-alert__wrapper_dismissible'
            );
        });
    });

    it('Alert: isDismissible = true', () => {
        element.isDismissible = true;

        return Promise.resolve().then(() => {
            const lightningButtonIcon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon"]'
            );
            const div = element.shadowRoot.querySelector(
                '[data-element-id="div"]'
            );
            expect(div.classList).toContain(
                'avonni-alert__wrapper_dismissible'
            );
            expect(lightningButtonIcon).toBeTruthy();
        });
    });

    // iconName
    it('Alert: iconName', () => {
        let lightningIcon = element.shadowRoot.querySelector(
            '[data-element-id="lightning-icon"]'
        );
        expect(lightningIcon).toBeFalsy();

        element.iconName = 'utility:user';

        return Promise.resolve().then(() => {
            lightningIcon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-icon"]'
            );
            expect(lightningIcon).toBeTruthy();
            expect(lightningIcon.iconName).toBe('utility:user');
        });
    });

    // iconSize
    it('Alert: iconSize = xx-small', () => {
        let lightningIcon = element.shadowRoot.querySelector(
            '[data-element-id="lightning-icon"]'
        );

        element.iconName = 'utility:user';
        element.iconSize = 'xx-small';

        return Promise.resolve().then(() => {
            lightningIcon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-icon"]'
            );
            expect(lightningIcon.size).toBe('xx-small');
        });
    });

    it('Alert: iconSize = x-small', () => {
        let lightningIcon = element.shadowRoot.querySelector(
            '[data-element-id="lightning-icon"]'
        );

        element.iconName = 'utility:user';
        element.iconSize = 'x-small';

        return Promise.resolve().then(() => {
            lightningIcon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-icon"]'
            );
            expect(lightningIcon.size).toBe('x-small');
        });
    });

    it('Alert: iconSize = small', () => {
        let lightningIcon = element.shadowRoot.querySelector(
            '[data-element-id="lightning-icon"]'
        );

        element.iconName = 'utility:user';
        element.iconSize = 'small';

        return Promise.resolve().then(() => {
            lightningIcon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-icon"]'
            );
            expect(lightningIcon.size).toBe('small');
        });
    });

    it('Alert: iconSize = medium', () => {
        let lightningIcon = element.shadowRoot.querySelector(
            '[data-element-id="lightning-icon"]'
        );

        element.iconName = 'utility:user';
        element.iconSize = 'medium';

        return Promise.resolve().then(() => {
            lightningIcon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-icon"]'
            );
            expect(lightningIcon.size).toBe('medium');
        });
    });

    it('Alert: iconSize = large', () => {
        let lightningIcon = element.shadowRoot.querySelector(
            '[data-element-id="lightning-icon"]'
        );

        element.iconName = 'utility:user';
        element.iconSize = 'large';

        return Promise.resolve().then(() => {
            lightningIcon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-icon"]'
            );
            expect(lightningIcon.size).toBe('large');
        });
    });

    // closeAction
    it('Alert: closeAction', () => {
        element.isDismissible = true;
        const mockCallBack = jest.fn();
        element.closeAction = mockCallBack;

        return Promise.resolve()
            .then(() => {
                const div = element.shadowRoot.querySelector(
                    '[data-element-id="div"]'
                );
                const lightningButtonIcon = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon"]'
                );

                expect(div).toBeTruthy();
                lightningButtonIcon.click();
            })
            .then(() => {
                const div = element.shadowRoot.querySelector(
                    '[data-element-id="div"]'
                );
                expect(div).toBeFalsy();
                expect(mockCallBack.mock.calls.length).toEqual(1);
            });
    });
});
