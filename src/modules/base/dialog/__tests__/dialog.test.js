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

    /*
     * -------------------------------------------------------------
     *  ATTRIBUTES
     * -------------------------------------------------------------
     */

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.ariaDescribedBy).toBeUndefined();
            expect(element.ariaLabelledBy).toBeUndefined();
            expect(element.closeButtonAlternativeText).toBe('Close');
            expect(element.title).toBeUndefined();
            expect(element.size).toBe('medium');
            expect(element.isLoading).toBeFalsy();
            expect(element.loadingStateAlternativeText).toBeUndefined();
        });

        // aria-described-by
        it('Aria described by', () => {
            element.ariaDescribedBy = 'This is an aria-described-by';
            element.show();

            return Promise.resolve().then(() => {
                const modal = element.shadowRoot.querySelector(
                    '[data-element-id="modal"]'
                );
                expect(modal.ariaDescribedBy).toBe(
                    'This is an aria-described-by'
                );
            });
        });

        // aria-labelled-by
        it('Aria labelled by', () => {
            element.ariaLabelledBy = 'This is an aria-labelled-by';
            element.show();

            return Promise.resolve().then(() => {
                const modal = element.shadowRoot.querySelector(
                    '[data-element-id="modal"]'
                );
                expect(modal.ariaLabelledBy).toBe(
                    'This is an aria-labelled-by'
                );
            });
        });

        // close-button-alternative-text
        it('Close button alternative text', () => {
            element.closeButtonAlternativeText = 'This is an alt text';
            element.show();

            return Promise.resolve().then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-close"]'
                );
                expect(button.alternativeText).toBe('This is an alt text');
            });
        });

        // is loading
        it('Is loading', () => {
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
        it('Loading state alternative text', () => {
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
        it('Show dialog', () => {
            element.showDialog = true;

            return Promise.resolve().then(() => {
                const modal = element.shadowRoot.querySelector(
                    '[data-element-id="modal"]'
                );
                expect(modal).toBeTruthy();
            });
        });

        // size
        describe('Size', () => {
            it('x-small', () => {
                element.size = 'x-small';
                element.show();

                return Promise.resolve().then(() => {
                    const modal = element.shadowRoot.querySelector(
                        '[data-element-id="modal"]'
                    );
                    expect(modal.className).toContain('slds-modal_x-small');
                });
            });

            it('small', () => {
                element.size = 'small';
                element.show();

                return Promise.resolve().then(() => {
                    const modal = element.shadowRoot.querySelector(
                        '[data-element-id="modal"]'
                    );
                    expect(modal.className).toContain('slds-modal_small');
                });
            });

            it('medium', () => {
                element.show();

                return Promise.resolve().then(() => {
                    const modal = element.shadowRoot.querySelector(
                        '[data-element-id="modal"]'
                    );
                    expect(modal.className).toContain('slds-modal_medium');
                });
            });

            it('large', () => {
                element.size = 'large';
                element.show();

                return Promise.resolve().then(() => {
                    const modal = element.shadowRoot.querySelector(
                        '[data-element-id="modal"]'
                    );
                    expect(modal.className).toContain('slds-modal_large');
                });
            });
        });

        // title
        it('Title', () => {
            element.title = 'This is a title';
            element.show();

            return Promise.resolve().then(() => {
                const title = element.shadowRoot.querySelector(
                    '[data-element-id="h1"]'
                );
                expect(title.textContent).toBe('This is a title');
            });
        });
    });

    /*
     * -------------------------------------------------------------
     *  METHODS
     * -------------------------------------------------------------
     */

    describe('Methods', () => {
        // close
        it('Close', () => {
            element.show();
            element.hide();

            return Promise.resolve().then(() => {
                const modal = element.shadowRoot.querySelector(
                    '[data-element-id="modal"]'
                );
                expect(modal).toBeFalsy();
            });
        });

        // focus
        it('Focus', () => {
            element.title = 'some title';
            element.show();

            return Promise.resolve()
                .then(() => {
                    const title = element.shadowRoot.querySelector(
                        '[data-element-id="h1"]'
                    );
                    const spy = jest.spyOn(title, 'focus');
                    element.focus();
                    expect(spy).toHaveBeenCalled();

                    element.title = undefined;
                })
                .then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-icon-close"]'
                    );
                    const spy = jest.spyOn(button, 'focus');
                    element.focus();
                    expect(spy).toHaveBeenCalled();
                });
        });

        // focusOnCloseButton
        it('Focus on close button', () => {
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

        it('Hide', () => {
            element.showDialog = true;

            return Promise.resolve()
                .then(() => {
                    const modal = element.shadowRoot.querySelector(
                        '[data-element-id="modal"]'
                    );
                    expect(modal).toBeTruthy();
                    element.hide();
                })
                .then(() => {
                    const modal = element.shadowRoot.querySelector(
                        '[data-element-id="modal"]'
                    );
                    expect(modal).toBeFalsy();
                });
        });

        // show
        it('Show', () => {
            element.show();

            return Promise.resolve().then(() => {
                const modal = element.shadowRoot.querySelector(
                    '[data-element-id="modal"]'
                );
                expect(modal).toBeTruthy();
            });
        });
    });

    /*
     * ------------------------------------------------------------
     *  EVENTS
     * -------------------------------------------------------------
     */

    describe('Events', () => {
        // closedialog
        describe('closedialog', () => {
            it('Fired when clicking on the close button', () => {
                const handler = jest.fn();
                element.addEventListener('closedialog', handler);
                element.showDialog = true;

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-icon-close"]'
                    );
                    button.click();

                    expect(handler).toHaveBeenCalled();
                    const call = handler.mock.calls[0][0];
                    expect(call.bubbles).toBeFalsy();
                    expect(call.cancelable).toBeFalsy();
                    expect(call.composed).toBeFalsy();
                });
            });

            it('Fired when calling the hide method', () => {
                const handler = jest.fn();
                element.addEventListener('closedialog', handler);
                element.showDialog = true;

                return Promise.resolve().then(() => {
                    element.hide();
                    expect(handler).toHaveBeenCalled();
                });
            });

            it('Fired when pressing the Escape key', () => {
                const handler = jest.fn();
                element.addEventListener('closedialog', handler);
                element.showDialog = true;

                return Promise.resolve().then(() => {
                    const section = element.shadowRoot.querySelector(
                        '[data-element-id="modal"]'
                    );
                    const event = new CustomEvent('keyup');
                    event.key = 'Escape';
                    section.dispatchEvent(event);

                    expect(handler).toHaveBeenCalled();
                });
            });
        });

        // outsideclick
        it('outsideclick event', () => {
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
});
