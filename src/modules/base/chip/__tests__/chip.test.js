import { createElement } from 'lwc';
import Chip from 'c/chip';

describe('Chip', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Chip Default attributes', () => {
        const element = createElement('base-chip', {
            is: Chip
        });

        expect(element.label).toBeUndefined();
        expect(element.variant).toBe('base');
        expect(element.outline).toBeFalsy();
    });

    /* ----- ATTRIBUTES ----- */

    // label
    it('Chip label', () => {
        const element = createElement('base-chip', {
            is: Chip
        });
        document.body.appendChild(element);

        element.label = 'This is a label';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector('span');
            expect(span.textContent).toBe('This is a label');
        });
    });

    // variant
    it('Chip variant base', () => {
        const element = createElement('base-chip', {
            is: Chip
        });
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector('span');
            expect(span.className).toBe('slds-badge slds-theme_base');
        });
    });

    it('Chip variant brand', () => {
        const element = createElement('base-chip', {
            is: Chip
        });
        document.body.appendChild(element);

        element.variant = 'brand';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector('span');
            expect(span.className).toBe('slds-badge slds-theme_brand');
        });
    });

    it('Chip variant inverse', () => {
        const element = createElement('base-chip', {
            is: Chip
        });
        document.body.appendChild(element);

        element.variant = 'inverse';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector('span');
            expect(span.className).toBe('slds-badge slds-theme_inverse');
        });
    });

    it('Chip variant alt-inverse', () => {
        const element = createElement('base-chip', {
            is: Chip
        });
        document.body.appendChild(element);

        element.variant = 'alt-inverse';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector('span');
            expect(span.className).toBe('slds-badge slds-theme_alt-inverse');
        });
    });

    it('Chip variant success', () => {
        const element = createElement('base-chip', {
            is: Chip
        });
        document.body.appendChild(element);

        element.variant = 'success';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector('span');
            expect(span.className).toBe('slds-badge slds-theme_success');
        });
    });

    it('Chip variant info', () => {
        const element = createElement('base-chip', {
            is: Chip
        });
        document.body.appendChild(element);

        element.variant = 'info';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector('span');
            expect(span.className).toBe('slds-badge slds-theme_info');
        });
    });

    it('Chip variant warning', () => {
        const element = createElement('base-chip', {
            is: Chip
        });
        document.body.appendChild(element);

        element.variant = 'warning';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector('span');
            expect(span.className).toBe('slds-badge slds-theme_warning');
        });
    });

    it('Chip variant error', () => {
        const element = createElement('base-chip', {
            is: Chip
        });
        document.body.appendChild(element);

        element.variant = 'error';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector('span');
            expect(span.className).toBe('slds-badge slds-theme_error');
        });
    });

    it('Chip variant offline', () => {
        const element = createElement('base-chip', {
            is: Chip
        });
        document.body.appendChild(element);

        element.variant = 'offline';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector('span');
            expect(span.className).toBe('slds-badge slds-theme_offline');
        });
    });

    // outline
    it('Chip outline', () => {
        const element = createElement('base-chip', {
            is: Chip
        });
        document.body.appendChild(element);

        element.outline = true;

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector('span');
            expect(span.className).toContain('avonni-outline');
        });
    });
});
