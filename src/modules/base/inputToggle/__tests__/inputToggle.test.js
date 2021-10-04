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

let element;
describe('InputToggle', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-input-toggle', {
            is: InputToggle
        });
        document.body.appendChild(element);
    });

    it('Default attributes', () => {
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
        element.accessKey = 'K';
        const input = element.shadowRoot.querySelector(
            '[data-element-id="input"]'
        );

        return Promise.resolve().then(() => {
            expect(input.accessKey).toBe('K');
        });
    });

    // aria-controls
    it('ariaControls', () => {
        element.ariaControls = 'id-1 id-2 id-3';
        const input = element.shadowRoot.querySelector(
            '[data-element-id="input"]'
        );

        return Promise.resolve().then(() => {
            expect(input.ariaControls).toBe('id-1 id-2 id-3');
        });
    });

    // aria-described-by
    it('ariaDescribedBy', () => {
        element.ariaDescribedBy = 'id-1 id-2 id-3';
        const input = element.shadowRoot.querySelector(
            '[data-element-id="input"]'
        );

        return Promise.resolve().then(() => {
            expect(input.ariaDescribedBy).toBe('id-1 id-2 id-3');
        });
    });

    // aria-label
    it('ariaLabel', () => {
        element.ariaLabel = 'String label';
        const input = element.shadowRoot.querySelector(
            '[data-element-id="input"]'
        );

        return Promise.resolve().then(() => {
            expect(input.ariaLabel).toBe('String label');
        });
    });

    // aria-labelled-by
    it('ariaLabelledBy', () => {
        element.ariaLabelledBy = 'id-1 id-2 id-3';
        const input = element.shadowRoot.querySelector(
            '[data-element-id="input"]'
        );

        return Promise.resolve().then(() => {
            expect(input.ariaLabelledBy).toBe('id-1 id-2 id-3');
        });
    });

    // checked
    it('checked', () => {
        element.checked = true;
        const input = element.shadowRoot.querySelector(
            '[data-element-id="input"]'
        );

        return Promise.resolve().then(() => {
            expect(input.checked).toBeTruthy();
        });
    });

    // disabled
    it('disabled', () => {
        element.disabled = true;
        const input = element.shadowRoot.querySelector(
            '[data-element-id="input"]'
        );

        return Promise.resolve().then(() => {
            expect(input.disabled).toBeTruthy();
        });
    });

    // field-level-help
    it('fieldLevelHelp', () => {
        element.fieldLevelHelp = 'A string help';

        return Promise.resolve().then(() => {
            const help = element.shadowRoot.querySelector(
                '[data-element-id="lightning-helptext"]'
            );
            expect(help).toBeTruthy();
        });
    });

    // hide-mark
    it('hideMark', () => {
        element.hideMark = true;

        return Promise.resolve().then(() => {
            const fauxToggle =
                element.shadowRoot.querySelector('.faux_hide-mark');
            expect(fauxToggle).toBeTruthy();
        });
    });

    // label
    it('label', () => {
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
        element.messageToggleActive = 'This toggle is active';

        return Promise.resolve().then(() => {
            const message =
                element.shadowRoot.querySelector('.slds-checkbox_on');
            expect(message.textContent).toBe('This toggle is active');
        });
    });

    // message-toggle-inactive
    it('messageToggleInactive', () => {
        element.messageToggleInactive = 'This toggle is inactive';

        return Promise.resolve().then(() => {
            const message =
                element.shadowRoot.querySelector('.slds-checkbox_off');
            expect(message.textContent).toBe('This toggle is inactive');
        });
    });

    // message-when-value-missing
    // Depends on required, focus(), blur() and showHelpMessageIfInvalid()
    it('messageWhenValueMissing', () => {
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
        element.name = 'a-string-name';
        const input = element.shadowRoot.querySelector(
            '[data-element-id="input"]'
        );

        return Promise.resolve().then(() => {
            expect(input.name).toBe('a-string-name');
        });
    });

    // read-only
    it('readOnly', () => {
        element.readOnly = true;
        const input = element.shadowRoot.querySelector(
            '[data-element-id="input"]'
        );

        return Promise.resolve().then(() => {
            expect(input.readOnly).toBeTruthy();
        });
    });

    // required
    it('required', () => {
        element.required = true;

        return Promise.resolve().then(() => {
            const asterisk = element.shadowRoot.querySelector('.slds-required');
            expect(asterisk).toBeTruthy();
        });
    });

    // size
    it('size = medium', () => {
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
        element.value = 'A string value';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="input"]'
            );
            expect(input.value).toBe('A string value');
        });
    });

    // variant
    it('variant = standard', () => {
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
    // checkValidity
    it('checkValidity method', () => {
        const spy = jest.spyOn(element, 'checkValidity');

        element.checkValidity();
        expect(spy).toHaveBeenCalled();
    });

    // setCustomValidity
    it('setCustomValidity method', () => {
        const spy = jest.spyOn(element, 'setCustomValidity');

        element.setCustomValidity('Something');
        expect(spy).toHaveBeenCalled();
    });

    // reportValidity
    // Depends on required
    it('reportValidity method', () => {
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
        const input = element.shadowRoot.querySelector(
            '[data-element-id="input"]'
        );
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
        const input = element.shadowRoot.querySelector(
            '[data-element-id="input"]'
        );
        const handler = jest.fn();

        input.addEventListener('blur', handler);

        return Promise.resolve()
            .then(() => {
                input.dispatchEvent(new CustomEvent('blur', {}));
            })
            .then(() => {
                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            });
    });

    // focus
    it('focus event', () => {
        const input = element.shadowRoot.querySelector(
            '[data-element-id="input"]'
        );
        const handler = jest.fn();

        input.addEventListener('focus', handler);

        return Promise.resolve()
            .then(() => {
                input.dispatchEvent(new CustomEvent('focus', {}));
            })
            .then(() => {
                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            });
    });
});
