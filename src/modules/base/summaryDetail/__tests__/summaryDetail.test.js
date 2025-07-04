import { createElement } from 'lwc';
import SummaryDetail from 'c/summaryDetail';

let element;
describe('SummaryDetail', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-summary-detail', {
            is: SummaryDetail
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.closed).toBeFalsy();
            expect(element.expandIconName).toBe('utility:chevronright');
            expect(element.fullWidth).toBeFalsy();
            expect(element.hideIcon).toBeFalsy();
            expect(element.removeBodyIndentation).toBeFalsy();
            expect(element.shrinkIconName).toBe('utility:chevrondown');
            expect(element.title).toBeUndefined();
        });

        describe('closed', () => {
            it('false', () => {
                element.closed = false;

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector(
                        '.slds-summary-detail'
                    );
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-icon"]'
                    );

                    expect(wrapper.classList).toContain('slds-is-open');
                    expect(icon.iconName).toBe('utility:chevrondown');
                });
            });

            it('true', () => {
                element.closed = true;

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector(
                        '.slds-summary-detail'
                    );
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-icon"]'
                    );

                    expect(wrapper.classList).not.toContain('slds-is-open');
                    expect(icon.iconName).toBe('utility:chevronright');
                });
            });
        });

        describe('expandIconName', () => {
            it('Passed to the component', () => {
                element.expandIconName = 'utility:apps';
                element.closed = true;

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-icon"]'
                    );
                    expect(icon.iconName).toBe('utility:apps');
                });
            });
        });

        describe('hideIcon', () => {
            it('false', () => {
                element.hideIcon = false;

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-icon"]'
                    );
                    expect(icon).toBeTruthy();
                });
            });

            it('true', () => {
                element.hideIcon = true;

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-icon"]'
                    );
                    expect(icon).toBeFalsy();
                });
            });
        });

        describe('fullWidth', () => {
            it('false', () => {
                element.fullWidth = false;

                return Promise.resolve().then(() => {
                    const title = element.shadowRoot.querySelector(
                        '[data-element-id="div-title"]'
                    );
                    const body = element.shadowRoot.querySelector(
                        '[data-element-id="div-body"]'
                    );

                    expect(title.classList).not.toContain(
                        'avonni-summary-detail__flex-col'
                    );
                    expect(body.classList).not.toContain(
                        'avonni-summary-detail__flex-col'
                    );
                });
            });

            it('true', () => {
                element.fullWidth = true;

                return Promise.resolve().then(() => {
                    const title = element.shadowRoot.querySelector(
                        '[data-element-id="div-title"]'
                    );
                    const body = element.shadowRoot.querySelector(
                        '[data-element-id="div-body"]'
                    );

                    expect(title.classList).toContain(
                        'avonni-summary-detail__flex-col'
                    );
                    expect(body.classList).toContain(
                        'avonni-summary-detail__flex-col'
                    );
                });
            });
        });

        describe('removeBodyIndentation', () => {
            it('false', () => {
                element.removeBodyIndentation = false;

                return Promise.resolve().then(() => {
                    const content = element.shadowRoot.querySelector(
                        '.slds-summary-detail__content'
                    );
                    expect(content.classList).not.toContain(
                        'avonni-summary-detail__content_no-indent'
                    );
                });
            });

            it('true', () => {
                element.removeBodyIndentation = true;

                return Promise.resolve().then(() => {
                    const content = element.shadowRoot.querySelector(
                        '.slds-summary-detail__content'
                    );
                    expect(content.classList).toContain(
                        'avonni-summary-detail__content_no-indent'
                    );
                });
            });
        });

        describe('shrinkIconName', () => {
            it('Passed to the component', () => {
                element.shrinkIconName = 'utility:apps';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-icon"]'
                    );
                    expect(icon.iconName).toBe('utility:apps');
                });
            });
        });

        describe('title', () => {
            it('Passed to the component', () => {
                element.title = 'A string title';

                return Promise.resolve().then(() => {
                    const title = element.shadowRoot.querySelector(
                        '[data-element-id="h3"]'
                    );
                    expect(title).toBeTruthy();
                    expect(title.textContent).toBe('A string title');
                });
            });
        });
    });

    describe('Events', () => {
        describe('toggle', () => {
            it('Fired when the section is toggled', () => {
                const handler = jest.fn();
                element.addEventListener('toggle', handler);
                const icon = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon"]'
                );
                icon.click();

                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.closed).toBe(true);
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
            });
        });
    });
});
