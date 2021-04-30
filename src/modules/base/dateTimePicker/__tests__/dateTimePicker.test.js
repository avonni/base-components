import { createElement } from 'lwc';
import DateTimePicker from 'c/dateTimePicker';

describe('DateTimePicker', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });

        expect(element.disabled).toBeFalsy();
        expect(element.fieldLevelHelp).toBeUndefined();
        expect(element.label).toBeUndefined();
        expect(element.hideLabel).toBeFalsy();
        expect(element.variant).toBe('daily');
        expect(element.messageWhenValueMissing).toBeUndefined();
        expect(element.name).toBeUndefined();
        expect(element.readOnly).toBeFalsy();
        expect(element.required).toBeFalsy();
        expect(element.validity).toMatchObject({});
        expect(element.value).toBeUndefined();
        expect(element.startTime).toBe(46800000);
        expect(element.endTime).toBe(82800000);
        expect(element.timeSlotDuration).toBe(1800000);
        expect(element.timeFormatHour).toBeUndefined();
        expect(element.timeFormatHour12).toBeUndefined();
        expect(element.timeFormatMinute).toBeUndefined();
        expect(element.timeFormatSecond).toBeUndefined();
        expect(element.dateFormatDay).toBe('numeric');
        expect(element.dateFormatMonth).toBe('long');
        expect(element.dateFormatWeekday).toBe('short');
        expect(element.dateFormatYear).toBeUndefined();
        expect(element.showEndTime).toBeUndefined();
        expect(element.showDisabledDates).toBeUndefined();
        expect(element.disabledDateTimes).toMatchObject([]);
        expect(element.max).toMatchObject(
            new Date(new Date(2099, 11, 31).setHours(0, 0, 0, 0))
        );
        expect(element.min).toMatchObject(
            new Date(new Date(1900, 0, 1).setHours(0, 0, 0, 0))
        );
        expect(element.type).toBe('radio');
        expect(element.showTimeZone).toBeFalsy();
        expect(element.hideNavigation).toBeFalsy();
        expect(element.hideDatePicker).toBeFalsy();
    });

    /* ----- ATTRIBUTES ----- */

    // disabled
    it('Date time picker disabled daily', () => {
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });

        element.disabled = true;

        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const paragraph = element.shadowRoot.querySelectorAll('p');
            expect(paragraph[2].textContent).toBe(
                'No available time slots for this period.'
            );
            const time = element.shadowRoot.querySelector(
                '.avonni-date-time-picker__time'
            );
            expect(time).toBeFalsy();
        });
    });

    it('Date time picker disabled weekly', () => {
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });

        element.variant = 'weekly';
        element.disabled = true;

        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const paragraph = element.shadowRoot.querySelectorAll('p');
            expect(paragraph[2].textContent).toBe(
                'No available time slots for this period.'
            );
            const time = element.shadowRoot.querySelector(
                '.avonni-date-time-picker__time'
            );
            expect(time).toBeFalsy();
        });
    });

    it('Date time picker disabled inline', () => {
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });

        element.variant = 'inline';
        element.disabled = true;

        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const paragraph = element.shadowRoot.querySelectorAll('p');
            expect(paragraph[2].textContent).toBe(
                'No available time slots for this period.'
            );
            const time = element.shadowRoot.querySelector(
                '.avonni-date-time-picker__time'
            );
            expect(time).toBeFalsy();
        });
    });

    it('Date time picker disabled timeline', () => {
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });

        element.variant = 'timeline';
        element.disabled = true;

        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const paragraph = element.shadowRoot.querySelectorAll('p');
            expect(paragraph[2].textContent).toBe(
                'No available time slots for this period.'
            );
            const time = element.shadowRoot.querySelector(
                '.avonni-date-time-picker__time'
            );
            expect(time).toBeFalsy();
        });
    });

    it('Date time picker disabled monthly', () => {
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });

        element.variant = 'monthly';
        element.disabled = true;

        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const paragraph = element.shadowRoot.querySelectorAll('p');
            expect(paragraph[2].textContent).toBe(
                'No available time slots for this period.'
            );
            const time = element.shadowRoot.querySelector(
                '.avonni-date-time-picker__time'
            );
            expect(time).toBeFalsy();
            const calendar = element.shadowRoot.querySelector('c-calendar');
            expect(calendar.disabled).toBeTruthy();
        });
    });

    // field level help
    it('Date time picker field level help', () => {
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });

        document.body.appendChild(element);

        element.fieldLevelHelp = 'This is a field level help text';

        return Promise.resolve().then(() => {
            const helptext = element.shadowRoot.querySelector(
                'lightning-helptext'
            );
            expect(helptext).toBeTruthy();
            expect(helptext.content).toBe('This is a field level help text');
        });
    });

    // label
    it('Date time picker label', () => {
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });

        document.body.appendChild(element);

        element.label = 'This is a label text';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.slds-form-element__label'
            );
            expect(label).toBeTruthy();
            expect(label.textContent).toBe('This is a label text');
        });
    });

    // hide label
    it('Date time picker hide label', () => {
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });

        document.body.appendChild(element);

        element.label = 'This is a label text';
        element.hideLabel = true;

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.slds-form-element__label'
            );
            expect(label).toBeFalsy();
        });
    });

    // variant
    it('Date time picker variant daily', () => {
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });

        document.body.appendChild(element);

        element.variant = 'daily';

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector('c-calendar');
            expect(calendar).toBeFalsy();
            const time = element.shadowRoot.querySelector(
                '.avonni-date-time-picker__time'
            );
            expect(time).toBeTruthy();
            const days = element.shadowRoot.querySelectorAll(
                '.avonni-date-time-picker__day'
            );
            expect(days).toHaveLength(1);
        });
    });

    it('Date time picker variant weekly', () => {
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });

        document.body.appendChild(element);

        element.variant = 'weekly';

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector('c-calendar');
            expect(calendar).toBeFalsy();
            const time = element.shadowRoot.querySelector(
                '.avonni-date-time-picker__time'
            );
            expect(time).toBeTruthy();
            const days = element.shadowRoot.querySelectorAll(
                '.avonni-date-time-picker__day'
            );
            expect(days).toHaveLength(7);
        });
    });

    it('Date time picker variant inline', () => {
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });

        document.body.appendChild(element);

        element.variant = 'inline';

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector('c-calendar');
            expect(calendar).toBeFalsy();
            const time = element.shadowRoot.querySelector(
                '.avonni-date-time-picker__time'
            );
            expect(time).toBeTruthy();
            const days = element.shadowRoot.querySelectorAll(
                '.avonni-date-time-picker__day_inline'
            );
            expect(days).toHaveLength(1);
        });
    });

    it('Date time picker variant timeline', () => {
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });

        document.body.appendChild(element);

        element.variant = 'timeline';

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector('c-calendar');
            expect(calendar).toBeFalsy();
            const time = element.shadowRoot.querySelector(
                '.avonni-date-time-picker__time'
            );
            expect(time).toBeTruthy();
            const days = element.shadowRoot.querySelector(
                '.avonni-date-time-picker__day_inline'
            );
            expect(days).toBeFalsy();
            const timeline = element.shadowRoot.querySelector(
                '.avonni-date-time-picker__timeline'
            );
            expect(timeline).toBeTruthy();
        });
    });

    it('Date time picker variant monthly', () => {
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });

        document.body.appendChild(element);

        element.variant = 'monthly';

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector('c-calendar');
            expect(calendar).toBeTruthy();
            const time = element.shadowRoot.querySelector(
                '.avonni-date-time-picker__time'
            );
            expect(time).toBeTruthy();
            const days = element.shadowRoot.querySelector(
                '.avonni-date-time-picker__day_inline'
            );
            expect(days).toBeFalsy();
            const timeline = element.shadowRoot.querySelector(
                '.avonni-date-time-picker__timeline'
            );
            expect(timeline).toBeFalsy();
        });
    });
});
