import { createElement } from 'lwc';
import ButtonIconPopover from 'c/buttonIconPopover';

describe('Button Icon Popover', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });

        expect(element.accessKey).toBeUndefined();
        expect(element.alternativeText).toBeUndefined();
        expect(element.disabled).toBeFalsy();
        expect(element.variant).toBe('border');
        expect(element.size).toBe('medium');
        expect(element.tooltip).toBeUndefined();
        expect(element.iconClass).toBeUndefined();
        expect(element.iconName).toBeUndefined();
        expect(element.title).toBeUndefined();
        expect(element.popoverSize).toBe('medium');
        expect(element.placement).toBe('left');
        expect(element.isLoading).toBeFalsy();
        expect(element.loadingStateAlternativeText).toBeUndefined();
        expect(element.triggers).toBe('click');
        expect(element.popoverVariant).toBe('base');
    });

    /* ----- ATTRIBUTES ----- */

    // access-key
    it('Button Icon Popover access-key', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
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
    it('Button Icon Popover alternative-text', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
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
    it('Button Icon Popover disabled', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
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
    it('Button Icon Popover variant border', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
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

    it('Button Icon Popover variant bare', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
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

    it('Button Icon Popover variant container', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
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

    it('Button Icon Popover variant brand', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
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

    it('Button Icon Popover variant border-filled', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
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

    it('Button Icon Popover variant bare-inverse', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
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

    it('Button Icon Popover variant border-inverse', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
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
    it('Button Icon Popover size xx-small', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
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

    it('Button Icon Popover size x-small', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
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

    it('Button Icon Popover size small', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
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

    it('Button Icon Popover size medium', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
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

    it('Button Icon Popover size large for non bare', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
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

    it('Button Icon Popover size large for bare', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
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

    // tooltip
    it('Button Icon Popover tooltip', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.tooltip = 'This is a tooltip';
        const button = element.shadowRoot.querySelector(
            'lightning-button-icon'
        );

        return Promise.resolve().then(() => {
            expect(button.tooltip).toBe('This is a tooltip');
        });
    });

    // icon class
    it('Button Icon Popover icon class', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.iconClass = 'button-dialog-icon-class';
        const button = element.shadowRoot.querySelector(
            'lightning-button-icon'
        );

        return Promise.resolve().then(() => {
            expect(button.iconClass).toBe('button-dialog-icon-class');
        });
    });

    // icon name
    it('Button Icon Popover icon name', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.iconName = 'utility:lock';
        const button = element.shadowRoot.querySelector(
            'lightning-button-icon'
        );

        return Promise.resolve().then(() => {
            expect(button.iconName).toBe('utility:lock');
        });
    });
});
