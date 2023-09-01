

import { createElement } from 'lwc';
import VerticalProgressStep from 'c/verticalProgressStep';

let element;
describe('VerticalProgressStep', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-vertical-progress-step', {
            is: VerticalProgressStep
        });
        document.body.appendChild(element);
    });

    it('Vertical progress step: Default attributes', () => {
        expect(element.label).toBeUndefined();
        expect(element.value).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // label
    it('Vertical progress step: label', () => {
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.slds-progress__item_content .slds-truncate'
            );
            expect(label.textContent).toBe('A string label');
        });
    });

    // value
    it('Vertical progress step: value', () => {
        element.value = 'a-string-value';

        return Promise.resolve().then(() => {
            expect(element.dataset.step).toBe('a-string-value');
        });
    });

    /* ----- METHODS ----- */
    // setAttributes
    it('Vertical progress step: setAttributes', () => {
        element.setAttributes(true, true);

        return Promise.resolve().then(() => {
            expect(element.classList).toContain('avonni-content-in-line');
            expect(element.classList).toContain('avonni-spread');
        });
    });

    // setIcon
    it('Vertical progress step: setIcon', () => {
        element.setIcon('utility:down');

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(icon.iconName).toBe('utility:down');
        });
    });

    /* ----- EVENTS ----- */

    // stepmouseenter
    // Depends on value
    it('Vertical progress step: stepmouseenter event', () => {
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
    it('Vertical progress step: stepmouseleave event', () => {
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
    it('Vertical progress step: stepblur event', () => {
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
    it('Vertical progress step: stepfocus event', () => {
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
