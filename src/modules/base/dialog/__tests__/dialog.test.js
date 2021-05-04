import { createElement } from 'lwc';
import Dialog from 'c/dialog';

describe('Dialog', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Dialog Default attributes', () => {
        const element = createElement('base-dialog', {
            is: Dialog
        });

        expect(element.title).toBeUndefined();
        expect(element.size).toBe('medium');
        expect(element.isLoading).toBeFalsy();
        expect(element.loadingStateAlternativeText).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // title
    it('Dialog title', () => {
        const element = createElement('base-dialog', {
            is: Dialog
        });
        document.body.appendChild(element);

        element.title = 'This is a title';
        element.show();

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector('h2');
            expect(title.textContent).toBe('This is a title');
        });
    });

    // size
    it('Dialog size small', () => {
        const element = createElement('base-dialog', {
            is: Dialog
        });
        document.body.appendChild(element);

        element.size = 'small';
        element.show();

        return Promise.resolve().then(() => {
            const modal = element.shadowRoot.querySelector('.slds-modal');
            expect(modal.className).toContain('slds-modal_small');
        });
    });

    it('Dialog size medium', () => {
        const element = createElement('base-dialog', {
            is: Dialog
        });
        document.body.appendChild(element);

        element.show();

        return Promise.resolve().then(() => {
            const modal = element.shadowRoot.querySelector('.slds-modal');
            expect(modal.className).toContain('slds-modal_medium');
        });
    });

    it('Dialog size large', () => {
        const element = createElement('base-dialog', {
            is: Dialog
        });
        document.body.appendChild(element);

        element.size = 'large';
        element.show();

        return Promise.resolve().then(() => {
            const modal = element.shadowRoot.querySelector('.slds-modal');
            expect(modal.className).toContain('slds-modal_large');
        });
    });

    // is loading
    it('Dialog size is loading', () => {
        const element = createElement('base-dialog', {
            is: Dialog
        });
        document.body.appendChild(element);

        element.isLoading = true;
        element.show();

        return Promise.resolve().then(() => {
            const spinner = element.shadowRoot.querySelector(
                'lightning-spinner'
            );
            expect(spinner).toBeTruthy();
        });
    });

    // loading state alternative text
    it('Dialog size loading state alternative text', () => {
        const element = createElement('base-dialog', {
            is: Dialog
        });
        document.body.appendChild(element);

        element.isLoading = true;
        element.loadingStateAlternativeText =
            'This is a loading state alternative text';
        element.show();

        return Promise.resolve().then(() => {
            const spinner = element.shadowRoot.querySelector(
                'lightning-spinner'
            );
            expect(spinner.alternativeText).toBe(
                'This is a loading state alternative text'
            );
        });
    });

    // show dialog
    it('Dialog show dialog', () => {
        const element = createElement('base-dialog', {
            is: Dialog
        });
        document.body.appendChild(element);

        element.showDialog = true;

        return Promise.resolve().then(() => {
            const modal = element.shadowRoot.querySelector('.slds-modal');
            expect(modal).toBeTruthy();
        });
    });

    /* ----- METHODS ----- */

    // show
    it('Dialog show method', () => {
        const element = createElement('base-dialog', {
            is: Dialog
        });
        document.body.appendChild(element);

        element.show();

        return Promise.resolve().then(() => {
            const modal = element.shadowRoot.querySelector('.slds-modal');
            expect(modal).toBeTruthy();
        });
    });

    // close
    it('Dialog close method', () => {
        const element = createElement('base-dialog', {
            is: Dialog
        });
        document.body.appendChild(element);

        element.show();
        element.hide();

        return Promise.resolve().then(() => {
            const modal = element.shadowRoot.querySelector('.slds-modal');
            expect(modal).toBeFalsy();
        });
    });
});
