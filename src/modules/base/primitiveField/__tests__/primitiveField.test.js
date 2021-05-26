import { createElement } from 'lwc';
import PrimitiveField from 'c/primitiveField';

describe('PrimitiveField', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-primitive-page-header-field', {
            is: PrimitiveField
        });

        expect(element.field).toBeUndefined();
        expect(element.label).toBeUndefined();
        expect(element.value).toBeUndefined();
        expect(element.type).toBe('text');
    });

    // All tests by type
    it('type = text', () => {
        const element = createElement('base-primitive-page-header-field', {
            is: PrimitiveField
        });

        element.field = {
            type: 'text',
            typeAttributes: {
                linkify: true
            }
        };
        document.body.appendChild(element);

        element.type = 'text';
        element.value = 'A string value';

        return Promise.resolve().then(() => {
            const text = element.shadowRoot.querySelector(
                'lightning-formatted-text'
            );
            const boolean = element.shadowRoot.querySelector('lightning-icon');
            const number = element.shadowRoot.querySelector(
                'lightning-formatted-number'
            );
            const date = element.shadowRoot.querySelector(
                'lightning-formatted-date-time'
            );
            const email = element.shadowRoot.querySelector(
                'lightning-formatted-email'
            );
            const location = element.shadowRoot.querySelector(
                'lightning-formatted-location'
            );
            const phone = element.shadowRoot.querySelector(
                'lightning-formatted-phone'
            );
            const url = element.shadowRoot.querySelector(
                'lightning-formatted-url'
            );

            expect(text).toBeTruthy();
            expect(text.value).toBe('A string value');
            expect(text.linkify).toBeTruthy();
            expect(
                boolean || number || date || email || location || phone || url
            ).toBeFalsy();
        });
    });

    it('type = boolean, with true value', () => {
        const element = createElement('base-primitive-page-header-field', {
            is: PrimitiveField
        });

        element.field = {
            type: 'boolean'
        };
        document.body.appendChild(element);
        element.value = true;
        element.type = 'boolean';

        return Promise.resolve().then(() => {
            const text = element.shadowRoot.querySelector(
                'lightning-formatted-text'
            );
            const boolean = element.shadowRoot.querySelector('lightning-icon');
            const number = element.shadowRoot.querySelector(
                'lightning-formatted-number'
            );
            const date = element.shadowRoot.querySelector(
                'lightning-formatted-date-time'
            );
            const email = element.shadowRoot.querySelector(
                'lightning-formatted-email'
            );
            const location = element.shadowRoot.querySelector(
                'lightning-formatted-location'
            );
            const phone = element.shadowRoot.querySelector(
                'lightning-formatted-phone'
            );
            const url = element.shadowRoot.querySelector(
                'lightning-formatted-url'
            );

            expect(boolean).toBeTruthy();
            expect(boolean.iconName).toBe('utility:check');
            expect(
                text || number || date || email || location || phone || url
            ).toBeFalsy();
        });
    });

    it('type = boolean, with false value', () => {
        const element = createElement('base-primitive-page-header-field', {
            is: PrimitiveField
        });

        element.field = {
            type: 'boolean'
        };
        document.body.appendChild(element);
        element.type = 'boolean';
        element.value = false;

        return Promise.resolve().then(() => {
            const text = element.shadowRoot.querySelector(
                'lightning-formatted-text'
            );
            const boolean = element.shadowRoot.querySelector('lightning-icon');
            const number = element.shadowRoot.querySelector(
                'lightning-formatted-number'
            );
            const date = element.shadowRoot.querySelector(
                'lightning-formatted-date-time'
            );
            const email = element.shadowRoot.querySelector(
                'lightning-formatted-email'
            );
            const location = element.shadowRoot.querySelector(
                'lightning-formatted-location'
            );
            const phone = element.shadowRoot.querySelector(
                'lightning-formatted-phone'
            );
            const url = element.shadowRoot.querySelector(
                'lightning-formatted-url'
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

    it('type = boolean, with no value', () => {
        const element = createElement('base-primitive-page-header-field', {
            is: PrimitiveField
        });

        element.field = {
            type: 'boolean'
        };
        document.body.appendChild(element);
        element.type = 'boolean';

        return Promise.resolve().then(() => {
            const text = element.shadowRoot.querySelector(
                'lightning-formatted-text'
            );
            const boolean = element.shadowRoot.querySelector('lightning-icon');
            const number = element.shadowRoot.querySelector(
                'lightning-formatted-number'
            );
            const date = element.shadowRoot.querySelector(
                'lightning-formatted-date-time'
            );
            const email = element.shadowRoot.querySelector(
                'lightning-formatted-email'
            );
            const location = element.shadowRoot.querySelector(
                'lightning-formatted-location'
            );
            const phone = element.shadowRoot.querySelector(
                'lightning-formatted-phone'
            );
            const url = element.shadowRoot.querySelector(
                'lightning-formatted-url'
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

    it('type = currency', () => {
        const element = createElement('base-primitive-page-header-field', {
            is: PrimitiveField
        });

        const field = {
            type: 'currency',
            typeAttributes: {
                currencyCode: 'EUR',
                currencyDisplayAs: 'name',
                minimumIntegerDigits: 2,
                minimumFractionDigits: 2,
                maximumractionDigits: 4,
                minimumSignificantDigits: 2,
                maximumSignificantDigits: 5
            }
        };

        element.field = field;
        document.body.appendChild(element);
        element.value = 33;
        element.type = 'currency';

        return Promise.resolve().then(() => {
            const text = element.shadowRoot.querySelector(
                'lightning-formatted-text'
            );
            const boolean = element.shadowRoot.querySelector('lightning-icon');
            const number = element.shadowRoot.querySelector(
                'lightning-formatted-number'
            );
            const date = element.shadowRoot.querySelector(
                'lightning-formatted-date-time'
            );
            const email = element.shadowRoot.querySelector(
                'lightning-formatted-email'
            );
            const location = element.shadowRoot.querySelector(
                'lightning-formatted-location'
            );
            const phone = element.shadowRoot.querySelector(
                'lightning-formatted-phone'
            );
            const url = element.shadowRoot.querySelector(
                'lightning-formatted-url'
            );

            expect(number).toBeTruthy();
            expect(number.value).toBe(33);
            expect(number.currencyCode).toBe(field.typeAttributes.currencyCode);
            expect(number.currencyDisplayAs).toBe(
                field.typeAttributes.currencyDisplayAs
            );
            expect(number.minimumIntegerDigits).toBe(
                field.typeAttributes.minimumIntegerDigits
            );
            expect(number.minimumFractionDigits).toBe(
                field.typeAttributes.minimumFractionDigits
            );
            expect(number.maximumFractionDigits).toBe(
                field.typeAttributes.maximumFractionDigits
            );
            expect(number.maximumSignificantDigits).toBe(
                field.typeAttributes.maximumSignificantDigits
            );
            expect(number.minimumSignificantDigits).toBe(
                field.typeAttributes.minimumSignificantDigits
            );

            expect(
                text || boolean || date || email || location || phone || url
            ).toBeFalsy();
        });
    });

    it('type = date', () => {
        const element = createElement('base-primitive-page-header-field', {
            is: PrimitiveField
        });

        const field = {
            type: 'date',
            typeAttributes: {
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
            }
        };

        element.field = field;
        document.body.appendChild(element);
        element.type = 'date';
        element.value = new Date('2021-04-12T12:38:03.422Z');

        return Promise.resolve().then(() => {
            const text = element.shadowRoot.querySelector(
                'lightning-formatted-text'
            );
            const boolean = element.shadowRoot.querySelector('lightning-icon');
            const number = element.shadowRoot.querySelector(
                'lightning-formatted-number'
            );
            const date = element.shadowRoot.querySelector(
                'lightning-formatted-date-time'
            );
            const email = element.shadowRoot.querySelector(
                'lightning-formatted-email'
            );
            const location = element.shadowRoot.querySelector(
                'lightning-formatted-location'
            );
            const phone = element.shadowRoot.querySelector(
                'lightning-formatted-phone'
            );
            const url = element.shadowRoot.querySelector(
                'lightning-formatted-url'
            );

            expect(date).toBeTruthy();
            expect(date.value).toMatchObject(
                new Date('2021-04-12T12:38:03.422Z')
            );
            expect(date.day).toBe(field.typeAttributes.day);
            expect(date.era).toBe(field.typeAttributes.era);
            expect(date.hour).toBe(field.typeAttributes.hour);
            expect(date.hour12).toBe(field.typeAttributes.hour12);
            expect(date.minute).toBe(field.typeAttributes.minute);
            expect(date.month).toBe(field.typeAttributes.month);
            expect(date.second).toBe(field.typeAttributes.second);
            expect(date.timeZone).toBe(field.typeAttributes.timeZone);
            expect(date.timeZoneName).toBe(field.typeAttributes.timeZoneName);
            expect(date.weekday).toBe(field.typeAttributes.weekday);
            expect(date.year).toBe(field.typeAttributes.year);

            expect(
                text || boolean || number || email || location || phone || url
            ).toBeFalsy();
        });
    });

    it('type = email', () => {
        const element = createElement('base-primitive-page-header-field', {
            is: PrimitiveField
        });

        const field = {
            type: 'email'
        };

        element.field = field;
        document.body.appendChild(element);
        element.type = 'email';
        element.value = 'jane.doe@email.com';

        return Promise.resolve().then(() => {
            const text = element.shadowRoot.querySelector(
                'lightning-formatted-text'
            );
            const boolean = element.shadowRoot.querySelector('lightning-icon');
            const number = element.shadowRoot.querySelector(
                'lightning-formatted-number'
            );
            const date = element.shadowRoot.querySelector(
                'lightning-formatted-date-time'
            );
            const email = element.shadowRoot.querySelector(
                'lightning-formatted-email'
            );
            const location = element.shadowRoot.querySelector(
                'lightning-formatted-location'
            );
            const phone = element.shadowRoot.querySelector(
                'lightning-formatted-phone'
            );
            const url = element.shadowRoot.querySelector(
                'lightning-formatted-url'
            );

            expect(email).toBeTruthy();
            expect(email.value).toBe('jane.doe@email.com');

            expect(
                text || boolean || number || date || location || phone || url
            ).toBeFalsy();
        });
    });

    it('type = location', () => {
        const element = createElement('base-primitive-page-header-field', {
            is: PrimitiveField
        });

        const field = {
            type: 'location'
        };

        element.field = field;
        document.body.appendChild(element);
        element.type = 'location';
        element.value = {
            latitude: '45.53713090203662',
            longitude: '-73.61483166585984'
        };

        return Promise.resolve().then(() => {
            const text = element.shadowRoot.querySelector(
                'lightning-formatted-text'
            );
            const boolean = element.shadowRoot.querySelector('lightning-icon');
            const number = element.shadowRoot.querySelector(
                'lightning-formatted-number'
            );
            const date = element.shadowRoot.querySelector(
                'lightning-formatted-date-time'
            );
            const email = element.shadowRoot.querySelector(
                'lightning-formatted-email'
            );
            const location = element.shadowRoot.querySelector(
                'lightning-formatted-location'
            );
            const phone = element.shadowRoot.querySelector(
                'lightning-formatted-phone'
            );
            const url = element.shadowRoot.querySelector(
                'lightning-formatted-url'
            );

            expect(location).toBeTruthy();
            expect(location.latitude).toBe('45.53713090203662');
            expect(location.longitude).toBe('-73.61483166585984');

            expect(
                text || boolean || number || date || email || phone || url
            ).toBeFalsy();
        });
    });

    it('type = number', () => {
        const element = createElement('base-primitive-page-header-field', {
            is: PrimitiveField
        });

        const field = {
            type: 'number',
            typeAttributes: {
                minimumIntegerDigits: 2,
                maximumFractionDigits: 4,
                maximumSignificantDigits: 12,
                minimumFractionDigits: 2,
                minimumSignificantDigits: 5
            }
        };

        element.field = field;
        document.body.appendChild(element);
        element.type = 'number';
        element.value = 46;

        return Promise.resolve().then(() => {
            const text = element.shadowRoot.querySelector(
                'lightning-formatted-text'
            );
            const boolean = element.shadowRoot.querySelector('lightning-icon');
            const number = element.shadowRoot.querySelector(
                'lightning-formatted-number'
            );
            const date = element.shadowRoot.querySelector(
                'lightning-formatted-date-time'
            );
            const email = element.shadowRoot.querySelector(
                'lightning-formatted-email'
            );
            const location = element.shadowRoot.querySelector(
                'lightning-formatted-location'
            );
            const phone = element.shadowRoot.querySelector(
                'lightning-formatted-phone'
            );
            const url = element.shadowRoot.querySelector(
                'lightning-formatted-url'
            );

            expect(number).toBeTruthy();
            expect(number.value).toBe(46);
            expect(number.minimumIntegerDigits).toBe(
                field.typeAttributes.minimumIntegerDigits
            );
            expect(number.maximumFractionDigits).toBe(
                field.typeAttributes.maximumFractionDigits
            );
            expect(number.maximumSignificantDigits).toBe(
                field.typeAttributes.maximumSignificantDigits
            );
            expect(number.minimumFractionDigits).toBe(
                field.typeAttributes.minimumFractionDigits
            );
            expect(number.minimumSignificantDigits).toBe(
                field.typeAttributes.minimumSignificantDigits
            );

            expect(
                text || boolean || date || email || location || phone || url
            ).toBeFalsy();
        });
    });

    it('type = percent', () => {
        const element = createElement('base-primitive-page-header-field', {
            is: PrimitiveField
        });

        const field = {
            type: 'percent',
            typeAttributes: {
                minimumIntegerDigits: 2,
                maximumFractionDigits: 4,
                maximumSignificantDigits: 12,
                minimumFractionDigits: 2,
                minimumSignificantDigits: 5,
                step: 5
            }
        };

        element.field = field;
        document.body.appendChild(element);
        element.type = 'percent';
        element.value = 46;

        return Promise.resolve().then(() => {
            const text = element.shadowRoot.querySelector(
                'lightning-formatted-text'
            );
            const boolean = element.shadowRoot.querySelector('lightning-icon');
            const number = element.shadowRoot.querySelector(
                'lightning-formatted-number'
            );
            const date = element.shadowRoot.querySelector(
                'lightning-formatted-date-time'
            );
            const email = element.shadowRoot.querySelector(
                'lightning-formatted-email'
            );
            const location = element.shadowRoot.querySelector(
                'lightning-formatted-location'
            );
            const phone = element.shadowRoot.querySelector(
                'lightning-formatted-phone'
            );
            const url = element.shadowRoot.querySelector(
                'lightning-formatted-url'
            );

            expect(number).toBeTruthy();
            expect(number.value).toBe(46);
            expect(number.minimumIntegerDigits).toBe(
                field.typeAttributes.minimumIntegerDigits
            );
            expect(number.maximumFractionDigits).toBe(
                field.typeAttributes.maximumFractionDigits
            );
            expect(number.maximumSignificantDigits).toBe(
                field.typeAttributes.maximumSignificantDigits
            );
            expect(number.minimumFractionDigits).toBe(
                field.typeAttributes.minimumFractionDigits
            );
            expect(number.minimumSignificantDigits).toBe(
                field.typeAttributes.minimumSignificantDigits
            );

            expect(
                text || boolean || date || email || location || phone || url
            ).toBeFalsy();
        });
    });

    it('type = phone', () => {
        const element = createElement('base-primitive-page-header-field', {
            is: PrimitiveField
        });

        const field = {
            type: 'phone'
        };

        element.field = field;
        document.body.appendChild(element);
        element.type = 'phone';
        element.value = '123-456-7890';

        return Promise.resolve().then(() => {
            const text = element.shadowRoot.querySelector(
                'lightning-formatted-text'
            );
            const boolean = element.shadowRoot.querySelector('lightning-icon');
            const number = element.shadowRoot.querySelector(
                'lightning-formatted-number'
            );
            const date = element.shadowRoot.querySelector(
                'lightning-formatted-date-time'
            );
            const email = element.shadowRoot.querySelector(
                'lightning-formatted-email'
            );
            const location = element.shadowRoot.querySelector(
                'lightning-formatted-location'
            );
            const phone = element.shadowRoot.querySelector(
                'lightning-formatted-phone'
            );
            const url = element.shadowRoot.querySelector(
                'lightning-formatted-url'
            );

            expect(phone).toBeTruthy();
            expect(phone.value).toBe('123-456-7890');

            expect(
                text || boolean || number || date || email || location || url
            ).toBeFalsy();
        });
    });

    it('type = url', () => {
        const element = createElement('base-primitive-page-header-field', {
            is: PrimitiveField
        });

        const field = {
            type: 'url'
        };

        element.field = field;
        document.body.appendChild(element);
        element.type = 'url';
        element.value = 'https://www.avonni.app/';

        return Promise.resolve().then(() => {
            const text = element.shadowRoot.querySelector(
                'lightning-formatted-text'
            );
            const boolean = element.shadowRoot.querySelector('lightning-icon');
            const number = element.shadowRoot.querySelector(
                'lightning-formatted-number'
            );
            const date = element.shadowRoot.querySelector(
                'lightning-formatted-date-time'
            );
            const email = element.shadowRoot.querySelector(
                'lightning-formatted-email'
            );
            const location = element.shadowRoot.querySelector(
                'lightning-formatted-location'
            );
            const phone = element.shadowRoot.querySelector(
                'lightning-formatted-phone'
            );
            const url = element.shadowRoot.querySelector(
                'lightning-formatted-url'
            );

            expect(url).toBeTruthy();
            expect(url.value).toBe('https://www.avonni.app/');

            expect(
                text || boolean || number || date || email || location || phone
            ).toBeFalsy();
        });
    });
});
