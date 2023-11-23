import { createElement } from 'lwc';
import Button from 'c/button';

let element;
describe('Button', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-button', {
            is: Button
        });
        document.body.appendChild(element);
    });

    it('Button: Default attributes', () => {
        expect(element.accessKey).toBeUndefined();
        expect(element.alternativeText).toBeUndefined();
        expect(element.disabled).toBeFalsy();
        expect(element.label).toBeUndefined();
        expect(element.variant).toBe('neutral');
        expect(element.iconName).toBeUndefined();
        expect(element.iconPosition).toBe('left');
    });

    /* ----- ATTRIBUTES ----- */

    // access-key
    it('Button: access-key', () => {
        element.accessKey = 'K';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button"]'
        );

        return Promise.resolve().then(() => {
            expect(button.accessKey).toBe('K');
        });
    });

    // alternative-text
    it('Button: alternative-text', () => {
        element.alternativeText = 'This is an alternative text';
        const assistiveText = element.shadowRoot.querySelector(
            '.slds-assistive-text'
        );

        return Promise.resolve().then(() => {
            expect(assistiveText.textContent).toBe(
                'This is an alternative text'
            );
        });
    });

    // disabled
    it('Button: disabled', () => {
        element.disabled = true;
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button"]'
        );

        return Promise.resolve().then(() => {
            expect(button.disabled).toBeTruthy();
        });
    });

    // label
    it('Button: label', () => {
        element.label = 'Button Label';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button"]'
        );

        return Promise.resolve().then(() => {
            expect(button.label).toBe('Button Label');
        });
    });

    // variant
    it('Button: variant neutral', () => {
        element.variant = 'neutral';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('neutral');
        });
    });

    it('Button: variant base', () => {
        element.variant = 'base';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('base');
        });
    });

    it('Button: variant brand', () => {
        element.variant = 'brand';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('brand');
        });
    });

    it('Button: variant brand-outline', () => {
        element.variant = 'brand-outline';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('brand-outline');
        });
    });

    it('Button: variant destructive', () => {
        element.variant = 'destructive';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('destructive');
        });
    });

    it('Button: variant destructive-text', () => {
        element.variant = 'destructive-text';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('destructive-text');
        });
    });

    it('Button: variant inverse', () => {
        element.variant = 'inverse';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('inverse');
        });
    });

    it('Button: variant success', () => {
        element.variant = 'success';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('success');
        });
    });

    // icon name
    it('Button: icon name', () => {
        element.iconName = 'utility:lock';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button"]'
        );

        return Promise.resolve().then(() => {
            expect(button.iconName).toBe('utility:lock');
        });
    });

    // icon position
    it('Button: icon position left', () => {
        element.iconName = 'utility:lock';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button"]'
        );

        return Promise.resolve().then(() => {
            expect(button.iconPosition).toBe('left');
        });
    });

    it('Button: icon position right', () => {
        element.iconName = 'utility:lock';
        element.iconPosition = 'right';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button"]'
        );

        return Promise.resolve().then(() => {
            expect(button.iconPosition).toBe('right');
        });
    });

    /* ---- METHODS ----- */
    it('Button: method click', () => {
        let clickEvent = false;
        element.addEventListener('click', () => {
            clickEvent = true;
        });

        element.click();
        return Promise.resolve().then(() => {
            expect(clickEvent).toBeTruthy();
        });
    });

    it('Button: method focus', () => {
        let focusEvent = false;
        element.addEventListener('focus', () => {
            focusEvent = true;
        });

        element.focus();
        return Promise.resolve().then(() => {
            expect(focusEvent).toBeTruthy();
        });
    });

    it('Button: method show', () => {
        let showEvent = false;
        element.addEventListener('show', () => {
            showEvent = true;
        });

        element.show();
        return Promise.resolve().then(() => {
            expect(showEvent).toBeTruthy();
        });
    });

    it('Button: method hide', () => {
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
