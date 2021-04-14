import { createElement } from 'lwc';
import ButtonIconDialog from 'c/buttonIconDialog';

describe('Button Icon Dialog', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
        });

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
    it('Button Icon Dialog access-key', () => {
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
        });
        document.body.appendChild(element);

        element.accessKey = 'K';
        const button = element.shadowRoot.querySelector(
            'lightning-button-icon'
        );

        return Promise.resolve().then(() => {
            expect(button.accessKey).toBe('K');
        });
    });

    // alternative-text
    it('Button Icon Dialog alternative-text', () => {
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
        });
        document.body.appendChild(element);

        element.alternativeText = 'This is an alternative text';
        const button = element.shadowRoot.querySelector(
            'lightning-button-icon'
        );

        return Promise.resolve().then(() => {
            expect(button.alternativeText).toBe('This is an alternative text');
        });
    });

    // disabled
    it('Button Icon Dialog disabled', () => {
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
        });
        document.body.appendChild(element);

        element.disabled = true;
        const button = element.shadowRoot.querySelector(
            'lightning-button-icon'
        );

        return Promise.resolve().then(() => {
            expect(button.disabled).toBeTruthy();
        });
    });

    // variant
    it('Button Icon Dialog variant border', () => {
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
        });
        document.body.appendChild(element);

        element.variant = 'border';
        const button = element.shadowRoot.querySelector(
            'lightning-button-icon'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('border');
        });
    });

    it('Button Icon Dialog variant bare', () => {
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
        });
        document.body.appendChild(element);

        element.variant = 'bare';
        const button = element.shadowRoot.querySelector(
            'lightning-button-icon'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('bare');
        });
    });

    it('Button Icon Dialog variant container', () => {
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
        });
        document.body.appendChild(element);

        element.variant = 'container';
        const button = element.shadowRoot.querySelector(
            'lightning-button-icon'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('container');
        });
    });

    it('Button Icon Dialog variant brand', () => {
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
        });
        document.body.appendChild(element);

        element.variant = 'brand';
        const button = element.shadowRoot.querySelector(
            'lightning-button-icon'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('brand');
        });
    });

    it('Button Icon Dialog variant border-filled', () => {
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
        });
        document.body.appendChild(element);

        element.variant = 'border-filled';
        const button = element.shadowRoot.querySelector(
            'lightning-button-icon'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('border-filled');
        });
    });

    it('Button Icon Dialog variant bare-inverse', () => {
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
        });
        document.body.appendChild(element);

        element.variant = 'bare-inverse';
        const button = element.shadowRoot.querySelector(
            'lightning-button-icon'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('bare-inverse');
        });
    });

    it('Button Icon Dialog variant border-inverse', () => {
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
        });
        document.body.appendChild(element);

        element.variant = 'border-inverse';
        const button = element.shadowRoot.querySelector(
            'lightning-button-icon'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('border-inverse');
        });
    });

    // size
    it('Button Icon Dialog size xx-small', () => {
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
        });
        document.body.appendChild(element);

        element.size = 'xx-small';
        const button = element.shadowRoot.querySelector(
            'lightning-button-icon'
        );

        return Promise.resolve().then(() => {
            expect(button.size).toBe('xx-small');
        });
    });

    it('Button Icon Dialog size x-small', () => {
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
        });
        document.body.appendChild(element);

        element.size = 'x-small';
        const button = element.shadowRoot.querySelector(
            'lightning-button-icon'
        );

        return Promise.resolve().then(() => {
            expect(button.size).toBe('x-small');
        });
    });

    it('Button Icon Dialog size small', () => {
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
        });
        document.body.appendChild(element);

        element.size = 'small';
        const button = element.shadowRoot.querySelector(
            'lightning-button-icon'
        );

        return Promise.resolve().then(() => {
            expect(button.size).toBe('small');
        });
    });

    it('Button Icon Dialog size medium', () => {
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
        });
        document.body.appendChild(element);

        element.size = 'medium';
        const button = element.shadowRoot.querySelector(
            'lightning-button-icon'
        );

        return Promise.resolve().then(() => {
            expect(button.size).toBe('medium');
        });
    });

    it('Button Icon Dialog size large for non bare', () => {
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
        });
        document.body.appendChild(element);

        element.size = 'large';
        const button = element.shadowRoot.querySelector(
            'lightning-button-icon'
        );

        return Promise.resolve().then(() => {
            expect(button.size).toBe('medium');
        });
    });

    it('Button Icon Dialog size large for bare', () => {
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
        });
        document.body.appendChild(element);

        element.variant = 'bare';
        element.size = 'large';
        const button = element.shadowRoot.querySelector(
            'lightning-button-icon'
        );

        return Promise.resolve().then(() => {
            expect(button.size).toBe('large');
        });
    });
});
