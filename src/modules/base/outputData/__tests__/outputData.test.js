import { createElement } from 'lwc';
import OutputData from '../outputData';

let element;
describe('OutputData', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-output-data', {
            is: OutputData
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.label).toBeUndefined();
            expect(element.type).toBe('text');
            expect(element.typeAttributes).toMatchObject({});
            expect(element.value).toBeUndefined();
            expect(element.variant).toBe('standard');
        });

        describe('Boolean', () => {
            it('with true value', () => {
                element.value = true;
                element.type = 'boolean';

                return Promise.resolve().then(() => {
                    const text = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-text"]'
                    );
                    const boolean = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon"]'
                    );
                    const number = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-number"]'
                    );
                    const date = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-date-time"]'
                    );
                    const email = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-email"]'
                    );
                    const location = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-location"]'
                    );
                    const phone = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-phone"]'
                    );
                    const url = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-url"]'
                    );

                    expect(boolean).toBeTruthy();
                    expect(boolean.iconName).toBe('utility:check');
                    expect(
                        text ||
                            number ||
                            date ||
                            email ||
                            location ||
                            phone ||
                            url
                    ).toBeFalsy();
                });
            });

            it('with false value', () => {
                element.type = 'boolean';
                element.value = false;

                return Promise.resolve().then(() => {
                    const text = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-text"]'
                    );
                    const boolean = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon"]'
                    );
                    const number = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-number"]'
                    );
                    const date = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-date-time"]'
                    );
                    const email = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-email"]'
                    );
                    const location = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-location"]'
                    );
                    const phone = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-phone"]'
                    );
                    const url = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-url"]'
                    );

                    expect(
                        text ||
                            boolean ||
                            number ||
                            date ||
                            email ||
                            location ||
                            phone ||
                            url
                    ).toBeFalsy();
                });
            });

            it('with no value', () => {
                element.type = 'boolean';

                return Promise.resolve().then(() => {
                    const emptyValue = element.shadowRoot.querySelector(
                        '[data-element-id="empty-value"]'
                    );
                    const text = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-text"]'
                    );
                    const boolean = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon"]'
                    );
                    const number = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-number"]'
                    );
                    const date = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-date-time"]'
                    );
                    const email = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-email"]'
                    );
                    const location = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-location"]'
                    );
                    const phone = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-phone"]'
                    );
                    const url = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-url"]'
                    );

                    expect(emptyValue).toBeTruthy();
                    expect(
                        text ||
                            boolean ||
                            number ||
                            date ||
                            email ||
                            location ||
                            phone ||
                            url
                    ).toBeFalsy();
                });
            });
        });

        describe('Currency', () => {
            it('with value', () => {
                const typeAttributes = {
                    currencyCode: 'EUR',
                    currencyDisplayAs: 'name',
                    minimumIntegerDigits: 2,
                    minimumFractionDigits: 2,
                    maximumractionDigits: 4,
                    minimumSignificantDigits: 2,
                    maximumSignificantDigits: 5
                };
                element.typeAttributes = typeAttributes;
                element.value = 33;
                element.type = 'currency';

                return Promise.resolve().then(() => {
                    const text = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-text"]'
                    );
                    const boolean = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon"]'
                    );
                    const number = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-number"]'
                    );
                    const date = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-date-time"]'
                    );
                    const email = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-email"]'
                    );
                    const location = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-location"]'
                    );
                    const phone = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-phone"]'
                    );
                    const url = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-url"]'
                    );

                    expect(number).toBeTruthy();
                    expect(number.value).toBe(33);
                    expect(number.currencyCode).toBe(
                        typeAttributes.currencyCode
                    );
                    expect(number.currencyDisplayAs).toBe(
                        typeAttributes.currencyDisplayAs
                    );
                    expect(number.minimumIntegerDigits).toBe(
                        typeAttributes.minimumIntegerDigits
                    );
                    expect(number.minimumFractionDigits).toBe(
                        typeAttributes.minimumFractionDigits
                    );
                    expect(number.maximumFractionDigits).toBe(
                        typeAttributes.maximumFractionDigits
                    );
                    expect(number.maximumSignificantDigits).toBe(
                        typeAttributes.maximumSignificantDigits
                    );
                    expect(number.minimumSignificantDigits).toBe(
                        typeAttributes.minimumSignificantDigits
                    );

                    expect(
                        text ||
                            boolean ||
                            date ||
                            email ||
                            location ||
                            phone ||
                            url
                    ).toBeFalsy();
                });
            });

            it('with no value', () => {
                element.value = null;
                element.type = 'currency';

                return Promise.resolve().then(() => {
                    const emptyValue = element.shadowRoot.querySelector(
                        '[data-element-id="empty-value"]'
                    );
                    const text = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-text"]'
                    );
                    const boolean = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon"]'
                    );
                    const number = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-number"]'
                    );
                    const date = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-date-time"]'
                    );
                    const email = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-email"]'
                    );
                    const location = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-location"]'
                    );
                    const phone = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-phone"]'
                    );
                    const url = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-url"]'
                    );

                    expect(emptyValue).toBeTruthy();
                    expect(
                        text ||
                            boolean ||
                            number ||
                            date ||
                            email ||
                            location ||
                            phone ||
                            url
                    ).toBeFalsy();
                });
            });
        });

        describe('Date', () => {
            it('with value', () => {
                const typeAttributes = {
                    day: '2-digit',
                    era: 'long',
                    hour: 'numeric',
                    hour12: false,
                    minute: 'numeric',
                    month: 'long',
                    second: '2-digit',
                    timeZone: 'Pacific/Honolulu',
                    timeZoneName: 'short',
                    weekday: 'short',
                    year: 'numeric'
                };
                element.typeAttributes = typeAttributes;
                element.type = 'date';
                element.value = new Date('2021-04-12T12:38:03.422Z');

                return Promise.resolve().then(() => {
                    const text = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-text"]'
                    );
                    const boolean = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon"]'
                    );
                    const number = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-number"]'
                    );
                    const date = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-date-time"]'
                    );
                    const email = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-email"]'
                    );
                    const location = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-location"]'
                    );
                    const phone = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-phone"]'
                    );
                    const url = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-url"]'
                    );

                    expect(date).toBeTruthy();
                    expect(date.value).toMatchObject(
                        new Date('2021-04-12T12:38:03.422Z')
                    );
                    expect(date.day).toBe(typeAttributes.day);
                    expect(date.era).toBe(typeAttributes.era);
                    expect(date.hour).toBe(typeAttributes.hour);
                    expect(date.hour12).toBe(typeAttributes.hour12);
                    expect(date.minute).toBe(typeAttributes.minute);
                    expect(date.month).toBe(typeAttributes.month);
                    expect(date.second).toBe(typeAttributes.second);
                    expect(date.timeZone).toBe(typeAttributes.timeZone);
                    expect(date.timeZoneName).toBe(typeAttributes.timeZoneName);
                    expect(date.weekday).toBe(typeAttributes.weekday);
                    expect(date.year).toBe(typeAttributes.year);

                    expect(
                        text ||
                            boolean ||
                            number ||
                            email ||
                            location ||
                            phone ||
                            url
                    ).toBeFalsy();
                });
            });

            it('with no value', () => {
                element.value = null;
                element.type = 'date';

                return Promise.resolve().then(() => {
                    const emptyValue = element.shadowRoot.querySelector(
                        '[data-element-id="empty-value"]'
                    );
                    const text = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-text"]'
                    );
                    const boolean = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon"]'
                    );
                    const number = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-number"]'
                    );
                    const date = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-date-time"]'
                    );
                    const email = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-email"]'
                    );
                    const location = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-location"]'
                    );
                    const phone = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-phone"]'
                    );
                    const url = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-url"]'
                    );

                    expect(emptyValue).toBeTruthy();
                    expect(
                        text ||
                            boolean ||
                            number ||
                            date ||
                            email ||
                            location ||
                            phone ||
                            url
                    ).toBeFalsy();
                });
            });
        });

        describe('Email', () => {
            it('with value', () => {
                element.type = 'email';
                element.value = 'jane.doe@email.com';
                element.typeAttributes = {
                    hideIcon: true
                };

                return Promise.resolve().then(() => {
                    const text = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-text"]'
                    );
                    const boolean = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon"]'
                    );
                    const number = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-number"]'
                    );
                    const date = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-date-time"]'
                    );
                    const email = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-email"]'
                    );
                    const location = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-location"]'
                    );
                    const phone = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-phone"]'
                    );
                    const url = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-url"]'
                    );

                    expect(email).toBeTruthy();
                    expect(email.value).toBe('jane.doe@email.com');
                    expect(email.hideIcon).toBeTruthy();

                    expect(
                        text ||
                            boolean ||
                            number ||
                            date ||
                            location ||
                            phone ||
                            url
                    ).toBeFalsy();
                });
            });

            it('with no value', () => {
                element.value = null;
                element.type = 'email';

                return Promise.resolve().then(() => {
                    const emptyValue = element.shadowRoot.querySelector(
                        '[data-element-id="empty-value"]'
                    );
                    const text = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-text"]'
                    );
                    const boolean = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon"]'
                    );
                    const number = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-number"]'
                    );
                    const date = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-date-time"]'
                    );
                    const email = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-email"]'
                    );
                    const location = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-location"]'
                    );
                    const phone = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-phone"]'
                    );
                    const url = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-url"]'
                    );

                    expect(emptyValue).toBeTruthy();
                    expect(
                        text ||
                            boolean ||
                            number ||
                            date ||
                            email ||
                            location ||
                            phone ||
                            url
                    ).toBeFalsy();
                });
            });
        });

        describe('Location', () => {
            it('with value', () => {
                const typeAttributes = {
                    latitude: '45.53713090203662',
                    longitude: '-73.61483166585984'
                };
                element.type = 'location';
                element.typeAttributes = typeAttributes;

                return Promise.resolve().then(() => {
                    const text = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-text"]'
                    );
                    const boolean = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon"]'
                    );
                    const number = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-number"]'
                    );
                    const date = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-date-time"]'
                    );
                    const email = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-email"]'
                    );
                    const location = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-location"]'
                    );
                    const phone = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-phone"]'
                    );
                    const url = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-url"]'
                    );

                    expect(location).toBeTruthy();
                    expect(location.latitude).toBe(
                        Number(typeAttributes.latitude)
                    );
                    expect(location.longitude).toBe(
                        Number(typeAttributes.longitude)
                    );

                    expect(
                        text ||
                            boolean ||
                            number ||
                            date ||
                            email ||
                            phone ||
                            url
                    ).toBeFalsy();
                });
            });

            it('with no value', () => {
                element.value = 'Not Important For Location';
                element.type = 'location';

                return Promise.resolve().then(() => {
                    const emptyValue = element.shadowRoot.querySelector(
                        '[data-element-id="empty-value"]'
                    );
                    const text = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-text"]'
                    );
                    const boolean = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon"]'
                    );
                    const number = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-number"]'
                    );
                    const date = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-date-time"]'
                    );
                    const email = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-email"]'
                    );
                    const location = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-location"]'
                    );
                    const phone = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-phone"]'
                    );
                    const url = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-url"]'
                    );

                    expect(emptyValue).toBeTruthy();
                    expect(
                        text ||
                            boolean ||
                            number ||
                            date ||
                            email ||
                            location ||
                            phone ||
                            url
                    ).toBeFalsy();
                });
            });
        });

        describe('Number', () => {
            it('with value', () => {
                const typeAttributes = {
                    minimumIntegerDigits: 2,
                    maximumFractionDigits: 4,
                    maximumSignificantDigits: 12,
                    minimumFractionDigits: 2,
                    minimumSignificantDigits: 5
                };
                element.typeAttributes = typeAttributes;
                element.type = 'number';
                element.value = 46;

                return Promise.resolve().then(() => {
                    const text = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-text"]'
                    );
                    const boolean = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon"]'
                    );
                    const number = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-number"]'
                    );
                    const date = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-date-time"]'
                    );
                    const email = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-email"]'
                    );
                    const location = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-location"]'
                    );
                    const phone = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-phone"]'
                    );
                    const url = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-url"]'
                    );

                    expect(number).toBeTruthy();
                    expect(number.value).toBe(46);
                    expect(number.minimumIntegerDigits).toBe(
                        typeAttributes.minimumIntegerDigits
                    );
                    expect(number.maximumFractionDigits).toBe(
                        typeAttributes.maximumFractionDigits
                    );
                    expect(number.maximumSignificantDigits).toBe(
                        typeAttributes.maximumSignificantDigits
                    );
                    expect(number.minimumFractionDigits).toBe(
                        typeAttributes.minimumFractionDigits
                    );
                    expect(number.minimumSignificantDigits).toBe(
                        typeAttributes.minimumSignificantDigits
                    );

                    expect(
                        text ||
                            boolean ||
                            date ||
                            email ||
                            location ||
                            phone ||
                            url
                    ).toBeFalsy();
                });
            });

            it('with no value', () => {
                element.value = null;
                element.type = 'number';

                return Promise.resolve().then(() => {
                    const emptyValue = element.shadowRoot.querySelector(
                        '[data-element-id="empty-value"]'
                    );
                    const text = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-text"]'
                    );
                    const boolean = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon"]'
                    );
                    const number = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-number"]'
                    );
                    const date = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-date-time"]'
                    );
                    const email = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-email"]'
                    );
                    const location = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-location"]'
                    );
                    const phone = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-phone"]'
                    );
                    const url = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-url"]'
                    );

                    expect(emptyValue).toBeTruthy();
                    expect(
                        text ||
                            boolean ||
                            number ||
                            date ||
                            email ||
                            location ||
                            phone ||
                            url
                    ).toBeFalsy();
                });
            });
        });

        describe('Percent', () => {
            it('with value', () => {
                const typeAttributes = {
                    minimumIntegerDigits: 2,
                    maximumFractionDigits: 4,
                    maximumSignificantDigits: 12,
                    minimumFractionDigits: 2,
                    minimumSignificantDigits: 5,
                    step: 5
                };
                element.typeAttributes = typeAttributes;
                element.type = 'percent';
                element.value = 46;

                return Promise.resolve().then(() => {
                    const text = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-text"]'
                    );
                    const boolean = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon"]'
                    );
                    const number = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-number"]'
                    );
                    const date = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-date-time"]'
                    );
                    const email = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-email"]'
                    );
                    const location = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-location"]'
                    );
                    const phone = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-phone"]'
                    );
                    const url = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-url"]'
                    );

                    expect(number).toBeTruthy();
                    expect(number.value).toBe(46);
                    expect(number.minimumIntegerDigits).toBe(
                        typeAttributes.minimumIntegerDigits
                    );
                    expect(number.maximumFractionDigits).toBe(
                        typeAttributes.maximumFractionDigits
                    );
                    expect(number.maximumSignificantDigits).toBe(
                        typeAttributes.maximumSignificantDigits
                    );
                    expect(number.minimumFractionDigits).toBe(
                        typeAttributes.minimumFractionDigits
                    );
                    expect(number.minimumSignificantDigits).toBe(
                        typeAttributes.minimumSignificantDigits
                    );

                    expect(
                        text ||
                            boolean ||
                            date ||
                            email ||
                            location ||
                            phone ||
                            url
                    ).toBeFalsy();
                });
            });

            it('with no value', () => {
                element.value = null;
                element.type = 'percent';

                return Promise.resolve().then(() => {
                    const emptyValue = element.shadowRoot.querySelector(
                        '[data-element-id="empty-value"]'
                    );
                    const text = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-text"]'
                    );
                    const boolean = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon"]'
                    );
                    const number = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-number"]'
                    );
                    const date = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-date-time"]'
                    );
                    const email = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-email"]'
                    );
                    const location = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-location"]'
                    );
                    const phone = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-phone"]'
                    );
                    const url = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-url"]'
                    );

                    expect(emptyValue).toBeTruthy();
                    expect(
                        text ||
                            boolean ||
                            number ||
                            date ||
                            email ||
                            location ||
                            phone ||
                            url
                    ).toBeFalsy();
                });
            });
        });

        describe('Phone', () => {
            it('with value', () => {
                element.type = 'phone';
                element.value = '123-456-7890';

                return Promise.resolve().then(() => {
                    const text = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-text"]'
                    );
                    const boolean = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon"]'
                    );
                    const number = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-number"]'
                    );
                    const date = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-date-time"]'
                    );
                    const email = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-email"]'
                    );
                    const location = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-location"]'
                    );
                    const phone = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-phone"]'
                    );
                    const url = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-url"]'
                    );

                    expect(phone).toBeTruthy();
                    expect(phone.value).toBe('123-456-7890');

                    expect(
                        text ||
                            boolean ||
                            number ||
                            date ||
                            email ||
                            location ||
                            url
                    ).toBeFalsy();
                });
            });

            it('with no value', () => {
                element.value = null;
                element.type = 'phone';

                return Promise.resolve().then(() => {
                    const emptyValue = element.shadowRoot.querySelector(
                        '[data-element-id="empty-value"]'
                    );
                    const text = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-text"]'
                    );
                    const boolean = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon"]'
                    );
                    const number = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-number"]'
                    );
                    const date = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-date-time"]'
                    );
                    const email = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-email"]'
                    );
                    const location = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-location"]'
                    );
                    const phone = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-phone"]'
                    );
                    const url = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-url"]'
                    );

                    expect(emptyValue).toBeTruthy();
                    expect(
                        text ||
                            boolean ||
                            number ||
                            date ||
                            email ||
                            location ||
                            phone ||
                            url
                    ).toBeFalsy();
                });
            });
        });

        describe('Text', () => {
            it('with value', () => {
                element.type = 'text';
                element.value = 'A string value';
                element.typeAttributes = {
                    linkify: true
                };

                return Promise.resolve().then(() => {
                    const boolean = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon"]'
                    );
                    const number = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-number"]'
                    );
                    const date = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-date-time"]'
                    );
                    const email = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-email"]'
                    );
                    const location = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-location"]'
                    );
                    const phone = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-phone"]'
                    );
                    const text = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-text"]'
                    );
                    const url = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-url"]'
                    );

                    expect(text).toBeTruthy();
                    expect(text.value).toBe('A string value');
                    expect(text.linkify).toBeTruthy();
                    expect(
                        boolean ||
                            number ||
                            date ||
                            email ||
                            location ||
                            phone ||
                            url
                    ).toBeFalsy();
                });
            });

            it('with no value', () => {
                element.value = null;
                element.type = 'text';

                return Promise.resolve().then(() => {
                    const emptyValue = element.shadowRoot.querySelector(
                        '[data-element-id="empty-value"]'
                    );
                    const text = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-text"]'
                    );
                    const boolean = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon"]'
                    );
                    const number = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-number"]'
                    );
                    const date = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-date-time"]'
                    );
                    const email = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-email"]'
                    );
                    const location = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-location"]'
                    );
                    const phone = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-phone"]'
                    );
                    const url = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-url"]'
                    );

                    expect(emptyValue).toBeTruthy();
                    expect(
                        text ||
                            boolean ||
                            number ||
                            date ||
                            email ||
                            location ||
                            phone ||
                            url
                    ).toBeFalsy();
                });
            });
        });

        describe('URL', () => {
            it('with value', () => {
                const typeAttributes = {
                    label: 'A string label',
                    target: '_blank',
                    tooltip: 'A string help'
                };
                element.typeAttributes = typeAttributes;
                element.type = 'url';
                element.value = 'https://www.avonni.app/';

                return Promise.resolve().then(() => {
                    const text = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-text"]'
                    );
                    const boolean = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon"]'
                    );
                    const number = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-number"]'
                    );
                    const date = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-date-time"]'
                    );
                    const email = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-email"]'
                    );
                    const location = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-location"]'
                    );
                    const phone = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-phone"]'
                    );
                    const url = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-url"]'
                    );

                    expect(url).toBeTruthy();
                    expect(url.value).toBe('https://www.avonni.app/');
                    expect(url.label).toBe(typeAttributes.label);
                    expect(url.tooltip).toBe(typeAttributes.tooltip);
                    expect(url.target).toBe(typeAttributes.target);

                    expect(
                        text ||
                            boolean ||
                            number ||
                            date ||
                            email ||
                            location ||
                            phone
                    ).toBeFalsy();
                });
            });

            it('with no value', () => {
                element.value = null;
                element.type = 'url';

                return Promise.resolve().then(() => {
                    const emptyValue = element.shadowRoot.querySelector(
                        '[data-element-id="empty-value"]'
                    );
                    const text = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-text"]'
                    );
                    const boolean = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon"]'
                    );
                    const number = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-number"]'
                    );
                    const date = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-date-time"]'
                    );
                    const email = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-email"]'
                    );
                    const location = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-location"]'
                    );
                    const phone = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-phone"]'
                    );
                    const url = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-url"]'
                    );

                    expect(emptyValue).toBeTruthy();
                    expect(
                        text ||
                            boolean ||
                            number ||
                            date ||
                            email ||
                            location ||
                            phone ||
                            url
                    ).toBeFalsy();
                });
            });
        });

        describe('Invalid type attributes', () => {
            it('are ignored', () => {
                const typeAttributes = {
                    currencyCode: 45,
                    currencyDisplayAs: 'invalid',
                    minimumFractionDigits: 'invalid',
                    target: '_blank'
                };
                element.typeAttributes = typeAttributes;
                element.type = 'currency';
                element.value = '56.78';

                return Promise.resolve().then(() => {
                    const number = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-number"]'
                    );

                    expect(number.currencyDisplayAs).toBe('symbol');
                    expect(number.currencyCode).toBeUndefined();
                });
            });
        });
    });
});
