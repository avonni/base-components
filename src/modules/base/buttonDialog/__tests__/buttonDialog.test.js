import { createElement } from 'lwc';
import ButtonDialog from 'c/buttonDialog';

let element;
describe('Button Dialog', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-button-dialog', {
            is: ButtonDialog
        });
        document.body.appendChild(element);
    });

    it('Button Dialog:: Default attributes', () => {
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
    it('Button Dialog: access-key', () => {
        element.accessKey = 'K';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button"]'
        );

        return Promise.resolve().then(() => {
            expect(button.accessKey).toBe('K');
        });
    });

    // alternative-text
    it('Button Dialog: alternative-text', () => {
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
    it('Button Dialog: disabled', () => {
        element.disabled = true;
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button"]'
        );

        return Promise.resolve().then(() => {
            expect(button.disabled).toBeTruthy();
        });
    });

    // label
    it('Button Dialog: label', () => {
        element.label = 'Button Label';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button"]'
        );

        return Promise.resolve().then(() => {
            expect(button.label).toBe('Button Label');
        });
    });

    // variant
    it('Button Dialog: variant neutral', () => {
        element.variant = 'neutral';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('neutral');
        });
    });

    it('Button Dialog: variant base', () => {
        element.variant = 'base';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('base');
        });
    });

    it('Button Dialog: variant brand', () => {
        element.variant = 'brand';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('brand');
        });
    });

    it('Button Dialog: variant brand-outline', () => {
        element.variant = 'brand-outline';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('brand-outline');
        });
    });

    it('Button Dialog: variant destructive', () => {
        element.variant = 'destructive';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('destructive');
        });
    });

    it('Button Dialog: variant destructive-text', () => {
        element.variant = 'destructive-text';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('destructive-text');
        });
    });

    it('Button Dialog: variant inverse', () => {
        element.variant = 'inverse';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('inverse');
        });
    });

    it('Button Dialog: variant success', () => {
        element.variant = 'success';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('success');
        });
    });

    // icon name
    it('Button Dialog: icon name', () => {
        element.iconName = 'utility:lock';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button"]'
        );

        return Promise.resolve().then(() => {
            expect(button.iconName).toBe('utility:lock');
        });
    });

    // icon position
    it('Button Dialog: icon position left', () => {
        element.iconName = 'utility:lock';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button"]'
        );

        return Promise.resolve().then(() => {
            expect(button.iconPosition).toBe('left');
        });
    });

    it('Button Dialog: icon position right', () => {
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
    it('Button Dialog: method click', () => {
        let clickEvent = false;
        element.addEventListener('click', () => {
            clickEvent = true;
        });

        element.click();
        return Promise.resolve().then(() => {
            expect(clickEvent).toBeTruthy();
        });
    });

    it('Button Dialog: method focus', () => {
        let focusEvent = false;
        element.addEventListener('focus', () => {
            focusEvent = true;
        });

        element.focus();
        return Promise.resolve().then(() => {
            expect(focusEvent).toBeTruthy();
        });
    });

    it('Button Dialog: method show', () => {
        let showEvent = false;
        element.addEventListener('show', () => {
            showEvent = true;
        });

        element.show();
        return Promise.resolve().then(() => {
            expect(showEvent).toBeTruthy();
        });
    });

    it('Button Dialog: method hide', () => {
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
