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

    describe('Attributes', () => {
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

        describe('accessKey', () => {
            it('Passed to the component', () => {
                element.accessKey = 'K';
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="input"]'
                );

                return Promise.resolve().then(() => {
                    expect(input.accessKey).toBe('K');
                });
            });
        });

        describe('ariaControls', () => {
            it('Passed to the component', () => {
                element.ariaControls = 'id-1 id-2 id-3';
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="input"]'
                );

                return Promise.resolve().then(() => {
                    expect(input.ariaControls).toBe('id-1 id-2 id-3');
                });
            });
        });

        describe('ariaDescribedBy', () => {
            it('Passed to the component', () => {
                element.ariaDescribedBy = 'id-1 id-2 id-3';
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="input"]'
                );

                return Promise.resolve().then(() => {
                    expect(input.ariaDescribedBy).toBe('id-1 id-2 id-3');
                });
            });
        });

        describe('ariaLabel', () => {
            it('Passed to the component', () => {
                element.ariaLabel = 'String label';
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="input"]'
                );

                return Promise.resolve().then(() => {
                    expect(input.ariaLabel).toBe('String label');
                });
            });
        });

        describe('ariaLabelledBy', () => {
            it('Passed to the component', () => {
                element.ariaLabelledBy = 'id-1 id-2 id-3';
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="input"]'
                );

                return Promise.resolve().then(() => {
                    expect(input.ariaLabelledBy).toBe('id-1 id-2 id-3');
                });
            });
        });

        describe('checked', () => {
            it('Passed to the component', () => {
                element.checked = true;
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="input"]'
                );

                return Promise.resolve().then(() => {
                    expect(input.checked).toBeTruthy();
                });
            });
        });

        describe('disabled', () => {
            it('Passed to the component', () => {
                element.disabled = true;
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="input"]'
                );

                return Promise.resolve().then(() => {
                    expect(input.disabled).toBeTruthy();
                });
            });
        });

        describe('fieldLevelHelp', () => {
            it('Passed to the component', () => {
                element.fieldLevelHelp = 'A string help';

                return Promise.resolve().then(() => {
                    const help = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-helptext"]'
                    );
                    expect(help).toBeTruthy();
                });
            });
        });

        describe('hideMark', () => {
            it('Passed to the component', () => {
                element.hideMark = true;

                return Promise.resolve().then(() => {
                    const fauxToggle =
                        element.shadowRoot.querySelector('.faux_hide-mark');
                    expect(fauxToggle).toBeTruthy();
                });
            });
        });

        describe('label', () => {
            it('Passed to the component', () => {
                element.label = 'A string label';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '.slds-form-element__label'
                    );
                    expect(label.textContent).toBe('A string label');
                });
            });
        });

        describe('messageToggleActive', () => {
            it('Passed to the component', () => {
                element.messageToggleActive = 'This toggle is active';

                return Promise.resolve().then(() => {
                    const message =
                        element.shadowRoot.querySelector('.slds-checkbox_on');
                    expect(message.textContent).toBe('This toggle is active');
                });
            });
        });

        describe('messageToggleInactive', () => {
            it('Passed to the component', () => {
                element.messageToggleInactive = 'This toggle is inactive';

                return Promise.resolve().then(() => {
                    const message =
                        element.shadowRoot.querySelector('.slds-checkbox_off');
                    expect(message.textContent).toBe('This toggle is inactive');
                });
            });
        });

        describe('messageWhenValueMissing', () => {
            // Depends on required, focus(), blur() and showHelpMessageIfInvalid()
            it('Passed to the component', () => {
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
        });

        describe('name', () => {
            it('Passed to the component', () => {
                element.name = 'a-string-name';
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="input"]'
                );

                return Promise.resolve().then(() => {
                    expect(input.name).toBe('a-string-name');
                });
            });
        });

        describe('readOnly', () => {
            it('Passed to the component', () => {
                element.readOnly = true;
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="input"]'
                );

                return Promise.resolve().then(() => {
                    expect(input.readOnly).toBeTruthy();
                });
            });
        });

        describe('required', () => {
            it('Passed to the component', () => {
                element.required = true;

                return Promise.resolve().then(() => {
                    const asterisk =
                        element.shadowRoot.querySelector('.slds-required');
                    expect(asterisk).toBeTruthy();
                });
            });
        });

        describe('size', () => {
            it('medium', () => {
                element.size = 'medium';
                const sizeClasses = [
                    'faux_x-small',
                    'faux_small',
                    'faux_large'
                ];
                const fauxToggle = element.shadowRoot.querySelector(
                    '.slds-checkbox_faux'
                );

                return Promise.resolve().then(() => {
                    expect(sizeClasses).toEqual(
                        expect.not.arrayContaining(
                            Array.from(fauxToggle.classList)
                        )
                    );
                });
            });

            it('x-small', () => {
                element.size = 'x-small';
                const sizeClasses = ['faux_small', 'faux_large'];
                const fauxToggle = element.shadowRoot.querySelector(
                    '.slds-checkbox_faux'
                );

                return Promise.resolve().then(() => {
                    expect(sizeClasses).toEqual(
                        expect.not.arrayContaining(
                            Array.from(fauxToggle.classList)
                        )
                    );
                    expect(fauxToggle.classList).toContain('faux_x-small');
                });
            });

            it('small', () => {
                element.size = 'small';
                const sizeClasses = ['faux_x-small', 'faux_large'];
                const fauxToggle = element.shadowRoot.querySelector(
                    '.slds-checkbox_faux'
                );

                return Promise.resolve().then(() => {
                    expect(sizeClasses).toEqual(
                        expect.not.arrayContaining(
                            Array.from(fauxToggle.classList)
                        )
                    );
                    expect(fauxToggle.classList).toContain('faux_small');
                });
            });

            it('large', () => {
                element.size = 'large';
                const sizeClasses = ['faux_x-small', 'faux_small'];
                const fauxToggle = element.shadowRoot.querySelector(
                    '.slds-checkbox_faux'
                );

                return Promise.resolve().then(() => {
                    expect(sizeClasses).toEqual(
                        expect.not.arrayContaining(
                            Array.from(fauxToggle.classList)
                        )
                    );
                    expect(fauxToggle.classList).toContain('faux_large');
                });
            });
        });
    });

    describe('value', () => {
        it('Passed to the component', () => {
            element.value = 'A string value';

            return Promise.resolve().then(() => {
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="input"]'
                );
                expect(input.value).toBe('A string value');
            });
        });
    });

    describe('variant', () => {
        it('standard', () => {
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

        it('label-inline', () => {
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

        it('label-stacked', () => {
            element.variant = 'label-stacked';
            const label = element.shadowRoot.querySelector(
                '.slds-form-element__label'
            );
            const wrapper = element.shadowRoot.querySelector(
                '.slds-checkbox_toggle'
            );

            return Promise.resolve().then(() => {
                expect(label.classList).not.toContain('slds-assistive-text');

                expect(wrapper.classList).toContain(
                    'slds-form-element_stacked'
                );
                expect(wrapper.classList).not.toContain('slds-grid');
            });
        });

        it('label-hidden', () => {
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
    });

    describe('Methods', () => {
        describe('checkValidity', () => {
            it('Passed to the component', () => {
                const spy = jest.spyOn(element, 'checkValidity');

                element.checkValidity();
                expect(spy).toHaveBeenCalled();
            });
        });
        describe('setCustomValidity', () => {
            it('Passed to the component', () => {
                const spy = jest.spyOn(element, 'setCustomValidity');

                element.setCustomValidity('Something');
                expect(spy).toHaveBeenCalled();
            });
        });

        describe('reportValidity', () => {
            it('Passed to the component', () => {
                element.required = true;
                element.reportValidity();

                return Promise.resolve().then(() => {
                    const help = element.shadowRoot.querySelector(
                        '.slds-form-element__help'
                    );
                    expect(help).toBeTruthy();
                });
            });
        });

        describe('showHelpMessageIfInvalid', () => {
            it('Passed to the component', () => {
                element.required = true;
                element.showHelpMessageIfInvalid();

                return Promise.resolve().then(() => {
                    const help = element.shadowRoot.querySelector(
                        '.slds-form-element__help'
                    );
                    expect(help).toBeTruthy();
                });
            });
        });
    });

    describe('Events', () => {
        describe('change', () => {
            it('Passed to the component', () => {
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
        });

        describe('blur', () => {
            it('Passed to the component', () => {
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
        });

        describe('focus', () => {
            it('Passed to the component', () => {
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
    });
});
