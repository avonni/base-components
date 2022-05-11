/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2021, Avonni Labs, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * - Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

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

    it('Wizard step: Default attributes', () => {
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
    it('Wizard step: wizardStepstepregister event', () => {
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
