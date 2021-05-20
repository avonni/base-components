import { createElement } from 'lwc';
import Blockquote from 'c/blockquote';

describe('Blockquote', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-blockquote', {
            is: Blockquote
        });

        expect(element.variant).toBe('default');
        expect(element.title).toBeUndefined();
        expect(element.iconName).toBeUndefined();
        expect(element.iconPosition).toBe('left');
        expect(element.iconSize).toBe('small');
    });

    /* ----- ATTRIBUTES ----- */
    // variant
    it('Blockquote variant default', () => {
        const element = createElement('base-blockquote', {
            is: Blockquote
        });
        document.body.appendChild(element);

        element.title = 'Blockquote Title';

        return Promise.resolve().then(() => {
            const div = element.shadowRoot.querySelector('.doc');
            expect(div.className).toContain('blockquote-default');
        });
    });

    it('Blockquote variant brand', () => {
        const element = createElement('base-blockquote', {
            is: Blockquote
        });
        document.body.appendChild(element);

        element.variant = 'brand';

        return Promise.resolve().then(() => {
            const div = element.shadowRoot.querySelector('.doc');
            expect(div.className).toContain('blockquote-brand');
        });
    });

    it('Blockquote variant warning', () => {
        const element = createElement('base-blockquote', {
            is: Blockquote
        });
        document.body.appendChild(element);

        element.variant = 'warning';

        return Promise.resolve().then(() => {
            const div = element.shadowRoot.querySelector('.doc');
            expect(div.className).toContain('blockquote-warning');
        });
    });

    it('Blockquote variant success', () => {
        const element = createElement('base-blockquote', {
            is: Blockquote
        });
        document.body.appendChild(element);

        element.variant = 'success';

        return Promise.resolve().then(() => {
            const div = element.shadowRoot.querySelector('.doc');
            expect(div.className).toContain('blockquote-success');
        });
    });

    it('Blockquote variant error', () => {
        const element = createElement('base-blockquote', {
            is: Blockquote
        });
        document.body.appendChild(element);

        element.variant = 'error';

        return Promise.resolve().then(() => {
            const div = element.shadowRoot.querySelector('.doc');
            expect(div.className).toContain('blockquote-error');
        });
    });

    // title
    it('Blockquote title', () => {
        const element = createElement('base-blockquote', {
            is: Blockquote
        });
        document.body.appendChild(element);

        element.title = 'Blockquote Title';

        return Promise.resolve().then(() => {
            const div = element.shadowRoot.querySelector('.doc.lead');
            expect(div.textContent).toBe('Blockquote Title');
        });
    });

    // icon name
    it('Blockquote icon name', () => {
        const element = createElement('base-blockquote', {
            is: Blockquote
        });
        document.body.appendChild(element);

        element.iconName = 'utility:error';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(icon.iconName).toBe('utility:error');
        });
    });

    // icon size
    it('Blockquote icon size xx-small', () => {
        const element = createElement('base-blockquote', {
            is: Blockquote
        });
        document.body.appendChild(element);

        element.iconName = 'utility:error';
        element.iconSize = 'xx-small';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(icon.size).toBe('xx-small');
        });
    });

    it('Blockquote icon size x-small', () => {
        const element = createElement('base-blockquote', {
            is: Blockquote
        });
        document.body.appendChild(element);

        element.iconName = 'utility:error';
        element.iconSize = 'x-small';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(icon.size).toBe('x-small');
        });
    });

    it('Blockquote icon size small', () => {
        const element = createElement('base-blockquote', {
            is: Blockquote
        });
        document.body.appendChild(element);

        element.iconName = 'utility:error';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(icon.size).toBe('small');
        });
    });

    it('Blockquote icon size medium', () => {
        const element = createElement('base-blockquote', {
            is: Blockquote
        });
        document.body.appendChild(element);

        element.iconName = 'utility:error';
        element.iconSize = 'medium';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(icon.size).toBe('medium');
        });
    });

    it('Blockquote icon size large', () => {
        const element = createElement('base-blockquote', {
            is: Blockquote
        });
        document.body.appendChild(element);

        element.iconName = 'utility:error';
        element.iconSize = 'large';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(icon.size).toBe('large');
        });
    });

    // icon position
    it('Blockquote icon position right', () => {
        const element = createElement('base-blockquote', {
            is: Blockquote
        });
        document.body.appendChild(element);

        element.iconName = 'utility:error';
        element.iconPosition = 'right';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(icon.className).toContain('slds-m-left_x-small');
        });
    });

    it('Blockquote icon position left', () => {
        const element = createElement('base-blockquote', {
            is: Blockquote
        });
        document.body.appendChild(element);

        element.iconName = 'utility:error';
        element.iconPosition = 'left';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(icon.className).toContain('slds-m-right_x-small');
        });
    });
});
