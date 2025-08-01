import { createElement } from 'lwc';
import PrimitiveSelect from 'c/primitiveSelect';

const OPTIONS = [
    {
        label: 'Option 1',
        value: 'option-1'
    },
    {
        label: 'Option 2',
        value: 'option-2'
    },
    {
        label: 'Option 3',
        value: 'option-3'
    }
];

let element;
describe('PrimitiveSelect', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-primitive-select', {
            is: PrimitiveSelect
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.accessKey).toBeUndefined();
            expect(element.disabled).toBeFalsy();
            expect(element.fieldLevelHelp).toBeUndefined();
            expect(element.label).toBeUndefined();
            expect(element.messageWhenValueMissing).toBeUndefined();
            expect(element.multiple).toBeFalsy();
            expect(element.name).toBeUndefined();
            expect(element.options).toMatchObject([]);
            expect(element.required).toBeFalsy();
            expect(element.size).toBeNull();
            expect(element.tabIndex).toBeUndefined();
            expect(element.validity.valid).toBeTruthy();
            expect(element.value).toBeUndefined();
            expect(element.variant).toBe('standard');
        });

        describe('accessKey', () => {
            it('Passed to the component', () => {
                element.accessKey = 'K';

                return Promise.resolve().then(() => {
                    const select = element.shadowRoot.querySelector(
                        '[data-element-id="select"]'
                    );
                    expect(select.accessKey).toBe('K');
                });
            });
        });

        describe('disabled', () => {
            it('Passed to the component as true', () => {
                element.disabled = true;

                return Promise.resolve().then(() => {
                    const select = element.shadowRoot.querySelector(
                        '[data-element-id="select"]'
                    );
                    expect(select.disabled).toBeTruthy();
                });
            });

            it('Passed to the component as false', () => {
                element.disabled = false;

                return Promise.resolve().then(() => {
                    const select = element.shadowRoot.querySelector(
                        '[data-element-id="select"]'
                    );
                    expect(select.disabled).toBeFalsy();
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
                    expect(help.content).toBe('A string help');
                });
            });
        });

        describe('label', () => {
            it('Passed to the component', () => {
                element.label = 'A string label';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '[data-element-id="label"]'
                    );
                    expect(label.textContent).toBe('A string label');
                });
            });
        });

        describe('messageWhenValueMissing', () => {
            it('Passed to the component', () => {
                element.messageWhenValueMissing = 'A string message';
                element.required = true;
                element.reportValidity();

                return Promise.resolve().then(() => {
                    const message = element.shadowRoot.querySelector(
                        '[data-help-message]'
                    );
                    expect(message.textContent).toBe('A string message');
                });
            });
        });

        describe('multiple', () => {
            it('Passed to the component as true', () => {
                element.multiple = true;

                return Promise.resolve().then(() => {
                    const select = element.shadowRoot.querySelector(
                        '[data-element-id="select"]'
                    );
                    expect(select.multiple).toBeTruthy();
                });
            });

            it('Passed to the component as false', () => {
                element.multiple = false;

                return Promise.resolve().then(() => {
                    const select = element.shadowRoot.querySelector(
                        '[data-element-id="select"]'
                    );
                    expect(select.multiple).toBeFalsy();
                });
            });
        });

        describe('name', () => {
            it('Passed to the component', () => {
                element.name = 'a-string-name';

                return Promise.resolve().then(() => {
                    const select = element.shadowRoot.querySelector(
                        '[data-element-id="select"]'
                    );
                    expect(select.name).toBe('a-string-name');
                });
            });
        });

        describe('options', () => {
            it('Passed to the component', () => {
                element.options = OPTIONS;

                return Promise.resolve().then(() => {
                    const options = element.shadowRoot.querySelectorAll(
                        '[data-element-id="option"]'
                    );

                    expect(options).toHaveLength(3);
                    options.forEach((option, index) => {
                        expect(option.value).toBe(OPTIONS[index].value);
                        expect(option.textContent).toBe(OPTIONS[index].label);
                    });
                });
            });
        });

        describe('required', () => {
            it('Passed to the component as true', () => {
                element.required = true;

                return Promise.resolve().then(() => {
                    const abbr = element.shadowRoot.querySelector(
                        '[data-element-id="abbr"]'
                    );

                    expect(abbr).toBeTruthy();
                });
            });

            it('Passed to the component as false', () => {
                element.required = false;

                return Promise.resolve().then(() => {
                    const abbr = element.shadowRoot.querySelector(
                        '[data-element-id="abbr"]'
                    );

                    expect(abbr).toBeFalsy();
                });
            });
        });

        describe('size', () => {
            it('Passed to the component as unset with multiple', () => {
                element.multiple = true;

                return Promise.resolve().then(() => {
                    const select = element.shadowRoot.querySelector(
                        '[data-element-id="select"]'
                    );

                    expect(element.size).toBe('4');
                    expect(select.size).toBe(4);
                });
            });

            it('Passed to the component as set with multiple', () => {
                element.multiple = true;
                element.size = '6';

                return Promise.resolve().then(() => {
                    const select = element.shadowRoot.querySelector(
                        '[data-element-id="select"]'
                    );

                    expect(element.size).toBe('6');
                    expect(select.size).toBe(6);
                });
            });
        });

        describe('tabIndex', () => {
            it('Passed to the component', () => {
                element.tabIndex = -1;

                return Promise.resolve().then(() => {
                    const select = element.shadowRoot.querySelector(
                        '[data-element-id="select"]'
                    );

                    expect(select.tabIndex).toBe(-1);
                });
            });
        });

        describe('validity', () => {
            it('Depends on disabled, required and value', () => {
                element.disabled = true;
                element.required = true;

                return Promise.resolve().then(() => {
                    expect(element.validity.valid).toBeTruthy();
                });
            });

            it('validity, with required = true and disabled = false', () => {
                element.disabled = false;
                element.required = true;

                return Promise.resolve().then(() => {
                    expect(element.validity.valid).toBeFalsy();
                });
            });

            it('validity, with required = true, disabled = true, and a value', () => {
                element.disabled = false;
                element.required = true;
                element.options = OPTIONS;
                element.value = 'option-1';

                return Promise.resolve().then(() => {
                    expect(element.validity.valid).toBeTruthy();
                });
            });
        });

        describe('value', () => {
            it('Passed to the component', () => {
                element.options = OPTIONS;
                element.value = 'option-1';

                return Promise.resolve().then(() => {
                    const select = element.shadowRoot.querySelector(
                        '[data-element-id="select"]'
                    );
                    expect(select.value).toBe('option-1');
                });
            });
        });

        describe('variant', () => {
            it('Passed to the component as standard', () => {
                element.variant = 'standard';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '[data-element-id="label"]'
                    );

                    expect(element.classList).not.toContain(
                        'slds-form-element_stacked'
                    );
                    expect(element.classList).not.toContain(
                        'slds-form-element_horizontal'
                    );
                    expect(label.classList).not.toContain(
                        'slds-assistive-text'
                    );
                });
            });

            it('Passed to the component as label-hidden', () => {
                element.variant = 'label-hidden';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '[data-element-id="label"]'
                    );

                    expect(element.classList).not.toContain(
                        'slds-form-element_stacked'
                    );
                    expect(element.classList).not.toContain(
                        'slds-form-element_horizontal'
                    );
                    expect(label.classList).toContain('slds-assistive-text');
                });
            });

            it('Passed to the component as label-stacked', () => {
                element.variant = 'label-stacked';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '[data-element-id="label"]'
                    );

                    expect(element.classList).toContain(
                        'slds-form-element_stacked'
                    );
                    expect(element.classList).not.toContain(
                        'slds-form-element_horizontal'
                    );
                    expect(label.classList).not.toContain(
                        'slds-assistive-text'
                    );
                });
            });

            it('Passed to the component as label-inline', () => {
                element.variant = 'label-inline';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '[data-element-id="label"]'
                    );

                    expect(element.classList).not.toContain(
                        'slds-form-element_stacked'
                    );
                    expect(element.classList).toContain(
                        'slds-form-element_horizontal'
                    );
                    expect(label.classList).not.toContain(
                        'slds-assistive-text'
                    );
                });
            });
        });
    });

    describe('Events', () => {
        describe('blur', () => {
            it('blur event', () => {
                const handler = jest.fn();
                element.addEventListener('blur', handler);

                return Promise.resolve().then(() => {
                    const select = element.shadowRoot.querySelector('select');
                    select.dispatchEvent(new CustomEvent('blur'));

                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                });
            });
        });

        describe('change', () => {
            it('change event', () => {
                const handler = jest.fn();
                element.addEventListener('change', handler);

                return Promise.resolve().then(() => {
                    const select = element.shadowRoot.querySelector('select');
                    select.dispatchEvent(new CustomEvent('change'));

                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail).toMatchObject({
                        value: ''
                    });
                    expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
                    expect(handler.mock.calls[0][0].composed).toBeTruthy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                });
            });
        });

        describe('focus', () => {
            it('focus event', () => {
                const handler = jest.fn();
                element.addEventListener('focus', handler);

                return Promise.resolve().then(() => {
                    const select = element.shadowRoot.querySelector('select');
                    select.dispatchEvent(new CustomEvent('focus'));

                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                });
            });
        });
    });
});
