import { createElement } from 'lwc';
import InputData from 'c/inputData';

let element;
describe('InputData', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('avonni-input-data', {
            is: InputData
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.label).toBeUndefined();
            expect(element.name).toBeUndefined();
            expect(element.placeholder).toBeUndefined();
            expect(element.disabled).toBeFalsy();
            expect(element.readOnly).toBeFalsy();
            expect(element.required).toBeFalsy();
            expect(element.type).toBe('text');
            expect(element.value).toBe('');
            expect(element.latitude).toBeUndefined();
            expect(element.longitude).toBeUndefined();
        });

        describe('Checked', () => {
            it('Passed to the component', () => {
                element.label = 'Base input';
                element.type = 'checkbox';
                element.checked = true;

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-base"]'
                    );
                    expect(input.checked).toBeTruthy();
                });
            });
        });

        describe('Disabled', () => {
            it('Passed to the component', () => {
                element.label = 'Base input';
                element.disabled = true;

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-base"]'
                    );
                    expect(input.disabled).toBeTruthy();
                });
            });
        });

        describe('Label', () => {
            it('No label attribute', () => {
                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-base"]'
                    );
                    expect(input.label).toBe('Data input');
                    expect(input.variant).toBe('label-hidden');
                });
            });

            it('Passed to the component', () => {
                element.label = 'Base input';

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-base"]'
                    );
                    expect(input.label).toBe('Base input');
                });
            });
        });

        describe('Latitude and longitude', () => {
            it('Corrected negative location attributes', () => {
                element.label = 'Base input';
                element.type = 'location';
                element.latitude = -100;
                element.longitude = -200;

                return Promise.resolve().then(() => {
                    const locationInput = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-location"]'
                    );
                    expect(locationInput.latitude).toBe(-90);
                    expect(locationInput.longitude).toBe(-180);
                });
            });

            it('Corrected positive location attributes', () => {
                element.label = 'Base input';
                element.type = 'location';
                element.latitude = 100;
                element.longitude = 200;

                return Promise.resolve().then(() => {
                    const locationInput = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-location"]'
                    );
                    expect(locationInput.latitude).toBe(90);
                    expect(locationInput.longitude).toBe(180);
                });
            });

            it('Passed to the component', () => {
                element.label = 'Base input';
                element.type = 'location';
                element.latitude = 80;
                element.longitude = -50;

                return Promise.resolve().then(() => {
                    const locationInput = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-location"]'
                    );
                    expect(locationInput.latitude).toBe(80);
                    expect(locationInput.longitude).toBe(-50);
                });
            });

            it('Undefined location', () => {
                element.label = 'Base input';
                element.type = 'location';
                element.latitude = undefined;
                element.longitude = undefined;

                return Promise.resolve().then(() => {
                    const locationInput = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-location"]'
                    );
                    expect(locationInput.latitude).toBeUndefined();
                    expect(locationInput.longitude).toBeUndefined();
                });
            });

            it('Valid location as (0, 0)', () => {
                element.label = 'Base input';
                element.type = 'location';
                element.latitude = 0;
                element.longitude = 0;

                return Promise.resolve().then(() => {
                    const locationInput = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-location"]'
                    );
                    expect(locationInput.latitude).toBe(0);
                    expect(locationInput.longitude).toBe(0);
                });
            });
        });

        describe('Multi-select picklist', () => {
            it('Options', () => {
                element.label = 'Base input';
                element.type = 'multipicklist';
                const OPTIONS = [
                    { label: 'Test 1', value: 'test1' },
                    { label: 'Test 2', value: 'test3' }
                ];
                element.options = OPTIONS;

                return Promise.resolve().then(() => {
                    const multiPicklistInput = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-multi-picklist"]'
                    );
                    expect(multiPicklistInput.options).toEqual(OPTIONS);
                });
            });
        });

        describe('Multi-select picklist max number lines', () => {
            it('Passed to the component', () => {
                element.label = 'Base input';
                element.type = 'multipicklist';
                element.maxLines = 8;

                return Promise.resolve().then(() => {
                    const multiPicklistInput = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-multi-picklist"]'
                    );
                    expect(multiPicklistInput.size).toBe(8);
                });
            });
        });

        describe('Picklist', () => {
            it('Options', () => {
                element.label = 'Base input';
                element.type = 'picklist';
                const OPTIONS = [
                    { label: 'Test 1', value: 'test1' },
                    { label: 'Test 2', value: 'test3' }
                ];
                element.options = OPTIONS;

                return Promise.resolve().then(() => {
                    const picklistInput = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-picklist"]'
                    );
                    expect(picklistInput.options).toEqual(OPTIONS);
                });
            });
        });

        describe('Read-only', () => {
            it('Passed to the component', () => {
                element.label = 'Base input';
                element.readOnly = true;

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-base"]'
                    );
                    expect(input.readOnly).toBeTruthy();
                });
            });
        });

        describe('Required', () => {
            it('Passed to the component', () => {
                element.label = 'Base input';
                element.required = true;

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-base"]'
                    );
                    expect(input.required).toBeTruthy();
                });
            });
        });

        describe('Type', () => {
            it('Boolean', () => {
                element.label = 'Label';
                element.type = 'boolean';

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-base"]'
                    );
                    expect(input.type).toBe('checkbox');
                });
            });

            it('Currency', () => {
                element.label = 'Label';
                element.type = 'currency';

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-base"]'
                    );
                    expect(input.type).toBe('number');
                    expect(input.formatter).toBe('currency');
                });
            });

            it('Date', () => {
                element.label = 'Label';
                element.type = 'date';

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-base"]'
                    );
                    expect(input.type).toBe('date');
                });
            });

            it('Email', () => {
                element.label = 'Label';
                element.type = 'email';

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-base"]'
                    );
                    expect(input.type).toBe('email');
                });
            });

            it('Location', () => {
                element.label = 'Label';
                element.type = 'location';

                return Promise.resolve().then(() => {
                    const baseInput = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-base"]'
                    );
                    const locationInput = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-location"]'
                    );
                    expect(baseInput).toBeFalsy();
                    expect(locationInput).toBeTruthy();
                });
            });

            it('Multi-Select Picklist', () => {
                element.label = 'Label';
                element.type = 'multipicklist';

                return Promise.resolve().then(() => {
                    const baseInput = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-base"]'
                    );
                    const multiPicklistInput = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-multi-picklist"]'
                    );
                    expect(baseInput).toBeFalsy();
                    expect(multiPicklistInput).toBeTruthy();
                });
            });

            it('Number', () => {
                element.label = 'Label';
                element.type = 'number';

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-base"]'
                    );
                    expect(input.type).toBe('number');
                    expect(input.formatter).toBe('decimal');
                });
            });

            it('Percent', () => {
                element.label = 'Label';
                element.type = 'percent';

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-base"]'
                    );
                    expect(input.type).toBe('number');
                    expect(input.formatter).toBe('percent');
                });
            });

            it('Phone', () => {
                element.label = 'Label';
                element.type = 'phone';

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-phone"]'
                    );
                    expect(input.type).toBe('tel');
                });
            });

            it('Phone with default value to format', () => {
                element.type = 'phone';
                element.label = 'Label';
                element.value = '1234567890';
                document.body.appendChild(element);

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-phone"]'
                    );
                    expect(input.value).toBe('123-456-7890');
                });
            });

            it('Picklist', () => {
                element.label = 'Label';
                element.type = 'picklist';

                return Promise.resolve().then(() => {
                    const baseInput = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-base"]'
                    );
                    const picklistInput = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-picklist"]'
                    );
                    expect(baseInput).toBeFalsy();
                    expect(picklistInput).toBeTruthy();
                });
            });

            it('Text', () => {
                element.label = 'Label';
                element.type = 'text';

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-base"]'
                    );
                    expect(input.type).toBe('text');
                });
            });

            it('URL', () => {
                element.label = 'Label';
                element.type = 'url';

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-base"]'
                    );
                    expect(input.type).toBe('url');
                });
            });
        });

        describe('Value', () => {
            it('Passed to the component', () => {
                element.label = 'Base input';
                element.value = 'Default text';

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-base"]'
                    );
                    expect(input.value).toBe('Default text');
                });
            });

            it('Undefined value', () => {
                element.label = 'Base input';
                element.value = undefined;

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-base"]'
                    );
                    expect(input.value).toBe('');
                });
            });
        });

        describe('Variant', () => {
            it('Passed to the component', () => {
                element.label = 'Base input';
                element.variant = 'label-inline';

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-base"]'
                    );
                    expect(input.variant).toBe('label-inline');
                });
            });
        });
    });

    describe('Behavior on input change', () => {
        it('Formatted valid phone input', () => {
            element.label = 'Label';
            element.type = 'phone';

            return Promise.resolve()
                .then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-phone"]'
                    );
                    input.value = '4501234567';
                    input.dispatchEvent(new CustomEvent('change'));
                })
                .then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-phone"]'
                    );
                    expect(input.value).toBe('450-123-4567');
                });
        });

        it('Formatted invalid phone input with 7 digits', () => {
            element.label = 'Label';
            element.type = 'phone';

            return Promise.resolve()
                .then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-phone"]'
                    );
                    input.value = '4501234';
                    input.dispatchEvent(new CustomEvent('change'));
                })
                .then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-phone"]'
                    );
                    expect(input.value).toBe('450-123-4');
                });
        });

        it('Formatted invalid phone input with 5 digits', () => {
            element.label = 'Label';
            element.type = 'phone';

            return Promise.resolve()
                .then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-phone"]'
                    );
                    input.value = '45012';
                    input.dispatchEvent(new CustomEvent('change'));
                })
                .then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-phone"]'
                    );
                    expect(input.value).toBe('450-12');
                });
        });

        it('Formatted invalid phone input without with 1 digit', () => {
            element.label = 'Label';
            element.type = 'phone';

            return Promise.resolve()
                .then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-phone"]'
                    );
                    input.value = '4';
                    input.dispatchEvent(new CustomEvent('change'));
                })
                .then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-phone"]'
                    );
                    expect(input.value).toBe('4');
                });
        });

        it('Location input change for adding values', () => {
            element.label = 'Label';
            element.type = 'location';

            return Promise.resolve()
                .then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-location"]'
                    );
                    input.latitude = 10;
                    input.longitude = -10;
                    input.dispatchEvent(new CustomEvent('change'));
                })
                .then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-location"]'
                    );
                    expect(input.latitude).toBe(10);
                    expect(input.longitude).toBe(-10);
                });
        });

        it('Location input change for removing values', () => {
            element.label = 'Label';
            element.type = 'location';
            element.latitude = 80;
            element.longitude = -50;

            return Promise.resolve()
                .then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-location"]'
                    );
                    input.latitude = undefined;
                    input.longitude = undefined;
                    input.dispatchEvent(new CustomEvent('change'));
                })
                .then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-location"]'
                    );
                    expect(input.latitude).toBeUndefined();
                    expect(input.longitude).toBeUndefined();
                });
        });

        it('Text input change for removing value', () => {
            element.label = 'Label';

            return Promise.resolve()
                .then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-base"]'
                    );
                    input.value = '';
                    input.dispatchEvent(new CustomEvent('change'));
                })
                .then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-base"]'
                    );
                    expect(input.value).toBe('');
                });
        });
    });

    describe('Handling lightning-input events and their transfer (for coverage purposes)', () => {
        it('Transfer commit event', () => {
            element.label = 'Label';

            return Promise.resolve()
                .then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-base"]'
                    );
                    input.value = 'Simple text';
                    input.dispatchEvent(new CustomEvent('commit'));
                })
                .then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-base"]'
                    );
                    expect(input.value).toBe('Simple text');
                });
        });

        it('Transfer blur event', () => {
            element.label = 'Label';

            const handler = jest.fn();

            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input-base"]'
            );

            input.addEventListener('blur', handler);

            return Promise.resolve()
                .then(() => {
                    input.value = 'Simple text';
                    input.dispatchEvent(new CustomEvent('blur'));
                })
                .then(() => {
                    expect(input.value).toBe('Simple text');
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                });
        });

        it('Transfer focus event', () => {
            element.label = 'Label';
            const handler = jest.fn();

            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input-base"]'
            );

            input.addEventListener('focus', handler);

            return Promise.resolve()
                .then(() => {
                    input.value = 'Simple text';
                    input.dispatchEvent(new CustomEvent('focus'));
                })
                .then(() => {
                    expect(input.value).toBe('Simple text');
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                });
        });

        /* ----- PUBLIC METHODS ----- */

        it('Transfer focus and blur', () => {
            element.label = 'Label';

            return Promise.resolve()
                .then(() => {
                    element.focus();
                    element.blur();
                })
                .then(() => {
                    expect(element.shadowRoot.activeElement).toBeNull();
                });
        });

        it('Transfer error messages on basic input', () => {
            element.label = 'Label';

            return Promise.resolve()
                .then(() => {
                    element.setCustomValidity('Error');
                    element.setCustomValidityForField(
                        'Latitude error',
                        'latitude'
                    ); // Will be ignored
                })
                .then(() => {
                    expect(element.showHelpMessageIfInvalid()).toBeFalsy();
                });
        });

        it('Transfer error messages on location input', () => {
            element.label = 'Label';
            element.type = 'location';

            return Promise.resolve()
                .then(() => {
                    element.setCustomValidityForField(
                        'Latitude error',
                        'latitude'
                    );
                    element.setCustomValidity('Error'); // Will be ignored
                })
                .then(() => {
                    expect(element.showHelpMessageIfInvalid()).toBeFalsy();
                });
        });
    });
});
