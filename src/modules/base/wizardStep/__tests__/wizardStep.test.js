import { createElement } from 'lwc';
import WizardStep from 'c/wizardStep';

// Not tested because could not match the behaviour of .bind(this), to make the comparison:
// beforeChange

describe('WizardStep', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-wizard-step', {
            is: WizardStep
        });

        expect(element.beforeChange).toBeTruthy();
        expect(element.beforeChangeErrorMessage).toBeUndefined();
        expect(element.hideNextFinishButton).toBeFalsy();
        expect(element.hidePreviousButton).toBeFalsy();
        expect(element.label).toBeUndefined();
        expect(element.name).toBeUndefined();
    });

    // wizardStepstepregister event
    it('wizardStepstepregister event', () => {
        const element = createElement('base-wizard-step', {
            is: WizardStep
        });

        element.beforeChange = jest.fn();
        element.beforeChangeErrorMessage = 'Error message';
        element.hideNextFinishButton = true;
        element.hidePreviousButton = false;
        element.label = 'Wizard step';
        element.name = 'wizard-step';

        const handler = jest.fn();
        element.addEventListener('wizardstepregister', handler);

        document.body.appendChild(element);

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
        expect(handler.mock.calls[0][0].detail.name).toBe('wizard-step');
        expect(handler.mock.calls[0][0].detail.label).toBe('Wizard step');
        expect(handler.mock.calls[0][0].detail.beforeChangeErrorMessage).toBe(
            'Error message'
        );
        expect(handler.mock.calls[0][0].detail.hidePreviousButton).toBeFalsy();
        expect(
            handler.mock.calls[0][0].detail.hideNextFinishButton
        ).toBeTruthy();
    });
});
