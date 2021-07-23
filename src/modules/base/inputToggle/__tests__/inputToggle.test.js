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
import InputToggle from 'c/inputToggle';

describe('InputToggle', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-input-toggle', {
            is: InputToggle
        });

        expect(element.accessKey).toBeUndefined();
        expect(element.ariaControls).toBeUndefined();
        expect(element.ariaDescribedBy).toBeUndefined();
        expect(element.ariaLabel).toBeUndefined();
        expect(element.ariaLabelledBy).toBeUndefined();
        expect(element.checked).toBeFalsy();
        expect(element.disabled).toBeFalsy();
        expect(element.fieldLevelHelp).toBeUndefined();
        expect(element.hideMark).toBeFalsy();
        expect(element.label).toBeUndefined();
        expect(element.messageToggleActive).toBe('Active');
        expect(element.messageToggleInactive).toBe('Inactive');
        expect(element.messageWhenValueMissing).toBeUndefined();
        expect(element.name).toBeUndefined();
        expect(element.readOnly).toBeFalsy();
        expect(element.required).toBeFalsy();
        expect(element.size).toBe('medium');
        expect(element.validity).toEqual({});
        expect(element.value).toBeUndefined();
        expect(element.variant).toBe('standard');
    });

    /* ----- ATTRIBUTES ----- */

    // access-key
    it('accessKey', () => {
        const element = createElement('base-input-toggle', {
            is: InputToggle
        });
        document.body.appendChild(element);

        element.accessKey = 'K';
        const input = element.shadowRoot.querySelector('input');

        return Promise.resolve().then(() => {
            expect(input.accessKey).toBe('K');
        });
    });

    // aria-controls
    it('ariaControls', () => {
        const element = createElement('base-input-toggle', {
            is: InputToggle
        });
        document.body.appendChild(element);

        element.ariaControls = 'id-1 id-2 id-3';
        const input = element.shadowRoot.querySelector('input');

        return Promise.resolve().then(() => {
            expect(input.ariaControls).toBe('id-1 id-2 id-3');
        });
    });

    // aria-described-by
    it('ariaDescribedBy', () => {
        const element = createElement('base-input-toggle', {
            is: InputToggle
        });
        document.body.appendChild(element);

        element.ariaDescribedBy = 'id-1 id-2 id-3';
        const input = element.shadowRoot.querySelector('input');

        return Promise.resolve().then(() => {
            expect(input.ariaDescribedBy).toBe('id-1 id-2 id-3');
        });
    });

    // aria-label
    it('ariaLabel', () => {
        const element = createElement('base-input-toggle', {
            is: InputToggle
        });
        document.body.appendChild(element);

        element.ariaLabel = 'String label';
        const input = element.shadowRoot.querySelector('input');

        return Promise.resolve().then(() => {
            expect(input.ariaLabel).toBe('String label');
        });
    });

    // aria-labelled-by
    it('ariaLabelledBy', () => {
        const element = createElement('base-input-toggle', {
            is: InputToggle
        });
        document.body.appendChild(element);

        element.ariaLabelledBy = 'id-1 id-2 id-3';
        const input = element.shadowRoot.querySelector('input');

        return Promise.resolve().then(() => {
            expect(input.ariaLabelledBy).toBe('id-1 id-2 id-3');
        });
    });

    // checked
    it('checked', () => {
        const element = createElement('base-input-toggle', {
            is: InputToggle
        });
        document.body.appendChild(element);

        element.checked = true;
        const input = element.shadowRoot.querySelector('input');

        return Promise.resolve().then(() => {
            expect(input.checked).toBeTruthy();
        });
    });

    // disabled
    it('disabled', () => {
        const element = createElement('base-input-toggle', {
            is: InputToggle
        });
        document.body.appendChild(element);

        element.disabled = true;
        const input = element.shadowRoot.querySelector('input');

        return Promise.resolve().then(() => {
            expect(input.disabled).toBeTruthy();
        });
    });

    // field-level-help
    it('fieldLevelHelp', () => {
        const element = createElement('base-input-toggle', {
            is: InputToggle
        });
        document.body.appendChild(element);

        element.fieldLevelHelp = 'A string help';

        return Promise.resolve().then(() => {
            const help = element.shadowRoot.querySelector('lightning-helptext');
            expect(help).toBeTruthy();
        });
    });

    // hide-mark
    it('hideMark', () => {
        const element = createElement('base-input-toggle', {
            is: InputToggle
        });
        document.body.appendChild(element);

        element.hideMark = true;

        return Promise.resolve().then(() => {
            const fauxToggle = element.shadowRoot.querySelector(
                '.faux_hide-mark'
            );
            expect(fauxToggle).toBeTruthy();
        });
    });

    // label
    it('label', () => {
        const element = createElement('base-input-toggle', {
            is: InputToggle
        });
        document.body.appendChild(element);

        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.slds-form-element__label'
            );
            expect(label.textContent).toBe('A string label');
        });
    });

    // message-toggle-active
    it('messageToggleActive', () => {
        const element = createElement('base-input-toggle', {
            is: InputToggle
        });
        document.body.appendChild(element);

        element.messageToggleActive = 'This toggle is active';

        return Promise.resolve().then(() => {
            const message = element.shadowRoot.querySelector(
                '.slds-checkbox_on'
            );
            expect(message.textContent).toBe('This toggle is active');
        });
    });

    // message-toggle-inactive
    it('messageToggleInactive', () => {
        const element = createElement('base-input-toggle', {
            is: InputToggle
        });
        document.body.appendChild(element);

        element.messageToggleInactive = 'This toggle is inactive';

        return Promise.resolve().then(() => {
            const message = element.shadowRoot.querySelector(
                '.slds-checkbox_off'
            );
            expect(message.textContent).toBe('This toggle is inactive');
        });
    });

    // message-when-value-missing
    // Depends on required, focus(), blur() and showHelpMessageIfInvalid()
    it('messageWhenValueMissing', () => {
        const element = createElement('base-input-toggle', {
            is: InputToggle
        });
        document.body.appendChild(element);
        element.required = true;
        element.messageWhenValueMissing = 'Missing value!';

        return Promise.resolve()
            .then(() => {
                element.focus();
                element.blur();
                element.showHelpMessageIfInvalid();
            })
            .then(() => {
                const message = element.shadowRoot.querySelector(
                    '.slds-form-element__help'
                );
                expect(message.textContent).toBe('Missing value!');
            });
    });

    // name
    it('name', () => {
        const element = createElement('base-input-toggle', {
            is: InputToggle
        });
        document.body.appendChild(element);
        element.name = 'a-string-name';
        const input = element.shadowRoot.querySelector('input');

        return Promise.resolve().then(() => {
            expect(input.name).toBe('a-string-name');
        });
    });

    // read-only
    it('readOnly', () => {
        const element = createElement('base-input-toggle', {
            is: InputToggle
        });
        document.body.appendChild(element);
        element.readOnly = true;
        const input = element.shadowRoot.querySelector('input');

        return Promise.resolve().then(() => {
            expect(input.readOnly).toBeTruthy();
        });
    });

    // required
    it('required', () => {
        const element = createElement('base-input-toggle', {
            is: InputToggle
        });
        document.body.appendChild(element);
        element.required = true;

        return Promise.resolve().then(() => {
            const asterisk = element.shadowRoot.querySelector('.slds-required');
            expect(asterisk).toBeTruthy();
        });
    });

    // size
    it('size = medium', () => {
        const element = createElement('base-input-toggle', {
            is: InputToggle
        });
        document.body.appendChild(element);
        element.size = 'medium';
        const sizeClasses = ['faux_x-small', 'faux_small', 'faux_large'];
        const fauxToggle = element.shadowRoot.querySelector(
            '.slds-checkbox_faux'
        );

        return Promise.resolve().then(() => {
            expect(sizeClasses).toEqual(
                expect.not.arrayContaining(Array.from(fauxToggle.classList))
            );
        });
    });

    it('size = x-small', () => {
        const element = createElement('base-input-toggle', {
            is: InputToggle
        });
        document.body.appendChild(element);
        element.size = 'x-small';
        const sizeClasses = ['faux_small', 'faux_large'];
        const fauxToggle = element.shadowRoot.querySelector(
            '.slds-checkbox_faux'
        );

        return Promise.resolve().then(() => {
            expect(sizeClasses).toEqual(
                expect.not.arrayContaining(Array.from(fauxToggle.classList))
            );
            expect(fauxToggle.classList).toContain('faux_x-small');
        });
    });

    it('size = small', () => {
        const element = createElement('base-input-toggle', {
            is: InputToggle
        });
        document.body.appendChild(element);
        element.size = 'small';
        const sizeClasses = ['faux_x-small', 'faux_large'];
        const fauxToggle = element.shadowRoot.querySelector(
            '.slds-checkbox_faux'
        );

        return Promise.resolve().then(() => {
            expect(sizeClasses).toEqual(
                expect.not.arrayContaining(Array.from(fauxToggle.classList))
            );
            expect(fauxToggle.classList).toContain('faux_small');
        });
    });

    it('size = large', () => {
        const element = createElement('base-input-toggle', {
            is: InputToggle
        });
        document.body.appendChild(element);
        element.size = 'large';
        const sizeClasses = ['faux_x-small', 'faux_small'];
        const fauxToggle = element.shadowRoot.querySelector(
            '.slds-checkbox_faux'
        );

        return Promise.resolve().then(() => {
            expect(sizeClasses).toEqual(
                expect.not.arrayContaining(Array.from(fauxToggle.classList))
            );
            expect(fauxToggle.classList).toContain('faux_large');
        });
    });

    // value
    it('value', () => {
        const element = createElement('base-input-toggle', {
            is: InputToggle
        });
        document.body.appendChild(element);
        element.value = 'A string value';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('input');
            expect(input.value).toBe('A string value');
        });
    });

    // variant
    it('variant = standard', () => {
        const element = createElement('base-input-toggle', {
            is: InputToggle
        });
        document.body.appendChild(element);

        element.variant = 'standard';
        const label = element.shadowRoot.querySelector(
            '.slds-form-element__label'
        );
        const wrapper = element.shadowRoot.querySelector(
            '.slds-checkbox_toggle'
        );

        return Promise.resolve().then(() => {
            expect(label.classList).not.toContain('slds-assistive-text');

            expect(wrapper.classList).not.toContain(
                'slds-form-element_stacked'
            );
            expect(wrapper.classList).not.toContain('slds-grid');
        });
    });

    it('variant = label-inline', () => {
        const element = createElement('base-input-toggle', {
            is: InputToggle
        });
        document.body.appendChild(element);

        element.variant = 'label-inline';
        const label = element.shadowRoot.querySelector(
            '.slds-form-element__label'
        );
        const wrapper = element.shadowRoot.querySelector(
            '.slds-checkbox_toggle'
        );

        return Promise.resolve().then(() => {
            expect(label.classList).not.toContain('slds-assistive-text');

            expect(wrapper.classList).not.toContain(
                'slds-form-element_stacked'
            );
            expect(wrapper.classList).toContain('slds-grid');
        });
    });

    it('variant = label-stacked', () => {
        const element = createElement('base-input-toggle', {
            is: InputToggle
        });
        document.body.appendChild(element);

        element.variant = 'label-stacked';
        const label = element.shadowRoot.querySelector(
            '.slds-form-element__label'
        );
        const wrapper = element.shadowRoot.querySelector(
            '.slds-checkbox_toggle'
        );

        return Promise.resolve().then(() => {
            expect(label.classList).not.toContain('slds-assistive-text');

            expect(wrapper.classList).toContain('slds-form-element_stacked');
            expect(wrapper.classList).not.toContain('slds-grid');
        });
    });

    it('variant = label-hidden', () => {
        const element = createElement('base-input-toggle', {
            is: InputToggle
        });
        document.body.appendChild(element);

        element.variant = 'label-hidden';
        const label = element.shadowRoot.querySelector(
            '.slds-form-element__label'
        );
        const wrapper = element.shadowRoot.querySelector(
            '.slds-checkbox_toggle'
        );

        return Promise.resolve().then(() => {
            expect(label.classList).toContain('slds-assistive-text');

            expect(wrapper.classList).not.toContain(
                'slds-form-element_stacked'
            );
            expect(wrapper.classList).not.toContain('slds-grid');
        });
    });

    /* ----- METHODS ----- */

    // reportValidity
    // Depends on required
    it('reportValidity method', () => {
        const element = createElement('base-input-toggle', {
            is: InputToggle
        });
        document.body.appendChild(element);

        element.required = true;
        element.reportValidity();

        return Promise.resolve().then(() => {
            const help = element.shadowRoot.querySelector(
                '.slds-form-element__help'
            );
            expect(help).toBeTruthy();
        });
    });

    // showHelpMessageIfInvalid
    // Depends on required
    it('showHelpMessageIfInvalid method', () => {
        const element = createElement('base-input-toggle', {
            is: InputToggle
        });
        document.body.appendChild(element);

        element.required = true;
        element.showHelpMessageIfInvalid();

        return Promise.resolve().then(() => {
            const help = element.shadowRoot.querySelector(
                '.slds-form-element__help'
            );
            expect(help).toBeTruthy();
        });
    });

    /* ----- EVENTS ----- */

    // change
    it('change event', () => {
        const element = createElement('base-input-toggle', {
            is: InputToggle
        });
        document.body.appendChild(element);

        const input = element.shadowRoot.querySelector('input');
        element.addEventListener('change', (event) => {
            expect(event.detail.checked).toBeTruthy();
            expect(event.bubbles).toBeTruthy();
            expect(event.cancelable).toBeFalsy();
            expect(event.composed).toBeTruthy();
        });
        input.click();
    });

    // blur
    it('blur event', () => {
        const element = createElement('base-input-toggle', {
            is: InputToggle
        });
        document.body.appendChild(element);

        const input = element.shadowRoot.querySelector('input');
        element.addEventListener('blur', (event) => {
            expect(event.bubbles).toBeFalsy();
            expect(event.cancelable).toBeFalsy();
            expect(event.composed).toBeFalsy();
        });

        input.focus();
        input.blur();
    });

    // focus
    it('focus event', () => {
        const element = createElement('base-input-toggle', {
            is: InputToggle
        });
        document.body.appendChild(element);

        const input = element.shadowRoot.querySelector('input');
        element.addEventListener('focus', (event) => {
            expect(event.bubbles).toBeFalsy();
            expect(event.cancelable).toBeFalsy();
            expect(event.composed).toBeFalsy();
        });

        input.focus();
    });
});
