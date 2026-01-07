import InputDateRange from 'avonni/inputDateRange';
import { createElement } from 'lwc';

// Not tested:
// Popover positioning

const startDate = new Date('7/20/2021 10:00');
const endDate = new Date('7/21/2021 18:15');
const RANGE_OPTIONS_LABELS_MAP = {
    today: 'Today',
    yesterday: 'Yesterday',
    thisWeek: 'This week',
    lastWeek: 'Last week',
    thisMonth: 'This month',
    lastMonth: 'Last month',
    thisQuarter: 'This quarter',
    lastQuarter: 'Last quarter',
    thisYear: 'This year',
    lastYear: 'Last year',
    custom: 'Custom'
};

let element;
describe('Input Date Range', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        jest.clearAllTimers();
        jest.restoreAllMocks();
    });

    beforeEach(() => {
        element = createElement('base-input-date-range', {
            is: InputDateRange
        });
        jest.useFakeTimers('modern');
        jest.setSystemTime(new Date(2024, 0, 15, 0, 0, 0, 0));
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
            setTimeout(() => cb(), 0);
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.dateStyle).toBe('medium');
            expect(element.disabled).toBeFalsy();
            expect(element.endDate).toBeUndefined();
            expect(element.fieldLevelHelp).toBeUndefined();
            expect(element.label).toBeUndefined();
            expect(element.labelRangeOptions).toEqual(RANGE_OPTIONS_LABELS_MAP);
            expect(element.labelEndDate).toBeUndefined();
            expect(element.labelEndTime).toBeUndefined();
            expect(element.labelStartDate).toBeUndefined();
            expect(element.labelStartTime).toBeUndefined();
            expect(element.messageWhenValueMissing).toBeUndefined();
            expect(element.readOnly).toBeFalsy();
            expect(element.required).toBeFalsy();
            expect(element.requiredAlternativeText).toBe('Required');
            expect(element.showRangeOptions).toBeFalsy();
            expect(element.startDate).toBeUndefined();
            expect(element.timeStyle).toBe('short');
            expect(element.timezone).toBeUndefined();
            expect(element.todayButtonLabel).toBe('Today');
            expect(element.type).toBe('date');
            expect(element.value).toMatchObject({
                endDate: undefined,
                startDate: undefined
            });
            expect(element.validity).toMatchObject({});
            expect(element.variant).toBe('standard');
            expect(element.weekStartDay).toBe(0);
        });

        describe('type', () => {
            it('Date type date', () => {
                element.startDate = startDate;
                element.endDate = endDate;

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="input"]'
                    );
                    expect(input).toHaveLength(2);
                    const lightningInput = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="lightning-input"]'
                    );
                    expect(lightningInput).toHaveLength(0);
                });
            });

            it('date type datetime', () => {
                element.type = 'datetime';
                element.startDate = startDate;
                element.endDate = endDate;

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="input"]'
                    );
                    expect(input).toHaveLength(2);
                    const lightningInput = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="lightning-input"]'
                    );
                    expect(lightningInput).toHaveLength(2);
                });
            });
        });

        describe('Date style', () => {
            it('short', () => {
                const sDate = '7/20/2021';
                const eDate = '7/21/2021';
                element.dateStyle = 'short';
                element.startDate = startDate;
                element.endDate = endDate;

                return Promise.resolve().then(() => {
                    const startInput = element.shadowRoot.querySelector(
                        '[data-element-id="input-start-date"]'
                    );
                    expect(startInput.value).toBe(sDate);
                    const endInput = element.shadowRoot.querySelector(
                        '[data-element-id="input-end-date"]'
                    );
                    expect(endInput.value).toBe(eDate);
                });
            });

            it('medium', () => {
                const startMonth = startDate.toLocaleString('default', {
                    month: 'short'
                });
                const startDay = startDate.getDate();
                const startYear = startDate.getFullYear();
                const endMonth = endDate.toLocaleString('default', {
                    month: 'short'
                });
                const endDay = endDate.getDate();
                const endYear = endDate.getFullYear();

                element.startDate = startDate;
                element.endDate = endDate;

                return Promise.resolve().then(() => {
                    const startInput = element.shadowRoot.querySelector(
                        '[data-element-id="input-start-date"]'
                    );
                    expect(startInput.value).toContain(startMonth);
                    expect(startInput.value).toContain(startDay);
                    expect(startInput.value).toContain(startYear);
                    const endInput = element.shadowRoot.querySelector(
                        '[data-element-id="input-end-date"]'
                    );
                    expect(endInput.value).toContain(endMonth);
                    expect(endInput.value).toContain(endDay);
                    expect(endInput.value).toContain(endYear);
                });
            });

            it('long', () => {
                const startMonth = startDate.toLocaleString('default', {
                    month: 'long'
                });
                const startDay = startDate.getDate();
                const startYear = startDate.getFullYear();
                const start = `${startMonth} ${startDay}, ${startYear}`;

                const endMonth = endDate.toLocaleString('default', {
                    month: 'long'
                });
                const endDay = endDate.getDate();
                const endYear = endDate.getFullYear();
                const end = `${endMonth} ${endDay}, ${endYear}`;

                element.dateStyle = 'long';
                element.startDate = startDate;
                element.endDate = endDate;

                return Promise.resolve().then(() => {
                    const startInput = element.shadowRoot.querySelector(
                        '[data-element-id="input-start-date"]'
                    );
                    expect(startInput.value).toBe(start);
                    const endInput = element.shadowRoot.querySelector(
                        '[data-element-id="input-end-date"]'
                    );
                    expect(endInput.value).toBe(end);
                });
            });
        });

        describe('Time style', () => {
            it('short', () => {
                element.type = 'datetime';
                element.timeStyle = 'short';
                element.startDate = startDate;
                element.endDate = endDate;

                return Promise.resolve().then(() => {
                    const lightningInputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="lightning-input"]'
                    );
                    lightningInputs.forEach((input) => {
                        expect(input.timeStyle).toBe('short');
                    });
                });
            });

            it('medium', () => {
                element.type = 'datetime';
                element.timeStyle = 'medium';
                element.startDate = startDate;
                element.endDate = endDate;

                return Promise.resolve().then(() => {
                    const lightningInputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="lightning-input"]'
                    );
                    lightningInputs.forEach((input) => {
                        expect(input.timeStyle).toBe('medium');
                    });
                });
            });

            it('long', () => {
                element.type = 'datetime';
                element.timeStyle = 'long';
                element.startDate = startDate;
                element.endDate = endDate;

                return Promise.resolve().then(() => {
                    const lightningInputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="lightning-input"]'
                    );
                    lightningInputs.forEach((input) => {
                        expect(input.timeStyle).toBe('long');
                    });
                });
            });
        });

        describe('Disabled', () => {
            it('Passed to the component', () => {
                element.disabled = true;

                return Promise.resolve().then(() => {
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="input"]'
                    );
                    inputs.forEach((input) => {
                        expect(input.disabled).toBeTruthy();
                    });
                });
            });
        });

        describe('Field level help', () => {
            it('Passed to the component', () => {
                element.fieldLevelHelp = 'This is a field level help text';

                return Promise.resolve().then(() => {
                    const helpText = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-helptext"]'
                    );
                    expect(helpText).toBeTruthy();
                    expect(helpText.content).toBe(
                        'This is a field level help text'
                    );
                });
            });
        });

        describe('Label', () => {
            it('Passed to the component', () => {
                element.label = 'This is a label';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '[data-element-id="p-label"]'
                    );
                    expect(label.textContent).toBe('This is a label');
                });
            });
        });

        describe('Label start date', () => {
            it('Passed to the component', () => {
                element.labelStartDate = 'This is a label start date';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '.slds-form-element__label'
                    );
                    expect(label.textContent).toBe(
                        'This is a label start date'
                    );
                });
            });
        });

        describe('Label start time', () => {
            it('Passed to the component', () => {
                element.type = 'datetime';
                element.labelStartTime = 'This is a label start time';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '.slds-form-element__label'
                    );
                    expect(label.textContent).toBe(
                        'This is a label start time'
                    );
                });
            });
        });

        describe('Label end date', () => {
            it('Passed to the component', () => {
                element.labelEndDate = 'This is a label end date';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '.slds-form-element__label'
                    );
                    expect(label.textContent).toBe('This is a label end date');
                });
            });
        });

        describe('Label end time', () => {
            it('Passed to the component', () => {
                element.type = 'datetime';
                element.labelEndTime = 'This is a label end time';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '.slds-form-element__label'
                    );
                    expect(label.textContent).toBe('This is a label end time');
                });
            });
        });

        describe('Read only', () => {
            it('false', () => {
                element.readOnly = false;
                element.type = 'datetime';

                return Promise.resolve().then(() => {
                    const lightningInputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="lightning-input"]'
                    );
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="input"]'
                    );
                    inputs.forEach((input) => {
                        expect(input.readOnly).toBeFalsy();
                    });
                    lightningInputs.forEach((input) => {
                        expect(input.readOnly).toBeFalsy();
                    });
                });
            });

            it('true', () => {
                element.readOnly = true;
                element.type = 'datetime';
                element.startDate = startDate;
                element.endDate = endDate;

                return Promise.resolve().then(() => {
                    const startDateString = element.shadowRoot.querySelector(
                        '[data-element-id="start-date"]'
                    );
                    expect(startDateString.textContent).toBeTruthy();

                    const endDateString = element.shadowRoot.querySelector(
                        '[data-element-id="end-date"]'
                    );
                    expect(endDateString.textContent).toBeTruthy();
                });
            });
        });

        describe('Cases', () => {
            it('SELECT_ONLY_START', () => {
                return Promise.resolve()
                    .then(() => {
                        const startInput = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-icon-start-date"]'
                        );
                        startInput.click();
                    })
                    .then(() => {
                        const startCalendar = element.shadowRoot.querySelector(
                            '[data-element-id="calendar-start-date"]'
                        );
                        startCalendar.dispatchEvent(
                            new CustomEvent('change', {
                                detail: {
                                    value: [new Date('7/25/2021')],
                                    clickedDate: new Date('7/25/2021')
                                }
                            })
                        );
                        expect(element.value).toMatchObject({
                            startDate: new Date('7/25/2021'),
                            endDate: undefined
                        });
                        jest.runAllTimers();
                    })
                    .then(() => {
                        const endCalendar = element.shadowRoot.querySelector(
                            '[data-element-id="calendar-end-date"]'
                        );
                        expect(endCalendar).toBeTruthy();
                    });
            });
            it('SELECT_ONLY_END', () => {
                return Promise.resolve()
                    .then(() => {
                        const endInput = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-icon-end-date"]'
                        );
                        endInput.click();
                    })
                    .then(() => {
                        const endCalendar = element.shadowRoot.querySelector(
                            '[data-element-id="calendar-end-date"]'
                        );
                        endCalendar.dispatchEvent(
                            new CustomEvent('change', {
                                detail: {
                                    value: [new Date('7/25/2021')],
                                    clickedDate: new Date('7/25/2021')
                                }
                            })
                        );
                        expect(element.value).toMatchObject({
                            startDate: undefined,
                            endDate: new Date('7/25/2021')
                        });
                        jest.runAllTimers();
                    })
                    .then(() => {
                        const startCalendar = element.shadowRoot.querySelector(
                            '[data-element-id="calendar-start-date"]'
                        );
                        expect(startCalendar).toBeTruthy();
                        jest.runAllTimers();
                    })
                    .then(() => {
                        const endCalendar = element.shadowRoot.querySelector(
                            '[data-element-id="calendar-end-date"]'
                        );
                        expect(endCalendar).toBeFalsy();
                    });
            });

            it('SELECT_NEW_START', () => {
                element.startDate = new Date('7/15/2021');
                element.endDate = new Date('7/30/2021');

                return Promise.resolve()
                    .then(() => {
                        const startInput = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-icon-start-date"]'
                        );
                        startInput.click();
                    })
                    .then(() => {
                        const startCalendar = element.shadowRoot.querySelector(
                            '[data-element-id="calendar-start-date"]'
                        );
                        startCalendar.dispatchEvent(
                            new CustomEvent('change', {
                                detail: {
                                    value: [new Date('7/25/2021')],
                                    clickedDate: new Date('7/25/2021')
                                }
                            })
                        );
                        expect(element.value).toMatchObject({
                            startDate: new Date('7/25/2021'),
                            endDate: new Date('7/30/2021')
                        });
                        jest.runAllTimers();
                    })
                    .then(() => {
                        const startCalendar = element.shadowRoot.querySelector(
                            '[data-element-id="calendar-start-date"]'
                        );
                        expect(startCalendar).toBeFalsy();
                    });
            });

            it('SELECT_NEW_END', () => {
                element.startDate = new Date('7/20/2021');
                element.endDate = new Date('7/25/2021');

                return Promise.resolve()
                    .then(() => {
                        const endInput = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-icon-end-date"]'
                        );
                        endInput.click();
                    })
                    .then(() => {
                        const endCalendar = element.shadowRoot.querySelector(
                            '[data-element-id="calendar-end-date"]'
                        );
                        endCalendar.dispatchEvent(
                            new CustomEvent('change', {
                                detail: {
                                    value: [
                                        new Date('7/20/2021'),
                                        new Date('7/27/2021')
                                    ],
                                    clickedDate: new Date('7/27/2021')
                                }
                            })
                        );
                        expect(element.value).toMatchObject({
                            startDate: new Date('7/20/2021'),
                            endDate: new Date('7/27/2021')
                        });
                        jest.runAllTimers();
                    })
                    .then(() => {
                        const endCalendar = element.shadowRoot.querySelector(
                            '[data-element-id="calendar-end-date"]'
                        );
                        expect(endCalendar).toBeFalsy();
                    });
            });

            it('SELECT_START_ABOVE_END', () => {
                element.startDate = new Date('7/15/2022');
                element.endDate = new Date('7/20/2022');

                return Promise.resolve()
                    .then(() => {
                        const startInput = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-icon-start-date"]'
                        );
                        startInput.click();
                        expect(element.value).toMatchObject({
                            startDate: new Date('7/15/2022'),
                            endDate: new Date('7/20/2022')
                        });
                    })
                    .then(() => {
                        const startCalendar = element.shadowRoot.querySelector(
                            '[data-element-id="calendar-start-date"]'
                        );
                        startCalendar.dispatchEvent(
                            new CustomEvent('change', {
                                detail: {
                                    value: [new Date('7/26/2022')],
                                    clickedDate: new Date('7/26/2022')
                                }
                            })
                        );
                        expect(element.value).toMatchObject({
                            startDate: new Date('7/26/2022'),
                            endDate: null
                        });
                        jest.runAllTimers();
                    })
                    .then(() => {
                        const endCalendar = element.shadowRoot.querySelector(
                            '[data-element-id="calendar-end-date"]'
                        );
                        expect(endCalendar).toBeTruthy();
                    });
            });

            it('SELECT_END_BELOW_START', () => {
                element.startDate = new Date('7/25/2022');
                element.endDate = new Date('7/28/2022');

                return Promise.resolve()
                    .then(() => {
                        const endInput = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-icon-end-date"]'
                        );
                        endInput.click();
                        expect(element.value).toMatchObject({
                            startDate: new Date('7/25/2022'),
                            endDate: new Date('7/28/2022')
                        });
                    })
                    .then(() => {
                        const endCalendar = element.shadowRoot.querySelector(
                            '[data-element-id="calendar-end-date"]'
                        );
                        endCalendar.dispatchEvent(
                            new CustomEvent('change', {
                                detail: {
                                    value: [new Date('7/22/2022')],
                                    clickedDate: new Date('7/22/2022')
                                }
                            })
                        );
                        expect(element.value).toMatchObject({
                            startDate: null,
                            endDate: new Date('7/22/2022')
                        });
                        jest.runAllTimers();
                    })
                    .then(() => {
                        const startCalendar = element.shadowRoot.querySelector(
                            '[data-element-id="calendar-start-date"]'
                        );
                        expect(startCalendar).toBeTruthy();
                    });
            });

            it('DESELECT_START', () => {
                element.startDate = new Date('7/15/2022');
                element.endDate = new Date('7/20/2022');

                return Promise.resolve()
                    .then(() => {
                        const startInput = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-icon-start-date"]'
                        );
                        startInput.click();
                        expect(element.value).toMatchObject({
                            startDate: new Date('7/15/2022'),
                            endDate: new Date('7/20/2022')
                        });
                    })
                    .then(() => {
                        const startCalendar = element.shadowRoot.querySelector(
                            '[data-element-id="calendar-start-date"]'
                        );
                        startCalendar.dispatchEvent(
                            new CustomEvent('change', {
                                detail: {
                                    value: [new Date('7/20/2022')],
                                    clickedDate: new Date('7/15/2022')
                                }
                            })
                        );
                        expect(element.value).toMatchObject({
                            startDate: null,
                            endDate: new Date('7/20/2022')
                        });
                        jest.runAllTimers();
                        expect(startCalendar).toBeTruthy();
                    });
            });

            it('DESELECT_END', () => {
                element.startDate = new Date('7/25/2022');
                element.endDate = new Date('7/28/2022');

                return Promise.resolve()
                    .then(() => {
                        const endInput = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-icon-end-date"]'
                        );
                        endInput.click();
                        expect(element.value).toMatchObject({
                            startDate: new Date('7/25/2022'),
                            endDate: new Date('7/28/2022')
                        });
                    })
                    .then(() => {
                        const endCalendar = element.shadowRoot.querySelector(
                            '[data-element-id="calendar-end-date"]'
                        );
                        endCalendar.dispatchEvent(
                            new CustomEvent('change', {
                                detail: {
                                    value: [new Date('7/25/2022')],
                                    clickedDate: new Date('7/28/2022')
                                }
                            })
                        );
                        expect(element.value).toMatchObject({
                            startDate: new Date('7/25/2022'),
                            endDate: null
                        });
                        jest.runAllTimers();
                        expect(endCalendar).toBeTruthy();
                    });
            });

            it('SELECT_START_EQUAL_END', () => {
                element.startDate = new Date('7/15/2022');
                element.endDate = new Date('7/20/2022');

                return Promise.resolve()
                    .then(() => {
                        const startInput = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-icon-start-date"]'
                        );
                        startInput.click();
                        expect(element.value).toMatchObject({
                            startDate: new Date('7/15/2022'),
                            endDate: new Date('7/20/2022')
                        });
                    })
                    .then(() => {
                        const startCalendar = element.shadowRoot.querySelector(
                            '[data-element-id="calendar-start-date"]'
                        );
                        startCalendar.dispatchEvent(
                            new CustomEvent('change', {
                                detail: {
                                    value: [new Date('7/20/2022')],
                                    clickedDate: new Date('7/20/2022')
                                }
                            })
                        );
                        expect(element.value).toMatchObject({
                            startDate: new Date('7/20/2022'),
                            endDate: new Date('7/20/2022')
                        });
                    });
            });

            it('SELECT_END_EQUAL_START', () => {
                element.startDate = new Date('7/25/2022');
                element.endDate = new Date('7/28/2022');

                return Promise.resolve()
                    .then(() => {
                        const endInput = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-icon-end-date"]'
                        );
                        endInput.click();
                        expect(element.value).toMatchObject({
                            startDate: new Date('7/25/2022'),
                            endDate: new Date('7/28/2022')
                        });
                    })
                    .then(() => {
                        const endCalendar = element.shadowRoot.querySelector(
                            '[data-element-id="calendar-end-date"]'
                        );
                        endCalendar.dispatchEvent(
                            new CustomEvent('change', {
                                detail: {
                                    value: [new Date('7/25/2022')],
                                    clickedDate: new Date('7/25/2022')
                                }
                            })
                        );
                        expect(element.value).toMatchObject({
                            startDate: new Date('7/25/2022'),
                            endDate: new Date('7/25/2022')
                        });
                    });
            });
        });

        describe('Required', () => {
            it('Passed to the component', () => {
                element.required = true;
                element.requiredAlternativeText = 'Required field';

                return Promise.resolve().then(() => {
                    const required =
                        element.shadowRoot.querySelector('.slds-required');
                    expect(required).toBeTruthy();
                    expect(required.textContent).toBe('*');
                    expect(required.title).toBe('Required field');
                });
            });
        });

        describe('Message when value missing', () => {
            // Depends on required, focus(), blur() and showHelpMessageIfInvalid()
            it('Passed to the component', () => {
                element.required = true;
                element.messageWhenValueMissing = 'Missing value!';
                element.type = 'datetime';

                return Promise.resolve()
                    .then(() => {
                        element.focus();
                        element.blur();
                        element.showHelpMessageIfInvalid();
                        jest.runAllTimers();
                    })
                    .then(() => {
                        const lightningInputs =
                            element.shadowRoot.querySelectorAll(
                                '[data-element-id^="lightning-input"]'
                            );
                        lightningInputs.forEach((input) => {
                            expect(input.className).toContain('slds-has-error');
                        });
                        const inputs = element.shadowRoot.querySelectorAll(
                            '[data-element-id^="input"]'
                        );
                        inputs.forEach((input) => {
                            expect(input.className).toContain('slds-has-error');
                        });

                        const message = element.shadowRoot.querySelector(
                            '.slds-form-element__help'
                        );
                        expect(message.textContent).toBe('Missing value!');
                    });
            });
        });

        describe('Show Range Options', () => {
            it('Passed to the component', () => {
                element.showRangeOptions = true;

                return Promise.resolve().then(() => {
                    const rangeOptions = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-input-date-range__combobox-range-options"]'
                    );
                    expect(rangeOptions).toBeTruthy();
                });
            });
        });

        describe('Show Range Options Change', () => {
            it('today', async () => {
                element.showRangeOptions = true;

                return Promise.resolve().then(() => {
                    const rangeOptions = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-input-date-range__combobox-range-options"]'
                    );
                    rangeOptions.dispatchEvent(
                        new CustomEvent('change', {
                            detail: {
                                value: 'today'
                            }
                        })
                    );
                    expect(element.value).toMatchObject({
                        startDate: new Date(2024, 0, 15, 0, 0, 0, 0),
                        endDate: new Date(2024, 0, 15, 0, 0, 0, 0)
                    });
                });
            });
            it('yesterday', async () => {
                element.showRangeOptions = true;
                return Promise.resolve().then(() => {
                    const rangeOptions = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-input-date-range__combobox-range-options"]'
                    );
                    rangeOptions.dispatchEvent(
                        new CustomEvent('change', {
                            detail: {
                                value: 'yesterday'
                            }
                        })
                    );
                    expect(element.value).toMatchObject({
                        startDate: new Date(2024, 0, 14, 0, 0, 0, 0),
                        endDate: new Date(2024, 0, 14, 0, 0, 0, 0)
                    });
                });
            });
            it('lastWeek', async () => {
                element.showRangeOptions = true;

                return Promise.resolve().then(() => {
                    const rangeOptions = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-input-date-range__combobox-range-options"]'
                    );
                    rangeOptions.dispatchEvent(
                        new CustomEvent('change', {
                            detail: {
                                value: 'lastWeek'
                            }
                        })
                    );
                    expect(element.value).toMatchObject({
                        startDate: new Date(2024, 0, 7, 0, 0, 0, 0),
                        endDate: new Date(2024, 0, 13, 0, 0, 0, 0)
                    });
                });
            });

            it('lastMonth', async () => {
                element.showRangeOptions = true;

                return Promise.resolve().then(() => {
                    const rangeOptions = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-input-date-range__combobox-range-options"]'
                    );
                    rangeOptions.dispatchEvent(
                        new CustomEvent('change', {
                            detail: {
                                value: 'lastMonth'
                            }
                        })
                    );
                    expect(element.value).toMatchObject({
                        startDate: new Date(2023, 11, 1, 0, 0, 0, 0),
                        endDate: new Date(2023, 11, 31, 0, 0, 0, 0)
                    });
                });
            });

            it('lastQuarter', async () => {
                element.showRangeOptions = true;

                return Promise.resolve().then(() => {
                    const rangeOptions = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-input-date-range__combobox-range-options"]'
                    );
                    rangeOptions.dispatchEvent(
                        new CustomEvent('change', {
                            detail: {
                                value: 'lastQuarter'
                            }
                        })
                    );
                    expect(element.value).toMatchObject({
                        startDate: new Date(2023, 9, 1, 0, 0, 0, 0),
                        endDate: new Date(2023, 11, 31, 0, 0, 0, 0)
                    });
                });
            });

            it('lastYear', async () => {
                element.showRangeOptions = true;

                return Promise.resolve().then(() => {
                    const rangeOptions = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-input-date-range__combobox-range-options"]'
                    );
                    rangeOptions.dispatchEvent(
                        new CustomEvent('change', {
                            detail: {
                                value: 'lastYear'
                            }
                        })
                    );
                    expect(element.value).toMatchObject({
                        startDate: new Date(2023, 0, 1, 0, 0, 0, 0),
                        endDate: new Date(2023, 11, 31, 0, 0, 0, 0)
                    });
                });
            });

            it('thisWeek', async () => {
                element.showRangeOptions = true;

                return Promise.resolve().then(() => {
                    const rangeOptions = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-input-date-range__combobox-range-options"]'
                    );
                    rangeOptions.dispatchEvent(
                        new CustomEvent('change', {
                            detail: {
                                value: 'thisWeek'
                            }
                        })
                    );
                    expect(element.value).toMatchObject({
                        startDate: new Date(2024, 0, 14, 0, 0, 0, 0),
                        endDate: new Date(2024, 0, 20, 0, 0, 0, 0)
                    });
                });
            });

            it('thisMonth', async () => {
                element.showRangeOptions = true;

                return Promise.resolve().then(() => {
                    const rangeOptions = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-input-date-range__combobox-range-options"]'
                    );
                    rangeOptions.dispatchEvent(
                        new CustomEvent('change', {
                            detail: {
                                value: 'thisMonth'
                            }
                        })
                    );
                    expect(element.value).toMatchObject({
                        startDate: new Date(2024, 0, 1, 0, 0, 0, 0),
                        endDate: new Date(2024, 0, 31, 0, 0, 0, 0)
                    });
                });
            });

            it('thisQuarter', async () => {
                element.showRangeOptions = true;

                return Promise.resolve().then(() => {
                    const rangeOptions = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-input-date-range__combobox-range-options"]'
                    );
                    rangeOptions.dispatchEvent(
                        new CustomEvent('change', {
                            detail: {
                                value: 'thisQuarter'
                            }
                        })
                    );
                    expect(element.value).toMatchObject({
                        startDate: new Date(2024, 0, 1, 0, 0, 0, 0),
                        endDate: new Date(2024, 2, 31, 0, 0, 0, 0)
                    });
                });
            });

            it('thisYear', async () => {
                element.showRangeOptions = true;

                return Promise.resolve().then(() => {
                    const rangeOptions = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-input-date-range__combobox-range-options"]'
                    );
                    rangeOptions.dispatchEvent(
                        new CustomEvent('change', {
                            detail: {
                                value: 'thisYear'
                            }
                        })
                    );
                    expect(element.value).toMatchObject({
                        startDate: new Date(2024, 0, 1, 0, 0, 0, 0),
                        endDate: new Date(2024, 11, 31, 0, 0, 0, 0)
                    });
                });
            });

            it('custom', async () => {
                element.showRangeOptions = true;
                element.startDate = new Date();
                element.endDate = new Date();

                return Promise.resolve().then(() => {
                    const rangeOptions = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-input-date-range__combobox-range-options"]'
                    );
                    rangeOptions.dispatchEvent(
                        new CustomEvent('change', {
                            detail: {
                                value: 'custom'
                            }
                        })
                    );
                    expect(element.value).toMatchObject({
                        startDate: new Date(),
                        endDate: new Date()
                    });
                });
            });
        });

        describe('Timezone', () => {
            it('Passed to the component', () => {
                element.timezone = 'Asia/Shanghai';
                element.type = 'datetime';
                element.dateStyle = 'short';
                element.startDate = '2022-08-16T04:00+08:00';
                element.endDate = '2022-08-20T15:00+08:00';

                const handler = jest.fn();
                element.addEventListener('change', handler);

                return Promise.resolve()
                    .then(() => {
                        const startDateInput = element.shadowRoot.querySelector(
                            '[data-element-id="input-start-date"]'
                        );
                        expect(startDateInput.value).toBe('8/16/2022');

                        const startTimeInput = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-input-start-time"]'
                        );
                        expect(startTimeInput.value).toBe('04:00:00.000');

                        const endDateInput = element.shadowRoot.querySelector(
                            '[data-element-id="input-end-date"]'
                        );
                        expect(endDateInput.value).toBe('8/20/2022');
                        const endTimeInput = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-input-end-time"]'
                        );
                        expect(endTimeInput.value).toBe('15:00:00.000');

                        startDateInput.click();
                    })
                    .then(() => {
                        const calendar = element.shadowRoot.querySelector(
                            '[data-element-id="calendar-start-date"]'
                        );
                        calendar.dispatchEvent(
                            new CustomEvent('change', {
                                detail: {
                                    value: ['2022-08-16T00:00:00.000+08:00']
                                }
                            })
                        );

                        expect(handler).toHaveBeenCalled();
                        const detail = handler.mock.calls[0][0].detail;
                        expect(detail.startDate).toBe(
                            '2022-08-16T04:00:00.000+08:00'
                        );
                        expect(detail.endDate).toBe(
                            '2022-08-20T15:00:00.000+08:00'
                        );
                    });
            });
            it('no timezone with value that has a time zone', () => {
                element.type = 'datetime';
                element.dateStyle = 'short';
                element.startDate = '2022-08-16T04:00:00.000+08:00';
                const start = new Date('2022-08-16T04:00:00.000+08:00');
                const date = start.getDate();
                const year = start.getFullYear();
                const month = start.getMonth() + 1;
                const time = `${start.toTimeString().substring(0, 5)}:00.000`;
                const formattedDate = `${month}/${date}/${year}`;

                return Promise.resolve().then(() => {
                    const dateInput = element.shadowRoot.querySelector(
                        '[data-element-id="input-start-date"]'
                    );
                    expect(dateInput.value).toBe(formattedDate);

                    const timeInput = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-start-time"]'
                    );
                    expect(timeInput.value).toBe(time);
                });
            });
        });

        describe('Variant', () => {
            it('standard', () => {
                element.variant = 'standard';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '.avonni-date-range__label-container'
                    );

                    expect(label.classList).not.toContain(
                        'slds-assistive-text'
                    );
                    expect(label.classList).not.toContain('slds-m-right_small');
                });
            });

            it('label-hidden', () => {
                element.variant = 'label-hidden';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '.avonni-date-range__label-container'
                    );

                    expect(label.classList).toContain('slds-assistive-text');
                    expect(label.classList).not.toContain('slds-m-right_small');
                });
            });
        });

        it('Week start day', () => {
            element.weekStartDay = 2;

            return Promise.resolve()
                .then(() => {
                    const startButton = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon-start-date"]'
                    );
                    startButton.click();
                })
                .then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="calendar-start-date"]'
                    );
                    expect(calendar.weekStartDay).toBe(2);
                    const endButton = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon-end-date"]'
                    );
                    endButton.click();
                })
                .then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="calendar-end-date"]'
                    );
                    expect(calendar.weekStartDay).toBe(2);
                });
        });
    });

    describe('Methods', () => {
        it('method: focus', () => {
            let focusEvent = false;
            const startInput = element.shadowRoot.querySelector(
                '[data-element-id="input-start-date"]'
            );
            startInput.addEventListener('focus', () => {
                focusEvent = true;
            });
            startInput.focus();

            return Promise.resolve().then(() => {
                expect(focusEvent).toBeTruthy();
            });
        });

        // Input date range method blur
        it('method: blur', () => {
            let blurEvent = false;
            const startInput = element.shadowRoot.querySelector(
                '[data-element-id="input-start-date"]'
            );

            startInput.focus();

            startInput.addEventListener('blur', () => {
                blurEvent = true;
            });

            startInput.blur();

            return Promise.resolve().then(() => {
                expect(blurEvent).toBeTruthy();
            });
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
    });

    describe('Events', () => {
        it('blur', () => {
            const handler = jest.fn();
            element.addEventListener('blur', handler);

            return Promise.resolve().then(() => {
                const startInput = element.shadowRoot.querySelector(
                    '[data-element-id="input-start-date"]'
                );
                startInput.dispatchEvent(new CustomEvent('blur'));
                expect(handler).toHaveBeenCalled();
                const call = handler.mock.calls[0][0];
                expect(call.bubbles).toBeFalsy();
                expect(call.composed).toBeFalsy();
                expect(call.cancelable).toBeFalsy();
            });
        });

        it('change event', () => {
            element.startDate = startDate.setHours(0, 0, 0, 0);
            element.endDate = endDate.setHours(0, 0, 0, 0);
            const startInput = element.shadowRoot.querySelector(
                '[data-element-id="input-start-date"]'
            );
            const handler = jest.fn();

            const newDate = new Date('12/12/2022').setHours(0, 0, 0, 0);
            startInput.addEventListener('change', handler);

            return Promise.resolve()
                .then(() => {
                    startInput.dispatchEvent(
                        new CustomEvent('change', {
                            detail: { startDate: newDate, endDate: endDate }
                        })
                    );
                })
                .then(() => {
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.startDate).toBe(
                        newDate
                    );
                    expect(handler.mock.calls[0][0].detail.endDate).toBe(
                        endDate
                    );
                    expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                });
        });

        it('change event with timezone', () => {
            element.startDate = startDate;
            element.endDate = endDate;
            element.timezone = 'America/Port-au-Prince';
            const startInput = element.shadowRoot.querySelector(
                '[data-element-id="input-start-date"]'
            );
            const handler = jest.fn();

            startInput.addEventListener('change', handler);

            return Promise.resolve()
                .then(() => {
                    startInput.dispatchEvent(
                        new CustomEvent('change', {
                            detail: { startDate: startDate, endDate: endDate }
                        })
                    );
                })
                .then(() => {
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.startDate).toBe(
                        startDate
                    );
                    expect(handler.mock.calls[0][0].detail.endDate).toBe(
                        endDate
                    );
                    expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                });
        });

        it('Change event with invalid start time', () => {
            element.startDate = new Date('7/25/2022');
            element.endDate = new Date('7/28/2022');
            element.type = 'datetime';

            return Promise.resolve()
                .then(() => {
                    const startTimeInput = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-start-time"]'
                    );
                    const endTimeInput = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-end-time"]'
                    );
                    startTimeInput.value = '18:00:00.000';
                    endTimeInput.value = '17:00:00.000';
                    startTimeInput.dispatchEvent(new CustomEvent('change'));
                    endTimeInput.dispatchEvent(new CustomEvent('change'));
                })
                .then(() => {
                    const endInput = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon-end-date"]'
                    );
                    endInput.click();
                })
                .then(() => {
                    const handler = jest.fn();
                    element.addEventListener('change', handler);
                    const endCalendar = element.shadowRoot.querySelector(
                        '[data-element-id="calendar-end-date"]'
                    );
                    endCalendar.dispatchEvent(
                        new CustomEvent('change', {
                            detail: {
                                value: [new Date('7/25/2022')],
                                clickedDate: new Date('7/25/2022')
                            }
                        })
                    );
                    expect(handler).toHaveBeenCalledTimes(1);
                    expect(handler.mock.calls[0][0].detail.startDate).toEqual(
                        '2022-07-25T00:00:00.000Z'
                    );
                    expect(handler.mock.calls[0][0].detail.endDate).toEqual(
                        '2022-07-25T00:00:00.000Z'
                    );
                });
        });

        it('Change event with invalid end time', () => {
            element.startDate = new Date('7/25/2022');
            element.endDate = new Date('7/28/2022');
            element.type = 'datetime';

            return Promise.resolve()
                .then(() => {
                    const startTimeInput = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-start-time"]'
                    );
                    const endTimeInput = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input-end-time"]'
                    );
                    startTimeInput.value = '18:00:00.000';
                    endTimeInput.value = '17:00:00.000';
                    startTimeInput.dispatchEvent(new CustomEvent('change'));
                    endTimeInput.dispatchEvent(new CustomEvent('change'));
                })
                .then(() => {
                    const startInput = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon-start-date"]'
                    );
                    startInput.click();
                })
                .then(() => {
                    const handler = jest.fn();
                    element.addEventListener('change', handler);
                    const startCalendar = element.shadowRoot.querySelector(
                        '[data-element-id="calendar-start-date"]'
                    );
                    startCalendar.dispatchEvent(
                        new CustomEvent('change', {
                            detail: {
                                value: [new Date('7/28/2022')],
                                clickedDate: new Date('7/28/2022')
                            }
                        })
                    );
                    expect(handler).toHaveBeenCalledTimes(1);
                    expect(handler.mock.calls[0][0].detail.startDate).toEqual(
                        '2022-07-28T00:00:00.000Z'
                    );
                    expect(handler.mock.calls[0][0].detail.endDate).toEqual(
                        '2022-07-28T00:00:00.000Z'
                    );
                });
        });

        it('focus', () => {
            const handler = jest.fn();
            element.addEventListener('focus', handler);

            return Promise.resolve().then(() => {
                const startInput = element.shadowRoot.querySelector(
                    '[data-element-id="input-start-date"]'
                );
                startInput.focus();
                expect(handler).toHaveBeenCalled();
                const call = handler.mock.calls[0][0];
                expect(call.bubbles).toBeFalsy();
                expect(call.composed).toBeFalsy();
                expect(call.cancelable).toBeFalsy();
            });
        });
    });

    describe('Keyboard Accessibility', () => {
        it('open and escape start calendar with keyboard on icon', () => {
            return Promise.resolve()
                .then(() => {
                    const startInput = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon-start-date"]'
                    );
                    startInput.click();
                })
                .then(() => {
                    const startCalendar = element.shadowRoot.querySelector(
                        '[data-element-id="calendar-start-date"]'
                    );
                    expect(startCalendar).toBeTruthy();
                })
                .then(() => {
                    const startInput = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon-start-date"]'
                    );
                    startInput.dispatchEvent(
                        new KeyboardEvent('keydown', {
                            key: 'Escape',
                            bubbles: true
                        })
                    );
                })
                .then(() => {
                    const startCalendar = element.shadowRoot.querySelector(
                        '[data-element-id="calendar-start-date"]'
                    );
                    expect(startCalendar).toBeFalsy();
                });
        });

        it('open and escape end calendar with keyboard on icon', () => {
            return Promise.resolve()
                .then(() => {
                    const endInput = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon-end-date"]'
                    );
                    endInput.click();
                })
                .then(() => {
                    const endCalendar = element.shadowRoot.querySelector(
                        '[data-element-id="calendar-end-date"]'
                    );
                    expect(endCalendar).toBeTruthy();
                })
                .then(() => {
                    const endInput = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon-end-date"]'
                    );
                    endInput.dispatchEvent(
                        new KeyboardEvent('keydown', {
                            key: 'Escape',
                            bubbles: true
                        })
                    );
                })
                .then(() => {
                    const endCalendar = element.shadowRoot.querySelector(
                        '[data-element-id="calendar-end-date"]'
                    );
                    expect(endCalendar).toBeFalsy();
                });
        });
    });
});
