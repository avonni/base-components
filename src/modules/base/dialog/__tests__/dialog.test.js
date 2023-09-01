

import { createElement } from 'lwc';
import Dialog from 'c/dialog';

let element;
describe('Dialog', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-dialog', {
            is: Dialog
        });
        document.body.appendChild(element);
    });

    it('Dialog: Default attributes', () => {
        expect(element.title).toBeUndefined();
        expect(element.size).toBe('medium');
        expect(element.isLoading).toBeFalsy();
        expect(element.loadingStateAlternativeText).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // title
    it('Dialog: title', () => {
        element.title = 'This is a title';
        element.show();

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector(
                '[data-element-id="h2"]'
            );
            expect(title.textContent).toBe('This is a title');
        });
    });

    // size
    it('Dialog: size x-small', () => {
        element.size = 'x-small';
        element.show();

        return Promise.resolve().then(() => {
            const modal = element.shadowRoot.querySelector(
                '[data-element-id="modal"]'
            );
            expect(modal.className).toContain('slds-modal_x-small');
        });
    });

    it('Dialog: size small', () => {
        element.size = 'small';
        element.show();

        return Promise.resolve().then(() => {
            const modal = element.shadowRoot.querySelector(
                '[data-element-id="modal"]'
            );
            expect(modal.className).toContain('slds-modal_small');
        });
    });

    it('Dialog: size medium', () => {
        element.show();

        return Promise.resolve().then(() => {
            const modal = element.shadowRoot.querySelector(
                '[data-element-id="modal"]'
            );
            expect(modal.className).toContain('slds-modal_medium');
        });
    });

    it('Dialog: size large', () => {
        element.size = 'large';
        element.show();

        return Promise.resolve().then(() => {
            const modal = element.shadowRoot.querySelector(
                '[data-element-id="modal"]'
            );
            expect(modal.className).toContain('slds-modal_large');
        });
    });

    // is loading
    it('Dialog: size is loading', () => {
        element.isLoading = true;
        element.show();

        return Promise.resolve().then(() => {
            const spinner = element.shadowRoot.querySelector(
                '[data-element-id="lightning-spinner"]'
            );
            expect(spinner).toBeTruthy();
        });
    });

    // loading state alternative text
    it('Dialog: size loading state alternative text', () => {
        element.isLoading = true;
        element.loadingStateAlternativeText =
            'This is a loading state alternative text';
        element.show();

        return Promise.resolve().then(() => {
            const spinner = element.shadowRoot.querySelector(
                '[data-element-id="lightning-spinner"]'
            );
            expect(spinner.alternativeText).toBe(
                'This is a loading state alternative text'
            );
        });
    });

    // show dialog
    it('Dialog: show dialog', () => {
        element.showDialog = true;

        return Promise.resolve().then(() => {
            const modal = element.shadowRoot.querySelector(
                '[data-element-id="modal"]'
            );
            expect(modal).toBeTruthy();
        });
    });

    /* ----- METHODS ----- */

    // close
    it('Dialog: close method', () => {
        element.show();
        element.hide();

        return Promise.resolve().then(() => {
            const modal = element.shadowRoot.querySelector(
                '[data-element-id="modal"]'
            );
            expect(modal).toBeFalsy();
        });
    });

    // focusOnCloseButton
    // Depends on showDialog
    it('Dialog: focusOnCloseButton method', () => {
        element.showDialog = true;
        const handler = jest.fn();

        return Promise.resolve().then(() => {
            const button =
                element.shadowRoot.querySelector('.slds-modal__close');
            button.focus = handler;
            element.focusOnCloseButton();
            expect(handler).toHaveBeenCalled();
        });
    });

    // show
    it('Dialog: show method', () => {
        element.show();

        return Promise.resolve().then(() => {
            const modal = element.shadowRoot.querySelector(
                '[data-element-id="modal"]'
            );
            expect(modal).toBeTruthy();
        });
    });

    /*
     * ------------------------------------------------------------
     *  EVENTS
     * -------------------------------------------------------------
     */

    // outsideclick
    it('Dialog: outsideclick event', () => {
        element.showDialog = true;
        const handler = jest.fn();
        element.addEventListener('outsideclick', handler);

        return Promise.resolve().then(() => {
            const section = element.shadowRoot.querySelector(
                '[data-element-id="modal"]'
            );
            const content = element.shadowRoot.querySelector(
                '[data-element-id="div-content"]'
            );
            content.click();
            expect(handler).not.toHaveBeenCalled();
            section.click();
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
        });
    });
});
