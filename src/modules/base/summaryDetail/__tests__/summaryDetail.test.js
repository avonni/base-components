

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

    it('Summary detail: Default attributes', () => {
        expect(element.closed).toBeFalsy();
        expect(element.expandIconName).toBe('utility:chevronright');
        expect(element.hideIcon).toBeFalsy();
        expect(element.fullWidth).toBeFalsy();
        expect(element.removeBodyIndentation).toBeFalsy();
        expect(element.shrinkIconName).toBe('utility:chevrondown');
        expect(element.title).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // closed
    it('Summary detail: closed = false', () => {
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

    it('Summary detail: closed = true', () => {
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

    // expand-icon-name
    // Depends on closed
    it('Summary detail: expandIconName', () => {
        element.expandIconName = 'utility:apps';
        element.closed = true;

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon"]'
            );
            expect(icon.iconName).toBe('utility:apps');
        });
    });

    // hide-icon
    it('Summary detail: hideIcon = false', () => {
        element.hideIcon = false;

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon"]'
            );
            expect(icon).toBeTruthy();
        });
    });

    it('Summary detail: hideIcon = true', () => {
        element.hideIcon = true;

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon"]'
            );
            expect(icon).toBeFalsy();
        });
    });

    // full-width
    it('Summary detail: fullWidth = false', () => {
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

    it('Summary detail: fullWidth = true', () => {
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
            expect(body.classList).toContain('avonni-summary-detail__flex-col');
        });
    });

    // remove-body-indentation
    it('Summary detail: removeBodyIndentation = false', () => {
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

    it('Summary detail: removeBodyIndentation = true', () => {
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

    // shrink-icon-name
    it('Summary detail: shrinkIconName', () => {
        element.shrinkIconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon"]'
            );
            expect(icon.iconName).toBe('utility:apps');
        });
    });

    // title
    it('Summary detail: title', () => {
        element.title = 'A string title';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector(
                '[data-element-id="h3"]'
            );
            expect(title).toBeTruthy();
            expect(title.textContent).toBe('A string title');
        });
    });

    /* ----- EVENTS ----- */

    // toggle
    it('Summary detail: toggle event', () => {
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
