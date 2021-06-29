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
