import { createElement } from 'lwc';
import ButtonIconDialog from 'c/buttonIconDialog';

let element;
describe('Button Icon Dialog', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
        });
        document.body.appendChild(element);
    });

    it('Button Icon Dialog: Default attributes', () => {
        expect(element.accessKey).toBeUndefined();
        expect(element.alternativeText).toBeUndefined();
        expect(element.disabled).toBeFalsy();
        expect(element.variant).toBe('border');
        expect(element.size).toBe('medium');
        expect(element.tooltip).toBeUndefined();
        expect(element.iconClass).toBeUndefined();
        expect(element.iconName).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // access-key
    it('Button Icon Dialog: access-key', () => {
        element.accessKey = 'K';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon"]'
        );

        return Promise.resolve().then(() => {
            expect(button.accessKey).toBe('K');
        });
    });

    // alternative-text
    it('Button Icon Dialog: alternative-text', () => {
        element.alternativeText = 'This is an alternative text';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon"]'
        );

        return Promise.resolve().then(() => {
            expect(button.alternativeText).toBe('This is an alternative text');
        });
    });

    // disabled
    it('Button Icon Dialog: disabled', () => {
        element.disabled = true;
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon"]'
        );

        return Promise.resolve().then(() => {
            expect(button.disabled).toBeTruthy();
        });
    });

    // variant
    it('Button Icon Dialog: variant border', () => {
        element.variant = 'border';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('border');
        });
    });

    it('Button Icon Dialog: variant bare', () => {
        element.variant = 'bare';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('bare');
        });
    });

    it('Button Icon Dialog: variant container', () => {
        element.variant = 'container';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('container');
        });
    });

    it('Button Icon Dialog: variant brand', () => {
        element.variant = 'brand';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('brand');
        });
    });

    it('Button Icon Dialog: variant border-filled', () => {
        element.variant = 'border-filled';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('border-filled');
        });
    });

    it('Button Icon Dialog: variant bare-inverse', () => {
        element.variant = 'bare-inverse';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('bare-inverse');
        });
    });

    it('Button Icon Dialog: variant border-inverse', () => {
        element.variant = 'border-inverse';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('border-inverse');
        });
    });

    // size
    it('Button Icon Dialog: size xx-small', () => {
        element.size = 'xx-small';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon"]'
        );

        return Promise.resolve().then(() => {
            expect(button.size).toBe('xx-small');
        });
    });

    it('Button Icon Dialog: size x-small', () => {
        element.size = 'x-small';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon"]'
        );

        return Promise.resolve().then(() => {
            expect(button.size).toBe('x-small');
        });
    });

    it('Button Icon Dialog: size small', () => {
        element.size = 'small';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon"]'
        );

        return Promise.resolve().then(() => {
            expect(button.size).toBe('small');
        });
    });

    it('Button Icon Dialog: size medium', () => {
        element.size = 'medium';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon"]'
        );

        return Promise.resolve().then(() => {
            expect(button.size).toBe('medium');
        });
    });

    it('Button Icon Dialog: size large for non bare', () => {
        element.size = 'large';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon"]'
        );

        return Promise.resolve().then(() => {
            expect(button.size).toBe('medium');
        });
    });

    it('Button Icon Dialog: size large for bare', () => {
        element.variant = 'bare';
        element.size = 'large';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon"]'
        );

        return Promise.resolve().then(() => {
            expect(button.size).toBe('large');
        });
    });

    // tooltip
    it('Button Icon Dialog: tooltip', () => {
        element.tooltip = 'This is a tooltip';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon"]'
        );

        return Promise.resolve().then(() => {
            expect(button.tooltip).toBe('This is a tooltip');
        });
    });

    // icon class
    it('Button Icon Dialog: icon class', () => {
        element.iconClass = 'button-dialog-icon-class';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon"]'
        );

        return Promise.resolve().then(() => {
            expect(button.iconClass).toBe('button-dialog-icon-class');
        });
    });

    // icon name
    it('Button Icon Dialog: icon name', () => {
        element.iconName = 'utility:lock';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon"]'
        );

        return Promise.resolve().then(() => {
            expect(button.iconName).toBe('utility:lock');
        });
    });

    /* ---- METHODS ----- */
    it('Button Icon Dialog: method click', () => {
        let clickEvent = false;
        element.addEventListener('click', () => {
            clickEvent = true;
        });

        element.click();
        return Promise.resolve().then(() => {
            expect(clickEvent).toBeTruthy();
        });
    });

    it('Button Icon Dialog: method focus', () => {
        let focusEvent = false;
        element.addEventListener('focus', () => {
            focusEvent = true;
        });

        element.focus();
        return Promise.resolve().then(() => {
            expect(focusEvent).toBeTruthy();
        });
    });

    it('Button Icon Dialog: method show', () => {
        let showEvent = false;
        element.addEventListener('show', () => {
            showEvent = true;
        });

        element.show();
        return Promise.resolve().then(() => {
            expect(showEvent).toBeTruthy();
        });
    });

    it('Button Icon Dialog: method hide', () => {
        let hideEvent = false;
        element.addEventListener('hide', () => {
            hideEvent = true;
        });

        element.hide();
        return Promise.resolve().then(() => {
            expect(hideEvent).toBeTruthy();
        });
    });
});
