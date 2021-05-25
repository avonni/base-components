import { createElement } from 'lwc';
import SummaryDetail from 'c/summaryDetail';

describe('SummaryDetail', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-summary-detail', {
            is: SummaryDetail
        });

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
    it('closed = false', () => {
        const element = createElement('base-summary-detail', {
            is: SummaryDetail
        });

        document.body.appendChild(element);
        element.closed = false;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.slds-summary-detail'
            );
            const icon = element.shadowRoot.querySelector(
                'lightning-button-icon'
            );

            expect(wrapper.classList).toContain('slds-is-open');
            expect(icon.iconName).toBe('utility:chevrondown');
        });
    });

    it('closed = true', () => {
        const element = createElement('base-summary-detail', {
            is: SummaryDetail
        });

        document.body.appendChild(element);
        element.closed = true;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.slds-summary-detail'
            );
            const icon = element.shadowRoot.querySelector(
                'lightning-button-icon'
            );

            expect(wrapper.classList).not.toContain('slds-is-open');
            expect(icon.iconName).toBe('utility:chevronright');
        });
    });

    // expand-icon-name
    // Depends on closed
    it('expandIconName', () => {
        const element = createElement('base-summary-detail', {
            is: SummaryDetail
        });

        document.body.appendChild(element);
        element.expandIconName = 'utility:apps';
        element.closed = true;

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                'lightning-button-icon'
            );
            expect(icon.iconName).toBe('utility:apps');
        });
    });

    // hide-icon
    it('hideIcon = false', () => {
        const element = createElement('base-summary-detail', {
            is: SummaryDetail
        });

        document.body.appendChild(element);
        element.hideIcon = false;

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                'lightning-button-icon'
            );
            expect(icon).toBeTruthy();
        });
    });

    it('hideIcon = true', () => {
        const element = createElement('base-summary-detail', {
            is: SummaryDetail
        });

        document.body.appendChild(element);
        element.hideIcon = true;

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                'lightning-button-icon'
            );
            expect(icon).toBeFalsy();
        });
    });

    // full-width
    it('fullWidth = false', () => {
        const element = createElement('base-summary-detail', {
            is: SummaryDetail
        });

        document.body.appendChild(element);
        element.fullWidth = false;

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector(
                '.slds-summary-detail__title > div > div'
            );
            const body = element.shadowRoot.querySelector(
                '.slds-summary-detail div'
            );

            expect(title.classList).not.toContain('slds-col');
            expect(body.classList).not.toContain('slds-col');
        });
    });

    it('fullWidth = true', () => {
        const element = createElement('base-summary-detail', {
            is: SummaryDetail
        });

        document.body.appendChild(element);
        element.fullWidth = true;

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector(
                '.slds-summary-detail__title > div > div'
            );
            const body = element.shadowRoot.querySelector(
                '.slds-summary-detail div'
            );

            expect(title.classList).toContain('slds-col');
            expect(body.classList).toContain('slds-col');
        });
    });

    // remove-body-indentation
    it('removeBodyIndentation = false', () => {
        const element = createElement('base-summary-detail', {
            is: SummaryDetail
        });

        document.body.appendChild(element);
        element.removeBodyIndentation = false;

        return Promise.resolve().then(() => {
            const content = element.shadowRoot.querySelector(
                '.slds-summary-detail__content'
            );
            expect(content.classList).not.toContain('content_no-indent');
        });
    });

    it('removeBodyIndentation = true', () => {
        const element = createElement('base-summary-detail', {
            is: SummaryDetail
        });

        document.body.appendChild(element);
        element.removeBodyIndentation = true;

        return Promise.resolve().then(() => {
            const content = element.shadowRoot.querySelector(
                '.slds-summary-detail__content'
            );
            expect(content.classList).toContain('content_no-indent');
        });
    });

    // shrink-icon-name
    it('shrinkIconName', () => {
        const element = createElement('base-summary-detail', {
            is: SummaryDetail
        });

        document.body.appendChild(element);
        element.shrinkIconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                'lightning-button-icon'
            );
            expect(icon.iconName).toBe('utility:apps');
        });
    });

    // title
    it('title', () => {
        const element = createElement('base-summary-detail', {
            is: SummaryDetail
        });

        document.body.appendChild(element);
        element.title = 'A string title';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector('h3');
            expect(title).toBeTruthy();
            expect(title.textContent).toBe('A string title');
        });
    });

    /* ----- EVENTS ----- */

    // toggle
    it('toggle event', () => {
        const element = createElement('base-summary-detail', {
            is: SummaryDetail
        });

        document.body.appendChild(element);
        const handler = jest.fn();
        element.addEventListener('toggle', handler);
        const icon = element.shadowRoot.querySelector('lightning-button-icon');
        icon.click();

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.closed).toBe(true);
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
    });
});
