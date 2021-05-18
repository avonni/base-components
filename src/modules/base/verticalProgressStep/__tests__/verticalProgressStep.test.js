import { createElement } from 'lwc';
import VerticalProgressStep from 'c/verticalProgressStep';

describe('VerticalProgressStep', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-vertical-progress-step', {
            is: VerticalProgressStep
        });

        expect(element.label).toBeUndefined();
        expect(element.value).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // label
    it('label', () => {
        const element = createElement('base-vertical-progress-step', {
            is: VerticalProgressStep
        });

        document.body.appendChild(element);

        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.slds-progress__item_content .slds-truncate'
            );
            expect(label.textContent).toBe('A string label');
        });
    });

    // value
    it('value', () => {
        const element = createElement('base-vertical-progress-step', {
            is: VerticalProgressStep
        });

        document.body.appendChild(element);

        element.value = 'a-string-value';

        return Promise.resolve().then(() => {
            expect(element.dataset.step).toBe('a-string-value');
        });
    });

    /* ----- EVENTS ----- */

    // stepmouseenter
    // Depends on value
    it('stepmouseenter event', () => {
        const element = createElement('base-vertical-progress-step', {
            is: VerticalProgressStep
        });

        document.body.appendChild(element);

        element.value = 'a-string-value';
        const handler = jest.fn();
        element.addEventListener('stepmouseenter', handler);
        const marker = element.shadowRoot.querySelector(
            '.slds-progress__marker'
        );
        marker.dispatchEvent(new CustomEvent('mouseenter'));

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.value).toBe('a-string-value');
        expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
        expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
    });

    // stepmouseleave
    // Depends on value
    it('stepmouseleave event', () => {
        const element = createElement('base-vertical-progress-step', {
            is: VerticalProgressStep
        });

        document.body.appendChild(element);

        element.value = 'a-string-value';
        const handler = jest.fn();
        element.addEventListener('stepmouseleave', handler);
        const marker = element.shadowRoot.querySelector(
            '.slds-progress__marker'
        );
        marker.dispatchEvent(new CustomEvent('mouseleave'));

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.value).toBe('a-string-value');
        expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
        expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
    });

    // stepblur
    // Depends on value
    it('stepblur event', () => {
        const element = createElement('base-vertical-progress-step', {
            is: VerticalProgressStep
        });

        document.body.appendChild(element);

        element.value = 'a-string-value';
        const handler = jest.fn();
        element.addEventListener('stepblur', handler);
        const marker = element.shadowRoot.querySelector(
            '.slds-progress__marker'
        );
        marker.dispatchEvent(new CustomEvent('blur'));

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.value).toBe('a-string-value');
        expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
        expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
    });

    // stepfocus
    // Depends on value
    it('stepfocus event', () => {
        const element = createElement('base-vertical-progress-step', {
            is: VerticalProgressStep
        });

        document.body.appendChild(element);

        element.value = 'a-string-value';
        const handler = jest.fn();
        element.addEventListener('stepfocus', handler);
        const marker = element.shadowRoot.querySelector(
            '.slds-progress__marker'
        );
        marker.dispatchEvent(new CustomEvent('focus'));

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.value).toBe('a-string-value');
        expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
        expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
    });
});
