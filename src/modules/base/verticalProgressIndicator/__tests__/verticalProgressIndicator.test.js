import { createElement } from 'lwc';
import VerticalProgressIndicator from '../verticalProgressIndicator';

// Not tested because depends on slot content
// currentStep
// hasError

describe('VerticalProgressIndicator', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-vertical-progress-indicator', {
            is: VerticalProgressIndicator
        });

        expect(element.contentInLine).toBeFalsy();
        expect(element.currentStep).toBeUndefined();
        expect(element.hasError).toBeFalsy();
        expect(element.variant).toBe('base');
    });

    /* ----- ATTRIBUTES ----- */

    // content-in-line
    it('contentInLine = false', () => {
        const element = createElement('base-vertical-progress-indicator', {
            is: VerticalProgressIndicator
        });

        document.body.appendChild(element);

        element.contentInLine = false;

        return Promise.resolve().then(() => {
            const progressList = element.shadowRoot.querySelector(
                '.slds-progress__list'
            );
            expect(progressList.classList).not.toContain(
                'slds-progress__list-bordered'
            );
        });
    });

    it('contentInLine = true', () => {
        const element = createElement('base-vertical-progress-indicator', {
            is: VerticalProgressIndicator
        });

        document.body.appendChild(element);

        element.contentInLine = true;

        return Promise.resolve().then(() => {
            const progressList = element.shadowRoot.querySelector(
                '.slds-progress__list'
            );
            expect(progressList.classList).toContain(
                'slds-progress__list-bordered'
            );
        });
    });

    // variant
    it('variant = base', () => {
        const element = createElement('base-vertical-progress-indicator', {
            is: VerticalProgressIndicator
        });

        document.body.appendChild(element);

        element.variant = 'base';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('.slds-progress');
            expect(wrapper.classList).not.toContain('slds-progress_shade');
        });
    });

    it('variant = shaded', () => {
        const element = createElement('base-vertical-progress-indicator', {
            is: VerticalProgressIndicator
        });

        document.body.appendChild(element);

        element.variant = 'shaded';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('.slds-progress');
            expect(wrapper.classList).toContain('slds-progress_shade');
        });
    });
});
