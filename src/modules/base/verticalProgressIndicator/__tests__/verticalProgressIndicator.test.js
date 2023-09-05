import { createElement } from 'lwc';
import VerticalProgressIndicator from '../verticalProgressIndicator';

// Not tested because depends on slot content
// completedSteps
// currentStep
// markAsComplete
// format

let element;
describe('VerticalProgressIndicator', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-vertical-progress-indicator', {
            is: VerticalProgressIndicator
        });
        document.body.appendChild(element);
    });

    it('Vertical progress indicator: Default attributes', () => {
        expect(element.completedSteps).toMatchObject([]);
        expect(element.contentInLine).toBeFalsy();
        expect(element.currentStep).toBeUndefined();
        expect(element.format).toBe('linear');
        expect(element.hasError).toBeFalsy();
        expect(element.markAsComplete).toBeFalsy();
        expect(element.variant).toBe('base');
    });

    /* ----- ATTRIBUTES ----- */

    // content-in-line
    it('Vertical progress indicator: contentInLine = false', () => {
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

    it('Vertical progress indicator: contentInLine = true', () => {
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

    // hasError
    it('Vertical progress indicator: hasError = false', () => {
        element.hasError = false;

        return Promise.resolve().then(() => {
            expect(element.hasError).toBeFalsy();
        });
    });

    it('Vertical progress indicator: hasError = true', () => {
        element.hasError = true;

        return Promise.resolve().then(() => {
            expect(element.hasError).toBeTruthy();
        });
    });

    // variant
    it('Vertical progress indicator: variant = base', () => {
        element.variant = 'base';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('.slds-progress');
            expect(wrapper.classList).not.toContain('slds-progress_shade');
        });
    });

    it('Vertical progress indicator: variant = shaded', () => {
        element.variant = 'shaded';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('.slds-progress');
            expect(wrapper.classList).toContain('slds-progress_shade');
        });
    });
});
