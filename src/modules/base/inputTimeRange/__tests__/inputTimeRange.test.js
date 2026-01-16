import { createElement } from '@lwc/engine-dom';
import InputTimeRange from 'avonni/inputTimeRange';

let element;
describe('Bc Input Time Range', () => {
    beforeEach(() => {
        element = createElement('base-input-time-range', {
            is: InputTimeRange
        });
        document.body.appendChild(element);
        jest.useFakeTimers();
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) =>
            Promise.resolve().then(() => cb())
        );
    });

    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        jest.clearAllTimers();
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.disabled).toBeFalsy();
            expect(element.endTime).toBeUndefined();
            expect(element.fieldLevelHelp).toBeUndefined();
            expect(element.label).toBeUndefined();
            expect(element.labelEndTime).toBeUndefined();
            expect(element.labelStartTime).toBeUndefined();
            expect(element.readOnly).toBeFalsy();
            expect(element.required).toBeFalsy();
            expect(element.startTime).toBeUndefined();
            expect(element.timeStyle).toBe('short');
            expect(element.variant).toBe('standard');
        });

        it('Disabled', () => {
            element.disabled = true;

            return Promise.resolve().then(() => {
                const startInput = element.shadowRoot.querySelector(
                    '[data-element-id="input-start-time"]'
                );
                const endInput = element.shadowRoot.querySelector(
                    '[data-element-id="input-end-time"]'
                );
                expect(startInput.disabled).toBeTruthy();
                expect(endInput.disabled).toBeTruthy();
            });
        });

        describe('End Time', () => {
            it('HH:MM:SS format', () => {
                element.endTime = '23:00:00';

                return Promise.resolve().then(() => {
                    const endInput = element.shadowRoot.querySelector(
                        '[data-element-id="input-end-time"]'
                    );
                    expect(endInput.value).toBe('23:00:00');
                });
            });

            it('HH:MM AM/PM format', () => {
                element.endTime = '11:00 PM';

                return Promise.resolve().then(() => {
                    const endInput = element.shadowRoot.querySelector(
                        '[data-element-id="input-end-time"]'
                    );
                    expect(endInput.value).toBe('23:00:00');
                });
            });

            it('HH:MM format', () => {
                element.endTime = '23:00';

                return Promise.resolve().then(() => {
                    const endInput = element.shadowRoot.querySelector(
                        '[data-element-id="input-end-time"]'
                    );
                    expect(endInput.value).toBe('23:00:00');
                });
            });

            it('Invalid format', () => {
                element.endTime = 'abc';

                return Promise.resolve().then(() => {
                    const endInput = element.shadowRoot.querySelector(
                        '[data-element-id="input-end-time"]'
                    );
                    expect(endInput.value).toBeNull();
                });
            });
        });

        it('Field Level Help', () => {
            element.fieldLevelHelp = 'This is a field level help';

            return Promise.resolve().then(() => {
                const helpText = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-helptext"]'
                );
                expect(helpText).toBeTruthy();
                expect(helpText.content).toBe('This is a field level help');
            });
        });

        it('Label', () => {
            element.label = 'This is a label text';

            return Promise.resolve().then(() => {
                const label = element.shadowRoot.querySelector(
                    '[data-element-id="time-range-label"]'
                );
                expect(label.textContent).toBe('This is a label text');
            });
        });

        it('Start and End Time Labels', () => {
            element.labelStartTime = 'Start Time';
            element.labelEndTime = 'End Time';

            return Promise.resolve().then(() => {
                const labelStrings = element.shadowRoot.querySelectorAll(
                    '[data-element-id="time-range-labels"]'
                );
                expect(labelStrings).toHaveLength(2);
                expect(labelStrings[0].textContent).toBe('Start Time');
                expect(labelStrings[1].textContent).toBe('End Time');
            });
        });

        it('Read Only', () => {
            element.readOnly = true;
            element.startTime = '12:00 PM';
            element.endTime = '1:00 PM';

            return Promise.resolve().then(() => {
                const formattedTimes = element.shadowRoot.querySelectorAll(
                    '[data-element-id="lightning-formatted-time"]'
                );
                expect(formattedTimes).toHaveLength(2);
                expect(formattedTimes[0].value).toBe('12:00:00');
                expect(formattedTimes[1].value).toBe('13:00:00');
            });
        });

        it('Required', () => {
            element.required = true;

            return Promise.resolve().then(() => {
                const required = element.shadowRoot.querySelector(
                    '[data-element-id="abbr"]'
                );
                expect(required).toBeTruthy();
                expect(required.textContent).toBe('*');
            });
        });

        describe('Start Time', () => {
            it('HH:MM:SS format', () => {
                element.startTime = '23:00:00';

                return Promise.resolve().then(() => {
                    const startInput = element.shadowRoot.querySelector(
                        '[data-element-id="input-start-time"]'
                    );
                    expect(startInput.value).toBe('23:00:00');
                });
            });

            it('HH:MM AM/PM format', () => {
                element.startTime = '11:00 PM';

                return Promise.resolve().then(() => {
                    const startInput = element.shadowRoot.querySelector(
                        '[data-element-id="input-start-time"]'
                    );
                    expect(startInput.value).toBe('23:00:00');
                });
            });

            it('HH:MM format', () => {
                element.startTime = '23:00';

                return Promise.resolve().then(() => {
                    const startInput = element.shadowRoot.querySelector(
                        '[data-element-id="input-start-time"]'
                    );
                    expect(startInput.value).toBe('23:00:00');
                });
            });

            it('Invalid format', () => {
                element.startTime = 'abc';

                return Promise.resolve().then(() => {
                    const startInput = element.shadowRoot.querySelector(
                        '[data-element-id="input-start-time"]'
                    );
                    expect(startInput.value).toBeNull();
                });
            });
        });

        describe('Time Style', () => {
            it('Valid time style', () => {
                element.timeStyle = 'long';

                return Promise.resolve().then(() => {
                    const startInput = element.shadowRoot.querySelector(
                        '[data-element-id="input-start-time"]'
                    );
                    const endInput = element.shadowRoot.querySelector(
                        '[data-element-id="input-end-time"]'
                    );
                    expect(startInput.timeStyle).toBe('long');
                    expect(endInput.timeStyle).toBe('long');
                });
            });

            it('Invalid time style', () => {
                element.timeStyle = 'abc';

                return Promise.resolve().then(() => {
                    const startInput = element.shadowRoot.querySelector(
                        '[data-element-id="input-start-time"]'
                    );
                    const endInput = element.shadowRoot.querySelector(
                        '[data-element-id="input-end-time"]'
                    );
                    expect(startInput.timeStyle).toBe('short');
                    expect(endInput.timeStyle).toBe('short');
                });
            });
        });

        describe('Variant', () => {
            it('Standard', () => {
                element.label = 'This is a label text';
                element.variant = 'standard';

                return Promise.resolve().then(() => {
                    const labelContainer = element.shadowRoot.querySelector(
                        '[data-element-id="time-range-label-container"]'
                    );
                    const label = element.shadowRoot.querySelector(
                        '[data-element-id="time-range-label"]'
                    );
                    expect(labelContainer).toBeTruthy();
                    expect(labelContainer.classList).not.toContain(
                        'slds-assistive-text'
                    );
                    expect(label.textContent).toBe('This is a label text');
                });
            });

            it('Label Hidden', () => {
                element.label = 'This is a label text';
                element.variant = 'label-hidden';

                return Promise.resolve().then(() => {
                    const labelContainer = element.shadowRoot.querySelector(
                        '[data-element-id="time-range-label-container"]'
                    );
                    const label = element.shadowRoot.querySelector(
                        '[data-element-id="time-range-label"]'
                    );
                    expect(labelContainer).toBeTruthy();
                    expect(labelContainer.classList).toContain(
                        'slds-assistive-text'
                    );
                    expect(label.textContent).toBe('This is a label text');
                });
            });
        });

        it('Value', () => {
            element.startTime = '12:00 PM';
            element.endTime = '1:00 PM';
            expect(element.value).toEqual({
                startTime: '12:00:00',
                endTime: '13:00:00'
            });
        });
    });

    describe('Methods', () => {
        it('Focus and blur', () => {
            return Promise.resolve()
                .then(() => {
                    element.focus();
                    element.blur();
                })
                .then(() => {
                    expect(element.shadowRoot.activeElement).toBeNull();
                });
        });

        it('checkValidity method', () => {
            const spy = jest.spyOn(element, 'checkValidity');

            element.checkValidity();
            expect(spy).toHaveBeenCalled();
        });

        it('setCustomValidity method', () => {
            const spy = jest.spyOn(element, 'setCustomValidity');

            element.setCustomValidity('Something');
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('Events', () => {
        it('Blur', () => {
            const handler = jest.fn();
            element.addEventListener('blur', handler);

            return Promise.resolve()
                .then(() => {
                    const startInput = element.shadowRoot.querySelector(
                        '[data-element-id="input-start-time"]'
                    );
                    startInput.dispatchEvent(new CustomEvent('blur'));
                })
                .then(() => {
                    expect(handler).toHaveBeenCalled();
                });
        });

        it('Change', () => {
            const handler = jest.fn();
            element.addEventListener('change', handler);

            return Promise.resolve()
                .then(() => {
                    const startInput = element.shadowRoot.querySelector(
                        '[data-element-id="input-start-time"]'
                    );
                    startInput.dispatchEvent(
                        new CustomEvent('change', {
                            detail: { value: '12:00 PM' }
                        })
                    );
                })
                .then(() => {
                    expect(handler).toHaveBeenCalled();
                    const call = handler.mock.calls[0][0];
                    expect(call.detail.startTime).toBe('12:00:00');
                });
        });

        it('Focus', () => {
            const handler = jest.fn();
            element.addEventListener('focus', handler);

            return Promise.resolve()
                .then(() => {
                    const startInput = element.shadowRoot.querySelector(
                        '[data-element-id="input-start-time"]'
                    );
                    startInput.dispatchEvent(new CustomEvent('focus'));
                })
                .then(() => {
                    expect(handler).toHaveBeenCalled();
                });
        });
    });

    describe('Validation', () => {
        describe('Start time after end time', () => {
            it('Check validity returns false', () => {
                element.startTime = '2:00 PM';
                element.endTime = '1:00 PM';

                return Promise.resolve().then(() => {
                    const isValid = element.checkValidity();
                    expect(isValid).toBeFalsy();
                });
            });

            it('Help message is shown on start input change', () => {
                element.endTime = '2:00 PM';

                const startInput = element.shadowRoot.querySelector(
                    '[data-element-id="input-start-time"]'
                );
                startInput.dispatchEvent(
                    new CustomEvent('change', {
                        detail: { value: '3:00 PM' }
                    })
                );

                return Promise.resolve().then(() => {
                    const helpMessage = element.shadowRoot.querySelector(
                        '[data-element-id="help-message"]'
                    );
                    expect(helpMessage).toBeTruthy();
                });
            });

            it('Help message is shown on end input change', () => {
                element.startTime = '2:00 PM';

                const endInput = element.shadowRoot.querySelector(
                    '[data-element-id="input-end-time"]'
                );
                endInput.dispatchEvent(
                    new CustomEvent('change', {
                        detail: { value: '1:00 PM' }
                    })
                );

                return Promise.resolve().then(() => {
                    const helpMessage = element.shadowRoot.querySelector(
                        '[data-element-id="help-message"]'
                    );
                    expect(helpMessage).toBeTruthy();
                });
            });
        });

        it('Valid time range', () => {
            element.startTime = '12:00 PM';
            element.endTime = '1:00 PM';
            return Promise.resolve().then(() => {
                const isValid = element.checkValidity();
                expect(isValid).toBeTruthy();
            });
        });

        it('No end time', () => {
            element.startTime = '12:00 PM';
            element.endTime = undefined;
            return Promise.resolve().then(() => {
                const isValid = element.checkValidity();
                expect(isValid).toBeTruthy();
            });
        });

        it('No start time', () => {
            element.startTime = undefined;
            element.endTime = '1:00 PM';
            return Promise.resolve().then(() => {
                const isValid = element.checkValidity();
                expect(isValid).toBeTruthy();
            });
        });
    });
});
